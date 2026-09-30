import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { creatorsGridHref } from "@/features/creators/lib/url";
import {
  type CreatorsIndexContent,
  type CreatorsQuery,
} from "@/features/creators/types/creators.types";
import { cn } from "@/lib/utils";

/**
 * The page row under the grid, ported from `bytespace-dointech`'s `CoursePagination` —
 * round chevron controls flanking round page numbers, the current page the only one
 * filled in, and the whole row absent until there is more than one page to walk.
 *
 * It is a row of links rather than the reference's buttons because the page lives in the
 * URL: paging is navigation, and each link carries the whole query so the search and the
 * category survive it. The fragment appended to every href is what scrolls the grid back
 * into view, which is the behaviour the reference gets from an explicit scroll call.
 */
export function CreatorsPagination({
  content,
  query,
  pageCount,
}: {
  content: CreatorsIndexContent;
  query: CreatorsQuery;
  pageCount: number;
}) {
  if (pageCount <= 1) {
    return null;
  }

  const currentPage = Math.min(query.page, pageCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pageCount;

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex items-center justify-center pb-10 select-none sm:mt-16 sm:pb-14 md:mt-20"
    >
      <Container className="flex items-center justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <li>
            <Link
              href={creatorsGridHref(query, { page: currentPage - 1 })}
              aria-label={content.previousLabel.value}
              aria-disabled={isFirst}
              tabIndex={isFirst ? -1 : undefined}
              className={cn(
                "grid size-9 place-items-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40 sm:size-10",
                isFirst
                  ? "pointer-events-none text-brand-neutral-300"
                  : "cursor-pointer text-brand-neutral-800 hover:bg-brand-chip",
              )}
            >
              <ChevronLeft aria-hidden className="size-5" />
            </Link>
          </li>

          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (page) => {
              const isCurrent = page === currentPage;

              return (
                <li key={page}>
                  <Link
                    href={creatorsGridHref(query, { page })}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "grid size-9 place-items-center rounded-full text-body-s font-semibold transition-all outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40 sm:size-10",
                      isCurrent
                        ? "bg-brand-foreground text-white shadow-xs"
                        : "cursor-pointer text-brand-neutral-600 hover:bg-brand-chip hover:text-brand-foreground",
                    )}
                  >
                    {page}
                  </Link>
                </li>
              );
            },
          )}

          <li>
            <Link
              href={creatorsGridHref(query, { page: currentPage + 1 })}
              aria-label={content.nextLabel.value}
              aria-disabled={isLast}
              tabIndex={isLast ? -1 : undefined}
              className={cn(
                "grid size-9 place-items-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40 sm:size-10",
                isLast
                  ? "pointer-events-none text-brand-neutral-300"
                  : "cursor-pointer text-brand-neutral-800 hover:bg-brand-chip",
              )}
            >
              <ChevronRight aria-hidden className="size-5" />
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
