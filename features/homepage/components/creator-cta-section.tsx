import { Reveal } from "@/components/motion/reveal";
import { brandButton } from "@/components/shared/brand-button";
import { Container } from "@/components/shared/container";
import { DecorativeShapes } from "@/components/shared/decorative-shapes";
import { buttonVariants } from "@/components/ui/button";
import { type CreatorCtaContent } from "@/features/homepage/types/homepage.types";
import { cn } from "@/lib/utils";

/**
 * The creator call-to-action band (`34:1161`, a 1440x488 frame at y 4580): the brand
 * surface carrying the grid, its decorative shapes, a centred headline and paragraph, and
 * one lime control.
 *
 * The frame's content (`34:1170`) is 964 wide and 319 tall — a two-line headline whose own
 * measure is 710, a 964-wide three-line paragraph and a 172x46 button, 40px apart —
 * centred in the 488px band, which leaves 85px above and 84 below. The band's grid starts
 * at its own top edge rather than on the page's 120px rhythm, which is what `brand-grid`
 * does.
 */
export function CreatorCtaSection({ content }: { content: CreatorCtaContent }) {
  return (
    <section className="brand-grid relative overflow-hidden bg-brand-primary">
      <DecorativeShapes variant="band" />

      <Container className="relative">
        <div className="mx-auto flex max-w-[964px] flex-col items-center gap-10 py-[85px] text-center">
          {/* 710 rather than the block's 964: the design's headline node wraps at its own
              width, which is what breaks it after "a" (34:1171). Headline, body and
              control reveal in sequence, 120ms apart. */}
          <Reveal
            as="h2"
            className="max-w-[710px] font-display text-heading-s font-semibold text-brand-neutral-50 lg:text-heading-m"
          >
            {content.headline.value}
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="text-body-l text-brand-neutral-50"
          >
            {content.body.value}
          </Reveal>
          <Reveal
            as="a"
            href={content.ctaHref}
            delay={240}
            className={cn(
              buttonVariants(),
              brandButton.accent,
              "h-[46px] px-6 text-label-l",
            )}
          >
            {content.ctaLabel.value}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
