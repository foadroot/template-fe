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
