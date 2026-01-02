
import { CalculatorState, PointsResult, EducationLevel, AreaZone } from '../types';

const EDUCATION_POINTS: Record<EducationLevel, number> = {
  'secondary': 0,
  'post-secondary': 2,
  'associate': 4,
  'bachelor': 15,
  'post-grad': 22,
  'master-phd': 27
};

const AREA_POINTS: Record<AreaZone, number> = {
  'vancouver': 0,
  'squamish': 5,
  'victoria': 10,
  'nanaimo': 15,
  'kelowna': 20,
  'other': 25
};

const LANGUAGE_POINTS: Record<number, number> = {
  4: 0,
  5: 5,
  6: 10,
  7: 15,
  8: 20,
  9: 25,
  10: 30
};

export const calculateTotalPoints = (state: CalculatorState): PointsResult => {
  // 1. Work Experience (Max 40)
  // 0=0, 1=4, 2=8, 3=12, 4=16, 5+=20
  let expPoints = Math.min(state.experience.years, 5) * 4;

  if (state.experience.hasCanadianExp) expPoints += 10;
  if (state.experience.hasCurrentBCJob) expPoints += 10;
  expPoints = Math.min(expPoints, 40);

  // 2. Education (Max 40)
  let eduPoints = EDUCATION_POINTS[state.education] || 0;
  eduPoints = Math.min(eduPoints, 40);

  // 3. Language (Max 40)
  // CLB 4=0, 5=5, 6=10, 7=15, 8=20, 9=25, 10+=30
  let langPoints = LANGUAGE_POINTS[Math.max(4, Math.min(10, state.language))] || 0;
  langPoints = Math.min(langPoints, 40);

  // 4. Hourly Wage (Max 55)
  // $16.75 is min (0 pts), $50.00+ is max (55 pts)
  let wagePoints = 0;
  if (state.wage >= 50) {
    wagePoints = 55;
  } else if (state.wage >= 16.75) {
    // BC PNP uses a specific tiered table, but linear mapping is the standard approximation tool logic
    wagePoints = Math.floor(((state.wage - 16.75) / (50 - 16.75)) * 55);
  }
  wagePoints = Math.max(0, Math.min(wagePoints, 55));

  // 5. Area (Max 25)
  let areaPoints = AREA_POINTS[state.area] || 0;

  const total = expPoints + eduPoints + langPoints + wagePoints + areaPoints;

  let level: PointsResult['level'] = 'Low';
  if (total >= 125) level = 'Excellent';
  else if (total >= 105) level = 'Good';
  else if (total >= 85) level = 'Moderate';

  return {
    total,
    breakdown: {
      experience: expPoints,
      education: eduPoints,
      language: langPoints,
      wage: wagePoints,
      area: areaPoints
    },
    isEligible: total >= 80,
    level
  };
};
