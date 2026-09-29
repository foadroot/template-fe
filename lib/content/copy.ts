/**
 * Page copy, tagged with whether it is verified design copy.
 *
 * The only view available of the design source is a 1280px canvas render whose body text
 * cannot be read, so most strings in the fixture data are written to fill a gap. Tagging
 * each string makes the unverified ones findable instead of indistinguishable from the
 * real copy (spec: bytespace-homepage, "Unverified copy is flagged as placeholder").
 *
 * Reconciliation is mechanical: replace the string, flip `placeholder` to false, and the
 * tag disappears from the page's content data.
 */
export type Copy = {
  value: string;
  placeholder: boolean;
};

/** A string written to fill a gap in the design source. */
export const placeholderCopy = (value: string): Copy => ({
  value,
  placeholder: true,
});

/** A string read from the design source. */
export const verifiedCopy = (value: string): Copy => ({
  value,
  placeholder: false,
});
