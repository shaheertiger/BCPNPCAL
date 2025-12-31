
import React from 'react';
import { CalculatorState, EducationLevel, AreaZone } from '../types';

interface Props {
  state: CalculatorState;
  onUpdate: (updates: Partial<CalculatorState>) => void;
  step: string;
  onNext: () => void;
  onBack?: () => void;
}

export const CalculatorForm: React.FC<Props> = ({ state, onUpdate, step, onNext, onBack }) => {
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

  const renderStep = () => {
    switch (step) {
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
                onChange={(e) => onUpdate({ experience: { ...state.experience, years: parseInt(e.target.value) } })}
                className="w-full h-4 bg-red-50 rounded-full appearance-none cursor-pointer accent-red-600 mb-8"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>0 years</span>
                <span>5+ years</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => onUpdate({ experience: { ...state.experience, hasCanadianExp: !state.experience.hasCanadianExp } })}
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
                onClick={() => onUpdate({ experience: { ...state.experience, hasCurrentBCJob: !state.experience.hasCurrentBCJob } })}
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
                onClick={() => onUpdate({ education: edu.id as EducationLevel })}
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
                  onClick={() => onUpdate({ language: lvl })}
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
                onChange={(e) => onUpdate({ wage: parseFloat(e.target.value) })}
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
                onClick={() => onUpdate({ area: loc.id as AreaZone })}
                title={loc.label}
                subtitle={loc.sub}
                points={loc.pts}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {onBack && (
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-slate-500 hover:text-red-600 transition-all py-2 px-1 active:translate-x-[-8px] group"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-sm mr-4 group-hover:border-red-200 group-hover:text-red-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back</span>
        </button>
      )}
      {renderStep()}
    </div>
  );
};
