"use client";
import React from "react";

export default function OnlineCourseReport() {
     const reports = [
          {
               column1: [
                    { id: 1, name: "Student Course Purchase Report", icon: true },
                    { id: 2, name: "Course Complete Report", icon: true },
                    { id: 3, name: "Course Assignment Report", icon: true },
                    { id: 4, name: "Course Exam Attempt Report", icon: true }
               ],
               column2: [
                    { id: 5, name: "Course Sell Count Report", icon: true },
                    { id: 6, name: "Course Rating Report", icon: true },
                    { id: 7, name: "Course Exam Result Report", icon: true }
               ],
               column3: [
                    { id: 8, name: "Course Trending Report", icon: true },
                    { id: 9, name: "Guest Report", icon: true },
                    { id: 10, name: "Course Exam Report", icon: true }
               ]
          }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Online Course Report Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <h2 className="text-xl font-bold text-bgray-900 dark:text-white mb-6 mt-0">Online Course Report</h2>
                              
                              <div className="grid md:grid-cols-3 gap-8">
                                   {/* Column 1 */}
                                   <div className="space-y-4">
                                        {reports[0].column1.map((report) => (
                                             <div key={report.id} className="flex items-start gap-2">
                                                  {report.icon && (
                                                       <svg
                                                            className="mt-0.5 flex-shrink-0"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
                                                                 className="stroke-bgray-900 dark:stroke-white"
                                                                 strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  )}
                                                  <span className="text-base text-bgray-900 dark:text-white cursor-pointer hover:text-success-300 dark:hover:text-success-300 transition-colors">
                                                       {report.name}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>

                                   {/* Column 2 */}
                                   <div className="space-y-4">
                                        {reports[0].column2.map((report) => (
                                             <div key={report.id} className="flex items-start gap-2">
                                                  {report.icon && (
                                                       <svg
                                                            className="mt-0.5 flex-shrink-0"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
                                                                 className="stroke-bgray-900 dark:stroke-white"
                                                                 strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  )}
                                                  <span className="text-base text-bgray-900 dark:text-white cursor-pointer hover:text-success-300 dark:hover:text-success-300 transition-colors">
                                                       {report.name}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>

                                   {/* Column 3 */}
                                   <div className="space-y-4">
                                        {reports[0].column3.map((report) => (
                                             <div key={report.id} className="flex items-start gap-2">
                                                  {report.icon && (
                                                       <svg
                                                            className="mt-0.5 flex-shrink-0"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
                                                                 className="stroke-bgray-900 dark:stroke-white"
                                                                 strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  )}
                                                  <span className="text-base text-bgray-900 dark:text-white cursor-pointer hover:text-success-300 dark:hover:text-success-300 transition-colors">
                                                       {report.name}
                                                  </span>
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