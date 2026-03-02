"use client";
import React, { useState } from "react";

export default function SendEmail() {
     const [activeTab, setActiveTab] = useState<"individual" | "group" | "class" | "birthday">("individual");
     const [sendOption, setSendOption] = useState<"now" | "schedule">("now");
     const [messageToOptions, setMessageToOptions] = useState({
          students: false,
          guardians: false,
          admin: false,
          teacher: false,
          accountant: false,
          librarian: false,
          receptionist: false,
          superAdmin: false,
     });

     const handleMessageToChange = (option: keyof typeof messageToOptions) => {
          setMessageToOptions(prev => ({
               ...prev,
               [option]: !prev[option]
          }));
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              {/* Tabs */}
                              <div className="flex space-x-6 border-b border-bgray-300 dark:border-darkblack-400 mb-6">
                                   <button
                                        type="button"
                                        onClick={() => setActiveTab("group")}
                                        className={`pb-4 px-2 text-base font-semibold transition-all ${activeTab === "group"
                                             ? "text-success-300 border-b-2 border-success-300"
                                             : "text-bgray-600 dark:text-bgray-50"
                                             }`}
                                   >
                                        Group
                                   </button>
                                   <button
                                        type="button"
                                        onClick={() => setActiveTab("individual")}
                                        className={`pb-4 px-2 text-base font-semibold transition-all ${activeTab === "individual"
                                             ? "text-success-300 border-b-2 border-success-300"
                                             : "text-bgray-600 dark:text-bgray-50"
                                             }`}
                                   >
                                        Individual
                                   </button>
                                   <button
                                        type="button"
                                        onClick={() => setActiveTab("class")}
                                        className={`pb-4 px-2 text-base font-semibold transition-all ${activeTab === "class"
                                             ? "text-success-300 border-b-2 border-success-300"
                                             : "text-bgray-600 dark:text-bgray-50"
                                             }`}
                                   >
                                        Class
                                   </button>
                                   <button
                                        type="button"
                                        onClick={() => setActiveTab("birthday")}
                                        className={`pb-4 px-2 text-base font-semibold transition-all ${activeTab === "birthday"
                                             ? "text-success-300 border-b-2 border-success-300"
                                             : "text-bgray-600 dark:text-bgray-50"
                                             }`}
                                   >
                                        Today&apos;s Birthday
                                   </button>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                   {/* Left Section - Form Fields */}
                                   <div className="lg:col-span-2 space-y-6">
                                        {/* Email Template */}
                                        <div>
                                             <label className="text-base font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Email Template
                                             </label>
                                             <select className="w-full h-14 rounded-lg bg-bgray-200 dark:bg-darkblack-500 border border-transparent focus:border-success-300 focus:outline-none px-4 text-base text-bgray-900 dark:text-white">
                                                  <option>Select</option>
                                                  <option>Template 1</option>
                                                  <option>Template 2</option>
                                                  <option>Template 3</option>
                                             </select>
                                        </div>

                                        {/* Title */}
                                        <div>
                                             <label className="text-base font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Title <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  placeholder="Enter email title"
                                                  className="w-full h-14 rounded-lg bg-bgray-200 dark:bg-darkblack-500 border border-transparent focus:border-success-300 focus:outline-none px-4 text-base text-bgray-900 dark:text-white placeholder:text-bgray-500"
                                             />
                                        </div>

                                        {/* Attachment */}
                                        <div>
                                             <label className="text-base font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Attachment
                                             </label>
                                             <div className="w-full h-32 rounded-lg bg-bgray-200 dark:bg-darkblack-500 border-2 border-dashed border-bgray-400 dark:border-darkblack-400 flex flex-col items-center justify-center cursor-pointer hover:border-success-300 transition-all">
                                                  <svg
                                                       width="32"
                                                       height="32"
                                                       viewBox="0 0 32 32"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="mb-2"
                                                  >
                                                       <path
                                                            d="M16 21.3333V10.6666"
                                                            stroke="#A0AEC0"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M11.3359 15.9999L16.0026 10.6666L20.6693 15.9999"
                                                            stroke="#A0AEC0"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M6.66797 21.3333H25.3346"
                                                            stroke="#A0AEC0"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                                  <span className="text-sm text-bgray-500 dark:text-bgray-400">
                                                       Drag and drop a file here or click
                                                  </span>
                                             </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                             <label className="text-base font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                  Message <span className="text-red-500">*</span>
                                             </label>
                                             <textarea
                                                  rows={10}
                                                  placeholder="Enter your message here..."
                                                  className="w-full rounded-lg bg-bgray-200 dark:bg-darkblack-500 border border-transparent focus:border-success-300 focus:outline-none px-4 py-3 text-base text-bgray-900 dark:text-white placeholder:text-bgray-500 resize-none"
                                             />
                                        </div>
                                   </div>

                                   {/* Right Section - Message To */}
                                   <div className="lg:col-span-1">
                                        <div className="sticky top-6">
                                             <label className="text-base font-medium text-bgray-600 dark:text-bgray-50 mb-4 block">
                                                  Message To <span className="text-red-500">*</span>
                                             </label>
                                             <div className="space-y-3">
                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.students}
                                                            onChange={() => handleMessageToChange("students")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Students
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.guardians}
                                                            onChange={() => handleMessageToChange("guardians")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Guardians
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.admin}
                                                            onChange={() => handleMessageToChange("admin")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Admin
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.teacher}
                                                            onChange={() => handleMessageToChange("teacher")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Teacher
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.accountant}
                                                            onChange={() => handleMessageToChange("accountant")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Accountant
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.librarian}
                                                            onChange={() => handleMessageToChange("librarian")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Librarian
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.receptionist}
                                                            onChange={() => handleMessageToChange("receptionist")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Receptionist
                                                       </span>
                                                  </label>

                                                  <label className="flex items-center space-x-3 cursor-pointer">
                                                       <input
                                                            type="checkbox"
                                                            checked={messageToOptions.superAdmin}
                                                            onChange={() => handleMessageToChange("superAdmin")}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                            Super Admin
                                                       </span>
                                                  </label>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Bottom Section - Send Options */}
                              <div className="mt-6 pt-6 border-t border-bgray-300 dark:border-darkblack-400">
                                   <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center space-x-6">
                                             <label className="flex items-center space-x-3 cursor-pointer">
                                                  <input
                                                       type="radio"
                                                       name="sendOption"
                                                       checked={sendOption === "now"}
                                                       onChange={() => setSendOption("now")}
                                                       className="focus:outline-none focus:ring-0 border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                  />
                                                  <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                       Send Now
                                                  </span>
                                             </label>

                                             <label className="flex items-center space-x-3 cursor-pointer">
                                                  <input
                                                       type="radio"
                                                       name="sendOption"
                                                       checked={sendOption === "schedule"}
                                                       onChange={() => setSendOption("schedule")}
                                                       className="focus:outline-none focus:ring-0 border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                  />
                                                  <span className="text-base font-medium text-bgray-900 dark:text-bgray-50">
                                                       Schedule
                                                  </span>
                                             </label>

                                             {sendOption === "schedule" && (
                                                  <div className="flex items-center space-x-2">
                                                       <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                            Schedule Date Time <span className="text-red-500">*</span>
                                                       </label>
                                                       <input
                                                            type="datetime-local"
                                                            className="h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 border border-transparent focus:border-success-300 focus:outline-none px-4 text-base text-bgray-900 dark:text-white"
                                                       />
                                                  </div>
                                             )}
                                        </div>

                                        <button
                                             type="submit"
                                             className="px-8 py-3 rounded-lg bg-success-300 hover:bg-success-400 text-white font-semibold text-base transition-all flex items-center space-x-2"
                                        >
                                             <svg
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 20 20"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                             >
                                                  <path
                                                       d="M18.3327 1.66675L9.16602 10.8334"
                                                       stroke="white"
                                                       strokeWidth="2"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M18.3327 1.66675L12.4993 18.3334L9.16602 10.8334L1.66602 7.50008L18.3327 1.66675Z"
                                                       stroke="white"
                                                       strokeWidth="2"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                             </svg>
                                             <span>Submit</span>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}