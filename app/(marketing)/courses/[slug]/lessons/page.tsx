import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";
import {
  CourseHero,
  CourseLessons,
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
    title: `${course.hero.title.value} — Lessons — ByteSpace`,
    description: course.lessons.modulesIntro.value,
    alternates: { canonical: routes.publicRoutes.courses.lessons(slug) },
  };
}

/**
 * The Course Lessons route, matching the design's frame (60:102): the same blue band and
 * enrolment card as the Details page, then the 723px module list under the tabs.
 *
 * The panel starts 16.5px lower than the About panel does, which is where the section's
 * 79px top padding and the card's -620px offset both come from; an unknown slug falls
 * through to the branded 404 rather than to an invented course.
 */
export default async function CourseLessonsPage({
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
      <CourseHero content={course.hero} />

      <section className="pt-[79px] pb-[81px]">
        <Container className="relative">
          <EnrollCard content={course.enroll} className="lg:top-[-620px]" />

          <CourseTabs
            tabs={course.tabs}
            active="lessons"
            className="mt-10 lg:mt-0 lg:w-[725px]"
          />
          <CourseLessons
            content={course.lessons}
            className="mt-10 lg:w-[725px]"
          />
        </Container>
      </section>
    </>
  );
}
