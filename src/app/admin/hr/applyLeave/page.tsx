"use client";
import React, { useState } from "react";

export default function Leaves() {
     const [openFilter, setOpenFilter] = useState<"export" | null>(null);

     const toggleFilter = (type: "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const [leaveRequests, setLeaveRequests] = useState([
          { id: 1, staff: "Joe Black", leaveType: "Medical Leave", leaveDate: "12/22/2025 - 12/24/2025", days: 3, applyDate: "12/22/2025", status: "Approved", reason: "Recovery from minor dental surgery." },
          { id: 2, staff: "Joe Black", leaveType: "Medical Leave", leaveDate: "11/22/2025 - 11/24/2025", days: 3, applyDate: "11/22/2025", status: "Approved", reason: "Severe fever and flu." },
          { id: 3, staff: "Joe Black", leaveType: "Medical Leave", leaveDate: "10/22/2025 - 10/23/2025", days: 3, applyDate: "10/22/2025", status: "Approved", reason: "Follow-up health screening." },
          { id: 4, staff: "Joe Black", leaveType: "Medical Leave", leaveDate: "09/22/2025 - 09/23/2025", days: 3, applyDate: "09/22/2025", status: "Approved", reason: "Routine check-up." },
          { id: 5, staff: "Joe Black", leaveType: "Medical Leave", leaveDate: "08/21/2025 - 08/23/2025", days: 3, applyDate: "08/21/2025", status: "Approved", reason: "Physical therapy session." }
     ]);

     const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
     const [showDetails, setShowDetails] = useState(false);
     const [showAddModal, setShowAddModal] = useState(false);

     const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
     const [addLeaveType, setAddLeaveType] = useState("");

     React.useEffect(() => {
          const fetchTypes = async () => {
               try {
                    const res = await fetch("/api/leave-type");
                    const json = await res.json();
                    if (json.success && json.data) {
                         setLeaveTypes(json.data);
                         if (json.data.length > 0) {
                              setAddLeaveType(json.data[0].name);
                         }
                    }
               } catch (error) {
                    console.error("Error fetching leave types:", error);
               }
          };
          fetchTypes();
     }, []);
     const [addFromDate, setAddFromDate] = useState("");
     const [addToDate, setAddToDate] = useState("");
     const [addReason, setAddReason] = useState("");

     const calculateDays = (from: string, to: string) => {
          if (!from || !to) return 1;
          const d1 = new Date(from);
          const d2 = new Date(to);
          const diffTime = Math.abs(d2.getTime() - d1.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          return diffDays;
     };

     const handleApplyLeave = (e: React.FormEvent) => {
          e.preventDefault();
          if (!addFromDate || !addToDate) return;
          const days = calculateDays(addFromDate, addToDate);

          const formatDate = (dateStr: string) => {
               const [y, m, d] = dateStr.split("-");
               return `${m}/${d}/${y}`;
          };

          const newRequest = {
               id: Date.now(),
               staff: "Joe Black",
               leaveType: addLeaveType,
               leaveDate: `${formatDate(addFromDate)} - ${formatDate(addToDate)}`,
               days,
               applyDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
               status: "Pending" as const,
               reason: addReason
          };

          setLeaveRequests([newRequest, ...leaveRequests]);
          setShowAddModal(false);
          if (leaveTypes.length > 0) {
               setAddLeaveType(leaveTypes[0].name);
          } else {
               setAddLeaveType("");
          }
          setAddFromDate("");
          setAddToDate("");
          setAddReason("");
     };

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Leaves Section */}
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

                                   
                              <button
                                   type="button"
                                   onClick={() => setShowAddModal(true)}
                                   className="px-6 py-2.5 text-nowrap text-sm font-semibold text-white bg-success-300 hover:bg-success-400 dark:bg-success-300 dark:hover:bg-success-400 rounded transition-all shadow-md shadow-success-300/10 uppercase tracking-wider font-bold"
                              >
                                   Apply Leave
                              </button>
                              </div>

                              {/* Table */}
                              <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
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
                                                       <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                            Action
                                                       </span>
                                                  </td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {leaveRequests.map((leave) => (
                                                  <tr
                                                       key={leave.id}
                                                       className="border-b border-bgray-300 dark:border-darkblack-400"
                                                  >
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {leave.staff}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {leave.leaveType}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {leave.leaveDate}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {leave.days}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {leave.applyDate}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="px-3 py-1.5 text-xs font-semibold text-white bg-green-500 rounded">
                                                                 {leave.status}
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
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
                                             <p className="text-sm text-bgray-600 dark:text-white">
                                                  Records: 1 to 5 of 5
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
                                                       className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-white"
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

               {/* Leave Details Modal */}
               {showDetails && selectedRequest && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setShowDetails(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[30px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 border border-success-300/10 p-8 space-y-6">
                              <div className="flex justify-between items-center border-b pb-4 border-bgray-100 dark:border-darkblack-400">
                                   <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Leave Request Details</h3>
                                   <button onClick={() => setShowDetails(false)} className="text-bgray-400 hover:text-red-500 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <div className="space-y-4">
                                   <div className="grid grid-cols-2 gap-4 bg-bgray-50 dark:bg-darkblack-550 p-4 rounded-xl">
                                        <div>
                                             <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block">Staff Member</span>
                                             <span className="text-sm font-bold text-bgray-900 dark:text-white">{selectedRequest.staff}</span>
                                        </div>
                                        <div>
                                             <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block">Leave Type</span>
                                             <span className="text-sm font-bold text-bgray-900 dark:text-white">{selectedRequest.leaveType}</span>
                                        </div>
                                        <div>
                                             <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block">Leave Date</span>
                                             <span className="text-sm font-bold text-bgray-900 dark:text-white">{selectedRequest.leaveDate}</span>
                                        </div>
                                        <div>
                                             <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block">Days Requested</span>
                                             <span className="text-sm font-bold text-bgray-900 dark:text-white">{selectedRequest.days} {selectedRequest.days === 1 ? 'Day' : 'Days'}</span>
                                        </div>
                                   </div>

                                   <div className="space-y-1">
                                        <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest font-bold">Reason for Leave</span>
                                        <p className="text-sm font-semibold text-bgray-600 dark:text-bgray-300 bg-bgray-50 dark:bg-darkblack-550 p-4 rounded-xl italic">
                                             "{selectedRequest.reason || "Urgent personal business requiring leave of absence."}"
                                        </p>
                                   </div>

                                   <div className="flex justify-between items-center bg-bgray-50 dark:bg-darkblack-550 p-4 rounded-xl">
                                        <span className="text-xs font-bold text-bgray-500 uppercase">Current Status</span>
                                        <span className={`px-3 py-1.5 text-xs font-black rounded uppercase tracking-wider ${
                                             selectedRequest.status === "Approved" ? "bg-green-500 text-white" :
                                             selectedRequest.status === "Pending" ? "bg-orange-500 text-white" : "bg-red-500 text-white"
                                        }`}>
                                             {selectedRequest.status}
                                        </span>
                                   </div>
                              </div>
                              <div className="flex justify-end gap-3 pt-4 border-t border-bgray-100 dark:border-darkblack-400">
                                   <button 
                                        onClick={() => setShowDetails(false)}
                                        className="px-6 h-12 bg-bgray-200 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-300 font-black rounded-xl hover:bg-bgray-300 transition-all text-xs uppercase tracking-widest w-full"
                                   >
                                        Close
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {/* Apply Leave Request Modal */}
               {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[35px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200 border border-success-300/10">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/50">
                                   <div>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Apply Leave</h3>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest">Submit a new leave application request</p>
                                   </div>
                                   <button onClick={() => setShowAddModal(false)} className="text-bgray-400 hover:text-red-500 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <form onSubmit={handleApplyLeave} className="p-6 space-y-4">
                                   <div className="space-y-1">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">Leave Type *</label>
                                        <select 
                                             value={addLeaveType} 
                                             onChange={e => setAddLeaveType(e.target.value)} 
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        >
                                             {leaveTypes.length === 0 ? (
                                                  <option value="">No Leave Types</option>
                                             ) : (
                                                  leaveTypes.map((type) => (
                                                       <option key={type._id} value={type.name}>{type.name}</option>
                                                  ))
                                             )}
                                        </select>
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">From Date *</label>
                                             <input 
                                                  type="date" 
                                                  required 
                                                  value={addFromDate} 
                                                  onChange={e => setAddFromDate(e.target.value)}
                                                  className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             />
                                        </div>
                                        <div className="space-y-1">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">To Date *</label>
                                             <input 
                                                  type="date" 
                                                  required 
                                                  value={addToDate} 
                                                  onChange={e => setAddToDate(e.target.value)}
                                                  className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             />
                                        </div>
                                   </div>
                                   <div className="space-y-1">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">Reason</label>
                                        <textarea 
                                             value={addReason} 
                                             onChange={e => setAddReason(e.target.value)}
                                             placeholder="Write reason for leave application..."
                                             rows={3}
                                             className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-xl p-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        />
                                   </div>
                                   <div className="flex justify-end gap-3 pt-4 border-t border-bgray-100 dark:border-darkblack-400">
                                        <button 
                                             type="button" 
                                             onClick={() => setShowAddModal(false)} 
                                             className="px-6 h-12 bg-bgray-200 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-300 font-black rounded-xl hover:bg-bgray-300 transition-all text-xs uppercase tracking-widest"
                                        >
                                             Discard
                                        </button>
                                        <button 
                                             type="submit" 
                                             className="px-8 h-12 bg-success-300 hover:bg-success-400 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-success-300/25"
                                        >
                                             Apply
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </>
     );
}