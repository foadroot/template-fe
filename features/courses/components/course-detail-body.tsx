"use client";

import { useRef, useState } from "react";

import { SectionErrorBoundary } from "@/components/shared/section-error-boundary";
import { CourseHero } from "@/features/courses/components/course-hero";
import { CourseTabsSection } from "@/features/courses/components/course-tabs-section";
import { EnrollCardRail } from "@/features/courses/components/enroll-card-rail";
import {
  type CourseAboutContent,
  type CourseHeroContent,
  type CourseLessonsContent,
  type CourseReviewsContent,
  type CourseTab,
  type CourseTabId,
  type EnrollCardContent,
} from "@/features/courses/types/courses.types";

/**
 * The interactive body of the Course Detail page: the hero band, the tab panels and
 * the rail that pins the enrolment card below the header while the tabs scroll.
 *
 * It exists as one client component because the rail and the hero's own copy of the
 * card have to agree on who owns it: the rail measures where the card belongs inside
 * the shell (hence the `relative` wrapper around everything — the rail's box has to
 * reach from the media row to the end of the tabs, which is what lets a sticky card
 * release at the section's end), publishes that offset, and the hero hides its copy
 * the moment the rail can render it. Both sit at the same coordinates, so the hand-off
 * never moves the card.
 */
export function CourseDetailBody({
  hero,
  enroll,
  tabs,
  initialTab,
  about,
  lessons,
  reviews,
}: {
  hero: CourseHeroContent;
  enroll: EnrollCardContent;
  tabs: CourseTab[];
  initialTab: CourseTabId;
  about: CourseAboutContent;
  lessons: CourseLessonsContent;
  reviews: CourseReviewsContent;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const enrollAnchorRef = useRef<HTMLDivElement>(null);
  const [enrollTop, setEnrollTop] = useState<number | null>(null);

  return (
    <div ref={shellRef} className="relative">
      <SectionErrorBoundary name="Course hero">
        <CourseHero
          content={hero}
          enrollContent={enroll}
          enrollPinned={enrollTop !== null}
          enrollAnchorRef={enrollAnchorRef}
        />
      </SectionErrorBoundary>

      <SectionErrorBoundary name="Course tabs and details">
        <CourseTabsSection
          tabs={tabs}
          initialTab={initialTab}
          about={about}
          lessons={lessons}
          reviews={reviews}
        />
      </SectionErrorBoundary>

      <EnrollCardRail
        content={enroll}
        top={enrollTop}
        shellRef={shellRef}
        anchorRef={enrollAnchorRef}
        onTopChange={setEnrollTop}
      />
    </div>
  );
}
