"use client";
import React, { useState } from "react";

export default function AddLesson() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [lessonNames, setLessonNames] = useState<string[]>([""]);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const addLessonName = () => {
          setLessonNames([...lessonNames, ""]);
     };

     const removeLessonName = (index: number) => {
          const newLessonNames = lessonNames.filter((_, i) => i !== index);
          setLessonNames(newLessonNames);
     };

     const handleLessonNameChange = (index: number, value: string) => {
          const newLessonNames = [...lessonNames];
          newLessonNames[index] = value;
          setLessonNames(newLessonNames);
     };

     const lessonData = [
          {
               id: 1,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "English (210)",
               lessons: ["Alice In Wonderland", "The Milkman's Cow", "I Had a Little Pony"],
          },
          {
               id: 2,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "Mathematics (110)",
               lessons: ["Tables and Shares", "Building with Bricks", "Carts and Wheels", "Long and Short"],
          },
          {
               id: 3,
               class: "Class 1",
               section: "A",
               subjectGroup: "Class 1st Subject Group",
               subject: "English (210)",
               lessons: [
                    "First Day at School",
                    "The Wind and the Sun",
                    "Storm in the Garden",
                    "The Grasshopper and the Ant",
                    "First Day at School",
                    "The Wind and the Sun",
                    "Storm in the Garden",
                    "The Grasshopper and the Ant",
               ],
          },
          {
               id: 4,
               class: "Class 2",
               section: "A",
               subjectGroup: "Class 2nd Subject Group",
               subject: "English (210)",
               lessons: ["Nina and the Baby Sparrows", "Sea Song", "The Balloon Man"],
          },
          {
               id: 5,
               class: "Class 1",
               section: "A",
               subjectGroup: "Class 1st Subject Group",
               subject: "Mathematics (110)",
               lessons: ["Fun With Numbers", "Play With Patterns", "Shapes And Designs"],
          },
          {
               id: 6,
               class: "Class 3",
               section: "A",
               subjectGroup: "Class 3rd Subject Group",
               subject: "Science (111)",
               lessons: ["Adaptations in plants", "Measurement", "Teeth and Microbes", "Our Environment"],
          },
          {
               id: 7,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "Social Studies (212)",
               lessons: ["The Temperate Grasslands", "The Climate in the Country"],
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    {/* Left Section - Add Lesson Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Add Lesson
                              </h3>
                              <div className="flex flex-col space-y-5">
                                   {/* Class Dropdown */}
                                   <div className="w-full space-y-2 mb-0">
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

                                   {/* Section Dropdown */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="">Select</option>
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
                                             <option value="">Select</option>
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
                                             <option value="">Select</option>
                                             <option value="english">English (210)</option>
                                             <option value="hindi">Hindi (230)</option>
                                        </select>
                                   </div>

                                   {/* Lesson Name Inputs with Add More */}
                                   <div className="w-full space-y-2">
                                        <div className="flex justify-between items-center">
                                             <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                  Lesson Name <span className="text-red-500">*</span>
                                             </label>
                                             <button
                                                  type="button"
                                                  onClick={addLessonName}
                                                  className="px-4 py-1.5 text-xs font-semibold text-white bg-bgray-500 hover:bg-bgray-600 dark:bg-bgray-600 dark:hover:bg-bgray-700 rounded transition-all"
                                             >
                                                  Add More
                                             </button>
                                        </div>
                                        <div className="space-y-3">
                                             {lessonNames.map((lesson, index) => (
                                                  <div key={index} className="flex items-center space-x-2">
                                                       <input
                                                            type="text"
                                                            value={lesson}
                                                            onChange={(e) => handleLessonNameChange(index, e.target.value)}
                                                            placeholder=""
                                                            className="flex-1 px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       />
                                                       {lessonNames.length > 1 && (
                                                            <button
                                                                 type="button"
                                                                 onClick={() => removeLessonName(index)}
                                                                 className="text-red-500 hover:text-red-600 transition-colors"
                                                            >
                                                                 <svg
                                                                      width="20"
                                                                      height="20"
                                                                      viewBox="0 0 20 20"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M15 5L5 15"
                                                                           stroke="currentColor"
                                                                           strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5 5L15 15"
                                                                           stroke="currentColor"
                                                                           strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </button>
                                                       )}
                                                  </div>
                                             ))}
                                        </div>
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

                    {/* Right Section - Lesson List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Lesson List
                              </h3>
                              <div className="flex flex-col space-y-5">
                                   {/* Search and Export */}
                                   <div className="w-full flex h-14 space-x-4">
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
                                                            placeholder="Search..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        {/* Show Results Dropdown */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="px-2.5 py-[14px] h-full border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center bg-white dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("pagination")}
                                             >
                                                  <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
                                                       100
                                                  </span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden ${
                                                       openFilter === "pagination" ? "block" : "hidden"
                                                  }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600">
                                                            10
                                                       </li>
                                                       <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600">
                                                            50
                                                       </li>
                                                       <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600">
                                                            100
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>

                                        {/* Export Dropdown */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 relative dark:bg-darkblack-500"
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${
                                                       openFilter === "export" ? "block" : "hidden"
                                                  }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Copy
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Excel
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            CSV
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            PDF
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Print
                                                       </li>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Class
                                                                 </span>
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
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      Section
                                                                 </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Subject Group
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Subject
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Lesson
                                                                 </span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Action
                                                            </span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {lessonData.map((item) => (
                                                       <tr
                                                            key={item.id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.class}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.section}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.subjectGroup}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.subject}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex flex-col space-y-1">
                                                                      {item.lessons.map((lesson, index) => (
                                                                           <p
                                                                                key={index}
                                                                                className="font-medium text-base text-bgray-900 dark:text-bgray-50"
                                                                           >
                                                                                {lesson}
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