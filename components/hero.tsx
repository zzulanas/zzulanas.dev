"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ShaderBackdrop } from "./shader-backdrop";
import { ThemeToggle } from "./theme-toggle";

// locked-in display face for the hero: Major Mono Display (all-caps circular mono)
const DISPLAY_FONT = "var(--font-major-mono), ui-sans-serif, system-ui, sans-serif";

const SECTIONS = [
  { index: "01", label: "writing", href: "/writing" },
  { index: "02", label: "projects", href: "/projects" },
  { index: "03", label: "about", href: "/about" },
];

const SOCIALS = [
  { href: "https://github.com/zzulanas", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/zzulanas", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:zzulanas@gmail.com", icon: Mail, label: "Email" },
];

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative h-dvh overflow-hidden">
      {mounted && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <ShaderBackdrop kind="water" dark={resolvedTheme === "dark"} />
        </motion.div>
      )}

      {/* soft vignette behind the lower-third type */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(64rem 36rem at 28% 78%, color-mix(in srgb, var(--bg) 55%, transparent), transparent 72%)",
        }}
      />

      {/* top bar */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-6 sm:p-8">
        <span className="font-mono text-xs tracking-[0.35em] text-muted uppercase">
          zzulanas.dev
        </span>
        <ThemeToggle />
      </header>

      {/* editorial lower-third, left-aligned */}
      <div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-32 sm:px-14 sm:pb-36"
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
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-12"
        >
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
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
            </Link>
          ))}
        </motion.nav>
      </div>

      {/* bottom bar */}
      <footer className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-end p-6 sm:p-8">
        <div className="flex items-center gap-2">
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
