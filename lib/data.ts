export interface Project {
  name: string;
  tagline: string;
  description: string;
  url: string;
  urlLabel: string;
  date: string;
  tech: string[];
}

export const PROJECTS: Project[] = [
  {
    name: "Splat3D",
    tagline: "3D Gaussian Splatting in the browser",
    description:
      "A 0-to-1 platform that turns raw scene captures into interactive 3D Gaussian splats. GPU processing pipeline on Modal (gsplat + COLMAP) converts uploads into optimized .spz/.ply/.sog files, rendered in a React viewer at interactive frame rates. Full auth, scene ownership, and public sharing via Supabase, plus a public API for integrating the pipeline into other apps.",
    url: "https://splat-3d.com",
    urlLabel: "splat-3d.com",
    date: "2026",
    tech: ["TypeScript", "Next.js", "Modal", "gsplat", "COLMAP", "Supabase"],
  },
  {
    name: "QuantData MCP Server",
    tagline: "The official MCP server for QuantData's financial API",
    description:
      "Started as a reverse-engineering project against QuantData's web UI — an unofficial Model Context Protocol server exposing their market and options data to LLM clients through well-typed tool interfaces. QuantData adopted it as their official, documented MCP server; I owned the developer experience end to end (schema design, docs, ergonomics) under a paid contractor engagement.",
    url: "https://quantdata.us/api/docs/mcp-server",
    urlLabel: "quantdata.us/api/docs/mcp-server",
    date: "2026",
    tech: ["Python", "Model Context Protocol", "LLM tooling"],
  },
  {
    name: "zzulanas.dev",
    tagline: "This site",
    description:
      "A shader-forward personal site built on Next.js and Paper Shaders — cursor-reactive WebGL backdrops, adaptive light/dark theming, and MDX writing.",
    url: "https://github.com/zzulanas/zzulanas.dev",
    urlLabel: "source on github",
    date: "2026",
    tech: ["Next.js", "Tailwind", "Paper Shaders", "Motion"],
  },
];

export interface Experience {
  company: string;
  role: string;
  dates: string;
  summary: string;
  highlights: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "NBCUniversal — Peacock",
    role: "Senior Software Engineer",
    dates: "Nov 2025 — present",
    summary:
      "Core Video Streaming SDK — a backend-driven UI library in TypeScript serving millions of users across Android TV, Fire TV, and Vizio.",
    highlights: [
      "Own SDK ergonomics, public interfaces, and versioning across heterogeneous device runtimes",
      "Led the Optimizely A/B experimentation integration for server-side feature flagging",
      "Built LLM-assisted automated device testing across Fire TV and Android TV",
      "Contributed to an internal Shaka Player fork for playback performance on Kepler TVs",
    ],
  },
  {
    company: "NBCUniversal — Prism Portal",
    role: "Software Engineer",
    dates: "Sept 2024 — Nov 2025",
    summary:
      "0-to-1 product development of an enterprise AI chat platform serving thousands of internal users.",
    highlights: [
      "Owned architecture end to end: React/Next.js UI, GraphQL/REST APIs, RAG pipelines",
      "Moved real-time chat from WebSockets to Server-Sent Events for reliability at scale",
      "Context engineering and prompt optimization across the LLM layer",
      "CI/CD with Playwright E2E; telemetry via Datadog RUM",
    ],
  },
  {
    company: "NBCUniversal — AllRights",
    role: "Software Engineer",
    dates: "May 2022 — Sept 2024",
    summary:
      "Legal IP management platform: developer-facing Rights API and cloud infrastructure.",
    highlights: [
      "Designed a Rights API with FastAPI + AWS API Gateway, OpenAPI-documented for self-service",
      "Architected AWS infra (ECS, RDS, Lambda) with Terraform and CDK; led database migration tooling",
    ],
  },
  {
    company: "BNY Mellon",
    role: "Infrastructure Engineer",
    dates: "Aug 2021 — May 2022",
    summary:
      "Centralized Grafana dashboard management with versioning and CI/CD-driven deployments (Spring Boot, Angular).",
    highlights: [],
  },
];

export const BIO: string[] = [
  "Zach is a software engineer living in Brooklyn, NY, originally from California. He spends his days building streaming SDKs at Peacock and his nights on side projects that usually involve GPUs, LLMs, or both.",
  "Five years across full-stack web, AI platforms, and most recently streaming SDK development. He likes owning things end to end — the architecture, the ergonomics, the docs — and shipping fast with small teams.",
  "Off the keyboard you'll find him rock climbing (mostly indoors, occasionally spraining ankles), taking photos, or poking at whatever new tool caught his attention this week.",
];

export const EDUCATION = {
  school: "UC Santa Cruz",
  degree: "B.S. Computer Science",
  dates: "2017 — 2021",
  note: "AWS Solutions Architect Associate certified — a story involving a sprained ankle, told in the writing section.",
};

export const SOCIAL_LINKS = [
  { label: "github", href: "https://github.com/zzulanas" },
  { label: "linkedin", href: "https://linkedin.com/in/zzulanas" },
  { label: "instagram", href: "https://instagram.com/zachshotz" },
  { label: "email", href: "mailto:zzulanas@gmail.com" },
];
