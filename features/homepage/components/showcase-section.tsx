import { Check, Star } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionWash, WashLayer } from "@/components/shared/section-wash";
import {
  type ShowcaseBlock,
  type ShowcaseContent,
  type ShowcaseOverlayCard as OverlayCard,
  type ShowcaseOverlayEmphasis,
} from "@/features/homepage/types/homepage.types";
import { cn } from "@/lib/utils";

/**
 * The feature showcase (`34:1159`, a 1440x1460 frame at y 3120). Each block pairs a text
 * column with a media column, and the artwork swaps sides between them.
 *
 * The design composes each block by hand, so the numbers below are all measured rather
 * than derived:
 *
 *   section padding      120 above and below, 72 between the blocks
 *                        (120 + 552 + 72 + 596 + 120 = the frame's 1460)
 *   block 1 columns      574 text | 63 | 621 media, text 74 down from the block's top
 *   block 2 columns      541 media | 79 | 580 text, text 104 down
 *
 * Block 1's row is 1258 wide against the 1200 content column, so from `xl` — where the
 * column is at its full width — it is allowed to run 58px into the right margin, exactly
 * as the frame draws it. Block 2 fits the column on its own.
 *
 * Behind the blocks the frame lays five wash ellipses (`34:1307`), which this section
 * draws at their measured offsets.
 */
