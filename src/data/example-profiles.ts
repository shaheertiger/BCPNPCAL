// Four worked profiles scored by the site's own calculator engine
// (src/utils/calculatePoints.ts, which follows Part 8 of the BC PNP Skills
// Immigration Program Guide, effective June 10, 2026). Wages are example job
// offers chosen for illustration, not wage data: a real offer must fall within
// the WorkBC / Job Bank wage range for the occupation and region (Program
// Guide section 3.9). Scores are compared with the latest draw for the stream
// in src/data/bcpnp-draws.ts.
import type { CalculatorState } from "../types";
import type { StreamKey } from "../utils/draws";

export const BLANK: CalculatorState = {
  experience: "0",
  hasCanadianExp: false,
  hasCurrentBCJob: false,
  education: "secondary",
  hasCanadianEducation: false,
  educationLocation: "none",
  hasProfessionalDesignation: false,
  selectedProfession: null,
  hasEnglishTest: false,
  englishClb: 0,
  hasFrenchTest: false,
  frenchClb: 0,
  hourlyWage: 0,
  area: "area1",
  hasWorkedOutsideArea1: false,
  hasGraduatedOutsideArea1: false,
};

export interface ExampleProfile {
  id: string;
  title: string;
  noc: string;
  location: string;
  stream: StreamKey;
  facts: string[];
  state: CalculatorState;
}

export const EXAMPLE_PROFILES: ExampleProfile[] = [
  {
    id: "tech",
    title: "Tech worker: software developer in Vancouver",
    noc: "21232 Software developers and programmers",
    location: "Vancouver (Area 1)",
    stream: "hei-points",
    facts: [
      "4 years of directly related experience, 1 of them in Canada",
      "Working full-time for the B.C. employer now",
      "Bachelor's degree from outside Canada",
      "CLB 8 in English",
      "Example offer: $45.00/hr",
    ],
    state: {
      ...BLANK,
      experience: "4",
      hasCanadianExp: true,
      hasCurrentBCJob: true,
      education: "bachelor",
      hasEnglishTest: true,
      englishClb: 8,
      hourlyWage: 45,
      area: "area1",
    },
  },
  {
    id: "ece",
    title: "Early childhood educator in Kelowna",
    noc: "42202 Early childhood educators and assistants",
    location: "Kelowna (Area 3)",
    stream: "childcare",
    facts: [
      "2 years of ECE experience in Canada, working for the employer now",
      "ECE diploma completed in B.C.",
      "ECE Five Year Certificate (professional designation)",
      "CLB 7 in English",
      "1 year of earlier full-time work outside Metro Vancouver",
      "Example offer: $24.00/hr",
    ],
    state: {
      ...BLANK,
      experience: "2",
      hasCanadianExp: true,
      hasCurrentBCJob: true,
      education: "trades_cert",
      hasCanadianEducation: true,
      educationLocation: "bc",
      hasProfessionalDesignation: true,
      selectedProfession: "Early Childhood Educator (One Year or Five Year certificate)",
      hasEnglishTest: true,
      englishClb: 7,
      hourlyWage: 24,
      area: "area3",
      hasWorkedOutsideArea1: true,
    },
  },
  {
    id: "healthcare",
    title: "Healthcare: registered nurse in Surrey",
    noc: "31301 Registered nurses and registered psychiatric nurses",
    location: "Surrey (Area 1)",
    stream: "health",
    facts: [
      "5+ years of nursing experience, 1+ in Canada, working for the employer now",
      "Bachelor of Science in Nursing from outside Canada",
      "CLB 8 in English",
      "Private-sector employer (Health Authority stream applicants are not in draws)",
      "Example offer: $47.00/hr",
    ],
    state: {
      ...BLANK,
      experience: "5+",
      hasCanadianExp: true,
      hasCurrentBCJob: true,
      education: "bachelor",
      hasEnglishTest: true,
      englishClb: 8,
      hourlyWage: 47,
      area: "area1",
    },
  },
  {
    id: "caregiver",
    title: "Caregiver: health care assistant in Abbotsford",
    noc: "33102 Nurse aides, orderlies and patient service associates",
    location: "Abbotsford (Area 2)",
    stream: "health",
    facts: [
      "2 years as a care aide in Canada, working for the employer now",
      "Health care assistant certificate completed in B.C.",
      "On the BC Care Aide & Community Health Worker Registry (designation points)",
      "CLB 5 in English",
      "1 year of earlier full-time work outside Metro Vancouver",
      "Example offer: $27.00/hr",
    ],
    state: {
      ...BLANK,
      experience: "2",
      hasCanadianExp: true,
      hasCurrentBCJob: true,
      education: "trades_cert",
      hasCanadianEducation: true,
      educationLocation: "bc",
      hasProfessionalDesignation: true,
      selectedProfession: "Health Care Assistant (BC Care Aide & Community Health Worker Registry)",
      hasEnglishTest: true,
      englishClb: 5,
      hourlyWage: 27,
      area: "area2",
      hasWorkedOutsideArea1: true,
    },
  },
];
