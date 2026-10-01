"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { setLenis } from "@/lib/lenis-instance";

/**
 * SmoothScroll — runs Lenis over the document itself (window mode, the library
 * default). The public pages scroll the normal way (app/layout.tsx's plain
 * `body.min-h-full`), so there is no wrapper/content shell to pass; the dashboard
 * keeps its own inner `overflow-y-auto` main and is deliberately out of scope —
 * this component is mounted only from app/(marketing)/layout.tsx.
 *
 * `anchors: true` hands same-document fragment links (`#categories`,
 * `#creators-grid`) to Lenis, which resolves them through `scrollTo` and therefore
 * honours the targets' own `scroll-margin-top` — the same offset the browser's
 * native hash jump would apply, so nothing lands under the sticky header.
 *
 * Lenis dispatches native `scroll` events as it drives the real scroll position, so
 * every existing scroll-linked effect (the nav header's compact/hide logic in
 * components/layout/marketing-nav-header.tsx) keeps working unchanged. The only CSS
 * contract is `.lenis.lenis-smooth` in app/globals.css, which stops any
 * `scroll-behavior: smooth` from fighting Lenis's own lerp.
 *
 * It also owns scroll restoration across navigations: Next.js resets the *window*
 * scroll after a client-side transition, but Lenis only absorbs that native jump
 * when it is idle — while its own animation is running (`isScrolling === "smooth"`)
 * the reset is ignored, so a page navigated to mid-momentum would be left wherever
 * the outgoing scroll had reached. Forcing the jump through Lenis cancels the
 * in-flight animation and lands where the browser itself would have landed: the top
 * for a plain route change, the fragment target when the new URL carries one.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  // Tracks the last pathname we reset for, so the first render (a real page load,
  // where restoring the browser's own position is still meaningful) isn't treated
  // as a navigation.
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      touchMultiplier: 2,
      anchors: true,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lastPathnameRef.current === pathname) return;
    lastPathnameRef.current = pathname;

    const lenis = lenisRef.current;
    // `immediate` cancels any in-flight Lenis animation (an outgoing page's momentum
    // would otherwise keep running into the incoming one) and `force` applies even
    // while Lenis is stopped or scroll-locked. A URL that carries a fragment wants
    // the fragment target rather than the top — resolved through Lenis so the jump
    // still cancels momentum and still honours the target's `scroll-margin-top`.
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

    if (lenis) {
      if (target) lenis.scrollTo(target, { immediate: true, force: true });
      else lenis.scrollTo(0, { immediate: true, force: true });
    } else if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
