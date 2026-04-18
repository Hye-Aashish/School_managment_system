"use client";
import React, { useState, useEffect } from "react";

export default function CommunicationLog() {
     const [logs, setLogs] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);

     const fetchLogs = async () => {
          setLoading(true);
          const res = await fetch("/api/communication-log");
          const data = await res.json();
          if (data.success) setLogs(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchLogs(); }, []);

     return (
          <div className="flex flex-col space-y-6 px-1">
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex justify-between items-center">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Transmission Archive
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Audit trail for institutional communications</p>
                         </div>
                    </div>
               </section>

               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[600px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4">Transmission ID</th>
                                        <th className="px-6 py-4">Communication Title</th>
                                        <th className="px-6 py-4">Target Demographic</th>
                                        <th className="px-6 py-4">Protocol</th>
                                        <th className="px-6 py-4 text-right">Timestamp</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                   ) : logs.length > 0 ? (
                                        logs.map((log, idx) => (
                                             <tr key={log._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-6 py-6">
                                                       <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest leading-none">TX-{(idx+1).toString().padStart(3, '0')}</span>
                                                  </td>
                                                  <td className="px-6 py-6 font-black text-xs dark:text-white uppercase tracking-tighter max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                                       {log.title}
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <span className="px-3 py-1 bg-bgray-100 dark:bg-darkblack-500 rounded-lg text-[9px] font-black text-bgray-500 dark:text-bgray-200 uppercase tracking-widest">{log.group}</span>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'Email' ? 'bg-success-300' : 'bg-orange-300'}`}></div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${log.type === 'Email' ? 'text-success-300' : 'text-orange-400'}`}>{log.type}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6 text-right">
                                                       <span className="text-[10px] font-bold text-bgray-400 uppercase tracking-tighter">{new Date(log.sent_at).toLocaleString()}</span>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={5} className="py-32 text-center opacity-10">
                                                       <p className="text-[12px] font-black uppercase tracking-[0.3em]">Communication archive empty</p>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>
          </div>
     );
}