import { placeholderCopy, verifiedCopy } from "@/lib/content/copy";
import {
  type CourseSortId,
  type CoursesPageContent,
  type CoursesQuery,
} from "@/features/courses/types/courses.types";

/**
 * The Search Page's content, read off the `Search Page` frame (55:117).
 *
 * The frame draws one toolbar, one category row and one pagination row; the result set
 * itself lives in the catalogue, which is what the controls filter and page through.
 */
export const coursesContent: CoursesPageContent = {
  hero: {
    headline: verifiedCopy("Find Your Next Course"),
    searchPlaceholder: "Search",
    searchButtonLabel: verifiedCopy("Courses"),
  },

  toolbar: {
    filters: [
      { id: "filter", label: verifiedCopy("Filter"), icon: "filter" },
      { id: "level", label: verifiedCopy("Level"), icon: "level" },
      { id: "category", label: verifiedCopy("Category"), icon: "category" },
    ],
    levels: [
      { slug: "beginner", label: verifiedCopy("Beginner") },
      { slug: "intermediate", label: verifiedCopy("Intermediate") },
      // The frame only ever draws Beginner and Intermediate; the third tier is named
      // so the control has somewhere to go, and is flagged as such.
      { slug: "advanced", label: placeholderCopy("Advanced") },
    ],
    sorts: [
      { id: "relevant", label: verifiedCopy("Most relevant") },
      { id: "title", label: placeholderCopy("Title A–Z") },
      { id: "rating", label: placeholderCopy("Top rated") },
    ],
  },

  categories: {
    active: verifiedCopy("Featured"),
    options: [
      "Music",
      "Drawing & Painting",
      "Marketing",
      "Animation",
      "Social Media",
      "UI/UX Design",
      "Creative Marketing",
      "Cooking",
    ].map(verifiedCopy),
  },

  pagination: {
    pages: [1, 2, 3, 4, 5],
    previousLabel: verifiedCopy("Previous page"),
    nextLabel: verifiedCopy("Next page"),
  },
};

const asString = (value: string | string[] | undefined): string | null =>
  typeof value === "string" && value.trim() !== "" ? value.trim() : null;

const sortIds: CourseSortId[] = ["relevant", "title", "rating"];

const asSort = (value: string | null): CourseSortId =>
  sortIds.includes(value as CourseSortId) ? (value as CourseSortId) : "relevant";

/** Reads the route's query into the shape the courses page renders from. */
export function readCoursesQuery(
  params: Record<string, string | string[] | undefined>,
): CoursesQuery {
  const page = Number.parseInt(asString(params.page) ?? "", 10);

  return {
    q: asString(params.q) ?? "",
    category: asString(params.category),
    level: asString(params.level),
    featured: asString(params.featured) === "true",
    sort: asSort(asString(params.sort)),
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}
