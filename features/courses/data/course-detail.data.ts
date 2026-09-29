import { routes } from "@/config/routes";
import { verifiedCopy } from "@/lib/content/copy";
import { readCourseCard } from "@/features/courses/data/catalogue.data";
import {
  type CourseDetailContent,
  type CourseTab,
} from "@/features/courses/types/courses.types";

/**
 * The Course Details frame (55:4066) draws one course — the second of the six titles the
 * results grid repeats — under its full headline. The other slugs resolve too, so no
 * card in the grid is a dead end, and they borrow the frame's copy while carrying the
 * title the grid already showed them.
 */
const headlineForSlug: Record<string, string> = {
  "course-2": "Build Digital Asset: A Comprehensive Guide",
};

/**
 * The three paragraphs of the Description block, read off the frame's own text node —
 * the blank lines are the node's real `\n\n` separators, not a typographic addition.
 */
const description = `Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.

In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.

As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.`;

const hero = {
  subtitle: verifiedCopy(
    "Unlock the Power of Digital Creation with Expert Guidance",
  ),
  creator: verifiedCopy("by purepearl studio"),
  facts: [
    { icon: "level" as const, label: verifiedCopy("Intermediate") },
    { icon: "rating" as const, label: verifiedCopy("4.8 (172 reviews)") },
    { icon: "students" as const, label: verifiedCopy("199 Students") },
  ],
  shareLabel: verifiedCopy("Share"),
  playLabel: "Play course preview",
  videoAlt: "Course preview for Build Digital Asset",
};

const tabs = (slug: string): CourseTab[] => [
  {
    id: "about",
    label: verifiedCopy("About"),
    href: routes.publicRoutes.courses.detail(slug),
  },
  {
    id: "lessons",
    label: verifiedCopy("Lessons"),
    href: routes.publicRoutes.courses.lessons(slug),
  },
  {
    id: "reviews",
    label: verifiedCopy("Reviews"),
    href: routes.publicRoutes.courses.reviews(slug),
  },
];

const about = {
  descriptionHeading: verifiedCopy("Description"),
  description: verifiedCopy(description),
  galleryHeading: verifiedCopy("Sneak Peak"),
  keyPointsHeading: verifiedCopy("Key Points"),
  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ].map(verifiedCopy),
};

/**
 * The Lessons panel of frame (60:102). The file numbers its six rows 1, 2, 4, 5, 6, 7 —
 * there is no Module 3 — and the list is kept that way rather than renumbered.
 */
