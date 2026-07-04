import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { EXPERIENCE, SOCIAL_LINKS } from "@/lib/data";
import profile from "@/public/IMG_5891.jpg";

export const metadata: Metadata = {
  title: "about",
  description: "About Zachary Zulanas — software engineer in Brooklyn, NY.",
};

export default function AboutPage() {
  return (
    <PageShell kicker="03" title="about">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
        <Image
          src={profile}
          alt="Zach Zulanas"
          className="glass w-44 rounded-2xl object-cover sm:w-52"
          placeholder="blur"
          priority
        />
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            hi, i&apos;m zach — a software engineer living in Brooklyn, NY,
            originally from California. i spend my days building streaming SDKs
            at Peacock and my nights on side projects that usually involve
            GPUs, LLMs, or both.
          </p>
          <p>
            five years across full-stack web, AI platforms, and most recently
            streaming SDK development. i like owning things end to end — the
            architecture, the ergonomics, the docs — and shipping fast with
            small teams.
          </p>
          <p>
            off the keyboard you&apos;ll find me rock climbing (mostly
            indoors, occasionally spraining ankles), taking photos, or poking
            at whatever new tool caught my attention this week.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-mono text-[0.65rem] tracking-[0.4em] text-muted uppercase">
          experience
        </h2>
        <div className="mt-8 flex flex-col gap-10 border-l border-line pl-6 sm:pl-8">
          {EXPERIENCE.map((e) => (
            <div key={e.company + e.dates} className="relative">
              <span className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-accent sm:-left-[calc(2rem+4.5px)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-xl font-light tracking-wide">
                  {e.company}
                </h3>
                <span className="font-mono text-xs text-muted">{e.dates}</span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-accent/90">{e.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {e.summary}
              </p>
              {e.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-line" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="relative">
            <span className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-line sm:-left-[calc(2rem+4.5px)]" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-xl font-light tracking-wide">
                UC Santa Cruz
              </h3>
              <span className="font-mono text-xs text-muted">2017 — 2021</span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-accent/90">
              B.S. Computer Science
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Also: AWS Solutions Architect Associate certified — a story
              involving a sprained ankle, told in the writing section.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[0.65rem] tracking-[0.4em] text-muted uppercase">
          elsewhere
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              {s.label}
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
