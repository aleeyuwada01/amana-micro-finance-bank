
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  onLogout: () => void;
  language: Language;
}

const ProfileView: React.FC<Props> = ({ onLogout, language }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="p-8 animate-in slide-in-from-bottom duration-700 pb-32">
      <div className="text-center mb-10">
         <h2 className="text-xl font-black text-emerald-950 tracking-widest uppercase mb-2">{t.profileTitle}</h2>
         <div className="h-1 w-12 bg-emerald-800 mx-auto rounded-full"></div>
      </div>

      <div className="relative mb-12">
        <div className="absolute -inset-4 bg-gradient-to-br from-emerald-600/20 to-teal-400/20 rounded-[4rem] blur-2xl opacity-50"></div>
        <div className="relative bg-emerald-900 rounded-[3.5rem] p-10 text-white shadow-2xl overflow-hidden group">
          <div className="flex flex-col items-center relative z-10">
            <div className="relative mb-6">
              <div className="relative w-28 h-28 bg-white/20 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center border-2 border-white/40 shadow-2xl">
                <span className="text-4xl font-black tracking-tighter">FA</span>
              </div>
            </div>

            <h3 className="text-2xl font-black tracking-tight mb-1">Fatima Abdullahi</h3>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-300">
                {language === Language.HA ? "Babban Dan Kasuwa" : "Merchant Level 2"}
              </p>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center flex flex-col items-center">
                 <span className="text-[9px] font-black uppercase opacity-60 tracking-[0.2em] mb-2">{t.trustIndex}</span>
                 <span className="text-2xl font-black text-emerald-400">92%</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center flex flex-col items-center">
                 <span className="text-[9px] font-black uppercase opacity-60 tracking-[0.2em] mb-2">{t.katsinaRank}</span>
                 <span className="text-2xl font-black text-emerald-400">#42</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { icon: '🛡️', title: language === Language.HA ? 'Tsaro da PIN' : 'Security & PIN', text: language === Language.HA ? 'Gyara sirrin shiga' : 'Update biometric access' },
          { icon: '📜', title: language === Language.HA ? 'Rahoton Kudi' : 'Statements', text: language === Language.HA ? 'Duba tarihin ma\'amala' : 'Monthly transaction records' },
          { icon: '📞', title: language === Language.HA ? 'Neman Taimako' : 'Help Center', text: language === Language.HA ? 'Tallafi a Katsina 24/7' : '24/7 Katsina Branch Support' },
        ].map((item, i) => (
          <button key={i} className="w-full bg-white p-6 rounded-[2.5rem] border border-gray-100 flex items-center justify-between group hover:shadow-lg transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-emerald-50 transition-all">{item.icon}</div>
              <div>
                <h4 className="font-black text-emerald-950 text-sm tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full mt-10 p-6 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[11px] uppercase tracking-[0.4em] rounded-[2.5rem] transition-all flex items-center justify-center gap-3 border border-rose-100"
      >
        {t.logout}
      </button>
    </div>
  );
};

export default ProfileView;
