import { ChevronDown, Search } from "lucide-react";

import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";
import {
  type CoursesHeroContent,
  type CoursesQuery,
} from "@/features/courses/types/courses.types";

/**
 * The search-led page header of the Search Page (55:117): the brand surface with its
 * 120px grid, a centred 36px heading, and a 624px search row — a white pill plus a lime
 * control.
 *
 * The frame's blue band runs 0-360 and contains the site's 120px header, so this section
 * supplies the remaining 240px: 44px above the heading, 32px below it, 68px under the row.
 *
 * A plain GET form only submits its own fields, so the filters the toolbar has set are
 * carried as hidden inputs — searching keeps the level, category and sort the same way
 * the toolbar's own links do. `page` is deliberately not carried: a new search starts at
 * the first page of what it matches.
 */
export function CoursesSearchHero({
  content,
  query,
}: {
  content: CoursesHeroContent;
  /** The route's whole query, so the form can echo `q` and carry the other filters. */
  query: CoursesQuery;
}) {
  return (
    <section className="min-h-60 bg-brand-primary brand-grid pt-11 pb-17">
      <Container className="flex flex-col items-center">
        <h1 className="text-center font-display text-heading-s font-semibold text-brand-neutral-50">
          {content.headline.value}
        </h1>

        <form
          role="search"
          action={routes.publicRoutes.courses.list}
          className="mt-8 flex w-full max-w-[624px] flex-col gap-4 sm:flex-row sm:items-start"
        >
          <label htmlFor="courses-search" className="sr-only">
            Search courses
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-6 size-6 -translate-y-1/2 text-brand-neutral-400"
            />
            <input
              id="courses-search"
              type="search"
              name="q"
              defaultValue={query.q}
              placeholder={content.searchPlaceholder}
              className="h-[52px] w-full rounded-brand-pill border border-transparent bg-white pr-6 pl-14 text-body-l text-brand-foreground outline-none placeholder:text-brand-neutral-400 focus-visible:ring-3 focus-visible:ring-white/60"
            />
          </div>

          {query.category && (
            <input type="hidden" name="category" value={query.category} />
          )}
          {query.level && (
            <input type="hidden" name="level" value={query.level} />
          )}
          {query.featured && (
            <input type="hidden" name="featured" value="true" />
          )}
          {query.sort !== "relevant" && (
            <input type="hidden" name="sort" value={query.sort} />
          )}

          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-brand-pill bg-brand-accent px-6 text-label-l font-medium text-brand-on-accent hover:bg-brand-accent-hover focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
          >
            {content.searchButtonLabel.value}
            {/* The frame carries Material's `keyboard_arrow_down` here, not an arrow. */}
            <ChevronDown aria-hidden className="size-6" />
          </button>
        </form>
      </Container>
    </section>
  );
}
