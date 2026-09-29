import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { type CreatorProfileContent } from "@/features/creators/types/creators.types";

/**
 * The profile band (frame 60:1878, y=0-592): the brand surface with its 120px grid,
 * carrying the identity block and the two count pills against the Follow control.
 *
 * The frame puts the whole block at x=122, y=172 — 52px under the header's 120 — and
 * closes the band 82px below the stat row, which is the 472px this section adds on top
 * of the shell's 120px header. The bio runs the full content width even though the block
 * above it stops at 902, so it sits as a sibling of the identity row rather than inside
 * it: that is what keeps the stat row 40px under a four-line paragraph.
 */
export function CreatorHero({ content }: { content: CreatorProfileContent }) {
  return (
    <section className="bg-brand-primary brand-grid pt-[52px] pb-[82px]">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <ImagePlaceholder
              ratio="1/1"
              rounded="rounded-3xl"
              alt={content.avatarAlt}
              className="w-24 shrink-0"
              sizes="6rem"
            />

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-start gap-2">
                <h1 className="font-display text-heading-s font-semibold text-brand-neutral-50">
                  {content.name.value}
                </h1>
                <span className="inline-flex h-[35px] items-center rounded-brand-pill bg-brand-accent px-6 text-label-m font-medium text-brand-foreground">
                  {content.badge.value}
                </span>
              </div>
              <p className="text-body-l text-brand-neutral-50">
                {content.tagline.value}
              </p>
            </div>
          </div>

          {/* The frame's own text box is 116px tall; a shorter render would drag the
              count row up out of place. */}
          <p className="min-h-[116px] font-body text-body-l whitespace-pre-line text-brand-neutral-50">
            {content.bio.value}
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <ul className="flex flex-wrap gap-4">
            {content.stats.map((stat) => (
              <li
                key={stat.label.value}
                className="inline-flex h-[46px] items-center gap-2 rounded-brand-pill bg-white px-6"
              >
                <span className="text-label-l font-medium text-brand-primary">
                  {stat.value.value}
                </span>
                <span className="text-label-l font-medium text-brand-foreground">
                  {stat.label.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Not wired to a session: the design shows the control and no follow state,
              the same way the header's cart is shown without a cart. */}
          <button
            type="button"
            className="inline-flex h-[46px] cursor-pointer items-center rounded-brand-pill bg-brand-accent px-6 text-label-l font-medium outline-none transition-colors hover:bg-brand-accent-hover focus-visible:ring-3 focus-visible:ring-white/60"
          >
            {/* The frame sets this label in #040819 rather than the on-accent neutral
                the other lime controls use; the value is kept as drawn. */}
            <span className="text-[#040819]">{content.followLabel.value}</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
