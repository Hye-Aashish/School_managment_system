"use client";
import React, { useState, useEffect } from "react";

export default function ExamSchedule() {
     const [openFilter, setOpenFilter] = useState<"examGroup" | "exam" | null>(null);
     const [examGroups, setExamGroups] = useState<any[]>([]);
     const [exams, setExams] = useState<any[]>([]);
     const [selectedGroup, setSelectedGroup] = useState<any>(null);
     const [selectedExam, setSelectedExam] = useState<any>(null);
     const [schedules, setSchedules] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          fetchExamGroups();
     }, []);

     const fetchExamGroups = async () => {
          try {
               const res = await fetch("/api/exam-groups");
               const data = await res.json();
               if (data.success) {
                    setExamGroups(data.data);
               }
          } catch (error) {
               console.error("Error fetching exam groups:", error);
          }
     };

     const fetchExams = async (groupId: string) => {
          try {
               const res = await fetch(`/api/exams?groupId=${groupId}`);
               const data = await res.json();
               if (data.success) {
                    setExams(data.data);
               }
          } catch (error) {
               console.error("Error fetching exams:", error);
          }
     };

     const fetchSchedules = async (examId: string) => {
          setLoading(true);
          try {
               const res = await fetch(`/api/exam-schedules?examId=${examId}`);
               const data = await res.json();
               if (data.success) {
                    setSchedules(data.data);
               }
          } catch (error) {
               console.error("Error fetching schedules:", error);
          } finally {
               setLoading(false);
          }
     };

     const toggleFilter = (type: "examGroup" | "exam") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleGroupSelect = (group: any) => {
          setSelectedGroup(group);
          setSelectedExam(null);
          setExams([]);
          setSchedules([]);
          setOpenFilter(null);
          fetchExams(group._id);
     };

     const handleExamSelect = (exam: any) => {
          setSelectedExam(exam);
          setOpenFilter(null);
          fetchSchedules(exam._id);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Select Criteria Section */}
                                   <div className="w-full">
                                        <h3 className="text-xl font-semibold text-bgray-900 dark:text-white mb-4">
                                             Select Criteria
                                        </h3>
                                        <div className="w-full flex h-14 space-x-4">
                                             {/* Exam Group Select */}
                                             <div className="relative flex-1">
                                                  <button
                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
                                                       onClick={() => toggleFilter("examGroup")}
                                                  >
                                                       <div className="flex flex-col items-start text-left">
                                                            <span className="text-xs text-bgray-500">Exam Group <span className="text-red-500">*</span></span>
                                                            <span className="text-sm text-bgray-900 dark:text-white truncate max-w-[200px]">
                                                                 {selectedGroup ? selectedGroup.name : "Select"}
                                                            </span>
                                                       </div>
                                                       <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>

                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-14 overflow-hidden transition-all ${openFilter === "examGroup" ? "block" : "hidden"}`}>
                                                       <ul className="max-h-60 overflow-y-auto">
                                                            {examGroups.map((group) => (
                                                                 <li 
                                                                      key={group._id} 
                                                                      onClick={() => handleGroupSelect(group)}
                                                                      className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                                 >
                                                                      {group.name}
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>

                                             {/* Exam Select */}
                                             <div className="relative flex-1">
                                                  <button
                                                       type="button"
                                                       disabled={!selectedGroup}
                                                       className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 disabled:opacity-50"
                                                       onClick={() => toggleFilter("exam")}
                                                  >
                                                       <div className="flex flex-col items-start text-left">
                                                            <span className="text-xs text-bgray-500">Exam <span className="text-red-500">*</span></span>
                                                            <span className="text-sm text-bgray-900 dark:text-white truncate max-w-[200px]">
                                                                 {selectedExam ? selectedExam.name : "Select"}
                                                            </span>
                                                       </div>
                                                       <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>

                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-14 overflow-hidden transition-all ${openFilter === "exam" ? "block" : "hidden"}`}>
                                                       <ul className="max-h-60 overflow-y-auto">
                                                            {exams.length === 0 ? (
                                                                 <li className="text-sm text-bgray-500 px-5 py-2">No exams found</li>
                                                            ) : exams.map((exam) => (
                                                                 <li 
                                                                      key={exam._id} 
                                                                      onClick={() => handleExamSelect(exam)}
                                                                      className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                                 >
                                                                      {exam.name}
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             </div>
                                             
                                             <div className="flex items-center space-x-3">
                                                  <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Print">
                                                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 7.5V5.83333C5 5.39131 5.17559 4.96738 5.48816 4.65482C5.80072 4.34226 6.22464 4.16667 6.66667 4.16667H13.3333C13.7754 4.16667 14.1993 4.34226 14.5118 4.65482C14.8244 4.96738 15 5.39131 15 5.83333V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M5 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V8.33333C1.66667 7.89131 1.84226 7.46738 2.15482 7.15482C2.46738 6.84226 2.89131 6.66667 3.33333 6.66667H16.6667C17.1087 6.66667 17.5326 6.84226 17.8452 7.15482C18.1577 7.46738 18.3333 7.89131 18.3333 8.33333V10.8333C18.3333 11.2754 18.1577 11.6993 17.8452 12.0118C17.5326 12.3244 17.1087 12.5 16.6667 12.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M5 10H15V15.8333C15 16.0543 14.9122 16.2663 14.7559 16.4226C14.5996 16.5789 14.3877 16.6667 14.1667 16.6667H5.83333C5.61232 16.6667 5.40036 16.5789 5.24408 16.4226C5.0878 16.2663 5 16.0543 5 15.8333V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                       </svg>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Exam Schedule Section */}
                                   <div className="w-full">
                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Subject</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Date From</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Start Time</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Duration</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Room No.</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Marks (Max.)</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Marks (Min.)</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr>
                                                                 <td colSpan={7} className="py-10 text-center text-bgray-600 dark:text-bgray-400">Loading...</td>
                                                            </tr>
                                                       ) : !selectedExam ? (
                                                            <tr>
                                                                 <td colSpan={7} className="py-10 text-center text-bgray-600 dark:text-bgray-400">Please select Exam Group and Exam to view schedule.</td>
                                                            </tr>
                                                       ) : schedules.length === 0 ? (
                                                            <tr>
                                                                 <td colSpan={7} className="py-10 text-center text-bgray-600 dark:text-bgray-400">No schedule found for this exam.</td>
                                                            </tr>
                                                       ) : schedules.map((item) => (
                                                            <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.subject}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.dateFrom}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.startTime}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.duration}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.roomNo}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.maxMarks}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.minMarks}</p>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}