"use client";
import React, { useEffect, useState } from "react";

export default function FeeSearch() {
     const [openFilter, setOpenFilter] = useState<"class" | "section" | "action" | "pagination" | "export" | "feesGroup" | null>(null);
     
     const [classes, setClasses] = useState<string[]>([]);
     const [sections, setSections] = useState<string[]>([]);
     const [feesGroups, setFeesGroups] = useState<any[]>([]);
     const [feeData, setFeeData] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);

     const [selectedClass, setSelectedClass] = useState("Select Class");
     const [selectedSection, setSelectedSection] = useState("Select Section");
     const [selectedFeesGroup, setSelectedFeesGroup] = useState("Select Fees Group");
     const [searchTerm, setSearchTerm] = useState("");

     useEffect(() => {
          const fetchInitial = async () => {
               try {
                    const [cRes, sRes, fgRes] = await Promise.all([
                         fetch("/api/classes"),
                         fetch("/api/sections"),
                         fetch("/api/fees-group")
                    ]);
                    if (cRes.ok) setClasses(await cRes.json());
                    if (sRes.ok) setSections(await sRes.json());
                    if (fgRes.ok) setFeesGroups(await fgRes.json());
               } catch (err) { console.error(err); }
          };
          fetchInitial();
     }, []);

     useEffect(() => {
          if (selectedClass !== "Select Class" && selectedSection !== "Select Section") {
               fetchFeeData();
          }
     }, [selectedClass, selectedSection, selectedFeesGroup, searchTerm]);

     const fetchFeeData = async () => {
          setLoading(true);
          try {
               const query = new URLSearchParams({
                    class: selectedClass,
                    section: selectedSection,
                    search: searchTerm,
                    feesGroup: selectedFeesGroup
               });
               const res = await fetch(`/api/fees-search?${query.toString()}`);
               if (res.ok) {
                    setFeeData(await res.json());
               }
          } catch (err) { console.error(err); }
          finally { setLoading(false); }
     };

     const toggleFilter = (type: "class" | "section" | "action" | "pagination" | "export" | "feesGroup") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Filter Row - Improved Grid Layout */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                                        {/* Search Input */}
                                        <div className="relative">
                                             <input
                                                  type="text"
                                                  placeholder="Search..."
                                                  className="py-3 px-4 pl-10 w-full border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-darkblack-500 dark:text-white"
                                                  value={searchTerm}
                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                             />
                                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bgray-500">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M19.0004 19.0004L14.6534 14.6534C15.6094 13.7004 16.3194 12.5304 16.7844 11.3094C17.2494 10.0894 17.4504 8.8154 17.3774 7.5414C17.3044 6.2664 16.9604 5.0184 16.3634 3.8934C15.7664 2.7684 14.9284 1.8074 13.9144 1.0744C12.9004 0.341401 11.7424 -0.0635994 10.5604 -0.000599401C9.3784 0.0624006 8.2314 0.547401 7.2394 1.3904C6.2474 2.2344 5.4464 3.4014 4.9184 4.7564C4.3904 6.1104 4.1474 7.6024 4.2004 9.0994C4.2534 10.5964 4.6004 12.0614 5.2294 13.3864C5.8584 14.7114 6.7594 15.8644 7.8794 16.7664C9.0004 17.6694 10.2984 18.3094 11.6764 18.6434C13.0544 18.9784 14.4774 19.0004 15.8584 18.7084C17.2394 18.4164 18.5344 17.8174 19.6534 16.9604" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </span>
                                        </div>

                                        {/* Class Dropdown */}
                                        <div className="relative">
                                             <button
                                                  onClick={() => toggleFilter("class")}
                                                  className="flex items-center justify-between w-full py-3 px-4 border border-bgray-300 dark:border-darkblack-400 rounded-lg text-bgray-900 dark:text-white bg-white dark:bg-darkblack-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                             >
                                                  <span className="truncate">{selectedClass}</span>
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M4 6L8 10L12 6" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             {openFilter === "class" && (
                                                  <div className="absolute z-10 mt-2 w-full bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                       <ul className="py-1">
                                                            <li
                                                                 className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer"
                                                                 onClick={() => { setSelectedClass("Select Class"); setOpenFilter(null); }}
                                                            >
                                                                 Select Class
                                                            </li>
                                                            {classes.map((cls) => (
                                                                 <li
                                                                      key={cls}
                                                                      className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer"
                                                                      onClick={() => { setSelectedClass(cls); setOpenFilter(null); }}
                                                                 >
                                                                      {cls}
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             )}
                                        </div>

                                        {/* Section Dropdown */}
                                        <div className="relative">
                                             <button
                                                  onClick={() => toggleFilter("section")}
                                                  className="flex items-center justify-between w-full py-3 px-4 border border-bgray-300 dark:border-darkblack-400 rounded-lg text-bgray-900 dark:text-white bg-white dark:bg-darkblack-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                             >
                                                  <span className="truncate">{selectedSection}</span>
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M4 6L8 10L12 6" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             {openFilter === "section" && (
                                                  <div className="absolute z-10 mt-2 w-full bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                       <ul className="py-1">
                                                            <li
                                                                 className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer"
                                                                 onClick={() => { setSelectedSection("Select Section"); setOpenFilter(null); }}
                                                            >
                                                                 Select Section
                                                            </li>
                                                            {sections.map((sec) => (
                                                                 <li
                                                                      key={sec}
                                                                      className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer"
                                                                      onClick={() => { setSelectedSection(sec); setOpenFilter(null); }}
                                                                 >
                                                                      {sec}
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             )}
                                        </div>

                                        {/* Fees Group Dropdown */}
                                        <div className="relative">
                                             <button
                                                  onClick={() => toggleFilter("feesGroup")}
                                                  className="flex items-center justify-between w-full py-3 px-4 border border-bgray-300 dark:border-darkblack-400 rounded-lg text-bgray-900 dark:text-white bg-white dark:bg-darkblack-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                             >
                                                  <span className="truncate">{selectedFeesGroup}</span>
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M4 6L8 10L12 6" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             {openFilter === "feesGroup" && (
                                                  <div className="absolute z-10 mt-2 w-full bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                       <ul className="py-1">
                                                            <li
                                                                 className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer"
                                                                 onClick={() => { setSelectedFeesGroup("Select Fees Group"); setOpenFilter(null); }}
                                                            >
                                                                 Select Fees Group
                                                            </li>
                                                            {feesGroups.map((group) => (
                                                                 <li
                                                                      key={group._id}
                                                                      className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer"
                                                                      onClick={() => { setSelectedFeesGroup(group.name); setOpenFilter(null); }}
                                                                 >
                                                                      {group.name}
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  </div>
                                             )}
                                        </div>

                                        {/* Export Dropdown */}
                                        <div className="relative">
                                             <button
                                                  onClick={() => toggleFilter("export")}
                                                  className="flex items-center justify-between w-full py-3 px-4 border border-bgray-300 dark:border-darkblack-400 rounded-lg text-bgray-900 dark:text-white bg-white dark:bg-darkblack-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                             >
                                                  Export
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M4 6L8 10L12 6" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </button>
                                             {openFilter === "export" && (
                                                  <div className="absolute z-10 mt-2 w-full bg-white dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-lg shadow-lg">
                                                       <ul className="py-1">
                                                            <li className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer" onClick={() => setOpenFilter(null)}>PDF</li>
                                                            <li className="px-4 py-2 text-bgray-900 dark:text-white hover:bg-bgray-100 dark:hover:bg-darkblack-400 cursor-pointer" onClick={() => setOpenFilter(null)}>Excel</li>
                                                       </ul>
                                                  </div>
                                             )}
                                        </div>
                                   </div>

                                   <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Class</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Admission No</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Student Name</td>
                                                       <td className="py-5 px-6 font-bold text-bgray-900 dark:text-white">Fees Group</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Amount ($)</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Paid ($)</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Discount ($)</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Fine ($)</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Balance ($)</td>
                                                       <td className="py-5 px-6 text-nowrap font-bold text-bgray-900 dark:text-white">Action</td>
                                                  </tr>
                                             </thead>

                                             <tbody>
                                                  {loading ? (
                                                       <tr><td colSpan={10} className="text-center py-10 text-bgray-500">Loading...</td></tr>
                                                  ) : feeData.length === 0 ? (
                                                       <tr><td colSpan={10} className="text-center py-10 text-bgray-500">No data found for selected criteria.</td></tr>
                                                  ) : feeData.map((student) => (
                                                       <tr key={student._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                            <td className="py-5 px-6 align-top text-bgray-900 dark:text-white">Class {student.class}-{student.section}</td>
                                                            <td className="py-5 px-6 align-top text-bgray-900 dark:text-white">{student.admission_no}</td>
                                                            <td className="py-5 px-6 align-top text-bgray-900 dark:text-white">{student.fname} {student.lname}</td>
                                                            <td className="py-5 px-6">
                                                                 <div className="space-y-1 text-xs text-bgray-600 dark:text-bgray-300 italic max-w-sm">
                                                                      <p>{student.feeGroups || "No fees assigned"}</p>
                                                                 </div>
                                                            </td>
                                                            <td className="py-5 px-6 align-top text-bgray-900 dark:text-white font-semibold">{student.totalAmount.toLocaleString()}</td>
                                                            <td className="py-5 px-6 align-top text-success-300 font-semibold">{student.totalPaid.toLocaleString()}</td>
                                                            <td className="py-5 px-6 align-top text-orange-400">{student.totalDiscount.toLocaleString()}</td>
                                                            <td className="py-5 px-6 align-top text-red-400">{student.totalFine.toLocaleString()}</td>
                                                            <td className="py-5 px-6 align-top text-bgray-900 dark:text-white font-bold">{student.balance.toLocaleString()}</td>
                                                            <td className="py-5 px-6 align-top text-nowrap">
                                                                 <button 
                                                                      onClick={() => window.location.href = `/admin/FeesCollection/studentfee/${student._id}`}
                                                                      className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded transition-colors uppercase tracking-tight"
                                                                 >
                                                                      $ Add Fees
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                                   {/* Pagination intentionally kept static as it's secondary to the "dynamic" request */}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}
