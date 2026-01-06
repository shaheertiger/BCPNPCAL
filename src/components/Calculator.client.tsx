
import React, { useState, useMemo } from 'react';
import { calculateTotalPoints, calculateAnnualWage } from '../utils/calculatePoints';
import { CalculatorState, EducationLevel, AreaZone } from '../types';

const INITIAL_STATE: CalculatorState = {
  experience: 0,
  hasCanadianExp: false,
  hasCurrentBCJob: false,
  hourlyWage: 19, // $19/hr * 40 * 52 = 39,520 -> 0 wage points (below $40k threshold)

  area: 'metro_vancouver',
  education: 'secondary',
  hasCanadianEducation: false,
  clb: 4,
  hasOccupationBonus: false
};

const STEPS = [
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'language', label: 'Language', icon: '🗣️' },
  { id: 'wage', label: 'Wage', icon: '💰' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'result', label: 'Summary', icon: '📊' }
];

// CardOption Component
const CardOption = ({ selected, onClick, title, subtitle, points }: any) => (
  <button
    onClick={onClick}
    className={`relative w-full p-5 rounded-[1.5rem] border-2 text-left transition-all active:scale-[0.98] flex items-center justify-between overflow-hidden group mb-3 ${selected
      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-200'
      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
      }`}
  >
    <div className="flex-1 pr-4">
      <h4 className={`text-sm font-bold transition-colors ${selected ? 'text-indigo-950' : 'text-slate-700'}`}>{title}</h4>
      {subtitle && <p className={`text-[10px] uppercase tracking-wider font-semibold mt-1 transition-colors ${selected ? 'text-indigo-600' : 'text-slate-400'}`}>{subtitle}</p>}
    </div>
    <div className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${selected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400'
      }`}>
      +{points}
    </div>
  </button>
);

// Toggle Component
const Toggle = ({ active, onClick, title, subtitle }: any) => (
  <button
    onClick={onClick}
    className={`p-5 w-full rounded-[1.5rem] border-2 transition-all flex items-center group active:scale-95 mb-3 ${active ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
  >
    <div className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center transition-all ${active ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-300'}`}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
    </div>
    <div className="text-left">
      <span className="text-sm font-bold text-slate-700 block">{title}</span>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{subtitle}</span>
    </div>
  </button>
);

export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const results = useMemo(() => calculateTotalPoints(state), [state]);
  const annualWage = useMemo(() => calculateAnnualWage(state.hourlyWage), [state.hourlyWage]);

  const handleUpdate = (updates: Partial<CalculatorState>) => {
    setIsUpdating(true);
    setState(prev => ({ ...prev, ...updates }));
    setTimeout(() => setIsUpdating(false), 200);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'experience':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Work Experience</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Directly related to BC job offer.</p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience Years</span>
                <span className="text-3xl font-black text-indigo-600">{state.experience >= 5 ? '5+' : state.experience} Years</span>
              </div>
              <input
                type="range" min="0" max="5" step="1"
                value={state.experience}
                onChange={(e) => handleUpdate({ experience: parseInt(e.target.value) })}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase">
                <span>None (0)</span>
                <span>5+ (20 pts)</span>
              </div>
            </div>

            <div className="space-y-3">
              <Toggle active={state.hasCanadianExp} onClick={() => handleUpdate({ hasCanadianExp: !state.hasCanadianExp })} title="Canadian Work Experience" subtitle="+10 Points (1+ Year in Canada)" />
              <Toggle active={state.hasCurrentBCJob} onClick={() => handleUpdate({ hasCurrentBCJob: !state.hasCurrentBCJob })} title="Current BC Employment" subtitle="+10 Points (Working for supporter)" />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Education</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Highest completed credential.</p>
            </div>
            {[
              { id: 'secondary', label: 'High school or less', pts: 0 },
              { id: 'diploma', label: 'Post-secondary diploma', pts: 4 },
              { id: 'bachelor', label: 'Bachelor\'s Degree', pts: 8 },
              { id: 'master', label: 'Master\'s Degree', pts: 11 },
              { id: 'doctorate', label: 'Doctorate (PhD)', pts: 17 },
            ].map((edu) => (
              <CardOption
                key={edu.id}
                selected={state.education === edu.id}
                onClick={() => handleUpdate({ education: edu.id as EducationLevel })}
                title={edu.label}
                subtitle=""
                points={edu.pts}
              />
            ))}
            <div className="mt-8">
              <Toggle active={state.hasCanadianEducation} onClick={() => handleUpdate({ hasCanadianEducation: !state.hasCanadianEducation })} title="Education Completed in Canada" subtitle="+8 Bonus Points" />
              <Toggle active={state.hasOccupationBonus} onClick={() => handleUpdate({ hasOccupationBonus: !state.hasOccupationBonus })} title="Occupation Bonus (NOC)" subtitle="+10 Points (Tech / Healthcare / High Demand)" />
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Language (CLB)</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Lowest score across all abilities.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[9, 8, 7, 6, 5, 4, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => handleUpdate({ clb: level })}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${state.clb === level
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
                    }`}
                >
                  <span className="text-2xl font-black">{level >= 9 ? '9+' : level}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${state.clb === level ? 'text-indigo-200' : 'text-slate-400'}`}>
                    CLB Level
                  </span>
                  <div className={`mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${state.clb === level ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    +{level >= 9 ? 30 : level === 8 ? 26 : level === 7 ? 22 : level === 6 ? 18 : level === 5 ? 14 : level === 4 ? 10 : 0} pts
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'wage':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Wage</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Based on Annual Salary (Hourly × 40 × 52).</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100 border border-indigo-50 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="text-center mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Annual Equivalent</p>
                <div className="text-4xl font-black text-slate-900 tabular-nums tracking-tight">
                  ${annualWage.toLocaleString()}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wage Points</span>
                  <span className="text-sm font-black text-slate-900">{results.breakdown.wage}</span>
                </div>
              </div>

              <div className="w-full mb-8">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Hourly Rate</span>
                  <span className="text-indigo-600">${state.hourlyWage.toFixed(2)} / hr</span>
                </div>
                <input
                  type="range" min="15" max="60" step="0.25"
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

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Min Threshold</p>
                  <p className="text-sm font-black text-slate-700">$40,000</p>
                  <p className="text-[10px] text-slate-400 mt-1">Starts at 2 pts</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Max Threshold</p>
                  <p className="text-sm font-black text-slate-700">$100,000</p>
                  <p className="text-[10px] text-slate-400 mt-1">Max 50 pts</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Location</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Where is your job located?</p>
            </div>
            {[
              { id: 'metro_vancouver', label: 'Metro Vancouver', pts: 0 },
              { id: 'abbotsford', label: 'Abbotsford', pts: 5 },
              { id: 'squamish', label: 'Squamish', pts: 10 },
              { id: 'vernon', label: 'Vernon', pts: 15 },
              { id: 'kamloops', label: 'Kamloops', pts: 20 },
              { id: 'northeast', label: 'Northeast Development Region', pts: 25 },
            ].map((loc) => (
              <CardOption
                key={loc.id}
                selected={state.area === loc.id}
                onClick={() => handleUpdate({ area: loc.id as AreaZone })}
                title={loc.label}
                subtitle=""
                points={loc.pts}
              />
            ))}
          </div>
        );

      case 'result':
        return (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-center relative overflow-hidden text-white shadow-2xl shadow-indigo-900/50">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-[0.3em] mb-4">Total PNP Score</p>
              <div className="text-8xl font-black tracking-tighter leading-none mb-4">{results.total}</div>
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Max Possible: ~200
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Score Breakdown</h3>
              {[
                { label: 'Experience (A)', val: results.breakdown.experience },
                { label: 'Canadian Exp (B)', val: results.breakdown.canadianExp },
                { label: 'Current BC Job (C)', val: results.breakdown.currentBCJob },
                { label: 'Wage Points (D)', val: results.breakdown.wage },
                { label: 'Location (E)', val: results.breakdown.area },
                { label: 'Education (F)', val: results.breakdown.education },
                { label: 'CDN Education (G)', val: results.breakdown.canadianEducation },
                { label: 'Language (H)', val: results.breakdown.language },
                { label: 'Occupation Bonus (I)', val: results.breakdown.occupationBonus },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm font-bold text-slate-600">{item.label}</span>
                  <span className="font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg min-w-[3rem] text-center">
                    {item.val}
                  </span>
                </div>
              ))}
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
      <div className="max-w-md mx-auto w-full p-6 pt-8 flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">BC</div>
            <span className="font-extrabold text-slate-900 tracking-tight text-sm uppercase">PNP Calc 2026</span>
          </div>
          <div className="flex space-x-1">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </header>

        <div className="flex-1">
          {renderStep()}
        </div>

        {currentStep < STEPS.length - 1 && (
          <div className="pt-8">
            <button
              onClick={nextStep}
              className="w-full py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Next Step
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            {currentStep > 0 && (
              <button onClick={prevStep} className="w-full mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors">
                Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
