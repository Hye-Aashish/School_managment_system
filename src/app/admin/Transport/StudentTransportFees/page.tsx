"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function StudentTransportFees() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     
     // Filter states
     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSection, setSelectedSection] = useState("");
     const [searchQuery, setSearchQuery] = useState("");
     
     // Data states
     const [students, setStudents] = useState<any[]>([]);
     const [feeMaster, setFeeMaster] = useState<any>(null);
     const [payments, setPayments] = useState<any[]>([]);
     const [classes, setClasses] = useState<any[]>([]);
     const [availableSections, setAvailableSections] = useState<any[]>([]);
     
     // UI states
     const [loading, setLoading] = useState(false);
     const [selectedStudent, setSelectedStudent] = useState<any>(null);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     // Payment Form State
     const [formData, setFormData] = useState({
          month: "",
          amountPaid: 0,
          paymentMode: "Cash",
          paymentDate: new Date().toISOString().split('T')[0],
          note: ""
     });

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     useEffect(() => {
          fetchFeeMaster();
          fetchClasses();
     }, []);

     const fetchClasses = async () => {
          try {
               const res = await fetch("/api/classes");
               const data = await res.json();
               if (data.success) {
                    setClasses(data.data || []);
               }
          } catch (error) {
               console.error("Error fetching classes:", error);
          }
     };

     // Update available sections when class changes
     useEffect(() => {
          if (selectedClass) {
               const cls = classes.find(c => c.name === selectedClass);
               setAvailableSections(cls?.sections || []);
          } else {
               setAvailableSections([]);
          }
          // Reset section selection when class changes
          setSelectedSection("");
     }, [selectedClass, classes]);

     const fetchFeeMaster = async () => {
          try {
               const res = await fetch("/api/transport/fees-master");
               const data = await res.json();
               if (data.success) {
                    setFeeMaster(data.data);
               }
          } catch (error) {
               console.error("Error fetching fees master:", error);
          }
     };

     const fetchStudents = async () => {
          setLoading(true);
          try {
               let url = `/api/students?limit=100`;
               if (selectedClass) url += `&class=${selectedClass}`;
               if (selectedSection) url += `&section=${selectedSection}`;
               if (searchQuery) url += `&search=${searchQuery}`;

               const res = await fetch(url);
               const data = await res.json();
               if (data.success) {
                    setStudents(data.data?.students || []);
               }
          } catch (error) {
               console.error("Error fetching students:", error);
          } finally {
               setLoading(false);
          }
     };

     const fetchStudentPayments = async (studentId: string) => {
          try {
               const res = await fetch(`/api/transport/student-fees?studentId=${studentId}`);
               const data = await res.json();
               if (data.success) {
                    setPayments(data.data || []);
               }
          } catch (error) {
               console.error("Error fetching payments:", error);
          }
     };

     const handleSearch = (e: React.FormEvent) => {
          e.preventDefault();
          fetchStudents();
     };

     const openPaymentModal = (student: any) => {
          setSelectedStudent(student);
          setFormData({
               month: feeMaster?.monthsData[0]?.month || "",
               amountPaid: 0,
               paymentMode: "Cash",
               paymentDate: new Date().toISOString().split('T')[0],
               note: ""
          });
          fetchStudentPayments(student._id);
          setIsModalOpen(true);
     };

     const handleCollectFee = async (e: React.FormEvent) => {
          e.preventDefault();
          if (formData.amountPaid <= 0 || !formData.month) {
               alert("Please enter a valid amount and select a month.");
               return;
          }

          setIsSubmitting(true);
          try {
               const payload = {
                    studentId: selectedStudent._id,
                    studentName: `${selectedStudent.fname} ${selectedStudent.lname}`,
                    admissionNo: selectedStudent.admission_no,
                    ...formData
               };

               const res = await fetch("/api/transport/student-fees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
               });
               const data = await res.json();
               
               if (data.success) {
                    alert("Payment recorded successfully!");
                    fetchStudentPayments(selectedStudent._id);
                    setFormData({ ...formData, amountPaid: 0, note: "" });
               } else {
                    alert(data.error || "Failed to record payment");
               }
          } catch (error) {
               console.error(error);
          } finally {
               setIsSubmitting(false);
          }
     };

     const onExport = (type: ExportType) => {
          const exportData = students.map(s => ({
               "Admission No": s.admission_no,
               "Name": `${s.fname} ${s.lname}`,
               "Class": s.class,
               "Section": s.section,
               "Mobile": s.mobile || "N/A"
          }));
          handleExport(type, exportData, "Student_Transport");
          setOpenFilter(null);
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Search Criteria Section */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col mb-4">
                         <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
                              Select Criteria for Transport Fees
                         </h3>
                    </div>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                         <div className="w-full">
                              <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Class</label>
                              <select
                                   value={selectedClass}
                                   onChange={e => setSelectedClass(e.target.value)}
                                   className="w-full h-12 rounded-lg bg-bgray-50 dark:bg-darkblack-500 border-none px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 font-semibold"
                              >
                                   <option value="">Select Class</option>
                                   {classes.map((c: any) => (
                                        <option key={c._id} value={c.name}>{c.name}</option>
                                   ))}
                              </select>
                         </div>
                         <div className="w-full">
                              <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Section</label>
                              <select
                                   value={selectedSection}
                                   onChange={e => setSelectedSection(e.target.value)}
                                   className="w-full h-12 rounded-lg bg-bgray-50 dark:bg-darkblack-500 border-none px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 font-semibold"
                                   disabled={!selectedClass}
                              >
                                   <option value="">Select Section</option>
                                   {availableSections.map((s: any) => (
                                        <option key={s._id} value={s.name}>{s.name}</option>
                                   ))}
                              </select>
                         </div>
                         <div className="w-full">
                              <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Search By Keyword</label>
                              <input
                                   type="text"
                                   placeholder="Search by name, roll no..."
                                   value={searchQuery}
                                   onChange={e => setSearchQuery(e.target.value)}
                                   className="w-full h-12 rounded-lg bg-bgray-50 dark:bg-darkblack-500 border-none px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 font-semibold"
                              />
                         </div>
                         <div className="w-full">
                              <button type="submit" className="w-full h-12 bg-success-300 text-white font-bold rounded-lg hover:bg-success-400 transition-all flex items-center justify-center gap-2">
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                   Search Students
                              </button>
                         </div>
                    </form>
               </section>

               {/* Student List Section */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-bgray-100 dark:border-darkblack-400">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Student List</h3>
                         <div className="relative">
                              <button
                                   onClick={() => toggleFilter("export")}
                                   className="h-10 px-4 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center gap-2 text-sm font-semibold text-bgray-600 dark:text-white"
                              >
                                   Export <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                              </button>
                              {openFilter === "export" && (
                                   <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-darkblack-500 rounded-lg shadow-lg z-10 border border-bgray-100 dark:border-darkblack-400 overflow-hidden">
                                        <ul className="py-1">
                                             <li onClick={() => onExport("Copy")} className="px-4 py-2 text-sm cursor-pointer hover:bg-bgray-50 dark:hover:bg-darkblack-600 dark:text-white font-medium">Copy</li>
                                             <li onClick={() => onExport("Excel")} className="px-4 py-2 text-sm cursor-pointer hover:bg-bgray-50 dark:hover:bg-darkblack-600 dark:text-white font-medium">Excel</li>
                                             <li onClick={() => onExport("CSV")} className="px-4 py-2 text-sm cursor-pointer hover:bg-bgray-50 dark:hover:bg-darkblack-600 dark:text-white font-medium">CSV</li>
                                        </ul>
                                   </div>
                              )}
                         </div>
                    </div>
                    
                    <div className="overflow-x-auto min-h-[400px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-sm font-bold text-bgray-600 dark:text-white">
                                        <th className="px-6 py-5">Admission No</th>
                                        <th className="px-6 py-5">Student Name</th>
                                        <th className="px-6 py-5">Class</th>
                                        <th className="px-6 py-5">Mobile</th>
                                        <th className="px-6 py-5 text-right">Action</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300 border-t-transparent rounded-full animate-spin"></div></td></tr>
                                   ) : students.length > 0 ? (
                                        students.map((student) => (
                                             <tr key={student._id} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500 transition-colors">
                                                  <td className="px-6 py-4 text-sm font-medium dark:text-white">{student.admission_no}</td>
                                                  <td className="px-6 py-4 text-sm font-bold dark:text-white">{student.fname} {student.lname}</td>
                                                  <td className="px-6 py-4 text-sm font-medium dark:text-white">{student.class} ({student.section})</td>
                                                  <td className="px-6 py-4 text-sm font-medium dark:text-white">{student.mobile || "N/A"}</td>
                                                  <td className="px-6 py-4 text-right">
                                                       <button 
                                                            onClick={() => openPaymentModal(student)}
                                                            className="px-4 py-2 bg-success-300 text-white text-xs font-bold rounded-lg hover:bg-success-400 transition-all shadow-md shadow-success-300/20"
                                                       >
                                                            Collect Transport Fee
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr><td colSpan={5} className="py-24 text-center text-bgray-400 text-sm font-medium">No students found. Use the search criteria above.</td></tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* Fee Collection Modal */}
               {isModalOpen && selectedStudent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                              
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500/50 flex justify-between items-center">
                                   <div>
                                        <h3 className="text-xl font-bold dark:text-white">Collect Transport Fee</h3>
                                        <p className="text-sm text-bgray-500 dark:text-bgray-300 mt-1 font-medium">
                                             {selectedStudent.fname} {selectedStudent.lname} ({selectedStudent.admission_no}) - {selectedStudent.class} {selectedStudent.section}
                                        </p>
                                   </div>
                                   <button onClick={() => setIsModalOpen(false)} className="text-bgray-400 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>

                              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                                   {/* Left Side: Payment Form */}
                                   <form onSubmit={handleCollectFee} className="p-6 lg:w-1/2 overflow-y-auto border-r border-bgray-100 dark:border-darkblack-400 space-y-5">
                                        
                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Month</label>
                                             <select required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-lg px-4 text-sm font-semibold border-none focus:ring-2 focus:ring-success-300">
                                                  {feeMaster?.monthsData?.map((m: any, i: number) => (
                                                       <option key={i} value={m.month}>{m.month} (Due: {m.dueDate || "N/A"})</option>
                                                  ))}
                                             </select>
                                        </div>

                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Payment Date</label>
                                             <input type="date" required value={formData.paymentDate} onChange={e => setFormData({...formData, paymentDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-lg px-4 text-sm font-semibold border-none focus:ring-2 focus:ring-success-300" />
                                        </div>

                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Payment Mode</label>
                                             <select value={formData.paymentMode} onChange={e => setFormData({...formData, paymentMode: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-lg px-4 text-sm font-semibold border-none focus:ring-2 focus:ring-success-300">
                                                  <option value="Cash">Cash</option>
                                                  <option value="Card">Card</option>
                                                  <option value="Online">Online Transfer</option>
                                                  <option value="Cheque">Cheque</option>
                                             </select>
                                        </div>

                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Amount Paid ($)</label>
                                             <input type="number" required value={formData.amountPaid} onChange={e => setFormData({...formData, amountPaid: parseFloat(e.target.value) || 0})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-lg px-4 text-sm font-bold border-none focus:ring-2 focus:ring-success-300" />
                                        </div>

                                        <div>
                                             <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">Note (Optional)</label>
                                             <textarea rows={2} value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-lg p-4 text-sm font-medium border-none focus:ring-2 focus:ring-success-300 resize-none"></textarea>
                                        </div>

                                        <button disabled={isSubmitting} type="submit" className="w-full h-12 bg-success-300 text-white font-bold rounded-lg hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 disabled:opacity-50">
                                             {isSubmitting ? "Processing..." : "Process Payment"}
                                        </button>
                                   </form>

                                   {/* Right Side: Payment History */}
                                   <div className="p-6 lg:w-1/2 bg-bgray-50/50 dark:bg-darkblack-600 overflow-y-auto">
                                        <h4 className="text-sm font-bold text-bgray-900 dark:text-white mb-4 uppercase tracking-widest text-success-300">Payment History</h4>
                                        
                                        <div className="space-y-3">
                                             {payments.length > 0 ? (
                                                  payments.map((p) => (
                                                       <div key={p._id} className="bg-white dark:bg-darkblack-500 rounded-xl p-4 shadow-sm border border-bgray-100 dark:border-darkblack-400">
                                                            <div className="flex justify-between items-start mb-2">
                                                                 <div>
                                                                      <span className="text-xs font-bold bg-success-50 text-success-300 px-2 py-1 rounded-md">{p.month}</span>
                                                                      <h5 className="font-black text-lg dark:text-white mt-2">${p.amountPaid}</h5>
                                                                 </div>
                                                                 <div className="text-right">
                                                                      <p className="text-xs font-medium text-bgray-400">{new Date(p.paymentDate).toLocaleDateString()}</p>
                                                                      <p className="text-xs font-bold text-bgray-600 dark:text-bgray-200 mt-1">{p.paymentMode}</p>
                                                                 </div>
                                                            </div>
                                                            {p.note && <p className="text-xs text-bgray-500 italic border-t border-bgray-100 dark:border-darkblack-400 pt-2 mt-2">{p.note}</p>}
                                                       </div>
                                                  ))
                                             ) : (
                                                  <div className="text-center py-10 opacity-50">
                                                       <p className="text-sm font-medium text-bgray-500">No transport payment history found.</p>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}