const lessons = {
  modulesHeading: verifiedCopy("Explore the Modules"),
  modulesIntro: verifiedCopy(
    "Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.",
  ),
  listHeading: verifiedCopy("Lesson List"),
  modules: [
    {
      label: "Module 1: Introduction to Digital Assets",
      body: "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    },
    {
      label: "Module 2: Design Principles for Impact",
      body: "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    },
    {
      label: "Module 4: User-Centric Design Strategies",
      body: "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    },
    {
      label: "Module 5: Interactive Media and Engagement",
      body: "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    },
    {
      label: "Module 6: Project Showcase and Critique",
      body: "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    },
    {
      label: "Module 7: Optimizing Digital Assets for Various Platforms",
      body: "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    },
  ].map(({ label, body }) => ({
    label: verifiedCopy(label),
    body: verifiedCopy(body),
  })),
  contentHeading: verifiedCopy("Lesson Content"),
  contentBody: verifiedCopy(
    "Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.",
  ),
  progressHeading: verifiedCopy("Lesson Progress Tracking"),
  progressBody: verifiedCopy(
    "Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.",
  ),
  progressLabel: verifiedCopy("Learning Progress"),
  progressValue: verifiedCopy("55%"),
  // The drawn bar runs 387 of its 691px track — 56%, one point above its own label.
  progressPercent: 56,
};

/**
 * The Reviews panel of frame (60:681). Every rating row is drawn with a full five-star
 * glyph and grey stars rather than gold, so the star rows carry no per-row rating of
 * their own; the bar widths and counts are the frame's own numbers.
 */
const reviews = {
  heading: verifiedCopy("What Learners Are Saying"),
  intro: verifiedCopy(
    "Discover what our learners have to say about their experience with 'Build Digital Assets: A Comprehensive Guide.' Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.",
  ),
  summary: {
    scoreLabel: verifiedCopy("Ratings"),
    score: verifiedCopy("4.7"),
    bars: [
      { count: "720", percent: 92.2 },
      { count: "120", percent: 36.5 },
      { count: "21", percent: 9.6 },
      { count: "12", percent: 3.5 },
      { count: "16", percent: 5.3 },
    ].map(({ count, percent }) => ({ count: verifiedCopy(count), percent })),
  },
  listHeading: verifiedCopy("Individual Reviews:"),
  allRatingsLabel: verifiedCopy("All rating"),
  ratingFilters: ["5", "4", "3", "2", "1"].map(verifiedCopy),
  reviews: [
    {
      name: "PurePearl Studio",
      body: "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
    },
    {
      name: "Albert Flores",
      body: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    },
    {
      name: "Cody Fisher",
      body: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    },
    {
      name: "Brooklyn Simmons",
      body: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    },
  ].map(({ name, body }) => ({
    name: verifiedCopy(name),
    role: verifiedCopy("UI/UX Designer"),
    posted: verifiedCopy("a year ago"),
    body: verifiedCopy(body),
  })),
};

const enroll = {
  lessonsHeading: verifiedCopy("112 Lessons (24 hours)"),
  lessons: [
    {
      index: "01",
      title: verifiedCopy("Introduction to Digital Assets"),
      duration: verifiedCopy("12 mins"),
    },
    {
      index: "02",
      title: verifiedCopy("Design Principles for Impacts"),
      duration: verifiedCopy("21 mins"),
    },
    {
      index: "03",
      title: verifiedCopy("Advanced Techniques in Digital Creation"),
      duration: verifiedCopy("16 mins"),
    },
  ],
  moreVideos: verifiedCopy("99 more videos"),
  // The frame reuses this line for both blurbs; it is drawn that way, not a copy slip.
  blurb: verifiedCopy(
    "Ready to Dive In? Enroll Now and Start Building Your Digital Future!",
  ),
  price: verifiedCopy("$25"),
  priceSuffix: verifiedCopy("/lifetime"),
  ctaLabel: verifiedCopy("Enroll Now"),
  includesHeading: verifiedCopy("This course include"),
  includes: [
    { icon: "resources" as const, label: verifiedCopy("Learning Resources") },
    { icon: "videos" as const, label: verifiedCopy("Quality Lesson Videos") },
    {
      icon: "certificate" as const,
      label: verifiedCopy("Certificate of Completion"),
    },
    {
      icon: "consultation" as const,
      label: verifiedCopy("Private Consultation"),
    },
  ],
  creatorName: verifiedCopy("PurePearl Studio"),
  creatorRole: verifiedCopy("Professional Creator"),
  creatorBlurb: verifiedCopy(
    "Ready to Dive In? Enroll Now and Start Building Your Digital Future!",
  ),
  profileLabel: verifiedCopy("See Full Profile"),
};

/**
 * Resolves the `/courses/[slug]` shell for one slug. An unknown slug returns null so the
 * route can fall through to the branded 404 rather than invent a course.
 */
export function readCourse(slug: string): CourseDetailContent | null {
  const card = readCourseCard(slug);

  if (!card) {
    return null;
  }

  return {
    slug,
    hero: {
      ...hero,
      title: verifiedCopy(headlineForSlug[slug] ?? card.title.value),
    },
    tabs: tabs(slug),
    about,
    lessons,
    reviews,
    enroll,
  };
}
