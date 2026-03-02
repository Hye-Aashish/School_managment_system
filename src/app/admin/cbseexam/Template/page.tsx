"use client";
import React, { useState } from "react";

export default function TemplateList() {
     const templateData = [
          { template: "Monthly Test Template (Single exam without term )", classSections: "Class 1: A, B, C, D", description: "" },
          { template: "Assessment Template (Single exam without term )", classSections: "Class 2: A, B, C, D", description: "" },
          { template: "All Term Test Template", classSections: "Class 5: A, B, C, D", description: "" },
          { template: "Periodic Singlewise Test Template", classSections: "Class 1: A, B, C, D", description: "" },
          { template: "Subject Test Template (Single exam without term )", classSections: "Class 5: A, B, C, D", description: "" },
          { template: "Assessment Template (multiple exams without term )", classSections: "Class 1: A, B, C, D", description: "" },
          { template: "Subject wise template (Multiple exams without term )", classSections: "Class 5: A, B, C, D", description: "" },
          { template: "Periodic Test Template (Single exam without term )", classSections: "Class 5: A, B, C, D", description: "" },
          { template: "Assessment Test Template ( Term Wise exam )", classSections: "Class 1: A, B, C, D", description: "" },
          { template: "Single Assessment Template (Single exam without term )", classSections: "Class 1: A, B, C, D", description: "" },
          { template: "Online Test Template (Single exam without term )", classSections: "Class 2: A, B, C, D", description: "" },
          { template: "Periodic Term-end Exams (Single exam without term )", classSections: "Class 1: A, B, C, D", description: "" },
          { template: "Weekly Test", classSections: "Class 1: A", description: "" },
          { template: "Template", classSections: "Class 1: A, B, C, D", description: "" }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">

                                   {/* Search Bar and Export Icons */}
                                   <div className="w-full flex justify-between items-center space-x-4">
                                        <div className="w-full border border-transparent focus-within:border-success-300 h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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

                                        {/* Export Icons */}
                                        <div className="flex items-center space-x-3">
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Copy">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M13.3333 10.75V14.25C13.3333 14.6642 13.1577 15.0617 12.8452 15.3562C12.5326 15.6507 12.1087 15.8167 11.6667 15.8167H5.83333C5.39131 15.8167 4.96738 15.6507 4.65482 15.3562C4.34226 15.0617 4.16667 14.6642 4.16667 14.25V8.58333C4.16667 8.16922 4.34226 7.77174 4.65482 7.47731C4.96738 7.18288 5.39131 7.01667 5.83333 7.01667H9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       <path d="M11.668 4.18335H15.8346V8.25002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       <path d="M8.33203 11.5833L15.832 4.18335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Excel">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M11.6654 2.5H5.83203C4.91156 2.5 4.16536 3.24619 4.16536 4.16667V15.8333C4.16536 16.7538 4.91156 17.5 5.83203 17.5H14.1654C15.0859 17.5 15.832 16.7538 15.832 15.8333V6.66667L11.6654 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                                       <path d="M11.668 2.5V6.66667H15.8346" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="CSV">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14.1654 2.5H5.83203C4.91156 2.5 4.16536 3.24619 4.16536 4.16667V15.8333C4.16536 16.7538 4.91156 17.5 5.83203 17.5H14.1654C15.0859 17.5 15.832 16.7538 15.832 15.8333V4.16667C15.832 3.24619 15.0859 2.5 14.1654 2.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                                       <path d="M7.5 7.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                       <path d="M7.5 10.8333H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="PDF">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M11.6654 2.5H5.83203C4.91156 2.5 4.16536 3.24619 4.16536 4.16667V15.8333C4.16536 16.7538 4.91156 17.5 5.83203 17.5H14.1654C15.0859 17.5 15.832 16.7538 15.832 15.8333V6.66667L11.6654 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                                       <path d="M11.668 2.5V6.66667H15.8346" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Print">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M5 7.5V5.83333C5 5.39131 5.17559 4.96738 5.48816 4.65482C5.80072 4.34226 6.22464 4.16667 6.66667 4.16667H13.3333C13.7754 4.16667 14.1993 4.34226 14.5118 4.65482C14.8244 4.96738 15 5.39131 15 5.83333V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       <path d="M5 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V8.33333C1.66667 7.89131 1.84226 7.46738 2.15482 7.15482C2.46738 6.84226 2.89131 6.66667 3.33333 6.66667H16.6667C17.1087 6.66667 17.5326 6.84226 17.8452 7.15482C18.1577 7.46738 18.3333 7.89131 18.3333 8.33333V10.8333C18.3333 11.2754 18.1577 11.6993 17.8452 12.0118C17.5326 12.3244 17.1087 12.5 16.6667 12.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       <path d="M5 10H15V15.8333C15 16.0543 14.9122 16.2663 14.7559 16.4226C14.5996 16.5789 14.3877 16.6667 14.1667 16.6667H5.83333C5.61232 16.6667 5.40036 16.5789 5.24408 16.4226C5.0878 16.2663 5 16.0543 5 15.8333V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Columns">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M3.33203 3.33334H16.6654V16.6667H3.33203V3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                                       <path d="M10 3.33334V16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                        </div>
                                        <button
                                             type="button"
                                             className="px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-success-300 text-nowrap dark:hover:bg-success-400 text-white font-semibold transition-colors"
                                        >
                                             Add New
                                        </button>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Template</span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Class Sections</span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Template Description</span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 text-right">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {templateData.map((item, index) => (
                                                       <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.template}</p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.classSections}</p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-normal text-sm text-bgray-600 dark:text-bgray-300">{item.description}</p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex justify-end space-x-2 items-center">
                                                                      <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="View Details">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M2.5 5.83333H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                                <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                                <path d="M2.5 14.1667H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                           </svg>
                                                                      </button>
                                                                      <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="View">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M1.66797 10C1.66797 10 4.16797 4.16666 10.0013 4.16666C15.8346 4.16666 18.3346 10 18.3346 10C18.3346 10 15.8346 15.8333 10.0013 15.8333C4.16797 15.8333 1.66797 10 1.66797 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           </svg>
                                                                      </button>
                                                                      <button type="button" className="text-bgray-500 hover:text-success-300 dark:hover:text-success-300 transition-colors" title="Edit">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M9.16797 3.33334H3.33464C2.89261 3.33334 2.46868 3.50894 2.15612 3.82149C1.84356 4.13405 1.66797 4.55798 1.66797 5.00001V16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333H15.0013C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667V10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M15.418 2.08332C15.7495 1.75188 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.75188 17.918 2.08332C18.2494 2.41476 18.4357 2.86436 18.4357 3.33332C18.4357 3.80228 18.2494 4.25188 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           </svg>
                                                                      </button>
                                                                      <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Copy">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M13.3333 10.75V14.25C13.3333 14.6642 13.1577 15.0617 12.8452 15.3562C12.5326 15.6507 12.1087 15.8167 11.6667 15.8167H5.83333C5.39131 15.8167 4.96738 15.6507 4.65482 15.3562C4.34226 15.0617 4.16667 14.6642 4.16667 14.25V8.58333C4.16667 8.16922 4.34226 7.77174 4.65482 7.47731C4.96738 7.18288 5.39131 7.01667 5.83333 7.01667H9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M11.668 4.18335H15.8346V8.25002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M8.33203 11.5833L15.832 4.18335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           </svg>
                                                                      </button>
                                                                      <button type="button" className="text-bgray-500 hover:text-error-300 dark:hover:text-error-300 transition-colors" title="Delete">
                                                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M15.8333 5L14.1667 15.8333C14.1667 16.2754 13.9911 16.6993 13.6785 17.0118C13.366 17.3244 12.942 17.5 12.5 17.5H7.5C7.05797 17.5 6.63405 17.3244 6.32149 17.0118C6.00893 16.6993 5.83333 16.2754 5.83333 15.8333L4.16667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M8.33203 9.16666V14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M11.668 9.16666V14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                                <path d="M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                                        <div className="w-full flex justify-between items-center">
                                             <div className="text-sm text-bgray-600 dark:text-bgray-300">Records: 1 to 14 of 14</div>
                                             <div className="flex items-center space-x-3">
                                                  <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                       </svg>
                                                  </button>
                                                  <button type="button" className="rounded-lg text-white lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-300 hover:bg-success-400 transition-colors">1</button>
                                                  <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                                       <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                       </svg>
                                                  </button>
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