"use client";
import React, { useState } from "react";

export default function RouteManagement() {
  const [openFilter, setOpenFilter] = useState<"action" | "export" | null>(null);
  const [routeTitle, setRouteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFilter = (type: "action" | "export") => {
    setOpenFilter(openFilter === type ? null : type);
  };

  const routeData = [
    { title: "Brooklyn Central" },
    { title: "Brooklyn East" },
    { title: "Brooklyn West" },
    { title: "Brooklyn South" },
    { title: "Brooklyn North" },
    { title: "Railway station" },
    { title: "High Court" },
    { title: "Vijay Nagar" },
    { title: "Civil Line" },
    { title: "Dindayal Chowk" },
    { title: "Ranitaal" },
  ];

  const filteredRoutes = routeData.filter((route) =>
    route.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="2xl:flex 2xl:space-x-12">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
            {/* Create Route Section */}
            <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[320px]">
              <div className="flex flex-col space-y-5">
                <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Create Route</h3>
                <div className="w-full space-y-4">
                  <div className="w-full">
                    <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                      Route Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={routeTitle}
                      onChange={(e) => setRouteTitle(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:border-success-300"
                    />
                  </div>
                  <button
                    type="button"
                    className="py-3.5 flex items-center justify-center text-white font-bold !bg-gray-900 !hover:bg-gray-800 dark:bg-darkblack-500 dark:hover:bg-darkblack-400 transition-all rounded-lg w-full"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Route List Section */}
            <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
              <div className="flex flex-col space-y-5">
                <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Route List</h3>
                
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
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Export Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
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
                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Route Title</span>
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
                      {filteredRoutes.map((route, index) => (
                        <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                          <td className="py-5 px-6 xl:px-0">
                            <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{route.title}</p>
                          </td>
                          <td className="py-5 px-6 xl:px-0">
                            <div className="flex items-center space-x-2">
                              <button type="button" className="hover:opacity-70 transition" title="Edit">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.25 3H3C2.175 3 1.5 3.675 1.5 4.5V15C1.5 15.825 2.175 16.5 3 16.5H13.5C14.325 16.5 15 15.825 15 15V9.75" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M13.875 1.875C14.325 1.425 15.075 1.425 15.525 1.875C15.975 2.325 15.975 3.075 15.525 3.525L8.25 10.8L5.25 11.625L6.075 8.625L13.875 1.875Z" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                              <button type="button" className="hover:opacity-70 transition" title="Delete">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.25 4.5H3.75H15.75" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M6 4.5V3C6 2.175 6.675 1.5 7.5 1.5H10.5C11.325 1.5 12 2.175 12 3V4.5M14.25 4.5V15C14.25 15.825 13.575 16.5 12.75 16.5H5.25C4.425 16.5 3.75 15.825 3.75 15V4.5H14.25Z" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <div className="w-full flex lg:justify-between justify-center items-center">
                    <div className="lg:flex hidden space-x-4 items-center">
                      <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">
                        Records: 1 to 11 of 11
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
                        <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-bgray-50">
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}