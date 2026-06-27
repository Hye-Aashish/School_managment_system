"use client";
import React, { useState, useEffect } from "react";

export default function RoutePickupPoint() {
     const [routes, setRoutes] = useState<any[]>([]);
     const [pickups, setPickups] = useState<any[]>([]);
     const [assignments, setAssignments] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);

     const [selectedRoute, setSelectedRoute] = useState("");
     const [selectedPickups, setSelectedPickups] = useState<string[]>([]);

     // Pagination states
     const [currentPage, setCurrentPage] = useState(1);
     const [entriesPerPage, setEntriesPerPage] = useState(5);

     const indexOfLastEntry = currentPage * entriesPerPage;
     const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
     const currentAssignments = assignments.slice(indexOfFirstEntry, indexOfLastEntry);
     const totalPages = Math.ceil(assignments.length / entriesPerPage);

     const fetchData = async () => {
          setLoading(true);
          try {
               const [rRes, pRes, aRes] = await Promise.all([
                    fetch("/api/transport/core?type=route"),
                    fetch("/api/transport/core?type=pickup"),
                    fetch("/api/transport/assignments?type=routePoint")
               ]);
               const [rData, pData, aData] = await Promise.all([rRes.json(), pRes.json(), aRes.json()]);

               if (rData.success) setRoutes(rData.data);
               if (pData.success) setPickups(pData.data);
               if (aData.success) setAssignments(aData.data);
          } catch (e) {
               console.error("Error fetching transport core data:", e);
          }
          setLoading(false);
     };

     useEffect(() => { fetchData(); }, []);

     const handleCheckboxChange = (pickupName: string) => {
          if (selectedPickups.includes(pickupName)) {
               setSelectedPickups(selectedPickups.filter(p => p !== pickupName));
          } else {
               setSelectedPickups([...selectedPickups, pickupName]);
          }
     };

     const handleAssign = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!selectedRoute) return;

          await fetch("/api/transport/assignments", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    type: "routePoint",
                    route: selectedRoute,
                    pickupPoints: selectedPickups
               })
          });

          setSelectedRoute("");
          setSelectedPickups([]);
          fetchData();
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Remove this route point mapping?")) return;
          await fetch(`/api/transport/assignments?type=routePoint&id=${id}`, {
               method: "DELETE"
          });
          fetchData();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Assignment Control */}
                    <section className="2xl:w-[450px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Route Mapping Matrix
                              </h3>
                              <form onSubmit={handleAssign} className="space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Select Route *</label>
                                        <select required value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                             <option value="">Select Route</option>
                                             {routes.map(r => <option key={r._id} value={r.name}>{r.name}</option>)}
                                        </select>
                                   </div>

                                   <div className="space-y-3">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1 block">Active Pickup Points</label>
                                        <div className="max-h-[220px] overflow-y-auto space-y-2.5 pr-2 border border-bgray-100 dark:border-darkblack-400 rounded-2xl p-4 bg-bgray-50/50 dark:bg-darkblack-500/20">
                                             {pickups.length > 0 ? (
                                                  pickups.map(p => (
                                                       <label key={p._id} className="flex items-center gap-3 cursor-pointer group">
                                                            <input
                                                                 type="checkbox"
                                                                 checked={selectedPickups.includes(p.name)}
                                                                 onChange={() => handleCheckboxChange(p.name)}
                                                                 className="w-5 h-5 rounded-md border-bgray-300 text-success-300 focus:ring-success-300/30"
                                                            />
                                                            <span className="text-sm font-bold text-bgray-700 dark:text-bgray-200 group-hover:text-success-300 transition-colors uppercase tracking-tight">{p.name}</span>
                                                       </label>
                                                  ))
                                             ) : (
                                                  <span className="text-xs font-bold text-bgray-300 uppercase tracking-wider block text-center py-4">No pickup points registered</span>
                                             )}
                                        </div>
                                   </div>

                                   <button type="submit" className="w-full h-16 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-[0.2em] text-xs">FINALIZE ROUTE MAPPING</button>

                                   <div className="pt-4 text-center border-t border-dashed border-bgray-100 dark:border-darkblack-400">
                                        <p className="text-[9px] font-bold text-bgray-300 uppercase tracking-widest leading-relaxed italic">Linking pickup points structures geographic boarding sequences</p>
                                   </div>
                              </form>
                         </div>
                    </section>

                    {/* Registry Section */}
                    <section className="flex-1 mt-8 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/20">
                                   <h4 className="text-[11px] font-black text-bgray-500 uppercase tracking-[0.2em]">Mapped Routes Registry</h4>
                              </div>
                              <div className="overflow-x-auto min-h-[500px]">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                                  <th className="px-8 py-5">Route Name</th>
                                                  <th className="px-8 py-5">Linked Pickup Points</th>
                                                  <th className="px-8 py-5">Status Protocol</th>
                                                  <th className="px-8 py-5 text-right">Administrative</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                             {loading ? (
                                                  <tr><td colSpan={4} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                             ) : currentAssignments.length > 0 ? (
                                                  currentAssignments.map((a) => (
                                                       <tr key={a._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                            <td className="px-8 py-7 border-l-4 border-transparent hover:border-success-300 transition-all font-black text-xs text-bgray-900 dark:text-white uppercase tracking-tighter">{a.route}</td>
                                                            <td className="px-8 py-7 font-black text-xs text-success-300 uppercase tracking-tighter">
                                                                 <div className="flex flex-wrap gap-2">
                                                                      {a.pickupPoints && a.pickupPoints.length > 0 ? (
                                                                           a.pickupPoints.map((p: string, idx: number) => (
                                                                                <span key={idx} className="bg-bgray-50 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-300 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide uppercase">{p}</span>
                                                                           ))
                                                                      ) : (
                                                                           <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">No Pickup Points Linked</span>
                                                                      )}
                                                                 </div>
                                                            </td>
                                                            <td className="px-8 py-7">
                                                                 <div className="flex items-center gap-2">
                                                                      <div className="w-1.5 h-1.5 rounded-full bg-success-300 animate-pulse"></div>
                                                                      <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest leading-none">Operational</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-8 py-7 text-right">
                                                                 <button type="button" onClick={() => handleDelete(a._id)} className="p-3 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr><td colSpan={4} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">No routes mapped to pickup points yet</td></tr>
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                              {/* Pagination Controls */}
                              {assignments.length > 0 && (
                                   <div className="p-6 border-t border-bgray-100 dark:border-darkblack-400 bg-bgray-50/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                             <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Show result:</span>
                                             <select
                                                  value={entriesPerPage}
                                                  onChange={e => {
                                                       setEntriesPerPage(Number(e.target.value));
                                                       setCurrentPage(1);
                                                  }}
                                                  className="bg-bgray-50 dark:bg-darkblack-500 text-xs font-bold border-none rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-success-300/30 text-bgray-900 dark:text-white"
                                             >
                                                  <option value={5}>5</option>
                                                  <option value={10}>10</option>
                                                  <option value={20}>20</option>
                                             </select>
                                        </div>
                                        <div className="flex items-center gap-3">
                                             <button
                                                  type="button"
                                                  disabled={currentPage === 1}
                                                  onClick={() => setCurrentPage(currentPage - 1)}
                                                  className="p-3 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-success-300 transition-all disabled:opacity-30 disabled:hover:text-bgray-400"
                                             >
                                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"></path></svg>
                                             </button>
                                             <span className="text-xs font-black text-bgray-900 dark:text-white uppercase tracking-tighter">Page {currentPage} of {totalPages || 1}</span>
                                             <button
                                                  type="button"
                                                  disabled={currentPage === totalPages || totalPages === 0}
                                                  onClick={() => setCurrentPage(currentPage + 1)}
                                                  className="p-3 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-success-300 transition-all disabled:opacity-30 disabled:hover:text-bgray-400"
                                             >
                                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"></path></svg>
                                             </button>
                                        </div>
                                   </div>
                              )}
                         </div>
                    </section>
               </div>
          </div>
     );
}
