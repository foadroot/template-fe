import Image from "next/image";
import Link from "next/link";
import { SignalHigh, Star } from "lucide-react";

import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { learnerAvatars } from "@/features/homepage/data/homepage-assets";
import { type CourseCardContent } from "@/features/homepage/types/homepage.types";
import { cn } from "@/lib/utils";

/** The small pill used for the cover facts and the level. */
const chipClass =
  "inline-flex items-center rounded-brand-pill px-3 text-label-xs font-medium";

/**
 * A course card, matching the design's `Course_Card_1`: a rounded panel whose cover
 * carries three fact chips, then the title and creator with the rating beside them, then
 * the level and student stack, then the price.
 *
 * The frame's card is a fixed 373x384, so the panel is too — that is what keeps the six
 * rows of the results grid on the design's 424px pitch. The title therefore runs to one
 * line: the design's own text box is 280x24, and a wrapped title is what pushes a card
 * past 384.
 *
 * Below the cover everything is measured from `13:249`: a 341x195 cover inset 16, the
 * 13px/19px inset chip row, then 21px down to a group that runs title (24) / creator
 * (19) / 16 / level and learners (32) / 16 / price (24) — 131px, leaving the frame's last
 * 21px below it. The frame's 1px stroke is INSIDE, so the panel takes `border` plus 15px
 * of padding to land the content on that 16.
 *
 * The whole card lifts on hover and the title is the link, so the card has one tab stop
 * rather than four.
 */
export function CourseCard({ course }: { course: CourseCardContent }) {
  return (
    /* Tailwind v4 writes a hover lift to the standalone `translate` property, not
       `transform`, so the list has to name it or the card snaps while its shadow
       glides. The shadow starts 80ms behind the lift, so the card leads and its
       weight follows rather than both landing at once. */
    <article className="group relative flex h-[384px] flex-col rounded-brand-panel border border-brand-border bg-brand-card p-[15px] transition-[translate,box-shadow] duration-300 ease-out delay-[0ms,80ms] hover:-translate-y-1.5 hover:shadow-[var(--shadow-brand-card)]">
      <div className="relative">
        <ImagePlaceholder
          src={course.image}
          ratio="341/195"
          rounded="rounded-xl"
          alt={course.imageAlt}
          sizes="(min-width: 1024px) 23rem, (min-width: 640px) 45vw, 90vw"
        />

        {/* The chips sit 13px in and 19px up from the cover's edges — the frame's own
            measurements, not the cover's padding. The row is a single one in the design
            (a 315px auto-layout with all three chips inside it), so the chips hold their
            measured width rather than reflowing: our body face sets them a few pixels
            wider than the file's, and a wrap would lift the row off the cover's bottom
            edge. */}
        <ul className="absolute inset-x-[13px] bottom-[19px] flex flex-nowrap gap-3">
          {course.facts.map((fact) => (
            <li
              key={fact.value}
              className={cn(
                chipClass,
                "shrink-0 bg-brand-chip py-1.5 whitespace-nowrap text-brand-foreground",
              )}
            >
              {fact.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[21px] flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-1 font-display text-heading-xs font-semibold text-brand-foreground">
            <Link
              href={course.href}
              className="rounded-brand-panel outline-none after:absolute after:inset-0 focus-visible:ring-3 focus-visible:ring-brand-primary/40"
            >
              {course.title.value}
            </Link>
          </h3>
          <p className="text-body-xs text-brand-foreground-soft">
            {course.creator.value}
          </p>
        </div>

        <p className="flex shrink-0 items-center gap-1 text-body-l text-brand-foreground-soft">
          {course.rating.value}
          <Star
            aria-hidden
            className="size-6 fill-brand-neutral-200 text-brand-neutral-200"
          />
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={cn(
            chipClass,
            "h-8 gap-1 bg-brand-surface-muted text-brand-neutral-700",
          )}
        >
          <SignalHigh aria-hidden className="size-5 text-brand-neutral-700" />
          {course.level.value}
        </span>

        {/* Four learner portraits and the count badge, overlapping by 8px (13:265), in
            the order the frame gives its four 32px ellipses. */}
        <div aria-hidden className="flex -space-x-2">
          {learnerAvatars.map((src) => (
            <span
              key={src}
              className="relative size-8 overflow-hidden rounded-full bg-brand-neutral-200"
            >
              <Image src={src} alt="" fill sizes="2rem" className="object-cover" />
            </span>
          ))}
          <span className="grid size-8 place-items-center rounded-full bg-brand-accent text-label-xs font-medium text-brand-foreground">
            {course.students.value}
          </span>
        </div>
      </div>

      <p className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-heading-xs font-semibold text-brand-primary">
          {course.price.value}
        </span>
        <span className="text-body-xs text-brand-foreground-soft">
          {course.priceSuffix.value}
        </span>
      </p>
    </article>
  );
}
