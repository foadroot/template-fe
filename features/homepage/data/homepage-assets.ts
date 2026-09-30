/**
 * The homepage's imagery, lifted from the Figma file and shipped in `public/`.
 *
 * The rows below are the design's own, read node by node off the Home frame (`1:1067`)
 * rather than guessed: every circle in an overlapping portrait row carries an image fill,
 * and the fills are listed in the order the frame paints them, left to right.
 *
 * Keeping them here rather than inline in the components means the copy in
 * `homepage.data.ts` stays copy — the copy file already runs to hundreds of strings — and
 * that the one place a card's portrait order can drift from the file is one list.
 */

/**
 * The 32px learner row drawn under every course card's level (nodes `13:266`-`13:269`
 * and their five siblings). All six cards use the same four portraits.
 */
export const learnerAvatars: readonly string[] = [
  "/shared/avatar-creator.png",
  "/shared/avatar-01.png",
  "/home/avatar-testimonial-01.png",
  "/shared/avatar-02.png",
];

/**
 * The 43px "Happy Students" row (nodes `1:1828`-`1:1834`, repeated at
 * `34:1045`-`34:1051`): seven portraits, the same seven in both cards.
 */
export const studentAvatars: readonly string[] = [
  "/course-reviews/avatar-reviewer-04.png",
  "/shared/avatar-creator.png",
  "/auth/avatar-students-01.png",
  "/auth/avatar-students-02.png",
  "/auth/avatar-students-03.png",
  "/auth/avatar-students-04.png",
  "/auth/avatar-students-05.png",
];

/**
 * The six course covers, in grid order. The design repeats one card six times but gives
 * each instance its own fill (nodes `13:250`, `33:519`, `33:552`, `33:585`, `33:616`,
 * `33:647`), so the grid varies its artwork the way the frame does.
 */
export const courseCovers: readonly string[] = [
  "/courses/cover-wireframe-sketching.jpg",
  "/courses/cover-app-icons.jpg",
  "/courses/cover-analytics-dashboard.jpg",
  "/courses/cover-desk-do-more.jpg",
  "/courses/cover-stock-chart.jpg",
  "/courses/cover-team-workshop.jpg",
];
