"use client";
import React, { useState } from "react";

export default function TeacherReview() {
     const [reviewData, setReviewData] = useState([
          {
               id: 1,
               staffId: "9002",
               name: "Shivam Verma ( 9002 )",
               rating: 5,
               comment: "Motivates students to progress",
               status: "Pending",
               studentName: "Saurabh Shah ( 908875 )",
               hasApprove: true,
          },
          {
               id: 2,
               staffId: "9002",
               name: "Shivam Verma ( 9002 )",
               rating: 3,
               comment: "good",
               status: "Pending",
               studentName: "Glen Stark ( 18005 )",
               hasApprove: true,
          },
          {
               id: 3,
               staffId: "9002",
               name: "Shivam Verma ( 9002 )",
               rating: 4,
               comment: "Excellent",
               status: "Approved",
               studentName: "Robin Peterson ( 18002 )",
               hasApprove: false,
          },
          {
               id: 4,
               staffId: "9002",
               name: "Shivam Verma ( 9002 )",
               rating: 4,
               comment: "no comment",
               status: "Pending",
               studentName: "Edward Thomas ( 180001 1 )",
               hasApprove: true,
          },
          {
               id: 5,
               staffId: "9002",
               name: "Shivam Verma ( 9002 )",
               rating: 3,
               comment: "nice",
               status: "Pending",
               studentName: "( )",
               hasApprove: true,
          },
          {
               id: 6,
               staffId: "90006",
               name: "Jason Sharlton ( 90006 )",
               rating: 5,
               comment: "Solidifies a positive relationship or connection with your students",
               status: "Approved",
               studentName: "Saurabh Shah ( 908875 )",
               hasApprove: false,
          },
          {
               id: 7,
               staffId: "90006",
               name: "Jason Sharlton ( 90006 )",
               rating: 4,
               comment: "good team teacher learning and best regards",
               status: "Approved",
               studentName: "MANISH RAJPUT ( 11011 )",
               hasApprove: false,
          },
          {
               id: 8,
               staffId: "90006",
               name: "Jason Sharlton ( 90006 )",
               rating: 2,
               comment: "yddyy",
               status: "Approved",
               studentName: "Kavya Roy ( 18009 )",
               hasApprove: false,
          },
          {
               id: 9,
               staffId: "90006",
               name: "Jason Sharlton ( 90006 )",
               rating: 4,
               comment: "Very Good",
               status: "Approved",
               studentName: "Robin Peterson ( 18002 )",
               hasApprove: false,
          },
          {
               id: 10,
               staffId: "90006",
               name: "Jason Sharlton ( 90006 )",
               rating: 2,
               comment: "gshsh",
               status: "Approved",
               studentName: "Kavya Roy ( 18009 )",
               hasApprove: false,
          },
          {
               id: 11,
               staffId: "90006",
               name: "Jason Sharlton ( 90006 )",
               rating: 3,
               comment: "good",
               status: "Approved",
               studentName: "Edward Thomas ( 180001 1 )",
               hasApprove: false,
          },
     ]);

     const handleApprove = (id: number) => {
          setReviewData(prev => prev.map(r => r.id === id ? { ...r, status: "Approved", hasApprove: false } : r));
     };

     const handleDelete = (id: number) => {
          if (confirm("Are you sure you want to delete this teacher review?")) {
               setReviewData(prev => prev.filter(r => r.id !== id));
          }
     };

     const renderStars = (rating: number) => {
          return (
               <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                         <svg
                              key={star}
                              className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-bgray-300 dark:text-darkblack-400"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                         >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                         </svg>
                    ))}
               </div>
          );
     };

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Teacher Review Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                              Teacher Review
                         </h3>

                         <div className="flex flex-col space-y-5">
                              {/* Search and Export Icons */}
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


                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 relative dark:bg-darkblack-500"
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
                                   </div>
                              </div>

                              {/* Table */}
                              <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                            Staff ID
                                                       </span>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Name
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Rating
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Comment
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Status
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Student Name
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
                                                       <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                            Action
                                                       </span>
                                                  </td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {reviewData.map((review) => (
                                                  <tr
                                                       key={review.id}
                                                       className="border-b border-bgray-300 dark:border-darkblack-400"
                                                  >
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {review.staffId}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-success-300 hover:text-success-400 cursor-pointer">
                                                                 {review.name}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">{renderStars(review.rating)}</td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {review.comment}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span
                                                                 className={`px-3 py-1.5 text-xs font-semibold text-white rounded ${review.status === "Approved"
                                                                           ? "bg-green-500"
                                                                           : "bg-orange-500"
                                                                      }`}
                                                            >
                                                                 {review.status}
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                 {review.studentName}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex items-center space-x-3">
                                                                 {review.hasApprove && (
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => handleApprove(review.id)}
                                                                           className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded transition-all"
                                                                      >
                                                                           Approve
                                                                      </button>
                                                                 )}
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => handleDelete(review.id)}
                                                                      className="text-bgray-900 dark:text-white hover:text-red-500 transition-colors"
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
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>

                              {/* Records Info and Pagination */}
                              <div className="pagination-content w-full">
                                   <div className="w-full flex lg:justify-between justify-center items-center">
                                        <div className="lg:flex hidden">
                                             <p className="text-sm text-bgray-600 dark:text-white">
                                                  Records: 1 to 11 of 11
                                             </p>
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
                                                       className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-white"
                                                  >
                                                       1
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
               </div>
          </>
     );
}