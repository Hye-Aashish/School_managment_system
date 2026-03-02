"use client";
import React, { useState } from "react";

export default function AssignIncidentList() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | null>(null);
     const [selectedClass, setSelectedClass] = useState("Class 1");
     const [selectedSection, setSelectedSection] = useState("A");

     const toggleFilter = (type: "class" | "section" | "action" | "pagination") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample data based on the image
     const assignIncidentData = [
          {
               id: 1,
               studentName: "Steven Taylor",
               admissionNo: "10024",
               class: "Class 1(A)",
               gender: "Male",
               phone: "890567345",
               totalPoints: 60
          },
          {
               id: 2,
               studentName: "Ashwani Kumar",
               admissionNo: "120020",
               class: "Class 1(A)",
               gender: "Male",
               phone: "980678463",
               totalPoints: 60
          },
          {
               id: 3,
               studentName: "Nehal Wadhera",
               admissionNo: "125005",
               class: "Class 1(A)",
               gender: "Male",
               phone: "890786784",
               totalPoints: 30
          },
          {
               id: 4,
               studentName: "Edward Thomas",
               admissionNo: "18001",
               class: "Class 1(A)",
               gender: "Male",
               phone: "8906785675",
               totalPoints: 70
          },
          {
               id: 5,
               studentName: "Edward Thomas",
               admissionNo: "19001",
               class: "Class 1(A)",
               gender: "Male",
               phone: "8233366613",
               totalPoints: 0
          },
          {
               id: 6,
               studentName: "Anubhav Sharma",
               admissionNo: "2002",
               class: "Class 1(A)",
               gender: "Male",
               phone: "9826456678",
               totalPoints: 10
          },
          {
               id: 7,
               studentName: "Georgia Wareham",
               admissionNo: "25001",
               class: "Class 1(A)",
               gender: "Female",
               phone: "9808908777",
               totalPoints: 40
          },
          {
               id: 8,
               studentName: "xavier bartlett",
               admissionNo: "520039",
               class: "Class 1(A)",
               gender: "Male",
               phone: "0890789657",
               totalPoints: 40
          },
          {
               id: 9,
               studentName: "James Bennett",
               admissionNo: "659990",
               class: "Class 1(A)",
               gender: "Male",
               phone: "8978786866",
               totalPoints: 0
          },
     ];

     const classList = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
     const sectionList = ["A", "B", "C", "D", "E"];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">

                         {/* Assign Incident List Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-bgray-900 dark:text-white">Assign Incident List</h2>
                                   </div>

                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                            placeholder="Search..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>
                                         <div className="flex flex-col w-full">
                                             <div className="relative">
                                                  <select
                                                       value={selectedClass}
                                                       onChange={(e) => setSelectedClass(e.target.value)}
                                                       className="w-full h-14 border border-transparent focus-within:border-success-300 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px] text-sm text-bgray-900 dark:text-bgray-50 focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  >
                                                       {classList.map((cls) => (
                                                            <option key={cls} value={cls}>{cls}</option>
                                                       ))}
                                                  </select>
                                             </div>
                                        </div>

                                        {/* Section Dropdown */}
                                        <div className="flex flex-col w-full">
                                             <div className="relative">
                                                  <select
                                                       value={selectedSection}
                                                       onChange={(e) => setSelectedSection(e.target.value)}
                                                       className="w-full h-14 border border-transparent focus-within:border-success-300 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px] text-sm text-bgray-900 dark:text-bgray-50 focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  >
                                                       {sectionList.map((section) => (
                                                            <option key={section} value={section}>{section}</option>
                                                       ))}
                                                  </select>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Student Name</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Admission No</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Class</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Gender</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Phone</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Total Points</span>
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
                                                       <td className="py-5 px-6 xl:px-0"></td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {assignIncidentData.map((item) => (
                                                       <tr key={item.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.studentName}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.admissionNo}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.class}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.gender}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.phone}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.totalPoints}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="relative">
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => toggleFilter("action")}
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="4"
                                                                                viewBox="0 0 18 4"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M8 2.00024C8 2.55253 8.44772 3.00024 9 3.00024C9.55228 3.00024 10 2.55253 10 2.00024C10 1.44796 9.55228 1.00024 9 1.00024C8.44772 1.00024 8 1.44796 8 2.00024Z"
                                                                                     stroke="#A0AEC0"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                     d="M1 2.00024C1 2.55253 1.44772 3.00024 2 3.00024C2.55228 3.00024 3 2.55253 3 2.00024C3 1.44796 2.55228 1.00024 2 1.00024C1.44772 1.00024 1 1.44796 1 2.00024Z"
                                                                                     stroke="#A0AEC0"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                     d="M15 2.00024C15 2.55253 15.4477 3.00024 16 3.00024C16.5523 3.00024 17 2.55253 17 2.00024C17 1.44796 16.5523 1.00024 16 1.00024C15.4477 1.00024 15 1.44796 15 2.00024Z"
                                                                                     stroke="#A0AEC0"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </button>

                                                                      <div
                                                                           className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 min-w-[150px] absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "action" ? "block" : "hidden"
                                                                                }`}
                                                                      >
                                                                           <ul>
                                                                                <li className="text-nowrap text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Add</li>
                                                                                <li className="text-nowrap text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">View Details</li>
                                                                           </ul>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>

                                   <div className="pagination-content w-full">
                                        <div className="w-full flex lg:justify-between justify-center items-center">
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">Show result:</span>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">3</span>
                                                            <span>
                                                                 <svg
                                                                      width="17"
                                                                      height="17"
                                                                      viewBox="0 0 17 17"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                                                                           stroke="#A0AEC0"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </button>
                                                       <div
                                                            className={`rounded-lg w-full shadow-lg bg-white absolute right-0 z-10 top-14 overflow-hidden hidden ${openFilter === "pagination" ? "block" : "hidden"
                                                                 }`}
                                                       >
                                                            <ul>
                                                                 <li className="text-sm font-medium text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100">
                                                                      1
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100">
                                                                      2
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100">
                                                                      3
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                                  <button type="button">
                                                       <span>
                                                            <svg
                                                                 width="21"
                                                                 height="21"
                                                                 viewBox="0 0 21 21"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                 <path
                                                                      d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
                                                                      stroke="#A0AEC0"
                                                                      strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div className="flex items-center">
                                                       <button
                                                            type="button"
                                                            className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-bgray-50"
                                                       >
                                                            1
                                                       </button>
                                                       <button
                                                            type="button"
                                                            className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500"
                                                       >
                                                            2
                                                       </button>
                                                       <span className="text-bgray-500 text-sm">. . . .</span>
                                                       <button
                                                            type="button"
                                                            className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500"
                                                       >
                                                            20
                                                       </button>
                                                  </div>
                                                  <button type="button">
                                                       <span>
                                                            <svg
                                                                 width="21"
                                                                 height="21"
                                                                 viewBox="0 0 21 21"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                 <path
                                                                      d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
                                                                      stroke="#A0AEC0"
                                                                      strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
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