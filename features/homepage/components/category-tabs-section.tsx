import Link from "next/link";

import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";
import { type CategoryTabsContent } from "@/features/homepage/types/homepage.types";
import { type Copy } from "@/lib/content/copy";
import { cn } from "@/lib/utils";

/** Turns a category label into the query value the courses list filters on. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * The category filter row (`21:33`, `21:56`, `21:63`). The design draws three rows of
 * pills — 1086, 952 and 622 wide, each 43 tall at y 1520/1584/1648, so 21px apart — set
 * centred on the content column, with 16px between the pills.
 *
 * Each pill is a link carrying the category as a query value, which is what the courses
 * list will read. The selected pill is the only one wearing the accent fill; the labels
 * are Satoshi 500 16/19.2, neutral-950 on the accent and neutral-700 on the rest, with
 * the trailing affordance in brand blue.
 */
export function CategoryTabsSection({
  content,
}: {
  content: CategoryTabsContent;
}) {
  if (content.rows.length === 0) {
    return null;
  }

  const lastRow = content.rows.length - 1;

  return (
    <section aria-label="Course categories" className="pb-[77px]">
      <Container>
        <div className="flex flex-col items-center gap-y-[21px]">
          {content.rows.map((row, rowIndex) => (
            <ul
              key={rowIndex}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-[21px]"
            >
              {rowIndex === 0 ? (
                <li>
                  <Pill label={content.active} active />
                </li>
              ) : null}

              {row.map((tab) => (
                <li key={tab.value}>
                  <Pill label={tab} href={tab} />
                </li>
              ))}

              {rowIndex === lastRow ? (
                <li>
                  {/* The design draws this as the text "+ More" rather than a glyph beside
                      a label (node 21:73), and gives it no fill of its own. */}
                  <Link
                    href={routes.publicRoutes.placeholders.featuredCategories}
                    className="inline-flex h-[43px] items-center text-label-m font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
                  >
                    {content.moreLabel.value}
                  </Link>
                </li>
              ) : null}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pill({
  label,
  href,
  active = false,
}: {
  label: Copy;
  href?: Copy;
  active?: boolean;
}) {
  const className = cn(
    "inline-flex h-[43px] items-center rounded-brand-pill px-4 text-label-m font-medium transition-colors",
    active
      ? "bg-brand-accent text-brand-foreground"
      : "bg-brand-surface-muted text-brand-neutral-700 hover:bg-brand-border-soft",
  );

  if (!href) {
    return <span className={className}>{label.value}</span>;
  }

  return (
    <Link
      href={`${routes.publicRoutes.courses.list}?category=${slugify(href.value)}`}
      className={className}
    >
      {label.value}
    </Link>
  );
}
