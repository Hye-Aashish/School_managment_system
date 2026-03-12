"use client";
import React, { useState, useEffect } from "react";

export default function FeesForward() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | null>(null);
     const [classes, setClasses] = useState<string[]>([]);
     const [sections, setSections] = useState<string[]>([]);
     const [selectedClass, setSelectedClass] = useState<string>("");
     const [selectedSection, setSelectedSection] = useState<string>("");
     const [students, setStudents] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [success, setSuccess] = useState<string | null>(null);

     const toggleFilter = (type: "class" | "section") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Fetch classes on mount
     useEffect(() => {
          const fetchClasses = async () => {
               try {
                    const res = await fetch("/api/classes");
                    if (res.ok) setClasses(await res.json());
               } catch (err) {
                    console.error("Failed to fetch classes");
               }
          };
          fetchClasses();
     }, []);

     // Fetch sections when class changes
     useEffect(() => {
          if (!selectedClass) {
               setSections([]);
               return;
          }
          const fetchSections = async () => {
               try {
                    const res = await fetch(`/api/sections?class=${selectedClass}`);
                    if (res.ok) setSections(await res.json());
               } catch (err) {
                    console.error("Failed to fetch sections");
               }
          };
          fetchSections();
     }, [selectedClass]);

     // Fetch students based on filters
     const fetchStudents = async () => {
          if (!selectedClass || !selectedSection) return;
          setLoading(true);
          setError(null);
          try {
               const res = await fetch(`/api/students?class=${selectedClass}&section=${selectedSection}&limit=1000`);
               if (res.ok) {
                    const data = await res.json();
                    setStudents(data.data || []);
               } else {
                    setError("Failed to fetch students");
               }
          } catch (err) {
               setError("An error occurred while fetching students");
          } finally {
               setLoading(false);
          }
     };

     // Effect to trigger student fetch when both class and section are selected
     useEffect(() => {
          fetchStudents();
     }, [selectedClass, selectedSection]);

     const handleBalanceChange = (id: string, value: string) => {
          const balance = parseFloat(value) || 0;
          setStudents(prev => prev.map(s => s._id === id ? { ...s, previous_balance: balance } : s));
     };

     const handleSave = async () => {
          setSaving(true);
          setSuccess(null);
          setError(null);
          try {
               const updateData = students.map(s => ({ id: s._id, balance: s.previous_balance }));
               const res = await fetch("/api/students", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateData),
               });

               if (res.ok) {
                    setSuccess("Balances updated successfully!");
                    setTimeout(() => setSuccess(null), 3000);
               } else {
                    setError("Failed to update balances");
               }
          } catch (err) {
               setError("An error occurred while saving");
          } finally {
               setSaving(false);
          }
     };

     return (
          <>
               <div className="w-full">
                    <section className="w-full">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              {/* Select Criteria */}
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Select Criteria
                              </h3>

                              <div className="flex items-end gap-4 mb-8">
                                   {/* Class */}
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white">
                                                       {selectedClass || "Select Class"}
                                                  </span>
                                                  <span>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                             </button>
                                             <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">
                                                       {classes.map((cls) => (
                                                            <li 
                                                                 key={cls} 
                                                                 onClick={() => { setSelectedClass(cls); setSelectedSection(""); setOpenFilter(null); }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {cls}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Section */}
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  disabled={!selectedClass}
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 disabled:opacity-50"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white">
                                                       {selectedSection || "Select Section"}
                                                  </span>
                                                  <span>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                             </button>
                                             <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "section" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">
                                                       {sections.map((sec) => (
                                                            <li 
                                                                 key={sec} 
                                                                 onClick={() => { setSelectedSection(sec); setOpenFilter(null); }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {sec}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Previous Session Balance Fees */}
                              <div className="mb-6">
                                   <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Previous Session Balance Fees
                                        </h3>
                                        <div className="text-sm">
                                             <span className="text-bgray-600 dark:text-bgray-300">Class: </span>
                                             <span className="text-success-300 font-semibold">{selectedClass || "N/A"}</span>
                                             <span className="text-bgray-600 dark:text-bgray-300 ml-4">Section: </span>
                                             <span className="text-success-300 font-semibold">{selectedSection || "N/A"}</span>
                                        </div>
                                   </div>

                                   {success && (
                                        <div className="mb-6 p-4 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] rounded-lg">
                                             {success}
                                        </div>
                                   )}
                                   {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                                             {error}
                                        </div>
                                   )}

                                   {/* Info Alert */}
                                   <div className="w-full mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                             Previous Balance Already Forwarded, You Can Only Update Now.
                                        </p>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Student Name</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Admission No</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Admission Date</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Roll Number</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Father Name</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Balance ($)</td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loading ? (
                                                       <tr><td colSpan={6} className="py-10 text-center">Loading students...</td></tr>
                                                  ) : students.length > 0 ? (
                                                       students.map((student) => (
                                                            <tr key={student._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm font-medium text-bgray-900 dark:text-white">{student.fname} {student.lname}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.admission_no}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.admission_date || "N/A"}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.roll_no || "N/A"}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.father_name || student.fatherName || "N/A"}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <input
                                                                           type="number"
                                                                           value={student.previous_balance || 0}
                                                                           onChange={(e) => handleBalanceChange(student._id, e.target.value)}
                                                                           className="w-full h-11 rounded-md bg-white dark:bg-darkblack-500 px-4 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                                                                      />
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (
                                                       <tr><td colSpan={6} className="py-10 text-center text-bgray-600 dark:text-bgray-50">No students found. Please select criteria.</td></tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Save Button */}
                                   <div className="flex justify-end mt-8">
                                        <button
                                             type="button"
                                             onClick={handleSave}
                                             disabled={saving || students.length === 0}
                                             className="px-8 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold rounded-lg transition-all shadow-sm active:transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                        >
                                             {saving && (
                                                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                  </svg>
                                             )}
                                             {saving ? "Updating..." : "Forward Balances"}
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}