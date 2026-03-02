"use client";
import React, { useState } from "react";

export default function HomeworkList() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "closed">("upcoming");
  const [openActionRow, setOpenActionRow] = useState<number | null>(null);

  const toggleFilter = (type: "class" | "section" | "subjectGroup" | "subject" | "pagination" | "export") => {
    setOpenFilter(openFilter === type ? null : type);
  };

  const toggleActionDropdown = (rowIndex: number) => {
    setOpenActionRow(openActionRow === rowIndex ? null : rowIndex);
  };

  // Sample homework data
  const homeworkData = [
    {
      id: 1,
      class: "Class 2",
      section: "A",
      subjectGroup: "Class 2nd Subject Group",
      subject: "English (210)",
      homeworkDate: "01/02/2026",
      submissionDate: "01/02/2026",
      evaluationDate: "",
      createdBy: "Joe Black (9000)",
    },
  ];

  return (
    <>
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          {/* Select Criteria Section */}
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Class Dropdown */}
              <div>
                <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                  Class <span className="text-error-300">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border rounded-lg border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 flex justify-between items-center text-left"
                    onClick={() => toggleFilter("class")}
                  >
                    <span className="text-sm text-bgray-900 dark:text-bgray-50">Class 2</span>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 overflow-hidden ${openFilter === "class" ? "block" : "hidden"}`}>
                    <ul>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Class 1</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Class 2</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Class 3</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section Dropdown */}
              <div>
                <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                  Section
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border rounded-lg border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 flex justify-between items-center text-left"
                    onClick={() => toggleFilter("section")}
                  >
                    <span className="text-sm text-bgray-900 dark:text-bgray-50">A</span>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 overflow-hidden ${openFilter === "section" ? "block" : "hidden"}`}>
                    <ul>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">A</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">B</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">C</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Subject Group Dropdown */}
              <div>
                <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                  Subject Group
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border rounded-lg border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 flex justify-between items-center text-left"
                    onClick={() => toggleFilter("subjectGroup")}
                  >
                    <span className="text-sm text-bgray-900 dark:text-bgray-50">Class 2nd Subject Group</span>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 overflow-hidden ${openFilter === "subjectGroup" ? "block" : "hidden"}`}>
                    <ul>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Class 2nd Subject Group</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Science Group</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Arts Group</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                  Subject
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border rounded-lg border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 flex justify-between items-center text-left"
                    onClick={() => toggleFilter("subject")}
                  >
                    <span className="text-sm text-bgray-900 dark:text-bgray-50">English (210)</span>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute z-10 top-14 overflow-hidden ${openFilter === "subject" ? "block" : "hidden"}`}>
                    <ul>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">English (210)</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Math (220)</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">Science (230)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Homework List Section */}
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              {/* Header with Title and Add Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-bgray-900 dark:text-white">
                  Homework List
                </h3>
                <button
                  type="button"
                  className="px-6 py-3 bg-bgray-600 hover:bg-bgray-800 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 text-white rounded-lg font-semibold transition-all flex items-center space-x-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-bgray-300 dark:border-darkblack-400">
                <div className="flex space-x-8">
                  <button
                    type="button"
                    onClick={() => setActiveTab("upcoming")}
                    className={`pb-4 font-semibold text-base transition-all relative ${
                      activeTab === "upcoming"
                        ? "text-bgray-900 dark:text-white border-b-2 border-orange-500"
                        : "text-bgray-500 hover:text-bgray-900 dark:hover:text-white"
                    }`}
                  >
                    Upcoming Homework
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("closed")}
                    className={`pb-4 font-semibold text-base transition-all relative ${
                      activeTab === "closed"
                        ? "text-bgray-900 dark:text-white border-b-2 border-orange-500"
                        : "text-bgray-500 hover:text-bgray-900 dark:hover:text-white"
                    }`}
                  >
                    Closed Homework
                  </button>
                </div>
              </div>

              {/* Search and Export Section */}
              <div className="w-full flex justify-between items-center h-14">
                <div className="w-1/3 border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                        <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

                <div className="flex items-center space-x-4">
                  {/* Results Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      className="px-4 py-3 border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-3 items-center bg-white dark:bg-darkblack-500"
                      onClick={() => toggleFilter("pagination")}
                    >
                      <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">100</span>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden ${openFilter === "pagination" ? "block" : "hidden"}`}>
                      <ul>
                        <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">50</li>
                        <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">100</li>
                        <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">200</li>
                      </ul>
                    </div>
                  </div>

                  {/* Export Icons */}
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="Copy">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="6" width="10" height="10" rx="1" stroke="#718096" strokeWidth="1.5" />
                        <path d="M4 14H3C2.4 14 2 13.6 2 13V3C2 2.4 2.4 2 3 2H13C13.6 2 14 2.4 14 3V4" stroke="#718096" strokeWidth="1.5" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="Excel">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3H12L16 7V17C16 17.5 15.5 18 15 18H4C3.5 18 3 17.5 3 17V4C3 3.5 3.5 3 4 3Z" stroke="#10B981" strokeWidth="1.5" />
                        <path d="M12 3V7H16" stroke="#10B981" strokeWidth="1.5" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="CSV">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3H12L16 7V17C16 17.5 15.5 18 15 18H4C3.5 18 3 17.5 3 17V4C3 3.5 3.5 3 4 3Z" stroke="#3B82F6" strokeWidth="1.5" />
                        <path d="M12 3V7H16" stroke="#3B82F6" strokeWidth="1.5" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="PDF">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3H12L16 7V17C16 17.5 15.5 18 15 18H4C3.5 18 3 17.5 3 17V4C3 3.5 3.5 3 4 3Z" stroke="#EF4444" strokeWidth="1.5" />
                        <path d="M12 3V7H16" stroke="#EF4444" strokeWidth="1.5" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="Print">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7V3H15V7M5 13H3C2.4 13 2 12.6 2 12V8C2 7.4 2.4 7 3 7H17C17.6 7 18 7.4 18 8V12C18 12.6 17.6 13 17 13H15" stroke="#718096" strokeWidth="1.5" />
                        <rect x="5" y="11" width="10" height="6" stroke="#718096" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="table-content w-full min-h-[40vh] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                      <td className="py-5 px-6 xl:px-0">
                        <div className="w-full flex space-x-2.5 items-center">
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Class</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Section</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Subject Group</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Subject</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Homework Date</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Submission Date</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Evaluation Date</span>
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
                          <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Created By</span>
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
                    {homeworkData.map((item, index) => (
                      <tr key={item.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.class}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.section}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.subjectGroup}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.subject}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.homeworkDate}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.submissionDate}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.evaluationDate || "-"}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.createdBy}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="View">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="#718096" strokeWidth="1.5" />
                                <circle cx="9" cy="9" r="2.5" stroke="#718096" strokeWidth="1.5" />
                              </svg>
                            </button>
                            <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="Edit">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L16 5L6 15H3V12L13 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded" title="Delete">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5H15M7 8V13M11 8V13M4 5L5 15C5 15.5 5.5 16 6 16H12C12.5 16 13 15.5 13 15L14 5M7 5V2H11V5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Records Info and Pagination */}
              <div className="w-full flex lg:justify-between justify-center items-center">
                <div className="lg:flex hidden">
                  <span className="text-sm text-bgray-600 dark:text-bgray-50">
                    Records: 1 to 1 of 1
                  </span>
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
                    <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500">
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
        </section>
      </div>
    </>
  );
}