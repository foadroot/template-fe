import { Container } from "@/components/shared/container";
import { CourseCard } from "@/features/homepage/components/course-card";
import { type CourseGridContent } from "@/features/homepage/types/homepage.types";

/**
 * The course grid (`33:683`): three columns of course cards over two rows at the design's
 * 1440px width, collapsing to two then one.
 *
 * The frame is 1199x808 and carries no padding of its own — the 72px down to the second
 * intro is that section's top padding and the 77px up to the tab row is the tabs' bottom
 * padding — so this section adds none.
 */
export function CourseGridSection({ content }: { content: CourseGridContent }) {
  if (content.cards.length === 0) {
    return null;
  }

  return (
    <section aria-label="Featured courses">
      <Container>
        {/* Cards are 373 wide over a 40px gutter at 1440px, which is what the three
            columns and `gap-10` produce inside the 1200px content column (33:683). */}
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
