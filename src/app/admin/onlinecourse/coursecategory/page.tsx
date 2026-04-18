"use client";
import React, { useEffect, useState } from "react";

export default function AddCategory() {
     const [categoryName, setCategoryName] = useState("");
     const [categories, setCategories] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [editingId, setEditingId] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");

     const fetchCategories = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/online-course/category");
               if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
               }
          } catch (error) {
               console.error("Failed to fetch categories");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchCategories();
     }, []);

     const handleSaveCategory = async () => {
          if (!categoryName.trim()) return;
          setLoading(true);
          try {
               const method = editingId ? "PUT" : "POST";
               const body = editingId ? { _id: editingId, name: categoryName } : { name: categoryName };
               const res = await fetch("/api/online-course/category", {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
               });
               if (res.ok) {
                    setCategoryName("");
                    setEditingId(null);
                    fetchCategories();
               }
          } catch (error) {
               console.error("Failed to save category");
          } finally {
               setLoading(false);
          }
     };

     const handleDeleteCategory = async (id: string) => {
          if (!confirm("Are you sure you want to delete this category?")) return;
          try {
               const res = await fetch(`/api/online-course/category?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchCategories();
          } catch (error) {
               console.error("Failed to delete category");
          }
     };

     const filteredCategories = categories.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <div className="2xl:flex 2xl:space-x-12">
               {/* Add Category Section */}
               <section className="2xl:w-[400px] 2xl:mb-0 mb-6 shrink-0">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-8 flex items-center gap-3">
                              <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                              {editingId ? "Edit Category" : "Add Course Category"}
                         </h3>
                         <div className="space-y-6">
                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Category Name <span className="text-red-500">*</span></label>
                                   <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="e.g. Computer Science"
                                        className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>
                              <div className="flex gap-3">
                                   {editingId && (
                                        <button onClick={() => { setEditingId(null); setCategoryName(""); }} className="flex-1 py-4 font-bold text-bgray-700 dark:text-white bg-bgray-100 dark:bg-darkblack-500 rounded-xl hover:bg-bgray-200 transition-all border border-bgray-200 dark:border-darkblack-400">Cancel</button>
                                   )}
                                   <button onClick={handleSaveCategory} disabled={loading} className="flex-[2] py-4 bg-success-300 text-white font-bold rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 disabled:opacity-50">
                                        {loading ? "Processing..." : editingId ? "Update Category" : "Save Category"}
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Category List Section */}
               <section className="2xl:flex-1">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                         <div className="flex justify-between items-center mb-8">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Category List</h3>
                              <div className="relative w-64">
                                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                   </span>
                                   <input
                                        type="text"
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2.5 bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 rounded-xl text-sm focus:ring-2 focus:ring-success-300/50 outline-none"
                                   />
                              </div>
                         </div>

                         <div className="overflow-x-auto min-h-[50vh]">
                              <table className="w-full">
                                   <thead>
                                        <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-left border-b border-bgray-200 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 text-xs font-bold uppercase tracking-widest">
                                             <td className="px-6 py-4">Category Name</td>
                                             <td className="px-6 py-4 text-right">Action</td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {loading && categories.length === 0 ? (
                                             <tr><td colSpan={2} className="py-20 text-center text-bgray-400">Loading Categories...</td></tr>
                                        ) : filteredCategories.length > 0 ? (
                                             filteredCategories.map(cat => (
                                                  <tr key={cat._id} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-6 py-5 font-bold text-bgray-900 dark:text-white">{cat.name}</td>
                                                       <td className="px-6 py-5">
                                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                 <button onClick={() => { setEditingId(cat._id); setCategoryName(cat.name); }} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 rounded-xl hover:bg-success-300 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                                                                 <button onClick={() => handleDeleteCategory(cat._id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr><td colSpan={2} className="py-20 text-center text-bgray-400">No categories found.</td></tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </section>
          </div>
     );
}