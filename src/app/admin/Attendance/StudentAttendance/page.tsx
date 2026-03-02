"use client";
import React, { useState } from "react";

export default function StudentAttendance() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "date" | null>(null);
     const [bulkAttendance, setBulkAttendance] = useState<string>("");

     const [selectedCriteria, setSelectedCriteria] = useState({
          class: "Class 1",
          section: "B",
          attendanceDate: "2025-07-10"
     });

     const [students, setStudents] = useState([
          {
               id: 1,
               admissionNo: "120028",
               rollNumber: "100028",
               name: "Nishant Sindhu",
               attendance: "Absent",
               date: "",
               source: "N/A",
               entryTime: "",
               exitTime: "",
               note: ""
          },
          {
               id: 2,
               admissionNo: "5422",
               rollNumber: "632010",
               name: "Vinay Singh",
               attendance: "Absent",
               date: "",
               source: "N/A",
               entryTime: "",
               exitTime: "",
               note: ""
          }
     ]);

     const toggleFilter = (type: "class" | "section" | "date") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleBulkAttendanceChange = (type: string) => {
          setBulkAttendance(type);
          setStudents(students.map(student => ({
               ...student,
               attendance: type
          })));
     };

     const handleStudentAttendanceChange = (id: number, attendance: string) => {
          setStudents(students.map(student =>
               student.id === id ? { ...student, attendance } : student
          ));
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Select Criteria */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="relative w-full">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Class 1</span>
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
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Class 1</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Class 2</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Class 3</li>
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative w-full">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">B</span>
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
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">A</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">B</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">C</li>
                                                  </ul>
                                             </div>
                                        </div>

                                        <div
                                             className="w-full border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                        >
                                             <div
                                                  className="flex w-full h-full items-center space-x-[15px]"
                                             >
                                                  <label className="w-full">
                                                       <input
                                                            type="date"
                                                            className="w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm text-bgray-600 tracking-wide dark:bg-darkblack-500 dark:text-white"
                                                            value={selectedCriteria.attendanceDate}
                                                            onChange={(e) => setSelectedCriteria({ ...selectedCriteria, attendanceDate: e.target.value })}
                                                       />
                                                  </label>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Student List */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Bulk Attendance Selection */}
                                   <div className="flex items-center justify-between space-x-4 py-4 border-b border-bgray-300 dark:border-darkblack-400">
                                        <div className="flex items-center space-x-4 py-4 border-b border-bgray-300 dark:border-darkblack-400">
                                             <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Set attendance for all students as
                                             </span>
                                             <div className="flex items-center space-x-4">
                                                  <label className="flex items-center space-x-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="bulkAttendance"
                                                            value="Present"
                                                            checked={bulkAttendance === "Present"}
                                                            onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white">Present</span>
                                                  </label>
                                                  <label className="flex items-center space-x-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="bulkAttendance"
                                                            value="Late"
                                                            checked={bulkAttendance === "Late"}
                                                            onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white">Late</span>
                                                  </label>
                                                  <label className="flex items-center space-x-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="bulkAttendance"
                                                            value="Absent"
                                                            checked={bulkAttendance === "Absent"}
                                                            onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white">Absent</span>
                                                  </label>
                                                  <label className="flex items-center space-x-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="bulkAttendance"
                                                            value="Holiday"
                                                            checked={bulkAttendance === "Holiday"}
                                                            onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white">Holiday</span>
                                                  </label>
                                                  <label className="flex items-center space-x-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="bulkAttendance"
                                                            value="Half Day"
                                                            checked={bulkAttendance === "Half Day"}
                                                            onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white">Half Day</span>
                                                  </label>
                                             </div>
                                        </div>

                                        <button
                                             type="button"
                                             className="px-6 ms-auto me-0 py-3 rounded-lg bg-success-300 hover:bg-success-400 text-white font-bold transition-all flex items-center space-x-2"
                                        >
                                             <svg
                                                  width="18"
                                                  height="18"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="stroke-white"
                                             >
                                                  <path
                                                       d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                                                       strokeWidth="2"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M17 21V13H7V21"
                                                       strokeWidth="2"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M7 3V8H15"
                                                       strokeWidth="2"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                             </svg>
                                             <span>Save Attendance</span>
                                        </button>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">#</span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base text-nowrap font-medium text-bgray-600 dark:text-bgray-50">Admission No</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 text-nowrap dark:text-bgray-50">Roll Number</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Name</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Attendance</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Date</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Source</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Entry Time</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Exit Time</span>
                                                                 <span>
                                                                      <svg
                                                                           width="14"
                                                                           height="15"
                                                                           viewBox="0 0 14 15"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M10.332 1.31567V13.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M3.66602 13.3157V1.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                                stroke="#718096"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Note</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {students.map((student) => (
                                                       <tr key={student.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.id}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.admissionNo}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.rollNumber}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.name}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex items-center space-x-4">
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`attendance-${student.id}`}
                                                                                value="Present"
                                                                                checked={student.attendance === "Present"}
                                                                                onChange={(e) => handleStudentAttendanceChange(student.id, e.target.value)}
                                                                                className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">Present</span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`attendance-${student.id}`}
                                                                                value="Late"
                                                                                checked={student.attendance === "Late"}
                                                                                onChange={(e) => handleStudentAttendanceChange(student.id, e.target.value)}
                                                                                className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">Late</span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`attendance-${student.id}`}
                                                                                value="Absent"
                                                                                checked={student.attendance === "Absent"}
                                                                                onChange={(e) => handleStudentAttendanceChange(student.id, e.target.value)}
                                                                                className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">Absent</span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`attendance-${student.id}`}
                                                                                value="Holiday"
                                                                                checked={student.attendance === "Holiday"}
                                                                                onChange={(e) => handleStudentAttendanceChange(student.id, e.target.value)}
                                                                                className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">Holiday</span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`attendance-${student.id}`}
                                                                                value="Half Day"
                                                                                checked={student.attendance === "Half Day"}
                                                                                onChange={(e) => handleStudentAttendanceChange(student.id, e.target.value)}
                                                                                className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">Half Day</span>
                                                                      </label>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.date || "-"}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {student.source}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <input
                                                                      type="text"
                                                                      className="w-32 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                                      value={student.entryTime}
                                                                      onChange={(e) => {
                                                                           const updatedStudents = students.map(s =>
                                                                                s.id === student.id ? { ...s, entryTime: e.target.value } : s
                                                                           );
                                                                           setStudents(updatedStudents);
                                                                      }}
                                                                 />
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <input
                                                                      type="text"
                                                                      className="w-32 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                                      value={student.exitTime}
                                                                      onChange={(e) => {
                                                                           const updatedStudents = students.map(s =>
                                                                                s.id === student.id ? { ...s, exitTime: e.target.value } : s
                                                                           );
                                                                           setStudents(updatedStudents);
                                                                      }}
                                                                 />
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <input
                                                                      type="text"
                                                                      className="w-40 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                                      value={student.note}
                                                                      onChange={(e) => {
                                                                           const updatedStudents = students.map(s =>
                                                                                s.id === student.id ? { ...s, note: e.target.value } : s
                                                                           );
                                                                           setStudents(updatedStudents);
                                                                      }}
                                                                 />
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
          </>
     );
}