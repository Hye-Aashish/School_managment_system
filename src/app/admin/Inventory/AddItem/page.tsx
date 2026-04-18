"use client";
import React, { useState, useEffect } from "react";

export default function AddItem() {
     const [items, setItems] = useState<any[]>([]);
     const [categories, setCategories] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     const [formData, setFormData] = useState({
          name: "", category: "", unit: "", description: ""
     });

     const fetchItems = async () => {
          setLoading(true);
          const res = await fetch("/api/inventory/items");
          const data = await res.json();
          if (data.success) setItems(data.data);
          setLoading(false);
     };

     const fetchCategories = async () => {
          const res = await fetch("/api/inventory/lookups?type=category");
          const data = await res.json();
          if (data.success) setCategories(data.data);
     };

     useEffect(() => { fetchItems(); fetchCategories(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const res = await fetch("/api/inventory/items", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          if (res.ok) {
               setIsModalOpen(false);
               setFormData({ name: "", category: "", unit: "", description: "" });
               fetchItems();
          }
     };

     const deleteItem = async (id: string) => {
          if (!confirm("Delete this item from manifest?")) return;
          await fetch(`/api/inventory/items?id=${id}`, { method: "DELETE" });
          fetchItems();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Institutional manifest
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Unified registry of institutional assets and inventory items</p>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              REGISTER ASSET
                         </button>
                    </div>
               </section>

               {/* Table View */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[600px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-8 py-5">Asset identifier</th>
                                        <th className="px-8 py-5">Classification</th>
                                        <th className="px-8 py-5">Availability status</th>
                                        <th className="px-8 py-5">Measurement Unit</th>
                                        <th className="px-8 py-5 text-right">Administrative</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                   ) : items.length > 0 ? (
                                        items.map((item) => (
                                             <tr key={item._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-8 py-7 border-l-4 border-transparent hover:border-success-300 transition-all">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{item.name}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="px-3 py-1 bg-bgray-50 dark:bg-darkblack-500 rounded-lg inline-block">
                                                            <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">{item.category}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                 <span className="text-[11px] font-black dark:text-white leading-none">{item.availableQty} / {item.totalQty}</span>
                                                                 <span className="text-[8px] font-black text-bgray-300 uppercase mt-1">Available Units</span>
                                                            </div>
                                                            <div className={`w-2 h-2 rounded-full ${item.availableQty > 0 ? 'bg-success-300 animate-pulse' : 'bg-red-400'}`}></div>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">{item.unit || "Unitless"}</span>
                                                  </td>
                                                  <td className="px-8 py-7 text-right">
                                                       <button onClick={() => deleteItem(item._id)} className="p-3 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr><td colSpan={5} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">Manifest archive empty</td></tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* Asset Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/50">
                                   <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Manifest registration</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Onboarding new institutional asset to the global manifest</p>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Asset Nomenclature *</label>
                                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Laser Printer" />
                                   </div>
                                   <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Inventory Category *</label>
                                             <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30 text-success-300">
                                                  <option value="">Select Category</option>
                                                  {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Unit of Measurement</label>
                                             <input value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Piece, Box, KG" />
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Technical profile / Description</label>
                                        <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-3xl p-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none" placeholder="Provide technical details about the asset..."></textarea>
                                   </div>
                                   <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-[20px] hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button type="submit" className="px-12 h-14 bg-success-300 text-white font-black rounded-[20px] hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">Commit to manifest</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}