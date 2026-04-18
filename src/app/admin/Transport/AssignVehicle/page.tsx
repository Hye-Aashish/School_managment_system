"use client";
import React, { useState, useEffect } from "react";

export default function AssignVehicle() {
     const [routes, setRoutes] = useState<any[]>([]);
     const [vehicles, setVehicles] = useState<any[]>([]);
     const [assignments, setAssignments] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     
     const [formData, setFormData] = useState({ route: "", vehicle: "" });

     const fetchData = async () => {
          setLoading(true);
          const [rRes, vRes, aRes] = await Promise.all([
               fetch("/api/transport/core?type=route"),
               fetch("/api/transport/core?type=vehicle"),
               fetch("/api/transport/assignments?type=assignVehicle")
          ]);
          const [rData, vData, aData] = await Promise.all([rRes.json(), vRes.json(), aRes.json()]);
          
          if (rData.success) setRoutes(rData.data);
          if (vData.success) setVehicles(vData.data);
          if (aData.success) setAssignments(aData.data);
          setLoading(false);
     };

     useEffect(() => { fetchData(); }, []);

     const handleAssign = async (e: React.FormEvent) => {
          e.preventDefault();
          await fetch("/api/transport/assignments", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ type: "assignVehicle", ...formData })
          });
          setFormData({ route: "", vehicle: "" });
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
                                   Deployment Matrix
                              </h3>
                              <form onSubmit={handleAssign} className="space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Institutional Route *</label>
                                        <select required value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                             <option value="">Select Route</option>
                                             {routes.map(r => <option key={r._id} value={r.name}>{r.name}</option>)}
                                        </select>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Mobile Asset (Vehicle) *</label>
                                        <select required value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30 text-success-300">
                                             <option value="">Select Vehicle</option>
                                             {vehicles.map(v => <option key={v._id} value={v.vehicleNo}>{v.vehicleNo} ({v.model})</option>)}
                                        </select>
                                   </div>
                                   <button type="submit" className="w-full h-16 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-[0.2em] text-xs">FINALIZE DEPLOYMENT</button>
                                   <div className="pt-4 text-center border-t border-dashed border-bgray-100 dark:border-darkblack-400">
                                        <p className="text-[9px] font-bold text-bgray-300 uppercase tracking-widest leading-relaxed italic">Asset-Route linking protocol synchronized with global institutional dispatch</p>
                                   </div>
                              </form>
                         </div>
                    </section>

                    {/* Registry Section */}
                    <section className="flex-1 mt-8 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                               <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/20">
                                   <h4 className="text-[11px] font-black text-bgray-500 uppercase tracking-[0.2em]">Deployment Registry</h4>
                              </div>
                              <div className="overflow-x-auto min-h-[500px]">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                                  <th className="px-8 py-5">Assigned Route</th>
                                                  <th className="px-8 py-5">Active Mobile Asset</th>
                                                  <th className="px-8 py-5">Status Protocol</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                             {loading ? (
                                                  <tr><td colSpan={3} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                             ) : assignments.length > 0 ? (
                                                  assignments.map((a) => (
                                                       <tr key={a._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                            <td className="px-8 py-7 border-l-4 border-transparent hover:border-success-300 transition-all font-black text-xs text-bgray-900 dark:text-white uppercase tracking-tighter">{a.route}</td>
                                                            <td className="px-8 py-7 font-black text-xs text-success-300 uppercase tracking-widest">{a.vehicle}</td>
                                                            <td className="px-8 py-7">
                                                                 <div className="flex items-center gap-2">
                                                                      <div className="w-1.5 h-1.5 rounded-full bg-success-300 animate-pulse"></div>
                                                                      <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest leading-none">Operational</span>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr><td colSpan={3} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">No active deployments registered</td></tr>
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </section>
               </div>
          </div>
     );
}
