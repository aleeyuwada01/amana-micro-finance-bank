
import React, { useState } from 'react';

interface AddMoneyProps {
  onBack: () => void;
}

export const AddMoneyView: React.FC<AddMoneyProps> = ({ onBack }) => {
  const accountDetails = {
    bank: 'Amana Microfinance Bank',
    accountNumber: '2233445566',
    accountName: 'FATIMA ABDULLAHI'
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-[#F9FBFA] min-h-full animate-in slide-in-from-right duration-500 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-900 font-bold active:scale-90 transition-transform border border-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-xl font-black text-emerald-950 tracking-tight">Add Money</h2>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-0.5">Top up your wallet</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-4xl mx-auto shadow-inner mb-4">🏦</div>
          <h3 className="text-lg font-black text-emerald-950 uppercase tracking-tight">Transfer to Account</h3>
          <p className="text-xs text-gray-500 font-medium">Use the details below to transfer money from any bank in Nigeria to your Amana wallet.</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Bank Name</p>
            <p className="text-sm font-black text-emerald-950 uppercase">{accountDetails.bank}</p>
          </div>

          <div className="p-5 bg-emerald-900 rounded-3xl border border-emerald-800 flex justify-between items-center group">
            <div>
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Account Number</p>
              <p className="text-2xl font-black text-white tracking-widest tabular-nums">{accountDetails.accountNumber}</p>
            </div>
            <button 
              onClick={copyToClipboard}
              className={`p-3 rounded-2xl transition-all ${copied ? 'bg-emerald-400 text-emerald-950' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {copied ? 'Copied!' : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>

          <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Account Name</p>
            <p className="text-sm font-black text-emerald-950 uppercase">{accountDetails.accountName}</p>
          </div>
        </div>

        <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100 flex gap-4">
          <span className="text-xl">ℹ️</span>
          <p className="text-[11px] font-bold text-amber-900 leading-snug">
            Transfers are usually instant. If you don't see your balance update in 15 minutes, please contact Amana support in Katsina.
          </p>
        </div>
      </div>
    </div>
  );
};

interface TransferProps {
  onBack: () => void;
  onTransfer: (amount: number) => void;
  balance: number;
}

export const TransferView: React.FC<TransferProps> = ({ onBack, onTransfer, balance }) => {
  const [bankSearch, setBankSearch] = useState('');
  const [isBankSelectorOpen, setIsBankSelectorOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<{name: string, id: string} | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const banks = [
    { name: 'Access Bank', id: 'access' },
    { name: 'Amana Microfinance', id: 'amana' },
    { name: 'Fidelity Bank', id: 'fidelity' },
    { name: 'GTBank', id: 'gtb' },
    { name: 'Kuda Bank', id: 'kuda' },
    { name: 'Moniepoint', id: 'moniepoint' },
    { name: 'OPay', id: 'opay' },
    { name: 'United Bank for Africa', id: 'uba' },
    { name: 'Zenith Bank', id: 'zenith' },
  ];

  const filteredBanks = banks.filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase()));

  const handleTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onTransfer(Number(amount));
    }, 2000);
  };

  return (
    <div className="p-6 bg-[#F9FBFA] min-h-full animate-in slide-in-from-right duration-500 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-900 font-bold active:scale-90 transition-transform border border-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-xl font-black text-emerald-950 tracking-tight">Transfer Money</h2>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-0.5">Send funds securely</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-6">
        {/* Beautiful Custom Bank Selector */}
        <div className="relative">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Choose Recipient Bank</label>
          <button 
            onClick={() => setIsBankSelectorOpen(!isBankSelectorOpen)}
            className="w-full p-5 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-sm text-left flex justify-between items-center"
          >
            <span className={selectedBank ? 'text-emerald-950' : 'text-gray-400'}>
              {selectedBank ? selectedBank.name : 'Search or Select Bank'}
            </span>
            <svg className={`w-5 h-5 transition-transform ${isBankSelectorOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isBankSelectorOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[2rem] shadow-3xl border border-gray-100 z-[100] p-4 animate-in slide-in-from-top-2 duration-300">
              <div className="relative mb-4">
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
                 <input 
                  autoFocus
                  placeholder="Type bank name..."
                  className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-none outline-none font-bold text-base"
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                 />
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredBanks.map(bank => (
                  <button 
                    key={bank.id}
                    onClick={() => {
                      setSelectedBank(bank);
                      setIsBankSelectorOpen(false);
                      setBankSearch('');
                    }}
                    className="w-full p-4 text-left font-black text-[11px] uppercase tracking-widest text-emerald-950 hover:bg-emerald-50 rounded-2xl transition-colors flex items-center justify-between"
                  >
                    {bank.name}
                    {selectedBank?.id === bank.id && <span className="text-emerald-600">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Account Number</label>
          <input 
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="0000000000"
            className="w-full p-5 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-base tracking-widest"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Amount (₦)</label>
          <div className="relative">
             <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-emerald-900">₦</span>
             <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-5 pl-10 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-xl tabular-nums"
            />
          </div>
          <div className="flex justify-between mt-2 px-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Balance</span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">₦{balance.toLocaleString()}</span>
          </div>
        </div>

        {accountNumber.length === 10 && selectedBank && (
           <div className="p-5 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center justify-between animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-white text-[10px] font-black">MI</div>
                 <div>
                    <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest block">Recipient Name</span>
                    <span className="text-sm font-black text-emerald-950 uppercase">Musa Ibrahim</span>
                 </div>
              </div>
              <div className="bg-emerald-900 w-6 h-6 rounded-full flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
           </div>
        )}

        <button 
          onClick={handleTransfer}
          disabled={!amount || !accountNumber || !selectedBank || isProcessing || Number(amount) > balance}
          className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 mt-4 ${Number(amount) > balance || !selectedBank ? 'bg-rose-100 text-rose-400 cursor-not-allowed shadow-none' : 'bg-emerald-900 text-white'}`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Authenticating...</span>
            </>
          ) : (
            Number(amount) > balance ? 'Insufficient Balance' : 'Send Payment'
          )}
        </button>
      </div>

      {/* Redesigned Premium Trusted Recipients Slider */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8 px-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-emerald-600 rounded-full"></div>
            <h4 className="text-[11px] font-black text-emerald-950 uppercase tracking-[0.2em]">Trusted Recipients</h4>
          </div>
          <button className="text-[9px] font-black text-emerald-700 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">See All</button>
        </div>

        <div className="relative group">
          {/* Subtle Mask Fades to indicate scrolling */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F9FBFA] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F9FBFA] to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-4 overflow-x-auto pb-8 px-6 no-scrollbar snap-x scroll-smooth">
            {/* Action Card: Add New */}
            <div className="flex flex-col items-center gap-4 shrink-0 snap-start">
               <button className="w-20 h-24 bg-white border-2 border-dashed border-gray-100 rounded-[2.2rem] flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-50/30 group/add active:scale-95 shadow-sm hover:shadow-lg">
                  <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center group-hover/add:bg-emerald-100 transition-colors">
                     <svg className="w-5 h-5 text-gray-400 group-hover/add:text-emerald-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                     </svg>
                  </div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover/add:text-emerald-700 transition-colors">Add</span>
               </button>
            </div>

            {[
              { name: 'Aisha', initial: 'A', color: 'from-emerald-800 to-emerald-950', textColor: 'text-white', sub: 'Verified' },
              { name: 'Hadiza', initial: 'H', color: 'from-rose-50 to-rose-100', textColor: 'text-rose-700', sub: 'Sister' },
              { name: 'Umar', initial: 'U', color: 'from-indigo-50 to-indigo-100', textColor: 'text-indigo-700', sub: 'Partner' },
              { name: 'Bello', initial: 'B', color: 'from-amber-50 to-amber-100', textColor: 'text-amber-700', sub: 'Client' },
              { name: 'Zainab', initial: 'Z', color: 'from-teal-50 to-teal-100', textColor: 'text-teal-700', sub: 'Vendor' },
            ].map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-4 shrink-0 snap-start">
                 <button className="w-24 h-32 bg-white rounded-[2.5rem] p-1 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group/card active:scale-95 border border-gray-50 relative overflow-hidden">
                    {/* Tiny decorative status dot */}
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                    
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                       <div className={`w-14 h-14 bg-gradient-to-br ${r.color} ${r.textColor} rounded-[1.5rem] shadow-sm flex items-center justify-center text-xl font-black group-hover/card:scale-105 transition-transform duration-500`}>
                          {r.initial}
                       </div>
                       <div className="text-center">
                          <p className="text-[10px] font-black text-emerald-950 uppercase tracking-wider group-hover/card:text-emerald-700 transition-colors">{r.name}</p>
                          <p className="text-[7px] font-black text-gray-300 uppercase tracking-[0.2em] mt-1">{r.sub}</p>
                       </div>
                    </div>
                 </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
