"use client";
import React, { useState, useEffect } from "react";
import { TableSkeleton } from "@/app/common/Skeleton";

export default function CopyLessonsPage() {
     const [classList, setClassList] = useState<any[]>([]);
     
     const [sourceSections, setSourceSections] = useState<any[]>([]);
     const [sourceGroups, setSourceGroups] = useState<any[]>([]);
     const [sourceSubjects, setSourceSubjects] = useState<any[]>([]);
     
     const [targetSections, setTargetSections] = useState<any[]>([]);
     const [targetGroups, setTargetGroups] = useState<any[]>([]);
     const [targetSubjects, setTargetSubjects] = useState<any[]>([]);

     const [sourceFilter, setSourceFilter] = useState({ class: "", section: "", group: "", subject: "" });
     const [targetFilter, setTargetFilter] = useState({ class: "", section: "", group: "", subject: "" });
     
     const [sourceLessons, setSourceLessons] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [cloning, setCloning] = useState(false);

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClassList(data.data);
     };

     useEffect(() => { fetchClasses(); }, []);

     // Source Cascading Logic
     useEffect(() => {
          if (sourceFilter.class) {
               const cls = classList.find(c => c.name === sourceFilter.class);
               setSourceSections(cls?.sections || []);
          }
     }, [sourceFilter.class, classList]);

     useEffect(() => {
          if (sourceFilter.class && sourceFilter.section) {
               fetch(`/api/subject-groups?class=${sourceFilter.class}&section=${sourceFilter.section}`)
                    .then(r => r.json()).then(d => { if(d.success) setSourceGroups(d.data); });
          }
     }, [sourceFilter.class, sourceFilter.section]);

     useEffect(() => {
          if (sourceFilter.group) {
               const group = sourceGroups.find(g => g.name === sourceFilter.group);
               setSourceSubjects(group?.subjects || []);
          }
     }, [sourceFilter.group, sourceGroups]);

     // Target Cascading Logic
     useEffect(() => {
          if (targetFilter.class) {
               const cls = classList.find(c => c.name === targetFilter.class);
               setTargetSections(cls?.sections || []);
          }
     }, [targetFilter.class, classList]);

     useEffect(() => {
          if (targetFilter.class && targetFilter.section) {
               fetch(`/api/subject-groups?class=${targetFilter.class}&section=${targetFilter.section}`)
                    .then(r => r.json()).then(d => { if(d.success) setTargetGroups(d.data); });
          }
     }, [targetFilter.class, targetFilter.section]);

     useEffect(() => {
          if (targetFilter.group) {
               const group = targetGroups.find(g => g.name === targetFilter.group);
               setTargetSubjects(group?.subjects || []);
          }
     }, [targetFilter.group, targetGroups]);

     const fetchSourceCurriculum = async () => {
          if (!sourceFilter.class || !sourceFilter.section || !sourceFilter.subject) return;
          setLoading(true);
          const [lesRes, topRes] = await Promise.all([
               fetch(`/api/lessons?class=${sourceFilter.class}&section=${sourceFilter.section}&subject=${sourceFilter.subject}`),
               fetch(`/api/topics?class=${sourceFilter.class}&section=${sourceFilter.section}&subject=${sourceFilter.subject}`)
          ]);
          const [lesData, topData] = await Promise.all([lesRes.json(), topRes.json()]);
          
          if (lesData.success && topData.success) {
               const combined = lesData.data.map((l: any) => ({
                    ...l,
                    topics: topData.data.filter((t: any) => t.lesson === l.name)
               }));
               setSourceLessons(combined);
          }
          setLoading(false);
     };

     useEffect(() => { fetchSourceCurriculum(); }, [sourceFilter.subject]);

     const handleClone = async () => {
          if (!targetFilter.class || !targetFilter.section || !targetFilter.subject || sourceLessons.length === 0) {
               alert("Please specify target curriculum and ensure source has data.");
               return;
          }
          setCloning(true);
          try {
               // Clone Lessons
               const lessonMappings: any = {};
               for (const lesson of sourceLessons) {
                    const res = await fetch("/api/lessons", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({
                              name: lesson.name,
                              class: targetFilter.class,
                              section: targetFilter.section,
                              subjectGroup: targetFilter.group,
                              subject: targetFilter.subject
                         })
                    });
                    const lData = await res.json();
                    
                    if (lData.success) {
                         // Clone Topics for this lesson
                         const topicPayloads = lesson.topics.map((t: any) => ({
                              name: t.name,
                              lesson: lesson.name,
                              class: targetFilter.class,
                              section: targetFilter.section,
                              subjectGroup: targetFilter.group,
                              subject: targetFilter.subject
                         }));
                         if (topicPayloads.length > 0) {
                              await fetch("/api/topics", {
                                   method: "POST",
                                   headers: { "Content-Type": "application/json" },
                                   body: JSON.stringify(topicPayloads)
                              });
                         }
                    }
               }
               alert("Curriculum cloned successfully!");
          } catch (e) {
               console.error(e);
               alert("Error during cloning process.");
          } finally {
               setCloning(false);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Header Summary */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white uppercase tracking-tighter flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Curriculum replicator
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Clone syllabus structure across academic sections</p>
                         </div>
                         <div className="px-4 py-2 bg-orange-50 border border-orange-100 rounded-xl">
                              <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">Administrative Utility</span>
                         </div>
                    </div>
               </section>

               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Source Selection */}
                    <section className="bg-white dark:bg-darkblack-600 rounded-2xl border border-bgray-200 dark:border-darkblack-400 overflow-hidden shadow-sm">
                         <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/30 flex justify-between items-center">
                              <h4 className="text-[11px] font-black text-bgray-500 uppercase tracking-widest">01. Source Curriculum</h4>
                              <div className="flex items-center gap-2">
                                   <div className={`w-1.5 h-1.5 rounded-full ${sourceLessons.length > 0 ? 'bg-success-300' : 'bg-bgray-300'}`}></div>
                                   <span className="text-[9px] font-bold text-bgray-400 uppercase tracking-tighter">Lessons Found: {sourceLessons.length}</span>
                              </div>
                         </div>
                         <div className="p-6 space-y-6">
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Source Class</label>
                                         <select value={sourceFilter.class} onChange={e => setSourceFilter({...sourceFilter, class: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                              <option value="">Select Class</option>
                                              {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                         </select>
                                    </div>
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Section</label>
                                         <select value={sourceFilter.section} onChange={e => setSourceFilter({...sourceFilter, section: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                              <option value="">Select Section</option>
                                              {sourceSections.map((s: any) => <option key={s._id} value={s.name}>{s.name}</option>)}
                                         </select>
                                    </div>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Subject Group</label>
                                         <select value={sourceFilter.group} onChange={e => setSourceFilter({...sourceFilter, group: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                              <option value="">Select Group</option>
                                              {sourceGroups.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
                                         </select>
                                    </div>
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Subject</label>
                                         <select value={sourceFilter.subject} onChange={e => setSourceFilter({...sourceFilter, subject: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-success-300">
                                              <option value="">Choose Subject</option>
                                              {sourceSubjects.map((s: any, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                                         </select>
                                    </div>
                               </div>

                              <div className="mt-8 border-t border-dashed border-bgray-200 dark:border-darkblack-400 pt-6">
                                   <h5 className="text-[10px] font-black text-bgray-400 uppercase tracking-[0.2em] mb-4">Structure Preview</h5>
                                   <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {loading ? (
                                             <div className="py-2"><TableSkeleton rows={4} /></div>
                                        ) : sourceLessons.length > 0 ? (
                                             sourceLessons.map((l, idx) => (
                                                  <div key={idx} className="bg-bgray-50 dark:bg-darkblack-500 p-3 rounded-xl border border-bgray-100 dark:border-darkblack-400 transition-all hover:scale-[1.01]">
                                                       <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[11px] font-black text-bgray-700 dark:text-bgray-200 uppercase tracking-tighter">{l.name}</span>
                                                            <span className="text-[9px] font-bold text-bgray-400">{l.topics.length} Topics</span>
                                                       </div>
                                                       <p className="text-[9px] text-bgray-400 italic">{l.topics.map((t: any) => t.name).join(', ')}</p>
                                                  </div>
                                             ))
                                        ) : (
                                             <div className="py-12 border-2 border-dashed border-bgray-100 dark:border-darkblack-400 rounded-2xl flex flex-col items-center justify-center opacity-30">
                                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                                  <span className="text-[9px] font-black uppercase tracking-widest mt-2">No source selected</span>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Target Selection */}
                    <section className="bg-white dark:bg-darkblack-600 rounded-2xl border border-bgray-200 dark:border-darkblack-400 overflow-hidden shadow-sm">
                         <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 bg-success-50/30 flex justify-between items-center">
                              <h4 className="text-[11px] font-black text-success-300 uppercase tracking-widest text-success-400">02. Deployment Target</h4>
                              <div className="flex items-center gap-2">
                                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                              </div>
                         </div>
                         <div className="p-6 space-y-6">
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Target Class</label>
                                         <select value={targetFilter.class} onChange={e => setTargetFilter({...targetFilter, class: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                              <option value="">Select Class</option>
                                              {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                         </select>
                                    </div>
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Section</label>
                                         <select value={targetFilter.section} onChange={e => setTargetFilter({...targetFilter, section: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                              <option value="">Select Section</option>
                                              {targetSections.map((s: any) => <option key={s._id} value={s.name}>{s.name}</option>)}
                                         </select>
                                    </div>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Subject Group</label>
                                         <select value={targetFilter.group} onChange={e => setTargetFilter({...targetFilter, group: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                              <option value="">Select Group</option>
                                              {targetGroups.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
                                         </select>
                                    </div>
                                    <div className="space-y-1.5">
                                         <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Subject</label>
                                         <select value={targetFilter.subject} onChange={e => setTargetFilter({...targetFilter, subject: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-success-300">
                                              <option value="">Choose Subject</option>
                                              {targetSubjects.map((s: any, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                                         </select>
                                    </div>
                               </div>

                              <div className="pt-12 flex flex-col items-center">
                                   <div className="w-16 h-16 rounded-3xl bg-success-300/10 flex items-center justify-center mb-6 border border-success-300/20">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                   </div>
                                   <h4 className="text-sm font-black text-bgray-900 dark:text-white uppercase tracking-tighter mb-2">Initialize Migration</h4>
                                   <p className="text-[10px] text-bgray-400 font-bold uppercase tracking-widest text-center max-w-[200px]">Cloning will mirror all lessons and topics to the target subject</p>
                                   
                                   <button 
                                        disabled={cloning}
                                        onClick={handleClone}
                                        className="w-full h-14 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 transition-all shadow-xl shadow-success-300/20 disabled:opacity-50 mt-8 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
                                   >
                                        {cloning ? (
                                             <>
                                                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                  REPLICATING...
                                             </>
                                        ) : "CLONE CURRICULUM"}
                                   </button>
                                   <p className="text-[8px] font-black text-bgray-300 uppercase tracking-widest mt-4">Warning: This action will append to existing curriculum</p>
                              </div>
                         </div>
                    </section>
               </div>
          </div>
     );
}