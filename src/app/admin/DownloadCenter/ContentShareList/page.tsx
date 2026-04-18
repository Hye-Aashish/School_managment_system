"use client";
import React, { useState, useEffect } from "react";

export default function ContentShareList() {
     const [contents, setContents] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);

     const fetchContents = async () => {
          setLoading(true);
          const res = await fetch("/api/download-contents");
          const data = await res.json();
          if (data.success) setContents(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchContents(); }, []);

     const deleteContent = async (id: string) => {
          if (!confirm("Remove this resource from depository?")) return;
          await fetch(`/api/download-contents?id=${id}`, { method: "DELETE" });
          fetchContents();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <section className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Shared Assets repository
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Institutional archive of academic and administrative downloads</p>
                         </div>
                    </div>
               </section>

               <section className="bg-white dark:bg-darkblack-600 rounded-3xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[600px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-8 py-5">Asset identifier</th>
                                        <th className="px-8 py-5">Resource classification</th>
                                        <th className="px-8 py-5">Access Matrix</th>
                                        <th className="px-8 py-5">Metadata</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                   ) : contents.length > 0 ? (
                                        contents.map((item) => (
                                             <tr key={item._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-8 py-7">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{item.title}</span>
                                                            <span className="text-[8px] font-black text-bgray-300 uppercase tracking-[0.2em] mt-1.5">{item._id.slice(-8)}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-success-300"></div>
                                                            <span className="text-[10px] font-black text-bgray-700 dark:text-bgray-200 uppercase tracking-widest">{item.type}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex gap-1.5">
                                                            {item.availableFor.map((role: string) => (
                                                                 <span key={role} className="px-2.5 py-1 bg-bgray-100 dark:bg-darkblack-500 rounded-lg text-[8px] font-black text-bgray-500 dark:text-bgray-400 uppercase tracking-tighter">{role}</span>
                                                            ))}
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Shared: {item.shareDate}</span>
                                                            <span className="text-[9px] font-bold text-success-300/60 uppercase mt-1">{item.class || "Global"} {item.section}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7 text-right">
                                                       <div className="flex justify-end gap-2">
                                                            {item.fileUrl && (
                                                                 <a href={item.fileUrl} target="_blank" className="p-2.5 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-success-300 transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                                 </a>
                                                            )}
                                                            <button onClick={() => deleteContent(item._id)} className="p-2.5 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={5} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-[0.3em]">Institutional asset log empty</td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>
          </div>
     );
}
