"use client";
import React, { useState } from "react";

export default function StaffDirectory() {
     const [activeView, setActiveView] = useState<"card" | "list">("card");
     const [openFilter, setOpenFilter] = useState<"export" | "pagination" | null>(null);

     const toggleFilter = (type: "export" | "pagination") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const staffData = [
          {
               id: 1,
               name: "Joe Black",
               staffId: "9000",
               phone: "6545645645",
               location: "Ground Floor, Admin",
               roles: ["Super Admin", "Technical Head"],
               role: "Super Admin",
               department: "Admin",
               designation: "Technical Head",
               panNumber: "ALWPG5809L",
               image: "/placeholder-male.jpg",
          },
          {
               id: 2,
               name: "Shivam Verma",
               staffId: "9002",
               phone: "9552654564",
               location: "1st Floor, Academic",
               roles: ["Teacher", "Faculty"],
               role: "Teacher",
               department: "Academic",
               designation: "Faculty",
               panNumber: "RLWEG5809L",
               image: "/placeholder-male.jpg",
          },
          {
               id: 3,
               name: "Brandon Heart",
               staffId: "9006",
               phone: "34564654",
               location: "2nd Floor, Library",
               roles: ["Librarian", "Librarian"],
               role: "Librarian",
               department: "Library",
               designation: "Librarian",
               panNumber: "ALWPG5825H",
               image: "/placeholder-male.jpg",
          },
          {
               id: 4,
               name: "William Abbot",
               staffId: "9003",
               phone: "56465465",
               location: "Ground Floor, Admin",
               roles: ["Admin", "Principal"],
               role: "Admin",
               department: "Admin",
               designation: "Principal",
               panNumber: "ERTPG5809L",
               image: "/placeholder-male.jpg",
          },
          {
               id: 5,
               name: "Jason Sharlton",
               staffId: "90006",
               phone: "46546654564",
               location: "Ground Floor, Academic",
               roles: ["Teacher", "Faculty"],
               role: "Teacher",
               department: "Academic",
               designation: "Faculty",
               panNumber: "UIYEG5809L",
               image: "/placeholder-male.jpg",
          },
          {
               id: 6,
               name: "James Deckar",
               staffId: "9004",
               phone: "79786546463",
               location: "Ground Floor, Finance",
               roles: ["Accountant", "Accountant"],
               role: "Accountant",
               department: "Finance",
               designation: "Accountant",
               panNumber: "OLUOPG5809",
               image: "/placeholder-male.jpg",
          },
          {
               id: 7,
               name: "Maria Ford",
               staffId: "9005",
               phone: "8521479630",
               location: "Ground Floor, Academic",
               roles: ["Receptionist", "Receptionist"],
               role: "Receptionist",
               department: "Academic",
               designation: "Receptionist",
               panNumber: "QTWPG5809L",
               image: "/placeholder-female.jpg",
          },
          {
               id: 8,
               name: "Albert Thomas",
               staffId: "54545454",
               phone: "9522369875",
               location: "Mumbai, Maths",
               roles: ["Teacher", "Faculty"],
               role: "Teacher",
               department: "Maths",
               designation: "Faculty",
               panNumber: "AMB14ER",
               image: "/placeholder-male.jpg",
          },
          {
               id: 9,
               name: "Jonathan Wood",
               staffId: "6332",
               phone: "",
               location: "Academic",
               roles: ["Teacher", "Faculty"],
               role: "Teacher",
               department: "Academic",
               designation: "Faculty",
               panNumber: "234234",
               image: "/placeholder-avatar.jpg",
          },
          {
               id: 10,
               name: "Nishant Khare",
               staffId: "1002",
               phone: "9865757657",
               location: "",
               roles: ["Teacher"],
               role: "Teacher",
               department: "",
               designation: "",
               panNumber: "PAN5585789",
               image: "/placeholder-male.jpg",
          },
     ];

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Select Criteria Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex gap-4">
                              <div className="w-full">
                                   <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                        <option value="">Select Role</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                        <option value="librarian">Librarian</option>
                                   </select>
                              </div>
                              <div className="w-full">
                                   <input
                                        type="text"
                                        placeholder="Search By Staff ID, Name, Role etc..."
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                   />
                              </div>
                              <button
                                   type="button"
                                   className="px-6 text-nowrap py-2.5 flex items-center space-x-2 text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg"
                              >
                                   <span>
                                        <svg
                                             width="20"
                                             height="20"
                                             viewBox="0 0 20 20"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                        >
                                             <path
                                                  d="M10 4V16"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                             />
                                             <path
                                                  d="M4 10H16"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                             />
                                        </svg>
                                   </span>
                                   <span>Add Staff</span>
                              </button>
                         </div>
                    </div>

                    {/* View Toggle and Cards Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         {/* View Toggle */}
                         <div className="flex space-x-4 mb-6 border-b border-bgray-300 dark:border-darkblack-400">
                              <button
                                   type="button"
                                   onClick={() => setActiveView("card")}
                                   className={`pb-4 px-2 flex items-center space-x-2 font-semibold transition-all ${
                                        activeView === "card"
                                             ? "text-success-300 border-b-2 border-success-300"
                                             : "text-bgray-600 dark:text-bgray-400"
                                   }`}
                              >
                                   <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="2" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="11" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="11" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
                                   </svg>
                                   <span>Card View</span>
                              </button>
                              <button
                                   type="button"
                                   onClick={() => setActiveView("list")}
                                   className={`pb-4 px-2 flex items-center space-x-2 font-semibold transition-all ${
                                        activeView === "list"
                                             ? "text-success-300 border-b-2 border-success-300"
                                             : "text-bgray-600 dark:text-bgray-400"
                                   }`}
                              >
                                   <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path d="M3 4H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M3 16H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                   </svg>
                                   <span>List View</span>
                              </button>
                         </div>

                         {/* Staff Cards Grid */}
                         {activeView === "card" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                   {staffData.map((staff) => (
                                        <div
                                             key={staff.id}
                                             className="border border-bgray-300 dark:border-darkblack-400 rounded-lg overflow-hidden bg-white dark:bg-darkblack-500 hover:shadow-lg transition-all"
                                        >
                                             <div className="flex items-start p-4 space-x-4">
                                                  {/* Profile Image */}
                                                  <div className="w-24 h-24 rounded-lg bg-bgray-200 dark:bg-darkblack-600 flex-shrink-0 overflow-hidden">
                                                       <div className="w-full h-full flex items-center justify-center text-bgray-400 dark:text-bgray-600">
                                                            <svg
                                                                 width="48"
                                                                 height="48"
                                                                 viewBox="0 0 24 24"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                 <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                                 <path
                                                                      d="M5 20C5 16.134 8.134 13 12 13C15.866 13 19 16.134 19 20"
                                                                      stroke="currentColor"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                 />
                                                            </svg>
                                                       </div>
                                                  </div>

                                                  {/* Staff Info */}
                                                  <div className="flex-1 min-w-0">
                                                       <h4 className="font-bold text-base text-bgray-900 dark:text-white mb-1 truncate">
                                                            {staff.name}
                                                       </h4>
                                                       <p className="text-sm text-bgray-600 dark:text-bgray-400 mb-1">
                                                            {staff.staffId}
                                                       </p>
                                                       {staff.phone && (
                                                            <p className="text-sm text-bgray-600 dark:text-bgray-400 mb-2">
                                                                 {staff.phone}
                                                            </p>
                                                       )}
                                                       {staff.location && (
                                                            <p className="text-xs text-bgray-500 dark:text-bgray-400 mb-3">
                                                                 {staff.location}
                                                            </p>
                                                       )}
                                                       {/* Role Badges */}
                                                       <div className="flex flex-wrap gap-2">
                                                            {staff.roles.map((role, index) => (
                                                                 <span
                                                                      key={index}
                                                                      className="px-3 py-1 text-xs font-medium text-bgray-700 dark:text-bgray-300 bg-bgray-100 dark:bg-darkblack-400 rounded"
                                                                 >
                                                                      {role}
                                                                 </span>
                                                            ))}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         )}

                         {/* List View */}
                         {activeView === "list" && (
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
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Staff ID
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      Department
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      Designation
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      Mobile Number
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      PAN Number
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
                                                  {staffData.map((staff) => (
                                                       <tr
                                                            key={staff.id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {staff.staffId}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-success-300 hover:text-success-400 cursor-pointer">
                                                                      {staff.name}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {staff.role}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {staff.department}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {staff.designation}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {staff.phone}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {staff.panNumber}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-3">
                                                                      <button
                                                                           type="button"
                                                                           className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors"
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
                                                                           className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors"
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 18 18"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M13.5 2.25L15.75 4.5L5.25 15H3V12.75L13.5 2.25Z"
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
                                                       Records: 1 to 10 of 10
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
                         )}
                    </div>
               </div>
          </>
     );
}