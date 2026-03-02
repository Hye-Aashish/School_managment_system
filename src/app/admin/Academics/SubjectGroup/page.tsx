"use client";
import React, { useState } from "react";

export default function SubjectGroup() {
     const [openFilter, setOpenFilter] = useState<"action" | null>(null);
     const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

     const toggleFilter = (type: "action") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const subjects = [
          "English",
          "Hindi",
          "Mathematics",
          "Science",
          "Social Studies",
          "French",
          "Drawing",
          "Computer",
          "Elective 1",
          "Elective 2",
          "Elective 3",
     ];

     const handleSubjectToggle = (subject: string) => {
          if (selectedSubjects.includes(subject)) {
               setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
          } else {
               setSelectedSubjects([...selectedSubjects, subject]);
          }
     };

     const subjectGroups = [
          {
               id: 1,
               name: "Class 1st Subject Group",
               classes: ["1. Class 1(A)", "2. Class 1(B)", "3. Class 1(C)", "4. Class 1(D)"],
               subjects: ["English", "Hindi", "Mathematics", "Science", "Drawing", "Computer", "Elective 1"],
          },
          {
               id: 2,
               name: "Class 2nd Subject Group",
               classes: ["1. Class 2(A)", "2. Class 2(B)", "3. Class 2(C)", "4. Class 2(D)"],
               subjects: ["English", "Hindi", "Mathematics", "Science", "Drawing", "Computer", "Elective 1"],
          },
          {
               id: 3,
               name: "Class 3rd Subject Group",
               classes: ["1. Class 3(A)", "2. Class 3(B)", "3. Class 3(C)", "4. Class 3(D)"],
               subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer", "Elective 1", "Elective 2"],
          },
          {
               id: 4,
               name: "Class 4th Subject Group",
               classes: ["1. Class 4(A)", "2. Class 4(B)", "3. Class 4(C)", "4. Class 4(D)"],
               subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer", "Elective 1", "Elective 2"],
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    {/* Left Section - Add Subject Group Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Add Subject Group
                              </h3>
                              <div className="flex flex-col space-y-5">
                                   {/* Name Input */}
                                   <div className="w-full space-y-2 mb-0">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder=""
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>

                                   {/* Class Dropdown */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="">Select</option>
                                             <option value="class1">Class 1</option>
                                             <option value="class2">Class 2</option>
                                             <option value="class3">Class 3</option>
                                             <option value="class4">Class 4</option>
                                             <option value="class5">Class 5</option>
                                        </select>
                                   </div>

                                   {/* Sections Input */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Sections <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder=""
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>

                                   {/* Subject Checkboxes */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Subject <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-3 pt-2">
                                             {subjects.map((subject) => (
                                                  <label
                                                       key={subject}
                                                       className="flex items-center space-x-3 cursor-pointer"
                                                  >
                                                       <input
                                                            type="checkbox"
                                                            checked={selectedSubjects.includes(subject)}
                                                            onChange={() => handleSubjectToggle(subject)}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-sm font-medium text-bgray-900 dark:text-white">
                                                            {subject}
                                                       </span>
                                                  </label>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Description Textarea */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Description
                                        </label>
                                        <textarea
                                             rows={4}
                                             placeholder=""
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white resize-none"
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
                    </section>

                    {/* Right Section - Subject Group List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex justify-between items-center mb-6">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                        Subject Group List
                                   </h3>
                                   <div className="flex space-x-3">
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all"
                                             title="Copy"
                                        >
                                             <svg
                                                  className="stroke-bgray-900 dark:stroke-white"
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 20 20"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                             >
                                                  <path
                                                       d="M13.3333 10.75V14.25C13.3333 16.5 12.4167 17.4167 10.1667 17.4167H5.75C3.5 17.4167 2.58333 16.5 2.58333 14.25V9.83333C2.58333 7.58333 3.5 6.66667 5.75 6.66667H9.25"
                                                       strokeWidth="1.5"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M13.3333 10.75H10.9167C9.25 10.75 8.58333 10.0833 8.58333 8.41667V6L13.3333 10.75Z"
                                                       strokeWidth="1.5"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M9.41667 2.58333H12.5833"
                                                       strokeWidth="1.5"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M5.75 5.41667C5.75 3.625 7.20833 2.16667 9 2.16667H10.2583"
                                                       strokeWidth="1.5"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M17.4167 7.58333V12.0667C17.4167 13.7333 16.15 15 14.4833 15"
                                                       strokeWidth="1.5"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M17.4167 7.58333H15C13.4167 7.58333 12.5833 6.75 12.5833 5.16667V2.75L17.4167 7.58333Z"
                                                       strokeWidth="1.5"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                             </svg>
                                        </button>
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-bgray-200 dark:hover:bg-darkblack-400 transition-all"
                                             title="Print"
                                        >
                                             <svg
                                                  className="stroke-bgray-900 dark:stroke-white"
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 20 20"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                             >
                                                  <path
                                                       d="M5 7.5V5.83333C5 3.33333 6.25 2.5 8.33333 2.5H11.6667C13.75 2.5 15 3.33333 15 5.83333V7.5"
                                                       strokeWidth="1.5"
                                                       strokeMiterlimit="10"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M11.6667 15V17.5H8.33333V15"
                                                       strokeWidth="1.5"
                                                       strokeMiterlimit="10"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M15.8333 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 10C16.6667 9.53976 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53976 15 10C15 10.4602 15.3731 10.8333 15.8333 10.8333Z"
                                                       strokeWidth="1.5"
                                                       strokeMiterlimit="10"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                                  <path
                                                       d="M8.33333 15H11.6667C13.75 15 15 14.1667 15 11.6667V10C15 7.5 13.75 6.66667 11.6667 6.66667H8.33333C6.25 6.66667 5 7.5 5 10V11.6667C5 14.1667 6.25 15 8.33333 15Z"
                                                       strokeWidth="1.5"
                                                       strokeMiterlimit="10"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                  />
                                             </svg>
                                        </button>
                                   </div>
                              </div>

                              <div className="flex flex-col space-y-5">
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Name
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Class (Section)
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      Subject
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Action
                                                                 </span>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {subjectGroups.map((group) => (
                                                       <tr
                                                            key={group.id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {group.name}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex flex-col space-y-1">
                                                                      {group.classes.map((cls, index) => (
                                                                           <p
                                                                                key={index}
                                                                                className="font-medium text-base text-bgray-900 dark:text-bgray-50"
                                                                           >
                                                                                {cls}
                                                                           </p>
                                                                      ))}
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex flex-col space-y-1">
                                                                      {group.subjects.map((subject, index) => (
                                                                           <p
                                                                                key={index}
                                                                                className="font-medium text-base text-bgray-900 dark:text-bgray-50"
                                                                           >
                                                                                {subject}
                                                                           </p>
                                                                      ))}
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-3">
                                                                      <button
                                                                           type="button"
                                                                           className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors"
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 18 18"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M13.5 2.25L15.75 4.5L5.25 15H3V12.75L13.5 2.25Z"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="1.5"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </button>
                                                                      <button
                                                                           type="button"
                                                                           className="text-bgray-900 dark:text-white hover:text-red-500 transition-colors"
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 18 18"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M13.5 4.5L4.5 13.5"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="1.5"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                     d="M4.5 4.5L13.5 13.5"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="1.5"
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
                    </section>
               </div>
          </>
     );
}