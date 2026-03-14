"use client";
import React, { useState, useEffect } from "react";

interface ExpenseHead {
     _id: string;
     name: string;
     description: string;
}

export default function ExpenseHeadPage() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | null>(null);
     const [heads, setHeads] = useState<ExpenseHead[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({ name: "", description: "" });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchHeads = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/expense-heads");
               const json = await res.json();
               if (json.success) {
                    setHeads(json.data);
               }
          } catch (error) {
               console.error("Error fetching expense heads:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchHeads();
     }, []);

     const toggleFilter = (type: "action" | "pagination") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.name) return;

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/expense-heads/${editingId}` : "/api/expense-heads";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               const json = await res.json();
               if (json.success) {
                    setFormData({ name: "", description: "" });
                    setEditingId(null);
                    fetchHeads();
                    showNotification(editingId ? "Expense head updated successfully!" : "Expense head added successfully!", "success");
               } else {
                    showNotification(json.error || "Something went wrong", "error");
               }
          } catch (error) {
               console.error("Error saving expense head:", error);
               showNotification("An unexpected error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (head: ExpenseHead) => {
          setEditingId(head._id);
          setFormData({ name: head.name, description: head.description || "" });
          window.scrollTo({ top: 0, behavior: "smooth" });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this expense head?")) return;

          try {
               const res = await fetch(`/api/expense-heads/${id}`, { method: "DELETE" });
               const json = await res.json();
               if (json.success) {
                    fetchHeads();
                    showNotification("Expense head deleted successfully!", "success");
               } else {
                    showNotification(json.error || "Error deleting expense head", "error");
               }
          } catch (error) {
               console.error("Error deleting expense head:", error);
               showNotification("An unexpected error occurred", "error");
          }
     };

     const filteredHeads = heads.filter(h => {
          const search = searchTerm.toLowerCase();
          const nameMatch = h.name?.toLowerCase().includes(search);
          const descMatch = h.description ? h.description.toLowerCase().includes(search) : false;
          return nameMatch || descMatch;
     });

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
                              {notification.type === "success" ? (
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                              ) : (
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                              )}
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Expense Head Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">
                                             {editingId ? "Edit Expense Head" : "Add Expense Head"}
                                        </h3>

                                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                                             {/* Expense Head */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Expense Head <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       placeholder=""
                                                       required
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             {/* Description */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Description
                                                  </label>
                                                  <textarea
                                                       rows={4}
                                                       value={formData.description}
                                                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                       placeholder=""
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white resize-none"
                                                  />
                                             </div>

                                             {/* Save Button */}
                                             <div className="flex gap-3">
                                                  {editingId && (
                                                       <button
                                                            type="button"
                                                            onClick={() => {
                                                                 setEditingId(null);
                                                                 setFormData({ name: "", description: "" });
                                                            }}
                                                            className="py-3.5 flex items-center justify-center text-bgray-900 dark:text-white font-bold bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 transition-all rounded-lg w-full"
                                                       >
                                                            Cancel
                                                       </button>
                                                  )}
                                                  <button
                                                       type="submit"
                                                       disabled={isSubmitting}
                                                       className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full disabled:opacity-50"
                                                  >
                                                       {isSubmitting ? "Saving..." : editingId ? "Update" : "Save"}
                                                  </button>
                                             </div>
                                        </form>
                                   </div>
                              </div>

                              {/* Expense Head List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Expense Head List</h3>

                                        <div className="w-full flex h-14 space-x-4">
                                             <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                                  <div className="flex w-full h-full items-center space-x-[15px]">
                                                       <span>
                                                            <svg
                                                                 className="stroke-bgray-900 dark:stroke-white"
                                                                 width="21"
                                                                 height="22"
                                                                 viewBox="0 0 21 22"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                 <circle
                                                                      cx="9.80204"
                                                                      cy="10.6761"
                                                                      r="8.98856"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
                                                                 <path
                                                                      d="M16.0537 17.3945L19.5777 20.9094"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
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
                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Expense Head</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Description</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {isLoading ? (
                                                            <tr><td colSpan={3} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                       ) : filteredHeads.length === 0 ? (
                                                            <tr><td colSpan={3} className="py-10 text-center text-bgray-500">No records found</td></tr>
                                                       ) : filteredHeads.map((head) => (
                                                            <tr key={head._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{head.name}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">{head.description}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex justify-center gap-2">
                                                                           <button 
                                                                                onClick={() => handleEdit(head)}
                                                                                type="button" 
                                                                                className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button 
                                                                                onClick={() => handleDelete(head._id)}
                                                                                type="button" 
                                                                                className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M6 18L18 6M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                                             <div className="w-full flex justify-between items-center text-sm text-bgray-600 dark:text-bgray-50 font-bold">
                                                  <span>Total Records: {filteredHeads.length}</span>
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
