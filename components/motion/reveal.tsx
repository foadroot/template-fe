"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/** Where the element starts from before it slides, scales or fades into place. */
export type RevealEffect = "up" | "down" | "left" | "right" | "zoom" | "fade";

/** The tags a reveal is ever used as — the grid rows need `li`, sections need tags. */
type RevealTag =
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "ul"
  | "li"
  | "section"
  | "form"
  | "a";

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
 * One observer for the whole page, shared by every reveal.
 *
 * A grid of cards would otherwise mean a dozen observers each holding their own
 * callback table, and IntersectionObserver is explicitly built to watch many targets
 * at once. Targets register here rather than in a closure so a component can unmount
 * without the observer outliving it: the entry fires, the map hands back the callback
 * that is still mounted, and a stale one is a no-op.
 */
let observer: IntersectionObserver | null = null;
const targets = new Map<Element, () => void>();

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        targets.get(entry.target)?.();
        observer?.unobserve(entry.target);
      }
    },
    // No threshold: a threshold is a fraction of the *target*, so a block taller
    // than the viewport may never reach it. Triggering on the top edge crossing
    // 90% of the screen behaves identically for a 40px pill and a 900px section,
    // and the negative bottom margin means the reveal finishes as the element
    // settles rather than the instant a corner appears.
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );

  return observer;
}

/**
 * Reveals its element the first time it scrolls into view: the element ships from
 * the server with the `.reveal` class and its effect's hidden transform, and the
 * observer flips `data-revealed` once, which transitions it into place.
 *
 * It renders the element itself rather than a wrapper, so it can stand in for a grid
 * row (`as="li"`) or a section without disturbing the layout it sits in — a wrapper
 * div would become the grid item, or the block, instead of the markup that was meant
 * to be there.
 *
 * `delay` is the stagger, in milliseconds, and costs one custom property: the
 * transition delay lives in `.reveal` in globals.css and reads it back.
 */
export function Reveal({
  as = "div",
  effect = "up",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: RevealTag;
  effect?: RevealEffect;
  /** Milliseconds to hold this element back after the group starts revealing. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Anything else the element itself needs — `action` on a form, `href` on a link. */
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  // Read as a store rather than sampled once inside the effect: flipping the OS
  // setting afterwards has to show the element without a remount, and reading it at
  // render also keeps the effect body free of a direct setState.
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const node = ref.current;
    // Under reduced motion the attribute below already shows the element, so there
    // is nothing to observe.
    if (!node || reduceMotion) return;

    const io = getObserver();
    if (!io) {
      // With no observer nothing will ever call back, so show the element outright
      // rather than leave its hidden state in place forever. Written straight to
      // the DOM: React's own prop stays `undefined` from render to render, so it
      // never diffs this attribute back off.
      node.setAttribute("data-revealed", "true");
      return;
    }

    const reveal = () => setRevealed(true);
    targets.set(node, reveal);
    io.observe(node);

    return () => {
      targets.delete(node);
      io.unobserve(node);
    };
  }, [reduceMotion]);

  const Tag = as as ElementType;

  return (
    <Tag
      {...rest}
      ref={ref}
      className={cn("reveal", className)}
      data-effect={effect}
      data-revealed={revealed || reduceMotion ? "true" : undefined}
      style={
        delay
          ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}
