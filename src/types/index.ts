
export type EducationLevel =
  | 'secondary'           // High school or less → 0
  | 'trades_cert'         // Post-secondary Diploma/Certificate (Trades or Non-trades) → 5
  | 'associate'           // Associate Degree → 5
  | 'bachelor'            // Bachelor's → 15
  | 'post_grad_cert'      // Post-Graduate Certificate/Diploma → 15
  | 'master'              // Master's → 22
  | 'doctorate';          // Doctoral → 27

export type EducationLocation =
  | 'none'                // No Canadian education
  | 'canada_outside_bc'   // Completed in Canada (outside BC) → 6
  | 'bc';                 // Completed in BC → 8

export type AreaZone =
  | 'area1'   // Metro Vancouver Regional District → 0
  | 'area2'   // Squamish / Abbotsford / Agassiz / Mission / Chilliwack → 5
  | 'area3';  // All other BC areas → 15

// Experience levels matching official form exactly
export type ExperienceLevel =
  | '0'      // No experience → 0 points
  | '<1'     // Less than 1 year → 1 point
  | '1'      // 1 to <2 years → 4 points
  | '2'      // 2 to <3 years → 8 points
  | '3'      // 3 to <4 years → 12 points
  | '4'      // 4 to <5 years → 16 points
  | '5+';    // 5+ years → 20 points

// CLB levels matching official form exactly
// UI only shows: <4 (0pts), 4 (5pts), 5 (10pts), 6 (15pts), 7 (20pts), 8 (25pts), 9+ (30pts)
export type CLBLevel = 0 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// Professional designation - null when gate is off, string when selected
export type ProfessionSelection = string | null;

export interface CalculatorState {
  // A) Directly Related Work Experience (max 20)
  experience: ExperienceLevel;

  // B) At least 1 year directly related work experience in Canada (max 10)
  hasCanadianExp: boolean;

  // C) Currently working full-time in BC for that employer/occupation (max 10)
  hasCurrentBCJob: boolean;

  // D) Highest education level (max 27)
  education: EducationLevel;

  // E) Did you complete post-secondary education in BC or Canada? (gate question)
  hasCanadianEducation: boolean;

  // F) Where in Canada was post-secondary education completed? (max 8, only if E=yes)
  educationLocation: EducationLocation;

  // G) Job offer in an eligible professional designation occupation? (gate question)
  hasProfessionalDesignation: boolean;

  // H) Selected Professional Designation (only if G=yes, any valid selection = 5 points)
  selectedProfession: ProfessionSelection;

  // I) English test completed in last 2 years? (gate question)
  hasEnglishTest: boolean;

  // J) English CLB - lowest of the 4 skills (max 30, only if I=yes)
  englishClb: CLBLevel;

  // K) French test completed in last 2 years? (gate question)
  hasFrenchTest: boolean;

  // L) French CLB - lowest of the 4 skills (max 30, only if K=yes)
  frenchClb: CLBLevel;

  // M) Hourly wage of the BC job offer (max 55)
  hourlyWage: number;

  // N) Area of employment within BC (max 15)
  area: AreaZone;

  // O) 1 year paid employment outside Area 1 within 5 years prior to registration (max 10)
  hasWorkedOutsideArea1: boolean;

  // P) Graduated from a public BC post-secondary institution outside Area 1 within 3 years (max 10)
  hasGraduatedOutsideArea1: boolean;
}

export interface PointsResult {
  total: number;
  breakdown: {
    experience: number;           // A (max 20)
    canadianExp: number;          // B (max 10)
    currentBCJob: number;         // C (max 10)
    education: number;            // D (max 27)
    educationLocation: number;    // F (max 8)
    professionalDesignation: number; // H (max 5)
    englishClb: number;           // J (max 30)
    frenchClb: number;            // L (max 30)
    wage: number;                 // M (max 55)
    area: number;                 // N (max 15)
    workedOutsideArea1: number;   // O (max 10)
    graduatedOutsideArea1: number; // P (max 10)
  };
}
