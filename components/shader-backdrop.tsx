"use client";

import { NeuroNoise, Water } from "@paper-design/shaders-react";

export type ShaderKind = "deep" | "water";

export function ShaderBackdrop({ kind, dark }: { kind: ShaderKind; dark: boolean }) {
  const common = {
    style: { position: "absolute" as const, inset: 0 },
    width: "100%",
    height: "100%",
  };

  if (kind === "water") {
    return (
      <Water
        {...common}
        colorBack={dark ? "#040a10" : "#eef5f7"}
        colorHighlight={dark ? "#35aecb" : "#2c7d8c"}
        highlights={0.5}
        layering={0.45}
        edges={0.3}
        caustic={0.6}
        waves={0.25}
        size={1.4}
        speed={0.2}
      />
    );
  }

  // slow underwater neuro filaments
  return (
    <NeuroNoise
      {...common}
      colorBack={dark ? "#040a10" : "#eef5f7"}
      colorMid={dark ? "#0a3340" : "#bcdde4"}
      colorFront={dark ? "#35aecb" : "#2c7d8c"}
      brightness={0.25}
      contrast={0.29}
      scale={1.05}
      speed={0.16}
    />
  );
}
