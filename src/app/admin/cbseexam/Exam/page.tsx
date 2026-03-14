"use client";
import React, { useState, useEffect } from "react";

interface ITerm {
    _id: string;
    name: string;
}

interface IExamGrade {
    _id: string;
    name: string;
}

interface IAssessment {
    _id: string;
    name: string;
}

interface ICbseExam {
    _id: string;
    name: string;
    term: ITerm | string;
    examGrade: IExamGrade | string;
    assessment: IAssessment | string;
    description?: string;
    created_at: string;
}

export default function ExamList() {
     const [exams, setExams] = useState<ICbseExam[]>([]);
     const [terms, setTerms] = useState<ITerm[]>([]);
     const [examGrades, setExamGrades] = useState<IExamGrade[]>([]);
     const [assessments, setAssessments] = useState<IAssessment[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [showForm, setShowForm] = useState(false);
     const [editingId, setEditingId] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

     const [formData, setFormData] = useState({
          name: "",
          term: "",
          examGrade: "",
          assessment: "",
          description: ""
     });

     useEffect(() => {
          fetchData();
          fetchDropdowns();
     }, []);

     const fetchData = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/cbse-exams");
               if (res.ok) {
                    setExams(await res.json());
               }
          } catch (error) {
               console.error("Error fetching exams:", error);
          } finally {
               setIsLoading(false);
          }
     };

     const fetchDropdowns = async () => {
          try {
               const [termsRes, gradesRes, assessmentsRes] = await Promise.all([
                    fetch("/api/cbse-terms"),
                    fetch("/api/cbse-exam-grades"),
                    fetch("/api/cbse-assessments")
               ]);
               if (termsRes.ok) setTerms(await termsRes.json());
               if (gradesRes.ok) setExamGrades(await gradesRes.json());
               if (assessmentsRes.ok) setAssessments(await assessmentsRes.json());
          } catch (error) {
               console.error("Error fetching dropdowns:", error);
          }
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-exams/${editingId}` : "/api/cbse-exams";
               const method = editingId ? "PUT" : "POST";
               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });

               if (res.ok) {
                    setMessage({ type: "success", text: `Exam ${editingId ? "updated" : "created"} successfully!` });
                    setFormData({ name: "", term: "", examGrade: "", assessment: "", description: "" });
                    setEditingId(null);
                    setShowForm(false);
                    fetchData();
               } else {
                    setMessage({ type: "error", text: "Failed to save exam" });
               }
          } catch (error) {
               setMessage({ type: "error", text: "An error occurred" });
          } finally {
               setIsSubmitting(false);
               setTimeout(() => setMessage(null), 3000);
          }
     };

     const handleEdit = (item: ICbseExam) => {
          setEditingId(item._id);
          setFormData({
               name: item.name,
               term: typeof item.term === "object" ? item.term._id : item.term,
               examGrade: typeof item.examGrade === "object" ? item.examGrade._id : item.examGrade,
               assessment: typeof item.assessment === "object" ? item.assessment._id : item.assessment,
               description: item.description || ""
          });
          setShowForm(true);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this exam?")) return;
          try {
               const res = await fetch(`/api/cbse-exams/${id}`, { method: "DELETE" });
               if (res.ok) {
                    setMessage({ type: "success", text: "Exam deleted successfully!" });
                    fetchData();
               }
          } catch (error) {
               setMessage({ type: "error", text: "Failed to delete" });
          } finally {
               setTimeout(() => setMessage(null), 3000);
          }
     };

     const filteredExams = exams.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               {message && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${message.type === "success" ? "bg-success-300" : "bg-error-300"}`}>
                         {message.text}
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex justify-between items-center space-x-4">
                                        <div className="w-full border border-transparent focus-within:border-success-300 h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                             <div className="flex w-full h-full items-center space-x-[15px]">
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                                  <label className="w-full">
                                                       <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <button
                                             onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", term: "", examGrade: "", assessment: "", description: "" }); }}
                                             className="px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 text-nowrap text-white font-semibold transition-colors"
                                        >
                                             {showForm ? "View List" : "Add New"}
                                        </button>
                                   </div>

                                   {!showForm ? (
                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Exam</th>
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Term</th>
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Exam Grade</th>
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Assessment</th>
                                                            <th className="py-5 px-6 text-right text-base font-semibold text-bgray-600 dark:text-bgray-50">Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {isLoading ? (
                                                            <tr><td colSpan={5} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                       ) : filteredExams.length === 0 ? (
                                                            <tr><td colSpan={5} className="py-10 text-center text-bgray-500">No exams found</td></tr>
                                                       ) : (
                                                            filteredExams.map((item) => (
                                                                 <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6">
                                                                           <p className="font-bold text-lg text-bgray-900 dark:text-bgray-50">{item.name}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6">
                                                                           <p className="text-bgray-700 dark:text-bgray-200">
                                                                                {typeof item.term === "object" ? item.term.name : "N/A"}
                                                                           </p>
                                                                      </td>
                                                                      <td className="py-5 px-6">
                                                                           <p className="text-bgray-700 dark:text-bgray-200">
                                                                                {typeof item.examGrade === "object" ? item.examGrade.name : "N/A"}
                                                                           </p>
                                                                      </td>
                                                                      <td className="py-5 px-6">
                                                                           <p className="text-bgray-700 dark:text-bgray-200">
                                                                                {typeof item.assessment === "object" ? item.assessment.name : "N/A"}
                                                                           </p>
                                                                      </td>
                                                                      <td className="py-5 px-6 text-right">
                                                                           <div className="flex justify-end space-x-2">
                                                                                <button onClick={() => handleEdit(item)} className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
                                                                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                                                                </button>
                                                                                <button onClick={() => handleDelete(item._id)} className="p-2 text-error-300 hover:bg-error-50 rounded-lg transition-colors">
                                                                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                                                                </button>
                                                                           </div>
                                                                      </td>
                                                                 </tr>
                                                            ))
                                                       )}
                                                  </tbody>
                                             </table>
                                        </div>
                                   ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  <div>
                                                       <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Exam Name *</label>
                                                       <input
                                                            type="text"
                                                            required
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            placeholder="e.g., Annual Exam 2024"
                                                            className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       />
                                                  </div>
                                                  <div>
                                                       <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Term *</label>
                                                       <select
                                                            required
                                                            value={formData.term}
                                                            onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                                                            className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       >
                                                            <option value="">Select Term</option>
                                                            {terms.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                                                       </select>
                                                  </div>
                                                  <div>
                                                       <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Exam Grade *</label>
                                                       <select
                                                            required
                                                            value={formData.examGrade}
                                                            onChange={(e) => setFormData({ ...formData, examGrade: e.target.value })}
                                                            className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       >
                                                            <option value="">Select Grade System</option>
                                                            {examGrades.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                                                       </select>
                                                  </div>
                                                  <div>
                                                       <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Assessment *</label>
                                                       <select
                                                            required
                                                            value={formData.assessment}
                                                            onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                                                            className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       >
                                                            <option value="">Select Assessment</option>
                                                            {assessments.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                                                       </select>
                                                  </div>
                                             </div>

                                             <div>
                                                  <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Description</label>
                                                  <textarea
                                                       rows={4}
                                                       value={formData.description}
                                                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                       placeholder="Enter exam description..."
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             <div className="flex justify-end space-x-4">
                                                  <button
                                                       type="button"
                                                       onClick={() => setShowForm(false)}
                                                       className="px-6 py-2.5 rounded-lg border border-bgray-300 text-bgray-600 font-semibold hover:bg-bgray-50"
                                                  >
                                                       Cancel
                                                  </button>
                                                  <button
                                                       type="submit"
                                                       disabled={isSubmitting}
                                                       className="px-6 py-2.5 rounded-lg bg-success-300 text-white font-semibold hover:bg-success-400 disabled:opacity-50"
                                                  >
                                                       {isSubmitting ? "Saving..." : editingId ? "Update Exam" : "Create Exam"}
                                                  </button>
                                             </div>
                                        </form>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}