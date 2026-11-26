// Derived views of the WelcomeBC draw data in src/data/bcpnp-draws.ts.
// Everything here is computed from that file, so pages, titles, meta
// descriptions and anchors update automatically when a new draw is added.
import {
  targetedDraws2026,
  otherTargetedDraws2026,
  highImpactDraws2026,
  entrepreneurDraws,
  type Count,
} from "../data/bcpnp-draws";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "November 13, 2026" -> "2026-11-13" (no timezone maths). */
export function toIso(date: string): string {
  const m = date.match(/^([A-Za-z]+) (\d{1,2}), (\d{4})$/);
  if (!m) throw new Error(`Unparseable draw date: ${date}`);
  const month = MONTHS.indexOf(m[1]) + 1;
  if (month < 1) throw new Error(`Unknown month in draw date: ${date}`);
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

/** "November 13, 2026" -> "Nov 13" */
export function shortDate(date: string): string {
  const m = date.match(/^([A-Za-z]+) (\d{1,2}), (\d{4})$/);
  if (!m) return date;
  return `${SHORT[MONTHS.indexOf(m[1])]} ${m[2]}`;
}

export type StreamKey =
  | "childcare"
  | "health"
  | "veterinary"
  | "construction"
  | "education"
  | "rural-health"
  | "hei-points"
  | "hei-wage";

export const STREAM_LABELS: Record<StreamKey, string> = {
  childcare: "Care: Childcare (early childhood educators)",
  health: "Care: Health",
  veterinary: "Care: Veterinary Care",
  construction: "Build: Construction Trades",
  education: "Care: Education",
  "rural-health": "Temporary Rural/Remote Health Support Initiative",
  "hei-points": "Innovate: High Economic Impact (points)",
  "hei-wage": "Innovate: High Economic Impact (wage)",
};

/** Short labels for tables and the calculator stream picker. */
export const STREAM_SHORT: Record<StreamKey, string> = {
  childcare: "Childcare (ECE)",
  health: "Health",
  veterinary: "Veterinary",
  construction: "Construction",
  education: "Education",
  "rural-health": "Rural/remote health",
  "hei-points": "High Economic Impact (points)",
  "hei-wage": "High Economic Impact (wage)",
};

export interface DrawRow {
  date: string; // "November 13, 2026"
  iso: string; // "2026-11-13"
  stream: StreamKey;
  label: string;
  /** Minimum score, or null for the wage track (no score cut-off). */
  score: number | null;
  /** Wage rule for the wage track, e.g. "$49/hr and $99,000/yr". */
  rule?: string;
  invites: Count;
}

function build(): DrawRow[] {
  const rows: DrawRow[] = [];
  for (const d of targetedDraws2026) {
    for (const k of ["childcare", "health", "veterinary", "construction"] as const) {
      rows.push({ date: d.date, iso: toIso(d.date), stream: k, label: STREAM_LABELS[k], score: d[k].score, invites: d[k].invites });
    }
  }
  for (const d of otherTargetedDraws2026) {
    const stream: StreamKey = d.category.startsWith("Care: Education") ? "education" : "rural-health";
    rows.push({ date: d.date, iso: toIso(d.date), stream, label: STREAM_LABELS[stream], score: d.score, invites: d.invites });
  }
  for (const d of highImpactDraws2026) {
    rows.push({
      date: d.date, iso: toIso(d.date), stream: "hei-wage", label: STREAM_LABELS["hei-wage"], score: null,
      rule: `$${d.hourly}/hr and $${d.annual.toLocaleString("en-CA")}/yr, TEER 0–3`, invites: d.wageInvites,
    });
    rows.push({ date: d.date, iso: toIso(d.date), stream: "hei-points", label: STREAM_LABELS["hei-points"], score: d.pointsCutoff, invites: d.pointsInvites });
  }
  const order: StreamKey[] = ["childcare", "health", "veterinary", "construction", "education", "rural-health", "hei-wage", "hei-points"];
  return rows.sort((a, b) => (a.iso === b.iso ? order.indexOf(a.stream) - order.indexOf(b.stream) : a.iso < b.iso ? 1 : -1));
}

/** Every 2026 Skills Immigration invitation row, newest first. */
export const skillsDraws2026: DrawRow[] = build();

/** Rows of the most recent Skills Immigration draw date. */
export const latestDrawRows: DrawRow[] = skillsDraws2026.filter((r) => r.iso === skillsDraws2026[0].iso);
export const latestDrawDate = latestDrawRows[0].date;
export const latestDrawIso = latestDrawRows[0].iso;
export const latestDrawInvites = latestDrawRows.reduce(
  (n, r) => n + (typeof r.invites === "number" ? r.invites : 0),
  0,
);
export const latestDrawHasUnderFive = latestDrawRows.some((r) => r.invites === "<5");

const scored = latestDrawRows.filter((r) => r.score !== null) as (DrawRow & { score: number })[];
/** Lowest and highest minimum score in the most recent draw. */
export const latestDrawMinScore = Math.min(...scored.map((r) => r.score));
export const latestDrawMaxScore = Math.max(...scored.map((r) => r.score));
export const latestDrawMinRow = scored.find((r) => r.score === latestDrawMinScore)!;

/** Draw rows for one stream, newest first. */
export function streamRows(stream: StreamKey): DrawRow[] {
  return skillsDraws2026.filter((r) => r.stream === stream);
}

/** Latest scored draw for a stream. */
export function latestFor(stream: StreamKey): DrawRow {
  return streamRows(stream)[0];
}

export interface StreamSummary {
  stream: StreamKey;
  label: string;
  latest: DrawRow;
  last3: { low: number; high: number; n: number };
  last6: { low: number; high: number; n: number };
  lowest2026: { score: number; date: string };
}

function range(rows: DrawRow[]) {
  const s = rows.map((r) => r.score as number);
  return { low: Math.min(...s), high: Math.max(...s), n: s.length };
}

/** Minimum score per stream over the last 3 and 6 draws of that stream. */
export const streamSummaries: StreamSummary[] = (
  ["childcare", "health", "veterinary", "construction", "hei-points", "rural-health"] as StreamKey[]
).map((stream) => {
  const rows = streamRows(stream);
  const low = rows.reduce((a, b) => ((b.score as number) < (a.score as number) ? b : a));
  return {
    stream,
    label: STREAM_SHORT[stream],
    latest: rows[0],
    last3: range(rows.slice(0, 3)),
    last6: range(rows.slice(0, 6)),
    lowest2026: { score: low.score as number, date: low.date },
  };
});

/** Lowest minimum score of any 2026 Skills Immigration draw. */
export const lowest2026 = skillsDraws2026
  .filter((r) => r.score !== null)
  .reduce((a, b) => ((b.score as number) < (a.score as number) ? b : a));

/** Number of distinct 2026 Skills Immigration draw dates. */
export const drawDays2026 = new Set(skillsDraws2026.map((r) => r.iso)).size;

/** Latest-minimum info for the calculator's "your stream" line. */
const CALC_LABELS: Partial<Record<StreamKey, string>> = {
  "hei-points": "Any skilled job: High Economic Impact (points)",
  health: "Care: Health (priority health occupations)",
  childcare: "Care: Childcare (certified ECEs)",
  construction: "Build: Construction trades",
  veterinary: "Care: Veterinary care",
};
export const calculatorStreams = (["hei-points", "health", "childcare", "construction", "veterinary"] as StreamKey[]).map(
  (k) => ({ key: k, label: CALC_LABELS[k] as string, score: latestFor(k).score as number, date: latestFor(k).date }),
);

/** Latest wage-track rule of the High Economic Impact draw. */
export const latestHeiWage = latestFor("hei-wage");

/** 2026 Entrepreneur Immigration rounds, newest first. */
export const entrepreneurDraws2026 = entrepreneurDraws
  .filter((d) => d.date.endsWith("2026"))
  .map((d) => ({ ...d, iso: toIso(d.date) }))
  .sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));

export const fmtCount = (c: Count) => (c === "<5" ? "fewer than 5" : c.toLocaleString("en-CA"));
export const fmtCountShort = (c: Count) => (c === "<5" ? "<5" : c.toLocaleString("en-CA"));
