"use client";
import React, { useState, useEffect } from "react";

interface IObservation {
    _id: string;
    name: string;
}

interface ITerm {
    _id: string;
    name: string;
}

interface IAssignment {
    _id: string;
    observation: IObservation | string;
    term: ITerm | string;
    code: string;
    description: string;
}

export default function AssignObservationList() {
     const [assignments, setAssignments] = useState<IAssignment[]>([]);
     const [observations, setObservations] = useState<IObservation[]>([]);
     const [terms, setTerms] = useState<ITerm[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({
          observation: "",
          term: "",
          code: "",
          description: ""
     });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchData = async () => {
          setIsLoading(true);
          try {
               const [assignRes, obsRes, termRes] = await Promise.all([
                    fetch("/api/cbse-assign-observations"),
                    fetch("/api/cbse-observations"),
                    fetch("/api/cbse-terms")
               ]);

               if (assignRes.ok) setAssignments(await assignRes.json());
               if (obsRes.ok) setObservations(await obsRes.json());
               if (termRes.ok) setTerms(await termRes.json());

          } catch (error) {
               console.error("Error fetching data:", error);
               showNotification("Failed to load data", "error");
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.observation || !formData.term || !formData.code) return;

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-assign-observations/${editingId}` : "/api/cbse-assign-observations";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               if (res.ok) {
                    setFormData({ observation: "", term: "", code: "", description: "" });
                    setEditingId(null);
                    fetchData();
                    showNotification(editingId ? "Assignment updated!" : "Assignment added!", "success");
               } else {
                    const data = await res.json();
                    showNotification(data.error || "Error saving assignment", "error");
               }
          } catch (error) {
               console.error("Error saving assignment:", error);
               showNotification("An error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (assign: IAssignment) => {
          setEditingId(assign._id);
          setFormData({
               observation: typeof assign.observation === 'object' ? assign.observation._id : assign.observation,
               term: typeof assign.term === 'object' ? assign.term._id : assign.term,
               code: assign.code,
               description: assign.description || ""
          });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Delete this assignment?")) return;
          try {
               const res = await fetch(`/api/cbse-assign-observations/${id}`, { method: "DELETE" });
               if (res.ok) {
                    fetchData();
                    showNotification("Assignment deleted!", "success");
               }
          } catch (error) {
               showNotification("Error deleting assignment", "error");
          }
     };

     const filteredAssignments = assignments.filter(assign => {
          const obsName = typeof assign.observation === 'object' ? assign.observation.name : "";
          const termName = typeof assign.term === 'object' ? assign.term.name : "";
          return obsName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 termName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 assign.code.toLowerCase().includes(searchTerm.toLowerCase());
     });

     return (
          <>
               {notification && (
                    <div className="fixed top-5 right-5 z-[100] animate-fade-in">
                         <div className={`px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" ? "bg-success-50 border-success-300 text-success-500" : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 group">
                         <div className="flex flex-col lg:flex-row gap-6">
                              {/* Left Column - Form */}
                              <div className="w-full lg:max-w-[380px] p-6 rounded-lg bg-white dark:bg-darkblack-600 h-fit sticky top-6">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        {editingId ? "Edit Assign Observation" : "Assign Observation"}
                                   </h3>
                                   <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Observation *</label>
                                             <select
                                                  value={formData.observation}
                                                  onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                                                  required
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                             >
                                                  <option value="">Select Observation</option>
                                                  {observations.map(obs => <option key={obs._id} value={obs._id}>{obs.name}</option>)}
                                             </select>
                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Term *</label>
                                             <select
                                                  value={formData.term}
                                                  onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                                                  required
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                             >
                                                  <option value="">Select Term</option>
                                                  {terms.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                                             </select>
                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Code *</label>
                                             <input
                                                  type="text"
                                                  value={formData.code}
                                                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                  required
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  placeholder="e.g. T015"
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Description</label>
                                             <textarea
                                                  value={formData.description}
                                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  rows={3}
                                             />
                                        </div>
                                        
                                        <div className="flex gap-3 pt-4">
                                             {editingId && (
                                                  <button
                                                       type="button"
                                                       onClick={() => { setEditingId(null); setFormData({ observation: "", term: "", code: "", description: "" }); }}
                                                       className="w-full py-2.5 rounded-lg bg-bgray-200 dark:bg-darkblack-500 font-semibold"
                                                  >
                                                       Cancel
                                                  </button>
                                             )}
                                             <button
                                                  type="submit"
                                                  disabled={isSubmitting}
                                                  className="w-full py-2.5 rounded-lg bg-success-300 text-white font-semibold disabled:opacity-50"
                                             >
                                                  {isSubmitting ? "Saving..." : editingId ? "Update" : "Save"}
                                             </button>
                                        </div>
                                   </form>
                              </div>

                              {/* Right Column - List */}
                              <div className="flex-1 p-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="mb-6">
                                        <input
                                             type="text"
                                             placeholder="Search Assignments..."
                                             value={searchTerm}
                                             onChange={(e) => setSearchTerm(e.target.value)}
                                             className="w-full max-w-md p-2.5 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border-none px-[18px]"
                                        />
                                   </div>

                                   {isLoading ? (
                                        <div className="py-20 text-center">Loading assignments...</div>
                                   ) : filteredAssignments.length === 0 ? (
                                        <div className="py-20 text-center text-bgray-500 font-medium">No assignments found</div>
                                   ) : (
                                        <div className="overflow-x-auto">
                                             <table className="w-full border-collapse">
                                                  <thead>
                                                       <tr className="border-b border-bgray-200 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-300 text-sm font-semibold">
                                                            <th className="py-4 px-4 text-left">Observation</th>
                                                            <th className="py-4 px-4 text-left">Term</th>
                                                            <th className="py-4 px-4 text-left">Code</th>
                                                            <th className="py-4 px-4 text-left">Description</th>
                                                            <th className="py-4 px-4 text-right pr-6">Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {filteredAssignments.map((assign) => (
                                                            <tr key={assign._id} className="border-b border-bgray-100 dark:border-darkblack-500 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                                 <td className="py-4 px-4 align-top font-medium text-bgray-900 dark:text-white">
                                                                      {(assign.observation as IObservation)?.name || "Unknown"}
                                                                 </td>
                                                                 <td className="py-4 px-4 align-top text-bgray-900 dark:text-white">
                                                                      {(assign.term as ITerm)?.name || "Unknown"}
                                                                 </td>
                                                                 <td className="py-4 px-4 align-top text-bgray-900 dark:text-white">{assign.code}</td>
                                                                 <td className="py-4 px-4 align-top text-xs text-bgray-500 max-w-xs">{assign.description}</td>
                                                                 <td className="py-4 px-4 align-top text-right pr-6">
                                                                      <div className="flex justify-end space-x-2">
                                                                           <button onClick={() => handleEdit(assign)} className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-400 rounded text-success-300">
                                                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M9.16797 3.33334H3.33464C1.66797 3.33334 1.66797 5.00001 1.66797 5.00001V16.6667C1.66797 18.3333 3.33464 18.3333 3.33464 18.3333H15.0013C16.668 18.3333 16.668 16.6667 16.668 16.6667V10.8333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.418 2.08332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                           </button>
                                                                           <button onClick={() => handleDelete(assign._id)} className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-400 rounded text-error-300">
                                                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M15.8333 5L14.1667 15.8333C14.1667 17.5 12.5 17.5 7.5 17.5C5.83333 17.5 5.83333 15.8333 5.83333 15.8333L4.16667 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 5H17.5" strokeWidth="1.5" strokeLinecap="round"/><path d="M7.5 5V3.33333C7.5 2.5 8.33333 2.5 8.33333 2.5H11.6667C12.5 2.5 12.5 3.33333 12.5 3.33333V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}