import { routes } from "@/config/routes";
import { type CreatorsQuery } from "@/features/creators/types/creators.types";

/** The query an unfiltered index starts from. */
export const defaultCreatorsQuery: CreatorsQuery = {
  q: "",
  category: null,
  page: 1,
};

/**
 * The fragment the hero's control and the pagination row scroll to. It is part of the
 * URL rather than of any one component's markup, so the anchor, the links that target it
 * and the handler that smooth-scrolls to it all read the same string.
 */
export const CREATORS_GRID_ANCHOR = "creators-grid";

/**
 * Rebuilds the creators URL with `patch` merged into the current query, so a control
 * never drops the filter the user set a moment earlier. Defaults are left off the URL —
 * an unfiltered first page is `/creators` exactly, and a share lands on the same grid.
 *
 * `q` is always paired with `page: 1` by its callers rather than here: a category chip
 * keeps the search, a new search starts at the first page of what it matches, and the
 * caller knows which of the two it is doing.
 */
export function creatorsHref(
  query: CreatorsQuery,
  patch: Partial<CreatorsQuery> = {},
): string {
  const next = { ...query, ...patch };
  const params = new URLSearchParams();

  if (next.q !== "") params.set("q", next.q);
  if (next.category) params.set("category", next.category);
  if (next.page > 1) params.set("page", String(next.page));

  const search = params.toString();

  return search
    ? `${routes.publicRoutes.creators.list}?${search}`
    : routes.publicRoutes.creators.list;
}

/**
 * `creatorsHref` with the grid fragment appended, so paging lands with the grid in view
 * rather than wherever the browser happened to be scrolled to. The reference scrolls to
 * the top of the grid on every page change; this gets the same behaviour without the
 * client-side scroll call a plain `<Link>` would need.
 */
export function creatorsGridHref(
  query: CreatorsQuery,
  patch: Partial<CreatorsQuery> = {},
): string {
  return `${creatorsHref(query, patch)}#${CREATORS_GRID_ANCHOR}`;
}
