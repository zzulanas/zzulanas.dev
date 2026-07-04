import Anthropic from "@anthropic-ai/sdk";
import { PROJECTS, EXPERIENCE, EDUCATION, BIO, SOCIAL_LINKS } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 600;
const MAX_TURNS = 12; // client history cap we honor
const MAX_CHARS = 1500; // per-message input cap

// ---- lightweight in-memory rate limit (best-effort; per warm instance) ----
const HITS = new Map<string, number[]>();
function rateLimited(ip: string, limit = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > limit;
}

function buildSystem() {
  const projects = PROJECTS.map(
    (p) =>
      `- ${p.name} (${p.date}) — ${p.tagline}. ${p.description} Tech: ${p.tech.join(", ")}. Link: ${p.url}`
  ).join("\n");

  const experience = EXPERIENCE.map(
    (e) =>
      `- ${e.company}, ${e.role} (${e.dates}). ${e.summary}${
        e.highlights.length ? " Highlights: " + e.highlights.join("; ") : ""
      }`
  ).join("\n");

  const socials = SOCIAL_LINKS.map((s) => `${s.label}: ${s.href}`).join(", ");

  return `You are the assistant embedded in the terminal on Zach Zulanas's personal website (zzulanas.dev). Visitors type "ask <question>" to talk to you. Answer questions about Zach — his work, projects, background, and interests — using the context below. You may answer general questions too, but keep the focus on Zach and be brief.

STYLE:
- You are rendered in a monospace terminal. Write plain text only — NO markdown, no headers, no bold, no bullet symbols like * or #. Short lines and short paragraphs.
- Be concise (usually 1-4 sentences), warm, a little playful, engineer-to-engineer. Never sycophantic.
- Refer to Zach in the third person. If you don't know something personal, say so plainly and point to a relevant section (writing / projects / about) or a social link.
- Don't invent facts not in the context.

ABOUT ZACH:
${BIO.join("\n")}

EXPERIENCE:
${experience}

EDUCATION:
- ${EDUCATION.school}, ${EDUCATION.degree} (${EDUCATION.dates}). ${EDUCATION.note}

PROJECTS:
${projects}

ELSEWHERE: ${socials}`;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      "ask is offline: ANTHROPIC_API_KEY is not configured on the server.",
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  if (rateLimited(ip)) {
    return new Response("rate limit reached — give it a minute and try again.", {
      status: 429,
    });
  }

  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0) {
    return new Response("nothing to ask", { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const s = await anthropic.messages.create({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: buildSystem(),
          messages,
          stream: true,
        });
        for await (const event of s) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "unknown error talking to the model";
        controller.enqueue(encoder.encode(`\n[error] ${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
