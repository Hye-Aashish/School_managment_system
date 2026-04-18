"use client";
import React, { useState, useEffect } from "react";

export default function DepartmentManagement() {
     const [departments, setDepartments] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [name, setName] = useState("");

     const fetchDepartments = async () => {
          setLoading(true);
          const res = await fetch("/api/departments");
          const data = await res.json();
          if (data.success) setDepartments(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchDepartments(); }, []);

     const handleSave = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!name) return;
          await fetch("/api/departments", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ name })
          });
          setName("");
          fetchDepartments();
     };

     const deleteDept = async (id: string) => {
          if (!confirm("Remove this department?")) return;
          await fetch(`/api/departments?id=${id}`, { method: "DELETE" });
          fetchDepartments();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Form Section */}
                    <section className="2xl:w-[400px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-6 uppercase tracking-tighter">Department Registry</h3>
                              <form onSubmit={handleSave} className="space-y-4">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Department Name *</label>
                                        <input required value={name} onChange={e => setName(e.target.value)} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Mathematics" />
                                   </div>
                                   <button type="submit" className="w-full h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-lg shadow-success-300/20 transition-all uppercase tracking-[0.2em] text-[10px]">SAVE DEPARTMENT</button>
                              </form>
                         </div>
                    </section>

                    {/* Hierarchy Section */}
                    <section className="flex-1 mt-6 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden min-h-[500px]">
                              <table className="w-full text-left">
                                   <thead>
                                        <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                             <th className="px-6 py-4">Organizational Unit</th>
                                             <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                        {loading ? (
                                             <tr><td colSpan={2} className="py-24 text-center"><div className="w-8 h-8 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                        ) : departments.length > 0 ? (
                                             departments.map((d) => (
                                                  <tr key={d._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-6 py-6 border-l-4 border-transparent hover:border-success-300 transition-all font-black text-xs text-bgray-700 dark:text-bgray-200 uppercase tracking-wider">{d.name}</td>
                                                       <td className="px-6 py-6 text-right">
                                                            <button onClick={() => deleteDept(d._id)} className="p-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr><td colSpan={2} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">Hierarchy Unit Empty</td></tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </section>
               </div>
          </div>
     );
}