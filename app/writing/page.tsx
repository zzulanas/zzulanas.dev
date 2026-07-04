import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "writing",
  description: "Occasional writing about building things.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <PageShell kicker="01" title="writing">
      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group border-b border-line py-8 first:pt-0"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h2 className="font-display text-2xl font-light tracking-wide transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <time className="shrink-0 font-mono text-xs text-muted">
                {formatDate(post.date)}
              </time>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
