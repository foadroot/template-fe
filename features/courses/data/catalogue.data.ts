import { routes } from "@/config/routes";
import { placeholderCopy, verifiedCopy } from "@/lib/content/copy";
import { slugify } from "@/features/courses/lib/url";
import {
  type CatalogueCourse,
  type CourseLevelOption,
  type CoursesQuery,
  type CoursesSelection,
} from "@/features/courses/types/courses.types";
import { coursesContent } from "@/features/courses/data/courses.data";
import { courseCoverImages } from "@/features/courses/data/course-assets";

/** The six titles the frame repeats across its eighteen cards. */
const courseTitles = [
  "Learn Figma from Basic",
  "Build Digital Asset",
  "the Power of Big Data",
  "Balancing Productivity and Self-Care",
  "Mastering Money Management",
  "From Idea to Startup Success",
];

/**
 * How many cards a page holds, and how many pages the frame's pagination offers.
 *
 * The frame draws eighteen cards on page 1 and numbers five pages, so the catalogue is
 * built to that shape: five full pages, the first of them the eighteen the file verifies
 * word for word. Everything past it is fixture, laid out from the same six titles.
 */
export const CARDS_PER_PAGE = 18;
export const PAGE_COUNT = coursesContent.pagination.pages.length;

const levels: CourseLevelOption[] = coursesContent.toolbar.levels;

const ratings = [
  { value: "4.8", numeric: 4.8 },
  { value: "4.6", numeric: 4.6 },
  { value: "4.9", numeric: 4.9 },
  { value: "4.3", numeric: 4.3 },
  { value: "4.2", numeric: 4.2 },
];

const categorySlugs = coursesContent.categories.options.map((option) =>
  slugify(option.value),
);

const catalogue: CatalogueCourse[] = Array.from(
  { length: CARDS_PER_PAGE * PAGE_COUNT },
  (_, index) => {
    const title = courseTitles[index % courseTitles.length];
    const slug = `course-${(index % courseTitles.length) + 1}`;
    const isFrameCard = index < CARDS_PER_PAGE;
    const rating = isFrameCard
      ? { value: "4.5", numeric: 4.5 }
      : ratings[index % ratings.length];

    return {
      id: `course-${index + 1}`,
      href: routes.publicRoutes.courses.detail(slug),
      title: verifiedCopy(title),
      creator: verifiedCopy("by purepearl studio"),
      // Interleaved on the same index as the titles, so each of the six keeps one
      // cover wherever it appears — the homepage grid's own pattern.
      image: courseCoverImages[index % courseCoverImages.length],
      imageAlt: `Cover artwork for the course ${title}`,
      facts: [
        verifiedCopy("17 Lessons"),
        verifiedCopy("2 hours 16 mins"),
        verifiedCopy("59 Comments"),
      ],
      // The frame gives all eighteen of its cards the Beginner chip, so the ones it
      // draws keep it; the fixture behind them is what gives the Level control
      // something to filter down to, and keeps each option's own copy flag.
      level: isFrameCard
        ? verifiedCopy("Beginner")
        : levels[index % levels.length].label,
      students: verifiedCopy("26+"),
      price: verifiedCopy("$25"),
      priceSuffix: verifiedCopy("/lifetime"),
      rating:
        rating.numeric === 4.5
          ? verifiedCopy(rating.value)
          : placeholderCopy(rating.value),
      ratingValue: rating.numeric,
      category: categorySlugs[index % categorySlugs.length],
      featured: index % 3 === 0,
    };
  },
);

/** The catalogue in the order the frame draws it. */
export function readCatalogue(): CatalogueCourse[] {
  return catalogue;
}

/**
 * Looks a course card up by slug, so the detail route can inherit the title the results
 * grid already shows for it.
 */
export function readCourseCard(slug: string): CatalogueCourse | null {
  const href = routes.publicRoutes.courses.detail(slug);

  return catalogue.find((card) => card.href === href) ?? null;
}

const haystack = (course: CatalogueCourse) =>
  [
    course.title.value,
    course.creator.value,
    course.level.value,
    ...course.facts.map((fact) => fact.value),
  ]
    .join(" ")
    .toLowerCase();

/**
 * Applies the route's query to the catalogue: search, then category, featured and
 * level, then ordering, then paging.
 *
 * `category=featured` is the row's first pill and the state the frame opens in, so it
 * is the one slug that narrows nothing — every other slug is a real category on the
 * cards. The page is clamped against the filtered set, so paging past the end lands on
 * the last page instead of on an empty grid.
 */
export function readCourses(query: CoursesQuery): CoursesSelection {
  const needle = query.q.trim().toLowerCase();

  const matched = catalogue.filter((course) => {
    if (needle && !haystack(course).includes(needle)) return false;
    if (
      query.category &&
      query.category !== "featured" &&
      course.category !== query.category
    ) {
      return false;
    }
    if (query.featured && !course.featured) return false;
    if (query.level && slugify(course.level.value) !== query.level) {
      return false;
    }

    return true;
  });

  if (query.sort === "title") {
    matched.sort((a, b) => a.title.value.localeCompare(b.title.value));
  } else if (query.sort === "rating") {
    matched.sort((a, b) => b.ratingValue - a.ratingValue);
  }

  const pageCount = Math.max(
    1,
    Math.ceil(matched.length / CARDS_PER_PAGE),
  );
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * CARDS_PER_PAGE;

  return {
    cards: matched.slice(start, start + CARDS_PER_PAGE),
    total: matched.length,
    pageCount,
    page,
  };
}
