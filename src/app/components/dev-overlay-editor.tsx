"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
  type CSSProperties,
} from "react";

// ---------------------------------------------------------------------------
// Shared keyboard listener (Ctrl+Shift+D) — single global handler
// ---------------------------------------------------------------------------
const activeListeners = new Set<() => void>();
let globalKeyListenerAttached = false;

function handleGlobalKey(e: KeyboardEvent) {
  if (e.ctrlKey && e.shiftKey && e.key === "D") {
    e.preventDefault();
    for (const cb of activeListeners) cb();
  }
}

function subscribeToggle(cb: () => void) {
  activeListeners.add(cb);
  if (!globalKeyListenerAttached) {
    window.addEventListener("keydown", handleGlobalKey);
    globalKeyListenerAttached = true;
  }
  return () => {
    activeListeners.delete(cb);
    if (activeListeners.size === 0) {
      window.removeEventListener("keydown", handleGlobalKey);
      globalKeyListenerAttached = false;
    }
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DevOverlayEditorProps {
  id: string;
  /** "px" (default) — absolute pixel values. "percent" — percentage of parent. */
  mode?: "px" | "percent";
  initialX?: number;
  initialY?: number;
  initialW?: number;
  initialH?: number;
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Public component — tree-shaken in production
// ---------------------------------------------------------------------------
export function DevOverlayEditor(props: DevOverlayEditorProps) {
  if (process.env.NODE_ENV !== "development") {
    return <>{props.children}</>;
  }
  return <DevOverlayEditorInner {...props} />;
}

// ---------------------------------------------------------------------------
// Internal editor (dev only)
// ---------------------------------------------------------------------------
function DevOverlayEditorInner({
  id,
  mode = "px",
  initialX,
  initialY,
  initialW,
  initialH,
  children,
}: DevOverlayEditorProps) {
  const measuredRef = useRef<HTMLElement | null>(null);
  const parentRef = useRef<HTMLElement | null>(null);
  const hasInitials =
    initialX != null && initialY != null && initialW != null && initialH != null;
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState(
    hasInitials
      ? { x: initialX!, y: initialY!, w: initialW!, h: initialH! }
      : null,
  );
  const [copied, setCopied] = useState(false);
  const [drag, setDrag] = useState<{
    type: "move" | "resize";
    corner?: string;
    mx: number;
    my: number;
    origin: { x: number; y: number; w: number; h: number };
  } | null>(null);

  // Toggle editor with Ctrl+Shift+D — shared global listener
  useEffect(() => {
    return subscribeToggle(() => setActive((prev) => !prev));
  }, []);

  // Measure the child element's position via a marker span → next sibling.
  const markerRef = useCallback(
    (node: HTMLSpanElement | null) => {
      if (node) {
        const sibling = node.nextElementSibling as HTMLElement | null;
        if (sibling) {
          measuredRef.current = sibling;
          parentRef.current = sibling.offsetParent as HTMLElement | null;
        }
      }
    },
    [],
  );

  // Read initial position from DOM when activating (if no initial values)
  useEffect(() => {
    if (active && !pos && measuredRef.current) {
      const el = measuredRef.current;
      parentRef.current = el.offsetParent as HTMLElement | null;
      setPos({
        x: el.offsetLeft,
        y: el.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
      });
    }
  }, [active, pos]);

  // Global mouse move/up for drag & resize
  useEffect(() => {
    if (!drag) return;

    const onMove = (e: globalThis.MouseEvent) => {
      const dx = e.clientX - drag.mx;
      const dy = e.clientY - drag.my;
      const o = drag.origin;

      if (drag.type === "move") {
        setPos({ x: o.x + dx, y: o.y + dy, w: o.w, h: o.h });
      } else {
        const next = { ...o };
        if (drag.corner?.includes("e")) next.w = Math.max(16, o.w + dx);
        if (drag.corner?.includes("s")) next.h = Math.max(16, o.h + dy);
        if (drag.corner?.includes("w")) {
          next.x = o.x + dx;
          next.w = Math.max(16, o.w - dx);
        }
        if (drag.corner?.includes("n")) {
          next.y = o.y + dy;
          next.h = Math.max(16, o.h - dy);
        }
        setPos(next);
      }
    };

    const onUp = () => setDrag(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag]);

  // ---------------------------------------------------------------------------
  // Helpers: percentage conversions
  // ---------------------------------------------------------------------------
  function getParentSize(): { pw: number; ph: number } {
    if (parentRef.current) {
      return { pw: parentRef.current.clientWidth, ph: parentRef.current.clientHeight };
    }
    return { pw: 1, ph: 1 }; // fallback to avoid division by zero
  }

  function pct(value: number, base: number, decimals = 1): string {
    return ((value / base) * 100).toFixed(decimals);
  }

  // ---------------------------------------------------------------------------
  // Inactive: render children directly (no wrapper) to preserve mix-blend-mode.
  // ---------------------------------------------------------------------------
  if (!active || !pos) {
    return (
      <>
        <span ref={markerRef} style={{ display: "none" }} />
        {children}
      </>
    );
  }

  const onDragStart = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag({ type: "move", mx: e.clientX, my: e.clientY, origin: pos });
  };

  const onResizeStart = (corner: string) => (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag({ type: "resize", corner, mx: e.clientX, my: e.clientY, origin: pos });
  };

  const handle: CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    background: "cyan",
    border: "1px solid rgba(0,0,40,0.5)",
    zIndex: 10000,
  };

  // Pixel values (always computed)
  const px = Math.round(pos.x);
  const py = Math.round(pos.y);
  const pw = Math.round(pos.w);
  const ph = Math.round(pos.h);

  // Percentage values (always computed for label)
  const parent = getParentSize();
  const pctL = pct(pos.x, parent.pw);
  const pctT = pct(pos.y, parent.ph);
  const pctW = pct(pos.w, parent.pw);
  const pctH = pct(pos.h, parent.ph);

  // Label text
  const pxLabel = `left-[${px}px] top-[${py}px] w-[${pw}px] h-[${ph}px]`;
  const pctLabel = `${pctL}% / ${pctT}% / ${pctW}% / ${pctH}%`;
  const label = `${id}: ${pxLabel} | ${pctLabel}`;

  // Copy text depends on mode
  function getCopyText(): string {
    if (mode === "percent") {
      return `left-[${pctL}%] top-[${pctT}%] w-[${pctW}%] h-[${pctH}%]`;
    }
    return `left-[${px}px] top-[${py}px] w-[${pw}px] h-[${ph}px]`;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: pos.w,
        height: pos.h,
        cursor: drag?.type === "move" ? "grabbing" : "grab",
        zIndex: 9999,
      }}
      onMouseDown={onDragStart}
    >
      {/* Force direct child to fill this container, overriding Tailwind positioning */}
      <style>{`[data-dev-editor="${id}"] > * { position: absolute !important; inset: 0 !important; width: auto !important; height: auto !important; transform: none !important; }`}</style>

      {/* Overlay content */}
      <div data-dev-editor={id} style={{ position: "absolute", inset: 0 }}>
        {children}
      </div>

      {/* Editor border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1px dashed cyan",
          pointerEvents: "none",
        }}
      />

      {/* Label — click to copy Tailwind classes */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(getCopyText());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        style={{
          position: "absolute",
          top: -22,
          left: 0,
          fontSize: 11,
          fontFamily: "monospace",
          color: copied ? "#0f0" : "cyan",
          background: "rgba(0,0,0,0.85)",
          padding: "2px 6px",
          borderRadius: 3,
          whiteSpace: "nowrap",
          pointerEvents: "auto",
          cursor: "pointer",
          zIndex: 10001,
          lineHeight: "1.3",
          transition: "color 0.15s",
        }}
      >
        {copied ? "Copied!" : label}
      </div>

      {/* Corner resize handles */}
      <div onMouseDown={onResizeStart("nw")} style={{ ...handle, top: -4, left: -4, cursor: "nw-resize" }} />
      <div onMouseDown={onResizeStart("ne")} style={{ ...handle, top: -4, right: -4, cursor: "ne-resize" }} />
      <div onMouseDown={onResizeStart("sw")} style={{ ...handle, bottom: -4, left: -4, cursor: "sw-resize" }} />
      <div onMouseDown={onResizeStart("se")} style={{ ...handle, bottom: -4, right: -4, cursor: "se-resize" }} />

      {/* Edge resize handles */}
      <div onMouseDown={onResizeStart("n")} style={{ ...handle, top: -4, left: "calc(50% - 4px)", cursor: "n-resize" }} />
      <div onMouseDown={onResizeStart("s")} style={{ ...handle, bottom: -4, left: "calc(50% - 4px)", cursor: "s-resize" }} />
      <div onMouseDown={onResizeStart("w")} style={{ ...handle, left: -4, top: "calc(50% - 4px)", cursor: "w-resize" }} />
      <div onMouseDown={onResizeStart("e")} style={{ ...handle, right: -4, top: "calc(50% - 4px)", cursor: "e-resize" }} />
    </div>
  );
}
