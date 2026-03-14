"use client";
import React, { useState, useEffect } from "react";

interface IExam {
    _id: string;
    name: string;
}

interface IMarkEntry {
    theory?: number;
    practical?: number;
    assignment?: number;
    total?: number;
}

interface IMarks {
    _id: string;
    student: {
        _id: string;
        fname: string;
        lname: string;
        admission_no: string;
    };
    exam: string;
    marks: {
        [subject: string]: IMarkEntry;
    };
}

export default function Reports() {
     const [activeTab, setActiveTab] = useState<"subject" | "template">("subject");
     const [exams, setExams] = useState<IExam[]>([]);
     const [classes, setClasses] = useState<string[]>([]);
     const [sections, setSections] = useState<string[]>([]);
     
     const [selectedExam, setSelectedExam] = useState("");
     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSection, setSelectedSection] = useState("");
     const [searchTerm, setSearchTerm] = useState("");

     const [marksData, setMarksData] = useState<IMarks[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [isInitialLoading, setIsInitialLoading] = useState(true);

      useEffect(() => {
           fetchInitialData();
      }, []);

      useEffect(() => {
           fetchMarks();
      }, [selectedExam, selectedClass, selectedSection, searchTerm]);

      const fetchInitialData = async () => {
           setIsInitialLoading(true);
           try {
                const [examRes, classRes] = await Promise.all([
                     fetch("/api/cbse-exams"),
                     fetch("/api/classes")
                ]);
                if (examRes.ok) {
                     const data = await examRes.json();
                     setExams(data);
                     if (data.length > 0) setSelectedExam(data[0]._id);
                }
                if (classRes.ok) setClasses(await classRes.json());
           } catch (error) {
                console.error("Error fetching initial data:", error);
           } finally {
                setIsInitialLoading(false);
           }
      };

      useEffect(() => {
           const fetchSections = async () => {
                if (!selectedClass) {
                     setSections([]);
                     return;
                }
                try {
                     const res = await fetch(`/api/sections?class=${selectedClass}`);
                     if (res.ok) setSections(await res.json());
                } catch (err) { console.error(err); }
           };
           fetchSections();
           setSelectedSection(""); // Reset section when class changes
      }, [selectedClass]);

      const fetchMarks = async () => {
           if (!selectedExam) {
                setMarksData([]);
                return;
           }
           setIsLoading(true);
           try {
                const query = new URLSearchParams({ examId: selectedExam });
                if (selectedClass) query.append("class", selectedClass);
                if (selectedSection) query.append("section", selectedSection);
                if (searchTerm) query.append("search", searchTerm);

                const res = await fetch(`/api/cbse-marks?${query.toString()}`);
                if (res.ok) {
                     setMarksData(await res.json());
                }
           } catch (error) {
                console.error("Error fetching marks:", error);
           } finally {
                setIsLoading(false);
           }
      };

     // Dynamically get all subjects present in the marks data
     const subjects = Array.from(
          new Set(
               marksData.flatMap(m => Object.keys(m.marks || {}))
          )
     ).sort();

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 font-medium">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="flex space-x-2">
                                        <button
                                             type="button"
                                             onClick={() => setActiveTab("subject")}
                                             className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${activeTab === "subject"
                                                       ? "bg-success-100 text-success-300 dark:bg-success-300 dark:text-white"
                                                       : "bg-bgray-100 text-bgray-600 dark:bg-darkblack-500 dark:text-bgray-300 hover:bg-bgray-200 dark:hover:bg-darkblack-400"
                                                   }`}
                                        >
                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2Z" stroke="currentColor" strokeWidth="1.5" />
                                                  <path d="M1 6H15" stroke="currentColor" strokeWidth="1.5" />
                                             </svg>
                                             <span>Subject Marks Report</span>
                                        </button>
                                        <button
                                             type="button"
                                             onClick={() => setActiveTab("template")}
                                             className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${activeTab === "template"
                                                       ? "bg-success-100 text-success-300 dark:bg-success-300 dark:text-white"
                                                       : "bg-bgray-100 text-bgray-600 dark:bg-darkblack-500 dark:text-bgray-300 hover:bg-bgray-200 dark:hover:bg-darkblack-400"
                                                   }`}
                                        >
                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2Z" stroke="currentColor" strokeWidth="1.5" />
                                                  <path d="M1 6H15" stroke="currentColor" strokeWidth="1.5" />
                                             </svg>
                                             <span>Template Marks Report</span>
                                        </button>
                                   </div>

                                   {activeTab === "subject" && (
                                        <>
                                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                   <div>
                                                        <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Exam *</label>
                                                        <select
                                                             disabled={isInitialLoading}
                                                             value={selectedExam}
                                                             onChange={(e) => setSelectedExam(e.target.value)}
                                                             className="w-full h-11 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:ring-success-300"
                                                        >
                                                             <option value="">Select Exam</option>
                                                             {exams.map(exam => <option key={exam._id} value={exam._id}>{exam.name}</option>)}
                                                        </select>
                                                   </div>
                                                   <div>
                                                        <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Class</label>
                                                        <select
                                                             value={selectedClass}
                                                             onChange={(e) => setSelectedClass(e.target.value)}
                                                             className="w-full h-11 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:ring-success-300"
                                                        >
                                                             <option value="">All Classes</option>
                                                             {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                                        </select>
                                                   </div>
                                                   <div>
                                                        <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Section</label>
                                                        <select
                                                             value={selectedSection}
                                                             onChange={(e) => setSelectedSection(e.target.value)}
                                                             className="w-full h-11 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:ring-success-300"
                                                        >
                                                             <option value="">All Sections</option>
                                                             {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                                        </select>
                                                   </div>
                                                   <div className="relative">
                                                        <input
                                                             type="text"
                                                             placeholder="Search students..."
                                                             value={searchTerm}
                                                             onChange={(e) => setSearchTerm(e.target.value)}
                                                             className="w-full h-11 pl-10 pr-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm focus:ring-success-300"
                                                        />
                                                        <svg className="absolute left-3 top-3 text-bgray-500" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                   </div>
                                              </div>

                                              <div className="flex justify-between items-center mt-6 mb-2">
                                                   <p className="text-bgray-600 dark:text-bgray-400 text-sm">Showing marks for the selected filters.</p>
                                                   <div className="flex space-x-3">
                                                        <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors p-2 rounded-lg border dark:border-darkblack-400" title="Print">
                                                             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 7.5V5C5 4.44772 5.44772 4 6 4H14C14.5523 4 15 4.44772 15 5V7.5M5 12.5H3.5C2.67157 12.5 2 11.8284 2 11V8C2 7.17157 2.67157 6.5 3.5 6.5H16.5C17.3284 6.5 18 7.17157 18 8V11C18 11.8284 17.3284 12.5 16.5 12.5H15M5 10H15V16C15 16.5523 14.5523 17 14 17H6C5.44772 17 5 16.5523 5 16V10Z"/></svg>
                                                        </button>
                                                        <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors p-2 rounded-lg border dark:border-darkblack-400" title="Excel">
                                                             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3H6C4.89543 3 4 3.89543 4 5V15C4 16.1046 4.89543 17 6 17H14C15.1046 17 16 16.1046 16 15V7L12 3Z"/><path d="M12 3V7H16"/></svg>
                                                        </button>
                                                   </div>
                                              </div>

                                             <div className="table-content w-full overflow-x-auto">
                                                  <table className="w-full border-collapse border border-bgray-300 dark:border-darkblack-400">
                                                       <thead>
                                                            <tr className="bg-bgray-50 dark:bg-darkblack-500">
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-left text-xs font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider" rowSpan={2}>Student</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-left text-xs font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider" rowSpan={2}>Admission No</th>
                                                                 {subjects.map(subject => (
                                                                      <th key={subject} className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-xs font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider" colSpan={3}>{subject}</th>
                                                                 ))}
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-xs font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider" rowSpan={2}>Total</th>
                                                            </tr>
                                                            <tr className="bg-bgray-50 dark:bg-darkblack-500 text-[10px] text-bgray-500 dark:text-bgray-300">
                                                                 {subjects.map(subject => (
                                                                      <React.Fragment key={`${subject}-heads`}>
                                                                           <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-1 text-center font-medium">TH</th>
                                                                           <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-1 text-center font-medium">PR</th>
                                                                           <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-1 text-center font-medium">AS</th>
                                                                      </React.Fragment>
                                                                 ))}
                                                            </tr>
                                                       </thead>
                                                       <tbody>
                                                            {isLoading ? (
                                                                 <tr><td colSpan={3 + subjects.length * 3} className="py-20 text-center text-bgray-600 dark:text-bgray-300">Loading marks report...</td></tr>
                                                            ) : marksData.length === 0 ? (
                                                                 <tr><td colSpan={3 + subjects.length * 3} className="py-20 text-center text-bgray-500 italic">No marks found for the selected exam.</td></tr>
                                                            ) : (
                                                                 marksData.map((m) => {
                                                                      let grandTotal = 0;
                                                                      return (
                                                                           <tr key={m._id} className="border border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-700 transition-colors">
                                                                                <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-bgray-900 dark:text-white font-semibold">
                                                                                     {m.student.fname} {m.student.lname}
                                                                                </td>
                                                                                <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-bgray-700 dark:text-bgray-300">
                                                                                     {m.student.admission_no}
                                                                                </td>
                                                                                {subjects.map(subject => {
                                                                                     const subMarks = m.marks[subject] || {};
                                                                                     grandTotal += subMarks.total || 0;
                                                                                     return (
                                                                                          <React.Fragment key={`${m._id}-${subject}`}>
                                                                                               <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-2 text-center text-xs text-bgray-600 dark:text-bgray-400">{subMarks.theory ?? "-"}</td>
                                                                                               <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-2 text-center text-xs text-bgray-600 dark:text-bgray-400">{subMarks.practical ?? "-"}</td>
                                                                                               <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-2 text-center text-xs text-bgray-600 dark:text-bgray-400">{subMarks.assignment ?? "-"}</td>
                                                                                          </React.Fragment>
                                                                                     );
                                                                                })}
                                                                                <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-bold text-success-300">
                                                                                     {grandTotal}
                                                                                </td>
                                                                           </tr>
                                                                      );
                                                                 })
                                                            )}
                                                       </tbody>
                                                  </table>
                                             </div>
                                        </>
                                   )}

                                   {activeTab === "template" && (
                                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                             <div className="p-6 bg-bgray-100 dark:bg-darkblack-500 rounded-full">
                                                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-bgray-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                             </div>
                                             <div className="text-center">
                                                  <h4 className="text-xl font-bold text-bgray-900 dark:text-white">Template Marks Report</h4>
                                                  <p className="text-bgray-500 dark:text-bgray-400 max-w-sm mx-auto mt-2">This module is currently being optimized for template-specific visualizations. Please check back soon.</p>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}