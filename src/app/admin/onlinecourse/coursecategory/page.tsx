"use client";
import React, { useEffect, useState } from "react";

export default function AddCategory() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [categoryName, setCategoryName] = useState("");

     // Sample category data
     const categories = [
          { id: 1, name: "Personal Development" },
          { id: 2, name: "Health & Fitness Courses" },
          { id: 3, name: "Network & Security Course" },
          { id: 4, name: "Lifestyle course" },
          { id: 5, name: "UPGRADE SKILL" },
          { id: 6, name: "Business Marketing" }
     ];

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSaveCategory = () => {
          if (categoryName.trim()) {
               console.log("Saving category:", categoryName);
               // Add your save logic here
               setCategoryName("");
          }
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Category Section */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 lg:max-w-[400px]">
                                   <h2 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">Add Category</h2>
                                   <div className="flex flex-col space-y-5">
                                        <div className="w-full space-y-4">
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Category Name <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={categoryName}
                                                       onChange={(e) => setCategoryName(e.target.value)}
                                                       placeholder="Enter category name"
                                                       className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                  />
                                             </div>
                                             <button
                                                  type="button"
                                                  onClick={handleSaveCategory}
                                                  className="py-3.5 flex items-center justify-center text-white font-bold bg-bgray-500 hover:bg-bgray-600 transition-all rounded-lg w-full"
                                             >
                                                  Save
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Category List Section */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h2 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">Category List</h2>
                                   <div className="flex flex-col space-y-5">
                                        <div className="w-full flex h-14 space-x-4">
                                             <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                                 className="search-input w-full bg-bgray-100 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                            />
                                                       </label>
                                                  </div>
                                             </div>

                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="h-full rounded-lg bg-bgray-100 px-4 flex justify-between items-center gap-2 dark:bg-darkblack-500"
                                                       onClick={() => toggleFilter("export")}
                                                  >
                                                       Filter
                                                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13 11H18L12 3V8C12 9.65685 13.3431 11 15 11H13Z" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M13 11C13 9.34315 14.3431 8 16 8H18" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       </svg>
                                                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 9L12 16L5 9" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       </svg>
                                                  </button>

                                                  <div
                                                       className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all min-w-[120px] ${openFilter === "export" ? "block" : "hidden"}`}
                                                  >
                                                       <ul>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold flex items-center gap-2">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <rect x="3" y="3" width="18" height="18" rx="2" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5"/>
                                                                 </svg>
                                                                 Copy
                                                            </li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold flex items-center gap-2">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M3 9h18M3 15h18" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5"/>
                                                                 </svg>
                                                                 Excel
                                                            </li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold flex items-center gap-2">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5"/>
                                                                 </svg>
                                                                 CSV
                                                            </li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold flex items-center gap-2">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5"/>
                                                                 </svg>
                                                                 PDF
                                                            </li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold flex items-center gap-2">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M6 9l6 6 6-6" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5"/>
                                                                 </svg>
                                                                 Print
                                                            </li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-semibold text-bgray-600 dark:text-bgray-50">Category Name</span>
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
                                                            <td className="py-5 px-6 xl:px-0 text-right">
                                                                 <span className="text-base font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {categories.map((category) => (
                                                            <tr key={category.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                           {category.name}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex justify-end gap-3">
                                                                           <button
                                                                                type="button"
                                                                                className="hover:text-success-300 transition-colors"
                                                                                title="Edit"
                                                                           >
                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button
                                                                                type="button"
                                                                                className="hover:text-red-500 transition-colors"
                                                                                title="Delete"
                                                                           >
                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M18 6L6 18M6 6l12 12" className="stroke-bgray-900 dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>

                                        <div className="pagination-content w-full">
                                             <div className="w-full flex justify-between items-center text-sm text-bgray-600 dark:text-bgray-50">
                                                  <span>Records: 1 to 6 of 6</span>
                                                  <div className="flex items-center gap-2">
                                                       <button
                                                            type="button"
                                                            className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded"
                                                            disabled
                                                       >
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M15 18l-6-6 6-6" className="stroke-bgray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                       </button>
                                                       <span className="px-3 py-1 bg-bgray-100 dark:bg-darkblack-500 rounded font-semibold">1</span>
                                                       <button
                                                            type="button"
                                                            className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded"
                                                       >
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9 18l6-6-6-6" className="stroke-bgray-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
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