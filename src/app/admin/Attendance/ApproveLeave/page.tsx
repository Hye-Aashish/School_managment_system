"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function LeaveApproval() {
     const [classList, setClassList] = useState<any[]>([]);
     const [leaves, setLeaves] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [statusFilter, setStatusFilter] = useState("All");

     const [criteria, setCriteria] = useState({
          class: "",
     });

     const fetchClasses = async () => {
          try {
               const res = await fetch("/api/classes");
               const data = await res.json();
               if (data.success) setClassList(data.data);
          } catch (error) {
               console.error("Failed to fetch classes");
          }
     };

     const fetchLeaves = async () => {
          setLoading(true);
          try {
               const params = new URLSearchParams();
               if (criteria.class) params.append("class", criteria.class);
               if (statusFilter !== "All") params.append("status", statusFilter);

               const res = await fetch(`/api/attendance/leave?${params.toString()}`);
               const data = await res.json();
               if (data.success) setLeaves(data.data);
          } catch (error) {
               console.error("Failed to fetch leaves");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchClasses();
          fetchLeaves();
     }, []);

     useEffect(() => {
          fetchLeaves();
     }, [criteria.class, statusFilter]);

     const filteredLeaves = useMemo(() => {
          return leaves.filter(l => {
               const student = l.student || {};
               const name = `${student.fname || ""} ${student.lname || ""}`.toLowerCase();
               const adm = (student.admission_no || "").toLowerCase();
               return name.includes(searchQuery.toLowerCase()) || adm.includes(searchQuery.toLowerCase());
          });
     }, [leaves, searchQuery]);

     const stats = useMemo(() => {
          return {
               total: leaves.length,
               pending: leaves.filter(l => l.status === "Pending").length,
               approved: leaves.filter(l => l.status === "Approved").length,
               rejected: leaves.filter(l => l.status === "Disapproved").length
          };
     }, [leaves]);

     const updateStatus = async (id: string, status: string) => {
          try {
               const res = await fetch(`/api/attendance/leave?id=${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status, approvedBy: "Admin Portal" })
               });
               if (res.ok) fetchLeaves();
          } catch (error) {
               console.error("Update Error:", error);
          }
     };

     const deleteRecord = async (id: string) => {
          if (!confirm("Delete this leave record permanently?")) return;
          try {
               const res = await fetch(`/api/attendance/leave?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchLeaves();
          } catch (error) {
               console.error("Delete Error:", error);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Dashboard Cards */}
               <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                         { label: "Total Applications", value: stats.total, color: "bg-blue-50 text-blue-600", icon: "📄" },
                         { label: "Pending Approvals", value: stats.pending, color: "bg-orange-50 text-orange-600", icon: "⏳" },
                         { label: "Approved Leaves", value: stats.approved, color: "bg-success-50 text-success-300", icon: "✅" },
                         { label: "Rejected Requests", value: stats.rejected, color: "bg-red-50 text-red-600", icon: "🚫" },
                    ].map(s => (
                         <div key={s.label} className={`p-6 rounded-2xl ${s.color} dark:bg-darkblack-600 shadow-sm flex items-center justify-between border border-transparent hover:border-bgray-200 dark:hover:border-darkblack-400 transition-all`}>
                              <div className="flex flex-col">
                                   <span className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{s.label}</span>
                                   <span className="text-3xl font-black">{s.value}</span>
                              </div>
                              <span className="text-3xl opacity-30">{s.icon}</span>
                         </div>
                    ))}
               </section>

               {/* Filter & Action Bar */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <div className="w-full sm:w-64 space-y-2">
                                   <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Target Class</label>
                                   <select 
                                        value={criteria.class}
                                        onChange={(e) => setCriteria({ ...criteria, class: e.target.value })}
                                        className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                                   >
                                        <option value="">All Academic Classes</option>
                                        {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                   </select>
                              </div>
                              <div className="w-full sm:w-auto space-y-2">
                                   <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Approval State</label>
                                   <div className="flex items-center gap-1 bg-bgray-50 dark:bg-darkblack-500 p-1 rounded-xl">
                                        {["All", "Pending", "Approved", "Disapproved"].map(f => (
                                             <button 
                                                  key={f} 
                                                  onClick={() => setStatusFilter(f)}
                                                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${statusFilter === f ? "bg-white dark:bg-darkblack-600 text-bgray-900 shadow-sm" : "text-bgray-400"}`}
                                             >
                                                  {f === "Disapproved" ? "Rejected" : f}
                                             </button>
                                        ))}
                                   </div>
                              </div>
                         </div>

                         <div className="relative w-full lg:w-96">
                              <input 
                                   type="text" 
                                   placeholder="Search by student name or record ID..." 
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   className="w-full h-11 pl-11 pr-4 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                              />
                               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                              </span>
                         </div>
                    </div>
               </section>

               {/* Leave Applications List */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[400px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4">Submission ID</th>
                                        <th className="px-6 py-4">Student Profile</th>
                                        <th className="px-6 py-4">Leave Interval</th>
                                        <th className="px-6 py-4">Status & Action</th>
                                        <th className="px-6 py-4 text-right">Administrative</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr>
                                             <td colSpan={5} className="py-24 text-center">
                                                  <div className="flex flex-col items-center gap-4">
                                                       <div className="w-10 h-10 border-4 border-success-300 border-t-transparent rounded-full animate-spin"></div>
                                                       <span className="text-xs font-bold text-bgray-400 uppercase tracking-widest">Syncing Leave Repository...</span>
                                                  </div>
                                             </td>
                                        </tr>
                                   ) : filteredLeaves.length > 0 ? (
                                        filteredLeaves.map((l, idx) => (
                                             <tr key={l._id} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/10 transition-colors group">
                                                  <td className="px-6 py-6">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-black text-bgray-400 group-hover:text-bgray-900 dark:group-hover:text-white transition-colors">REQ-{(idx+1).toString().padStart(3, '0')}</span>
                                                            <span className="text-[9px] font-bold text-bgray-400 mt-1 uppercase">Applied: {new Date(l.applyDate).toLocaleDateString()}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-bgray-900 dark:text-white uppercase">{l.student?.fname} {l.student?.lname}</span>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                 <span className="text-[10px] font-black text-success-300 bg-success-50 dark:bg-success-300/10 px-1.5 rounded">CLASS {l.class}</span>
                                                                 <span className="text-[10px] font-bold text-bgray-400 uppercase tracking-tighter">ID: {l.student?.admission_no}</span>
                                                            </div>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-bgray-700 dark:text-bgray-200">{new Date(l.fromDate).toLocaleDateString()} to {new Date(l.toDate).toLocaleDateString()}</span>
                                                            <span className="text-[10px] text-bgray-400 italic mt-0.5 max-w-[180px] truncate">{l.reason || "No reason specified."}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6">
                                                       <div className="flex items-center gap-3">
                                                            <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                                 l.status === 'Approved' ? 'bg-success-50 text-success-300' :
                                                                 l.status === 'Disapproved' ? 'bg-red-50 text-red-600' :
                                                                 'bg-orange-50 text-orange-600 bg-pulse'
                                                            }`}>
                                                                 {l.status === "Disapproved" ? "Rejected" : l.status}
                                                            </span>
                                                            {l.status === "Pending" && (
                                                                 <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                      <button onClick={() => updateStatus(l._id, "Approved")} className="w-8 h-8 rounded-lg bg-success-300 text-white flex items-center justify-center hover:bg-success-400 transition-all shadow-md shadow-success-300/20" title="Approve"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                                                                      <button onClick={() => updateStatus(l._id, "Disapproved")} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-md shadow-red-500/20" title="Reject"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                                                                 </div>
                                                            )}
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-6 text-right">
                                                       <button onClick={() => deleteRecord(l._id)} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 text-bgray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Archive record">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={5} className="py-24 text-center">
                                                  <div className="max-w-[200px] mx-auto opacity-20 dark:invert">
                                                       <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                       <p className="text-[10px] font-black uppercase tracking-[0.2em]">Application Repository Empty</p>
                                                  </div>
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