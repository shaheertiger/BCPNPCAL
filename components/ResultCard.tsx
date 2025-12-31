
import React from 'react';
import { PointsResult } from '../types';

interface Props {
  results: PointsResult;
  isUpdating?: boolean;
}

export const ResultCard: React.FC<Props> = ({ results, isUpdating }) => {
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