export function ShowcaseSection({ content }: { content: ShowcaseContent }) {
  if (content.blocks.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Why ByteSpace"
      className="relative overflow-hidden bg-brand-section py-[120px]"
    >
      <WashLayer>
        <SectionWash x={-152} y={-466} size={1137} tone="lime" opacity={0.4} />
        <SectionWash x={811} y={-458} size={1137} tone="primary" opacity={0.08} />
        <SectionWash x={-508} y={183} size={1137} tone="primary" opacity={0.16} />
        <SectionWash x={722} y={788} size={1137} tone="primary" opacity={0.24} />
        <SectionWash x={-287} y={946} size={672} tone="lime" opacity={0.6} />
      </WashLayer>

      <Container className="relative">
        <div className="flex flex-col gap-[72px]">
          {content.blocks.map((block) => (
            <ShowcaseBlockRow key={block.id} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ShowcaseBlockRow({ block }: { block: ShowcaseBlock }) {
  const mediaFirst = block.media === "start";

  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:gap-0",
        mediaFirst
          ? "lg:grid-cols-[541fr_580fr] lg:gap-[79px]"
          : "lg:grid-cols-[574fr_621fr] lg:gap-[63px] xl:-mr-[58px]",
      )}
    >
      <div className={cn(mediaFirst ? "lg:order-2" : "lg:order-1")}>
        <h2
          className="font-display text-heading-s font-semibold text-brand-foreground lg:text-heading-m"
          style={{ maxWidth: block.headlineWidth }}
        >
          {block.headline.value}
        </h2>

        {/* 40px between every part of the text column, in both blocks. */}
        <p
          className="mt-10 text-body-l text-brand-foreground-soft"
          style={{ maxWidth: block.bodyWidth }}
        >
          {block.body.value}
        </p>

        {block.stats && block.stats.length > 0 ? (
          <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            {block.stats.map((stat) => (
              <div key={stat.id}>
                <dt className="sr-only">{stat.label.value}</dt>
                <dd className="font-display text-heading-s font-medium text-brand-primary">
                  {stat.value.value}
                </dd>
                <dd className="text-body-l text-brand-neutral-700">
                  {stat.label.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {block.features && block.features.length > 0 ? (
          <ul className="mt-10 flex flex-col gap-4">
            {block.features.map((feature) => (
              <li key={feature.value} className="flex items-center gap-2">
                {/* A 24px white disc with a brand-blue tick (node 34:904). */}
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white">
                  <Check
                    aria-hidden
                    className="size-5 text-brand-primary"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-label-l font-medium text-brand-foreground">
                  {feature.value}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <ShowcaseMedia
        block={block}
        className={cn(mediaFirst ? "lg:order-1" : "lg:order-2")}
      />
    </div>
  );
}

/**
 * The media column. The design's collage is placed by hand inside a fixed box, which only
 * has room for it once the content column is at its full 1200px — so below `xl` the block
 * falls back to a single photograph at the same proportions.
 */
function ShowcaseMedia({
  block,
  className,
}: {
  block: ShowcaseBlock;
  className?: string;
}) {
  const { mediaBox } = block;

  return (
    <>
      <div className={cn("xl:hidden", className)}>
        <ImagePlaceholder
          ratio={mediaBox.image.ratio}
          rounded="rounded-brand-panel"
          alt={mediaBox.imageAlt}
          sizes="90vw"
        />
      </div>

      <div
        className={cn("relative hidden xl:block", className)}
        style={{ width: mediaBox.width, height: mediaBox.height }}
      >
        <div
          className="absolute"
          style={{
            left: mediaBox.image.x,
            top: mediaBox.image.y,
            width: mediaBox.image.width,
          }}
        >
          <ImagePlaceholder
            ratio={mediaBox.image.ratio}
            rounded="rounded-brand-panel"
            alt={mediaBox.imageAlt}
            sizes={`${mediaBox.image.width}px`}
          />
        </div>

        <div
          className="absolute"
          style={{
            left: mediaBox.ornament.x,
            top: mediaBox.ornament.y,
            width: mediaBox.ornament.size,
          }}
        >
          <ImagePlaceholder
            ratio="1/1"
            rounded="rounded-brand-panel"
            alt={mediaBox.ornament.alt}
            sizes={`${mediaBox.ornament.size}px`}
          />
        </div>

        {block.overlayCards.map((card) => (
          <ShowcaseCard key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}

/** The design sets this card's 14px label on a 24px line; the rest use the label scale. */
const labelClass = (card: OverlayCard) =>
  card.emphasis === "display"
    ? "text-[14px] leading-6 font-medium"
    : card.emphasis === "compact"
      ? "text-label-m leading-6 font-medium"
      : "text-label-m font-medium";

function ShowcaseCard({ card }: { card: OverlayCard }) {
  const onBrand = card.tone === "brand";
  const foreground = onBrand ? "text-brand-neutral-50" : "text-brand-foreground";

  const chip = card.chip ? (
    <span className="inline-flex h-6 w-fit shrink-0 items-center rounded-brand-pill bg-brand-accent-strong px-2.5 text-[10px] leading-5 font-medium text-brand-foreground">
      {card.chip.value}
    </span>
  ) : null;

  const valueClass: Record<ShowcaseOverlayEmphasis, string> = {
    // 48px on a 57.6px line on the progress card, off the design's published scale.
    display: "font-display text-[48px] leading-[57.6px] font-semibold tracking-[-0.01em]",
    // 24px/32 on the two revenue cards.
    value: "font-display text-2xl leading-8 font-semibold tracking-[-0.01em]",
    // The student card's 10px/15 rating line, which sits directly under its label.
    compact: "text-[10px] leading-[15px] font-normal text-brand-muted-foreground",
  };

  return (
    <div
      className={cn(
        "absolute rounded-brand-card p-4",
        onBrand ? "bg-brand-primary" : "bg-brand-card",
      )}
      style={{ left: card.place.x, top: card.place.y, width: card.place.width }}
    >
      <p className={cn(labelClass(card), foreground)}>{card.label.value}</p>
      {card.meta ? (
        <p className={cn("text-[10px] leading-3", foreground)}>{card.meta.value}</p>
      ) : null}

      {card.chipBelow ? (
        <>
          <p className={cn("mt-2", valueClass[card.emphasis], foreground)}>
            {card.value.value}
          </p>
          <div className="mt-2">{chip}</div>
        </>
      ) : (
        <div
          className={cn(
            "flex items-center justify-between gap-2",
            card.emphasis === "compact" ? undefined : "mt-2",
          )}
        >
          <p className={cn(valueClass[card.emphasis], foreground)}>
            {card.value.value}
            {card.emphasis === "compact" ? (
              <Star
                aria-hidden
                className="ml-1 inline size-4 fill-brand-accent text-brand-accent"
              />
            ) : null}
          </p>
          {chip}
        </div>
      )}

      {card.progress !== undefined ? (
        <div
          aria-hidden
          className={cn(
            "mt-2 h-2 w-full overflow-hidden rounded-brand-pill",
            onBrand ? "bg-white" : "bg-brand-chip",
          )}
        >
          <div
            className="h-full rounded-brand-pill bg-brand-accent"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      ) : null}

      {card.avatars ? (
        <div className="mt-2 flex items-center">
          {Array.from({ length: card.avatars }).map((_, index) => (
            <span
              key={index}
              aria-hidden
              className="-ml-4 size-[43px] shrink-0 overflow-hidden rounded-full border-2 border-brand-card bg-brand-surface-muted first:ml-0"
            />
          ))}
          <span className="-ml-4 grid size-[43px] shrink-0 place-items-center rounded-full border-2 border-brand-card bg-brand-accent text-label-xs font-bold text-brand-foreground">
            {card.badge?.value}
          </span>
        </div>
      ) : null}
    </div>
  );
}
