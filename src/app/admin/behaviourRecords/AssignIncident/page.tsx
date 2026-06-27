"use client";
import React, { useState, useEffect, useRef } from "react";
import AssignIncidentModal from "./AssignIncidentModal";
import BehaviourHistoryModal from "./BehaviourHistoryModal";

interface StudentPoint {
     _id: string;
     fname: string;
     lname: string;
     admission_no: string;
     class: string;
     section: string;
     gender: string;
     phone: string;
     totalPoints: number;
}

export default function AssignIncidentList() {
     const [students, setStudents] = useState<StudentPoint[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
     const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
     const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string } | null>(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [selectedClass, setSelectedClass] = useState("All");
     const [selectedSection, setSelectedSection] = useState("All");
     const [classes, setClasses] = useState<any[]>([]);
     const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
     const menuRef = useRef<HTMLDivElement>(null);

     const fetchData = async () => {
          setIsLoading(true);
          try {
               const [resStudents, resClasses] = await Promise.all([
                    fetch("/api/assign-incidents/student-points"),
                    fetch("/api/classes")
               ]);
               const jsonStudents = await resStudents.json();
               const jsonClasses = await resClasses.json();
               if (jsonStudents.success) {
                    setStudents(jsonStudents.data || []);
               }
               if (jsonClasses.success) {
                    setClasses(jsonClasses.data || []);
               }
          } catch (error) {
               console.error("Error fetching data:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
          const handleClickOutside = (event: MouseEvent) => {
               if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    setOpenActionMenuId(null);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);



     const filteredData = students.filter(student => {
          const matchesSearch = 
               `${student.fname} ${student.lname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
               student.admission_no.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesClass = selectedClass === "All" || student.class === selectedClass;
          const matchesSection = selectedSection === "All" || student.section === selectedSection;
          return matchesSearch && matchesClass && matchesSection;
     });

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-bgray-900 dark:text-white">Assign Incident List</h2>
                                   </div>

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
                                        <div className="flex flex-col w-full">
                                             <select
                                                  value={selectedClass}
                                                  onChange={(e) => { setSelectedClass(e.target.value); setSelectedSection("All"); }}
                                                  className="w-full h-14 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px] text-sm text-bgray-900 dark:text-white focus:outline-none"
                                             >
                                                  <option value="All">All Classes</option>
                                                  {classes.map((cls) => (
                                                       <option key={cls._id || cls.name} value={cls.name}>{cls.name}</option>
                                                  ))}
                                             </select>
                                        </div>
                                        <div className="flex flex-col w-full">
                                             <select
                                                  value={selectedSection}
                                                  onChange={(e) => setSelectedSection(e.target.value)}
                                                  className="w-full h-14 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px] text-sm text-bgray-900 dark:text-white focus:outline-none"
                                             >
                                                  <option value="All">All Sections</option>
                                                  {selectedClass !== "All" && classes.find(c => c.name === selectedClass)?.sections?.map((sec: any) => (
                                                       <option key={sec._id || sec} value={sec.name || sec}>{sec.name || sec}</option>
                                                  ))}
                                             </select>
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-white font-medium whitespace-nowrap">Student Name</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-white font-medium">Admission No</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-white font-medium">Class</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-white font-medium">Gender</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-white font-medium">Phone</td>
                                                       <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-white font-medium">Total Points</td>
                                                       <td className="py-5 px-6 xl:px-0 text-right pr-6 text-bgray-600 dark:text-white font-medium">Action</td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {isLoading ? (
                                                       <tr><td colSpan={7} className="text-center py-10">Loading...</td></tr>
                                                  ) : filteredData.length === 0 ? (
                                                       <tr><td colSpan={7} className="text-center py-10">No students found</td></tr>
                                                  ) : filteredData.map((item) => (
                                                       <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0 font-medium text-base text-bgray-900 dark:text-white">{item.fname} {item.lname}</td>
                                                            <td className="py-5 px-6 xl:px-0 font-medium text-base text-bgray-900 dark:text-white">{item.admission_no}</td>
                                                            <td className="py-5 px-6 xl:px-0 font-medium text-base text-bgray-900 dark:text-white">{item.class}({item.section})</td>
                                                            <td className="py-5 px-6 xl:px-0 font-medium text-base text-bgray-900 dark:text-white">{item.gender}</td>
                                                            <td className="py-5 px-6 xl:px-0 font-medium text-base text-bgray-900 dark:text-white">{item.phone}</td>
                                                            <td className="py-5 px-6 xl:px-0 font-medium text-base text-bgray-900 dark:text-white text-center">{item.totalPoints}</td>
                                                            <td className="py-5 px-6 xl:px-0 pr-6 text-right relative">
                                                                 <button 
                                                                   onClick={() => setOpenActionMenuId(openActionMenuId === item._id ? null : item._id)}
                                                                   className="text-bgray-600 dark:text-bgray-400 hover:text-success-300"
                                                                 >
                                                                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                                                 </button>
                                                                 
                                                                 {openActionMenuId === item._id && (
                                                                      <div ref={menuRef} className="absolute right-6 top-12 z-20 w-40 bg-white dark:bg-darkblack-500 rounded-lg shadow-lg border border-bgray-100 dark:border-darkblack-400 py-2">
                                                                           <button 
                                                                                onClick={() => { setSelectedStudent({ id: item._id, name: `${item.fname} ${item.lname}` }); setIsAssignModalOpen(true); setOpenActionMenuId(null); }}
                                                                                className="w-full text-left px-4 py-2 text-sm text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400"
                                                                           >
                                                                                Assign Incident
                                                                           </button>
                                                                           <button 
                                                                                onClick={() => { setSelectedStudent({ id: item._id, name: `${item.fname} ${item.lname}` }); setIsHistoryModalOpen(true); setOpenActionMenuId(null); }}
                                                                                className="w-full text-left px-4 py-2 text-sm text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400"
                                                                           >
                                                                                View History
                                                                           </button>
                                                                      </div>
                                                                 )}
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
               
               {selectedStudent && isAssignModalOpen && (
                    <AssignIncidentModal 
                        isOpen={isAssignModalOpen} 
                        onClose={() => setIsAssignModalOpen(false)} 
                        onRefresh={fetchData} 
                        studentId={selectedStudent.id} 
                        studentName={selectedStudent.name} 
                    />
               )}
               
               {selectedStudent && isHistoryModalOpen && (
                    <BehaviourHistoryModal 
                        isOpen={isHistoryModalOpen} 
                        onClose={() => setIsHistoryModalOpen(false)} 
                        onRefresh={fetchData}
                        studentId={selectedStudent.id} 
                        studentName={selectedStudent.name} 
                    />
               )}
          </>
     );
}