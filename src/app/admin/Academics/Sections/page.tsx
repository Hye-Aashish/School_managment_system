"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function AddSection() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [name, setName] = useState("");
     const [sections, setSections] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [editingId, setEditingId] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");

     const fetchSections = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/sections");
               const data = await res.json();
               if (data.success) {
                    setSections(data.data);
               }
          } catch (error) {
               console.error("Failed to fetch sections");
          } finally {
               setLoading(false);
          }
     };

     const onExport = (type: ExportType) => {
          const exportData = filteredSections.map(s => ({
               "Section Name": s.name
          }));
          handleExport(type, exportData, "Sections_List");
          setOpenFilter(null);
     };

     useEffect(() => {
          fetchSections();
     }, []);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSave = async () => {
          if (!name.trim()) return;
          setLoading(true);
          try {
               const res = await fetch("/api/sections", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name })
               });
               const data = await res.json();
               if (data.success) {
                    setName("");
                    fetchSections();
               } else {
                    alert(data.error || "Failed to save section");
               }
          } catch (error) {
               console.error("Error saving section:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this section?")) return;
          try {
               const res = await fetch(`/api/sections?id=${id}`, {
                    method: "DELETE"
               });
               if (res.ok) {
                    fetchSections();
               }
          } catch (error) {
               console.error("Error deleting section:", error);
          }
     };

     const filteredSections = sections.filter(s => 
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    {/* Left Section - Add Section Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Add Section
                              </h3>

                              <div className="flex flex-col space-y-5">
                                   <div className="w-full space-y-2 mb-0">
                                        <label className="text-sm font-semibold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">
                                             Section Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={name}
                                             onChange={(e) => setName(e.target.value)}
                                             placeholder="e.g. A"
                                             className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all duration-200"
                                        />
                                   </div>

                                   <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 disabled:opacity-50 transition-all rounded-xl w-full shadow-lg shadow-success-300/20"
                                   >
                                        {loading ? "Saving..." : "Save Section"}
                                   </button>
                              </div>
                         </div>
                    </section>

                    {/* Right Section - Section List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <div className="flex justify-between items-center mb-6">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                        Section List
                                   </h3>
                              </div>

                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full border border-bgray-200 dark:border-darkblack-400 focus-within:border-success-300 h-full bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-[18px] transition-all duration-200">
                                             <div className="flex w-full h-full items-center space-x-[15px]">
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                                  <input
                                                       type="text"
                                                       placeholder="Search sections..."
                                                       value={searchTerm}
                                                       onChange={(e) => setSearchTerm(e.target.value)}
                                                       className="w-full bg-transparent border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-bgray-500 dark:text-white"
                                                  />
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="px-4 h-full rounded-xl bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 flex items-center space-x-2 text-bgray-700 dark:text-bgray-50 font-semibold text-sm hover:bg-bgray-100 transition-all"
                                                  onClick={() => toggleFilter("export")}
                                             >
                                                  <span>Export</span>
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M19 9L12 16L5 9" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>

                                             <div className={`rounded-xl w-40 shadow-xl bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-16 overflow-hidden transition-all border border-bgray-200 dark:border-darkblack-400 ${openFilter === "export" ? "block scale-100 opacity-100" : "hidden scale-95 opacity-0"}`}>
                                                  <ul>
                                                       {["Copy", "Excel", "CSV", "PDF", "Print"].map(item => (
                                                            <li 
                                                                 key={item} 
                                                                 onClick={() => onExport(item as ExportType)}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-3 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium transition-colors"
                                                            >
                                                                 {item}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[50vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-200 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500/30">
                                                       <td className="py-4 px-6">
                                                            <span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">
                                                                 Section Name
                                                            </span>
                                                       </td>
                                                       <td className="py-4 px-6 text-right">
                                                            <span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">
                                                                 Action
                                                            </span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loading && sections.length === 0 ? (
                                                       <tr><td colSpan={2} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                  ) : filteredSections.length > 0 ? (
                                                       filteredSections.map((section) => (
                                                            <tr key={section._id} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/20 transition-colors">
                                                                 <td className="py-5 px-6">
                                                                      <p className="font-semibold text-base text-bgray-900 dark:text-bgray-50">
                                                                           {section.name}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6">
                                                                      <div className="flex justify-end space-x-3">
                                                                           <button
                                                                                onClick={() => handleDelete(section._id)}
                                                                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                                                                                title="Delete"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (
                                                       <tr><td colSpan={2} className="py-10 text-center text-bgray-500">No sections found.</td></tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>

                                   <div className="py-4 border-t border-bgray-200 dark:border-darkblack-400">
                                        <p className="text-sm text-bgray-600 dark:text-bgray-50 font-medium">
                                             Total Records: {filteredSections.length}
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}