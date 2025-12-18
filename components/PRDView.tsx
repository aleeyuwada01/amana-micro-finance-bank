
import React from 'react';

const PRDView: React.FC = () => {
  return (
    <div className="p-8 bg-transparent animate-in fade-in duration-700">
      <div className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Product Strategy</h1>
        <div className="flex items-center justify-center gap-2">
          <div className="h-1 w-12 bg-emerald-800 rounded-full"></div>
          <p className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.3em]">Amana Microfinance Bank</p>
          <div className="h-1 w-12 bg-emerald-800 rounded-full"></div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-800"></div>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🎯</div>
            <h2 className="text-xl font-black text-emerald-950 tracking-tight uppercase">1. Executive Summary</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            A specialized mobile-first platform targeting unbanked MSMEs, local farmers, and women in Katsina. 
            The core mission is <strong>Trust ("Amana")</strong> through localized features and cultural relevance.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-800"></div>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🛣️</div>
            <h2 className="text-xl font-black text-indigo-950 tracking-tight uppercase">2. Onboarding Flow</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: "Localization", text: "Native Hausa/English selection at first touch." },
              { title: "Verification", text: "Instant BVN/NIN validation using central database." },
              { title: "Security", text: "Face-match biometrics against national records." },
              { title: "Digital Seal", text: "Final digital signature and secure 4-digit PIN." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs font-black text-indigo-800 bg-indigo-100 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">{i+1}</span>
                <div>
                  <h4 className="text-[11px] font-black text-indigo-950 uppercase tracking-widest">{step.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-600"></div>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🤝</div>
            <h2 className="text-xl font-black text-amber-950 tracking-tight uppercase">3. Amana Asusu</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Digital transformation of traditional <strong>'Asusu/Ajo'</strong>. 
            Automated group rotations, guaranteed escrow safety, and instant peer-to-peer payout notifications.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="text-[9px] font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">Group Escrow</span>
            <span className="text-[9px] font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">Auto-Rotate</span>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🤖</div>
            <h2 className="text-xl font-black text-emerald-950 tracking-tight uppercase">4. AI Micro-Credit</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Leveraging <strong>Gemini AI</strong> for trust scoring using non-traditional data points.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {["Airtime History", "Utility Bills", "Location Stability", "Social Trust"].map((tag, i) => (
              <li key={i} className="flex items-center gap-2 text-[10px] font-black text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-100 uppercase tracking-tight">
                <span className="text-sm">⚡</span> {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-rose-700"></div>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">📶</div>
            <h2 className="text-xl font-black text-rose-950 tracking-tight uppercase">5. Offline Capability</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium mb-4">
            Deep <strong>USSD integration (*7006#)</strong> ensures banking availability in areas with weak coverage.
          </p>
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center italic text-xs font-bold text-rose-900">
             "Syncs instantly upon data restoration."
          </div>
        </div>
      </div>
    </div>
  );
};

export default PRDView;
