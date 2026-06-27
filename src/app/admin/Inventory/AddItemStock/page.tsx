"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function AddItemStock() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [stocks, setStocks] = useState<any[]>([]);
     const [items, setItems] = useState<any[]>([]);
     const [suppliers, setSuppliers] = useState<any[]>([]);
     const [stores, setStores] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchQuery, setSearchQuery] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     const [formData, setFormData] = useState({ 
          item: "", 
          supplier: "", 
          store: "", 
          qty: 0, 
          purchaseDate: new Date().toISOString().split('T')[0],
          description: "" 
     });

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const fetchData = async () => {
          setLoading(true);
          try {
               const [stkRes, itRes, supRes, strRes] = await Promise.all([
                    fetch("/api/inventory/item-stock"),
                    fetch("/api/inventory/item"),
                    fetch("/api/inventory/item-supplier"),
                    fetch("/api/inventory/item-store")
               ]);
               const stkData = await stkRes.json();
               const itData = await itRes.json();
               const supData = await supRes.json();
               const strData = await strRes.json();
               
               if (stkData.success) setStocks(stkData.data);
               if (itData.success) setItems(itData.data);
               if (supData.success) setSuppliers(supData.data);
               if (strData.success) setStores(strData.data);
          } catch (error) {
               console.error("Failed to fetch data:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const filteredStocks = stocks.filter((stock) => {
          if (!searchQuery) return true;
          const lowerQ = searchQuery.toLowerCase();
          return (
               (stock.item && stock.item.toLowerCase().includes(lowerQ)) ||
               (stock.supplier && stock.supplier.toLowerCase().includes(lowerQ)) ||
               (stock.store && stock.store.toLowerCase().includes(lowerQ))
          );
     });

     const handleSave = async () => {
          if (!formData.item || formData.qty <= 0) {
               alert("Item and a valid Quantity are required.");
               return;
          }
          setIsSubmitting(true);
          try {
               const res = await fetch(`/api/inventory/item-stock`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });
               const data = await res.json();
               if (data.success) {
                    setFormData({ 
                         item: "", supplier: "", store: "", qty: 0, 
                         purchaseDate: new Date().toISOString().split('T')[0], description: "" 
                    });
                    fetchData();
               } else {
                    alert(data.error || "Failed to add stock");
               }
          } catch (error) {
               console.error(error);
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this stock entry? This will revert the item quantity.")) return;
          try {
               const res = await fetch(`/api/inventory/item-stock/${id}`, { method: "DELETE" });
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
          const exportData = filteredStocks.map(s => ({
               "Item": s.item,
               "Supplier": s.supplier || "N/A",
               "Store": s.store || "N/A",
               "Quantity": s.qty,
               "Purchase Date": s.purchaseDate ? new Date(s.purchaseDate).toLocaleDateString() : "N/A",
               "Description": s.description || "N/A"
          }));
          handleExport(type, exportData, "Inventory_Stock");
          setOpenFilter(null);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Stock Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Add Item Stock
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
                                                            <option key={i._id} value={i.name}>{i.name}</option>
                                                       ))}
                                                  </select>
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Supplier
                                                  </label>
                                                  <select
                                                       value={formData.supplier}
                                                       onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  >
                                                       <option value="">Select Supplier</option>
                                                       {suppliers.map((s) => (
                                                            <option key={s._id} value={s.supplier}>{s.supplier}</option>
                                                       ))}
                                                  </select>
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Store
                                                  </label>
                                                  <select
                                                       value={formData.store}
                                                       onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  >
                                                       <option value="">Select Store</option>
                                                       {stores.map((s) => (
                                                            <option key={s._id} value={s.storeName}>{s.storeName}</option>
                                                       ))}
                                                  </select>
                                             </div>
                                             
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Quantity <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="number"
                                                       value={formData.qty}
                                                       onChange={(e) => setFormData({ ...formData, qty: parseInt(e.target.value) || 0 })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>
                                             
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Purchase Date
                                                  </label>
                                                  <input
                                                       type="date"
                                                       value={formData.purchaseDate}
                                                       onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Description
                                                  </label>
                                                  <textarea
                                                       rows={3}
                                                       value={formData.description}
                                                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                       className="w-full rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 py-3 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300 resize-none"
                                                  ></textarea>
                                             </div>

                                             <button
                                                  type="button"
                                                  onClick={handleSave}
                                                  disabled={isSubmitting}
                                                  className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full disabled:opacity-50"
                                             >
                                                  {isSubmitting ? "Saving..." : "Save"}
                                             </button>
                                        </div>
                                   </div>
                              </div>

                              {/* Stock List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Item Stock List</h3>

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
                                                                 placeholder="Search by item, supplier, or store..."
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
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Supplier</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Store</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Qty</span></td>
                                                            <td className="py-5 px-6 xl:px-0"><span className="text-base font-medium text-bgray-600 dark:text-white">Date</span></td>
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
                                                       ) : filteredStocks.length > 0 ? (
                                                            filteredStocks.map((stock, index) => (
                                                                 <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="font-medium text-base text-bgray-900 dark:text-white">{stock.item}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">{stock.supplier || "N/A"}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">{stock.store || "N/A"}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base font-medium text-bgray-900 dark:text-white">{stock.qty}</p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="text-base text-bgray-900 dark:text-white">
                                                                                {stock.purchaseDate ? new Date(stock.purchaseDate).toLocaleDateString() : "N/A"}
                                                                           </p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <button type="button" onClick={() => handleDelete(stock._id)} className="hover:opacity-70 transition">
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <line x1="18" y1="6" x2="6" y2="18" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                                                                                     <line x1="6" y1="6" x2="18" y2="18" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                                                                                </svg>
                                                                           </button>
                                                                      </td>
                                                                 </tr>
                                                            ))
                                                       ) : (
                                                            <tr>
                                                                 <td colSpan={6} className="py-16 text-center text-bgray-400 text-sm font-semibold">
                                                                      No stock entries found.
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