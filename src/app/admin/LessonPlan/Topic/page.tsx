"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function TopicsPage() {
     const [classList, setClassList] = useState<any[]>([]);
     const [sectionList, setSectionList] = useState<any[]>([]);
     const [groupsList, setGroupsList] = useState<any[]>([]);
     const [subjectsList, setSubjectsList] = useState<any[]>([]);
     const [lessonsList, setLessonsList] = useState<any[]>([]);
     const [topics, setTopics] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          class: "",
          section: "",
          subjectGroup: "",
          subject: "",
          lesson: "",
          topicNames: [""]
     });

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClassList(data.data);
     };

     const fetchTopics = async () => {
          setLoading(true);
          const res = await fetch("/api/topics");
          const data = await res.json();
          if (data.success) setTopics(data.data);
          setLoading(false);
     };

     useEffect(() => {
          fetchClasses();
          fetchTopics();
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

     useEffect(() => {
          if (formData.subject) {
               fetch(`/api/lessons?class=${formData.class}&section=${formData.section}&subject=${formData.subject}`)
                    .then(r => r.json())
                    .then(d => { if(d.success) setLessonsList(d.data); });
          }
     }, [formData.subject, formData.class, formData.section]);

     const handleAddTopicInput = () => {
          setFormData({ ...formData, topicNames: [...formData.topicNames, ""] });
     };

     const handleRemoveTopicInput = (index: number) => {
          setFormData({ ...formData, topicNames: formData.topicNames.filter((_, i) => i !== index) });
     };

     const handleTopicNameChange = (index: number, val: string) => {
          const names = [...formData.topicNames];
          names[index] = val;
          setFormData({ ...formData, topicNames: names });
     };

     const handleSave = async () => {
          if (!formData.lesson || formData.topicNames.some(n => !n)) {
               alert("Please fill all required fields");
               return;
          }
          setSaving(true);
          const payloads = formData.topicNames.map(name => ({
               name,
               lesson: formData.lesson,
               class: formData.class,
               section: formData.section,
               subjectGroup: formData.subjectGroup,
               subject: formData.subject
          }));

          try {
               await fetch("/api/topics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payloads)
               });
               setFormData({ ...formData, topicNames: [""] });
               fetchTopics();
          } catch (e) {
               console.error(e);
          } finally {
               setSaving(false);
          }
     };

     const deleteTopic = async (id: string) => {
          if (!confirm("Delete this topic?")) return;
          await fetch(`/api/topics?id=${id}`, { method: "DELETE" });
          fetchTopics();
     };

     const groupedTopics = useMemo(() => {
          const map: any = {};
          topics.forEach(t => {
               const key = `${t.class}-${t.lesson}-${t.subject}`;
               if (!map[key]) map[key] = { ...t, allTopics: [] };
               map[key].allTopics.push(t);
          });
          return Object.values(map);
     }, [topics]);

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Form Component */}
                    <section className="2xl:w-[400px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Topic registration
                              </h3>
                              <div className="space-y-4">
                                   <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                             <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Target Class</label>
                                             <select 
                                                  value={formData.class}
                                                  onChange={e => setFormData({ ...formData, class: e.target.value })}
                                                  className="w-full h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-3 text-[11px] font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                             >
                                                  <option value="">Class</option>
                                                  {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Section</label>
                                             <select 
                                                  value={formData.section}
                                                  onChange={e => setFormData({ ...formData, section: e.target.value })}
                                                  className="w-full h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-3 text-[11px] font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                             >
                                                  <option value="">Section</option>
                                                  {sectionList.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                                             </select>
                                        </div>
                                   </div>
                                   
                                   <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-bgray-500 uppercase tracking-widest">Subject Group</label>
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

                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Parent Lesson</label>
                                        <select 
                                             value={formData.lesson}
                                             onChange={e => setFormData({ ...formData, lesson: e.target.value })}
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 border-l-4 border-success-300"
                                        >
                                             <option value="">Choose Lesson</option>
                                             {lessonsList.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                                        </select>
                                   </div>

                                   <div className="pt-4 border-t border-dashed border-bgray-200 dark:border-darkblack-400">
                                        <div className="flex justify-between items-center mb-3 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                             <span>Granular Topics</span>
                                             <button onClick={handleAddTopicInput} className="text-success-300 hover:underline">+ Multiple</button>
                                        </div>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 flex flex-col gap-2">
                                             {formData.topicNames.map((name, idx) => (
                                                  <div key={idx} className="flex gap-2 animate-in fade-in duration-300">
                                                       <input 
                                                            type="text"
                                                            value={name}
                                                            onChange={e => handleTopicNameChange(idx, e.target.value)}
                                                            className="flex-1 h-9 bg-bgray-50 dark:bg-darkblack-500 rounded-lg px-4 text-[11px] font-bold border-none outline-none focus:ring-2 focus:ring-success-300/20"
                                                            placeholder="e.g. History of Rome"
                                                       />
                                                       {formData.topicNames.length > 1 && (
                                                            <button onClick={() => handleRemoveTopicInput(idx)} className="text-bgray-300 hover:text-red-500 transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
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
                                        {saving ? "Deploying..." : "REGISTER TOPICS"}
                                   </button>
                              </div>
                         </div>
                    </section>

                    {/* Table View */}
                    <section className="flex-1 mt-6 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden min-h-[600px]">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/10 hover:bg-bgray-50 transition-colors">
                                   <div className="flex flex-col">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-bgray-900 dark:text-white">Detailed Topic Matrix</h4>
                                        <span className="text-[9px] font-bold text-bgray-400 uppercase tracking-tighter">Granular Syllabus Breakdown</span>
                                   </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-success-300 animate-pulse"></div>
                                        <span className="text-[9px] font-black text-bgray-400 uppercase tracking-widest">Live Record</span>
                                   </div>
                              </div>
                              <div className="overflow-x-auto">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                                  <th className="px-6 py-4">Context</th>
                                                  <th className="px-6 py-4">Parent Lesson</th>
                                                  <th className="px-6 py-4">Granular Topics</th>
                                                  <th className="px-6 py-4 text-right">Metrics</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                             {loading ? (
                                                  <tr><td colSpan={4} className="py-24 text-center"><div className="w-8 h-8 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                             ) : groupedTopics.length > 0 ? (
                                                  groupedTopics.map((group: any, idx) => (
                                                       <tr key={idx} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/10 transition-colors group">
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-xs font-black text-bgray-900 dark:text-white uppercase">{group.class} ({group.section})</span>
                                                                      <span className="text-[9px] font-bold text-bgray-400 uppercase mt-1">Group: {group.subjectGroup}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6 border-l border-bgray-100 dark:border-darkblack-400">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-xs font-black text-success-300 uppercase tracking-tighter">{group.lesson}</span>
                                                                      <span className="text-[9px] text-bgray-400 font-bold uppercase mt-1 tracking-tighter">{group.subject}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-wrap gap-1.5 max-w-md">
                                                                      {group.allTopics.map((t: any) => (
                                                                           <div key={t._id} className="group/item flex items-center gap-3 bg-white dark:bg-darkblack-500 pl-4 pr-2 py-1.5 rounded-lg border border-bgray-200 dark:border-darkblack-400 shadow-sm transition-all hover:shadow-md">
                                                                                <span className="text-[10px] font-black text-bgray-700 dark:text-bgray-200 uppercase tracking-tighter">{t.name}</span>
                                                                                <button onClick={() => deleteTopic(t._id)} className="text-bgray-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-right">
                                                                 <span className="px-3 py-1 bg-bgray-100 dark:bg-darkblack-400 rounded-full text-[9px] font-black text-bgray-500 uppercase">{group.allTopics.length} Units</span>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr>
                                                       <td colSpan={4} className="py-24 text-center">
                                                            <div className="max-w-[140px] mx-auto opacity-10">
                                                                 <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                                                 <p className="text-[9px] font-black uppercase tracking-widest">No Topics Defined</p>
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