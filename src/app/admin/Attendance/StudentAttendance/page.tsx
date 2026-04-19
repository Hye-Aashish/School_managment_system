'use client';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendarAlt, faSearchPlus, faSearch, faUserCheck, faUserTimes, faUserClock, 
  faArrowLeft, faCheckCircle, faFilter, faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

// Mock data based on provided lists
const CLASSES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const DEFAULT_SECTIONS = ['A', 'B', 'C', 'D'];

import { handleExport, ExportType } from "@/lib/export-utils";
import { TableSkeleton } from "@/app/common/Skeleton";

export default function StudentAttendance() {
     const [openFilter, setOpenFilter] = useState<"export" | null>(null);
     const [classList, setClassList] = useState<any[]>([]);
     const [sectionList, setSectionList] = useState<any[]>([]);
     const [selectedCriteria, setSelectedCriteria] = useState({
          class: '',
          section: '',
          date: new Date().toISOString().split('T')[0]
     });
     const [studentList, setStudentList] = useState<any[]>([]);
     const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
     const [searchTerm, setSearchTerm] = useState("");
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          const fetchFilters = async () => {
               try {
                    setError(null);
                    const [cRes, sRes] = await Promise.all([
                         fetch("/api/classes"),
                         fetch("/api/sections")
                    ]);
                    
                    if (!cRes.ok || !sRes.ok) {
                         throw new Error("Failed to load filters.");
                    }

                    const classesJson = await cRes.json();
                    const sectionsJson = await sRes.json();
                    
                    // Handle { success: true, data: [...] } format
                    setClassList(classesJson.data || []);
                    setSectionList(sectionsJson.data || []);
               } catch (err: any) {
                    console.error("Filter error:", err);
                    setError(err.message || "Failed to load data.");
               }
          };
          fetchFilters();
     }, []);

     const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
          setSelectedCriteria({ ...selectedCriteria, [e.target.name]: e.target.value });
     };

      const handleSearch = async () => {
           setLoading(true);
           setError(null);
           try {
                const query = new URLSearchParams({
                    class: selectedCriteria.class,
                    section: selectedCriteria.section,
                });
                
                const attQuery = new URLSearchParams({
                    class: selectedCriteria.class,
                    section: selectedCriteria.section,
                    date: selectedCriteria.date
                });
                
                // Fetch students and attendance concurrently for better performance
                const [studentsRes, attendanceRes] = await Promise.all([
                    fetch(`/api/students?${query.toString()}`),
                    fetch(`/api/attendance?${attQuery.toString()}`)
                ]);

                if (!studentsRes.ok || !attendanceRes.ok) throw new Error("Synchronization failure with server.");
                
                const studentsJson = await studentsRes.json();
                const attendanceJson = await attendanceRes.json();

                const students = studentsJson.data?.students || [];
                const existingAttendance = attendanceJson.data || [];

                // Map existing attendance into a fast-lookup map
                const attendanceMap = new Map();
                existingAttendance.forEach((att: any) => {
                    attendanceMap.set(att.student.toString(), att.status);
                });
                
                // Merge attendance with student list (default to 'Present' if not found)
                const listWithAttendance = students.map((s: any) => ({
                    ...s,
                    attendance: attendanceMap.get(s._id.toString()) || 'Present'
                }));

                setStudentList(listWithAttendance);
                setFilteredStudents(listWithAttendance);
                
                if (students.length === 0) {
                    setError("No students found.");
                }
           } catch (err: any) {
                console.error("Attendance synchronization error:", err);
                setError(err.message);
           } finally {
                setLoading(false);
           }
      };

     useEffect(() => {
          const filtered = studentList.filter(s => 
               `${s.fname} ${s.lname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
               s.admission_no.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredStudents(filtered);
     }, [searchTerm, studentList]);

     const onExport = (type: ExportType) => {
          const exportData = filteredStudents.map((s, idx) => ({
               "No": idx + 1,
               "Admission ID": s.admission_no,
               "Student Name": `${s.fname} ${s.lname}`,
               "Roll No": s.roll_no || 'N/A',
               "Status": s.attendance
          }));
          handleExport(type, exportData, `Attendance_${selectedCriteria.class}_${selectedCriteria.section}_${selectedCriteria.date}`);
          setOpenFilter(null);
     };

     const toggleFilter = (type: "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const [saving, setSaving] = useState(false);

     const handleAttendanceChange = (id: string, status: string) => {
          setStudentList(prev => prev.map(s => s._id === id ? { ...s, attendance: status } : s));
     };

     const handleSaveAttendance = async () => {
          if (studentList.length === 0) return;
          setSaving(true);
          try {
               const payload = studentList.map(s => ({
                    student: s._id,
                    class: selectedCriteria.class,
                    section: selectedCriteria.section,
                    date: selectedCriteria.date,
                    status: s.attendance
               }));

               const res = await fetch("/api/attendance", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
               });

               const data = await res.json();
               if (data.success) {
                    alert("Attendance Saved Successfully!");
               } else {
                    throw new Error(data.error || "Sync failure");
               }
          } catch (err: any) {
               console.error("Save attendance error:", err);
               alert("CRITICAL ERROR: Failed to push logs to server.");
          } finally {
               setSaving(false);
          }
     };

     return (
          <div className="space-y-10 pb-20">
               {/* Hero Header */}
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="text-center md:text-left">
                         <h2 className="text-2xl md:text-3xl font-black text-bgray-900 dark:text-white tracking-tighter">Student Attendance</h2>
                         <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Manage student attendance</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
                         {studentList.length > 0 && (
                              <div className="relative">
                                   <button
                                        onClick={() => toggleFilter("export")}
                                        className="bg-white dark:bg-darkblack-600 px-6 py-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-3 text-sm font-black text-bgray-900 dark:text-white hover:scale-105 transition-all"
                                   >
                                        <span>Export</span>
                                        <FontAwesomeIcon icon={faFilter} className="text-[10px] opacity-50" />
                                   </button>

                                   {openFilter === "export" && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-darkblack-600 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2">
                                             {["Copy", "Excel", "CSV", "PDF", "Print"].map(type => (
                                                  <button
                                                       key={type}
                                                       onClick={() => onExport(type as ExportType)}
                                                       className="w-full text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-bgray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary transition-colors border-b border-gray-100 dark:border-white/5 last:border-0"
                                                  >
                                                       {type}
                                                  </button>
                                             ))}
                                        </div>
                                   )}
                              </div>
                         )}
                         <div className="bg-white dark:bg-darkblack-600 px-6 py-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                   <FontAwesomeIcon icon={faCalendarAlt} />
                              </div>

               {/* Synchronized Error Alert */}
               {error && (
                    <div className="relative z-50 animate-in slide-in-from-top-4 duration-500 mb-8">
                         <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 shadow-2xl shadow-red-500/10">
                              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white shrink-0">
                                   <FontAwesomeIcon icon={faExclamationTriangle} />
                              </div>
                              <div>
                                   <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Error</p>
                                   <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">{error}</p>
                              </div>
                              <button onClick={() => window.location.reload()} className="ml-auto bg-red-500 px-6 py-2 rounded-xl text-[10px] font-black text-black uppercase tracking-widest hover:scale-105 transition-all"> Retry </button>
                         </div>
                    </div>
               )}
                              <div className="text-right">
                                   <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Selected Date</p>
                                   <p className="text-sm font-black text-bgray-900 dark:text-white">{new Date(selectedCriteria.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                              </div>
                         </div>
                    </div>
               </div>

               <div className="card-modern">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                         <div className="space-y-3">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Class</label>
                              <div className="relative">
                                   <select 
                                        name="class" 
                                        value={selectedCriteria.class} 
                                        onChange={handleCriteriaChange}
                                        className="w-full bg-gray-50 dark:bg-darkblack-500 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                   >
                                        <option value="">Select Class</option>
                                        {classList.length > 0 ? classList.map((c, i) => (
                                             <option key={i} value={typeof c === 'string' ? c : (c.name || c._id)}>
                                                  {typeof c === 'string' ? c : (c.name || c._id)}
                                             </option>
                                        )) : (
                                             CLASSES.map((c, i) => <option key={i} value={c}>{c}</option>)
                                        )}
                                   </select>
                              </div>
                         </div>
                         <div className="space-y-3">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Section</label>
                              <div className="relative">
                                   <select 
                                        name="section" 
                                        value={selectedCriteria.section} 
                                        onChange={handleCriteriaChange}
                                        className="w-full bg-gray-50 dark:bg-darkblack-500 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                   >
                                        <option value="">Select Section</option>
                                        {sectionList.length > 0 ? sectionList.map((s, i) => (
                                             <option key={i} value={typeof s === 'string' ? s : (s.name || s._id)}>
                                                  {typeof s === 'string' ? s : (s.name || s._id)}
                                             </option>
                                        )) : (
                                             DEFAULT_SECTIONS.map((s, i) => <option key={i} value={s}>{s}</option>)
                                        )}
                                   </select>
                              </div>
                         </div>
                         <div className="space-y-3">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Date</label>
                              <input 
                                   type="date" 
                                   name="date" 
                                   value={selectedCriteria.date} 
                                   onChange={handleCriteriaChange}
                                   className="w-full bg-gray-50 dark:bg-darkblack-500 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                              />
                         </div>
                         <button 
                              onClick={handleSearch}
                              disabled={!selectedCriteria.class || !selectedCriteria.section}
                              className="bg-primary text-black p-4 h-[58px] rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary-hover active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:grayscale"
                         >
                              <FontAwesomeIcon icon={faSearchPlus} className="mr-3" />
                              Search
                         </button>
                    </div>
               </div>

               {/* Results Area */}
               {loading ? (
                    <div className="card-modern p-10 animate-in fade-in duration-500">
                         <TableSkeleton rows={8} />
                    </div>
               ) : studentList.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                              <div className="w-full md:max-w-md relative group">
                                   <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-primary transition-colors">
                                        <FontAwesomeIcon icon={faSearch} />
                                   </div>
                                   <input 
                                        type="text" 
                                        placeholder="Search items..."
                                        className="w-full bg-white dark:bg-darkblack-600 border border-gray-100 dark:border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                   />
                              </div>
                              <div className="flex items-center gap-3">
                                   <div className="flex -space-x-3">
                                        {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-darkblack-600 bg-gray-100 dark:bg-darkblack-500" />)}
                                        <div className="w-10 h-10 rounded-full border-4 border-white dark:border-darkblack-600 bg-primary/20 flex items-center justify-center text-primary text-[10px] font-black">+{studentList.length - 4}</div>
                                   </div>
                                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Stats</p>
                              </div>
                         </div>

                         <div className="card-modern overflow-hidden">
                              <div className="overflow-x-auto">
                                   <table className="w-full table-modern">
                                        <thead>
                                             <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-left">
                                                  <th className="py-6 px-8">No</th>
                                                  <th className="py-6 px-8">Admission ID</th>
                                                  <th className="py-6 px-8">Student Name</th>
                                                  <th className="py-6 px-8 text-center">Status</th>
                                                  <th className="py-6 px-8 text-right">Mark Attendance</th>
                                             </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                             {filteredStudents.map((student, idx) => (
                                                  <tr key={student._id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                                       <td className="py-5 px-8 font-bold text-gray-400">{idx + 1}</td>
                                                       <td className="py-5 px-8 font-black text-primary">#{student.admission_no}</td>
                                                       <td className="py-5 px-8">
                                                            <div className="flex items-center gap-4">
                                                                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-darkblack-500 dark:to-darkblack-600 flex items-center justify-center font-black text-xs text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5">
                                                                      {student.fname[0]}{student.lname?.[0]}
                                                                 </div>
                                                                 <div>
                                                                      <p className="font-black text-bgray-900 dark:text-white leading-none mb-1">{student.fname} {student.lname}</p>
                                                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Roll No: {student.roll_no || 'N/A'}</p>
                                                                 </div>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-8 text-center">
                                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                                                                 ${student.attendance === 'Present' ? 'bg-success-100 text-success-700 dark:bg-success-400/10 dark:text-success-400' : 
                                                                   student.attendance === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400' : 
                                                                   'bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-400'}
                                                            `}>
                                                                 <FontAwesomeIcon icon={student.attendance === 'Present' ? faUserCheck : student.attendance === 'Absent' ? faUserTimes : faUserClock} />
                                                                 {student.attendance}
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-8">
                                                            <div className="flex items-center justify-end gap-2">
                                                                 {['Present', 'Late', 'Absent', 'Half Day'].map((status) => (
                                                                      <button 
                                                                           key={status}
                                                                           onClick={() => handleAttendanceChange(student._id, status)}
                                                                           className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all
                                                                                ${student.attendance === status ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105' : 'bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10'}
                                                                           `}
                                                                      >
                                                                           {status}
                                                                      </button>
                                                                 ))}
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                              <div className="p-8 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-between">
                                   <div className="flex gap-8">
                                        <div className="flex items-center gap-2">
                                             <div className="w-2 h-2 rounded-full bg-success-500" />
                                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Present: {studentList.filter(s => s.attendance === 'Present').length}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <div className="w-2 h-2 rounded-full bg-red-500" />
                                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Absent: {studentList.filter(s => s.attendance === 'Absent').length}</span>
                                        </div>
                                   </div>
                                   <button 
                                        onClick={handleSaveAttendance}
                                        disabled={saving}
                                        className="bg-primary text-black px-10 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                                   >
                                        {saving ? "Saving..." : "Save Attendance"}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {studentList.length === 0 && !loading && (
                    <div className="card-modern py-24 flex flex-col items-center text-center">
                         <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-300 mb-6 border-4 border-dashed border-gray-200 dark:border-white/10">
                              <FontAwesomeIcon icon={faSearch} className="text-3xl" />
                         </div>
                         <h4 className="text-xl font-black text-bgray-900 dark:text-white">Select Class and Section</h4>
                         <p className="text-sm font-medium text-gray-500 mt-2 max-w-xs">Select a class and section to see students.</p>
                    </div>
               )}
          </div>
     );
}