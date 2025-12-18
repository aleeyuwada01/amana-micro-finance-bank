
import React, { useState, useEffect } from 'react';
import { TranslationSet, Language, AsusuGroup } from '../types';
import { TRANSLATIONS } from '../constants';
import { getFinancialAdvice } from '../services/geminiService';

interface Props {
  language: Language;
  onSetView: (view: any) => void;
  logoUrl: string;
  asusuGroups: AsusuGroup[];
  balance: number;
}

const Dashboard: React.FC<Props> = ({ language, onSetView, logoUrl, asusuGroups, balance }) => {
  const t = TRANSLATIONS[language];
  const [showBalance, setShowBalance] = useState(true);
  const [adviceData, setAdviceData] = useState<{score: number, rating: string, wealthTip: string, marketOutlook: string} | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const fetchAdvice = async () => {
    setLoadingAdvice(true);
    const context = language === Language.HA ? "Fatima 'yar kasuwa ce a Katsina, tana ajiye 5000 duk mako." : "Fatima is a market trader in Katsina, she saves 5000 weekly.";
    const result = await getFinancialAdvice(context);
    setAdviceData(result);
    setLoadingAdvice(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, [language]);

  return (
    <div className="flex flex-col bg-transparent animate-in fade-in duration-1000 pb-10">
      
      {/* Wallet Card Section */}
      <div className="px-6 py-4">
        <div className="bg-gradient-to-br from-[#065f46] via-[#065f46] to-[#042f2e] p-7 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(6,95,70,0.3)] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-1000"></div>
          
          <div className="flex justify-between items-start mb-1">
             <p className="text-[11px] font-bold opacity-70 tracking-widest uppercase">{t.totalBalance}</p>
          </div>
          
          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-xl font-medium opacity-60">₦</span>
            <h2 className="text-3xl font-black tracking-tighter tabular-nums">
              {showBalance ? `${balance.toLocaleString()}.00` : '••••••••'}
            </h2>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="ml-3 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              {showBalance ? (
                <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3.29m17.42 17.42L14.12 14.12" /></svg>
              )}
            </button>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <button 
              onClick={() => onSetView('ADD_MONEY')}
              className="flex-1 bg-[#10b981] hover:bg-emerald-400 text-white py-4 rounded-2xl text-[13px] font-black shadow-lg active:scale-95 transition-all border border-emerald-400/20 uppercase tracking-widest"
            >
              {t.addMoney}
            </button>
            <button 
              onClick={() => onSetView('TRANSFER')}
              className="flex-1 bg-white hover:bg-gray-50 text-[#065f46] py-4 rounded-2xl text-[13px] font-black shadow-lg active:scale-95 transition-all uppercase tracking-widest"
            >
              {t.transfer}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="px-6 mt-10 mb-6">
        <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] opacity-80 px-1">{t.quickActions}</h3>
      </div>

      <div className="px-6 grid grid-cols-4 gap-4">
        {[
          { icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
            </svg>
          ), label: t.businessLoan, color: 'text-emerald-700', bg: 'bg-[#f0fdf4]', border: 'border-emerald-100', view: 'LOAN_TRADE' },
          { icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ), label: t.groupSavings, color: 'text-blue-700', bg: 'bg-[#f0f9ff]', border: 'border-blue-100', view: 'ASUSU' },
          { icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ), label: t.billPayments, color: 'text-amber-700', bg: 'bg-[#fffbeb]', border: 'border-amber-100', view: 'DASHBOARD' },
          { icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M11 18H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4" />
              <path d="M15 11h3a2 2 0 0 1 2 2v3" />
              <path d="M11 11v-4a1 1 0 0 1 1-1h3" />
              <path d="M11 14h2" />
            </svg>
          ), label: t.agriSupport, color: 'text-indigo-700', bg: 'bg-[#f5f3ff]', border: 'border-indigo-100', view: 'LOAN_AGRI' },
        ].map((action, i) => (
          <button 
            key={i} 
            onClick={() => onSetView(action.view)}
            className="flex flex-col items-center gap-3 group active:scale-95 transition-all"
          >
            <div className={`${action.bg} ${action.color} ${action.border} w-full aspect-square rounded-[1.5rem] flex items-center justify-center shadow-sm border transition-all group-hover:shadow-md group-hover:-translate-y-1`}>
              {action.icon}
            </div>
            <span className="text-[9px] font-black text-gray-500 text-center leading-tight uppercase tracking-tight opacity-70 group-hover:opacity-100">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Recent Transactions Section */}
      <div className="px-6 mt-12 mb-5 flex justify-between items-center">
        <h3 className="text-xs font-black text-gray-950 uppercase tracking-[0.2em] opacity-80 px-1">{t.recentTransactions}</h3>
        <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest hover:underline">{t.seeAll}</button>
      </div>
      
      <div className="px-6 space-y-4">
        {[
          { title: language === Language.HA ? 'An Biya Rance' : 'Loan Disbursement', date: 'Yesterday', amount: '+₦50,000.00', type: 'in', icon: '💼', iconBg: 'bg-emerald-50 text-emerald-600' },
          { title: language === Language.HA ? 'Kudin Lantarki' : 'Electricity Bill', date: 'Today', amount: '-₦4,200.00', type: 'out', icon: '⚡', iconBg: 'bg-rose-50 text-rose-600' },
          { title: language === Language.HA ? 'Ajiyar Asusun Amana' : 'Group Savings Deposit', date: '2 days ago', amount: '+₦15,000.00', type: 'in', icon: '💰', iconBg: 'bg-emerald-50 text-emerald-600' },
        ].map((tx, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${tx.iconBg}`}>
                {tx.icon}
              </div>
              <div>
                <h4 className="text-[13px] font-black text-emerald-950 tracking-tight leading-none mb-1.5">{tx.title}</h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{tx.date}</p>
              </div>
            </div>
            <div className={`text-sm font-black tabular-nums tracking-tighter ${tx.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Hikimar Amana AI Engine - UPDATED LABEL */}
      <div className="px-6 mt-12 mb-10">
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-emerald-300/30 rounded-[3rem] blur-2xl opacity-50 transition-opacity group-hover:opacity-80"></div>
          <div className="relative bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#059669] rounded-[3rem] p-10 text-white shadow-3xl overflow-hidden border border-white/10">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-black text-white text-sm tracking-tight uppercase leading-none mb-1">{t.hikimarAmana}</h3>
                <p className="text-[9px] font-black text-emerald-200 uppercase tracking-[0.4em]">POWERED BY AI</p>
              </div>
            </div>
            
            {loadingAdvice ? (
              <div className="h-40 bg-black/10 rounded-[2rem] animate-pulse flex items-center justify-center border border-white/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2.2rem] border border-white/10 min-h-[150px] flex items-start gap-5 group/box hover:bg-white/15 transition-all duration-500 shadow-inner relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg border border-white/10 group-hover/box:scale-110 transition-transform">💡</div>
                <div className="flex-1">
                  <h4 className="text-[10px] font-black text-emerald-100/80 uppercase tracking-[0.2em] mb-3 px-1">{t.strategyInsight}</h4>
                  <p className="text-sm font-bold text-white leading-relaxed tracking-tight">
                    {adviceData?.wealthTip || "Unlock tailored business advice by tapping the button below."}
                  </p>
                </div>
              </div>
            )}
            
            <button 
              onClick={fetchAdvice}
              className="mt-8 w-full bg-white hover:bg-emerald-50 text-[#065f46] py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative z-10"
            >
              <span>{t.getAdvice}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
