"use client";
import React, { useState } from "react";

export default function MarksDivision() {
     const [formData, setFormData] = useState({
          divisionName: "",
          percentFrom: "",
          percentUpto: ""
     });

     // Sample division data
     const divisions = [
          { name: "First", percentFrom: "100.00", percentUpto: "60.00" },
          { name: "Second", percentFrom: "60.00", percentUpto: "40.00" },
          { name: "Third", percentFrom: "40.00", percentUpto: "0.00" }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Left Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[400px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Add Marks Division
                                        </h3>

                                        {/* Division Name */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Division Name <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.divisionName}
                                                  onChange={(e) => setFormData({ ...formData, divisionName: e.target.value })}
                                             />
                                        </div>

                                        {/* Percent From */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Percent From <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.percentFrom}
                                                  onChange={(e) => setFormData({ ...formData, percentFrom: e.target.value })}
                                             />
                                        </div>

                                        {/* Percent Upto */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Percent Upto <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.percentUpto}
                                                  onChange={(e) => setFormData({ ...formData, percentUpto: e.target.value })}
                                             />
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex justify-end">
                                             <button
                                                  type="button"
                                                  className="px-8 py-3 rounded-lg bg-bgray-600 w-full dark:bg-darkblack-500 text-white font-semibold hover:bg-bgray-800 dark:hover:bg-darkblack-400 transition-colors"
                                             >
                                                  Save
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Right Table */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Division List
                                        </h3>

                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Division Name
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Percentage From
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Percentage Upto
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Action
                                                                 </span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {divisions.map((division, index) => (
                                                            <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                                           {division.name}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                           {division.percentFrom}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                           {division.percentUpto}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <div className="flex items-center space-x-3">
                                                                           <button
                                                                                type="button"
                                                                                className="text-bgray-500 hover:text-success-300 transition-colors"
                                                                           >
                                                                                <svg
                                                                                     width="18"
                                                                                     height="18"
                                                                                     viewBox="0 0 24 24"
                                                                                     fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                                     className="stroke-current"
                                                                                >
                                                                                     <path
                                                                                          d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                                                          strokeWidth="2"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                     />
                                                                                     <path
                                                                                          d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                                                                                          strokeWidth="2"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                     />
                                                                                </svg>
                                                                           </button>
                                                                           <button
                                                                                type="button"
                                                                                className="text-bgray-500 hover:text-red-500 transition-colors"
                                                                           >
                                                                                <svg
                                                                                     width="18"
                                                                                     height="18"
                                                                                     viewBox="0 0 24 24"
                                                                                     fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                                     className="stroke-current"
                                                                                >
                                                                                     <path
                                                                                          d="M18 6L6 18"
                                                                                          strokeWidth="2"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                     />
                                                                                     <path
                                                                                          d="M6 6L18 18"
                                                                                          strokeWidth="2"
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
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}