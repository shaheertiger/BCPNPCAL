
import React, { useState, useMemo } from 'react';
import { calculateTotalPoints, calculateAnnualWage } from '../utils/calculatePoints';
import { CalculatorState, EducationLevel, AreaZone, ExperienceLevel, CLBLevel } from '../types';

const INITIAL_STATE: CalculatorState = {
  experience: '0',
  hasCanadianExp: false,
  hasCurrentBCJob: false,
  education: 'secondary',
  hasCanadianEducation: false,
  educationLocation: 'none',
  hasProfessionalDesignation: false,
  selectedProfession: null,
  hasEnglishTest: false,
  englishClb: 0, // Default to 0 (<4)
  hasFrenchTest: false,
  frenchClb: 0, // Default to 0 (<4)
  hourlyWage: 20,
  area: 'area1',
  hasWorkedOutsideArea1: false,
  hasGraduatedOutsideArea1: false,
};

const STEPS = [
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'profession', label: 'Profession', icon: '⚕️' },
  { id: 'language', label: 'Language', icon: '🗣️' },
  { id: 'wage', label: 'Wage', icon: '💰' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'result', label: 'Summary', icon: '📊' }
];

// Professional Designations List
const PROFESSIONAL_DESIGNATIONS = [
  'Audiologist',
  'Chiropractor',
  'Dental Hygienist',
  'Dentist',
  'Dietitian',
  'Medical Laboratory Technologist',
  'Medical Radiation Technologist',
  'Midwife',
  'Nurse Practitioner',
  'Occupational Therapist',
  'Optometrist',
  'Pharmacist',
  'Physical Therapist / Physiotherapist',
  'Physician',
  'Podiatrist',
  'Psychologist',
  'Registered Nurse',
  'Registered Psychiatric Nurse',
  'Respiratory Therapist',
  'Speech-Language Pathologist',
  'Veterinarian',
];

