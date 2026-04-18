"use client";
import React, { useState, useEffect } from "react";

export default function AddItemStock() {
     const [items, setItems] = useState<any[]>([]);
     const [suppliers, setSuppliers] = useState<any[]>([]);
     const [stores, setStores] = useState<any[]>([]);
     const [stocks, setStocks] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [formData, setFormData] = useState({
          item: "", supplier: "", store: "", qty: 0, 
          purchaseDate: new Date().toISOString().split('T')[0], description: ""
     });

     const fetchData = async () => {
          setLoading(true);
          const [itRes, supRes, stRes, stkRes] = await Promise.all([
               fetch("/api/inventory/items"),
               fetch("/api/inventory/lookups?type=supplier"),
               fetch("/api/inventory/lookups?type=store"),
               fetch("/api/inventory/stock")
          ]);
          const [itData, supData, stData, stkData] = await Promise.all([itRes.json(), supRes.json(), stRes.json(), stkRes.json()]);
          
          if (itData.success) setItems(itData.data);
          if (supData.success) setSuppliers(supData.data);
          if (stData.success) setStores(stData.data);
          if (stkData.success) setStocks(stkData.data);
          setLoading(false);
     };

     useEffect(() => { fetchData(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setSaving(true);
          await fetch("/api/inventory/stock", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          setFormData({ item: "", supplier: "", store: "", qty: 0, purchaseDate: new Date().toISOString().split('T')[0], description: "" });
          fetchData();
          setSaving(false);
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="2xl:flex 2xl:space-x-8">
                    {/* Entry Form */}
                    <section className="2xl:w-[450px] shrink-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-8 uppercase tracking-tighter flex items-center gap-2">
                                   <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                                   Stock replenishment
                              </h3>
                              <form onSubmit={handleSubmit} className="space-y-6">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Target Asset *</label>
                                        <select required value={formData.item} onChange={e => setFormData({...formData, item: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-black border-none outline-none focus:ring-2 focus:ring-orange-300/30">
                                             <option value="">Choose Item</option>
                                             {items.map(i => <option key={i._id} value={i.name}>{i.name}</option>)}
                                        </select>
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Supplier</label>
                                             <select value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30">
                                                  <option value="">Select</option>
                                                  {suppliers.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Storage Unit</label>
                                             <select value={formData.store} onChange={e => setFormData({...formData, store: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30">
                                                  <option value="">Select</option>
                                                  {stores.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                                             </select>
                                        </div>
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Inbound Quantity *</label>
                                             <input type="number" required value={formData.qty} onChange={e => setFormData({...formData, qty: parseInt(e.target.value)})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-black border-none outline-none focus:ring-2 focus:ring-orange-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Acquisition Date</label>
                                             <input type="date" value={formData.purchaseDate} onChange={e => setFormData({...formData, purchaseDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-black border-none outline-none focus:ring-2 focus:ring-orange-300/30 text-orange-400" />
                                        </div>
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Audit Note</label>
                                        <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-2xl p-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30 resize-none" placeholder="Invoice details, condition, etc..."></textarea>
                                   </div>
                                   <button 
                                        disabled={saving}
                                        type="submit" 
                                        className="w-full h-14 bg-orange-400 text-white font-black rounded-2xl hover:bg-orange-500 shadow-xl shadow-orange-400/20 transition-all uppercase tracking-widest text-[10px]"
                                   >
                                        {saving ? "Deploying..." : "Commit replenishment"}
                                   </button>
                              </form>
                         </div>
                    </section>

                    {/* Transaction Log */}
                    <section className="flex-1 mt-8 2xl:mt-0">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/20">
                                   <h4 className="text-[11px] font-black text-bgray-500 uppercase tracking-[0.2em]">Acquisition protocol log</h4>
                                   <div className="px-3 py-1 bg-orange-400/10 rounded-full text-[9px] font-black text-orange-400 uppercase tracking-widest">Inventory sync active</div>
                              </div>
                              <div className="overflow-x-auto min-h-[600px]">
                                   <table className="w-full text-left">
                                        <thead>
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                                  <th className="px-6 py-4">Inbound Asset</th>
                                                  <th className="px-6 py-4">Source & Storage</th>
                                                  <th className="px-6 py-4">Quantity</th>
                                                  <th className="px-6 py-4 text-right">Timestamp</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                             {loading ? (
                                                  <tr><td colSpan={4} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-orange-300/20 border-t-orange-400 rounded-full animate-spin"></div></td></tr>
                                             ) : stocks.length > 0 ? (
                                                  stocks.map((s) => (
                                                       <tr key={s._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                            <td className="px-6 py-6 border-l-4 border-transparent hover:border-orange-400 transition-all">
                                                                 <span className="text-[11px] font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{s.item}</span>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                 <div className="flex flex-col">
                                                                      <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">From: {s.supplier || "Internal"}</span>
                                                                      <span className="text-[9px] font-bold text-orange-400 uppercase mt-1">To: {s.store || "General Store"}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                 <span className="px-3 py-1 bg-bgray-50 dark:bg-darkblack-500 rounded-lg text-[10px] font-black text-bgray-700 dark:text-bgray-200">+{s.qty} UNITS</span>
                                                            </td>
                                                            <td className="px-6 py-6 text-right">
                                                                 <span className="text-[10px] font-bold text-bgray-400 uppercase tracking-tighter">{s.purchaseDate}</span>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr><td colSpan={4} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">No replenishment logs found</td></tr>
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </section>
               </div>
          </div>
     );
}