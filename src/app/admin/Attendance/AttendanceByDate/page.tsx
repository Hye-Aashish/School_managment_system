"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function AttendanceReport() {
     const [classList, setClassList] = useState<any[]>([]);
     const [sectionList, setSectionList] = useState<any[]>([]);
     const [attendanceData, setAttendanceData] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");

     const [criteria, setCriteria] = useState({
          class: "",
          section: "",
          date: ""
     });

     useEffect(() => {
          setCriteria(prev => ({
               ...prev,
               date: new Date().toISOString().split("T")[0]
          }));
          fetchClasses();
     }, []);

     const fetchClasses = async () => {
          try {
               const res = await fetch("/api/classes");
               const data = await res.json();
               if (data.success) setClassList(data.data);
          } catch (error) {
               console.error("Failed to fetch classes");
          }
     };

     useEffect(() => {
          if (criteria.class) {
               const cls = classList.find(c => c.name === criteria.class);
               if (cls && cls.sections) {
                    setSectionList(cls.sections);
                    if (criteria.section && !cls.sections.some((s: any) => s.name === criteria.section)) {
                         setCriteria(prev => ({ ...prev, section: "" }));
                    }
               }
          } else {
               setSectionList([]);
          }
     }, [criteria.class, classList]);

     const fetchReport = async () => {
          if (!criteria.class || !criteria.section || !criteria.date) return;
          setLoading(true);
          try {
               // Fetch students for the baseline
               const stuRes = await fetch(`/api/students?class=${encodeURIComponent(criteria.class)}&section=${encodeURIComponent(criteria.section)}&limit=1000`);
               const stuData = await stuRes.json();

               // Fetch attendance records
               const attRes = await fetch(`/api/attendance?date=${criteria.date}&class=${encodeURIComponent(criteria.class)}&section=${encodeURIComponent(criteria.section)}`);
               const attData = await attRes.json();

               const attMap = new Map();
               if (attData.success) {
                    attData.data.forEach((a: any) => attMap.set(a.student, a));
               }

               const merged = (stuData.data || []).map((s: any) => {
                    const record = attMap.get(s._id);
                    return {
                         id: s._id,
                         admissionNo: s.admission_no,
                         rollNo: s.roll_no,
                         name: `${s.fname} ${s.lname}`,
                         status: record ? record.status : "Not Marked",
                         entryTime: record ? record.entryTime : "---",
                         exitTime: record ? record.exitTime : "---",
                         note: record ? record.note : ""
                    };
               });
               setAttendanceData(merged);
          } catch (error) {
               console.error("Report Fetch Error:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          if (criteria.class && criteria.section && criteria.date) {
               fetchReport();
          }
     }, [criteria.class, criteria.section, criteria.date]);

     const filteredData = useMemo(() => {
          return attendanceData.filter(d => 
               d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               d.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
          );
     }, [attendanceData, searchQuery]);

     const stats = useMemo(() => {
          const total = attendanceData.length;
          const present = attendanceData.filter(d => d.status === "Present").length;
          const absent = attendanceData.filter(d => d.status === "Absent").length;
          const pending = attendanceData.filter(d => d.status === "Not Marked").length;
          return { total, present, absent, pending };
     }, [attendanceData]);

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Selection & Report Config */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white flex items-center gap-3 shrink-0">
                              <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                              Attendance Archives
                         </h3>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                              <select 
                                   value={criteria.class}
                                   onChange={(e) => setCriteria({ ...criteria, class: e.target.value })}
                                   className="h-11 rounded-xl bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-success-300/50"
                              >
                                   <option value="">Choose Class</option>
                                   {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                              </select>
                              <select 
                                   value={criteria.section}
                                   onChange={(e) => setCriteria({ ...criteria, section: e.target.value })}
                                   className="h-11 rounded-xl bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-success-300/50"
                                   disabled={!criteria.class}
                              >
                                   <option value="">Choose Section</option>
                                   {sectionList.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                              </select>
                              <input 
                                   type="date"
                                   value={criteria.date}
                                   onChange={(e) => setCriteria({ ...criteria, date: e.target.value })}
                                   className="h-11 rounded-xl bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-success-300/50"
                              />
                         </div>
                    </div>
               </section>

               {/* Stats Overview */}
               <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                         { label: "Total Students", value: stats.total, color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10", icon: "👥" },
                         { label: "Presents Today", value: stats.present, color: "bg-success-50 text-success-300 dark:bg-success-300/10", icon: "✅" },
                         { label: "Absents Logged", value: stats.absent, color: "bg-red-50 text-red-600 dark:bg-red-500/10", icon: "❌" },
                         { label: "Awaiting Input", value: stats.pending, color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10", icon: "⏳" },
                    ].map(stat => (
                         <div key={stat.label} className={`p-6 rounded-2xl ${stat.color} flex items-center justify-between border border-transparent shadow-sm`}>
                              <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{stat.label}</p>
                                   <p className="text-3xl font-black">{stat.value}</p>
                              </div>
                              <span className="text-3xl opacity-30">{stat.icon}</span>
                         </div>
                    ))}
               </section>

               {/* Table Content */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex flex-col sm:flex-row justify-between items-center gap-4">
                         <div>
                              <h4 className="text-base font-bold dark:text-white uppercase tracking-tighter">Attendance Register Search</h4>
                              <p className="text-xs text-bgray-400 font-medium">Viewing logs for {criteria.class} - {criteria.section} ({criteria.date})</p>
                         </div>
                         <div className="relative w-full sm:w-80">
                              <input 
                                   type="text" 
                                   placeholder="Search student profile..." 
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   className="w-full h-11 pl-11 pr-4 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/50"
                              />
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                              </span>
                         </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4"># Profile ID</th>
                                        <th className="px-6 py-4">Full Identity</th>
                                        <th className="px-6 py-4">Current Status</th>
                                        <th className="px-6 py-4 text-center">In / Out Time</th>
                                        <th className="px-6 py-4 text-right">Journal Remarks</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr>
                                             <td colSpan={5} className="py-24 text-center">
                                                  <div className="flex flex-col items-center gap-4">
                                                       <div className="w-10 h-10 border-4 border-success-300 border-t-transparent rounded-full animate-spin"></div>
                                                       <span className="text-xs font-bold text-bgray-400 uppercase tracking-widest">Aggregating Log Data...</span>
                                                  </div>
                                             </td>
                                        </tr>
                                   ) : filteredData.length > 0 ? (
                                        filteredData.map((d, index) => (
                                             <tr key={d.id} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/10 transition-colors group">
                                                  <td className="px-6 py-5">
                                                       <span className="text-xs font-black text-bgray-400 group-hover:text-bgray-900 dark:group-hover:text-white transition-colors">{(index+1).toString().padStart(2, '0')}</span>
                                                       <span className="ml-2 px-1.5 py-0.5 bg-bgray-100 dark:bg-darkblack-500 rounded text-[9px] font-black text-bgray-500 tracking-tighter uppercase">{d.admissionNo}</span>
                                                  </td>
                                                  <td className="px-6 py-5">
                                                       <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-bgray-900 dark:text-white uppercase">{d.name}</span>
                                                            <span className="text-[10px] text-bgray-400 font-bold uppercase tracking-widest">Roll: {d.rollNo || 'NA'}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-5">
                                                       <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                            d.status === "Present" ? "bg-success-50 text-success-300" :
                                                            d.status === "Absent" ? "bg-red-50 text-red-600" :
                                                            d.status === "Late" ? "bg-orange-50 text-orange-600" :
                                                            d.status === "Half Day" ? "bg-purple-50 text-purple-600" :
                                                            d.status === "Holiday" ? "bg-bgray-900 text-white" :
                                                            "bg-bgray-50 text-bgray-400"
                                                       }`}>
                                                            {d.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-5 text-center">
                                                       <div className="inline-flex items-center gap-2 text-[10px] font-black text-bgray-500 bg-bgray-50 dark:bg-darkblack-500 px-3 py-1 rounded-full">
                                                            <span className="text-success-300">{d.entryTime}</span>
                                                            <span className="opacity-20">|</span>
                                                            <span className="text-red-400">{d.exitTime}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-5 text-right">
                                                       <span className="text-[11px] font-medium text-bgray-400 italic max-w-xs truncate block ml-auto">{d.note || "No administrative notes recorded."}</span>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={5} className="py-24 text-center">
                                                  <div className="max-w-xs mx-auto flex flex-col items-center gap-4 text-bgray-300">
                                                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                                                       <p className="text-xs font-bold uppercase tracking-widest">No matching records retrieved from archive.</p>
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