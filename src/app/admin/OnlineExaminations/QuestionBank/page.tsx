"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function QuestionBank() {
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [searchQuery, setSearchQuery] = useState("");
     const [questions, setQuestions] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);

     // Dropdown data
     const [classes, setClasses] = useState<any[]>([]);
     const [sections, setSections] = useState<any[]>([]);
     const [subjects] = useState<string[]>(["English", "Mathematics", "Science", "Hindi", "Social Science", "Sanskrit", "Computer", "General Knowledge"]);
     
     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSection, setSelectedSection] = useState("");
     const [selectedSubject, setSelectedSubject] = useState("");
     const [selectedType, setSelectedType] = useState("");
     const [selectedLevel, setSelectedLevel] = useState("");

     // Modal states
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isEditMode, setIsEditMode] = useState(false);
     const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
     
     const [formData, setFormData] = useState({
          question: "",
          question_type: "Single Choice",
          level: "Medium",
          subject: "",
          class: "",
          section: "",
          answer: "",
          options: ["", "", "", ""]
     });

     useEffect(() => {
          fetchInitialData();
          fetchQuestions();
     }, []);

     const fetchInitialData = async () => {
          try {
               const classRes = await fetch("/api/classes");
               const classData = await classRes.json();
               if (classData.success) setClasses(classData.data);
          } catch (error) {
               console.error("Failed to fetch classes", error);
          }
     };

     useEffect(() => {
          if (selectedClass) {
               fetch(`/api/sections?class=${selectedClass}`)
                    .then(res => res.json())
                    .then(data => {
                         if (data.success) setSections(data.data);
                    });
          } else {
               setSections([]);
          }
     }, [selectedClass]);

     const fetchQuestions = async () => {
          setLoading(true);
          try {
               const params = new URLSearchParams();
               if (selectedClass) params.append("class", selectedClass);
               if (selectedSection) params.append("section", selectedSection);
               if (selectedSubject) params.append("subject", selectedSubject);
               if (selectedType) params.append("questionType", selectedType);
               if (selectedLevel) params.append("level", selectedLevel);

               const response = await fetch(`/api/online-exams/questions?${params.toString()}`);
               const data = await response.json();
               if (data.success) {
                    setQuestions(data.data);
               }
          } catch (error) {
               console.error("Failed to fetch questions", error);
          } finally {
               setLoading(false);
          }
     };

     // Auto-refresh on filter change
     useEffect(() => {
          fetchQuestions();
     }, [selectedClass, selectedSection, selectedSubject, selectedType, selectedLevel]);

     const toggleFilter = (type: string | null) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSaveQuestion = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
               const url = "/api/online-exams/questions" + (isEditMode ? `?id=${currentQuestionId}` : "");
               const method = isEditMode ? "PUT" : "POST";
               
               const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });

               const data = await response.json();
               if (data.success) {
                    setIsModalOpen(false);
                    resetForm();
                    fetchQuestions();
               } else {
                    alert(data.error || "Failed to save question");
               }
          } catch (error) {
               console.error("Error saving question", error);
          }
     };

     const resetForm = () => {
          setFormData({
               question: "",
               question_type: "Single Choice",
               level: "Medium",
               subject: "",
               class: "",
               section: "",
               answer: "",
               options: ["", "", "", ""]
          });
          setIsEditMode(false);
          setCurrentQuestionId(null);
          setIsModalOpen(false);
     };

     const handleEditQuestion = (question: any) => {
          setFormData({
               question: question.question,
               question_type: question.question_type,
               level: question.level,
               subject: question.subject,
               class: question.class,
               section: question.section,
               answer: question.answer,
               options: question.options && question.options.length > 0 ? question.options : ["", "", "", ""]
          });
          setCurrentQuestionId(question._id);
          setIsEditMode(true);
          setIsModalOpen(true);
     };

     const handleDeleteQuestion = async (id: string) => {
          if (!window.confirm("Are you sure you want to delete this question?")) return;
          try {
               const response = await fetch(`/api/online-exams/questions?id=${id}`, { method: "DELETE" });
               const data = await response.json();
               if (data.success) fetchQuestions();
          } catch (error) {
               console.error("Failed to delete question", error);
          }
     };

     const handleOptionChange = (index: number, value: string) => {
          const newOptions = [...formData.options];
          newOptions[index] = value;
          setFormData({ ...formData, options: newOptions });
     };

     const filteredQuestions = useMemo(() => {
          return questions.filter(q => 
               q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.subject.toLowerCase().includes(searchQuery.toLowerCase())
          );
     }, [questions, searchQuery]);

     return (
          <div className="flex flex-col space-y-6">
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Header Stats / Filters */}
                         <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-500 mb-6">
                              <div className="flex flex-col space-y-6">
                                   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                             <h3 className="text-xl font-black uppercase text-bgray-900 dark:text-white tracking-tight">Question Repository</h3>
                                             <p className="text-[10px] font-bold text-bgray-500 uppercase tracking-widest">Managing the central intellectual assets of the institution</p>
                                        </div>
                                        <button
                                             type="button"
                                             onClick={() => { resetForm(); setIsModalOpen(true); }}
                                             className="px-8 h-12 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-black transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-100 dark:shadow-none uppercase tracking-widest text-xs"
                                        >
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5V19M5 12H19" /></svg>
                                             <span>New Question</span>
                                        </button>
                                   </div>

                                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                        {/* Class Filter */}
                                        <div className="relative group">
                                             <button onClick={() => toggleFilter("class")} className="h-12 w-full rounded-xl bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center transition-all border-2 border-transparent focus:border-success-300">
                                                  <span className="text-xs font-bold text-bgray-600 dark:text-bgray-300 uppercase truncate">{selectedClass || "All Classes"}</span>
                                                  <svg className={`transition-transform ${openFilter === 'class' ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                             </button>
                                             {openFilter === "class" && (
                                                  <div className="absolute top-14 left-0 w-full z-50 bg-white dark:bg-darkblack-500 rounded-xl shadow-2xl border border-bgray-100 dark:border-darkblack-400 overflow-hidden font-bold uppercase text-[10px]">
                                                       <div onClick={() => { setSelectedClass(""); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors">All Classes</div>
                                                       {classes.map(c => (
                                                            <div key={c._id} onClick={() => { setSelectedClass(c.className); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors border-t border-bgray-50 dark:border-darkblack-400">
                                                                 {c.className}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        {/* Section Filter */}
                                        <div className="relative group">
                                             <button onClick={() => toggleFilter("section")} className="h-12 w-full rounded-xl bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center transition-all border-2 border-transparent focus:border-success-300">
                                                  <span className="text-xs font-bold text-bgray-600 dark:text-bgray-300 uppercase truncate">{selectedSection || "Section"}</span>
                                                  <svg className={`transition-transform ${openFilter === 'section' ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                             </button>
                                             {openFilter === "section" && (
                                                  <div className="absolute top-14 left-0 w-full z-50 bg-white dark:bg-darkblack-500 rounded-xl shadow-2xl border border-bgray-100 dark:border-darkblack-400 overflow-hidden font-bold uppercase text-[10px]">
                                                       <div onClick={() => { setSelectedSection(""); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors">All Sections</div>
                                                       {sections.map(s => (
                                                            <div key={s._id} onClick={() => { setSelectedSection(s.sectionName); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors border-t border-bgray-50 dark:border-darkblack-400">
                                                                 {s.sectionName}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        {/* Subject Filter */}
                                        <div className="relative group">
                                             <button onClick={() => toggleFilter("subject")} className="h-12 w-full rounded-xl bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center transition-all border-2 border-transparent focus:border-success-300">
                                                  <span className="text-xs font-bold text-bgray-600 dark:text-bgray-300 uppercase truncate">{selectedSubject || "Subject"}</span>
                                                  <svg className={`transition-transform ${openFilter === 'subject' ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                             </button>
                                             {openFilter === "subject" && (
                                                  <div className="absolute top-14 left-0 w-full z-50 bg-white dark:bg-darkblack-500 rounded-xl shadow-2xl border border-bgray-100 dark:border-darkblack-400 overflow-hidden font-bold uppercase text-[10px] max-h-60 overflow-y-auto">
                                                       <div onClick={() => { setSelectedSubject(""); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors">All Subjects</div>
                                                       {subjects.map(s => (
                                                            <div key={s} onClick={() => { setSelectedSubject(s); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors border-t border-bgray-50 dark:border-darkblack-400">
                                                                 {s}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        {/* Type Filter */}
                                        <div className="relative group">
                                             <button onClick={() => toggleFilter("type")} className="h-12 w-full rounded-xl bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center transition-all border-2 border-transparent focus:border-success-300">
                                                  <span className="text-xs font-bold text-bgray-600 dark:text-bgray-300 uppercase truncate">{selectedType || "Type"}</span>
                                                  <svg className={`transition-transform ${openFilter === 'type' ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                             </button>
                                             {openFilter === "type" && (
                                                  <div className="absolute top-14 left-0 w-full z-50 bg-white dark:bg-darkblack-500 rounded-xl shadow-2xl border border-bgray-100 dark:border-darkblack-400 overflow-hidden font-bold uppercase text-[10px]">
                                                       <div onClick={() => { setSelectedType(""); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors">All Types</div>
                                                       {["Single Choice", "Multiple Choice", "True/False", "Descriptive"].map(t => (
                                                            <div key={t} onClick={() => { setSelectedType(t); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors border-t border-bgray-50 dark:border-darkblack-400">
                                                                 {t}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        {/* Level Filter */}
                                        <div className="relative group">
                                             <button onClick={() => toggleFilter("level")} className="h-12 w-full rounded-xl bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center transition-all border-2 border-transparent focus:border-success-300">
                                                  <span className="text-xs font-bold text-bgray-600 dark:text-bgray-300 uppercase truncate">{selectedLevel || "Level"}</span>
                                                  <svg className={`transition-transform ${openFilter === 'level' ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                             </button>
                                             {openFilter === "level" && (
                                                  <div className="absolute top-14 left-0 w-full z-50 bg-white dark:bg-darkblack-500 rounded-xl shadow-2xl border border-bgray-100 dark:border-darkblack-400 overflow-hidden font-bold uppercase text-[10px]">
                                                       <div onClick={() => { setSelectedLevel(""); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors">All Levels</div>
                                                       {["Low", "Medium", "High"].map(l => (
                                                            <div key={l} onClick={() => { setSelectedLevel(l); toggleFilter(null); }} className="px-4 py-2 hover:bg-success-300 hover:text-white cursor-pointer transition-colors border-t border-bgray-50 dark:border-darkblack-400">
                                                                 {l}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        <button
                                             type="button"
                                             onClick={() => {
                                                  setSelectedClass("");
                                                  setSelectedSection("");
                                                  setSelectedSubject("");
                                                  setSelectedType("");
                                                  setSelectedLevel("");
                                             }}
                                             className="h-12 w-full rounded-xl bg-bgray-900 dark:bg-darkblack-500 text-white font-black hover:bg-black transition-all uppercase tracking-widest text-[9px]"
                                        >
                                             Wipe Static
                                        </button>
                                   </div>
                              </div>
                         </div>

                         {/* Results Table */}
                         <div className="w-full py-8 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-500 hover:border-success-300/30 transition-all">
                              <div className="flex flex-col space-y-6">
                                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="w-full md:w-96 h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 flex items-center space-x-3 focus-within:ring-2 focus:ring-success-300 font-bold transition-all border-none">
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                             <input 
                                                  type="text" 
                                                  placeholder="FILTER BY KEYWORD..." 
                                                  value={searchQuery} 
                                                  onChange={(e) => setSearchQuery(e.target.value)} 
                                                  className="bg-transparent border-none w-full text-xs dark:text-white placeholder:text-bgray-400 placeholder:font-black tracking-widest focus:ring-0 uppercase" 
                                             />
                                        </div>
                                        <div className="text-[10px] font-black text-bgray-400 uppercase tracking-widest bg-bgray-50 dark:bg-darkblack-400/20 px-4 py-2 rounded-lg border border-bgray-100">
                                             Inventory Count: <span className="text-success-300">{filteredQuestions.length} Items</span>
                                        </div>
                                   </div>

                                   <div className="w-full overflow-x-auto scrollbar-hide">
                                        <table className="w-full min-w-[1000px]">
                                             <thead>
                                                  <tr className="border-b-2 border-bgray-100 dark:border-darkblack-500">
                                                       <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-2">#</th>
                                                       <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Subject & Demographics</th>
                                                       <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Type & Complexity</th>
                                                       <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Intellectual Asset</th>
                                                       <th className="py-4 text-right text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Operations</th>
                                                  </tr>
                                             </thead>
                                             <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-500 font-bold uppercase tracking-tight">
                                                  {loading ? (
                                                       <tr><td colSpan={5} className="py-24 text-center">
                                                            <div className="flex flex-col items-center space-y-4">
                                                                 <div className="w-12 h-12 border-4 border-success-300 border-t-transparent rounded-full animate-spin"></div>
                                                                 <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest animate-pulse">Syncing Question Bank...</span>
                                                            </div>
                                                       </td></tr>
                                                  ) : filteredQuestions.length > 0 ? (
                                                       filteredQuestions.map((q, i) => (
                                                            <tr key={q._id} className="group hover:bg-bgray-50 dark:hover:bg-darkblack-500/50 transition-all cursor-default">
                                                                 <td className="py-6 px-2 text-[10px] text-bgray-400">{(i+1).toString().padStart(2, '0')}</td>
                                                                 <td className="py-6 px-4">
                                                                      <div className="flex flex-col">
                                                                           <span className="text-xs text-bgray-900 dark:text-white font-black">{q.subject}</span>
                                                                           <div className="flex space-x-2 mt-1">
                                                                                <span className="text-[9px] font-black text-success-600 dark:text-success-300 bg-success-50 dark:bg-success-900/20 px-1.5 rounded uppercase tracking-tighter">Class {q.class}</span>
                                                                                <span className="text-[9px] text-bgray-400">SEC: {q.section}</span>
                                                                           </div>
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-6 px-4">
                                                                      <div className="flex flex-col">
                                                                           <span className="text-[10px] text-bgray-600 dark:text-bgray-200">{q.question_type}</span>
                                                                           <span className={`text-[9px] font-black mt-1 ${
                                                                                q.level === "High" ? "text-red-600 bg-red-50 dark:bg-red-900/10" :
                                                                                q.level === "Medium" ? "text-orange-600 bg-orange-50 dark:bg-orange-900/10" :
                                                                                "text-success-600 bg-success-50 dark:bg-success-900/10"
                                                                           } px-2 py-0.5 rounded w-fit`}>{q.level?.toUpperCase()}</span>
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-6 px-4">
                                                                      <p className="text-[11px] text-bgray-900 dark:text-white normal-case font-bold max-w-md truncate group-hover:overflow-visible group-hover:whitespace-normal transition-all">{q.question}</p>
                                                                 </td>
                                                                 <td className="py-6 px-4">
                                                                      <div className="flex justify-end space-x-2">
                                                                           <button onClick={() => handleEditQuestion(q)} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 hover:text-success-300 hover:bg-white dark:hover:bg-darkblack-400 rounded-xl transition-all shadow-sm group/btn" title="Modify Asset">
                                                                                <svg className="transition-transform group-hover/btn:scale-110" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                                                           </button>
                                                                           <button onClick={() => handleDeleteQuestion(q._id)} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm group/del" title="Erase Record">
                                                                                <svg className="transition-transform group-hover/del:scale-110" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (
                                                       <tr><td colSpan={5} className="py-32 text-center text-bgray-400 font-black uppercase tracking-widest text-[10px]">Null results found for specified parameters.</td></tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>

               {/* Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-8">
                              <div className="flex items-center justify-between p-6 bg-bgray-50 dark:bg-darkblack-500 border-b border-bgray-200 dark:border-darkblack-400">
                                   <div className="flex flex-col">
                                        <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter">{isEditMode ? "Modify Intellectual Asset" : "Register New Question Entry"}</h3>
                                        <p className="text-[10px] font-bold text-bgray-500 uppercase tracking-widest">Ensuring data integrity in central repository</p>
                                   </div>
                                   <button onClick={resetForm} className="p-2 hover:bg-white dark:hover:bg-darkblack-400 rounded-full transition-all">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6L18 18"/></svg>
                                   </button>
                              </div>

                              <form onSubmit={handleSaveQuestion} className="p-8 space-y-8 overflow-y-auto font-bold uppercase tracking-tight">
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase">Primary Subject <span className="text-red-500">*</span></label>
                                             <select 
                                                  className="w-full h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 dark:text-white border-none focus:ring-2 focus:ring-success-300 font-black text-xs uppercase"
                                                  value={formData.subject}
                                                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                  required
                                             >
                                                  <option value="">Select Domain</option>
                                                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase">Target Class <span className="text-red-500">*</span></label>
                                             <select 
                                                  className="w-full h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 dark:text-white border-none focus:ring-2 focus:ring-success-300 font-black text-xs uppercase"
                                                  value={formData.class}
                                                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                                                  required
                                             >
                                                  <option value="">Select Category</option>
                                                  {classes.map(c => <option key={c._id} value={c.className}>{c.className}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase">Target Section <span className="text-red-500">*</span></label>
                                             <select 
                                                  className="w-full h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 dark:text-white border-none focus:ring-2 focus:ring-success-300 font-black text-xs uppercase"
                                                  value={formData.section}
                                                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                                                  required
                                             >
                                                  <option value="">All Regions</option>
                                                  {sections.map(s => <option key={s._id} value={s.sectionName}>{s.sectionName}</option>)}
                                             </select>
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase">Logical Type <span className="text-red-500">*</span></label>
                                             <select 
                                                  className="w-full h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 dark:text-white border-none focus:ring-2 focus:ring-success-300 font-black text-xs uppercase"
                                                  value={formData.question_type}
                                                  onChange={(e) => setFormData({...formData, question_type: e.target.value})}
                                             >
                                                  {["Single Choice", "Multiple Choice", "True/False", "Descriptive"].map(t => <option key={t} value={t}>{t}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase">Complexity Level</label>
                                             <select 
                                                  className="w-full h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 dark:text-white border-none focus:ring-2 focus:ring-success-300 font-black text-xs uppercase"
                                                  value={formData.level}
                                                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                                             >
                                                  {["Low", "Medium", "High"].map(l => <option key={l} value={l}>{l}</option>)}
                                             </select>
                                        </div>
                                   </div>

                                   <div className="space-y-2">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase">Question Content <span className="text-red-500">*</span></label>
                                        <textarea 
                                             className="w-full bg-bgray-100 dark:bg-darkblack-500 rounded-2xl p-6 min-h-[140px] dark:text-white border-none focus:ring-2 focus:ring-success-300 transition-all font-bold normal-case text-base"
                                             placeholder="Define the problem statement clearly..."
                                             value={formData.question}
                                             onChange={(e) => setFormData({...formData, question: e.target.value})}
                                             required
                                        />
                                   </div>

                                   {formData.question_type !== "Descriptive" && (
                                        <div className="space-y-6 bg-success-50/30 dark:bg-success-900/5 p-8 rounded-3xl border-2 border-dashed border-success-200 dark:border-success-500/20">
                                             <div className="flex justify-between items-center">
                                                  <label className="text-[10px] font-black text-success-600 dark:text-success-300 uppercase tracking-[0.2em]">Response Matrix (Options)</label>
                                                  <span className="text-[8px] bg-white dark:bg-success-900 px-2 py-1 rounded-full text-success-400">Binary + Supported</span>
                                             </div>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  {formData.options.map((option, idx) => (
                                                       <div key={idx} className="flex items-center space-x-4 bg-white dark:bg-darkblack-600 p-2 rounded-2xl shadow-sm border border-bgray-100 dark:border-darkblack-400">
                                                            <div className="w-10 h-10 rounded-xl bg-bgray-50 dark:bg-darkblack-500 flex items-center justify-center font-black text-xs text-bgray-400 border border-bgray-200 dark:border-darkblack-400">{String.fromCharCode(65 + idx)}</div>
                                                            <input 
                                                                 type="text"
                                                                 className="flex-1 h-10 bg-transparent border-none focus:ring-0 text-xs dark:text-white lowercase italic"
                                                                 placeholder="..."
                                                                 value={option}
                                                                 onChange={(e) => handleOptionChange(idx, e.target.value)}
                                                                 required={idx < 2}
                                                            />
                                                       </div>
                                                  ))}
                                             </div>
                                        </div>
                                   )}

                                   <div className="space-y-2">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest">Master Key / Canonical Answer <span className="text-red-500">*</span></label>
                                        <input 
                                             type="text"
                                             className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-5 dark:text-white border-none focus:ring-2 focus:ring-success-300 font-black text-sm uppercase tracking-widest placeholder:text-bgray-300"
                                             placeholder={formData.question_type === "Descriptive" ? "CRITERIA..." : "INDEX (E.G. 'A', 'B' OR 'TRUE')"}
                                             value={formData.answer}
                                             onChange={(e) => setFormData({...formData, answer: e.target.value})}
                                             required
                                        />
                                   </div>

                                   <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
                                        <button 
                                             type="submit"
                                             className="flex-[2] h-16 bg-[#22C55E] hover:bg-[#16a34a] text-white font-black rounded-2xl shadow-xl shadow-green-100 dark:shadow-none transition-all flex items-center justify-center uppercase tracking-widest text-sm"
                                        >
                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mr-3"><path d="M5 13l4 4L19 7" /></svg>
                                             {isEditMode ? "Commit Updates" : "Finalize Asset"}
                                        </button>
                                        <button 
                                             type="button" 
                                             onClick={resetForm}
                                             className="flex-1 h-16 bg-bgray-200 dark:bg-darkblack-500 text-bgray-900 dark:text-white font-black rounded-2xl hover:bg-bgray-300 transition-all uppercase tracking-widest text-sm"
                                        >
                                             Abort
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}