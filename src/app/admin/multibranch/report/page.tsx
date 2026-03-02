"use client";
import React, { useState } from "react";

export default function MultiBranchReport() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | null>(null);
     const [activeReport, setActiveReport] = useState<string>("daily-collection");

     const toggleFilter = (type: "action" | "pagination") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Multi Branch Report Header */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <h2 className="text-xl font-bold text-bgray-900 dark:text-white">Multi Branch Report</h2>
                         </div>

                         {/* Report Type Buttons */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                   <button
                                        type="button"
                                        onClick={() => setActiveReport("daily-collection")}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${
                                             activeReport === "daily-collection"
                                                  ? "bg-success-50 border-success-300 dark:bg-darkblack-500"
                                                  : "bg-bgray-100 border-bgray-200 dark:bg-darkblack-500 dark:border-darkblack-400 hover:border-success-300"
                                        }`}
                                   >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M9 11H7C6.46957 11 5.96086 11.2107 5.58579 11.5858C5.21071 11.9609 5 12.4696 5 13V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H9C9.53043 19 10.0391 18.7893 10.4142 18.4142C10.7893 18.0391 11 17.5304 11 17V13C11 12.4696 10.7893 11.9609 10.4142 11.5858C10.0391 11.2107 9.53043 11 9 11Z" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M17 11H15C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13V17C13 17.5304 13.2107 18.0391 13.5858 18.4142C13.9609 18.7893 14.4696 19 15 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V13C19 12.4696 18.7893 11.9609 18.4142 11.5858C18.0391 11.2107 17.5304 11 17 11Z" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M5 11V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className={`text-sm font-semibold ${activeReport === "daily-collection" ? "text-success-300" : "text-bgray-600 dark:text-bgray-50"}`}>
                                             Daily Collection Report
                                        </span>
                                   </button>

                                   <button
                                        type="button"
                                        onClick={() => setActiveReport("payroll")}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${
                                             activeReport === "payroll"
                                                  ? "bg-success-50 border-success-300 dark:bg-darkblack-500"
                                                  : "bg-bgray-100 border-bgray-200 dark:bg-darkblack-500 dark:border-darkblack-400 hover:border-success-300"
                                        }`}
                                   >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M9 11H7C6.46957 11 5.96086 11.2107 5.58579 11.5858C5.21071 11.9609 5 12.4696 5 13V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H9C9.53043 19 10.0391 18.7893 10.4142 18.4142C10.7893 18.0391 11 17.5304 11 17V13C11 12.4696 10.7893 11.9609 10.4142 11.5858C10.0391 11.2107 9.53043 11 9 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M17 11H15C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13V17C13 17.5304 13.2107 18.0391 13.5858 18.4142C13.9609 18.7893 14.4696 19 15 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V13C19 12.4696 18.7893 11.9609 18.4142 11.5858C18.0391 11.2107 17.5304 11 17 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M5 11V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className={`text-sm font-semibold ${activeReport === "payroll" ? "text-success-300" : "text-bgray-600 dark:text-bgray-50"}`}>
                                             Payroll Report
                                        </span>
                                   </button>

                                   <button
                                        type="button"
                                        onClick={() => setActiveReport("income")}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${
                                             activeReport === "income"
                                                  ? "bg-success-50 border-success-300 dark:bg-darkblack-500"
                                                  : "bg-bgray-100 border-bgray-200 dark:bg-darkblack-500 dark:border-darkblack-400 hover:border-success-300"
                                        }`}
                                   >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M9 11H7C6.46957 11 5.96086 11.2107 5.58579 11.5858C5.21071 11.9609 5 12.4696 5 13V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H9C9.53043 19 10.0391 18.7893 10.4142 18.4142C10.7893 18.0391 11 17.5304 11 17V13C11 12.4696 10.7893 11.9609 10.4142 11.5858C10.0391 11.2107 9.53043 11 9 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M17 11H15C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13V17C13 17.5304 13.2107 18.0391 13.5858 18.4142C13.9609 18.7893 14.4696 19 15 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V13C19 12.4696 18.7893 11.9609 18.4142 11.5858C18.0391 11.2107 17.5304 11 17 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M5 11V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className={`text-sm font-semibold ${activeReport === "income" ? "text-success-300" : "text-bgray-600 dark:text-bgray-50"}`}>
                                             Income Report
                                        </span>
                                   </button>

                                   <button
                                        type="button"
                                        onClick={() => setActiveReport("expense")}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${
                                             activeReport === "expense"
                                                  ? "bg-success-50 border-success-300 dark:bg-darkblack-500"
                                                  : "bg-bgray-100 border-bgray-200 dark:bg-darkblack-500 dark:border-darkblack-400 hover:border-success-300"
                                        }`}
                                   >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M9 11H7C6.46957 11 5.96086 11.2107 5.58579 11.5858C5.21071 11.9609 5 12.4696 5 13V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H9C9.53043 19 10.0391 18.7893 10.4142 18.4142C10.7893 18.0391 11 17.5304 11 17V13C11 12.4696 10.7893 11.9609 10.4142 11.5858C10.0391 11.2107 9.53043 11 9 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M17 11H15C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13V17C13 17.5304 13.2107 18.0391 13.5858 18.4142C13.9609 18.7893 14.4696 19 15 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V13C19 12.4696 18.7893 11.9609 18.4142 11.5858C18.0391 11.2107 17.5304 11 17 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M5 11V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className={`text-sm font-semibold ${activeReport === "expense" ? "text-success-300" : "text-bgray-600 dark:text-bgray-50"}`}>
                                             Expense Report
                                        </span>
                                   </button>

                                   <button
                                        type="button"
                                        onClick={() => setActiveReport("user-log")}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${
                                             activeReport === "user-log"
                                                  ? "bg-success-50 border-success-300 dark:bg-darkblack-500"
                                                  : "bg-bgray-100 border-bgray-200 dark:bg-darkblack-500 dark:border-darkblack-400 hover:border-success-300"
                                        }`}
                                   >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M9 11H7C6.46957 11 5.96086 11.2107 5.58579 11.5858C5.21071 11.9609 5 12.4696 5 13V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H9C9.53043 19 10.0391 18.7893 10.4142 18.4142C10.7893 18.0391 11 17.5304 11 17V13C11 12.4696 10.7893 11.9609 10.4142 11.5858C10.0391 11.2107 9.53043 11 9 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M17 11H15C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13V17C13 17.5304 13.2107 18.0391 13.5858 18.4142C13.9609 18.7893 14.4696 19 15 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V13C19 12.4696 18.7893 11.9609 18.4142 11.5858C18.0391 11.2107 17.5304 11 17 11Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M5 11V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className={`text-sm font-semibold ${activeReport === "user-log" ? "text-success-300" : "text-bgray-600 dark:text-bgray-50"}`}>
                                             User Log Report
                                        </span>
                                   </button>
                              </div>
                         </div>

                         {/* Select Criteria */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Select Criteria</h3>
                                   
                                   <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                        {/* Date From */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Date From <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="date"
                                                  defaultValue="2025-12-19"
                                                  className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                             />
                                        </div>

                                        {/* Date To */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Date To <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="date"
                                                  defaultValue="2025-12-27"
                                                  className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                             />
                                        </div>
                                   </div>

                              </div>
                         </div>

                         {/* Daily Collection Report */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Daily Collection Report</h3>
                                        
                                        {/* Action Icons */}
                                        <div className="flex gap-2">
                                             <button type="button" className="p-2 rounded-lg bg-bgray-100 dark:bg-darkblack-500 hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all" title="Copy">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M4 17V6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V17M9 10H15" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round"/>
                                                  </svg>
                                             </button>

                                             <button type="button" className="p-2 rounded-lg bg-bgray-100 dark:bg-darkblack-500 hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all" title="Excel">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M7 18H17V16H7V18Z" fill="#A0AEC0"/>
                                                       <path d="M17 14H7V12H17V14Z" fill="#A0AEC0"/>
                                                       <path d="M7 10H11V8H7V10Z" fill="#A0AEC0"/>
                                                       <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="#A0AEC0"/>
                                                  </svg>
                                             </button>

                                             <button type="button" className="p-2 rounded-lg bg-bgray-100 dark:bg-darkblack-500 hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all" title="PDF">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M19.5 14.25V11.625C19.5 9.76104 17.989 8.25 16.125 8.25H14.625C14.0037 8.25 13.5 7.74632 13.5 7.125V5.625C13.5 3.76104 11.989 2.25 10.125 2.25H8.25M8.25 15H15.75M8.25 18H12M10.5 2.25H5.625C5.00368 2.25 4.5 2.75368 4.5 3.375V20.625C4.5 21.2463 5.00368 21.75 5.625 21.75H18.375C18.9963 21.75 19.5 21.2463 19.5 20.625V11.25C19.5 6.27944 15.4706 2.25 10.5 2.25Z" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>

                                             <button type="button" className="p-2 rounded-lg bg-bgray-100 dark:bg-darkblack-500 hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all" title="CSV">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       <path d="M13 2V9H20" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>

                                             <button type="button" className="p-2 rounded-lg bg-bgray-100 dark:bg-darkblack-500 hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all" title="Print">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M6 9L6 2L18 2V9M6 9H4M6 9H18M18 9H20M4 9L2 21L5 22H19L22 21L20 9M9 19V14H15V19" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Search */}
                                   <div className="w-full max-w-xs">
                                        <input
                                             type="text"
                                             placeholder="Search..."
                                             className="w-full px-4 py-2 bg-bgray-100 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white placeholder:text-bgray-500"
                                        />
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date</span>
                                                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M7 2V12M7 2L3 6M7 2L11 6" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 </svg>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Transactions</span>
                                                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M7 2V12M7 2L3 6M7 2L11 6" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 </svg>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Amount ($)</span>
                                                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M7 2V12M7 2L3 6M7 2L11 6" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 </svg>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0 text-center">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {[
                                                       { date: "12/19/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/20/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/21/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/22/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/23/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/24/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/25/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/26/2025", transactions: 0, amount: "$0.00" },
                                                       { date: "12/27/2025", transactions: 0, amount: "$0.00" },
                                                  ].map((row, index) => (
                                                       <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4 xl:px-0">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{row.date}</p>
                                                            </td>
                                                            <td className="py-4 px-4 xl:px-0">
                                                                 <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">{row.transactions}</p>
                                                            </td>
                                                            <td className="py-4 px-4 xl:px-0">
                                                                 <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">{row.amount}</p>
                                                            </td>
                                                            <td className="py-4 px-4 xl:px-0">
                                                                 <div className="flex justify-center">
                                                                      <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <circle cx="12" cy="12" r="3" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           </svg>
                                                                      </button>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                                  
                                                  {/* Total Row */}
                                                  <tr className="bg-bgray-100 dark:bg-darkblack-500">
                                                       <td className="py-4 px-4 xl:px-0" colSpan={2}>
                                                            <p className="font-bold text-sm text-bgray-900 dark:text-white text-right">Total Amount</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-bold text-sm text-bgray-900 dark:text-white">$0.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0"></td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Pagination */}
                                   <div className="flex justify-between items-center">
                                        <span className="text-sm text-bgray-600 dark:text-bgray-300">Records: 1 to 9 of 9</span>
                                        <div className="flex gap-2">
                                             <button type="button" className="px-3 py-1 rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-300 hover:bg-bgray-100 dark:hover:bg-darkblack-500">
                                                  &lt;
                                             </button>
                                             <button type="button" className="px-3 py-1 rounded bg-success-300 text-white font-semibold">
                                                  1
                                             </button>
                                             <button type="button" className="px-3 py-1 rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-300 hover:bg-bgray-100 dark:hover:bg-darkblack-500">
                                                  &gt;
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}