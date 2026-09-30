import { Star } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { MouseParallax } from "@/components/motion/parallax";
import { CourseCard, homepageContent } from "@/features/homepage";
import { studentAvatars } from "@/features/homepage/data/homepage-assets";

/**
 * The decorative collage that fills the left half of the Register (47:351) and Login
 * (49:195) frames. Both frames carry the same composition at the same coordinates, so it
 * lives here once and the layout paints it behind the screens.
 *
 * Everything is measured off `47:351` in frame coordinates (the frame's own 0,0). The
 * frame paints its children in order, so the list below is the paint order bottom-up:
 *
 * | node    | element                          | box                    |
 * | ------- | -------------------------------- | ---------------------- |
 * | `49:32` | course card, "Build Digital Asset" | (122, 394) 373x384   |
 * | `49:63` | course card, "the Power of Big Data" | (233, 305) 373x384 |
 * | `49:132` | lime "Happy Students" card      | (348, 740) 258x123    |
 * | `49:180` | blob silhouette, off-white       | (470.8, 626) 175.8    |
 * | `49:185` | cone silhouette, lime            | (149.5, 319.7) 146.7  |
 * | `49:190` | cone silhouette, lime            | (95, 701.6) 188.9     |
 *
 * The three ornaments are not photographs in the design: each is an image fill masked by
 * its own alpha over a flat rectangle (`49:184` #F5F5F6, `49:189` and `49:194` #D4FB20),
 * so the visible result is a flat silhouette. The files in `public/ornaments/` were cut
 * from the photos' alpha channels for exactly this, and none of the three frames clips
 * its content, so they are placed on the image rect rather than the frame rect.
 *
 * The two course cards are the design's own repeated component — same 373x384 box, same
 * facts, same covers as the Home grid — so they reuse `CourseCard` and the fixtures at
 * `courseGrid.cards[1]` and `[2]`, whose covers are the two fills the frames carry
 * (`c8826419` → cover-app-icons, `4f3bdea5` → cover-analytics-dashboard).
 *
 * The whole block is decorative: it repeats no information the screen does not already
 * carry, so it is `aria-hidden` and `inert` — inert keeps the duplicate course links out
 * of the tab order, which `aria-hidden` alone does not do.
 *
 * It only renders from `xl` up. The collage is authored against a 1440px stage (the same
 * stage treatment the hero ornaments use) and its right edge sits at x=606; below the
 * two-column breakpoint there is no room for it beside the card.
 *
 * Motion matches the hero: the stage is a `MouseParallax` source, every box is a
 * `.parallax-layer` at its own depth (near pieces track the pointer further), and each
 * idles on `animate-float` / `animate-float-alt` with its own phase so the collage
 * breathes instead of bobbing as one block. `pointer-events-none` pairs with `inert`
 * (decorative content should not take the pointer at all) and keeps the window-level
 * mousemove that feeds the parallax unblocked over the collage.
 */
export function AuthComposition() {
  const cards = homepageContent.courseGrid.cards;

  return (
    <div
      aria-hidden
      inert
      className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block"
    >
      {/* The stage doubles as the parallax source: every box below is also a
          `.parallax-layer`, so the collage leans with the pointer (near pieces
          further than far ones) while each piece idles on its own float. */}
      <MouseParallax
        className="absolute top-0 left-1/2 h-full w-[1440px] -translate-x-1/2 select-none"
        max={14}
      >
        <AbsoluteBox
          left={122}
          top={394}
          width={373}
          depth="1.3"
          float="animate-float"
          delay="0.3s"
        >
          <CourseCard course={cards[1]} />
        </AbsoluteBox>

        <AbsoluteBox
          left={233}
          top={305}
          width={373}
          depth="0.9"
          float="animate-float-alt"
          delay="1.1s"
        >
          <CourseCard course={cards[2]} />
        </AbsoluteBox>

        <HappyStudentsCard
          style={
            {
              left: 348,
              top: 740,
              "--depth": "1.7",
              animationDelay: "2s",
            } as CSSProperties
          }
        />

        <CollageOrnament
          src="/ornaments/blob-386-white.png"
          left={470.8}
          top={626}
          size={175.81}
          depth="0.6"
          float="animate-float-alt"
          delay="0.6s"
        />
        <CollageOrnament
          src="/ornaments/cone-343-lime.png"
          left={149.5}
          top={319.7}
          size={146.72}
          depth="1.1"
          float="animate-float"
          delay="1.5s"
        />
        <CollageOrnament
          src="/ornaments/cone-189-lime.png"
          left={95}
          top={701.6}
          size={188.93}
          depth="1.4"
          float="animate-float-alt"
        />
      </MouseParallax>
    </div>
  );
}

/** A fixed-size box on the 1440px collage stage, floating and drifting with the pointer. */
function AbsoluteBox({
  left,
  top,
  width,
  depth,
  float,
  delay = "0s",
  children,
}: {
  left: number;
  top: number;
  width: number;
  /** Parallax multiplier: near pieces sit higher than far ones (~0.6–1.7). */
  depth: string;
  /** Which idle keyframe it rides — neighbours alternate so they drift apart. */
  float: string;
  /** Phase offset, so the collage never bobs as one block. */
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`parallax-layer absolute ${float}`}
      style={
        {
          left,
          top,
          width,
          "--depth": depth,
          animationDelay: delay,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** One masked ornament, placed on its image rect. */
function CollageOrnament({
  src,
  left,
  top,
  size,
  depth,
  float,
  delay = "0s",
}: {
  src: string;
  left: number;
  top: number;
  size: number;
  depth: string;
  float: string;
  delay?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={Math.round(size)}
      height={Math.round(size)}
      className={`parallax-layer absolute max-w-none ${float}`}
      style={
        {
          left,
          top,
          width: size,
          height: size,
          "--depth": depth,
          animationDelay: delay,
        } as CSSProperties
      }
    />
  );
}

/**
 * The frame's lime stat card (`49:132`, 258x123 on #D4FB20 at radius 16): a 16px-padded
 * column of "Happy Students" over a 10px rating line, then eight 43px slots — the seven
 * portraits from `1:1828`-`1:1834` and a dark count badge — overlapping by 16 (`49:138`
 * is a -16 auto-layout gap, so the pitch is 27).
 */
function HappyStudentsCard({ style }: { style: CSSProperties }) {
  return (
    <div
      className="parallax-layer animate-float absolute w-[258px] rounded-brand-card bg-brand-accent p-4"
      style={style}
    >
      <p className="text-[16px] leading-6 font-medium text-brand-neutral-950">
        Happy Students
      </p>
      <p className="flex items-center text-[10px] leading-[15px] text-brand-neutral-800">
        4.5 (240)
        <Star
          aria-hidden
          className="size-4 fill-brand-primary text-brand-primary"
        />
      </p>

      <div className="mt-2 flex items-center">
        {studentAvatars.map((src) => (
          <span
            key={src}
            className="relative -ml-4 size-[43px] shrink-0 overflow-hidden rounded-full bg-brand-neutral-50 first:ml-0"
          >
            <Image src={src} alt="" fill sizes="43px" className="object-cover" />
          </span>
        ))}
        <span className="-ml-4 grid size-[43px] shrink-0 place-items-center rounded-full bg-brand-neutral-950 text-[12px] leading-[18px] font-bold text-brand-neutral-50">
          2K+
        </span>
      </div>
    </div>
  );
}
