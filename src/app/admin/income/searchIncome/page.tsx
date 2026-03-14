"use client";
import React, { useState, useEffect } from "react";

interface IncomeHead {
     _id: string;
     name: string;
}

interface Income {
     _id: string;
     incomeHead: IncomeHead | string;
     name: string;
     invoiceNumber?: string;
     date: string;
     amount: number;
     description?: string;
}

export default function StudentCategory() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "income_head" | "search_type" | null>(null);
     const [incomes, setIncomes] = useState<Income[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [searchType, setSearchType] = useState<"By Name" | "By Invoice" | "By Date" | "By Income Head">("By Name");

     const fetchIncomes = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/incomes");
               const json = await res.json();
               if (json.success) setIncomes(json.data);
          } catch (error) {
               console.error("Error fetching incomes:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchIncomes();
     }, []);

     const toggleFilter = (type: "action" | "pagination" | "income_head" | "search_type") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const filteredIncomes = incomes.filter(income => {
          const term = searchTerm.toLowerCase();
          if (!term) return true;

          switch (searchType) {
               case "By Name":
                    return income.name.toLowerCase().includes(term);
               case "By Invoice":
                    return income.invoiceNumber?.toLowerCase().includes(term);
               case "By Date":
                    return new Date(income.date).toLocaleDateString().includes(term);
               case "By Income Head":
                    return typeof income.incomeHead === "object" && income.incomeHead.name.toLowerCase().includes(term);
               default:
                    return true;
          }
     });

     // Export Functions
     const handleCopy = () => {
          const headers = ["Name", "Invoice Number", "Income Head", "Date", "Amount"];
          const data = filteredIncomes.map(income => [
               income.name,
               income.invoiceNumber || "",
               typeof income.incomeHead === "object" ? income.incomeHead.name : "",
               new Date(income.date).toLocaleDateString(),
               `$${income.amount.toFixed(2)}`
          ].join("\t"));

          const textToCopy = [headers.join("\t"), ...data].join("\n");
          navigator.clipboard.writeText(textToCopy).then(() => {
               alert("Data copied to clipboard!");
          });
     };

     const handleExcel = () => {
          const headers = ["Name", "Invoice Number", "Income Head", "Date", "Amount"];
          const data = filteredIncomes.map(income => [
               `"${income.name}"`,
               `"${income.invoiceNumber || ""}"`,
               `"${typeof income.incomeHead === "object" ? income.incomeHead.name : ""}"`,
               `"${new Date(income.date).toLocaleDateString()}"`,
               `"${income.amount.toFixed(2)}"`
          ].join(","));

          const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "search_income_list.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
     };

     const handlePrint = () => {
          const printContent = `
               <html>
                    <head>
                         <title>Search Income List</title>
                         <style>
                              body { font-family: Arial, sans-serif; padding: 20px; }
                              h2 { text-align: center; }
                              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                              th { background-color: #f2f2f2; }
                         </style>
                    </head>
                    <body>
                         <h2>Search Income List</h2>
                         <table>
                              <thead>
                                   <tr>
                                        <th>Name</th>
                                        <th>Invoice Number</th>
                                        <th>Income Head</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   ${filteredIncomes.map(income => `
                                        <tr>
                                             <td>${income.name}</td>
                                             <td>${income.invoiceNumber || ""}</td>
                                             <td>${typeof income.incomeHead === "object" ? income.incomeHead.name : ""}</td>
                                             <td>${new Date(income.date).toLocaleDateString()}</td>
                                             <td>$${income.amount.toFixed(2)}</td>
                                        </tr>
                                   `).join("")}
                              </tbody>
                         </table>
                    </body>
               </html>
          `;

          const printWindow = window.open("", "_blank");
          if (printWindow) {
               printWindow.document.write(printContent);
               printWindow.document.close();
               printWindow.focus();
               setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
               }, 250);
          }
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Search and Filter Bar */}
                                   <div className="w-full flex h-14 space-x-4 flex-wrap gap-4">
                                        <div className="flex-1 min-w-[200px] sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                            placeholder="Search Income..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                        {/* Search Type */}
                                        <div className="relative w-100">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[150px]"
                                                  onClick={() => toggleFilter("search_type")}
                                             >
                                                  <span className="text-base text-bgray-500 text-nowrap">{searchType}</span>
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "search_type" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       {["By Name", "By Invoice", "By Date", "By Income Head"].map((type) => (
                                                            <li
                                                                 key={type}
                                                                 onClick={() => {
                                                                      setSearchType(type as any);
                                                                      setOpenFilter(null);
                                                                 }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {type}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>

                                        {/* Export */}
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center relative dark:bg-darkblack-500 min-w-[120px]"
                                                  onClick={() => toggleFilter("action")}
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
                                                  className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "action" ? "block" : "hidden"
                                                       }`}
                                             >
                                                  <ul>
                                                       <li onClick={() => { handleCopy(); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Copy</li>
                                                       <li onClick={() => { handleExcel(); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel/CSV</li>
                                                       <li onClick={() => { handlePrint(); setOpenFilter(null); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print/PDF</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Name</span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Invoice Number</span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-gray-50">Income Head</span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Date</span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Amount ($)</span>
                                                                 <span>
                                                                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                           <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                      </svg>
                                                                 </span>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {isLoading ? (
                                                       <tr><td colSpan={5} className="py-10 text-center text-bgray-500 text-sm">Loading...</td></tr>
                                                  ) : filteredIncomes.length === 0 ? (
                                                       <tr><td colSpan={5} className="py-10 text-center text-bgray-500 text-sm">No records found</td></tr>
                                                  ) : filteredIncomes.map((income) => (
                                                       <tr key={income._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{income.name}</p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{income.invoiceNumber}</p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {typeof income.incomeHead === "object" ? income.incomeHead.name : ""}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                      {new Date(income.date).toLocaleDateString()}
                                                                 </p>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">${income.amount.toFixed(2)}</p>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>

                                   {/* Total Records - Simplified */}
                                   <div className="pagination-content w-full border-t border-bgray-300 dark:border-darkblack-400 pt-4">
                                        <div className="w-full flex justify-between items-center text-sm text-bgray-600 dark:text-bgray-50 font-semibold">
                                             <span>Total Records: {filteredIncomes.length}</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}