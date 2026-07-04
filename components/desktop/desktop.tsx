"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { ShaderBackdrop, type ShaderKind } from "@/components/shader-backdrop";
import { ThemeToggle } from "@/components/theme-toggle";
import { Panel } from "./panel";
import { TerminalView } from "./terminal-view";
import { ProjectsView } from "./projects-view";
import { AboutView } from "./about-view";
import { WritingView, type SerializedPost } from "./writing-view";
import { WIN_TITLES, type WinKind } from "./types";
import { pathToRoute, routeToPath, type Route } from "./routing";

const DISPLAY_FONT =
  "var(--font-major-mono), ui-sans-serif, system-ui, sans-serif";

const SECTIONS: { label: string; kind: WinKind; key: string }[] = [
  { label: "writing", kind: "writing", key: "w" },
  { label: "projects", kind: "projects", key: "p" },
  { label: "about", kind: "about", key: "a" },
];

// slight shader hue shift per open page (deg); terminal + none stay neutral
const PAGE_HUE: Partial<Record<WinKind, number>> = {
  writing: -18,
  projects: 22,
  about: 48,
};

const SOCIALS = [
  { href: "https://github.com/zzulanas", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/zzulanas", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:zzulanas@gmail.com", icon: Mail, label: "Email" },
];

type WinState = "normal" | "min" | "max";

