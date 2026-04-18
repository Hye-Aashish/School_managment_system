"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function DisableStudentsList() {
     const [students, setStudents] = useState<any[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [openFilter, setOpenFilter] = useState<string | null>(null);

     const [currentPage, setCurrentPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [totalPages, setTotalPages] = useState(0);
     const [totalEntries, setTotalEntries] = useState(0);

     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSection, setSelectedSection] = useState("");
     const [searchQuery, setSearchQuery] = useState("");

     useEffect(() => {
          fetchStudents();
     }, [currentPage, limit, selectedClass, selectedSection, searchQuery]);

     const fetchStudents = async () => {
          setIsLoading(true);
          try {
               let url = `/api/students?status=Disabled&page=${currentPage}&limit=${limit}`;
               if (selectedClass) url += `&class=${selectedClass}`;
               if (selectedSection) url += `&section=${selectedSection}`;
               if (searchQuery) url += `&search=${searchQuery}`;

               const res = await fetch(url);
               const result = await res.json();
               setStudents(result.data.students || []);
               setTotalPages(result.data.totalPages || 0);
               setTotalEntries(result.data.totalEntries || 0);
          } catch (error) {
               console.error("Error fetching students:", error);
               setStudents([]);
               setTotalPages(0);
               setTotalEntries(0);
          } finally {
               setIsLoading(false);
          }
     };

     const handleFilterChange = (type: string, value: string) => {
          if (type === "class") setSelectedClass(value);
          if (type === "section") setSelectedSection(value);
          setCurrentPage(1);
          setOpenFilter(null);
     };

     const onExport = (type: ExportType) => {
          const exportData = students.map((s, idx) => ({
               "No": idx + 1,
               "Admission No": s.admission_no,
               "Student Name": `${s.fname} ${s.lname}`,
               "Class": `${s.class} (${s.section})`,
               "Father Name": s.father_name,
               "Disable Reason": s.disable_reason || "N/A",
               "Gender": s.gender,
               "Mobile": s.mobile
          }));
          handleExport(type, exportData, "Disabled_Students_List");
          setOpenFilter(null);
     };

     const handleDelete = async (admissionNo: string) => {
          if (confirm("Are you sure you want to delete this student?")) {
               try {
                    await fetch(`/api/students/${admissionNo}`, { method: "DELETE" });
                    fetchStudents();
               } catch (error) {
                    console.error("Error deleting student:", error);
               }
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
                                   <div className="w-full flex h-14 space-x-4">
                                        <div
                                             className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                        >
                                             <div
                                                  className="flex w-full h-full items-center space-x-[15px]"
                                             >
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
                                                            id="listSearch" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                                            placeholder="Search Students..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">{selectedClass || "Select Class"}</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "class" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul><li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => handleFilterChange("class", "")}>All Classes</li>{["1St", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"].map((cls) => (<li key={cls} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => handleFilterChange("class", cls)}>{cls}</li>))}</ul>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">{selectedSection || "Select Section"}</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "section" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul><li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => handleFilterChange("section", "")}>All Sections</li>{["A", "B", "C", "D"].map((sec) => (<li key={sec} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => handleFilterChange("section", sec)}>{sec}</li>))}</ul>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("export")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Export</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       {["Copy", "Excel", "CSV", "PDF", "Print"].map(type => (
                                                            <li key={type} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => onExport(type as ExportType)}>{type}</li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="">
                                                            <label className="text-center">
                                                                 <input
                                                                      type="checkbox"
                                                                      className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                 />
                                                            </label>
                                                       </td>
                                                       <td
                                                            className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block"
                                                       >
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span
                                                                      className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Admission No</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Student Name</span
                                                                 >
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span
                                                                      className="text-base font-medium text-bgray-600 dark:text-gray-50"
                                                                 >
                                                                      Class</span
                                                                 >
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Father Name</span
                                                                 >
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Disable Reason</span
                                                                 >
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Gender</span
                                                                 >
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Mobile Number</span
                                                                 >
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0"></td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {isLoading ? (
                                                       <tr>
                                                            <td colSpan={9} className="text-center py-10 text-bgray-600">Loading...</td>
                                                       </tr>
                                                  ) : students.length === 0 ? (
                                                       <tr>
                                                            <td colSpan={9} className="text-center py-10 text-bgray-600">No disabled students found</td>
                                                       </tr>
                                                  ) : students.map((student) => (
                                                       <tr key={student._id || student.admission_no} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="">
                                                                 <label className="text-center">
                                                                      <input
                                                                           type="checkbox"
                                                                           className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                      />
                                                                 </label>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.admission_no}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.fname} {student.lname}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.class} ({student.section})
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.father_name}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.disable_reason || "N/A"}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.gender}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.mobile}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center relative">
                                                                 <div className="relative">
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => toggleFilter(`action-${student.admission_no}`)}
                                                                           className="p-2 hover:bg-gray-100 dark:hover:bg-darkblack-500 rounded-full transition-colors"
                                                                      >
                                                                           <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8 2C8 2.55228 8.44772 3 9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M15 2C15 2.55228 15.4477 3 16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </button>

                                                                      <div
                                                                           className={`rounded-lg shadow-lg bg-white dark:bg-darkblack-500 min-w-[150px] absolute right-0 z-10 top-8 overflow-hidden transition-all ${openFilter === `action-${student.admission_no}` ? "block" : "hidden"}`}
                                                                      >
                                                                           <ul>
                                                                                <li onClick={() => handleDelete(student.admission_no)} className="text-nowrap text-sm text-red-500 cursor-pointer px-5 py-3 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold text-left">
                                                                                     Delete
                                                                                </li>
                                                                           </ul>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                                   <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                        limit={limit}
                                        onLimitChange={setLimit}
                                        totalEntries={totalEntries}
                                   />
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}

