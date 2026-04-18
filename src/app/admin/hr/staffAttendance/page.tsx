"use client";
import React, { useState, useEffect } from "react";

export default function StaffAttendance() {
     const [staff, setStaff] = useState<any[]>([]);
     const [attendance, setAttendance] = useState<{ [key: string]: any }>({});
     const [loading, setLoading] = useState(false);
     const [roleFilter, setRoleFilter] = useState("Teacher");
     const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
     const [saving, setSaving] = useState(false);

     const fetchData = async () => {
          setLoading(true);
          try {
               const [staffRes, attRes] = await Promise.all([
                    fetch(`/api/staff?role=${roleFilter}`),
                    fetch(`/api/staff-attendance?date=${date}`)
               ]);
               const staffData = await staffRes.json();
               const attData = await attRes.json();

               if (staffData.success) setStaff(staffData.data);
               
               const attMap: { [key: string]: any } = {};
               if (attData.success) {
                    attData.data.forEach((item: any) => {
                         attMap[item.staffId] = item;
                    });
               }
               setAttendance(attMap);
          } catch (e) {
               console.error(e);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => { fetchData(); }, [roleFilter, date]);

     const handleStatusChange = (staffId: string, status: string) => {
          setAttendance(prev => ({
               ...prev,
               [staffId]: { ...prev[staffId], staffId, date, status }
          }));
     };

     const markAll = (status: string) => {
          const nextAtt = { ...attendance };
          staff.forEach(s => {
               nextAtt[s.staffId] = { ...nextAtt[s.staffId], staffId: s.staffId, date, status };
          });
          setAttendance(nextAtt);
     };

     const saveAttendance = async () => {
          setSaving(true);
          const payload = Object.values(attendance);
          try {
               const res = await fetch("/api/staff-attendance", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
               });
               if (res.ok) alert("Attendance archived successfully");
          } catch (e) {
               console.error(e);
          } finally {
               setSaving(false);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 shrink-0 mr-4 uppercase tracking-tighter">
                                   <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                                   Workforce Log
                              </h3>
                              <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                   <option value="Admin">Admin</option>
                                   <option value="Teacher">Teacher</option>
                                   <option value="Accountant">Accountant</option>
                              </select>
                              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                         </div>
                         <div className="flex gap-2 shrink-0">
                              <button onClick={() => markAll("Present")} className="px-5 h-10 border border-success-300 text-success-300 font-black rounded-xl text-[9px] uppercase hover:bg-success-300 hover:text-white transition-all">Sign-In All</button>
                               <button 
                                   disabled={saving}
                                   onClick={saveAttendance}
                                   className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 uppercase tracking-widest text-[10px]"
                              >
                                   {saving ? "Archiving..." : "COMMIT LOGS"}
                              </button>
                         </div>
                    </div>
               </section>

               {/* Table View */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden min-h-[500px]">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-6 py-4">Employee Information</th>
                                        <th className="px-6 py-4">Status Attribution</th>
                                        <th className="px-6 py-4">Institutional Note</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={3} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                   ) : staff.length > 0 ? (
                                        staff.map((s) => {
                                             const status = attendance[s.staffId]?.status;
                                             return (
                                                  <tr key={s._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-6 py-6 border-l-4 border-transparent hover:border-success-300 transition-all">
                                                            <div className="flex flex-col">
                                                                 <span className="text-xs font-black text-bgray-900 dark:text-white uppercase">{s.firstName} {s.lastName}</span>
                                                                 <span className="text-[9px] font-bold text-bgray-400 mt-1 uppercase">ID: {s.staffId} | Dept: {s.department || "N/A"}</span>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-6 font-black">
                                                            <div className="flex gap-2">
                                                                 {["Present", "Late", "Absent"].map(st => (
                                                                      <button 
                                                                           key={st}
                                                                           onClick={() => handleStatusChange(s.staffId, st)}
                                                                           className={`px-4 py-1.5 rounded-lg text-[9px] uppercase tracking-widest transition-all ${
                                                                                status === st ? 'bg-success-300 text-white shadow-lg shadow-success-300/30' : 'bg-bgray-100 dark:bg-darkblack-500 text-bgray-400 hover:bg-bgray-200'
                                                                           }`}
                                                                      >
                                                                           {st}
                                                                      </button>
                                                                 ))}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-6">
                                                            <input 
                                                                 type="text" 
                                                                 placeholder="Observation notes..."
                                                                 value={attendance[s.staffId]?.note || ""}
                                                                 onChange={e => setAttendance({...attendance, [s.staffId]: {...attendance[s.staffId], staffId: s.staffId, date, note: e.target.value}})}
                                                                 className="w-full bg-transparent border-none text-[11px] font-bold text-bgray-400 italic outline-none focus:text-bgray-900"
                                                            />
                                                       </td>
                                                  </tr>
                                             );
                                        })
                                   ) : (
                                        <tr>
                                             <td colSpan={3} className="py-24 text-center">
                                                  <div className="max-w-[140px] mx-auto opacity-10">
                                                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                       <p className="text-[9px] font-black uppercase tracking-widest">No personnel listed</p>
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