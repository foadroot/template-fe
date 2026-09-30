import { Play, Share2, SignalHigh, Star, Users } from "lucide-react";
import { type LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { cn } from "@/lib/utils";
import { courseVideoCover } from "@/features/courses/data/course-assets";
import {
  type CourseFactIcon,
  type CourseHeroContent,
} from "@/features/courses/types/courses.types";

const factIcon: Record<CourseFactIcon, LucideIcon> = {
  level: SignalHigh,
  rating: Star,
  students: Users,
};

/**
 * The blue band at the top of the Course Details frame (55:4066, y=0-957): the identity
 * block and fact pills against the Share control, with the video player underneath.
 *
 * The frame hangs the Share pill past the content column — the row it sits in is 1283px
 * wide inside a 1200px column — so the row keeps the design's literal 392px gap rather
 * than being pushed flush right. That only fits on a wide viewport: below 1380px the
 * control drops under the fact pills instead of forcing a horizontal scrollbar. The
 * header the frame draws inside this band comes from the marketing shell.
 */
export function CourseHero({ content }: { content: CourseHeroContent }) {
  return (
    <section className="bg-brand-primary brand-grid pt-[52px] pb-[62px]">
      <Container>
        <div className="flex min-w-0 flex-col gap-6 min-[1380px]:flex-row min-[1380px]:items-start min-[1380px]:gap-[392px]">
          <div className="flex min-w-0 flex-col gap-6 min-[1380px]:shrink-0">
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-heading-s font-semibold text-brand-neutral-50">
                {content.title.value}
              </h1>
              <p className="font-display text-heading-xs font-semibold text-brand-neutral-50">
                {content.subtitle.value}
              </p>
            </div>

            <p className="text-label-l font-medium text-[#f1f4fe]">
              {content.creator.value}
            </p>

            <ul className="flex flex-wrap gap-4">
              {content.facts.map((fact) => {
                const Icon = factIcon[fact.icon];

                return (
                  <li
                    key={fact.icon}
                    className="inline-flex h-10 items-center gap-2 rounded-brand-pill bg-white px-6"
                  >
                    <Icon
                      aria-hidden
                      className={cn(
                        "size-6 shrink-0 text-brand-primary",
                        fact.icon === "rating" && "fill-current",
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

          {/* Not wired to a session: the frame draws the control and no share sheet,
              the same way the header's cart is shown without a cart. */}
          <button
            type="button"
            className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-brand-pill bg-brand-accent px-6 text-label-m font-medium transition-colors outline-none hover:bg-brand-accent-hover focus-visible:ring-3 focus-visible:ring-white/60"
          >
            <Share2 aria-hidden className="size-6 shrink-0" />
            <span>{content.shareLabel.value}</span>
          </button>
        </div>

        <div className="relative mt-[59px] ml-[5px] w-full max-w-[720px]">
          <ImagePlaceholder
            src={courseVideoCover}
            ratio="3/2"
            rounded="rounded-[24px]"
            alt={content.videoAlt}
            sizes="(min-width: 768px) 720px, calc(100vw - 68px)"
            className="bg-[#443131]"
          />

          {/* The frame centres the play control 16px low and right of the player's
              own centre; the offset is kept rather than tidied away. */}
          <button
            type="button"
            className="absolute top-1/2 left-1/2 mt-[16.5px] ml-4 flex size-[104px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#4f4f4f] bg-[#3d3d3d]/25 transition-colors outline-none hover:bg-[#3d3d3d]/40 focus-visible:ring-3 focus-visible:ring-white/60"
          >
            <Play
              aria-hidden
              className="size-[60px] fill-brand-neutral-50 text-brand-neutral-50"
            />
            <span className="sr-only">{content.playLabel}</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
