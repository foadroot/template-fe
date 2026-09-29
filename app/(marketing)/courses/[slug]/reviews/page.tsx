import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";
import {
  CourseHero,
  CourseReviews,
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
    title: `${course.hero.title.value} — Reviews — ByteSpace`,
    description: course.reviews.intro.value,
    alternates: { canonical: routes.publicRoutes.courses.reviews(slug) },
  };
}

/**
 * The Course Reviews route, matching the design's frame (60:681): the shared band and
 * enrolment card, then the rating summary, filter row and review list under the tabs.
 *
 * The panel runs six pixels taller than the file's own (the first review body is drawn
 * at a 24px line height there and 26px on the other three), so the bottom padding is
 * 85px rather than the frame's 91px and the footer still lands at y=2924.
 */
export default async function CourseReviewsPage({
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

      <section className="pt-[79px] pb-[85px]">
        <Container className="relative">
          <EnrollCard content={course.enroll} className="lg:top-[-620px]" />

          <CourseTabs
            tabs={course.tabs}
            active="reviews"
            className="mt-10 lg:mt-0 lg:w-[725px]"
          />
          <CourseReviews
            content={course.reviews}
            className="mt-10 lg:w-[725px]"
          />
        </Container>
      </section>
    </>
  );
}
