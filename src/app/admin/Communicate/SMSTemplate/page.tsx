"use client";
import React, { useState, useEffect } from "react";

export default function SMSTemplate() {
     const [templates, setTemplates] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isEditMode, setIsEditMode] = useState(false);

     const emptyForm = { title: "", content: "" };
     const [formData, setFormData] = useState(emptyForm);
     const [editingId, setEditingId] = useState<string | null>(null);

     const fetchTemplates = async () => {
          setLoading(true);
          const res = await fetch("/api/sms-template");
          const data = await res.json();
          if (data.success) setTemplates(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchTemplates(); }, []);

     const openAddModal = () => {
          setFormData(emptyForm);
          setIsEditMode(false);
          setEditingId(null);
          setIsModalOpen(true);
     };

     const openEditModal = (t: any) => {
          setFormData({ title: t.title, content: t.content });
          setIsEditMode(true);
          setEditingId(t._id);
          setIsModalOpen(true);
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const url = "/api/sms-template";
          const method = isEditMode ? "PUT" : "POST";
          const payload = isEditMode ? { ...formData, id: editingId } : formData;

          const res = await fetch(url, {
               method,
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(payload)
          });
          if (res.ok) {
               setIsModalOpen(false);
               fetchTemplates();
          }
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this SMS template?")) return;
          const res = await fetch(`/api/sms-template?id=${id}`, { method: "DELETE" });
          if (res.ok) fetchTemplates();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Header Section */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex justify-between items-center">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                                   SMS Templates Repository
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Manage standardized mobile payloads</p>
                         </div>
                         <button 
                              onClick={openAddModal}
                              className="px-6 py-3 bg-success-300 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-success-400 transition-all shadow-lg shadow-success-300/20"
                         >
                              + New SMS Template
                         </button>
                    </div>
               </section>

               {/* Grid View */}
               <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                         <div className="col-span-full py-24 text-center">
                              <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                         </div>
                    ) : templates.length > 0 ? (
                         templates.map((t) => (
                              <div key={t._id} className="bg-white dark:bg-darkblack-600 rounded-3xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-xl hover:shadow-orange-400/5 transition-all group relative overflow-hidden flex flex-col h-full">
                                   <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl flex flex-shrink-0 items-center justify-center text-orange-400 group-hover:scale-110 transition-transform bg-gradient-to-br from-orange-400/10 to-transparent">
                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        </div>
                                        <div className="flex-1 mt-1">
                                             <h4 className="text-base font-black dark:text-white uppercase tracking-tighter leading-tight">{t.title}</h4>
                                             <span className="text-[9px] font-bold text-bgray-400 uppercase tracking-widest bg-bgray-100 dark:bg-darkblack-500 px-2 py-0.5 rounded mt-1 inline-block">{t.content.length} chars</span>
                                        </div>
                                   </div>
                                   <div className="flex-1 text-xs text-bgray-500 dark:text-bgray-300 line-clamp-4 mb-6 bg-bgray-50 dark:bg-darkblack-500 p-4 rounded-xl leading-relaxed">
                                        {t.content}
                                   </div>
                                   <div className="flex gap-2 w-full mt-auto">
                                        <button 
                                             onClick={() => openEditModal(t)}
                                             className="flex-1 h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-[10px] font-black uppercase text-bgray-500 hover:bg-success-300 hover:text-white transition-all"
                                        >
                                             Edit Template
                                        </button>
                                        <button 
                                             onClick={() => handleDelete(t._id)}
                                             className="w-10 h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                        >
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <div className="col-span-full py-32 text-center opacity-20">
                              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                              <p className="text-[12px] font-black uppercase tracking-[0.3em]">No SMS templates defined</p>
                         </div>
                    )}
               </section>

               {/* Add/Edit Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20 flex flex-col max-h-[90vh]">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/50">
                                   <div>
                                        <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">{isEditMode ? "Modify SMS" : "New SMS Template"}</h3>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest">{isEditMode ? "Editing existing mobile format" : "Creating new mobile format"}</p>
                                   </div>
                                   <button onClick={() => setIsModalOpen(false)} className="bg-white p-3 rounded-2xl shadow-sm text-bgray-400 hover:text-red-500 transition-colors border border-bgray-200">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                   <div className="space-y-6">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Template Name *</label>
                                             <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Absentee Notification" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <div className="flex justify-between items-center">
                                                  <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">SMS Content Payload *</label>
                                                  <span className="text-[10px] font-black text-bgray-300 uppercase tracking-tighter italic">{formData.content.length} / 160 chars</span>
                                             </div>
                                             <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-[32px] p-8 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none leading-relaxed" placeholder="Write your SMS message..."></textarea>
                                        </div>
                                   </div>
                                   <div className="pt-8 mt-8 border-t border-bgray-100 dark:border-darkblack-400 flex justify-end gap-3">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-white dark:bg-darkblack-500 text-bgray-500 font-black rounded-2xl hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px] border border-bgray-200 shadow-sm">Discard</button>
                                        <button type="submit" className="px-12 h-14 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">Save SMS</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}
