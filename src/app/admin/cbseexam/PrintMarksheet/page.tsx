"use client";
import React, { useState, useEffect } from "react";

type IClass = string;
type ISection = string;

interface ITemplate {
    _id: string;
    name: string;
}

interface IStudent {
    _id: string;
    admission_no: string;
    fname: string;
    lname: string;
    father_fname?: string;
    dob?: string;
    gender?: string;
    mobile_no?: string;
}

export default function StudentDetails() {
     const [classes, setClasses] = useState<IClass[]>([]);
     const [sections, setSections] = useState<ISection[]>([]);
     const [templates, setTemplates] = useState<ITemplate[]>([]);
     const [students, setStudents] = useState<IStudent[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     
     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSection, setSelectedSection] = useState("");
     const [selectedTemplate, setSelectedTemplate] = useState("");
     const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
     
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "template" | null>(null);

     useEffect(() => {
          const fetchInitialData = async () => {
               try {
                     const [classRes, templateRes] = await Promise.all([
                          fetch("/api/classes"),
                          fetch("/api/cbse-templates")
                     ]);
                     if (classRes.ok) setClasses(await classRes.json());
                     if (templateRes.ok) setTemplates(await templateRes.json());
               } catch (error) {
                    console.error("Error fetching initial data:", error);
               }
          };
          fetchInitialData();
     }, []);

     useEffect(() => {
          const fetchSections = async () => {
               if (!selectedClass) {
                    setSections([]);
                    return;
               }
               try {
                    const res = await fetch(`/api/sections?class=${selectedClass}`);
                    if (res.ok) setSections(await res.json());
               } catch (err) { console.error(err); }
          };
          fetchSections();
          setSelectedSection(""); // Reset section when class changes
     }, [selectedClass]);

     const fetchStudents = async () => {
          if (!selectedClass || !selectedSection) return;
          setIsLoading(true);
           try {
                const query = new URLSearchParams({
                    class: selectedClass,
                    section: selectedSection,
                    status: "Active"
                });
                if (searchTerm) query.append("search", searchTerm);
                
                const res = await fetch(`/api/students?${query.toString()}`);
                if (res.ok) {
                     const data = await res.json();
                     setStudents(data.data || []);
                }
           } catch (error) {
               console.error("Error fetching students:", error);
          } finally {
               setIsLoading(false);
          }
     };

      useEffect(() => {
           fetchStudents();
      }, [selectedClass, selectedSection, searchTerm]);

     const toggleFilter = (type: "class" | "section" | "template") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const toggleStudentSelection = (id: string) => {
          setSelectedStudents(prev => 
               prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
          );
     };

     const toggleAllStudents = () => {
          if (selectedStudents.length === students.length) {
               setSelectedStudents([]);
          } else {
               setSelectedStudents(students.map(s => s._id));
          }
     };

     const handleBulkDownload = () => {
          if (selectedStudents.length === 0) {
               alert("Please select at least one student.");
               return;
          }
          if (!selectedTemplate) {
               alert("Please select a template.");
               return;
          }
          // Implement download logic here
          console.log("Downloading for students:", selectedStudents, "with template:", selectedTemplate);
          alert(`Download started for ${selectedStudents.length} students.`);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                               <div className="flex flex-col space-y-5">
                                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Print Marksheet</h3>
                                        <div className="relative w-full md:w-64">
                                             <input
                                                  type="text"
                                                  placeholder="Search students..."
                                                  value={searchTerm}
                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-bgray-200 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white focus:ring-success-300 focus:border-success-300"
                                             />
                                             <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bgray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                   </div>
                                   {/* Filter Row */}
                                   <div className="w-full flex h-14 space-x-4">
                                        {/* Class Dropdown */}
                                        <div className="relative flex-1">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("class")}
                                             >
                                                  <div className="flex flex-col items-start text-left">
                                                       <span className="text-xs text-bgray-500 dark:text-bgray-400">Class *</span>
                                                       <span className="text-sm text-bgray-900 dark:text-white font-medium">
                                                            {classes.find(c => c === selectedClass) || "Select"}
                                                       </span>
                                                  </div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             {openFilter === "class" && (
                                                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                                       {classes.map(c => (
                                                            <div key={c} onClick={() => { setSelectedClass(c); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm font-medium">
                                                                 {c}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        {/* Section Dropdown */}
                                        <div className="relative flex-1">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("section")}
                                             >
                                                  <div className="flex flex-col items-start text-left">
                                                       <span className="text-xs text-bgray-500 dark:text-bgray-400">Section *</span>
                                                       <span className="text-sm text-bgray-900 dark:text-white font-medium">
                                                            {sections.find(s => s === selectedSection) || "Select"}
                                                       </span>
                                                  </div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             {openFilter === "section" && (
                                                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                                       {sections.map(s => (
                                                            <div key={s} onClick={() => { setSelectedSection(s); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm font-medium">
                                                                 {s}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        {/* Template Dropdown */}
                                        <div className="relative flex-[2]">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500"
                                                  onClick={() => toggleFilter("template")}
                                             >
                                                  <div className="flex flex-col items-start text-left">
                                                       <span className="text-xs text-bgray-500 dark:text-bgray-400">Template *</span>
                                                       <span className="text-sm text-bgray-900 dark:text-white font-medium truncate max-w-[300px]">
                                                            {templates.find(t => t._id === selectedTemplate)?.name || "Select Template"}
                                                       </span>
                                                  </div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             {openFilter === "template" && (
                                                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                                       {templates.map(t => (
                                                            <div key={t._id} onClick={() => { setSelectedTemplate(t._id); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm font-medium">
                                                                 {t.name}
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        <button
                                             type="button"
                                             onClick={handleBulkDownload}
                                             className="px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 text-white font-semibold transition-colors"
                                        >
                                             Bulk Download
                                        </button>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <th className="py-5 px-6 xl:px-0 text-left">
                                                            <input
                                                                 type="checkbox"
                                                                 checked={students.length > 0 && selectedStudents.length === students.length}
                                                                 onChange={toggleAllStudents}
                                                                 className="w-5 h-5 text-success-300 rounded border-bgray-400 dark:bg-darkblack-600 cursor-pointer"
                                                            />
                                                       </th>
                                                       <th className="py-5 px-6 xl:px-4 text-left font-medium text-bgray-600 dark:text-bgray-50">Admission No</th>
                                                       <th className="py-5 px-6 xl:px-4 text-left font-medium text-bgray-600 dark:text-bgray-50">Student Name</th>
                                                       <th className="py-5 px-6 xl:px-4 text-left font-medium text-bgray-600 dark:text-bgray-50">Father Name</th>
                                                       <th className="py-5 px-6 xl:px-4 text-left font-medium text-bgray-600 dark:text-bgray-50">Date Of Birth</th>
                                                       <th className="py-5 px-6 xl:px-4 text-left font-medium text-bgray-600 dark:text-bgray-50">Gender</th>
                                                       <th className="py-5 px-6 xl:px-4 text-left font-medium text-bgray-600 dark:text-bgray-50">Mobile No.</th>
                                                       <th className="py-5 px-6 xl:px-4 text-right font-medium text-bgray-600 dark:text-bgray-50">Action</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {isLoading ? (
                                                       <tr><td colSpan={8} className="py-20 text-center font-medium">Loading students...</td></tr>
                                                  ) : students.length === 0 ? (
                                                       <tr><td colSpan={8} className="py-20 text-center text-bgray-500 font-medium">No students found. Please select class and section.</td></tr>
                                                  ) : (
                                                       students.map((student) => (
                                                            <tr key={student._id} className="border-b border-bgray-200 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <input
                                                                           type="checkbox"
                                                                           checked={selectedStudents.includes(student._id)}
                                                                           onChange={() => toggleStudentSelection(student._id)}
                                                                           className="w-5 h-5 text-success-300 rounded border-bgray-400 cursor-pointer"
                                                                      />
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-4 text-bgray-900 dark:text-white font-medium text-sm">{student.admission_no}</td>
                                                                 <td className="py-5 px-6 xl:px-4 text-success-300 font-bold text-sm">{student.fname} {student.lname}</td>
                                                                 <td className="py-5 px-6 xl:px-4 text-bgray-900 dark:text-white text-sm">{student.father_fname || "-"}</td>
                                                                 <td className="py-5 px-6 xl:px-4 text-bgray-900 dark:text-white text-sm">
                                                                      {student.dob ? new Date(student.dob).toLocaleDateString() : "-"}
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-4 text-bgray-900 dark:text-white text-sm">{student.gender || "-"}</td>
                                                                 <td className="py-5 px-6 xl:px-4 text-bgray-900 dark:text-white text-sm">{student.mobile_no || "-"}</td>
                                                                 <td className="py-5 px-6 xl:px-4 text-right">
                                                                      <div className="flex justify-end space-x-2">
                                                                           <button className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-600 rounded" title="Download">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M10 17V7M5 12L10 17L15 12M5 5H15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                           </button>
                                                                           <button className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-600 rounded" title="Options">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M3 6h14M3 10h14M3 14h14" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
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