export function Desktop({
  posts,
  initial = { section: null, slug: null },
}: {
  posts: SerializedPost[];
  initial?: Route;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [vis, setVis] = useState<ShaderKind>("water");
  const [open, setOpen] = useState<WinKind | null>(initial.section);
  const [slug, setSlug] = useState<string | null>(initial.slug);
  const [win, setWin] = useState<WinState>("normal");
  const paneRef = useRef<HTMLDivElement>(null);

  // cursor parallax for the shader — gentle drift opposite the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.6 });
  const shiftX = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const shiftY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const onPointer = (e: React.PointerEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  useEffect(() => {
    setMounted(true);
    const v = new URLSearchParams(window.location.search).get("vis");
    if (v) setVis(v as ShaderKind);
  }, []);

  // Keep the URL in sync with the open pane using the native History API so we
  // never trigger a Next navigation (the shader canvas stays mounted). Terminal
  // isn't routable — it maps to whatever section path is current. We only push
  // when the computed path actually differs, which also makes popstate a no-op
  // here (it sets state to already match location, so nothing re-pushes).
  useEffect(() => {
    if (!mounted) return;
    if (open === "terminal") return; // terminal keeps the current path
    const section =
      open === "writing" || open === "projects" || open === "about"
        ? open
        : null;
    const path = routeToPath({
      section,
      slug: section === "writing" ? slug : null,
    });
    if (path !== window.location.pathname) {
      // preserve query params like ?vis=
      window.history.pushState(null, "", path + window.location.search);
    }
  }, [mounted, open, slug]);

  // Browser back/forward: reflect the URL back into pane state.
  useEffect(() => {
    const onPop = () => {
      const r = pathToRoute(window.location.pathname);
      setOpen(r.section);
      setSlug(r.slug);
      setWin("normal");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // click outside the open pane closes it (launchers/chrome opt out via data-keep)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      if (paneRef.current?.contains(t)) return;
      if (t.closest("[data-keep]")) return;
      setOpen(null);
      setSlug(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // keyboard shortcuts: '/' toggles terminal, w/p/a open pages, esc closes.
  // ignored while typing in an input (e.g. the terminal).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable);
      if (e.key === "Escape") {
        setOpen(null);
        setSlug(null);
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        setOpen((c) => (c === "terminal" ? null : "terminal"));
        setSlug(null);
        setWin("normal");
      } else if (e.key === "w") {
        setOpen("writing");
        setSlug(null);
        setWin("normal");
      } else if (e.key === "p") {
        setOpen("projects");
        setSlug(null);
        setWin("normal");
      } else if (e.key === "a") {
        setOpen("about");
        setSlug(null);
        setWin("normal");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shaderHue = open && PAGE_HUE[open] !== undefined ? PAGE_HUE[open]! : 0;

  const launch = (kind: WinKind) => {
    // clicking the active launcher (while not minimized) closes it
    if (open === kind && win !== "min") {
      setOpen(null);
      setSlug(null);
      return;
    }
    setOpen(kind);
    setSlug(null);
    setWin("normal");
  };
  const close = () => {
    setOpen(null);
    setSlug(null);
    setWin("normal");
  };
  const toggleMin = () => setWin((s) => (s === "min" ? "normal" : "min"));
  const toggleMax = () => setWin((s) => (s === "max" ? "normal" : "max"));

  const hideHero = open !== null && win !== "min";

  const paneClass =
    win === "min"
      ? "absolute z-30 bottom-24 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-20 sm:w-80"
      : win === "max"
        ? "absolute z-30 inset-x-4 top-20 bottom-24 sm:inset-x-8 sm:top-20 sm:bottom-12"
        : "absolute z-30 inset-x-4 top-20 bottom-24 sm:inset-x-auto sm:top-24 sm:right-8 sm:bottom-12 sm:w-[46vw] sm:max-w-2xl";

  const renderView = (kind: WinKind) => {
    switch (kind) {
      case "terminal":
        return <TerminalView onOpen={launch} />;
      case "projects":
        return <ProjectsView />;
      case "about":
        return <AboutView />;
      case "writing":
        return (
          <WritingView posts={posts} openSlug={slug} onOpenSlug={setSlug} />
        );
    }
  };

  return (
    <main className="relative h-dvh overflow-hidden" onPointerMove={onPointer}>
      {mounted && (
        <motion.div
          className="absolute -inset-12"
          style={{ x: shiftX, y: shiftY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{
            opacity: 1,
            scale: open ? 1.09 : 1.04,
            filter: `hue-rotate(${shaderHue}deg)`,
          }}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          }}
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

      {/* top bar */}
      <header
        data-keep
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-6 sm:p-8"
      >
        <span className="font-mono text-xs tracking-[0.35em] text-muted uppercase">
          zzulanas.dev
        </span>
        <ThemeToggle />
      </header>

      {/* directory / launcher — dims (but stays visible + clickable) while a pane is open */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-32 sm:px-14 sm:pb-36"
        style={{ fontFamily: DISPLAY_FONT }}
        initial={false}
        animate={{
          opacity: hideHero ? 0.45 : 1,
          filter: hideHero ? "blur(1.5px)" : "blur(0px)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
          data-keep
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-12"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.kind}
              onClick={() => launch(s.kind)}
              className="group flex items-baseline gap-3 text-2xl font-light tracking-wide text-fg/85 transition-colors hover:text-accent sm:text-3xl"
            >
              <kbd className="self-center rounded border border-line px-1.5 py-0.5 font-mono text-xs leading-none text-muted transition-colors group-hover:border-accent/60 group-hover:text-accent">
                {s.key}
              </kbd>
              <span className="relative">
                {s.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          ))}
        </motion.nav>
      </motion.div>

      {/* right-side pane */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="pane"
            ref={paneRef}
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={paneClass}
          >
            <Panel
              title={WIN_TITLES[open]}
              minimized={win === "min"}
              maximized={win === "max"}
              onClose={close}
              onMinimize={toggleMin}
              onMaximize={toggleMax}
            >
              {renderView(open)}
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom bar */}
      <footer
        data-keep
        className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6 sm:p-8"
      >
        <button
          onClick={() => launch("terminal")}
          aria-expanded={open === "terminal"}
          className="glass group flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-widest text-muted transition-colors hover:text-accent"
        >
          <span className="text-accent">&gt;_</span>
          <span>{open === "terminal" ? "close" : "terminal"}</span>
          <span className="ml-0.5 hidden opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
            {open === "terminal" ? "esc" : "ask me anything"}
          </span>
          <kbd className="ml-1 rounded border border-line px-1 pb-px font-mono text-[0.6rem] leading-none text-muted/60">
            /
          </kbd>
        </button>
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
