"use client";
import React, { useState, useEffect } from "react";

export default function AddSubject() {
     const [openFilter, setOpenFilter] = useState<"export" | null>(null);
     const [subjects, setSubjects] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");

     // Form State
     const [name, setName] = useState("");
     const [code, setCode] = useState("");
     const [type, setType] = useState<"Theory" | "Practical">("Theory");
     const [editingId, setEditingId] = useState<string | null>(null);

     const fetchSubjects = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/subjects");
               const data = await res.json();
               if (data.success) setSubjects(data.data);
          } catch (error) {
               console.error("Failed to fetch subjects");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchSubjects();
     }, []);

     const handleSave = async () => {
          if (!name.trim()) return;
          setLoading(true);
          try {
               const res = await fetch("/api/subjects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: editingId, name, code, type })
               });
               const data = await res.json();
               if (data.success) {
                    resetForm();
                    fetchSubjects();
               }
          } catch (error) {
               console.error("Error saving subject:", error);
          } finally {
               setLoading(false);
          }
     };

     const resetForm = () => {
          setName("");
          setCode("");
          setType("Theory");
          setEditingId(null);
     };

     const handleEdit = (sub: any) => {
          setEditingId(sub._id);
          setName(sub.name);
          setCode(sub.code || "");
          setType(sub.type || "Theory");
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this subject?")) return;
          try {
               const res = await fetch(`/api/subjects?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchSubjects();
          } catch (error) {
               console.error("Error deleting subject:", error);
          }
     };

     const filteredSubjects = subjects.filter(s => 
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (s.code && s.code.toLowerCase().includes(searchTerm.toLowerCase()))
     );

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    {/* Left Section - Add Subject Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   {editingId ? "Edit Subject" : "Add Subject"}
                              </h3>
                              <div className="flex flex-col space-y-6">
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-semibold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">
                                             Subject Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={name}
                                             onChange={(e) => setName(e.target.value)}
                                             placeholder="e.g. Mathematics"
                                             className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all duration-200"
                                        />
                                   </div>

                                   <div className="w-full space-y-3">
                                        <label className="text-sm font-semibold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">
                                             Subject Type
                                        </label>
                                        <div className="flex p-1 bg-bgray-50 dark:bg-darkblack-500 rounded-xl border border-bgray-200 dark:border-darkblack-400">
                                             <button
                                                  type="button"
                                                  onClick={() => setType("Theory")}
                                                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                                                       type === "Theory" 
                                                            ? "bg-white dark:bg-darkblack-600 shadow-sm text-success-300" 
                                                            : "text-bgray-500 dark:text-bgray-400"
                                                  }`}
                                             >
                                                  Theory
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() => setType("Practical")}
                                                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                                                       type === "Practical" 
                                                            ? "bg-white dark:bg-darkblack-600 shadow-sm text-success-300" 
                                                            : "text-bgray-500 dark:text-bgray-400"
                                                  }`}
                                             >
                                                  Practical
                                             </button>
                                        </div>
                                   </div>

                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-semibold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">
                                             Subject Code
                                        </label>
                                        <input
                                             type="text"
                                             value={code}
                                             onChange={(e) => setCode(e.target.value)}
                                             placeholder="e.g. MATH101"
                                             className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all duration-200"
                                        />
                                   </div>

                                   <div className="flex gap-3">
                                        {editingId && (
                                             <button
                                                  type="button"
                                                  onClick={resetForm}
                                                  className="py-3.5 px-4 flex-1 text-bgray-700 dark:text-white font-bold bg-bgray-100 dark:bg-darkblack-500 hover:bg-bgray-200 transition-all rounded-xl border border-bgray-200 dark:border-darkblack-400"
                                             >
                                                  Cancel
                                             </button>
                                        )}
                                        <button
                                             type="button"
                                             onClick={handleSave}
                                             disabled={loading}
                                             className="py-3.5 flex-[2] text-white font-bold bg-success-300 hover:bg-success-400 disabled:opacity-50 transition-all rounded-xl shadow-lg shadow-success-300/20"
                                        >
                                             {loading ? "Saving..." : editingId ? "Update Subject" : "Save Subject"}
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Right Section - Subject List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Subject List
                              </h3>
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full border border-bgray-200 dark:border-darkblack-400 focus-within:border-success-300 h-full bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-[18px]">
                                             <div className="flex w-full h-full items-center space-x-[15px]">
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                                  <input
                                                       type="text"
                                                       placeholder="Search subjects..."
                                                       value={searchTerm}
                                                       onChange={(e) => setSearchTerm(e.target.value)}
                                                       className="w-full bg-transparent border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-bgray-500 dark:text-white"
                                                  />
                                             </div>
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[50vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-200 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500/30">
                                                       <td className="py-4 px-6"><span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Subject</span></td>
                                                       <td className="py-4 px-6"><span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Code</span></td>
                                                       <td className="py-4 px-6"><span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Type</span></td>
                                                       <td className="py-4 px-6 text-right"><span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Action</span></td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loading && subjects.length === 0 ? (
                                                       <tr><td colSpan={4} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                  ) : filteredSubjects.length > 0 ? (
                                                       filteredSubjects.map((subject) => (
                                                            <tr key={subject._id} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50/50 transition-colors">
                                                                 <td className="py-5 px-6"><p className="font-bold text-base text-bgray-900 dark:text-bgray-50">{subject.name}</p></td>
                                                                 <td className="py-5 px-6"><p className="text-sm text-bgray-600 dark:text-bgray-300 font-medium">{subject.code || "---"}</p></td>
                                                                 <td className="py-5 px-6">
                                                                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                                           subject.type === "Practical" 
                                                                                ? "bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20" 
                                                                                : "bg-success-50 text-success-300 border-success-200 dark:bg-success-300/10 dark:border-success-300/20"
                                                                      }`}>
                                                                           {subject.type}
                                                                      </span>
                                                                 </td>
                                                                 <td className="py-5 px-6">
                                                                      <div className="flex justify-end space-x-2">
                                                                           <button onClick={() => handleEdit(subject)} className="p-2 rounded-lg bg-bgray-50 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-50 hover:bg-success-300 hover:text-white transition-all shadow-sm" title="Edit">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                                           </button>
                                                                           <button onClick={() => handleDelete(subject._id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Delete">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (<tr><td colSpan={4} className="py-10 text-center text-bgray-500">No subjects found.</td></tr>)}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}