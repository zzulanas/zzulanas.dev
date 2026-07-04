import { SiteHeader } from "./site-header";

export function PageShell({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="aero-glow min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-28 sm:pt-24">
        <p className="font-mono text-[0.65rem] tracking-[0.4em] text-muted uppercase">
          {kicker}
        </p>
        <h1 className="font-major mt-3 text-4xl font-normal tracking-wide sm:text-5xl">
          {title}
        </h1>
        <div className="mt-14">{children}</div>
      </main>
    </div>
  );
}
