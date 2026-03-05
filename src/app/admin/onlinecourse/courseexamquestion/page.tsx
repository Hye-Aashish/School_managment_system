"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';

export default function QuestionBank() {
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [searchQuery, setSearchQuery] = useState("");
     const [entriesPerPage, setEntriesPerPage] = useState(100);

     const [selectedTag, setSelectedTag] = useState<string>("");
     const [selectedType, setSelectedType] = useState<string>("");
     const [selectedLevel, setSelectedLevel] = useState<string>("");
     const [selectedCreator, setSelectedCreator] = useState<string>("");

     const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
     const [formData, setFormData] = useState({
          question: "",
          type: "single_choice",
          level: "low",
          subject: "",
          options: "",
          answer: ""
     });

     const [questions, setQuestions] = useState<any[]>([]);

     useEffect(() => {
          fetchQuestions();
     }, []);

     const fetchQuestions = async () => {
          try {
               const response = await fetch("/api/online-course/question");
               if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
               } else {
                    console.error("Failed to fetch questions");
               }
          } catch (error) {
               console.error("An error occurred while fetching questions:", error);
          }
     };

     const handleCreateQuestion = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
               const payload = {
                    ...formData,
                    options: formData.options.split(",").map((o) => o.trim()).filter((o) => o)
               };
               const response = await fetch("/api/online-course/question", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
               });
               if (response.ok) {
                    setIsAddQuestionModalOpen(false);
                    setFormData({ question: "", type: "single_choice", level: "low", subject: "", options: "", answer: "" });
                    fetchQuestions();
               }
          } catch (error) {
               console.error("Failed to create question", error);
          }
     };

     const toggleFilter = (type: string) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const tags = Array.from(new Set(questions.map((q) => q.subject || q.questionTag || "N/A"))).filter(Boolean);
     const types = Array.from(new Set(questions.map((q) => q.type || q.questionType || ""))).filter(Boolean);
     const levels = Array.from(new Set(questions.map((q) => q.level || ""))).filter(Boolean);
     const creators = Array.from(new Set(questions.map((q) => q.createdBy || "Super Admin"))).filter(Boolean);

     const filteredQuestions = questions.filter((q) => {
          const matchTag = selectedTag ? (q.subject || q.questionTag || "N/A") === selectedTag : true;
          const matchType = selectedType ? (q.type || q.questionType || "") === selectedType : true;
          const matchLevel = selectedLevel ? (q.level || "") === selectedLevel : true;
          const matchCreator = selectedCreator ? (q.createdBy || "Super Admin") === selectedCreator : true;
          const matchSearch = searchQuery ? (q.question || "").toLowerCase().includes(searchQuery.toLowerCase()) : true;
          return matchTag && matchType && matchLevel && matchCreator && matchSearch;
     });

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
                                                  <span className="text-base text-bgray-500 text-nowrap">{selectedTag || "Select"}</span>
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
                                                       <li onClick={() => { setSelectedTag(""); toggleFilter("tag"); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            All
                                                       </li>
                                                       {tags.map((tag) => (
                                                            <li key={tag} onClick={() => { setSelectedTag(tag); toggleFilter("tag"); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                 {tag}
                                                            </li>
                                                       ))}
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
                                                  <span className="text-base text-bgray-500 text-nowrap capitalize">{selectedType ? selectedType.replace('_', ' ') : "Select"}</span>
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
                                                       <li onClick={() => { setSelectedType(""); toggleFilter("type"); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            All
                                                       </li>
                                                       {types.map((type) => (
                                                            <li key={type} onClick={() => { setSelectedType(type); toggleFilter("type"); }} className="capitalize text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                 {type.replace('_', ' ')}
                                                            </li>
                                                       ))}
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
                                                  <span className="text-base text-bgray-500 text-nowrap capitalize">{selectedLevel || "Select"}</span>
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
                                                       <li onClick={() => { setSelectedLevel(""); toggleFilter("level"); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            All
                                                       </li>
                                                       {levels.map((level) => (
                                                            <li key={level} onClick={() => { setSelectedLevel(level); toggleFilter("level"); }} className="capitalize text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                 {level}
                                                            </li>
                                                       ))}
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
                                                  <span className="text-base text-bgray-500 text-nowrap">{selectedCreator || "Select"}</span>
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
                                                       <li onClick={() => { setSelectedCreator(""); toggleFilter("createdBy"); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            All
                                                       </li>
                                                       {creators.map((creator) => (
                                                            <li key={creator} onClick={() => { setSelectedCreator(creator); toggleFilter("createdBy"); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                                 {creator}
                                                            </li>
                                                       ))}
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
                                             <Link
                                                  href="/admin/onlinecourse/coursecategory"
                                                  className="px-4 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
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
                                             </Link>
                                             <button
                                                  type="button"
                                                  onClick={() => setIsAddQuestionModalOpen(true)}
                                                  className="px-4 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
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
                                                  className="px-4 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
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
                                                  className="px-4 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
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
                                                  {filteredQuestions.map((question, index) => (
                                                       <tr key={question._id || index} className="border-b border-bgray-300 dark:border-darkblack-400">
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
                                                                      {questions.length - index}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.subject || question.questionTag || "N/A"}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50 capitalize">
                                                                      {(question.type || question.questionType || "").replace('_', ' ')}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50 capitalize">
                                                                      {question.level}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50 line-clamp-2" title={question.question}>
                                                                      {question.question}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {question.createdBy || "Super Admin"}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-4">
                                                                 <div className="relative">
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => toggleFilter(`action-${index}`)}
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
                                                                           className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 min-w-[150px] absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === `action-${index}` ? "block" : "hidden"
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

               {/* Add Question Modal */}
               {isAddQuestionModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                         <div className="bg-white dark:bg-darkblack-600 rounded-lg shadow-lg w-full max-w-2xl p-6 mx-4">
                              <div className="flex justify-between items-center mb-6">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Add Question</h3>
                                   <button onClick={() => setIsAddQuestionModalOpen(false)} className="text-bgray-500 hover:text-bgray-900">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                             <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                   </button>
                              </div>

                              <form onSubmit={handleCreateQuestion}>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Question Subject / Tag</label>
                                             <input
                                                  type="text"
                                                  value={formData.subject}
                                                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                  className="w-full h-12 rounded-lg bg-bgray-50 border border-bgray-200 px-4 focus:outline-none focus:border-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-white"
                                                  placeholder="e.g. Mathematics"
                                                  required
                                             />
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Level</label>
                                             <select
                                                  value={formData.level}
                                                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                                  className="w-full h-12 rounded-lg bg-bgray-50 border border-bgray-200 px-4 focus:outline-none focus:border-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-white"
                                             >
                                                  <option value="low">Low</option>
                                                  <option value="medium">Medium</option>
                                                  <option value="high">High</option>
                                             </select>
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Question Type</label>
                                             <select
                                                  value={formData.type}
                                                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                  className="w-full h-12 rounded-lg bg-bgray-50 border border-bgray-200 px-4 focus:outline-none focus:border-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-white"
                                             >
                                                  <option value="single_choice">Single Choice</option>
                                                  <option value="multiple_choice">Multiple Choice</option>
                                                  <option value="true_false">True / False</option>
                                             </select>
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Answer</label>
                                             <input
                                                  type="text"
                                                  value={formData.answer}
                                                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                                  className="w-full h-12 rounded-lg bg-bgray-50 border border-bgray-200 px-4 focus:outline-none focus:border-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-white"
                                                  placeholder="The correct answer"
                                                  required
                                             />
                                        </div>
                                        <div className="md:col-span-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Options (Comma separated)</label>
                                             <input
                                                  type="text"
                                                  value={formData.options}
                                                  onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                                                  className="w-full h-12 rounded-lg bg-bgray-50 border border-bgray-200 px-4 focus:outline-none focus:border-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-white"
                                                  placeholder="e.g. Option A, Option B, Option C, Option D"
                                                  required
                                             />
                                        </div>
                                        <div className="md:col-span-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Question</label>
                                             <textarea
                                                  value={formData.question}
                                                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                  className="w-full h-24 rounded-lg bg-bgray-50 border border-bgray-200 p-4 focus:outline-none focus:border-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-white resize-none"
                                                  placeholder="Enter your question here..."
                                                  required
                                             />
                                        </div>
                                   </div>
                                   <div className="flex justify-end gap-3 mt-6">
                                        <button
                                             type="button"
                                             onClick={() => setIsAddQuestionModalOpen(false)}
                                             className="px-6 py-2.5 rounded-lg text-bgray-600 font-semibold bg-bgray-100 hover:bg-bgray-200 transition-colors"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             type="submit"
                                             className="px-6 py-2.5 rounded-lg text-white font-semibold bg-success-300 hover:bg-success-400 transition-colors cursor-pointer"
                                        >
                                             Save Question
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </>
     );
}