import { ImageResponse } from "next/og";
import { getPost, getAllPosts, formatDate } from "@/lib/posts";
import { loadGoogleFont } from "@/lib/og-font";

export const alt = "Writing by Zachary Zulanas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.meta.title ?? "writing";
  const date = post ? formatDate(post.meta.date) : "";
  const tags = post?.meta.tags ?? [];

  const outfit = await loadGoogleFont("Outfit", title, 300);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 75% 15%, #14343f 0%, #0b1620 45%, #06090d 100%)",
          color: "#e8eef2",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#7fd4e0",
            fontFamily: "monospace",
          }}
        >
          writing
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 62 : 78,
            lineHeight: 1.1,
            fontFamily: outfit ? "Outfit" : "sans-serif",
            fontWeight: 300,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#8aa0ad",
            fontFamily: "monospace",
          }}
        >
          <span>zzulanas.dev</span>
          <span>{[date, tags[0]].filter(Boolean).join("  ·  ")}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: outfit
        ? [{ name: "Outfit", data: outfit, style: "normal", weight: 300 }]
        : [],
    }
  );
}
