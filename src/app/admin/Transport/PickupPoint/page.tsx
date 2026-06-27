"use client";
import React, { useEffect, useState } from "react";

export default function PickupPoint() {
     const [pickups, setPickups] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     
     // Modal & Form States
     const [showAddModal, setShowAddModal] = useState(false);
     const [formData, setFormData] = useState({ name: "", latitude: "", longitude: "" });

     // Pagination states
     const [currentPage, setCurrentPage] = useState(1);
     const [entriesPerPage, setEntriesPerPage] = useState(5);

     const fetchPickups = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/transport/core?type=pickup");
               const data = await res.json();
               if (data.success) setPickups(data.data);
          } catch (e) {
               console.error("Error fetching pickup points:", e);
          }
          setLoading(false);
     };

     useEffect(() => {
          fetchPickups();
     }, []);

     const handleAddPickup = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.name || !formData.latitude || !formData.longitude) return;

          try {
               const res = await fetch("/api/transport/core", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         type: "pickup",
                         ...formData
                    })
               });
               const data = await res.json();
               if (data.success) {
                    setShowAddModal(false);
                    setFormData({ name: "", latitude: "", longitude: "" });
                    fetchPickups();
               }
          } catch (e) {
               console.error("Error adding pickup point:", e);
          }
     };

     const handleDeletePickup = async (id: string) => {
          if (!confirm("Are you sure you want to delete this pickup point?")) return;

          try {
               const res = await fetch(`/api/transport/core?type=pickup&id=${id}`, {
                    method: "DELETE"
               });
               const data = await res.json();
               if (data.success) {
                    fetchPickups();
               }
          } catch (e) {
               console.error("Error deleting pickup point:", e);
          }
     };

     // Filter & Slice for Pagination
     const filteredData = pickups.filter((point) =>
          point.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     const indexOfLastEntry = currentPage * entriesPerPage;
     const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
     const currentPickups = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
     const totalPages = Math.ceil(filteredData.length / entriesPerPage);

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                             <div className="flex w-full h-full items-center space-x-[15px]">
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                                            <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                                  <label className="w-full">
                                                       <input
                                                            type="text"
                                                            placeholder="Search Pickup Points..."
                                                            value={searchTerm}
                                                            onChange={(e) => {
                                                                 setSearchTerm(e.target.value);
                                                                 setCurrentPage(1);
                                                            }}
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>
                                        <button 
                                             type="button" 
                                             onClick={() => setShowAddModal(true)}
                                             className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg px-6 text-nowrap cursor-pointer"
                                        >
                                             + ADD
                                        </button>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-bold text-bgray-600 dark:text-white">Name</span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-bold text-bgray-600 dark:text-white">Latitude</span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-bold text-bgray-600 dark:text-white">Longitude</span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 text-right">
                                                            <span className="text-base font-bold text-bgray-600 dark:text-white">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loading ? (
                                                       <tr><td colSpan={4} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                                  ) : currentPickups.length > 0 ? (
                                                       currentPickups.map((point) => (
                                                            <tr key={point._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/20 transition-colors">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-semibold text-base text-bgray-900 dark:text-white uppercase tracking-tight">{point.name}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">{point.latitude}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">{point.longitude}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0 text-right">
                                                                      <button 
                                                                           type="button" 
                                                                           onClick={() => handleDeletePickup(point._id)} 
                                                                           className="hover:text-red-500 transition-colors p-2" 
                                                                           title="Delete"
                                                                      >
                                                                           <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.25 4.5H3.75H15.75" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 4.5V3C6 2.175 6.675 1.5 7.5 1.5H10.5C11.325 1.5 12 2.175 12 3V4.5M14.25 4.5V15C14.25 15.825 13.575 16.5 12.75 16.5H5.25C4.425 16.5 3.75 15.825 3.75 15V4.5H14.25Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (
                                                       <tr><td colSpan={4} className="py-32 text-center opacity-40 font-bold uppercase text-xs tracking-widest text-bgray-400">No pickup points found</td></tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Pagination Bar */}
                                   {filteredData.length > 0 && (
                                        <div className="w-full flex justify-between items-center py-4 border-t border-bgray-200 dark:border-darkblack-400">
                                             <div className="flex items-center space-x-2">
                                                  <span className="text-bgray-600 dark:text-white text-sm font-semibold">Show result:</span>
                                                  <select 
                                                       value={entriesPerPage} 
                                                       onChange={e => {
                                                            setEntriesPerPage(Number(e.target.value));
                                                            setCurrentPage(1);
                                                       }}
                                                       className="bg-bgray-50 dark:bg-darkblack-500 text-xs font-bold border rounded-lg border-bgray-300 dark:border-darkblack-400 px-3 py-2 outline-none focus:ring-1 focus:ring-success-300/30 text-bgray-900 dark:text-white"
                                                  >
                                                       <option value={5}>5</option>
                                                       <option value={10}>10</option>
                                                       <option value={20}>20</option>
                                                  </select>
                                             </div>
                                             <div className="flex items-center space-x-4">
                                                  <button 
                                                       type="button"
                                                       disabled={currentPage === 1}
                                                       onClick={() => setCurrentPage(currentPage - 1)}
                                                       className="p-3 bg-bgray-50 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-xl text-bgray-400 hover:text-success-300 transition-all disabled:opacity-30 disabled:hover:text-bgray-400"
                                                  >
                                                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"></path></svg>
                                                  </button>
                                                  <span className="text-xs font-bold text-bgray-900 dark:text-white uppercase tracking-tighter">Page {currentPage} of {totalPages || 1}</span>
                                                  <button 
                                                       type="button"
                                                       disabled={currentPage === totalPages || totalPages === 0}
                                                       onClick={() => setCurrentPage(currentPage + 1)}
                                                       className="p-3 bg-bgray-50 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-xl text-bgray-400 hover:text-success-300 transition-all disabled:opacity-30 disabled:hover:text-bgray-400"
                                                  >
                                                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"></path></svg>
                                                  </button>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>

               {/* Overlay Modal for Adding Pickup Point */}
               {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                         <div className="w-full max-w-[450px] bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-2xl border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Add Pickup Point
                              </h3>
                              <form onSubmit={handleAddPickup} className="space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Location Name *</label>
                                        <input 
                                             required 
                                             type="text"
                                             value={formData.name} 
                                             onChange={e => setFormData({ ...formData, name: e.target.value })} 
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             placeholder="e.g. Brooklyn North" 
                                        />
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Latitude *</label>
                                        <input 
                                             required 
                                             type="text"
                                             value={formData.latitude} 
                                             onChange={e => setFormData({ ...formData, latitude: e.target.value })} 
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             placeholder="e.g. 23.2195372" 
                                        />
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Longitude *</label>
                                        <input 
                                             required 
                                             type="text"
                                             value={formData.longitude} 
                                             onChange={e => setFormData({ ...formData, longitude: e.target.value })} 
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             placeholder="e.g. 79.9206839" 
                                        />
                                   </div>

                                   <div className="flex gap-4 pt-2">
                                        <button 
                                             type="button" 
                                             onClick={() => setShowAddModal(false)}
                                             className="w-1/2 h-14 bg-bgray-100 dark:bg-darkblack-500 text-bgray-500 dark:text-bgray-300 font-black rounded-xl hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all uppercase tracking-widest text-[10px]"
                                        >
                                             Cancel
                                        </button>
                                        <button 
                                             type="submit" 
                                             className="w-1/2 h-14 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]"
                                        >
                                             Save
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </>
     );
}
