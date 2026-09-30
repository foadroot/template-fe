import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The shared frame of the sign in / sign up screens, ported from the design's own
 * `Register_Frame` / `Register_Frame` on nodes 47:362 and 49:220.
 *
 * Two columns, measured at 1440: an intro column of 475 at x=122, a 144px gutter, and a
 * white card of 579 flush to the content column's right edge (x=741..1320). The card is
 * white, radius 24, with no stroke, 63px side padding and 61px above its content. Its
 * 453px content column is a stack with a 40px gap between the eyebrow/title block and
 * the fields, and — because the two frames stack differently — the frame and the card's
 * bottom padding are derived from whether there is anything between the fields and the
 * cross-link:
 *
 * - Register (47:363): fields, **122px**, cross-link, 51px to the card's edge.
 * - Login (49:221): fields, **73px**, the "or" + social block, **73px**, cross-link,
 *   40px to the card's edge.
 *
 * Both add up to the same 784px card, so the card itself needs no fixed height.
 *
 * The intro column's copy and the card's copy both differ per screen, and the form sits
 * between them, so neither can live in a layout — this component takes them all and the
 * two screens cannot drift apart.
 */
export function AuthScreen({
  introHeading,
  introBody,
  eyebrow,
  title,
  beforeFooter,
  footer,
  children,
}: {
  introHeading: string;
  introBody: string;
  eyebrow: string;
  title: string;
  beforeFooter?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const hasAside = beforeFooter !== undefined;

  return (
    <div className="grid gap-10 py-8 xl:grid-cols-[477px_579px] xl:gap-[144px] xl:items-start xl:py-0">
      <div className="flex flex-col gap-4 xl:ml-[2px]">
        <h1 className="font-display text-heading-xs font-semibold text-brand-neutral-50">
          {introHeading}
        </h1>
        <p className="text-body-l leading-[29px] text-brand-neutral-50">{introBody}</p>
      </div>

      <div
        className={cn(
          "mx-auto w-full max-w-[579px] rounded-brand-panel bg-white px-6 py-10 sm:px-10 xl:mx-0 xl:px-[63px] xl:pt-[61px]",
          hasAside ? "xl:pb-[40px]" : "xl:pb-[51px]",
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col gap-6",
            hasAside ? "xl:gap-[73px]" : "xl:gap-[122px]",
          )}
        >
          <div className="flex flex-col gap-10">
            {/* Both frames stack these two with no gap: the eyebrow's 29px line box
                ends exactly where the title's begins. Figma rounds each line box to a
                whole pixel — 18/28.8 renders as 29, 44/52.8 as 53 — so the two are
                pinned here; left at their computed values the card comes out 1.6px short
                and every box below it drifts with it. */}
            <div className="flex flex-col">
              <p className="text-body-l leading-[29px] text-brand-primary">{eyebrow}</p>
              <h2 className="font-display text-heading-m leading-[53px] font-semibold text-brand-neutral-950">
                {title}
              </h2>
            </div>

            {/* The frame's field stack is right-aligned (`counterAxisAlignItems: MAX`),
                which is what puts the submit pill under the fields' right edge. */}
            <div className="flex flex-col items-end gap-6">{children}</div>
          </div>

          {beforeFooter}

          <div className="flex justify-center">{footer}</div>
        </div>
      </div>
    </div>
  );
}
