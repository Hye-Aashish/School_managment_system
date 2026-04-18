"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function OnlineExamList() {
     const [activeTab, setActiveTab] = useState<"upcoming" | "closed">("upcoming");
     const [searchQuery, setSearchQuery] = useState("");
     const [exams, setExams] = useState<any[]>([]);
     const [allQuestions, setAllQuestions] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);

     // Dropdown data
     const [classes, setClasses] = useState<any[]>([]);
     const [sections, setSections] = useState<any[]>([]);

     // Modal states
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isEditMode, setIsEditMode] = useState(false);
     const [currentExamId, setCurrentExamId] = useState<string | null>(null);
     
     const [formData, setFormData] = useState({
          title: "",
          description: "",
          class: "",
          section: "",
          exam_from: "",
          exam_to: "",
          duration: "01:30:00",
          attempts: 1,
          is_published: false,
          result_published: false,
          questions: [] as string[]
     });

     // Safe date initialization on mount to avoid hydration mismatch
     useEffect(() => {
          setFormData(prev => ({
               ...prev,
               exam_from: new Date().toISOString().slice(0, 16),
               exam_to: new Date(Date.now() + 3600000).toISOString().slice(0, 16)
          }));
          fetchInitialData();
          fetchAllQuestions();
     }, []);

     useEffect(() => {
          fetchExams();
     }, [activeTab]);

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
          if (formData.class) {
               fetch(`/api/sections?class=${formData.class}`)
                    .then(res => res.json())
                    .then(data => {
                         if (data.success) setSections(data.data);
                    });
          } else {
               setSections([]);
          }
     }, [formData.class]);

     const fetchExams = async () => {
          setLoading(true);
          try {
               const response = await fetch(`/api/online-exams/exams?status=${activeTab}`);
               const data = await response.json();
               if (data.success) {
                    setExams(data.data);
               }
          } catch (error) {
               console.error("Failed to fetch exams", error);
          } finally {
               setLoading(false);
          }
     };

     const fetchAllQuestions = async () => {
          try {
               const response = await fetch("/api/online-exams/questions");
               const data = await response.json();
               if (data.success) {
                    setAllQuestions(data.data);
               }
          } catch (error) {
               console.error("Failed to fetch questions", error);
          }
     };

     const handleSaveExam = async (e: React.FormEvent) => {
          e.preventDefault();
          if (formData.questions.length === 0) {
              alert("Please select at least one question for the exam.");
              return;
          }
          try {
               const url = "/api/online-exams/exams" + (isEditMode ? `?id=${currentExamId}` : "");
               const method = isEditMode ? "PUT" : "POST";
               
               const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });

               const data = await response.json();
               if (data.success) {
                    resetForm();
                    fetchExams();
               } else {
                    alert(data.error || "Failed to save exam");
               }
          } catch (error) {
               console.error("Error saving exam", error);
          }
     };

     const resetForm = () => {
          setFormData({
               title: "",
               description: "",
               class: "",
               section: "",
               exam_from: new Date().toISOString().slice(0, 16),
               exam_to: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
               duration: "01:30:00",
               attempts: 1,
               is_published: false,
               result_published: false,
               questions: []
          });
          setIsEditMode(false);
          setCurrentExamId(null);
          setIsModalOpen(false);
     };

     const handleEditExam = (exam: any) => {
          setFormData({
               title: exam.title,
               description: exam.description || "",
               class: exam.class || "",
               section: exam.section || "",
               exam_from: exam.exam_from ? new Date(exam.exam_from).toISOString().slice(0, 16) : "",
               exam_to: exam.exam_to ? new Date(exam.exam_to).toISOString().slice(0, 16) : "",
               duration: exam.duration,
               attempts: exam.attempts,
               is_published: exam.is_published,
               result_published: exam.result_published,
               questions: exam.questions ? exam.questions.map((q: any) => typeof q === 'string' ? q : q._id) : []
          });
          setCurrentExamId(exam._id);
          setIsEditMode(true);
          setIsModalOpen(true);
     };

     const handleDeleteExam = async (id: string) => {
          if (!window.confirm("Permanently delete this examination record?")) return;
          try {
               const response = await fetch(`/api/online-exams/exams?id=${id}`, { method: "DELETE" });
               const data = await response.json();
               if (data.success) fetchExams();
          } catch (error) {
               console.error("Failed to delete exam", error);
          }
     };

     const toggleQuestionSelection = (questionId: string) => {
          const newQuestions = [...formData.questions];
          const index = newQuestions.indexOf(questionId);
          if (index > -1) {
               newQuestions.splice(index, 1);
          } else {
               newQuestions.push(questionId);
          }
          setFormData({ ...formData, questions: newQuestions });
     };

     const formatDate = (dateStr: string) => {
          if (!dateStr) return "N/A";
          const date = new Date(dateStr);
          return date.toLocaleString('en-US', { 
               month: 'short', 
               day: 'numeric', 
               year: 'numeric', 
               hour: 'numeric', 
               minute: '2-digit', 
               hour12: true 
          });
     };

     const filteredExams = useMemo(() => {
          return exams.filter(e => 
               e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               e.class.toLowerCase().includes(searchQuery.toLowerCase())
          );
     }, [exams, searchQuery]);

     return (
          <div className="flex flex-col space-y-6">
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Header Controls */}
                         <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-500 mb-6">
                              <div className="flex flex-col space-y-6">
                                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center space-x-1 p-1 bg-bgray-100 dark:bg-darkblack-500 rounded-xl border border-bgray-200 dark:border-darkblack-400">
                                             <button
                                                  onClick={() => setActiveTab("upcoming")}
                                                  className={`px-8 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTab === "upcoming" ? "bg-white dark:bg-darkblack-600 text-success-300 shadow-sm" : "text-bgray-500"}`}
                                             >
                                                  Upcoming Sessions
                                             </button>
                                             <button
                                                  onClick={() => setActiveTab("closed")}
                                                  className={`px-8 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTab === "closed" ? "bg-white dark:bg-darkblack-600 text-success-300 shadow-sm" : "text-bgray-500"}`}
                                             >
                                                  Archived Exams
                                             </button>
                                        </div>

                                        <button
                                             type="button"
                                             onClick={() => { resetForm(); setIsModalOpen(true); }}
                                             className="px-8 h-12 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-black transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-100 dark:shadow-none uppercase tracking-widest text-xs"
                                        >
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5V19M5 12H19" /></svg>
                                             <span>New Examination</span>
                                        </button>
                                   </div>

                                   <div className="w-full h-12 bg-bgray-100 dark:bg-darkblack-500 rounded-xl px-4 flex items-center space-x-3 focus-within:ring-2 focus:ring-success-300 font-bold transition-all border-none">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                        <input 
                                             type="text" 
                                             placeholder="SEARCH BY COURSE OR TITLE..." 
                                             value={searchQuery} 
                                             onChange={(e) => setSearchQuery(e.target.value)} 
                                             className="bg-transparent border-none w-full text-xs dark:text-white placeholder:text-bgray-400 placeholder:font-black tracking-widest focus:ring-0 uppercase font-black" 
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* Results Table */}
                         <div className="w-full py-8 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-500">
                              <div className="w-full overflow-x-auto scrollbar-hide">
                                   <table className="w-full min-w-[1000px]">
                                        <thead>
                                             <tr className="border-b-2 border-bgray-100 dark:border-darkblack-500">
                                                  <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-2">#</th>
                                                  <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Examination Identity</th>
                                                  <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Allocated Demographic</th>
                                                  <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Timeline</th>
                                                  <th className="py-4 text-left text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Status</th>
                                                  <th className="py-4 text-right text-[10px] font-black text-bgray-500 uppercase tracking-widest px-4">Operations</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-500 uppercase font-bold tracking-tight">
                                             {loading ? (
                                                  <tr><td colSpan={6} className="py-24 text-center">
                                                       <div className="flex flex-col items-center space-y-4">
                                                            <div className="w-12 h-12 border-4 border-success-300 border-t-transparent rounded-full animate-spin"></div>
                                                            <span className="text-[10px] font-black text-bgray-400 tracking-widest">Querying Assessment Records...</span>
                                                       </div>
                                                  </td></tr>
                                             ) : filteredExams.length > 0 ? (
                                                  filteredExams.map((exam, i) => (
                                                       <tr key={exam._id} className="group hover:bg-bgray-50 dark:hover:bg-darkblack-500/50 transition-all">
                                                            <td className="py-6 px-2 text-[10px] text-bgray-400">{(i+1).toString().padStart(2, '0')}</td>
                                                            <td className="py-6 px-4">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-sm text-bgray-900 dark:text-white font-black normal-case">{exam.title}</span>
                                                                      <span className="text-[9px] font-black text-success-600 dark:text-success-300 bg-success-50 dark:bg-success-900/20 px-1.5 rounded w-fit mt-1 tracking-[0.1em]">{exam.questions?.length || 0} QUESTIONS ENROLLED</span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-6 px-4">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-xs text-bgray-700 dark:text-bgray-200">CLASS {exam.class}</span>
                                                                      <span className="text-[9px] text-bgray-400 mt-0.5">SECTION: {exam.section}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-6 px-4">
                                                                 <div className="flex flex-col space-y-1">
                                                                      <div className="flex items-center space-x-2">
                                                                           <span className="text-[9px] text-bgray-400 min-w-[30px]">FROM:</span>
                                                                           <span className="text-[10px] text-bgray-700 dark:text-bgray-300 normal-case">{formatDate(exam.exam_from)}</span>
                                                                      </div>
                                                                      <div className="flex items-center space-x-2">
                                                                           <span className="text-[9px] text-bgray-400 min-w-[30px]">TO:</span>
                                                                           <span className="text-[10px] text-bgray-700 dark:text-bgray-300 normal-case">{formatDate(exam.exam_to)}</span>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td className="py-6 px-4">
                                                                 <div className="flex flex-col space-y-1">
                                                                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black w-fit tracking-widest ${exam.is_published ? "bg-success-50 text-success-300 border border-success-100" : "bg-orange-50 text-orange-600 border border-orange-100"}`}>
                                                                           {exam.is_published ? "LIVE" : "DRAFT"}
                                                                      </span>
                                                                      {exam.result_published && (
                                                                           <span className="text-[8px] font-black text-blue-500 tracking-tighter uppercase">+ RESULTS DEPLOYED</span>
                                                                      )}
                                                                 </div>
                                                            </td>
                                                            <td className="py-6 px-4">
                                                                 <div className="flex justify-end space-x-2">
                                                                      <button onClick={() => handleEditExam(exam)} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 hover:text-success-300 hover:bg-white rounded-xl transition-all shadow-sm group/btn">
                                                                           <svg className="transition-transform group-hover/btn:scale-110" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                                                      </button>
                                                                      <button onClick={() => handleDeleteExam(exam._id)} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm group/del">
                                                                           <svg className="transition-transform group-hover/del:scale-110" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                                      </button>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr><td colSpan={6} className="py-32 text-center text-bgray-400 font-black uppercase tracking-widest text-[10px]">No active examination sessions found.</td></tr>
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </section>
               </div>

               {/* Exam Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-8">
                              <div className="flex items-center justify-between p-8 bg-bgray-50 dark:bg-darkblack-500 border-b border-bgray-200 dark:border-darkblack-400">
                                   <div className="flex flex-col">
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">{isEditMode ? "Modify Assessment Vector" : "Deploy New Examination Protocol"}</h3>
                                        <p className="text-[10px] font-bold text-bgray-500 uppercase tracking-[0.3em]">Configure academic assessment parameters</p>
                                   </div>
                                   <button onClick={resetForm} className="p-2 hover:bg-white dark:hover:bg-darkblack-400 rounded-full transition-all">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6L6 18M6 6L18 18"/></svg>
                                   </button>
                              </div>

                              <form onSubmit={handleSaveExam} className="p-8 space-y-10 overflow-y-auto font-black uppercase tracking-widest text-[10px]">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Examination Title <span className="text-red-500">*</span></label>
                                             <input 
                                                  type="text"
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 transition-all font-black text-sm normal-case shadow-inner"
                                                  placeholder="e.g. End Term Academic Review 2024"
                                                  value={formData.title}
                                                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                  required
                                             />
                                        </div>
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Temporal Duration (HH:MM:SS) <span className="text-red-500">*</span></label>
                                             <input 
                                                  type="text"
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 transition-all font-black text-sm shadow-inner"
                                                  placeholder="01:30:00"
                                                  value={formData.duration}
                                                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                                  required
                                             />
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Demographic Targeted (Class) <span className="text-red-500">*</span></label>
                                             <select 
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 font-black text-sm uppercase"
                                                  value={formData.class}
                                                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                                                  required
                                             >
                                                  <option value="">Select Domain</option>
                                                  {classes.map(c => <option key={c._id} value={c.className}>{c.className}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Region Allocated (Section) <span className="text-red-500">*</span></label>
                                             <select 
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 font-black text-sm uppercase"
                                                  value={formData.section}
                                                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                                                  required
                                             >
                                                  <option value="">Select Zone</option>
                                                  {sections.map(s => <option key={s._id} value={s.sectionName}>{s.sectionName}</option>)}
                                             </select>
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Ingress (Start Time) <span className="text-red-500">*</span></label>
                                             <input 
                                                  type="datetime-local"
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 transition-all font-black text-xs"
                                                  value={formData.exam_from}
                                                  onChange={(e) => setFormData({...formData, exam_from: e.target.value})}
                                                  required
                                             />
                                        </div>
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Egress (End Time) <span className="text-red-500">*</span></label>
                                             <input 
                                                  type="datetime-local"
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 transition-all font-black text-xs"
                                                  value={formData.exam_to}
                                                  onChange={(e) => setFormData({...formData, exam_to: e.target.value})}
                                                  required
                                             />
                                        </div>
                                        <div className="space-y-3">
                                             <label className="text-bgray-500 ml-1">Max Retries Allowed <span className="text-red-500">*</span></label>
                                             <input 
                                                  type="number"
                                                  className="w-full h-14 bg-bgray-100 dark:bg-darkblack-500 rounded-2xl px-6 dark:text-white border-2 border-transparent focus:border-success-300 transition-all font-black text-sm"
                                                  value={formData.attempts}
                                                  onChange={(e) => setFormData({...formData, attempts: parseInt(e.target.value)})}
                                                  min="1"
                                                  required
                                             />
                                        </div>
                                   </div>

                                   <div className="space-y-3">
                                        <label className="text-bgray-500 ml-1">Instructional Metadata</label>
                                        <textarea 
                                             className="w-full bg-bgray-100 dark:bg-darkblack-500 rounded-3xl p-6 min-h-[120px] dark:text-white border-2 border-transparent focus:border-success-300 transition-all font-bold normal-case text-base shadow-inner"
                                             placeholder="Define rules of engagement for candidates..."
                                             value={formData.description}
                                             onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        />
                                   </div>

                                   <div className="bg-success-50/20 dark:bg-success-900/5 p-8 rounded-[40px] border-2 border-dashed border-success-200 dark:border-success-500/20">
                                        <div className="flex justify-between items-center mb-8">
                                             <div className="flex flex-col">
                                                  <label className="text-xs font-black text-success-600 dark:text-success-300 tracking-[0.2em]">Asset Selection ({formData.questions.length} Units)</label>
                                                  <span className="text-[8px] text-success-400 mt-1 uppercase">Link questions from central question bank</span>
                                             </div>
                                             <span className="bg-white dark:bg-success-900 px-4 py-1.5 rounded-full text-[9px] text-success-500 font-black shadow-sm">MIN 01 REQ</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-h-[350px] overflow-y-auto pr-4 scrollbar-hide">
                                             {allQuestions.length === 0 ? (
                                                  <div className="col-span-3 py-20 text-center flex flex-col items-center space-y-3">
                                                       <svg className="text-bgray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20"/></svg>
                                                       <p className="text-bgray-400 normal-case italic font-medium">Repository is empty. Populate Question Bank first.</p>
                                                  </div>
                                             ) : allQuestions.map((q) => (
                                                  <div 
                                                       key={q._id} 
                                                       onClick={() => toggleQuestionSelection(q._id)}
                                                       className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-4 shadow-sm h-full ${
                                                            formData.questions.includes(q._id) 
                                                            ? "border-success-300 bg-white dark:bg-darkblack-600 ring-4 ring-success-50 dark:ring-success-900/10" 
                                                            : "border-bgray-100 dark:border-darkblack-400 bg-white dark:bg-darkblack-600 hover:border-success-200"
                                                       }`}
                                                  >
                                                       <div className={`mt-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                                            formData.questions.includes(q._id) 
                                                            ? "border-success-300 bg-success-300 text-white" 
                                                            : "border-bgray-200"
                                                       }`}>
                                                            {formData.questions.includes(q._id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                                                       </div>
                                                       <div className="overflow-hidden flex flex-col space-y-2">
                                                            <p className="font-bold text-[10px] dark:text-white normal-case leading-relaxed line-clamp-3">{q.question}</p>
                                                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                                                 <span className="text-[7px] bg-bgray-50 dark:bg-darkblack-500 px-2 py-0.5 rounded text-bgray-500 font-black">{q.subject?.toUpperCase()}</span>
                                                                 <span className="text-[7px] bg-bgray-50 dark:bg-darkblack-500 px-2 py-0.5 rounded text-bgray-500 font-black">{q.level?.toUpperCase()}</span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>

                                   <div className="flex flex-wrap items-center gap-12 p-4 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl">
                                        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setFormData({...formData, is_published: !formData.is_published})}>
                                             <div className={`w-14 h-7 rounded-full transition-all relative shadow-inner ${formData.is_published ? "bg-[#22C55E]" : "bg-bgray-300 dark:bg-darkblack-400"}`}>
                                                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${formData.is_published ? "left-8" : "left-1"}`}></div>
                                             </div>
                                             <div className="flex flex-col">
                                                  <span className="text-[9px] font-black text-bgray-700 dark:text-bgray-50 tracking-widest">DEPLOY LIVE</span>
                                                  <span className="text-[7px] text-bgray-400">INSTANT INGRESS FOR CANDIDATES</span>
                                             </div>
                                        </div>

                                        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setFormData({...formData, result_published: !formData.result_published})}>
                                             <div className={`w-14 h-7 rounded-full transition-all relative shadow-inner ${formData.result_published ? "bg-blue-500" : "bg-bgray-300 dark:bg-darkblack-400"}`}>
                                                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${formData.result_published ? "left-8" : "left-1"}`}></div>
                                             </div>
                                             <div className="flex flex-col">
                                                  <span className="text-[9px] font-black text-bgray-700 dark:text-bgray-50 tracking-widest">ANALYTICS VISIBILITY</span>
                                                  <span className="text-[7px] text-bgray-400">ALLOW SCORECARD ACCESS</span>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                                        <button 
                                             type="submit"
                                             className="flex-[2] h-20 bg-[#22C55E] hover:bg-[#16a34a] text-white font-black rounded-3xl shadow-2xl shadow-green-200 dark:shadow-none transition-all flex items-center justify-center uppercase tracking-[0.3em] text-sm"
                                        >
                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="mr-4"><path d="M5 13l4 4L19 7" /></svg>
                                             {isEditMode ? "Commit Protocol" : "Authorize Launch"}
                                        </button>
                                        <button 
                                             type="button" 
                                             onClick={resetForm}
                                             className="flex-1 h-20 bg-bgray-200 dark:bg-darkblack-500 text-bgray-900 dark:text-white font-black rounded-3xl hover:bg-bgray-300 transition-all uppercase tracking-[0.3em] text-sm"
                                        >
                                             Abort Session
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}