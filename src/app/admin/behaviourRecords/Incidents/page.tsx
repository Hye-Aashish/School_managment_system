"use client";
import React, { useState, useEffect } from "react";
import IncidentModal from "./IncidentModal";

interface Incident {
     _id: string;
     title: string;
     point: number;
     description: string;
}

export default function IncidentList() {
     const [incidents, setIncidents] = useState<Incident[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [editData, setEditData] = useState<Incident | null>(null);
     const [searchTerm, setSearchTerm] = useState("");

     const fetchIncidents = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/incidents");
               const json = await res.json();
               if (json.success) {
                    setIncidents(json.data);
               }
          } catch (error) {
               console.error("Error fetching incidents:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchIncidents();
     }, []);

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this incident?")) return;
          try {
               const res = await fetch(`/api/incidents/${id}`, { method: "DELETE" });
               if (res.ok) {
                    fetchIncidents();
               }
          } catch (error) {
               console.error("Error deleting incident:", error);
          }
     };

     const filteredData = incidents.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <button
                                             type="button"
                                             onClick={() => { setEditData(null); setIsModalOpen(true); }}
                                             className="px-4 py-2 bg-success-300 hover:bg-success-400 text-white rounded-lg font-semibold flex items-center gap-2 transition duration-300"
                                        >
                                             <span>+</span>Add
                                        </button>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-bgray-50 font-medium">Title</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-bgray-50 font-medium">Point</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-bgray-50 font-medium">Description</td>
                                                       <td className="py-5 px-6 xl:px-0 text-right pr-6 text-bgray-600 dark:text-bgray-50 font-medium">Action</td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {isLoading ? (
                                                       <tr><td colSpan={4} className="text-center py-10">Loading...</td></tr>
                                                  ) : filteredData.length === 0 ? (
                                                       <tr><td colSpan={4} className="text-center py-10">No incidents found</td></tr>
                                                  ) : filteredData.map((item) => (
                                                       <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0"><p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.title}</p></td>
                                                            <td className="py-5 px-6 xl:px-0"><p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.point}</p></td>
                                                            <td className="py-5 px-6 xl:px-0"><p className="font-medium text-base text-bgray-900 dark:text-bgray-50 max-w-md truncate">{item.description}</p></td>
                                                            <td className="py-5 px-6 xl:px-0 pr-6">
                                                                 <div className="flex items-center justify-end gap-2">
                                                                       <button onClick={() => { setEditData(item); setIsModalOpen(true); }} className="text-bgray-600 dark:text-bgray-400 hover:text-success-300 transition duration-300">
                                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" /><path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" /></svg>
                                                                       </button>
                                                                       <button onClick={() => handleDelete(item._id)} className="text-bgray-600 dark:text-bgray-400 hover:text-error-300 transition duration-300">
                                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6L18 18" /></svg>
                                                                       </button>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
               <IncidentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRefresh={fetchIncidents} editData={editData} />
          </>
     );
}