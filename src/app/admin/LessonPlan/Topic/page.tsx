"use client";
import React, { useState } from "react";

export default function AddTopic() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [topicNames, setTopicNames] = useState<string[]>([""]);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const addTopicName = () => {
          setTopicNames([...topicNames, ""]);
     };

     const removeTopicName = (index: number) => {
          const newTopicNames = topicNames.filter((_, i) => i !== index);
          setTopicNames(newTopicNames);
     };

     const handleTopicNameChange = (index: number, value: string) => {
          const newTopicNames = [...topicNames];
          newTopicNames[index] = value;
          setTopicNames(newTopicNames);
     };

     const topicData = [
          {
               id: 1,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "English (210)",
               lesson: "Alice In Wonderland",
               topic: "Wonderland Chapter-5",
          },
          {
               id: 2,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "English (210)",
               lesson: "The Milkman's Cow",
               topic: "The Cow's",
          },
          {
               id: 3,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "English (210)",
               lesson: "I Had a Little Pony",
               topic: "Pony Story Chapter-7",
          },
          {
               id: 4,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "Mathematics (110)",
               lesson: "Tables and Shares",
               topic: "Shapes Angle Chapter-5",
          },
          {
               id: 5,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "Mathematics (110)",
               lesson: "Building with Bricks",
               topic: "Fire Resistant",
          },
          {
               id: 6,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "Mathematics (110)",
               lesson: "Carts and Wheels",
               topic: "Making a Circle Chapter-8",
          },
          {
               id: 7,
               class: "Class 5",
               section: "A",
               subjectGroup: "Class 5th Subject Group",
               subject: "Mathematics (110)",
               lesson: "Long and Short",
               topic: "Length and Distance Chapter-10",
          },
          {
               id: 8,
               class: "Class 1",
               section: "A",
               subjectGroup: "Class 1st Subject Group",
               subject: "English (210)",
               lesson: "First Day at School",
               topic: "School Life School Day's Chapter-2",
          },
          {
               id: 9,
               class: "Class 1",
               section: "A",
               subjectGroup: "Class 1st Subject Group",
               subject: "English (210)",
               lesson: "The Wind and the Sun",
               topic: "The Wind",
          },
          {
               id: 10,
               class: "Class 1",
               section: "A",
               subjectGroup: "Class 1st Subject Group",
               subject: "English (210)",
               lesson: "Storm in the Garden",
               topic: "My Garden Chapter 2",
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    {/* Left Section - Add Topic Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Add Topic
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

                                   {/* Lesson Dropdown */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Lesson <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="">Select</option>
                                             <option value="lesson1">Alice In Wonderland</option>
                                             <option value="lesson2">The Milkman's Cow</option>
                                        </select>
                                   </div>

                                   {/* Topic Name Inputs with Add More */}
                                   <div className="w-full space-y-2">
                                        <div className="flex justify-between items-center">
                                             <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                                  Topic Name <span className="text-red-500">*</span>
                                             </label>
                                             <button
                                                  type="button"
                                                  onClick={addTopicName}
                                                  className="px-4 py-1.5 text-xs font-semibold text-white bg-bgray-500 hover:bg-bgray-600 dark:bg-bgray-600 dark:hover:bg-bgray-700 rounded transition-all"
                                             >
                                                  Add More
                                             </button>
                                        </div>
                                        <div className="space-y-3">
                                             {topicNames.map((topic, index) => (
                                                  <div key={index} className="flex items-center space-x-2">
                                                       <input
                                                            type="text"
                                                            value={topic}
                                                            onChange={(e) => handleTopicNameChange(index, e.target.value)}
                                                            placeholder=""
                                                            className="flex-1 px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                                       />
                                                       {topicNames.length > 1 && (
                                                            <button
                                                                 type="button"
                                                                 onClick={() => removeTopicName(index)}
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

                    {/* Right Section - Topic List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Topic List
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden ${openFilter === "pagination" ? "block" : "hidden"
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"
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
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Topic
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
                                                  {topicData.map((item) => (
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
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.lesson}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.topic}
                                                                 </p>
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