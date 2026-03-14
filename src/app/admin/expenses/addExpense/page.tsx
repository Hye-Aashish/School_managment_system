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
     document?: string;
     description?: string;
}

export default function AddExpensePage() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "expense_head" | null>(null);
     const [expenses, setExpenses] = useState<Expense[]>([]);
     const [heads, setHeads] = useState<ExpenseHead[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({
          expenseHead: "",
          name: "",
          invoiceNumber: "",
          date: new Date().toISOString().split("T")[0],
          amount: "",
          description: "",
     });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchHeads = async () => {
          try {
               const res = await fetch("/api/expense-heads");
               const json = await res.json();
               if (json.success) setHeads(json.data);
          } catch (error) {
               console.error("Error fetching heads:", error);
          }
     };

     const fetchExpenses = async () => {
          setIsLoading(true);
          try {
               const res = await fetch("/api/expenses");
               const json = await res.json();
               if (json.success) setExpenses(json.data);
          } catch (error) {
               console.error("Error fetching expenses:", error);
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchHeads();
          fetchExpenses();
     }, []);

     const toggleFilter = (type: "action" | "pagination" | "expense_head") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.expenseHead || !formData.name || !formData.date || !formData.amount) {
               showNotification("Please fill all required fields", "error");
               return;
          }

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/expenses/${editingId}` : "/api/expenses";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, amount: Number(formData.amount) }),
               });

               const json = await res.json();
               if (json.success) {
                    setFormData({
                         expenseHead: "",
                         name: "",
                         invoiceNumber: "",
                         date: new Date().toISOString().split("T")[0],
                         amount: "",
                         description: "",
                    });
                    setEditingId(null);
                    fetchExpenses();
                    showNotification(editingId ? "Expense record updated successfully!" : "Expense record added successfully!", "success");
               } else {
                    showNotification(json.error || "Something went wrong", "error");
               }
          } catch (error) {
               console.error("Error saving expense:", error);
               showNotification("An unexpected error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (expense: Expense) => {
          setEditingId(expense._id);
          setFormData({
               expenseHead: typeof expense.expenseHead === "object" ? expense.expenseHead._id : expense.expenseHead,
               name: expense.name,
               invoiceNumber: expense.invoiceNumber || "",
               date: new Date(expense.date).toISOString().split("T")[0],
               amount: expense.amount.toString(),
               description: expense.description || "",
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure?")) return;
          try {
               const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
               const json = await res.json();
               if (json.success) {
                    fetchExpenses();
                    showNotification("Expense record deleted successfully!", "success");
               } else {
                    showNotification(json.error || "Error deleting expense record", "error");
               }
          } catch (error) {
               console.error("Error deleting expense:", error);
               showNotification("An unexpected error occurred", "error");
          }
     };

     const filteredExpenses = expenses.filter(i => 
          i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof i.expenseHead === "object" && i.expenseHead.name.toLowerCase().includes(searchTerm.toLowerCase()))
     );

     // Export Functions
     const handleCopy = () => {
          const headers = ["Expense Head", "Name", "Invoice Number", "Date", "Amount"];
          const data = filteredExpenses.map(expense => [
               typeof expense.expenseHead === "object" ? expense.expenseHead.name : "",
               expense.name,
               expense.invoiceNumber || "",
               new Date(expense.date).toLocaleDateString(),
               `$${expense.amount.toFixed(2)}`
          ].join("\t"));

          const textToCopy = [headers.join("\t"), ...data].join("\n");
          navigator.clipboard.writeText(textToCopy).then(() => {
               showNotification("Data copied to clipboard!", "success");
          });
     };

     const handleExcel = () => {
          const headers = ["Expense Head", "Name", "Invoice Number", "Date", "Amount"];
          const data = filteredExpenses.map(expense => [
               `"${typeof expense.expenseHead === "object" ? expense.expenseHead.name : ""}"`,
               `"${expense.name}"`,
               `"${expense.invoiceNumber || ""}"`,
               `"${new Date(expense.date).toLocaleDateString()}"`,
               `"${expense.amount.toFixed(2)}"`
          ].join(","));

          const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "expense_list.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showNotification("CSV export started!", "success");
     };

     const handlePrint = () => {
          const printContent = `
               <html>
                    <head>
                         <title>Expense List</title>
                         <style>
                              body { font-family: Arial, sans-serif; padding: 20px; }
                              h2 { text-align: center; }
                              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                              th { background-color: #f2f2f2; }
                         </style>
                    </head>
                    <body>
                         <h2>Expense List</h2>
                         <table>
                              <thead>
                                   <tr>
                                        <th>Expense Head</th>
                                        <th>Name</th>
                                        <th>Invoice Number</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   ${filteredExpenses.map(expense => `
                                        <tr>
                                             <td>${typeof expense.expenseHead === "object" ? expense.expenseHead.name : ""}</td>
                                             <td>${expense.name}</td>
                                             <td>${expense.invoiceNumber || ""}</td>
                                             <td>${new Date(expense.date).toLocaleDateString()}</td>
                                             <td>$${expense.amount.toFixed(2)}</td>
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
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Expense Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">
                                             {editingId ? "Edit Expense" : "Add Expense"}
                                        </h3>

                                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                                             {/* Expense Head */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Expense Head <span className="text-red-500">*</span>
                                                  </label>
                                                  <div className="relative">
                                                       <button
                                                            type="button"
                                                            className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 text-left text-sm text-bgray-500 dark:text-bgray-300 flex justify-between items-center"
                                                            onClick={() => toggleFilter("expense_head")}
                                                       >
                                                            <span>
                                                                 {formData.expenseHead 
                                                                      ? heads.find(h => h._id === formData.expenseHead)?.name 
                                                                      : "Select"}
                                                            </span>
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                       </button>
                                                       <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "expense_head" ? "block" : "hidden"}`}>
                                                            <ul>
                                                                 {heads.map(head => (
                                                                      <li 
                                                                           key={head._id}
                                                                           onClick={() => {
                                                                                setFormData({ ...formData, expenseHead: head._id });
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

                                             {/* Name */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Name <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       placeholder=""
                                                       required
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             {/* Invoice Number */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Invoice Number
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.invoiceNumber}
                                                       onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                                                       placeholder=""
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             {/* Date */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Date <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="date"
                                                       value={formData.date}
                                                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                       required
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             {/* Amount */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Amount ($) <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value={formData.amount}
                                                       onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                       placeholder=""
                                                       required
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white"
                                                  />
                                             </div>

                                             {/* Attach Document */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Attach Document
                                                  </label>
                                                  <div className="w-full px-4 py-8 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border-2 border-dashed border-bgray-400 dark:border-darkblack-400 flex flex-col items-center justify-center cursor-pointer hover:border-success-300 transition-all">
                                                       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                                                            <path d="M7 10L12 15L17 10" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M12 15V3" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                       </svg>
                                                       <p className="text-sm text-bgray-500 dark:text-bgray-300">Drag and drop a file here or click</p>
                                                  </div>
                                             </div>

                                             {/* Description */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50 mb-2 block">
                                                       Description
                                                  </label>
                                                  <textarea
                                                       rows={4}
                                                       value={formData.description}
                                                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                       placeholder=""
                                                       className="w-full px-4 py-3 bg-bgray-200 dark:bg-darkblack-500 rounded-lg border border-transparent focus:border-success-300 focus:outline-none text-sm text-bgray-900 dark:text-white resize-none"
                                                  />
                                             </div>

                                             {/* Save Button */}
                                             <div className="flex gap-3">
                                                  {editingId && (
                                                       <button
                                                            type="button"
                                                            onClick={() => {
                                                                 setEditingId(null);
                                                                 setFormData({
                                                                      expenseHead: "",
                                                                      name: "",
                                                                      invoiceNumber: "",
                                                                      date: new Date().toISOString().split("T")[0],
                                                                      amount: "",
                                                                      description: "",
                                                                 });
                                                            }}
                                                            className="py-3.5 flex items-center justify-center text-bgray-900 dark:text-white font-bold bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 transition-all rounded-lg w-full"
                                                       >
                                                            Cancel
                                                       </button>
                                                  )}
                                                  <button
                                                       type="submit"
                                                       disabled={isSubmitting}
                                                       className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full disabled:opacity-50"
                                                  >
                                                       {isSubmitting ? "Saving..." : editingId ? "Update" : "Save"}
                                                  </button>
                                             </div>
                                        </form>
                                   </div>
                              </div>

                              {/* Expense List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">Expense List</h3>

                                        <div className="w-full flex h-14 space-x-4">
                                             <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                                  <div className="flex w-full h-full items-center space-x-[15px]">
                                                       <span>
                                                            <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                 <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                       </span>
                                                       <label className="w-full">
                                                            <input
                                                                 type="text"
                                                                 placeholder="Search..."
                                                                 value={searchTerm}
                                                                 onChange={(e) => setSearchTerm(e.target.value)}
                                                                 className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                            />
                                                       </label>
                                                  </div>
                                             </div>

                                             {/* Action Icons */}
                                             <button type="button" onClick={handleCopy} className="h-full px-4 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all" title="Copy">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M4 17V6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V17M9 10H15" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round"/>
                                                  </svg>
                                             </button>

                                             <button type="button" onClick={handleExcel} className="h-full px-4 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all" title="Excel/CSV">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M7 18H17V16H7V18Z" fill="#A0AEC0"/>
                                                       <path d="M17 14H7V12H17V14Z" fill="#A0AEC0"/>
                                                       <path d="M7 10H11V8H7V10Z" fill="#A0AEC0"/>
                                                       <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="#A0AEC0"/>
                                                  </svg>
                                             </button>

                                             <button type="button" onClick={handlePrint} className="h-full px-4 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all" title="Print/PDF">
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M6 9L6 2L18 2V9M6 9H4M6 9H18M18 9H20M4 9L2 21L5 22H19L22 21L20 9M9 19V14H15V19" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                        </div>

                                        {/* Table */}
                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
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
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Amount</span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-center">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {isLoading ? (
                                                            <tr><td colSpan={5} className="py-10 text-center text-bgray-500">Loading...</td></tr>
                                                       ) : filteredExpenses.length === 0 ? (
                                                            <tr><td colSpan={5} className="py-10 text-center text-bgray-500">No records found</td></tr>
                                                       ) : filteredExpenses.map((expense) => (
                                                            <tr key={expense._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{expense.name}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{typeof expense.expenseHead === "object" ? expense.expenseHead.name : ""}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">{new Date(expense.date).toLocaleDateString()}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-sm text-bgray-900 dark:text-bgray-50">${expense.amount.toFixed(2)}</p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex justify-center gap-2">
                                                                           <button 
                                                                                onClick={() => handleEdit(expense)}
                                                                                type="button" 
                                                                                className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button 
                                                                                onClick={() => handleDelete(expense._id)}
                                                                                type="button" 
                                                                                className="p-2 hover:bg-bgray-100 dark:hover:bg-darkblack-500 rounded transition-all"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M6 18L18 6M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="pagination-content w-full border-t border-bgray-300 dark:border-darkblack-400 pt-4">
                                             <div className="w-full flex justify-between items-center text-sm text-bgray-600 dark:text-bgray-50 font-bold">
                                                  <span>Total Records: {filteredExpenses.length}</span>
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
