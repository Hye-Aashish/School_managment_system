"use client";
import React, { useState } from "react";

export default function IncidentList() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | null>(null);
     const [selectedIncident, setSelectedIncident] = useState<number | null>(null);

     const toggleFilter = (type: "action" | "pagination") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const toggleActionMenu = (id: number) => {
          setSelectedIncident(selectedIncident === id ? null : id);
     };

     // Sample data based on the image
     const incidentData = [
          {
               id: 1,
               title: "Thefts",
               point: -10,
               description: "It's important to report cases of theft on campus so that the university or school can increase security where needed. They could also consider other options to combat incidents of theft, such as lockers."
          },
          {
               id: 2,
               title: "Respect others/property",
               point: 10,
               description: "Respect others/property."
          },
          {
               id: 3,
               title: "Student Good Behaviour",
               point: 20,
               description: "Smile & have a good attitude and good behaviour."
          },
          {
               id: 4,
               title: "Harassment and bullying",
               point: -10,
               description: "If students report this type of behaviour, institutions will be able to monitor the individuals involved. They can then try to resolve the situation."
          },
          {
               id: 5,
               title: "Threats and violence",
               point: -20,
               description: "If the university, or school, is aware of these cases, they can monitor the spaces where threats and violence occur and improve security. This ensures that the individuals implicated can face consequences for their actions."
          },
          {
               id: 6,
               title: "Cheating and plagiarism",
               point: -10,
               description: "Cheating and plagiarism are important to report. They undermine the credibility of academics at any institution."
          },
          {
               id: 7,
               title: "Improper behaviour",
               point: -15,
               description: "Improper behaviour could be observed in a staff member or another student. If the behaviour is threatening, concerning or inappropriate, the university or school will need to monitor the individual to ensure that the behaviour is not repetitive."
          },
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Header */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
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

                                        <button
                                             type="button"
                                             className="px-4 py-2 bg-success-300 hover:bg-success-400 text-white rounded-lg font-semibold flex items-center gap-2 transition duration-300"
                                        >
                                             <span>+</span>
                                             Add
                                        </button>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Title</span>
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
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Point</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Description</span>
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
                                                            <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {incidentData.map((item) => (
                                                       <tr key={item.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.title}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.point}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {item.description}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex items-center gap-2">
                                                                      <button
                                                                           type="button"
                                                                           className="text-bgray-600 dark:text-bgray-400 hover:text-success-300 transition duration-300"
                                                                           title="Edit"
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                     d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                />
                                                                           </svg>
                                                                      </button>
                                                                      <button
                                                                           type="button"
                                                                           className="text-bgray-600 dark:text-bgray-400 hover:text-error-300 transition duration-300"
                                                                           title="Delete"
                                                                      >
                                                                           <svg
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M18 6L6 18M6 6L18 18"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="2"
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

                                   <div className="pagination-content w-full">
                                        <div className="w-full flex lg:justify-between justify-center items-center">
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">Records: 1 to 7 of 7</span>
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