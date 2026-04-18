"use client";
import React, { useState, useEffect } from "react";

export default function NoticeBoard() {
     const [notices, setNotices] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     const [formData, setFormData] = useState({
          title: "",
          noticeDate: new Date().toISOString().split('T')[0],
          publishOn: new Date().toISOString().split('T')[0],
          message: "",
          messageTo: [] as string[]
     });

     const fetchNotices = async () => {
          setLoading(true);
          const res = await fetch("/api/notices");
          const data = await res.json();
          if (data.success) setNotices(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchNotices(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const res = await fetch("/api/notices", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          if (res.ok) {
               setIsModalOpen(false);
               setFormData({
                    title: "",
                    noticeDate: new Date().toISOString().split('T')[0],
                    publishOn: new Date().toISOString().split('T')[0],
                    message: "",
                    messageTo: []
               });
               fetchNotices();
          }
     };

     const deleteNotice = async (id: string) => {
          if (!confirm("Delete this notice?")) return;
          await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
          fetchNotices();
     };

     const toggleRecipient = (role: string) => {
          setFormData(prev => ({
               ...prev,
               messageTo: prev.messageTo.includes(role) 
                    ? prev.messageTo.filter(r => r !== role) 
                    : [...prev.messageTo, role]
          }));
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Digital Bulletin
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Official institutional broadcasts and announcements</p>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              PUBLISH NOTICE
                         </button>
                    </div>
               </section>

               {/* Notice List */}
               <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                         <div className="col-span-full py-24 text-center">
                              <div className="w-10 h-10 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                         </div>
                    ) : notices.length > 0 ? (
                         notices.map((n) => (
                              <div key={n._id} className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-xl hover:shadow-success-300/5 transition-all group relative border-l-[6px] border-l-success-300">
                                   <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-success-300/10 rounded-2xl text-success-300">
                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                        </div>
                                        <button onClick={() => deleteNotice(n._id)} className="text-bgray-300 hover:text-red-500 transition-colors">
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                   </div>
                                   <div className="space-y-4">
                                        <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter leading-tight">{n.title}</h4>
                                        <p className="text-xs font-medium text-bgray-500 dark:text-bgray-400 line-clamp-3 leading-relaxed">{n.message}</p>
                                        
                                        <div className="pt-6 border-t border-dashed border-bgray-100 dark:border-darkblack-400 flex flex-col gap-3">
                                             <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-bgray-400">
                                                  <span>Date: {n.noticeDate}</span>
                                                  <span className="text-success-300">Published</span>
                                             </div>
                                             <div className="flex flex-wrap gap-1.5">
                                                  {n.messageTo.map((role: string) => (
                                                       <span key={role} className="px-3 py-1 bg-bgray-50 dark:bg-darkblack-500 rounded-full text-[8px] font-black text-bgray-600 dark:text-bgray-200 uppercase tracking-tighter">{role}</span>
                                                  ))}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <div className="col-span-full py-32 text-center opacity-10">
                               <p className="text-[12px] font-black uppercase tracking-[0.3em]">Institutional Bulletin empty</p>
                         </div>
                    )}
               </section>

               {/* Post Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/50">
                                   <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Draft Official Broadcast</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Deploying announcement to institutional network</p>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Notice Subject *</label>
                                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Summer Vacation Schedule" />
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Notice Date</label>
                                             <input type="date" value={formData.noticeDate} onChange={e => setFormData({...formData, noticeDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Publish Date</label>
                                             <input type="date" value={formData.publishOn} onChange={e => setFormData({...formData, publishOn: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black" />
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Message Payload *</label>
                                        <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-3xl p-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none" placeholder="Provide full details of the announcement..."></textarea>
                                   </div>
                                   <div className="space-y-3">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block">Broadcast Target Recipients</label>
                                        <div className="flex flex-wrap gap-2 text-white">
                                             {["Student", "Parent", "Teacher", "Admin"].map(role => (
                                                  <button 
                                                       key={role}
                                                       type="button"
                                                       onClick={() => toggleRecipient(role)}
                                                       className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                                            formData.messageTo.includes(role) ? "bg-success-300 shadow-lg shadow-success-300/20" : "bg-bgray-100 dark:bg-darkblack-500 text-bgray-400"
                                                       }`}
                                                  >
                                                       {role}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>
                                   <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-[20px] hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button type="submit" className="px-12 h-14 bg-success-300 text-white font-black rounded-[20px] hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">Finalize & Deploy</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}