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

interface DevOverlayEditorProps {
  id: string;
  initialX?: number;
  initialY?: number;
  initialW?: number;
  initialH?: number;
  children: ReactNode;
}

export function DevOverlayEditor(props: DevOverlayEditorProps) {
  if (process.env.NODE_ENV !== "development") {
    return <>{props.children}</>;
  }
  return <DevOverlayEditorInner {...props} />;
}

function DevOverlayEditorInner({
  id,
  initialX,
  initialY,
  initialW,
  initialH,
  children,
}: DevOverlayEditorProps) {
  const measuredRef = useRef<HTMLElement | null>(null);
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

  // Toggle editor with Ctrl+Shift+D
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setActive((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Measure the child element's position via a MutationObserver-free approach:
  // a data attribute is placed on a marker span, then we find the next sibling.
  const markerRef = useCallback(
    (node: HTMLSpanElement | null) => {
      if (node) {
        const sibling = node.nextElementSibling as HTMLElement | null;
        if (sibling) measuredRef.current = sibling;
      }
    },
    [],
  );

  // Read initial position from DOM when activating (if no initial values)
  useEffect(() => {
    if (active && !pos && measuredRef.current) {
      const el = measuredRef.current;
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

  // Inactive: render children directly (no wrapper div) to preserve mix-blend-mode.
  // A hidden marker span is used for DOM measurement when activating.
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
          const x = Math.round(pos.x);
          const y = Math.round(pos.y);
          const w = Math.round(pos.w);
          const h = Math.round(pos.h);
          const tw = `left-[${x}px] top-[${y}px] w-[${w}px] h-[${h}px]`;
          navigator.clipboard.writeText(tw);
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
        {copied
          ? "Copied!"
          : `${id}: left-[${Math.round(pos.x)}px] top-[${Math.round(pos.y)}px] w-[${Math.round(pos.w)}px] h-[${Math.round(pos.h)}px]`}
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
