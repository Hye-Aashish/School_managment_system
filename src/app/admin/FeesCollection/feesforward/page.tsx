"use client";
import React, { useState } from "react";

export default function FeesForward() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | null>(null);

     const toggleFilter = (type: "class" | "section") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample data for students
     const students = [
          { name: "Anubhav Sharma", admissionNo: "2002", admissionDate: "12/02/2025", rollNumber: "202", fatherName: "Jay kumar", balance: "5.00" },
          { name: "Ashwani Kumar", admissionNo: "120020", admissionDate: "04/01/2025", rollNumber: "100020", fatherName: "Arjun Kumar", balance: "0.00" },
          { name: "Edward Thomas", admissionNo: "18001", admissionDate: "04/04/2025", rollNumber: "100035", fatherName: "Olivier Thomas", balance: "0.00" },
          { name: "Edward Thomas", admissionNo: "19001", admissionDate: "03/18/2021", rollNumber: "201", fatherName: "Olivier Thomas", balance: "0.00" },
          { name: "Georgia Wareham", admissionNo: "25001", admissionDate: "10/10/2025", rollNumber: "32005", fatherName: "Zakary Foulkes", balance: "0.00" },
          { name: "James Bennett", admissionNo: "659990", admissionDate: "12/10/2025", rollNumber: "549900", fatherName: "David Wilson", balance: "0.00" },
          { name: "Nehal Wadhera", admissionNo: "125005", admissionDate: "05/05/2025", rollNumber: "32001", fatherName: "Karun wadhera", balance: "0.00" },
          { name: "Steven Taylor", admissionNo: "10024", admissionDate: "07/02/2025", rollNumber: "20026", fatherName: "Jason Taylor", balance: "0.00" },
          { name: "xavier bartlett", admissionNo: "520039", admissionDate: "04/02/2025", rollNumber: "120025", fatherName: "David bartlett", balance: "0.00" }
     ];

     return (
          <>
               <div className="w-full">
                    <section className="w-full">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              {/* Select Criteria */}
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Select Criteria
                              </h3>

                              <div className="flex items-end gap-4 mb-8">
                                   {/* Class */}
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white">Class 1</span>
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
                                             Section <span className="text-red-500">*</span>
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
                              </div>

                              {/* Previous Session Balance Fees */}
                              <div className="mb-6">
                                   <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Previous Session Balance Fees
                                        </h3>
                                        <div className="text-sm">
                                             <span className="text-bgray-600 dark:text-bgray-300">Due Date: </span>
                                             <span className="text-red-500 font-semibold">02/09/2026</span>
                                        </div>
                                   </div>

                                   {/* Info Alert */}
                                   <div className="w-full mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                             Previous Balance Already Forwarded, You Can Only Update Now.
                                        </p>
                                   </div>

                                   {/* Search Bar and Export */}
                                   <div className="w-full flex gap-4 mb-5">
                                        <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                             <div className="flex w-full h-14 items-center space-x-[15px]">
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
                                        <div className="flex items-center gap-3">
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M8 17C8 17 8 16 8 14C8 12 7 11 5 11H4M8 17V20M8 17H16M16 17C16 17 16 16 16 14C16 12 17 11 19 11H20M16 17V20M4 11V8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V11M4 11H3M20 11H21" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M7 21H17C18.1046 21 19 20.1046 19 19V9.41421C19 9.149 18.8946 8.89464 18.7071 8.70711L13.2929 3.29289C13.1054 3.10536 12.851 3 12.5858 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H8.4M12 15V4M12 4L9 7M12 4L15 7" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="w-10 h-10 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-colors">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Student Name</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Admission No</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Admission Date</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Roll Number</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Father Name</td>
                                                       <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Balance ($)</td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {students.map((student, index) => (
                                                       <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-3 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-white">{student.name}</p>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.admissionNo}</p>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.admissionDate}</p>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.rollNumber}</p>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                 <p className="text-sm text-bgray-700 dark:text-bgray-300">{student.fatherName}</p>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                 <input
                                                                      type="number"
                                                                      value={student.balance}
                                                                      className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                                 />
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Save Button */}
                                   <div className="flex justify-end mt-6">
                                        <button
                                             type="button"
                                             className="px-8 py-3 flex items-center justify-center text-white font-semibold bg-gray-900! dark:bg-darkblack-500 hover:bg-gray-800! dark:hover:bg-darkblack-600 transition-all rounded-lg"
                                        >
                                             Save
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}