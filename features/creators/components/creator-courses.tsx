import { Container } from "@/components/shared/container";
import { CoursesToolbar, defaultCoursesQuery } from "@/features/courses";
import { CourseCard } from "@/features/homepage";
import { type CreatorProfileContent } from "@/features/creators/types/creators.types";

/**
 * The courses block (frame 60:1878, `Frame` y=592-1611): the results toolbar 62px under
 * the band, then six cards over two rows of the design's 413x424 pitch, 61px above the
 * footer. The grid is the results grid's own three columns, so the card and its measured
 * anatomy are shared rather than redrawn.
 */
export function CreatorCourses({ content }: { content: CreatorProfileContent }) {
  if (content.courses.length === 0) {
    return null;
  }

  return (
    <>
      <CoursesToolbar
        content={content.coursesToolbar}
        query={defaultCoursesQuery}
        activeIds={[]}
        className="pt-[62px]"
      />

      <section aria-label="Courses by this creator" className="pt-10 pb-[61px]">
        <Container>
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {content.courses.map((course) => (
              <li key={course.id}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
