
import { CalculatorState, PointsResult, EducationLevel, AreaZone, EducationLocation, ExperienceLevel, CLBLevel } from '../types';

// A) Directly Related Work Experience (max 20)
const getExperiencePoints = (level: ExperienceLevel): number => {
  switch (level) {
    case '5+': return 20;
    case '4': return 16;
    case '3': return 12;
    case '2': return 8;
    case '1': return 4;
    case '<1': return 1;
    case '0':
    default: return 0;
  }
};

// D) Highest Education Level (max 27)
const EDUCATION_POINTS: Record<EducationLevel, number> = {
  secondary: 0,        // High school or less
  trades_cert: 5,      // Post-secondary Diploma/Certificate (Trades or Non-trades)
  associate: 5,        // Associate Degree
  bachelor: 15,        // Bachelor's
  post_grad_cert: 15,  // Post-Graduate Certificate/Diploma
  master: 22,          // Master's
  doctorate: 27,       // Doctoral
};

// F) Education Location Bonus (max 8, only if hasCanadianEducation=true)
const EDUCATION_LOCATION_POINTS: Record<EducationLocation, number> = {
  none: 0,
  canada_outside_bc: 6,  // Completed in Canada (outside BC)
  bc: 8,                 // Completed in BC
};

// J & L) CLB Points (max 30 each)
// Uses CLBLevel union type: 0 | 3 | 4 | 5 | 6 | 7 | 8 | 9
const getClbPoints = (clb: CLBLevel): number => {
  switch (clb) {
    case 9: return 30;  // CLB 9+
    case 8: return 25;
    case 7: return 20;
    case 6: return 15;
    case 5: return 10;
    case 4: return 5;
    case 3:
    case 0:
    default: return 0;  // Below CLB 4 or no test
  }
};

// M) Hourly Wage (max 55)
// $70.00+ → 55, $69.00-69.99 → 54, ..., $16.00-16.99 → 1, <$16 → 0
const getWagePoints = (hourlyWage: number): number => {
  const wage = Number.isFinite(hourlyWage) && hourlyWage > 0 ? hourlyWage : 0;

  if (wage >= 70) return 55;
  if (wage < 16) return 0;

  // Each $1 band from $16 to $69.99 gives points from 1 to 54
  // $16.00-16.99 → 1, $17.00-17.99 → 2, ..., $69.00-69.99 → 54
  const floorWage = Math.floor(wage);
  return floorWage - 15; // $16 floor - 15 = 1, $69 floor - 15 = 54
};

// N) Area of Employment (max 15)
const AREA_POINTS: Record<AreaZone, number> = {
  area1: 0,   // Metro Vancouver Regional District
  area2: 5,   // Squamish / Abbotsford / Agassiz / Mission / Chilliwack
  area3: 15,  // All other BC areas
};

export const calculateAnnualWage = (hourlyWage: number): number => {
  const safeHourly = Number.isFinite(hourlyWage) && hourlyWage > 0 ? hourlyWage : 0;
  return Math.floor(safeHourly * 40 * 52);
};

export const calculateTotalPoints = (state: CalculatorState): PointsResult => {
  // A) Work Experience (max 20) - uses ExperienceLevel directly
  const experience = getExperiencePoints(state.experience);

  // B) Canadian Experience (max 10)
  const canadianExp = state.hasCanadianExp ? 10 : 0;

  // C) Current BC Job (max 10)
  const currentBCJob = state.hasCurrentBCJob ? 10 : 0;

  // D) Education Level (max 27)
  const education = EDUCATION_POINTS[state.education] ?? 0;

  // F) Education Location Bonus (max 8)
  const educationLocation = state.hasCanadianEducation
    ? (EDUCATION_LOCATION_POINTS[state.educationLocation] ?? 0)
    : 0;

  // H) Professional Designation (max 5)
  const professionalDesignation =
    state.hasProfessionalDesignation && state.selectedProfession?.trim()
      ? 5
      : 0;

  // Education Group Cap: Max 40 points
  // Includes: Education Level + Location Bonus + Professional Designation
  const educationTotal = Math.min(40, education + educationLocation + professionalDesignation);

  // J) English CLB (max 30)
  const englishClb = state.hasEnglishTest ? getClbPoints(state.englishClb) : 0;

  // L) French CLB (max 30)
  const frenchClb = state.hasFrenchTest ? getClbPoints(state.frenchClb) : 0;

  // Language Group Cap: Max 40 points
  const languageTotal = Math.min(40, englishClb + frenchClb);

  // M) Wage (max 55)
  const safeHourlyWage = Math.max(0, Number.isFinite(state.hourlyWage) ? state.hourlyWage : 0);
  const wage = getWagePoints(safeHourlyWage);

  // N) Area (max 15)
  const area = AREA_POINTS[state.area] ?? 0;

  // O) Worked Outside Area 1 (max 10)
  const workedOutsideArea1 = state.hasWorkedOutsideArea1 ? 10 : 0;

  // P) Graduated Outside Area 1 (max 10)
  const graduatedOutsideArea1 = state.hasGraduatedOutsideArea1 ? 10 : 0;

  // Total (max 200)
  // Human Capital (max 120) + Economic Factors (max 80)
  // But we just sum capped groups and clamp to 200 for safety
  const rawTotal =
    experience +
    canadianExp +
    currentBCJob +
    educationTotal + // Capped at 40
    languageTotal +  // Capped at 40
    wage +
    area +
    workedOutsideArea1 +
    graduatedOutsideArea1;

  const total = Math.min(200, rawTotal);

  return {
    total,
    breakdown: {
      experience,
      canadianExp,
      currentBCJob,
      education,
      educationLocation,
      professionalDesignation,
      englishClb,
      frenchClb,
      wage,
      area,
      workedOutsideArea1,
      graduatedOutsideArea1,
      educationTotal,
      languageTotal,
    },
  };
};