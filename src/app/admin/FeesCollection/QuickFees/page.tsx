"use client";
import React, { useState, useEffect } from "react";
import { Student } from "@/constants/student-constants";

export default function QuickFeesMaster() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "student" | "monthlyDay" | "fineType" | null>(null);
     
     // Form State
     const [classes, setClasses] = useState<string[]>([]);
     const [sections, setSections] = useState<string[]>([]);
     const [students, setStudents] = useState<Student[]>([]);
     
     const [selectedClass, setSelectedClass] = useState("Select Class");
     const [selectedSection, setSelectedSection] = useState("Select Section");
     const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
     
     const [totalFees, setTotalFees] = useState(0);
     const [firstInstallment, setFirstInstallment] = useState(0);
     const [noOfInstallment, setNoOfInstallment] = useState(1);
     const [monthlyDay, setMonthlyDay] = useState(1);
     const [selectedFineType, setSelectedFineType] = useState<"none" | "fixAmount" | "percentage">("none");
     const [fineValue, setFineValue] = useState(0);
     
     const [showInstallmentTable, setShowInstallmentTable] = useState(false);
     const [installments, setInstallments] = useState<any[]>([]);
     const [isSaving, setIsSaving] = useState(false);

     // Fetch Classes & Sections
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [classRes, sectionRes] = await Promise.all([
                         fetch("/api/classes"),
                         fetch("/api/sections")
                    ]);
                    if (classRes.ok) setClasses(await classRes.json());
                    if (sectionRes.ok) setSections(await sectionRes.json());
               } catch (err) { console.error(err); }
          };
          fetchData();
     }, []);

     // Fetch Students when Class/Section changes
     useEffect(() => {
          if (selectedClass !== "Select Class" && selectedSection !== "Select Section") {
               const fetchStudents = async () => {
                    try {
                         const res = await fetch(`/api/students?class=${selectedClass}&section=${selectedSection}`);
                         if (res.ok) {
                              const result = await res.json();
                              setStudents(result.data || []);
                         }
                    } catch (err) { console.error(err); }
               };
               fetchStudents();
          }
     }, [selectedClass, selectedSection]);

     const toggleFilter = (type: any) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleFineTypeChange = (value: "none" | "fixAmount" | "percentage") => {
          setSelectedFineType(value);
          setOpenFilter(null);
     };

     const balanceFees = Math.max(0, totalFees - firstInstallment);

     const handleViewInstallment = () => {
          if (!selectedStudent || totalFees <= 0 || noOfInstallment <= 0) {
               alert("Please fill all required fields correctly.");
               return;
          }

          const generatedInstallments = [];
          const remainingAmount = totalFees - firstInstallment;
          const installmentAmount = noOfInstallment > 1 ? (remainingAmount / (noOfInstallment - 1)).toFixed(2) : 0;
          
          let currentDate = new Date();
          currentDate.setDate(monthlyDay);

          // 1st Installment
          generatedInstallments.push({
               group: `${selectedStudent.admission_no}-${selectedStudent.fname}`,
               type: `${selectedStudent.fname} (${selectedStudent.admission_no}) - Installment-1`,
               code: `${selectedStudent.fname} (${selectedStudent.admission_no}) - Installment-1`,
               dueDate: currentDate.toISOString().split('T')[0],
               fine: fineValue,
               fineType: selectedFineType,
               amount: firstInstallment
          });

          // Subsequent Installments
          for (let i = 2; i <= noOfInstallment; i++) {
               currentDate.setMonth(currentDate.getMonth() + 1);
               generatedInstallments.push({
                    group: `${selectedStudent.admission_no}-${selectedStudent.fname}`,
                    type: `${selectedStudent.fname} (${selectedStudent.admission_no}) - Installment-${i}`,
                    code: `${selectedStudent.fname} (${selectedStudent.admission_no}) - Installment-${i}`,
                    dueDate: currentDate.toISOString().split('T')[0],
                    fine: fineValue,
                    fineType: selectedFineType,
                    amount: installmentAmount
               });
          }

          setInstallments(generatedInstallments);
          setShowInstallmentTable(true);
     };

     const handleSaveInstallments = async () => {
          if (!selectedStudent || installments.length === 0) return;
          
          setIsSaving(true);
          try {
               const res = await fetch("/api/student-fees/bulk-assign", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         studentId: (selectedStudent as any)._id || selectedStudent.admission_no, // Depend on schema
                         installments
                    })
               });

               if (res.ok) {
                    alert("Installments saved successfully!");
                    setShowInstallmentTable(false);
                    // Reset form
                    setTotalFees(0);
                    setFirstInstallment(0);
                    setNoOfInstallment(1);
               } else {
                    const error = await res.json();
                    alert("Error: " + error.error);
               }
          } catch (err) {
               console.error(err);
               alert("An error occurred while saving.");
          } finally {
               setIsSaving(false);
          }
     };

     return (
          <div className="w-full">
               <section className="w-full">
                    <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                              Quick Fees Master
                         </h3>

                         {/* Top Filters */}
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                              {/* Class */}
                              <div className="w-full">
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Class</label>
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                             onClick={() => toggleFilter("class")}
                                        >
                                             <span className="text-base text-bgray-900 dark:text-white">{selectedClass}</span>
                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                                             <ul>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => { setSelectedClass("Select Class"); setOpenFilter(null); }}>Select Class</li>
                                                  {classes.map(c => (
                                                       <li key={c} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => { setSelectedClass(c); setOpenFilter(null); }}>{c}</li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>

                              {/* Section */}
                              <div className="w-full">
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Section</label>
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                             onClick={() => toggleFilter("section")}
                                        >
                                             <span className="text-base text-bgray-900 dark:text-white">{selectedSection}</span>
                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "section" ? "block" : "hidden"}`}>
                                             <ul>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => { setSelectedSection("Select Section"); setOpenFilter(null); }}>Select Section</li>
                                                  {sections.map(s => (
                                                       <li key={s} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => { setSelectedSection(s); setOpenFilter(null); }}>{s}</li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>

                              {/* Student */}
                              <div className="w-full">
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Student</label>
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                             onClick={() => toggleFilter("student")}
                                        >
                                             <span className="text-base text-bgray-900 dark:text-white">{selectedStudent ? `${selectedStudent.fname} (${selectedStudent.admission_no})` : "Select Student"}</span>
                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "student" ? "block" : "hidden"}`}>
                                             <ul className="max-h-60 overflow-y-auto">
                                                  {students.map(s => (
                                                       <li key={s.admission_no} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => { setSelectedStudent(s); setOpenFilter(null); }}>{s.fname} ({s.admission_no})</li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Fee Details Grid */}
                         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                              <div>
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Total Fees <span className="text-red-500">*</span></label>
                                   <input type="number" value={totalFees} onChange={(e) => setTotalFees(Number(e.target.value))} className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 dark:text-white" />
                              </div>
                              <div>
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">1st Installment</label>
                                   <input type="number" value={firstInstallment} onChange={(e) => setFirstInstallment(Number(e.target.value))} className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 dark:text-white" />
                              </div>
                              <div>
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Balance Fees <span className="text-red-500">*</span></label>
                                   <input type="number" value={balanceFees} readOnly className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-400 px-4 border border-bgray-300 dark:border-darkblack-400 dark:text-white outline-none cursor-not-allowed" />
                              </div>
                              <div>
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">No. Of Installment <span className="text-red-500">*</span></label>
                                   <input type="number" value={noOfInstallment} onChange={(e) => setNoOfInstallment(Math.max(1, Number(e.target.value)))} className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 dark:text-white" />
                              </div>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                              <div>
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Monthly Day for Due date</label>
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                             onClick={() => toggleFilter("monthlyDay")}
                                        >
                                             <span className="text-base text-bgray-900 dark:text-white">{monthlyDay}</span>
                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "monthlyDay" ? "block" : "hidden"}`}>
                                             <ul className="max-h-60 overflow-y-auto">
                                                  {Array.from({ length: 28 }, (_, i) => i + 1).map(d => (
                                                       <li key={d} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => { setMonthlyDay(d); setOpenFilter(null); }}>{d}</li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>

                              <div>
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Fine Type</label>
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400 focus:border-success-300"
                                             onClick={() => toggleFilter("fineType")}
                                        >
                                             <span className="text-base text-bgray-900 dark:text-white uppercase">{selectedFineType}</span>
                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "fineType" ? "block" : "hidden"}`}>
                                             <ul>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => handleFineTypeChange("none")}>None</li>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => handleFineTypeChange("fixAmount")}>Fix Amount</li>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 font-semibold" onClick={() => handleFineTypeChange("percentage")}>Percentage</li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>

                              {selectedFineType !== "none" && (
                                   <div>
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Fine Type Value <span className="text-red-500">*</span></label>
                                        <input type="number" value={fineValue} onChange={(e) => setFineValue(Number(e.target.value))} className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 px-4 border border-bgray-300 dark:border-darkblack-400 focus:border-success-300 dark:text-white" />
                                   </div>
                              )}

                              <div className="flex items-end lg:col-start-4">
                                   <button
                                        type="button"
                                        onClick={handleViewInstallment}
                                        className="h-12 w-full px-6 flex items-center justify-center text-white font-semibold bg-gray-900 dark:bg-darkblack-500 hover:bg-gray-800 dark:hover:bg-darkblack-700 transition-all rounded-lg"
                                   >
                                        View Installment
                                   </button>
                              </div>
                         </div>

                         {/* Dynamic Installment Table */}
                         {showInstallmentTable && (
                              <div className="w-full mt-10 border-t border-bgray-200 dark:border-darkblack-400 pt-10">
                                   <div className="table-content w-full overflow-x-auto border-2 border-red-500 rounded-xl p-6 bg-bgray-50 dark:bg-darkblack-700/30">
                                        <table className="w-full whitespace-nowrap">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <th className="py-4 px-4 text-left text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Fees Group *</th>
                                                       <th className="py-4 px-4 text-left text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Fees Type *</th>
                                                       <th className="py-4 px-4 text-left text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Fees Code *</th>
                                                       <th className="py-4 px-4 text-left text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Due Date</th>
                                                       <th className="py-4 px-4 text-left text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Fine Amount ($)</th>
                                                       <th className="py-4 px-4 text-left text-sm font-bold text-bgray-600 dark:text-bgray-50 uppercase tracking-wider">Amount ($) *</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {installments.map((inst, idx) => (
                                                       <tr key={idx} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100/50 dark:hover:bg-darkblack-600/50 transition-colors">
                                                            {idx === 0 && (
                                                                 <td className="py-4 px-4" rowSpan={installments.length}>
                                                                      <input type="text" defaultValue={inst.group} className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm border border-bgray-300 dark:border-darkblack-400 dark:text-white" />
                                                                 </td>
                                                            )}
                                                            <td className="py-4 px-4">
                                                                 <input type="text" defaultValue={inst.type} className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm border border-bgray-300 dark:border-darkblack-400 dark:text-white" />
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <input type="text" defaultValue={inst.code} className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm border border-bgray-300 dark:border-darkblack-400 dark:text-white" />
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <input type="date" defaultValue={inst.dueDate} className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm border border-bgray-300 dark:border-darkblack-400 dark:text-white" />
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <input type="number" defaultValue={inst.fine} className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm border border-bgray-300 dark:border-darkblack-400 dark:text-white" />
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                 <input type="number" defaultValue={inst.amount} className="w-full h-10 rounded bg-white dark:bg-darkblack-500 px-3 text-sm border border-bgray-300 dark:border-darkblack-400 dark:text-white font-bold" />
                                                            </td>
                                                       </tr>
                                                  ))}
                                                  <tr className="bg-bgray-100 dark:bg-darkblack-800">
                                                       <td colSpan={5} className="py-4 px-4 text-right">
                                                            <span className="text-sm font-bold text-bgray-900 dark:text-white">Total Fees</span>
                                                       </td>
                                                       <td className="py-4 px-4">
                                                            <span className="text-lg font-black text-bgray-900 dark:text-white">${totalFees}</span>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                                   <div className="flex justify-end mt-8">
                                        <button 
                                             type="button"
                                             onClick={handleSaveInstallments}
                                             disabled={isSaving}
                                             className={`px-10 py-3 text-white font-bold rounded-lg shadow-lg transition-all uppercase tracking-widest text-sm ${
                                                  isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 hover:shadow-red-500/30"
                                             }`}
                                        >
                                             {isSaving ? "Saving..." : "Save Installments"}
                                        </button>
                                   </div>
                              </div>
                         )}
                    </div>
               </section>
          </div>
     );
}