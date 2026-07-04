import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { mdxComponents } from "@/components/mdx-components";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.meta.title };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="aero-glow min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-28 sm:pt-24">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" />
          writing
        </Link>
        <h1 className="font-major mt-6 text-3xl font-normal tracking-wide text-balance sm:text-4xl">
          {post.meta.title}
        </h1>
        <time className="mt-4 block font-mono text-xs text-muted">
          {formatDate(post.meta.date)}
        </time>
        <article className="prose prose-sm dark:prose-invert mt-12 max-w-none prose-headings:font-display prose-headings:font-light prose-headings:tracking-wide prose-a:text-accent prose-code:font-mono">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight, rehypeSlug],
              },
            }}
          />
        </article>
      </main>
    </div>
  );
}
