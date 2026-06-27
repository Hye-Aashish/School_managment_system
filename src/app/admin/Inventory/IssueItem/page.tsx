"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function IssueItem() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [issues, setIssues] = useState<any[]>([]);
     const [items, setItems] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchQuery, setSearchQuery] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     const [formData, setFormData] = useState({ 
          item: "", 
          issueTo: "", 
          issueBy: "", 
          qty: 1, 
          issueDate: new Date().toISOString().split('T')[0],
          note: "" 
     });

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const fetchData = async () => {
          setLoading(true);
          try {
               const [issRes, itRes] = await Promise.all([
                    fetch("/api/inventory/item-issue"),
                    fetch("/api/inventory/item")
               ]);
               const issData = await issRes.json();
               const itData = await itRes.json();
               
               if (issData.success) setIssues(issData.data);
               if (itData.success) setItems(itData.data);
          } catch (error) {
               console.error("Failed to fetch data:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const filteredIssues = issues.filter((issue) => {
          if (!searchQuery) return true;
          const lowerQ = searchQuery.toLowerCase();
          return (
               (issue.item && issue.item.toLowerCase().includes(lowerQ)) ||
               (issue.issueTo && issue.issueTo.toLowerCase().includes(lowerQ)) ||
               (issue.issueBy && issue.issueBy.toLowerCase().includes(lowerQ))
          );
     });

     const handleSave = async () => {
          if (!formData.item || !formData.issueTo || formData.qty <= 0) {
               alert("Item, Issue To, and a valid Quantity are required.");
               return;
          }
          setIsSubmitting(true);
          try {
               const res = await fetch(`/api/inventory/item-issue`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });
               const data = await res.json();
               if (data.success) {
                    setFormData({ 
                         item: "", issueTo: "", issueBy: "", qty: 1, 
                         issueDate: new Date().toISOString().split('T')[0], note: "" 
                    });
                    fetchData();
               } else {
                    alert(data.error || "Failed to issue item");
               }
          } catch (error) {
               console.error(error);
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleReturn = async (id: string) => {
          if (!confirm("Are you sure you want to mark this item as returned?")) return;
          try {
               const res = await fetch(`/api/inventory/item-issue/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ returnDate: new Date().toISOString().split('T')[0] })
               });
               const data = await res.json();
               if (data.success) {
                    fetchData();
               } else {
                    alert(data.error || "Failed to return item");
               }
          } catch (error) {
               console.error(error);
          }
     };

     const onExport = (type: ExportType) => {
          const exportData = filteredIssues.map(i => ({
               "Item": i.item,
               "Issue To": i.issueTo,
               "Issue By": i.issueBy || "N/A",
               "Quantity": i.qty,
               "Issue Date": i.issueDate ? new Date(i.issueDate).toLocaleDateString() : "N/A",
               "Return Date": i.returnDate ? new Date(i.returnDate).toLocaleDateString() : "N/A",
               "Status": i.status,
               "Note": i.note || "N/A"
          }));
          handleExport(type, exportData, "Inventory_Issues");
          setOpenFilter(null);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Issue Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Issue Item
                                        </h3>

                                        <div className="w-full space-y-4">
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Item Name <span className="text-red-500">*</span>
                                                  </label>
                                                  <select
                                                       value={formData.item}
                                                       onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  >
                                                       <option value="">Select Item</option>
                                                       {items.map((i) => (
                                                            <option key={i._id} value={i.name} disabled={i.availableQty <= 0}>
                                                                 {i.name} ({i.availableQty} available)
                                                            </option>
                                                       ))}
                                                  </select>
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Issue To <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.issueTo}
                                                       onChange={(e) => setFormData({ ...formData, issueTo: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                       placeholder="Role or Name"
                                                  />
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Issue By
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.issueBy}
                                                       onChange={(e) => setFormData({ ...formData, issueBy: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                       placeholder="Name"
                                                  />
                                             </div>
                                             
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Quantity <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value={formData.qty}
                                                       onChange={(e) => setFormData({ ...formData, qty: parseInt(e.target.value) || 1 })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>
                                             
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Issue Date
                                                  </label>
                                                  <input
                                                       type="date"
                                                       value={formData.issueDate}
                                                       onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Note
                                                  </label>
                                                  <textarea
                                                       rows={3}
                                                       value={formData.note}
                                                       onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                       className="w-full rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 py-3 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  ></textarea>
                                             </div>

                                             <button
                                                  type="button"
                                                  onClick={handleSave}
                                                  disabled={isSubmitting}
                                                  className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full disabled:opacity-50"
                                             >
                                                  {isSubmitting ? "Issuing..." : "Save"}
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Issues List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Issued Items List</h3>

                                        <div className="w-full flex h-14 space-x-4">
                                             <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                                                  <div className="flex w-full h-full items-center space-x-[15px]">
                                                       <span>
                                                            <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                 <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                       <label className="w-full">
                                                            <input
                                                                 type="text"
                                                                 value={searchQuery}
                                                                 onChange={(e) => setSearchQuery(e.target.value)}
                                                                 placeholder="Search by item, issuer, or recipient..."
                                                                 className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
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
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>

                                                  <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"}`}>
                                                       <ul>
                                                            <li onClick={() => onExport('Copy')} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Copy</li>
                                                            <li onClick={() => onExport('Excel')} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Excel</li>
                                                            <li onClick={() => onExport('CSV')} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">CSV</li>
                                                            <li onClick={() => onExport('PDF')} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">PDF</li>
                                                            <li onClick={() => onExport('Print')} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">Print</li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Table */}
                                        <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Item</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Issue To</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Issue By</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Qty</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Status</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Action</span></td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr>
                                                                 <td colSpan={6} className="py-16 text-center">
                                                                      <div className="w-8 h-8 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                                 </td>
                                                            </tr>
                                                       ) : filteredIssues.length > 0 ? (
                                                            filteredIssues.map((issue, index) => (
                                                                 <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="font-medium text-base text-bgray-900 dark:text-white">{issue.item}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">{issue.issueTo}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">{issue.issueBy || "N/A"}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base font-medium text-bgray-900 dark:text-white">{issue.qty}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${issue.status === "Returned" ? "bg-success-50 text-success-300" : "bg-warning-50 text-warning-300"}`}>
                                                                                {issue.status}
                                                                           </span>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           {issue.status === "Issued" && (
                                                                                <button 
                                                                                     type="button" 
                                                                                     onClick={() => handleReturn(issue._id)} 
                                                                                     className="text-sm font-semibold text-white bg-success-300 px-4 py-2 rounded-lg hover:bg-success-400 transition"
                                                                                >
                                                                                     Return
                                                                                </button>
                                                                           )}
                                                                           {issue.status === "Returned" && (
                                                                                <span className="text-sm text-bgray-500">Returned on {new Date(issue.returnDate).toLocaleDateString()}</span>
                                                                           )}
                                                                      </td>
                                                                 </tr>
                                                            ))
                                                       ) : (
                                                            <tr>
                                                                 <td colSpan={6} className="py-16 text-center text-bgray-400 text-sm font-semibold">
                                                                      No issues found.
                                                                 </td>
                                                            </tr>
                                                       )}
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