import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { Desktop } from "@/components/desktop/desktop";
import type { SerializedPost } from "@/components/desktop/writing-view";

export default async function Home() {
  const metas = getAllPosts();
  const posts: SerializedPost[] = await Promise.all(
    metas.map(async (m) => {
      const p = getPost(m.slug)!;
      const mdx = await serialize(p.content, {
        mdxOptions: {
          rehypePlugins: [rehypeSlug, rehypeHighlight],
        },
      });
      return {
        slug: m.slug,
        title: m.title,
        date: formatDate(m.date),
        tags: m.tags,
        mdx,
      };
    })
  );

  return <Desktop posts={posts} />;
}
