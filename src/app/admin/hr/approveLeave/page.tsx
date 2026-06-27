"use client";
import React, { useState } from "react";

export default function ApproveLeaveRequest() {
     const [openFilter, setOpenFilter] = useState<"export" | null>(null);

     const toggleFilter = (type: "export") => {
          setOpenFilter(openFilter === type ? null : type);
     };

     const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
     const [staffList, setStaffList] = useState<any[]>([]);
     const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);

     // Fetch data on mount
     React.useEffect(() => {
          const fetchData = async () => {
               try {
                    const [leavesRes, staffRes, typesRes] = await Promise.all([
                         fetch("/api/staff-leave"),
                         fetch("/api/staff"),
                         fetch("/api/leave-type")
                    ]);
                    const leavesJson = await leavesRes.json();
                    const staffJson = await staffRes.json();
                    const typesJson = await typesRes.json();
                    
                    if (leavesJson.success && leavesJson.data) {
                         setLeaveRequests(leavesJson.data);
                    }
                    if (staffJson.success && staffJson.data) {
                         setStaffList(staffJson.data);
                    }
                    if (typesJson.success && typesJson.data) {
                         setLeaveTypes(typesJson.data);
                         if (typesJson.data.length > 0) {
                              setAddLeaveType(typesJson.data[0].name);
                         }
                    }
               } catch (error) {
                    console.error("Error fetching data:", error);
               } finally {
                    setLoading(false);
               }
          };
          fetchData();
     }, []);

     const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
     const [showDetails, setShowDetails] = useState(false);
     const [showAddModal, setShowAddModal] = useState(false);

     // Add Leave Form States
     const [addStaff, setAddStaff] = useState("");
     const [addLeaveType, setAddLeaveType] = useState("");
     const [addFromDate, setAddFromDate] = useState("");
     const [addToDate, setAddToDate] = useState("");
     const [addReason, setAddReason] = useState("");

     const calculateDays = (from: string, to: string) => {
          if (!from || !to) return 1;
          const d1 = new Date(from);
          const d2 = new Date(to);
          const diffTime = Math.abs(d2.getTime() - d1.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          return diffDays;
     };

     const handleAddLeave = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!addStaff || !addFromDate || !addToDate) return;
          const days = calculateDays(addFromDate, addToDate);
          
          const newRequest = {
               staff: addStaff,
               leaveType: addLeaveType,
               fromDate: new Date(addFromDate),
               toDate: new Date(addToDate),
               days,
               reason: addReason
          };

          try {
               const res = await fetch("/api/staff-leave", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newRequest)
               });
               const json = await res.json();
               if (json.success && json.data) {
                    setLeaveRequests([json.data, ...leaveRequests]);
                    setShowAddModal(false);
                    setAddStaff("");
                    if (leaveTypes.length > 0) {
                         setAddLeaveType(leaveTypes[0].name);
                    } else {
                         setAddLeaveType("");
                    }
                    setAddFromDate("");
                    setAddToDate("");
                    setAddReason("");
               } else {
                    alert(json.error || "Failed to add leave request");
               }
          } catch (error) {
               console.error("Error adding leave request:", error);
               alert("An error occurred");
          }
     };

     const handleStatusChange = async (id: string, newStatus: "Approved" | "Pending" | "Disapproved") => {
          try {
               const res = await fetch("/api/staff-leave", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, status: newStatus })
               });
               const json = await res.json();
               if (json.success && json.data) {
                    setLeaveRequests(prev => prev.map(r => r._id === id ? json.data : r));
                    if (selectedRequest && selectedRequest._id === id) {
                         setSelectedRequest(json.data);
                    }
               } else {
                    alert(json.error || "Failed to update status");
               }
          } catch (error) {
               console.error("Error updating status:", error);
               alert("An error occurred");
          }
     };

     const handleDelete = async (id: string) => {
          if (confirm("Are you sure you want to delete this leave request?")) {
               try {
                    const res = await fetch(`/api/staff-leave?id=${id}`, {
                         method: "DELETE"
                    });
                    const json = await res.json();
                    if (json.success) {
                         setLeaveRequests(prev => prev.filter(r => r._id !== id));
                    } else {
                         alert(json.error || "Failed to delete");
                    }
               } catch (error) {
                    console.error("Error deleting:", error);
                    alert("An error occurred");
               }
          }
     };

     return (
          <>
               <div className="w-full space-y-6">
                    {/* Leave Request Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex flex-col space-y-5">
                              {/* Search and Export */}
                              <div className="w-full flex h-14 space-x-4">
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
                                             className="w-full h-full rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 relative dark:bg-darkblack-500"
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
                                             className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "export" ? "block" : "hidden"
                                                  }`}
                                        >
                                             <ul>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                       Copy
                                                  </li>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                       Excel
                                                  </li>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                       CSV
                                                  </li>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                       PDF
                                                  </li>
                                                  <li className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold">
                                                       Print
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>

                                   <button
                                        type="button"
                                        onClick={() => setShowAddModal(true)}
                                        className="px-6 py-2.5 text-sm font-semibold text-white text-nowrap bg-success-300 hover:bg-success-400 dark:bg-success-300 dark:hover:bg-success-400 rounded transition-all shadow-md shadow-success-300/10 uppercase tracking-wider font-bold"
                                   >
                                        Add Leave Request
                                   </button>
                              </div>

                              {/* Table */}
                              <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Staff
                                                            </span>
                                                            <span>
                                                                 <svg
                                                                      width="14"
                                                                      height="15"
                                                                      viewBox="0 0 14 15"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Leave Type
                                                            </span>
                                                            <span>
                                                                 <svg
                                                                      width="14"
                                                                      height="15"
                                                                      viewBox="0 0 14 15"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Leave Date
                                                            </span>
                                                            <span>
                                                                 <svg
                                                                      width="14"
                                                                      height="15"
                                                                      viewBox="0 0 14 15"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Days
                                                            </span>
                                                            <span>
                                                                 <svg
                                                                      width="14"
                                                                      height="15"
                                                                      viewBox="0 0 14 15"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Apply Date
                                                            </span>
                                                            <span>
                                                                 <svg
                                                                      width="14"
                                                                      height="15"
                                                                      viewBox="0 0 14 15"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                                 Status
                                                            </span>
                                                            <span>
                                                                 <svg
                                                                      width="14"
                                                                      height="15"
                                                                      viewBox="0 0 14 15"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                 >
                                                                      <path
                                                                           d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <span className="text-base font-medium text-bgray-600 dark:text-white">
                                                            Action
                                                       </span>
                                                  </td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                              {loading ? (
                                                   <tr>
                                                        <td colSpan={7} className="py-10 text-center text-bgray-500">Loading leave requests...</td>
                                                   </tr>
                                              ) : leaveRequests.length === 0 ? (
                                                   <tr>
                                                        <td colSpan={7} className="py-10 text-center text-bgray-500">No leave requests found.</td>
                                                   </tr>
                                              ) : leaveRequests.map((request) => {
                                                   const staffName = request.staff ? `${request.staff.firstName || ''} ${request.staff.lastName || ''} (${request.staff.staffId || ''})` : "Unknown Staff";
                                                   const leaveDateRange = `${new Date(request.fromDate).toLocaleDateString()} - ${new Date(request.toDate).toLocaleDateString()}`;
                                                   const applyDateStr = request.applyDate ? new Date(request.applyDate).toLocaleDateString() : new Date(request.created_at).toLocaleDateString();

                                                   return (
                                                   <tr
                                                        key={request._id}
                                                        className="border-b border-bgray-300 dark:border-darkblack-400"
                                                   >
                                                        <td className="py-5 px-6 xl:px-0">
                                                             <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                  {staffName}
                                                             </p>
                                                        </td>
                                                        <td className="py-5 px-6 xl:px-0">
                                                             <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                  {request.leaveType}
                                                             </p>
                                                        </td>
                                                        <td className="py-5 px-6 xl:px-0">
                                                             <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                  {leaveDateRange}
                                                             </p>
                                                        </td>
                                                        <td className="py-5 px-6 xl:px-0">
                                                             <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                  {request.days}
                                                             </p>
                                                        </td>
                                                        <td className="py-5 px-6 xl:px-0">
                                                             <p className="font-medium text-base text-bgray-900 dark:text-white">
                                                                  {applyDateStr}
                                                             </p>
                                                        </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <span
                                                                 className={`px-3 py-1.5 text-xs font-semibold text-white rounded ${request.status === "Approved"
                                                                           ? "bg-green-500"
                                                                           : "bg-orange-500"
                                                                      }`}
                                                            >
                                                                 {request.status}
                                                            </span>
                                                       </td>
                                                       <td className="py-5 px-6 xl:px-0">
                                                            <div className="flex items-center space-x-3">
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => { setSelectedRequest(request); setShowDetails(true); }}
                                                                      className="text-bgray-900 dark:text-white hover:text-success-300 transition-colors"
                                                                      title="View Details"
                                                                 >
                                                                      <svg
                                                                           width="18"
                                                                           height="18"
                                                                           viewBox="0 0 18 18"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M2 4H4H16"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M2 7H16"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M2 10H16"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                      </svg>
                                                                 </button>
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => handleDelete(request._id)}
                                                                      className="text-bgray-900 dark:text-white hover:text-red-500 transition-colors"
                                                                      title="Delete"
                                                                 >
                                                                      <svg
                                                                           width="18"
                                                                           height="18"
                                                                           viewBox="0 0 18 18"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                           <path
                                                                                d="M13.5 4.5L4.5 13.5"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                                d="M4.5 4.5L13.5 13.5"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                           />
                                                                           <path
                                                                           d="M10 11V17"
                                                                           stroke="currentColor"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                      <path
                                                                           d="M14 11V17"
                                                                           stroke="currentColor"
                                                                           strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round"
                                                                      />
                                                                 </svg>
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  );
                                        })}
                                   </tbody>
                                   </table>
                              </div>

                              {/* Records Info and Pagination */}
                              <div className="pagination-content w-full">
                                   <div className="w-full flex lg:justify-between justify-center items-center">
                                        <div className="lg:flex hidden">
                                             <p className="text-sm text-bgray-600 dark:text-white">
                                                  Records: {leaveRequests.length}
                                             </p>
                                        </div>
                                        <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                             <button type="button">
                                                  <span>
                                                       <svg
                                                            width="21"
                                                            height="21"
                                                            viewBox="0 0 21 21"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
                                                                 stroke="#A0AEC0"
                                                                 strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  </span>
                                             </button>
                                             <div className="flex items-center">
                                                  <button
                                                       type="button"
                                                       className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-white"
                                                  >
                                                       1
                                                  </button>
                                             </div>
                                             <button type="button">
                                                  <span>
                                                       <svg
                                                            width="21"
                                                            height="21"
                                                            viewBox="0 0 21 21"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
                                                                 stroke="#A0AEC0"
                                                                 strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  </span>
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               
               {/* Leave Details Modal */}
               {showDetails && selectedRequest && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setShowDetails(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[30px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 border border-success-300/10 p-8 space-y-6">
                              <div className="flex justify-between items-center border-b pb-4 border-bgray-100 dark:border-darkblack-400">
                                   <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Leave Request Details</h3>
                                   <button onClick={() => setShowDetails(false)} className="text-bgray-400 hover:text-red-500 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                             <span className="text-bgray-500 dark:text-bgray-400 font-medium">Staff Member</span>
                                             <span className="text-bgray-600 dark:text-white font-medium col-span-2">{selectedRequest?.staff ? `${selectedRequest.staff.firstName || ''} ${selectedRequest.staff.lastName || ''}` : "Unknown"}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                             <span className="text-bgray-500 dark:text-bgray-400 font-medium">Leave Type</span>
                                             <span className="text-bgray-600 dark:text-white font-medium col-span-2">{selectedRequest?.leaveType}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                             <span className="text-bgray-500 dark:text-bgray-400 font-medium">Leave Date</span>
                                             <span className="text-bgray-600 dark:text-white font-medium col-span-2">{selectedRequest ? `${new Date(selectedRequest.fromDate).toLocaleDateString()} - ${new Date(selectedRequest.toDate).toLocaleDateString()}` : ""}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                             <span className="text-bgray-500 dark:text-bgray-400 font-medium">Days</span>
                                             <span className="text-bgray-600 dark:text-white font-medium col-span-2">{selectedRequest?.days}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                             <span className="text-bgray-500 dark:text-bgray-400 font-medium">Apply Date</span>
                                             <span className="text-bgray-600 dark:text-white font-medium col-span-2">{selectedRequest ? (selectedRequest.applyDate ? new Date(selectedRequest.applyDate).toLocaleDateString() : new Date(selectedRequest.created_at).toLocaleDateString()) : ""}</span>
                                        </div>

                                   <div className="space-y-1">
                                        <span className="text-[10px] font-black text-bgray-400 uppercase tracking-widest font-bold">Reason for Leave</span>
                                        <p className="text-sm font-semibold text-bgray-600 dark:text-bgray-300 bg-bgray-50 dark:bg-darkblack-550 p-4 rounded-xl italic">
                                             "{selectedRequest.reason || "Urgent personal business requiring leave of absence."}"
                                        </p>
                                   </div>

                                   <div className="flex justify-between items-center bg-bgray-50 dark:bg-darkblack-550 p-4 rounded-xl">
                                        <span className="text-xs font-bold text-bgray-500 uppercase">Current Status</span>
                                        <span className={`px-3 py-1.5 text-xs font-black rounded uppercase tracking-wider ${
                                             selectedRequest.status === "Approved" ? "bg-green-500 text-white" :
                                             selectedRequest.status === "Pending" ? "bg-orange-500 text-white" : "bg-red-500 text-white"
                                        }`}>
                                             {selectedRequest.status}
                                        </span>
                                   </div>
                              </div>
                              <div className="flex justify-end gap-3 pt-4 border-t border-bgray-100 dark:border-darkblack-400">
                                        <button onClick={() => handleStatusChange(selectedRequest._id, "Pending")} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedRequest?.status === "Pending" ? "bg-orange-500 text-white" : "bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 dark:text-white hover:bg-orange-100 dark:hover:bg-orange-900/20"}`}>Pending</button>
                                        <button onClick={() => handleStatusChange(selectedRequest._id, "Approved")} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedRequest?.status === "Approved" ? "bg-green-500 text-white" : "bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/20"}`}>Approved</button>
                                        <button onClick={() => handleStatusChange(selectedRequest._id, "Disapproved")} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedRequest?.status === "Disapproved" ? "bg-red-500 text-white" : "bg-bgray-100 dark:bg-darkblack-500 text-bgray-600 dark:text-white hover:bg-red-100 dark:hover:bg-red-900/20"}`}>Disapproved</button>
                                   <button 
                                        onClick={() => setShowDetails(false)}
                                        className="px-6 h-12 bg-bgray-200 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-300 font-black rounded-xl hover:bg-bgray-300 transition-all text-xs uppercase tracking-widest"
                                   >
                                        Close
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {/* Add Leave Request Modal */}
               {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[35px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200 border border-success-300/10">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50/50">
                                   <div>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Add Leave Request</h3>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest">Onboard a new leave request for approval</p>
                                   </div>
                                   <button onClick={() => setShowAddModal(false)} className="text-bgray-400 hover:text-red-500 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                   </button>
                              </div>
                              <form onSubmit={handleAddLeave} className="p-6 space-y-4">
                                   <div className="space-y-1">
                                        <label className="text-sm font-semibold text-bgray-600 dark:text-white">Staff *</label>
                                        <select
                                             required
                                             value={addStaff}
                                             onChange={(e) => setAddStaff(e.target.value)}
                                             className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white outline-none focus:ring-2 focus:ring-success-300"
                                        >
                                             <option value="">Select Staff</option>
                                             {staffList.map((staff) => (
                                                  <option key={staff._id} value={staff._id}>
                                                       {staff.firstName} {staff.lastName} ({staff.staffId})
                                                  </option>
                                             ))}
                                        </select>
                                   </div>
                                   <div className="space-y-1">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">Leave Type *</label>
                                        <select 
                                             value={addLeaveType} 
                                             onChange={e => setAddLeaveType(e.target.value)} 
                                             className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        >
                                             {leaveTypes.length === 0 ? (
                                                  <option value="">No Leave Types</option>
                                             ) : (
                                                  leaveTypes.map((type) => (
                                                       <option key={type._id} value={type.name}>{type.name}</option>
                                                  ))
                                             )}
                                        </select>
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">From Date *</label>
                                             <input 
                                                  type="date" 
                                                  required 
                                                  value={addFromDate} 
                                                  onChange={e => setAddFromDate(e.target.value)}
                                                  className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             />
                                        </div>
                                        <div className="space-y-1">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">To Date *</label>
                                             <input 
                                                  type="date" 
                                                  required 
                                                  value={addToDate} 
                                                  onChange={e => setAddToDate(e.target.value)}
                                                  className="w-full h-11 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             />
                                        </div>
                                   </div>
                                   <div className="space-y-1">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block font-bold">Reason</label>
                                        <textarea 
                                             value={addReason} 
                                             onChange={e => setAddReason(e.target.value)}
                                             placeholder="Write reason for leave request..."
                                             rows={3}
                                             className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-xl p-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        />
                                   </div>
                                   <div className="flex justify-end gap-3 pt-4 border-t border-bgray-100 dark:border-darkblack-400">
                                        <button 
                                             type="button" 
                                             onClick={() => setShowAddModal(false)} 
                                             className="px-6 h-12 bg-bgray-200 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-300 font-black rounded-xl hover:bg-bgray-300 transition-all text-xs uppercase tracking-widest"
                                        >
                                             Discard
                                        </button>
                                        <button 
                                             type="submit" 
                                             className="px-8 h-12 bg-success-300 hover:bg-success-400 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-success-300/25"
                                        >
                                             Save Request
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </>
     );
}