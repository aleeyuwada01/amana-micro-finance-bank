
import React, { useState, useEffect } from 'react';
import { AppView, Language, AsusuGroup, AsusuContribution } from './types';
import Dashboard from './components/Dashboard';
import PRDView from './components/PRDView';
import AsusuViewComponent from './components/AsusuView';
import ProfileView from './components/ProfileView';
import LoanView from './components/LoanView';
import { AddMoneyView, TransferView } from './components/TransactionViews';
import { TRANSLATIONS } from './constants';

const LOGO_URL = 'https://i.ibb.co/XZcGL4t8/Adobe-Express-file-2.png';

const Splash: React.FC = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-between z-[100] overflow-hidden pt-20 pb-12 px-8 animate-in fade-in duration-1000">
    
    {/* Central Content */}
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[500px] -mt-10">
      {/* Logo */}
      <div className="relative w-full flex justify-center items-center mb-16 animate-in zoom-in-95 duration-1000 ease-out">
        <img 
          src={LOGO_URL} 
          alt="Amana Bank Logo" 
          className="w-[180px] aspect-square object-contain relative z-10 opacity-90"
        />
      </div>
      
      {/* Branding Text */}
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-emerald-950 font-black tracking-[0.5em] text-[15px] uppercase animate-in slide-in-from-bottom-2 duration-1000 delay-300 fill-mode-both">
          AMANA BANK
        </h2>
        
        <p className="text-gray-400 font-bold tracking-[0.25em] text-[8px] uppercase animate-in slide-in-from-bottom-2 duration-1000 delay-500 fill-mode-both">
          TRUST IN EVERY TRANSACTION
        </p>

        {/* Minimalist Loading Bar matching the image */}
        <div className="mt-10 w-[120px] h-[3px] bg-gray-50 rounded-full overflow-hidden relative">
          <div className="h-full bg-emerald-600 rounded-full animate-loading-simple"></div>
        </div>
      </div>
    </div>

    {/* Footer Credits for Splash screen */}
    <div className="w-full flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-700 fill-mode-both">
      <p className="text-[7px] font-black text-gray-300 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
        <span>LICENSED BY CBN</span>
        <span className="opacity-40">•</span>
        <span>INSURED BY NDIC</span>
      </p>
      
      <p className="text-[6px] font-black text-gray-300 uppercase tracking-[0.35em] text-center leading-relaxed opacity-60">
        PROTOTYPE DEVELOPED BY TRACEROOT TECHNOLOGY SOLUTIONS
      </p>
    </div>

    <style>{`
      @keyframes loading-simple {
        0% { transform: translateX(-100%); width: 30%; }
        50% { transform: translateX(50%); width: 60%; }
        100% { transform: translateX(200%); width: 30%; }
      }
      .animate-loading-simple {
        animation: loading-simple 2.5s infinite ease-in-out;
      }
    `}</style>
  </div>
);

