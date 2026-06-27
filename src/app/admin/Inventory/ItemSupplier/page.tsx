"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function ItemSupplier() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);
     const [suppliers, setSuppliers] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchQuery, setSearchQuery] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     const [formData, setFormData] = useState({ 
          _id: "", 
          supplier: "", 
          phone: "", 
          email: "",
          address: "",
          contactPerson: "",
          contactPhone: "",
          contactEmail: "",
          description: "" 
     });
     const [isEditMode, setIsEditMode] = useState(false);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const fetchSuppliers = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/inventory/item-supplier");
               const data = await res.json();
               if (data.success) {
                    setSuppliers(data.data);
               }
          } catch (error) {
               console.error("Failed to fetch item suppliers:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchSuppliers();
     }, []);

     const filteredSuppliers = suppliers.filter((supp) => {
          if (!searchQuery) return true;
          const lowerQ = searchQuery.toLowerCase();
          return (
               (supp.supplier && supp.supplier.toLowerCase().includes(lowerQ)) ||
               (supp.contactPerson && supp.contactPerson.toLowerCase().includes(lowerQ)) ||
               (supp.phone && supp.phone.toLowerCase().includes(lowerQ))
          );
     });

     const handleSave = async () => {
          if (!formData.supplier) {
               alert("Supplier Name is required.");
               return;
          }
          setIsSubmitting(true);
          try {
               const url = isEditMode ? `/api/inventory/item-supplier/${formData._id}` : `/api/inventory/item-supplier`;
               const method = isEditMode ? "PUT" : "POST";
               
               const { _id, ...submitData } = formData;
               
               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(submitData)
               });
               const data = await res.json();
               if (data.success) {
                    setFormData({ 
                         _id: "", supplier: "", phone: "", email: "", address: "", 
                         contactPerson: "", contactPhone: "", contactEmail: "", description: "" 
                    });
                    setIsEditMode(false);
                    fetchSuppliers();
               } else {
                    alert(data.error || "Failed to save supplier");
               }
          } catch (error) {
               console.error(error);
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (supp: any) => {
          setFormData({ 
               _id: supp._id, 
               supplier: supp.supplier || "", 
               phone: supp.phone || "", 
               email: supp.email || "",
               address: supp.address || "",
               contactPerson: supp.contactPerson || "",
               contactPhone: supp.contactPhone || "",
               contactEmail: supp.contactEmail || "",
               description: supp.description || "" 
          });
          setIsEditMode(true);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this supplier?")) return;
          try {
               const res = await fetch(`/api/inventory/item-supplier/${id}`, { method: "DELETE" });
               const data = await res.json();
               if (data.success) {
                    fetchSuppliers();
               } else {
                    alert(data.error || "Failed to delete");
               }
          } catch (error) {
               console.error(error);
          }
     };

     const onExport = (type: ExportType) => {
          const exportData = filteredSuppliers.map(s => ({
               "Supplier": s.supplier,
               "Phone": s.phone || "N/A",
               "Email": s.email || "N/A",
               "Contact Person": s.contactPerson || "N/A",
               "Contact Phone": s.contactPhone || "N/A",
               "Contact Email": s.contactEmail || "N/A",
               "Address": s.address || "N/A"
          }));
          handleExport(type, exportData, "Item_Suppliers");
          setOpenFilter(null);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Add Item Supplier Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[420px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             {isEditMode ? "Edit Item Supplier" : "Add Item Supplier"}
                                        </h3>

                                        <div className="w-full space-y-4">
                                             {/* Name */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Name <span className="text-red-500">*</span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.supplier}
                                                       onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Phone */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Phone
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.phone}
                                                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Email */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Email
                                                  </label>
                                                  <input
                                                       type="email"
                                                       value={formData.email}
                                                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Address */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Address
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.address}
                                                       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Contact Person Name */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Contact Person Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.contactPerson}
                                                       onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Contact Person Phone */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Contact Person Phone
                                                  </label>
                                                  <input
                                                       type="text"
                                                       value={formData.contactPhone}
                                                       onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Contact Person Email */}
                                             <div className="w-full">
                                                  <label className="text-sm font-medium text-bgray-600 dark:text-white mb-2 block">
                                                       Contact Person Email
                                                  </label>
                                                  <input
                                                       type="email"
                                                       value={formData.contactEmail}
                                                       onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                                       className="w-full h-12 rounded-lg bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 px-4 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  />
                                             </div>

                                             {/* Description */}
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

                                             {/* Save Button */}
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
                                                                 setFormData({ 
                                                                      _id: "", supplier: "", phone: "", email: "", address: "", 
                                                                      contactPerson: "", contactPhone: "", contactEmail: "", description: "" 
                                                                 });
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

                              {/* Item Supplier List */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Item Supplier List</h3>

                                        <div className="w-full flex h-14 space-x-4">
                                             {/* Search Field */}
                                             <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                                 id="listSearch"
                                                                 value={searchQuery}
                                                                 onChange={(e) => setSearchQuery(e.target.value)}
                                                                 placeholder="Search..."
                                                                 className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                            />
                                                       </label>
                                                  </div>
                                             </div>

                                             {/* Export Dropdown */}
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
                                                       className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"}`}
                                                  >
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
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-white">Item Supplier</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="w-full flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-white">Contact Person</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <div className="flex space-x-2.5 items-center">
                                                                      <span className="text-base font-medium text-bgray-600 dark:text-white">Address</span>
                                                                      <span>
                                                                           <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                           </svg>
                                                                      </span>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Action</span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr>
                                                                 <td colSpan={4} className="py-16 text-center">
                                                                      <div className="w-8 h-8 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                                 </td>
                                                            </tr>
                                                       ) : filteredSuppliers.length > 0 ? (
                                                            filteredSuppliers.map((supplier, index) => (
                                                                 <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <div className="flex flex-col space-y-1">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-white">{supplier.supplier}</p>
                                                                                {supplier.phone && (
                                                                                     <p className="text-sm text-bgray-600 dark:text-bgray-400 flex items-center space-x-1">
                                                                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                               <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27097 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                          </svg>
                                                                                          <span>{supplier.phone}</span>
                                                                                     </p>
                                                                                )}
                                                                                {supplier.email && (
                                                                                     <p className="text-sm text-bgray-600 dark:text-bgray-400 flex items-center space-x-1">
                                                                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                               <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                               <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                          </svg>
                                                                                          <span>{supplier.email}</span>
                                                                                     </p>
                                                                                )}
                                                                           </div>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <div className="flex flex-col space-y-1">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-white flex items-center space-x-1">
                                                                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     </svg>
                                                                                     <span>{supplier.contactPerson || "N/A"}</span>
                                                                                </p>
                                                                                {supplier.contactPhone && (
                                                                                     <p className="text-sm text-bgray-600 dark:text-bgray-400 flex items-center space-x-1">
                                                                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                               <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27097 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     </svg>
                                                                                     <span>{supplier.contactPhone}</span>
                                                                                </p>
                                                                                )}
                                                                                {supplier.contactEmail && (
                                                                                     <p className="text-sm text-bgray-600 dark:text-bgray-400 flex items-center space-x-1">
                                                                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                               <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                               <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                          </svg>
                                                                                          <span>{supplier.contactEmail}</span>
                                                                                     </p>
                                                                                )}
                                                                           </div>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <p className="font-medium text-base text-bgray-900 dark:text-white flex items-center space-x-1">
                                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                                <span>{supplier.address || "N/A"}</span>
                                                                           </p>
                                                                      </td>
                                                                      <td className="py-5 px-6 xl:px-0">
                                                                           <div className="flex items-center space-x-2">
                                                                                <button type="button" onClick={() => handleEdit(supplier)} className="hover:opacity-70 transition">
                                                                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                          <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     </svg>
                                                                                </button>
                                                                                <button type="button" onClick={() => handleDelete(supplier._id)} className="hover:opacity-70 transition">
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
                                                                 <td colSpan={4} className="py-16 text-center text-bgray-400 text-sm font-semibold">
                                                                      No item suppliers found.
                                                                 </td>
                                                            </tr>
                                                       )}
                                                  </tbody>
                                             </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="pagination-content w-full">
                                             <div className="w-full flex lg:justify-between justify-center items-center">
                                                  <div className="lg:flex hidden space-x-4 items-center">
                                                       <span className="text-bgray-600 dark:text-white text-sm font-semibold">Records: 1 to {filteredSuppliers.length} of {filteredSuppliers.length}</span>
                                                  </div>
                                                  <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                                       <button type="button">
                                                            <span>
                                                                 <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </button>
                                                       <div className="flex items-center">
                                                            <button type="button" className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-white">
                                                                 1
                                                            </button>
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
                         </div>
                    </section>
               </div>
          </>
     );
}