"use client";
import React, { useState, useEffect } from "react";

export default function SendEmail() {
     const [classList, setClassList] = useState<any[]>([]);
     const [sending, setSending] = useState(false);
     
     const [formData, setFormData] = useState({
          title: "",
          group: "All Students",
          message: "",
          class: "",
          section: ""
     });

     useEffect(() => {
          fetch("/api/classes").then(r => r.json()).then(d => { if(d.success) setClassList(d.data); });
     }, []);

     const handleSend = async (e: React.FormEvent) => {
          e.preventDefault();
          setSending(true);
          try {
               // Log the communication
               await fetch("/api/communication-log", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         type: "Email",
                         title: formData.title,
                         message: formData.message,
                         group: formData.group + (formData.class ? ` (${formData.class})` : "")
                    })
               });
               alert("Email communication deployed successfully!");
               setFormData({ title: "", group: "All Students", message: "", class: "", section: "" });
          } catch (e) {
               console.error(e);
          } finally {
               setSending(false);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <section className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-dashed border-bgray-100 dark:border-darkblack-400">
                         <div className="w-14 h-14 bg-success-300 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-success-300/30">
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                         </div>
                         <div>
                              <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter leading-none">Institutional Dispatch</h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-2">Deploying email payloads to institutional demographics</p>
                         </div>
                    </div>

                    <form onSubmit={handleSend} className="space-y-8 max-w-4xl">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                   <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Email Subject Line *</label>
                                   <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="Target Subject..." />
                              </div>
                              <div className="space-y-2">
                                   <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Recruitment Group *</label>
                                   <select value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30 text-success-300">
                                        <option value="All Students">All Students</option>
                                        <option value="All Parents">All Parents</option>
                                        <option value="All Staff">All Staff</option>
                                        <option value="Select Class">Specific Academic Section</option>
                                   </select>
                              </div>
                         </div>

                         {formData.group === "Select Class" && (
                              <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
                                   <div className="space-y-2">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Target Class</label>
                                        <select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                             <option value="">Choose Class</option>
                                             {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                        </select>
                                   </div>
                                   <div className="space-y-2">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Target Section</label>
                                        <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                             <option value="">All Sections</option>
                                             {classList.find(c => c.name === formData.class)?.sections.map((s: any) => <option key={s._id} value={s.name}>{s.name}</option>)}
                                        </select>
                                   </div>
                              </div>
                         )}

                         <div className="space-y-2">
                              <div className="flex justify-between items-center px-1">
                                   <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Email Content Payload *</label>
                                   <span className="text-[10px] font-black text-bgray-300 uppercase tracking-tighter italic">Rich text conversion auto-enabled</span>
                              </div>
                              <textarea required rows={10} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-[32px] p-8 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none leading-relaxed" placeholder="Write your message here..."></textarea>
                         </div>

                         <div className="pt-6 border-t border-bgray-100 dark:border-darkblack-400 flex flex-col sm:flex-row items-center gap-6">
                              <button 
                                   disabled={sending}
                                   className="w-full sm:w-auto px-12 h-16 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                              >
                                   {sending ? (
                                        <>
                                             <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                             TRANSMITTING...
                                        </>
                                   ) : "DEPLOY EMAIL"}
                              </button>
                               <div className="flex items-center gap-2 text-bgray-300">
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                   <span className="text-[10px] font-black uppercase tracking-widest italic leading-none">Security encrypted communication</span>
                              </div>
                         </div>
                    </form>
               </section>
          </div>
     );
}