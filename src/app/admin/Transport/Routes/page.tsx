"use client";
import React, { useState, useEffect } from "react";

export default function TransportRoutes() {
     const [routes, setRoutes] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [name, setName] = useState("");

     const fetchRoutes = async () => {
          setLoading(true);
          const res = await fetch("/api/transport/core?type=route");
          const data = await res.json();
          if (data.success) setRoutes(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchRoutes(); }, []);

     const handleSave = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!name) return;
          await fetch("/api/transport/core", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ type: "route", name })
          });
          setName("");
          fetchRoutes();
     };

     const deleteRoute = async (id: string) => {
          if (!confirm("Delete this transport route?")) return;
          await fetch(`/api/transport/core?type=route&id=${id}`, { method: "DELETE" });
          fetchRoutes();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Add Section */}
                    <section className="2xl:w-[400px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Logistical Protocol
                              </h3>
                              <form onSubmit={handleSave} className="space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Route Name *</label>
                                        <input required value={name} onChange={e => setName(e.target.value)} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. North Sector A" />
                                   </div>
                                   <button type="submit" className="w-full h-14 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">REGISTER ROUTE</button>
                                   <div className="pt-4 text-center">
                                        <p className="text-[9px] font-bold text-bgray-300 uppercase tracking-tighter">Unified Transport Deployment Active</p>
                                   </div>
                              </form>
                         </div>
                    </section>

                    {/* Table Section */}
                    <section className="flex-1 mt-8 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden min-h-[500px]">
                              <table className="w-full text-left">
                                   <thead>
                                        <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                             <th className="px-8 py-5">Active deployment routes</th>
                                             <th className="px-8 py-5 text-right">Administrative</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                        {loading ? (
                                             <tr><td colSpan={2} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                        ) : routes.length > 0 ? (
                                             routes.map((r) => (
                                                  <tr key={r._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-8 py-7 border-l-4 border-transparent hover:border-success-300 transition-all">
                                                            <div className="flex items-center gap-4">
                                                                 <div className="w-10 h-10 bg-success-300/10 rounded-xl flex items-center justify-center text-success-300">
                                                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                                                 </div>
                                                                 <span className="text-sm font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{r.name}</span>
                                                            </div>
                                                       </td>
                                                       <td className="px-8 py-7 text-right">
                                                            <button onClick={() => deleteRoute(r._id)} className="p-3 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr><td colSpan={2} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-[0.3em]">Logistical route manifest empty</td></tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </section>
               </div>
          </div>
     );
}