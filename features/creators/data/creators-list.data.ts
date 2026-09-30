import { placeholderCopy } from "@/lib/content/copy";
import { slugify } from "@/features/courses";
import {
  type CreatorsIndexContent,
  type CreatorsQuery,
  type CreatorsSelection,
  type CreatorSummary,
} from "@/features/creators/types/creators.types";

/**
 * The index's content and its twenty-creator fixture.
 *
 * None of this is read from the design file: `bytespace-dointech` (the reference this
 * template mirrors) ships a working creators discovery page with a full roster, and the
 * design only draws the Creator Profile it links to. The roster, the eight categories and
 * every string below are ported from that implementation, so they are all tagged
 * placeholder — findable as unverified against *this* file rather than indistinguishable
 * from the copy the frames do carry.
 */
export const creatorsContent: CreatorsIndexContent = {
  hero: {
    headline: placeholderCopy("Find Your Next Creator"),
    subcopy: placeholderCopy(
      "Discover and connect with top instructors, industry practitioners, and creative mentors sharing their expertise on ByteSpace.",
    ),
    searchPlaceholder: "Search creators by name, role, or username...",
    searchButtonLabel: placeholderCopy("Creators"),
  },

  // The reference's `CREATOR_CATEGORIES`, in its order: "All" first because it is the
  // state the page opens in and the only chip that narrows nothing.
  categories: [
    { slug: null, label: placeholderCopy("All") },
    ...[
      "UI/UX Design",
      "Web Development",
      "Digital Illustration",
      "AI & Data Science",
      "Marketing & Growth",
      "Photography & Video",
      "Motion & 3D",
      "Productivity & Business",
    ].map((label) => ({
      slug: slugify(label),
      label: placeholderCopy(label),
    })),
  ],

  resetLabel: placeholderCopy("Reset Filters"),
  emptyTitle: placeholderCopy("No creators found"),
  emptyBody: placeholderCopy(
    "We couldn't find any creators matching your search. Try searching with different keywords or clear your active filters.",
  ),
  clearLabel: placeholderCopy("Clear All Filters"),
  previousLabel: placeholderCopy("Previous page"),
  nextLabel: placeholderCopy("Next page"),
};

/** Six cards to a page, the reference's `ITEMS_PER_PAGE`. */
export const CREATORS_PER_PAGE = 6;

