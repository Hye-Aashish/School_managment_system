"use client";
import React, { useState, useEffect } from "react";

export default function DailyAssignment() {
     const [homeworks, setHomeworks] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

     // Submissions drawer states
     const [selectedHomework, setSelectedHomework] = useState<any>(null);
     const [showDrawer, setShowDrawer] = useState(false);
     const [submissions, setSubmissions] = useState<any[]>([]);
     const [drawerLoading, setDrawerLoading] = useState(false);
     const [subFilter, setSubFilter] = useState<"all" | "submitted" | "evaluated">("all");
     const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
     const [grade, setGrade] = useState("");
     const [feedback, setFeedback] = useState("");
     const [evaluating, setEvaluating] = useState(false);

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

     const fetchSubmissions = async (hwId: string) => {
          setDrawerLoading(true);
          try {
               const res = await fetch(`/api/homework-submissions?homeworkId=${hwId}`);
               const data = await res.json();
               if (data.success) {
                    setSubmissions(data.data || []);
               }
          } catch (err) {
               console.error("Error fetching submissions:", err);
          } finally {
               setDrawerLoading(false);
          }
     };

     useEffect(() => { fetchHomeworks(); }, [filterDate]);

     useEffect(() => {
          if (selectedHomework) {
               fetchSubmissions(selectedHomework._id);
          }
     }, [selectedHomework]);

     const handleOpenDrawer = (hw: any) => {
          setSelectedHomework(hw);
          setShowDrawer(true);
          setSelectedSubmission(null);
          setGrade("");
          setFeedback("");
     };

     const handleSelectSubmission = (sub: any) => {
          setSelectedSubmission(sub);
          setGrade(sub.grade || "");
          setFeedback(sub.feedback || "");
     };

     const handleEvaluate = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!selectedSubmission) return;
          setEvaluating(true);
          try {
               const res = await fetch("/api/homework-submissions", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         submissionId: selectedSubmission._id,
                         grade,
                         feedback,
                         status: "evaluated"
                    })
               });
               const data = await res.json();
               if (data.success) {
                    // Update submissions list
                    setSubmissions(prev => prev.map(s => s._id === selectedSubmission._id ? { ...s, grade, feedback, status: "evaluated" } : s));
                    setSelectedSubmission(null);
                    alert("Submission evaluated successfully!");
               } else {
                    alert("Evaluation failed: " + data.error);
               }
          } catch (err) {
               console.error("Evaluation error:", err);
               alert("Something went wrong");
          } finally {
               setEvaluating(false);
          }
     };

     const filteredSubmissions = submissions.filter(sub => {
          if (subFilter === "all") return true;
          return sub.status === subFilter;
     });

     return (
          <div className="flex flex-col space-y-6 px-1 relative">
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
                                   <div key={h._id} className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-2xl hover:shadow-orange-400/5 transition-all group border-t-[8px] border-t-orange-400 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
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
                                        
                                        <div className="pt-6 border-t border-dashed border-bgray-100 dark:border-darkblack-400 flex flex-col gap-4">
                                             <div className="flex justify-between items-center">
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
                                                       <a href={h.fileUrl} target="_blank" className="p-2.5 bg-orange-50 dark:bg-orange-400/10 text-orange-400 rounded-xl hover:scale-105 transition-all">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                       </a>
                                                  )}
                                             </div>
                                             <button 
                                                  onClick={() => handleOpenDrawer(h)}
                                                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2"
                                             >
                                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                  Submissions
                                             </button>
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

               {/* Drawer Overlay */}
               {showDrawer && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
                         {/* Drawer Panel */}
                         <div className="w-full max-w-4xl bg-white dark:bg-darkblack-600 h-full shadow-2xl flex flex-col relative overflow-hidden animate-slide-left">
                              {/* Header */}
                              <div className="p-6 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center bg-gray-50 dark:bg-darkblack-700">
                                   <div>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">
                                             {selectedHomework?.subject} Submissions
                                        </h3>
                                        <p className="text-xs text-bgray-400 font-bold uppercase mt-1">
                                             {selectedHomework?.class} - {selectedHomework?.section}
                                        </p>
                                   </div>
                                   <button 
                                        onClick={() => setShowDrawer(false)}
                                        className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-darkblack-500 dark:text-white hover:bg-red-500 hover:text-white transition-all flex items-center justify-center font-bold"
                                   >
                                        ✕
                                   </button>
                              </div>

                              {/* Content Container */}
                              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                                   {/* Submissions List Side */}
                                   <div className="flex-1 p-6 overflow-y-auto border-r border-bgray-200 dark:border-darkblack-400 flex flex-col space-y-4">
                                        {/* Status Filter */}
                                        <div className="flex gap-2">
                                             {(["all", "submitted", "evaluated"] as const).map(f => (
                                                  <button
                                                       key={f}
                                                       onClick={() => setSubFilter(f)}
                                                       className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                                            subFilter === f 
                                                            ? "bg-emerald-500 text-white" 
                                                            : "bg-gray-100 dark:bg-darkblack-500 text-bgray-400"
                                                       }`}
                                                  >
                                                       {f}
                                                  </button>
                                             ))}
                                        </div>

                                        {drawerLoading ? (
                                             <div className="py-20 text-center"><div className="w-8 h-8 mx-auto border-4 border-emerald-300/25 border-t-emerald-500 rounded-full animate-spin"></div></div>
                                        ) : filteredSubmissions.length > 0 ? (
                                             <div className="space-y-4">
                                                  {filteredSubmissions.map((sub: any) => (
                                                       <div 
                                                            key={sub._id}
                                                            onClick={() => handleSelectSubmission(sub)}
                                                            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col space-y-3 ${
                                                                 selectedSubmission?._id === sub._id
                                                                 ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 shadow-lg"
                                                                 : "bg-gray-50/50 dark:bg-darkblack-500 border-bgray-200 dark:border-darkblack-400 hover:border-emerald-500/50"
                                                            }`}
                                                       >
                                                            <div className="flex justify-between items-start">
                                                                 <div>
                                                                      <h4 className="font-bold text-sm text-bgray-900 dark:text-white uppercase">
                                                                           {sub.student?.fname} {sub.student?.lname}
                                                                      </h4>
                                                                      <p className="text-[10px] font-semibold text-bgray-400 uppercase mt-0.5">
                                                                           Roll No: {sub.student?.roll_no} | Admin No: {sub.student?.admission_no}
                                                                      </p>
                                                                 </div>
                                                                 <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                                      sub.status === "evaluated"
                                                                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                                                 }`}>
                                                                      {sub.status}
                                                                 </span>
                                                            </div>
                                                            {sub.message && (
                                                                 <p className="text-xs text-bgray-600 dark:text-bgray-300 italic">
                                                                      "{sub.message}"
                                                                 </p>
                                                            )}
                                                            {sub.fileUrl && (
                                                                 <a 
                                                                      href={sub.fileUrl} 
                                                                      target="_blank" 
                                                                      rel="noopener noreferrer"
                                                                      onClick={(e) => e.stopPropagation()}
                                                                      className="inline-flex items-center gap-2 text-[10px] font-black text-blue-500 hover:underline uppercase tracking-wider"
                                                                 >
                                                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                                                      {sub.fileName || "View Attachment"}
                                                                 </a>
                                                            )}
                                                       </div>
                                                  ))}
                                             </div>
                                        ) : (
                                             <div className="py-20 text-center opacity-40 italic text-xs text-bgray-400">
                                                  No submissions found matching filter.
                                             </div>
                                        )}
                                   </div>

                                   {/* Evaluation panel Side */}
                                   <div className="w-full md:w-80 p-6 bg-gray-50/50 dark:bg-darkblack-700 flex flex-col justify-between">
                                        {selectedSubmission ? (
                                             <form onSubmit={handleEvaluate} className="space-y-6 flex-1 flex flex-col justify-between">
                                                  <div className="space-y-6">
                                                       <div>
                                                            <h4 className="font-bold text-xs uppercase text-bgray-400 tracking-wider">Evaluating</h4>
                                                            <p className="font-black text-sm text-bgray-900 dark:text-white uppercase mt-1">
                                                                 {selectedSubmission.student?.fname} {selectedSubmission.student?.lname}
                                                            </p>
                                                       </div>

                                                       <div className="space-y-2">
                                                            <label className="block text-[10px] font-black uppercase tracking-wider text-bgray-400">Grade / Marks</label>
                                                            <input 
                                                                 type="text" 
                                                                 value={grade}
                                                                 onChange={e => setGrade(e.target.value)}
                                                                 placeholder="e.g. A+, 95/100, Good"
                                                                 required
                                                                 className="w-full px-4 py-3 bg-white dark:bg-darkblack-600 rounded-xl text-xs font-bold border border-bgray-200 dark:border-darkblack-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-bgray-950 dark:text-white"
                                                            />
                                                       </div>

                                                       <div className="space-y-2">
                                                            <label className="block text-[10px] font-black uppercase tracking-wider text-bgray-400">Feedback Notes</label>
                                                            <textarea 
                                                                 value={feedback}
                                                                 onChange={e => setFeedback(e.target.value)}
                                                                 placeholder="Provide construction advice or remarks..."
                                                                 rows={4}
                                                                 className="w-full px-4 py-3 bg-white dark:bg-darkblack-600 rounded-xl text-xs font-bold border border-bgray-200 dark:border-darkblack-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-bgray-950 dark:text-white resize-none"
                                                            />
                                                       </div>
                                                  </div>

                                                  <button
                                                       type="submit"
                                                       disabled={evaluating}
                                                       className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center"
                                                  >
                                                       {evaluating ? "Saving..." : "Save Evaluation"}
                                                  </button>
                                             </form>
                                        ) : (
                                             <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40">
                                                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                  <p className="text-[10px] font-black uppercase tracking-wider">Select a student submission to evaluate</p>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}