import { getSerializedPosts } from "@/lib/serialized";
import { Desktop } from "@/components/desktop/desktop";

export default async function Home() {
  const posts = await getSerializedPosts();
  return <Desktop posts={posts} initial={{ section: null, slug: null }} />;
}
