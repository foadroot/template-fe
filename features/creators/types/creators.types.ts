import { type Copy } from "@/lib/content/copy";
import { type CoursesToolbarContent } from "@/features/courses/types/courses.types";
import { type CourseCardContent } from "@/features/homepage/types/homepage.types";

/** A count pill on the profile band: "3 Products", "12 Followers". */
export type CreatorStat = {
  value: Copy;
  label: Copy;
};

/**
 * The Creator Profile frame (60:1878): the blue identity band and the six-card course
 * grid below it. The frame draws a single creator, so the fixture is keyed by handle and
 * an unknown handle falls through to the branded 404.
 */
export type CreatorProfileContent = {
  handle: string;
  name: Copy;
  /** The lime chip beside the name. */
  badge: Copy;
  tagline: Copy;
  bio: Copy;
  avatarAlt: string;
  stats: CreatorStat[];
  followLabel: Copy;
  /** The same filter row the results page draws, 62px under the band. */
  coursesToolbar: CoursesToolbarContent;
  courses: CourseCardContent[];
};

/* --------------------------------------------------------------------------
   The index (`/creators`) — the discovery list the design has no frame for.
   -------------------------------------------------------------------------- */

/** The search-led band that opens the index. */
export type CreatorsHeroContent = {
  headline: Copy;
  subcopy: Copy;
  searchPlaceholder: string;
  searchButtonLabel: Copy;
};

/** One chip in the category strip above the grid. */
export type CreatorsCategory = {
  /** The `?category=` value it sets; null clears the filter ("All"). */
  slug: string | null;
  label: Copy;
};

/** One creator on the index grid. */
export type CreatorSummary = {
  /** The segment the profile route is built from. */
  handle: string;
  name: Copy;
  /** Kept with its `@` prefix — the reference draws it that way. */
  username: string;
  /** The lime chip over the portrait. */
  badge: Copy;
  role: Copy;
  /** The category slug the grid filters on. */
  category: string;
  categoryLabel: Copy;
  avatar: { src: string; alt: string };
  shortBio: Copy;
  /** The profile band's first paragraph, reused when the handle is looked up. */
  bio: Copy;
  /** Drawn as "N Courses" over the portrait. */
  courses: number;
  /** Ticks up while the card's Follow control is toggled. */
  followers: number;
  rating: number;
};

/** Everything the index reads from the request, normalised. */
export type CreatorsQuery = {
  /** The free-text search, echoed back into the hero's input. */
  q: string;
  /** The selected category slug, or null when "All" is showing. */
  category: string | null;
  /** The requested page, clamped to the filtered set's page count. */
  page: number;
};

/** One page of a filtered result set. */
export type CreatorsSelection = {
  creators: CreatorSummary[];
  /** How many creators matched, before paging. */
  total: number;
  /** How many pages the matched set spans; always at least 1. */
  pageCount: number;
  /** The page actually shown, after clamping. */
  page: number;
};

export type CreatorsIndexContent = {
  hero: CreatorsHeroContent;
  categories: CreatorsCategory[];
  resetLabel: Copy;
  emptyTitle: Copy;
  emptyBody: Copy;
  clearLabel: Copy;
  previousLabel: Copy;
  nextLabel: Copy;
};
