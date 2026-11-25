// Articles kept live for visitors and internal links, but marked noindex and
// left out of the sitemap.
//
// Why: between Nov 11 and Nov 16, 2026 the daily routine published 25 articles
// in six days, most of them about other provinces, Express Entry and general
// IRCC topics rather than BC PNP. That batch went out during Google's
// November 2026 core update (started Nov 10), and rankings for the core
// "bc pnp calculator" queries fell from ~position 6 to ~14-20. Thin-on-topic,
// high-volume content dilutes a niche site's topical focus, so these pages are
// kept out of the index until they are rewritten around BC PNP or removed.
//
// To re-index a page, delete its slug from this list.
export const NOINDEX_ARTICLES = new Set([
  "alberta-pnp-draws",
  "alberta-pnp-guide",
  "bridging-open-work-permit-bowp",
  "canada-visitor-visa-processing-time",
  "canadian-citizenship-certificate",
  "canadian-experience-class",
  "copr-confirmation-of-permanent-residence",
  "express-entry-crs-score-calculator",
  "express-entry-draws-paused-november-2026-immigration-roundup",
  "express-entry-draws",
  "express-entry-profile",
  "federal-skilled-worker-program",
  "imm5476-use-of-representative-form",
  "ircc-processing-times-canada",
  "manitoba-pnp-draws",
  "manitoba-pnp-guide",
  "new-brunswick-pnp-guide",
  "next-express-entry-draw-november-2026",
  "nova-scotia-pnp-guide",
  "oinp-updates-ontario-pnp",
  "rcic-regulated-canadian-immigration-consultant",
  "super-visa-canada",
]);
