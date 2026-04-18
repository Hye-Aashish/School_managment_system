"use client";
import React, { useState, useEffect } from "react";

export default function ContentTypeManagement() {
     const [types, setTypes] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [name, setName] = useState("");

     const fetchTypes = async () => {
          setLoading(true);
          const res = await fetch("/api/download-content-types");
          const data = await res.json();
          if (data.success) setTypes(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchTypes(); }, []);

     const handleSave = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!name) return;
          await fetch("/api/download-content-types", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ name })
          });
          setName("");
          fetchTypes();
     };

     const deleteType = async (id: string) => {
          if (!confirm("Remove this content type?")) return;
          await fetch(`/api/download-content-types?id=${id}`, { method: "DELETE" });
          fetchTypes();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Form Section */}
                    <section className="2xl:w-[400px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-6 uppercase tracking-tighter">Classification Registry</h3>
                              <form onSubmit={handleSave} className="space-y-5">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Category Label *</label>
                                        <input required value={name} onChange={e => setName(e.target.value)} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Assignments" />
                                   </div>
                                   <button type="submit" className="w-full h-14 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-lg shadow-success-300/20 transition-all uppercase tracking-[0.2em] text-[10px]">REGISTER CATEGORY</button>
                              </form>
                         </div>
                    </section>

                    {/* Registry Section */}
                    <section className="flex-1 mt-6 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden min-h-[500px]">
                              <table className="w-full text-left">
                                   <thead>
                                        <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                             <th className="px-8 py-5">Active Categories</th>
                                             <th className="px-8 py-5 text-right">Administrative</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                        {loading ? (
                                             <tr><td colSpan={2} className="py-24 text-center"><div className="w-8 h-8 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                        ) : types.length > 0 ? (
                                             types.map((t) => (
                                                  <tr key={t._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-8 py-6 border-l-4 border-transparent hover:border-success-300 transition-all font-black text-xs text-bgray-700 dark:text-bgray-200 uppercase tracking-wider">{t.name}</td>
                                                       <td className="px-8 py-6 text-right">
                                                            <button onClick={() => deleteType(t._id)} className="p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr><td colSpan={2} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">Registry Unit Empty</td></tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </section>
               </div>
          </div>
     );
}
