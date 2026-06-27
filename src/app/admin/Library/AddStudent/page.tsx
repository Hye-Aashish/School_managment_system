"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function StudentMembersList() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | "export" | null>(null);

     const toggleFilter = (type: "class" | "section" | "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const [classList, setClassList] = useState<any[]>([]);
     const [selectedClass, setSelectedClass] = useState<string>("");
     const [selectedSection, setSelectedSection] = useState<string>("");
     const [allStudents, setAllStudents] = useState<any[]>([]);
     const [libraryMembers, setLibraryMembers] = useState<any[]>([]);
     const [loading, setLoading] = useState<boolean>(true);

     const fetchLibraryMembers = async () => {
          const res = await fetch("/api/library-members?memberType=Student");
          const d = await res.json();
          if (d.success) setLibraryMembers(d.data);
     };

     useEffect(() => {
          fetch("/api/classes").then(r => r.json()).then(d => { if(d.success) setClassList(d.data); });
          fetch("/api/students").then(r => r.json()).then(d => { 
               if(d.success && d.data?.students) setAllStudents(d.data.students);
          });
          fetchLibraryMembers().then(() => setLoading(false));
     }, []);

     const toggleMembership = async (student: any) => {
          const isMember = libraryMembers.find(m => m.memberId === student.admission_no);
          if (isMember) {
               // Return membership
               await fetch("/api/library-members", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: student.admission_no, action: "return" })
               });
          } else {
               // Add membership
               await fetch("/api/library-members", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: student.admission_no, memberType: "Student" })
               });
          }
          await fetchLibraryMembers();
     };

     const filteredStudents = allStudents.filter(s => {
          if (selectedClass && s.class !== selectedClass) return false;
          if (selectedSection && s.section !== selectedSection) return false;
          return true;
     });

     const onExport = (type: ExportType) => {
          const exportData = filteredStudents.map(s => {
               const member = libraryMembers.find(m => m.memberId === s.admission_no);
               return {
                    "Member ID": s.admission_no,
                    "Library Card": member ? member.libraryCardNo : "N/A",
                    "Admission No": s.admission_no,
                    "Name": `${s.fname} ${s.lname}`,
                    "Class": `${s.class} (${s.section})`,
                    "Father Name": s.father_name || "N/A",
                    "DOB": s.dob || "N/A",
                    "Gender": s.gender || "N/A",
                    "Mobile": s.mobile || "N/A"
               };
          });
          handleExport(type, exportData, "Library_Members");
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Filter Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                   {/* Class Dropdown */}
                                   <div className="relative w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white border border-bgray-300 dark:border-darkblack-400 px-4 flex justify-between items-center dark:bg-darkblack-500"
                                             onClick={() => toggleFilter("class")}
                                        >
                                             <span className="text-sm text-bgray-900 dark:text-white">{selectedClass || "Select Class"}</span>
                                             <span>
                                                  <svg
                                                       width="21"
                                                       height="21"
                                                       viewBox="0 0 21 21"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <path
                                                            d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186"
                                                            stroke="#A0AEC0"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </span>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-[70px] max-h-60 overflow-y-auto transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                                             <ul>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => { setSelectedClass(""); setSelectedSection(""); setOpenFilter(null); }}>All Classes</li>
                                                  {classList.map((c) => (
                                                       <li key={c._id} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => { setSelectedClass(c.name); setSelectedSection(""); setOpenFilter(null); }}>
                                                            {c.name}
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                                   {/* Section Dropdown */}
                                   <div className="relative w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                             Section
                                        </label>
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white border border-bgray-300 dark:border-darkblack-400 px-4 flex justify-between items-center dark:bg-darkblack-500"
                                             onClick={() => toggleFilter("section")}
                                        >
                                             <span className="text-sm text-bgray-900 dark:text-white">{selectedSection || "Select Section"}</span>
                                             <span>
                                                  <svg
                                                       width="21"
                                                       height="21"
                                                       viewBox="0 0 21 21"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <path
                                                            d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186"
                                                            stroke="#A0AEC0"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </span>
                                        </button>
                                        <div
                                             className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-[70px] max-h-60 overflow-y-auto transition-all ${openFilter === "section" ? "block" : "hidden"}`}
                                        >
                                             <ul>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => { setSelectedSection(""); setOpenFilter(null); }}>All Sections</li>
                                                  {selectedClass && classList.find(c => c.name === selectedClass)?.sections?.map((s: any) => (
                                                       <li key={s._id} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => { setSelectedSection(s.name); setOpenFilter(null); }}>
                                                            {s.name}
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Table Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Header */}
                                   <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Student Members List</h3>
                                   </div>

                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px] me-0">
                                             <div className="flex w-full h-full items-center space-x-[15px]">
                                                  <span>
                                                       <svg
                                                            className="stroke-bgray-900 dark:stroke-white"
                                                            width="21"
                                                            height="22"
                                                            viewBox="0 0 21 22"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <circle
                                                                 cx="9.80204"
                                                                 cy="10.6761"
                                                                 r="8.98856"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                            <path
                                                                 d="M16.0537 17.3945L19.5777 20.9094"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  </span>
                                                  <label className="w-full">
                                                       <input
                                                            type="text"
                                                            id="listSearch"
                                                            placeholder="Search..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        {/* Export Icons */}
                                        <div className="flex space-x-2">
                                             <button type="button" onClick={() => onExport("Copy")} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Copy">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect x="9" y="9" width="13" height="13" rx="2" stroke="#718096" strokeWidth="2" fill="none"/>
                                                       <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                             <button type="button" onClick={() => onExport("Excel")} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Excel">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#718096" strokeWidth="2"/>
                                                       <path d="M14 2V8H20" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                             <button type="button" onClick={() => onExport("CSV")} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="CSV">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#718096" strokeWidth="2"/>
                                                       <path d="M14 2V8H20" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                             <button type="button" onClick={() => onExport("PDF")} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="PDF">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#718096" strokeWidth="2"/>
                                                       <path d="M14 2V8H20" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                             <button type="button" onClick={() => onExport("Print")} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Print">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M6 9V2H18V9" stroke="#718096" strokeWidth="2"/>
                                                       <path d="M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="6" y="14" width="12" height="8" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Column Visibility">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect x="3" y="3" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="14" y="3" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="3" y="14" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="14" y="14" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Member ID</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Library Card No.</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Admission No</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Student Name</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Class</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Father Name</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Date Of Birth</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Gender</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Mobile Number</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loading ? (
                                                       <tr>
                                                            <td colSpan={10} className="py-24 text-center">
                                                                 <div className="w-8 h-8 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                            </td>
                                                       </tr>
                                                  ) : filteredStudents.length > 0 ? (
                                                       filteredStudents.map((student) => {
                                                            const member = libraryMembers.find(m => m.memberId === student.admission_no);
                                                            return (
                                                            <tr key={student._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex items-center space-x-5">
                                                                           <p className="font-semibold text-base text-bgray-900 dark:text-white">
                                                                                {student.admission_no}
                                                                           </p>
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {member ? member.libraryCardNo : "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.admission_no}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.fname} {student.lname}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.class} ({student.section})
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.father_name || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.dob || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.gender || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {student.mobile || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => toggleMembership(student)}
                                                                           className="w-8 h-8 flex items-center justify-center bg-bgray-50 dark:bg-darkblack-500 rounded-lg hover:opacity-70 transition"
                                                                      >
                                                                           {member ? (
                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M19 12H5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M12 19L5 12L12 5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           ) : (
                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <line x1="12" y1="5" x2="12" y2="19" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                                                                                     <line x1="5" y1="12" x2="19" y2="12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                                                                                </svg>
                                                                           )}
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       )})
                                                  ) : (
                                                       <tr>
                                                            <td colSpan={10} className="py-16 text-center text-bgray-400 text-sm font-semibold">
                                                                 No students found.
                                                            </td>
                                                       </tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Pagination */}
                                   <div className="pagination-content w-full">
                                        <div className="w-full flex lg:justify-between justify-center items-center">
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-white text-sm font-semibold">
                                                       Records: 1 to {filteredStudents.length} of {filteredStudents.length}
                                                  </span>
                                             </div>
                                             <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                                  <button type="button">
                                                       <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div className="flex items-center">
                                                       <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-white">
                                                            1
                                                       </button>
                                                  </div>
                                                  <button type="button">
                                                       <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}