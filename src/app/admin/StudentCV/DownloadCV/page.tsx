"use client";
import React, { useState, useEffect } from "react";

export default function DownloadCV() {
     const [cvs, setCvs] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [selectedCV, setSelectedCV] = useState<any>(null);

     const fetchCVs = async () => {
          setLoading(true);
          const res = await fetch("/api/student-cv");
          const data = await res.json();
          if (data.success) setCvs(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchCVs(); }, []);

     return (
          <div className="flex flex-col space-y-8 px-1">
               {/* Gallery Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex justify-between items-center">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Institutional Portfolio Deck
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Reviewing and exporting student professional credentials</p>
                         </div>
                    </div>
               </section>

               {/* Portfolio Grid */}
               <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {loading ? (
                         <div className="col-span-full py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></div>
                    ) : cvs.length > 0 ? (
                         cvs.map((cv) => (
                              <div key={cv._id} className="bg-white dark:bg-darkblack-600 rounded-[40px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-2xl hover:shadow-success-300/10 transition-all group relative border-b-[8px] border-b-success-300 overflow-hidden">
                                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                   </div>
                                   <div className="w-16 h-16 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl flex items-center justify-center mb-6 border border-bgray-100 dark:border-darkblack-400 group-hover:scale-110 transition-transform">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                   </div>
                                   <div className="space-y-1 mb-8">
                                        <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter leading-tight">Student ID: {cv.studentId}</h4>
                                        <p className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">{cv.education.length} Academic Entries | {cv.experience.length} Achievements</p>
                                   </div>
                                   <div className="flex flex-col gap-3">
                                        <button 
                                             onClick={() => setSelectedCV(cv)}
                                             className="w-full h-12 bg-success-300 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-success-400 transition-all flex items-center justify-center gap-2"
                                        >
                                             Digital Preview
                                        </button>
                                        <div className="text-center">
                                             <span className="text-[8px] font-bold text-bgray-300 uppercase tracking-widest">Last Synced: {new Date(cv.updated_at).toLocaleDateString()}</span>
                                        </div>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <div className="col-span-full py-48 text-center opacity-10">
                               <p className="text-[12px] font-black uppercase tracking-[0.3em]">Portfolio deck empty</p>
                         </div>
                    )}
               </section>

               {/* Preview Modal */}
               {selectedCV && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
                         <div className="absolute inset-0 bg-bgray-900/80 backdrop-blur-md" onClick={() => setSelectedCV(null)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[50px] w-full max-w-5xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20">
                              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                                   {/* CV Left Col */}
                                   <div className="w-full lg:w-[350px] bg-bgray-50 dark:bg-darkblack-500 p-12 border-r border-bgray-100 dark:border-darkblack-400">
                                        <div className="w-32 h-32 bg-white dark:bg-darkblack-600 rounded-full mx-auto mb-8 shadow-2xl border-4 border-success-300 flex items-center justify-center">
                                             <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <div className="text-center mb-12">
                                             <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter leading-tight">ID: {selectedCV.studentId}</h2>
                                             <p className="text-[10px] font-black text-success-300 uppercase tracking-widest mt-2 border border-success-300/20 rounded-full px-4 py-1 inline-block">Institutional Profile</p>
                                        </div>
                                        
                                        <div className="space-y-10">
                                             <div className="space-y-4">
                                                  <h5 className="text-[11px] font-black text-bgray-900 dark:text-white uppercase tracking-[0.3em]">Credentials</h5>
                                                  <div className="space-y-4">
                                                       {selectedCV.education.map((edu: any, i: number) => (
                                                            <div key={i} className="space-y-1">
                                                                 <p className="text-[10px] font-black text-bgray-600 dark:text-bgray-200 uppercase">{edu.degree}</p>
                                                                 <p className="text-[9px] font-bold text-bgray-400 italic">{edu.school} ({edu.year})</p>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* CV Right Col */}
                                   <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                                        <div className="space-y-12">
                                             <div className="space-y-4">
                                                  <h5 className="text-[12px] font-black text-success-300 uppercase tracking-[0.4em] flex items-center gap-4">
                                                       EXPERIENCE & MERIT
                                                       <div className="flex-1 h-[1px] bg-bgray-100 dark:bg-darkblack-400"></div>
                                                  </h5>
                                                  <div className="space-y-10">
                                                       {selectedCV.experience.map((exp: any, i: number) => (
                                                            <div key={i} className="relative pl-8 border-l-2 border-success-300/30">
                                                                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-success-300 shadow-lg shadow-success-300/40 border-2 border-white dark:border-darkblack-600"></div>
                                                                 <h6 className="text-lg font-black dark:text-white uppercase tracking-tighter leading-none">{exp.title}</h6>
                                                                 <p className="text-[10px] font-black text-bgray-400 uppercase tracking-widest mt-2 mb-4">{exp.company} | {exp.duration}</p>
                                                                 <p className="text-sm font-medium text-bgray-500 dark:text-bgray-400 leading-relaxed italic">Institutional Recognition & Professional Advancement</p>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>

                                             <div className="space-y-4 pt-12">
                                                  <h5 className="text-[12px] font-black text-orange-400 uppercase tracking-[0.4em] flex items-center gap-4">
                                                       PROFESSIONAL BRIEF
                                                       <div className="flex-1 h-[1px] bg-bgray-100 dark:border-darkblack-400"></div>
                                                  </h5>
                                                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-300 leading-loose text-justify">
                                                       {selectedCV.bio || "No biography provided for this institutional profile. The student maintains a focus on academic excellence and professional advancement within the curriculum framework."}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="absolute bottom-10 right-10 flex gap-4">
                                   <button onClick={() => window.print()} className="w-14 h-14 bg-success-300 text-white rounded-[20px] flex items-center justify-center shadow-2xl shadow-success-300/30 hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                   </button>
                                   <button onClick={() => setSelectedCV(null)} className="w-14 h-14 bg-bgray-900 dark:bg-darkblack-500 text-white rounded-[20px] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}