import { Container } from "@/components/shared/container";
import { CourseCard } from "@/features/homepage";
import {
  type CoursesQuery,
  type CoursesResultsContent,
} from "@/features/courses/types/courses.types";

/**
 * The results grid (frame 55:117, `Frame 8`): three 373px columns 40px apart, 77px under
 * the category row's 555px bottom edge, carrying eighteen cards over six rows at the
 * design's 1440px width.
 *
 * The frame only ever draws a full page, so a search or filter that matches nothing needs
 * a state of its own rather than a collapsed section with no explanation.
 *
 * The grid is keyed on the whole query. Every control on the page is a link, so a filter
 * click arrives as a fresh server render that React would otherwise reconcile card-by-card
 * into the rows already on screen — the key makes the list mount from scratch instead,
 * which is what replays `animate-enter` on each card and gives the click a visible answer.
 */
export function CourseResults({
  content,
  query,
}: {
  content: CoursesResultsContent;
  query: CoursesQuery;
}) {
  if (content.cards.length === 0) {
    return (
      <section aria-label="Course results" className="pt-[77px]">
        <Container>
          <p className="animate-enter rounded-brand-panel border border-brand-border bg-white px-6 py-12 text-center text-body-l text-brand-neutral-700">
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
        <ul
          key={JSON.stringify(query)}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.cards.map((course, index) => (
            <li
              key={course.id}
              className="animate-enter"
              style={{
                // Column first, then row: the sweep runs across each line of the
                // grid and on to the next, the way the eye already reads it.
                animationDelay: `${(index % 3) * 90 + Math.floor(index / 3) * 40}ms`,
              }}
            >
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
