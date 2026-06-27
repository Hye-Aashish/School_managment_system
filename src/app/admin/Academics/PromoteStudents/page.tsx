"use client";
import React, { useState, useEffect } from "react";

export default function PromoteStudents() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | "export" | null>(null);
     const [classes, setClasses] = useState<any[]>([]);
     const [currentClass, setCurrentClass] = useState<string>("");
     const [currentSection, setCurrentSection] = useState<string>("");
     const [promoteClass, setPromoteClass] = useState<string>("");
     const [promoteSection, setPromoteSection] = useState<string>("");
     const [loadingClasses, setLoadingClasses] = useState<boolean>(false);

     useEffect(() => {
          const fetchClasses = async () => {
               setLoadingClasses(true);
               try {
                    const res = await fetch("/api/classes");
                    const data = await res.json();
                    if (data.success) {
                         setClasses(data.data);
                    }
               } catch (error) {
                    console.error("Error fetching classes:", error);
               } finally {
                    setLoadingClasses(false);
               }
          };
          fetchClasses();
     }, []);

     const [students, setStudents] = useState<any[]>([]);
     const [loadingStudents, setLoadingStudents] = useState<boolean>(false);
     const [isPromoting, setIsPromoting] = useState<boolean>(false);

     useEffect(() => {
          const fetchStudents = async () => {
               if (!currentClass || !currentSection) {
                    setStudents([]);
                    return;
               }
               setLoadingStudents(true);
               try {
                    const res = await fetch(`/api/students?class=${encodeURIComponent(currentClass)}&section=${encodeURIComponent(currentSection)}&limit=1000`);
                    const json = await res.json();
                    if (json.success && json.data?.students) {
                         setStudents(json.data.students.map((s: any) => ({
                              ...s,
                              currentResult: "pass",
                              nextStatus: "continue",
                              selected: true
                         })));
                    } else if (json.data && Array.isArray(json.data)) {
                         setStudents(json.data.map((s: any) => ({
                              ...s,
                              currentResult: "pass",
                              nextStatus: "continue",
                              selected: true
                         })));
                    }
               } catch (error) {
                    console.error("Error fetching students:", error);
               } finally {
                    setLoadingStudents(false);
               }
          };
          fetchStudents();
     }, [currentClass, currentSection]);

     const toggleFilter = (type: "class" | "section" | "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
          const checked = e.target.checked;
          setStudents(students.map(student => ({ ...student, selected: checked })));
     };

     const handleSelectStudent = (id: string) => {
          setStudents(students.map(student =>
               student._id === id ? { ...student, selected: !student.selected } : student
          ));
     };

     const handleResultChange = (id: string, result: string) => {
          setStudents(students.map(student =>
               student._id === id ? { ...student, currentResult: result } : student
          ));
     };

     const handleStatusChange = (id: string, status: string) => {
          setStudents(students.map(student =>
               student._id === id ? { ...student, nextStatus: status } : student
          ));
     };

     const handlePromote = async () => {
          const selectedStudents = students.filter(s => s.selected);
          if (selectedStudents.length === 0) {
               alert("Please select at least one student to promote.");
               return;
          }
          if (!promoteClass || !promoteSection) {
               alert("Please select a target class and section to promote to.");
               return;
          }

          const payload = selectedStudents.map(student => {
               const isPass = student.currentResult === "pass";
               const isLeave = student.nextStatus === "leave";
               
               let update: any = { id: student._id };
               if (isLeave) {
                    update.status = "Disabled";
               } else if (isPass) {
                    update.class = promoteClass;
                    update.section = promoteSection;
               }
               // If fail and continue, they stay in currentClass/currentSection so no update needed for class/section
               return update;
          });

          setIsPromoting(true);
          try {
               const res = await fetch("/api/students", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
               });
               const json = await res.json();
               if (json.success) {
                    alert("Students successfully processed!");
                    // Refresh student list
                    setStudents([]);
                    setCurrentSection(""); // Trigger reload if they re-select
               } else {
                    alert("Failed to promote: " + (json.error || "Unknown error"));
               }
          } catch (err) {
               console.error(err);
               alert("An error occurred while promoting students.");
          } finally {
               setIsPromoting(false);
          }
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
                                        <select
                                             value={currentClass}
                                             onChange={(e) => {
                                                  setCurrentClass(e.target.value);
                                                  setCurrentSection("");
                                             }}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        >
                                             <option value="">Select Class</option>
                                             {classes.map(c => (
                                                  <option key={c._id} value={c.name}>{c.name}</option>
                                             ))}
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                             value={currentSection}
                                             onChange={(e) => setCurrentSection(e.target.value)}
                                             disabled={!currentClass}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        >
                                             <option value="">Select Section</option>
                                             {classes.find(c => c.name === currentClass)?.sections?.map((s: any) => {
                                                  const sName = s.name || s;
                                                  const sId = s._id || sName;
                                                  return (
                                                       <option key={sId} value={sName}>{sName}</option>
                                                  );
                                             })}
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
                                        <select
                                             value={promoteClass}
                                             onChange={(e) => {
                                                  setPromoteClass(e.target.value);
                                                  setPromoteSection("");
                                             }}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        >
                                             <option value="">Select Class</option>
                                             {classes.map(c => (
                                                  <option key={c._id} value={c.name}>{c.name}</option>
                                             ))}
                                        </select>
                                   </div>
                                   <div>
                                        <label className="block text-sm font-medium text-bgray-900 dark:text-white mb-2">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                             value={promoteSection}
                                             onChange={(e) => setPromoteSection(e.target.value)}
                                             disabled={!promoteClass}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        >
                                             <option value="">Select Section</option>
                                             {classes.find(c => c.name === promoteClass)?.sections?.map((s: any) => {
                                                  const sName = s.name || s;
                                                  const sId = s._id || sName;
                                                  return (
                                                       <option key={sId} value={sName}>{sName}</option>
                                                  );
                                             })}
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
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-white">
                                                                      Admission No
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-white">
                                                                      Student Name
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-white">
                                                                      Father Name
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-white">
                                                                      Date Of Birth
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-white">
                                                                      Current Result
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-3">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-sm font-medium text-bgray-600 dark:text-white">
                                                                      Next Session Status
                                                                 </span>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {loadingStudents ? (
                                                       <tr>
                                                            <td colSpan={7} className="py-10 text-center text-bgray-500">Loading students...</td>
                                                       </tr>
                                                  ) : students.length === 0 ? (
                                                       <tr>
                                                            <td colSpan={7} className="py-10 text-center text-bgray-500">No students found in the selected class and section.</td>
                                                       </tr>
                                                  ) : students.map((student) => (
                                                       <tr
                                                            key={student._id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <label className="text-center">
                                                                      <input
                                                                           type="checkbox"
                                                                           checked={student.selected}
                                                                           onChange={() => handleSelectStudent(student._id)}
                                                                           className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                                      />
                                                                 </label>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-white">
                                                                      {student.admission_no || student.admissionNo}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-white">
                                                                      {student.fname} {student.lname}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-white">
                                                                      {student.father_name || student.fatherName || "N/A"}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <p className="font-medium text-sm text-bgray-900 dark:text-white">
                                                                      {student.dob || "N/A"}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-3">
                                                                 <div className="flex items-center space-x-4">
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`result-${student._id}`}
                                                                                checked={student.currentResult === "pass"}
                                                                                onChange={() => handleResultChange(student._id, "pass")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">
                                                                                Pass
                                                                           </span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`result-${student._id}`}
                                                                                checked={student.currentResult === "fail"}
                                                                                onChange={() => handleResultChange(student._id, "fail")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">
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
                                                                                name={`status-${student._id}`}
                                                                                checked={student.nextStatus === "continue"}
                                                                                onChange={() => handleStatusChange(student._id, "continue")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">
                                                                                Continue
                                                                           </span>
                                                                      </label>
                                                                      <label className="flex items-center space-x-2 cursor-pointer">
                                                                           <input
                                                                                type="radio"
                                                                                name={`status-${student._id}`}
                                                                                checked={student.nextStatus === "leave"}
                                                                                onChange={() => handleStatusChange(student._id, "leave")}
                                                                                className="focus:outline-none focus:ring-0 w-4 h-4 text-blue-600 cursor-pointer"
                                                                           />
                                                                           <span className="text-sm text-bgray-900 dark:text-white">
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
                              <div className="mt-8 flex justify-end">
                                   <button
                                        type="button"
                                        onClick={handlePromote}
                                        disabled={isPromoting || students.length === 0}
                                        className="px-8 py-3 bg-success-300 text-white font-bold rounded-lg hover:bg-success-400 transition-colors disabled:opacity-50"
                                   >
                                        {isPromoting ? "Processing..." : "Promote Selected Students"}
                                   </button>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}