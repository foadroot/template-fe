import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { SectionErrorBoundary } from "@/components/shared/section-error-boundary";
import { routes } from "@/config/routes";
import {
  CourseAbout,
  CourseHero,
  CourseTabs,
  EnrollCard,
  readCourse,
} from "@/features/courses";

type CourseParams = Promise<{ slug: string }>;

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
 * The Course Details route, matching the design's frame (55:4066): the blue band with
 * the video, then the 725px About panel with the enrolment card floating alongside it.
 *
 * The card is the first thing in the markup so a narrow screen reads it above the tabs;
 * from the wide breakpoint up it leaves the flow and pins itself over the band, which is
 * where the frame draws it. An unknown slug falls through to the branded 404 rather than
 * to an invented course.
 */
export default async function CourseDetailPage({
  params,
}: {
  params: CourseParams;
}) {
  const { slug } = await params;
  const course = readCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <SectionErrorBoundary name="Course hero">
        <CourseHero content={course.hero} />
      </SectionErrorBoundary>

      <SectionErrorBoundary name="About and enrolment">
        <section className="pt-[62.5px] pb-[64.5px]">
          <Container className="relative">
            <EnrollCard content={course.enroll} />

            <CourseTabs
              tabs={course.tabs}
              active="about"
              className="mt-10 lg:mt-0 lg:w-[725px]"
            />
            <CourseAbout
              content={course.about}
              className="mt-10 lg:w-[725px]"
            />
          </Container>
        </section>
      </SectionErrorBoundary>
    </>
  );
}
