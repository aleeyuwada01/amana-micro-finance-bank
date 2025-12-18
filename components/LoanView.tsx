
import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  type: 'Agri' | 'Trade';
  onBack: () => void;
  language: Language;
}

const LoanView: React.FC<Props> = ({ type, onBack, language }) => {
  const isAgri = type === 'Agri';
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(50000);
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-white animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center text-5xl mb-8 animate-bounce">✨</div>
        <h2 className="text-2xl font-black text-emerald-950 text-center mb-4 tracking-tight">Application Received!</h2>
        <p className="text-sm text-gray-500 text-center font-medium mb-12 leading-relaxed">
          Hikimar Amana AI is now analyzing your mobile data and trade history. You'll receive a decision via SMS within 2 hours.
        </p>
        <button 
          onClick={onBack}
          className="w-full bg-emerald-900 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F9FBFA] min-h-full animate-in slide-in-from-right duration-500 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-900 font-bold active:scale-90 transition-transform border border-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-xl font-black text-emerald-950 tracking-tight">{isAgri ? 'Agri-Loan' : 'Trade-Loan'} Application</h2>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-0.5">Katsina Economic Hub</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 ${isAgri ? 'bg-emerald-50' : 'bg-amber-50'} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60`}></div>
        
        <div className="relative z-10">
          <header className="flex items-center gap-6 mb-10">
            <div className={`w-16 h-16 ${isAgri ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'} rounded-3xl flex items-center justify-center text-4xl shadow-inner`}>
              {isAgri ? '🚜' : '🏪'}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pre-Eligibility Rank</p>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isAgri ? 'bg-emerald-900 text-white' : 'bg-amber-600 text-white'}`}>
                  Level {isAgri ? 'Gold' : 'Silver'}
                </span>
                <span className="text-[10px] font-bold text-gray-300">#42,000 Cap</span>
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block px-1">Requested Amount (₦)</label>
              <div className="relative">
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="5000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-emerald-800"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-[10px] font-black text-gray-300">₦5k</span>
                  <span className="text-2xl font-black text-emerald-950 tabular-nums tracking-tighter">₦{amount.toLocaleString()}</span>
                  <span className="text-[10px] font-black text-gray-300">₦100k</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Tenure</p>
                <p className="text-sm font-black text-emerald-900 uppercase">3 Months</p>
              </div>
              <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Interest Rate</p>
                <p className="text-sm font-black text-emerald-900 uppercase">1.2% p.m.</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
               <div className="flex items-start gap-4 p-5 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                 <span className="text-xl mt-0.5">🤖</span>
                 <p className="text-[11px] font-bold text-emerald-900 leading-snug">
                   Hikimar Amana AI has noticed your consistent weekly trade records at Katsina Central Market. This application is 94% likely to be approved.
                 </p>
               </div>
            </div>

            <button 
              onClick={handleApply}
              disabled={isApplying}
              className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${isAgri ? 'bg-emerald-900 text-white' : 'bg-amber-600 text-white'}`}
            >
              {isApplying ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>🚀 Submit Application</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4">Required Documents</h4>
        <div className="space-y-3">
          {[
            { label: 'BVN/NIN Verification', status: '✅ Verified' },
            { label: 'Market Association ID', status: '✅ Auto-Linked' },
            { label: 'Photo ID Check', status: '⏳ Required Next' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-[11px] font-black text-emerald-950 uppercase tracking-tight">{item.label}</span>
              <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanView;
