import { routes } from "@/config/routes";
import { type CoursesQuery } from "@/features/courses/types/courses.types";

/** Turns a label into the query value the results filter on. */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * The query an unfiltered page starts from. Controls that live outside the courses route
 * — the toolbar the Creator Profile repeats — build their links from this, so they lead
 * back to the catalogue rather than to a query they cannot answer.
 */
export const defaultCoursesQuery: CoursesQuery = {
  q: "",
  category: null,
  level: null,
  featured: false,
  sort: "relevant",
  page: 1,
};

/**
 * Rebuilds the courses URL with `patch` merged into the current query, so a control
 * never drops the filter the user set a moment earlier. Defaults are left off the URL —
 * an unfiltered first page is `/courses` exactly as the frame draws it.
 */
export function coursesHref(
  query: CoursesQuery,
  patch: Partial<CoursesQuery> = {},
): string {
  const next = { ...query, ...patch };
  const params = new URLSearchParams();

  if (next.q !== "") params.set("q", next.q);
  if (next.category) params.set("category", next.category);
  if (next.level) params.set("level", next.level);
  if (next.featured) params.set("featured", "true");
  if (next.sort !== "relevant") params.set("sort", next.sort);
  if (next.page > 1) params.set("page", String(next.page));

  const search = params.toString();

  return search
    ? `${routes.publicRoutes.courses.list}?${search}`
    : routes.publicRoutes.courses.list;
}
