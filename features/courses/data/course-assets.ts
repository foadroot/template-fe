/**
 * The courses feature's imagery: sample photographs fetched from Unsplash and shipped
 * in `public/unsplash/`, following the same shape as `homepage-assets.ts` — paths live
 * here once, so the copy in `catalogue.data.ts` and `course-detail.data.ts` stays copy.
 *
 * Every slot that used to render `ImagePlaceholder`'s striped fallback now reads from
 * here: the results grid's covers, the detail hero's preview still, the About panel's
 * sneak-peak strip, and the creator and reviewer portraits.
 */

/**
 * The six covers the results grid cycles through. The catalogue interleaves six titles
 * by the same index, so a title keeps its artwork on every card it appears on — the
 * pattern the homepage grid already establishes with `courseCovers`.
 */
export const courseCoverImages: readonly string[] = [
  "/unsplash/cover-figma-basics.jpg",
  "/unsplash/cover-digital-assets.jpg",
  "/unsplash/cover-big-data.jpg",
  "/unsplash/cover-productivity.jpg",
  "/unsplash/cover-money-management.jpg",
  "/unsplash/cover-startup-success.jpg",
];

/** The detail hero's video player still (frame 55:4066, 3/2 inside the band). */
export const courseVideoCover = "/unsplash/video-cover.jpg";

/** The About panel's four 167×125 sneak-peak thumbnails, in row order. */
export const courseGalleryImages: readonly string[] = [
  "/unsplash/sneak-peak-01.jpg",
  "/unsplash/sneak-peak-02.jpg",
  "/unsplash/sneak-peak-03.jpg",
  "/unsplash/sneak-peak-04.jpg",
];

/** The enrolment card's 52px creator portrait. */
export const courseCreatorAvatar = "/unsplash/avatar-creator.jpg";

/**
 * The four review portraits, matching the four reviews `course-detail.data.ts` draws;
 * the modulo keeps a longer fixture list supplied if one is ever added.
 */
export const reviewerAvatars: readonly string[] = [
  "/unsplash/avatar-reviewer-01.jpg",
  "/unsplash/avatar-reviewer-02.jpg",
  "/unsplash/avatar-reviewer-03.jpg",
  "/unsplash/avatar-reviewer-04.jpg",
];