/** The reference's `CREATORS_MOCK_DATA`, field for field. */
const creators: CreatorSummary[] = [
  {
    handle: "purepearl-studio",
    name: placeholderCopy("PurePearl Studio"),
    username: "@purepearl",
    badge: placeholderCopy("Pro Creator"),
    role: placeholderCopy("Passionate UI/UX & Web Designer"),
    category: slugify("UI/UX Design"),
    categoryLabel: placeholderCopy("UI/UX Design"),
    avatar: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of PurePearl Studio",
    },
    shortBio: placeholderCopy(
      "Crafting modern user experiences, design systems, and web interfaces.",
    ),
    bio: placeholderCopy(
      "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
    ),
    courses: 8,
    followers: 14200,
    rating: 4.9,
  },
  {
    handle: "marcus-chen",
    name: placeholderCopy("Marcus Chen"),
    username: "@marcusdev",
    badge: placeholderCopy("Top Mentor"),
    role: placeholderCopy("Full-Stack Engineer & Next.js Architect"),
    category: slugify("Web Development"),
    categoryLabel: placeholderCopy("Web Development"),
    avatar: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Marcus Chen",
    },
    shortBio: placeholderCopy(
      "Mastering full-stack web applications with React, Next.js, and TypeScript.",
    ),
    bio: placeholderCopy(
      "Hey! I'm Marcus Chen, a full-stack engineer passionate about teaching modern web development using React, Next.js, and TypeScript.",
    ),
    courses: 12,
    followers: 28400,
    rating: 4.9,
  },
  {
    handle: "sophia-al-mansoor",
    name: placeholderCopy("Sophia Al-Mansoor"),
    username: "@sophiadesign",
    badge: placeholderCopy("Elite Creator"),
    role: placeholderCopy("Design Lead & Figma Specialist"),
    category: slugify("UI/UX Design"),
    categoryLabel: placeholderCopy("UI/UX Design"),
    avatar: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Sophia Al-Mansoor",
    },
    shortBio: placeholderCopy(
      "Transforming ideas into polished, accessible product design systems in Figma.",
    ),
    bio: placeholderCopy(
      "Lead designer helping students understand the psychology of visual interfaces and master Figma from beginner to enterprise workflows.",
    ),
    courses: 6,
    followers: 19800,
    rating: 4.8,
  },
  {
    handle: "david-kim",
    name: placeholderCopy("David Kim"),
    username: "@daviddata",
    badge: placeholderCopy("AI Specialist"),
    role: placeholderCopy("Senior AI Researcher & Data Scientist"),
    category: slugify("AI & Data Science"),
    categoryLabel: placeholderCopy("AI & Data Science"),
    avatar: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of David Kim",
    },
    shortBio: placeholderCopy(
      "Deep learning, predictive models, and practical Generative AI with Python.",
    ),
    bio: placeholderCopy(
      "Researcher at the forefront of generative AI, neural networks, and Python data pipelines for real-world enterprise applications.",
    ),
    courses: 9,
    followers: 22100,
    rating: 5.0,
  },
  {
    handle: "maya-lin",
    name: placeholderCopy("Maya Lin"),
    username: "@mayadraws",
    badge: placeholderCopy("Artist"),
    role: placeholderCopy("Concept Artist & Digital Illustrator"),
    category: slugify("Digital Illustration"),
    categoryLabel: placeholderCopy("Digital Illustration"),
    avatar: {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Maya Lin",
    },
    shortBio: placeholderCopy(
      "Digital illustration, character concept art, and vibrant brush techniques in Procreate.",
    ),
    bio: placeholderCopy(
      "Illustrator who has worked with leading games and media studios. Teaching digital character design, lighting, and concept art.",
    ),
    courses: 7,
    followers: 31200,
    rating: 4.9,
  },
  {
    handle: "lucas-silva",
    name: placeholderCopy("Lucas Silva"),
    username: "@lucas3d",
    badge: placeholderCopy("3D Maestro"),
    role: placeholderCopy("Blender & 3D Motion Specialist"),
    category: slugify("Motion & 3D"),
    categoryLabel: placeholderCopy("Motion & 3D"),
    avatar: {
      src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Lucas Silva",
    },
    shortBio: placeholderCopy(
      "Bringing ideas to life with Blender, 3D modeling, lighting, and cinematic motion graphics.",
    ),
    bio: placeholderCopy(
      "Crafting hyper-realistic 3D scenes and motion graphics in Blender. Empowering 3D artists to monetize commercial animation.",
    ),
    courses: 5,
    followers: 16500,
    rating: 4.8,
  },
  {
    handle: "amara-okafor",
    name: placeholderCopy("Amara Okafor"),
    username: "@amarafound",
    badge: placeholderCopy("Strategist"),
    role: placeholderCopy("Startup Founder & Product Strategist"),
    category: slugify("Productivity & Business"),
    categoryLabel: placeholderCopy("Productivity & Business"),
    avatar: {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Amara Okafor",
    },
    shortBio: placeholderCopy(
      "Proven frameworks to launch startups, validate ideas, and accelerate revenue.",
    ),
    bio: placeholderCopy(
      "Serial founder teaching customer discovery, digital monetization, and building lean MVPs from zero to product-market fit.",
    ),
    courses: 4,
    followers: 18900,
    rating: 4.9,
  },
  {
    handle: "alexander-wright",
    name: placeholderCopy("Alexander Wright"),
    username: "@alexwright",
    badge: placeholderCopy("Architect"),
    role: placeholderCopy("Cloud Architect & Distributed Systems"),
    category: slugify("Web Development"),
    categoryLabel: placeholderCopy("Web Development"),
    avatar: {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Alexander Wright",
    },
    shortBio: placeholderCopy(
      "Scalable cloud architectures, Docker, Kubernetes, and serverless best practices.",
    ),
    bio: placeholderCopy(
      "Principal cloud architect guiding developers through microservices, serverless infrastructure, and high-concurrency systems.",
    ),
    courses: 10,
    followers: 24700,
    rating: 4.8,
  },
  {
    handle: "nathaniel-brooks",
    name: placeholderCopy("Nathaniel Brooks"),
    username: "@nategrowth",
    badge: placeholderCopy("Growth Lead"),
    role: placeholderCopy("Digital Marketing & Brand Growth"),
    category: slugify("Marketing & Growth"),
    categoryLabel: placeholderCopy("Marketing & Growth"),
    avatar: {
      src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Nathaniel Brooks",
    },
    shortBio: placeholderCopy(
      "Data-driven marketing, user acquisition funnels, and organic brand acceleration.",
    ),
    bio: placeholderCopy(
      "Former growth director at top fintech startups, breaking down paid ads, organic SEO pipelines, and conversion rate optimization.",
    ),
    courses: 8,
    followers: 27300,
    rating: 4.9,
  },
  {
    handle: "clara-morales",
    name: placeholderCopy("Clara Morales"),
    username: "@claramorales",
    badge: placeholderCopy("Photographer"),
    role: placeholderCopy("Commercial Photographer & Colorist"),
    category: slugify("Photography & Video"),
    categoryLabel: placeholderCopy("Photography & Video"),
    avatar: {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Clara Morales",
    },
    shortBio: placeholderCopy(
      "Capturing visual emotion with professional lighting, composition, and color grading.",
    ),
    bio: placeholderCopy(
      "Published photographer sharing secrets of natural lighting, street portraits, and professional Lightroom / Photoshop color grading.",
    ),
    courses: 6,
    followers: 21500,
    rating: 4.9,
  },
  {
    handle: "julian-dupont",
    name: placeholderCopy("Julian Dupont"),
    username: "@juliandupont",
    badge: placeholderCopy("Design Lead"),
    role: placeholderCopy("Interaction Designer & Micro-Animations"),
    category: slugify("UI/UX Design"),
    categoryLabel: placeholderCopy("UI/UX Design"),
    avatar: {
      src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Julian Dupont",
    },
    shortBio: placeholderCopy(
      "Delightful web interactions, interactive prototypes, and motion design in Framer.",
    ),
    bio: placeholderCopy(
      "Obsessed with smooth micro-interactions, spring physics, and Framer prototypes that wow users and stakeholders.",
    ),
    courses: 7,
    followers: 15800,
    rating: 4.8,
  },
  {
    handle: "dr-evelyn-reed",
    name: placeholderCopy("Dr. Evelyn Reed"),
    username: "@evelynai",
    badge: placeholderCopy("AI Scholar"),
    role: placeholderCopy("AI Ethics & Machine Learning Professor"),
    category: slugify("AI & Data Science"),
    categoryLabel: placeholderCopy("AI & Data Science"),
    avatar: {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Dr. Evelyn Reed",
    },
    shortBio: placeholderCopy(
      "Rigorous yet intuitive explanations of machine learning algorithms and LLMs.",
    ),
    bio: placeholderCopy(
      "Demystifying statistical learning, LLM fine-tuning, and responsible AI system architecture for tech professionals.",
    ),
    courses: 5,
    followers: 34100,
    rating: 5.0,
  },
  {
    handle: "liam-gallagher",
    name: placeholderCopy("Liam Gallagher"),
    username: "@liamsound",
    badge: placeholderCopy("Producer"),
    role: placeholderCopy("Audio Engineer & Sound Designer"),
    category: slugify("Photography & Video"),
    categoryLabel: placeholderCopy("Photography & Video"),
    avatar: {
      src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Liam Gallagher",
    },
    shortBio: placeholderCopy(
      "Professional sound design, mixing, and audio production for creators and podcasters.",
    ),
    bio: placeholderCopy(
      "Award-winning sound designer sharing techniques for podcast mixing, film score basics, and crisp vocal production.",
    ),
    courses: 4,
    followers: 11200,
    rating: 4.7,
  },
  {
    handle: "chloe-zhang",
    name: placeholderCopy("Chloe Zhang"),
    username: "@chloezhang",
    badge: placeholderCopy("Brand Stylist"),
    role: placeholderCopy("Brand Identity & Logo Crafting"),
    category: slugify("Digital Illustration"),
    categoryLabel: placeholderCopy("Digital Illustration"),
    avatar: {
      src: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Chloe Zhang",
    },
    shortBio: placeholderCopy(
      "Timeless logo design, visual identities, and brand guidelines for modern companies.",
    ),
    bio: placeholderCopy(
      "Guiding designers through creative logo exploration, geometric grids, and crafting cohesive visual identity guidelines.",
    ),
    courses: 6,
    followers: 23400,
    rating: 4.9,
  },
  {
    handle: "tariq-hassan",
    name: placeholderCopy("Tariq Hassan"),
    username: "@tariqcloud",
    badge: placeholderCopy("DevOps Pro"),
    role: placeholderCopy("DevOps Engineer & SRE Specialist"),
    category: slugify("Web Development"),
    categoryLabel: placeholderCopy("Web Development"),
    avatar: {
      src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Tariq Hassan",
    },
    shortBio: placeholderCopy(
      "Mastering modern CI/CD pipelines, container orchestration, and cloud reliability.",
    ),
    bio: placeholderCopy(
      "Streamlining deployment pipelines with GitHub Actions, Terraform, and cloud infrastructure automation.",
    ),
    courses: 8,
    followers: 17600,
    rating: 4.8,
  },
  {
    handle: "zoe-martinez",
    name: placeholderCopy("Zoe Martinez"),
    username: "@zoemobile",
    badge: placeholderCopy("Mobile Guru"),
    role: placeholderCopy("Mobile App Architect & Flutter Specialist"),
    category: slugify("Web Development"),
    categoryLabel: placeholderCopy("Web Development"),
    avatar: {
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Zoe Martinez",
    },
    shortBio: placeholderCopy(
      "Crafting beautiful, reactive mobile apps with Flutter, Dart, and state management.",
    ),
    bio: placeholderCopy(
      "Building silky smooth cross-platform applications with Flutter and React Native for iOS and Android.",
    ),
    courses: 7,
    followers: 20400,
    rating: 4.9,
  },
  {
    handle: "isabella-rossi",
    name: placeholderCopy("Isabella Rossi"),
    username: "@isabellarossi",
    badge: placeholderCopy("Typography Lead"),
    role: placeholderCopy("Editorial Designer & Typographer"),
    category: slugify("UI/UX Design"),
    categoryLabel: placeholderCopy("UI/UX Design"),
    avatar: {
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Isabella Rossi",
    },
    shortBio: placeholderCopy(
      "Mastering typography, layout hierarchies, and editorial design for digital & print.",
    ),
    bio: placeholderCopy(
      "Teaching the nuances of typeface pairing, modular scales, and creating stunning editorial magazine layouts.",
    ),
    courses: 5,
    followers: 13900,
    rating: 4.8,
  },
  {
    handle: "vikram-patel",
    name: placeholderCopy("Vikram Patel"),
    username: "@vikramfin",
    badge: placeholderCopy("FinTech Pro"),
    role: placeholderCopy("FinTech Analyst & Crypto Researcher"),
    category: slugify("Productivity & Business"),
    categoryLabel: placeholderCopy("Productivity & Business"),
    avatar: {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Vikram Patel",
    },
    shortBio: placeholderCopy(
      "Decentralized finance, digital assets, and smart financial management for creators.",
    ),
    bio: placeholderCopy(
      "Navigating blockchain primitives, decentralised finance economics, and financial modeling for digital creators.",
    ),
    courses: 6,
    followers: 26800,
    rating: 4.8,
  },
  {
    handle: "ethan-howard",
    name: placeholderCopy("Ethan Howard"),
    username: "@ethancyber",
    badge: placeholderCopy("Security Lead"),
    role: placeholderCopy("Cybersecurity Analyst & Ethical Hacker"),
    category: slugify("Web Development"),
    categoryLabel: placeholderCopy("Web Development"),
    avatar: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Ethan Howard",
    },
    shortBio: placeholderCopy(
      "Web application security, API vulnerability testing, and ethical hacking essentials.",
    ),
    bio: placeholderCopy(
      "Securing web applications, penetration testing modern APIs, and defending systems against OWASP Top 10 exploits.",
    ),
    courses: 9,
    followers: 29500,
    rating: 4.9,
  },
  {
    handle: "hannah-schmidt",
    name: placeholderCopy("Hannah Schmidt"),
    username: "@hannahcreator",
    badge: placeholderCopy("Content Strategist"),
    role: placeholderCopy("YouTube Producer & Audience Growth"),
    category: slugify("Marketing & Growth"),
    categoryLabel: placeholderCopy("Marketing & Growth"),
    avatar: {
      src: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
      alt: "Portrait of Hannah Schmidt",
    },
    shortBio: placeholderCopy(
      "Video storytelling, YouTube algorithms, and building a loyal engaged community.",
    ),
    bio: placeholderCopy(
      "Helping creative professionals script, produce, and scale impactful video content and personal brands.",
    ),
    courses: 8,
    followers: 38200,
    rating: 5.0,
  },
];

