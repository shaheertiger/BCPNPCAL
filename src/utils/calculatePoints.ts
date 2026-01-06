
import { CalculatorState, PointsResult, EducationLevel, AreaZone } from '../types';

const EDUCATION_POINTS: Record<EducationLevel, number> = {
  secondary: 0,
  diploma: 4,
  bachelor: 8,
  master: 11,
  doctorate: 17,
};

const AREA_POINTS: Record<AreaZone, number> = {
  metro_vancouver: 0,
  abbotsford: 5,
  squamish: 10,
  vernon: 15,
  kamloops: 20,
  northeast: 25,
};

const getLanguagePoints = (clb: number): number => {
  if (clb >= 9) return 30;
  if (clb === 8) return 26;
  if (clb === 7) return 22;
  if (clb === 6) return 18;
  if (clb === 5) return 14;
  if (clb === 4) return 10;
  return 0;
};

const getExperiencePoints = (years: number): number => {
  if (years >= 5) return 20;
  if (years >= 4) return 16;
  if (years >= 3) return 12;
  if (years >= 2) return 8;
  if (years >= 1) return 4;
  if (years > 0) return 1;
  return 0;
};

const HOURS_PER_WEEK = 40;
const WEEKS_PER_YEAR = 52;
const ANNUAL_MIN = 40000;
const ANNUAL_MAX = 100000;
const STEP_SIZE = 2500;
const STEP_POINTS = 2;
const BASE_POINTS = 2;
const MAX_WAGE_POINTS = 50;

export const calculateAnnualWage = (hourlyWage: number): number => {
  const safeHourly = Number.isFinite(hourlyWage) && hourlyWage > 0 ? hourlyWage : 0;
  const annual = safeHourly * HOURS_PER_WEEK * WEEKS_PER_YEAR;
  return Math.floor(annual); // avoids threshold rounding surprises
};

const getWagePointsFromAnnual = (annualWage: number): number => {
  const annual = Number.isFinite(annualWage) && annualWage > 0 ? annualWage : 0;

  if (annual < ANNUAL_MIN) return 0;
  if (annual >= ANNUAL_MAX) return MAX_WAGE_POINTS;

  const steps = Math.floor((annual - ANNUAL_MIN) / STEP_SIZE);
  return Math.min(MAX_WAGE_POINTS, BASE_POINTS + steps * STEP_POINTS);
};

const getWagePoints = (hourlyWage: number): number => {
  const annual = calculateAnnualWage(hourlyWage);
  return getWagePointsFromAnnual(annual);
};

export const calculateTotalPoints = (state: CalculatorState): PointsResult => {
  const safeExperience = Math.floor(Math.max(0, Number.isFinite(state.experience) ? state.experience : 0));
  const safeCLB = Math.min(12, Math.max(0, Number.isFinite(state.clb) ? state.clb : 0));
  const safeHourlyWage = Math.max(0, Number.isFinite(state.hourlyWage) ? state.hourlyWage : 0);

  const experience = getExperiencePoints(safeExperience);
  const canadianExp = state.hasCanadianExp ? 10 : 0;
  const currentBCJob = state.hasCurrentBCJob ? 10 : 0;
  const wage = getWagePoints(safeHourlyWage);
  const area = AREA_POINTS[state.area] ?? 0;
  const education = EDUCATION_POINTS[state.education] ?? 0;
  const canadianEducation = state.hasCanadianEducation ? 8 : 0;
  const language = getLanguagePoints(safeCLB);
  const occupationBonus = state.hasOccupationBonus ? 10 : 0;

  const total =
    experience +
    canadianExp +
    currentBCJob +
    wage +
    area +
    education +
    canadianEducation +
    language +
    occupationBonus;

  return {
    total,
    breakdown: {
      experience,
      canadianExp,
      currentBCJob,
      wage,
      area,
      education,
      canadianEducation,
      language,
      occupationBonus,
    },
  };
};
