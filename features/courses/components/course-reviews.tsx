import { Star } from "lucide-react";

import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { cn } from "@/lib/utils";
import { reviewerAvatars } from "@/features/courses/data/course-assets";
import {
  type CourseRatingSummary,
  type CourseReviewsContent,
} from "@/features/courses/types/courses.types";

/**
 * The star rows are grey `star_rate` glyphs at 24px, four pixels apart. The frame draws
 * a full five on every row — the per-rating distinction lives in the bars instead — so
 * the count is a constant rather than data.
 */
function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex shrink-0 items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden
          className="size-6 shrink-0 fill-current text-brand-neutral-700"
        />
      ))}
    </span>
  );
}

/** The white card at (120,1269): the lime score tile beside five bar rows. */
function RatingSummary({ summary }: { summary: CourseRatingSummary }) {
  // The frame's stroke sits inside its 40px padding, so the CSS padding is 39px to keep
  // the first child 40px from the card's outer edge.
  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-brand-border bg-white p-[39px] md:flex-row md:items-center">
      <div className="flex w-[129px] shrink-0 flex-col items-center rounded-[8px] bg-brand-accent p-10">
        <span className="text-label-s font-medium text-brand-foreground">
          {summary.scoreLabel.value}
        </span>
        <span className="font-display text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-brand-foreground">
          {summary.score.value}
        </span>
      </div>

      <ul className="flex min-w-0 flex-1 flex-col gap-1">
        {summary.bars.map((bar) => (
          <li key={bar.count.value} className="flex items-center gap-4">
            <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-brand-pill bg-brand-neutral-100">
              <span
                className="block h-full rounded-brand-pill bg-brand-accent"
                style={{ width: `${bar.percent}%` }}
              />
            </span>
            <Stars />
            <span className="w-10 shrink-0 text-[16px] leading-[26px] text-brand-neutral-700">
              {bar.count.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The Reviews panel of the Course Reviews frame (60:681): the summary card, the rating
 * filter row and the four review cards, in one 24px-spaced column.
 *
 * The frame gives the first card's body a 24px line height and the other three 26px;
 * the panel runs them all at 26px, which costs six pixels against the file and is paid
 * back out of the section's bottom padding so the footer still lands at y=2924.
 */
export function CourseReviews({
  content,
  className,
}: {
  content: CourseReviewsContent;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.heading.value}
      </h2>

      <p className="max-w-[723px] text-[16px] leading-[26px] text-brand-neutral-700">
        {content.intro.value}
      </p>

      <RatingSummary summary={content.summary} />

      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.listHeading.value}
      </h2>

      <div className="flex flex-wrap items-start gap-4">
        <span className="inline-flex h-[43px] items-center rounded-brand-pill bg-brand-accent px-4 text-label-m font-medium text-brand-foreground">
          {content.allRatingsLabel.value}
        </span>

        {content.ratingFilters.map((filter) => (
          <span
            key={filter.value}
            className="inline-flex h-12 items-center gap-1 rounded-brand-pill bg-brand-surface-muted px-4 text-label-m font-medium text-brand-neutral-700"
          >
            <Star aria-hidden className="size-6 shrink-0 fill-current" />
            {filter.value}
          </span>
        ))}
      </div>

      <ul className="flex flex-col gap-6">
        {content.reviews.map((review, index) => (
          <li key={review.name.value}>
            <article className="flex flex-col gap-6 rounded-[24px] border border-brand-border p-[39px]">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-3">
                    <ImagePlaceholder
                      src={reviewerAvatars[index % reviewerAvatars.length]}
                      ratio="1/1"
                      rounded="rounded-full"
                      alt={`${review.name.value} avatar`}
                      sizes="52px"
                      className="w-[52px] shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="text-label-l font-medium text-brand-foreground">
                        {review.name.value}
                      </span>
                      <span className="text-[16px] leading-[26px] text-brand-neutral-700">
                        {review.role.value}
                      </span>
                    </div>
                  </div>

                  <Stars />
                </div>

                <span className="shrink-0 text-[16px] leading-[26px] text-brand-neutral-700">
                  {review.posted.value}
                </span>
              </div>

              <p className="text-[16px] leading-[26px] text-brand-neutral-700">
                {review.body.value}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
