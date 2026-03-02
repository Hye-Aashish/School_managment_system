"use client";
import React, { useState } from "react";

export default function SyllabusStatus() {
     const [openFilter, setOpenFilter] = useState<"action" | null>(null);
     const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>({
          "1.1": true,
          "1.2": false,
     });

     const toggleFilter = (type: "action") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleToggle = (id: string) => {
          setToggleStates((prev) => ({
               ...prev,
               [id]: !prev[id],
          }));
     };

     const syllabusData = [
          {
               id: 1,
               lessonTopic: "A Little Fish Story",
               isMainLesson: true,
               subTopics: [
                    {
                         id: "1.1",
                         number: "1.1",
                         name: "A Fish",
                         completionDate: "12/28/2025",
                         status: "Completed",
                    },
                    {
                         id: "1.2",
                         number: "1.2",
                         name: "Chapter 10",
                         completionDate: "",
                         status: "Incomplete",
                    },
               ],
          },
          {
               id: 2,
               lessonTopic: "Chapter 3",
               isMainLesson: true,
               subTopics: [],
          },
     ];

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Select Criteria Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">
                              Select Criteria
                         </h3>
                         <div className="flex flex-col space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="class1">Class 1</option>
                                             <option value="class2">Class 2</option>
                                             <option value="class3">Class 3</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="a">A</option>
                                             <option value="b">B</option>
                                             <option value="c">C</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Subject Group <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="group1">Class 1st Subject Group</option>
                                             <option value="group2">Class 2nd Subject Group</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Subject <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="english">English (210)</option>
                                             <option value="hindi">Hindi (230)</option>
                                        </select>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/* Table Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="table-content w-full overflow-x-auto">
                              <table className="w-full">
                                   <thead>
                                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                             <td className="py-5 px-6 xl:px-0 w-[60px]">
                                                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                       #
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0">
                                                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                       Lesson Topic
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0 w-[250px]">
                                                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                       Topic Completion Date
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0 w-[150px]">
                                                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                       Status
                                                  </span>
                                             </td>
                                             <td className="py-5 px-6 xl:px-0 w-[100px]">
                                                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                       Action
                                                  </span>
                                             </td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {syllabusData.map((lesson) => (
                                             <React.Fragment key={lesson.id}>
                                                  {/* Main Lesson Row */}
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-semibold text-base text-bgray-900 dark:text-bgray-50">
                                                                 {lesson.id}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0" colSpan={4}>
                                                            <p className="font-semibold text-base text-bgray-900 dark:text-bgray-50">
                                                                 {lesson.lessonTopic}
                                                            </p>
                                                       </td>
                                                  </tr>
                                                  {/* Sub Topics */}
                                                  {lesson.subTopics.map((topic) => (
                                                       <tr
                                                            key={topic.id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50 pl-6">
                                                                      {topic.number}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {topic.name}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {topic.completionDate}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 {topic.status === "Completed" ? (
                                                                      <span className="px-3 py-1 text-xs font-semibold text-white bg-bgray-900 dark:bg-success-300 rounded">
                                                                           Completed
                                                                      </span>
                                                                 ) : (
                                                                      <span className="px-3 py-1 text-xs font-semibold text-white bg-bgray-400 dark:bg-bgray-500 rounded">
                                                                           Incomplete
                                                                      </span>
                                                                 )}
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => handleToggle(topic.id)}
                                                                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggleStates[topic.id]
                                                                                ? "bg-success-300"
                                                                                : "bg-bgray-300 dark:bg-bgray-500"
                                                                           }`}
                                                                 >
                                                                      <span
                                                                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggleStates[topic.id]
                                                                                     ? "translate-x-6"
                                                                                     : "translate-x-1"
                                                                                }`}
                                                                      />
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </React.Fragment>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </>
     );
}