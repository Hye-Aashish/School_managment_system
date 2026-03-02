"use client";
import React from "react";

export default function NoticeBoard() {
     const notices = [
          { id: 1, title: "Online Learning Notice", hasActions: true },
          { id: 2, title: "Staff Meeting", hasActions: false },
          { id: 3, title: "Fees Reminder", hasActions: false },
          { id: 4, title: "Student Health Check-up", hasActions: false },
          { id: 5, title: "Extra class for Std - X to XII", hasActions: false },
          { id: 6, title: "Christmas Celebration Holiday", hasActions: false },
          { id: 7, title: "PTM Meeting", hasActions: false },
          { id: 8, title: "Staff Meeting", hasActions: false },
          { id: 9, title: "Fees Reminder", hasActions: false },
          { id: 10, title: "Online Learning Notice", hasActions: false },
          { id: 11, title: "Notice for new Book collection", hasActions: false },
          { id: 12, title: "School Vacation Notice ..!!!!", hasActions: false },
          { id: 13, title: "Merry Christmas Holiday", hasActions: false },
          { id: 14, title: "Online Learning Notice", hasActions: false },
     ];

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Notice Board Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex justify-between items-center mb-6">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                   Notice Board
                              </h3>
                              <button
                                   type="button"
                                   className="px-6 py-2.5 text-sm font-semibold text-white bg-bgray-600 hover:bg-bgray-600 dark:bg-bgray-600 dark:hover:bg-bgray-700 rounded transition-all flex items-center space-x-2"
                              >
                                   <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M7 1V13"
                                             stroke="white"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                        <path
                                             d="M1 7H13"
                                             stroke="white"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                   </svg>
                                   <span>Post New Message</span>
                              </button>
                         </div>

                         <div className="flex flex-col">
                              {notices.map((notice, index) => (
                                   <div
                                        key={notice.id}
                                        className={`flex items-center justify-between py-4 ${
                                             index !== notices.length - 1
                                                  ? "border-b border-bgray-300 dark:border-darkblack-400"
                                                  : ""
                                        }`}
                                   >
                                        <div className="flex items-center space-x-4">
                                             {/* Mail Icon */}
                                             <span className="text-cyan-500">
                                                  <svg
                                                       width="20"
                                                       height="20"
                                                       viewBox="0 0 20 20"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <path
                                                            d="M14.1667 17.0833H5.83333C3.33333 17.0833 1.66667 15.8333 1.66667 12.9167V7.08333C1.66667 4.16667 3.33333 2.91667 5.83333 2.91667H14.1667C16.6667 2.91667 18.3333 4.16667 18.3333 7.08333V12.9167C18.3333 15.8333 16.6667 17.0833 14.1667 17.0833Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                       <path
                                                            d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29167 10.2667 8.43333 9.58333L5.83333 7.5"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </span>

                                             {/* Notice Title */}
                                             <button
                                                  type="button"
                                                  className="text-base font-medium text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors text-left"
                                             >
                                                  {notice.title}
                                             </button>
                                        </div>

                                        {/* Action Icons (only show on first item or on hover) */}
                                        {notice.hasActions && (
                                             <div className="flex items-center space-x-3">
                                                  <button
                                                       type="button"
                                                       className="text-cyan-500 hover:text-cyan-600 transition-colors"
                                                       title="Edit"
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
                                                       className="text-red-500 hover:text-red-600 transition-colors"
                                                       title="Delete"
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
                                        )}
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </>
     );
}