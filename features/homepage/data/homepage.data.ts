import { routes } from "@/config/routes";
import { type HomepageContent } from "@/features/homepage/types/homepage.types";
import { verifiedCopy } from "@/lib/content/copy";

/**
 * Homepage content, read from the design's Home frame (1:1067) via the Figma API rather
 * than sampled from a render, so every string below is the design's own copy.
 *
 * Section order follows the frame's own y positions: hero 1748, logo strip 2772, intro
 * 3046, category tabs 3268, course grid 3516, second intro 4396, category tiles 4581,
 * showcase 4868, creator CTA 6328, testimonials 6816, footer 7600.
 *
 * The category tab labels are the three rows the design draws (`21:33`, `21:56`,
 * `21:63`); they wrap into the rows the frame shows rather than being authored.
 */
export const homepageContent: HomepageContent = {
  hero: {
    headline: verifiedCopy("Get Access to Hundreds Courses Available"),
    subheadline: verifiedCopy(
      "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
    ),
    searchPlaceholder: "Course, topic, creator",
    searchButtonLabel: verifiedCopy("Search"),
    imageAlt: "A student browsing ByteSpace courses on a laptop",
    categoryCard: {
      id: "uiux",
      title: verifiedCopy("UI/UX Design"),
      meta: [verifiedCopy("200 Courses"), verifiedCopy("1000+ Students")],
    },
    statCards: [
      {
        id: "progress",
        variant: "progress",
        label: verifiedCopy("Learning Progress"),
        value: verifiedCopy("55%"),
        // The design fills this track by 112 of 200px (node 1:1803), so the bar is 56%
        // even though the figure beside it reads 55%.
        progress: 56,
      },
      {
        id: "students",
        variant: "avatars",
        label: verifiedCopy("Happy Students"),
        value: verifiedCopy("2K+"),
        meta: verifiedCopy("4.5 (240)"),
        avatars: 7,
      },
    ],
  },

  // The marks themselves are vector artwork in the file rather than named brands, so the
  // row reserves their slots. The band, its height and the mark count are the design's.
  logoStrip: {
    logos: Array.from({ length: 5 }, (_, index) => ({
      id: `partner-${index + 1}`,
      alt: `Partner logo ${index + 1}`,
    })),
  },

  intro: {
    headline: verifiedCopy("Discover Your Passion, Build Your Skills"),
    body: verifiedCopy(
      "At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life.",
    ),
  },

  // The labels and the grouping are the three rows the design draws (21:33, 21:56,
  // 21:63), which its own pill widths break after "Creative Marketing" and "Photography".
  categoryTabs: {
    active: verifiedCopy("Featured"),
    rows: [
      [
        verifiedCopy("Music"),
        verifiedCopy("Drawing & Painting"),
        verifiedCopy("Marketing"),
        verifiedCopy("Animation"),
        verifiedCopy("Social Media"),
        verifiedCopy("UI/UX Design"),
        verifiedCopy("Creative Marketing"),
      ],
      [
        verifiedCopy("Digital Illustration"),
        verifiedCopy("Film & Video"),
        verifiedCopy("Crafts"),
        verifiedCopy("Freelance & Entrepreneurship"),
        verifiedCopy("Graphic Design"),
        verifiedCopy("Photography"),
      ],
      [
        verifiedCopy("Productivity"),
        verifiedCopy("Web Development"),
        verifiedCopy("Data Science"),
        verifiedCopy("Cooking"),
      ],
    ],
    // The design's own string, plus sign included (node 21:73).
    moreLabel: verifiedCopy("+ More"),
  },

  // The design repeats one card six times with identical facts, so the fixture keeps the
  // repetition rather than inventing per-card numbers.
  courseGrid: {
    cards: [
      "Learn Figma from Basic",
      "Build Digital Asset",
      "the Power of Big Data",
      "Balancing Productivity and Self-Care",
      "Mastering Money Management",
      "From Idea to Startup Success",
    ].map((title, index) => ({
      id: `course-${index + 1}`,
      href: routes.publicRoutes.courses.detail(`course-${index + 1}`),
      title: verifiedCopy(title),
      creator: verifiedCopy("by purepearl studio"),
      imageAlt: `Cover artwork for the course ${title}`,
      facts: [
        verifiedCopy("17 Lessons"),
        verifiedCopy("2 hours 16 mins"),
        verifiedCopy("59 Comments"),
      ],
      level: verifiedCopy("Beginner"),
      students: verifiedCopy("26+"),
      price: verifiedCopy("$25"),
      priceSuffix: verifiedCopy("/lifetime"),
      rating: verifiedCopy("4.5"),
    })),
  },

  categoriesIntro: {
    headline: verifiedCopy("Explore Diverse Learning Paths at Bytespace"),
    body: verifiedCopy(
      "At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories.",
    ),
  },

  categoryTiles: {
    tiles: [
      { id: "design", label: verifiedCopy("Design"), icon: "design" },
      { id: "development", label: verifiedCopy("Development"), icon: "development" },
      { id: "it", label: verifiedCopy("IT & Software"), icon: "it" },
      { id: "business", label: verifiedCopy("Business"), icon: "business" },
      { id: "marketing", label: verifiedCopy("Marketing"), icon: "marketing" },
      { id: "photography", label: verifiedCopy("Photography"), icon: "photography" },
    ],
  },

  // Both blocks are measured from the showcase frame (34:1159, 1440x1460 at y 3120):
  // block 1's text column is 574 wide against a 621-wide media column 63px to its right,
  // block 2 is 541/79/580 the other way round, and every card inside a media column is
  // placed at its own offset. The blocks sit 72px apart inside 120px of section padding
  // (120 + 552 + 72 + 596 + 120 = 1460).
  showcase: {
    blocks: [
      {
        id: "growth",
        media: "end",
        headline: verifiedCopy("Your Path to Professional Growth Starts Here!"),
        headlineWidth: 577,
        body: verifiedCopy(
          "Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need.",
        ),
        bodyWidth: 477,
        stats: [
          { id: "students", value: verifiedCopy("12K"), label: verifiedCopy("Students") },
          { id: "courses", value: verifiedCopy("70+"), label: verifiedCopy("Courses") },
          { id: "creators", value: verifiedCopy("16"), label: verifiedCopy("Creators") },
        ],
        mediaBox: {
          width: 621,
          height: 552,
          image: {
            x: 0,
            y: 12,
            width: 577,
            height: 540,
            ratio: "577/540",
          },
          imageAlt: "A student on a course call with the ByteSpace app open",
          ornament: {
            x: 406,
            y: 67,
            size: 215,
            alt: "An illustration of ByteSpace course artwork",
          },
        },
        overlayCards: [
          {
            id: "progress",
            label: verifiedCopy("Learning Progress"),
            value: verifiedCopy("55%"),
            emphasis: "display",
            progress: 56,
            place: { x: 345, y: 213, width: 232 },
          },
        ],
      },
      {
        id: "manage",
        media: "start",
        headline: verifiedCopy("Create & Manage Courses Easily."),
        headlineWidth: 391,
        body: verifiedCopy(
          "ByteSpace supports individuals or entities in the creation, publication, and administration of educational courses.",
        ),
        bodyWidth: 574,
        features: [
          verifiedCopy("Share Your Expertise"),
          verifiedCopy("Monetize Your Passion"),
          verifiedCopy("Flexibility and Autonomy"),
          verifiedCopy("Build a Community"),
        ],
        mediaBox: {
          width: 541,
          height: 596,
          image: {
            x: 28,
            y: 0,
            width: 435,
            height: 596,
            ratio: "435/596",
          },
          imageAlt: "A creator reviewing their ByteSpace revenue",
          ornament: {
            x: 305,
            y: 114,
            size: 215,
            alt: "An illustration of ByteSpace course artwork",
          },
        },
        overlayCards: [
          {
            id: "revenue",
            label: verifiedCopy("Total Revenue"),
            value: verifiedCopy("$120.29"),
            emphasis: "value",
            meta: verifiedCopy("July 1-28"),
            chip: verifiedCopy("+12$"),
            progress: 56,
            tone: "brand",
            place: { x: 0, y: 44, width: 232 },
          },
          {
            id: "ytd",
            label: verifiedCopy("Year to Date"),
            value: verifiedCopy("$1,200.38"),
            emphasis: "value",
            meta: verifiedCopy("2023"),
            chip: verifiedCopy("+12$"),
            chipBelow: true,
            tone: "brand",
            place: { x: 0, y: 194, width: 134 },
          },
          {
            id: "happy-students",
            label: verifiedCopy("Happy Students"),
            // The student card's only figure is a 10px rating line (node 34:1042), not a
            // headline number.
            value: verifiedCopy("4.5 (240)"),
            emphasis: "compact",
            avatars: 7,
            badge: verifiedCopy("2K+"),
            place: { x: 283, y: 413, width: 258 },
          },
        ],
      },
    ],
  },

  creatorCta: {
    headline: verifiedCopy("Unlock Your Potential as a Creator with ByteSpace"),
    body: verifiedCopy(
      "Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a part of a community comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course Library.",
    ),
    ctaLabel: verifiedCopy("Join as Creator"),
    ctaHref: routes.publicRoutes.auth.register,
  },

  testimonials: {
    headline: verifiedCopy("Discover What Our Community Is Saying"),
    body: verifiedCopy(
      "At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.",
    ),
    items: [
      {
        id: "sarah",
        name: verifiedCopy("Sarah M."),
        role: verifiedCopy("Enthusiastic Learner"),
        quote: verifiedCopy(
          '"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning."',
        ),
        avatarAlt: "Portrait of Sarah M., an enthusiastic learner",
      },
      {
        id: "james",
        name: verifiedCopy("James L."),
        role: verifiedCopy("Lifelong Learner"),
        quote: verifiedCopy(
          '"I\'ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development."',
        ),
        avatarAlt: "Portrait of James L., a lifelong learner",
      },
      {
        id: "alex",
        name: verifiedCopy("Alex B."),
        role: verifiedCopy("Inspired Creator"),
        quote: verifiedCopy(
          '"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It\'s fulfilling to see my courses making a positive impact on learners globally."',
        ),
        avatarAlt: "Portrait of Alex B., an inspired creator",
      },
    ],
  },
};
