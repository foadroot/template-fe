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
 * A footer column. `heading` is present only on the columns the design labels: it draws
 * "Browse" over the first column and "Platform" over the last, while the middle column
 * carries the second half of the Browse list with no heading of its own.
 */
export type MarketingFooterColumn = {
  heading?: string;
  links: readonly MarketingLink[];
};

/**
 * Footer link columns, taken from the design's footer: three columns, with the Browse
 * list spanning the first two.
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
