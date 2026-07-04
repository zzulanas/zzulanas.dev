export type WinKind = "terminal" | "projects" | "about" | "writing";

export const WIN_TITLES: Record<WinKind, string> = {
  terminal: "zach@zzulanas — ask",
  projects: "projects",
  about: "about",
  writing: "writing",
};

// default window box (desktop px)
export const WIN_DEFAULTS: Record<WinKind, { w: number; h: number }> = {
  terminal: { w: 660, h: 440 },
  projects: { w: 640, h: 560 },
  about: { w: 660, h: 600 },
  writing: { w: 620, h: 540 },
};
