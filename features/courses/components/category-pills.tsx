import Link from "next/link";

import { Container } from "@/components/shared/container";
import { coursesHref, slugify } from "@/features/courses/lib/url";
import {
  type CategoryPillsContent,
  type CoursesQuery,
} from "@/features/courses/types/courses.types";

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
                <Link
                  href={coursesHref(query, { category: slug, page: 1 })}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "inline-flex h-[43px] items-center rounded-brand-pill bg-brand-accent px-4 text-label-m font-medium text-brand-neutral-950 outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40"
                      : "inline-flex h-[43px] items-center rounded-brand-pill bg-brand-neutral-50 px-4 text-label-m font-medium text-brand-neutral-700 transition-colors outline-none hover:bg-brand-neutral-100 focus-visible:ring-3 focus-visible:ring-brand-primary/40"
                  }
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
