import Link from "next/link";

import { Container } from "@/components/shared/container";
import { CreatorCard } from "@/features/creators/components/creator-card";
import { CreatorsPagination } from "@/features/creators/components/creators-pagination";
import {
  creatorsHref,
  defaultCreatorsQuery,
} from "@/features/creators/lib/url";
import {
  type CreatorsIndexContent,
  type CreatorsQuery,
  type CreatorsSelection,
} from "@/features/creators/types/creators.types";

/**
 * The results section — the reset link, the grid or the empty state, and the page row —
 * ported from `bytespace-dointech`'s `CreatorPageClient`.
 *
 * The reference drives this whole block from three pieces of component state; here the
 * same three come from the URL, so the markup is a straight rendering of the selection
 * and every control in it is a link. The Reset row only renders when a filter is actually
 * on, exactly as the reference shows it, and the empty state's button is the same reset
 * wearing a fill.
 *
 * The grid is one column on mobile, two from `md` and three from `lg`, with the reference's
 * 24/28/32px gap growth.
 */
export function CreatorsGrid({
  content,
  query,
  selection,
}: {
  content: CreatorsIndexContent;
  query: CreatorsQuery;
  selection: CreatorsSelection;
}) {
  const hasFilters = query.q.trim() !== "" || query.category !== null;
  const resetHref = creatorsHref(defaultCreatorsQuery);

  return (
    <section className="bg-white py-10 sm:py-12 md:py-16">
      <Container>
        {hasFilters && (
          <div className="mb-6 flex items-center justify-end">
            <Link
              href={resetHref}
              className="cursor-pointer text-label-xs font-semibold text-brand-primary hover:underline"
            >
              {content.resetLabel.value}
            </Link>
          </div>
        )}

        {selection.creators.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {selection.creators.map((creator) => (
              <li key={creator.handle}>
                <CreatorCard creator={creator} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-lg rounded-brand-panel border border-dashed border-brand-border-soft bg-brand-surface-muted px-4 py-20 text-center">
            <h2 className="mb-2 font-display text-heading-xs font-bold text-brand-foreground">
              {content.emptyTitle.value}
            </h2>
            <p className="mb-6 text-body-s text-brand-neutral-500">
              {content.emptyBody.value}
            </p>
            <Link
              href={resetHref}
              className="inline-flex rounded-brand-pill bg-brand-accent px-6 py-2.5 text-body-s font-bold text-brand-on-accent shadow-xs transition-colors hover:bg-brand-accent-hover"
            >
              {content.clearLabel.value}
            </Link>
          </div>
        )}
      </Container>

      {/* Outside the container above: the page row draws its own, and nesting the two
          would stack the gutter twice and pull the row inboard of the grid. */}
      <CreatorsPagination
        content={content}
        query={query}
        pageCount={selection.pageCount}
      />
    </section>
  );
}
