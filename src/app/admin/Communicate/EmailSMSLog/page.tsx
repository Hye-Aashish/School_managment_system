"use client";
import React, { useState } from "react";

export default function EmailList() {
     const [openFilter, setOpenFilter] = useState<"pagination" | "export" | null>(null);

     const toggleFilter = (type: "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     // Sample data
     const emailData = [
          {
               id: 1,
               title: "Annual Day Celebration",
               description: "A day in School – In this theme the program can showcase, what all goes in school. The ringing of bell, the class, the love of teachers, happy-go-lucky punishments, all pranks, PTM, sports etc.",
               date: "12/02/2025",
               time: "04:39 pm",
               email: true,
               sms: false,
               group: false,
               individual: true,
               class: false,
          },
          {
               id: 2,
               title: "Sports Day Events",
               description: "Games that are played on school sports days can be wide and varied. They can include straightforward sprints and longer races for all age groups as well as egg and spoon races.",
               date: "12/02/2025",
               time: "04:37 pm",
               email: true,
               sms: false,
               group: true,
               individual: false,
               class: false,
          },
          {
               id: 3,
               title: "International Yoga Day",
               description: "International Yoga Day, celebrated annually on June 21st, offers schools a valuable opportunity to promote physical and mental well-being. Schools often organize yoga sessions, demonstrations of asanas, and awareness campaigns to introduce students to the benefits of yoga.",
               date: "06/03/2025",
               time: "03:33 pm",
               email: true,
               sms: false,
               group: true,
               individual: false,
               class: false,
          },
          {
               id: 4,
               title: "International Yoga Day",
               description: "International Yoga Day, celebrated annually on June 21st, offers schools a valuable opportunity to promote physical and mental well-being. Schools often organize yoga sessions, demonstrations of asanas, and awareness campaigns to introduce students to the benefits of yoga.",
               date: "06/03/2025",
               time: "03:32 pm",
               email: true,
               sms: false,
               group: true,
               individual: false,
               class: false,
          },
          {
               id: 5,
               title: "New Academic admission start (2025-26)",
               description: "NEW ADMISSIONS FOR THE NEXT SESSION 2025-26 ARE OPEN FROM CLASSES NURSERY TO CLASS- VIII FROM 1ST APRIL 2025.",
               date: "04/04/2025",
               time: "01:27 pm",
               email: true,
               sms: false,
               group: true,
               individual: false,
               class: false,
          },
          {
               id: 6,
               title: "Online Classes",
               description: "Be very punctual in log in time, screen off time, activity time table etc. Be ready with necessary text books, note books, pen, pencil and other accessories before class begins. Make sure the device is sufficiently charged before the beginning of the class.",
               date: "02/04/2025",
               time: "06:02 pm",
               email: true,
               sms: false,
               group: true,
               individual: false,
               class: false,
          },
          {
               id: 7,
               title: "Republic Day Celebration",
               description: "Republic Day is the day when the Republic of India marks and celebrates the date on which the Constitution of India came into effect on 26 January 2024.",
               date: "01/05/2024",
               time: "12:56 pm",
               email: true,
               sms: false,
               group: true,
               individual: false,
               class: false,
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Search and Export Section */}
                                   <div className="w-full flex justify-between items-center space-x-4">
                                        <div className="flex-1 max-w-md border border-transparent focus-within:border-success-300 h-14 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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

                                        {/* Export Icons */}
                                        <div className="flex items-center space-x-2">
                                             <button
                                                  type="button"
                                                  className="w-12 h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 hover:text-success-300 transition-all"
                                                  title="Share"
                                             >
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="stroke-bgray-900 dark:stroke-white"
                                                  >
                                                       <path
                                                            d="M15 6.66667C16.3807 6.66667 17.5 5.54738 17.5 4.16667C17.5 2.78595 16.3807 1.66667 15 1.66667C13.6193 1.66667 12.5 2.78595 12.5 4.16667C12.5 5.54738 13.6193 6.66667 15 6.66667Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M15 18.3333C16.3807 18.3333 17.5 17.214 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.214 13.6193 18.3333 15 18.3333Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M7.1582 11.1583L12.8499 14.675"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M12.8415 5.32501L7.1582 8.84167"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             <button
                                                  type="button"
                                                  className="w-12 h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 hover:text-success-300 transition-all"
                                                  title="Copy"
                                             >
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="stroke-bgray-900 dark:stroke-white"
                                                  >
                                                       <path
                                                            d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M4.16667 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V3.33333C1.66667 2.89131 1.84226 2.46738 2.15482 2.15482C2.46738 1.84226 2.89131 1.66667 3.33333 1.66667H10.8333C11.2754 1.66667 11.6993 1.84226 12.0118 2.15482C12.3244 2.46738 12.5 2.89131 12.5 3.33333V4.16667"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             <button
                                                  type="button"
                                                  className="w-12 h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 hover:text-success-300 transition-all"
                                                  title="Excel"
                                             >
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="stroke-bgray-900 dark:stroke-white"
                                                  >
                                                       <path
                                                            d="M11.6667 1.66667H5C4.08333 1.66667 3.33333 2.41667 3.33333 3.33333V16.6667C3.33333 17.5833 4.08333 18.3333 5 18.3333H15C15.9167 18.3333 16.6667 17.5833 16.6667 16.6667V6.66667L11.6667 1.66667Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M11.6667 1.66667V6.66667H16.6667"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M13.3333 10.8333H6.66667"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M13.3333 14.1667H6.66667"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M8.33333 7.5H7.5H6.66667"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             <button
                                                  type="button"
                                                  className="w-12 h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 hover:text-success-300 transition-all"
                                                  title="PDF"
                                             >
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="stroke-bgray-900 dark:stroke-white"
                                                  >
                                                       <path
                                                            d="M11.6667 1.66667H5C4.08333 1.66667 3.33333 2.41667 3.33333 3.33333V16.6667C3.33333 17.5833 4.08333 18.3333 5 18.3333H15C15.9167 18.3333 16.6667 17.5833 16.6667 16.6667V6.66667L11.6667 1.66667Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M11.6667 1.66667V6.66667H16.6667"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             <button
                                                  type="button"
                                                  className="w-12 h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 hover:text-success-300 transition-all"
                                                  title="Print"
                                             >
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="stroke-bgray-900 dark:stroke-white"
                                                  >
                                                       <path
                                                            d="M5 7.5V2.5H15V7.5"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M5 15H3.33333C2.89131 15 2.46738 14.8244 2.15482 14.5118C1.84226 14.1993 1.66667 13.7754 1.66667 13.3333V10C1.66667 9.55797 1.84226 9.13405 2.15482 8.82149C2.46738 8.50893 2.89131 8.33333 3.33333 8.33333H16.6667C17.1087 8.33333 17.5326 8.50893 17.8452 8.82149C18.1577 9.13405 18.3333 9.55797 18.3333 10V13.3333C18.3333 13.7754 18.1577 14.1993 17.8452 14.5118C17.5326 14.8244 17.1087 15 16.6667 15H15"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M15 11.6667H5V17.5H15V11.6667Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             <button
                                                  type="button"
                                                  className="w-12 h-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 hover:text-success-300 transition-all"
                                                  title="Menu"
                                             >
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="stroke-bgray-900 dark:stroke-white"
                                                  >
                                                       <path
                                                            d="M2.5 10H17.5"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M2.5 5H17.5"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M2.5 15H17.5"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Table Section */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 min-w-[150px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Title
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
                                                       <td className="py-5 px-6 xl:px-0 min-w-[400px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Description
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 min-w-[150px]">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">
                                                                      Date
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
                                                       <td className="py-5 px-6 xl:px-0 w-[80px] text-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Email
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[80px] text-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 SMS
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[80px] text-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Group
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[100px] text-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Individual
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[80px] text-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Class
                                                            </span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {emailData.map((item) => (
                                                       <tr key={item.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.title}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="text-sm text-bgray-600 dark:text-bgray-400">
                                                                      {item.description}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.date}
                                                                 </p>
                                                                 <p className="text-sm text-bgray-600 dark:text-bgray-400">
                                                                      {item.time}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 {item.email && (
                                                                      <span className="inline-flex items-center justify-center">
                                                                           <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                                                                     stroke="#10B981"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </span>
                                                                 )}
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 {item.sms && (
                                                                      <span className="inline-flex items-center justify-center">
                                                                           <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                                                                     stroke="#10B981"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </span>
                                                                 )}
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 {item.group && (
                                                                      <span className="inline-flex items-center justify-center">
                                                                           <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                                                                     stroke="#10B981"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </span>
                                                                 )}
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 {item.individual && (
                                                                      <span className="inline-flex items-center justify-center">
                                                                           <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                                                                     stroke="#10B981"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </span>
                                                                 )}
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 {item.class && (
                                                                      <span className="inline-flex items-center justify-center">
                                                                           <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                                                                     stroke="#10B981"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </span>
                                                                 )}
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Pagination Section */}
                                   <div className="pagination-content w-full">
                                        <div className="w-full flex lg:justify-between justify-center items-center">
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">
                                                       Show result:
                                                  </span>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
                                                                 10
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
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-bgray-50 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">
                                                                      5
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-bgray-50 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">
                                                                      10
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-bgray-50 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">
                                                                      20
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-bgray-50 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600">
                                                                      50
                                                                 </li>
                                                            </ul>
                                                       </div>
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
                                                            10
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