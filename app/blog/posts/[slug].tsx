import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "@/components/post/post-body";
import PostHeader from "@/components/post/post-header";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import PostTitle from "@/components/post/post-title";
import Head from "next/head";
import markdownToHtml from "@/lib/markdownToHtml";
import type PostType from "@/interfaces/post";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  const title = `${post.title} | zach zulanas`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{title}</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}