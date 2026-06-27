"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function AddItem() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [items, setItems] = useState<any[]>([]);
     const [categories, setCategories] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchQuery, setSearchQuery] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     const [formData, setFormData] = useState({ 
          _id: "", 
          name: "", 
          category: "", 
          unit: "", 
          description: "" 
     });
     const [isEditMode, setIsEditMode] = useState(false);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const fetchData = async () => {
          setLoading(true);
          try {
               const [itRes, catRes] = await Promise.all([
                    fetch("/api/inventory/item"),
                    fetch("/api/inventory/item-category")
               ]);
               const itData = await itRes.json();
               const catData = await catRes.json();
               
               if (itData.success) setItems(itData.data);
               if (catData.success) setCategories(catData.data);
          } catch (error) {
               console.error("Failed to fetch data:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const filteredItems = items.filter((item) => {
          if (!searchQuery) return true;
          const lowerQ = searchQuery.toLowerCase();
          return (
               (item.name && item.name.toLowerCase().includes(lowerQ)) ||
               (item.category && item.category.toLowerCase().includes(lowerQ))
          );
     });

     const handleSave = async () => {
          if (!formData.name || !formData.category) {
               alert("Item Name and Category are required.");
               return;
          }
          setIsSubmitting(true);
          try {
               const url = isEditMode ? `/api/inventory/item/${formData._id}` : `/api/inventory/item`;
               const method = isEditMode ? "PUT" : "POST";
               
               const { _id, ...submitData } = formData;
               
               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(submitData)
               });
               const data = await res.json();
               if (data.success) {
                    setFormData({ _id: "", name: "", category: "", unit: "", description: "" });
                    setIsEditMode(false);
                    fetchData();
               } else {
                    alert(data.error || "Failed to save item");
               }
          } catch (error) {
               console.error(error);
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (item: any) => {
          setFormData({ 
               _id: item._id, 
               name: item.name || "", 
               category: item.category || "", 
               unit: item.unit || "", 
               description: item.description || "" 
          });
          setIsEditMode(true);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this item?")) return;
          try {
               const res = await fetch(`/api/inventory/item/${id}`, { method: "DELETE" });
               const data = await res.json();
               if (data.success) {
                    fetchData();
               } else {
                    alert(data.error || "Failed to delete");
               }
          } catch (error) {
               console.error(error);
          }
     };

     const onExport = (type: ExportType) => {
          const exportData = filteredItems.map(i => ({
               "Item": i.name,
               "Category": i.category,
               "Unit": i.unit || "N/A",
               "Total Qty": i.totalQty,
               "Available Qty": i.availableQty,
               "Description": i.description || "N/A"
          }));
          handleExport(type, exportData, "Inventory_Items");
          setOpenFilter(null);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Item Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             {isEditMode ? "Edit Item" : "Add Item"}
                                        </h3>

                                        <div className="w-full space-y-4">
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Item Name <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Item Category <span className="text-red-500">*</span>
                                                  </label>
                                                  <select
                                                       value={formData.category}
                                                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  >
                                                       <option value="">Select Category</option>
                                                       {categories.map((c) => (
                                                            <option key={c._id} value={c.name}>{c.name}</option>
                                                       ))}
                                                  </select>
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Unit
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.unit}
                                                       onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Description
                                                  </label>
                                                  <textarea
                                                       rows={4}
                                                       value={formData.description}
                                                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                       className="w-full rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 py-3 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  ></textarea>
                                             </div>

                                             <div className="flex space-x-2">
                                                  <button
                                                       type="button"
                                                       onClick={handleSave}
                                                       disabled={isSubmitting}
                                                       className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full disabled:opacity-50"
                                                  >
                                                       {isSubmitting ? "Saving..." : "Save"}
                                                  </button>
                                                  {isEditMode && (
                                                       <button
                                                            type="button"
                                                            onClick={() => {
                                                                 setFormData({ _id: "", name: "", category: "", unit: "", description: "" });
                                                                 setIsEditMode(false);
                                                            }}
                                                            className="py-3.5 flex items-center justify-center text-bgray-900 dark:text-white font-bold bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition-all rounded-lg w-full"
                                                       >
                                                            Cancel
                                                       </button>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Item List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Item List</h3>

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
                                                                 placeholder="Search by name or category..."
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
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Category</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Unit</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Available Qty</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Action</span></td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr>
                                                                 <td colSpan={5} className="py-16 text-center">
                                                                      <div className="w-8 h-8 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                                 </td>
                                                            </tr>
                                                       ) : filteredItems.length > 0 ? (
                                                            filteredItems.map((item, index) => (
                                                                 <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="font-medium text-base text-bgray-900 dark:text-white">{item.name}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">{item.category}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">{item.unit || "N/A"}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base font-medium text-bgray-900 dark:text-white">{item.availableQty} / {item.totalQty}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <div className="flex items-center space-x-2">
                                                                                <button type="button" onClick={() => handleEdit(item)} className="hover:opacity-70 transition">
                                                                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                          <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     </svg>
                                                                                </button>
                                                                                <button type="button" onClick={() => handleDelete(item._id)} className="hover:opacity-70 transition">
                                                                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                          <line x1="18" y1="6" x2="6" y2="18" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                                                                                          <line x1="6" y1="6" x2="18" y2="18" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                                                                                     </svg>
                                                                                </button>
                                                                           </div>
                                                                      </td>
                                                                 </tr>
                                                            ))
                                                       ) : (
                                                            <tr>
                                                                 <td colSpan={5} className="py-16 text-center text-bgray-400 text-sm font-semibold">
                                                                      No items found.
                                                                 </td>
                                                            </tr>
                                                       )}
                                                  </tbody>
                                             </table>
                                        </div>

                                        <div className="pagination-content w-full">
                                             <div className="w-full flex lg:justify-between justify-center items-center">
                                                  <div className="lg:flex hidden space-x-4 items-center">
                                                       <span className="text-bgray-600 dark:text-white text-sm font-semibold">Records: 1 to {filteredItems.length} of {filteredItems.length}</span>
                                                  </div>
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