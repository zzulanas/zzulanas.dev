import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPost, formatDate } from "./posts";
import type { SerializedPost } from "@/components/desktop/writing-view";

// Render every post to a server-rendered React node. The node is passed
// through the client <Desktop> boundary as a prop (the supported "server
// content as a prop" pattern), so the open post is real SSR HTML — good for
// SEO — while the client shell stays interactive with no client-side eval.
// Plain markdown via react-markdown: no JSX/expression semantics, raw HTML
// is skipped, so arbitrary journal notes can never break the build.
export function getSerializedPosts(): SerializedPost[] {
  return getAllPosts().map((m) => {
    const p = getPost(m.slug)!;
    return {
      slug: m.slug,
      title: m.title,
      date: formatDate(m.date),
      tags: m.tags,
      body: (
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeHighlight]}
        >
          {p.content}
        </Markdown>
      ),
    };
  });
}
