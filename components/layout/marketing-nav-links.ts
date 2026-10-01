import { routes } from "@/config/routes";

export type MarketingLink = {
  label: string;
  href: string;
};

/** Header links, from the design's nav (Home / Courses / Creators). */
export const marketingNavLinks: readonly MarketingLink[] = [
  { label: "Home", href: routes.publicRoutes.home },
  { label: "Courses", href: routes.publicRoutes.courses.list },
  { label: "Creators", href: routes.publicRoutes.creators.list },
];

/**
 * Whether `href` is the section the visitor is on — the single matcher behind both
 * nav treatments (the desktop header's active link and the mobile menu's
 * `aria-current` row). Home matches only `/`; every other link also matches the
 * routes beneath it, so `/courses/[slug]` still counts as Courses rather than
 * leaving the header with nothing active. Query strings don't participate —
 * `usePathname` returns the path alone, and a filtered list (`?category=design`)
 * is still that section.
 */
export function isLinkActive(pathname: string, href: string) {
  if (href === routes.publicRoutes.home) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Catalogue links filter the course listing, so they resolve to a real page. */
const category = (slug: string) => `${routes.publicRoutes.courses.list}?category=${slug}`;

/**
 * A footer column of links.
 *
 * The design labels the first and the third of its three columns — "Browse" over the two
 * category lists (`34:1274`) and "Platform" over the last (`34:1289`) — and leaves the
 * middle one bare, starting its links level with the others' so the heading slots line up.
 * The middle column therefore has no `heading`, and the footer reserves its 48px anyway.
 */
export type MarketingFooterColumn = {
  heading?: string;
  links: readonly MarketingLink[];
};

/**
 * Footer link columns: three groups of five, on the design's 528/92/580 split (`34:1259`
 * and `34:1272`).
 *
 * Category links filter the course listing. The remaining destinations (About, Contact,
 * Help, legal pages) have no frame in the design yet, so they are declared in
 * `routes.placeholders` and currently land on the branded 404 — recorded as outstanding
 * work rather than dropped, because the design shows them as links.
 */
export const marketingFooterColumns: readonly MarketingFooterColumn[] = [
  {
    heading: "Browse",
    links: [
      { label: "Featured Courses", href: routes.publicRoutes.placeholders.featuredCourses },
      { label: "Featured Categories", href: routes.publicRoutes.placeholders.featuredCategories },
      { label: "Business", href: category("business") },
      { label: "IT", href: category("it") },
      { label: "Design", href: category("design") },
    ],
  },
  {
    links: [
      { label: "Development", href: category("development") },
      { label: "Marketing", href: category("marketing") },
      { label: "Photography", href: category("photography") },
      { label: "Finance", href: category("finance") },
      { label: "Sport", href: category("sport") },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Become a Creator", href: routes.publicRoutes.placeholders.becomeCreator },
      { label: "Affiliate Program", href: routes.publicRoutes.placeholders.affiliate },
      { label: "Contact", href: routes.publicRoutes.placeholders.contact },
      { label: "Help", href: routes.publicRoutes.placeholders.help },
      { label: "About", href: routes.publicRoutes.placeholders.about },
    ],
  },
];

export const marketingLegalLinks: readonly MarketingLink[] = [
  { label: "Privacy Policy", href: routes.publicRoutes.placeholders.privacy },
  { label: "Terms of Service", href: routes.publicRoutes.placeholders.terms },
  { label: "Cookies Settings", href: routes.publicRoutes.placeholders.cookies },
];
