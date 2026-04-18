"use client";
import React, { useState, useEffect } from "react";

export default function TransportVehicles() {
     const [vehicles, setVehicles] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     const [formData, setFormData] = useState({
          vehicleNo: "", model: "", yearMade: "", registrationNo: "",
          driverName: "", driverLicence: "", driverPhone: ""
     });

     const fetchVehicles = async () => {
          setLoading(true);
          const res = await fetch("/api/transport/core?type=vehicle");
          const data = await res.json();
          if (data.success) setVehicles(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchVehicles(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          await fetch("/api/transport/core", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ type: "vehicle", ...formData })
          });
          setIsModalOpen(false);
          setFormData({ vehicleNo: "", model: "", yearMade: "", registrationNo: "", driverName: "", driverLicence: "", driverPhone: "" });
          fetchVehicles();
     };

     const deleteVehicle = async (id: string) => {
          if (!confirm("Remove this vehicle from fleet?")) return;
          await fetch(`/api/transport/core?type=vehicle&id=${id}`, { method: "DELETE" });
          fetchVehicles();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Fleet Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Institutional Fleet Manifest
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Surgical monitoring of institutional mobile assets and personnel</p>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              REGISTER FLEET UNIT
                         </button>
                    </div>
               </section>

               {/* Fleet Grid */}
               <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {loading ? (
                         <div className="col-span-full py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></div>
                    ) : vehicles.length > 0 ? (
                         vehicles.map((v) => (
                              <div key={v._id} className="bg-white dark:bg-darkblack-600 rounded-[40px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-2xl hover:shadow-success-300/10 transition-all group border-t-[8px] border-t-success-300 relative overflow-hidden">
                                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="22" height="13" rx="2" ry="2"></rect><path d="M7 21a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path><path d="M13 21a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path></svg>
                                   </div>
                                   <div className="flex justify-between items-start mb-8">
                                        <div className="w-16 h-16 bg-success-300/10 rounded-2xl flex items-center justify-center text-success-300">
                                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="22" height="13" rx="2" ry="2"></rect><path d="M7 21a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path><path d="M13 21a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path></svg>
                                        </div>
                                        <button onClick={() => deleteVehicle(v._id)} className="text-bgray-300 hover:text-red-500 transition-colors">
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                   </div>
                                   <div className="space-y-6">
                                        <div>
                                             <h4 className="text-xl font-black dark:text-white uppercase tracking-tighter">{v.vehicleNo}</h4>
                                             <p className="text-[10px] font-black text-bgray-400 uppercase tracking-widest mt-1">{v.model} | {v.yearMade}</p>
                                        </div>
                                        <div className="pt-6 border-t border-dashed border-bgray-100 dark:border-darkblack-400 grid grid-cols-2 gap-4">
                                             <div className="flex flex-col">
                                                  <span className="text-[8px] font-black text-bgray-300 uppercase tracking-widest">Driver Assignment</span>
                                                  <span className="text-[11px] font-black dark:text-white uppercase tracking-tighter mt-1">{v.driverName || "Unassigned"}</span>
                                             </div>
                                             <div className="flex flex-col text-right">
                                                  <span className="text-[8px] font-black text-bgray-300 uppercase tracking-widest">Emergency Contact</span>
                                                  <span className="text-[11px] font-black text-success-300 uppercase tracking-tighter mt-1">{v.driverPhone || "N/A"}</span>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <div className="col-span-full py-32 text-center opacity-10">
                              <p className="text-[12px] font-black uppercase tracking-[0.3em]">Fleet manifest empty</p>
                         </div>
                    )}
               </section>

               {/* Fleet Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/50">
                                   <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Fleet unit onboarding</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Integrating new mobile asset to institutional logistical framework</p>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                   <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Vehicle Tag *</label>
                                             <input required value={formData.vehicleNo} onChange={e => setFormData({...formData, vehicleNo: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. BUS-01" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Model / Specs</label>
                                             <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Tata Marcopolo" />
                                        </div>
                                   </div>
                                   <div className="grid grid-cols-2 gap-8 pb-8 border-b border-dashed border-bgray-100 dark:border-darkblack-400">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Fabrication Year</label>
                                             <input value={formData.yearMade} onChange={e => setFormData({...formData, yearMade: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="2023" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Legal Registration CODE</label>
                                             <input value={formData.registrationNo} onChange={e => setFormData({...formData, registrationNo: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-success-300" placeholder="DL-01-XX-0000" />
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-bgray-900 dark:text-white uppercase tracking-[0.2em] block mb-4">Personnel Assignment</label>
                                        <div className="grid grid-cols-2 gap-8">
                                             <div className="space-y-1.5">
                                                  <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Driver Nomenclature</label>
                                                  <input value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                             </div>
                                             <div className="space-y-1.5">
                                                  <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Driver Contact Matrix</label>
                                                  <input value={formData.driverPhone} onChange={e => setFormData({...formData, driverPhone: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                             </div>
                                        </div>
                                   </div>
                                    <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-[20px] hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button type="submit" className="px-12 h-14 bg-success-300 text-white font-black rounded-[20px] hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">Commit Fleet unit</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}