"use client";
import React, { useState, useEffect } from "react";

interface ExpenseHead {
     _id: string;
     name: string;
}

interface Expense {
     _id: string;
     expenseHead: ExpenseHead | string;
     name: string;
     invoiceNumber?: string;
     date: string;
     amount: number;
     description?: string;
}

export default function SearchExpensePage() {
     const [openFilter, setOpenFilter] = useState<"search_type" | "expense_head" | null>(null);
     const [searchType, setSearchType] = useState("Search By Date");
     const [heads, setHeads] = useState<ExpenseHead[]>([]);
     const [expenses, setExpenses] = useState<Expense[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [hasSearched, setHasSearched] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);
     
     const [searchParams, setSearchParams] = useState({
          date: new Date().toISOString().split("T")[0],
          expenseHead: "",
          keyword: "",
     });

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     useEffect(() => {
          const fetchHeads = async () => {
               try {
                    const res = await fetch("/api/expense-heads");
                    const json = await res.json();
                    if (json.success) setHeads(json.data);
               } catch (error) {
                    console.error("Error fetching heads:", error);
               }
          };
          fetchHeads();
     }, []);

     const handleSearch = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          setHasSearched(true);
          try {
               const res = await fetch("/api/expenses");
               const json = await res.json();
               if (json.success) {
                    let filtered = json.data;
                    
                    if (searchType === "Search By Date") {
                         filtered = filtered.filter((ex: Expense) => 
                              new Date(ex.date).toISOString().split("T")[0] === searchParams.date
                         );
                    } else if (searchType === "Search By Expense Head") {
                         filtered = filtered.filter((ex: Expense) => 
                              (typeof ex.expenseHead === "object" ? ex.expenseHead._id : ex.expenseHead) === searchParams.expenseHead
                         );
                    } else if (searchType === "Search By Keyword") {
                         const keyword = searchParams.keyword.toLowerCase();
                         filtered = filtered.filter((ex: Expense) => 
                              ex.name.toLowerCase().includes(keyword) || 
                              (ex.description && ex.description.toLowerCase().includes(keyword))
                         );
                    }
                    
                    setExpenses(filtered);
               }
          } catch (error) {
               console.error("Search error:", error);
               showNotification("Failed to fetch search results", "error");
          } finally {
               setIsLoading(false);
          }
     };

     // Export Functions
     const handleCopy = () => {
          if (expenses.length === 0) return;
          const headers = ["Expense Head", "Name", "Invoice Number", "Date", "Amount"];
          const data = expenses.map(ex => [
               typeof ex.expenseHead === "object" ? ex.expenseHead.name : "",
               ex.name,
               ex.invoiceNumber || "",
               new Date(ex.date).toLocaleDateString(),
               `$${ex.amount.toFixed(2)}`
          ].join("\t"));

          const textToCopy = [headers.join("\t"), ...data].join("\n");
          navigator.clipboard.writeText(textToCopy).then(() => {
               showNotification("Data copied to clipboard!", "success");
          });
     };

     const handleExcel = () => {
          if (expenses.length === 0) return;
          const headers = ["Expense Head", "Name", "Invoice Number", "Date", "Amount"];
          const data = expenses.map(ex => [
               `"${typeof ex.expenseHead === "object" ? ex.expenseHead.name : ""}"`,
               `"${ex.name}"`,
               `"${ex.invoiceNumber || ""}"`,
               `"${new Date(ex.date).toLocaleDateString()}"`,
               `"${ex.amount.toFixed(2)}"`
          ].join(","));

          const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "search_expense_results.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showNotification("CSV export started!", "success");
     };

     return (
          <>
               {/* Notification Popup */}
               {notification && (
                    <div className={`fixed top-5 right-5 z-[100] transition-all transform animate-fade-in`}>
                         <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" 
                                   ? "bg-success-50 border-success-300 text-success-500" 
                                   : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              {notification.type === "success" ? (
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                              ) : (
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                              )}
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}

               <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                    <div className="flex flex-col space-y-5">
                         <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Search Expense</h3>

                         <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                              {/* Search Type */}
                              <div className="w-full">
                                   <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                        Search Type <span className="text-red-500">*</span>
                                   </label>
                                   <div className="relative">
                                        <button
                                             type="button"
                                             className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 text-left text-sm text-bgray-900 dark:text-white flex justify-between items-center"
                                             onClick={() => setOpenFilter(openFilter === "search_type" ? null : "search_type")}
                                        >
                                             <span>{searchType}</span>
                                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                             </svg>
                                        </button>
                                        <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "search_type" ? "block" : "hidden"}`}>
                                             <ul>
                                                  {["Search By Date", "Search By Expense Head", "Search By Keyword"].map(type => (
                                                       <li 
                                                            key={type}
                                                            onClick={() => {
                                                                 setSearchType(type);
                                                                 setOpenFilter(null);
                                                            }}
                                                            className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-medium"
                                                       >
                                                            {type}
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>

                              {/* Dynamic Input based on Search Type */}
                              {searchType === "Search By Date" ? (
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Date</label>
                                        <input
                                             type="date"
                                             value={searchParams.date}
                                             onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                                             className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                        />
                                   </div>
                              ) : searchType === "Search By Expense Head" ? (
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Expense Head</label>
                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 text-left text-sm text-bgray-900 dark:text-white flex justify-between items-center"
                                                  onClick={() => setOpenFilter(openFilter === "expense_head" ? null : "expense_head")}
                                             >
                                                  <span>{searchParams.expenseHead ? heads.find(h => h._id === searchParams.expenseHead)?.name : "Select"}</span>
                                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "expense_head" ? "block" : "hidden"}`}>
                                                  <ul>
                                                       {heads.map(head => (
                                                            <li 
                                                                 key={head._id}
                                                                 onClick={() => {
                                                                      setSearchParams({ ...searchParams, expenseHead: head._id });
                                                                      setOpenFilter(null);
                                                                 }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-medium"
                                                            >
                                                                 {head.name}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                              ) : (
                                   <div className="w-full">
                                        <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">Keywords</label>
                                        <input
                                             type="text"
                                             value={searchParams.keyword}
                                             onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                                             placeholder="Search by Name, Description, etc."
                                             className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                        />
                                   </div>
                              )}

                              {/* Search Button */}
                              <button
                                   type="submit"
                                   disabled={isLoading}
                                   className="py-3 px-8 text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg h-[48px] disabled:opacity-50"
                              >
                                   {isLoading ? "Searching..." : "Search"}
                              </button>
                         </form>
                    </div>
               </div>

               {hasSearched && (
                    <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex flex-col space-y-5">
                              <div className="flex justify-between items-center">
                                   <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Expense List</h3>
                                   <div className="flex space-x-2">
                                        <button type="button" onClick={handleCopy} className="p-2.5 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all" title="Copy">
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M4 17V6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V17M9 10H15" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round"/>
                                             </svg>
                                        </button>
                                        <button type="button" onClick={handleExcel} className="p-2.5 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all" title="Excel">
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M7 18H17V16H7V18Z" fill="#A0AEC0"/>
                                                  <path d="M17 14H7V12H17V14Z" fill="#A0AEC0"/>
                                                  <path d="M7 10H11V8H7V10Z" fill="#A0AEC0"/>
                                                  <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="#A0AEC0"/>
                                             </svg>
                                        </button>
                                   </div>
                              </div>

                              <div className="table-content w-full overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Name</span>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Expense Head</span>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Invoice Number</span>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date</span>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Amount</span>
                                                  </td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {isLoading ? (
                                                  <tr><td colSpan={5} className="py-10 text-center text-bgray-500">Loading results...</td></tr>
                                             ) : expenses.length === 0 ? (
                                                  <tr><td colSpan={5} className="py-10 text-center text-bgray-500">No records matching your search</td></tr>
                                             ) : expenses.map((ex) => (
                                                  <tr key={ex._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{ex.name}</p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">
                                                                 {typeof ex.expenseHead === "object" ? ex.expenseHead.name : ""}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{ex.invoiceNumber || ""}</p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">
                                                                 {new Date(ex.date).toLocaleDateString()}
                                                            </p>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <p className="font-semibold text-sm text-bgray-900 dark:text-white">${ex.amount.toFixed(2)}</p>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}
