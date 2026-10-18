// BC PNP draw results, as published on WelcomeBC's "Invitations to apply"
// page (last checked against the October 8, 2026 update). Update this file
// after each draw; the draws page and draw tables read from it.
// "<5" means WelcomeBC reported fewer than five invitations.

export const DRAWS_LAST_UPDATED = "October 18, 2026";
export const DRAWS_LAST_UPDATED_ISO = "2026-10-18";

export type Count = number | "<5";

// Care and Build targeted draws (from May 6, 2026). Score = minimum score.
export interface TargetedDraw {
  date: string;
  childcare: { score: number; invites: Count };
  health: { score: number; invites: Count };
  veterinary: { score: number; invites: Count };
  construction: { score: number; invites: Count };
}

export const targetedDraws2026: TargetedDraw[] = [
  { date: "October 8, 2026", childcare: { score: 99, invites: 86 }, health: { score: 76, invites: 82 }, veterinary: { score: 86, invites: "<5" }, construction: { score: 94, invites: 115 } },
  { date: "September 10, 2026", childcare: { score: 99, invites: 182 }, health: { score: 76, invites: 143 }, veterinary: { score: 90, invites: "<5" }, construction: { score: 94, invites: 104 } },
  { date: "August 6, 2026", childcare: { score: 102, invites: 183 }, health: { score: 84, invites: 124 }, veterinary: { score: 72, invites: 6 }, construction: { score: 88, invites: 187 } },
  { date: "July 9, 2026", childcare: { score: 108, invites: 91 }, health: { score: 96, invites: 116 }, veterinary: { score: 88, invites: "<5" }, construction: { score: 97, invites: 136 } },
  { date: "June 2, 2026", childcare: { score: 111, invites: 91 }, health: { score: 100, invites: 117 }, veterinary: { score: 92, invites: 6 }, construction: { score: 101, invites: 128 } },
  { date: "May 6, 2026", childcare: { score: 115, invites: 86 }, health: { score: 108, invites: 117 }, veterinary: { score: 100, invites: 9 }, construction: { score: 108, invites: 121 } },
];

// Other one-off targeted rounds in 2026.
export const otherTargetedDraws2026 = [
  { date: "September 17, 2026", category: "Temporary Rural/Remote Health Support Initiative", score: 60, invites: 33 as Count },
  { date: "August 6, 2026", category: "Care: Education (French-speaking teachers)", score: 68, invites: "<5" as Count },
  { date: "July 23, 2026", category: "Temporary Rural/Remote Health Support Initiative", score: 50, invites: 60 as Count },
];

// Innovate / High Economic Impact draws: a wage track (hourly AND annual
// minimum, TEER 0-3 job offer) and a points track.
export interface HighImpactDraw {
  date: string;
  hourly: number;
  annual: number;
  wageInvites: number;
  pointsCutoff: number;
  pointsInvites: number;
}

export const highImpactDraws2026: HighImpactDraw[] = [
  { date: "September 24, 2026", hourly: 52, annual: 105000, wageInvites: 426, pointsCutoff: 131, pointsInvites: 288 },
  { date: "August 20, 2026", hourly: 55, annual: 110000, wageInvites: 337, pointsCutoff: 132, pointsInvites: 265 },
  { date: "July 16, 2026", hourly: 58, annual: 115000, wageInvites: 223, pointsCutoff: 132, pointsInvites: 346 },
  { date: "June 18, 2026", hourly: 62, annual: 125000, wageInvites: 130, pointsCutoff: 136, pointsInvites: 149 },
  { date: "May 14, 2026", hourly: 59, annual: 120000, wageInvites: 225, pointsCutoff: 135, pointsInvites: 212 },
  { date: "April 22, 2026", hourly: 62, annual: 125000, wageInvites: 252, pointsCutoff: 138, pointsInvites: 232 },
  { date: "February 11, 2026", hourly: 62, annual: 125000, wageInvites: 195, pointsCutoff: 135, pointsInvites: 265 },
  { date: "February 4, 2026", hourly: 70, annual: 145000, wageInvites: 206, pointsCutoff: 138, pointsInvites: 223 },
];

// 2025 Skills Immigration rounds (WelcomeBC 2025 archive).
export const skillsDraws2025 = [
  { date: "December 10, 2025", invites: 410, rule: "$84/hr and $170,000/yr (TEER 0-3), or 138+ points" },
  { date: "October 2, 2025", invites: 474, rule: "$90/hr and $175,000/yr (TEER 0-3), or 140+ points" },
  { date: "May 8, 2025", invites: 94, rule: "$105/hr (TEER 0-1), or 150+ points" },
];

// Entrepreneur Immigration rounds we have confirmed. 2026 rounds before
// July are listed on WelcomeBC but not reproduced here.
export const entrepreneurDraws = [
  { date: "September 22, 2026", stream: "Base", score: 119, invites: 10 as Count },
  { date: "September 22, 2026", stream: "Regional", score: 119, invites: "<5" as Count },
  { date: "August 25, 2026", stream: "Base", score: 116, invites: 11 as Count },
  { date: "August 25, 2026", stream: "Regional", score: 116, invites: 5 as Count },
  { date: "July 28, 2026", stream: "Base", score: 117, invites: 10 as Count },
  { date: "December 16, 2025", stream: "Base", score: 115, invites: 17 as Count },
  { date: "December 16, 2025", stream: "Regional", score: 107, invites: "<5" as Count },
  { date: "November 18, 2025", stream: "Base", score: 121, invites: 19 as Count },
  { date: "November 18, 2025", stream: "Regional", score: 115, invites: "<5" as Count },
  { date: "October 2, 2025", stream: "Base", score: 123, invites: 11 as Count },
];

// Skills Immigration pool snapshot published by WelcomeBC.
export const poolSnapshot = {
  date: "October 6, 2026",
  total: 7695,
  bands: [
    { range: "150+", count: 9 },
    { range: "140–149", count: 23 },
    { range: "130–139", count: 171 },
    { range: "120–129", count: 854 },
    { range: "110–119", count: 1189 },
    { range: "100–109", count: 1426 },
    { range: "90–99", count: 1444 },
    { range: "80–89", count: 1281 },
    { range: "70–79", count: 718 },
    { range: "60–69", count: 364 },
    { range: "0–59", count: 216 },
  ],
};