const App: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [view, setView] = useState<AppView>('ONBOARDING');
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [bvn, setBvn] = useState('22233344455');
  const [isVerifying, setIsVerifying] = useState(false);
  const [balance, setBalance] = useState(45250);
  
  const t = TRANSLATIONS[language];

  const [asusuGroups, setAsusuGroups] = useState<AsusuGroup[]>([
    {
      id: '1',
      name: 'Katsina Market Women',
      contributionAmount: 5000,
      frequency: 'Weekly',
      members: ['Fatima Abdullahi', 'Zainab', 'Aisha', 'Hadiza', 'Mariya'],
      maxMembers: 5,
      currentTurnIndex: 0,
      status: 'Active',
      leaderId: 'Fatima Abdullahi',
      isWithdrawn: false,
      history: [
        { userId: 'Zainab', userName: 'Zainab', amount: 5000, timestamp: Date.now() - 86400000 },
        { userId: 'Aisha', userName: 'Aisha', amount: 5000, timestamp: Date.now() - 172800000 },
      ],
      createdAt: Date.now() - 10000000
    },
    {
      id: '2',
      name: 'Central Farmers Union',
      contributionAmount: 20000,
      frequency: 'Monthly',
      members: ['Bello', 'Umar'],
      maxMembers: 10,
      currentTurnIndex: 0,
      status: 'Filling',
      leaderId: 'Bello',
      isWithdrawn: false,
      history: [],
      createdAt: Date.now()
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = () => {
    if (!bvn) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setView('DASHBOARD');
    }, 1500);
  };

  const handleLogout = () => {
    setView('ONBOARDING');
  };

  const handleCreateGroup = (newGroup: Omit<AsusuGroup, 'id' | 'members' | 'currentTurnIndex' | 'status' | 'createdAt' | 'leaderId' | 'isWithdrawn' | 'history'>) => {
    const group: AsusuGroup = {
      ...newGroup,
      id: Math.random().toString(36).substr(2, 9),
      members: ['Fatima Abdullahi'],
      leaderId: 'Fatima Abdullahi',
      isWithdrawn: false,
      history: [],
      currentTurnIndex: 0,
      status: 'Filling',
      createdAt: Date.now(),
    };
    setAsusuGroups([group, ...asusuGroups]);
  };

  const handleJoinGroup = (groupId: string) => {
    setAsusuGroups(groups => groups.map(g => {
      if (g.id === groupId && g.members.length < g.maxMembers) {
        const updatedMembers = [...g.members, 'Fatima Abdullahi'];
        return { 
          ...g, 
          members: updatedMembers,
          status: updatedMembers.length === g.maxMembers ? 'Active' : g.status 
        };
      }
      return g;
    }));
  };

  const handleUpdateGroup = (groupId: string, updates: Partial<AsusuGroup>) => {
    setAsusuGroups(groups => groups.map(g => g.id === groupId ? { ...g, ...updates } : g));
  };

  const handleRemoveMember = (groupId: string, memberName: string) => {
    setAsusuGroups(groups => groups.map(g => {
      if (g.id === groupId) {
        const updatedMembers = g.members.filter(m => m !== memberName);
        return { 
          ...g, 
          members: updatedMembers,
          status: updatedMembers.length < g.maxMembers && g.status === 'Active' ? 'Filling' : g.status
        };
      }
      return g;
    }));
  };

  const handleContribute = (groupId: string) => {
    setAsusuGroups(groups => groups.map(g => {
      if (g.id === groupId) {
        setBalance(prev => prev - g.contributionAmount);
        const newContribution: AsusuContribution = {
          userId: 'Fatima Abdullahi',
          userName: 'Fatima Abdullahi',
          amount: g.contributionAmount,
          timestamp: Date.now()
        };
        const updatedHistory = [newContribution, ...g.history];
        const isLastToContribute = updatedHistory.length === g.maxMembers;
        return {
          ...g,
          history: updatedHistory,
          status: isLastToContribute ? 'Payout Due' : g.status
        };
      }
      return g;
    }));
  };

  const handleWithdraw = (groupId: string) => {
    setAsusuGroups(groups => groups.map(g => {
      if (g.id === groupId) {
        const totalPayout = g.contributionAmount * g.maxMembers;
        setBalance(prev => prev + totalPayout);
        return {
          ...g,
          status: 'Completed',
          isWithdrawn: true
        };
      }
      return g;
    }));
  };

  const handleTransfer = (amount: number) => {
    setBalance(prev => prev - amount);
    setView('DASHBOARD');
  };

  if (isInitialLoading) {
    return <Splash />;
  }

  return (
    <div className="flex flex-col h-[100dvh] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden bg-white">
      
      {/* FIXED TOP NAVIGATION */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md px-4 border-b border-gray-100 flex items-center justify-between z-[80] shadow-sm h-[72px] min-h-[72px] max-w-[450px] mx-auto">
        <div className="flex items-center h-full active:scale-95 transition-transform cursor-pointer" onClick={() => setView('DASHBOARD')}>
            <div className="w-24 h-24 flex items-center justify-center -ml-5 overflow-visible text-center">
              <img src={LOGO_URL} alt="Amana" className="w-full h-full object-contain pointer-events-none" />
            </div>
            <div className="flex flex-col justify-center -ml-2">
              <span className="font-black text-emerald-950 tracking-tighter text-lg leading-none uppercase">AMANA</span>
              <span className="text-[8px] text-gray-400 font-bold tracking-[0.2em] leading-none mt-1 uppercase">Microfinance</span>
            </div>
        </div>
        
        <div className="flex bg-gray-100 rounded-xl p-0.5 shadow-inner border border-gray-200">
          <button 
            onClick={() => setLanguage(Language.EN)}
            className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition-all duration-300 ${language === Language.EN ? 'bg-emerald-800 text-white shadow-md' : 'text-gray-400'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage(Language.HA)}
            className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition-all duration-300 ${language === Language.HA ? 'bg-emerald-800 text-white shadow-md' : 'text-gray-400'}`}
          >
            HA
          </button>
        </div>
      </div>

      {/* MASTER CONTENT AREA - FIXED LOCKING ISSUE */}
      <div className="flex-1 relative bg-[#F9FBFA] pt-[72px] overflow-y-auto overscroll-y-auto scroll-smooth -webkit-overflow-scrolling-touch">
          <div className={`${view === 'ONBOARDING' ? 'min-h-full' : 'min-h-full pb-32'}`}>
            {view === 'ONBOARDING' && (
              <div className="flex flex-col items-center justify-between min-h-full px-8 pt-0 pb-10 animate-in fade-in duration-700 relative overflow-hidden">
                {/* Branding Section - Proportional scaling */}
                <div className="w-full flex flex-col items-center justify-center flex-[1.4] py-8">
                  <div className="relative w-48 h-48 mb-2">
                    <div className="absolute inset-0 bg-emerald-100/30 rounded-full blur-[60px] opacity-40"></div>
                    <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain relative z-10 drop-shadow-xl animate-in zoom-in duration-1000" />
                  </div>
                  <div className="text-center px-2">
                    <h1 className="text-2xl font-black text-emerald-950 leading-tight tracking-tight uppercase">{t.onboardingTitle}</h1>
                    <p className="text-[12px] text-gray-400 font-bold max-w-[260px] mx-auto leading-relaxed mt-2 italic">{t.onboardingSub}</p>
                  </div>
                </div>

                {/* Interaction Section - Focused and centered */}
                <div className="w-full space-y-6 max-w-[320px] flex flex-col justify-center flex-1 pb-10">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.2em]">Identification</label>
                      <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">BVN REQUIRED</span>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/40 group-focus-within:text-emerald-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <input 
                        type="tel" 
                        value={bvn} 
                        onChange={(e) => setBvn(e.target.value)} 
                        placeholder={language === Language.HA ? "Lambar BVN" : "Enter BVN Number"} 
                        className="w-full p-5 pl-12 bg-white border-2 border-gray-100 rounded-3xl focus:border-emerald-600 focus:shadow-[0_0_20px_rgba(6,95,70,0.05)] outline-none transition-all duration-300 font-bold text-gray-800 text-base" 
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleVerify} 
                    disabled={isVerifying || bvn.length < 5} 
                    className="w-full bg-emerald-900 text-white py-5 rounded-3xl font-black text-sm shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-30 relative overflow-hidden"
                  >
                    <span className={`flex items-center justify-center gap-3 ${isVerifying ? 'opacity-0' : 'opacity-100 uppercase tracking-widest'}`}>
                      {t.secureLogin} <span className="text-lg">→</span>
                    </span>
                    {isVerifying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                {/* Mandatory Regulatory Footer Only */}
                <div className="w-full shrink-0 flex flex-col items-center gap-4 mt-8 pb-4">
                  <div className="flex items-center gap-4 py-3 px-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Licensed by CBN</p>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Insured by NDIC</p>
                  </div>
                </div>
              </div>
            )}

            {view === 'DASHBOARD' && <Dashboard language={language} onSetView={setView} logoUrl={LOGO_URL} asusuGroups={asusuGroups} balance={balance} />}
            {view === 'PRD' && <PRDView />}
            {view === 'ASUSU' && <AsusuViewComponent language={language} asusuGroups={asusuGroups} onCreateGroup={handleCreateGroup} onJoinGroup={handleJoinGroup} onContribute={handleContribute} onWithdraw={handleWithdraw} onUpdateGroup={handleUpdateGroup} onRemoveMember={handleRemoveMember} />}
            {view === 'PROFILE' && <ProfileView language={language} onLogout={handleLogout} />}
            {view === 'ADD_MONEY' && <AddMoneyView onBack={() => setView('DASHBOARD')} />}
            {view === 'TRANSFER' && <TransferView onBack={() => setView('DASHBOARD')} onTransfer={handleTransfer} balance={balance} />}
            {(view === 'LOAN_AGRI' || view === 'LOAN_TRADE') && <LoanView type={view === 'LOAN_AGRI' ? 'Agri' : 'Trade'} onBack={() => setView('DASHBOARD')} language={language} />}
          </div>
      </div>

      {/* FIXED BOTTOM NAVIGATION */}
      {view !== 'ONBOARDING' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-[80] rounded-t-[1.8rem] shadow-[0_-12px_40px_rgba(0,0,0,0.06)] h-[64px] max-w-[450px] mx-auto">
          {[
            { id: 'DASHBOARD', icon: (active: boolean) => (
              <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" /></svg>
            ), label: language === Language.HA ? 'Gida' : 'Home' },
            { id: 'ASUSU', icon: (active: boolean) => (
              <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ), label: 'Asusu' },
            { id: 'PRD', icon: (active: boolean) => (
              <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            ), label: language === Language.HA ? 'Dabarun' : 'Strategy' },
            { id: 'PROFILE', icon: (active: boolean) => (
              <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ), label: language === Language.HA ? 'Shafina' : 'Me' }
          ].map((nav) => (
            <button key={nav.id} onClick={() => setView(nav.id as AppView)} className={`flex flex-col items-center group transition-all duration-300 ${view === nav.id ? 'text-emerald-900' : 'text-gray-300 hover:text-gray-500'}`}>
              <div className={`p-1.5 rounded-xl transition-all duration-500 ${view === nav.id ? 'bg-emerald-50' : 'bg-transparent'}`}>{nav.icon(view === nav.id)}</div>
              <span className={`text-[8px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${view === nav.id ? 'opacity-100' : 'opacity-0'}`}>{nav.label}</span>
            </button>
          ))}
        </div>
      )}
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
