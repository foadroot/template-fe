/**
 * Homepage feature module — the only import surface for this feature.
 */
export { homepageContent } from "./data/homepage.data";

export { HeroSection } from "./components/hero-section";
export { LogoStripSection } from "./components/logo-strip-section";
export { IntroSection } from "./components/intro-section";
export { CategoryTabsSection } from "./components/category-tabs-section";
export { CourseCard } from "./components/course-card";
export { CourseGridSection } from "./components/course-grid-section";
export { CategoryTilesSection } from "./components/category-tiles-section";
export { ShowcaseSection } from "./components/showcase-section";
export { CreatorCtaSection } from "./components/creator-cta-section";
export { TestimonialSection } from "./components/testimonial-section";

export type {
  CategoryIconName,
  CategoryTabsContent,
  CategoryTilesContent,
  CourseCardContent,
  CourseGridContent,
  CreatorCtaContent,
  HeroCategoryCard,
  HeroContent,
  HeroStatCard,
  HomepageContent,
  IntroContent,
  LogoStripContent,
  ShowcaseBlock,
  ShowcaseContent,
  ShowcaseOverlayCard,
  StatItem,
  TestimonialItem,
  TestimonialsContent,
} from "./types/homepage.types";
