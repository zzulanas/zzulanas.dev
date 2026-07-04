import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const alt = "Zachary Zulanas — software engineer in Brooklyn, NY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const wordmark = "zachary zulanas";
  const major = await loadGoogleFont("Major Mono Display", wordmark);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 25% 85%, #14343f 0%, #0b1620 45%, #06090d 100%)",
          color: "#e8eef2",
        }}
      >
        {/* subtle top-right accent bloom, echoing the site shader */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(80,200,220,0.35) 0%, rgba(80,200,220,0) 70%)",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#7fd4e0",
            fontFamily: "sans-serif",
          }}
        >
          software engineer · brooklyn, ny
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 108,
            lineHeight: 1.02,
            fontFamily: major ? "Major" : "sans-serif",
            letterSpacing: major ? 0 : -2,
          }}
        >
          {wordmark}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            letterSpacing: 8,
            color: "#8aa0ad",
            fontFamily: "monospace",
          }}
        >
          zzulanas.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: major
        ? [{ name: "Major", data: major, style: "normal", weight: 400 }]
        : [],
    }
  );
}
