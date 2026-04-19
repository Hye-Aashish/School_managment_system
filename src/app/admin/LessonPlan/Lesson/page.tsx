"use client";
import React, { useState, useEffect, useMemo } from "react";
import { TableSkeleton } from "@/app/common/Skeleton";

export default function LessonsPage() {
     const [classList, setClassList] = useState<any[]>([]);
     const [sectionList, setSectionList] = useState<any[]>([]);
     const [groupsList, setGroupsList] = useState<any[]>([]);
     const [subjectsList, setSubjectsList] = useState<any[]>([]);
     const [lessons, setLessons] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          class: "",
          section: "",
          subjectGroup: "",
          subject: "",
          lessonNames: [""]
     });

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClassList(data.data);
     };

     const fetchLessons = async () => {
          setLoading(true);
          const res = await fetch("/api/lessons");
          const data = await res.json();
          if (data.success) setLessons(data.data);
          setLoading(false);
     };

     useEffect(() => {
          fetchClasses();
          fetchLessons();
     }, []);

     useEffect(() => {
          if (formData.class) {
               const cls = classList.find(c => c.name === formData.class);
               if (cls) setSectionList(cls.sections || []);
          }
     }, [formData.class, classList]);

     useEffect(() => {
          if (formData.class && formData.section) {
               fetch(`/api/subject-groups?class=${formData.class}&section=${formData.section}`)
                    .then(r => r.json())
                    .then(d => { if(d.success) setGroupsList(d.data); });
          }
     }, [formData.class, formData.section]);

     useEffect(() => {
          if (formData.subjectGroup) {
               const group = groupsList.find(g => g.name === formData.subjectGroup);
               if (group) setSubjectsList(group.subjects || []);
          }
     }, [formData.subjectGroup, groupsList]);

     const handleAddLessonInput = () => {
          setFormData({ ...formData, lessonNames: [...formData.lessonNames, ""] });
     };

     const handleRemoveLessonInput = (index: number) => {
          setFormData({ ...formData, lessonNames: formData.lessonNames.filter((_, i) => i !== index) });
     };

     const handleLessonNameChange = (index: number, val: string) => {
          const names = [...formData.lessonNames];
          names[index] = val;
          setFormData({ ...formData, lessonNames: names });
     };

     const handleSave = async () => {
          if (!formData.class || !formData.section || !formData.subject || formData.lessonNames.some(n => !n)) {
               alert("Please fill all required fields");
               return;
          }
          setSaving(true);
          const payloads = formData.lessonNames.map(name => ({
               name,
               class: formData.class,
               section: formData.section,
               subjectGroup: formData.subjectGroup,
               subject: formData.subject
          }));

          try {
               await fetch("/api/lessons", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payloads)
               });
               setFormData({ ...formData, lessonNames: [""] });
               fetchLessons();
          } catch (e) {
               console.error(e);
          } finally {
               setSaving(false);
          }
     };

     const deleteLesson = async (id: string) => {
          if (!confirm("Delete this lesson?")) return;
          await fetch(`/api/lessons?id=${id}`, { method: "DELETE" });
          fetchLessons();
     };

     const groupedLessons = useMemo(() => {
          const map: any = {};
          lessons.forEach(l => {
               const key = `${l.class}-${l.section}-${l.subject}`;
               if (!map[key]) map[key] = { ...l, allLessons: [] };
               map[key].allLessons.push(l);
          });
          return Object.values(map);
     }, [lessons]);

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Form Section */}
                    <section className="2xl:w-[400px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Create Lessons
                              </h3>
                              <div className="space-y-4">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Target Class</label>
                                        <select 
                                             value={formData.class}
                                             onChange={e => setFormData({ ...formData, class: e.target.value })}
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                        >
                                             <option value="">Select Class</option>
                                             {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                        </select>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Section</label>
                                        <select 
                                             value={formData.section}
                                             onChange={e => setFormData({ ...formData, section: e.target.value })}
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                        >
                                             <option value="">Select Section</option>
                                             {sectionList.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                                        </select>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Subject Group</label>
                                        <select 
                                             value={formData.subjectGroup}
                                             onChange={e => setFormData({ ...formData, subjectGroup: e.target.value })}
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                        >
                                             <option value="">Select Group</option>
                                             {groupsList.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
                                        </select>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Subject</label>
                                        <select 
                                             value={formData.subject}
                                             onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                        >
                                             <option value="">Select Subject</option>
                                             {subjectsList.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                                        </select>
                                   </div>

                                   <div className="pt-4 border-t border-dashed border-bgray-200 dark:border-darkblack-400">
                                        <div className="flex justify-between items-center mb-4">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Lesson Units</label>
                                             <button onClick={handleAddLessonInput} className="text-[10px] font-black text-success-300 hover:text-success-400 uppercase tracking-tighter transition-colors">+ Add Unit</button>
                                        </div>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                             {formData.lessonNames.map((name, idx) => (
                                                  <div key={idx} className="flex gap-2 animate-in slide-in-from-left-2 duration-200">
                                                       <input 
                                                            type="text"
                                                            value={name}
                                                            onChange={e => handleLessonNameChange(idx, e.target.value)}
                                                            className="flex-1 h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-lg px-4 text-[11px] font-bold border-none outline-none focus:ring-2 focus:ring-success-300/20"
                                                            placeholder="e.g. Intro to Algebra"
                                                       />
                                                       {formData.lessonNames.length > 1 && (
                                                            <button onClick={() => handleRemoveLessonInput(idx)} className="text-bgray-300 hover:text-red-500 transition-colors px-1">
                                                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                       )}
                                                  </div>
                                             ))}
                                        </div>
                                   </div>

                                   <button 
                                        disabled={saving}
                                        onClick={handleSave}
                                        className="w-full h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 disabled:opacity-50 mt-4 uppercase tracking-[0.2em] text-[10px]"
                                   >
                                        {saving ? "Deploying..." : "SAVE CURRICULUM"}
                                   </button>
                              </div>
                         </div>
                    </section>

                    {/* Table Section */}
                    <section className="flex-1 mt-6 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden min-h-[600px]">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/50 dark:bg-darkblack-500/10">
                                   <h4 className="text-sm font-black uppercase tracking-widest text-bgray-900 dark:text-white">curriculum repository</h4>
                                   <span className="text-[10px] font-bold text-bgray-400 uppercase tracking-tighter">Total Groups: {groupedLessons.length}</span>
                              </div>
                              <div className="overflow-x-auto">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                                  <th className="px-6 py-4">Demographics</th>
                                                  <th className="px-6 py-4">Subject Information</th>
                                                  <th className="px-6 py-4">Syllabus Breakdown</th>
                                                  <th className="px-6 py-4 text-right">Administrative</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                             {loading ? (
                                                  <tr><td colSpan={4} className="py-10 px-6"><TableSkeleton rows={8} /></td></tr>
                                             ) : groupedLessons.length > 0 ? (
                                                  groupedLessons.map((group: any, idx) => (
                                                       <tr key={idx} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/10 transition-colors group">
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-xs font-black text-bgray-900 dark:text-white uppercase">{group.class}</span>
                                                                      <span className="text-[10px] font-bold text-bgray-400 uppercase mt-1">Section: {group.section}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-xs font-black text-success-300 uppercase">{group.subject}</span>
                                                                      <span className="text-[10px] text-bgray-400 font-bold uppercase mt-1 tracking-tighter">{group.subjectGroup}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-wrap gap-1.5 max-w-sm">
                                                                      {group.allLessons.map((l: any) => (
                                                                           <div key={l._id} className="group/item flex items-center gap-2 bg-bgray-50 dark:bg-darkblack-500 pl-3 pr-2 py-1 rounded-full border border-bgray-100 dark:border-darkblack-400 transition-all hover:border-red-200">
                                                                                <span className="text-[9px] font-black text-bgray-600 dark:text-bgray-200 uppercase tracking-tighter">{l.name}</span>
                                                                                <button onClick={() => deleteLesson(l._id)} className="text-bgray-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-right">
                                                                 <div className="text-[10px] font-black text-bgray-300 uppercase tracking-widest">{group.allLessons.length} units</div>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr>
                                                       <td colSpan={4} className="py-24 text-center">
                                                            <div className="max-w-[140px] mx-auto opacity-20 dark:invert">
                                                                 <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                                                 <p className="text-[9px] font-black uppercase tracking-widest">Lessons Archive Empty</p>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </section>
               </div>
          </div>
     );
}