import type { Metadata } from "next";

import { SectionErrorBoundary } from "@/components/shared/section-error-boundary";
import { routes } from "@/config/routes";
import {
  CategoryPills,
  CourseResults,
  CoursesPagination,
  CoursesSearchHero,
  CoursesToolbar,
  coursesContent,
  readCourses,
  readCoursesQuery,
} from "@/features/courses";
import { type FilterIconName } from "@/features/courses";

export const metadata: Metadata = {
  title: "Find your next course",
  description:
    "Search ByteSpace's course catalogue and filter by category and level.",
  alternates: { canonical: routes.publicRoutes.courses.list },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * The courses route, matching the design's `Search Page` frame (55:117): the blue search
 * band, the filter toolbar, the category row, the three-column result grid and the
 * pagination row. The header and footer come from the marketing shell.
 *
 * The query is not just decoration: `q`, `category`, `level`, `featured` and `sort` each
 * narrow or order the catalogue, `page` walks what is left, and every control rebuilds the
 * URL from the whole query so filters survive each other. The unfiltered first page is the
 * eighteen cards the frame draws, in the order it draws them.
 */
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = readCoursesQuery(await searchParams);
  const selection = readCourses(query);

  const activeIds: FilterIconName[] = [
    ...(query.featured ? (["filter"] as const) : []),
    ...(query.level ? (["level"] as const) : []),
    ...(query.category ? (["category"] as const) : []),
  ];

  return (
    <>
      <SectionErrorBoundary name="Search hero">
        <CoursesSearchHero content={coursesContent.hero} query={query} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Filter toolbar">
        <CoursesToolbar
          content={coursesContent.toolbar}
          query={query}
          activeIds={activeIds}
        />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Category pills">
        <CategoryPills content={coursesContent.categories} query={query} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Results">
        <CourseResults content={{ cards: selection.cards }} query={query} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Pagination">
        <CoursesPagination
          content={coursesContent.pagination}
          query={query}
          pageCount={selection.pageCount}
        />
      </SectionErrorBoundary>
    </>
  );
}
