"use client";
import React, { useState, useEffect } from "react";

export default function DailyAssignment() {
     const [homeworks, setHomeworks] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

     const fetchHomeworks = async () => {
          setLoading(true);
          const res = await fetch("/api/homework");
          const data = await res.json();
          if (data.success) {
               // Filter by assign date
               const filtered = data.data.filter((h: any) => h.homeworkDate === filterDate);
               setHomeworks(filtered);
          }
          setLoading(false);
     };

     useEffect(() => { fetchHomeworks(); }, [filterDate]);

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                                   Daily Assignment Timeline
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Reviewing active curriculum deployments for the selected cycle</p>
                         </div>
                         <div className="flex items-center gap-4 bg-bgray-50 dark:bg-darkblack-500 p-2 rounded-2xl border border-dashed border-bgray-200">
                              <span className="text-[9px] font-black text-bgray-400 uppercase tracking-widest px-3">Filter cycle</span>
                              <input 
                                   type="date" 
                                   value={filterDate} 
                                   onChange={e => setFilterDate(e.target.value)} 
                                   className="h-10 bg-white dark:bg-darkblack-600 rounded-xl px-4 text-xs font-black border-none outline-none focus:ring-2 focus:ring-orange-300/30 text-orange-400"
                              />
                         </div>
                    </div>
               </section>

               {/* Timeline View */}
               <section className="space-y-6 items-center">
                    {loading ? (
                         <div className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-orange-300/20 border-t-orange-400 rounded-full animate-spin"></div></div>
                    ) : homeworks.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                              {homeworks.map((h) => (
                                   <div key={h._id} className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-2xl hover:shadow-orange-400/5 transition-all group border-t-[8px] border-t-orange-400 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                        </div>
                                        <div className="flex justify-between items-start mb-6">
                                             <div className="flex flex-col">
                                                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">{h.subject}</span>
                                                  <h4 className="text-xl font-black dark:text-white uppercase tracking-tighter mt-1">{h.class} - {h.section}</h4>
                                             </div>
                                             <div className="px-3 py-1 bg-orange-50 dark:bg-orange-400/10 rounded-full">
                                                  <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Active</span>
                                             </div>
                                        </div>
                                        <p className="text-sm font-medium text-bgray-500 dark:text-bgray-400 leading-relaxed mb-8 line-clamp-3">"{h.description}"</p>
                                        
                                        <div className="pt-6 border-t border-dashed border-bgray-100 dark:border-darkblack-400 flex justify-between items-center">
                                             <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded-full bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center text-bgray-400">
                                                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                  </div>
                                                  <div className="flex flex-col">
                                                       <span className="text-[8px] font-black text-bgray-300 uppercase tracking-widest">Submission Deadline</span>
                                                       <span className="text-[10px] font-black text-bgray-700 dark:text-bgray-200 uppercase tracking-tighter">{h.submissionDate}</span>
                                                  </div>
                                             </div>
                                             {h.fileUrl && (
                                                  <a href={h.fileUrl} target="_blank" className="p-3 bg-orange-400 text-white rounded-2xl shadow-lg shadow-orange-400/20 hover:scale-110 transition-transform">
                                                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                  </a>
                                             )}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <div className="py-48 text-center opacity-10">
                              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                              <p className="text-[12px] font-black uppercase tracking-[0.3em]">No assignments for this cycle</p>
                         </div>
                    )}
               </section>
          </div>
     );
}