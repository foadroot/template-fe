"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { CourseTabs } from "@/features/courses/components/course-tabs";
import { CourseAbout } from "@/features/courses/components/course-about";
import { CourseLessons } from "@/features/courses/components/course-lessons";
import { CourseReviews } from "@/features/courses/components/course-reviews";
import {
  type CourseAboutContent,
  type CourseLessonsContent,
  type CourseReviewsContent,
  type CourseTab,
  type CourseTabId,
} from "@/features/courses/types/courses.types";

/**
 * The tab order a switch is measured against: moving toward a later entry flows the
 * content up, moving toward an earlier one flows it down.
 */
const TAB_ORDER: CourseTabId[] = ["about", "lessons", "reviews"];

/** How long the outgoing panel stays mounted while it flows out of view. */
const EXIT_DURATION_MS = 200;

/** Which way the content travels on a switch. */
type Flow = "up" | "down";

/**
 * Interactive tabs section on the Course Detail page:
 * Switches between About, Lessons, and Reviews tabs without dedicated page reloads.
 * Synchronizes the active tab with the URL search query for shareable links.
 *
 * Every switch cross-fades the two panels through a vertical flow: the outgoing panel
 * is lifted into an overlay that plays the opposite `animate-tab-exit-*` of the
 * incoming panel's `animate-tab-enter-*`, so forward navigation flows the new panel up
 * into place while the old one flows down and out, and backwards navigation mirrors it.
 * Under `prefers-reduced-motion` the overlay is never mounted and the swap is instant.
 */
export function CourseTabsSection({
  tabs,
  initialTab = "about",
  about,
  lessons,
  reviews,
}: {
  tabs: CourseTab[];
  initialTab?: CourseTabId;
  about: CourseAboutContent;
  lessons: CourseLessonsContent;
  reviews: CourseReviewsContent;
}) {
  const [activeTab, setActiveTab] = useState<CourseTabId>(initialTab);
  /** Direction of the latest switch; null until the first one, so nothing animates on mount. */
  const [flow, setFlow] = useState<Flow | null>(null);
  /** Bumped on every switch — the key that remounts the panel so its enter replays. */
  const [renderId, setRenderId] = useState(0);
  /** The panel being left behind, mounted only while its exit animation runs. */
  const [exiting, setExiting] = useState<{
    id: number;
    tab: CourseTabId;
    flow: Flow;
  } | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (exitTimer.current) {
        clearTimeout(exitTimer.current);
      }
    },
    [],
  );

  const renderPanel = (tabId: CourseTabId) => {
    if (tabId === "lessons") {
      return <CourseLessons content={lessons} />;
    }
    if (tabId === "reviews") {
      return <CourseReviews content={reviews} />;
    }
    return <CourseAbout content={about} />;
  };

  const handleTabChange = (tabId: CourseTabId) => {
    if (tabId === activeTab) {
      return;
    }

    const direction: Flow =
      TAB_ORDER.indexOf(tabId) > TAB_ORDER.indexOf(activeTab) ? "up" : "down";
    const nextId = renderId + 1;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (exitTimer.current) {
      clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }

    setFlow(direction);
    setRenderId(nextId);
    setActiveTab(tabId);
    setExiting(
      reducedMotion
        ? null
        : { id: nextId, tab: activeTab, flow: direction },
    );

    if (!reducedMotion) {
      exitTimer.current = setTimeout(() => {
        setExiting(null);
        exitTimer.current = null;
      }, EXIT_DURATION_MS);
    }

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tabId === "about") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tabId);
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <section className="bg-white pt-10 sm:pt-14 pb-20 min-h-[500px]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_412px] gap-8 xl:gap-[43px] items-start">
          {/* Left Column: Tabs and Active Tab Content */}
          <div className="w-full max-w-[725px]">
            <CourseTabs
              tabs={tabs}
              active={activeTab}
              onTabChange={handleTabChange}
              className="mb-8 sm:mb-10"
            />

            <div className="relative">
              {/* The outgoing panel: absolutely placed so the incoming one can take the
                  flow at once, painted white so it masks what it is fading over instead
                  of letting the two panels' text ghost through each other. */}
              {exiting && (
                <div
                  key={`tab-exit-${exiting.id}`}
                  aria-hidden="true"
                  inert
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 z-10 bg-white",
                    exiting.flow === "up"
                      ? "animate-tab-exit-down"
                      : "animate-tab-exit-up",
                  )}
                >
                  {renderPanel(exiting.tab)}
                </div>
              )}

              <div
                key={`tab-enter-${renderId}`}
                className={cn(
                  flow === "up" && "animate-tab-enter-up",
                  flow === "down" && "animate-tab-enter-down",
                )}
              >
                {renderPanel(activeTab)}
              </div>
            </div>
          </div>

          {/* Right Column Spacer (reserves 412px for desktop so tab content stays beside the EnrollCard) */}
          <div className="hidden lg:block w-[412px] shrink-0" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
