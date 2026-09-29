import type { Metadata } from "next";

import {
  CategoryTabsSection,
  CategoryTilesSection,
  CourseGridSection,
  CreatorCtaSection,
  HeroSection,
  IntroSection,
  LogoStripSection,
  ShowcaseSection,
  TestimonialSection,
  homepageContent,
} from "@/features/homepage";

export const metadata: Metadata = {
  title: "Get access to hundreds of courses",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
  alternates: { canonical: "/" },
};

/**
 * The homepage, section for section in the order the design's Home frame (1:1067) stacks
 * them: hero, partner logos, intro, category filters, course grid, a second intro, the
 * category tiles, the feature showcase, the creator call to action and testimonials. The
 * footer is part of the marketing shell.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection content={homepageContent.hero} />
      <LogoStripSection content={homepageContent.logoStrip} />
      <IntroSection content={homepageContent.intro} />
      <CategoryTabsSection content={homepageContent.categoryTabs} />
      <CourseGridSection content={homepageContent.courseGrid} />
      <IntroSection content={homepageContent.categoriesIntro} size="s" />
      <CategoryTilesSection content={homepageContent.categoryTiles} />
      <ShowcaseSection content={homepageContent.showcase} />
      <CreatorCtaSection content={homepageContent.creatorCta} />
      <TestimonialSection content={homepageContent.testimonials} />
    </>
  );
}
