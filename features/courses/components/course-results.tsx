import { Container } from "@/components/shared/container";
import { CourseCard } from "@/features/homepage";
import { type CoursesResultsContent } from "@/features/courses/types/courses.types";

/**
 * The results grid (frame 55:117, `Frame 8`): three 373px columns 40px apart, 77px under
 * the category row's 555px bottom edge, carrying eighteen cards over six rows at the
 * design's 1440px width.
 *
 * The frame only ever draws a full page, so a search or filter that matches nothing needs
 * a state of its own rather than a collapsed section with no explanation.
 */
export function CourseResults({ content }: { content: CoursesResultsContent }) {
  if (content.cards.length === 0) {
    return (
      <section aria-label="Course results" className="pt-[77px]">
        <Container>
          <p className="rounded-brand-panel border border-brand-border bg-white px-6 py-12 text-center text-body-l text-brand-neutral-700">
            No courses match this search. Try a different keyword, or clear a
            filter to see the full catalogue again.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section aria-label="Course results" className="pt-[77px]">
      <Container>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
