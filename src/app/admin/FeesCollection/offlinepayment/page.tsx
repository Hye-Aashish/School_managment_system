"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OfflinePayment() {
     const [payments, setPayments] = useState<any[]>([]);
     const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

     const toggleFilter = (type: string) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const fetchPayments = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/offline-payment");
               const data = await res.json();
               if (res.ok) {
                    setPayments(data);
                    setFilteredPayments(data);
               }
          } catch (err) {
               console.error("Failed to fetch payments", err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchPayments();
     }, []);

     useEffect(() => {
          const filtered = payments.filter(p => {
               const studentName = `${p.student?.fname || ""} ${p.student?.lname || ""}`.toLowerCase();
               const admissionNo = (p.student?.admission_no || "").toLowerCase();
               const searchLower = searchTerm.toLowerCase();
               return studentName.includes(searchLower) || admissionNo.includes(searchLower);
          });
          setFilteredPayments(filtered);
     }, [searchTerm, payments]);

     const handleStatusUpdate = async (id: string, status: "Approved" | "Rejected") => {
          if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this payment?`)) return;

          try {
               const res = await fetch("/api/offline-payment", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, status })
               });

               if (res.ok) {
                    alert(`Payment ${status.toLowerCase()} successfully!`);
                    setSelectedPayment(null);
                    fetchPayments();
               } else {
                    alert("Failed to update status.");
               }
          } catch (err) {
               console.error("Status update error:", err);
               alert("An error occurred.");
          }
          setOpenFilter(null);
     };

     const handleExport = (type: "Copy" | "Excel" | "CSV" | "PDF" | "Print") => {
          const exportData = filteredPayments.map(p => ({
               "Request ID": p._id.slice(-5),
               "Admission No": p.student?.admission_no || "N/A",
               "Name": `${p.student?.fname} ${p.student?.lname}`,
               "Class": `${p.student?.class}(${p.student?.section})`,
               "Payment Date": p.payment_date,
               "Submit Date": new Date(p.submit_date).toLocaleString(),
               "Amount": p.amount,
               "Status": p.status,
               "Status Date": p.status_date ? new Date(p.status_date).toLocaleString() : "-",
               "Payment ID": p.payment_id || "-"
          }));

          if (type === "Copy") {
               const header = Object.keys(exportData[0]).join("\t");
               const rows = exportData.map(row => Object.values(row).join("\t")).join("\n");
               navigator.clipboard.writeText(`${header}\n${rows}`);
               alert("Data copied to clipboard!");
          } else if (type === "Excel") {
               const ws = XLSX.utils.json_to_sheet(exportData);
               const wb = XLSX.utils.book_new();
               XLSX.utils.book_append_sheet(wb, ws, "Offline Payments");
               XLSX.writeFile(wb, "Offline_Payments.xlsx");
          } else if (type === "CSV") {
               const ws = XLSX.utils.json_to_sheet(exportData);
               const csv = XLSX.utils.sheet_to_csv(ws);
               const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
               const link = document.createElement("a");
               link.href = URL.createObjectURL(blob);
               link.setAttribute("download", "Offline_Payments.csv");
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
          } else if (type === "PDF") {
               const doc = new jsPDF("l");
               autoTable(doc, {
                    head: [Object.keys(exportData[0])],
                    body: exportData.map(row => Object.values(row)),
               });
               doc.save("Offline_Payments.pdf");
          } else if (type === "Print") {
               window.print();
          }
          setOpenFilter(null);
     };

     const getStatusColor = (status: string) => {
          switch (status) {
               case "Approved": return "bg-success-300";
               case "Pending": return "bg-orange-500";
               case "Rejected": return "bg-pink-600";
               default: return "bg-gray-400";
          }
     };

     return (
          <>
               {selectedPayment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-darkblack-400 animate-fadeIn">
                              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-darkblack-500 bg-gray-50/50 dark:bg-darkblack-700/50">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Payment Request Detail</h3>
                                   <button 
                                        onClick={() => setSelectedPayment(null)}
                                        className="text-bgray-400 hover:text-bgray-600 dark:hover:text-white transition-colors"
                                   >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                             <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                   </button>
                              </div>
                              
                              <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div className="space-y-4">
                                             <div>
                                                  <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Student</p>
                                                  <p className="text-base font-bold text-bgray-900 dark:text-white">
                                                       {selectedPayment.student?.fname} {selectedPayment.student?.lname}
                                                  </p>
                                                  <p className="text-sm text-bgray-600 dark:text-gray-400">
                                                       ADM: {selectedPayment.student?.admission_no} | {selectedPayment.student?.class} ({selectedPayment.student?.section})
                                                  </p>
                                             </div>
                                             <div>
                                                  <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Amount</p>
                                                  <p className="text-2xl font-black text-success-300">
                                                       ${selectedPayment.amount?.toFixed(2)}
                                                  </p>
                                             </div>
                                             <div>
                                                  <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Reference No</p>
                                                  <p className="text-sm font-medium text-bgray-900 dark:text-white bg-bgray-100 dark:bg-darkblack-500 px-3 py-1.5 rounded-lg inline-block">
                                                       {selectedPayment.reference_no}
                                                  </p>
                                             </div>
                                        </div>
                                        
                                        <div className="space-y-4 text-right md:text-left">
                                             <div>
                                                  <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Payment Date</p>
                                                  <p className="text-sm font-medium text-bgray-900 dark:text-white">{selectedPayment.payment_date}</p>
                                             </div>
                                             <div>
                                                  <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Submit Date</p>
                                                  <p className="text-sm font-medium text-bgray-900 dark:text-white">
                                                       {new Date(selectedPayment.submit_date).toLocaleString()}
                                                  </p>
                                             </div>
                                             <div>
                                                  <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Status</p>
                                                  <span className={`px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white rounded-full ${getStatusColor(selectedPayment.status)}`}>
                                                       {selectedPayment.status}
                                                  </span>
                                             </div>
                                        </div>
                                   </div>

                                   {selectedPayment.slip_url && (
                                        <div className="mb-6">
                                             <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-2">Bank Slip / Document</p>
                                             <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-gray-200 dark:border-darkblack-400 bg-gray-50 dark:bg-darkblack-500 aspect-video flex items-center justify-center">
                                                  <img 
                                                       src={selectedPayment.slip_url} 
                                                       alt="Bank Slip" 
                                                       className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                  />
                                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                       <a 
                                                            href={selectedPayment.slip_url} 
                                                            target="_blank" 
                                                            className="bg-white text-bgray-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100"
                                                       >
                                                            Open Full Image
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   )}

                                   {selectedPayment.note && (
                                        <div className="mb-6 p-4 bg-bgray-50 dark:bg-darkblack-500 rounded-xl border-l-4 border-bgray-300">
                                             <p className="text-xs font-bold text-bgray-500 uppercase tracking-wider mb-1">Note</p>
                                             <p className="text-sm italic text-bgray-700 dark:text-gray-300">"{selectedPayment.note}"</p>
                                        </div>
                                   )}
                              </div>

                              <div className="px-6 py-4 bg-gray-50 dark:bg-darkblack-700/50 border-t border-gray-100 dark:border-darkblack-500 flex justify-end gap-3">
                                   <button 
                                        onClick={() => setSelectedPayment(null)}
                                        className="px-6 py-2.5 text-sm font-bold text-bgray-600 dark:text-gray-300 hover:bg-gray-200 rounded-xl transition-colors"
                                   >
                                        Close
                                   </button>
                                   {selectedPayment.status === "Pending" && (
                                        <>
                                             <button 
                                                  onClick={() => handleStatusUpdate(selectedPayment._id, "Rejected")}
                                                  className="px-6 py-2.5 bg-pink-600 text-white text-sm font-bold rounded-xl hover:bg-pink-700 shadow-lg shadow-pink-200/50 transition-all active:scale-95"
                                             >
                                                  Reject Payment
                                             </button>
                                             <button 
                                                  onClick={() => handleStatusUpdate(selectedPayment._id, "Approved")}
                                                  className="px-6 py-2.5 bg-success-300 text-white text-sm font-bold rounded-xl hover:bg-success-400 shadow-lg shadow-success-200/50 transition-all active:scale-95"
                                             >
                                                  Approve Payment
                                             </button>
                                        </>
                                   )}
                              </div>
                         </div>
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-12 no-print">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 w-full">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                              <h4 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">Offline Bank Payments</h4>
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div
                                             className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                        >
                                             <div
                                                  className="flex w-full h-full items-center space-x-[15px]"
                                             >
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
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            placeholder="Search Students / Admission No..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300 transition-colors"
                                                  onClick={() => toggleFilter("export")}
                                             >
                                                  <span className="text-sm font-medium text-bgray-600 dark:text-gray-300">Export</span>
                                                  <span>
                                                       <svg width="12" height="12" viewBox="0 0 21 21" fill="none">
                                                            <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                             </button>

                                             <div
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-14 overflow-hidden border border-gray-100 dark:border-darkblack-400 transition-all ${openFilter === "export" ? "block scale-100" : "hidden scale-95 opacity-0"
                                                       }`}
                                             >
                                                  <ul>
                                                       {["Copy", "Excel", "CSV", "PDF", "Print"].map(item => (
                                                            <li key={item} 
                                                                 onClick={() => handleExport(item as any)}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium transition-colors"
                                                            >
                                                                 {item}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full text-left">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400 font-bold text-gray-700 dark:text-gray-200">
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Request ID</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Admission No</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Name</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Class</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Payment Date</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Submit Date</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Amount ($)</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Status</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Status Date</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Payment ID</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Action</td>
                                                  </tr>
                                             </thead>

                                             <tbody className="divide-y divide-gray-100 dark:divide-darkblack-500">
                                                  {loading ? (
                                                       <tr><td colSpan={11} className="py-10 text-center text-bgray-500">Loading requests...</td></tr>
                                                  ) : filteredPayments.length === 0 ? (
                                                       <tr><td colSpan={11} className="py-10 text-center text-bgray-500">No requests found.</td></tr>
                                                  ) : (
                                                       filteredPayments.map((p) => (
                                                            <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                                 <td className="py-4 px-4 text-sm font-medium">{p._id.slice(-5)}</td>
                                                                 <td className="py-4 px-4 text-sm font-medium">{p.student?.admission_no}</td>
                                                                 <td className="py-4 px-4 text-sm font-bold text-bgray-900 dark:text-white">
                                                                      {p.student?.fname} {p.student?.lname}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm">
                                                                      {p.student?.class} ({p.student?.section})
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm">{p.payment_date}</td>
                                                                 <td className="py-4 px-4 text-sm text-gray-500">
                                                                      {new Date(p.submit_date).toLocaleDateString()}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm font-bold">${p.amount?.toFixed(2)}</td>
                                                                 <td className="py-4 px-4">
                                                                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white rounded-full ${getStatusColor(p.status)}`}>
                                                                           {p.status}
                                                                      </span>
                                                                 </td>
                                                                 <td className="py-4 px-4 text-xs text-gray-500">
                                                                      {p.status_date ? new Date(p.status_date).toLocaleString() : "-"}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm font-medium">{p.payment_id || "-"}</td>
                                                                 <td className="py-4 px-4">
                                                                      <div className="relative group">
                                                                           <button 
                                                                                onClick={() => toggleFilter(p._id)}
                                                                                className="p-2 hover:bg-gray-200 dark:hover:bg-darkblack-600 rounded-full transition-colors"
                                                                           >
                                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                                                     <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                                </svg>
                                                                           </button>
                                                                           
                                                                           <div
                                                                                className={`absolute right-0 top-10 bg-white dark:bg-darkblack-500 shadow-2xl rounded-xl min-w-[140px] z-30 border border-gray-100 dark:border-darkblack-400 overflow-hidden transition-all ${openFilter === p._id ? "block scale-100" : "hidden scale-95 opacity-0"}`}
                                                                           >
                                                                                <ul className="py-1">
                                                                                     {p.status === "Pending" && (
                                                                                          <>
                                                                                               <li 
                                                                                                    onClick={() => handleStatusUpdate(p._id, "Approved")}
                                                                                                    className="px-5 py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50 dark:hover:bg-darkblack-600 cursor-pointer flex items-center"
                                                                                               >
                                                                                                    Approve
                                                                                               </li>
                                                                                               <li 
                                                                                                    onClick={() => handleStatusUpdate(p._id, "Rejected")}
                                                                                                    className="px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-darkblack-600 cursor-pointer flex items-center"
                                                                                               >
                                                                                                    Reject
                                                                                               </li>
                                                                                          </>
                                                                                     )}
                                                                                     <li 
                                                                                          onClick={() => { setSelectedPayment(p); setOpenFilter(null); }}
                                                                                          className="px-5 py-2.5 text-sm font-medium text-bgray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkblack-600 cursor-pointer"
                                                                                     >
                                                                                          View Detail
                                                                                     </li>
                                                                                </ul>
                                                                           </div>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>

                                   <div className="pagination-content w-full flex justify-between items-center py-4 border-t border-gray-100 dark:border-darkblack-400">
                                        <div className="flex items-center space-x-2">
                                             <span className="text-sm text-bgray-600 dark:text-bgray-50 font-medium">Show result:</span>
                                             <select className="bg-bgray-100 dark:bg-darkblack-500 border-none rounded text-xs py-1">
                                                  <option>10</option>
                                                  <option>20</option>
                                                  <option>50</option>
                                             </select>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                             <button className="p-2 border border-gray-200 dark:border-darkblack-400 rounded-lg hover:bg-gray-50">
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                                                       <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                             <button className="px-3 py-1 bg-success-300 text-white rounded-lg text-sm font-bold">1</button>
                                             <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-darkblack-600 rounded-lg text-sm">2</button>
                                             <button className="p-2 border border-gray-200 dark:border-darkblack-400 rounded-lg hover:bg-gray-50">
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                       <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}
