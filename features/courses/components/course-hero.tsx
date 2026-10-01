import { Play, Share2, SignalHigh, Star, Users } from "lucide-react";
import { type LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { cn } from "@/lib/utils";
import { courseVideoCover } from "@/features/courses/data/course-assets";
import { EnrollCard } from "@/features/courses/components/enroll-card";
import {
  type CourseFactIcon,
  type CourseHeroContent,
  type EnrollCardContent,
} from "@/features/courses/types/courses.types";

const factIcon: Record<CourseFactIcon, LucideIcon> = {
  level: SignalHigh,
  rating: Star,
  students: Users,
};

/**
 * The blue band at the top of the Course Details page:
 * - Headline, subtitle, creator highlight and fact pills against the Share control.
 * - Video preview player side-by-side with the white enrolment card.
 */
export function CourseHero({
  content,
  enrollContent,
}: {
  content: CourseHeroContent;
  enrollContent?: EnrollCardContent;
}) {
  const creatorText = content.creator.value;
  const isByPrefix = creatorText.toLowerCase().startsWith("by ");
  const creatorPrefix = isByPrefix ? creatorText.slice(0, 3) : "";
  const creatorName = isByPrefix ? creatorText.slice(3) : creatorText;

  return (
    <section className="bg-brand-primary brand-grid pt-10 sm:pt-14 pb-14 sm:pb-16 overflow-visible">
      <Container>
        {/* Title, Subtitle, Creator, Pills, and Share button */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-heading-s sm:text-heading-m font-semibold text-white tracking-tight">
                {content.title.value}
              </h1>
              <p className="font-display text-heading-xs font-semibold text-white/95">
                {content.subtitle.value}
              </p>
            </div>

            <p className="text-label-l font-medium text-white/90">
              {creatorPrefix && <span>{creatorPrefix}</span>}
              <span className="text-brand-accent font-semibold">{creatorName}</span>
            </p>

            <ul className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {content.facts.map((fact) => {
                const Icon = factIcon[fact.icon];

                return (
                  <li
                    key={fact.icon}
                    className="inline-flex h-10 items-center gap-2 rounded-brand-pill bg-white px-5 sm:px-6 shadow-xs"
                  >
                    <Icon
                      aria-hidden
                      className={cn(
                        "size-5 shrink-0 text-brand-primary",
                        fact.icon === "rating" && "fill-current text-brand-primary",
                      )}
                    />
                    <span className="text-label-m font-medium whitespace-nowrap text-brand-foreground">
                      {fact.label.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-brand-pill bg-brand-accent px-6 text-label-m font-semibold text-brand-foreground transition-all outline-none hover:bg-brand-accent-hover focus-visible:ring-3 focus-visible:ring-white/60 self-start sm:self-auto shadow-xs"
          >
            <Share2 aria-hidden className="size-5 shrink-0 text-brand-foreground" />
            <span>{content.shareLabel.value}</span>
          </button>
        </div>

        {/* Media & Enroll Card Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_412px] gap-8 xl:gap-[43px] items-start">
          {/* Left: Video preview player */}
          <div className="relative w-full max-w-[720px] aspect-[3/2] rounded-[24px] overflow-hidden bg-brand-violet-900 shadow-xl border border-white/10">
            <ImagePlaceholder
              src={courseVideoCover}
              ratio="3/2"
              rounded="rounded-[24px]"
              alt={content.videoAlt}
              sizes="(min-width: 1024px) 720px, calc(100vw - 48px)"
              className="bg-[#242528] object-cover w-full h-full"
            />

            {/* Cleanly centered play button */}
            <button
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-20 sm:size-24 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/35 backdrop-blur-[2px] transition-transform hover:scale-105 hover:bg-black/50 focus-visible:ring-3 focus-visible:ring-white/60 shadow-lg"
            >
              <Play
                aria-hidden
                className="size-10 sm:size-12 fill-white text-white translate-x-0.5"
              />
              <span className="sr-only">{content.playLabel}</span>
            </button>
          </div>

          {/* Right: Enroll Card */}
          {enrollContent && (
            <div className="relative w-full lg:w-[412px]">
              <div className="w-full lg:absolute lg:top-0 lg:left-0 lg:w-[412px] z-20">
                <EnrollCard content={enrollContent} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
