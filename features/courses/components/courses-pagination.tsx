import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { coursesHref } from "@/features/courses/lib/url";
import {
  type CoursesQuery,
  type PaginationContent,
} from "@/features/courses/types/courses.types";
import { cn } from "@/lib/utils";

/**
 * The pagination row (frame 55:117, y=3208): an outlined 56x48 chevron control, five
 * page numbers 24px apart, and the matching control — 72px below the grid and 72px above
 * the footer.
 *
 * The design marks page 1 in the border colour and the rest in the text colour, so the
 * current page is the quiet one. The numbers come from the filtered set: the frame's
 * unfiltered catalogue spans the five pages it draws, and a filter that narrows the set
 * narrows the row with it. Page links carry the whole query, so paging keeps the search
 * and the filters the user already set.
 */
export function CoursesPagination({
  content,
  query,
  pageCount,
}: {
  content: PaginationContent;
  query: CoursesQuery;
  pageCount: number;
}) {
  if (pageCount <= 1) {
    return null;
  }

  const currentPage = Math.min(query.page, pageCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pageCount;

  return (
    <nav aria-label="Pagination" className="pt-18 pb-18">
      <Container>
        {/* The frame hugs its content at x=588-902, i.e. 25px right of the page
              centre — the only element on the page not centred on x=720, so the
              row carries a matching 50px left pad at the lg breakpoint. */}
        <ul className="flex flex-wrap items-center justify-center gap-6 lg:pl-[50px]">
          <li>
            <Link
              href={coursesHref(query, { page: currentPage - 1 })}
              aria-disabled={isFirst}
              tabIndex={isFirst ? -1 : undefined}
              className={cn(
                "grid size-12 w-14 place-items-center rounded-brand-pill border border-brand-border bg-white transition-colors outline-none hover:bg-brand-surface-muted focus-visible:ring-3 focus-visible:ring-brand-primary/40",
                isFirst && "pointer-events-none",
              )}
            >
              <ChevronLeft
                aria-hidden
                className={cn(
                  "size-6",
                  isFirst ? "text-brand-neutral-700" : "text-brand-neutral-950",
                )}
              />
              <span className="sr-only">{content.previousLabel.value}</span>
            </Link>
          </li>

          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (page) => {
              const isCurrent = page === currentPage;

              return (
                <li key={page}>
                  <Link
                    href={coursesHref(query, { page })}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "inline-flex h-7 items-center justify-center rounded-brand-pill font-display text-[20px] leading-7 font-semibold outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40",
                      isCurrent
                        ? "text-brand-neutral-200"
                        : "text-brand-neutral-950 hover:text-brand-primary",
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
              href={coursesHref(query, { page: currentPage + 1 })}
              aria-disabled={isLast}
              tabIndex={isLast ? -1 : undefined}
              className={cn(
                "grid size-12 w-14 place-items-center rounded-brand-pill border border-brand-border bg-white transition-colors outline-none hover:bg-brand-surface-muted focus-visible:ring-3 focus-visible:ring-brand-primary/40",
                isLast && "pointer-events-none",
              )}
            >
              <ChevronRight
                aria-hidden
                className={cn(
                  "size-6",
                  isLast ? "text-brand-neutral-700" : "text-brand-neutral-950",
                )}
              />
              <span className="sr-only">{content.nextLabel.value}</span>
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
