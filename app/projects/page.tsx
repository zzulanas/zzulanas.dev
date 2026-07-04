import type { Metadata } from "next";
import { getSerializedPosts } from "@/lib/serialized";
import { PROJECTS } from "@/lib/data";
import { Desktop } from "@/components/desktop/desktop";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Zachary Zulanas — 3D Gaussian splatting, MCP servers, streaming SDKs, and AI tooling.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Zachary Zulanas",
    description:
      "Selected projects — 3D Gaussian splatting, MCP servers, streaming SDKs, and AI tooling.",
    url: "/projects",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const posts = await getSerializedPosts();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Zachary Zulanas",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.tagline,
        url: p.url,
        keywords: p.tech.join(", "),
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <Desktop posts={posts} initial={{ section: "projects", slug: null }} />
    </>
  );
}
