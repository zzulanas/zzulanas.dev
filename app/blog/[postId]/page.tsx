import getFormattedDate from "@/lib/get-formatted-date";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import styles from "@/components/post/markdown-styles.module.css";

export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta();

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`);
  console.log(post);

  if (!post) notFound();

  const { meta, content } = post;

  const pubDate = getFormattedDate(meta.date);

  return (
    <>
      <div>
        <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
        <p className="mt-0 text-sm">{pubDate}</p>
        <article className={styles["markdown"]}>{content}</article>
        <p className="mb-10">
          <Link href="/blog">← Back to home</Link>
        </p>
      </div>
    </>
  );
}
