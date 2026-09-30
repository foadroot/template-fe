import Image from "next/image";
import { Search, Star } from "lucide-react";

import { brandButton } from "@/components/shared/brand-button";
import { Container } from "@/components/shared/container";
import { DecorativeShapes } from "@/components/shared/decorative-shapes";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { studentAvatars } from "@/features/homepage/data/homepage-assets";
import { type HeroContent } from "@/features/homepage/types/homepage.types";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/**
 * The homepage hero, matching the design's Hero_Frame (1:1695) — a 1440x1024 frame, 120
 * of which is the header this section sits under.
 *
 * Everything below is measured from that frame, so all of the magic numbers carry the
 * node they come from:
 *
 *   heading block   y=169, 935 wide, 72/86.4, two lines        (1:1792)
 *   sub-headline    y=373, 819 wide, 18/28.8, one line         (1:1793)
 *   search bar      y=462, 581x52 — 461px field + 16 + 104 button (1:1772)
 *   portrait        y=512, 578x541, centred                     (1:1796)
 *   lime ring       y=582, 1149 across, 320px inside stroke     (1:1866)
 *
 * The frame is exactly 1024 tall, so the portrait's last 29px and the whole lower half of
 * the ring are clipped by the section — reproduced here with `overflow-hidden` on the
 * section and a 512px-tall media box.
 *
 * The three floating cards are flat white: the frame gives them a background blur and an
 * inner shadow that is switched off, and no drop shadow at all, so none is drawn here.
 */
export function HeroSection({ content }: { content: HeroContent }) {
  const progress = content.statCards.find((card) => card.variant === "progress");
  const students = content.statCards.find((card) => card.variant === "avatars");

  return (
    <section className="brand-grid relative isolate overflow-hidden bg-brand-primary">
      <DecorativeShapes variant="hero" />

      <Container className="relative flex flex-col items-center pt-[49px]">
        <h1 className="max-w-[935px] text-center font-display text-heading-s font-semibold text-balance text-brand-on-primary sm:text-heading-m lg:text-heading-l">
          {content.headline.value}
        </h1>

        {/* 32px below the headline (1:1792 ends at 401, 1:1793 starts at 405) and set in
            the neutral-100 the frame specifies rather than a white tint. */}
        <p className="mt-8 max-w-[819px] text-center text-body-l text-brand-neutral-100">
          {content.subheadline.value}
        </p>

        {/* `items-start`, not centered: the frame puts the 46px button on the field's own
            top edge (1:1776 sits at y=462 beside the 52px field), so it hangs 6px short
            at the bottom rather than being even on both sides. */}
        <form
          role="search"
          action={routes.publicRoutes.courses.list}
          className="mt-[60px] flex w-full max-w-[581px] items-start gap-4"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search courses
          </label>
          <div className="relative flex-1">
            {/* The frame insets a 24px glyph 24px from the field's left edge (1:1774)
                and starts the placeholder 56px in. */}
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-6 size-6 -translate-y-1/2 text-brand-muted-foreground"
            />
            <input
              id="hero-search"
              type="search"
              name="q"
              placeholder={content.searchPlaceholder}
              className="h-[52px] w-full rounded-brand-pill border border-transparent bg-brand-card pr-6 pl-14 text-body-l text-brand-foreground outline-none placeholder:text-brand-muted-foreground focus-visible:ring-3 focus-visible:ring-white/60"
            />
          </div>
          {/* 104x46 — deliberately 3px shorter than the field on each edge, as the frame
              draws it — with the label at 18px medium. */}
          <button
            type="submit"
            className={cn(
              buttonVariants(),
              brandButton.accent,
              "h-[46px] shrink-0 px-6 text-label-l font-medium",
            )}
          >
            {content.searchButtonLabel.value}
          </button>
        </form>

        {/* The media box is the portrait's own 578x541 footprint, clipped to the 512px the
            frame leaves for it. The ring, the portrait and the cards all hang off this box,
            which is why the cards are placed with negative offsets. */}
        <div className="relative -mt-0.5 aspect-[578/512] w-[82%] max-w-[578px] sm:w-[70%] lg:aspect-auto lg:h-[512px] lg:w-[578px] lg:max-w-none">
          {/* 1149 across, centred, top edge 70px below the portrait's (1:1866). */}
          <div
            aria-hidden
            className="brand-ring absolute top-[70px] left-1/2 aspect-square w-[199%] -translate-x-1/2"
          />

          {/* The artwork's own eight-layer drop shadow, collapsed to the two that read at
              this size. */}
          <div className="absolute inset-x-0 top-0 drop-shadow-[0_24px_36px_rgba(0,0,0,0.22)]">
            <ImagePlaceholder
              src={content.image}
              ratio="578/541"
              alt={content.imageAlt}
              priority
              rounded=""
              sizes="(min-width: 1024px) 578px, 70vw"
            />
          </div>

          {/* 208x70 at x=404 — 27px left of the portrait's left edge, 127px down. */}
          <div className="absolute top-[24.8%] -left-[27px] hidden w-[208px] rounded-brand-card bg-brand-card p-4 md:block">
            <p className="text-label-m font-medium text-brand-foreground">
              {content.categoryCard.title.value}
            </p>
            <p className="flex items-center gap-2 text-body-xs text-brand-muted-foreground">
              {content.categoryCard.meta.map((part, index) => (
                <span key={part.value} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>•</span> : null}
                  {part.value}
                </span>
              ))}
            </p>
          </div>

          {progress ? (
            <div className="absolute top-[27.1%] -right-[65px] hidden w-[232px] rounded-brand-card bg-brand-card p-4 md:block">
              <p className="text-label-s font-medium text-brand-foreground">
                {progress.label.value}
              </p>
              <p className="mt-2 font-display text-heading-xl font-semibold text-brand-foreground">
                {progress.value.value}
              </p>
              <div
                aria-hidden
                className="mt-2 h-2 w-full overflow-hidden rounded-brand-pill bg-brand-chip"
              >
                <div
                  className="h-full rounded-brand-pill bg-brand-accent"
                  style={{ width: `${progress.progress ?? 0}%` }}
                />
              </div>
            </div>
          ) : null}

          {students ? (
            <div className="absolute top-[63.5%] -left-[103px] hidden w-[258px] rounded-brand-card bg-brand-card p-4 md:block">
              <p className="text-label-m font-medium text-brand-foreground">
                {students.label.value}
              </p>
              <p className="flex items-center gap-0 text-body-xs text-brand-muted-foreground">
                {students.meta?.value}
                <Star
                  aria-hidden
                  className="size-4 fill-brand-accent text-brand-accent"
                />
              </p>
              <div className="mt-2 flex items-center">
                {studentAvatars.slice(0, students.avatars ?? 0).map((src) => (
                  <span
                    key={src}
                    aria-hidden
                    className="relative size-[43px] shrink-0 overflow-hidden rounded-full bg-brand-surface-muted first:ml-0 -ml-4"
                  >
                    <Image src={src} alt="" fill sizes="43px" className="object-cover" />
                  </span>
                ))}
                {/* The row ends on a lime badge rather than another portrait (1:1835). */}
                <span className="-ml-4 grid size-[43px] shrink-0 place-items-center rounded-full bg-brand-accent text-label-xs font-bold text-brand-foreground">
                  {students.value.value}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
