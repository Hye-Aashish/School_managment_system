"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function SearchPayments() {
     const [payments, setPayments] = useState<any[]>([]);
     const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [paymentSearch, setPaymentSearch] = useState("");
     const [studentSearch, setStudentSearch] = useState("");

     const [openFilter, setOpenFilter] = useState<any>(null);
     const [selectedPayment, setSelectedPayment] = useState<any>(null);
     const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

     const toggleFilter = (type: any) => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const fetchPayments = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/fees-payment");
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

     const handleSearch = () => {
          let filtered = [...payments];
          
          if (paymentSearch) {
               filtered = filtered.filter(p => {
                    const formattedId = "12" + p._id.slice(-4) + "/1";
                    return formattedId.toLowerCase().includes(paymentSearch.toLowerCase()) || 
                           p._id.toLowerCase().includes(paymentSearch.toLowerCase());
               });
          }

          if (studentSearch) {
               filtered = filtered.filter(p => {
                    const studentName = `${p.student?.fname || ""} ${p.student?.lname || ""}`.toLowerCase();
                    return studentName.includes(studentSearch.toLowerCase());
               });
          }

          setFilteredPayments(filtered);
     };

     // Auto-filter for student search while typing
     useEffect(() => {
          handleSearch();
     }, [studentSearch, payments]);

     const handleExport = (type: "Copy" | "Excel" | "CSV" | "PDF" | "Print") => {
          const exportData = filteredPayments.map(p => ({
               "Payment ID": "12" + p._id.slice(-4) + "/1",
               "Date": p.date,
               "Student": `${p.student?.fname} ${p.student?.lname}`,
               "Class": `${p.student?.class}(${p.student?.section})`,
               "Fees Group": p.fee_master?.fee_group?.name || "N/A",
               "Type": p.fee_master?.fee_type?.name || "N/A",
               "Mode": p.payment_mode || "Online",
               "Amount": p.amount_paid,
               "Status": p.status || "Success"
          }));

          if (type === "Copy") {
               const header = Object.keys(exportData[0]).join("\t");
               const rows = exportData.map(row => Object.values(row).join("\t")).join("\n");
               navigator.clipboard.writeText(`${header}\n${rows}`);
               alert("Data copied to clipboard!");
          } else if (type === "Excel") {
               const ws = XLSX.utils.json_to_sheet(exportData);
               const wb = XLSX.utils.book_new();
               XLSX.utils.book_append_sheet(wb, ws, "Payments");
               XLSX.writeFile(wb, "Payments_Export.xlsx");
          } else if (type === "CSV") {
               const ws = XLSX.utils.json_to_sheet(exportData);
               const csv = XLSX.utils.sheet_to_csv(ws);
               const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
               const link = document.createElement("a");
               link.href = URL.createObjectURL(blob);
               link.setAttribute("download", "Payments_Export.csv");
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
          } else if (type === "PDF") {
               const doc = new jsPDF();
               autoTable(doc, {
                    head: [Object.keys(exportData[0])],
                    body: exportData.map(row => Object.values(row)),
               });
               doc.save("Payments_Export.pdf");
          } else if (type === "Print") {
               window.print();
          }
          setOpenFilter(null);
     };


     const handleRefund = async (paymentId: string) => {
          if (!window.confirm("Are you sure you want to refund this payment?")) return;

          try {
               const res = await fetch("/api/fees-payment", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: paymentId, status: "Refunded" })
               });

               if (res.ok) {
                    alert("Payment refunded successfully!");
                    fetchPayments();
               } else {
                    alert("Failed to refund payment.");
               }
          } catch (err) {
               console.error("Refund error:", err);
               alert("An error occurred.");
          }
     };

     const handleDownloadReceipt = (payment: any) => {
          setSelectedPayment(payment);
          setTimeout(() => {
               window.print();
          }, 500);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12 no-print">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 w-full">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 mb-3 font-inter">
                              <h4 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">Search Fees Payment</h4>
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
                                                            value={paymentSearch}
                                                            onChange={(e) => setPaymentSearch(e.target.value)}
                                                            placeholder="Enter Payment ID"
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>
                                        <button 
                                             onClick={handleSearch}
                                             className="h-full px-8 flex items-center justify-center text-white font-bold bg-[#13c2c2] hover:bg-cyan-600 transition-all rounded-lg"
                                        >
                                             Search
                                        </button>
                                   </div>
                              </div>
                         </div>
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 font-inter">
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
                                                            value={studentSearch}
                                                            onChange={(e) => setStudentSearch(e.target.value)}
                                                            placeholder="Search Students..."
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300"
                                                  onClick={() => toggleFilter("export")}
                                             >
                                                  <span className="text-sm font-medium text-bgray-600 dark:text-gray-300">Export</span>
                                                  <span>
                                                       <svg
                                                            width="12"
                                                            height="12"
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
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Payment ID</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Date</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Name</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Class</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider text-nowrap">Fees Group</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Type</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Mode</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Paid</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider text-nowrap">Disc./Fine</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Status</td>
                                                       <td className="py-4 px-4 text-xs uppercase tracking-wider">Action</td>
                                                  </tr>
                                             </thead>

                                             <tbody className="divide-y divide-gray-100 dark:divide-darkblack-500">
                                                  {loading ? (
                                                       <tr>
                                                            <td colSpan={11} className="py-10 text-center text-bgray-500 font-medium">Loading payments...</td>
                                                       </tr>
                                                  ) : filteredPayments.length === 0 ? (
                                                       <tr>
                                                            <td colSpan={11} className="py-10 text-center text-bgray-500 font-medium">No payments found.</td>
                                                       </tr>
                                                  ) : (
                                                       filteredPayments.map((p, index) => (
                                                            <tr key={p._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-gray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                                 <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{"12" + p._id.slice(-4) + "/1"}</td>
                                                                 <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{p.date}</td>
                                                                 <td className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                                                                      {p.student?.fname} {p.student?.lname}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400 text-nowrap">
                                                                      {p.student?.class}({p.student?.section})
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                                      {p.fee_master?.fee_group?.name || "N/A"}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                                      {p.fee_master?.fee_type?.name || "N/A"}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm">
                                                                      <span className="px-3 py-1 text-[10px] font-bold text-white rounded bg-[#2f54eb] uppercase tracking-wider">
                                                                           {p.payment_mode || "Online"}
                                                                      </span>
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                                                                      ${(p.amount_paid || 0).toFixed(2)}
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400 text-nowrap">
                                                                      <span className="text-green-500">-${(p.discount_amount || 0).toFixed(2)}</span>
                                                                      <br />
                                                                      <span className="text-red-500">+${(p.fine_amount || 0).toFixed(2)}</span>
                                                                 </td>
                                                                 <td className="py-4 px-4 text-sm">
                                                                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${p.status === "Refunded" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                                                           {p.status || "Success"}
                                                                      </span>
                                                                 </td>
                                                                 <td className="py-4 px-4">
                                                                      <div className="relative">
                                                                           <button 
                                                                                onClick={() => setOpenFilter(openFilter === `action-${index}` ? null : `action-${index}`)}
                                                                                className="text-bgray-500 text-xl hover:text-bgray-900 dark:hover:text-white"
                                                                           >
                                                                                ⋮
                                                                           </button>
                                                                           {openFilter === `action-${index}` && (
                                                                                <div className="absolute right-0 top-8 bg-white dark:bg-darkblack-500 shadow-xl rounded-lg min-w-[150px] transition-all z-20 border border-gray-100 dark:border-darkblack-400 overflow-hidden">
                                                                                     <ul className="py-1">
                                                                                          <li 
                                                                                               onClick={() => { setSelectedPayment(p); setIsReceiptModalOpen(true); setOpenFilter(null); }}
                                                                                               className="px-4 py-2.5 text-sm text-bgray-700 dark:text-gray-200 hover:bg-bgray-50 dark:hover:bg-darkblack-600 cursor-pointer flex items-center gap-2"
                                                                                          >
                                                                                               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                                                               View Receipt
                                                                                          </li>
                                                                                          <li 
                                                                                               onClick={() => { handleDownloadReceipt(p); setOpenFilter(null); }}
                                                                                               className="px-4 py-2.5 text-sm text-bgray-700 dark:text-gray-200 hover:bg-bgray-50 dark:hover:bg-darkblack-600 cursor-pointer flex items-center gap-2"
                                                                                          >
                                                                                               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                                                                               Download
                                                                                          </li>
                                                                                          {p.status !== "Refunded" && (
                                                                                               <li 
                                                                                                    onClick={() => { handleRefund(p._id); setOpenFilter(null); }}
                                                                                                    className="px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer flex items-center gap-2"
                                                                                               >
                                                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 15h2m-2-5h2m-2-5h2m-5 15h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                                                                                    Refund
                                                                                               </li>
                                                                                          )}
                                                                                     </ul>
                                                                                </div>
                                                                           )}
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>
                                   <div className="pagination-content w-full no-print">
                                        <div
                                             className="w-full flex lg:justify-between justify-center items-center"
                                        >
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold"
                                                  >Show result:</span
                                                  >
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-3.5 border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50"
                                                            >6</span
                                                            >
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
                                                            id="result-filter"
                                                            className={`rounded-lg w-full shadow-lg bg-white absolute right-0 z-10 top-14 overflow-hidden hidden ${openFilter === "pagination" ? "block" : "hidden"
                                                                 }`}
                                                       >
                                                            <ul>
                                                                 <li className="text-sm font-medium text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100">6</li>
                                                                 <li className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100">12</li>
                                                                 <li className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100">20</li>
                                                            </ul>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div
                                                  className="flex sm:space-x-[35px] space-x-5 items-center"
                                             >
                                                  <button type="button">
                                                       <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div className="flex items-center">
                                                       <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-bgray-50">1</button>
                                                       <button type="button" className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500">2</button>
                                                       <span className="text-bgray-500 text-sm">. . . .</span>
                                                       <button type="button" className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500">20</button>
                                                  </div>
                                                  <button type="button">
                                                       <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>

               {/* Receipt Modal */}
               {isReceiptModalOpen && selectedPayment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-inter no-print">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
                              <div className="bg-[#4f46e5] px-8 py-6 flex justify-between items-center text-white">
                                   <div>
                                        <h3 className="text-2xl font-bold">Payment Receipt</h3>
                                        <p className="text-indigo-100 text-sm mt-1">Payment ID: {"12" + selectedPayment._id.slice(-4) + "/1"}</p>
                                   </div>
                                   <button onClick={() => setIsReceiptModalOpen(false)} className="hover:rotate-90 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                             <line x1="18" y1="6" x2="6" y2="18"/>
                                             <line x1="6" y1="6" x2="18" y2="18"/>
                                        </svg>
                                   </button>
                              </div>

                              <div className="p-8 space-y-8" id="printable-receipt">
                                   <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Student Details</p>
                                             <h4 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPayment.student?.fname} {selectedPayment.student?.lname}</h4>
                                             <p className="text-sm text-gray-600 dark:text-gray-400">Class: {selectedPayment.student?.class} ({selectedPayment.student?.section})</p>
                                             <p className="text-sm text-gray-600 dark:text-gray-400">Adm No: {selectedPayment.student?.admission_no || "N/A"}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Info</p>
                                             <p className="text-sm font-semibold text-gray-900 dark:text-white">Date: {selectedPayment.date}</p>
                                             <p className="text-sm font-semibold text-gray-900 dark:text-white">Mode: {selectedPayment.payment_mode}</p>
                                             <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase mt-2 ${selectedPayment.status === "Refunded" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                                  {selectedPayment.status || "Success"}
                                             </span>
                                        </div>
                                   </div>

                                   <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-6">
                                        <div className="space-y-4">
                                             <div className="flex justify-between text-sm">
                                                  <span className="text-gray-600 dark:text-gray-400">{selectedPayment.fee_master?.fee_group?.name} - {selectedPayment.fee_master?.fee_type?.name}</span>
                                                  <span className="font-bold text-gray-900 dark:text-white">${selectedPayment.amount_paid?.toFixed(2)}</span>
                                             </div>
                                             {selectedPayment.discount_amount > 0 && (
                                                  <div className="flex justify-between text-sm text-green-600 italic">
                                                       <span>Discount Applied</span>
                                                       <span>-${selectedPayment.discount_amount?.toFixed(2)}</span>
                                                  </div>
                                             )}
                                             {selectedPayment.fine_amount > 0 && (
                                                  <div className="flex justify-between text-sm text-red-500 italic">
                                                       <span>Fine/Late Charges</span>
                                                       <span>+${selectedPayment.fine_amount?.toFixed(2)}</span>
                                                  </div>
                                             )}
                                        </div>
                                   </div>

                                   <div className="bg-gray-50 dark:bg-darkblack-500 rounded-xl p-6 flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-700 dark:text-gray-300">Total Amount Paid</span>
                                        <span className="text-3xl font-black text-[#4f46e5]">${selectedPayment.amount_paid?.toFixed(2)}</span>
                                   </div>

                                   {selectedPayment.note && (
                                        <div className="italic text-xs text-gray-500 border-l-2 border-indigo-200 pl-4 py-1">
                                             Note: {selectedPayment.note}
                                        </div>
                                   )}
                              </div>

                              <div className="px-8 py-6 bg-gray-50 dark:bg-darkblack-500 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4">
                                   <button 
                                        onClick={() => setIsReceiptModalOpen(false)}
                                        className="px-6 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                                   >
                                        Close
                                   </button>
                                   <button 
                                        onClick={() => handleDownloadReceipt(selectedPayment)}
                                        className="bg-[#4f46e5] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                                   >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                                        Print Receipt
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {/* Hidden Print area */}
               <style jsx global>{`
                    @media print {
                         .no-print { display: none !important; }
                         body { background: white !important; padding: 0 !important; margin: 0 !important; }
                         #printable-receipt { display: block !important; padding: 40px !important; }
                         .fixed { position: relative !important; }
                         .shadow-2xl { shadow: none !important; }
                    }
               `}</style>

               {/* Add simple print view if downloading */}
               {selectedPayment && (
                    <div className="hidden print:block font-inter text-black bg-white min-h-screen p-10" id="print-only">
                         <div className="border-b-2 border-indigo-600 pb-10 mb-10">
                              <h1 className="text-3xl font-black uppercase tracking-tighter">Receipt</h1>
                              <p className="text-gray-500 mt-2">Payment ID: {"12" + selectedPayment._id.slice(-4) + "/1"}</p>
                         </div>
                         <div className="grid grid-cols-2 gap-20 mb-10">
                              <div>
                                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Student Information</p>
                                   <p className="text-xl font-bold">{selectedPayment.student?.fname} {selectedPayment.student?.lname}</p>
                                   <p className="text-gray-600">Class: {selectedPayment.student?.class} ({selectedPayment.student?.section})</p>
                                   <p className="text-gray-600">Adm No: {selectedPayment.student?.admission_no || "N/A"}</p>
                              </div>
                              <div>
                                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Transaction Details</p>
                                   <p className="font-bold">Date: {selectedPayment.date}</p>
                                   <p className="font-bold">Mode: {selectedPayment.payment_mode}</p>
                              </div>
                         </div>
                         <div className="border-y border-gray-200 py-10 mb-10 space-y-4">
                              <div className="flex justify-between items-center text-lg">
                                   <span>{selectedPayment.fee_master?.fee_group?.name}</span>
                                   <span className="font-bold">${selectedPayment.amount_paid?.toFixed(2)}</span>
                              </div>
                              {selectedPayment.discount_amount > 0 && (
                                   <div className="flex justify-between text-sm text-green-600 italic">
                                        <span>Discount</span>
                                        <span>-${selectedPayment.discount_amount?.toFixed(2)}</span>
                                   </div>
                              )}
                         </div>
                         <div className="flex justify-end pr-10">
                              <div className="text-right">
                                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid Amount</p>
                                   <p className="text-5xl font-black border-t-4 border-indigo-600 pt-4">${selectedPayment.amount_paid?.toFixed(2)}</p>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}
