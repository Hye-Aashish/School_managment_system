"use client";
import React, { useState, useEffect } from "react";

export default function IssueItem() {
     const [items, setItems] = useState<any[]>([]);
     const [issues, setIssues] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          item: "", issueTo: "", issueBy: "", qty: 1, 
          issueDate: new Date().toISOString().split('T')[0]
     });

     const fetchData = async () => {
          setLoading(true);
          const [itRes, issRes] = await Promise.all([
               fetch("/api/inventory/items"),
               fetch("/api/inventory/issue")
          ]);
          const itData = await itRes.json();
          const issData = await issRes.json();
          
          if (itData.success) setItems(itData.data);
          if (issData.success) setIssues(issData.data);
          setLoading(false);
     };

     useEffect(() => { fetchData(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setSaving(true);
          const res = await fetch("/api/inventory/issue", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          const data = await res.json();
          if (data.success) {
               setIsModalOpen(false);
               setFormData({ item: "", issueTo: "", issueBy: "", qty: 1, issueDate: new Date().toISOString().split('T')[0] });
               fetchData();
          } else {
               alert(data.error);
          }
          setSaving(false);
     };

     const handleReturn = async (id: string) => {
          const date = new Date().toISOString().split('T')[0];
          await fetch("/api/inventory/issue", {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ id, returnDate: date })
          });
          fetchData();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-red-400 rounded-full"></div>
                                   Outbound asset transfer
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Authorizing and tracking temporary distribution of institutional assets</p>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-red-400 text-white font-black rounded-xl hover:bg-red-500 transition-all shadow-lg shadow-red-400/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              AUTHORIZE ISSUE
                         </button>
                    </div>
               </section>

               {/* Log Grid */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[600px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-8 py-5">Asset Information</th>
                                        <th className="px-8 py-5">Entity Identification</th>
                                        <th className="px-8 py-5">Issuance Logistics</th>
                                        <th className="px-8 py-5">Status Attribution</th>
                                        <th className="px-8 py-5 text-right">Administrative</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-red-300/20 border-t-red-400 rounded-full animate-spin"></div></td></tr>
                                   ) : issues.length > 0 ? (
                                        issues.map((i) => (
                                             <tr key={i._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-8 py-7 border-l-4 border-transparent hover:border-red-400 transition-all">
                                                       <div className="flex flex-col">
                                                            <span className="text-[11px] font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{i.item}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-bgray-700 dark:text-bgray-200 uppercase tracking-widest">{i.issueTo}</span>
                                                            <span className="text-[8px] font-black text-bgray-300 uppercase mt-1 tracking-widest">Issued By: {i.issueBy}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Date: {i.issueDate}</span>
                                                            <span className="text-[11px] font-black text-red-400 uppercase mt-1">QTY: -{i.qty} UNITS</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${i.status === 'Returned' ? 'bg-success-300' : 'bg-red-400 animate-pulse'}`}></div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${i.status === 'Returned' ? 'text-success-300' : 'text-red-400'}`}>{i.status}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7 text-right">
                                                       {i.status === 'Issued' && (
                                                            <button onClick={() => handleReturn(i._id)} className="px-6 py-2 bg-success-300 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20">Archive Return</button>
                                                       )}
                                                       {i.status === 'Returned' && (
                                                            <span className="text-[9px] font-black text-bgray-300 uppercase tracking-widest italic">Returned on {i.returnDate}</span>
                                                       )}
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr><td colSpan={5} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">No active issuance logs</td></tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* New Issue Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-red-400/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 bg-red-50/30">
                                   <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Issuance Deployment</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Authorizing outbound transfer of institutional asset to demographic entity</p>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Institutional Asset *</label>
                                        <select required value={formData.item} onChange={e => setFormData({...formData, item: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-black border-none outline-none focus:ring-2 focus:ring-red-400/30">
                                             <option value="">Choose Asset</option>
                                             {items.map(i => <option key={i._id} value={i.name} disabled={i.availableQty <= 0}>{i.name} ({i.availableQty} Avail)</option>)}
                                        </select>
                                   </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Recipient Identity *</label>
                                             <input required value={formData.issueTo} onChange={e => setFormData({...formData, issueTo: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-red-400/30 font-black" placeholder="ST-101 or EMP-05" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Transfer Quantity *</label>
                                             <input type="number" required value={formData.qty} onChange={e => setFormData({...formData, qty: parseInt(e.target.value)})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-black border-none outline-none focus:ring-2 focus:ring-red-400/30" />
                                        </div>
                                   </div>
                                   <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Authorized By</label>
                                             <input value={formData.issueBy} onChange={e => setFormData({...formData, issueBy: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-red-400/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Issuance Protocol Date</label>
                                             <input type="date" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-red-400/30 font-black" />
                                        </div>
                                   </div>
                                   <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-2xl hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button 
                                             disabled={saving}
                                             type="submit" 
                                             className="px-12 h-14 bg-red-400 text-white font-black rounded-2xl hover:bg-red-500 shadow-xl shadow-red-400/20 transition-all uppercase tracking-widest text-[10px]"
                                        >
                                             {saving ? "Deploying..." : "Finalize transfer"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}