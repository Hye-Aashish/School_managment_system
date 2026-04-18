"use client";
import React, { useState, useEffect } from "react";

export default function BookList() {
     const [books, setBooks] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     const [formData, setFormData] = useState({
          title: "", bookNo: "", isbn: "", publisher: "", author: "",
          subject: "", rackNo: "", qty: 1, price: 0, postDate: new Date().toISOString().split('T')[0],
          description: ""
     });

     const fetchBooks = async () => {
          setLoading(true);
          const res = await fetch("/api/books");
          const data = await res.json();
          if (data.success) setBooks(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchBooks(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const res = await fetch("/api/books", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          if (res.ok) {
               setIsModalOpen(false);
               setFormData({
                    title: "", bookNo: "", isbn: "", publisher: "", author: "",
                    subject: "", rackNo: "", qty: 1, price: 0, postDate: new Date().toISOString().split('T')[0],
                    description: ""
               });
               fetchBooks();
          }
     };

     const deleteBook = async (id: string) => {
          if (!confirm("Delete this book from catalog?")) return;
          await fetch(`/api/books?id=${id}`, { method: "DELETE" });
          fetchBooks();
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Library Catalog
                              </h3>
                              <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Unified repository for institutional literary assets</p>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              REGISTER BOOK
                         </button>
                    </div>
               </section>

               {/* Table View */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] shadow-sm border border-bgray-200 dark:border-darkblack-400 overflow-hidden">
                    <div className="overflow-x-auto min-h-[600px]">
                         <table className="w-full text-left">
                              <thead>
                                   <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-[10px] font-black text-bgray-500 uppercase tracking-widest">
                                        <th className="px-8 py-5">Book Identification</th>
                                        <th className="px-8 py-5">Intellectual Metadata</th>
                                        <th className="px-8 py-5">Inventory Metrics</th>
                                        <th className="px-8 py-5">Storage Unit</th>
                                        <th className="px-8 py-5 text-right">Administrative</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-400">
                                   {loading ? (
                                        <tr><td colSpan={5} className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></td></tr>
                                   ) : books.length > 0 ? (
                                        books.map((b) => (
                                             <tr key={b._id} className="hover:bg-bgray-50/50 transition-colors group">
                                                  <td className="px-8 py-7 border-l-4 border-transparent hover:border-success-300 transition-all">
                                                       <div className="flex flex-col">
                                                            <span className="text-xs font-black text-bgray-900 dark:text-white uppercase tracking-tighter">{b.title}</span>
                                                            <span className="text-[9px] font-black text-bgray-300 uppercase mt-1 tracking-widest">NO: {b.bookNo} | ISBN: {b.isbn || "N/A"}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-success-300 uppercase tracking-widest">{b.author || "Unknown Author"}</span>
                                                            <span className="text-[9px] font-bold text-bgray-400 uppercase mt-1">{b.publisher || "N/A"}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <div className="flex items-center gap-3">
                                                            <div className="px-3 py-1 bg-bgray-50 dark:bg-darkblack-500 rounded-lg">
                                                                 <span className="text-[10px] font-black text-bgray-700 dark:text-bgray-200">{b.availableQty} / {b.qty}</span>
                                                            </div>
                                                            <div className={`w-2 h-2 rounded-full ${b.availableQty > 0 ? 'bg-success-300 animate-pulse' : 'bg-red-400'}`}></div>
                                                       </div>
                                                  </td>
                                                  <td className="px-8 py-7">
                                                       <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Rack: {b.rackNo || "N/A"}</span>
                                                  </td>
                                                  <td className="px-8 py-7 text-right">
                                                       <button onClick={() => deleteBook(b._id)} className="p-3 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-bgray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr><td colSpan={5} className="py-32 text-center opacity-10 font-black uppercase text-xs tracking-widest">Literary archive empty</td></tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </section>

               {/* Add Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/50">
                                   <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Literary Asset Registration</h3>
                                   <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Onboarding new literary material to institutional catalog</p>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">
                                   <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Book Title *</label>
                                             <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Advanced Calculus" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Book Number (Unique ID) *</label>
                                             <input required value={formData.bookNo} onChange={e => setFormData({...formData, bookNo: e.target.value})} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black text-success-300" placeholder="LIB-1001" />
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-3 gap-8 pb-8 border-b border-dashed border-bgray-100 dark:border-darkblack-400">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Author</label>
                                             <input value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">ISBN</label>
                                             <input value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Rack Location</label>
                                             <input value={formData.rackNo} onChange={e => setFormData({...formData, rackNo: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-3 gap-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Quantity *</label>
                                             <input type="number" required value={formData.qty} onChange={e => setFormData({...formData, qty: parseInt(e.target.value)})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Unit Price</label>
                                             <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Catalog Date</label>
                                             <input type="date" value={formData.postDate} onChange={e => setFormData({...formData, postDate: e.target.value})} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black" />
                                        </div>
                                   </div>

                                   <div className="flex justify-end gap-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-[20px] hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button type="submit" className="px-12 h-14 bg-success-300 text-white font-black rounded-[20px] hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">Commit to Catalog</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}
