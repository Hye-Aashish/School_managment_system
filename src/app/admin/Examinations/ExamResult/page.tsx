"use client";
import React, { useState, useEffect } from "react";

export default function ExamResult() {
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [examGroups, setExamGroups] = useState<any[]>([]);
     const [exams, setExams] = useState<any[]>([]);
     const [classes, setClasses] = useState<any[]>([]);
     const [sections, setSections] = useState<any[]>([]);
     
     const [selectedGroup, setSelectedGroup] = useState<any>(null);
     const [selectedExam, setSelectedExam] = useState<any>(null);
     const [selectedClass, setSelectedClass] = useState<any>(null);
     const [selectedSection, setSelectedSection] = useState<any>(null);
     const [selectedSession, setSelectedSession] = useState("2025-26");

     const [subjects, setSubjects] = useState<any[]>([]);
     const [results, setResults] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          fetchExamGroups();
          fetchClasses();
     }, []);

     const fetchExamGroups = async () => {
          const res = await fetch("/api/exam-groups");
          const data = await res.json();
          if (data.success) setExamGroups(data.data);
     };

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClasses(data.data);
     };

     const fetchSections = async (className: string) => {
          const res = await fetch(`/api/sections?class=${className}`);
          const data = await res.json();
          if (data.success) setSections(data.data);
     };

     const fetchExams = async (groupId: string) => {
          const res = await fetch(`/api/exams?groupId=${groupId}`);
          const data = await res.json();
          if (data.success) setExams(data.data);
     };

     const handleSearch = async () => {
          if (!selectedExam || !selectedClass || !selectedSection) {
               alert("Please select Exam, Class and Section");
               return;
          }
          setLoading(true);
          try {
               const res = await fetch(`/api/exam-results?examId=${selectedExam._id}&class=${selectedClass.className}&section=${selectedSection.sectionName}`);
               const data = await res.json();
               if (data.success) {
                    setResults(data.data.results);
                    setSubjects(data.data.subjects);
               }
          } catch (error) {
               console.error("Error fetching results:", error);
          } finally {
               setLoading(false);
          }
     };

     const toggleFilter = (type: string) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Filter Section */}
                                   <div className="w-full">
                                        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                             {/* Exam Group */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                       onClick={() => toggleFilter("examGroup")}
                                                  >
                                                       <div className="flex flex-col items-start overflow-hidden">
                                                            <span className="text-xs text-bgray-500">Exam Group *</span>
                                                            <span className="text-sm text-bgray-900 dark:text-white truncate w-full text-left">
                                                                 {selectedGroup ? selectedGroup.name : "Select"}
                                                            </span>
                                                       </div>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="shrink-0"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                  </button>
                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 left-0 transition-all ${openFilter === "examGroup" ? "block" : "hidden"}`}>
                                                       <ul className="max-h-60 overflow-y-auto">
                                                            {examGroups.map(g => (
                                                                 <li key={g._id} onClick={() => { setSelectedGroup(g); fetchExams(g._id); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">{g.name}</li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>

                                             {/* Exam */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       disabled={!selectedGroup}
                                                       className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 disabled:opacity-50"
                                                       onClick={() => toggleFilter("exam")}
                                                  >
                                                       <div className="flex flex-col items-start overflow-hidden">
                                                            <span className="text-xs text-bgray-500">Exam *</span>
                                                            <span className="text-sm text-bgray-900 dark:text-white truncate w-full text-left">
                                                                 {selectedExam ? selectedExam.name : "Select"}
                                                            </span>
                                                       </div>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="shrink-0"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                  </button>
                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 left-0 transition-all ${openFilter === "exam" ? "block" : "hidden"}`}>
                                                       <ul className="max-h-60 overflow-y-auto">
                                                            {exams.map(e => (
                                                                 <li key={e._id} onClick={() => { setSelectedExam(e); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">{e.name}</li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>

                                             {/* Session */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                       onClick={() => toggleFilter("session")}
                                                  >
                                                       <div className="flex flex-col items-start">
                                                            <span className="text-xs text-bgray-500">Session *</span>
                                                            <span className="text-sm text-bgray-900 dark:text-white">{selectedSession}</span>
                                                       </div>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="shrink-0"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                  </button>
                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 left-0 transition-all ${openFilter === "session" ? "block" : "hidden"}`}>
                                                       <ul>
                                                            {["2024-25", "2025-26", "2026-27"].map(s => (
                                                                 <li key={s} onClick={() => { setSelectedSession(s); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">{s}</li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>

                                             {/* Class */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                       onClick={() => toggleFilter("class")}
                                                  >
                                                       <div className="flex flex-col items-start overflow-hidden">
                                                            <span className="text-xs text-bgray-500">Class *</span>
                                                            <span className="text-sm text-bgray-900 dark:text-white truncate w-full text-left">
                                                                 {selectedClass ? selectedClass.className : "Select"}
                                                            </span>
                                                       </div>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="shrink-0"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                  </button>
                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 left-0 transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                                                       <ul className="max-h-60 overflow-y-auto">
                                                            {classes.map(c => (
                                                                 <li key={c._id} onClick={() => { setSelectedClass(c); fetchSections(c.className); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">{c.className}</li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>

                                             {/* Section */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       disabled={!selectedClass}
                                                       className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 disabled:opacity-50"
                                                       onClick={() => toggleFilter("section")}
                                                  >
                                                       <div className="flex flex-col items-start overflow-hidden">
                                                            <span className="text-xs text-bgray-500">Section *</span>
                                                            <span className="text-sm text-bgray-900 dark:text-white truncate w-full text-left">
                                                                 {selectedSection ? selectedSection.sectionName : "Select"}
                                                            </span>
                                                       </div>
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="shrink-0"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                  </button>
                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 left-0 transition-all ${openFilter === "section" ? "block" : "hidden"}`}>
                                                       <ul className="max-h-60 overflow-y-auto">
                                                            {sections.map(s => (
                                                                 <li key={s._id} onClick={() => { setSelectedSection(s); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">{s.sectionName}</li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>

                                             <button
                                                  type="button"
                                                  onClick={handleSearch}
                                                  className="h-14 rounded-lg bg-bgray-900 hover:bg-bgray-800 dark:bg-bgray-700 dark:hover:bg-bgray-800 transition-colors flex items-center justify-center"
                                             >
                                                  <svg width="20" height="20" viewBox="0 0 21 22" fill="none" className="stroke-white mr-2"><circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                  <span className="text-white font-semibold text-sm">Search</span>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Exam Result Table Section */}
                                   <div className="w-full">
                                        <div className="flex justify-between items-center mb-4">
                                             <h3 className="text-xl font-semibold text-bgray-900 dark:text-white">Exam Result</h3>
                                        </div>

                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                             <table className="w-full border-collapse">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Admission No</span></td>
                                                            <td className="py-5 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Roll No</span></td>
                                                            <td className="py-5 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Student Name</span></td>
                                                            {subjects.map(s => (
                                                                 <td key={s.subject} className="py-5 px-4">
                                                                      <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           {s.subject}<br/><span className="text-[10px]">({s.minMarks}/{s.maxMarks})</span>
                                                                      </span>
                                                                 </td>
                                                            ))}
                                                            <td className="py-5 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total</span></td>
                                                            <td className="py-5 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Percent (%)</span></td>
                                                            <td className="py-5 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Result</span></td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr><td colSpan={10} className="py-20 text-center text-bgray-600 dark:text-bgray-300">Loading...</td></tr>
                                                       ) : results.length === 0 ? (
                                                            <tr><td colSpan={10} className="py-20 text-center text-bgray-600 dark:text-bgray-300">No data available in table</td></tr>
                                                       ) : results.map((res, i) => (
                                                            <tr key={res.student._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                                 <td className="py-4 px-4 text-sm text-bgray-900 dark:text-white">{res.student.admission_no}</td>
                                                                 <td className="py-4 px-4 text-sm text-bgray-900 dark:text-white">{res.student.roll_no}</td>
                                                                 <td className="py-4 px-4 text-sm text-bgray-900 dark:text-white font-medium">{res.student.fname} {res.student.lname}</td>
                                                                 {subjects.map(s => (
                                                                      <td key={s.subject} className="py-4 px-4 text-sm text-bgray-900 dark:text-white">
                                                                           {res.marks[s.subject] !== undefined ? res.marks[s.subject] : "-"}
                                                                      </td>
                                                                 ))}
                                                                 <td className="py-4 px-4 text-sm text-bgray-900 dark:text-white font-bold">{res.grandTotal}</td>
                                                                 <td className="py-4 px-4 text-sm text-bgray-900 dark:text-white">{res.percent}%</td>
                                                                 <td className="py-4 px-4">
                                                                      <span className={`px-2 py-1 rounded text-xs font-bold ${res.result === "Pass" ? "bg-success-100 text-success-600" : "bg-error-100 text-error-600"}`}>
                                                                           {res.result}
                                                                      </span>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}