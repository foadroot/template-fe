/**
 * Route map, read from the design file's frames:
 *   Home, Search Page, Course Details, Course Lessons, Course Reviews,
 *   Creator Profile, Register, Login, 404 Not Found.
 */
export const routes = {
  publicRoutes: {
    home: "/",
    courses: {
      /** The "Search Page" frame — browse and search the course catalogue. */
      list: "/courses",
      detail: (slug: string) => `/courses/${slug}`,
      lessons: (slug: string) => `/courses/${slug}?tab=lessons`,
      reviews: (slug: string) => `/courses/${slug}?tab=reviews`,
    },
    creators: {
      /** The discovery list: search, category chips and paging over the roster. */
      list: "/creators",
      profile: (handle: string) => `/creators/${handle}`,
    },
    // Auth screens are UI only for now — validation runs client-side and no session is
    // created (see design.md D16 and proposal.md Non-Goals).
    auth: {
      register: "/register",
      login: "/login",
    },
    /**
     * Destinations the design's footer links to but provides no frame for. Declared so no
     * link points at an undeclared path; until those pages are designed they land on the
     * branded 404, which is recorded as outstanding work.
     */
    placeholders: {
      featuredCourses: "/courses?featured=true",
      featuredCategories: "/courses",
      becomeCreator: "/become-a-creator",
      affiliate: "/affiliate-program",
      contact: "/contact",
      help: "/help",
      about: "/about",
      privacy: "/privacy-policy",
      terms: "/terms-of-service",
      cookies: "/cookies-settings",
    },
  },
  privateRoutes: {
    admin: {
      dashboard: "/panel/admin/dashboard",
    },
    employee: {
      dashboard: "/panel/employee/dashboard",
    },
  },
} as const;

import { type Role } from "./roles";

export function panelHomeFor(role: Role): string | null {
  switch (role) {
    case "super-admin":
    case "manager":
      return routes.privateRoutes.admin.dashboard;
    default:
      return null;
  }
}
