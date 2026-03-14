"use client";
import React, { useState, useEffect } from "react";

interface IGrade {
    grade: string;
    minMarks: number;
    maxMarks: number;
    description?: string;
}

interface ICbseExamGrade {
    _id: string;
    name: string;
    grades: IGrade[];
    created_at: string;
}

export default function ExamGrade() {
     const [examGrades, setExamGrades] = useState<ICbseExamGrade[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({ name: "", grades: [{ grade: "", maxMarks: 0, minMarks: 0, description: "" }] });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);
     const [showForm, setShowForm] = useState(false);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchExamGrades = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/cbse-exam-grades");
               if (res.ok) {
                    setExamGrades(await res.json());
               }
          } catch (error) {
               console.error("Error fetching exam grades:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchExamGrades();
     }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.name) return;

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-exam-grades/${editingId}` : "/api/cbse-exam-grades";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               if (res.ok) {
                    setFormData({ name: "", grades: [{ grade: "", maxMarks: 0, minMarks: 0, description: "" }] });
                    setEditingId(null);
                    setShowForm(false);
                    fetchExamGrades();
                    showNotification(editingId ? "Exam grade updated successfully!" : "Exam grade added successfully!", "success");
               } else {
                    showNotification("Failed to save exam grade", "error");
               }
          } catch (error) {
               showNotification("An error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (eg: ICbseExamGrade) => {
          setEditingId(eg._id);
          setFormData({ 
               name: eg.name, 
               grades: eg.grades.length > 0 ? eg.grades : [{ grade: "", maxMarks: 0, minMarks: 0, description: "" }] 
          });
          setShowForm(true);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this exam grade?")) return;

          try {
               const res = await fetch(`/api/cbse-exam-grades/${id}`, { method: "DELETE" });
               if (res.ok) {
                    fetchExamGrades();
                    showNotification("Exam grade deleted successfully!", "success");
               } else {
                    showNotification("Error deleting exam grade", "error");
               }
          } catch (error) {
               showNotification("An error occurred", "error");
          }
     };

     const handleAddGrade = () => {
          setFormData({ ...formData, grades: [...formData.grades, { grade: "", maxMarks: 0, minMarks: 0, description: "" }] });
     };

     const handleGradeChange = (index: number, field: keyof IGrade, value: string | number) => {
          const newGrades = [...formData.grades];
          newGrades[index] = { ...newGrades[index], [field]: value };
          setFormData({ ...formData, grades: newGrades });
     };

     const handleRemoveGrade = (index: number) => {
          if (formData.grades.length > 1) {
               const newGrades = formData.grades.filter((_, i) => i !== index);
               setFormData({ ...formData, grades: newGrades });
          }
     };

     const filteredGrades = examGrades.filter(eg => 
          eg.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               {notification && (
                    <div className="fixed top-5 right-5 z-[100] transition-all transform animate-fade-in">
                         <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" 
                                   ? "bg-success-50 border-success-300 text-success-500" 
                                   : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
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
                                             onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", grades: [{ grade: "", maxMarks: 0, minMarks: 0, description: "" }] }); }}
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
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Grade Title</th>
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Description</th>
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50 text-nowrap">Grades System</th>
                                                            <th className="py-5 px-6 text-right text-base font-semibold text-bgray-600 dark:text-bgray-50">Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {isLoading ? (
                                                            <tr><td colSpan={4} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                       ) : filteredGrades.length === 0 ? (
                                                            <tr><td colSpan={4} className="py-10 text-center text-bgray-500">No grade systems found</td></tr>
                                                       ) : (
                                                            filteredGrades.map((item) => (
                                                                 <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6 align-top">
                                                                           <p className="font-bold text-lg text-bgray-900 dark:text-bgray-50">{item.name}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 align-top">
                                                                           <p className="text-bgray-700 dark:text-bgray-200 text-sm max-w-xs">{item.grades.map(g => g.grade).join(", ")}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6">
                                                                           <div className="bg-bgray-100 dark:bg-darkblack-500 rounded-lg p-3">
                                                                                <table className="w-full text-xs">
                                                                                     <thead>
                                                                                          <tr className="border-b border-bgray-200 dark:border-darkblack-400 text-bgray-500">
                                                                                               <th className="text-left pb-1">Grade</th>
                                                                                               <th className="text-left pb-1">Max %</th>
                                                                                               <th className="text-left pb-1">Min %</th>
                                                                                          </tr>
                                                                                     </thead>
                                                                                     <tbody>
                                                                                          {item.grades.map((g, i) => (
                                                                                               <tr key={i} className="text-bgray-900 dark:text-white">
                                                                                                    <td className="py-1">{g.grade}</td>
                                                                                                    <td className="py-1">{g.maxMarks}</td>
                                                                                                    <td className="py-1">{g.minMarks}</td>
                                                                                               </tr>
                                                                                          ))}
                                                                                     </tbody>
                                                                                </table>
                                                                           </div>
                                                                      </td>
                                                                      <td className="py-5 px-6 text-right align-top">
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
                                             <div className="space-y-2">
                                                  <label className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Grade System Name *</label>
                                                  <input
                                                       type="text"
                                                       required
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       placeholder="e.g., Primary Grading System"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             <div className="space-y-4">
                                                  <div className="flex justify-between items-center">
                                                       <label className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Grades *</label>
                                                       <button type="button" onClick={handleAddGrade} className="text-sm font-bold text-success-300 hover:text-success-400">+ Add Grade Row</button>
                                                  </div>
                                                  {formData.grades.map((g, index) => (
                                                       <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg bg-bgray-100 dark:bg-darkblack-500 relative">
                                                            <div>
                                                                 <label className="text-xs text-bgray-500 mb-1 block">Grade (e.g. A+)</label>
                                                                 <input
                                                                      type="text"
                                                                      required
                                                                      value={g.grade}
                                                                      onChange={(e) => handleGradeChange(index, "grade", e.target.value)}
                                                                      className="w-full px-3 py-2 rounded border border-bgray-300 dark:bg-darkblack-600"
                                                                 />
                                                            </div>
                                                            <div>
                                                                 <label className="text-xs text-bgray-500 mb-1 block">Max %</label>
                                                                 <input
                                                                      type="number"
                                                                      required
                                                                      value={g.maxMarks}
                                                                      onChange={(e) => handleGradeChange(index, "maxMarks", Number(e.target.value))}
                                                                      className="w-full px-3 py-2 rounded border border-bgray-300 dark:bg-darkblack-600"
                                                                 />
                                                            </div>
                                                            <div>
                                                                 <label className="text-xs text-bgray-500 mb-1 block">Min %</label>
                                                                 <input
                                                                      type="number"
                                                                      required
                                                                      value={g.minMarks}
                                                                      onChange={(e) => handleGradeChange(index, "minMarks", Number(e.target.value))}
                                                                      className="w-full px-3 py-2 rounded border border-bgray-300 dark:bg-darkblack-600"
                                                                 />
                                                            </div>
                                                            <div className="flex items-end">
                                                                 <button type="button" onClick={() => handleRemoveGrade(index)} className="text-error-300 hover:text-error-400 text-sm pb-2">Remove</button>
                                                            </div>
                                                       </div>
                                                  ))}
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
                                                       {isSubmitting ? "Saving..." : editingId ? "Update System" : "Create System"}
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