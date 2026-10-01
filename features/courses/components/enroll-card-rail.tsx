"use client";

import { useEffect, type RefObject } from "react";

import { Container } from "@/components/shared/container";
import { EnrollCard } from "@/features/courses/components/enroll-card";
import { type EnrollCardContent } from "@/features/courses/types/courses.types";

/**
 * The desktop rail that carries the enrolment card down the page.
 *
 * The card's natural home is the hero's media row, but a `position: sticky` element is
 * only ever pinned inside the box of its own parent — so the card needs a parent that
 * starts at the media row AND runs to the end of the tabs section. That box is this
 * rail: it is absolutely placed inside the course detail shell from the measured card
 * origin (`top`, read off the hero cell `CourseHero` points `anchorRef` at) down to
 * the shell's bottom edge, and the card sticks inside it at `top-15` — the 60px the
 * compact nav bar occupies (`lg:h-15` in MarketingNavHeader), so the card parks just
 * below the header while the reader is in the tabs and releases at the section's end.
 *
 * Until the first measurement lands nothing is rendered, which is what lets the SSR
 * output keep the hero's own copy of the card: both occupy the same coordinates, so
 * the swap that pins it is invisible.
 */
export function EnrollCardRail({
  content,
  top,
  shellRef,
  anchorRef,
  onTopChange,
}: {
  content: EnrollCardContent;
  /** Rail offset from the shell's top edge; null until the first measurement. */
  top: number | null;
  /** The shell the rail is absolutely placed inside — its bottom edge releases the card. */
  shellRef: RefObject<HTMLDivElement | null>;
  /** The hero's card cell, whose position is the card's natural origin. */
  anchorRef: RefObject<HTMLDivElement | null>;
  onTopChange: (top: number) => void;
}) {
  useEffect(() => {
    const anchor = anchorRef.current;
    const shell = shellRef.current;
    if (!anchor || !shell) return;

    // Viewport-relative tops, differenced in one frame: the scroll position cancels out,
    // so the result is the anchor's position inside the shell whether or not the page
    // has already been scrolled (a restored mid-page position, say).
    const measure = () =>
      onTopChange(
        anchor.getBoundingClientRect().top - shell.getBoundingClientRect().top,
      );

    measure();
    window.addEventListener("resize", measure);

    // The anchor's own box never changes size — it sits at a fixed cell and holds a
    // zero-height wrapper from the wide breakpoint up — so watch what moves it: the
    // hero above, which reflows when the viewport or the webfonts change.
    const hero = anchor.closest("section");
    const observer = hero === null ? null : new ResizeObserver(measure);
    if (hero !== null && observer !== null) observer.observe(hero);

    document.fonts.ready.then(measure).catch(() => undefined);

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [anchorRef, shellRef, onTopChange]);

  if (top === null) {
    return null;
  }

  return (
    <div
      style={{ top }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden lg:block"
    >
      {/* Full width so the container centres on the page, but inert everywhere but the
          card — otherwise the rail's empty left half would sit over the tab panels and
          swallow their clicks. Flush right puts the card exactly where the hero's
          `1fr 412px` grid leaves column two. */}
      <Container className="flex h-full items-start justify-end">
        <div className="pointer-events-auto sticky top-15 w-[412px]">
          <EnrollCard content={content} />
        </div>
      </Container>
    </div>
  );
}
