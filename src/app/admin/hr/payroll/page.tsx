"use client";
import React, { useState, useEffect, useRef } from "react";

interface StaffMember {
     _id: string;
     staffId: string;
     firstName: string;
     lastName: string;
     role: string;
     department: string;
     designation: string;
     phone: string;
     status: string;
     salaryStatus?: "Generated" | "Paid" | "Pending";
     paidMonth?: string;
     paidYear?: string;
     netSalary?: number;
     basicSalary?: number;
     allowance?: number;
     deductions?: number;
     paymentMode?: string;
     note?: string;
}

export default function StaffPayslip() {
     const [staffList, setStaffList] = useState<StaffMember[]>([]);
     const [payslipsList, setPayslipsList] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [activeDropdown, setActiveDropdown] = useState<"role" | "month" | "year" | "export" | null>(null);
     
     // Filter states
     const [selectedRole, setSelectedRole] = useState<string>("All Roles");
     const [selectedMonth, setSelectedMonth] = useState<string>("All Months");
     const [selectedYear, setSelectedYear] = useState<string>("All Years");
     const [searchTerm, setSearchTerm] = useState<string>("All Roles"); // Note: search text

     // Search text
     const [searchQuery, setSearchQuery] = useState<string>("");

     // Modal states
     const [payingStaff, setPayingStaff] = useState<StaffMember | null>(null);
     const [viewingPayslip, setViewingPayslip] = useState<StaffMember | null>(null);
     const [basicSalary, setBasicSalary] = useState<number>(3500);
     const [allowance, setAllowance] = useState<number>(250);
     const [deductions, setDeductions] = useState<number>(100);
     const [paymentMode, setPaymentMode] = useState<string>("Bank Transfer");
     const [note, setNote] = useState<string>("");
     const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

     const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
          setToast({ message, type });
          setTimeout(() => setToast(null), 3000);
     };

     // Dropdown references to close on click outside
     const dropdownRef = useRef<HTMLDivElement>(null);

     const fetchData = async () => {
          try {
               const [staffRes, payrollRes] = await Promise.all([
                    fetch("/api/staff"),
                    fetch("/api/staff/payroll")
               ]);

               let staffData = [];
               let payrollData = [];

               if (staffRes.ok) {
                    const json = await staffRes.json();
                    if (json.success && Array.isArray(json.data)) {
                         staffData = json.data;
                    }
               }

               if (payrollRes.ok) {
                    const json = await payrollRes.json();
                    if (json.success && Array.isArray(json.data)) {
                         payrollData = json.data;
                    }
               }

               setPayslipsList(payrollData);
               setStaffList(staffData);
          } catch (err) {
               console.error("Error fetching payroll data:", err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     // Close dropdowns on outside click
     useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setActiveDropdown(null);
               }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     // Toggle dropdown state
     const toggleDropdown = (dropdown: "role" | "month" | "year" | "export") => {
          setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
     };

     // Handle export operations
     const handleExport = (type: string) => {
          showToast(`Exporting table as ${type}...`, "info");
          setActiveDropdown(null);
     };

     // Dynamically extract unique roles from staff list
     const roles = ["All Roles", ...Array.from(new Set(staffList.map((s) => s.role).filter(Boolean)))];

     const months = [
          "All Months",
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
     ];

     const years = ["All Years", "2024", "2025", "2026", "2027"];

     // Filtered staff list
     const filteredStaff = staffList.map((staff) => {
          // Find if there is a payslip matching selectedMonth & selectedYear
          const matchingPayslip = payslipsList.find((p: any) => {
               const staffIdMatch = p.staff?._id ? (p.staff._id === staff._id) : (p.staff === staff._id);
               if (!staffIdMatch) return false;
               
               const monthMatch = selectedMonth === "All Months" || p.month === selectedMonth;
               const yearMatch = selectedYear === "All Years" || p.year === selectedYear;
               
               return monthMatch && yearMatch;
          });

          return {
               ...staff,
               salaryStatus: matchingPayslip ? matchingPayslip.status : "Pending",
               paidMonth: matchingPayslip ? matchingPayslip.month : undefined,
               paidYear: matchingPayslip ? matchingPayslip.year : undefined,
               netSalary: matchingPayslip ? matchingPayslip.netSalary : undefined,
               basicSalary: matchingPayslip ? matchingPayslip.basicSalary : undefined,
               allowance: matchingPayslip ? matchingPayslip.allowance : undefined,
               deductions: matchingPayslip ? matchingPayslip.deductions : undefined,
               paymentMode: matchingPayslip ? matchingPayslip.paymentMode : undefined,
               note: matchingPayslip ? matchingPayslip.note : undefined
          };
     }).filter((staff) => {
          const fullName = `${staff.firstName || ""} ${staff.lastName || ""}`.toLowerCase();
          const matchesSearch = 
               fullName.includes(searchQuery.toLowerCase()) || 
               (staff.staffId && staff.staffId.toLowerCase().includes(searchQuery.toLowerCase())) ||
               (staff.designation && staff.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
               (staff.department && staff.department.toLowerCase().includes(searchQuery.toLowerCase()));
          
          const matchesRole = selectedRole === "All Roles" || staff.role === selectedRole;
          
          return matchesSearch && matchesRole;
     });

     // Proceed to Pay
     const handleOpenPayModal = (staff: StaffMember) => {
          setPayingStaff(staff);
          // Pre-populate sensible defaults
          setBasicSalary(3500);
          setAllowance(250);
          setDeductions(100);
          setPaymentMode("Bank Transfer");
          setNote("");
     };

     const handleGeneratePayslip = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!payingStaff) return;

          const calculatedNet = basicSalary + allowance - deductions;

          try {
               const res = await fetch("/api/staff/payroll", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         staffId: payingStaff._id,
                         month: selectedMonth === "All Months" ? "May" : selectedMonth,
                         year: selectedYear === "All Years" ? "2026" : selectedYear,
                         basicSalary,
                         allowance,
                         deductions,
                         netSalary: calculatedNet,
                         paymentMode,
                         note
                    })
               });

               if (res.ok) {
                    const json = await res.json();
                    if (json.success) {
                         showToast(`Payslip of $${calculatedNet} successfully generated for ${payingStaff.firstName} ${payingStaff.lastName}!`, "success");
                         fetchData();
                    } else {
                         showToast(json.error || "Failed to generate payslip", "error");
                    }
               } else {
                    showToast("Failed to connect to payroll API", "error");
               }
          } catch (err) {
               showToast("An error occurred during payroll generation", "error");
          }

          setPayingStaff(null);
     };

     return (
          <>
               <div className="w-full space-y-6" ref={dropdownRef}>
                    {/* Staff List Section */}
                    <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                              Staff Payroll Directory
                         </h3>

                         <div className="flex flex-col space-y-5">
                              {/* Search and Dropdowns */}
                              <div className="w-full flex flex-col md:flex-row gap-4 h-auto md:h-14">
                                   {/* Search Input */}
                                   <div className="flex-1 border border-transparent focus-within:border-success-300 h-14 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
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
                                                       value={searchQuery}
                                                       onChange={(e) => setSearchQuery(e.target.value)}
                                                       placeholder="Search by name, ID, department..."
                                                       className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                                                  />
                                             </label>
                                        </div>
                                   </div>

                                   {/* Role Dropdown */}
                                   <div className="relative md:w-48">
                                        <button
                                             type="button"
                                             className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 dark:bg-darkblack-500 text-left"
                                             onClick={() => toggleDropdown("role")}
                                        >
                                             <span className="text-base text-bgray-700 dark:text-bgray-200 text-nowrap truncate">
                                                  {selectedRole}
                                             </span>
                                             <span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </span>
                                        </button>
                                        {activeDropdown === "role" && (
                                             <div className="rounded-lg w-full max-h-60 overflow-y-auto shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-20 top-15 border border-bgray-200 dark:border-darkblack-400">
                                                  <ul>
                                                       {roles.map((role) => (
                                                            <li
                                                                 key={role}
                                                                 onClick={() => { setSelectedRole(role); setActiveDropdown(null); }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2.5 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {role}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        )}
                                    </div>

                                   {/* Month Dropdown */}
                                   <div className="relative md:w-44">
                                        <button
                                             type="button"
                                             className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 dark:bg-darkblack-500 text-left"
                                             onClick={() => toggleDropdown("month")}
                                        >
                                             <span className="text-base text-bgray-700 dark:text-bgray-200 text-nowrap">
                                                  {selectedMonth}
                                             </span>
                                             <span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </span>
                                        </button>
                                        {activeDropdown === "month" && (
                                             <div className="rounded-lg w-full max-h-60 overflow-y-auto shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-20 top-15 border border-bgray-200 dark:border-darkblack-400">
                                                  <ul>
                                                       {months.map((month) => (
                                                            <li
                                                                 key={month}
                                                                 onClick={() => { setSelectedMonth(month); setActiveDropdown(null); }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2.5 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {month}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        )}
                                   </div>

                                   {/* Year Dropdown */}
                                   <div className="relative md:w-36">
                                        <button
                                             type="button"
                                             className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 dark:bg-darkblack-500 text-left"
                                             onClick={() => toggleDropdown("year")}
                                        >
                                             <span className="text-base text-bgray-700 dark:text-bgray-200 text-nowrap">
                                                  {selectedYear}
                                             </span>
                                             <span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </span>
                                        </button>
                                        {activeDropdown === "year" && (
                                             <div className="rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-20 top-15 border border-bgray-200 dark:border-darkblack-400">
                                                  <ul>
                                                       {years.map((year) => (
                                                            <li
                                                                 key={year}
                                                                 onClick={() => { setSelectedYear(year); setActiveDropdown(null); }}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2.5 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {year}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        )}
                                   </div>

                                   {/* Export Dropdown */}
                                   <div className="relative md:w-36">
                                        <button
                                             type="button"
                                             className="w-full h-14 rounded-lg bg-bgray-200 px-4 flex justify-between items-center space-x-3 dark:bg-darkblack-500 text-left"
                                             onClick={() => toggleDropdown("export")}
                                        >
                                             <span className="text-base text-bgray-700 dark:text-bgray-200 text-nowrap">Export</span>
                                             <span>
                                                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                       <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                             </span>
                                        </button>
                                        {activeDropdown === "export" && (
                                             <div className="rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-15 border border-bgray-200 dark:border-darkblack-400">
                                                  <ul>
                                                       {["Copy", "Excel", "CSV", "PDF", "Print"].map((type) => (
                                                            <li
                                                                 key={type}
                                                                 onClick={() => handleExport(type)}
                                                                 className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2.5 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-semibold"
                                                            >
                                                                 {type}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        )}
                                   </div>
                              </div>

                              {/* Table Content */}
                              <div className="table-content w-full min-h-[52vh] overflow-x-auto">
                                   {loading ? (
                                        <div className="w-full py-20 flex justify-center items-center">
                                             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-success-300"></div>
                                        </div>
                                   ) : filteredStaff.length === 0 ? (
                                        <div className="w-full py-20 text-center text-bgray-500">
                                             No staff members found matching criteria.
                                        </div>
                                   ) : (
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Staff ID</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Name</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Role</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Department</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Designation</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Phone</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100">Status</td>
                                                       <td className="py-5 px-4 font-bold text-bgray-700 dark:text-bgray-100 text-center">Action</td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {filteredStaff.map((staff) => (
                                                       <tr
                                                            key={staff._id}
                                                            className="border-b border-bgray-250 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-550 transition-colors"
                                                       >
                                                            <td className="py-5 px-4 font-medium text-base text-bgray-900 dark:text-white">
                                                                 {staff.staffId}
                                                            </td>
                                                            <td className="py-5 px-4 font-medium text-base text-bgray-900 dark:text-white">
                                                                 {staff.firstName} {staff.lastName}
                                                            </td>
                                                            <td className="py-5 px-4 font-medium text-base text-bgray-900 dark:text-white">
                                                                 {staff.role}
                                                            </td>
                                                            <td className="py-5 px-4 font-medium text-base text-bgray-900 dark:text-white">
                                                                 {staff.department || "N/A"}
                                                            </td>
                                                            <td className="py-5 px-4 font-medium text-base text-bgray-900 dark:text-white">
                                                                 {staff.designation || "N/A"}
                                                            </td>
                                                            <td className="py-5 px-4 font-medium text-base text-bgray-900 dark:text-white">
                                                                 {staff.phone || "N/A"}
                                                            </td>
                                                            <td className="py-5 px-4">
                                                                 <span className={`px-3 py-1.5 text-xs font-semibold text-white rounded ${
                                                                      staff.salaryStatus === "Generated" 
                                                                           ? "bg-green-500" 
                                                                           : staff.salaryStatus === "Paid"
                                                                           ? "bg-blue-500"
                                                                           : "bg-orange-500"
                                                                 }`}>
                                                                      {staff.salaryStatus || "Pending"}
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-4 text-center">
                                                                 <div className="flex items-center justify-center space-x-3">
                                                                      {staff.salaryStatus === "Generated" ? (
                                                                           <button
                                                                                type="button"
                                                                                onClick={() => setViewingPayslip(staff)}
                                                                                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded transition-all shadow-sm"
                                                                           >
                                                                                View Payslip
                                                                           </button>
                                                                      ) : (
                                                                           <button
                                                                                type="button"
                                                                                onClick={() => handleOpenPayModal(staff)}
                                                                                className="px-4 py-1.5 text-xs font-semibold text-white bg-success-300 hover:bg-success-400 rounded transition-all shadow-sm"
                                                                           >
                                                                                Proceed To Pay
                                                                           </button>
                                                                      )}
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Proceed To Pay Modal */}
               {payingStaff && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4 transition-all">
                         <div className="w-full max-w-xl bg-white dark:bg-darkblack-600 rounded-xl shadow-2xl overflow-hidden border border-bgray-250 dark:border-darkblack-400">
                              <div className="px-6 py-4 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center bg-bgray-50 dark:bg-darkblack-550">
                                   <h4 className="text-lg font-bold text-bgray-900 dark:text-white">
                                        Process Payroll - {payingStaff.firstName} {payingStaff.lastName}
                                   </h4>
                                   <button 
                                        type="button" 
                                        onClick={() => setPayingStaff(null)}
                                        className="text-bgray-500 dark:text-bgray-300 hover:text-red-500"
                                   >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                   </button>
                              </div>

                              <form onSubmit={handleGeneratePayslip} className="p-6 space-y-4">
                                   {/* Staff details row */}
                                   <div className="grid grid-cols-2 gap-4 p-3 bg-bgray-100 dark:bg-darkblack-500 rounded-lg text-sm">
                                        <div>
                                             <span className="text-bgray-500">Staff ID:</span>
                                             <p className="font-semibold text-bgray-900 dark:text-white">{payingStaff.staffId}</p>
                                        </div>
                                        <div>
                                             <span className="text-bgray-500">Role:</span>
                                             <p className="font-semibold text-bgray-900 dark:text-white">{payingStaff.role}</p>
                                        </div>
                                        <div>
                                             <span className="text-bgray-500">Department:</span>
                                             <p className="font-semibold text-bgray-900 dark:text-white">{payingStaff.department || "N/A"}</p>
                                        </div>
                                        <div>
                                             <span className="text-bgray-500">Designation:</span>
                                             <p className="font-semibold text-bgray-900 dark:text-white">{payingStaff.designation || "N/A"}</p>
                                        </div>
                                   </div>

                                   {/* Input fields */}
                                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                             <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-300 mb-1">
                                                  Basic Salary ($)
                                             </label>
                                             <input 
                                                  type="number" 
                                                  value={basicSalary}
                                                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                                                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-darkblack-400 focus:outline-none focus:ring-1 focus:ring-success-300 text-bgray-900 dark:text-white"
                                                  required
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-300 mb-1">
                                                  Allowance ($)
                                             </label>
                                             <input 
                                                  type="number" 
                                                  value={allowance}
                                                  onChange={(e) => setAllowance(Number(e.target.value))}
                                                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-darkblack-400 focus:outline-none focus:ring-1 focus:ring-success-300 text-bgray-900 dark:text-white"
                                                  required
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-300 mb-1">
                                                  Deductions ($)
                                             </label>
                                             <input 
                                                  type="number" 
                                                  value={deductions}
                                                  onChange={(e) => setDeductions(Number(e.target.value))}
                                                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-darkblack-400 focus:outline-none focus:ring-1 focus:ring-success-300 text-bgray-900 dark:text-white"
                                                  required
                                             />
                                        </div>
                                   </div>

                                   {/* Net Salary Display */}
                                   <div className="p-4 bg-success-50 dark:bg-darkblack-550 border border-success-300 rounded-lg flex justify-between items-center">
                                        <span className="font-bold text-success-400 text-base">Net Calculated Salary:</span>
                                        <span className="font-bold text-success-400 text-xl">${basicSalary + allowance - deductions}</span>
                                   </div>

                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                             <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-300 mb-1">
                                                  Payment Mode
                                             </label>
                                             <select 
                                                  value={paymentMode} 
                                                  onChange={(e) => setPaymentMode(e.target.value)}
                                                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-darkblack-400 focus:outline-none focus:ring-1 focus:ring-success-300 text-bgray-900 dark:text-white dark:bg-darkblack-600"
                                             >
                                                  <option value="Bank Transfer">Bank Transfer</option>
                                                  <option value="Cash">Cash</option>
                                                  <option value="Cheque">Cheque</option>
                                                  <option value="Online">Online</option>
                                             </select>
                                        </div>
                                        <div>
                                             <label className="block text-sm font-semibold text-bgray-600 dark:text-bgray-300 mb-1">
                                                  Note
                                             </label>
                                             <input 
                                                  type="text" 
                                                  value={note}
                                                  onChange={(e) => setNote(e.target.value)}
                                                  placeholder="e.g. Regular payment"
                                                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-darkblack-400 focus:outline-none focus:ring-1 focus:ring-success-300 text-bgray-900 dark:text-white"
                                             />
                                        </div>
                                   </div>

                                   {/* Footer buttons */}
                                   <div className="flex justify-end space-x-3 pt-4 border-t border-bgray-200 dark:border-darkblack-400">
                                        <button 
                                             type="button" 
                                             onClick={() => setPayingStaff(null)}
                                             className="px-5 py-2 text-sm font-semibold text-bgray-700 bg-bgray-200 rounded-lg hover:bg-bgray-300 transition-colors"
                                        >
                                             Cancel
                                        </button>
                                        <button 
                                             type="submit" 
                                             className="px-5 py-2 text-sm font-semibold text-white bg-success-300 hover:bg-success-400 rounded-lg transition-colors shadow"
                                        >
                                             Generate Payslip
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}

                {/* View Payslip Preview Modal */}
                {viewingPayslip && (
                     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4 transition-all">
                           <div className="w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-white dark:bg-darkblack-600 rounded-2xl shadow-2xl border border-bgray-250 dark:border-darkblack-400 p-6 md:p-8 space-y-4 relative scrollbar-thin">
                               {/* Close button */}
                               <button 
                                    onClick={() => setViewingPayslip(null)}
                                    className="absolute top-5 right-5 text-bgray-500 dark:text-bgray-400 hover:text-bgray-700 dark:hover:text-white"
                               >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                               </button>

                               {/* Printable Slip Area */}
                               <div id="printable-payslip" className="space-y-4">
                                    {/* Header */}
                                    <div className="flex justify-between items-start border-b pb-4 border-bgray-200 dark:border-darkblack-400">
                                         <div>
                                              <h2 className="text-2xl font-black text-success-350 dark:text-success-300">SCHOOLSYS</h2>
                                              <p className="text-xs text-bgray-500 dark:text-bgray-400 uppercase tracking-wider font-bold">Institutional Hub & Admin Panel</p>
                                         </div>
                                         <div className="text-right">
                                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white">SALARY PAYSLIP</h3>
                                              <p className="text-sm font-semibold text-indigo-500">{viewingPayslip.paidMonth} {viewingPayslip.paidYear}</p>
                                         </div>
                                    </div>

                                    {/* Staff Information */}
                                    <div className="grid grid-cols-2 gap-4 text-sm bg-bgray-50 dark:bg-darkblack-550 p-4 rounded-xl">
                                         <div>
                                              <p className="text-bgray-500 dark:text-bgray-400 font-medium">Employee Name:</p>
                                              <p className="font-bold text-bgray-950 dark:text-white">{viewingPayslip.firstName} {viewingPayslip.lastName}</p>
                                         </div>
                                         <div>
                                              <p className="text-bgray-500 dark:text-bgray-400 font-medium">Employee ID:</p>
                                              <p className="font-bold text-bgray-950 dark:text-white">{viewingPayslip.staffId}</p>
                                         </div>
                                         <div>
                                              <p className="text-bgray-500 dark:text-bgray-400 font-medium">Role / Department:</p>
                                              <p className="font-bold text-bgray-950 dark:text-white capitalize">{viewingPayslip.role} / {viewingPayslip.department || "N/A"}</p>
                                         </div>
                                         <div>
                                              <p className="text-bgray-500 dark:text-bgray-400 font-medium">Designation:</p>
                                              <p className="font-bold text-bgray-950 dark:text-white">{viewingPayslip.designation || "N/A"}</p>
                                         </div>
                                    </div>

                                    {/* Breakdown Table */}
                                    <div className="border border-bgray-200 dark:border-darkblack-400 rounded-xl overflow-hidden">
                                         <table className="w-full text-sm">
                                              <thead>
                                                   <tr className="bg-bgray-150 dark:bg-darkblack-500 border-b border-bgray-200 dark:border-darkblack-400 text-bgray-900 dark:text-white font-bold">
                                                        <th className="py-3 px-4 text-left">Description</th>
                                                        <th className="py-3 px-4 text-right">Amount ($)</th>
                                                   </tr>
                                              </thead>
                                              <tbody className="divide-y divide-bgray-200 dark:divide-darkblack-400 text-bgray-900 dark:text-white">
                                                   <tr>
                                                        <td className="py-3 px-4">Basic Salary</td>
                                                        <td className="py-3 px-4 text-right font-semibold">${viewingPayslip.basicSalary || 0}</td>
                                                   </tr>
                                                   <tr>
                                                        <td className="py-3 px-4">Allowance</td>
                                                        <td className="py-3 px-4 text-right font-semibold text-emerald-500">+${viewingPayslip.allowance || 0}</td>
                                                   </tr>
                                                   <tr>
                                                        <td className="py-3 px-4">Deductions</td>
                                                        <td className="py-3 px-4 text-right font-semibold text-red-500">-${viewingPayslip.deductions || 0}</td>
                                                   </tr>
                                              </tbody>
                                         </table>
                                    </div>

                                    {/* Total Banner */}
                                    <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                                         <span className="text-base font-bold text-bgray-900 dark:text-white">Net Calculated Salary</span>
                                         <span className="text-2xl font-black text-indigo-500">${viewingPayslip.netSalary}</span>
                                    </div>

                                    {/* Note & Signature */}
                                    <div className="flex justify-between items-end pt-4">
                                         <div className="w-1/2">
                                              <p className="text-xs text-bgray-500 dark:text-bgray-400 uppercase font-black">Note:</p>
                                              <p className="text-sm font-semibold text-bgray-900 dark:text-bgray-100 italic">"{viewingPayslip.note || "Regular salary payout."}"</p>
                                              <p className="text-xs text-bgray-500 dark:text-bgray-400 mt-2 font-bold">Payment Method: <span className="text-indigo-500 capitalize">{viewingPayslip.paymentMode || "Bank Transfer"}</span></p>
                                         </div>
                                         <div className="text-right w-1/3">
                                              <div className="border-t border-bgray-300 dark:border-darkblack-400 pt-2 text-xs font-bold text-bgray-500 dark:text-bgray-400 uppercase">
                                                   Authorized Signatory
                                              </div>
                                         </div>
                                    </div>
                               </div>

                               {/* Modal Action Controls */}
                               <div className="flex justify-end space-x-3 pt-6 border-t border-bgray-200 dark:border-darkblack-400">
                                    <button 
                                         type="button" 
                                         onClick={() => setViewingPayslip(null)}
                                         className="px-5 py-2.5 text-sm font-semibold text-bgray-700 bg-bgray-100 hover:bg-bgray-200 rounded-lg transition-colors dark:bg-darkblack-500 dark:text-white dark:hover:bg-darkblack-450"
                                    >
                                         Close
                                    </button>
                                    <button 
                                         type="button" 
                                         onClick={() => {
                                              const printContent = document.getElementById("printable-payslip")?.innerHTML;
                                              const originalContent = document.body.innerHTML;
                                              if (printContent) {
                                                   const win = window.open("", "_blank");
                                                   if (win) {
                                                        win.document.write(`
                                                             <html>
                                                                  <head>
                                                                       <title>Payslip_${viewingPayslip.firstName}_${viewingPayslip.lastName}</title>
                                                                       <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                                                                  </head>
                                                                  <body class="p-8 dark:bg-white text-black" onload="window.print(); window.close();">
                                                                       <div class="max-w-xl mx-auto border p-6 rounded-xl shadow-sm bg-white">
                                                                            ${printContent}
                                                                       </div>
                                                                  </body>
                                                             </html>
                                                        `);
                                                        win.document.close();
                                                   }
                                              }
                                         }}
                                         className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors shadow flex items-center space-x-2"
                                    >
                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                         </svg>
                                         <span>Print / PDF</span>
                                    </button>
                               </div>
                          </div>
                     </div>
                )}

                {/* Custom Toast Notification Banner */}
                {toast && (
                     <div className="fixed top-5 right-5 z-[9999] animate-fade-in-down">
                          <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl text-white ${
                               toast.type === "success" 
                                    ? "bg-emerald-500 border border-emerald-400" 
                                    : toast.type === "error"
                                    ? "bg-red-500 border border-red-400"
                                    : "bg-indigo-500 border border-indigo-400"
                          }`}>
                               {toast.type === "success" && (
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                               )}
                               {toast.type === "info" && (
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                               )}
                               <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
                          </div>
                     </div>
                )}
          </>
     );
}