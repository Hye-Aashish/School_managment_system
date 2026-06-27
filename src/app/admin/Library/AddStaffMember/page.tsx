"use client";
import React, { useState, useEffect } from "react";
import { handleExport, ExportType } from "@/lib/export-utils";

export default function StaffMembersList() {
     const [openFilter, setOpenFilter] = useState<"action" | "pagination" | "export" | null>(null);

     const toggleFilter = (type: "action" | "pagination" | "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const [staffData, setStaffData] = useState<any[]>([]);
     const [libraryMembers, setLibraryMembers] = useState<any[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [searchQuery, setSearchQuery] = useState<string>("");

     const filteredStaff = staffData.filter((staff) => {
          if (!searchQuery) return true;
          const lowerQuery = searchQuery.toLowerCase();
          const id = staff.staffId || staff.staff_id || "";
          const fname = staff.firstName || staff.fname || "";
          const lname = staff.lastName || staff.lname || "";
          return (
               fname.toLowerCase().includes(lowerQuery) ||
               lname.toLowerCase().includes(lowerQuery) ||
               id.toLowerCase().includes(lowerQuery) ||
               (staff.email && staff.email.toLowerCase().includes(lowerQuery))
          );
     });

     const onExport = (type: ExportType) => {
          const exportData = filteredStaff.map(staff => {
               const id = staff.staffId || staff.staff_id;
               const fname = staff.firstName || staff.fname || "";
               const lname = staff.lastName || staff.lname || "";
               const member = libraryMembers.find(m => m.memberId === id);
               return {
                    "Member ID": id,
                    "Library Card": member ? member.libraryCardNo : "N/A",
                    "Staff Name": `${fname} ${lname}`.trim(),
                    "Email": staff.email || "N/A",
                    "Date Of Birth": staff.dob || "N/A",
                    "Phone": staff.phone || staff.mobile || "N/A"
               };
          });
          handleExport(type, exportData, "Library_Staff_Members");
     };

     const fetchLibraryMembers = async () => {
          const res = await fetch("/api/library-members?memberType=Staff");
          const d = await res.json();
          if (d.success) setLibraryMembers(d.data);
     };

     useEffect(() => {
          fetch("/api/staff").then(r => r.json()).then(d => { 
               if(d.success) setStaffData(d.data);
          });
          fetchLibraryMembers().then(() => setLoading(false));
     }, []);

     const toggleMembership = async (staff: any) => {
          const id = staff.staffId || staff.staff_id;
          const isMember = libraryMembers.find(m => m.memberId === id);
          if (isMember) {
               // Return membership
               await fetch("/api/library-members", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: id, action: "return" })
               });
          } else {
               // Add membership
               await fetch("/api/library-members", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: id, memberType: "Staff" })
               });
          }
          await fetchLibraryMembers();
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="w-full flex h-14 space-x-4">
                                        <div className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px] me-0">
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
                                                            placeholder="Search by name, ID, or email..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                       />
                                                  </label>
                                             </div>
                                        </div>

                                         {/* Export Icons */}
                                         <div className="flex space-x-2">
                                              <button type="button" onClick={() => onExport('copy')} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Copy">
                                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="#718096" strokeWidth="2" fill="none"/>
                                                        <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#718096" strokeWidth="2"/>
                                                   </svg>
                                              </button>
                                              <button type="button" onClick={() => onExport('excel')} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Excel">
                                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#718096" strokeWidth="2"/>
                                                        <path d="M14 2V8H20" stroke="#718096" strokeWidth="2"/>
                                                   </svg>
                                              </button>
                                              <button type="button" onClick={() => onExport('csv')} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="CSV">
                                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#718096" strokeWidth="2"/>
                                                        <path d="M14 2V8H20" stroke="#718096" strokeWidth="2"/>
                                                   </svg>
                                              </button>
                                              <button type="button" onClick={() => onExport('pdf')} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="PDF">
                                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#718096" strokeWidth="2"/>
                                                        <path d="M14 2V8H20" stroke="#718096" strokeWidth="2"/>
                                                   </svg>
                                              </button>
                                              <button type="button" onClick={() => onExport('print')} className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Print">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M6 9V2H18V9" stroke="#718096" strokeWidth="2"/>
                                                       <path d="M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="6" y="14" width="12" height="8" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                             <button type="button" className="h-full w-12 rounded-lg bg-bgray-200 dark:bg-darkblack-500 hover:bg-bgray-300 dark:hover:bg-darkblack-400 transition flex items-center justify-center" title="Column Visibility">
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect x="3" y="3" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="14" y="3" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="3" y="14" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                       <rect x="14" y="14" width="7" height="7" stroke="#718096" strokeWidth="2"/>
                                                  </svg>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Table */}
                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Member ID</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Library Card No.</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Staff Name</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Email</span>
                                                            </div>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="w-full flex space-x-2.5 items-center">
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Date Of Birth</span>
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
                                                                 <span className="text-base font-medium text-bgray-600 dark:text-white">Phone</span>
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
                                                            <td colSpan={7} className="py-24 text-center">
                                                                 <div className="w-8 h-8 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                            </td>
                                                       </tr>
                                                  ) : filteredStaff.length > 0 ? (
                                                       filteredStaff.map((staff) => {
                                                            const id = staff.staffId || staff.staff_id;
                                                            const fname = staff.firstName || staff.fname || "";
                                                            const lname = staff.lastName || staff.lname || "";
                                                            const phone = staff.phone || staff.mobile || "N/A";
                                                            const member = libraryMembers.find(m => m.memberId === id);
                                                            return (
                                                            <tr key={staff._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex items-center space-x-5">
                                                                           <p className="font-semibold text-base text-bgray-900 dark:text-white">
                                                                                {id || "N/A"}
                                                                           </p>
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {member ? member.libraryCardNo : "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {`${fname} ${lname}`.trim() || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {staff.email || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {staff.dob || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                           {phone}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <button
                                                                           type="button"
                                                                           onClick={() => toggleMembership(staff)}
                                                                           className="w-8 h-8 flex items-center justify-center bg-bgray-50 dark:bg-darkblack-500 rounded-lg hover:opacity-70 transition"
                                                                      >
                                                                           {member ? (
                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <path d="M19 12H5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M12 19L5 12L12 5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           ) : (
                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                     <line x1="12" y1="5" x2="12" y2="19" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                                                                                     <line x1="5" y1="12" x2="19" y2="12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                                                                                </svg>
                                                                           )}
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                            )
                                                       })
                                                  ) : (
                                                       <tr>
                                                            <td colSpan={7} className="py-16 text-center text-bgray-400 text-sm font-semibold">
                                                                 No staff found.
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
                                                  <span className="text-bgray-600 dark:text-white text-sm font-semibold">
                                                       Records: 1 to {filteredStaff.length} of {filteredStaff.length}
                                                  </span>
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
                    </section>
               </div>
          </>
     );
}