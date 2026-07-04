"use client";

import { useRef } from "react";

export type WindowChrome = {
  title: string;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  maximized: boolean;
  isDesktop: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
};

export function Window({
  chrome,
  children,
}: {
  chrome: WindowChrome;
  children: React.ReactNode;
}) {
  const { title, z, x, y, w, h, minimized, maximized, isDesktop } = chrome;
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );

  const startDrag = (e: React.PointerEvent) => {
    if (!isDesktop || maximized) return;
    chrome.onFocus();
    drag.current = { sx: e.clientX, sy: e.clientY, ox: x, oy: y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onDrag = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const nx = drag.current.ox + (e.clientX - drag.current.sx);
    const ny = drag.current.oy + (e.clientY - drag.current.sy);
    const maxX = window.innerWidth - 90;
    const maxY = window.innerHeight - 70;
    chrome.onMove(
      Math.min(Math.max(nx, -w + 120), maxX),
      Math.min(Math.max(ny, 8), maxY)
    );
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!drag.current) return;
    drag.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const style: React.CSSProperties = { zIndex: z };
  if (!isDesktop) {
    Object.assign(style, { left: 12, right: 12, top: 72, bottom: 88 });
    if (minimized) Object.assign(style, { bottom: "auto", height: "auto" });
  } else if (maximized) {
    Object.assign(style, { left: 24, right: 24, top: 80, bottom: 52 });
  } else {
    Object.assign(style, {
      left: x,
      top: y,
      width: w,
      height: minimized ? "auto" : h,
    });
  }

  const stop = (fn?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn?.();
  };

  return (
    <div
      className="glass-frost absolute flex min-h-0 flex-col overflow-hidden rounded-xl"
      style={style}
      onMouseDown={chrome.onFocus}
    >
      {/* title bar / drag handle */}
      <div
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onDoubleClick={chrome.onMaximize}
        className={`flex select-none items-center gap-2 border-b border-line px-4 py-2.5 ${
          isDesktop && !maximized ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <div className="group/win flex items-center gap-2">
          <button
            type="button"
            aria-label="close"
            title="close"
            onClick={stop(chrome.onClose)}
            className="grid size-3 place-items-center rounded-full bg-red-400/80 text-[8px] leading-none font-bold text-black/50 hover:bg-red-400"
          >
            <span className="opacity-0 group-hover/win:opacity-100">✕</span>
          </button>
          <button
            type="button"
            aria-label={minimized ? "expand" : "minimize"}
            title={minimized ? "expand" : "minimize"}
            onClick={stop(chrome.onMinimize)}
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
            onClick={stop(chrome.onMaximize)}
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
      </div>

      {/* body */}
      <div hidden={minimized} className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
