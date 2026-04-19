"use client";
import React, { useState, useEffect, useMemo } from "react";
import { TableSkeleton } from "@/app/common/Skeleton";

export default function ManageLessonPlan() {
     const [classList, setClassList] = useState<any[]>([]);
     const [sectionList, setSectionList] = useState<any[]>([]);
     const [groupsList, setGroupsList] = useState<any[]>([]);
     const [subjectsList, setSubjectsList] = useState<any[]>([]);
     const [lessonsList, setLessonsList] = useState<any[]>([]);
     const [topicsList, setTopicsList] = useState<any[]>([]);
     const [plans, setPlans] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     const [filter, setFilter] = useState({ class: "", section: "", group: "", subject: "" });
     const [formData, setFormData] = useState({
          lesson: "", topic: "", date: new Date().toISOString().split('T')[0],
          timeFrom: "08:00", timeTo: "09:00"
     });

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClassList(data.data);
     };

     const fetchPlans = async () => {
          if (!filter.class || !filter.section) return;
          setLoading(true);
          const res = await fetch(`/api/lesson-plans?class=${filter.class}&section=${filter.section}`);
          const data = await res.json();
          if (data.success) setPlans(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchClasses(); }, []);
     useEffect(() => { if(filter.class && filter.section) fetchPlans(); }, [filter.class, filter.section]);

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

     useEffect(() => {
          if (filter.subject) {
               fetch(`/api/lessons?class=${filter.class}&section=${filter.section}&subject=${filter.subject}`)
                    .then(r => r.json()).then(d => { if(d.success) setLessonsList(d.data); });
          }
     }, [filter.subject, filter.class, filter.section]);

     useEffect(() => {
          if (formData.lesson) {
               fetch(`/api/topics?class=${filter.class}&section=${filter.section}&lesson=${formData.lesson}`)
                    .then(r => r.json()).then(d => { if(d.success) setTopicsList(d.data); });
          }
     }, [formData.lesson, filter.class, filter.section]);

     const handleSavePlan = async (e: React.FormEvent) => {
          e.preventDefault();
          setSaving(true);
          try {
               await fetch("/api/lesson-plans", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, ...filter })
               });
               setIsModalOpen(false);
               fetchPlans();
          } catch (e) {
               console.error(e);
          } finally {
               setSaving(false);
          }
     };

     const deletePlan = async (id: string) => {
          if (!confirm("Delete this lesson plan entry?")) return;
          await fetch(`/api/lesson-plans?id=${id}`, { method: "DELETE" });
          fetchPlans();
     };

     const toggleStatus = async (id: string, current: string) => {
          const next = current === "Pending" ? "Complete" : "Pending";
          await fetch("/api/lesson-plans", {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ id, status: next })
          });
          fetchPlans();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Context Selection */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 shrink-0 mr-4">
                                   <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                                   Lesson Planner
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                                   <select value={filter.class} onChange={e => setFilter({...filter, class: e.target.value})} className="h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                        <option value="">Class</option>
                                        {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                   </select>
                                   <select value={filter.section} onChange={e => setFilter({...filter, section: e.target.value})} className="h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                        <option value="">Section</option>
                                        {sectionList.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                                   </select>
                                   <select value={filter.group} onChange={e => setFilter({...filter, group: e.target.value})} className="h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                        <option value="">Group</option>
                                        {groupsList.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
                                   </select>
                                   <select value={filter.subject} onChange={e => setFilter({...filter, subject: e.target.value})} className="h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-success-300">
                                        <option value="">Subject</option>
                                        {subjectsList.map((s: any, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                                   </select>
                              </div>
                         </div>
                         <button 
                              onClick={() => { if(!filter.subject) alert("Select filters first"); else setIsModalOpen(true); }}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              PLAN LESSON
                         </button>
                    </div>
               </section>

               {/* Schedule List */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[500px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4">Schedule Identity</th>
                                        <th className="px-6 py-4">Syllabus Context</th>
                                        <th className="px-6 py-4">Session Period</th>
                                        <th className="px-6 py-4 text-center">Lifecycle Status</th>
                                        <th className="px-6 py-4 text-right">Administrative</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-10 px-6"><TableSkeleton rows={8} /></td></tr>
                                   ) : plans.length > 0 ? (
                                        plans.map((p, idx) => (
                                             <tr key={p._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-6 py-6">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-black text-bgray-900 dark:text-white uppercase tracking-tighter">LP-{(idx+1).toString().padStart(3, '0')}</span>
                                                            <span className="text-[9px] font-bold text-bgray-400 uppercase mt-1">Ref: {p.subject}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6 border-l border-bgray-100 dark:border-darkblack-400">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-black text-bgray-800 dark:text-bgray-100 uppercase">{p.lesson}</span>
                                                            <span className="text-[10px] text-success-300 font-bold uppercase mt-1 tracking-widest">Topic: {p.topic}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-bgray-600 dark:text-bgray-400">{p.date}</span>
                                                            <span className="text-[10px] font-black text-bgray-400 uppercase mt-1 tracking-tighter">{p.timeFrom} - {p.timeTo}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6 text-center">
                                                       <button 
                                                            onClick={() => toggleStatus(p._id, p.status)}
                                                            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                                            p.status === 'Complete' ? 'bg-success-300 text-white' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                                       }`}>
                                                            {p.status}
                                                       </button>
                                                  </td>
                                                  <td className="px-6 py-6 text-right">
                                                       <button onClick={() => deletePlan(p._id)} className="p-2 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={5} className="py-24 text-center">
                                                  <div className="max-w-[200px] mx-auto opacity-20 dark:invert">
                                                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                       <p className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Queue Empty</p>
                                                  </div>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400">
                                   <h3 className="text-xl font-bold dark:text-white uppercase tracking-tighter">Schedule Academic Session</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Assigning units to timeline</p>
                              </div>
                              <form onSubmit={handleSavePlan} className="p-8 space-y-5">
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Select Lesson</label>
                                             <select required value={formData.lesson} onChange={e => setFormData({...formData, lesson: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                                  <option value="">Choose Unit</option>
                                                  {lessonsList.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Select Topic</label>
                                             <select required value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                                  <option value="">Choose Topic</option>
                                                  {topicsList.map(t => <option key={t._id} value={t.name}>{t.name}</option>)}
                                             </select>
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Target Date</label>
                                        <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Start Time</label>
                                             <input required type="time" value={formData.timeFrom} onChange={e => setFormData({...formData, timeFrom: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">End Time</label>
                                             <input required type="time" value={formData.timeTo} onChange={e => setFormData({...formData, timeTo: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                   </div>
                                   <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 h-12 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-bold rounded-xl hover:bg-bgray-100 transition-all uppercase text-[10px] tracking-widest">Discard</button>
                                        <button type="submit" disabled={saving} className="px-10 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-lg shadow-success-300/20 transition-all uppercase text-[10px] tracking-widest">
                                             {saving ? "Scheduling..." : "RESERVE SLOT"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}
