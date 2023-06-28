import MoreStories from "@/components/post/more-posts";
import type PostType from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";

export default async function Blog() {
  const allPosts: PostType[] = await getPosts();
  return (
    <div className="justify-center">
      <MoreStories posts={allPosts} />
    </div>
  );
}

async function getPosts(): Promise<PostType[]> {
  const allPosts = await getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  //@ts-ignore
  return allPosts;
}