const asString = (value: string | string[] | undefined): string | null =>
  typeof value === "string" && value.trim() !== "" ? value.trim() : null;

/** Reads the route's query into the shape the index renders from. */
export function readCreatorsQuery(
  params: Record<string, string | string[] | undefined>,
): CreatorsQuery {
  const page = Number.parseInt(asString(params.page) ?? "", 10);
  // `?category=all` is the same as no category at all, so a hand-edited URL lands on the
  // state the chip strip already calls "All" instead of on a filter that matches nothing.
  const category = asString(params.category);

  return {
    q: asString(params.q) ?? "",
    category: category && category !== "all" ? category : null,
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

const haystack = (creator: CreatorSummary) =>
  [
    creator.name.value,
    creator.username,
    creator.role.value,
    creator.categoryLabel.value,
    creator.shortBio.value,
  ]
    .join(" ")
    .toLowerCase();

/**
 * Applies the route's query to the roster: search, then category, then paging.
 *
 * The search matches the same five fields the reference matches — name, username, role,
 * category and short bio — so a query that finds a creator there finds one here. The page
 * is clamped against the filtered set, so a stale `?page=` past the end lands on the last
 * page rather than on an empty grid.
 */
export function readCreators(query: CreatorsQuery): CreatorsSelection {
  const needle = query.q.trim().toLowerCase();

  const matched = creators.filter((creator) => {
    if (needle && !haystack(creator).includes(needle)) return false;
    if (query.category && creator.category !== query.category) return false;

    return true;
  });

  const pageCount = Math.max(1, Math.ceil(matched.length / CREATORS_PER_PAGE));
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * CREATORS_PER_PAGE;

  return {
    creators: matched.slice(start, start + CREATORS_PER_PAGE),
    total: matched.length,
    pageCount,
    page,
  };
}

/**
 * Looks a roster entry up by handle, so the profile route can render for every creator
 * the grid links to and still 404 on a handle neither source knows.
 */
export function readCreatorRecord(handle: string): CreatorSummary | null {
  return creators.find((creator) => creator.handle === handle) ?? null;
}
