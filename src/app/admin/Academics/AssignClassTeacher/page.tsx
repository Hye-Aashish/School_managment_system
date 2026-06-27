"use client";
import React, { useState, useEffect } from "react";

export default function AssignClassTeacher() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
     
     const [classes, setClasses] = useState<any[]>([]);
     const [selectedClass, setSelectedClass] = useState<string>("");
     const [selectedSection, setSelectedSection] = useState<string>("");
     const [loadingClasses, setLoadingClasses] = useState<boolean>(false);
     const [isSaving, setIsSaving] = useState<boolean>(false);

     const [teachers, setTeachers] = useState<any[]>([]);
     const [classTeacherList, setClassTeacherList] = useState<any[]>([]);
     
     const fetchTeachers = async () => {
          try {
               const res = await fetch("/api/staff?role=Teacher");
               const data = await res.json();
               if (data.success) setTeachers(data.data);
          } catch (error) {
               console.error("Error fetching teachers:", error);
          }
     };

     const fetchClassTeachers = async () => {
          try {
               const res = await fetch("/api/assign-class-teacher");
               const data = await res.json();
               if (data.success) setClassTeacherList(data.data);
          } catch (error) {
               console.error("Error fetching class teachers:", error);
          }
     };

     useEffect(() => {
          fetchTeachers();
          fetchClassTeachers();
     }, []);

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

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleTeacherToggle = (teacherId: string) => {
          if (selectedTeachers.includes(teacherId)) {
               setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
          } else {
               setSelectedTeachers([...selectedTeachers, teacherId]);
          }
     };

     const handleSave = async () => {
          if (!selectedClass || !selectedSection || selectedTeachers.length === 0) {
               alert("Please select class, section, and at least one teacher");
               return;
          }
          setIsSaving(true);
          try {
               const res = await fetch("/api/assign-class-teacher", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         className: selectedClass,
                         section: selectedSection,
                         teachers: selectedTeachers,
                    }),
               });
               const data = await res.json();
               if (data.success) {
                    alert("Class teacher assigned successfully");
                    setSelectedClass("");
                    setSelectedSection("");
                    setSelectedTeachers([]);
                    fetchClassTeachers();
               } else {
                    alert("Failed to assign class teacher: " + data.error);
               }
          } catch (error) {
               console.error("Error assigning class teacher:", error);
               alert("An error occurred");
          } finally {
               setIsSaving(false);
          }
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this assignment?")) return;
          try {
               const res = await fetch(`/api/assign-class-teacher?id=${id}`, {
                    method: "DELETE",
               });
               const data = await res.json();
               if (data.success) {
                    fetchClassTeachers();
               } else {
                    alert("Failed to delete assignment: " + data.error);
               }
          } catch (error) {
               console.error("Error deleting assignment:", error);
               alert("An error occurred");
          }
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-6">
                    {/* Left Section - Assign Class Teacher Form */}
                    <section className="2xl:w-[400px] 2xl:mb-0 mb-6">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Assign Class Teacher
                              </h3>
                              <div className="flex flex-col space-y-5">
                                   {/* Class Dropdown */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Class <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                             value={selectedClass}
                                             onChange={(e) => {
                                                  setSelectedClass(e.target.value);
                                                  setSelectedSection("");
                                             }}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        >
                                             <option value="">Select</option>
                                             {classes.map(c => (
                                                  <option key={c._id} value={c.name}>{c.name}</option>
                                             ))}
                                        </select>
                                   </div>

                                   {/* Section Dropdown */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Section <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                             value={selectedSection}
                                             onChange={(e) => setSelectedSection(e.target.value)}
                                             disabled={!selectedClass}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        >
                                             <option value="">Select</option>
                                             {classes.find(c => c.name === selectedClass)?.sections?.map((s: any) => {
                                                  const sName = s.name || s;
                                                  const sId = s._id || sName;
                                                  return (
                                                       <option key={sId} value={sName}>{sName}</option>
                                                  );
                                             })}
                                        </select>
                                   </div>

                                   {/* Class Teacher Checkboxes */}
                                   <div className="w-full space-y-2">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-white">
                                             Class Teacher <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-3 pt-2">
                                             {teachers.map((teacher) => (
                                                  <label
                                                       key={teacher._id}
                                                       className="flex items-center space-x-3 cursor-pointer"
                                                  >
                                                       <input
                                                            type="checkbox"
                                                            checked={selectedTeachers.includes(teacher._id)}
                                                            onChange={() => handleTeacherToggle(teacher._id)}
                                                            className="focus:outline-none focus:ring-0 rounded border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                       />
                                                       <span className="text-sm font-medium text-bgray-900 dark:text-white">
                                                            {teacher.firstName} {teacher.lastName} ({teacher.staffId || teacher.staff_id})
                                                       </span>
                                                  </label>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Save Button */}
                                   <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full disabled:opacity-70"
                                   >
                                        {isSaving ? "Saving..." : "Save"}
                                   </button>
                              </div>
                         </div>
                    </section>

                    {/* Right Section - Class Teacher List */}
                    <section className="2xl:flex-1">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                   Class Teacher List
                              </h3>
                              <div className="flex flex-col space-y-5">
                                   {/* Search and Export */}
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

                                        {/* Export Dropdown */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 relative dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("export")}
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

                                             <div
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${
                                                       openFilter === "export" ? "block" : "hidden"
                                                  }`}
                                             >
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Copy
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Excel
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            CSV
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            PDF
                                                       </li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                            Print
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                      Class
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
                                                                      Section
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
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                      Class Teacher
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
                                                  {classTeacherList.map((item, index) => (
                                                       <tr
                                                            key={item._id}
                                                            className="border-b border-bgray-300 dark:border-darkblack-400"
                                                       >
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                      {item.class}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                      {item.section}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex flex-col space-y-1">
                                                                      {item.teachers?.map((teacher: any, tIndex: number) => (
                                                                           <p
                                                                                key={tIndex}
                                                                                className="font-medium text-base text-bgray-900 dark:text-white"
                                                                           >
                                                                                {teacher.firstName} {teacher.lastName} ({teacher.staffId || teacher.staff_id})
                                                                           </p>
                                                                      ))}
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-3">
                                                                      <button
                                                                           type="button"
                                                                           className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors"
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
                                                                           onClick={() => handleDelete(item._id)}
                                                                           className="text-bgray-900 dark:text-white hover:text-red-500 transition-colors"
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

                                   {/* Pagination */}
                                   <div className="pagination-content w-full">
                                        <div className="w-full flex lg:justify-between justify-center items-center">
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-white text-sm font-semibold">
                                                       Show result:
                                                  </span>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-bgray-900 dark:text-white">
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
                                                            className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden ${
                                                                 openFilter === "pagination" ? "block" : "hidden"
                                                            }`}
                                                       >
                                                            <ul>
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600">
                                                                      5
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600">
                                                                      10
                                                                 </li>
                                                                 <li className="text-sm font-medium text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600">
                                                                      20
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
                                                            className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-white"
                                                       >
                                                            1
                                                       </button>
                                                       <button
                                                            type="button"
                                                            className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500"
                                                       >
                                                            2
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

                                   {/* Records Info */}
                                   <div className="text-center">
                                        <p className="text-sm text-bgray-600 dark:text-white">
                                             Records: 1 to 7 of 7
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}