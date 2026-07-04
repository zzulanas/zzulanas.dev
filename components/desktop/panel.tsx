"use client";

export function Panel({
  title,
  minimized,
  maximized,
  onClose,
  onMinimize,
  onMaximize,
  children,
}: {
  title: string;
  minimized: boolean;
  maximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
}) {
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div
      className={`glass-frost flex ${minimized ? "" : "h-full"} min-h-0 flex-col overflow-hidden rounded-xl`}
    >
      {/* title bar (click to expand when minimized) */}
      <div
        className="flex items-center gap-2 border-b border-line px-4 py-2.5"
        onClick={minimized ? onMinimize : undefined}
      >
        <div className="group/win flex items-center gap-2">
          <button
            type="button"
            aria-label="close"
            title="close"
            onClick={stop(onClose)}
            className="grid size-3 place-items-center rounded-full bg-red-400/80 text-[8px] leading-none font-bold text-black/50 hover:bg-red-400"
          >
            <span className="opacity-0 group-hover/win:opacity-100">✕</span>
          </button>
          <button
            type="button"
            aria-label={minimized ? "expand" : "minimize"}
            title={minimized ? "expand" : "minimize"}
            onClick={stop(onMinimize)}
            className="grid size-3 place-items-center rounded-full bg-yellow-400/80 text-[9px] leading-none font-bold text-black/50 hover:bg-yellow-400"
          >
            <span className="opacity-0 group-hover/win:opacity-100">
              {minimized ? "+" : "–"}
            </span>
          </button>
          <button
            type="button"
            aria-label={maximized ? "restore" : "maximize"}
            title={maximized ? "restore" : "maximize"}
            onClick={stop(onMaximize)}
            className="grid size-3 place-items-center rounded-full bg-green-400/80 text-[8px] leading-none font-bold text-black/50 hover:bg-green-400"
          >
            <span className="opacity-0 group-hover/win:opacity-100">
              {maximized ? "⤡" : "⤢"}
            </span>
          </button>
        </div>
        <span className="ml-2 truncate font-mono text-xs text-muted">
          {title}
        </span>
        <span className="ml-auto font-mono text-[0.7rem] text-muted/70">
          {minimized ? "click to expand" : "esc to close"}
        </span>
      </div>

      {/* body */}
      <div hidden={minimized} className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
