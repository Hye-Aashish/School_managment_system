"use client";
import React, { useState } from "react";

export default function ApproveLeaveRequest() {
     const [openFilter, setOpenFilter] = useState<"export" | null>(null);

     const toggleFilter = (type: "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const leaveRequests = [
          {
               id: 1,
               staff: "Nishant Khare (1002)",
               leaveType: "Casual Leave",
               leaveDate: "12/03/2025 - 12/03/2025",
               days: 1,
               applyDate: "12/02/2025",
               status: "Approved",
          },
          {
               id: 2,
               staff: "Jason Sharlton (90006)",
               leaveType: "Medical Leave",
               leaveDate: "12/11/2025 - 12/13/2025",
               days: 3,
               applyDate: "12/11/2025",
               status: "Approved",
          },
          {
               id: 3,
               staff: "Joe Black (9000)",
               leaveType: "Medical Leave",
               leaveDate: "12/22/2025 - 12/24/2025",
               days: 3,
               applyDate: "12/22/2025",
               status: "Approved",
          },
          {
               id: 4,
               staff: "James Deckar (9004)",
               leaveType: "Maternity Leave",
               leaveDate: "12/17/2025 - 12/22/2025",
               days: 5,
               applyDate: "12/17/2025",
               status: "Pending",
          },
          {
               id: 5,
               staff: "William Abbot (9003)",
               leaveType: "Medical Leave",
               leaveDate: "12/06/2025 - 12/10/2025",
               days: 4,
               applyDate: "12/06/2025",
               status: "Approved",
          },
          {
               id: 6,
               staff: "Jason Sharlton (90006)",
               leaveType: "Medical Leave",
               leaveDate: "11/11/2025 - 11/13/2025",
               days: 3,
               applyDate: "11/11/2025",
               status: "Pending",
          },
          {
               id: 7,
               staff: "Joe Black (9000)",
               leaveType: "Medical Leave",
               leaveDate: "11/22/2025 - 11/24/2025",
               days: 3,
               applyDate: "11/22/2025",
               status: "Approved",
          },
          {
               id: 8,
               staff: "James Deckar (9004)",
               leaveType: "Maternity Leave",
               leaveDate: "11/17/2025 - 11/22/2025",
               days: 5,
               applyDate: "11/17/2025",
               status: "Pending",
          },
          {
               id: 9,
               staff: "William Abbot (9003)",
               leaveType: "Medical Leave",
               leaveDate: "11/06/2025 - 11/10/2025",
               days: 4,
               applyDate: "11/06/2025",
               status: "Approved",
          },
          {
               id: 10,
               staff: "Jason Sharlton (90006)",
               leaveType: "Medical Leave",
               leaveDate: "10/11/2025 - 10/13/2025",
               days: 3,
               applyDate: "10/11/2025",
               status: "Pending",
          },
          {
               id: 11,
               staff: "Joe Black (9000)",
               leaveType: "Medical Leave",
               leaveDate: "10/22/2025 - 10/23/2025",
               days: 3,
               applyDate: "10/22/2025",
               status: "Approved",
          },
          {
               id: 12,
               staff: "James Deckar (9004)",
               leaveType: "Maternity Leave",
               leaveDate: "10/16/2025 - 10/22/2025",
               days: 5,
               applyDate: "10/16/2025",
               status: "Approved",
          },
          {
               id: 13,
               staff: "William Abbot (9003)",
               leaveType: "Medical Leave",
               leaveDate: "10/06/2025 - 10/09/2025",
               days: 4,
               applyDate: "10/06/2025",
               status: "Approved",
          },
          {
               id: 14,
               staff: "Jason Sharlton (90006)",
               leaveType: "Medical Leave",
               leaveDate: "09/11/2025 - 09/12/2025",
               days: 3,
               applyDate: "09/11/2025",
               status: "Pending",
          },
          {
               id: 15,
               staff: "Joe Black (9000)",
               leaveType: "Medical Leave",
               leaveDate: "09/22/2025 - 09/23/2025",
               days: 3,
               applyDate: "09/22/2025",
               status: "Approved",
          },
          {
               id: 16,
               staff: "James Deckar (9004)",
               leaveType: "Maternity Leave",
               leaveDate: "09/16/2025 - 09/22/2025",
               days: 5,
               applyDate: "09/16/2025",
               status: "Approved",
          },
          {
               id: 17,
               staff: "William Abbot (9003)",
               leaveType: "Medical Leave",
               leaveDate: "09/05/2025 - 09/09/2025",
               days: 4,
               applyDate: "09/05/2025",
               status: "Approved",
          },
          {
               id: 18,
               staff: "Joe Black (9000)",
               leaveType: "Medical Leave",
               leaveDate: "08/21/2025 - 08/23/2025",
               days: 3,
               applyDate: "08/21/2025",
               status: "Approved",
          },
          {
               id: 19,
               staff: "James Deckar (9004)",
               leaveType: "Maternity Leave",
               leaveDate: "08/16/2025 - 08/21/2025",
               days: 5,
               applyDate: "08/16/2025",
               status: "Approved",
          },
     ];

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Leave Request Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex flex-col space-y-5">
                              {/* Search and Export */}
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

                                   {/* Export Dropdown */}
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 relative dark:bg-darkblack-500"
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

                                   <button
                                        type="button"
                                        className="px-6 py-2.5 text-sm font-semibold text-white text-nowrap bg-bgray-600 hover:bg-bgray-600 dark:bg-bgray-600 dark:hover:bg-bgray-700 rounded transition-all"
                                   >
                                        Add Leave Request
                                   </button>
                              </div>

                              {/* Table */}
                              <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Staff
                                                            </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Leave Type
                                                            </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Leave Date
                                                            </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Days
                                                            </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Apply Date
                                                            </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Status
                                                            </span>
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
                                                       <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                            Action
                                                       </span>
                                                  </td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {leaveRequests.map((request) => (
                                                  <tr
                                                       key={request.id}
                                                       className="border-b border-bgray-300 dark:border-darkblack-400"
                                                  >
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 {request.staff}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 {request.leaveType}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 {request.leaveDate}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 {request.days}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                 {request.applyDate}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span
                                                                 className={`px-3 py-1.5 text-xs font-semibold text-white rounded ${request.status === "Approved"
                                                                           ? "bg-green-500"
                                                                           : "bg-orange-500"
                                                                      }`}
                                                            >
                                                                 {request.status}
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex items-center space-x-3">
                                                                 <button
                                                                      type="button"
                                                                      className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors"
                                                                      title="View Details"
                                                                 >
                                                                      <svg
                                                                           width="18"
                                                                           height="18"
                                                                           viewBox="0 0 18 18"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M2 4H4H16"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M2 7H16"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M2 10H16"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </button>
                                                                 <button
                                                                      type="button"
                                                                      className="text-bgray-900 dark:text-white hover:text-red-500 transition-colors"
                                                                      title="Delete"
                                                                 >
                                                                      <svg
                                                                           width="18"
                                                                           height="18"
                                                                           viewBox="0 0 18 18"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M13.5 4.5L4.5 13.5"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M4.5 4.5L13.5 13.5"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>

                              {/* Records Info and Pagination */}
                              <div className="pagination-content w-full">
                                   <div className="w-full flex lg:justify-between justify-center items-center">
                                        <div className="lg:flex hidden">
                                             <p className="text-sm text-bgray-600 dark:text-bgray-50">
                                                  Records: 1 to 19 of 19
                                             </p>
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
               </div>
          </>
     );
}