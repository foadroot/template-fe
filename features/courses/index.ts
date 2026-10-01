/**
 * Courses feature module — the only import surface for this feature.
 */
export { coursesContent, readCoursesQuery } from "./data/courses.data";
export { readCatalogue, readCourses } from "./data/catalogue.data";
export { readCourse } from "./data/course-detail.data";
export { coursesHref, defaultCoursesQuery, slugify } from "./lib/url";

export { CoursesSearchHero } from "./components/courses-search-hero";
export { CoursesToolbar } from "./components/courses-toolbar";
export { CategoryPills } from "./components/category-pills";
export { CourseResults } from "./components/course-results";
export { CoursesPagination } from "./components/courses-pagination";
export { CourseHero } from "./components/course-hero";
export { CourseDetailBody } from "./components/course-detail-body";
export { CourseTabs } from "./components/course-tabs";
export { CourseAbout } from "./components/course-about";
export { CourseLessons } from "./components/course-lessons";
export { CourseReviews } from "./components/course-reviews";
export { CourseTabsSection } from "./components/course-tabs-section";
export { EnrollCard } from "./components/enroll-card";

export type {
  CatalogueCourse,
  CategoryPillsContent,
  CourseAboutContent,
  CourseDetailContent,
  CourseFact,
  CourseFactIcon,
  CourseHeroContent,
  CourseInclude,
  CourseIncludeIcon,
  CourseLessonRow,
  CourseLessonsContent,
  CourseLevelOption,
  CourseModule,
  CourseRatingBar,
  CourseRatingSummary,
  CourseReview,
  CourseReviewsContent,
  CourseSortId,
  CourseSortOption,
  CourseTab,
  CourseTabId,
  CoursesHeroContent,
  CoursesPageContent,
  CoursesQuery,
  CoursesResultsContent,
  CoursesSelection,
  CoursesToolbarContent,
  CoursesToolbarFilter,
  EnrollCardContent,
  FilterIconName,
  PaginationContent,
} from "./types/courses.types";
