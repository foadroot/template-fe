import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Aspect ratios used by the design's imagery.
 */
export type ImageRatio =
  | "16/9"
  | "4/3"
  | "3/2"
  | "1/1"
  | "4/5"
  | "3/4"
  /* The hero's cut-out portrait, 578x541 (node 1:1796). */
  | "578/541"
  /* The showcase photographs: 577x540 in the first block, 435x596 in the second. */
  | "577/540"
  | "435/596"
  /* A course card's cover, 341x195 (node 13:250). */
  | "341/195";

const ratioClass: Record<ImageRatio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "578/541": "aspect-[578/541]",
  "577/540": "aspect-[577/540]",
  "435/596": "aspect-[435/596]",
  "341/195": "aspect-[341/195]",
};

/**
 * Renders a design asset in the box the design measured for it.
 *
 * Every slot ships with the artwork the Figma file holds, so `src` is normally set; the
 * striped fallback only appears when a slot has no asset yet, and it shares the real
 * image's aspect-ratio box, so filling the gap is a `src` change with no markup or
 * layout edit (design.md D7). The slot always carries its intended alt text, so it is
 * never an unlabelled image.
 */
export function ImagePlaceholder({
  src,
  alt,
  ratio = "16/9",
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  rounded = "rounded-brand-card",
  fit = "cover",
}: {
  /** When omitted, a sized placeholder renders in the asset's place. */
  src?: string;
  /** Required either way: describes the image (or the image that will go here). */
  alt: string;
  ratio?: ImageRatio;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  /**
   * How the asset fills its box. `cover` is Figma's `FILL`; `fill` is Figma's `STRETCH`,
   * which the showcase's second photograph uses (node 34:1011 carries an imageTransform).
   */
  fit?: "cover" | "fill";
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        rounded,
        ratioClass[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "fill" ? "object-fill" : "object-cover"}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,var(--brand-surface-muted)_0px,var(--brand-surface-muted)_10px,transparent_10px,transparent_20px)]"
        >
          <ImageIcon
            aria-hidden
            className="size-6 text-brand-muted-foreground/40"
          />
        </div>
      )}
    </div>
  );
}
