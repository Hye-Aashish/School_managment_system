"use client";
import React, { useState } from "react";

export default function ContentList() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleFilter = (type: "export" | "pagination") => {
    setOpenFilter(openFilter === type ? null : type);
  };

  // Sample data - replace with your actual data
  const contentData = [
    {
      id: 1,
      fileName: "fees structure.pdf",
      contentType: "Other Downloads",
      size: "151.71 KB",
      uploadedBy: "Joe Black (9000)",
      createdOn: "12/02/2025 13:01:34",
      fileType: "pdf",
      thumbnail: "/path-to-thumbnail.jpg"
    },
    {
      id: 2,
      fileName: "New Books Collection",
      contentType: "Study Material",
      size: "27.73 KB",
      uploadedBy: "Joe Black (9000)",
      createdOn: "12/02/2025 18:59:46",
      fileType: "pdf",
      thumbnail: "/path-to-thumbnail.jpg"
    },
    {
      id: 3,
      fileName: "Book List.pdf",
      contentType: "Study Material",
      size: "17.42 KB",
      uploadedBy: "Joe Black (9000)",
      createdOn: "11/04/2025 11:20:11",
      fileType: "pdf",
      thumbnail: "/path-to-thumbnail.jpg"
    },
    {
      id: 4,
      fileName: "fee-structure- (2).jpg",
      contentType: "Other Downloads",
      size: "58.15 KB",
      uploadedBy: "Joe Black (9000)",
      createdOn: "11/01/2025 13:32:50",
      fileType: "image",
      thumbnail: "/path-to-thumbnail.jpg"
    },
    {
      id: 5,
      fileName: "Fees-Structure_2025-26 .pdf",
      contentType: "Other Downloads",
      size: "417.81 KB",
      uploadedBy: "Joe Black (9000)",
      createdOn: "10/02/2025 17:58:43",
      fileType: "pdf",
      thumbnail: "/path-to-thumbnail.jpg"
    },
  ];

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              {/* Header Section */}
              <div className="w-full flex justify-between items-center">
                <h3 className="text-2xl font-bold text-bgray-900 dark:text-white">
                  Content List
                </h3>
                <button
                  type="button"
                  className="px-6 py-3 bg-success-300 hover:bg-success-400 text-white rounded-lg font-semibold transition-all"
                >
                  <span className="flex items-center space-x-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>Upload</span>
                  </span>
                </button>
              </div>

              {/* Search and Filters */}
              <div className="w-full flex h-14 space-x-4">
                <div className="w-full me-0 sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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

                {/* View Toggle Buttons */}
                <div className="flex space-x-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 rounded-md transition-all ${
                      viewMode === "list"
                        ? "bg-success-300 text-white"
                        : "text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500"
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4H17M3 10H17M3 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 rounded-md transition-all ${
                      viewMode === "grid"
                        ? "bg-success-300 text-white"
                        : "text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500"
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="1"/>
                      <rect x="11" y="3" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="1"/>
                      <rect x="3" y="11" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="1"/>
                      <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="1"/>
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                    onClick={() => toggleFilter("export")}
                  >
                    <span className="text-base text-bgray-500 text-nowrap">Export</span>
                    <span>
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"}`}>
                    <ul>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Copy</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">PDF</li>
                      <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Content Area - Grid or List View */}
              <div className="table-content w-full min-h-[52vh]">
                {viewMode === "grid" ? (
                  // Grid View
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contentData.map((item) => (
                      <div
                        key={item.id}
                        className="border border-bgray-300 dark:border-darkblack-400 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-darkblack-600"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 rounded border-bgray-300 text-success-300 focus:ring-success-300"
                          />
                          <div className="flex space-x-2">
                            <button className="text-success-300 hover:text-success-400">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </button>
                            <button className="text-error-300 hover:text-error-400">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4H14M6 7V11M10 7V11M3 4L4 13C4 13.5 4.5 14 5 14H11C11.5 14 12 13.5 12 13L13 4M6 4V2H10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-center mb-4">
                          <div className="w-20 h-20 mb-3 flex items-center justify-center bg-bgray-100 dark:bg-darkblack-500 rounded-lg">
                            {item.fileType === "pdf" ? (
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 5H22L30 13V32C30 33.1 29.1 34 28 34H10C8.9 34 8 33.1 8 32V7C8 5.9 8.9 5 10 5Z" fill="#E53E3E" stroke="#E53E3E" strokeWidth="2"/>
                                <path d="M22 5V13H30" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <text x="19" y="26" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">PDF</text>
                              </svg>
                            ) : (
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="8" width="24" height="24" rx="2" fill="#48BB78" stroke="#48BB78" strokeWidth="2"/>
                                <path d="M14 18L20 24L26 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-bgray-900 dark:text-white text-center line-clamp-2">
                            {item.fileName}
                          </h4>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-bgray-600 dark:text-bgray-400">Type:</span>
                            <span className="text-bgray-900 dark:text-white font-medium">{item.contentType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-bgray-600 dark:text-bgray-400">Size:</span>
                            <span className="text-bgray-900 dark:text-white font-medium">{item.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-bgray-600 dark:text-bgray-400">By:</span>
                            <span className="text-success-300 font-medium">{item.uploadedBy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-bgray-600 dark:text-bgray-400">Date:</span>
                            <span className="text-bgray-900 dark:text-white font-medium">{item.createdOn}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View (Table)
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                          <td className="py-5 px-6 xl:px-0 w-[50px]">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-bgray-300 text-success-300 focus:ring-success-300"
                            />
                          </td>
                          <td className="py-5 px-6 xl:px-0">
                            <div className="w-full flex space-x-2.5 items-center">
                              <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Document</span>
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
                              <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Content Type</span>
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
                              <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Size</span>
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
                              <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Upload By</span>
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
                              <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Created On</span>
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
                        </tr>
                      </thead>
                      <tbody>
                        {contentData.map((item) => (
                          <tr key={item.id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100 dark:hover:bg-darkblack-500">
                            <td className="py-5 px-6 xl:px-0">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                className="w-4 h-4 rounded border-bgray-300 text-success-300 focus:ring-success-300"
                              />
                            </td>
                            <td className="py-5 px-6 xl:px-0">
                              <p className="font-medium text-base text-success-300 hover:underline cursor-pointer">
                                {item.fileName}
                              </p>
                            </td>
                            <td className="py-5 px-6 xl:px-0">
                              <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                {item.contentType}
                              </p>
                            </td>
                            <td className="py-5 px-6 xl:px-0">
                              <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                {item.size}
                              </p>
                            </td>
                            <td className="py-5 px-6 xl:px-0">
                              <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                {item.uploadedBy}
                              </p>
                            </td>
                            <td className="py-5 px-6 xl:px-0">
                              <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                {item.createdOn}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                        <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">12</span>
                        <span>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                      <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden ${openFilter === "pagination" ? "block" : "hidden"}`}>
                        <ul>
                          <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">6</li>
                          <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">12</li>
                          <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">24</li>
                        </ul>
                      </div>
                    </div>
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
                      <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-bgray-50">
                        1
                      </button>
                      <button type="button" className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500">
                        2
                      </button>
                      <span className="text-bgray-500 text-sm">. . . .</span>
                      <button type="button" className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500">
                        20
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
          </div>
        </section>
      </div>
    </>
  );
}