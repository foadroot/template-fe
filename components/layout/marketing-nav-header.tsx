"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The sticky bar that hosts the marketing nav.
 *
 * The bar starts at the design's measured height (80px mobile / 120px desktop, from the
 * `Header_Frame` 1440x120) and halves to 40px / 60px as soon as the reader scrolls down
 * the page, growing back when they scroll up — a short height transition on both legs.
 *
 * Only this wrapper is a client component: the nav's contents are passed in as children
 * from the server-rendered `MarketingNav` (design.md D4), and the compact state reaches
 * them through `data-compact` + `group-data-[compact=true]:` variants rather than props.
 *
 * The element itself never changes height. A sticky element sits in the document flow,
 * so animating its own height used to shove every section below it up or down by 40/60px
 * on each flip — the page appeared to jump each time the bar toggled (and scroll got
 * clamped near the bottom). The flow box keeps the expanded height, the visible bar is an
 * inner element that only resizes its own box, and the vacated strip stays inert
 * (`pointer-events-none`) so it cannot swallow clicks meant for the page underneath.
 */
export function MarketingNavHeader({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    // Seed values only; React forbids calling setState synchronously in an effect body,
    // so a restored scroll position (reloaded mid-page) is fixed up by the first scroll
    // event instead — it arrives before any real delta exists.
    let lastY = window.scrollY;
    let seeded = false;

    // Net scroll distance in the current direction. The bar only flips once the reader
    // has moved COMMIT px consistently one way, so wheel jitter around the threshold
    // cannot flap it (and re-trigger the height animation) on every event.
    let run = 0;
    const COMMIT = 16;

    const onScroll = () => {
      const y = window.scrollY;

      if (!seeded) {
        seeded = true;
        lastY = y;
        if (y > 60) setCompact(true);
        return;
      }

      const delta = y - lastY;
      lastY = y;

      if (y <= 60) {
        run = 0;
        setCompact(false);
        return;
      }
      if (delta === 0) return;

      const sameDirection = (delta > 0 && run >= 0) || (delta < 0 && run <= 0);
      run = sameDirection ? run + delta : delta;

      if (run >= COMMIT) setCompact(true);
      else if (run <= -COMMIT) setCompact(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-compact={compact ? "true" : undefined}
      className="group pointer-events-none sticky top-0 z-40 h-20 lg:h-30"
    >
      <div
        className={cn(
          "pointer-events-auto w-full bg-brand-primary brand-grid transition-[height] duration-300 ease-out motion-reduce:transition-none",
          compact ? "h-10 lg:h-15" : "h-20 lg:h-30",
        )}
      >
        {children}
      </div>
    </header>
  );
}
