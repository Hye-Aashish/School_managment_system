"use client";
import React, { useState, useEffect } from "react";

export default function IssueReturn() {
     const [issues, setIssues] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          bookId: "", memberId: "", memberType: "Student" as "Student" | "Staff",
          issueDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 604800000).toISOString().split('T')[0] // +7 days
     });

     const fetchIssues = async () => {
          setLoading(true);
          const res = await fetch("/api/book-issues");
          const data = await res.json();
          if (data.success) setIssues(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchIssues(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setSaving(true);
          const res = await fetch("/api/book-issues", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          const data = await res.json();
          if (data.success) {
               setIsModalOpen(false);
               setFormData({
                    bookId: "", memberId: "", memberType: "Student",
                    issueDate: new Date().toISOString().split('T')[0],
                    returnDate: new Date(Date.now() + 604800000).toISOString().split('T')[0]
               });
               fetchIssues();
          } else {
               alert(data.error);
          }
          setSaving(false);
     };

     const handleReturn = async (id: string) => {
          const date = new Date().toISOString().split('T')[0];
          await fetch("/api/book-issues", {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ id, actualReturnDate: date })
          });
          fetchIssues();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                                   Library Circulation
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Real-time monitoring of institutional literary exchange</p>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-orange-400 text-white font-black rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-orange-400/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              ISSUE NEW ASSET
                         </button>
                    </div>
               </section>

               {/* Log Grid */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[600px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-8 py-5">Issued Asset</th>
                                        <th className="px-8 py-5">Member Identification</th>
                                        <th className="px-8 py-5">Timeline Protocol</th>
                                        <th className="px-8 py-5">Status Attribution</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-orange-300/20 border-t-orange-400 rounded-full animate-spin"></div></td></tr>
                                   ) : issues.length > 0 ? (
                                        issues.map((i) => (
                                             <tr key={i._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-8 py-7 border-l-4 border-transparent hover:border-orange-400 transition-all">
                                                       <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-bgray-900 dark:text-white uppercase tracking-tighter">TAG: {i.bookId}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex flex-col">
                                                            <span className="text-[11px] font-black text-bgray-700 dark:text-bgray-200 uppercase tracking-widest">{i.memberId}</span>
                                                            <span className="text-[8px] font-black text-bgray-300 uppercase mt-1 tracking-widest">{i.memberType} Entity</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Issued: {i.issueDate}</span>
                                                            <span className={`text-[10px] font-black uppercase mt-1 ${i.status === 'Returned' ? 'text-bgray-300' : 'text-orange-400'}`}>Due: {i.returnDate}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${i.status === 'Returned' ? 'bg-success-300' : 'bg-orange-300 animate-pulse'}`}></div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${i.status === 'Returned' ? 'text-success-300' : 'text-orange-400'}`}>{i.status}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7 text-right">
                                                       {i.status === 'Issued' && (
                                                            <button onClick={() => handleReturn(i._id)} className="px-6 py-2 bg-success-300 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20">Archieve Return</button>
                                                       )}
                                                       {i.status === 'Returned' && (
                                                            <span className="text-[9px] font-black text-bgray-300 uppercase tracking-widest italic">Archived on {i.actualReturnDate}</span>
                                                       )}
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr><td colSpan={5} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">No active circulation logs</td></tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* New Issue Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-orange-300/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 bg-orange-50/30">
                                   <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Circulation Deployment</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Authorizing temporary transfer of institutional literary asset</p>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                   <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Book Number (Asset ID) *</label>
                                             <input required value={formData.bookId} onChange={e => setFormData({...formData, bookId: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30 font-black text-orange-400" placeholder="e.g. LIB-1001" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Entity Classification *</label>
                                             <select required value={formData.memberType} onChange={e => setFormData({...formData, memberType: e.target.value as any})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-black border-none outline-none focus:ring-2 focus:ring-orange-300/30">
                                                  <option value="Student">Student Demographic</option>
                                                  <option value="Staff">Professional Staff</option>
                                             </select>
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Member Identification CODE *</label>
                                        <input required value={formData.memberId} onChange={e => setFormData({...formData, memberId: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30 font-black" placeholder="ST-552 or EMP-10" />
                                   </div>
                                   <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Issuance Protocol Date</label>
                                             <input type="date" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30 font-black" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Mandatory Return Deadline</label>
                                             <input type="date" value={formData.returnDate} onChange={e => setFormData({...formData, returnDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30 font-black text-orange-400" />
                                        </div>
                                   </div>
                                   <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-2xl hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button 
                                             disabled={saving}
                                             type="submit" 
                                             className="px-12 h-14 bg-orange-400 text-white font-black rounded-2xl hover:bg-orange-500 shadow-xl shadow-orange-400/20 transition-all uppercase tracking-widest text-[10px]"
                                        >
                                             {saving ? "Deploying..." : "Finalize Issuance"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}