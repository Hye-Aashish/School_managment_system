"use client";
import React, { useState } from "react";

export default function ItemStock() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "import" | null>(null);

     const toggleFilter = (type: "action" | "pagination" | "import") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const stockData = [
          { item: "Paper and Pencils", category: "Books Stationery", supplier: "Camlin Stationers", store: "Libarary Store (LB2)", quantity: "15", price: "120.00", date: "12/30/2025" },
          { item: "Staff Unform", category: "Staff Dress", supplier: "Jhonson Uniform Dress", store: "Uniform Dress Store (UND23)", quantity: "12", price: "120.00", date: "12/25/2025" },
          { item: "Lab Equipment", category: "Chemistry Lab Apparatus", supplier: "Jhon smith Supplier", store: "Chemistry Equipment (Ch201)", quantity: "10", price: "150.00", date: "12/20/2025" },
          { item: "Glass Board", category: "Books Stationery", supplier: "Camlin Stationers", store: "Science Store (SC2)", quantity: "15", price: "100.00", date: "12/15/2025" },
          { item: "Table chair", category: "Furniture", supplier: "David Furniture", store: "Furniture Store (FS342)", quantity: "10", price: "120.00", date: "12/10/2025" },
          { item: "Uniform", category: "Staff Dress", supplier: "Jhonson Uniform Dress", store: "Uniform Dress Store (UND23)", quantity: "10", price: "100.00", date: "12/05/2025" },
          { item: "Cricket Bat", category: "Sports", supplier: "Jhon smith Supplier", store: "Sports Store (sp55)", quantity: "5", price: "150.00", date: "12/01/2025" },
          { item: "Projectors", category: "Chemistry Lab Apparatus", supplier: "Jhon smith Supplier", store: "Chemistry Equipment (Ch201)", quantity: "10", price: "100.00", date: "11/30/2025" },
          { item: "Staff Unform", category: "Staff Dress", supplier: "Jhonson Uniform Dress", store: "Uniform Dress Store (UND23)", quantity: "20", price: "150.00", date: "11/25/2025" },
          { item: "Paper and Pencils", category: "Books Stationery", supplier: "Camlin Stationers", store: "Libarary Store (LB2)", quantity: "20", price: "120.00", date: "11/20/2025" },
          { item: "Table chair", category: "Furniture", supplier: "David Furniture", store: "Furniture Store (FS342)", quantity: "20", price: "110.00", date: "11/15/2025" },
          { item: "Cricket Bat", category: "Sports", supplier: "Jhon smith Supplier", store: "Sports Store (sp55)", quantity: "20", price: "100.00", date: "11/10/2025" },
          { item: "Lab Equipment", category: "Chemistry Lab Apparatus", supplier: "Camlin Stationers", store: "Chemistry Equipment (Ch201)", quantity: "25", price: "120.00", date: "11/05/2025" },
          { item: "Glass Board", category: "Books Stationery", supplier: "Camlin Stationers", store: "Libarary Store (LB2)", quantity: "10", price: "100.00", date: "11/01/2025" },
          { item: "Cricket Bat", category: "Sports", supplier: "Camlin Stationers", store: "Sports Store (sp55)", quantity: "10", price: "150.00", date: "10/25/2025" },
          { item: "Lab Equipment", category: "Chemistry Lab Apparatus", supplier: "Jhon smith Supplier", store: "Chemistry Equipment (Ch201)", quantity: "10", price: "200.00", date: "10/20/2025" },
          { item: "Table chair", category: "Furniture", supplier: "David Furniture", store: "Furniture Store (FS342)", quantity: "15", price: "180.00", date: "10/15/2025" },
          { item: "Table chair", category: "Furniture", supplier: "David Furniture", store: "Furniture Store (FS342)", quantity: "15", price: "180.00", date: "10/10/2025" },
          { item: "Uniform", category: "Staff Dress", supplier: "Jhonson Uniform Dress", store: "Uniform Dress Store (UND23)", quantity: "20", price: "200.00", date: "10/05/2025" },
          { item: "Paper and Pencils", category: "Books Stationery", supplier: "Camlin Stationers", store: "Science Store (SC2)", quantity: "50", price: "150.00", date: "10/01/2025" },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Item Stock Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Add Item Stock</h3>

                                        <div className="w-full space-y-4">
                                             {/* Item Category */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Item Category <span className="text-red-500">*</span>
                                                  </label>
                                                  <select className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300">
                                                       <option>Select</option>
                                                       <option>Books Stationery</option>
                                                       <option>Staff Dress</option>
                                                       <option>Chemistry Lab Apparatus</option>
                                                       <option>Furniture</option>
                                                       <option>Sports</option>
                                                  </select>
                                             </div>

                                             {/* Item */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Item <span className="text-red-500">*</span>
                                                  </label>
                                                  <select className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300">
                                                       <option>Select</option>
                                                       <option>Paper and Pencils</option>
                                                       <option>Staff Uniform</option>
                                                       <option>Lab Equipment</option>
                                                       <option>Glass Board</option>
                                                       <option>Table chair</option>
                                                  </select>
                                             </div>

                                             {/* Supplier */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Supplier
                                                  </label>
                                                  <select className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300">
                                                       <option>Select</option>
                                                       <option>Camlin Stationers</option>
                                                       <option>Jhonson Uniform Dress</option>
                                                       <option>Jhon smith Supplier</option>
                                                       <option>David Furniture</option>
                                                  </select>
                                             </div>

                                             {/* Store */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Store
                                                  </label>
                                                  <select className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300">
                                                       <option>Select</option>
                                                       <option>Libarary Store (LB2)</option>
                                                       <option>Uniform Dress Store (UND23)</option>
                                                       <option>Chemistry Equipment (Ch201)</option>
                                                       <option>Science Store (SC2)</option>
                                                       <option>Furniture Store (FS342)</option>
                                                       <option>Sports Store (sp55)</option>
                                                  </select>
                                             </div>

                                             {/* Quantity */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Quantity <span className="text-red-500">*</span>
                                                  </label>
                                                  <div className="flex items-center space-x-2">
                                                       <button type="button" className="w-10 h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 flex items-center justify-center text-bgray-900 dark:text-white hover:bg-bgray-200 dark:hover:bg-darkblack-400">
                                                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M0 1H12" stroke="currentColor" strokeWidth="2" />
                                                            </svg>
                                                       </button>
                                                       <input
                                                            type="number"
                                                            defaultValue="1"
                                                            className="flex-1 h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                       />
                                                       <button type="button" className="w-10 h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 flex items-center justify-center text-bgray-900 dark:text-white hover:bg-bgray-200 dark:hover:bg-darkblack-400">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="2" />
                                                            </svg>
                                                       </button>
                                                  </div>
                                             </div>

                                             {/* Purchase Price */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Purchase Price ($) <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       step="0.01"
                                                       className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Date */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Date <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="date"
                                                       className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Attach Document */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Attach Document
                                                  </label>
                                                  <div className="w-full h-32 rounded-lg border-2 border-dashed border-bgray-300 dark:border-darkblack-400 bg-bgray-100 dark:bg-darkblack-500 flex flex-col items-center justify-center cursor-pointer hover:border-success-300 transition">
                                                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                                                            <path d="M7 10L12 15L17 10" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M12 15V3" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M20 21H4" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                       <p className="text-xs text-bgray-500 dark:text-bgray-400">Drag and drop a file here or click</p>
                                                  </div>
                                             </div>

                                             {/* Description */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Description
                                                  </label>
                                                  <textarea
                                                       rows={4}
                                                       className="w-full rounded-lg bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 py-3 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  ></textarea>
                                             </div>

                                             {/* Save Button */}
                                             <button
                                                  type="button"
                                                  className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
                                             >
                                                  Save
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Item Stock List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Item Stock List</h3>

                                        <div className="w-full flex h-14 space-x-4">


                                             {/* Search Field */}
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
                                                                 id="listSearch"
                                                                 placeholder="Search..."
                                                                 className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                            />
                                                       </label>
                                                  </div>
                                             </div>
                                             {/* Import Dropdown */}
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                       onClick={() => toggleFilter("import")}
                                                  >
                                                       <span className="text-base text-bgray-500 text-nowrap">Import</span>
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
                                                       className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "import" ? "block" : "hidden"}`}
                                                  >
                                                       <ul>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
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
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Item</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Category</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Supplier</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Store</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Quantity</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Purchase Price ($)</span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Date</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {stockData.map((stock, index) => (
                                                            <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.item}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.category}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.supplier}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.store}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.quantity}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.price}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{stock.date}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex items-center space-x-2">
                                                                           <button type="button" className="hover:opacity-70 transition">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                           </button>
                                                                           <button type="button" className="hover:opacity-70 transition">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <line x1="18" y1="6" x2="6" y2="18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                                                                                     <line x1="6" y1="6" x2="18" y2="18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
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
                                                  <div className="lg:flex hidden space-x-4 items-center">
                                                       <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">Records: 1 to 20 of 20</span>
                                                  </div>
                                                  <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                                       <button type="button">
                                                            <span>
                                                                 <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </button>
                                                       <div className="flex items-center">
                                                            <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-bgray-50">
                                                                 1
                                                            </button>
                                                       </div>
                                                       <button type="button">
                                                            <span>
                                                                 <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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