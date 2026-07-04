"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BIO, EXPERIENCE, EDUCATION, SOCIAL_LINKS } from "@/lib/data";
import profile from "@/public/IMG_5891.jpg";

export function AboutView() {
  return (
    <div className="h-full overflow-y-auto px-6 py-7 sm:px-8">
      <p className="font-mono text-[0.6rem] tracking-[0.4em] text-muted uppercase">
        03 / about
      </p>
      <h2 className="font-major mt-2 mb-6 text-2xl font-normal tracking-wide">
        about
      </h2>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Image
          src={profile}
          alt="Zach Zulanas"
          className="glass w-40 shrink-0 rounded-2xl object-cover"
          placeholder="blur"
        />
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          {BIO.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <section className="mt-12">
        <h3 className="font-mono text-[0.6rem] tracking-[0.4em] text-muted uppercase">
          experience
        </h3>
        <div className="mt-6 flex flex-col gap-8 border-l border-line pl-6">
          {EXPERIENCE.map((e) => (
            <div key={e.company + e.dates} className="relative">
              <span className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h4 className="font-display text-lg font-light tracking-wide">
                  {e.company}
                </h4>
                <span className="font-mono text-xs text-muted">{e.dates}</span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-accent/90">{e.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {e.summary}
              </p>
              {e.highlights.length > 0 && (
                <ul className="mt-2 space-y-1.5 text-sm text-muted">
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
            <span className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-line" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h4 className="font-display text-lg font-light tracking-wide">
                {EDUCATION.school}
              </h4>
              <span className="font-mono text-xs text-muted">
                {EDUCATION.dates}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-accent/90">
              {EDUCATION.degree}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {EDUCATION.note}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h3 className="font-mono text-[0.6rem] tracking-[0.4em] text-muted uppercase">
          elsewhere
        </h3>
        <div className="mt-5 flex flex-wrap gap-3">
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
    </div>
  );
}
