"use client";
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function StudenAdmission() {
     const [admissions, setAdmissions] = useState<any[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage] = useState(10);
     const tableRef = useRef<HTMLTableElement>(null);

     const filteredAdmissions = admissions.filter((admission) => {
          const searchLower = searchTerm.toLowerCase();
          const fullName = `${admission.first_name || ""} ${admission.last_name || ""}`.toLowerCase();
          return (
               fullName.includes(searchLower) ||
               (admission.reference_no && admission.reference_no.toLowerCase().includes(searchLower)) ||
               (admission.mobile_no && admission.mobile_no.includes(searchLower))
          );
     });

     // Pagination Logic
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentAdmissions = filteredAdmissions.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);

     const handlePageChange = (pageNumber: number) => {
          setCurrentPage(pageNumber);
     };

     // Export Functions
     const handleCopy = () => {
          if (filteredAdmissions.length === 0) return alert("No data to copy");
          const headers = ["Reference No", "Student Name", "Class", "Father Name", "Date Of Birth", "Gender", "Category", "Mobile Number", "Form Status", "Payment Status", "Enrolled", "Admission Date"];
          const rows = filteredAdmissions.map(adm => [
               adm.reference_no || "",
               `${adm.first_name || ""} ${adm.last_name || ""}`.trim(),
               `${adm.class || ""}(${adm.section || ""})`,
               adm.father_name || "",
               adm.dob || "",
               adm.gender || "",
               adm.category || "",
               adm.mobile_no || "",
               adm.status || "Submitted",
               adm.payment_status || "Paid",
               "Yes",
               adm.admission_date || "N/A"
          ]);
          const csvContent = [headers.join("\t"), ...rows.map(row => row.join("\t"))].join("\n");
          navigator.clipboard.writeText(csvContent);
          alert("Data copied to clipboard!");
          setOpenFilter(null);
     };

     const handleExcel = () => {
          if (filteredAdmissions.length === 0) return alert("No data to export");
          const exportData = filteredAdmissions.map(adm => ({
               "Reference No": adm.reference_no,
               "Student Name": `${adm.first_name || ""} ${adm.last_name || ""}`.trim(),
               "Class": `${adm.class || ""}(${adm.section || ""})`,
               "Father Name": adm.father_name,
               "Date Of Birth": adm.dob,
               "Gender": adm.gender,
               "Category": adm.category,
               "Mobile Number": adm.mobile_no,
               "Form Status": adm.status || "Submitted",
               "Payment Status": adm.payment_status || "Paid",
               "Enrolled": "Yes",
               "Admission Date": adm.admission_date || "N/A"
          }));
          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
          XLSX.writeFile(workbook, "online_admissions.xlsx");
          setOpenFilter(null);
     };

     const handleCSV = () => {
          if (filteredAdmissions.length === 0) return alert("No data to export");
          const exportData = filteredAdmissions.map(adm => ({
               "Reference No": adm.reference_no,
               "Student Name": `${adm.first_name || ""} ${adm.last_name || ""}`.trim(),
               "Class": `${adm.class || ""}(${adm.section || ""})`,
               "Father Name": adm.father_name,
               "Date Of Birth": adm.dob,
               "Gender": adm.gender,
               "Category": adm.category,
               "Mobile Number": adm.mobile_no,
               "Form Status": adm.status || "Submitted",
               "Payment Status": adm.payment_status || "Paid",
               "Enrolled": "Yes",
               "Admission Date": adm.admission_date || "N/A"
          }));
          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
          XLSX.writeFile(workbook, "online_admissions.csv");
          setOpenFilter(null);
     };

     const handlePDF = () => {
          if (filteredAdmissions.length === 0) return alert("No data to export");
          const doc = new jsPDF('landscape');
          doc.text("Online Admissions Report", 14, 15);
          
          const headers = [["Ref No", "Name", "Class", "Father", "DOB", "Gender", "Category", "Mobile", "Form Status", "Pay Status", "Date"]];
          const data = filteredAdmissions.map(adm => [
               adm.reference_no || "",
               `${adm.first_name || ""} ${adm.last_name || ""}`.trim(),
               `${adm.class || ""}(${adm.section || ""})`,
               adm.father_name || "",
               adm.dob || "",
               adm.gender || "",
               adm.category || "",
               adm.mobile_no || "",
               adm.status || "Submitted",
               adm.payment_status || "Paid",
               adm.admission_date || "N/A"
          ]);

          (doc as any).autoTable({
               head: headers,
               body: data,
               startY: 20,
               styles: { fontSize: 8 },
               headStyles: { fillColor: [41, 128, 185] }
          });
          doc.save("online_admissions.pdf");
          setOpenFilter(null);
     };

     const handlePrint = () => {
          if (!tableRef.current) return;
          const printContents = tableRef.current.outerHTML;
          const originalContents = document.body.innerHTML;
          document.body.innerHTML = `<div><h2 style="text-align:center;">Online Admissions</h2>${printContents}</div>`;
          window.print();
          document.body.innerHTML = originalContents;
          window.location.reload(); // Reload to restore React bindings after replacing innerHTML
     };


     useEffect(() => {
          fetchAdmissions();
     }, []);

     const fetchAdmissions = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/online-admission");
               const data = await res.json();
               setAdmissions(data);
          } catch (error) {
               console.error("Error fetching admissions:", error);
          } finally {
               setIsLoading(false);
          }
     };

     const handleDelete = async (refNo: string) => {
          if (confirm("Are you sure you want to delete this admission record?")) {
               try {
                    await fetch(`/api/online-admission/${refNo}`, { method: "DELETE" });
                    fetchAdmissions();
               } catch (error) {
                    console.error("Error deleting admission:", error);
               }
          }
     };

     const toggleFilter = (type: string) => {
          setOpenFilter(openFilter === type ? null : type);
     };
     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 w-full">
                         <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
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
                                                            id="listSearch"
                                                            placeholder="Search Students... (Name, Ref No, Mobile)"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-foreground tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500"
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"
                                                       }`}
                                             >
                                                   <ul>
                                                        <li onClick={handleCopy} className="text-sm text-foreground cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Copy</li>
                                                        <li onClick={handleExcel} className="text-sm text-foreground cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                                                        <li onClick={handleCSV} className="text-sm text-foreground cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
                                                        <li onClick={handlePDF} className="text-sm text-foreground cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">PDF</li>
                                                        <li onClick={handlePrint} className="text-sm text-foreground cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print</li>
                                                   </ul>
                                             </div>
                                        </div>
                                   </div>
                                    <div className="table-content w-full min-h-[52vh] overflow-auto">
                                         <table className="w-full" ref={tableRef}>
                                              <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400 text-foreground font-semibold">
                                                       <td className="py-5 px-6 text-nowrap">Reference No</td>
                                                       <td className="py-5 px-6 text-nowrap">Student Name</td>
                                                       <td className="py-5 px-6 text-nowrap">Class</td>
                                                       <td className="py-5 px-6 text-nowrap">Father Name</td>
                                                       <td className="py-5 px-6 text-nowrap">Date Of Birth</td>
                                                       <td className="py-5 px-6 text-nowrap">Gender</td>
                                                       <td className="py-5 px-6 text-nowrap">Category</td>
                                                       <td className="py-5 px-6 text-nowrap">Student Mobile Number</td>
                                                       <td className="py-5 px-6 text-nowrap">Form Status</td>
                                                       <td className="py-5 px-6 text-nowrap">Payment Status</td>
                                                       <td className="py-5 px-6 text-nowrap">Enrolled</td>
                                                       <td className="py-5 px-6 text-nowrap">Created At</td>
                                                       <td className="py-5 px-6 text-nowrap">Action</td>
                                                  </tr>
                                             </thead>

                                             <tbody>
                                                  {isLoading ? (
                                                       <tr>
                                                            <td colSpan={13} className="text-center py-10 text-foreground">Loading...</td>
                                                       </tr>
                                                  ) : currentAdmissions.length === 0 ? (
                                                       <tr>
                                                            <td colSpan={13} className="text-center py-10 text-foreground">No online admissions found</td>
                                                       </tr>
                                                  ) : currentAdmissions.map((admission) => (
                                                       <tr key={admission.reference_no} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 hover:dark:bg-darkblack-500 text-foreground transition-colors">
                                                            <td className="py-5 px-6">{admission.reference_no}</td>
                                                            <td className="py-5 px-6">{admission.first_name} {admission.last_name}</td>
                                                            <td className="py-5 px-6 text-nowrap">{admission.class}({admission.section})</td>
                                                            <td className="py-5 px-6">{admission.father_name}</td>
                                                            <td className="py-5 px-6">{admission.dob}</td>
                                                            <td className="py-5 px-6">{admission.gender}</td>
                                                            <td className="py-5 px-6">{admission.category}</td>
                                                            <td className="py-5 px-6">{admission.mobile_no}</td>
                                                            <td className="py-5 px-6">
                                                                 <span className="px-3 text-nowrap py-1 text-white text-sm rounded bg-success-300">
                                                                      {admission.status || "Submitted"}
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                 <span className="px-3 py-1 text-white text-sm rounded bg-success-300">
                                                                      {admission.payment_status || "Paid"}
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                 <span className="text-green-600 text-xl">✔</span>
                                                            </td>
                                                            <td className="py-5 px-6">{admission.admission_date || "N/A"}</td>
                                                            <td className="py-5 px-6">
                                                                 <div className="relative">
                                                                      <button
                                                                           onClick={() => toggleFilter(`action-${admission.reference_no}`)}
                                                                      >
                                                                           ⋮
                                                                      </button>
                                                                      <div
                                                                           className={`absolute right-0 top-8 bg-white dark:bg-darkblack-500 shadow-lg rounded-lg min-w-[150px] z-10 transition-all ${openFilter === `action-${admission.reference_no}` ? "block" : "hidden"
                                                                                }`}
                                                                      >
                                                                           <ul>
                                                                                <li className="px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer font-semibold text-left">View</li>
                                                                                <li className="px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer font-semibold text-left">Edit</li>
                                                                                <li
                                                                                     onClick={() => handleDelete(admission.reference_no)}
                                                                                     className="px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600 cursor-pointer font-semibold text-left text-red-500"
                                                                                >
                                                                                     Delete
                                                                                </li>
                                                                           </ul>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                                   <div className="pagination-content w-full">
                                        <div
                                             className="w-full flex lg:justify-between justify-center items-center"
                                        >
                                             <div className="lg:flex hidden space-x-4 items-center">
                                                  <span className="text-foreground text-sm font-semibold"
                                                  >Show result:</span
                                                  >
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="px-2.5 py-3.5 border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                                                            onClick={() => toggleFilter("pagination")}
                                                       >
                                                            <span className="text-sm font-semibold text-foreground"
                                                            >{itemsPerPage}</span
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
                                                                  {[10, 20, 50].map((num) => (
                                                                       <li
                                                                            key={num}
                                                                            onClick={() => { setItemsPerPage(num); setCurrentPage(1); setOpenFilter(null); }}
                                                                            className="text-sm font-medium text-foreground cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:hover:bg-darkblack-600"
                                                                       >
                                                                            {num}
                                                                       </li>
                                                                  ))}
                                                             </ul>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div
                                                   className="flex sm:space-x-[35px] space-x-5 items-center"
                                              >
                                                   <button 
                                                        type="button" 
                                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                                        disabled={currentPage === 1}
                                                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                                   >
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
                                                   <div className="flex items-center space-x-2">
                                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                             <button
                                                                  key={page}
                                                                  type="button"
                                                                  onClick={() => handlePageChange(page)}
                                                                  className={`rounded-lg lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 transition duration-300 ease-in-out ${
                                                                       currentPage === page 
                                                                       ? "text-success-300 bg-success-50 dark:bg-darkblack-500" 
                                                                       : "text-foreground hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500"
                                                                  }`}
                                                             >
                                                                  {page}
                                                             </button>
                                                        ))}
                                                   </div>
                                                   <button 
                                                        type="button"
                                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                                        disabled={currentPage === totalPages || totalPages === 0}
                                                        className={(currentPage === totalPages || totalPages === 0) ? "opacity-50 cursor-not-allowed" : ""}
                                                   >
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
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}
