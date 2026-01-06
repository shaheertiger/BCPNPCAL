
export type EducationLevel =
  | 'secondary'
  | 'diploma'     // Post-secondary diploma
  | 'bachelor'
  | 'master'
  | 'doctorate';

// Updated specific locations per user request
export type AreaZone =
  | 'metro_vancouver'
  | 'abbotsford'
  | 'squamish'
  | 'vernon'
  | 'kamloops'
  | 'northeast';

export interface CalculatorState {
  // Section A: Directly Related Work Experience
  experience: number; // years

  // Section B: Canadian Work Experience
  hasCanadianExp: boolean;

  // Section C: Current BC Employment
  hasCurrentBCJob: boolean;

  // Section D: Wage (Hourly input, converted to annual)
  hourlyWage: number;

  // Section E: Job Location
  area: AreaZone;

  // Section F: Education Level
  education: EducationLevel;

  // Section G: Education Completed in Canada
  hasCanadianEducation: boolean;

  // Section H: Language Proficiency (Lowest CLB)
  clb: number;

  // Section I: Occupation Bonus
  hasOccupationBonus: boolean;
}

export interface PointsResult {
  total: number;
  breakdown: {
    experience: number;       // A
    canadianExp: number;      // B
    currentBCJob: number;     // C
    wage: number;             // D
    area: number;             // E
    education: number;        // F
    canadianEducation: number;// G
    language: number;         // H
    occupationBonus: number;  // I
  };
}
