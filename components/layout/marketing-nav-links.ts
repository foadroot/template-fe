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

/** Catalogue links filter the course listing, so they resolve to a real page. */
const category = (slug: string) => `${routes.publicRoutes.courses.list}?category=${slug}`;

/**
 * A footer column of links.
 *
 * The footer mirrors the reference site's footer, which labels none of its columns, so
 * there is no heading here — the three lists read as plain link groups.
 */
export type MarketingFooterColumn = {
  links: readonly MarketingLink[];
};

/**
 * Footer link columns: three groups of five, matching the reference footer's layout (5/7
 * split on desktop, two columns then three as the row narrows).
 *
 * Category links filter the course listing. The remaining destinations (About, Contact,
 * Help, legal pages) have no frame in the design yet, so they are declared in
 * `routes.placeholders` and currently land on the branded 404 — recorded as outstanding
 * work rather than dropped, because the design shows them as links.
 */
export const marketingFooterColumns: readonly MarketingFooterColumn[] = [
  {
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
