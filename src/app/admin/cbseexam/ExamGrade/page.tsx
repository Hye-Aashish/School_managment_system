"use client";
import React, { useState } from "react";

export default function ExamGradeList() {
     const [openFilter, setOpenFilter] = useState<number | null>(null);

     const toggleFilter = (index: number) => {
          setOpenFilter(openFilter === index ? null : index);
     };

     const gradeData = [
          {
               title: "Exam Grade",
               description: "An examination is a formal test that you take to show your knowledge or ability in a particular subject, or to obtain a qualification. If you have a medical examination, a doctor looks at your body, feels it, or does simple tests in order to check how healthy you are.",
               grades: [
                    { grade: "A+", maxPercentage: "100", minPercentage: "90", remark: "Excellent" },
                    { grade: "A", maxPercentage: "90", minPercentage: "80", remark: "Very Good" },
                    { grade: "B+", maxPercentage: "80", minPercentage: "70", remark: "Good" },
                    { grade: "B", maxPercentage: "70", minPercentage: "60", remark: "Better" },
                    { grade: "C", maxPercentage: "60", minPercentage: "50", remark: "Keep Hard Working" },
                    { grade: "D", maxPercentage: "50", minPercentage: "40", remark: "Keep Hard Working" },
                    { grade: "E", maxPercentage: "40", minPercentage: "0", remark: "Keep Hard Working" },
               ]
          },
          {
               title: "Exam grade 1",
               description: "a degree or step in a scale, as of rank, advancement, quality, value, or intensity.",
               grades: [
                    { grade: "A+", maxPercentage: "100", minPercentage: "90", remark: "Excellent" },
                    { grade: "A", maxPercentage: "90", minPercentage: "80", remark: "Very Good" },
                    { grade: "B+", maxPercentage: "80", minPercentage: "70", remark: "Good" },
                    { grade: "B", maxPercentage: "70", minPercentage: "60", remark: "Keep Hard working" },
                    { grade: "C", maxPercentage: "60", minPercentage: "50", remark: "Keep Hard working" },
                    { grade: "D", maxPercentage: "50", minPercentage: "40", remark: "Keep Hard working" },
                    { grade: "E", maxPercentage: "40", minPercentage: "0", remark: "Keep Hard working" },
               ]
          }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Search Bar */}
                                   <div className="w-full flex justify-between items-center space-x-4">
                                        <div className="w-full border border-transparent focus-within:border-success-300 h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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

                                        {/* Export Icons */}
                                        <div className="flex items-center space-x-3">
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M5 8.33334L10 13.3333L15 8.33334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M10 13.3333V3.33334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M3.33203 16.6667H16.6654" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14.1654 2.5H5.83203C4.91156 2.5 4.16536 3.24619 4.16536 4.16667V15.8333C4.16536 16.7538 4.91156 17.5 5.83203 17.5H14.1654C15.0859 17.5 15.832 16.7538 15.832 15.8333V4.16667C15.832 3.24619 15.0859 2.5 14.1654 2.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                       <path d="M7.5 7.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                       <path d="M7.5 10.8333H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                       <path d="M7.5 14.1667H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M11.6654 2.5H5.83203C4.91156 2.5 4.16536 3.24619 4.16536 4.16667V15.8333C4.16536 16.7538 4.91156 17.5 5.83203 17.5H14.1654C15.0859 17.5 15.832 16.7538 15.832 15.8333V6.66667L11.6654 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       <path d="M11.668 2.5V6.66667H15.8346" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M5.83203 2.5H14.1654V5.83333H5.83203V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       <path d="M5.83203 14.1667H14.1654V17.5H5.83203V14.1667Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       <path d="M3.33203 5.83334H16.6654V14.1667H3.33203V5.83334Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M2.5 6.66667V15C2.5 15.442 2.67559 15.8659 2.98816 16.1785C3.30072 16.4911 3.72464 16.6667 4.16667 16.6667H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M4.16797 11.6667H7.5013V15.8333H4.16797V11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       <path d="M8.33203 8.33334H11.6654V15.8333H8.33203V8.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       <path d="M12.5 5H15.8333V15.8333H12.5V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14.1654 7.5H5.83203V15H14.1654V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       <path d="M12.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                       <path d="M15 7.5V5.83333C15 5.39131 14.8244 4.96738 14.5118 4.65482C14.1993 4.34226 13.7754 4.16667 13.3333 4.16667H6.66667C6.22464 4.16667 5.80072 4.34226 5.48816 4.65482C5.17559 4.96738 5 5.39131 5 5.83333V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                        </div>


                                        {/* Search Button */}
                                        <button
                                             type="button"
                                             className="px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-success-300 text-nowrap dark:hover:bg-success-400 text-white font-semibold transition-colors"
                                        >
                                             Add New
                                        </button>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Grade Title
                                                                 </span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Description
                                                                 </span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Grade
                                                                 </span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 text-right">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Action
                                                            </span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {gradeData.map((item, index) => (
                                                       <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0 align-top">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.title}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 align-top">
                                                                 <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300 max-w-md">
                                                                      {item.description}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 align-top">
                                                                 {/* Nested Grade Table */}
                                                                 <div className="bg-bgray-100 dark:bg-darkblack-500 rounded-lg p-4">
                                                                      <table className="w-full">
                                                                           <thead>
                                                                                <tr className="border-b border-bgray-200 dark:border-darkblack-400">
                                                                                     <th className="text-left py-2 px-3 text-sm font-semibold text-bgray-700 dark:text-bgray-200">Grade</th>
                                                                                     <th className="text-left py-2 px-3 text-sm font-semibold text-bgray-700 dark:text-bgray-200">Maximum Percentage</th>
                                                                                     <th className="text-left py-2 px-3 text-sm font-semibold text-bgray-700 dark:text-bgray-200">Minimum Percentage</th>
                                                                                     <th className="text-left py-2 px-3 text-sm font-semibold text-bgray-700 dark:text-bgray-200">Remark</th>
                                                                                </tr>
                                                                           </thead>
                                                                           <tbody>
                                                                                {item.grades.map((grade, gradeIndex) => (
                                                                                     <tr key={gradeIndex} className="border-b border-bgray-200 dark:border-darkblack-400 last:border-0">
                                                                                          <td className="py-2 px-3 text-sm text-bgray-900 dark:text-white">{grade.grade}</td>
                                                                                          <td className="py-2 px-3 text-sm text-bgray-900 dark:text-white">{grade.maxPercentage}</td>
                                                                                          <td className="py-2 px-3 text-sm text-bgray-900 dark:text-white">{grade.minPercentage}</td>
                                                                                          <td className="py-2 px-3 text-sm text-bgray-900 dark:text-white">{grade.remark}</td>
                                                                                     </tr>
                                                                                ))}
                                                                           </tbody>
                                                                      </table>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 align-top">
                                                                 <div className="flex justify-end space-x-3 items-center">
                                                                      <button type="button" className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M14.1667 2.5H5.83333C4.91286 2.5 4.16667 3.24619 4.16667 4.16667V15.8333C4.16667 16.7538 4.91286 17.5 5.83333 17.5H14.1667C15.0871 17.5 15.8333 16.7538 15.8333 15.8333V4.16667C15.8333 3.24619 15.0871 2.5 14.1667 2.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                                                <path d="M13.332 8.33334L8.74868 12.9167L6.66602 10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </button>
                                                                      <button type="button" className="text-bgray-900 dark:text-white hover:text-error-300 transition-colors">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M15.8333 5L14.1667 15.8333C14.1667 16.2754 13.9911 16.6993 13.6785 17.0118C13.366 17.3244 12.942 17.5 12.5 17.5H7.5C7.05797 17.5 6.63405 17.3244 6.32149 17.0118C6.00893 16.6993 5.83333 16.2754 5.83333 15.8333L4.16667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M8.33203 9.16666V14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M11.668 9.16666V14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </button>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Pagination */}
                                   <div className="pagination-content w-full">
                                        <div className="w-full flex justify-between items-center">
                                             <div className="text-sm text-bgray-600 dark:text-bgray-300">
                                                  Records: 1 to 2 of 2
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </button>
                                                  <button type="button" className="rounded-lg text-white lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-300 hover:bg-success-400 transition-colors">
                                                       1
                                                  </button>
                                                  <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
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