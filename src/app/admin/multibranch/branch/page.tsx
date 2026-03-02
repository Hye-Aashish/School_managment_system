"use client";
import React, { useState } from "react";

export default function Settings() {
     const [openFilter, setOpenFilter] = useState<"entries" | null>(null);

     const toggleFilter = (type: "entries") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Settings Header */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <h2 className="text-xl font-bold text-bgray-900 dark:text-white">Setting</h2>
                         </div>

                         {/* Settings Table */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Top Bar */}
                                   <div className="flex justify-between items-center flex-wrap gap-4">
                                        {/* Search */}
                                        <div className="flex-1 max-w-xs">
                                             <input
                                                  type="text"
                                                  placeholder="Search..."
                                                  className="w-full px-4 py-2 bg-bgray-100 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white placeholder:text-bgray-500"
                                             />
                                        </div>

                                        {/* Right Side Actions */}
                                        <div className="flex items-center gap-3">
                                             {/* Entries Dropdown */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="px-4 py-2 bg-bgray-100 dark:bg-darkblack-500 rounded-lg border border-bgray-300 dark:border-darkblack-400 flex items-center gap-2 hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all"
                                                       onClick={() => toggleFilter("entries")}
                                                  >
                                                       <span className="text-sm font-medium text-bgray-900 dark:text-white">100</span>
                                                       <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       </svg>
                                                  </button>

                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-12 overflow-hidden transition-all ${openFilter === "entries" ? "block" : "hidden"}`}>
                                                       <ul>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">10</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">25</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">50</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">100</li>
                                                       </ul>
                                                  </div>
                                             </div>

                                             {/* Action Icons */}
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

                                             {/* Add New Button */}
                                             <button
                                                  type="button"
                                                  className="px-4 py-2 flex items-center gap-2 text-white font-semibold bg-success-300 hover:bg-success-400 transition-all rounded-lg"
                                             >
                                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                                  Add New
                                             </button>
                                        </div>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Branch</span>
                                                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M7 2V12M7 2L3 6M7 2L11 6" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 </svg>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">URL</span>
                                                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M7 2V12M7 2L3 6M7 2L11 6" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 </svg>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0 text-right">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 1</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">https://demo.smart-school.in/branch1/</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex justify-end gap-2">
                                                                 <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                                 <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M6 18L18 6M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>

                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 2</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">https://demo.smart-school.in/branch2/</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex justify-end gap-2">
                                                                 <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                                 <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M6 18L18 6M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>

                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">Mount Carmel School 3</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">https://demo.smart-school.in/branch3/</p>
                                                       </td>
                                                       <td className="py-4 px-4 xl:px-0">
                                                            <div className="flex justify-end gap-2">
                                                                 <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                                 <button type="button" className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all">
                                                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M6 18L18 6M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Footer */}
                                   <div className="flex justify-between items-center flex-wrap gap-4">
                                        <span className="text-sm text-bgray-600 dark:text-bgray-300">Records: 1 to 3 of 3</span>
                                        
                                        <div className="flex items-center gap-2">
                                             <button type="button" className="px-3 py-1 rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-300 hover:bg-bgray-100 dark:hover:bg-darkblack-500 disabled:opacity-50" disabled>
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

                                   {/* Version */}
                                   <div className="flex justify-end">
                                        <span className="text-sm text-bgray-500 dark:text-bgray-400">Version 3.0</span>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}