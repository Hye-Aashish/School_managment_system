"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Student, CLASSES, SECTIONS, GENDERS, CATEGORIES, BLOOD_GROUPS, STUDENT_HOUSES, RELIGIONS } from "@/constants/student-constants";
import Pagination from "../../components/Pagination";
import { handleExport, ExportType } from "@/lib/export-utils";
import { TableSkeleton } from "@/app/common/Skeleton";

export default function StudenDetails() {
     const router = useRouter();
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "pagination" | "export" | null>(null);
     const [activeActionId, setActiveActionId] = useState<string | null>(null);
     const [students, setStudents] = useState<Student[]>([]);
     const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
     const [searchTerm, setSearchTerm] = useState("");
     const [selectedClass, setSelectedClass] = useState("Select Class");
     const [selectedSection, setSelectedSection] = useState("Select Section");

     const [currentPage, setCurrentPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [totalPages, setTotalPages] = useState(0);
     const [totalEntries, setTotalEntries] = useState(0);

     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     // Modals
     const [viewStudent, setViewStudent] = useState<Student | null>(null);
     const [editStudent, setEditStudent] = useState<Student | null>(null);
     const [disableStudent, setDisableStudent] = useState<Student | null>(null);
     const [disableReasons, setDisableReasons] = useState<any[]>([]);
     const [selectedReason, setSelectedReason] = useState("");
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };


     const [dynamicClasses, setDynamicClasses] = useState<string[]>([]);
     const [dynamicSections, setDynamicSections] = useState<string[]>([]);

     useEffect(() => {
          const fetchMetadata = async () => {
               try {
                    const [reasonRes, classRes, sectionRes] = await Promise.all([
                         fetch("/api/disable-reasons"),
                         fetch("/api/classes"),
                         fetch("/api/sections")
                    ]);
                    if (reasonRes.ok) setDisableReasons(await reasonRes.json());
                    if (classRes.ok) {
                        const json = await classRes.json();
                        const classes = json.data ? json.data.map((c: any) => c.name || c.className) : [];
                        setDynamicClasses(classes.length > 0 ? classes : CLASSES);
                    }
                    if (sectionRes.ok) {
                        const json = await sectionRes.json();
                        const sections = json.data ? json.data.map((s: any) => s.name || s.sectionName) : [];
                        setDynamicSections(sections.length > 0 ? sections : SECTIONS);
                    }
               } catch (err) { console.error(err); }
          };
          fetchMetadata();
     }, []);

     // Load students from API
     const fetchStudents = async () => {
          try {
               setLoading(true);
               let url = `/api/students?page=${currentPage}&limit=${limit}`;
               if (selectedClass && selectedClass !== "Select Class") url += `&class=${selectedClass}`;
               if (selectedSection && selectedSection !== "Select Section") url += `&section=${selectedSection}`;
               if (searchTerm) url += `&search=${searchTerm}`;

               const res = await fetch(url);
               if (res.ok) {
                    const result = await res.json();
                    setStudents(result.data.students || []);
                    setFilteredStudents(result.data.students || []);
                    setTotalPages(result.data.totalPages || 0);
                    setTotalEntries(result.data.totalEntries || 0);
               } else {
                    setError("Failed to fetch students");
               }
          } catch (err) {
               setError("An error occurred while fetching students");
               console.error(err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchStudents();
     }, [currentPage, limit, selectedClass, selectedSection, searchTerm]);

     const handleFilterChange = (type: string, value: string) => {
          if (type === "class") setSelectedClass(value);
          if (type === "section") setSelectedSection(value);
          setCurrentPage(1);
          setOpenFilter(null);
     };

     const handleCopy = () => {
          const tableData = filteredStudents.map(s => `${s.admission_no}\t${s.fname} ${s.lname}\t${s.class}\t${s.father_name}\t${s.dob}\t${s.gender}\t${s.mobile}`).join("\n");
          navigator.clipboard.writeText(`Admission No\tStudent Name\tClass\tFather Name\tDOB\tGender\tMobile\n${tableData}`);
          alert("Copied to clipboard");
     };

     const onExport = async (type: ExportType) => {
          try {
               // Fetch all students matching current filters
               let url = `/api/students?page=1&limit=10000`; // Sufficient limit
               if (selectedClass && selectedClass !== "Select Class") url += `&class=${selectedClass}`;
               if (selectedSection && selectedSection !== "Select Section") url += `&section=${selectedSection}`;
               if (searchTerm) url += `&search=${searchTerm}`;

               const res = await fetch(url);
               if (!res.ok) {
                    throw new Error(`Failed to fetch students: ${res.statusText}`);
               }

               const result = await res.json();
               if (!result.success) {
                    throw new Error(result.error || "Failed to fetch student data");
               }

               const allStudents = result.data.students || [];
               if (allStudents.length === 0) {
                    alert("No data found for the selected filters.");
                    setOpenFilter(null);
                    return;
               }
               
               const exportData = allStudents.map((s: Student) => ({
                    "Admission No": s.admission_no,
                    "Student Name": `${s.fname} ${s.lname}`,
                    "Class": s.class,
                    "Section": s.section,
                    "Father Name": s.father_name,
                    "DOB": s.dob,
                    "Gender": s.gender,
                    "Mobile": s.mobile,
                    "Category": s.category,
                    "Religion": s.religion,
                    "Blood Group": s.blood_group,
                    "Status": s.status
               }));

               handleExport(type, exportData, "Student_List");
          } catch (err: any) {
               console.error("Export error:", err);
               alert(`Export failed: ${err.message}`);
          }
          setOpenFilter(null);
     };

     const handlePrint = () => {
          window.print();
          setOpenFilter(null);
     };

     const toggleFilter = (type: "class" | "section" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
          setActiveActionId(null);
     };

     const toggleAction = (id: string) => {
          setActiveActionId(activeActionId === id ? null : id);
          setOpenFilter(null);
     };

     const handleDelete = async (id: string) => {
          if (confirm("Are you sure you want to delete this student record?")) {
               try {
                    const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
                     if (res.ok) {
                          const updatedList = students.filter(s => s.admission_no !== id);
                          setStudents(updatedList);
                          setFilteredStudents(updatedList);
                          setActiveActionId(null);
                          showNotification("Student Deleted Successfully!", "success");
                     } else {
                          showNotification("Failed to delete student.", "error");
                     }
                } catch (err) {
                     showNotification("An error occurred while deleting the student.", "error");
                     console.error("Error deleting student:", err);
                }
           }
      };

     const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string = 'photo') => {
          const file = e.target.files?.[0];
          if (file && editStudent) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setEditStudent({ ...editStudent, [fieldName]: reader.result as string });
               };
               reader.readAsDataURL(file);
          }
     };

     const [isSameAddress, setIsSameAddress] = useState(false);

     useEffect(() => {
          if (isSameAddress && editStudent) {
               setEditStudent(prev => prev ? { ...prev, permanent_address: prev.current_address } : null);
          }
     }, [isSameAddress, editStudent?.current_address]);

     const handleDisableSave = async () => {
          if (!disableStudent || !selectedReason) return;

          try {
               const res = await fetch(`/api/students/${disableStudent.admission_no}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Disabled", disable_reason: selectedReason })
               });

               if (res.ok) {
                     const updatedList = students.filter(s => s.admission_no !== disableStudent.admission_no);
                     setStudents(updatedList);
                     setFilteredStudents(updatedList);
                     setDisableStudent(null);
                     setSelectedReason("");
                     showNotification("Student Disabled Successfully!", "success");
                } else {
                     showNotification("Failed to disable student.", "error");
                }
           } catch (err) {
                console.error(err);
                showNotification("An error occurred.", "error");
           }
      };

     const handleEditSave = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!editStudent) return;

          try {
               const res = await fetch(`/api/students/${editStudent.admission_no}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editStudent)
               });

               if (res.ok) {
                     const updatedStudent = await res.json();
                     const updatedList = students.map(s => s.admission_no === editStudent.admission_no ? updatedStudent : s);
                     setStudents(updatedList);
                     setFilteredStudents(updatedList);
                     setEditStudent(null);
                     showNotification("Student Updated Successfully!", "success");
                } else {
                     const errorData = await res.json();
                     showNotification("Failed to update student: " + (errorData.error || res.statusText), "error");
                }
           } catch (err) {
                showNotification("An error occurred while updating the student.", "error");
                console.error(err);
           }
      };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px] relative">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                             <div className="flex w-full h-full items-center space-x-[15px]">
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                                  <label className="w-full">
                                                       <input
                                                            type="text"
                                                            placeholder="Search Students..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                            value={searchTerm}
                                                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[140px]"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">{selectedClass}</span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                                                  <ul>
                                                       {["Select Class", ...(dynamicClasses.length > 0 ? dynamicClasses : CLASSES.slice(0, 6))].map(c => (
                                                            <li key={c} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => handleFilterChange("class", c)}>{c}</li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[140px]"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">{selectedSection}</span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "section" ? "block" : "hidden"}`}>
                                                  <ul>
                                                       {["Select Section", ...SECTIONS].map(s => (
                                                            <li key={s} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => handleFilterChange("section", s)}>{s}</li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[140px]"
                                                  onClick={() => toggleFilter("export")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">Export</span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"}`}>
                                                  <ul>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => onExport("Copy")}>Copy</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => onExport("Excel")}>Excel</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => onExport("CSV")}>CSV</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={() => onExport("PDF")}>PDF</li>
                                                       <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold" onClick={handlePrint}>Print</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        {loading ? <TableSkeleton rows={limit} /> : (
                                         <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">Admission No</td>
                                                       <td className="py-5 px-6 xl:px-0">Student Name</td>
                                                       <td className="py-5 px-6 xl:px-0">Class</td>
                                                       <td className="py-5 px-6 xl:px-0">Father Name</td>
                                                       <td className="py-5 px-6 xl:px-0">Date of Birth</td>
                                                       <td className="py-5 px-6 xl:px-0">Gender</td>
                                                       <td className="py-5 px-6 xl:px-0">Mobile Number</td>
                                                       <td className="py-5 px-6 xl:px-0 text-center">Action</td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {filteredStudents.length > 0 ? (
                                                       filteredStudents.map((student, idx) => (
                                                            <tr key={idx} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50">{student.admission_no}</td>
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50 uppercase">
                                                                      <div className="flex items-center gap-3">
                                                                           <div className="w-8 h-8 rounded-full bg-success-300 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-sm">
                                                                                {student.photo ? (
                                                                                     <img src={student.photo} alt={student.fname} className="w-full h-full object-cover" />
                                                                                ) : (
                                                                                     <span>{student.fname[0]}{student.lname ? student.lname[0] : ''}</span>
                                                                                )}
                                                                           </div>
                                                                           <span>{student.fname} {student.lname}</span>
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50">{student.class} ({student.section})</td>
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50">{student.father_name}</td>
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50">{student.dob}</td>
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50">{student.gender}</td>
                                                                 <td className="py-5 px-6 xl:px-0 font-medium text-bgray-900 dark:text-bgray-50">{student.mobile}</td>
                                                                 <td className="py-5 px-6 xl:px-0 text-center relative">
                                                                      <button onClick={() => toggleAction(student.admission_no)} className="p-2 hover:bg-gray-100 dark:hover:bg-darkblack-500 rounded-full transition-colors">
                                                                           <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8 2C8 2.55228 8.44772 3 9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M15 2C15 2.55228 15.4477 3 16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </button>

                                                                      {activeActionId === student.admission_no && (
                                                                           <div className="absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-darkblack-500 rounded-lg shadow-xl border border-bgray-300 dark:border-darkblack-400 z-50 overflow-hidden">
                                                                                 <button onClick={() => { router.push(`/admin/Students/Profile/${student.admission_no}`); setActiveActionId(null); }} className="w-full text-left px-5 py-3 text-sm font-semibold text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-600 border-b border-bgray-200 dark:border-darkblack-400">View Details</button>
                                                                                <button onClick={() => { setEditStudent(student); setActiveActionId(null); }} className="w-full text-left px-5 py-3 text-sm font-semibold text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-600 border-b border-bgray-200 dark:border-darkblack-400">Edit Student</button>
                                                                                <button onClick={() => { setDisableStudent(student); setActiveActionId(null); }} className="w-full text-left px-5 py-3 text-sm font-semibold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 border-b border-bgray-200 dark:border-darkblack-400">Disable Student</button>
                                                                                <button onClick={() => handleDelete(student.admission_no)} className="w-full text-left px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Delete Record</button>
                                                                           </div>
                                                                      )}
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (
                                                       <tr><td colSpan={8} className="py-10 text-center text-bgray-500">No students found.</td></tr>
                                                  )}
                                             </tbody>
                                        </table>
                                        )}
                                   </div>
                                   <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                        limit={limit}
                                        onLimitChange={setLimit}
                                        totalEntries={totalEntries}
                                   />
                              </div>
                         </div>
                    </section>
               </div>

               {/* View Modal */}
               {viewStudent && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                         <div className="bg-white dark:bg-darkblack-600 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                              <div className="p-8 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center">
                                   <h3 className="text-2xl font-bold dark:text-white">Student Details</h3>
                                   <button onClick={() => setViewStudent(null)} className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white text-2xl">&times;</button>
                              </div>
                              <div className="p-8 grid grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                                   {Object.entries(viewStudent).map(([key, value]) => (
                                        <div key={key}>
                                             <label className="text-xs uppercase tracking-wider text-bgray-500 font-bold mb-1 block">{key.replace('_', ' ')}</label>
                                             <p className="text-lg font-medium text-bgray-900 dark:text-white">{String(value) || "N/A"}</p>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               )}


               {/* Edit Modal - Redesigned to match screenshot */}
               {editStudent && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                         <div className="bg-white dark:bg-darkblack-600 w-full max-w-[95%] max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col">
                              <form onSubmit={handleEditSave} className="flex flex-col h-full">
                                   <div className="p-6 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center bg-white dark:bg-darkblack-600 z-10">
                                        <h3 className="text-xl font-bold dark:text-white">Edit Student</h3>
                                        <button type="button" onClick={() => setEditStudent(null)} className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white text-2xl">&times;</button>
                                   </div>
                                   
                                   <div className="p-8 space-y-12 overflow-y-auto flex-1 custom-scrollbar pb-24">
                                        {/* Section 1: Basic Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Admission No *</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.admission_no} onChange={(e) => setEditStudent({ ...editStudent, admission_no: e.target.value })} required />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Roll Number</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.roll_no} onChange={(e) => setEditStudent({ ...editStudent, roll_no: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Class *</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.class} onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })} required>
                                                       {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Section *</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.section} onChange={(e) => setEditStudent({ ...editStudent, section: e.target.value })} required>
                                                       {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">First Name *</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.fname} onChange={(e) => setEditStudent({ ...editStudent, fname: e.target.value })} required />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Last Name</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.lname} onChange={(e) => setEditStudent({ ...editStudent, lname: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Gender *</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.gender} onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })} required>
                                                       {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Date of Birth *</label>
                                                  <input type="date" className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.dob} onChange={(e) => setEditStudent({ ...editStudent, dob: e.target.value })} required />
                                             </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Category</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.category} onChange={(e) => setEditStudent({ ...editStudent, category: e.target.value })}>
                                                       <option value="">Select</option>
                                                       {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Religion</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.religion} onChange={(e) => setEditStudent({ ...editStudent, religion: e.target.value })}>
                                                       <option value="">Select</option>
                                                       {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Caste</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.caste || ""} onChange={(e) => setEditStudent({ ...editStudent, caste: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Mobile Number</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.mobile} onChange={(e) => setEditStudent({ ...editStudent, mobile: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Email</label>
                                                  <input type="email" className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.email} onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })} />
                                             </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Admission Date</label>
                                                  <input type="date" className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.admission_date} onChange={(e) => setEditStudent({ ...editStudent, admission_date: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Student Photo</label>
                                                  <div className="flex items-center gap-3 p-2 bg-bgray-50 dark:bg-darkblack-500 rounded border border-dashed border-bgray-300">
                                                       <div className="w-10 h-10 rounded overflow-hidden bg-white">
                                                            {editStudent.photo ? <img src={editStudent.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[8px] text-bgray-300 uppercase">None</div>}
                                                       </div>
                                                       <input type="file" onChange={(e) => handleEditFileChange(e, 'photo')} className="text-[10px] flex-1" />
                                                  </div>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Blood Group</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.blood_group} onChange={(e) => setEditStudent({ ...editStudent, blood_group: e.target.value })}>
                                                       <option value="">Select</option>
                                                       {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                                  </select>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Student House</label>
                                                  <select className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.student_house} onChange={(e) => setEditStudent({ ...editStudent, student_house: e.target.value })}>
                                                       <option value="">Select</option>
                                                       {STUDENT_HOUSES.map(h => <option key={h} value={h}>{h}</option>)}
                                                  </select>
                                             </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Height</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.height || ""} onChange={(e) => setEditStudent({ ...editStudent, height: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Weight</label>
                                                  <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.weight || ""} onChange={(e) => setEditStudent({ ...editStudent, weight: e.target.value })} />
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Measurement Date</label>
                                                  <input type="date" className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm" value={editStudent.as_on_date || ""} onChange={(e) => setEditStudent({ ...editStudent, as_on_date: e.target.value })} />
                                             </div>
                                             <div className="flex items-center">
                                                  <button type="button" className="text-success-300 text-sm font-bold flex items-center gap-1 hover:text-success-400 transition-colors">
                                                       <span>+ Add Sibling</span>
                                                  </button>
                                             </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                             <label className="text-xs font-bold text-bgray-600 dark:text-bgray-50">Medical History</label>
                                             <textarea className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:border-darkblack-400 dark:text-white focus:ring-1 focus:ring-success-300 outline-none text-sm min-h-[60px]" value={editStudent.medical_history || ""} onChange={(e) => setEditStudent({ ...editStudent, medical_history: e.target.value })} />
                                        </div>

                                        {/* Transport & Hostel Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
                                             <div className="space-y-4">
                                                  <h4 className="text-sm font-bold dark:text-white border-b border-bgray-100 dark:border-darkblack-400 pb-2">Transport Details</h4>
                                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                       <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-bold text-bgray-500">Route List</label>
                                                            <select className="bg-bgray-50 dark:bg-darkblack-500 p-1.5 rounded border border-bgray-200 dark:text-white text-xs" value={editStudent.route_list || ""} onChange={(e) => setEditStudent({...editStudent, route_list: e.target.value})}>
                                                                 <option value="">Select</option>
                                                            </select>
                                                       </div>
                                                       <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-bold text-bgray-500">Pickup Point</label>
                                                            <select className="bg-bgray-50 dark:bg-darkblack-500 p-1.5 rounded border border-bgray-200 dark:text-white text-xs" value={editStudent.pickup_point || ""} onChange={(e) => setEditStudent({...editStudent, pickup_point: e.target.value})}>
                                                                 <option value="">Select</option>
                                                            </select>
                                                       </div>
                                                       <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-bold text-bgray-500">Vehicle</label>
                                                            <select className="bg-bgray-50 dark:bg-darkblack-500 p-1.5 rounded border border-bgray-200 dark:text-white text-xs" value={editStudent.vehicle || ""} onChange={(e) => setEditStudent({...editStudent, vehicle: e.target.value})}>
                                                                 <option value="">Select</option>
                                                            </select>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="space-y-4">
                                                  <h4 className="text-sm font-bold dark:text-white border-b border-bgray-100 dark:border-darkblack-400 pb-2">Hostel Details</h4>
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                       <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-bold text-bgray-500">Hostel</label>
                                                            <select className="bg-bgray-50 dark:bg-darkblack-500 p-1.5 rounded border border-bgray-200 dark:text-white text-xs" value={editStudent.hostel || ""} onChange={(e) => setEditStudent({...editStudent, hostel: e.target.value})}>
                                                                 <option value="">Select</option>
                                                            </select>
                                                       </div>
                                                       <div className="flex flex-col gap-1">
                                                            <label className="text-[10px] font-bold text-bgray-500">Room No</label>
                                                            <select className="bg-bgray-50 dark:bg-darkblack-500 p-1.5 rounded border border-bgray-200 dark:text-white text-xs" value={editStudent.room_no || ""} onChange={(e) => setEditStudent({...editStudent, room_no: e.target.value})}>
                                                                 <option value="">Select</option>
                                                            </select>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Parent Info */}
                                        <div className="pt-8 space-y-6">
                                             <h4 className="text-sm font-bold dark:text-white border-b border-bgray-100 dark:border-darkblack-400 pb-2">Parent Information</h4>
                                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Father Name</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.father_name || ""} onChange={(e) => setEditStudent({...editStudent, father_name: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Father Phone</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.father_phone || ""} onChange={(e) => setEditStudent({...editStudent, father_phone: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Father Occupation</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.father_occupation || ""} onChange={(e) => setEditStudent({...editStudent, father_occupation: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Father Photo</label>
                                                       <input type="file" onChange={(e) => handleEditFileChange(e, 'father_photo')} className="text-[10px]" />
                                                  </div>
                                             </div>
                                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Mother Name</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.mother_name || ""} onChange={(e) => setEditStudent({...editStudent, mother_name: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Mother Phone</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.mother_phone || ""} onChange={(e) => setEditStudent({...editStudent, mother_phone: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Mother Occupation</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.mother_occupation || ""} onChange={(e) => setEditStudent({...editStudent, mother_occupation: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Mother Photo</label>
                                                       <input type="file" onChange={(e) => handleEditFileChange(e, 'mother_photo')} className="text-[10px]" />
                                                  </div>
                                             </div>
                                             
                                             <div className="flex items-center gap-6 pt-2">
                                                  <label className="text-xs font-bold text-bgray-600">Guardian Is *</label>
                                                  <div className="flex gap-4">
                                                       {["Father", "Mother", "Other"].map(opt => (
                                                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                                 <input type="radio" name="guardian_is" value={opt} checked={editStudent.guardian_is === opt} onChange={(e) => setEditStudent({...editStudent, guardian_is: e.target.value as any})} className="accent-success-300" />
                                                                 <span className="text-sm text-bgray-700 dark:text-bgray-200">{opt}</span>
                                                            </label>
                                                       ))}
                                                  </div>
                                             </div>

                                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Name *</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.guardian_name || ""} onChange={(e) => setEditStudent({...editStudent, guardian_name: e.target.value})} required={!editStudent.guardian_is} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Relation</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.guardian_relation || ""} onChange={(e) => setEditStudent({...editStudent, guardian_relation: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Email</label>
                                                       <input type="email" className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.guardian_email || ""} onChange={(e) => setEditStudent({...editStudent, guardian_email: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Photo</label>
                                                       <input type="file" onChange={(e) => handleEditFileChange(e, 'guardian_photo')} className="text-[10px]" />
                                                  </div>
                                             </div>
                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Phone *</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.guardian_phone || ""} onChange={(e) => setEditStudent({...editStudent, guardian_phone: e.target.value})} required={!editStudent.guardian_is} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Occupation</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.guardian_occupation || ""} onChange={(e) => setEditStudent({...editStudent, guardian_occupation: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Guardian Address</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.guardian_address || ""} onChange={(e) => setEditStudent({...editStudent, guardian_address: e.target.value})} />
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Address Details */}
                                        <div className="pt-8 space-y-6">
                                             <h4 className="text-sm font-bold dark:text-white border-b border-bgray-100 dark:border-darkblack-400 pb-2 flex items-center justify-between">
                                                  Address Details
                                                  <label className="flex items-center gap-2 cursor-pointer text-[10px] font-normal">
                                                       <input type="checkbox" checked={isSameAddress} onChange={(e) => setIsSameAddress(e.target.checked)} className="accent-success-300" />
                                                       If Permanent Address is Same as Current Address
                                                  </label>
                                             </h4>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-500 uppercase">Current Address</label>
                                                       <textarea className="bg-bgray-50 dark:bg-darkblack-500 p-3 rounded border border-bgray-200 dark:text-white text-sm min-h-[100px]" value={editStudent.current_address || ""} onChange={(e) => setEditStudent({...editStudent, current_address: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-500 uppercase">Permanent Address</label>
                                                       <textarea className="bg-bgray-50 dark:bg-darkblack-500 p-3 rounded border border-bgray-200 dark:text-white text-sm min-h-[100px]" value={editStudent.permanent_address || ""} onChange={(e) => setEditStudent({...editStudent, permanent_address: e.target.value})} disabled={isSameAddress} />
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Other Details */}
                                        <div className="pt-8 space-y-6">
                                             <h4 className="text-sm font-bold dark:text-white border-b border-bgray-100 dark:border-darkblack-400 pb-2 uppercase">Other Details</h4>
                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Bank Account Number</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.bank_account_no || ""} onChange={(e) => setEditStudent({...editStudent, bank_account_no: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Bank Name</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.bank_name || ""} onChange={(e) => setEditStudent({...editStudent, bank_name: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">IFSC Code</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.ifsc_code || ""} onChange={(e) => setEditStudent({...editStudent, ifsc_code: e.target.value})} />
                                                  </div>
                                             </div>
                                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">ID Number</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.national_id_no || ""} onChange={(e) => setEditStudent({...editStudent, national_id_no: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Local ID</label>
                                                       <input className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.local_id_no || ""} onChange={(e) => setEditStudent({...editStudent, local_id_no: e.target.value})} />
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">RTE</label>
                                                       <div className="flex gap-4 p-2">
                                                            {["Yes", "No"].map(opt => (
                                                                 <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                                      <input type="radio" name="rte" value={opt} checked={editStudent.rte === opt} onChange={(e) => setEditStudent({...editStudent, rte: e.target.value as any})} className="accent-success-300" />
                                                                      <span className="text-sm text-bgray-700 dark:text-bgray-200">{opt}</span>
                                                                 </label>
                                                            ))}
                                                       </div>
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                       <label className="text-xs font-bold text-bgray-600">Previous School</label>
                                                       <textarea className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm" value={editStudent.previous_school_details || ""} onChange={(e) => setEditStudent({...editStudent, previous_school_details: e.target.value})} />
                                                  </div>
                                             </div>
                                             <div className="flex flex-col gap-1">
                                                  <label className="text-xs font-bold text-bgray-600">Note</label>
                                                  <textarea className="bg-bgray-50 dark:bg-darkblack-500 p-2 rounded border border-bgray-200 dark:text-white text-sm min-h-[80px]" value={editStudent.note || ""} onChange={(e) => setEditStudent({...editStudent, note: e.target.value})} />
                                             </div>
                                        </div>
                                   </div>

                                   <div className="p-6 border-t border-bgray-200 dark:border-darkblack-400 flex justify-end gap-3 bg-bgray-50 dark:bg-darkblack-500 absolute bottom-0 left-0 right-0 z-10">
                                        <button type="button" onClick={() => setEditStudent(null)} className="px-5 py-2 rounded text-sm font-bold text-bgray-600 hover:bg-bgray-200 transition-colors">Cancel</button>
                                        <button type="submit" className="px-8 py-2 bg-success-300 text-white rounded text-sm font-bold hover:bg-success-400 shadow-lg active:scale-95 transition-all">Save Changes</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}

               {/* Disable Modal */}
               {disableStudent && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                         <div className="bg-white dark:bg-darkblack-600 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                              <div className="p-8 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center">
                                   <h3 className="text-2xl font-bold dark:text-white">Disable Student</h3>
                                   <button onClick={() => setDisableStudent(null)} className="text-bgray-500 hover:text-bgray-900 dark:hover:text-white text-2xl">&times;</button>
                              </div>
                              <div className="p-8 space-y-4">
                                   <p className="text-bgray-600 dark:text-bgray-50">
                                        Are you sure you want to disable <b>{disableStudent.fname} {disableStudent.lname}</b>?
                                   </p>
                                   <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold dark:text-white">Select Reason</label>
                                        <select
                                             className="bg-bgray-100 dark:bg-darkblack-500 p-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 dark:text-white"
                                             value={selectedReason}
                                             onChange={(e) => setSelectedReason(e.target.value)}
                                        >
                                             <option value="">Choose a reason...</option>
                                             {disableReasons.map((r, i) => (
                                                  <option key={i} value={r.reason}>{r.reason}</option>
                                             ))}
                                        </select>
                                   </div>
                              </div>
                              <div className="p-8 border-t border-bgray-200 dark:border-darkblack-400 flex justify-end gap-4">
                                   <button onClick={() => setDisableStudent(null)} className="px-6 py-2 rounded-lg font-bold text-bgray-600 hover:bg-bgray-100">Cancel</button>
                                   <button
                                        onClick={handleDisableSave}
                                        disabled={!selectedReason}
                                        className={`px-8 py-2 rounded-lg font-bold text-white transition-colors ${selectedReason ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                   >
                                        Disable
                                   </button>
                              </div>
                         </div>
                     </div>
                )}

                {/* Notification Popup */}
                {notification && (
                     <div className={`fixed top-5 right-5 z-[200] flex items-center p-4 rounded-xl shadow-2xl border-l-4 transform transition-all animate-bounce-subtle
                          ${notification.type === "success" 
                               ? "bg-green-50 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200" 
                               : "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200"}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
                               ${notification.type === "success" ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"}`}>
                               {notification.type === "success" ? (
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                               ) : (
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                               )}
                          </div>
                          <p className="font-bold">{notification.message}</p>
                     </div>
                )}
           </>
      );
}
