import { families } from "@/data/families";

/** The photos families sent with a caption — the home page features these. */
export const captioned = families.filter((f) => f.caption);

/** Viewer order on the home page: captioned photos first, then everyone else. */
export const homeViewerOrder = [...captioned, ...families.filter((f) => !f.caption)];

export { families };
