// Pure, client-safe mapping between the desktop's open state and the URL.
// Terminal is intentionally not routable — it stays at whatever path is current.

export type RouteSection = "writing" | "projects" | "about";

export type Route = {
  section: RouteSection | null;
  slug: string | null;
};

export function routeToPath({ section, slug }: Route): string {
  if (section === "writing") return slug ? `/writing/${slug}` : "/writing";
  if (section === "projects") return "/projects";
  if (section === "about") return "/about";
  return "/";
}

export function pathToRoute(pathname: string): Route {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  if (parts[0] === "writing")
    return { section: "writing", slug: parts[1] ?? null };
  if (parts[0] === "projects") return { section: "projects", slug: null };
  if (parts[0] === "about") return { section: "about", slug: null };
  return { section: null, slug: null };
}
