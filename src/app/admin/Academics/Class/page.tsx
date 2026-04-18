"use client";
import React, { useState, useEffect } from "react";

export default function AddClass() {
     const [openFilter, setOpenFilter] = useState<"export" | null>(null);
     const [availableSections, setAvailableSections] = useState<any[]>([]);
     const [classList, setClassList] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");

     // Form State
     const [name, setName] = useState("");
     const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
     const [editingId, setEditingId] = useState<string | null>(null);

     const fetchData = async () => {
          setLoading(true);
          try {
               const [sectionsRes, classesRes] = await Promise.all([
                    fetch("/api/sections"),
                    fetch("/api/classes")
               ]);
               const sectionsData = await sectionsRes.json();
               const classesData = await classesRes.json();
               
               if (sectionsData.success) setAvailableSections(sectionsData.data);
               if (classesData.success) setClassList(classesData.data);
          } catch (error) {
               console.error("Failed to fetch data");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handleSectionToggle = (sectionId: string) => {
          setSelectedSectionIds(prev => 
               prev.includes(sectionId) 
                    ? prev.filter(id => id !== sectionId) 
                    : [...prev, sectionId]
          );
     };

     const handleSave = async () => {
          if (!name.trim()) return;
          setLoading(true);
          try {
               const res = await fetch("/api/classes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: editingId, name, sections: selectedSectionIds })
               });
               const data = await res.json();
               if (data.success) {
                    resetForm();
                    fetchData();
               }
          } catch (error) {
               console.error("Error saving class:", error);
          } finally {
               setLoading(false);
          }
     };

     const resetForm = () => {
          setName("");
          setSelectedSectionIds([]);
          setEditingId(null);
     };

     const handleEdit = (cls: any) => {
          setEditingId(cls._id);
          setName(cls.name);
          setSelectedSectionIds(cls.sections.map((s: any) => s._id || s));
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this class?")) return;
          try {
               const res = await fetch(`/api/classes?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchData();
          } catch (error) {
               console.error("Error deleting class:", error);
          }
     };

     const filteredClasses = classList.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    {/* Left Section - Add Class Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   {editingId ? "Edit Class" : "Add Class"}
                              </h3>
                              <div className="flex flex-col space-y-6">
                                   <div className="w-full space-y-2 mb-0">
                                        <label className="text-sm font-semibold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">
                                             Class Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={name}
                                             onChange={(e) => setName(e.target.value)}
                                             placeholder="e.g. Class 1"
                                             className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all duration-200"
                                        />
                                   </div>

                                   <div className="w-full space-y-3">
                                        <label className="text-sm font-semibold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">
                                             Assign Sections <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1">
                                             {availableSections.map((section) => (
                                                  <label
                                                       key={section._id}
                                                       className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                                            selectedSectionIds.includes(section._id)
                                                                 ? "border-success-300 bg-success-50/50 dark:bg-success-300/10 text-success-300"
                                                                 : "border-bgray-200 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-50"
                                                       }`}
                                                  >
                                                       <input
                                                            type="checkbox"
                                                            checked={selectedSectionIds.includes(section._id)}
                                                            onChange={() => handleSectionToggle(section._id)}
                                                            className="hidden"
                                                       />
                                                       <span className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-all ${
                                                            selectedSectionIds.includes(section._id)
                                                                 ? "bg-success-300 border-success-300"
                                                                 : "border-bgray-300 dark:border-darkblack-400"
                                                       }`}>
                                                            {selectedSectionIds.includes(section._id) && (
                                                                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 </svg>
                                                            )}
                                                       </span>
                                                       <span className="text-sm font-bold">{section.name}</span>
                                                  </label>
                                             ))}
                                        </div>
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
                                             {loading ? "Saving..." : editingId ? "Update Class" : "Save Class"}
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Right Section - Class List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Class List
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
                                                       placeholder="Search classes..."
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
                                                       <td className="py-4 px-6">
                                                            <span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Class</span>
                                                       </td>
                                                       <td className="py-4 px-6">
                                                            <span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Sections</span>
                                                       </td>
                                                       <td className="py-4 px-6 text-right">
                                                            <span className="text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loading && classList.length === 0 ? (
                                                       <tr><td colSpan={3} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                  ) : filteredClasses.length > 0 ? (
                                                       filteredClasses.map((item) => (
                                                            <tr key={item._id} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50/50 transition-colors">
                                                                 <td className="py-5 px-6">
                                                                      <p className="font-bold text-base text-bgray-900 dark:text-bgray-50">
                                                                           {item.name}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6">
                                                                      <div className="flex flex-wrap gap-2">
                                                                           {item.sections.map((section: any, idx: number) => (
                                                                                <span key={idx} className="px-2.5 py-1 rounded-md bg-success-50 dark:bg-success-300/10 text-success-300 text-xs font-bold border border-success-300/20">
                                                                                     {section.name || section}
                                                                                </span>
                                                                           ))}
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-5 px-6">
                                                                      <div className="flex justify-end space-x-2">
                                                                           <button
                                                                                onClick={() => handleEdit(item)}
                                                                                className="p-2 rounded-lg bg-bgray-50 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-50 hover:bg-success-300 hover:text-white transition-all duration-200 shadow-sm"
                                                                                title="Edit"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                           </button>
                                                                           <button
                                                                                onClick={() => handleDelete(item._id)}
                                                                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm"
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
                                                       <tr><td colSpan={3} className="py-10 text-center text-bgray-500">No classes found.</td></tr>
                                                  )}
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