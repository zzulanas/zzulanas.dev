"use client";

import { NeuroNoise, Water, Dithering } from "@paper-design/shaders-react";

export type ShaderKind =
  | "deep"
  | "water"
  | "dither-wave"
  | "dither-ripple"
  | "water-dither";

export function ShaderBackdrop({ kind, dark }: { kind: ShaderKind; dark: boolean }) {
  const common = {
    style: { position: "absolute" as const, inset: 0 },
    width: "100%",
    height: "100%",
  };

  const bg = dark ? "#040a10" : "#eef5f7";
  const ink = dark ? "#35aecb" : "#2c7d8c";

  // light mode washes out, so give the water deeper base/highlight + stronger
  // caustics there for visibility against the pale page.
  const waterBase = (
    <Water
      {...common}
      colorBack={dark ? "#040a10" : "#cfe4ea"}
      colorHighlight={dark ? "#35aecb" : "#0f6d7d"}
      highlights={dark ? 0.5 : 0.7}
      layering={0.45}
      edges={dark ? 0.3 : 0.45}
      caustic={dark ? 0.6 : 0.85}
      waves={0.25}
      size={1.4}
      speed={0.2}
    />
  );

  // pure ordered-dither ripples/waves — retro/cyberpunk two-color
  if (kind === "dither-wave" || kind === "dither-ripple") {
    return (
      <Dithering
        {...common}
        colorBack={bg}
        colorFront={ink}
        shape={kind === "dither-wave" ? "wave" : "ripple"}
        type="4x4"
        size={2}
        scale={1}
        speed={0.4}
      />
    );
  }

  // layered: colored water caustics with a dither grain blended on top
  if (kind === "water-dither") {
    return (
      <>
        {waterBase}
        <Dithering
          style={{
            position: "absolute",
            inset: 0,
            // on a pale background `overlay` barely reads; `multiply` darkens
            // the dots so the halftone is actually visible in light mode.
            mixBlendMode: dark ? "overlay" : "multiply",
            opacity: dark ? 0.6 : 0.42,
          }}
          width="100%"
          height="100%"
          colorBack="rgba(0,0,0,0)"
          colorFront={dark ? "#8fefff" : "#1d6675"}
          shape="simplex"
          type="4x4"
          size={2}
          scale={1}
          speed={0.2}
        />
      </>
    );
  }

  if (kind === "water") {
    return waterBase;
  }

  // slow underwater neuro filaments
  return (
    <NeuroNoise
      {...common}
      colorBack={bg}
      colorMid={dark ? "#0a3340" : "#bcdde4"}
      colorFront={ink}
      brightness={0.25}
      contrast={0.29}
      scale={1.05}
      speed={0.16}
    />
  );
}
