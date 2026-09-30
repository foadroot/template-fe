import Link from "next/link";

import { Container } from "@/components/shared/container";
import { creatorsHref } from "@/features/creators/lib/url";
import {
  type CreatorsIndexContent,
  type CreatorsQuery,
} from "@/features/creators/types/creators.types";
import { cn } from "@/lib/utils";

/**
 * The nine chips between the band and the grid, ported from `bytespace-dointech`'s row.
 *
 * They are links rather than buttons: the query lives in the address bar, so a chip is a
 * navigation and one that survives being copied out of the page — no script required to
 * pick a category. Each one carries the search the user already typed and drops back to
 * page 1, because a category narrows the set the current page was paging through.
 *
 * The row scrolls sideways on the smallest screens and wraps from `sm` up, which is what
 * the reference's `overflow-x-auto … sm:flex-wrap` does with the scrollbar hidden.
 */
export function CreatorsCategoryPills({
  content,
  query,
}: {
  content: CreatorsIndexContent;
  query: CreatorsQuery;
}) {
  return (
    <section
      aria-label="Creator categories"
      className="border-b border-brand-border-soft bg-white py-6 sm:py-7"
    >
      <Container>
        <ul className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap">
          {content.categories.map((category) => {
            const isActive = category.slug === query.category;

            return (
              <li key={category.label.value}>
                <Link
                  href={creatorsHref(query, {
                    category: category.slug,
                    page: 1,
                  })}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex shrink-0 cursor-pointer items-center rounded-brand-pill px-5 py-2 text-label-xs font-semibold transition-all duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-brand-primary/40 sm:text-label-s",
                    isActive
                      ? "bg-brand-accent text-brand-on-accent shadow-xs"
                      : "bg-brand-chip text-brand-neutral-700 hover:bg-brand-neutral-100 hover:text-brand-foreground",
                  )}
                >
                  {category.label.value}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
