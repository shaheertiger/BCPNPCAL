
import React, { useState, useMemo } from 'react';
import { calculateTotalPoints, calculateAnnualWage } from '../utils/calculatePoints';
import { CalculatorState, EducationLevel, ExperienceLevel, CLBLevel } from '../types';
import { calculatorContent } from '../i18n/calculator-content';

type Translation = typeof calculatorContent.en;

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

// Professional Designations List (Kept as constant strings for now as they are specific titles)
const PROFESSIONAL_DESIGNATIONS = [
  'Audiologist', 'Chiropractor', 'Dental Hygienist', 'Dentist', 'Dietitian',
  'Medical Laboratory Technologist', 'Medical Radiation Technologist', 'Midwife',
  'Nurse Practitioner', 'Occupational Therapist', 'Optometrist', 'Pharmacist',
  'Physical Therapist / Physiotherapist', 'Physician', 'Podiatrist', 'Psychologist',
  'Registered Nurse', 'Registered Psychiatric Nurse', 'Respiratory Therapist',
  'Speech-Language Pathologist', 'Veterinarian',
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

export const Calculator: React.FC<{ t: Translation }> = ({ t }) => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(0);

  const results = useMemo(() => calculateTotalPoints(state), [state]);
  const annualWage = useMemo(() => calculateAnnualWage(state.hourlyWage), [state.hourlyWage]);

  // Derived Data (Steps & Options) based on 't'
  const STEPS = [
    { id: 'experience', label: t.steps.experience, icon: '💼' },
    { id: 'education', label: t.steps.education, icon: '🎓' },
    { id: 'profession', label: t.steps.profession, icon: '⚕️' },
    { id: 'language', label: t.steps.language, icon: '🗣️' },
    { id: 'wage', label: t.steps.wage, icon: '💰' },
    { id: 'location', label: t.steps.location, icon: '📍' },
    { id: 'result', label: t.steps.result, icon: '📊' }
  ];

  const EXPERIENCE_OPTIONS: { id: ExperienceLevel; label: string; pts: number }[] = [
    { id: '0', label: t.experience.options.none, pts: 0 },
    { id: '<1', label: t.experience.options.less_than_1, pts: 1 },
    { id: '1', label: t.experience.options.one_to_two, pts: 4 },
    { id: '2', label: t.experience.options.two_to_three, pts: 8 },
    { id: '3', label: t.experience.options.three_to_four, pts: 12 },
    { id: '4', label: t.experience.options.four_to_five, pts: 16 },
    { id: '5+', label: t.experience.options.five_plus, pts: 20 },
  ];

  const EDUCATION_OPTIONS = [
    { id: 'secondary', label: t.education.options.secondary, pts: 0 },
    { id: 'trades_cert', label: t.education.options.trades_cert, subtitle: t.education.options.trades_cert_sub, pts: 5 },
    { id: 'associate', label: t.education.options.associate, pts: 5 },
    { id: 'bachelor', label: t.education.options.bachelor, pts: 15 },
    { id: 'post_grad_cert', label: t.education.options.post_grad_cert, pts: 15 },
    { id: 'master', label: t.education.options.master, pts: 22 },
    { id: 'doctorate', label: t.education.options.doctorate, pts: 27 },
  ];

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
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.experience.title}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">{t.experience.subtitle}</p>
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
                title={t.experience.canadian_exp.title}
                subtitle={t.experience.canadian_exp.subtitle}
              />

              {/* C) Current BC Employment */}
              <Toggle
                active={state.hasCurrentBCJob}
                onClick={() => handleUpdate({ hasCurrentBCJob: !state.hasCurrentBCJob })}
                title={t.experience.current_job.title}
                subtitle={t.experience.current_job.subtitle}
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.education.title}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">{t.education.subtitle}</p>
            </div>

            {/* D) Education Level */}
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              {EDUCATION_OPTIONS.map((edu) => (
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
              <h3 className="text-sm font-bold text-slate-700 mb-3">{t.education.canadian_education.title}?</h3>
              <Toggle
                active={state.hasCanadianEducation}
                onClick={() => handleUpdate({
                  hasCanadianEducation: !state.hasCanadianEducation,
                  educationLocation: 'none'
                })}
                title={t.education.canadian_education.title}
                subtitle={t.education.canadian_education.subtitle}
              />

              {/* F) Education Location (only if E=yes) */}
              {state.hasCanadianEducation && (
                <div className="mt-3 ml-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                  {state.educationLocation === 'none' && (
                    <div className="mb-3 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-xs font-bold text-amber-700">{t.education.location.none_label}</p>
                    </div>
                  )}
                  <CardOption
                    selected={state.educationLocation === 'bc'}
                    onClick={() => handleUpdate({ educationLocation: 'bc' })}
                    title={t.education.location.bc}
                    subtitle=""
                    points={8}
                  />
                  <CardOption
                    selected={state.educationLocation === 'canada_outside_bc'}
                    onClick={() => handleUpdate({ educationLocation: 'canada_outside_bc' })}
                    title={t.education.location.canada}
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
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.profession.title}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">{t.profession.subtitle}</p>
            </div>

            {/* G) Professional Designation Gate */}
            <Toggle
              active={state.hasProfessionalDesignation}
              onClick={() => {
                const newValue = !state.hasProfessionalDesignation;
                handleUpdate({
                  hasProfessionalDesignation: newValue,
                  selectedProfession: newValue ? state.selectedProfession : null
                });
              }}
              title={t.profession.toggle.title}
              subtitle={t.profession.toggle.subtitle}
            />

            {/* H) Professional Designation List (only if G=yes) */}
            {state.hasProfessionalDesignation && (
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t.profession.select_label}</h3>

                <div className="relative">
                  <select
                    value={state.selectedProfession || ''}
                    onChange={(e) => handleUpdate({ selectedProfession: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 font-medium text-slate-700 appearance-none focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="" disabled>{t.profession.default_option}</option>
                    {PROFESSIONAL_DESIGNATIONS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  {state.selectedProfession ? (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold animate-in zoom-in">
                      {t.profession.applied}
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold animate-in zoom-in">
                      {t.profession.instruction}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'language':
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.language.title}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">{t.language.subtitle}</p>
            </div>

            {/* I) English Test Gate */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <Toggle
                active={state.hasEnglishTest}
                onClick={() => {
                  const newState = !state.hasEnglishTest;
                  handleUpdate({
                    hasEnglishTest: newState,
                    ...(newState ? {} : { englishClb: 0 })
                  });
                }}
                title={t.language.english.title}
                subtitle={t.language.english.subtitle}
              />

              {/* J) English CLB (only if I=yes) */}
              {state.hasEnglishTest && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.language.english.label}</p>
                  {state.englishClb === 0 && (
                    <div className="mb-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-[10px] font-bold text-amber-700">{t.language.english.instruction}</p>
                    </div>
                  )}
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
                title={t.language.french.title}
                subtitle={t.language.french.subtitle}
              />

              {/* L) French CLB (only if K=yes) */}
              {state.hasFrenchTest && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.language.french.label}</p>
                  {state.frenchClb === 0 && (
                    <div className="mb-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-[10px] font-bold text-amber-700">{t.language.french.instruction}</p>
                    </div>
                  )}
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
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.wage.title}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">{t.wage.subtitle}</p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-50 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="text-center mb-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.wage.title}</p>
                <div className="text-4xl font-black text-slate-900 tabular-nums tracking-tight">
                  ${state.hourlyWage.toFixed(2)}/hr
                </div>
                <p className="text-sm text-slate-500 mt-1">{t.wage.annual} ${annualWage.toLocaleString()}</p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider">{t.wage.points_badge}</span>
                  <span className="text-lg font-black">{results.breakdown.wage}</span>
                </div>
              </div>

              <div className="w-full mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>$15/hr</span>
                  <span>$70+/hr</span>
                </div>
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
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t.wage.min_label}</p>
                  <p className={`text-sm font-black ${state.hourlyWage < 16 ? 'text-red-500' : 'text-slate-700'}`}>
                    {state.hourlyWage < 16 ? t.wage.min_points : t.wage.one_point}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t.wage.max_label}</p>
                  <p className="text-sm font-black text-slate-700">{t.wage.max_points}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.location_step.title}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">{t.location_step.subtitle}</p>
            </div>

            {/* N) Area of Employment */}
            <CardOption
              selected={state.area === 'area1'}
              onClick={() => handleUpdate({ area: 'area1' })}
              title={t.location_step.options.area1}
              subtitle={t.location_step.options.area1_sub}
              points={0}
            />
            <CardOption
              selected={state.area === 'area2'}
              onClick={() => handleUpdate({ area: 'area2' })}
              title={t.location_step.options.area2}
              subtitle={t.location_step.options.area2_sub}
              points={5}
            />
            <CardOption
              selected={state.area === 'area3'}
              onClick={() => handleUpdate({ area: 'area3' })}
              title={t.location_step.options.area3}
              subtitle={t.location_step.options.area3_sub}
              points={15}
            />

            {/* Regional Bonuses */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3">{t.location_step.bonuses.title}</h3>

              {/* O) Worked Outside Area 1 */}
              <Toggle
                active={state.hasWorkedOutsideArea1}
                onClick={() => handleUpdate({ hasWorkedOutsideArea1: !state.hasWorkedOutsideArea1 })}
                title={t.location_step.bonuses.worked_outside.title}
                subtitle={t.location_step.bonuses.worked_outside.subtitle}
              />

              {/* P) Graduated Outside Area 1 */}
              <Toggle
                active={state.hasGraduatedOutsideArea1}
                onClick={() => handleUpdate({ hasGraduatedOutsideArea1: !state.hasGraduatedOutsideArea1 })}
                title={t.location_step.bonuses.graduated_outside.title}
                subtitle={t.location_step.bonuses.graduated_outside.subtitle}
              />
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="space-y-5 animate-in zoom-in-95 duration-500">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-center relative overflow-hidden text-white shadow-2xl shadow-indigo-900/50">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-[0.3em] mb-3">{t.result.total_score}</p>
              <div className="text-7xl font-black tracking-tighter leading-none mb-3">{results.total}</div>
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {t.result.max_possible}
              </div>
            </div>

            <div className="space-y-3">
              {/* Human Capital Section */}
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.result.human_capital}</h3>

                {/* Experience */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">{t.result.categories.experience}</span>
                    <span className="text-sm font-black">{results.breakdown.experience + results.breakdown.canadianExp + results.breakdown.currentBCJob} / 40</span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1 pl-2 border-l-2 border-slate-200">
                    <div className="flex justify-between"><span>{t.result.categories.direct}</span><span>{results.breakdown.experience}</span></div>
                    <div className="flex justify-between"><span>{t.result.categories.canadian}</span><span>{results.breakdown.canadianExp}</span></div>
                    <div className="flex justify-between"><span>{t.result.categories.current_job}</span><span>{results.breakdown.currentBCJob}</span></div>
                  </div>
                </div>

                {/* Education (Capped at 40) */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">{t.result.categories.education}</span>
                    <span className={`text-sm font-black ${results.breakdown.educationTotal === 40 ? 'text-green-600' : ''}`}>
                      {results.breakdown.educationTotal} / 40
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1 pl-2 border-l-2 border-slate-200">
                    <div className="flex justify-between"><span>{t.result.categories.edu_level}</span><span>{results.breakdown.education}</span></div>
                    <div className="flex justify-between"><span>{t.result.categories.location_bonus}</span><span>{results.breakdown.educationLocation}</span></div>
                    <div className="flex justify-between"><span>{t.result.categories.prof_desig}</span><span>{results.breakdown.professionalDesignation}</span></div>
                  </div>
                </div>

                {/* Language (Capped at 40) */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">{t.result.categories.language}</span>
                    <span className={`text-sm font-black ${results.breakdown.languageTotal === 40 ? 'text-green-600' : ''}`}>
                      {results.breakdown.languageTotal} / 40
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1 pl-2 border-l-2 border-slate-200">
                    <div className="flex justify-between"><span>{t.result.categories.english}</span><span>{results.breakdown.englishClb}</span></div>
                    <div className="flex justify-between"><span>{t.result.categories.french}</span><span>{results.breakdown.frenchClb}</span></div>
                  </div>
                </div>
              </div>

              {/* Economic Factors Section */}
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.result.economic_factors}</h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-600">{t.result.categories.wage}</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">{results.breakdown.wage} / 55</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-600">{t.result.categories.area}</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">{results.breakdown.area} / 15</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-slate-600">{t.result.categories.regional}</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">
                      {results.breakdown.workedOutsideArea1 + results.breakdown.graduatedOutsideArea1} / 20
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
              {t.result.restart}
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
              {t.nav.next}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            {currentStep > 0 && (
              <button onClick={prevStep} className="w-full mt-3 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors">
                {t.nav.back}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
