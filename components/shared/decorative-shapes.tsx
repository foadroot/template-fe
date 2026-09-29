import type { CSSProperties } from "react";

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
 * surfaces. Purely decorative and hidden from assistive technology; built from CSS so no
 * artwork asset is required (design.md D7).
 *
 * The hero's shapes are placed from the Home frame: the design's ornaments are 3D renders
 * hugging the frame's left and right edges around y=292-500 (lime), with white clusters in
 * the two lower corners from y=730. They are approximations of artwork that is not in the
 * repository, not traced reproductions.
 */
const shapes: Record<Variant, Shape[]> = {
  hero: [
    { kind: "blob", fill: "accent-soft", className: "top-[26%] -left-14 size-48" },
    { kind: "blob", fill: "accent-soft", className: "top-[26%] -right-14 size-56" },
    { kind: "squircle", fill: "white", className: "top-[71%] -left-8 size-52" },
    { kind: "squircle", fill: "white", className: "top-[71%] -right-10 size-52" },
  ],
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
 * The creator call-to-action's ornaments (`46:78`): seven renders — five "Cone" frames and
 * two Image frames — laid out in the band's 1440px design stage and clipped by it. Listed
 * bottom layer first, which is the order Figma paints them.
 *
 * Each entry takes the render's node box (x/y from the band's top-left corner) plus an
 * optional outline traced off the design render, in box-relative px: six are cut to the
 * render's own silhouette — down to the shaded wedges the design leaves as bare background —
 * while the small white Image frame stays an ellipse. The lime reads back as `#d4fb20` and
 * the white as `#f5f5f6` when sampled.
 */
type BandShape = {
  /** Which Figma node this stands in for. */
  node: string;
  className: string;
  /** Node box inside the 1440px stage; y runs from the band's top edge. */
  box: { left: number; top: number; width: number; height: number };
  /** Box-relative outline; omitted fills the whole box (then `radius` rounds it). */
  points?: [number, number][];
  radius?: boolean;
};

/** The 188px lime cone over the band's top-right corner (46:61). */
const coneTopRight: [number, number][] = [
  [98, 1], [129, 133], [110, 138], [61, 133], [35, 122], [9, 107],
];

/** The 385px lime cone at the band's top-left corner (34:1206). */
const coneTopLeft: [number, number][] = [
  [0, 0], [218, 0], [224, 20], [213, 42], [158, 50], [176, 63], [193, 90], [192, 116],
  [122, 121], [137, 148], [133, 163], [111, 174], [81, 157], [66, 147], [60, 142], [0, 142],
];

/** The 330px lime cone over the band's bottom-right corner (34:1221). */
const coneBottomRight: [number, number][] = [
  [106, 2], [145, 22], [157, 64], [172, 92], [166, 106], [193, 134], [199, 158],
  [43, 158], [10, 106], [28, 78], [73, 50], [44, 22],
];

/** The 342px lime cone at the band's bottom-left corner (46:67). */
const coneBottomLeft: [number, number][] = [
  [140, 2], [174, 5], [204, 15], [223, 30], [235, 45], [245, 70], [247, 95], [246, 120],
  [241, 145],
  [155, 145], [170, 115], [179, 87], [169, 75], [152, 71],
  [135, 75], [110, 88], [85, 110], [74, 130], [73, 145],
  [6, 145], [6, 128], [13, 100], [26, 75], [46, 50], [64, 35], [88, 20], [112, 10], [134, 5],
];

/** The 370px white render running off the band's right edge (46:73). */
const imageRight: [number, number][] = [
  [143, 6], [500, 6], [500, 310], [95, 304], [83, 270], [71, 246], [59, 222], [48, 198],
  [36, 174], [24, 150], [12, 126], [1, 102], [8, 78], [35, 54], [76, 30],
];

const bandShapes: BandShape[] = [
  {
    node: "46:61 Cone 188",
    className: "bg-brand-accent",
    box: { left: 1100, top: 20, width: 135, height: 140 },
    points: coneTopRight,
  },
  {
    node: "34:1221 Cone 330",
    className: "bg-brand-accent",
    box: { left: 1170, top: 330, width: 210, height: 170 },
    points: coneBottomRight,
  },
  {
    node: "34:1206 Cone 385",
    className: "bg-brand-accent",
    box: { left: -60, top: 0, width: 230, height: 180 },
    points: coneTopLeft,
  },
  {
    node: "34:1236 Image 175",
    className: "bg-brand-neutral-50",
    box: { left: 221, top: 41, width: 96, height: 106 },
    radius: true,
  },
  {
    node: "46:55 Cone 188",
    className: "bg-brand-neutral-50",
    box: { left: -92, top: 235, width: 234, height: 160 },
    points: [[117, 0], [234, 160], [0, 160]],
  },
  {
    node: "46:67 Cone 342",
    className: "bg-brand-accent",
    box: { left: 60, top: 350, width: 250, height: 145 },
    points: coneBottomLeft,
  },
  {
    node: "46:73 Cone 370",
    className: "bg-brand-neutral-50",
    box: { left: 1270, top: 35, width: 500, height: 310 },
    points: imageRight,
  },
];

const outline = (shape: BandShape): CSSProperties => ({
  left: shape.box.left,
  top: shape.box.top,
  width: shape.box.width,
  height: shape.box.height,
  ...(shape.points
    ? {
        clipPath: `polygon(${shape.points
          .map(([x, y]) => `${x}px ${y}px`)
          .join(", ")})`,
      }
    : { borderRadius: shape.radius ? "50%" : undefined }),
});

/** The dot cluster three of the four variants carry. */
const dotCluster: Partial<Record<Variant, string>> = {
  hero: "top-[8%] right-[12%]",
  footer: "bottom-[20%] left-[45%]",
  splash: "bottom-[18%] left-[10%]",
};

export function DecorativeShapes({
  variant = "hero",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const dots = dotCluster[variant];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {variant === "band" ? (
        /* The band's ornaments are placed in the design's own 1440px stage rather than in
           percentages, so they keep the measured offsets on wide viewports too. */
        <div className="absolute top-0 left-1/2 h-full w-[1440px] -translate-x-1/2">
          {bandShapes.map((shape) => (
            <div
              key={shape.node}
              className={cn("absolute", shape.className)}
              style={outline(shape)}
            />
          ))}
        </div>
      ) : (
        shapes[variant].map((shape, index) => (
          <div
            key={index}
            className={cn(
              "absolute",
              fillClass[shape.fill],
              kindClass[shape.kind],
              shape.className,
            )}
          />
        ))
      )}

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
