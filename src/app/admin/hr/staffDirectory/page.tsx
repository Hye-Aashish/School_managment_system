"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function StaffDirectory() {
     const [staff, setStaff] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [roleFilter, setRoleFilter] = useState("All");
     
     const [formData, setFormData] = useState({
          staffId: "", role: "Teacher", designation: "", department: "",
          firstName: "", lastName: "", fatherName: "", motherName: "",
          email: "", gender: "Male", dob: "", dateOfJoining: "",
          phone: "", emergencyContact: "", maritalStatus: "Single",
          currentAddress: "", permanentAddress: "", qualification: "",
          workExperience: ""
     });

     const fetchStaff = async () => {
          setLoading(true);
          const res = await fetch("/api/staff");
          const data = await res.json();
          if (data.success) setStaff(data.data);
          setLoading(false);
     };

     useEffect(() => { fetchStaff(); }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const res = await fetch("/api/staff", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(formData)
          });
          if (res.ok) {
               setIsModalOpen(false);
               fetchStaff();
          }
     };

     const filteredStaff = useMemo(() => {
          return staff.filter(s => {
               const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                   s.staffId.toLowerCase().includes(searchQuery.toLowerCase());
               const matchesRole = roleFilter === "All" || s.role === roleFilter;
               return matchesSearch && matchesRole;
          });
     }, [staff, searchQuery, roleFilter]);

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Controls */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 shrink-0 mr-4 uppercase tracking-tighter">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Staff Repository
                              </h3>
                              <div className="relative w-full lg:w-96">
                                   <input 
                                        type="text" 
                                        placeholder="Search by ID or Name..." 
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full h-11 pl-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black"
                                   />
                                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                   </span>
                              </div>
                              <div className="flex items-center gap-1 bg-bgray-50 dark:bg-darkblack-500 p-1 rounded-xl">
                                   {["All", "Admin", "Teacher", "Accountant"].map(r => (
                                        <button 
                                             key={r} 
                                             onClick={() => setRoleFilter(r)}
                                             className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${roleFilter === r ? "bg-white dark:bg-darkblack-600 text-bgray-900 shadow-sm" : "text-bgray-400"}`}
                                        >
                                             {r}
                                        </button>
                                   ))}
                              </div>
                         </div>
                         <button 
                              onClick={() => setIsModalOpen(true)}
                              className="px-8 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 flex items-center gap-2 shrink-0 uppercase tracking-widest text-[10px]"
                         >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              REGISTER STAFF
                         </button>
                    </div>
               </section>

               {/* Grid View */}
               <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                         <div className="col-span-full py-24 text-center">
                              <div className="w-12 h-12 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-bgray-400">Syncing Staff Records...</p>
                         </div>
                    ) : filteredStaff.length > 0 ? (
                         filteredStaff.map((s) => (
                              <div key={s._id} className="bg-white dark:bg-darkblack-600 rounded-3xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400 hover:shadow-xl hover:shadow-success-300/5 transition-all group relative overflow-hidden">
                                   <div className="absolute top-0 right-0 p-4">
                                        <span className="px-3 py-1 bg-success-300/10 text-success-300 rounded-full text-[9px] font-black uppercase tracking-widest">{s.role}</span>
                                   </div>
                                   <div className="flex flex-col items-center text-center mt-4">
                                        <div className="w-20 h-20 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-gradient-to-br from-success-300/20 to-transparent">
                                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <h4 className="text-base font-black dark:text-white uppercase tracking-tighter">{s.firstName} {s.lastName}</h4>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase mt-1">ID: {s.staffId}</p>
                                        
                                        <div className="grid grid-cols-2 gap-4 w-full mt-6 py-4 border-y border-dashed border-bgray-100 dark:border-darkblack-400">
                                             <div className="text-left">
                                                  <span className="text-[9px] font-black text-bgray-300 uppercase block tracking-widest">Dept</span>
                                                  <span className="text-[10px] font-bold text-bgray-600 dark:text-bgray-200 uppercase">{s.department || "N/A"}</span>
                                             </div>
                                             <div className="text-right">
                                                  <span className="text-[9px] font-black text-bgray-300 uppercase block tracking-widest">Qual</span>
                                                  <span className="text-[10px] font-bold text-bgray-600 dark:text-bgray-200 uppercase">{s.qualification || "N/A"}</span>
                                             </div>
                                        </div>
                                        
                                        <div className="flex gap-2 w-full mt-6">
                                             <button className="flex-1 h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl text-[10px] font-black uppercase text-bgray-500 hover:bg-success-300 hover:text-white transition-all">Profile</button>
                                             <button className="w-10 h-10 bg-bgray-50 dark:bg-darkblack-500 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <div className="col-span-full py-32 text-center opacity-20">
                              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                              <p className="text-[12px] font-black uppercase tracking-[0.3em]">No personnel matching criteria</p>
                         </div>
                    )}
               </section>

               {/* Add Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[40px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-success-300/20">
                              <div className="p-8 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/50">
                                   <div>
                                        <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Personnel onboarding</h3>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest">Adding new member to institutional workforce</p>
                                   </div>
                                   <button onClick={() => setIsModalOpen(false)} className="bg-white p-3 rounded-2xl shadow-sm text-bgray-400 hover:text-red-500 transition-colors border border-bgray-200">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                   <div className="grid grid-cols-3 gap-6 mb-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Staff ID *</label>
                                             <input required value={formData.staffId} onChange={e => setFormData({...formData, staffId: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="EMP-101" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Role *</label>
                                             <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                                  <option value="Admin">Admin</option>
                                                  <option value="Teacher">Teacher</option>
                                                  <option value="Accountant">Accountant</option>
                                                  <option value="Librarian">Librarian</option>
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Department</label>
                                             <input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="Science" />
                                        </div>
                                   </div>
                                   
                                   <div className="grid grid-cols-2 gap-6 pb-8 border-b border-bgray-100 dark:border-darkblack-400 mb-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">First Name *</label>
                                             <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Last Name</label>
                                             <input value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-3 gap-6 mb-8">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Email Address</label>
                                             <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Phone Number</label>
                                             <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest">Gender</label>
                                             <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                                  <option value="Male">Male</option>
                                                  <option value="Female">Female</option>
                                             </select>
                                        </div>
                                   </div>

                                   <div className="flex justify-end gap-3 pt-4 border-t border-bgray-100 dark:border-darkblack-400 mt-8">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 h-14 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-2xl hover:bg-bgray-100 transition-all uppercase tracking-widest text-[10px]">Discard</button>
                                        <button type="submit" className="px-12 h-14 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]">Finalize registration</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}