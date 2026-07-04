"use client";

import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";

export function ProjectsView() {
  return (
    <div className="h-full overflow-y-auto px-6 py-7 sm:px-8">
      <p className="font-mono text-[0.6rem] tracking-[0.4em] text-muted uppercase">
        02 / projects
      </p>
      <h2 className="font-major mt-2 mb-6 text-2xl font-normal tracking-wide">
        projects
      </h2>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group glass block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-light tracking-wide transition-colors group-hover:text-accent">
                {p.name}
              </h3>
              <span className="font-mono text-xs text-muted">{p.date}</span>
            </div>
            <p className="mt-1 font-mono text-xs tracking-wide text-accent/90">
              {p.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {p.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-muted"
                >
                  {t}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                {p.urlLabel}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
