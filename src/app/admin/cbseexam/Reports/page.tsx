"use client";
import React, { useState } from "react";

export default function Reports() {
     const [activeTab, setActiveTab] = useState<"subject" | "template">("subject");
     const [selectedExam, setSelectedExam] = useState("online-assessment");

     const studentData = [
          {
               student: "Edward Thomas",
               admissionNo: "18001",
               fatherName: "Olivier Thomas",
               mathematics: { theory: "95.00", practical: "xx", assignment: "xx" },
               english: { theory: "78.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "84.00", practical: "xx", assignment: "17.00" },
               science: { theory: "83.00", practical: "67.00", assignment: "12.00" },
               totalMarks: "436/515",
               percentage: "84.66",
               grade: "A",
               rank: 1
          },
          {
               student: "Steven Taylor",
               admissionNo: "10024",
               fatherName: "Jason Taylor",
               mathematics: { theory: "92.00", practical: "xx", assignment: "xx" },
               english: { theory: "67.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "86.00", practical: "xx", assignment: "14.00" },
               science: { theory: "78.00", practical: "53.00", assignment: "13.00" },
               totalMarks: "403/515",
               percentage: "78.25",
               grade: "B+",
               rank: 2
          },
          {
               student: "Nehal Wadhera",
               admissionNo: "125005",
               fatherName: "Karun wadhera",
               mathematics: { theory: "72.00", practical: "xx", assignment: "xx" },
               english: { theory: "67.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "53.00", practical: "xx", assignment: "15.00" },
               science: { theory: "77.00", practical: "46.00", assignment: "13.00" },
               totalMarks: "343/515",
               percentage: "66.60",
               grade: "B",
               rank: 3
          },
          {
               student: "Georgia Wareham",
               admissionNo: "25001",
               fatherName: "Zakary Foulkes",
               mathematics: { theory: "67.00", practical: "xx", assignment: "xx" },
               english: { theory: "78.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "45.00", practical: "xx", assignment: "16.00" },
               science: { theory: "67.00", practical: "54.00", assignment: "12.00" },
               totalMarks: "339/515",
               percentage: "65.83",
               grade: "B",
               rank: 4
          },
          {
               student: "Ashwani Kumar",
               admissionNo: "120020",
               fatherName: "Arjun Kumar",
               mathematics: { theory: "64.00", practical: "xx", assignment: "xx" },
               english: { theory: "55.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "47.00", practical: "xx", assignment: "12.00" },
               science: { theory: "67.00", practical: "56.00", assignment: "12.00" },
               totalMarks: "313/515",
               percentage: "60.78",
               grade: "B",
               rank: 5
          },
          {
               student: "Vinay Singh",
               admissionNo: "5422",
               fatherName: "arun singh",
               mathematics: { theory: "56.00", practical: "xx", assignment: "xx" },
               english: { theory: "34.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "34.00", practical: "xx", assignment: "18.00" },
               science: { theory: "78.00", practical: "56.00", assignment: "17.00" },
               totalMarks: "293/515",
               percentage: "56.89",
               grade: "C",
               rank: 6
          },
          {
               student: "Nishant Sindhu",
               admissionNo: "120028",
               fatherName: "Jayant Sindhu",
               mathematics: { theory: "75.00", practical: "xx", assignment: "xx" },
               english: { theory: "34.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "75.00", practical: "xx", assignment: "14.00" },
               science: { theory: "45.00", practical: "33.00", assignment: "14.00" },
               totalMarks: "290/515",
               percentage: "56.31",
               grade: "C",
               rank: 7
          },
          {
               student: "Nicholas kirton",
               admissionNo: "69500",
               fatherName: "Jason kirton",
               mathematics: { theory: "33.00", practical: "xx", assignment: "xx" },
               english: { theory: "28.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "64.00", practical: "xx", assignment: "16.00" },
               science: { theory: "44.00", practical: "74.00", assignment: "15.00" },
               totalMarks: "274/515",
               percentage: "53.20",
               grade: "C",
               rank: 8
          },
          {
               student: "xavier bartlett",
               admissionNo: "520039",
               fatherName: "David bartlett",
               mathematics: { theory: "32.00", practical: "xx", assignment: "xx" },
               english: { theory: "44.00", practical: "xx", assignment: "xx" },
               socialStudies: { theory: "66.00", practical: "xx", assignment: "12.00" },
               science: { theory: "34.00", practical: "65.00", assignment: "18.00" },
               totalMarks: "271/515",
               percentage: "52.62",
               grade: "C",
               rank: 9
          }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="flex space-x-2">
                                        <button
                                             type="button"
                                             onClick={() => setActiveTab("subject")}
                                             className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${activeTab === "subject"
                                                       ? "bg-success-100 text-success-300 dark:bg-success-300 dark:text-white"
                                                       : "bg-bgray-100 text-bgray-600 dark:bg-darkblack-500 dark:text-bgray-300 hover:bg-bgray-200 dark:hover:bg-darkblack-400"
                                                  }`}
                                        >
                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2Z" stroke="currentColor" strokeWidth="1.5" />
                                                  <path d="M1 6H15" stroke="currentColor" strokeWidth="1.5" />
                                             </svg>
                                             <span>Subject Marks Report</span>
                                        </button>
                                        <button
                                             type="button"
                                             onClick={() => setActiveTab("template")}
                                             className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${activeTab === "template"
                                                       ? "bg-success-100 text-success-300 dark:bg-success-300 dark:text-white"
                                                       : "bg-bgray-100 text-bgray-600 dark:bg-darkblack-500 dark:text-bgray-300 hover:bg-bgray-200 dark:hover:bg-darkblack-400"
                                                  }`}
                                        >
                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2Z" stroke="currentColor" strokeWidth="1.5" />
                                                  <path d="M1 6H15" stroke="currentColor" strokeWidth="1.5" />
                                             </svg>
                                             <span>Template Marks Report</span>
                                        </button>
                                   </div>

                                   {activeTab === "subject" && (
                                        <>
                                             {/* Report Title */}
                                             <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Subject wise Marks Report</h3>
                                             <div className="flex itmes-center gap-4 justify-between">
                                                  {/* Exam Selector */}
                                                  <div className="w-full max-w-sm">
                                                       <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                                            Exam <span className="text-error-300">*</span>
                                                       </label>
                                                       <select
                                                            value={selectedExam}
                                                            onChange={(e) => setSelectedExam(e.target.value)}
                                                            className="w-full px-4 py-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent"
                                                       >
                                                            <option value="online-assessment">Online Assessment Test (October-2025)</option>
                                                            <option value="mid-term">Mid Term Exam</option>
                                                            <option value="final-exam">Final Exam</option>
                                                       </select>
                                                  </div>

                                                  {/* Export and Print Icons */}
                                                  <div className="flex justify-start items-center space-x-3">
                                                       <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Print">
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5 7.5V5.83333C5 5.39131 5.17559 4.96738 5.48816 4.65482C5.80072 4.34226 6.22464 4.16667 6.66667 4.16667H13.3333C13.7754 4.16667 14.1993 4.34226 14.5118 4.65482C14.8244 4.96738 15 5.39131 15 5.83333V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                 <path d="M5 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V8.33333C1.66667 7.89131 1.84226 7.46738 2.15482 7.15482C2.46738 6.84226 2.89131 6.66667 3.33333 6.66667H16.6667C17.1087 6.66667 17.5326 6.84226 17.8452 7.15482C18.1577 7.46738 18.3333 7.89131 18.3333 8.33333V10.8333C18.3333 11.2754 18.1577 11.6993 17.8452 12.0118C17.5326 12.3244 17.1087 12.5 16.6667 12.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                 <path d="M5 10H15V15.8333C15 16.0543 14.9122 16.2663 14.7559 16.4226C14.5996 16.5789 14.3877 16.6667 14.1667 16.6667H5.83333C5.61232 16.6667 5.40036 16.5789 5.24408 16.4226C5.0878 16.2663 5 16.0543 5 15.8333V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                            </svg>
                                                       </button>
                                                       <button type="button" className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white transition-colors" title="Excel">
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M11.6654 2.5H5.83203C4.91156 2.5 4.16536 3.24619 4.16536 4.16667V15.8333C4.16536 16.7538 4.91156 17.5 5.83203 17.5H14.1654C15.0859 17.5 15.832 16.7538 15.832 15.8333V6.66667L11.6654 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                                 <path d="M11.668 2.5V6.66667H15.8346" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                            </svg>
                                                       </button>
                                                  </div>

                                             </div>
                                             {/* Table */}
                                             <div className="table-content w-full overflow-x-auto">
                                                  <table className="w-full border-collapse">
                                                       <thead>
                                                            <tr className="border border-bgray-300 dark:border-darkblack-400">
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-left text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Student</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-left text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Admission No</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-left text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Father Name</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" colSpan={3}>Mathematics (110)</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" colSpan={3}>English (210)</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" colSpan={3}>Social Studies (212)</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" colSpan={3}>Science (111)</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Total Marks</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Percentage (%)</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Grade</th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-center text-sm font-semibold text-bgray-900 dark:text-white bg-bgray-50 dark:bg-darkblack-500" rowSpan={2}>Rank</th>
                                                            </tr>
                                                            <tr className="border border-bgray-300 dark:border-darkblack-400">
                                                                 {/* Mathematics sub-headers */}
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Theory (TH02)<br />( Max - 100)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Practical (PC03)<br />( Max - 75)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Assignment (AS05)<br />( Max - 20)
                                                                 </th>
                                                                 {/* English sub-headers */}
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Theory (TH02)<br />( Max - 100)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Practical (PC03)<br />( Max - 75)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Assignment (AS05)<br />( Max - 20)
                                                                 </th>
                                                                 {/* Social Studies sub-headers */}
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Theory (TH02)<br />( Max - 100)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Practical (PC03)<br />( Max - 75)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Assignment (AS05)<br />( Max - 20)
                                                                 </th>
                                                                 {/* Science sub-headers */}
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Theory (TH02)<br />( Max - 100)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Practical (PC03)<br />( Max - 75)
                                                                 </th>
                                                                 <th className="border border-bgray-300 dark:border-darkblack-400 py-2 px-3 text-center text-xs font-medium text-bgray-700 dark:text-bgray-200 bg-bgray-50 dark:bg-darkblack-500">
                                                                      Assignment (AS05)<br />( Max - 20)
                                                                 </th>
                                                            </tr>
                                                       </thead>
                                                       <tbody>
                                                            {studentData.map((student, index) => (
                                                                 <tr key={index} className="border border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500">
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-bgray-900 dark:text-white">{student.student}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-bgray-900 dark:text-white">{student.admissionNo}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-bgray-900 dark:text-white">{student.fatherName}</td>
                                                                      {/* Mathematics */}
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.mathematics.theory}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.mathematics.practical}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.mathematics.assignment}</td>
                                                                      {/* English */}
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.english.theory}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.english.practical}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.english.assignment}</td>
                                                                      {/* Social Studies */}
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.socialStudies.theory}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.socialStudies.practical}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.socialStudies.assignment}</td>
                                                                      {/* Science */}
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.science.theory}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.science.practical}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center text-bgray-900 dark:text-white">{student.science.assignment}</td>
                                                                      {/* Summary */}
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center font-semibold text-bgray-900 dark:text-white">{student.totalMarks}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center font-semibold text-bgray-900 dark:text-white">{student.percentage}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center font-semibold text-bgray-900 dark:text-white">{student.grade}</td>
                                                                      <td className="border border-bgray-300 dark:border-darkblack-400 py-3 px-4 text-sm text-center font-semibold text-bgray-900 dark:text-white">{student.rank}</td>
                                                                 </tr>
                                                            ))}
                                                       </tbody>
                                                  </table>
                                             </div>
                                        </>
                                   )}

                                   {activeTab === "template" && (
                                        <div className="text-center py-20 text-bgray-600 dark:text-bgray-300">
                                             <p>Template Marks Report - Coming Soon</p>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}