"use client";
import React, { useState, useEffect, useMemo } from "react";
import { TableSkeleton } from "@/app/common/Skeleton";

export default function ManageSyllabusStatus() {
     const [classList, setClassList] = useState<any[]>([]);
     const [sectionList, setSectionList] = useState<any[]>([]);
     const [groupsList, setGroupsList] = useState<any[]>([]);
     const [subjectsList, setSubjectsList] = useState<any[]>([]);
     const [lessons, setLessons] = useState<any[]>([]);
     const [topics, setTopics] = useState<any[]>([]);
     const [plans, setPlans] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     
     const [filter, setFilter] = useState({ class: "", section: "", group: "", subject: "" });

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClassList(data.data);
     };

     const fetchData = async () => {
          if (!filter.class || !filter.section || !filter.subject) return;
          setLoading(true);
          try {
               const [lesRes, topRes, planRes] = await Promise.all([
                    fetch(`/api/lessons?class=${filter.class}&section=${filter.section}&subject=${filter.subject}`),
                    fetch(`/api/topics?class=${filter.class}&section=${filter.section}&subject=${filter.subject}`),
                    fetch(`/api/lesson-plans?class=${filter.class}&section=${filter.section}&subject=${filter.subject}`)
               ]);
               const [lesData, topData, planData] = await Promise.all([lesRes.json(), topRes.json(), planRes.json()]);
               
               if (lesData.success) setLessons(lesData.data);
               if (topData.success) setTopics(topData.data);
               if (planData.success) setPlans(planData.data);
          } catch (e) {
               console.error(e);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => { fetchClasses(); }, []);
     useEffect(() => { fetchData(); }, [filter.class, filter.section, filter.subject]);

     useEffect(() => {
          if (filter.class) {
               const cls = classList.find(c => c.name === filter.class);
               if (cls) setSectionList(cls.sections || []);
          }
     }, [filter.class, classList]);

     useEffect(() => {
          if (filter.class && filter.section) {
               fetch(`/api/subject-groups?class=${filter.class}&section=${filter.section}`)
                    .then(r => r.json()).then(d => { if(d.success) setGroupsList(d.data); });
          }
     }, [filter.class, filter.section]);

     useEffect(() => {
          if (filter.group) {
               const group = groupsList.find(g => g.name === filter.group);
               if (group) setSubjectsList(group.subjects || []);
          }
     }, [filter.group, groupsList]);

     const syllabusProgress = useMemo(() => {
          if (topics.length === 0) return 0;
          const completedTopics = topics.filter(t => {
               const plan = plans.find(p => p.topic === t.name && p.lesson === t.lesson);
               return plan?.status === "Complete";
          }).length;
          return Math.round((completedTopics / topics.length) * 100);
     }, [topics, plans]);

     const togglePlanStatus = async (topicName: string, lessonName: string, currentStatus: string | undefined) => {
          const plan = plans.find(p => p.topic === topicName && p.lesson === lessonName);
          if (!plan) {
               alert("No lesson plan scheduled for this topic yet.");
               return;
          }
          const next = currentStatus === "Complete" ? "Pending" : "Complete";
          await fetch("/api/lesson-plans", {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ id: plan._id, status: next })
          });
          fetchData();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Filters & Summary */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full xl:w-2/3">
                              <select value={filter.class} onChange={e => setFilter({...filter, class: e.target.value})} className="h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                   <option value="">Class</option>
                                   {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                              </select>
                              <select value={filter.section} onChange={e => setFilter({...filter, section: e.target.value})} className="h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                   <option value="">Section</option>
                                   {sectionList.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                              </select>
                              <select value={filter.group} onChange={e => setFilter({...filter, group: e.target.value})} className="h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                   <option value="">Group</option>
                                   {groupsList.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
                              </select>
                              <select value={filter.subject} onChange={e => setFilter({...filter, subject: e.target.value})} className="h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-success-300">
                                   <option value="">Subject</option>
                                   {subjectsList.map((s: any, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                              </select>
                         </div>
                         
                         <div className="w-full xl:w-1/3 flex items-center gap-4 bg-bgray-50 dark:bg-darkblack-500 p-4 rounded-2xl border border-dashed border-bgray-200">
                              <div className="flex-1">
                                   <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Syllabus Progress</span>
                                        <span className="text-xs font-black text-success-300">{syllabusProgress}%</span>
                                   </div>
                                   <div className="w-full h-2 bg-bgray-200 dark:bg-darkblack-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-success-300 transition-all duration-1000" style={{ width: `${syllabusProgress}%` }}></div>
                                   </div>
                              </div>
                              <div className="w-10 h-10 rounded-xl bg-success-300/10 flex items-center justify-center shrink-0">
                                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Breakdown Table */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[500px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4">Lesson Units</th>
                                        <th className="px-6 py-4">Detailed Topics</th>
                                        <th className="px-6 py-4">Completion Date</th>
                                        <th className="px-6 py-4 text-center">Execution Status</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={4} className="py-10 px-6"><TableSkeleton rows={10} /></td></tr>
                                   ) : lessons.length > 0 ? (
                                        lessons.map((lesson) => (
                                             <React.Fragment key={lesson._id}>
                                                  {/* Lesson Row */}
                                                  <tr className="bg-bgray-50/20 dark:bg-darkblack-500/5">
                                                       <td className="px-6 py-4" colSpan={4}>
                                                            <div className="flex items-center gap-3">
                                                                 <div className="w-2 h-2 rounded-full bg-bgray-300"></div>
                                                                 <span className="text-xs font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{lesson.name}</span>
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  {/* Topics of this lesson */}
                                                  {topics.filter(t => t.lesson === lesson.name).map((topic, tidx) => {
                                                       const plan = plans.find(p => p.topic === topic.name && p.lesson === lesson.name);
                                                       return (
                                                            <tr key={topic._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                                 <td className="px-6 py-4 pl-12 text-[10px] font-bold text-bgray-400">
                                                                      {(tidx + 1).toString().padStart(2, '0')}.
                                                                 </td>
                                                                 <td className="px-6 py-4">
                                                                       <span className="text-[11px] font-bold text-bgray-700 dark:text-bgray-200 uppercase tracking-tighter">{topic.name}</span>
                                                                 </td>
                                                                 <td className="px-6 py-4">
                                                                      <span className="text-[10px] font-black text-bgray-400 uppercase">{plan?.status === 'Complete' ? plan.date : '---'}</span>
                                                                 </td>
                                                                 <td className="px-6 py-4 text-center">
                                                                      <button 
                                                                           onClick={() => togglePlanStatus(topic.name, lesson.name, plan?.status)}
                                                                           className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                                                           plan?.status === 'Complete' ? 'bg-success-300 text-white' : 'bg-bgray-100 dark:bg-darkblack-500 text-bgray-400'
                                                                      }`}>
                                                                           {plan?.status || 'Not Scheduled'}
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       );
                                                  })}
                                             </React.Fragment>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={4} className="py-24 text-center">
                                                  <div className="max-w-[140px] mx-auto opacity-10">
                                                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                       <p className="text-[9px] font-black uppercase tracking-widest">Select Subject to analyze</p>
                                                  </div>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>
          </div>
     );
}