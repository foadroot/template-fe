import { type Copy } from "@/lib/content/copy";
import { type CourseCardContent } from "@/features/homepage/types/homepage.types";

/**
 * Which glyph a toolbar pill wears. Resolved to a component in the toolbar itself, the
 * way the homepage tiles resolve their icon names.
 */
export type FilterIconName = "filter" | "level" | "category";

/** The `Frame` band at the top of the Search Page (55:117, y=0). */
export type CoursesHeroContent = {
  headline: Copy;
  searchPlaceholder: string;
  searchButtonLabel: Copy;
};

export type CoursesToolbarFilter = {
  id: FilterIconName;
  label: Copy;
  icon: FilterIconName;
};

/** Every level the toolbar's Level control offers. */
export type CourseLevelOption = {
  slug: string;
  label: Copy;
};

/** How the result set is ordered; `relevant` is the order the frame draws. */
export type CourseSortId = "relevant" | "title" | "rating";

export type CourseSortOption = {
  id: CourseSortId;
  label: Copy;
};

/**
 * The pill row at y=432, plus the sort control flush right at x=1163. Each pill's
 * destination depends on the query already on the page, so the content carries the
 * labels and the control builds the href.
 */
export type CoursesToolbarContent = {
  filters: CoursesToolbarFilter[];
  levels: CourseLevelOption[];
  sorts: CourseSortOption[];
};

/** The `Tab_Categories` row at y=512: nine pills, the first one selected. */
export type CategoryPillsContent = {
  active: Copy;
  options: Copy[];
};

/** The `Frame 8` results grid: three columns of eighteen cards. */
export type CoursesResultsContent = {
  cards: CourseCardContent[];
};

/**
 * One entry in the searchable catalogue. The frame draws eighteen identical cards and
 * no metadata behind them, so `category`, `featured` and `ratingValue` are fixture fields
 * the filters read — none of them is drawn on the card, so they cannot move the design's
 * own grid. `level` already exists on the card and is drawn, which is why the frame's
 * eighteen keep the Beginner chip the file gives them.
 */
export type CatalogueCourse = CourseCardContent & {
  /** Slug of the category pill this card sits under. */
  category: string;
  /** Whether the toolbar's Filter control selects it. */
  featured: boolean;
  /** Numeric form of `rating`, so "Top rated" can order by it. */
  ratingValue: number;
};

/** The pagination row at y=3208. */
export type PaginationContent = {
  pages: number[];
  previousLabel: Copy;
  nextLabel: Copy;
};

/** Everything the courses feature reads from the request, normalised. */
export type CoursesQuery = {
  /** The free-text search, echoed back into the hero's input. */
  q: string;
  /** The selected category slug, or null when the default set is showing. */
  category: string | null;
  /** The selected level slug, or null when no level filter is on. */
  level: string | null;
  /** True when the footer's "Featured Courses" link has set `?featured=true`. */
  featured: boolean;
  /** The requested ordering; `relevant` when the parameter is absent. */
  sort: CourseSortId;
  /** The requested page, clamped to the filtered set's page count. */
  page: number;
};

/** One page of a filtered, ordered result set. */
export type CoursesSelection = {
  cards: CourseCardContent[];
  /** How many cards matched, before paging. */
  total: number;
  /** How many pages the matched set spans; always at least 1. */
  pageCount: number;
  /** The page actually shown, after clamping. */
  page: number;
};

export type CoursesPageContent = {
  hero: CoursesHeroContent;
  toolbar: CoursesToolbarContent;
  categories: CategoryPillsContent;
  pagination: PaginationContent;
};

/**
 * Which glyph a hero fact pill wears. The design draws three: the level, the rating and
 * the student count, each a Material icon rendered through the project's lucide set.
 */
export type CourseFactIcon = "level" | "rating" | "students";

/** One white pill in the meta row at y=317 of the Course Details frame (55:4066). */
export type CourseFact = {
  icon: CourseFactIcon;
  label: Copy;
};

/** The blue band: title block, meta row, Share control and the video player. */
export type CourseHeroContent = {
  title: Copy;
  subtitle: Copy;
  creator: Copy;
  facts: CourseFact[];
  shareLabel: Copy;
  playLabel: string;
  videoAlt: string;
};

/** A row of the three-item syllabus preview inside the enrolment card. */
export type CourseLessonRow = {
  index: string;
  title: Copy;
  duration: Copy;
};

/** Which "This course include" row an icon belongs to. */
export type CourseIncludeIcon =
  | "resources"
  | "videos"
  | "certificate"
  | "consultation";

export type CourseInclude = {
  icon: CourseIncludeIcon;
  label: Copy;
};

/** The white card at (908,416) that straddles the band and the content below it. */
export type EnrollCardContent = {
  lessonsHeading: Copy;
  lessons: CourseLessonRow[];
  moreVideos: Copy;
  blurb: Copy;
  price: Copy;
  priceSuffix: Copy;
  ctaLabel: Copy;
  includesHeading: Copy;
  includes: CourseInclude[];
  creatorName: Copy;
  creatorRole: Copy;
  creatorBlurb: Copy;
  profileLabel: Copy;
};

/** The three tabs above the panel; their hrefs are derived from the course slug. */
export type CourseTabId = "about" | "lessons" | "reviews";

export type CourseTab = {
  id: CourseTabId;
  label: Copy;
  href: string;
};

/** The About panel: description, sneak-peak strip and the key-points list. */
export type CourseAboutContent = {
  descriptionHeading: Copy;
  description: Copy;
  galleryHeading: Copy;
  keyPointsHeading: Copy;
  keyPoints: Copy[];
};

/** One entry of the Lessons panel's module list, at (120,1291) of frame 60:102. */
export type CourseModule = {
  label: Copy;
  body: Copy;
};

/**
 * The Lessons panel: the module list, the two prose blocks and the progress card.
 * The frame numbers the six rows 1, 2, 4, 5, 6, 7 — module 3 is missing from the file
 * and the list is reproduced as drawn rather than renumbered.
 */
export type CourseLessonsContent = {
  modulesHeading: Copy;
  modulesIntro: Copy;
  listHeading: Copy;
  modules: CourseModule[];
  contentHeading: Copy;
  contentBody: Copy;
  progressHeading: Copy;
  progressBody: Copy;
  progressLabel: Copy;
  progressValue: Copy;
  /** How far the lime bar runs across its track; the label above it reads 55%. */
  progressPercent: number;
};

/** One row of the rating breakdown: a bar, the star row and the vote count. */
export type CourseRatingBar = {
  count: Copy;
  /** Width of the drawn bar as a share of the 282px track. */
  percent: number;
};

export type CourseRatingSummary = {
  scoreLabel: Copy;
  score: Copy;
  bars: CourseRatingBar[];
};

export type CourseReview = {
  name: Copy;
  role: Copy;
  posted: Copy;
  body: Copy;
};

/** The Reviews panel: summary card, rating filter row and the review list. */
export type CourseReviewsContent = {
  heading: Copy;
  intro: Copy;
  summary: CourseRatingSummary;
  listHeading: Copy;
  allRatingsLabel: Copy;
  ratingFilters: Copy[];
  reviews: CourseReview[];
};

/** Everything the `/courses/[slug]` shell renders, resolved for one slug. */
export type CourseDetailContent = {
  slug: string;
  hero: CourseHeroContent;
  tabs: CourseTab[];
  about: CourseAboutContent;
  lessons: CourseLessonsContent;
  reviews: CourseReviewsContent;
  enroll: EnrollCardContent;
};
