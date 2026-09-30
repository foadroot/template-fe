import Image from "next/image";

import { cn } from "@/lib/utils";

type Variant = "hero" | "footer" | "splash" | "band";

type Shape = {
  /** `blob` and `squircle` are filled; `ring` is an outline. */
  kind: "blob" | "squircle" | "ring";
  /** `accent-soft` is the slightly blurred, 90%-opacity lime the design reuses. */
  fill: "accent" | "accent-soft" | "white";
  className: string;
};

const fillClass: Record<Shape["fill"], string> = {
  accent: "bg-brand-accent",
  "accent-soft": "bg-brand-accent/90 blur-[1px]",
  white: "bg-white/95",
};

const kindClass: Record<Shape["kind"], string> = {
  blob: "rounded-full",
  squircle: "rounded-[42%]",
  ring: "rounded-full border-2 border-brand-accent/60",
};

/**
 * The blobs, cones and mark clusters the design scatters across its brand-coloured
 * surfaces outside the homepage. Purely decorative and hidden from assistive technology;
 * built from CSS so no artwork asset is required (design.md D7).
 */
const shapes: Record<Variant, Shape[]> = {
  hero: [],
  footer: [
    { kind: "blob", fill: "accent-soft", className: "top-[-3rem] left-[8%] size-28" },
    { kind: "squircle", fill: "accent", className: "right-[10%] bottom-[-4rem] size-40" },
    { kind: "ring", fill: "accent", className: "top-[30%] right-[30%] size-16" },
  ],
  splash: [
    { kind: "blob", fill: "accent-soft", className: "top-[-5rem] left-[-5rem] size-64" },
    { kind: "squircle", fill: "accent", className: "right-[-4rem] bottom-[-6rem] size-72" },
    { kind: "ring", fill: "accent", className: "top-[20%] right-[-3rem] size-40" },
  ],
  band: [],
};

/**
 * One ornament: an exported render placed at its measured box inside the 1440px stage.
 *
 * `top` runs from the stage's own top edge, so the hero's values are its design y less
 * the 120px header the section sits under, and the band's are straight off `34:1161`.
 * `height` defaults to `width` — every ornament node in the file is square to within a
 * pixel.
 */
type Ornament = {
  src: string;
  left: number;
  top: number;
  width: number;
  height?: number;
  /** Screen-reader name; the stage itself is already `aria-hidden`. */
  alt: string;
};

/**
 * The hero's twelve ornaments (`12:169` then `46:79`), listed bottom layer first, which
 * is the order Figma paints them.
 *
 * `12:169` is six plain image fills — the design's black 3D renders, shown as they are.
 * `46:79` is six frames that mask the grey renders into flat silhouettes: an image node
 * used as an alpha mask over a solid rectangle, in lime `#d4fb20` or white `#f5f5f6`.
 * Those two tones are pre-baked into the exported PNGs in `public/ornaments/`, so the
 * silhouettes are the file's own artwork rather than a re-trace of it.
 *
 * The y values are the design's hero-frame y minus the 120px header (`1:1778`): the
 * section this renders into begins where the header ends.
 */
const heroOrnaments: Ornament[] = [
  /* 12:169 — plain renders, no mask. */
  { src: "/ornaments/black-223.png", left: -61, top: 22, width: 223, alt: "" },
  { src: "/ornaments/black-334.png", left: 1308, top: 22, width: 210, height: 209, alt: "" },
  { src: "/ornaments/black-359.png", left: 87, top: 293, width: 256, height: 255, alt: "" },
  { src: "/ornaments/black-223.png", left: 1128, top: 325, width: 223, alt: "" },
  { src: "/ornaments/black-189.png", left: 26, top: 671, width: 189, alt: "" },
  { src: "/ornaments/black-359.png", left: 1157, top: 671, width: 256, height: 255, alt: "" },
  /* 46:79 — masked into flat silhouettes. */
  { src: "/ornaments/blob-331-white.png", left: 1124, top: 552, width: 332, alt: "" },
  { src: "/ornaments/blob-386-lime.png", left: -122, top: 101, width: 387, alt: "" },
  { src: "/ornaments/blob-386-white.png", left: 184, top: 357, width: 176, alt: "" },
  { src: "/ornaments/cone-343-white.png", left: 14, top: 561, width: 344, alt: "" },
  { src: "/ornaments/cone-371-lime.png", left: 1227, top: 100, width: 372, alt: "" },
  { src: "/ornaments/cone-189-white.png", left: 1104, top: 344, width: 189, alt: "" },
];

/**
 * The creator band's seven ornaments (`46:78`), bottom layer first, in the band's own
 * 1440px stage. Same construction as the hero's second set: each render masked into a
 * flat lime or white silhouette. The two cones and the blob that hang past the band's
 * 488px edge are clipped by it, exactly as the frame clips them.
 */
const bandOrnaments: Ornament[] = [
  { src: "/ornaments/cone-189-lime.png", left: 1078, top: 0, width: 189, alt: "" },
  { src: "/ornaments/blob-331-lime.png", left: 1107, top: 289, width: 332, alt: "" },
  { src: "/ornaments/blob-386-lime.png", left: -122, top: -162, width: 387, alt: "" },
  { src: "/ornaments/blob-386-white.png", left: 179, top: 5, width: 176, alt: "" },
  { src: "/ornaments/cone-189-cta-white.png", left: -50, top: 225, width: 189, alt: "" },
  { src: "/ornaments/cone-343-lime.png", left: 16, top: 298, width: 344, alt: "" },
  { src: "/ornaments/cone-371-white.png", left: 1222, top: 5, width: 372, alt: "" },
];

const ornamentStage: Partial<Record<Variant, Ornament[]>> = {
  hero: heroOrnaments,
  band: bandOrnaments,
};

/**
 * The dot cluster three of the four variants carry.
 *
 * The homepage frames draw no such cluster — `12:224` is only the grid — so this stays
 * off the hero and keeps the two splash surfaces it was drawn for.
 */
const dotCluster: Partial<Record<Variant, string>> = {
  footer: "bottom-[20%] left-[45%]",
  splash: "bottom-[18%] left-[10%]",
};

/**
 * Renders one ornament stage: a 1440px design-width canvas centred on the section, so
 * the measured offsets hold on any viewport and everything past the section's own box
 * is clipped by its `overflow-hidden`, the way the Figma frame clips it.
 */
function OrnamentStage({ items }: { items: Ornament[] }) {
  return (
    <div className="absolute top-0 left-1/2 h-full w-[1440px] -translate-x-1/2">
      {items.map((item) => (
        <Image
          key={`${item.src}-${item.left}-${item.top}`}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height ?? item.width}
          className="absolute max-w-none"
          style={{ left: item.left, top: item.top }}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function DecorativeShapes({
  variant = "hero",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const stage = ornamentStage[variant];
  const dots = dotCluster[variant];
  const css = shapes[variant];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {stage ? <OrnamentStage items={stage} /> : null}

      {css.map((shape, index) => (
        <div
          key={index}
          className={cn(
            "absolute",
            fillClass[shape.fill],
            kindClass[shape.kind],
            shape.className,
          )}
        />
      ))}

      {dots ? (
        <div className={cn("absolute grid grid-cols-3 gap-1.5 opacity-70", dots)}>
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="size-1.5 rounded-full bg-brand-accent" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
