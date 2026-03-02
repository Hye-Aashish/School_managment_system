"use client";
import React, { useState } from "react";

export default function SelectOldSession() {
     const [openFilter, setOpenFilter] = useState<"session" | "class" | "section" | "subjectGroup" | "subject" | null>(null);

     const toggleFilter = (type: "session" | "class" | "section" | "subjectGroup" | "subject") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const lessons = [
          { id: 1, topic: "झूला" },
          { id: 2, topic: "आम की कहानी" },
          { id: 3, topic: "आम की टोकरी" },
     ];

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Select Old Session Details Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">
                              Select Old Session Details
                         </h3>
                         <div className="flex flex-col space-y-4">
                              <div className="flex lg:flex-nowrap md:flex-nowrap gap-4">
                                   <div className="w-full">
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Session <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="2022-23">2022-23</option>
                                             <option value="2023-24">2023-24</option>
                                             <option value="2024-25">2024-25</option>
                                        </select>
                                   </div>
                                   <div className="w-full">
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="class1">Class 1</option>
                                             <option value="class2">Class 2</option>
                                             <option value="class3">Class 3</option>
                                        </select>
                                   </div>
                                   <div className="w-full">
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="a">A</option>
                                             <option value="b">B</option>
                                             <option value="c">C</option>
                                        </select>
                                   </div>
                                   <div className="w-full">
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Subject Group <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="group1">Class 1st Subject Group</option>
                                             <option value="group2">Class 2nd Subject Group</option>
                                        </select>
                                   </div>
                                   <div className="w-full">
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Subject <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="hindi">Hindi (230)</option>
                                             <option value="english">English (210)</option>
                                        </select>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/* Main Content Section */}
                    <div className="2xl:flex 2xl:space-x-12">
                         {/* Left Section - Lesson & Topics */}
                         <section className="2xl:flex-1 2xl:mb-0 mb-6">
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">
                                        Syllabus Status For: Hindi (230)
                                   </h3>
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">
                                        Lesson & Topics Select Subject
                                   </h3>
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 w-[80px]">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 #
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Lesson Topic
                                                            </span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {lessons.map((lesson) => (
                                                       <tr
                                                            key={lesson.id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {lesson.id}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {lesson.topic}
                                                                 </p>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </section>

                         {/* Right Section - Select Subject */}
                         <section className="2xl:w-[400px]">
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        Select Subject
                                   </h3>
                                   <div className="flex flex-col space-y-5">
                                        {/* Class Dropdown */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                  Class <span className="text-red-500">*</span>
                                             </label>
                                             <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                                  <option value="class1">Class 1</option>
                                                  <option value="class2">Class 2</option>
                                                  <option value="class3">Class 3</option>
                                             </select>
                                        </div>

                                        {/* Section Dropdown */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                  Section <span className="text-red-500">*</span>
                                             </label>
                                             <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                                  <option value="a">A</option>
                                                  <option value="b">B</option>
                                                  <option value="c">C</option>
                                             </select>
                                        </div>

                                        {/* Subject Group Dropdown */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                  Subject Group <span className="text-red-500">*</span>
                                             </label>
                                             <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                                  <option value="group1">Class 1st Subject Group</option>
                                                  <option value="group2">Class 2nd Subject Group</option>
                                             </select>
                                        </div>

                                        {/* Subject Dropdown */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                  Subject <span className="text-red-500">*</span>
                                             </label>
                                             <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                                  <option value="hindi">Hindi (230)</option>
                                                  <option value="english">English (210)</option>
                                             </select>
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
                         </section>
                    </div>
               </div>
          </>
     );
}