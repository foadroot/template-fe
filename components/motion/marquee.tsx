"use client";

import { cn } from "@/lib/utils";
import {
  Children,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Keyframes and hover-pause rule, shipped with the component rather than
 * declared in globals.css.
 *
 * A marquee is inert without its @keyframes — if the rule is missing for any
 * reason (stylesheet not rebuilt, component copied into another app, CSS load
 * order) the track silently sits still instead of failing loudly. Colocating
 * the ~6 lines it needs makes the component self-contained and removes that
 * whole class of "why isn't it moving" failure.
 *
 * Rendered as a single <style> element; React dedupes identical instances and
 * the browser parses it once regardless of how many marquees are mounted.
 */
const MARQUEE_CSS = `
@keyframes brand-marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
.brand-marquee__track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation-name: brand-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.brand-marquee:hover .brand-marquee__track[data-pause-on-hover="true"] {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .brand-marquee__track { animation: none; }
}
`;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const getReducedMotionServerSnapshot = () => false;

/**
 * Infinite horizontal ticker with masked edges.
 *
 * Ported from `template-education`'s `components/motion/marquee.tsx`, with its
 * `useReducedMotion` swapped for `useSyncExternalStore` over a `matchMedia`
 * query: that app ships framer-motion, this one does not, and a dependency is
 * a heavy price for a single boolean.
 *
 * Uses a CSS animation rather than a JS tween: a continuously running Framer
 * animation keeps the main thread awake for the entire page lifetime, whereas
 * a CSS transform animation is handed to the compositor once and costs nothing
 * thereafter.
 *
 * The track renders the item set `copies` times inside each of its two halves
 * and travels exactly -50%, which is what makes the wrap seamless — the second
 * half lands precisely where the first started. Both halves must be identical
 * in width, so the duplicate is a straight re-render of the same items (hidden
 * from assistive tech).
 *
 * Why the copy count is dynamic: translating -50% only loops seamlessly while
 * one full half is at least as wide as the viewport. With a handful of logos
 * (a few hundred px each) one row is narrower than a desktop screen, so the
 * last stretch of every cycle exposes an empty gutter and the marquee reads as
 * broken. The width is measured once and re-checked on resize, then bumped to
 * the smallest *even* count whose half still covers the viewport — odd counts
 * would cut the -50% seam mid-set and break the loop the other way.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  children: ReactNode;
  /** Seconds for one full cycle. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const items = Children.toArray(children);

  // Copies of the item set inside each half of the track. 2 is the classic
  // baseline; the measurement below raises it when the viewport is wider than
  // the content.
  const [copies, setCopies] = useState(2);
  const measureRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect rather than useEffect so the first paint already has the
  // right copy count — measuring after paint would flash a too-narrow track
  // for one frame on wide screens.
  useLayoutEffect(() => {
    const measure = () => {
      const row = measureRef.current;
      if (!row) return;
      const oneSet = row.scrollWidth / copies;
      if (!oneSet) return;
      const wanted = Math.max(2, Math.ceil(window.innerWidth / oneSet));
      // Half a row is what the -50% translate covers, so the seam only lands on
      // a set boundary when the count is even.
      const wantedEven = wanted % 2 === 0 ? wanted : wanted + 1;
      setCopies((prev) => (prev === wantedEven ? prev : wantedEven));
    };
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", schedule);
    // Logo images load asynchronously; re-measure once everything settles.
    window.addEventListener("load", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [copies]);

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-10 gap-y-6",
          className,
        )}
      >
        {items.map((child, index) => (
          <div key={index} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      ref={ariaHidden ? undefined : measureRef}
      className="flex shrink-0 items-center gap-x-10 sm:gap-x-16"
    >
      {Array.from({ length: copies }, (_, setIndex) =>
        items.map((child, index) => (
          <div
            key={`${setIndex}-${index}`}
            aria-hidden={setIndex > 0 ? true : undefined}
            className={itemClassName}
          >
            {child}
          </div>
        )),
      )}
    </div>
  );

  return (
    <div
      className={cn("brand-marquee relative flex overflow-hidden", className)}
      style={{
        // Inline rather than an arbitrary Tailwind variant so the edge fade
        // cannot go missing independently of the animation above.
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <style>{MARQUEE_CSS}</style>

      <div
        className="brand-marquee__track"
        data-pause-on-hover={pauseOnHover}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
