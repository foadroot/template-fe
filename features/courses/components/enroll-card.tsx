import Link from "next/link";
import { CodeXml, IdCard, UserRoundCheck, Video } from "lucide-react";
import { type LucideIcon } from "lucide-react";

import { routes } from "@/config/routes";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { cn } from "@/lib/utils";
import { courseCreatorAvatar } from "@/features/courses/data/course-assets";
import { type CourseIncludeIcon, type EnrollCardContent } from "@/features/courses/types/courses.types";

const includeIcon: Record<CourseIncludeIcon, LucideIcon> = {
  resources: CodeXml,
  videos: Video,
  certificate: IdCard,
  consultation: UserRoundCheck,
};

/**
 * The white enrolment card at (908,416) of the Course Details frame (55:4066): 412px
 * wide, hanging 603px above the content column so it straddles the blue band and the
 * white panel below it.
 *
 * The Lessons and Reviews panels start 16.5px lower than the About panel does, so those
 * two pages pass a `lg:top-[-620px]` of their own; the card itself is identical in all
 * three frames.
 *
 * It is absolutely placed from the wider breakpoint up, which is also what lets it stay
 * first in the markup: on a narrow screen it reads as the call to action above the tabs,
 * and on a wide one it floats beside them without taking part in the column's flow.
 *
 * The line heights are the frame's own — the 16px body face runs at 26px there rather
 * than the scale's 24px, and the syllabus titles run at 19px so two lines land on the
 * 38px row the card is drawn with.
 */
export function EnrollCard({
  content,
  className,
}: {
  content: EnrollCardContent;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "w-full rounded-[24px] border border-brand-border bg-white p-[39px] lg:absolute lg:top-[-603.5px] lg:right-6 lg:w-[412px]",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
            {content.lessonsHeading.value}
          </h2>

          <div className="flex flex-col gap-3">
            <ul className="flex flex-col gap-3">
              {content.lessons.map((lesson) => (
                <li
                  key={lesson.index}
                  className="flex items-start justify-between pr-[9px]"
                >
                  <span className="flex min-w-0 gap-2">
                    <span className="w-6 shrink-0 text-label-m font-medium text-brand-foreground">
                      {lesson.index}
                    </span>
                    <span className="min-w-0 flex-1 text-label-m font-medium text-brand-foreground lg:w-[194px] lg:flex-none">
                      {lesson.title.value}
                    </span>
                  </span>
                  <span className="shrink-0 text-[16px] leading-[26px] text-brand-primary">
                    {lesson.duration.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[16px] leading-[26px] text-brand-neutral-700">
              {content.moreVideos.value}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-[16px] leading-[26px] text-brand-neutral-700">
            {content.blurb.value}
          </p>

          <p className="flex h-[38px] items-end">
            <span className="font-display text-[36px] font-semibold leading-[38px] tracking-[-0.01em] text-brand-primary">
              {content.price.value}
            </span>
            <span className="text-[16px] leading-[26px] text-brand-neutral-700">
              {content.priceSuffix.value}
            </span>
          </p>

          {/* Not wired to a session: the frame draws the control and no checkout. */}
          <button
            type="button"
            className="inline-flex h-[46px] w-full cursor-pointer items-center justify-center rounded-brand-pill bg-brand-accent text-label-l font-medium text-brand-foreground outline-none transition-colors hover:bg-brand-accent-hover focus-visible:ring-3 focus-visible:ring-brand-primary/40"
          >
            {content.ctaLabel.value}
          </button>
        </div>

        <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
          {content.includesHeading.value}
        </h2>

        <ul className="flex flex-col gap-3">
          {content.includes.map((item) => {
            const Icon = includeIcon[item.icon];

            return (
              <li key={item.icon} className="flex items-start gap-2">
                <Icon aria-hidden className="size-6 shrink-0 text-brand-primary" />
                <span className="text-[16px] leading-[26px] text-brand-neutral-700">
                  {item.label.value}
                </span>
              </li>
            );
          })}
        </ul>

        <div aria-hidden className="h-px w-full bg-[#d1d1d1]" />

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <ImagePlaceholder
              src={courseCreatorAvatar}
              ratio="1/1"
              rounded="rounded-full"
              alt={`${content.creatorName.value} avatar`}
              sizes="3.25rem"
              className="w-[52px] shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-label-l font-medium text-brand-foreground">
                {content.creatorName.value}
              </span>
              <span className="text-[16px] leading-[26px] text-brand-neutral-700">
                {content.creatorRole.value}
              </span>
            </div>
          </div>

          <p className="text-[16px] leading-[26px] text-brand-neutral-700">
            {content.creatorBlurb.value}
          </p>

          <Link
            href={routes.publicRoutes.creators.profile("purepearl-studio")}
            className="inline-flex h-[35px] w-fit items-center rounded-brand-pill border border-brand-border px-4 text-label-m font-medium text-brand-neutral-700 outline-none transition-colors hover:bg-brand-surface-muted focus-visible:ring-3 focus-visible:ring-brand-primary/40"
          >
            {content.profileLabel.value}
          </Link>
        </div>
      </div>
    </aside>
  );
}
