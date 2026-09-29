/**
 * Brand button treatments, layered over `buttonVariants()` with `cn()`.
 *
 * Kept here rather than added as variants inside `components/ui/button.tsx` so the
 * dashboard primitive stays untouched and the brand layer stays additive (design.md D1).
 * The design's primary control is a lime pill with dark text; secondary controls are
 * outline pills and plain text links on the brand surface.
 */
export const brandButton = {
  /** The design's primary control: lime pill, dark label (hero "Search", CTAs). */
  accent:
    "h-12 rounded-brand-pill bg-brand-accent px-6 text-label-m font-medium text-brand-on-accent hover:bg-brand-accent-hover",
  /** Outline pill on a light surface. */
  outline:
    "h-12 rounded-brand-pill border border-brand-border bg-brand-card px-6 text-label-m font-medium text-brand-foreground hover:bg-brand-surface-muted",
  /** Text link on the brand surface (nav "Sign In" / "Join Us"). */
  onPrimaryText:
    "h-12 rounded-brand-pill px-3 text-label-m font-medium text-brand-on-primary hover:bg-white/10",
  /** Outline pill on the brand surface. */
  onPrimaryOutline:
    "h-12 rounded-brand-pill border border-white/40 px-6 text-label-m font-medium text-brand-on-primary hover:bg-white/10",
} as const;
