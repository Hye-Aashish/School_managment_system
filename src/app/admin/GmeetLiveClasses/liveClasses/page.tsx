"use client";
import React, { useState } from "react";

export default function LiveClasses() {
     const [openFilter, setOpenFilter] = useState<"action" | "status" | null>(null);

     const toggleFilter = (type: "action" | "status") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample data based on the image
     const liveClassesData = [
          {
               id: 1,
               classTitle: "Social Studies Classes",
               description: "Social Studies Classes",
               dateTime: "12/30/2025\n12:30:00",
               duration: 35,
               createdBy: "Joe Black (Super Admin : 9000)",
               createdFor: "Albert Thomas (Teacher : 5454544)",
               classes: ["Class 1 (A)", "Class 1 (B)", "Class 1 (C)", "Class 1 (D)"],
               status: "Awaited"
          },
          {
               id: 2,
               classTitle: "EVS Extra Classes",
               description: "EVS Extra Classes",
               dateTime: "12/26/2025\n04:00:00",
               duration: 45,
               createdBy: "Jason Sharlton (Teacher : 90006)",
               createdFor: "Shivam Verma (Teacher : 9002)",
               classes: ["Class 3 (A)", "Class 3 (B)", "Class 3 (C)", "Class 3 (D)"],
               status: "Awaited"
          },
          {
               id: 3,
               classTitle: "GK Combined Online Classes",
               description: "GK Combined Online Classes",
               dateTime: "12/25/2025\n11:30:00",
               duration: 45,
               createdBy: "Joe Black (Super Admin : 9000)",
               createdFor: "Albert Thomas (Teacher : 5454544)",
               classes: ["Class 1 (A)", "Class 1 (B)", "Class 1 (C)", "Class 1 (D)"],
               status: "Awaited"
          },
          {
               id: 4,
               classTitle: "Online Hindi Classes",
               description: "Online Hindi Classes",
               dateTime: "12/22/2025\n11:00:00",
               duration: 45,
               createdBy: "Jason Sharlton (Teacher : 90006)",
               createdFor: "Jason Sharlton (Teacher : 90006)",
               classes: ["Class 3 (A)"],
               status: "Awaited"
          },
          {
               id: 5,
               classTitle: "Hindi Classes",
               description: "Hindi Classes",
               dateTime: "12/20/2025\n12:30:00",
               duration: 45,
               createdBy: "Joe Black (Super Admin : 9000)",
               createdFor: "Shivam Verma (Teacher : 9002)",
               classes: ["Class 1 (A)", "Class 1 (B)", "Class 1 (C)", "Class 1 (D)"],
               status: "Awaited"
          },
          {
               id: 6,
               classTitle: "EVS Online Class",
               description: "EVS Online Class",
               dateTime: "12/18/2025\n10:30:00",
               duration: 35,
               createdBy: "Jason Sharlton (Teacher : 90006)",
               createdFor: "Jason Sharlton (Teacher : 90006)",
               classes: ["Class 5 (A)"],
               status: "Awaited"
          },
          {
               id: 7,
               classTitle: "Online Science Classes",
               description: "Online Science Classes",
               dateTime: "12/16/2025\n12:30:00",
               duration: 45,
               createdBy: "Jason Sharlton (Teacher : 90006)",
               createdFor: "Jason Sharlton (Teacher : 90006)",
               classes: ["Class 4 (A)"],
               status: "Awaited"
          },
          {
               id: 8,
               classTitle: "English Classes",
               description: "English Classes",
               dateTime: "12/15/2025\n02:00:00",
               duration: 45,
               createdBy: "Joe Black (Super Admin : 9000)",
               createdFor: "Albert Thomas (Teacher : 5454544)",
               classes: ["Class 1 (A)", "Class 1 (B)", "Class 1 (C)", "Class 1 (D)"],
               status: "Awaited"
          },
          {
               id: 9,
               classTitle: "Online Course Class",
               description: "Online Course Class",
               dateTime: "12/12/2025\n12:30:00",
               duration: 35,
               createdBy: "Joe Black (Super Admin : 9000)",
               createdFor: "Albert Thomas (Teacher : 5454544)",
               classes: ["Class 4 (A)", "Class 4 (B)", "Class 4 (C)"],
               status: "Awaited"
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Header Section */}
                         <div className="flex justify-between items-center mb-6">
                              <h1 className="text-2xl font-bold text-bgray-900 dark:text-white">Live Classes</h1>
                              <button
                                   type="button"
                                   className="px-4 py-2 bg-success-300 hover:bg-success-400 text-white rounded-lg font-semibold flex items-center gap-2 transition duration-300"
                              >
                                   <span>+</span>
                                   Add
                              </button>
                         </div>

                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Search Bar */}
                                   <div className="w-full flex h-14">
                                        <div className="flex-1 border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                   </div>

                                   {/* Action Icons Bar */}
                                   <div className="flex justify-end items-center gap-3">
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                                             title="Copy"
                                        >
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="#718096" strokeWidth="1.5"/>
                                                  <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#718096" strokeWidth="1.5"/>
                                             </svg>
                                        </button>
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                                             title="Excel"
                                        >
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  <path d="M14 2V8H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             </svg>
                                        </button>
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                                             title="CSV"
                                        >
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  <path d="M13 2V9H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             </svg>
                                        </button>
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                                             title="PDF"
                                        >
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             </svg>
                                        </button>
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                                             title="Print"
                                        >
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M6 9V2H18V9M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18M6 14H18V22H6V14Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             </svg>
                                        </button>
                                        <button
                                             type="button"
                                             className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                                             title="Column Visibility"
                                        >
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM14 14H21V21H14V14ZM3 14H10V21H3V14Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             </svg>
                                        </button>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class Title</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Description</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date Time</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class Duration (Minutes)</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Created By</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Created For</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Status</span>
                                                                 <button type="button">
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {liveClassesData.map((item) => (
                                                       <tr key={item.id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100 dark:hover:bg-darkblack-500 transition duration-200">
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.classTitle}</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.description}</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-bgray-50 whitespace-pre-line">{item.dateTime}</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.duration}</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.createdBy}</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.createdFor}</p>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <div className="flex flex-col gap-1">
                                                                      {item.classes.map((cls, index) => (
                                                                           <div key={index} className="flex items-center gap-1">
                                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M9 11L12 14L22 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                                <span className="text-xs text-bgray-900 dark:text-bgray-50">{cls}</span>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <div className="relative">
                                                                      <select className="text-sm text-bgray-900 dark:text-bgray-50 bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-success-300">
                                                                           <option>{item.status}</option>
                                                                           <option>Started</option>
                                                                           <option>Completed</option>
                                                                           <option>Cancelled</option>
                                                                      </select>
                                                                 </div>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <div className="flex items-center gap-2">
                                                                      <button
                                                                           type="button"
                                                                           className="px-3 py-1.5 bg-success-300 hover:bg-success-400 text-white rounded text-xs font-semibold transition duration-300"
                                                                      >
                                                                           Start
                                                                      </button>
                                                                      <button
                                                                           type="button"
                                                                           className="w-8 h-8 flex items-center justify-center rounded hover:bg-error-50 text-error-300 transition duration-300"
                                                                      >
                                                                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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