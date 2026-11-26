// One owner page per query family, with the anchor text every other page
// should use when it links there. Anchors are the target query plus its
// number or promise (see docs/query-map.md). Numbers that change with draws
// are computed from src/data/bcpnp-draws.ts, so anchors never go stale.
import {
  latestDrawMinScore,
  latestDrawDate,
  shortDate,
  latestFor,
  latestHeiWage,
} from "../utils/draws";
import { TECH_NOCS } from "./tech-nocs";

export interface SiteLink {
  href: string;
  /** Anchor for related blocks: query + number/promise. */
  anchor: string;
  /** Short in-sentence anchor (the bare query). */
  short: string;
  group: "Calculators" | "Draws" | "Eligibility" | "Streams" | "How to apply";
}

const childcare = latestFor("childcare");
const heiPoints = latestFor("hei-points");

export const LINKS = {
  calculator: {
    href: "/",
    anchor: "BC PNP points calculator: your SIRS score in 2 minutes",
    short: "BC PNP points calculator",
    group: "Calculators",
  },
  drawCalculator: {
    href: "/bc-pnp-calculator",
    anchor: "BC PNP draw calculator: your score vs every 2026 draw",
    short: "BC PNP draw calculator",
    group: "Calculators",
  },
  draws: {
    href: "/bc-pnp-draws",
    anchor: `BC PNP draws 2026: latest minimum ${latestDrawMinScore} (${shortDate(latestDrawDate)})`,
    short: "latest BC PNP draws",
    group: "Draws",
  },
  hei: {
    href: "/articles/bc-pnp-innovate-high-economic-impact-draws-2027",
    anchor: `High Economic Impact draws: ${heiPoints.score} points or $${latestHeiWage.rule?.match(/\$(\d+)\/hr/)?.[1]}/hr`,
    short: "High Economic Impact draws",
    group: "Draws",
  },
  workExperience: {
    href: "/articles/bc-pnp-work-experience-requirements-2026",
    anchor: "Work experience requirements: 2 years of skilled work",
    short: "BC PNP work experience requirements",
    group: "Eligibility",
  },
  jobOffer: {
    href: "/articles/bc-pnp-job-offer-requirements-2026",
    anchor: "Job offer requirements: full-time and indeterminate",
    short: "BC PNP job offer requirements",
    group: "Eligibility",
  },
  withoutJobOffer: {
    href: "/articles/bc-pnp-without-job-offer",
    anchor: "BC PNP without a job offer: no worker stream allows it",
    short: "BC PNP without a job offer",
    group: "Eligibility",
  },
  caregivers: {
    href: "/articles/bc-pnp-caregivers-childcare",
    anchor: "BC PNP for caregivers and childcare: ECEs and care aides yes, nannies no",
    short: "BC PNP for caregivers and childcare workers",
    group: "Streams",
  },
  ece: {
    href: "/articles/bc-pnp-early-childhood-educators-2027",
    anchor: `BC PNP for early childhood educators: Childcare minimum ${childcare.score}`,
    short: "BC PNP for early childhood educators",
    group: "Streams",
  },
  tech: {
    href: "/articles/bc-pnp-calculator-for-tech",
    anchor: `BC PNP tech: ${TECH_NOCS.length} eligible NOC codes and your score`,
    short: "BC PNP tech",
    group: "Streams",
  },
  howToApply: {
    href: "/articles/how-to-apply-bc-pnp",
    anchor: "How to apply for BC PNP: 6 steps from registration to PR",
    short: "how to apply for BC PNP",
    group: "How to apply",
  },
  fees: {
    href: "/articles/bc-pnp-cost-guide-2026",
    anchor: "BC PNP fees 2026: $1,750 to apply, $0 to register",
    short: "BC PNP fees",
    group: "How to apply",
  },
  guide: {
    href: "/bc-pnp-guide",
    anchor: "BC PNP guide 2026: streams, points, draws and fees on one page",
    short: "BC PNP guide",
    group: "How to apply",
  },
} satisfies Record<string, SiteLink>;

export type LinkKey = keyof typeof LINKS;

/** Default order of the "Related calculators and guides" block. */
export const RELATED_ORDER: LinkKey[] = [
  "calculator",
  "draws",
  "drawCalculator",
  "workExperience",
  "jobOffer",
  "caregivers",
  "ece",
  "tech",
  "howToApply",
  "withoutJobOffer",
  "hei",
  "fees",
  "guide",
];
