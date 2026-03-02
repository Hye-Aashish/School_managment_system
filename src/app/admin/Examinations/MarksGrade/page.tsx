"use client";
import React, { useState } from "react";

export default function MarksGrade() {
     const [openFilter, setOpenFilter] = useState<number | null>(null);
     const [formData, setFormData] = useState({
          examType: "",
          gradeName: "",
          percentUpto: "",
          percentFrom: "",
          gradePoint: "",
          description: ""
     });

     const toggleFilter = (index: number) => {
          setOpenFilter(openFilter === index ? null : index);
     };

     // Sample grade data
     const gradeData = [
          {
               examType: "General Purpose (Pass/Fail)",
               grades: [
                    { name: "B-", percentFrom: "0.00", percentUpto: "40.00", gradePoint: "0.0" },
                    { name: "B", percentFrom: "40.00", percentUpto: "50.00", gradePoint: "0.0" },
                    { name: "B+", percentFrom: "50.00", percentUpto: "60.00", gradePoint: "0.0" },
                    { name: "B++", percentFrom: "60.00", percentUpto: "70.00", gradePoint: "0.0" },
                    { name: "A", percentFrom: "70.00", percentUpto: "80.00", gradePoint: "0.0" },
                    { name: "A+", percentFrom: "80.00", percentUpto: "90.00", gradePoint: "0.0" },
                    { name: "A++", percentFrom: "90.00", percentUpto: "100.00", gradePoint: "0.0" }
               ]
          },
          {
               examType: "School Based Grading System",
               grades: [
                    { name: "B-", percentFrom: "0.00", percentUpto: "40.00", gradePoint: "0.0" },
                    { name: "B", percentFrom: "40.00", percentUpto: "50.00", gradePoint: "0.0" },
                    { name: "B+", percentFrom: "50.00", percentUpto: "60.00", gradePoint: "0.0" },
                    { name: "B++", percentFrom: "60.00", percentUpto: "70.00", gradePoint: "0.0" },
                    { name: "A", percentFrom: "70.00", percentUpto: "80.00", gradePoint: "0.0" },
                    { name: "A+", percentFrom: "80.00", percentUpto: "90.00", gradePoint: "0.0" },
                    { name: "A++", percentFrom: "90.00", percentUpto: "100.00", gradePoint: "0.0" }
               ]
          },
          {
               examType: "College Based Grading System",
               grades: [
                    { name: "B-", percentFrom: "0.00", percentUpto: "40.00", gradePoint: "0.0" },
                    { name: "B", percentFrom: "40.00", percentUpto: "50.00", gradePoint: "0.0" },
                    { name: "B+", percentFrom: "50.00", percentUpto: "60.00", gradePoint: "0.0" },
                    { name: "B++", percentFrom: "60.00", percentUpto: "70.00", gradePoint: "0.0" },
                    { name: "A", percentFrom: "70.00", percentUpto: "80.00", gradePoint: "0.0" },
                    { name: "A+", percentFrom: "80.00", percentUpto: "90.00", gradePoint: "0.0" },
                    { name: "A++", percentFrom: "90.00", percentUpto: "100.00", gradePoint: "0.0" }
               ]
          },
          {
               examType: "GPA Grading System",
               grades: [
                    { name: "A+", percentFrom: "90.00", percentUpto: "100.00", gradePoint: "4.5" },
                    { name: "A", percentFrom: "80.00", percentUpto: "90.00", gradePoint: "4.0" },
                    { name: "B+", percentFrom: "70.00", percentUpto: "80.00", gradePoint: "3.5" },
                    { name: "B", percentFrom: "60.00", percentUpto: "70.00", gradePoint: "3.0" },
                    { name: "C+", percentFrom: "50.00", percentUpto: "60.00", gradePoint: "2.5" },
                    { name: "C", percentFrom: "40.00", percentUpto: "50.00", gradePoint: "2.0" },
                    { name: "D", percentFrom: "0.00", percentUpto: "40.00", gradePoint: "1.0" }
               ]
          },
          {
               examType: "Average Passing",
               grades: [
                    { name: "A+", percentFrom: "90.00", percentUpto: "100.00", gradePoint: "0.0" }
               ]
          }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Left Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[400px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Add Marks Grade
                                        </h3>

                                        {/* Exam Type */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Exam Type <span className="text-red-500">*</span>
                                             </label>
                                             <select
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.examType}
                                                  onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                                             >
                                                  <option value="">Select</option>
                                                  <option value="general">General Purpose (Pass/Fail)</option>
                                                  <option value="school">School Based Grading System</option>
                                                  <option value="college">College Based Grading System</option>
                                                  <option value="gpa">GPA Grading System</option>
                                             </select>
                                        </div>

                                        {/* Grade Name */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Grade Name <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.gradeName}
                                                  onChange={(e) => setFormData({ ...formData, gradeName: e.target.value })}
                                             />
                                        </div>

                                        {/* Percent Upto */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Percent Upto <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.percentUpto}
                                                  onChange={(e) => setFormData({ ...formData, percentUpto: e.target.value })}
                                             />
                                        </div>

                                        {/* Percent From */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Percent From <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.percentFrom}
                                                  onChange={(e) => setFormData({ ...formData, percentFrom: e.target.value })}
                                             />
                                        </div>

                                        {/* Grade Point */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Grade Point <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.gradePoint}
                                                  onChange={(e) => setFormData({ ...formData, gradePoint: e.target.value })}
                                             />
                                        </div>

                                        {/* Description */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Description
                                             </label>
                                             <textarea
                                                  rows={4}
                                                  className="w-full px-3 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  value={formData.description}
                                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                             />
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex justify-end">
                                             <button
                                                  type="button"
                                                  className="px-8 py-3 rounded-lg bg-bgray-600 w-full dark:bg-darkblack-500 text-white font-semibold hover:bg-bgray-800 dark:hover:bg-darkblack-400 transition-colors"
                                             >
                                                  Save
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Right Table */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Grade List
                                        </h3>

                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Exam Type
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Grade Name
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Percent From / Upto
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Grade Point
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Action
                                                                 </span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {gradeData.map((examTypeData, examIndex) => (
                                                            <React.Fragment key={examIndex}>
                                                                 {examTypeData.grades.map((grade, gradeIndex) => (
                                                                      <tr key={`${examIndex}-${gradeIndex}`} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                           <td className="py-4 px-6 xl:px-0">
                                                                                {gradeIndex === 0 && (
                                                                                     <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                                          {examTypeData.examType}
                                                                                     </p>
                                                                                )}
                                                                           </td>
                                                                           <td className="py-4 px-6 xl:px-0">
                                                                                <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                                     {grade.name}
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6 xl:px-0">
                                                                                <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                                     {grade.percentFrom} To {grade.percentUpto}
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6 xl:px-0">
                                                                                <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                                     {grade.gradePoint}
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-4 px-6 xl:px-0">
                                                                                <div className="flex items-center space-x-3">
                                                                                     <button
                                                                                          type="button"
                                                                                          className="text-bgray-500 hover:text-success-300 transition-colors"
                                                                                     >
                                                                                          <svg
                                                                                               width="18"
                                                                                               height="18"
                                                                                               viewBox="0 0 24 24"
                                                                                               fill="none"
                                                                                               xmlns="http://www.w3.org/2000/svg"
                                                                                               className="stroke-current"
                                                                                          >
                                                                                               <path
                                                                                                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                                                                    strokeWidth="2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                               />
                                                                                               <path
                                                                                                    d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                                                                                                    strokeWidth="2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                               />
                                                                                          </svg>
                                                                                     </button>
                                                                                     <button
                                                                                          type="button"
                                                                                          className="text-bgray-500 hover:text-red-500 transition-colors"
                                                                                     >
                                                                                          <svg
                                                                                               width="18"
                                                                                               height="18"
                                                                                               viewBox="0 0 24 24"
                                                                                               fill="none"
                                                                                               xmlns="http://www.w3.org/2000/svg"
                                                                                               className="stroke-current"
                                                                                          >
                                                                                               <path
                                                                                                    d="M18 6L6 18"
                                                                                                    strokeWidth="2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                               />
                                                                                               <path
                                                                                                    d="M6 6L18 18"
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
                                                            </React.Fragment>
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