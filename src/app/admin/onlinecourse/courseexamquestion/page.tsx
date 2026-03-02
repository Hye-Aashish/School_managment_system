"use client";
import React, { useState } from "react";

export default function QuestionBank() {
     const [openFilter, setOpenFilter] = useState<"tag" | "type" | "level" | "createdBy" | "pagination" | "action" | null>(null);
     const [searchQuery, setSearchQuery] = useState("");
     const [entriesPerPage, setEntriesPerPage] = useState(100);

     // Sample question data
     const questions = [
          {
               id: 38,
               questionTag: "Robotics",
               questionType: "Single Choice",
               level: "Medium",
               question: "What is the main purpose of robotics? A. Making videos B. Performing automated tasks C. Playing music D. Playing games",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 37,
               questionTag: "Hindi",
               questionType: "Single Choice",
               level: "Low",
               question: "What is the smallest unit of a language?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 36,
               questionTag: "Hindi",
               questionType: "Single Choice",
               level: "Medium",
               question: "How many basic letters are there in Hindi?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 35,
               questionTag: "Science",
               questionType: "Single Choice",
               level: "Medium",
               question: "The Chipko movement was originated in_____district of Uttarakhand",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 34,
               questionTag: "Mathematics",
               questionType: "Single Choice",
               level: "Low",
               question: "What are two things all graphs require?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 33,
               questionTag: "Mathematics",
               questionType: "Single Choice",
               level: "Medium",
               question: "Which type of graph represents size relationship between parts and the whole?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 32,
               questionTag: "Science",
               questionType: "Single Choice",
               level: "High",
               question: "Which form of energy is currently causing the largest amount of greenhouse gas emissions, globally?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 31,
               questionTag: "Science",
               questionType: "Single Choice",
               level: "Medium",
               question: "Which forms of energy are ultimately derived from solar energy?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 30,
               questionTag: "Communication Skills",
               questionType: "Single Choice",
               level: "Low",
               question: "What is the ability to understand and share the perspective of others called?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 29,
               questionTag: "Communication Skills",
               questionType: "Single Choice",
               level: "Low",
               question: "What are interpersonal skills?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 28,
               questionTag: "Communication Skills",
               questionType: "Single Choice",
               level: "Low",
               question: "Which of the following is an example of written communication?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 27,
               questionTag: "Science",
               questionType: "Single Choice",
               level: "High",
               question: "Which of these is not a kind of plant?",
               createdBy: "Joe Black (9000)"
          },
          {
               id: 26,
               questionTag: "Science",
               questionType: "Single Choice",
               level: "Medium",
               question: "Which of these is not a dehiscent plant?",
               createdBy: "Joe Black (9000)"
          }
     ];

     const toggleFilter = (type: "tag" | "type" | "level" | "createdBy" | "pagination" | "action") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Select Criteria Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <h2 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">Select Criteria</h2>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                   {/* Question Tag */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Question Tag
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-[50px] rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("tag")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Select</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "tag" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Robotics</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Hindi</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Science</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Mathematics</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Communication Skills</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Question Type */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Question Type
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-[50px] rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("type")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Select</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "type" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Single Choice</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Multiple Choice</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">True/False</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Question Level */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Question Level
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-[50px] rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("level")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Select</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "level" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Low</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Medium</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">High</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Created By */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                             Created By
                                        </label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-[50px] rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("createdBy")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Select</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "createdBy" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Joe Black (9000)</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Question Bank Table */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Header with Search and Action Buttons */}
                                   <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                                        <h2 className="text-xl font-bold text-bgray-900 dark:text-white">Question Bank</h2>
                                        <div className="flex flex-wrap gap-3">
                                             <button
                                                  type="button"
                                                  className="px-4 py-2.5 rounded-lg bg-bgray-900 hover:bg-bgray-800 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
                                             >
                                                  <svg
                                                       width="16"
                                                       height="16"
                                                       viewBox="0 0 24 24"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="9"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M12 8V16"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                       />
                                                       <path
                                                            d="M8 12H16"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                       />
                                                  </svg>
                                                  Add Tag
                                             </button>
                                             <button
                                                  type="button"
                                                  className="px-4 py-2.5 rounded-lg bg-bgray-900 hover:bg-bgray-800 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
                                             >
                                                  <svg
                                                       width="16"
                                                       height="16"
                                                       viewBox="0 0 24 24"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="9"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M12 8V16"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                       />
                                                       <path
                                                            d="M8 12H16"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                       />
                                                  </svg>
                                                  Add Question
                                             </button>
                                             <button
                                                  type="button"
                                                  className="px-4 py-2.5 rounded-lg bg-bgray-900 hover:bg-bgray-800 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
                                             >
                                                  <svg
                                                       width="16"
                                                       height="16"
                                                       viewBox="0 0 24 24"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <path
                                                            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <polyline
                                                            points="17 8 12 3 7 8"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <line
                                                            x1="12"
                                                            y1="3"
                                                            x2="12"
                                                            y2="15"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                                  Import
                                             </button>
                                             <button
                                                  type="button"
                                                  className="px-4 py-2.5 rounded-lg bg-bgray-900 hover:bg-bgray-800 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
                                             >
                                                  <svg
                                                       width="16"
                                                       height="16"
                                                       viewBox="0 0 24 24"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <polyline
                                                            points="3 6 5 6 21 6"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                                  Bulk Delete
                                             </button>
                                        </div>
                                   </div>

                                   {/* Search Bar and Entries Selector */}
                                   <div className="w-full flex flex-col sm:flex-row gap-4">
                                        <div
                                             className="flex-1 sm:block hidden border border-transparent focus-within:border-success-300 h-14 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                        >
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
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[100px]"
                                                  onClick={() => toggleFilter("pagination")}
                                             >
                                                  <span className="text-base text-bgray-900 dark:text-white font-semibold">{entriesPerPage}</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "pagination" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li
                                                            onClick={() => { setEntriesPerPage(10); toggleFilter("pagination"); }}
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                       >
                                                            10
                                                       </li>
                                                       <li
                                                            onClick={() => { setEntriesPerPage(25); toggleFilter("pagination"); }}
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                       >
                                                            25
                                                       </li>
                                                       <li
                                                            onClick={() => { setEntriesPerPage(50); toggleFilter("pagination"); }}
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                       >
                                                            50
                                                       </li>
                                                       <li
                                                            onClick={() => { setEntriesPerPage(100); toggleFilter("pagination"); }}
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                       >
                                                            100
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
                                                       <td className="py-5 px-2">
                                                            <label className="text-center">
                                                                 <input
                                                                      type="checkbox"
                                                                      className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                 />
                                                            </label>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <div className="flex items-center space-x-2.5">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Q. ID</span>
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
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <div className="flex items-center space-x-2.5">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Question Tag</span>
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
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <div className="flex items-center space-x-2.5">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Question Type</span>
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
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <div className="flex items-center space-x-2.5">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Level</span>
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
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <div className="flex items-center space-x-2.5">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Question</span>
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
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <div className="flex items-center space-x-2.5">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Created By</span>
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
                                                       <td className="py-5 px-6 xl:px-4">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {questions.map((question) => (
                                                       <tr key={question.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-2">
                                                                 <label className="text-center">
                                                                      <input
                                                                           type="checkbox"
                                                                           className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                      />
                                                                 </label>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.id}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.questionTag}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.questionType}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.level}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.question}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.createdBy}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
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
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Pagination */}
                                   <div className="pagination-content w-full">
                                        <div className="w-full flex lg:justify-between justify-center items-center">
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">Show result:</span>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">3</span>
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
                                                  </div>
                                             </div>
                                             <div className="flex sm:space-x-[35px] space-x-5 items-center">
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
                    </section>
               </div>
          </>
     );
}