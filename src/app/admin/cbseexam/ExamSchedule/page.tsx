"use client";
import React, { useState } from "react";

interface ExamSubject {
     subject: string;
     subjectCode: string;
     date: string;
     startTime: string;
     duration: number;
     roomNo: number;
}

interface ExamSchedule {
     examName: string;
     subjects: ExamSubject[];
}

export default function ExamSchedule() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "export" | null>(null);

     const toggleFilter = (type: "class" | "section" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample exam data
     const examSchedules: ExamSchedule[] = [
          {
               examName: "Weekly Test(December)",
               subjects: [
                    {
                         subject: "English",
                         subjectCode: "210",
                         date: "12/02/2025",
                         startTime: "13:22:35",
                         duration: 1,
                         roomNo: 10,
                    },
               ],
          },
          {
               examName: "Periodic Term-End Exams(December-2025)",
               subjects: [
                    {
                         subject: "English",
                         subjectCode: "210",
                         date: "12/05/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 12,
                    },
                    {
                         subject: "Mathematics",
                         subjectCode: "110",
                         date: "12/08/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 11,
                    },
                    {
                         subject: "Science",
                         subjectCode: "111",
                         date: "12/10/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 12,
                    },
                    {
                         subject: "Social Studies",
                         subjectCode: "212",
                         date: "12/12/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 11,
                    },
               ],
          },
          {
               examName: "Online Assessment Test (November)",
               subjects: [
                    {
                         subject: "English",
                         subjectCode: "210",
                         date: "11/10/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 12,
                    },
                    {
                         subject: "Social Studies",
                         subjectCode: "212",
                         date: "11/12/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 11,
                    },
                    {
                         subject: "Science",
                         subjectCode: "111",
                         date: "11/15/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 12,
                    },
                    {
                         subject: "Mathematics",
                         subjectCode: "110",
                         date: "11/18/2025",
                         startTime: "09:00:00",
                         duration: 90,
                         roomNo: 11,
                    },
               ],
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Filters Row */}
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
                                                            id="listSearch"
                                                            placeholder="Search Exam..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        {/* Class Filter */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[150px]"
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${
                                                       openFilter === "class" ? "block" : "hidden"
                                                  }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            1st
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            2nd
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            3rd
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>

                                        {/* Section Filter */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[150px]"
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${
                                                       openFilter === "section" ? "block" : "hidden"
                                                  }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            A
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            B
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            C
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>

                                        {/* Export Filter */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[120px]"
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${
                                                       openFilter === "export" ? "block" : "hidden"
                                                  }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Copy
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Excel
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            CSV
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            PDF
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Print
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Exam Schedules */}
                                   <div className="space-y-6">
                                        {examSchedules.map((exam, examIndex) => (
                                             <div
                                                  key={examIndex}
                                                  className="border border-bgray-300 dark:border-darkblack-400 rounded-lg overflow-hidden"
                                             >
                                                  {/* Exam Header */}
                                                  <div className="bg-bgray-100 dark:bg-darkblack-500 py-4 px-6 flex justify-between items-center border-b border-bgray-300 dark:border-darkblack-400">
                                                       <h3 className="text-lg font-bold text-bgray-900 dark:text-white">
                                                            {exam.examName}
                                                       </h3>
                                                       <button
                                                            type="button"
                                                            className="p-2 hover:bg-bgray-200 dark:hover:bg-darkblack-600 rounded-lg transition-colors"
                                                            title="Print"
                                                       >
                                                            <svg
                                                                 width="20"
                                                                 height="20"
                                                                 viewBox="0 0 20 20"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 className="stroke-bgray-900 dark:stroke-white"
                                                            >
                                                                 <path
                                                                      d="M5 7V3C5 2.44772 5.44772 2 6 2H14C14.5523 2 15 2.44772 15 3V7"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                 />
                                                                 <path
                                                                      d="M5 13H3C2.44772 13 2 12.5523 2 12V8C2 7.44772 2.44772 7 3 7H17C17.5523 7 18 7.44772 18 8V12C18 12.5523 17.5523 13 17 13H15"
                                                                      strokeWidth="1.5"
                                                                 />
                                                                 <path
                                                                      d="M5 11H15V17C15 17.5523 14.5523 18 14 18H6C5.44772 18 5 17.5523 5 17V11Z"
                                                                      strokeWidth="1.5"
                                                                 />
                                                            </svg>
                                                       </button>
                                                  </div>

                                                  {/* Subjects Table */}
                                                  <div className="overflow-x-auto">
                                                       <table className="w-full">
                                                            <thead>
                                                                 <tr className="bg-white dark:bg-darkblack-600 border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <th className="py-4 px-6 text-left">
                                                                           <span className="text-base font-semibold text-bgray-900 dark:text-bgray-50">
                                                                                Subject
                                                                           </span>
                                                                      </th>
                                                                      <th className="py-4 px-6 text-left">
                                                                           <span className="text-base font-semibold text-bgray-900 dark:text-bgray-50">
                                                                                Date
                                                                           </span>
                                                                      </th>
                                                                      <th className="py-4 px-6 text-left">
                                                                           <span className="text-base font-semibold text-bgray-900 dark:text-bgray-50">
                                                                                Start Time
                                                                           </span>
                                                                      </th>
                                                                      <th className="py-4 px-6 text-left">
                                                                           <span className="text-base font-semibold text-bgray-900 dark:text-bgray-50">
                                                                                Duration (minute)
                                                                           </span>
                                                                      </th>
                                                                      <th className="py-4 px-6 text-left">
                                                                           <span className="text-base font-semibold text-bgray-900 dark:text-bgray-50">
                                                                                Room No.
                                                                           </span>
                                                                      </th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>
                                                                 {exam.subjects.map((subject, subjectIndex) => (
                                                                      <tr
                                                                           key={subjectIndex}
                                                                           className="border-b border-bgray-200 dark:border-darkblack-400 last:border-b-0 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors"
                                                                      >
                                                                           <td className="py-4 px-6">
                                                                                <p className="text-base text-bgray-600 dark:text-bgray-300">
                                                                                     {subject.subject} ({subject.subjectCode})
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6">
                                                                                <p className="text-base text-bgray-600 dark:text-bgray-300">
                                                                                     {subject.date}
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6">
                                                                                <p className="text-base text-bgray-600 dark:text-bgray-300">
                                                                                     {subject.startTime}
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6">
                                                                                <p className="text-base text-bgray-600 dark:text-bgray-300">
                                                                                     {subject.duration}
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6">
                                                                                <p className="text-base text-bgray-600 dark:text-bgray-300">
                                                                                     {subject.roomNo}
                                                                                </p>
                                                                           </td>
                                                                      </tr>
                                                                 ))}
                                                            </tbody>
                                                       </table>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}