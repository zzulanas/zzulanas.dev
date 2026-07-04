"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { label: "writing", href: "/writing" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 glass border-x-0 border-t-0">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.35em] text-muted uppercase transition-colors hover:text-fg"
        >
          zz
        </Link>
        <nav className="flex items-center gap-6">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-xs tracking-[0.2em] transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
