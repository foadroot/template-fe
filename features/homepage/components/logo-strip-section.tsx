import Image from "next/image";

import { Marquee } from "@/components/motion/marquee";
import { Container } from "@/components/shared/container";
import { type LogoStripContent } from "@/features/homepage/types/homepage.types";

/**
 * The partner logo band (`1:1794`), rebuilt as an infinite ticker.
 *
 * Two sources, deliberately:
 *
 * - The band itself — its neutral-50 fill, the responsive padding and the marks' hover
 *   treatment — is bytespace-dointech's sponsor strip (`Sponser.tsx`), and so are the five
 *   PNGs it renders, copied to `public/partners/`. Those assets are 167-170x41-42, i.e.
 *   exactly the box the design measures for its own row, so the two agree rather than
 *   merely approximate each other. The frame carries no stroke of its own (1:1794 has
 *   none), so the reference's hairline rules are dropped; what is kept is the frame's own
 *   arithmetic — 80 of padding, a 42px row, 80 more, which is its 202.
 * - The scrolling is `components/motion/marquee.tsx`, ported from template-education: a
 *   CSS transform animation with a seamless -50% loop, edge mask, pause-on-hover and a
 *   reduced-motion fallback that lays the marks out in a static wrapping row.
 *
 * The design's own row is static, so the marquee is the one place this section departs
 * from the frame; everything measurable about it — band, mark size, mark count — is kept.
 */
export function LogoStripSection({ content }: { content: LogoStripContent }) {
  if (content.logos.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Trusted Sponsors and Partners"
      className="w-full bg-brand-surface-muted py-10 md:py-14 lg:py-20"
    >
      <Container>
        <Marquee speed={38}>
          {content.logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center opacity-90 transition-transform duration-200 hover:scale-105 hover:opacity-100"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={168}
                height={41}
                className="h-7 w-auto object-contain select-none md:h-8 lg:h-[42px]"
              />
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
