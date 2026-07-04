"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ShaderBackdrop, type ShaderKind } from "@/components/shader-backdrop";
import { ThemeToggle } from "@/components/theme-toggle";
import { Window } from "./window";
import { TerminalView } from "./terminal-view";
import { ProjectsView } from "./projects-view";
import { AboutView } from "./about-view";
import { WritingView, type SerializedPost } from "./writing-view";
import { WIN_TITLES, WIN_DEFAULTS, type WinKind } from "./types";

const DISPLAY_FONT =
  "var(--font-major-mono), ui-sans-serif, system-ui, sans-serif";

const SECTIONS: { index: string; label: string; kind: WinKind }[] = [
  { index: "01", label: "writing", kind: "writing" },
  { index: "02", label: "projects", kind: "projects" },
  { index: "03", label: "about", kind: "about" },
];

const SOCIALS = [
  { href: "https://github.com/zzulanas", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/zzulanas", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:zzulanas@gmail.com", icon: Mail, label: "Email" },
];

type Win = {
  id: number;
  kind: WinKind;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  min: boolean;
  max: boolean;
};

export function Desktop({ posts }: { posts: SerializedPost[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [vis, setVis] = useState<ShaderKind>("water-dither");
  const [wins, setWins] = useState<Win[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const idc = useRef(0);
  const zc = useRef(20);

  useEffect(() => {
    setMounted(true);
    const v = new URLSearchParams(window.location.search).get("vis");
    if (v) setVis(v as ShaderKind);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const focus = useCallback((id: number) => {
    zc.current += 1;
    const z = zc.current;
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
  }, []);

  const open = useCallback((kind: WinKind) => {
    setWins((prev) => {
      zc.current += 1;
      const z = zc.current;
      const existing = prev.find((w) => w.kind === kind);
      if (existing)
        return prev.map((w) =>
          w.id === existing.id ? { ...w, z, min: false } : w
        );
      const d = WIN_DEFAULTS[kind];
      const n = prev.length;
      return [
        ...prev,
        {
          id: ++idc.current,
          kind,
          z,
          x: 200 + n * 32,
          y: 116 + n * 30,
          w: d.w,
          h: d.h,
          min: false,
          max: false,
        },
      ];
    });
  }, []);

  const close = useCallback(
    (id: number) => setWins((p) => p.filter((w) => w.id !== id)),
    []
  );
  const toggleMin = useCallback(
    (id: number) => {
      focus(id);
      setWins((p) => p.map((w) => (w.id === id ? { ...w, min: !w.min } : w)));
    },
    [focus]
  );
  const toggleMax = useCallback(
    (id: number) => {
      focus(id);
      setWins((p) => p.map((w) => (w.id === id ? { ...w, max: !w.max } : w)));
    },
    [focus]
  );
  const move = useCallback(
    (id: number, x: number, y: number) =>
      setWins((p) => p.map((w) => (w.id === id ? { ...w, x, y } : w))),
    []
  );

  const renderBody = (kind: WinKind) => {
    switch (kind) {
      case "terminal":
        return <TerminalView onOpen={open} />;
      case "projects":
        return <ProjectsView />;
      case "about":
        return <AboutView />;
      case "writing":
        return <WritingView posts={posts} />;
    }
  };

  return (
    <main className="relative h-dvh overflow-hidden">
      {mounted && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <ShaderBackdrop kind={vis} dark={resolvedTheme === "dark"} />
        </motion.div>
      )}

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(64rem 36rem at 28% 78%, color-mix(in srgb, var(--bg) 55%, transparent), transparent 72%)",
        }}
      />

      {/* directory / launcher (desktop wallpaper text) */}
      <div
        className="pointer-events-none relative z-[5] flex h-full flex-col justify-end px-6 pb-32 sm:px-14 sm:pb-36"
        style={{ fontFamily: DISPLAY_FONT }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-mono text-[0.65rem] tracking-[0.45em] text-muted uppercase sm:text-xs"
        >
          software engineer · brooklyn, ny
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-[clamp(2rem,5.5vw,4.4rem)] leading-[1.05] font-normal tracking-[0.02em] text-balance"
        >
          zachary zulanas
        </motion.h1>
        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row sm:gap-12"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.kind}
              onClick={() => open(s.kind)}
              className="group flex items-baseline gap-3 text-2xl font-light tracking-wide text-fg/85 transition-colors hover:text-accent sm:text-3xl"
            >
              <span className="font-mono text-[0.6rem] tracking-[0.25em] text-muted transition-colors group-hover:text-accent">
                {s.index}
              </span>
              <span className="relative">
                {s.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight className="size-4 self-center opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </button>
          ))}
        </motion.nav>
      </div>

      {/* windows */}
      {wins.map((w) => (
        <Window
          key={w.id}
          chrome={{
            title: WIN_TITLES[w.kind],
            z: w.z,
            x: w.x,
            y: w.y,
            w: w.w,
            h: w.h,
            minimized: w.min,
            maximized: w.max,
            isDesktop,
            onFocus: () => focus(w.id),
            onClose: () => close(w.id),
            onMinimize: () => toggleMin(w.id),
            onMaximize: () => toggleMax(w.id),
            onMove: (x, y) => move(w.id, x, y),
          }}
        >
          {renderBody(w.kind)}
        </Window>
      ))}

      {/* top bar */}
      <header className="absolute inset-x-0 top-0 z-[9999] flex items-center justify-between p-6 sm:p-8">
        <span className="font-mono text-xs tracking-[0.35em] text-muted uppercase">
          zzulanas.dev
        </span>
        <ThemeToggle />
      </header>

      {/* bottom bar */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-[9999] flex items-end justify-between p-6 sm:p-8">
        <button
          onClick={() => open("terminal")}
          className="glass group pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-widest text-muted transition-colors hover:text-accent"
        >
          <span className="text-accent">&gt;_</span>
          <span>terminal</span>
          <span className="ml-0.5 hidden opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
            ask me anything
          </span>
        </button>
        <div className="pointer-events-auto flex items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="glass flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <s.icon className="size-4" />
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
