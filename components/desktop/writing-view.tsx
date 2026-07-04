"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/components/mdx-components";

export type SerializedPost = {
  slug: string;
  title: string;
  date: string; // pre-formatted
  tags: string[];
  mdx: MDXRemoteSerializeResult;
};

export function WritingView({ posts }: { posts: SerializedPost[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const post = posts.find((p) => p.slug === openSlug) ?? null;

  if (post) {
    return (
      <div className="h-full overflow-y-auto px-6 py-7 sm:px-8">
        <button
          onClick={() => setOpenSlug(null)}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" /> writing
        </button>
        <h2 className="font-major mt-5 text-2xl font-normal tracking-wide text-balance">
          {post.title}
        </h2>
        <time className="mt-3 block font-mono text-xs text-muted">
          {post.date}
        </time>
        <article className="prose prose-sm dark:prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:font-light prose-headings:tracking-wide prose-a:text-accent prose-code:font-mono">
          <MDXRemote {...post.mdx} components={mdxComponents} />
        </article>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-6 py-7 sm:px-8">
      <p className="font-mono text-[0.6rem] tracking-[0.4em] text-muted uppercase">
        01 / writing
      </p>
      <h2 className="font-major mt-2 mb-4 text-2xl font-normal tracking-wide">
        writing
      </h2>
      <div className="flex flex-col">
        {posts.map((p) => (
          <button
            key={p.slug}
            onClick={() => setOpenSlug(p.slug)}
            className="group border-b border-line py-6 text-left first:pt-2"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-xl font-light tracking-wide transition-colors group-hover:text-accent">
                {p.title}
              </h3>
              <time className="shrink-0 font-mono text-xs text-muted">
                {p.date}
              </time>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
