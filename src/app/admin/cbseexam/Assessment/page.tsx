"use client";
import React, { useState, useEffect } from "react";

interface IAssessmentType {
    name: string;
    code: string;
    maxMarks: number;
}

interface IAssessment {
    _id: string;
    name: string;
    assessmentTypes: IAssessmentType[];
    created_at: string;
}

export default function AssessmentList() {
     const [assessments, setAssessments] = useState<IAssessment[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [showForm, setShowForm] = useState(false);
     const [editingId, setEditingId] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

     const [formData, setFormData] = useState({
          name: "",
          assessmentTypes: [{ name: "", code: "", maxMarks: 0 }]
     });

     useEffect(() => {
          fetchAssessments();
     }, []);

     const fetchAssessments = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/cbse-assessments");
               if (res.ok) {
                    setAssessments(await res.json());
               }
          } catch (error) {
               console.error("Error fetching assessments:", error);
          } finally {
               setIsLoading(false);
          }
     };

     const handleAddType = () => {
          setFormData({
               ...formData,
               assessmentTypes: [...formData.assessmentTypes, { name: "", code: "", maxMarks: 0 }]
          });
     };

     const handleRemoveType = (index: number) => {
          const newTypes = formData.assessmentTypes.filter((_, i) => i !== index);
          setFormData({ ...formData, assessmentTypes: newTypes });
     };

     const handleTypeChange = (index: number, field: keyof IAssessmentType, value: string | number) => {
          const newTypes = [...formData.assessmentTypes];
          newTypes[index] = { ...newTypes[index], [field]: value };
          setFormData({ ...formData, assessmentTypes: newTypes });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-assessments/${editingId}` : "/api/cbse-assessments";
               const method = editingId ? "PUT" : "POST";
               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });

               if (res.ok) {
                    setMessage({ type: "success", text: `Assessment ${editingId ? "updated" : "created"} successfully!` });
                    setFormData({ name: "", assessmentTypes: [{ name: "", code: "", maxMarks: 0 }] });
                    setEditingId(null);
                    setShowForm(false);
                    fetchAssessments();
               } else {
                    setMessage({ type: "error", text: "Failed to save assessment" });
               }
          } catch (error) {
               setMessage({ type: "error", text: "An error occurred" });
          } finally {
               setIsSubmitting(false);
               setTimeout(() => setMessage(null), 3000);
          }
     };

     const handleEdit = (item: IAssessment) => {
          setEditingId(item._id);
          setFormData({
               name: item.name,
               assessmentTypes: item.assessmentTypes.map(t => ({ ...t }))
          });
          setShowForm(true);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this assessment?")) return;
          try {
               const res = await fetch(`/api/cbse-assessments/${id}`, { method: "DELETE" });
               if (res.ok) {
                    setMessage({ type: "success", text: "Assessment deleted successfully!" });
                    fetchAssessments();
               }
          } catch (error) {
               setMessage({ type: "error", text: "Failed to delete" });
          } finally {
               setTimeout(() => setMessage(null), 3000);
          }
     };

     const filteredAssessments = assessments.filter(item =>
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
                                             onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", assessmentTypes: [{ name: "", code: "", maxMarks: 0 }] }); }}
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
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Assessment</th>
                                                            <th className="py-5 px-6 text-left text-base font-semibold text-bgray-600 dark:text-bgray-50">Types</th>
                                                            <th className="py-5 px-6 text-right text-base font-semibold text-bgray-600 dark:text-bgray-50">Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {isLoading ? (
                                                            <tr><td colSpan={3} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                       ) : filteredAssessments.length === 0 ? (
                                                            <tr><td colSpan={3} className="py-10 text-center text-bgray-500">No assessments found</td></tr>
                                                       ) : (
                                                            filteredAssessments.map((item) => (
                                                                 <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6 align-top">
                                                                           <p className="font-bold text-lg text-bgray-900 dark:text-bgray-50">{item.name}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6">
                                                                           <div className="flex flex-wrap gap-2">
                                                                                {item.assessmentTypes.map((type, idx) => (
                                                                                     <span key={idx} className="px-3 py-1 bg-bgray-100 dark:bg-darkblack-500 rounded text-xs font-medium text-bgray-600 dark:text-bgray-300">
                                                                                          {type.name} ({type.code}) - {type.maxMarks}
                                                                                     </span>
                                                                                ))}
                                                                           </div>
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
                                             <div>
                                                  <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Assessment Name *</label>
                                                  <input
                                                       type="text"
                                                       required
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       placeholder="e.g., Periodic Assessment"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             <div className="space-y-4">
                                                  <div className="flex justify-between items-center">
                                                       <label className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Assessment Types</label>
                                                       <button
                                                            type="button"
                                                            onClick={handleAddType}
                                                            className="text-sm text-success-300 hover:text-success-400 font-bold"
                                                       >
                                                            + Add Type
                                                       </button>
                                                  </div>

                                                  {formData.assessmentTypes.map((type, index) => (
                                                       <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-bgray-200 dark:border-darkblack-400 rounded-lg relative">
                                                            <div className="md:col-span-1">
                                                                 <input
                                                                      type="text"
                                                                      required
                                                                      placeholder="Name (e.g. Theory)"
                                                                      value={type.name}
                                                                      onChange={(e) => handleTypeChange(index, "name", e.target.value)}
                                                                      className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm"
                                                                 />
                                                            </div>
                                                            <div className="md:col-span-1">
                                                                 <input
                                                                      type="text"
                                                                      required
                                                                      placeholder="Code (e.g. TH02)"
                                                                      value={type.code}
                                                                      onChange={(e) => handleTypeChange(index, "code", e.target.value)}
                                                                      className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm"
                                                                 />
                                                            </div>
                                                            <div className="md:col-span-1">
                                                                 <input
                                                                      type="number"
                                                                      required
                                                                      placeholder="Max Marks"
                                                                      value={type.maxMarks}
                                                                      onChange={(e) => handleTypeChange(index, "maxMarks", parseInt(e.target.value))}
                                                                      className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm"
                                                                 />
                                                            </div>
                                                            <div className="flex items-center justify-center">
                                                                 {formData.assessmentTypes.length > 1 && (
                                                                      <button type="button" onClick={() => handleRemoveType(index)} className="text-error-300 hover:text-error-400">
                                                                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                                                      </button>
                                                                 )}
                                                            </div>
                                                       </div>
                                                  ))}
                                             </div>

                                             <div className="flex justify-end space-x-4 pt-4">
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
                                                       {isSubmitting ? "Saving..." : editingId ? "Update Assessment" : "Create Assessment"}
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