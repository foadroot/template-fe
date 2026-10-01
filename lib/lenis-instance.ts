import type Lenis from "lenis";

/** The marketing site's single Lenis instance, set by `SmoothScroll` once it has
 * mounted Lenis on the document (see components/shared/smooth-scroll.tsx) — null
 * before that first effect runs and after it unmounts.
 *
 * Anything that needs to move the page's scroll position programmatically must
 * animate through this instance rather than the window's own native `scrollTo()` /
 * an element's `scrollIntoView()`. Lenis tracks its own virtual scroll position every
 * frame; a native scroll changes the real position without telling Lenis, so the next
 * wheel/touch input animates from Lenis's now-stale position and snaps the page back
 * to it. */
let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export function setLenis(next: Lenis | null) {
  instance = next;
}
