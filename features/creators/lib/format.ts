/**
 * 14200 → "14.2k", everything under a thousand left whole — the reference card's
 * `formatNumber`, shared so the card's Followers pill and the profile's count pill read
 * the same figure the same way.
 */
export function formatCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return String(value);
}
