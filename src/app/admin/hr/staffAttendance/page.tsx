"use client";
import React, { useState } from "react";

interface StaffAttendance {
     id: number;
     staffId: string;
     name: string;
     role: string;
     attendance: "present" | "late" | "absent" | "halfday" | "holiday" | "halfdaysecondshift";
     date: string;
     source: string;
     entryTime: string;
     exitTime: string;
     note: string;
}

export default function StaffAttendance() {
     const [selectAll, setSelectAll] = useState(false);
     const [bulkAttendance, setBulkAttendance] = useState<string>("");
     const [staffList, setStaffList] = useState<StaffAttendance[]>([
          {
               id: 1,
               staffId: "9003",
               name: "William Abbot",
               role: "Admin",
               attendance: "absent",
               date: "",
               source: "N/A",
               entryTime: "",
               exitTime: "",
               note: "",
          },
     ]);

     const handleSelectAll = () => {
          setSelectAll(!selectAll);
     };

     const handleBulkAttendanceChange = (value: string) => {
          setBulkAttendance(value);
     };

     const applyBulkAttendance = () => {
          if (bulkAttendance) {
               setStaffList(
                    staffList.map((staff) => ({
                         ...staff,
                         attendance: bulkAttendance as any,
                    }))
               );
          }
     };

     const handleIndividualAttendance = (id: number, value: string) => {
          setStaffList(
               staffList.map((staff) =>
                    staff.id === id ? { ...staff, attendance: value as any } : staff
               )
          );
     };

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Search Criteria */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex gap-4 mb-0">
                              <div className="w-full">
                                   <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                        <option value="admin">Admin</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="librarian">Librarian</option>
                                   </select>
                              </div>
                              <div className="w-full">
                                   <input
                                        type="date"
                                        defaultValue="2025-12-23"
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                   />
                              </div>
                              <button
                                   type="button"
                                   onClick={applyBulkAttendance}
                                   className="px-6 py-2.5 text-nowrap flex items-center space-x-2 text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg"
                              >
                                   <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M16.6663 5L7.49967 14.1667L3.33301 10"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                   </svg>
                                   <span>Save Attendance</span>
                              </button>
                         </div>
                    </div>

                    {/* Staff List Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">
                              Staff List
                         </h3>

                         {/* Bulk Attendance Selection */}
                         <div className="flex justify-between items-center mb-6 pb-4 border-b border-bgray-300 dark:border-darkblack-400">
                              <div className="flex items-center space-x-6">
                                   <span className="text-sm font-medium text-bgray-900 dark:text-white">
                                        Set attendance for all Staff as
                                   </span>
                                   <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                             <input
                                                  type="radio"
                                                  name="bulkAttendance"
                                                  value="present"
                                                  checked={bulkAttendance === "present"}
                                                  onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                  className="w-4 h-4 text-success-300 focus:ring-success-300"
                                             />
                                             <span className="text-sm text-bgray-900 dark:text-white">Present</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                             <input
                                                  type="radio"
                                                  name="bulkAttendance"
                                                  value="late"
                                                  checked={bulkAttendance === "late"}
                                                  onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                  className="w-4 h-4 text-success-300 focus:ring-success-300"
                                             />
                                             <span className="text-sm text-bgray-900 dark:text-white">Late</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                             <input
                                                  type="radio"
                                                  name="bulkAttendance"
                                                  value="absent"
                                                  checked={bulkAttendance === "absent"}
                                                  onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                  className="w-4 h-4 text-success-300 focus:ring-success-300"
                                             />
                                             <span className="text-sm text-bgray-900 dark:text-white">Absent</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                             <input
                                                  type="radio"
                                                  name="bulkAttendance"
                                                  value="halfday"
                                                  checked={bulkAttendance === "halfday"}
                                                  onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                  className="w-4 h-4 text-success-300 focus:ring-success-300"
                                             />
                                             <span className="text-sm text-bgray-900 dark:text-white">Half Day</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                             <input
                                                  type="radio"
                                                  name="bulkAttendance"
                                                  value="holiday"
                                                  checked={bulkAttendance === "holiday"}
                                                  onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                  className="w-4 h-4 text-success-300 focus:ring-success-300"
                                             />
                                             <span className="text-sm text-bgray-900 dark:text-white">Holiday</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                             <input
                                                  type="radio"
                                                  name="bulkAttendance"
                                                  value="halfdaysecondshift"
                                                  checked={bulkAttendance === "halfdaysecondshift"}
                                                  onChange={(e) => handleBulkAttendanceChange(e.target.value)}
                                                  className="w-4 h-4 text-success-300 focus:ring-success-300"
                                             />
                                             <span className="text-sm text-bgray-900 dark:text-white whitespace-nowrap">
                                                  Half Day Second Shift
                                             </span>
                                        </label>
                                   </div>
                              </div>
                         </div>

                         {/* Table */}
                         <div className="table-content w-full overflow-x-auto">
                              <table className="w-full">
                                   <thead>
                                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                             <td className="py-5 px-6 xl:px-0 w-[60px]">
                                                  <span className="text-base text-nowrap font-medium text-bgray-600 dark:text-bgray-50">
                                                       Sr. No.
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0">
                                                  <span className="text-base text-nowrap font-medium text-bgray-600 dark:text-bgray-50">
                                                       Staff ID
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0">
                                                  <div className="flex space-x-2.5 items-center">
                                                       <span className="text-base text-nowrap font-medium text-bgray-600 dark:text-bgray-50">
                                                            Name
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
                                                       Role
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0">
                                                  <div className="flex space-x-2.5 items-center">
                                                       <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                            Attendance
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
                                                            Date
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
                                                            Source
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
                                                            Entry Time
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
                                                            Exit Time
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
                                                       Note
                                                  </span>
                                             </td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {staffList.map((staff, index) => (
                                             <tr
                                                  key={staff.id}
                                                  className="border-b border-bgray-300 dark:border-darkblack-400"
                                             >
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                            {index + 1}
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                            {staff.staffId}
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                            {staff.name}
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                            {staff.role}
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex flex-wrap gap-3">
                                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                                 <input
                                                                      type="radio"
                                                                      name={`attendance-${staff.id}`}
                                                                      value="present"
                                                                      checked={staff.attendance === "present"}
                                                                      onChange={(e) =>
                                                                           handleIndividualAttendance(
                                                                                staff.id,
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                      className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                 />
                                                                 <span className="text-sm text-bgray-900 dark:text-white">
                                                                      Present
                                                                 </span>
                                                            </label>
                                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                                 <input
                                                                      type="radio"
                                                                      name={`attendance-${staff.id}`}
                                                                      value="late"
                                                                      checked={staff.attendance === "late"}
                                                                      onChange={(e) =>
                                                                           handleIndividualAttendance(
                                                                                staff.id,
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                      className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                 />
                                                                 <span className="text-sm text-bgray-900 dark:text-white">
                                                                      Late
                                                                 </span>
                                                            </label>
                                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                                 <input
                                                                      type="radio"
                                                                      name={`attendance-${staff.id}`}
                                                                      value="absent"
                                                                      checked={staff.attendance === "absent"}
                                                                      onChange={(e) =>
                                                                           handleIndividualAttendance(
                                                                                staff.id,
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                      className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                 />
                                                                 <span className="text-sm text-bgray-900 dark:text-white">
                                                                      Absent
                                                                 </span>
                                                            </label>
                                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                                 <input
                                                                      type="radio"
                                                                      name={`attendance-${staff.id}`}
                                                                      value="halfday"
                                                                      checked={staff.attendance === "halfday"}
                                                                      onChange={(e) =>
                                                                           handleIndividualAttendance(
                                                                                staff.id,
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                      className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                 />
                                                                 <span className="text-sm text-bgray-900 dark:text-white">
                                                                      Half Day
                                                                 </span>
                                                            </label>
                                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                                 <input
                                                                      type="radio"
                                                                      name={`attendance-${staff.id}`}
                                                                      value="holiday"
                                                                      checked={staff.attendance === "holiday"}
                                                                      onChange={(e) =>
                                                                           handleIndividualAttendance(
                                                                                staff.id,
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                      className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                 />
                                                                 <span className="text-sm text-bgray-900 dark:text-white">
                                                                      Holiday
                                                                 </span>
                                                            </label>
                                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                                 <input
                                                                      type="radio"
                                                                      name={`attendance-${staff.id}`}
                                                                      value="halfdaysecondshift"
                                                                      checked={staff.attendance === "halfdaysecondshift"}
                                                                      onChange={(e) =>
                                                                           handleIndividualAttendance(
                                                                                staff.id,
                                                                                e.target.value
                                                                           )
                                                                      }
                                                                      className="w-4 h-4 text-success-300 focus:ring-success-300"
                                                                 />
                                                                 <span className="text-sm text-bgray-900 dark:text-white whitespace-nowrap">
                                                                      Half Day Second Shift
                                                                 </span>
                                                            </label>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                            {staff.date}
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                            {staff.source}
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <input
                                                            type="text"
                                                            value={staff.entryTime}
                                                            className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       />
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <input
                                                            type="text"
                                                            value={staff.exitTime}
                                                            className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       />
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <input
                                                            type="text"
                                                            value={staff.note}
                                                            className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       />
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </>
     );
}