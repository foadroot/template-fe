import Link from "next/link";

import { Container } from "@/components/shared/container";
import { coursesHref, slugify } from "@/features/courses/lib/url";
import {
  type CategoryPillsContent,
  type CoursesQuery,
} from "@/features/courses/types/courses.types";
import { cn } from "@/lib/utils";

/**
 * The `Tab_Categories` row (frame 55:117, y=512): one line of nine 43px pills filling
 * the 1200px content column — Figma lays them out with 16.5px between each, which is the
 * row spread evenly, so the list justifies between the column edges. The selected pill is
 * the only one wearing the accent fill.
 *
 * Each pill carries the rest of the query with it, so picking a category after searching
 * keeps the search. The first pill is "Featured", the state the frame opens in, and it is
 * the one slug that narrows nothing — every other pill is a real category.
 */
export function CategoryPills({
  content,
  query,
}: {
  content: CategoryPillsContent;
  query: CoursesQuery;
}) {
  const options = [content.active, ...content.options];
  const selected = query.category;

  return (
    <section
      id="categories"
      aria-label="Course categories"
      className="scroll-mt-32 pt-8"
    >
      <Container>
        <ul className="flex flex-wrap items-center justify-between gap-4">
          {options.map((option) => {
            const slug = slugify(option.value);
            const isActive = selected ? selected === slug : slug === "featured";

            return (
              <li key={option.value}>
                {/* The key is the active flag, not the option: this row is a set of
                    links that re-render on navigation rather than remount, so without
                    it the pill that just turned active would sit there statically.
                    Keying on the flag swaps the element the moment the query changes,
                    which is what replays `animate-pop` on the pill that won. */}
                <Link
                  key={String(isActive)}
                  href={coursesHref(query, { category: slug, page: 1 })}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex h-[43px] items-center rounded-brand-pill px-4 text-label-m font-medium outline-none transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-3 focus-visible:ring-brand-primary/40",
                    isActive
                      ? "animate-pop bg-brand-accent text-brand-neutral-950"
                      : "bg-brand-neutral-50 text-brand-neutral-700 hover:bg-brand-neutral-100",
                  )}
                >
                  {option.value}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
