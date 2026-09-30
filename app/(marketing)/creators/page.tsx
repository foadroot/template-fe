import type { Metadata } from "next";

import { routes } from "@/config/routes";
import {
  CREATORS_GRID_ANCHOR,
  CreatorsCategoryPills,
  CreatorsGrid,
  CreatorsHero,
  creatorsContent,
  readCreators,
  readCreatorsQuery,
} from "@/features/creators";

export const metadata: Metadata = {
  title: "Find your next creator",
  description:
    "Search ByteSpace's creators and filter the roster by what they teach.",
  alternates: { canonical: routes.publicRoutes.creators.list },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * The creators index — the discovery page the design has no frame for, built to match
 * `bytespace-dointech`'s: the blue search band, the nine category chips, six cards to a
 * page, and the empty state when a filter matches nothing. The header and footer come
 * from the marketing shell.
 *
 * Every control reads and writes the query rather than component state, so `q`,
 * `category` and `page` each narrow the roster and survive one another — a share, a
 * refresh and the back button all land on the same grid, and no script is needed to pick
 * a category or turn a page. The unfiltered first page is the first six of the twenty
 * records the fixture carries, in the order it lists them.
 */
export default async function CreatorsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = readCreatorsQuery(await searchParams);
  const selection = readCreators(query);

  return (
    <>
      <CreatorsHero content={creatorsContent.hero} query={query} />

      {/* The hero's control and the page row both scroll back to this point, which is
          why it sits between the band and the chip row rather than on the grid itself.
          The scroll margin keeps the sticky header from landing on top of it. */}
      <div id={CREATORS_GRID_ANCHOR} className="scroll-mt-24 lg:scroll-mt-32" />

      <CreatorsCategoryPills content={creatorsContent} query={query} />
      <CreatorsGrid
        content={creatorsContent}
        query={query}
        selection={selection}
      />
    </>
  );
}
