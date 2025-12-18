
import React, { useState, useEffect } from 'react';
import { AsusuGroup, AsusuContribution, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  asusuGroups: AsusuGroup[];
  onCreateGroup: (group: any) => void;
  onJoinGroup: (groupId: string) => void;
  onContribute: (groupId: string) => void;
  onWithdraw: (groupId: string) => void;
  onUpdateGroup: (groupId: string, updates: Partial<AsusuGroup>) => void;
  onRemoveMember: (groupId: string, memberName: string) => void;
  language: Language;
}

const AsusuView: React.FC<Props> = ({ 
  asusuGroups, 
  onCreateGroup, 
  onJoinGroup, 
  onContribute, 
  onWithdraw,
  onUpdateGroup,
  onRemoveMember,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [isCreating, setIsCreating] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contributionAmount: 1000,
    frequency: 'Weekly' as 'Daily' | 'Weekly' | 'Monthly',
    maxMembers: 5,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    asusuGroups.forEach(g => {
      const isMember = g.members.includes('Fatima Abdullahi');
      const hasNotContributed = !g.history.find(h => h.userId === 'Fatima Abdullahi');
      
      if (isMember && g.status === 'Active' && hasNotContributed && g.name !== 'Katsina Market Women') {
        showNotification(`It's your turn to contribute to "${g.name}"!`, 'info');
      }
      if (isMember && g.status === 'Payout Due') {
        showNotification(`Group "${g.name}" is ready for payout!`, 'success');
      }
    });
  }, [asusuGroups]);

  const showNotification = (message: string, type: 'success' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 3) errors.name = language === Language.HA ? "Sunan rukunin dole ya kai haruffa 3." : "Group name must be at least 3 characters.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onCreateGroup(formData);
      setIsCreating(false);
      showNotification(language === Language.HA ? "An bude asusu cikin nasara!" : "Asusu Group created successfully!", "success");
      setFormData({ name: '', contributionAmount: 1000, frequency: 'Weekly', maxMembers: 5 });
    }
  };

  const getStatusConfig = (status: AsusuGroup['status']) => {
    switch (status) {
      case 'Filling': 
        return { 
          color: 'bg-blue-100 text-blue-700 border-blue-200', 
          icon: '⏳',
          label: language === Language.HA ? 'Ana Tara Mutane' : 'Filling Group'
        };
      case 'Active': 
        return { 
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200', 
          icon: '⚡',
          label: language === Language.HA ? 'Ana Kan Yi' : 'Active Rotation'
        };
      case 'Payout Due': 
        return { 
          color: 'bg-amber-100 text-amber-700 border-amber-200 animate-pulse', 
          icon: '💰',
          label: language === Language.HA ? 'Lokacin Biyan Kudi' : 'Payout Ready'
        };
      case 'Completed': 
        return { 
          color: 'bg-gray-100 text-gray-500 border-gray-200', 
          icon: '✅',
          label: language === Language.HA ? 'An Kammala' : 'Cycle Completed'
        };
    }
  };

  const selectedGroup = asusuGroups.find(g => g.id === selectedGroupId);

  return (
    <div className="p-6 bg-transparent animate-in fade-in slide-in-from-right duration-500">
      {notification && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-3xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-top duration-300 ${notification.type === 'success' ? 'bg-emerald-900 text-white border-emerald-700' : 'bg-indigo-900 text-white border-indigo-700'}`}>
          <span className="text-xl">{notification.type === 'success' ? '🎉' : '🔔'}</span>
          <p className="text-sm font-black">{notification.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight">{t.asusuTitle}</h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest opacity-60">{t.communitySavings}</p>
        </div>
        {!isCreating && !selectedGroupId && (
          <button 
            onClick={() => setIsCreating(true)}
            className="w-12 h-12 bg-emerald-800 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 transition-transform"
          >
            <span className="text-2xl font-bold">+</span>
          </button>
        )}
        {selectedGroupId && (
          <button 
            onClick={() => setSelectedGroupId(null)}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
          >
            {language === Language.HA ? 'Koma' : 'Back'}
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-emerald-900 text-lg uppercase tracking-widest">{language === Language.HA ? 'Bude Sabon Rukuni' : 'New Group Setup'}</h3>
            <button onClick={() => setIsCreating(false)} className="text-gray-400 font-bold hover:text-emerald-900 transition-colors">{language === Language.HA ? 'Soke' : 'Cancel'}</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">{language === Language.HA ? 'Sunan Rukuni' : 'Group Name'}</label>
              <input 
                value={formData.name}
                onChange={e => { setFormData({...formData, name: e.target.value}); if(formErrors.name) setFormErrors({...formErrors, name: ''}); }}
                placeholder="e.g. Katsina Grains Society"
                className={`w-full p-5 bg-gray-50 rounded-3xl border-2 outline-none transition-all font-bold text-base ${formErrors.name ? 'border-rose-300 bg-rose-50' : 'border-transparent focus:border-emerald-500 focus:bg-white'}`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">{language === Language.HA ? 'Adadin Kudi' : 'Amount'}</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">₦</span>
                   <input 
                    type="number"
                    value={formData.contributionAmount}
                    onChange={e => setFormData({...formData, contributionAmount: Number(e.target.value)})}
                    className="w-full p-5 pl-10 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-base"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">{language === Language.HA ? 'Adadin Mutane' : 'Max Slots'}</label>
                <input 
                  type="number"
                  value={formData.maxMembers}
                  onChange={e => setFormData({...formData, maxMembers: Number(e.target.value)})}
                  className="w-full p-5 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-base"
                />
              </div>
            </div>
            
            <button className="w-full bg-emerald-900 text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all mt-4">
              {language === Language.HA ? 'Bude Asusun' : 'Launch Amana Group'}
            </button>
          </form>
        </div>
      ) : selectedGroupId && selectedGroup ? (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-10">
          <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative group">
             <div className={`p-6 border-b text-[11px] font-black uppercase tracking-widest flex justify-between items-center ${getStatusConfig(selectedGroup.status).color}`}>
                <div className="flex items-center gap-3">
                   <span className="text-xl">{getStatusConfig(selectedGroup.status).icon}</span>
                   <span>{getStatusConfig(selectedGroup.status).label}</span>
                </div>
                {selectedGroup.leaderId === 'Fatima Abdullahi' && (
                  <span className="bg-white/40 px-3 py-1 rounded-full border border-current scale-90">ADMIN</span>
                )}
             </div>

             <div className="p-8">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tight mb-2">{selectedGroup.name}</h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                   <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{language === Language.HA ? 'Jimillar Tarawa' : 'Pot Total'}</p>
                      <p className="text-xl font-black text-emerald-900 tabular-nums">₦{(selectedGroup.contributionAmount * selectedGroup.maxMembers).toLocaleString()}</p>
                   </div>
                   <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{language === Language.HA ? 'Kudin Zira' : 'Your Turn'}</p>
                      <p className="text-xl font-black text-emerald-900 tabular-nums">₦{selectedGroup.contributionAmount.toLocaleString()}</p>
                   </div>
                </div>

                <div className="mt-8 space-y-4">
                   <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">{language === Language.HA ? 'Mambobi' : 'Group Members'} ({selectedGroup.members.length}/{selectedGroup.maxMembers})</h4>
                   <div className="flex flex-wrap gap-2">
                      {selectedGroup.members.map((m, i) => (
                        <div key={i} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${m === 'Fatima Abdullahi' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-gray-600 border-gray-200'}`}>
                           <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${m === 'Fatima Abdullahi' ? 'bg-emerald-700' : 'bg-gray-100'}`}>
                              {m.charAt(0)}
                           </div>
                           {m === 'Fatima Abdullahi' ? (language === Language.HA ? 'Ni' : 'Me') : m}
                           {selectedGroup.leaderId === m && <span className="text-[8px] opacity-60">👑</span>}
                        </div>
                      ))}
                   </div>
                </div>

                {/* Admin Controls */}
                {selectedGroup.leaderId === 'Fatima Abdullahi' && selectedGroup.status !== 'Completed' && (
                  <div className="mt-10 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                     <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                        {language === Language.HA ? 'Ikon Gudanarwa' : 'Admin Controls'}
                     </h4>
                     <div className="grid grid-cols-2 gap-3">
                        {selectedGroup.status === 'Payout Due' && !selectedGroup.isWithdrawn ? (
                           <button 
                            onClick={() => onWithdraw(selectedGroup.id)}
                            className="col-span-2 bg-amber-500 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg active:scale-95 transition-all"
                           >
                              {language === Language.HA ? 'Biya kowa yanzu' : 'Disburse Payouts'}
                           </button>
                        ) : selectedGroup.status === 'Filling' && selectedGroup.members.length >= 2 ? (
                           <button 
                            onClick={() => onUpdateGroup(selectedGroup.id, { status: 'Active' })}
                            className="col-span-2 bg-emerald-800 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg active:scale-95 transition-all"
                           >
                              {language === Language.HA ? 'Fara Zagayen' : 'Force Start Cycle'}
                           </button>
                        ) : null}
                        <button className="bg-white text-emerald-900 border border-emerald-100 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                           {language === Language.HA ? 'Saita Group' : 'Group Settings'}
                        </button>
                        <button className="bg-white text-rose-500 border border-rose-100 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                           {language === Language.HA ? 'Kulle Group' : 'Close Group'}
                        </button>
                     </div>
                  </div>
                )}
             </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
             <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">{language === Language.HA ? 'Tarihin Biyan Kudi' : 'Contribution History'}</h4>
             {selectedGroup.history.length > 0 ? (
                <div className="space-y-4">
                   {selectedGroup.history.map((h, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xs font-black text-emerald-800">
                               {h.userName.charAt(0)}
                            </div>
                            <div>
                               <p className="text-sm font-black text-emerald-950 uppercase">{h.userName}</p>
                               <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{new Date(h.timestamp).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-emerald-700 tracking-tight">+₦{h.amount.toLocaleString()}</p>
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">SUCCESS</span>
                         </div>
                      </div>
                   ))}
                </div>
             ) : (
                <div className="py-12 text-center">
                   <div className="text-3xl mb-4 opacity-20">🕳️</div>
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{language === Language.HA ? 'Babu tarihin biya tukuna' : 'No contributions recorded yet'}</p>
                </div>
             )}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-emerald-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">{language === Language.HA ? 'Kudin da Aka Tara' : 'Active Savings'}</p>
               <h4 className="text-3xl font-black mt-2 tracking-tighter tabular-nums">₦{(asusuGroups.filter(g => g.members.includes('Fatima Abdullahi')).length * 5000 + 120000).toLocaleString()}</h4>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 relative group">
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{t.trustIndex}</p>
               <h4 className="text-3xl font-black mt-2 text-emerald-900 tracking-tighter italic">{language === Language.HA ? 'Yana Da Kyau' : 'Elite'}</h4>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] px-2 flex items-center justify-between">
              {t.activeRotations}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            
            {asusuGroups.map(group => {
              const isMember = group.members.includes('Fatima Abdullahi');
              const hasContributed = group.history.some(h => h.userId === 'Fatima Abdullahi');
              const statusCfg = getStatusConfig(group.status);
              const progress = (group.history.length / group.maxMembers) * 100;
              
              return (
                <div 
                  key={group.id} 
                  onClick={() => setSelectedGroupId(group.id)}
                  className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative group cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
                >
                  <div className={`py-4 px-8 border-b text-[10px] font-black uppercase tracking-widest flex justify-between items-center ${statusCfg.color}`}>
                    <div className="flex items-center gap-2">
                       <span className="text-sm">{statusCfg.icon}</span>
                       <span>{statusCfg.label}</span>
                    </div>
                    {group.leaderId === 'Fatima Abdullahi' && (
                       <span className="bg-white/40 px-2 py-0.5 rounded-md text-[8px] font-black">ADMIN</span>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="max-w-[65%]">
                        <h4 className="text-xl font-black text-emerald-950 tracking-tight leading-tight">{group.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{language === Language.HA ? 'Duk Mako' : group.frequency}</span>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{group.members.length}/{group.maxMembers} {language === Language.HA ? 'Mutane' : 'Members'}</span>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-emerald-950 tracking-tighter">₦{group.contributionAmount.toLocaleString()}</div>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{language === Language.HA ? 'Kudin Zira' : 'Per Turn'}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                       <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">
                          <span>{language === Language.HA ? 'An Biya' : 'Progress'}</span>
                          <span>{Math.round(progress)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                          <div className="h-full bg-emerald-600 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                       </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {group.status === 'Filling' && !isMember && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onJoinGroup(group.id); }} 
                          className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                          {t.joinGroup}
                        </button>
                      )}
                      
                      {group.status === 'Active' && isMember && !hasContributed && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onContribute(group.id); }} 
                          className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                          {t.contributeNow} (₦{group.contributionAmount.toLocaleString()})
                        </button>
                      )}

                      {group.status === 'Payout Due' && group.leaderId === 'Fatima Abdullahi' && !group.isWithdrawn && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onWithdraw(group.id); }} 
                          className="w-full bg-amber-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                          {language === Language.HA ? 'Fitar da kudin kowa' : 'Trigger Disbursment'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsusuView;
