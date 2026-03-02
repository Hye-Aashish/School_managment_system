"use client";
import React, { useState } from "react";

export default function CertificateTemplate() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [formData, setFormData] = useState({
          template: "",
          examName: "",
          schoolName: "",
          examCenter: "",
          bodyText: "",
          footerText: "",
          printingDate: "",
          toggles: {
               name: false,
               fatherName: false,
               motherName: false,
               examSession: false,
               admissionNo: false,
               division: false,
               rank: false,
               rollNumber: false,
               photo: false,
               class: false,
               section: false,
               dateOfBirth: false,
               remark: false
          }
     });

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleToggle = (field: keyof typeof formData.toggles) => {
          setFormData({
               ...formData,
               toggles: {
                    ...formData.toggles,
                    [field]: !formData.toggles[field]
               }
          });
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[320px]">
                                   <div className="flex flex-col space-y-5">
                                        {/* Template Dropdown */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Template <span className="text-red-500">*</span>
                                             </label>
                                             <select
                                                  className="w-full h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.template}
                                                  onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                                             >
                                                  <option value="">Select Template</option>
                                                  <option value="template1">Template 1</option>
                                                  <option value="template2">Template 2</option>
                                             </select>
                                        </div>

                                        {/* Exam Name */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Exam Name
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.examName}
                                                  onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                                             />
                                        </div>

                                        {/* School Name */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  School Name
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.schoolName}
                                                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                             />
                                        </div>

                                        {/* Exam Center */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Exam Center
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.examCenter}
                                                  onChange={(e) => setFormData({ ...formData, examCenter: e.target.value })}
                                             />
                                        </div>

                                        {/* Body Text */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Body Text
                                             </label>
                                             <textarea
                                                  rows={3}
                                                  className="w-full px-3 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  value={formData.bodyText}
                                                  onChange={(e) => setFormData({ ...formData, bodyText: e.target.value })}
                                             />
                                        </div>

                                        {/* Footer Text */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Footer Text
                                             </label>
                                             <textarea
                                                  rows={3}
                                                  className="w-full px-3 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  value={formData.footerText}
                                                  onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                                             />
                                        </div>

                                        {/* Printing Date */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Printing Date
                                             </label>
                                             <input
                                                  type="date"
                                                  className="w-full h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.printingDate}
                                                  onChange={(e) => setFormData({ ...formData, printingDate: e.target.value })}
                                             />
                                        </div>

                                        {/* File Upload Sections */}
                                        {[
                                             "Header Image",
                                             "Left Logo",
                                             "Right Logo",
                                             "Left Sign",
                                             "Middle Sign",
                                             "Right Sign",
                                             "Background Image"
                                        ].map((label) => (
                                             <div key={label} className="w-full space-y-2">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                       {label}
                                                  </label>
                                                  <div className="w-full h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-bgray-300 dark:border-darkblack-400 bg-bgray-100 dark:bg-darkblack-500 cursor-pointer hover:border-success-300 transition-colors">
                                                       <div className="text-center">
                                                            <svg
                                                                 className="mx-auto mb-1 stroke-bgray-500 dark:stroke-bgray-300"
                                                                 width="20"
                                                                 height="20"
                                                                 viewBox="0 0 24 24"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                 <path
                                                                      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                                                      strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
                                                                 <path
                                                                      d="M17 8L12 3L7 8"
                                                                      strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
                                                                 <path
                                                                      d="M12 3V15"
                                                                      strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                 />
                                                            </svg>
                                                            <p className="text-xs text-bgray-500 dark:text-bgray-300">
                                                                 Drag and drop a file here or click
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                        ))}

                                        {/* Toggle Switches */}
                                        {[
                                             { key: "name", label: "Name" },
                                             { key: "fatherName", label: "Father Name" },
                                             { key: "motherName", label: "Mother Name" },
                                             { key: "examSession", label: "Exam Session" },
                                             { key: "admissionNo", label: "Admission No" },
                                             { key: "division", label: "Division" },
                                             { key: "rank", label: "Rank" },
                                             { key: "rollNumber", label: "Roll Number" },
                                             { key: "photo", label: "Photo" },
                                             { key: "class", label: "Class" },
                                             { key: "section", label: "Section" },
                                             { key: "dateOfBirth", label: "Date Of Birth" },
                                             { key: "remark", label: "Remark" }
                                        ].map((item) => (
                                             <div key={item.key} className="w-full space-y-2">
                                                  <div className="flex items-center justify-between">
                                                       <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                            {item.label}
                                                       </label>
                                                       <button
                                                            type="button"
                                                            onClick={() => handleToggle(item.key as keyof typeof formData.toggles)}
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                                 formData.toggles[item.key as keyof typeof formData.toggles]
                                                                      ? "bg-success-300"
                                                                      : "bg-bgray-300 dark:bg-darkblack-400"
                                                            }`}
                                                       >
                                                            <span
                                                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                      formData.toggles[item.key as keyof typeof formData.toggles]
                                                                           ? "translate-x-6"
                                                                           : "translate-x-1"
                                                                 }`}
                                                            />
                                                       </button>
                                                  </div>
                                             </div>
                                        ))}

                                        {/* Save Button */}
                                        <div className="w-full space-y-4">
                                             <button
                                                  type="button"
                                                  className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
                                             >
                                                  Save
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <div className="w-full flex h-14 space-x-4">
                                             <div
                                                  className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                             >
                                                  <div
                                                       className="flex w-full h-full items-center space-x-[15px]"
                                                  >
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

                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
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
                                                       className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"
                                                            }`}
                                                  >
                                                       <ul>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Coppy</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">PDF</li>
                                                            <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print</li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td
                                                                 className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block"
                                                            >
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span
                                                                           className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                      >Certificate Name</span>
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
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                      >Background Image</span
                                                                      >
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
                                                            <td className="py-5 px-6 xl:px-0"></td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      school marksheet
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-16 h-16 rounded-lg border border-bgray-300 dark:border-darkblack-400 overflow-hidden bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center">
                                                                      <svg
                                                                           className="stroke-bgray-500 dark:stroke-bgray-300"
                                                                           width="32"
                                                                           height="32"
                                                                           viewBox="0 0 24 24"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                                                                           <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                                                                           <path d="M21 15L16 10L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="relative">
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => toggleFilter("action")}
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="4"
                                                                                viewBox="0 0 18 4"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M8 2.00024C8 2.55253 8.44772 3.00024 9 3.00024C9.55228 3.00024 10 2.55253 10 2.00024C10 1.44796 9.55228 1.00024 9 1.00024C8.44772 1.00024 8 1.44796 8 2.00024Z"
                                                                                     stroke="#A0AEC0"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                     d="M1 2.00024C1 2.55253 1.44772 3.00024 2 3.00024C2.55228 3.00024 3 2.55253 3 2.00024C3 1.44796 2.55228 1.00024 2 1.00024C1.44772 1.00024 1 1.44796 1 2.00024Z"
                                                                                     stroke="#A0AEC0"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                     d="M15 2.00024C15 2.55253 15.4477 3.00024 16 3.00024C16.5523 3.00024 17 2.55253 17 2.00024C17 1.44796 16.5523 1.00024 16 1.00024C15.4477 1.00024 15 1.44796 15 2.00024Z"
                                                                                     stroke="#A0AEC0"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </button>

                                                                      <div
                                                                           className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 min-w-[150px] absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "action" ? "block" : "hidden"
                                                                                }`}
                                                                      >
                                                                           <ul>
                                                                                <li className="text-nowrap text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">View</li>
                                                                                <li className="text-nowrap text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Edit</li>
                                                                                <li className="text-nowrap text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Delete</li>
                                                                           </ul>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                        </div>

                                        <div className="pagination-content w-full">
                                             <div
                                                  className="w-full flex lg:justify-between justify-center items-center"
                                             >
                                                  <div className="lg:flex hidden space-x-4 items-center">
                                                       <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold"
                                                       >Show result:</span
                                                       >
                                                       <div className="relative">
                                                            <button
                                                                 type="button"
                                                                 className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                                 onClick={() => toggleFilter("pagination")}
                                                            >
                                                                 <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50"
                                                                 >3</span
                                                                 >
                                                                 <span>
                                                                      <svg
                                                                           width="17"
                                                                           height="17"
                                                                           viewBox="0 0 17 17"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                                                                                stroke="#A0AEC0"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </span>
                                                            </button>
                                                            <div
                                                                 id="result-filter"
                                                                 className={`rounded-lg w-full shadow-lg bg-white absolute right-0 z-10 top-14 overflow-hidden hidden ${openFilter === "pagination" ? "block" : "hidden"
                                                                      }`}
                                                            >
                                                                 <ul>
                                                                      <li
                                                                           className="text-sm font-medium text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                                                                      >
                                                                           1
                                                                      </li>
                                                                      <li
                                                                           className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                                                                      >
                                                                           2
                                                                      </li>
                                                                      <li
                                                                           className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                                                                      >
                                                                           3
                                                                      </li>
                                                                 </ul>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div
                                                       className="flex sm:space-x-[35px] space-x-5 items-center"
                                                  >
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
                                                            <button
                                                                 type="button"
                                                                 className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500"
                                                            >
                                                                 2
                                                            </button>
                                                            <span className="text-bgray-500 text-sm">. . . .</span>
                                                            <button
                                                                 type="button"
                                                                 className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500"
                                                            >
                                                                 20
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
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}