"use client";

import { useEffect, useRef, type ReactNode } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Publishes the pointer's position as `--parallax-x` / `--parallax-y` on its own
 * box, for any descendant marked `.parallax-layer` to pick up.
 *
 * Deliberately dumb about its children: this element never touches them, it only
 * writes two custom properties, so a server-rendered ornament (or anything else)
 * keeps its own markup and just inherits the values. The layers turn the pixel
 * offset into a `translate` multiplied by their own `--depth`, which is what makes
 * near shapes sweep further than far ones.
 *
 * The write is rAF-throttled and passive — a pointermove can arrive more often than
 * a frame, and doing the arithmetic once per frame keeps this off the critical path
 * even with every shape on the page watching. The 0.5s `transition` on the layer
 * does the easing, so no per-frame tweening is needed here.
 */
export function MouseParallax({
  children,
  className,
  max = 16,
}: {
  children: ReactNode;
  className?: string;
  /** Peak offset in px, at the extremes of the viewport. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    let frame = 0;

    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // -1..1 from the viewport's centre, so the drift reverses with the pointer
        // rather than only ever pushing one way.
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        node.style.setProperty("--parallax-x", `${(x * max).toFixed(1)}px`);
        node.style.setProperty("--parallax-y", `${(y * max).toFixed(1)}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, [max]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
