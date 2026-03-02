"use client";
import React, { useState } from "react";

export default function StudentCategory() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | "export" | null>(null);

     const toggleFilter = (type: "class" | "section" | "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Overview Header */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex justify-between items-center">
                                   <h2 className="text-xl font-bold text-bgray-900 dark:text-white">Overview</h2>
                                   <button
                                        type="button"
                                        className="px-4 py-2 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all"
                                   >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M6 9L6 2L18 2V9M6 9H4M6 9H18M18 9H20M4 9L2 21L5 22H19L22 21L20 9M9 19V14H15V19" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                   </button>
                              </div>
                         </div>

                         {/* Fees Details */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Fees Details</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Current Session</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Students</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Fees</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Paid Fees</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Balance Fees</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">66</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$6,39,800.02</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$82,720.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$5,57,080.02</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">15</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$42,750.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,980.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$39,770.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">11</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$21,750.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,200.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$19,550.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">14</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$48,050.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$3,550.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$44,500.00</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* Transport Fees Details */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Transport Fees Details</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Current Session</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Fees</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Paid Fees</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Balance Fees</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$32,850.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,420.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$30,430.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,950.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$100.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,850.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$4,550.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$100.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$4,450.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,850.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$50.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$2,800.00</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* Student Admission */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Student Admission</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Current Session</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Offline Admission</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Online Admission</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">14</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2025-26</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* Library Details */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Library Details</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Books</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Members</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Book Issued</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* Alumni Students */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Alumni Students</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Alumni Students</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">4</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">5</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* Staff Payroll Of November */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Staff Payroll Of November</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Staff</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Payroll Generated</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Payroll Not Generated</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Payroll Paid</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Net Amount</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Paid Amount</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">10</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$1,50,230.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$1,35,240.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">0</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">0</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$0.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$0.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">0</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">0</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$0.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$0.00</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">8</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">0</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">8</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">0</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$0.00</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">$0.00</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* Staff Attendance Details At 12/16/2025 */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Staff Attendance Details At 12/16/2025</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total Staff</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Present</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Absent</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">10</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">7</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                  </tr>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">8</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">-</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>

                         {/* User Log Details */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">User Log Details</h3>
                                   
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Total User Log</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Home Branch</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">176</p>
                                                       </td>
                                                  </tr>
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