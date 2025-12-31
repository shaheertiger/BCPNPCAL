
import React, { useState, useEffect, useMemo } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultCard } from './components/ResultCard';
import { calculateTotalPoints } from './lib/pnp';
import { CalculatorState } from './types';

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

const App: React.FC = () => {
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
        {currentStep < STEPS.length - 1 ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <CalculatorForm 
              state={state} 
              onUpdate={handleUpdate} 
              step={STEPS[currentStep].id} 
              onNext={nextStep}
              onBack={currentStep > 0 ? prevStep : undefined}
            />
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <ResultCard 
              results={results} 
              isUpdating={isUpdating} 
            />
            <button 
              onClick={() => setCurrentStep(0)}
              className="mt-10 w-full py-4 text-slate-500 font-bold text-xs uppercase tracking-[0.3em] hover:text-red-600 transition-colors"
            >
              Start New Calculation
            </button>
          </div>
        )}
      </main>

      {/* Landing Page Content Section */}
      <section className="bg-white border-t border-red-100 pt-20 pb-48 px-6">
        <div className="max-w-3xl mx-auto space-y-20">
          {/* SEO Intro */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Using the <span className="text-red-600">BC PNP Calculator</span> for Your Immigration Strategy
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              The British Columbia Provincial Nominee Program (BC PNP) is a points-based immigration system designed to attract skilled workers to the province. Our <strong>BC PNP points calculator</strong> is an essential tool for prospective immigrants to estimate their Skills Immigration Ranking System (SIRS) score accurately. By understanding your <strong>BC PNP score calculator</strong> results, you can make informed decisions about your application strategy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                <h3 className="font-bold text-red-900 mb-2">How Points are Awarded</h3>
                <p className="text-sm text-slate-600">Points are distributed across economic factors (work experience, education, and language) and human capital factors (hourly wage and regional location).</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Maximum Points</h3>
                <p className="text-sm text-slate-600">The total possible score in the <strong>BC PNP point calculator</strong> is 200. Most successful candidates score between 100 and 130.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Frequently Asked Questions</h2>
              <div className="h-1 w-20 bg-red-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What is a competitive BC PNP score?",
                  a: "Draw scores fluctuate based on the specific stream (Tech, Healthcare, Childcare). Generally, a score above 115 is highly competitive, while scores between 95-110 are often sufficient for targeted draws."
                },
                {
                  q: "How often are BC PNP draws held?",
                  a: "BC typically conducts draws weekly, alternating between general draws and targeted draws for high-demand occupations like Tech, Healthcare, and Early Childhood Educators."
                },
                {
                  q: "Can I improve my score in the BC PNP points calculator?",
                  a: "Yes. The most effective ways to boost your <strong>bc pnp calculator</strong> result include obtaining a higher hourly wage, improving your CLB language results, or choosing a job offer in a regional district outside of Metro Vancouver."
                },
                {
                  q: "Does a high score guarantee an invitation?",
                  a: "While our <strong>bc pnp score calculator</strong> provides a reliable estimate, an invitation to apply (ITA) depends on your profile meeting the minimum cutoff for the specific draw period."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-extrabold text-slate-900 mb-3">{item.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }}></p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center pt-10 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.2em] leading-relaxed">
              Disclaimer: This BC PNP point calculator is for informational purposes only. Official scores are determined by the Province of British Columbia.
            </p>
          </div>
        </div>
      </section>

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

export default App;
