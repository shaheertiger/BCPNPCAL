
export type EducationLevel =
  | 'secondary'
  | 'post-secondary'
  | 'associate'
  | 'bachelor'
  | 'post-grad'
  | 'master-phd';

export type AreaZone =
  | 'vancouver'
  | 'squamish'
  | 'victoria'
  | 'nanaimo'
  | 'kelowna'
  | 'other';

export interface CalculatorState {
  experience: {
    years: number;
    hasCanadianExp: boolean;
    hasCurrentBCJob: boolean;
  };
  education: EducationLevel;
  language: number; // CLB Level
  wage: number; // Hourly wage
  area: AreaZone;
}

export interface PointsResult {
  total: number;
  breakdown: {
    experience: number;
    education: number;
    language: number;
    wage: number;
    area: number;
  };
  isEligible: boolean;
  level: 'Low' | 'Moderate' | 'Good' | 'Excellent';
}
