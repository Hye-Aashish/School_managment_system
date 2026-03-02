"use client";
import React, { useState } from "react";

type Period = {
     subject: string;
     time: string;
     teacher: string;
     room: string;
};

type TimetableData = {
     Monday: Period[];
     Tuesday: Period[];
     Wednesday: Period[];
     Thursday: Period[];
     Friday: Period[];
     Saturday: Period[];
     Sunday: Period[];
};

export default function ClassRoutine() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | null>(null);

     const toggleFilter = (type: "class" | "section") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample timetable data
     const timetableData: TimetableData = {
          Monday: [
               { subject: "English (210)", time: "9:00 AM - 09:45 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Hindi (230)", time: "09:45 AM - 10:30 AM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" },
               { subject: "Computer (00220)", time: "10:30 AM - 11:15 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Mathematics (110)", time: "11:15 AM - 12:00 PM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" }
          ],
          Tuesday: [
               { subject: "Hindi (230)", time: "9:00 AM - 09:45 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" },
               { subject: "English (210)", time: "10:30 AM - 11:15 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Drawing (200)", time: "11:15 AM - 12:00 PM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" }
          ],
          Wednesday: [
               { subject: "English (210)", time: "9:00 AM - 09:45 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Science (111)", time: "09:45 AM - 10:30 AM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" },
               { subject: "Mathematics (110)", time: "10:30 AM - 11:15 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Hindi (230)", time: "11:15 AM - 12:00 PM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" }
          ],
          Thursday: [
               { subject: "English (210)", time: "9:00 AM - 09:45 AM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" },
               { subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Hindi (230)", time: "10:30 AM - 11:15 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Computer (00220)", time: "11:15 AM - 12:00 PM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" }
          ],
          Friday: [
               { subject: "English (210)", time: "9:00 AM - 09:45 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" },
               { subject: "Hindi (230)", time: "10:30 AM - 11:15 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Drawing (200)", time: "11:15 AM - 12:00 PM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" }
          ],
          Saturday: [
               { subject: "Mathematics (110)", time: "9:00 AM - 09:45 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Hindi (230)", time: "09:45 AM - 10:30 AM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" },
               { subject: "English (210)", time: "10:30 AM - 11:15 AM", teacher: "Shivam Verma (9002)", room: "Room No.: 12" },
               { subject: "Computer (00220)", time: "11:15 AM - 12:00 PM", teacher: "Albert Thomas (54545454)", room: "Room No.: 12" }
          ],
          Sunday: []
     };

     const days: (keyof TimetableData)[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Filters */}
                                   <div className="w-full flex justify-between items-end">
                                        <div className="flex gap-4">
                                             {/* Class */}
                                             <div className="flex flex-col space-y-2">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                       Class <span className="text-red-500">*</span>
                                                  </label>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 flex justify-between items-center min-w-[200px]"
                                                            onClick={() => toggleFilter("class")}
                                                       >
                                                            <span className="text-base text-bgray-900 dark:text-white">Class 1</span>
                                                            <span>
                                                                 <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </button>
                                                       <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                                                            <ul>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Class 1</li>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Class 2</li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* Section */}
                                             <div className="flex flex-col space-y-2">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                       Section <span className="text-red-500">*</span>
                                                  </label>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 flex justify-between items-center min-w-[200px]"
                                                            onClick={() => toggleFilter("section")}
                                                       >
                                                            <span className="text-base text-bgray-900 dark:text-white">A</span>
                                                            <span>
                                                                 <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </button>
                                                       <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "section" ? "block" : "hidden"}`}>
                                                            <ul>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">A</li>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">B</li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Search and Print buttons */}
                                        <div className="flex items-center space-x-3">
                                             <button
                                                  type="button"
                                                  className="h-12 px-6 rounded-lg bg-bgray-900 dark:bg-success-300 text-white dark:text-bgray-900 font-semibold hover:bg-bgray-800 dark:hover:bg-success-400 transition-colors flex items-center space-x-2"
                                             >
                                                  <svg
                                                       className="stroke-white dark:stroke-bgray-900"
                                                       width="18"
                                                       height="18"
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
                                                  <span>Search</span>
                                             </button>
                                             <button
                                                  type="button"
                                                  className="h-12 px-4 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors"
                                                  title="Print"
                                             >
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300">
                                                       <path d="M6 9V2H18V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M18 14H6V22H18V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Timetable Grid */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                                        {days.map((day) => (
                                             <div key={day} className="flex flex-col space-y-3">
                                                  <h3 className="text-lg font-bold text-bgray-900 dark:text-white pb-2 border-b border-bgray-300 dark:border-darkblack-400">
                                                       {day}
                                                  </h3>

                                                  {day === "Sunday" && timetableData[day].length === 0 ? (
                                                       <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-red-500">
                                                                 <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                 <path d="M15 9L9 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                 <path d="M9 9L15 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <span className="text-sm font-semibold text-red-500">Not Scheduled</span>
                                                       </div>
                                                  ) : (
                                                       <div className="flex flex-col space-y-3">
                                                            {timetableData[day]?.map((period, index) => (
                                                                 <div key={index} className="p-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500 space-y-2">
                                                                      <div className="flex items-start space-x-2">
                                                                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-success-300 flex-shrink-0 mt-0.5">
                                                                                <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                           <p className="text-sm font-medium text-success-300">Subject: {period.subject}</p>
                                                                      </div>

                                                                      <div className="flex items-start space-x-2">
                                                                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300 flex-shrink-0 mt-0.5">
                                                                                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                           <p className="text-sm text-bgray-600 dark:text-bgray-300">{period.time}</p>
                                                                      </div>

                                                                      <div className="flex items-start space-x-2">
                                                                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300 flex-shrink-0 mt-0.5">
                                                                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                           <p className="text-sm text-bgray-600 dark:text-bgray-300">{period.teacher}</p>
                                                                      </div>

                                                                      <div className="flex items-start space-x-2">
                                                                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300 flex-shrink-0 mt-0.5">
                                                                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V9H3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M9 22V12H15V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                           <p className="text-sm text-bgray-600 dark:text-bgray-300">{period.room}</p>
                                                                      </div>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  )}
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