"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function AnnualCalendar() {
     const [events, setEvents] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [typeFilter, setTypeFilter] = useState("All");
     
     const [formData, setFormData] = useState({
          title: "",
          fromDate: "",
          toDate: "",
          type: "Holiday",
          description: "",
          frontSite: "Yes"
     });

     const fetchEvents = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/annual-calendar");
               const data = await res.json();
               if (data.success) setEvents(data.data);
          } catch (error) {
               console.error("Fetch Error:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchEvents();
     }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
               const res = await fetch("/api/annual-calendar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, createdBy: "Admin" })
               });
               if (res.ok) {
                    setIsModalOpen(false);
                    setFormData({
                         title: "",
                         fromDate: "",
                         toDate: "",
                         type: "Holiday",
                         description: "",
                         frontSite: "Yes"
                    });
                    fetchEvents();
               }
          } catch (error) {
               console.error("Submit Error:", error);
          }
     };

     const deleteEvent = async (id: string) => {
          if (!confirm("Remove this entry from the annual calendar?")) return;
          try {
               const res = await fetch(`/api/annual-calendar?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchEvents();
          } catch (error) {
               console.error("Delete Error:", error);
          }
     };

     const filteredEvents = useMemo(() => {
          return events.filter(e => {
               const matchesSearch = e.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                   e.description?.toLowerCase().includes(searchQuery.toLowerCase());
               const matchesType = typeFilter === "All" || e.type === typeFilter;
               return matchesSearch && matchesType;
          });
     }, [events, searchQuery, typeFilter]);

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white flex items-center gap-3 shrink-0 mr-4">
                                   <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                                   Annual Calendar
                              </h3>
                              <div className="relative w-full lg:w-96">
                                   <input 
                                        type="text" 
                                        placeholder="Search activities or holidays..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-11 pl-11 pr-4 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white"
                                   />
                                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                   </span>
                              </div>
                              <div className="flex items-center gap-1 bg-bgray-50 dark:bg-darkblack-500 p-1 rounded-xl">
                                   {["All", "Holiday", "Activity"].map(f => (
                                        <button 
                                             key={f} 
                                             onClick={() => setTypeFilter(f)}
                                             className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${typeFilter === f ? "bg-white dark:bg-darkblack-600 text-bgray-900 shadow-sm" : "text-bgray-400"}`}
                                        >
                                             {f}
                                        </button>
                                   ))}
                              </div>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0"
                         >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              ADD EVENT
                         </button>
                    </div>
               </section>

               {/* Table */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[500px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4">Title / ID</th>
                                        <th className="px-6 py-4">Duration</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Brief Information</th>
                                        <th className="px-6 py-4 text-center">Front Site</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr>
                                             <td colSpan={6} className="py-24 text-center">
                                                  <div className="flex flex-col items-center gap-4">
                                                       <div className="w-10 h-10 border-4 border-success-300 border-t-transparent rounded-full animate-spin"></div>
                                                       <span className="text-xs font-bold text-bgray-400 uppercase tracking-widest">Compiling Calendar Data...</span>
                                                  </div>
                                             </td>
                                        </tr>
                                   ) : filteredEvents.length > 0 ? (
                                        filteredEvents.map((event, idx) => (
                                             <tr key={event._id} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/10 transition-colors group">
                                                  <td className="px-6 py-6 border-l-4 border-transparent hover:border-success-300 transition-all">
                                                       <div className="flex flex-col">
                                                            <span className="text-sm font-black text-bgray-900 dark:text-white uppercase">{event.title}</span>
                                                            <span className="text-[9px] font-bold text-bgray-400 mt-1 uppercase">ID: CAL-{(idx+1).toString().padStart(3, '0')}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-bgray-700 dark:text-bgray-200">{event.fromDate} - {event.toDate}</span>
                                                            <span className="text-[9px] text-bgray-400 font-bold uppercase tracking-tighter mt-1 italic">Interval period</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                            event.type === 'Holiday' ? 'bg-orange-50 text-orange-600' : 'bg-success-50 text-success-300'
                                                       }`}>
                                                            {event.type}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <p className="text-[11px] font-medium text-bgray-500 dark:text-bgray-400 italic max-w-sm">
                                                            {event.description?.substring(0, 100)}{event.description?.length > 100 ? "..." : ""}
                                                       </p>
                                                  </td>
                                                  <td className="px-6 py-6 text-center">
                                                       <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${event.frontSite === "Yes" ? "bg-green-100 text-green-700" : "bg-bgray-100 text-bgray-500"}`}>
                                                            {event.frontSite}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-6 text-right">
                                                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                 onClick={() => deleteEvent(event._id)}
                                                                 className="p-2 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Archive Event"
                                                            >
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={6} className="py-24 text-center">
                                                  <div className="max-w-[200px] mx-auto opacity-20 dark:invert">
                                                       <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                                       <p className="text-[10px] font-black uppercase tracking-[0.2em]">Calendar Archive Empty</p>
                                                  </div>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center">
                                   <div>
                                        <h3 className="text-xl font-bold dark:text-white uppercase tracking-tighter">Register New Event</h3>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest">Adding entry to academic annual calendar</p>
                                   </div>
                                   <button onClick={() => setIsModalOpen(false)} className="bg-bgray-100 dark:bg-darkblack-500 p-2 rounded-xl text-bgray-400 hover:text-red-500 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                   <div className="space-y-4">
                                        <div className="flex flex-col gap-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Event Subject / Title</label>
                                             <input 
                                                  required
                                                  type="text" 
                                                  value={formData.title}
                                                  onChange={e => setFormData({...formData, title: e.target.value})}
                                                  className="h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white"
                                                  placeholder="e.g. Winter Break, Annual Sports Day"
                                             />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div className="flex flex-col gap-2">
                                                  <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">From Date</label>
                                                  <input 
                                                       required
                                                       type="date" 
                                                       value={formData.fromDate}
                                                       onChange={e => setFormData({...formData, fromDate: e.target.value})}
                                                       className="h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white"
                                                  />
                                             </div>
                                             <div className="flex flex-col gap-2">
                                                  <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">To Date</label>
                                                  <input 
                                                       required
                                                       type="date" 
                                                       value={formData.toDate}
                                                       onChange={e => setFormData({...formData, toDate: e.target.value})}
                                                       className="h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white"
                                                  />
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div className="flex flex-col gap-2">
                                                  <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Classification Type</label>
                                                  <select 
                                                       value={formData.type}
                                                       onChange={e => setFormData({...formData, type: e.target.value})}
                                                       className="h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white"
                                                  >
                                                       <option value="Holiday">Holiday</option>
                                                       <option value="Activity">Activity</option>
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-2">
                                                  <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Publish to Front Site</label>
                                                  <select 
                                                       value={formData.frontSite}
                                                       onChange={e => setFormData({...formData, frontSite: e.target.value})}
                                                       className="h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white"
                                                  >
                                                       <option value="Yes">Yes</option>
                                                       <option value="No">No</option>
                                                  </select>
                                             </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                             <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Description / Notes</label>
                                             <textarea 
                                                  value={formData.description}
                                                  onChange={e => setFormData({...formData, description: e.target.value})}
                                                  rows={4}
                                                  className="bg-bgray-50 dark:bg-darkblack-500 rounded-xl p-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50 dark:text-white resize-none"
                                                  placeholder="Provide details about the holiday or activity..."
                                             ></textarea>
                                        </div>
                                   </div>
                                   <div className="flex justify-end gap-3 pt-4 border-t border-bgray-100 dark:border-darkblack-400">
                                        <button 
                                             type="button" 
                                             onClick={() => setIsModalOpen(false)}
                                             className="px-8 h-12 bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 dark:text-white font-black rounded-xl hover:bg-bgray-200 transition-all uppercase text-[10px] tracking-widest"
                                        >
                                             Discard
                                        </button>
                                        <button 
                                             type="submit"
                                             className="px-10 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-lg shadow-success-300/20 transition-all uppercase text-[10px] tracking-widest"
                                        >
                                             Save Entry
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}