"use client";
import React, { useState, useEffect } from "react";
import ViewReportModal from "./ViewReportModal";

interface ReportEntry {
     _id: string;
     student: {
          _id: string;
          fname: string;
          lname: string;
          admission_no: string;
          class: string;
          section: string;
     };
     incident: {
          title: string;
          point: number;
     };
     date: string;
     assignedBy: string;
     description: string;
}

export default function BehaviourReports() {
     const [reports, setReports] = useState<ReportEntry[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [selectedClass, setSelectedClass] = useState("All");
     const [selectedSection, setSelectedSection] = useState("All");
     const [dateFrom, setDateFrom] = useState("");
     const [dateTo, setDateTo] = useState("");
     
     // Modal state
     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
     const [selectedStudent, setSelectedStudent] = useState<{id: string, name: string} | null>(null);

     const fetchReports = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/assign-incidents");
               const json = await res.json();
               if (json.success) {
                    setReports(json.data);
               }
          } catch (error) {
               console.error("Error fetching reports:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchReports();
     }, []);

     const classList = ["All", ...Array.from(new Set(reports.map(item => item.student?.class).filter(Boolean).sort()))];
     const sectionList = ["All", ...Array.from(new Set(reports.map(item => item.student?.section).filter(Boolean).sort()))];

     const filteredData = reports.filter(item => {
          const matchesSearch = 
               `${item.student?.fname} ${item.student?.lname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.student?.admission_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.incident?.title.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesClass = selectedClass === "All" || item.student?.class === selectedClass;
          const matchesSection = selectedSection === "All" || item.student?.section === selectedSection;
          
          let matchesDate = true;
          if (dateFrom || dateTo) {
               const itemDate = new Date(item.date);
               if (dateFrom) {
                    const from = new Date(dateFrom);
                    from.setHours(0, 0, 0, 0);
                    if (itemDate < from) matchesDate = false;
               }
               if (dateTo) {
                    const to = new Date(dateTo);
                    to.setHours(23, 59, 59, 999);
                    if (itemDate > to) matchesDate = false;
               }
          }

          return matchesSearch && matchesClass && matchesSection && matchesDate;
     });

     const handleView = (item: ReportEntry) => {
          setSelectedStudent({
               id: item.student?._id || "",
               name: `${item.student?.fname} ${item.student?.lname}`
          });
          setIsViewModalOpen(true);
     };

     return (
          <div className="p-6">
               <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                    <div className="flex flex-col space-y-5">
                         <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold text-bgray-900 dark:text-white">Behaviour Reports</h2>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                              <div className="flex flex-col">
                                   <label className="text-xs font-bold text-bgray-500 mb-1">Search</label>
                                   <input
                                        type="text"
                                        placeholder="Student or Incident..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-10 bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-3 text-sm focus:outline-none dark:text-white"
                                   />
                              </div>
                              <div className="flex flex-col">
                                   <label className="text-xs font-bold text-bgray-500 mb-1">Class</label>
                                   <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="h-10 bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-3 text-sm focus:outline-none dark:text-white"
                                   >
                                        {classList.map(c => <option key={c} value={c}>{c}</option>)}
                                   </select>
                              </div>
                              <div className="flex flex-col">
                                   <label className="text-xs font-bold text-bgray-500 mb-1">Section</label>
                                   <select
                                        value={selectedSection}
                                        onChange={(e) => setSelectedSection(e.target.value)}
                                        className="h-10 bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-3 text-sm focus:outline-none dark:text-white"
                                   >
                                        {sectionList.map(s => <option key={s} value={s}>{s}</option>)}
                                   </select>
                              </div>
                              <div className="flex flex-col">
                                   <label className="text-xs font-bold text-bgray-500 mb-1">From Date</label>
                                   <input
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="h-10 bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-3 text-sm focus:outline-none dark:text-white"
                                   />
                              </div>
                              <div className="flex flex-col">
                                   <label className="text-xs font-bold text-bgray-500 mb-1">To Date</label>
                                   <input
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="h-10 bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-3 text-sm focus:outline-none dark:text-white"
                                   />
                              </div>
                         </div>

                         <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                              <table className="w-full">
                                   <thead>
                                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Student</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Admission No</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Class</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Incident</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Points</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Date</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium">Assigned By</td>
                                             <td className="py-5 px-4 text-bgray-600 dark:text-bgray-50 font-medium text-right">Action</td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {isLoading ? (
                                             <tr><td colSpan={8} className="text-center py-10 text-bgray-500">Loading...</td></tr>
                                        ) : filteredData.length === 0 ? (
                                             <tr><td colSpan={8} className="text-center py-10 text-bgray-500">No reports found</td></tr>
                                        ) : filteredData.map((item) => (
                                             <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="py-5 px-4 font-medium text-bgray-900 dark:text-bgray-50">
                                                       {item.student?.fname} {item.student?.lname}
                                                  </td>
                                                  <td className="py-5 px-4 text-bgray-900 dark:text-bgray-50">{item.student?.admission_no}</td>
                                                  <td className="py-5 px-4 text-bgray-900 dark:text-bgray-50">
                                                       {item.student?.class} ({item.student?.section})
                                                  </td>
                                                  <td className="py-5 px-4 text-bgray-900 dark:text-bgray-50">{item.incident?.title}</td>
                                                  <td className={`py-5 px-4 font-bold ${item.incident?.point < 0 ? 'text-error-300' : 'text-success-300'}`}>
                                                       {item.incident?.point > 0 ? `+${item.incident?.point}` : item.incident?.point}
                                                  </td>
                                                  <td className="py-5 px-4 text-bgray-900 dark:text-bgray-50">
                                                       {new Date(item.date).toLocaleDateString()}
                                                  </td>
                                                  <td className="py-5 px-4 text-bgray-900 dark:text-bgray-50">{item.assignedBy}</td>
                                                  <td className="py-5 px-4 text-right">
                                                       <button 
                                                            onClick={() => handleView(item)}
                                                            className="p-2 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                                                            title="View Detailed Logs"
                                                       >
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                 <circle cx="12" cy="12" r="3"></circle>
                                                            </svg>
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
               
               {selectedStudent && (
                    <ViewReportModal 
                         isOpen={isViewModalOpen}
                         onClose={() => setIsViewModalOpen(false)}
                         studentId={selectedStudent.id}
                         studentName={selectedStudent.name}
                    />
               )}
          </div>
     );
}
