"use client";

import { useState } from "react";
import { Container } from "@/components/shared/container";
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
 * Interactive tabs section on the Course Detail page:
 * Switches between About, Lessons, and Reviews tabs without dedicated page reloads.
 * Synchronizes the active tab with the URL search query for shareable links.
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

  const handleTabChange = (tabId: CourseTabId) => {
    setActiveTab(tabId);
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

            <div className="transition-opacity duration-200">
              {activeTab === "about" && <CourseAbout content={about} />}
              {activeTab === "lessons" && <CourseLessons content={lessons} />}
              {activeTab === "reviews" && <CourseReviews content={reviews} />}
            </div>
          </div>

          {/* Right Column Spacer (reserves 412px for desktop so tab content stays beside the EnrollCard) */}
          <div className="hidden lg:block w-[412px] shrink-0" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