// Reusable Components
const CardOption = ({ selected, onClick, title, subtitle, points }: any) => (
  <button
    onClick={onClick}
    className={`relative w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] flex items-center justify-between overflow-hidden group mb-2.5 ${selected
      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-200'
      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
      }`}
  >
    <div className="flex-1 pr-3">
      <h4 className={`text-sm font-bold transition-colors ${selected ? 'text-indigo-950' : 'text-slate-700'}`}>{title}</h4>
      {subtitle && <p className={`text-[10px] uppercase tracking-wider font-semibold mt-0.5 transition-colors ${selected ? 'text-indigo-600' : 'text-slate-400'}`}>{subtitle}</p>}
    </div>
    <div className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${selected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400'
      }`}>
      +{points}
    </div>
  </button>
);

const Toggle = ({ active, onClick, title, subtitle }: any) => (
  <button
    onClick={onClick}
    className={`p-4 w-full rounded-2xl border-2 transition-all flex items-center group active:scale-95 mb-2.5 ${active ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
  >
    <div className={`w-7 h-7 rounded-lg mr-3 flex items-center justify-center transition-all ${active ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-300'}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
    </div>
    <div className="text-left">
      <span className="text-sm font-bold text-slate-700 block">{title}</span>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{subtitle}</span>
    </div>
  </button>
);

// Typed Experience Options
const EXPERIENCE_OPTIONS: { id: ExperienceLevel; label: string; pts: number }[] = [
  { id: '0', label: 'No experience', pts: 0 },
  { id: '<1', label: 'Less than 1 year', pts: 1 },
  { id: '1', label: '1 to <2 years', pts: 4 },
  { id: '2', label: '2 to <3 years', pts: 8 },
  { id: '3', label: '3 to <4 years', pts: 12 },
  { id: '4', label: '4 to <5 years', pts: 16 },
  { id: '5+', label: '5+ years', pts: 20 },
];

export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(0);

  const results = useMemo(() => calculateTotalPoints(state), [state]);
  const annualWage = useMemo(() => calculateAnnualWage(state.hourlyWage), [state.hourlyWage]);

  const handleUpdate = (updates: Partial<CalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'experience':
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Work Experience</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Directly related to BC job offer occupation.</p>
            </div>

            {/* A) Experience Level Selection */}
            <div className="space-y-2">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <CardOption
                  key={exp.id}
                  selected={state.experience === exp.id}
                  onClick={() => handleUpdate({ experience: exp.id })}
                  title={exp.label}
                  subtitle=""
                  points={exp.pts}
                />
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              {/* B) Canadian Experience */}
              <Toggle
                active={state.hasCanadianExp}
                onClick={() => handleUpdate({ hasCanadianExp: !state.hasCanadianExp })}
                title="1+ Year Canadian Work Experience"
                subtitle="+10 Points"
              />

              {/* C) Current BC Employment */}
              <Toggle
                active={state.hasCurrentBCJob}
                onClick={() => handleUpdate({ hasCurrentBCJob: !state.hasCurrentBCJob })}
                title="Currently Working Full-Time in BC"
                subtitle="+10 Points (For this employer/occupation)"
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Education</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Highest completed credential.</p>
            </div>

            {/* D) Education Level */}
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              {[
                { id: 'secondary', label: 'High school or less', pts: 0 },
                { id: 'trades_cert', label: 'Post-secondary Diploma/Certificate', subtitle: 'Trades or Non-trades', pts: 5 },
                { id: 'associate', label: 'Associate Degree', pts: 5 },
                { id: 'bachelor', label: 'Bachelor\'s Degree', pts: 15 },
                { id: 'post_grad_cert', label: 'Post-Graduate Certificate/Diploma', pts: 15 },
                { id: 'master', label: 'Master\'s Degree', pts: 22 },
                { id: 'doctorate', label: 'Doctorate (PhD)', pts: 27 },
              ].map((edu) => (
                <CardOption
                  key={edu.id}
                  selected={state.education === edu.id}
                  onClick={() => handleUpdate({ education: edu.id as EducationLevel })}
                  title={edu.label}
                  subtitle={edu.subtitle || ''}
                  points={edu.pts}
                />
              ))}
            </div>

            {/* E) Canadian Education Gate */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Post-Secondary in Canada?</h3>
              <Toggle
                active={state.hasCanadianEducation}
                onClick={() => handleUpdate({
                  hasCanadianEducation: !state.hasCanadianEducation,
                  // Always default to 'none' to force an explicit selection for bonus points
                  educationLocation: 'none'
                })}
                title="Completed post-secondary education in Canada"
                subtitle="Unlocks bonus points"
              />

              {/* F) Education Location (only if E=yes) */}
              {state.hasCanadianEducation && (
                <div className="mt-3 ml-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                  <CardOption
                    selected={state.educationLocation === 'bc'}
                    onClick={() => handleUpdate({ educationLocation: 'bc' })}
                    title="Completed in BC"
                    subtitle=""
                    points={8}
                  />
                  <CardOption
                    selected={state.educationLocation === 'canada_outside_bc'}
                    onClick={() => handleUpdate({ educationLocation: 'canada_outside_bc' })}
                    title="Completed in Canada (outside BC)"
                    subtitle=""
                    points={6}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'profession':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Professional Designation</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Job offer in an eligible regulated profession?</p>
            </div>

            {/* G) Professional Designation Gate */}
            <Toggle
              active={state.hasProfessionalDesignation}
              onClick={() => {
                const newValue = !state.hasProfessionalDesignation;
                handleUpdate({
                  hasProfessionalDesignation: newValue,
                  selectedProfession: newValue ? state.selectedProfession : null // Clear if turning off
                });
              }}
              title="Eligible Professional Designation"
              subtitle="+5 Points (Healthcare/Regulated)"
            />

            {/* H) Professional Designation List (only if G=yes) */}
            {state.hasProfessionalDesignation && (
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Select Occupation</h3>

                <div className="relative">
                  <select
                    value={state.selectedProfession || ''}
                    onChange={(e) => handleUpdate({ selectedProfession: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 font-medium text-slate-700 appearance-none focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="" disabled>Choose an occupation...</option>
                    {PROFESSIONAL_DESIGNATIONS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                <div className={`mt-4 text-center transition-opacity ${state.selectedProfession ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold animate-in zoom-in">
                    +5 points applied
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 'language':
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Language Proficiency</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">CLB level (lowest of 4 skills). Tests must be within last 2 years.</p>
            </div>

            {/* I) English Test Gate */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <Toggle
                active={state.hasEnglishTest}
                onClick={() => {
                  const newState = !state.hasEnglishTest;
                  // If turning ON, preserve existing value (don't update it)
                  // If turning OFF, reset to 0
                  handleUpdate({
                    hasEnglishTest: newState,
                    ...(newState ? {} : { englishClb: 0 })
                  });
                }}
                title="English Test Completed"
                subtitle="IELTS, CELPIP, etc."
              />

              {/* J) English CLB (only if I=yes) */}
              {state.hasEnglishTest && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">English CLB Level</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[9, 8, 7, 6, 5, 4, 3, 0].map((level) => {
                      const pts = level >= 9 ? 30 : level === 8 ? 25 : level === 7 ? 20 : level === 6 ? 15 : level === 5 ? 10 : level === 4 ? 5 : 0;
                      return (
                        <button
                          key={level}
                          onClick={() => handleUpdate({ englishClb: level as CLBLevel })}
                          className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${state.englishClb === level
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                            : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
                            }`}
                        >
                          <span className="text-lg font-black">{level >= 9 ? '9+' : level === 0 ? '<4' : level}</span>
                          <span className={`text-[9px] font-bold ${state.englishClb === level ? 'text-indigo-200' : 'text-slate-400'}`}>
                            +{pts}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* K) French Test Gate */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <Toggle
                active={state.hasFrenchTest}
                onClick={() => {
                  const newState = !state.hasFrenchTest;
                  handleUpdate({
                    hasFrenchTest: newState,
                    ...(newState ? {} : { frenchClb: 0 })
                  });
                }}
                title="French Test Completed"
                subtitle="TEF, TCF, etc."
              />

              {/* L) French CLB (only if K=yes) */}
              {state.hasFrenchTest && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">French CLB Level</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[9, 8, 7, 6, 5, 4, 3, 0].map((level) => {
                      const pts = level >= 9 ? 30 : level === 8 ? 25 : level === 7 ? 20 : level === 6 ? 15 : level === 5 ? 10 : level === 4 ? 5 : 0;
                      return (
                        <button
                          key={level}
                          onClick={() => handleUpdate({ frenchClb: level as CLBLevel })}
                          className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${state.frenchClb === level
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                            : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
                            }`}
                        >
                          <span className="text-lg font-black">{level >= 9 ? '9+' : level === 0 ? '<4' : level}</span>
                          <span className={`text-[9px] font-bold ${state.frenchClb === level ? 'text-indigo-200' : 'text-slate-400'}`}>
                            +{pts}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'wage':
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Hourly Wage</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Base hourly wage of your BC job offer.</p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-50 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="text-center mb-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hourly Wage</p>
                <div className="text-4xl font-black text-slate-900 tabular-nums tracking-tight">
                  ${state.hourlyWage.toFixed(2)}/hr
                </div>
                <p className="text-sm text-slate-500 mt-1">Annual: ${annualWage.toLocaleString()}</p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider">Wage Points</span>
                  <span className="text-lg font-black">{results.breakdown.wage}</span>
                </div>
              </div>

              <div className="w-full mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>$15/hr</span>
                  <span>$70+/hr</span>
                </div>
                {/*
                  Slider logic:
                  - Range 14-75 to allow going below threshold easily
                  - Step 1 for integer alignment
                */}
                <input
                  type="range" min="14" max="75" step="1"
                  value={state.hourlyWage}
                  onChange={(e) => handleUpdate({ hourlyWage: parseFloat(e.target.value) })}
                  className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />

                {/* Manual Input */}
                <div className="mt-4 flex justify-center">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={state.hourlyWage}
                      onChange={(e) => {
                        const raw = parseFloat(e.target.value);
                        handleUpdate({ hourlyWage: Number.isFinite(raw) ? Math.max(0, raw) : 0 });
                      }}
                      className="pl-6 w-32 py-2 rounded-xl border-2 border-slate-100 font-bold text-slate-700 focus:border-indigo-500 outline-none text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full text-center">
                <div className={`p-3 rounded-xl border transition-all ${state.hourlyWage < 16 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Min ($16/hr)</p>
                  <p className={`text-sm font-black ${state.hourlyWage < 16 ? 'text-red-500' : 'text-slate-700'}`}>
                    {state.hourlyWage < 16 ? '0 points' : '1 point'}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Max ($70+/hr)</p>
                  <p className="text-sm font-black text-slate-700">55 points</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Job Location</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Where is your BC job offer located?</p>
            </div>

            {/* N) Area of Employment */}
            <CardOption
              selected={state.area === 'area1'}
              onClick={() => handleUpdate({ area: 'area1' })}
              title="Area 1: Metro Vancouver"
              subtitle="Vancouver, Burnaby, Richmond, Surrey, etc."
              points={0}
            />
            <CardOption
              selected={state.area === 'area2'}
              onClick={() => handleUpdate({ area: 'area2' })}
              title="Area 2: Near-Metro"
              subtitle="Squamish, Abbotsford, Agassiz, Mission, Chilliwack"
              points={5}
            />
            <CardOption
              selected={state.area === 'area3'}
              onClick={() => handleUpdate({ area: 'area3' })}
              title="Area 3: Rest of BC"
              subtitle="All other BC regions"
              points={15}
            />

            {/* Regional Bonuses */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Regional Bonuses</h3>

              {/* O) Worked Outside Area 1 */}
              <Toggle
                active={state.hasWorkedOutsideArea1}
                onClick={() => handleUpdate({ hasWorkedOutsideArea1: !state.hasWorkedOutsideArea1 })}
                title="1+ Year Employment Outside Area 1"
                subtitle="+10 Points (Within last 5 years)"
              />

              {/* P) Graduated Outside Area 1 */}
              <Toggle
                active={state.hasGraduatedOutsideArea1}
                onClick={() => handleUpdate({ hasGraduatedOutsideArea1: !state.hasGraduatedOutsideArea1 })}
                title="Graduated from BC Institution Outside Area 1"
                subtitle="+10 Points (Public institution, within 3 years)"
              />
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="space-y-5 animate-in zoom-in-95 duration-500">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-center relative overflow-hidden text-white shadow-2xl shadow-indigo-900/50">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-[0.3em] mb-3">Total BC PNP Score</p>
              <div className="text-7xl font-black tracking-tighter leading-none mb-3">{results.total}</div>
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Max Possible: 200
              </div>
            </div>

            <div className="space-y-3">
              {/* Human Capital Section */}
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Human Capital Factors</h3>

                {/* Experience */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">Work Experience Category (Max 40)</span>
                    <span className="text-sm font-black">{results.breakdown.experience + results.breakdown.canadianExp + results.breakdown.currentBCJob} / 40</span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1 pl-2 border-l-2 border-slate-200">
                    <div className="flex justify-between"><span>Direct Experience</span><span>{results.breakdown.experience}</span></div>
                    <div className="flex justify-between"><span>Canadian Exp</span><span>{results.breakdown.canadianExp}</span></div>
                    <div className="flex justify-between"><span>Current BC Job</span><span>{results.breakdown.currentBCJob}</span></div>
                  </div>
                </div>

                {/* Education (Capped at 40) */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">Education Category (Max 40)</span>
                    <span className={`text-sm font-black ${results.breakdown.educationTotal === 40 ? 'text-green-600' : ''}`}>
                      {results.breakdown.educationTotal} / 40
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1 pl-2 border-l-2 border-slate-200">
                    <div className="flex justify-between"><span>Education Level</span><span>{results.breakdown.education}</span></div>
                    <div className="flex justify-between"><span>BC/Canada Bonus</span><span>{results.breakdown.educationLocation}</span></div>
                    <div className="flex justify-between"><span>Professional Desig.</span><span>{results.breakdown.professionalDesignation}</span></div>
                  </div>
                </div>

                {/* Language (Capped at 40) */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">Language Category (Max 40)</span>
                    <span className={`text-sm font-black ${results.breakdown.languageTotal === 40 ? 'text-green-600' : ''}`}>
                      {results.breakdown.languageTotal} / 40
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1 pl-2 border-l-2 border-slate-200">
                    <div className="flex justify-between"><span>English CLB</span><span>{results.breakdown.englishClb}</span></div>
                    <div className="flex justify-between"><span>French CLB</span><span>{results.breakdown.frenchClb}</span></div>
                  </div>
                </div>
              </div>

              {/* Economic Factors Section */}
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Economic Factors</h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-600">Hourly Wage</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">{results.breakdown.wage} / 55</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-600">Area of Employment</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">{results.breakdown.area} / 15</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-slate-600">Regional Bonuses</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">
                      {results.breakdown.workedOutsideArea1 + results.breakdown.graduatedOutsideArea1} / 10
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setState(INITIAL_STATE);
                setCurrentStep(0);
              }}
              className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors"
            >
              Restart Calculator
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100">
      <div className="max-w-md mx-auto w-full p-5 pt-6 flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">BC</div>
            <span className="font-extrabold text-slate-900 tracking-tight text-sm uppercase">PNP Calc 2026</span>
          </div>
          <div className="flex space-x-1">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 w-3 rounded-full transition-colors ${i <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>

        {currentStep < STEPS.length - 1 && (
          <div className="pt-6">
            <button
              onClick={nextStep}
              className="w-full py-4 rounded-[1.5rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Next Step
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            {currentStep > 0 && (
              <button onClick={prevStep} className="w-full mt-3 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors">
                Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
