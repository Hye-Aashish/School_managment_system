"use client";
import React, { useState, useEffect } from "react";

export default function PrintAdmitCard() {
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [examGroups, setExamGroups] = useState<any[]>([]);
     const [exams, setExams] = useState<any[]>([]);
     const [classes, setClasses] = useState<any[]>([]);
     const [sections, setSections] = useState<any[]>([]);
     const [templates, setTemplates] = useState<any[]>([]);
     
     const [selectedGroup, setSelectedGroup] = useState<any>(null);
     const [selectedExam, setSelectedExam] = useState<any>(null);
     const [selectedClass, setSelectedClass] = useState<any>(null);
     const [selectedSection, setSelectedSection] = useState<any>(null);
     const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
     const [selectedSession, setSelectedSession] = useState("2025-26");

     const [students, setStudents] = useState<any[]>([]);
     const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          fetchExamGroups();
          fetchClasses();
          fetchTemplates();
     }, []);

     const fetchExamGroups = async () => {
          const res = await fetch("/api/exam-groups");
          const data = await res.json();
          if (data.success) setExamGroups(data.data);
     };

     const fetchClasses = async () => {
          const res = await fetch("/api/classes");
          const data = await res.json();
          if (data.success) setClasses(data.data);
     };

     const fetchSections = async (className: string) => {
          const res = await fetch(`/api/sections?class=${className}`);
          const data = await res.json();
          if (data.success) setSections(data.data);
     };

     const fetchExams = async (groupId: string) => {
          const res = await fetch(`/api/exams?groupId=${groupId}`);
          const data = await res.json();
          if (data.success) setExams(data.data);
     };

     const fetchTemplates = async () => {
          const res = await fetch("/api/admit-card-templates");
          const data = await res.json();
          if (data.success) setTemplates(data.data);
     };

     const handleSearch = async () => {
          if (!selectedClass || !selectedSection) {
               alert("Please select Class and Section");
               return;
          }
          setLoading(true);
          try {
               const res = await fetch(`/api/students?class=${selectedClass.className}&section=${selectedSection.sectionName}`);
               const data = await res.json();
               if (data.data) setStudents(data.data);
          } catch (error) {
               console.error("Error fetching students:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked) {
               setSelectedStudents(students.map(s => s._id));
          } else {
               setSelectedStudents([]);
          }
     };

     const handleSelectStudent = (id: string) => {
          if (selectedStudents.includes(id)) {
               setSelectedStudents(selectedStudents.filter(sId => sId !== id));
          } else {
               setSelectedStudents([...selectedStudents, id]);
          }
     };

     const toggleFilter = (type: string) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleGenerate = () => {
          if (selectedStudents.length === 0 || !selectedTemplate || !selectedExam) {
               alert("Please select Students, Template and Exam");
               return;
          }
          alert(`Generating Admit Cards for ${selectedStudents.length} students using template: ${selectedTemplate.templateName}`);
          // Logic to open Print view
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                        {/* Dropdowns for Group, Exam, Session, Class, Section, Template */}
                                        {/* Group */}
                                        <div className="relative">
                                             <button type="button" onClick={() => toggleFilter("group")} className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500 overflow-hidden text-left">
                                                  <div className="flex flex-col"><span className="text-[10px] text-bgray-500">Group</span><span className="text-sm dark:text-white truncate">{selectedGroup ? selectedGroup.name : "Select"}</span></div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             <div className={`absolute z-10 w-full bg-white dark:bg-darkblack-500 shadow-xl rounded-lg top-14 left-0 ${openFilter === "group" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">{examGroups.map(g => (<li key={g._id} onClick={() => { setSelectedGroup(g); fetchExams(g._id); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm dark:text-white">{g.name}</li>))}</ul>
                                             </div>
                                        </div>
                                        {/* Exam */}
                                        <div className="relative">
                                             <button type="button" onClick={() => toggleFilter("exam")} className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500 overflow-hidden text-left">
                                                  <div className="flex flex-col"><span className="text-[10px] text-bgray-500">Exam</span><span className="text-sm dark:text-white truncate">{selectedExam ? selectedExam.name : "Select"}</span></div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             <div className={`absolute z-10 w-full bg-white dark:bg-darkblack-500 shadow-xl rounded-lg top-14 left-0 ${openFilter === "exam" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">{exams.map(e => (<li key={e._id} onClick={() => { setSelectedExam(e); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm dark:text-white">{e.name}</li>))}</ul>
                                             </div>
                                        </div>
                                        {/* Template */}
                                        <div className="relative">
                                             <button type="button" onClick={() => toggleFilter("template")} className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500 overflow-hidden text-left">
                                                  <div className="flex flex-col"><span className="text-[10px] text-bgray-500">Template</span><span className="text-sm dark:text-white truncate">{selectedTemplate ? selectedTemplate.templateName : "Select"}</span></div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             <div className={`absolute z-10 w-full bg-white dark:bg-darkblack-500 shadow-xl rounded-lg top-14 left-0 ${openFilter === "template" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">{templates.map(t => (<li key={t._id} onClick={() => { setSelectedTemplate(t); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm dark:text-white">{t.templateName}</li>))}</ul>
                                             </div>
                                        </div>
                                        {/* Class */}
                                        <div className="relative">
                                             <button type="button" onClick={() => toggleFilter("class")} className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500 overflow-hidden text-left">
                                                  <div className="flex flex-col"><span className="text-[10px] text-bgray-500">Class</span><span className="text-sm dark:text-white truncate">{selectedClass ? selectedClass.className : "Select"}</span></div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             <div className={`absolute z-10 w-full bg-white dark:bg-darkblack-500 shadow-xl rounded-lg top-14 left-0 ${openFilter === "class" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">{classes.map(c => (<li key={c._id} onClick={() => { setSelectedClass(c); fetchSections(c.className); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm dark:text-white">{c.className}</li>))}</ul>
                                             </div>
                                        </div>
                                        {/* Section */}
                                        <div className="relative">
                                             <button type="button" onClick={() => toggleFilter("section")} className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center dark:bg-darkblack-500 overflow-hidden text-left">
                                                  <div className="flex flex-col"><span className="text-[10px] text-bgray-500">Section</span><span className="text-sm dark:text-white truncate">{selectedSection ? selectedSection.sectionName : "Select"}</span></div>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7L10 12L15 7" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </button>
                                             <div className={`absolute z-10 w-full bg-white dark:bg-darkblack-500 shadow-xl rounded-lg top-14 left-0 ${openFilter === "section" ? "block" : "hidden"}`}>
                                                  <ul className="max-h-60 overflow-y-auto">{sections.map(s => (<li key={s._id} onClick={() => { setSelectedSection(s); setOpenFilter(null); }} className="px-4 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer text-sm dark:text-white">{s.sectionName}</li>))}</ul>
                                             </div>
                                        </div>

                                        <button type="button" onClick={handleSearch} className="h-14 rounded-lg bg-bgray-900 text-white font-bold flex items-center justify-center hover:bg-bgray-800 transition-colors">Search</button>
                                   </div>

                                   <div className="w-full">
                                        <div className="flex justify-between items-center mb-4">
                                             <h3 className="text-xl font-bold dark:text-white">Student List</h3>
                                             <button onClick={handleGenerate} className="px-6 py-2 bg-success-300 text-white font-bold rounded-lg hover:bg-success-400 transition-colors">Generate</button>
                                        </div>

                                        <div className="table-content w-full overflow-x-auto min-h-[400px]">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-4 px-4"><input type="checkbox" onChange={handleSelectAll} checked={students.length > 0 && selectedStudents.length === students.length} className="w-5 h-5 cursor-pointer"/></td>
                                                            <td className="py-4 px-4 text-sm font-bold text-bgray-600 dark:text-bgray-50">Admission No</td>
                                                            <td className="py-4 px-4 text-sm font-bold text-bgray-600 dark:text-bgray-50">Student Name</td>
                                                            <td className="py-4 px-4 text-sm font-bold text-bgray-600 dark:text-bgray-50">Class/Section</td>
                                                            <td className="py-4 px-4 text-sm font-bold text-bgray-600 dark:text-bgray-50">Father Name</td>
                                                            <td className="py-4 px-4 text-sm font-bold text-bgray-600 dark:text-bgray-50">DOB</td>
                                                            <td className="py-4 px-4 text-sm font-bold text-bgray-600 dark:text-bgray-50">Gender</td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr><td colSpan={7} className="py-20 text-center text-bgray-500 dark:text-bgray-300">Loading students...</td></tr>
                                                       ) : students.length === 0 ? (
                                                            <tr><td colSpan={7} className="py-20 text-center text-bgray-500 dark:text-bgray-300">No students found</td></tr>
                                                       ) : students.map(s => (
                                                            <tr key={s._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-4 px-4"><input type="checkbox" checked={selectedStudents.includes(s._id)} onChange={() => handleSelectStudent(s._id)} className="w-5 h-5 cursor-pointer"/></td>
                                                                 <td className="py-4 px-4 text-sm dark:text-white">{s.admission_no}</td>
                                                                 <td className="py-4 px-4 text-sm dark:text-white font-medium">{s.fname} {s.lname}</td>
                                                                 <td className="py-4 px-4 text-sm dark:text-white">{s.class} ({s.section})</td>
                                                                 <td className="py-4 px-4 text-sm dark:text-white">{s.father_name}</td>
                                                                 <td className="py-4 px-4 text-sm dark:text-white">{s.dob}</td>
                                                                 <td className="py-4 px-4 text-sm dark:text-white">{s.gender}</td>
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