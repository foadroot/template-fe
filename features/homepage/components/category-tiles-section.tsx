import Link from "next/link";
import {
  Building2,
  Camera,
  Laptop,
  Megaphone,
  PencilRuler,
  Smartphone,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";
import {
  type CategoryIconName,
  type CategoryTilesContent,
} from "@/features/homepage/types/homepage.types";

const icons: Record<CategoryIconName, typeof Camera> = {
  design: PencilRuler,
  development: Smartphone,
  it: Laptop,
  business: Building2,
  marketing: Megaphone,
  photography: Camera,
};

/** Turns a tile label into the query value the courses list filters on. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * The category tiles (`34:725`): six outlined cards, each holding a lime disc with the
 * category's icon above its label.
 *
 * The frame is 1202x167 and holds six 167px squares over 40px gutters — exactly the full
 * content column — so the tiles are square at every width. The 120px down to the showcase
 * is this section's own bottom padding (the frame ends at 3000, the showcase starts at
 * 3120).
 */
export function CategoryTilesSection({
  content,
}: {
  content: CategoryTilesContent;
}) {
  if (content.tiles.length === 0) {
    return null;
  }

  return (
    <section aria-label="Browse by category" className="pb-[120px]">
      <Container>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {content.tiles.map((tile, index) => {
            const Icon = icons[tile.icon];

            return (
              /* Zoom rather than slide: the tiles read as chips surfacing, and the
                 sweep runs left to right across whichever row the index lands in. */
              <Reveal
                key={tile.id}
                as="li"
                effect="zoom"
                delay={(index % 6) * 80}
              >
                <Link
                  href={`${routes.publicRoutes.courses.list}?category=${slugify(tile.label.value)}`}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-brand-panel border border-brand-border bg-brand-card px-3 text-center transition-[translate,border-color,background-color,box-shadow] duration-300 ease-out delay-[0ms,0ms,0ms,80ms] hover:-translate-y-1.5 hover:border-brand-accent hover:bg-brand-surface-muted hover:shadow-[var(--shadow-brand-card)]"
                >
                  <span className="grid size-15 place-items-center rounded-full bg-brand-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon aria-hidden className="size-6 text-brand-foreground" />
                  </span>
                  <span className="text-heading-xs font-medium text-brand-foreground">
                    {tile.label.value}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
