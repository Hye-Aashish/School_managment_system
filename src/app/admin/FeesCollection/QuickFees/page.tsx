"use client";
import React, { useState } from "react";

export default function QuickFeesMaster() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "student" | "monthlyDay" | "fineType" | null>(null);
     const [selectedFineType, setSelectedFineType] = useState<"none" | "fixAmount" | "percentage">("none");
     const [showInstallmentTable, setShowInstallmentTable] = useState(false);
     const [hasFees, setHasFees] = useState(false);

     const toggleFilter = (type: "class" | "section" | "student" | "monthlyDay" | "fineType") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleFineTypeChange = (value: "none" | "fixAmount" | "percentage") => {
          setSelectedFineType(value);
          setOpenFilter(null);
     };

     const handleViewInstallment = () => {
          setShowInstallmentTable(true);
     };

     return (
          <>
               <div className="w-full">
                    <section className="w-full">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Quick Fees Master
                              </h3>

                              {/* Top Filters */}
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                   {/* Class */}
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Class
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white">Class 2</span>
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
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Class 1
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Class 2
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Section */}
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Section
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white">A</span>
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
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            A
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            B
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Student */}
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Student
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                  onClick={() => toggleFilter("student")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white">
                                                       {hasFees ? "Ayan Desai (120036)" : "Kaylen (2152)"}
                                                  </span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "student" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            onClick={() => { setHasFees(false); setShowInstallmentTable(false); setOpenFilter(null); }}
                                                       >
                                                            Kaylen (2152)
                                                       </li>
                                                       <li
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            onClick={() => { setHasFees(true); setShowInstallmentTable(false); setOpenFilter(null); }}
                                                       >
                                                            Ayan Desai (120036)
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Conditional Rendering: Form or Table */}
                              {!hasFees ? (
                                   /* Form View - No Fees Assigned */
                                   <>
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                                             {/* Total Fees */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Total Fees <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value="1212"
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                  />
                                             </div>

                                             {/* 1st Installment */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       1st Installment
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value="1212"
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                  />
                                             </div>

                                             {/* Balance Fees */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Balance Fees <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value="0.00"
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                  />
                                             </div>

                                             {/* No. Of Installment */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       No. Of Installment <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value="1"
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                  />
                                             </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                                             {/* Monthly Day for Due date */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Monthly Day for Due date
                                                  </label>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                            onClick={() => toggleFilter("monthlyDay")}
                                                       >
                                                            <span className="text-base text-bgray-900 dark:text-white">1</span>
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
                                                            className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "monthlyDay" ? "block" : "hidden"
                                                                 }`}
                                                       >
                                                            <ul>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                      1
                                                                 </li>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                      5
                                                                 </li>
                                                                 <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                      10
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* Fine Type */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Fine Type
                                                  </label>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                            onClick={() => toggleFilter("fineType")}
                                                       >
                                                            <span className="text-base text-bgray-900 dark:text-white">
                                                                 {selectedFineType === "none" && "None"}
                                                                 {selectedFineType === "fixAmount" && "Fix Amount"}
                                                                 {selectedFineType === "percentage" && "Percentage"}
                                                            </span>
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
                                                            className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "fineType" ? "block" : "hidden"
                                                                 }`}
                                                       >
                                                            <ul>
                                                                 <li
                                                                      className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                                      onClick={() => handleFineTypeChange("none")}
                                                                 >
                                                                      None
                                                                 </li>
                                                                 <li
                                                                      className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                                      onClick={() => handleFineTypeChange("fixAmount")}
                                                                 >
                                                                      Fix Amount
                                                                 </li>
                                                                 <li
                                                                      className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                                      onClick={() => handleFineTypeChange("percentage")}
                                                                 >
                                                                      Percentage
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* Fine Type Value - Conditional */}
                                             {(selectedFineType === "fixAmount" || selectedFineType === "percentage") && (
                                                  <div className="w-full">
                                                       <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                            Fine Type Value <span className="text-red-500">*</span>
                                                       </label>
                                                       <input
                                                            type="number"
                                                            placeholder=""
                                                            className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500"
                                                       />
                                                  </div>
                                             )}

                                             {/* View Installment Button */}
                                             <div className={`w-full flex items-end ${selectedFineType !== "none" ? "" : "lg:col-start-4"}`}>
                                                  <button
                                                       type="button"
                                                       onClick={handleViewInstallment}
                                                       className="h-12 px-6 flex items-center justify-center text-white font-semibold bg-gray-900! dark:bg-darkblack-500 hover:bg-gray-800! dark:hover:bg-darkblack-600 transition-all rounded-lg"
                                                  >
                                                       View Installment
                                                  </button>
                                             </div>
                                        </div>

                                        {/* Installment Table - Shows after clicking View Installment */}
                                        {showInstallmentTable && (
                                             <div className="w-full mt-6 border-2 border-red-500 rounded-lg p-6">
                                                  <div className="table-content w-full overflow-x-auto">
                                                       <table className="w-full">
                                                            <thead>
                                                                 <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           Fees Group <span className="text-red-500">*</span>
                                                                      </td>
                                                                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           Fees Type <span className="text-red-500">*</span>
                                                                      </td>
                                                                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           Fees Code <span className="text-red-500">*</span>
                                                                      </td>
                                                                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           Due Date
                                                                      </td>
                                                                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           Fine Amount ($)
                                                                      </td>
                                                                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                           Amount ($) <span className="text-red-500">*</span>
                                                                      </td>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>
                                                                 {/* Row 1 */}
                                                                 <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-3 px-4" rowSpan={2}>
                                                                           <input
                                                                                type="text"
                                                                                value="210-2152-Kaylen"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="text"
                                                                                value="Kaylen (2152) - Installment-1"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="text"
                                                                                value="Kaylen (2152) - Installment-1"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="date"
                                                                                value="2025-12-01"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="number"
                                                                                value="12"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="number"
                                                                                value="1212"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                 </tr>

                                                                 {/* Row 2 */}
                                                                 <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="text"
                                                                                value="Kaylen (2152) - Installment-2"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="text"
                                                                                value="Kaylen (2152) - Installment-2"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="date"
                                                                                value="2026-01-01"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="number"
                                                                                value="12"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <input
                                                                                type="number"
                                                                                value="0"
                                                                                className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                           />
                                                                      </td>
                                                                 </tr>

                                                                 {/* Total Row */}
                                                                 <tr className="bg-bgray-100 dark:bg-darkblack-500">
                                                                      <td colSpan={5} className="py-3 px-4 text-right">
                                                                           <span className="text-sm font-semibold text-bgray-900 dark:text-white">Total Fees</span>
                                                                      </td>
                                                                      <td className="py-3 px-4">
                                                                           <span className="text-sm font-bold text-bgray-900 dark:text-white">$1212</span>
                                                                      </td>
                                                                 </tr>
                                                            </tbody>
                                                       </table>
                                                  </div>

                                                  {/* Save Button */}
                                                  <div className="flex justify-end mt-6">
                                                       <button
                                                            type="button"
                                                            className="px-6 py-2.5 flex items-center justify-center text-white font-semibold bg-red-600! hover:bg-red-700! transition-all rounded"
                                                       >
                                                            Save
                                                       </button>
                                                  </div>
                                             </div>
                                        )}
                                   </>
                              ) : (
                                   /* Table View - Fees Already Assigned */
                                   <>
                                        {/* Note Alert */}
                                        <div className="w-full mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                             <p className="text-sm text-blue-700 dark:text-blue-300">
                                                  Note: Fee Already Assigned
                                             </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 mb-4">
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H8.4M12 15V4M12 4L9 7M12 4L15 7" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                        </div>

                                        {/* Table */}
                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Fees Group</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Fees Type</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Fees Code</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Due Date</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Fine Amount ($)</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Amount ($)</td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4 align-top" rowSpan={5}>
                                                                 <p className="text-sm font-medium text-bgray-900 dark:text-white">211-120036-Ayan</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-1</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-1</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">04/10/2025</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">35.00</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">350.00</p>
                                                            </td>
                                                       </tr>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-2</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-2</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">05/10/2025</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">66.25</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">662.5</p>
                                                            </td>
                                                       </tr>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-3</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-3</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">06/10/2025</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">66.25</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">662.5</p>
                                                            </td>
                                                       </tr>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-4</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-4</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">07/10/2025</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">66.25</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">662.5</p>
                                                            </td>
                                                       </tr>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-5</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">Ayan Desai (120036) - Installment-5</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">08/10/2025</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">66.25</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">662.5</p>
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                        </div>

                                        {/* Unassign Fees Button */}
                                        <div className="flex justify-end mt-6">
                                             <button
                                                  type="button"
                                                  className="px-6 py-3 flex items-center justify-center text-white font-semibold bg-bgray-900 dark:bg-darkblack-500 hover:bg-bgray-800 dark:hover:bg-darkblack-600 transition-all rounded-lg"
                                             >
                                                  Unassign Fees
                                             </button>
                                        </div>
                                   </>
                              )}
                         </div>
                    </section>
               </div>
          </>
     );
}