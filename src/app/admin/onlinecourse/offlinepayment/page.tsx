"use client";
import React, { useEffect, useState } from "react";

export default function StudentFee() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | "export" | null>(null);

     const toggleFilter = (type: "class" | "section" | "action" | "pagination" | "export") => {
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
                                                            id="listSearch"
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
                                                  <span className="text-base text-bgray-500 text-nowrap">Select Class</span>
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
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">1St</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">2nd</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">3rd</li>
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Select Section</span>
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

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("export")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Student</span>
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
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Coppy</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">PDF</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print</li>
                                                  </ul>
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
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Coppy</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">PDF</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td
                                                            className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block"
                                                       >
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span
                                                                      className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Course</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Section</span
                                                                 >
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
                                                                 <span
                                                                      className="text-base font-medium text-bgray-600 dark:text-gray-50"
                                                                 >
                                                                      Lesson</span
                                                                 >
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Quiz</span
                                                                 >
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Exam</span
                                                                 >
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Assignment</span
                                                                 >
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Course Provider</span
                                                                 >
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Price ($)</span
                                                                 >
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                 >Current Price ($)</span
                                                                 >
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 Vedic Mathematics Course
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                2
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 2
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 0
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 0
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 0
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 Youtube
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 200.00
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 200.00
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <button
                                                                 type="button"
                                                                 className="px-4 py-2 rounded-lg bg-success-300 hover:bg-success-400 text-white text-sm font-semibold transition-colors duration-200"
                                                            >
                                                                 Pay
                                                            </button>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 Mathematics a Graphical Course
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                1
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 2
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 1
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 1
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 1
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 Youtube
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 100.00
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 90.00
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <button
                                                                 type="button"
                                                                 className="px-4 py-2 rounded-lg bg-success-300 hover:bg-success-400 text-white text-sm font-semibold transition-colors duration-200"
                                                            >
                                                                 Pay
                                                            </button>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                                   <div className="pagination-content w-full">
                                        <div
                                             className="w-full flex lg:justify-between justify-center items-center"
                                        >
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold"
                                                  >Show result:</span
                                                  >
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50"
                                                            >3</span
                                                            >
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
                                                            id="result-filter"
                                                            className={`rounded-lg w-full shadow-lg bg-white absolute right-0 z-10 top-14 overflow-hidden hidden ${openFilter === "pagination" ? "block" : "hidden"
                                                                 }`}
                                                       >
                                                            <ul>
                                                                 <li
                                                                      className="text-sm font-medium text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                                                                 >
                                                                      1
                                                                 </li>
                                                                 <li
                                                                      className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                                                                 >
                                                                      2
                                                                 </li>

                                                                 <li
                                                                      className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                                                                 >
                                                                      3
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div
                                                  className="flex sm:space-x-[35px] space-x-5 items-center"
                                             >
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