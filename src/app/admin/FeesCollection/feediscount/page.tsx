"use client";
import React, { useState } from "react";

export default function FeeDiscount() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [discountType, setDiscountType] = useState<"percentage" | "fixAmount">("fixAmount");

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample data for fees discounts
     const feesDiscounts = [
          { name: "Sibling Discount", code: "sibling-disc", percentage: "", amount: "500.00", useCount: 5, expiryDate: "04/10/2025" },
          { name: "Handicapped Discount", code: "handicap-disc", percentage: "", amount: "1,000.00", useCount: 5, expiryDate: "04/15/2025" },
          { name: "Class Topper Discount", code: "cls-top-disc", percentage: "", amount: "100.00", useCount: 10, expiryDate: "" }
     ];

     return (
          <>
               <div className="w-full">
                    <section className="w-full">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Fees Discount Form */}
                              <div className="w-full lg:max-w-[380px] py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        Add Fees Discount
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

                                        {/* Discount Code */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Discount Code <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  placeholder=""
                                                  className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500"
                                             />
                                        </div>

                                        {/* Discount Type */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-3 block">
                                                  Discount Type
                                             </label>
                                             <div className="flex items-center gap-6">
                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="discountType"
                                                            value="percentage"
                                                            checked={discountType === "percentage"}
                                                            onChange={(e) => setDiscountType(e.target.value as any)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300 focus:ring-2"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white font-medium">Percentage</span>
                                                  </label>
                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="discountType"
                                                            value="fixAmount"
                                                            checked={discountType === "fixAmount"}
                                                            onChange={(e) => setDiscountType(e.target.value as any)}
                                                            className="w-4 h-4 text-success-300 focus:ring-success-300 focus:ring-2"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-white font-medium">Fix Amount</span>
                                                  </label>
                                             </div>
                                        </div>

                                        {/* Percentage and Amount fields */}
                                        <div className="w-full grid grid-cols-2 gap-4">
                                             {/* Percentage */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Percentage (%) <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       placeholder=""
                                                       disabled={discountType === "fixAmount"}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500 disabled:bg-bgray-100 disabled:cursor-not-allowed"
                                                  />
                                             </div>

                                             {/* Amount */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Amount ($) <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       placeholder=""
                                                       disabled={discountType === "percentage"}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500 disabled:bg-bgray-100 disabled:cursor-not-allowed"
                                                  />
                                             </div>
                                        </div>

                                        {/* Number Of Use Count and Expiry Date */}
                                        <div className="w-full grid grid-cols-2 gap-4">
                                             {/* Number Of Use Count */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Number Of Use Count <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       placeholder=""
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none placeholder:text-bgray-500"
                                                  />
                                             </div>

                                             {/* Expiry Date */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Expiry Date
                                                  </label>
                                                  <input
                                                       type="date"
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 text-base text-bgray-900 dark:text-white border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 focus:outline-none"
                                                  />
                                             </div>
                                        </div>

                                        {/* Description */}
                                        <div className="w-full">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Description
                                             </label>
                                             <textarea
                                                  rows={4}
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

                              {/* Fees Discount List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        Fees Discount List
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
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Discount Code</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Percentage (%)</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Amount ($)</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Number Of Use Count</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Expiry Date</td>
                                                            <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {feesDiscounts.map((discount, index) => (
                                                            <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-900 dark:text-white">{discount.name}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{discount.code}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{discount.percentage}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{discount.amount}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{discount.useCount}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <p className="text-sm text-bgray-700 dark:text-bgray-300">{discount.expiryDate}</p>
                                                                 </td>
                                                                 <td className="py-3 px-4">
                                                                      <div className="flex items-center gap-3">
                                                                           <button className="text-bgray-900 dark:text-white hover:text-blue-500">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M2.45825 12C3.73253 7.94288 7.52281 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.2684 16.0571 16.4781 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button className="text-bgray-900 dark:text-white hover:text-green-500">
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
                                                            Records: 1 to 3 of 3
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