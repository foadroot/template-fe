import { type ReactNode } from "react";

/**
 * The big soft ellipses the design lays behind the showcase and the testimonials: a
 * brand colour at full strength in the middle, 23% at 53% of the radius, 6% at 75%, and
 * nothing at the edge, each ellipse faded by its own fill opacity.
 *
 * They are drawn with a radial gradient rather than committed as an asset (design.md D7),
 * and both sections place them by their measured offset from the section's top-left.
 */
export type WashTone = "lime" | "primary";

const toneRgb: Record<WashTone, string> = {
  // --brand-lime-500 #cbfc01
  lime: "203 252 1",
  // --brand-primary #003be2
  primary: "0 59 226",
};

export function SectionWash({
  x,
  y,
  size,
  tone,
  opacity,
}: {
  x: number;
  y: number;
  size: number;
  tone: WashTone;
  opacity: number;
}) {
  const rgb = toneRgb[tone];

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        backgroundImage: `radial-gradient(closest-side, rgb(${rgb} / 1) 0%, rgb(${rgb} / 0.23) 53%, rgb(${rgb} / 0.06) 75%, rgb(${rgb} / 0) 100%)`,
      }}
    />
  );
}

/** Wraps a section's washes so they sit behind its content without catching pointer events. */
export function WashLayer({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {children}
    </div>
  );
}
