
import React, { useState, useEffect } from 'react';
import { AsusuGroup, AsusuContribution } from '../types';

interface Props {
  asusuGroups: AsusuGroup[];
  onCreateGroup: (group: any) => void;
  onJoinGroup: (groupId: string) => void;
  onContribute: (groupId: string) => void;
  onWithdraw: (groupId: string) => void;
}

const AsusuView: React.FC<Props> = ({ asusuGroups, onCreateGroup, onJoinGroup, onContribute, onWithdraw }) => {
  const [isCreating, setIsCreating] = useState(false);
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
      
      // Hide notification specifically for 'Katsina Market Women' contribution turn
      if (isMember && g.status === 'Active' && hasNotContributed && g.name !== 'Katsina Market Women') {
        showNotification(`It's your turn to contribute to "${g.name}"!`, 'info');
      }
      if (isMember && g.status === 'Payout Due') {
        showNotification(`Group "${g.name}" is ready for payout!`, 'success');
      }
    });
  }, []);

  const showNotification = (message: string, type: 'success' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 3) errors.name = "Group name must be at least 3 characters.";
    if (formData.contributionAmount < 500) errors.amount = "Minimum contribution is ₦500.";
    if (formData.maxMembers < 2) errors.members = "Must have at least 2 members.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onCreateGroup(formData);
      setIsCreating(false);
      showNotification("Asusu Group created successfully!", "success");
      setFormData({ name: '', contributionAmount: 1000, frequency: 'Weekly', maxMembers: 5 });
    }
  };

  const getStatusColor = (status: AsusuGroup['status']) => {
    switch (status) {
      case 'Filling': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Payout Due': return 'bg-amber-100 text-amber-700 border-amber-200 animate-bounce';
      case 'Completed': return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="p-6 bg-[#F9FBFA] min-h-full animate-in fade-in slide-in-from-right duration-500 pb-32">
      {notification && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-3xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-top duration-300 ${notification.type === 'success' ? 'bg-emerald-900 text-white border-emerald-700' : 'bg-indigo-900 text-white border-indigo-700'}`}>
          <span className="text-xl">{notification.type === 'success' ? '🎉' : '🔔'}</span>
          <p className="text-sm font-black">{notification.message}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Amana Asusu</h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest opacity-60">Digital Community Savings</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="w-12 h-12 bg-emerald-800 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 transition-transform"
          >
            <span className="text-2xl font-bold">+</span>
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-emerald-900 text-lg uppercase tracking-widest">Create New Group</h3>
            <button onClick={() => setIsCreating(false)} className="text-gray-400 font-bold hover:text-emerald-900 transition-colors">Cancel</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1 transition-colors group-focus-within:text-emerald-600">Group Name</label>
              <input 
                value={formData.name}
                onChange={e => { setFormData({...formData, name: e.target.value}); if(formErrors.name) setFormErrors({...formErrors, name: ''}); }}
                placeholder="e.g. Sabon Gari Farmers"
                className={`w-full p-5 bg-gray-50 rounded-3xl border-2 outline-none transition-all font-bold ${formErrors.name ? 'border-rose-300 bg-rose-50' : 'border-transparent focus:border-emerald-500 focus:bg-white'}`}
              />
              {formErrors.name && <p className="text-[9px] text-rose-500 font-bold mt-1 ml-4">{formErrors.name}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Amount (₦)</label>
                <input 
                  type="number"
                  value={formData.contributionAmount}
                  onChange={e => { setFormData({...formData, contributionAmount: Number(e.target.value)}); if(formErrors.amount) setFormErrors({...formErrors, amount: ''}); }}
                  className={`w-full p-5 bg-gray-50 rounded-3xl border-2 outline-none transition-all font-bold ${formErrors.amount ? 'border-rose-300 bg-rose-50' : 'border-transparent focus:border-emerald-500 focus:bg-white'}`}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Max Members</label>
                <input 
                  type="number"
                  value={formData.maxMembers}
                  onChange={e => { setFormData({...formData, maxMembers: Number(e.target.value)}); if(formErrors.members) setFormErrors({...formErrors, members: ''}); }}
                  className={`w-full p-5 bg-gray-50 rounded-3xl border-2 outline-none transition-all font-bold ${formErrors.members ? 'border-rose-300 bg-rose-50' : 'border-transparent focus:border-emerald-500 focus:bg-white'}`}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Contribution Cycle</label>
              <div className="flex gap-2">
                {['Daily', 'Weekly', 'Monthly'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormData({...formData, frequency: f as any})}
                    className={`flex-1 py-4 rounded-2xl font-black text-[11px] transition-all uppercase tracking-widest ${formData.frequency === f ? 'bg-emerald-900 text-white shadow-xl' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-emerald-900 text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-900/20 active:scale-95 transition-all mt-4">
              Initialize Group
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-emerald-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Total Saved</p>
               <h4 className="text-3xl font-black mt-2 tracking-tighter tabular-nums">₦145k</h4>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 relative group">
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Next Payout</p>
               <h4 className="text-3xl font-black mt-2 text-emerald-900 tracking-tighter italic">Feb 28</h4>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] px-2 flex items-center justify-between">
              Active Rotations
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            
            {asusuGroups.map(group => {
              const isMember = group.members.includes('Fatima Abdullahi');
              const isLeader = group.leaderId === 'Fatima Abdullahi';
              const hasContributed = group.history.some(h => h.userId === 'Fatima Abdullahi');
              
              return (
                <div key={group.id} className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative group transition-all duration-700 hover:shadow-2xl">
                  <div className={`py-2 px-6 border-b text-[10px] font-black uppercase tracking-widest flex justify-between items-center ${getStatusColor(group.status)}`}>
                    <span>Status: {group.status}</span>
                    {isLeader && <span className="text-[8px] bg-white/50 px-2 rounded-full border border-current opacity-70">Group Leader</span>}
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-black text-emerald-950 tracking-tight leading-none">{group.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{group.frequency} Contribution</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{group.members.length}/{group.maxMembers} Members</span>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-emerald-950 tracking-tighter">₦{group.contributionAmount.toLocaleString()}</div>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Required Turn</p>
                      </div>
                    </div>

                    <div className="mb-6 space-y-2">
                       <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <span>Progress</span>
                          <span>{Math.round((group.history.length / group.maxMembers) * 100)}%</span>
                       </div>
                       <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                          <div 
                            className="h-full bg-emerald-700 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(6,95,70,0.3)]"
                            style={{ width: `${(group.history.length / group.maxMembers) * 100}%` }}
                          />
                       </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {group.status === 'Filling' && !isMember && (
                        <button onClick={() => { onJoinGroup(group.id); showNotification(`Joined ${group.name}!`, 'success'); }} className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                          Join Group
                        </button>
                      )}
                      
                      {group.status === 'Active' && isMember && !hasContributed && (
                        <button onClick={() => { onContribute(group.id); showNotification(`Contributed ₦${group.contributionAmount} to ${group.name}!`, 'success'); }} className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3">
                          💸 Contribute Now
                        </button>
                      )}

                      {group.status === 'Payout Due' && isLeader && !group.isWithdrawn && (
                         <button onClick={() => { onWithdraw(group.id); showNotification(`Withdrawal initiated for ${group.name}! ₦${group.contributionAmount * group.maxMembers} sent to your wallet.`, 'success'); }} className="w-full bg-amber-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                           🏦 Withdraw Total: ₦{(group.contributionAmount * group.maxMembers).toLocaleString()}
                         </button>
                      )}

                      {group.status === 'Payout Due' && isMember && !isLeader && (
                         <div className="w-full bg-emerald-50 text-emerald-800 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center border border-emerald-100 italic">
                            Awaiting leader payout...
                         </div>
                      )}

                      {group.status === 'Completed' && (
                         <div className="w-full bg-gray-50 text-gray-400 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center border border-gray-100 flex items-center justify-center gap-2">
                           ✅ Payout Disbursed
                         </div>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-between">
                        Contribution History
                        <span className="text-[9px] bg-gray-50 px-2 py-0.5 rounded-full">{group.history.length} Done</span>
                      </h5>
                      {group.history.length > 0 ? (
                        <div className="space-y-2">
                          {group.history.map((h, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-800">
                                  {h.userName.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-xs font-black text-emerald-950 leading-none">{h.userName}</p>
                                  <p className="text-[9px] text-gray-400 mt-1">{new Date(h.timestamp).toLocaleDateString()} · {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-black text-emerald-700 tracking-tighter">+₦{h.amount.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-gray-400 text-center italic py-4">No contributions yet.</p>
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
