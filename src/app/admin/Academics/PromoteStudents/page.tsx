"use client";
import React, { useState } from "react";

export default function PromoteStudents() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | "export" | null>(null);
     const [students, setStudents] = useState([
          { id: 1, admissionNo: "120020", name: "Ashwani Kumar", fatherName: "Arjun Kumar", dob: "09/25/2009", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 2, admissionNo: "18001", name: "Edward Thomas", fatherName: "Olivier Thomas", dob: "10/24/2013", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 3, admissionNo: "520039", name: "xavier bartlett", fatherName: "David bartlett", dob: "05/13/2009", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 4, admissionNo: "125005", name: "Nehal Wadhera", fatherName: "Karun wadhera", dob: "11/23/2006", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 5, admissionNo: "10024", name: "Steven Taylor", fatherName: "Jason Taylor", dob: "08/17/2017", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 6, admissionNo: "25001", name: "Georgia Wareham", fatherName: "Zakary Foulkes", dob: "05/10/2021", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 7, admissionNo: "659990", name: "James Bennett", fatherName: "David Wilson", dob: "05/05/2009", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 8, admissionNo: "2002", name: "Anubhav Sharma", fatherName: "Jay kumar", dob: "12/11/2020", currentResult: "pass", nextStatus: "continue", selected: false },
          { id: 9, admissionNo: "19001", name: "Edward Thomas", fatherName: "Olivier Thomas", dob: "11/03/2014", currentResult: "pass", nextStatus: "continue", selected: false },
     ]);

     const toggleFilter = (type: "class" | "section" | "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
          const checked = e.target.checked;
          setStudents(students.map(student => ({ ...student, selected: checked })));
     };

     const handleSelectStudent = (id: number) => {
          setStudents(students.map(student =>
               student.id === id ? { ...student, selected: !student.selected } : student
          ));
     };

     const handleResultChange = (id: number, result: string) => {
          setStudents(students.map(student =>
               student.id === id ? { ...student, currentResult: result } : student
          ));
     };

     const handleStatusChange = (id: number, status: string) => {
          setStudents(students.map(student =>
               student.id === id ? { ...student, nextStatus: status } : student
          ));
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="class1">Class 1</option>
                                             <option value="class2">Class 2</option>
                                             <option value="class3">Class 3</option>
                                             <option value="class4">Class 4</option>
                                             <option value="class5">Class 5</option>
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
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
                                   
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Promote In Session <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="2016-17">2016-17</option>
                                             <option value="2017-18">2017-18</option>
                                             <option value="2018-19">2018-19</option>
                                             <option value="2019-20">2019-20</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="class1">Class 1</option>
                                             <option value="class2">Class 2</option>
                                             <option value="class3">Class 3</option>
                                             <option value="class4">Class 4</option>
                                             <option value="class5">Class 5</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white">
                                             <option value="b">B</option>
                                             <option value="a">A</option>
                                             <option value="c">C</option>
                                        </select>
                                   </div>
                                   
                              </div>
                         </div>

                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <label className="text-center">
                                                                 <input
                                                                      type="checkbox"
                                                                      onChange={handleSelectAll}
                                                                      checked={students.every(s => s.selected)}
                                                                      className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                 />
                                                            </label>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Admission No
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Student Name
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-gray-50">
                                                                      Father Name
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Date Of Birth
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Current Result
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                                      Next Session Status
                                                                 </span>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {students.map((student) => (
                                                       <tr
                                                            key={student.id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <label className="text-center">
                                                                      <input
                                                                           type="checkbox"
                                                                           checked={student.selected}
                                                                           onChange={() => handleSelectStudent(student.id)}
                                                                           className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                      />
                                                                 </label>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">
                                                                      {student.admissionNo}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">
                                                                      {student.name}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">
                                                                      {student.fatherName}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">
                                                                      {student.dob}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <div className="flex items-center space-x-4">
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`result-${student.id}`}
                                                                                checked={student.currentResult === "pass"}
                                                                                onChange={() => handleResultChange(student.id, "pass")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-bgray-50">
                                                                                Pass
                                                                           </span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`result-${student.id}`}
                                                                                checked={student.currentResult === "fail"}
                                                                                onChange={() => handleResultChange(student.id, "fail")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-bgray-50">
                                                                                Fail
                                                                           </span>
                                                                      </label>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <div className="flex items-center space-x-4">
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`status-${student.id}`}
                                                                                checked={student.nextStatus === "continue"}
                                                                                onChange={() => handleStatusChange(student.id, "continue")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-bgray-50">
                                                                                Continue
                                                                           </span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`status-${student.id}`}
                                                                                checked={student.nextStatus === "leave"}
                                                                                onChange={() => handleStatusChange(student.id, "leave")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-bgray-50">
                                                                                Leave
                                                                           </span>
                                                                      </label>
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