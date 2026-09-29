import { verifiedCopy } from "@/lib/content/copy";
import { coursesContent, readCatalogue } from "@/features/courses";
import { type CreatorProfileContent } from "@/features/creators/types/creators.types";

/**
 * The frame's own bio, including its line break after "learn together!" and the word the
 * design drops in front of "ive into my creative portfolio". Both are how the file
 * reads; the break is kept because it is what makes the paragraph four lines tall.
 */
const bio = [
  "Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
  "ive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
].join("\n");

const purePearlStudio: CreatorProfileContent = {
  handle: "purepearl-studio",
  name: verifiedCopy("PurePearl Studio"),
  badge: verifiedCopy("Creator"),
  tagline: verifiedCopy("Passionate UI/UX, Web designer"),
  bio: verifiedCopy(bio),
  avatarAlt: "Portrait of the PurePearl Studio team",
  stats: [
    { value: verifiedCopy("3"), label: verifiedCopy("Products") },
    { value: verifiedCopy("12"), label: verifiedCopy("Followers") },
  ],
  followLabel: verifiedCopy("Follow"),
  // The profile frame repeats the results page's toolbar verbatim — same three pills,
  // same sort control — so it is read from the one place that owns it.
  coursesToolbar: coursesContent.toolbar,
  // Six cards over two rows: the same six titles the frame repeats across its catalogue.
  courses: readCatalogue().slice(0, 6),
};

const creators: Record<string, CreatorProfileContent> = {
  [purePearlStudio.handle]: purePearlStudio,
};

/** The only creator the design draws; `/creators` stands in for the missing index. */
export const defaultCreatorHandle = purePearlStudio.handle;

/** Looks a creator up by handle, for the dynamic route to render or 404 on. */
export function creatorProfile(handle: string): CreatorProfileContent | null {
  return creators[handle] ?? null;
}
