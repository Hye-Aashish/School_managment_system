"use client";
import React, { useState, useEffect } from "react";

export default function AddHomework() {
     const [classList, setClassList] = useState<any[]>([]);
     const [homeworks, setHomeworks] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          class: "", section: "", subject: "", homeworkDate: new Date().toISOString().split('T')[0],
          submissionDate: new Date().toISOString().split('T')[0], description: "", fileUrl: ""
     });

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClassList(data.data);
     };

     const fetchHomeworks = async () => {
          setLoading(true);
          const res = await fetch("/api/homework");
          const data = await res.json();
          if (data.success) setHomeworks(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchClasses(); fetchHomeworks(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setSaving(true);
          try {
               await fetch("/api/homework", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });
               setFormData({
                    class: "", section: "", subject: "", homeworkDate: new Date().toISOString().split('T')[0],
                    submissionDate: new Date().toISOString().split('T')[0], description: "", fileUrl: ""
               });
               fetchHomeworks();
          } catch (e) {
               console.error(e);
          } finally {
               setSaving(false);
          }
     };

     const deleteHomework = async (id: string) => {
          if (!confirm("Delete this homework entry?")) return;
          await fetch(`/api/homework?id=${id}`, { method: "DELETE" });
          fetchHomeworks();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Add Section */}
                    <section className="2xl:w-[450px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Curriculum assignment
                              </h3>
                              <form onSubmit={handleSubmit} className="space-y-6">
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Class *</label>
                                             <select required value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                                  <option value="">Select</option>
                                                  {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Section *</label>
                                             <select required value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                                  <option value="">Select</option>
                                                  {classList.find(c => c.name === formData.class)?.sections.map((s: any) => <option key={s._id} value={s.name}>{s.name}</option>)}
                                             </select>
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Subject *</label>
                                        <input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="Mathematics" />
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Assign Date</label>
                                             <input type="date" value={formData.homeworkDate} onChange={e => setFormData({...formData, homeworkDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Due Date</label>
                                             <input type="date" value={formData.submissionDate} onChange={e => setFormData({...formData, submissionDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black" />
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Asset Link (Optional)</label>
                                        <input value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="Link to document/image" />
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Homework Instructions *</label>
                                        <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-2xl p-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none leading-relaxed" placeholder="Detailed assignment instructions..."></textarea>
                                   </div>
                                   <button 
                                        disabled={saving}
                                        type="submit" 
                                        className="w-full h-14 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]"
                                   >
                                        {saving ? "Deploying..." : "DEPLOY ASSIGNMENT"}
                                   </button>
                              </form>
                         </div>
                    </section>

                    {/* Repository Section */}
                    <section className="flex-1 mt-8 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/20">
                                   <h4 className="text-[11px] font-black text-bgray-500 uppercase tracking-[0.2em]">Assignment Repository</h4>
                                   <div className="px-3 py-1 bg-success-300/10 rounded-full text-[9px] font-black text-success-300 uppercase tracking-widest">Live Sync active</div>
                              </div>
                              <div className="overflow-x-auto min-h-[600px]">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                                  <th className="px-6 py-4">Demographics</th>
                                                  <th className="px-6 py-4">Subject & Timeline</th>
                                                  <th className="px-6 py-4">Description</th>
                                                  <th className="px-6 py-4 text-right">Action</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                             {loading ? (
                                                  <tr><td colSpan={4} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                             ) : homeworks.length > 0 ? (
                                                  homeworks.map((h) => (
                                                       <tr key={h._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                            <td className="px-6 py-6 border-l-4 border-transparent hover:border-success-300 transition-all">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-[11px] font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{h.class} - {h.section}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-[10px] font-black text-success-300 uppercase tracking-widest">{h.subject}</span>
                                                                      <span className="text-[9px] font-bold text-bgray-400 uppercase mt-1">Due: {h.submissionDate}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                                                 <span className="text-[10px] font-medium text-bgray-500 dark:text-bgray-400 uppercase italic">"{h.description}"</span>
                                                            </td>
                                                            <td className="px-6 py-6 text-right">
                                                                 <div className="flex justify-end gap-2">
                                                                      {h.fileUrl && (
                                                                           <a href={h.fileUrl} target="_blank" className="p-2.5 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-success-300 transition-all">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                                           </a>
                                                                      )}
                                                                      <button onClick={() => deleteHomework(h._id)} className="p-2.5 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                                      </button>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr><td colSpan={4} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">No assignments deployed</td></tr>
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </section>
               </div>
          </div>
     );
}