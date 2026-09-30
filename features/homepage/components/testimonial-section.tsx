import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionWash, WashLayer } from "@/components/shared/section-wash";
import { type TestimonialsContent } from "@/features/homepage/types/homepage.types";

/**
 * The testimonials section (`34:1175`, a 1440x784 frame at y 5068): three soft washes
 * behind a heading block and three quote cards.
 *
 * The design's numbers, all measured: the content (`34:1176`) is 74px down from the
 * section's top and 57px clear of its bottom; the heading block is 1200 wide with the
 * 577px headline and the 580px paragraph bottom-aligned 43px apart; the cards (`34:1182`)
 * are 374 wide over a 41px gutter, each with 24px of padding and 24px between the
 * portrait, the name block and the quote — and they hug their own content, so the three
 * end at different heights.
 *
 * Two of the frame's numbers only land with Figma's own line-box rounding: it lays the
 * 18px/28.8 body out on 29px lines, which is what makes the paragraph 145 tall (five
 * lines) and the tallest card 436 (a 57px name block over a 203px quote). The body scale
 * elsewhere is 28.8 and stays 28.8, so the three lines that have to round carry it
 * themselves.
 *
 * The washes are the design's own construction — big ellipses filled with a radial
 * gradient that fades a brand colour to nothing — so they are drawn with radial gradients
 * rather than committed as an asset (design.md D7). The design lets them bleed past the
 * section's top edge; this section clips, which trims the outer, near-transparent part of
 * the largest one.
 */
export function TestimonialSection({
  content,
}: {
  content: TestimonialsContent;
}) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Testimonials"
      className="relative overflow-hidden bg-brand-section"
    >
      <WashLayer>
        <SectionWash x={842} y={-241} size={1137} tone="lime" opacity={0.4} />
        <SectionWash x={395} y={-138} size={672} tone="lime" opacity={0.6} />
        <SectionWash x={-442} y={149} size={1137} tone="primary" opacity={0.24} />
      </WashLayer>

      <Container className="relative">
        <div className="flex flex-col gap-[72px] pt-[74px] pb-[57px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[43px]">
            <h2 className="max-w-[577px] font-display text-heading-s font-semibold text-black lg:text-heading-m">
              {content.headline.value}
            </h2>
            <p className="max-w-[580px] text-body-l leading-[29px] text-brand-foreground-soft">
              {content.body.value}
            </p>
          </div>

          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-[41px]">
            {content.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-6 rounded-brand-panel bg-brand-card p-6"
              >
                <div className="size-20 shrink-0">
                  <ImagePlaceholder
                    src={item.avatar}
                    ratio="1/1"
                    rounded="rounded-full"
                    alt={item.avatarAlt}
                    sizes="5rem"
                  />
                </div>

                <div>
                  {/* The design sets the name on a 28px line, which is what makes its
                      tallest card 436 high (34:1191). */}
                  <p className="font-display text-heading-xs leading-7 font-semibold text-black">
                    {item.name.value}
                  </p>
                  <p className="text-body-l leading-[29px] text-brand-primary">{item.role.value}</p>
                </div>

                <blockquote className="text-body-l leading-[29px] text-brand-foreground-soft">
                  {item.quote.value}
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

