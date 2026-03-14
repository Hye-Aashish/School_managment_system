"use client";
import React, { useState, useEffect } from "react";

interface ICbseTerm {
    _id: string;
    name: string;
    code: string;
    description?: string;
}

export default function TermList() {
     const [terms, setTerms] = useState<ICbseTerm[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({ name: "", code: "", description: "" });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchTerms = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/cbse-terms");
               const data = await res.json();
               if (res.ok) {
                    setTerms(data);
               } else {
                    showNotification(data.error || "Failed to fetch terms", "error");
               }
          } catch (error) {
               console.error("Error fetching terms:", error);
               showNotification("An unexpected error occurred", "error");
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchTerms();
     }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.name || !formData.code) return;

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-terms/${editingId}` : "/api/cbse-terms";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               const data = await res.json();
               if (res.ok) {
                    setFormData({ name: "", code: "", description: "" });
                    setEditingId(null);
                    fetchTerms();
                    showNotification(editingId ? "Term updated successfully!" : "Term added successfully!", "success");
               } else {
                    showNotification(data.error || "Something went wrong", "error");
               }
          } catch (error) {
               console.error("Error saving term:", error);
               showNotification("An unexpected error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (term: ICbseTerm) => {
          setEditingId(term._id);
          setFormData({ name: term.name, code: term.code, description: term.description || "" });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this term?")) return;

          try {
               const res = await fetch(`/api/cbse-terms/${id}`, { method: "DELETE" });
               const data = await res.json();
               if (res.ok) {
                    fetchTerms();
                    showNotification("Term deleted successfully!", "success");
               } else {
                    showNotification(data.error || "Error deleting term", "error");
               }
          } catch (error) {
               console.error("Error deleting term:", error);
               showNotification("An unexpected error occurred", "error");
          }
     };

     const filteredTerms = terms.filter(t => 
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          t.code.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               {/* Notification Popup */}
               {notification && (
                    <div className={`fixed top-5 right-5 z-[100] transition-all transform animate-fade-in`}>
                         <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" 
                                   ? "bg-success-50 border-success-300 text-success-500" 
                                   : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Left Column - Add Term */}
                              <div className="w-full py-6 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[400px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             {editingId ? "Edit Term" : "Add Term"}
                                        </h3>
                                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Name <span className="text-error-300">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       placeholder="Enter term name"
                                                       required
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent"
                                                  />
                                             </div>
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Code <span className="text-error-300">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.code}
                                                       onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                       placeholder="Enter term code"
                                                       required
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent"
                                                  />
                                             </div>
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Description
                                                  </label>
                                                  <textarea
                                                       rows={4}
                                                       value={formData.description}
                                                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                       placeholder="Enter description"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent resize-none"
                                                  />
                                             </div>
                                             <div className="flex gap-3">
                                                  {editingId && (
                                                       <button
                                                            type="button"
                                                            onClick={() => {
                                                                 setEditingId(null);
                                                                 setFormData({ name: "", code: "", description: "" });
                                                            }}
                                                            className="px-6 py-2.5 rounded-lg bg-bgray-200 dark:bg-darkblack-500 text-bgray-900 dark:text-white font-semibold transition-colors w-full"
                                                       >
                                                            Cancel
                                                       </button>
                                                  )}
                                                  <button
                                                       type="submit"
                                                       disabled={isSubmitting}
                                                       className="px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-success-300 text-nowrap dark:hover:bg-success-400 text-white font-semibold transition-colors w-full flex items-center justify-center disabled:opacity-50"
                                                  >
                                                       {isSubmitting ? "Saving..." : editingId ? "Update" : "Save"}
                                                  </button>
                                             </div>
                                        </form>
                                   </div>
                              </div>

                              {/* Right Column - Term List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        {/* Search Bar */}
                                        <div className="w-full flex justify-between items-center space-x-4">
                                             <div className="w-full sm:max-w-md border border-transparent focus-within:border-success-300 h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                                  <div className="flex w-full h-full items-center space-x-[15px]">
                                                       <span>
                                                            <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                                        </div>

                                        {/* Table */}
                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Name</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Code</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Description</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-right">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {isLoading ? (
                                                            <tr><td colSpan={4} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                       ) : filteredTerms.length === 0 ? (
                                                            <tr><td colSpan={4} className="py-10 text-center text-bgray-500">No records found</td></tr>
                                                       ) : filteredTerms.map((term) => (
                                                            <tr key={term._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{term.name}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{term.code}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0 max-w-xs">
                                                                      <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300 truncate">{term.description}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex justify-end space-x-3 items-center">
                                                                           <button 
                                                                                onClick={() => handleEdit(term)}
                                                                                type="button" 
                                                                                className="text-bgray-500 hover:text-success-300 transition-colors"
                                                                           >
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M9.16797 3.33334H3.33464C2.89261 3.33334 2.46868 3.50894 2.15612 3.82149C1.84356 4.13405 1.66797 4.55798 1.66797 5.00001V16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333H15.0013C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667V10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M15.418 2.08332C15.7495 1.75188 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.75188 17.918 2.08332C18.2494 2.41476 18.4357 2.86436 18.4357 3.33332C18.4357 3.80228 18.2494 4.25188 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button 
                                                                                onClick={() => handleDelete(term._id)}
                                                                                type="button" 
                                                                                className="text-bgray-500 hover:text-error-300 transition-colors"
                                                                           >
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M15.8333 5L14.1667 15.8333C14.1667 16.2754 13.9911 16.6993 13.6785 17.0118C13.366 17.3244 12.942 17.5 12.5 17.5H7.5C7.05797 17.5 6.63405 17.3244 6.32149 17.0118C6.00893 16.6993 5.83333 16.2754 5.83333 15.8333L4.16667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                                     <path d="M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="pagination-content w-full border-t border-bgray-300 dark:border-darkblack-400 pt-4">
                                             <div className="w-full flex justify-between items-center text-sm text-bgray-600 dark:text-bgray-50">
                                                  <span>Total Records: {filteredTerms.length}</span>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}