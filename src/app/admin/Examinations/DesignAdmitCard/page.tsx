"use client";
import React, { useState } from "react";

export default function CertificateTemplateDesign() {
     const [openFilter, setOpenFilter] = useState<number | null>(null);
     const [formData, setFormData] = useState({
          template: "",
          heading: "",
          title: "",
          examName: "",
          schoolName: "",
          examCenter: "",
          footerText: "",
          name: false,
          fatherName: false,
          motherName: false,
          dateOfBirth: false,
          admissionNo: false,
          rollNumber: false,
          address: false,
          gender: false,
          photo: false,
          class: false,
          section: false
     });

     const certificateData = [
          { name: "Sample Admit Card", backgroundImage: "image1.jpg", active: false },
          { name: "Admit Card", backgroundImage: "image2.jpg", active: true }
     ];

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value, type, checked } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: type === "checkbox" ? checked : value
          }));
     };

     const handleFileUpload = (fieldName: string) => {
          // Handle file upload logic
          console.log(`Uploading file for ${fieldName}`);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Left Column - Certificate Template Design Form */}
                              <div className="w-full py-6 px-6 rounded-lg bg-white dark:bg-darkblack-600 lg:max-w-[380px]">
                                   <div className="flex flex-col space-y-5">
                                        <div className="w-full space-y-4">
                                             {/* Template */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Template <span className="text-error-300">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="template"
                                                       value={formData.template}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter template"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* Heading */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Heading
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="heading"
                                                       value={formData.heading}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter heading"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* Title */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Title
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="title"
                                                       value={formData.title}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter title"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* Exam Name */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Exam Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="examName"
                                                       value={formData.examName}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter exam name"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* School Name */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       School Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="schoolName"
                                                       value={formData.schoolName}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter school name"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* Exam Center */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Exam Center
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="examCenter"
                                                       value={formData.examCenter}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter exam center"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* Footer Text */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Footer Text
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="footerText"
                                                       value={formData.footerText}
                                                       onChange={handleInputChange}
                                                       placeholder="Enter footer text"
                                                       className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white placeholder:text-bgray-500 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent text-sm"
                                                  />
                                             </div>

                                             {/* Left Logo Upload */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Left Logo
                                                  </label>
                                                  <div
                                                       onClick={() => handleFileUpload("leftLogo")}
                                                       className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-bgray-300 dark:border-darkblack-400 bg-bgray-100 dark:bg-darkblack-500 cursor-pointer hover:border-success-300 transition-colors flex flex-col items-center justify-center"
                                                  >
                                                       <svg className="w-8 h-8 text-bgray-500 dark:text-bgray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                       </svg>
                                                       <span className="text-sm text-bgray-600 dark:text-bgray-400">Drag and drop a file here or click</span>
                                                  </div>
                                             </div>

                                             {/* Right Logo Upload */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Right Logo
                                                  </label>
                                                  <div
                                                       onClick={() => handleFileUpload("rightLogo")}
                                                       className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-bgray-300 dark:border-darkblack-400 bg-bgray-100 dark:bg-darkblack-500 cursor-pointer hover:border-success-300 transition-colors flex flex-col items-center justify-center"
                                                  >
                                                       <svg className="w-8 h-8 text-bgray-500 dark:text-bgray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                       </svg>
                                                       <span className="text-sm text-bgray-600 dark:text-bgray-400">Drag and drop a file here or click</span>
                                                  </div>
                                             </div>

                                             {/* Sign Upload */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Sign
                                                  </label>
                                                  <div
                                                       onClick={() => handleFileUpload("sign")}
                                                       className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-bgray-300 dark:border-darkblack-400 bg-bgray-100 dark:bg-darkblack-500 cursor-pointer hover:border-success-300 transition-colors flex flex-col items-center justify-center"
                                                  >
                                                       <svg className="w-8 h-8 text-bgray-500 dark:text-bgray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                       </svg>
                                                       <span className="text-sm text-bgray-600 dark:text-bgray-400">Drag and drop a file here or click</span>
                                                  </div>
                                             </div>

                                             {/* Background Image Upload */}
                                             <div className="space-y-2">
                                                  <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       Background Image
                                                  </label>
                                                  <div
                                                       onClick={() => handleFileUpload("backgroundImage")}
                                                       className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-bgray-300 dark:border-darkblack-400 bg-bgray-100 dark:bg-darkblack-500 cursor-pointer hover:border-success-300 transition-colors flex flex-col items-center justify-center"
                                                  >
                                                       <svg className="w-8 h-8 text-bgray-500 dark:text-bgray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                       </svg>
                                                       <span className="text-sm text-bgray-600 dark:text-bgray-400">Drag and drop a file here or click</span>
                                                  </div>
                                             </div>

                                             {/* Toggle Switches */}
                                             <div className="space-y-3 pt-2">
                                                  {[
                                                       { label: "Name", name: "name" },
                                                       { label: "Father Name", name: "fatherName" },
                                                       { label: "Mother Name", name: "motherName" },
                                                       { label: "Date Of Birth", name: "dateOfBirth" },
                                                       { label: "Admission No", name: "admissionNo" },
                                                       { label: "Roll Number", name: "rollNumber" },
                                                       { label: "Address", name: "address" },
                                                       { label: "Gender", name: "gender" },
                                                       { label: "Photo", name: "photo" },
                                                       { label: "Class", name: "class" },
                                                       { label: "Section", name: "section" }
                                                  ].map((field) => (
                                                       <div key={field.name} className="flex items-center justify-between">
                                                            <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                                 {field.label}
                                                            </label>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                 <input
                                                                      type="checkbox"
                                                                      name={field.name}
                                                                      checked={formData[field.name as keyof typeof formData] as boolean}
                                                                      onChange={handleInputChange}
                                                                      className="sr-only peer"
                                                                 />
                                                                 <div className="w-11 h-6 bg-bgray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-success-300 dark:peer-focus:ring-success-300 rounded-full peer dark:bg-darkblack-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-darkblack-400 peer-checked:bg-success-300"></div>
                                                            </label>
                                                       </div>
                                                  ))}
                                             </div>

                                             {/* Save Button */}
                                             <button
                                                  type="button"
                                                  className="px-6 py-2.5 rounded-lg bg-bgray-600 hover:bg-bgray-500 dark:bg-bgray-700 dark:hover:bg-bgray-800 text-white font-semibold transition-colors w-full mt-4"
                                             >
                                                  Save
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Right Column - Certificate List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        {/* Search Bar */}
                                        <div className="w-full flex justify-start items-center">
                                             <div className="w-full sm:max-w-xs border border-transparent focus-within:border-success-300 h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                                 placeholder="Search"
                                                                 className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                            />
                                                       </label>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Table */}
                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                           Certificate Name
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                           Background Image
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                           Active
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-right">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Action
                                                                 </span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {certificateData.map((item, index) => (
                                                            <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-success-300 dark:text-success-300 hover:underline cursor-pointer">
                                                                           {item.name}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="w-16 h-16 rounded-lg border border-bgray-300 dark:border-darkblack-400 overflow-hidden bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center">
                                                                           <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-bgray-400">
                                                                                <path d="M26 4H6C4.89543 4 4 4.89543 4 6V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V6C28 4.89543 27.1046 4 26 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                <path d="M28 20L21 13L6 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           </svg>
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <label className="relative inline-flex items-center cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name="activeTemplate"
                                                                                checked={item.active}
                                                                                onChange={() => { }}
                                                                                className="w-5 h-5 text-success-300 bg-white border-bgray-300 focus:ring-success-300 dark:focus:ring-success-300 dark:ring-offset-darkblack-600 focus:ring-2 dark:bg-darkblack-500 dark:border-darkblack-400"
                                                                           />
                                                                      </label>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex justify-end space-x-3 items-center">
                                                                           <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="View Details">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M2.5 10C2.5 10 5 4.16666 10 4.16666C15 4.16666 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button type="button" className="text-bgray-500 hover:text-success-300 dark:hover:text-success-300 transition-colors" title="Edit">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M9.16797 3.33334H3.33464C2.89261 3.33334 2.46868 3.50894 2.15612 3.82149C1.84356 4.13405 1.66797 4.55798 1.66797 5.00001V16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333H15.0013C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667V10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M15.418 2.08332C15.7495 1.75188 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.75188 17.918 2.08332C18.2494 2.41476 18.4357 2.86436 18.4357 3.33332C18.4357 3.80228 18.2494 4.25188 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                                                  <div className="text-sm text-bgray-600 dark:text-bgray-300">
                                                       Records: 1 to 2 of 2
                                                  </div>
                                                  <div className="flex items-center space-x-3">
                                                       <button type="button" disabled className="text-bgray-300 dark:text-bgray-500 cursor-not-allowed">
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </button>
                                                       <button type="button" className="rounded-lg text-white lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-300 hover:bg-success-400 transition-colors">
                                                            1
                                                       </button>
                                                       <button type="button" disabled className="text-bgray-300 dark:text-bgray-500 cursor-not-allowed">
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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