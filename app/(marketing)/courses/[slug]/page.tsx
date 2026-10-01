import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionErrorBoundary } from "@/components/shared/section-error-boundary";
import { routes } from "@/config/routes";
import {
  CourseHero,
  CourseTabsSection,
  readCourse,
  type CourseTabId,
} from "@/features/courses";

type CourseParams = Promise<{ slug: string }>;
type CourseSearchParams = Promise<{ tab?: string }>;

export async function generateMetadata({
  params,
}: {
  params: CourseParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = readCourse(slug);

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: `${course.hero.title.value} — ByteSpace`,
    description: course.hero.subtitle.value,
    alternates: { canonical: routes.publicRoutes.courses.detail(slug) },
  };
}

/**
 * The Course Details route:
 * - Blue hero band featuring the headline, metadata badges, share control, video preview player,
 *   and the floating enrolment card.
 * - Interactive client tabs (About, Lessons, Reviews) switching content seamlessly in-page.
 */
export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: CourseParams;
  searchParams?: CourseSearchParams;
}) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const tab = resolvedSearchParams?.tab;
  const course = readCourse(slug);

  if (!course) {
    notFound();
  }

  const initialTab: CourseTabId =
    tab === "lessons" || tab === "reviews" || tab === "about"
      ? tab
      : "about";

  return (
    <>
      <SectionErrorBoundary name="Course hero">
        <CourseHero content={course.hero} enrollContent={course.enroll} />
      </SectionErrorBoundary>

      <SectionErrorBoundary name="Course tabs and details">
        <CourseTabsSection
          tabs={course.tabs}
          initialTab={initialTab}
          about={course.about}
          lessons={course.lessons}
          reviews={course.reviews}
        />
      </SectionErrorBoundary>
    </>
  );
}
