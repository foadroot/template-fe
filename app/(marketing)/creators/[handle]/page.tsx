import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionErrorBoundary } from "@/components/shared/section-error-boundary";
import { routes } from "@/config/routes";
import {
  CreatorCourses,
  CreatorHero,
  creatorProfile,
} from "@/features/creators";

type ProfileParams = Promise<{ handle: string }>;

export async function generateMetadata({
  params,
}: {
  params: ProfileParams;
}): Promise<Metadata> {
  const { handle } = await params;
  const creator = creatorProfile(handle);

  if (!creator) {
    return { title: "Creator not found" };
  }

  return {
    title: `${creator.name.value} — ByteSpace`,
    description: creator.tagline.value,
    alternates: { canonical: routes.publicRoutes.creators.profile(handle) },
  };
}

/**
 * The Creator Profile route, matching the design's frame (60:1878): the blue identity
 * band and the six-card course grid, with the header and footer from the marketing
 * shell. The frame draws one creator, so that fixture is the one carrying the design's
 * own copy; the other handles the index links to are built from their roster record on
 * the way out. A handle neither source knows falls through to the branded 404 rather
 * than to an invented profile.
 */
export default async function CreatorProfilePage({
  params,
}: {
  params: ProfileParams;
}) {
  const { handle } = await params;
  const creator = creatorProfile(handle);

  if (!creator) {
    notFound();
  }

  return (
    <>
      <SectionErrorBoundary name="Creator hero">
        <CreatorHero content={creator} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Creator courses">
        <CreatorCourses content={creator} />
      </SectionErrorBoundary>
    </>
  );
}
