"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  BIO,
  SOCIAL_LINKS,
} from "@/lib/data";
import type { WinKind } from "./types";

type LineKind = "in" | "out" | "sys" | "err" | "link";
type Line = { id: number; kind: LineKind; text: string; href?: string };

let uid = 0;
const nextId = () => ++uid;

const PROMPT = "visitor@zzulanas:~$";

const BOOT: Line[] = [
  { id: nextId(), kind: "sys", text: "zzulanas.dev terminal — v1.0" },
  {
    id: nextId(),
    kind: "sys",
    text: "type 'help' for commands · 'ask <question>' to talk to the assistant",
  },
  { id: nextId(), kind: "out", text: "" },
];

const HELP = [
  "available commands:",
  "  help              this list",
  "  whoami / about    who is zach",
  "  ls [dir]          list sections (try: ls projects)",
  "  projects          list projects",
  "  experience        work history",
  "  education         school + certs",
  "  cat <name>        print a project, e.g. cat splat3d",
  "  socials           links to find him",
  "  open <section>    open a window: writing | projects | about",
  "  ask <question>    ask the AI assistant about zach",
  "  clear             clear the screen",
];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function TerminalView({ onOpen }: { onOpen?: (kind: WinKind) => void }) {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const history = useRef<string[]>([]);
  const histIdx = useRef<number>(-1);
  const chat = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((line: Omit<Line, "id">) => {
    setLines((prev) => [...prev, { id: nextId(), ...line }]);
  }, []);

  const pushMany = useCallback((texts: string[], kind: LineKind = "out") => {
    setLines((prev) => [
      ...prev,
      ...texts.map((text) => ({ id: nextId(), kind, text })),
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  const runAsk = useCallback(async (question: string) => {
    setBusy(true);
    chat.current.push({ role: "user", content: question });
    const outId = nextId();
    setLines((prev) => [...prev, { id: outId, kind: "out", text: "" }]);

    const appendToOut = (chunk: string) =>
      setLines((prev) =>
        prev.map((l) => (l.id === outId ? { ...l, text: l.text + chunk } : l))
      );

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chat.current }),
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "request failed");
        setLines((prev) =>
          prev.map((l) => (l.id === outId ? { ...l, kind: "err", text: msg } : l))
        );
        chat.current.pop();
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        full += chunk;
        appendToOut(chunk);
      }
      chat.current.push({ role: "assistant", content: full });
    } catch {
      setLines((prev) =>
        prev.map((l) =>
          l.id === outId
            ? { ...l, kind: "err", text: "network error reaching the assistant." }
            : l
        )
      );
      chat.current.pop();
    } finally {
      setBusy(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, []);

  const handle = useCallback(
    (raw: string) => {
      const line = raw.trim();
      push({ kind: "in", text: `${PROMPT} ${raw}` });
      if (!line) return;

      history.current.push(line);
      histIdx.current = history.current.length;

      const [cmd, ...rest] = line.split(/\s+/);
      const arg = rest.join(" ");
      const c = cmd.toLowerCase();

      switch (c) {
        case "help":
        case "?":
          pushMany(HELP, "out");
          return;
        case "clear":
          setLines([]);
          return;
        case "whoami":
        case "about":
          pushMany(BIO, "out");
          return;
        case "ls": {
          if (slug(arg) === "projects")
            pushMany(PROJECTS.map((p) => slug(p.name)), "out");
          else pushMany(["writing/  projects/  about/"], "out");
          return;
        }
        case "projects":
          pushMany(PROJECTS.map((p) => `${p.name} — ${p.tagline}`), "out");
          return;
        case "experience":
        case "resume":
        case "work":
          pushMany(
            EXPERIENCE.flatMap((e) => [
              `${e.company} · ${e.role} (${e.dates})`,
              `  ${e.summary}`,
            ]),
            "out"
          );
          return;
        case "education":
        case "school":
          pushMany(
            [
              `${EDUCATION.school} — ${EDUCATION.degree} (${EDUCATION.dates})`,
              EDUCATION.note,
            ],
            "out"
          );
          return;
        case "cat": {
          const key = slug(arg);
          if (!key) {
            push({ kind: "err", text: "usage: cat <project>  (try: projects)" });
            return;
          }
          if (key === "about" || key === "bio") {
            pushMany(BIO, "out");
            return;
          }
          const p = PROJECTS.find((x) => slug(x.name) === key);
          if (p) {
            pushMany(
              [
                `${p.name} (${p.date})`,
                p.tagline,
                "",
                p.description,
                "",
                `tech: ${p.tech.join(", ")}`,
              ],
              "out"
            );
            push({ kind: "link", text: p.urlLabel, href: p.url });
            return;
          }
          push({ kind: "err", text: `cat: ${arg}: no such entry` });
          return;
        }
        case "socials":
        case "contact":
        case "links":
          SOCIAL_LINKS.forEach((s) =>
            push({ kind: "link", text: `${s.label} — ${s.href}`, href: s.href })
          );
          return;
        case "open": {
          const dest = slug(arg);
          if (dest === "writing" || dest === "projects" || dest === "about") {
            push({ kind: "sys", text: `opening ${dest}…` });
            onOpen?.(dest);
          } else {
            push({ kind: "err", text: `open: unknown section '${arg}'` });
          }
          return;
        }
        case "ask":
        case "chat": {
          if (!arg) {
            push({ kind: "err", text: "usage: ask <question>" });
            return;
          }
          void runAsk(arg);
          return;
        }
        case "sudo":
          push({ kind: "out", text: "nice try." });
          return;
        case "banner":
          pushMany(BOOT.map((b) => b.text), "sys");
          return;
        default:
          push({ kind: "err", text: `command not found: ${c} — type 'help'` });
      }
    },
    [push, pushMany, onOpen, runAsk]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (busy) return;
      const v = input;
      setInput("");
      handle(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx.current > 0) {
        histIdx.current -= 1;
        setInput(history.current[histIdx.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < history.current.length - 1) {
        histIdx.current += 1;
        setInput(history.current[histIdx.current] ?? "");
      } else {
        histIdx.current = history.current.length;
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const colorFor = (kind: LineKind) =>
    kind === "in"
      ? "text-fg"
      : kind === "sys"
        ? "text-muted"
        : kind === "err"
          ? "text-red-400"
          : kind === "link"
            ? "text-accent"
            : "text-fg/90";

  return (
    <div
      className="flex h-full min-h-0 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[0.82rem] leading-relaxed"
      >
        {lines.map((l) =>
          l.kind === "link" && l.href ? (
            <a
              key={l.id}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="block whitespace-pre-wrap break-words text-accent underline-offset-2 hover:underline"
            >
              {l.text}
            </a>
          ) : (
            <div
              key={l.id}
              className={`whitespace-pre-wrap break-words ${colorFor(l.kind)}`}
            >
              {l.text || " "}
            </div>
          )
        )}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-accent">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={busy}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="terminal input"
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none disabled:opacity-50"
          />
          {busy && <span className="animate-pulse text-muted">…thinking</span>}
        </div>
      </div>
    </div>
  );
}
