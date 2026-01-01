import React, { useState, useEffect, useMemo } from 'react';
import { calculateTotalPoints } from '../utils/calculatePoints';
import { CalculatorState, EducationLevel, AreaZone, PointsResult } from '../types';

const INITIAL_STATE: CalculatorState = {
  experience: {
    years: 0,
    hasCanadianExp: false,
    hasCurrentBCJob: false
  },
  education: 'secondary',
  language: 4,
  wage: 16.75,
  area: 'vancouver'
};

const STEPS = [
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'language', label: 'Language', icon: '🗣️' },
  { id: 'wage', label: 'Income', icon: '💰' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'result', label: 'Summary', icon: '📊' }
];

// CardOption Component
const CardOption = ({ selected, onClick, title, subtitle, points }: any) => (
  <button
    onClick={onClick}
    className={`relative w-full p-6 rounded-[2rem] border-2 text-left transition-all active:scale-[0.98] flex items-center justify-between overflow-hidden group ${
      selected
        ? 'border-red-600 bg-white shadow-[0_20px_40px_-15px_rgba(220,38,38,0.15)] ring-4 ring-red-50/50'
        : 'border-slate-100 bg-white hover:border-red-200'
    }`}
  >
    <div className="flex-1 pr-4">
      <h4 className={`text-base font-bold transition-colors mb-1 ${selected ? 'text-red-950' : 'text-slate-800'}`}>{title}</h4>
      {subtitle && <p className={`text-xs font-medium leading-relaxed transition-colors ${selected ? 'text-red-700/70' : 'text-slate-500'}`}>{subtitle}</p>}
    </div>
    <div className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-black tracking-widest uppercase transition-all ${
      selected ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-100' : 'bg-slate-50 text-slate-500'
    }`}>
      +{points}
    </div>
  </button>
);

// ResultCard Component
const ResultCard: React.FC<{ results: PointsResult; isUpdating: boolean }> = ({ results, isUpdating }) => {
  const getGradient = () => {
    if (results.total >= 115) return 'from-red-600 to-red-800';
    if (results.total >= 95) return 'from-rose-600 to-rose-700';
    return 'from-slate-700 to-slate-900';
  };

  return (
    <div className="flex flex-col space-y-8 animate-in zoom-in-95 duration-500">
      {/* High Impact Score Hero */}
      <div className={`bg-gradient-to-br ${getGradient()} p-12 rounded-[4rem] shadow-[0_30px_60px_-15px_rgba(220,38,38,0.4)] text-white relative overflow-hidden transition-all duration-700`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 animate-pulse duration-[4000ms]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-10">Score Estimation</p>

          <div className="flex items-baseline justify-center space-x-2 mb-10">
            <span className={`text-[9rem] font-black tracking-tighter leading-none transition-all duration-500 tabular-nums ${isUpdating ? 'scale-110 blur-sm opacity-50' : 'scale-100'}`}>
              {results.total}
            </span>
            <div className="flex flex-col">
               <span className="text-3xl font-black text-white/30 tracking-tight">/200</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl py-4 px-10 border border-white/20 shadow-2xl">
            <span className="text-sm font-black uppercase tracking-widest">{results.level} Ranking Profile</span>
          </div>
        </div>
      </div>

      {/* Modern Points Breakdown */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-red-50 shadow-sm space-y-10">
        <div className="flex items-center space-x-4">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Point Allocation</h3>
           <div className="h-px w-full bg-red-50"></div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {[
            { label: 'Work Experience', points: results.breakdown.experience, max: 40, color: 'bg-red-500' },
            { label: 'Education Level', points: results.breakdown.education, max: 40, color: 'bg-rose-500' },
            { label: 'Language Skills', points: results.breakdown.language, max: 40, color: 'bg-orange-500' },
            { label: 'Income & Wage', points: results.breakdown.wage, max: 55, color: 'bg-red-600' },
            { label: 'Regional Bonus', points: results.breakdown.area, max: 25, color: 'bg-rose-600' },
          ].map((item) => (
            <div key={item.label} className="group">
              <div className="flex justify-between items-end mb-4 px-1">
                <span className="text-sm font-bold text-slate-800 transition-colors group-hover:text-red-600">{item.label}</span>
                <span className="text-sm font-black text-slate-900">
                  {item.points} <span className="text-slate-400 font-bold ml-1">/ {item.max}</span>
                </span>
              </div>
              <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden p-[3px] ring-1 ring-slate-100">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: `${(item.points / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-red-50/50 rounded-[2.5rem] border border-red-100/50 text-center">
        <p className="text-sm font-semibold text-red-800 leading-relaxed px-2">
          Invitations to Apply (ITA) are based on provincial draws. A score exceeding 110 is historically competitive for most skilled worker streams.
        </p>
      </div>
    </div>
  );
};

// Main Calculator Component
export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const results = useMemo(() => calculateTotalPoints(state), [state]);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 200);
    return () => clearTimeout(timer);
  }, [state]);

  const handleUpdate = (updates: Partial<CalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'experience':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Work History</h2>
              <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">Experience must be directly related to your BC job offer's NOC level.</p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-red-50 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Related Experience</span>
                <span className="text-4xl font-black text-red-600 tracking-tighter">{state.experience.years >= 5 ? '5+ Years' : `${state.experience.years} Year${state.experience.years === 1 ? '' : 's'}`}</span>
              </div>
              <input
                type="range" min="0" max="5" step="1"
                value={state.experience.years}
                onChange={(e) => handleUpdate({ experience: { ...state.experience, years: parseInt(e.target.value) } })}
                className="w-full h-4 bg-red-50 rounded-full appearance-none cursor-pointer accent-red-600 mb-8"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>0 years</span>
                <span>5+ years</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleUpdate({ experience: { ...state.experience, hasCanadianExp: !state.experience.hasCanadianExp } })}
                className={`p-6 rounded-[2rem] border-2 transition-all flex items-center group active:scale-95 ${
                  state.experience.hasCanadianExp ? 'border-red-600 bg-red-50/40 shadow-sm' : 'border-slate-100 bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mr-5 flex items-center justify-center transition-all ${state.experience.hasCanadianExp ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-left">
                  <span className="text-base font-bold text-slate-800 block">1+ Year in Canada</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${state.experience.hasCanadianExp ? 'text-red-600' : 'text-slate-500'}`}>+10 Bonus Points</span>
                </div>
              </button>
              <button
                onClick={() => handleUpdate({ experience: { ...state.experience, hasCurrentBCJob: !state.experience.hasCurrentBCJob } })}
                className={`p-6 rounded-[2rem] border-2 transition-all flex items-center group active:scale-95 ${
                  state.experience.hasCurrentBCJob ? 'border-red-600 bg-red-50/40 shadow-sm' : 'border-slate-100 bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mr-5 flex items-center justify-center transition-all ${state.experience.hasCurrentBCJob ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-left">
                  <span className="text-base font-bold text-slate-800 block">Currently working in BC</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${state.experience.hasCurrentBCJob ? 'text-red-600' : 'text-slate-500'}`}>+10 Bonus Points</span>
                </div>
              </button>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Education</h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mt-2">Points are awarded for your highest completed credential.</p>
            </div>
            {[
              { id: 'secondary', label: 'Secondary School', pts: 0, sub: 'High school graduation or equivalent' },
              { id: 'post-secondary', label: 'Certificate / Diploma', pts: 2, sub: 'Less than 3 years duration' },
              { id: 'associate', label: 'Associate Degree', pts: 4, sub: 'Recognized 2-year university program' },
              { id: 'bachelor', label: 'Bachelor\'s Degree', pts: 15, sub: '3-year or 4-year undergraduate degree' },
              { id: 'post-grad', label: 'Post-grad Diploma', pts: 22, sub: 'Post-degree specialization' },
              { id: 'master-phd', label: 'Master\'s or PhD', pts: 27, sub: 'Highest level of graduate study' },
            ].map((edu) => (
              <CardOption
                key={edu.id}
                selected={state.education === edu.id}
                onClick={() => handleUpdate({ education: edu.id as EducationLevel })}
                title={edu.label}
                subtitle={edu.sub}
                points={edu.pts}
              />
            ))}
          </div>
        );

      case 'language':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Language Ability</h2>
              <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">Based on your valid CLB benchmark (IELTS, CELPIP, etc.)</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[10, 9, 8, 7, 6, 5, 4].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleUpdate({ language: lvl })}
                  className={`p-6 rounded-[2.5rem] border-2 transition-all flex items-center justify-between active:scale-95 ${
                    state.language === lvl ? 'border-rose-500 bg-white shadow-xl shadow-rose-100/50 ring-4 ring-rose-50' : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-14 h-14 rounded-2xl mr-5 flex items-center justify-center font-black text-xl transition-all ${state.language === lvl ? 'bg-rose-500 text-white scale-110' : 'bg-slate-50 text-slate-500'}`}>
                      {lvl === 10 ? '10+' : lvl}
                    </div>
                    <div className="text-left">
                      <span className="font-extrabold text-slate-900 block text-lg">CLB {lvl}</span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${state.language === lvl ? 'text-rose-600' : 'text-slate-500'}`}>
                        {lvl >= 9 ? 'Advanced Proficiency' : lvl >= 7 ? 'Initial Mastery' : 'Basic Level'}
                      </span>
                    </div>
                  </div>
                  <div className={`font-black text-base pr-2 ${state.language === lvl ? 'text-rose-600' : 'text-slate-300'}`}>
                    +{lvl === 10 ? 30 : (lvl - 4) * 5}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'wage':
        return (
          <div className="space-y-12 py-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Annual Income</h2>
              <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">Calculated based on your hourly wage in BC.</p>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-red-100/30 border border-red-50 flex flex-col items-center relative">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Wage Analysis</span>
              </div>

              <div className="flex flex-col items-center mb-12 mt-6">
                <div className="text-8xl font-black text-slate-900 flex items-start tabular-nums tracking-tighter">
                  <span className="text-3xl mt-5 mr-1 text-slate-300 font-bold">$</span>
                  {state.wage.toFixed(2)}
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3">CAD Hourly Rate</span>
              </div>

              <input
                type="range" min="16.75" max="60" step="0.50"
                value={state.wage}
                onChange={(e) => handleUpdate({ wage: parseFloat(e.target.value) })}
                className="w-full h-5 bg-red-50 rounded-full appearance-none cursor-pointer accent-red-600 mb-10"
              />

              <div className="w-full grid grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Minimum Rate</p>
                   <p className="text-sm font-bold text-slate-800">$16.75/hr</p>
                </div>
                <div className={`rounded-3xl p-5 border transition-all ${state.wage >= 50 ? 'bg-red-600 border-red-600' : 'bg-slate-50 border-slate-100'}`}>
                   <p className={`text-[10px] font-black uppercase tracking-wider mb-1 ${state.wage >= 50 ? 'text-red-100' : 'text-slate-400'}`}>Max Score Pts</p>
                   <p className={`text-sm font-bold ${state.wage >= 50 ? 'text-white' : 'text-slate-800'}`}>$50.00/hr</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Job Region</h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mt-2">Strategic regional employment provides critical bonus points.</p>
            </div>
            {[
              { id: 'vancouver', label: 'Metro Vancouver', pts: 0, sub: 'Includes Burnaby, Surrey, and Richmond' },
              { id: 'squamish', label: 'Squamish / Fraser Valley', pts: 5, sub: 'Regional bonus for high-growth zones' },
              { id: 'victoria', label: 'Greater Victoria', pts: 10, sub: 'Capital Regional District employment' },
              { id: 'nanaimo', label: 'Nanaimo Area', pts: 15, sub: 'Regional District of Nanaimo' },
              { id: 'kelowna', label: 'Central Okanagan', pts: 20, sub: 'Kelowna and West Kelowna area' },
              { id: 'other', label: 'Remote / Rural Districts', pts: 25, sub: 'Any other regional district in BC' },
            ].map((loc) => (
              <CardOption
                key={loc.id}
                selected={state.area === loc.id}
                onClick={() => handleUpdate({ area: loc.id as AreaZone })}
                title={loc.label}
                subtitle={loc.sub}
                points={loc.pts}
              />
            ))}
          </div>
        );

      case 'result':
        return <ResultCard results={results} isUpdating={isUpdating} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-red-50/30 flex flex-col font-sans selection:bg-red-100">
      {/* Ultra-slim Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-red-100 z-50">
        <div
          className="h-full bg-red-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(220,38,38,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="bg-white border-b border-red-100 px-6 py-5 flex items-center justify-between sticky top-1.5 z-40 backdrop-blur-md bg-white/95">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-lg shadow-red-200">BC</div>
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">PNP Calculator</h1>
        </div>
        <div className="flex space-x-1.5">
          {STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-5 rounded-full transition-colors ${idx === currentStep ? 'bg-red-600' : idx < currentStep ? 'bg-red-200' : 'bg-red-100'}`}
            />
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-5 pt-8 pb-16">
        <div className="w-full max-w-lg mx-auto">
          {currentStep > 0 && currentStep < STEPS.length - 1 && (
            <button
              onClick={prevStep}
              className="mb-8 flex items-center text-slate-500 hover:text-red-600 transition-all py-2 px-1 active:translate-x-[-8px] group"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-sm mr-4 group-hover:border-red-200 group-hover:text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Back</span>
            </button>
          )}
          {renderStep()}

          {currentStep === STEPS.length - 1 && (
            <button
              onClick={() => setCurrentStep(0)}
              className="mt-10 w-full py-4 text-slate-500 font-bold text-xs uppercase tracking-[0.3em] hover:text-red-600 transition-colors"
            >
              Start New Calculation
            </button>
          )}
        </div>
      </main>

      {/* Floating Action Navigation */}
      {currentStep < STEPS.length - 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40">
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-3 flex items-center justify-between border border-white/10">
            <div className="flex flex-col pl-6 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Current Score</span>
              <div className="flex items-baseline space-x-1">
                <span className={`text-3xl font-black transition-transform duration-300 ${isUpdating ? 'scale-110 text-red-400' : 'scale-100'}`}>
                  {results.total}
                </span>
                <span className="text-sm text-slate-500 font-bold">/ 200</span>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="shrink-0 bg-red-600 hover:bg-red-500 text-white px-8 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-red-900/30 active:scale-95 transition-all flex items-center ml-4"
            >
              {currentStep === STEPS.length - 2 ? 'Result' : 'Next'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
