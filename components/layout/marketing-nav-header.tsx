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
 */
export function MarketingNavHeader({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    // A restored scroll position (reloaded mid-page) is caught by the first scroll
    // event's delta, so no state needs seeding here.
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      if (y <= 60) setCompact(false);
      // Small dead zone so trackpad jitter does not flap the bar.
      else if (delta > 2) setCompact(true);
      else if (delta < -2) setCompact(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-compact={compact ? "true" : undefined}
      className={cn(
        "group sticky top-0 z-40 bg-brand-primary brand-grid transition-[height] duration-300 ease-out motion-reduce:transition-none",
        compact ? "h-10 lg:h-15" : "h-20 lg:h-30",
      )}
    >
      {children}
    </header>
  );
}
