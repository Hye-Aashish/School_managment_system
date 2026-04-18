"use client";
import React, { useState, useEffect } from "react";

export default function UploadContent() {
     const [types, setTypes] = useState<any[]>([]);
     const [classList, setClassList] = useState<any[]>([]);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          title: "",
          type: "",
          shareDate: new Date().toISOString().split('T')[0],
          description: "",
          fileUrl: "",
          availableFor: [] as string[],
          class: "",
          section: ""
     });

     useEffect(() => {
          fetch("/api/download-content-types").then(r => r.json()).then(d => { if(d.success) setTypes(d.data); });
          fetch("/api/classes").then(r => r.json()).then(d => { if(d.success) setClassList(d.data); });
     }, []);

     const toggleRecipient = (role: string) => {
          setFormData(prev => ({
               ...prev,
               availableFor: prev.availableFor.includes(role) 
                    ? prev.availableFor.filter(r => r !== role) 
                    : [...prev.availableFor, role]
          }));
     };

     const handleSave = async (e: React.FormEvent) => {
          e.preventDefault();
          setSaving(true);
          try {
               await fetch("/api/download-contents", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });
               alert("Content deployed to depository successfully!");
               setFormData({
                    title: "", type: "", shareDate: new Date().toISOString().split('T')[0],
                    description: "", fileUrl: "", availableFor: [], class: "", section: ""
               });
          } catch (e) {
               console.error(e);
          } finally {
               setSaving(false);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <section className="bg-white dark:bg-darkblack-600 rounded-[40px] p-10 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex items-center gap-5 mb-12 pb-8 border-b border-dashed border-bgray-100 dark:border-darkblack-400">
                         <div className="w-16 h-16 bg-success-300 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-success-300/30">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                         </div>
                         <div>
                              <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Resource Depository</h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-2">Uploading and distributing academic materials</p>
                         </div>
                    </div>

                    <form onSubmit={handleSave} className="max-w-5xl space-y-10">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Resource Title *</label>
                                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Physics Chapter 3 Notes" />
                                   </div>
                                   <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Content Category *</label>
                                             <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30 text-success-300">
                                                  <option value="">Select Category</option>
                                                  {types.map(t => <option key={t._id} value={t.name}>{t.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Release Date</label>
                                             <input type="date" value={formData.shareDate} onChange={e => setFormData({...formData, shareDate: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-bgray-600" />
                                        </div>
                                   </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Source Repository (File Link)</label>
                                        <input value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="https://drive.google.com/..." />
                                   </div>
                              </div>

                              <div className="space-y-6">
                                   <div className="space-y-4">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Target Permission Matrix</label>
                                        <div className="flex gap-3">
                                             {["Student", "Staff"].map(role => (
                                                  <button 
                                                       key={role}
                                                       type="button"
                                                       onClick={() => toggleRecipient(role)}
                                                       className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                            formData.availableFor.includes(role) ? "bg-success-300 text-white shadow-lg shadow-success-300/20" : "bg-bgray-50 dark:bg-darkblack-500 text-bgray-400"
                                                       }`}
                                                  >
                                                       {role} Access
                                                  </button>
                                             ))}
                                        </div>
                                   </div>
                                   
                                   <div className="animate-in fade-in duration-500 space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                             <div className="space-y-1.5">
                                                  <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Specific Class</label>
                                                  <select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                                       <option value="">Global (All Classes)</option>
                                                       {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                                  </select>
                                             </div>
                                             <div className="space-y-1.5">
                                                  <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Section Protocol</label>
                                                  <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                                       <option value="">All Sections</option>
                                                       {classList.find(c => c.name === formData.class)?.sections.map((s: any) => <option key={s._id} value={s.name}>{s.name}</option>)}
                                                  </select>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div className="space-y-2">
                              <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Payload Brief / Description</label>
                              <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-[32px] p-8 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none leading-relaxed" placeholder="Provide notes about this resource..."></textarea>
                         </div>

                         <div className="pt-8 border-t border-bgray-100 dark:border-darkblack-400 flex flex-col sm:flex-row items-center gap-6">
                              <button 
                                   disabled={saving}
                                   className="w-full sm:w-auto px-16 h-16 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-2xl shadow-success-300/20 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                              >
                                   {saving ? (
                                        <>
                                             <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                             DEPLOYING...
                                        </>
                                   ) : "Finalize & share"}
                              </button>
                               <div className="flex items-center gap-3 text-bgray-300">
                                   <div className="w-1.5 h-1.5 rounded-full bg-success-300 animate-pulse"></div>
                                   <span className="text-[10px] font-black uppercase tracking-widest italic leading-none">Cloud encryption active</span>
                              </div>
                         </div>
                    </form>
               </section>
          </div>
     );
}