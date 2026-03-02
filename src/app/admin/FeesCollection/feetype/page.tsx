"use client";
import React, { useState } from "react";

export default function FeeType() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample data for fees types
     const feesTypes = [
          { name: "1st Installment Fees", code: "1-installment-fees" },
          { name: "2nd Installment Fees", code: "2-installment-fees" },
          { name: "3rd Installment Fees", code: "3-installment-fees" },
          { name: "4th Installment Fees", code: "4-installment-fees" },
          { name: "5th Installment Fees", code: "5-installment-fees" },
          { name: "6th Installment Fees", code: "6-installment-fees" },
          { name: "April Month Fees", code: "apr-month-fees" },
          { name: "August Month Fees", code: "aug-month-fees" },
          { name: "Bus-fees", code: "Bus-fees" },
          { name: "Caution Money Fees", code: "caution-money-fees" },
          { name: "Certificate fee", code: "Cert-Fee" },
          { name: "December Month Fees", code: "dec-month-fees" },
          { name: "Exam Fees", code: "exam-fees" },
          { name: "February Month Fees", code: "feb-month-fees" },
          { name: "January Month Fees", code: "jan-month-fees" },
          { name: "July Month Fees", code: "jul-month-fees" },
          { name: "June Month Fees", code: "jun-month-fees" },
          { name: "March Month Fees", code: "march-month-fees" },
          { name: "May Month Fees", code: "may-month-fees" },
          { name: "September Month Fees", code: "sep-month-fees" },
          { name: "October Month Fees", code: "oct-month-fees" },
          { name: "November Month Fees", code: "nov-month-fees" },
          { name: "Lumpsum fees", code: "lumpsum-fees" }
     ];

     return (
          <>
               <div className="w-full">
                    <section className="w-full">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Fees Type Form */}
                              <div className="w-full lg:max-w-[380px] py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        Add Fees Type
                                   </h3>
                                   <div className="flex flex-col space-y-5">
                                        {/* Name */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Name <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  placeholder=""
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500"
                                             />
                                        </div>

                                        {/* Fees Code */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Fees Code <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  placeholder=""
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500"
                                             />
                                        </div>

                                        {/* Description */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Description
                                             </label>
                                             <textarea
                                                  rows={5}
                                                  placeholder=""
                                                  className="w-full rounded-lg bg-white dark:bg-darkblack-500 px-4 py-3 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500 resize-none"
                                             ></textarea>
                                        </div>

                                        {/* Save Button */}
                                        <button
                                             type="button"
                                             className="py-3 px-6 flex items-center justify-center text-white font-semibold bg-gray-900! dark:bg-darkblack-500 hover:bg-gray-800! dark:hover:bg-darkblack-600 transition-all rounded-lg self-end"
                                        >
                                             Save
                                        </button>
                                   </div>
                              </div>

                              {/* Fees Type List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        Fees Type List
                                   </h3>
                                   <div className="flex flex-col space-y-5">
                                        {/* Search and Export */}
                                        <div className="w-full flex gap-4">
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
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Name</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Fees Code</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {feesTypes.map((fee, index) => (
                                                            <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-900 dark:text-white">{fee.name}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{fee.code}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <div className="flex items-center gap-3">
                                                                           <button className="text-bgray-900 dark:text-white hover:text-blue-500">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                           </button>
                                                                           <button className="text-bgray-900 dark:text-white hover:text-red-500">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                             <div className="w-full flex lg:justify-between justify-center items-center">
                                                  <div className="lg:flex hidden items-center">
                                                       <span className="text-sm text-bgray-600 dark:text-bgray-50">
                                                            Records: 1 to {feesTypes.length} of {feesTypes.length}
                                                       </span>
                                                  </div>
                                                  <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                                       <button type="button" className="text-bgray-400 hover:text-bgray-900 dark:hover:text-white">
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
                                                                           stroke="currentColor"
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
                                                                 className="rounded-lg text-white lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-bgray-900 dark:bg-darkblack-500"
                                                            >
                                                                 1
                                                            </button>
                                                       </div>
                                                       <button type="button" className="text-bgray-400 hover:text-bgray-900 dark:hover:text-white">
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
                                                                           stroke="currentColor"
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
                    </section>
               </div>
          </>
     );
}