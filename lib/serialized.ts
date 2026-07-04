import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPost, formatDate } from "./posts";
import { mdxComponents } from "@/components/mdx-components";
import type { SerializedPost } from "@/components/desktop/writing-view";

// Render every post's MDX to a server-rendered React node. The node is passed
// through the client <Desktop> boundary as a prop (the supported "server
// content as a prop" pattern), so the open post is real SSR HTML — good for
// SEO — while the client shell stays interactive with no client-side MDX eval.
export async function getSerializedPosts(): Promise<SerializedPost[]> {
  const metas = getAllPosts();
  return Promise.all(
    metas.map(async (m) => {
      const p = getPost(m.slug)!;
      const { content } = await compileMDX({
        source: p.content,
        options: {
          mdxOptions: { rehypePlugins: [rehypeSlug, rehypeHighlight] },
        },
        components: mdxComponents,
      });
      return {
        slug: m.slug,
        title: m.title,
        date: formatDate(m.date),
        tags: m.tags,
        body: content,
      };
    })
  );
}
