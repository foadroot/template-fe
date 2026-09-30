import type { Metadata } from "next";

import { SectionErrorBoundary } from "@/components/shared/section-error-boundary";
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
      <SectionErrorBoundary name="Hero">
        <HeroSection content={homepageContent.hero} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Partner logos">
        <LogoStripSection content={homepageContent.logoStrip} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Intro">
        <IntroSection content={homepageContent.intro} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Category tabs">
        <CategoryTabsSection content={homepageContent.categoryTabs} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Course grid">
        <CourseGridSection content={homepageContent.courseGrid} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Categories intro">
        <IntroSection content={homepageContent.categoriesIntro} size="s" />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Category tiles">
        <CategoryTilesSection content={homepageContent.categoryTiles} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Showcase">
        <ShowcaseSection content={homepageContent.showcase} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Creator CTA">
        <CreatorCtaSection content={homepageContent.creatorCta} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Testimonials">
        <TestimonialSection content={homepageContent.testimonials} />
      </SectionErrorBoundary>
    </>
  );
}
