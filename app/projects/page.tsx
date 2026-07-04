import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "projects",
  description: "Things Zach has built recently.",
};

export default function ProjectsPage() {
  return (
    <PageShell kicker="02" title="projects">
      <div className="flex flex-col gap-6">
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group glass block rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 sm:p-9"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-3xl font-light tracking-wide group-hover:text-accent transition-colors">
                {p.name}
              </h2>
              <span className="font-mono text-xs text-muted">{p.date}</span>
            </div>
            <p className="mt-1 font-mono text-xs tracking-wide text-accent/90">
              {p.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {p.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
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
    </PageShell>
  );
}
