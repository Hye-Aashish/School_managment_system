const fs = require('fs');
const path = 'd:/prasad/AndroidStudioProjects/school_crm/School_managment_system/src/app/admin/FeesCollection/offlinepayment/page.tsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Imports
content = content.replace('import autoTable from "jspdf-autotable";', `import autoTable from "jspdf-autotable";\nimport Pagination from "../../components/Pagination";`);

// 2. States and fetching
const stateString = `     const [payments, setPayments] = useState<any[]>([]);
     const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [selectedPayment, setSelectedPayment] = useState<any | null>(null);`;

const newStates = `     const [payments, setPayments] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [openFilter, setOpenFilter] = useState<string | null>(null);
     const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

     const [classes, setClasses] = useState<any[]>([]);
     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSection, setSelectedSection] = useState("");
     const [selectedStatus, setSelectedStatus] = useState("");
     
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [limit, setLimit] = useState(10);
     const [totalEntries, setTotalEntries] = useState(0);

     const [debouncedSearch, setDebouncedSearch] = useState("");
     useEffect(() => {
          const handler = setTimeout(() => {
               setDebouncedSearch(searchTerm);
               setCurrentPage(1);
          }, 300);
          return () => clearTimeout(handler);
     }, [searchTerm]);`;

content = content.replace(stateString, newStates);

const fetchPaymentsString = `     const fetchPayments = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/offline-payment");
               const data = await res.json();
               if (res.ok) {
                    setPayments(data);
                    setFilteredPayments(data);
               }
          } catch (err) {
               console.error("Failed to fetch payments", err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchPayments();
     }, []);

     useEffect(() => {
          const filtered = payments.filter(p => {
               const studentName = \`\${p.student?.fname || ""} \${p.student?.lname || ""}\`.toLowerCase();
               const admissionNo = (p.student?.admission_no || "").toLowerCase();
               const searchLower = searchTerm.toLowerCase();
               return studentName.includes(searchLower) || admissionNo.includes(searchLower);
          });
          setFilteredPayments(filtered);
     }, [searchTerm, payments]);`;

const newFetch = `     const fetchClasses = async () => {
          try {
               const res = await fetch("/api/classes");
               const data = await res.json();
               if (data.success) {
                    setClasses(data.data || []);
               }
          } catch (error) {
               console.error("Error fetching classes:", error);
          }
     };

     const fetchPayments = async () => {
          setLoading(true);
          try {
               const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: limit.toString(),
                    ...(selectedClass && { class: selectedClass }),
                    ...(selectedSection && { section: selectedSection }),
                    ...(debouncedSearch && { search: debouncedSearch }),
                    ...(selectedStatus && { status: selectedStatus }),
               });
               const res = await fetch(\`/api/offline-payment?\${params.toString()}\`);
               const data = await res.json();
               if (res.ok) {
                    setPayments(data.data || []);
                    setTotalPages(data.totalPages || 1);
                    setTotalEntries(data.totalEntries || 0);
               }
          } catch (err) {
               console.error("Failed to fetch payments", err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchClasses();
     }, []);

     useEffect(() => {
          fetchPayments();
     }, [currentPage, limit, selectedClass, selectedSection, debouncedSearch, selectedStatus]);`;

content = content.replace(fetchPaymentsString, newFetch);

// 3. Export data variable
content = content.replace(/filteredPayments/g, "payments");


// 4. UI changes
const uiSearchDivString = `                                   <div className="w-full flex h-14 space-x-4">
                                        <div
                                             className="w-full sm:block hidden border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                        >`;

const newUiSearchDiv = `                                   <div className="w-full flex flex-wrap gap-4">
                                        <div
                                             className="flex-1 min-w-[200px] h-14 sm:block hidden border border-transparent focus-within:border-success-300 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]"
                                        >`;
content = content.replace(uiSearchDivString, newUiSearchDiv);

// Adding dropdowns
const uiExportDivString = `                                        <div className="relative">
                                             <button
                                                  type="button"
                                                  className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300 transition-colors"
                                                  onClick={() => toggleFilter("export")}`;

const newUiFilters = `                                        <div className="relative h-14">
                                             <button type="button" onClick={() => toggleFilter("class")} className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300">
                                                  <span className="text-sm font-medium text-bgray-600 dark:text-gray-300 whitespace-nowrap">{selectedClass || "All Classes"}</span>
                                                  <svg width="12" height="12" viewBox="0 0 21 21" fill="none"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                             </button>
                                             <div className={\`rounded-lg w-[180px] shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-16 overflow-hidden border border-gray-100 dark:border-darkblack-400 transition-all \${openFilter === "class" ? "block scale-100" : "hidden scale-95 opacity-0"}\`}>
                                                  <ul className="max-h-60 overflow-y-auto">
                                                       <li onClick={() => { setSelectedClass(""); setSelectedSection(""); setOpenFilter(null); setCurrentPage(1); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium">All Classes</li>
                                                       {classes.map((cls: any) => (
                                                            <li key={cls._id} onClick={() => { setSelectedClass(cls.name); setSelectedSection(""); setOpenFilter(null); setCurrentPage(1); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium">{cls.name}</li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative h-14">
                                             <button type="button" onClick={() => toggleFilter("section")} className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300">
                                                  <span className="text-sm font-medium text-bgray-600 dark:text-gray-300 whitespace-nowrap">{selectedSection || "All Sections"}</span>
                                                  <svg width="12" height="12" viewBox="0 0 21 21" fill="none"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                             </button>
                                             <div className={\`rounded-lg w-[180px] shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-16 overflow-hidden border border-gray-100 dark:border-darkblack-400 transition-all \${openFilter === "section" ? "block scale-100" : "hidden scale-95 opacity-0"}\`}>
                                                  <ul className="max-h-60 overflow-y-auto">
                                                       <li onClick={() => { setSelectedSection(""); setOpenFilter(null); setCurrentPage(1); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium">All Sections</li>
                                                       {selectedClass && classes.find((c: any) => c.name === selectedClass)?.sections?.map((sec: string) => (
                                                            <li key={sec} onClick={() => { setSelectedSection(sec); setOpenFilter(null); setCurrentPage(1); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium">{sec}</li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative h-14">
                                             <button type="button" onClick={() => toggleFilter("status")} className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300">
                                                  <span className="text-sm font-medium text-bgray-600 dark:text-gray-300 whitespace-nowrap">{selectedStatus || "All Status"}</span>
                                                  <svg width="12" height="12" viewBox="0 0 21 21" fill="none"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                             </button>
                                             <div className={\`rounded-lg w-[150px] shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-20 top-16 overflow-hidden border border-gray-100 dark:border-darkblack-400 transition-all \${openFilter === "status" ? "block scale-100" : "hidden scale-95 opacity-0"}\`}>
                                                  <ul className="max-h-60 overflow-y-auto">
                                                       <li onClick={() => { setSelectedStatus(""); setOpenFilter(null); setCurrentPage(1); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium">All Status</li>
                                                       {["Pending", "Approved", "Rejected"].map((status: string) => (
                                                            <li key={status} onClick={() => { setSelectedStatus(status); setOpenFilter(null); setCurrentPage(1); }} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-50 hover:dark:bg-darkblack-600 font-medium">{status}</li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>

                                        <div className="relative h-14">
                                             <button
                                                  type="button"
                                                  className="h-full px-5 rounded-lg bg-bgray-200 flex justify-between items-center gap-3 dark:bg-darkblack-500 border border-transparent hover:border-gray-300 transition-colors"
                                                  onClick={() => toggleFilter("export")}`;

content = content.replace(uiExportDivString, newUiFilters);

// 5. Replace Pagination
const newPaginationDiv = \`                                   <Pagination
                                         currentPage={currentPage}
                                         totalPages={totalPages}
                                         onPageChange={setCurrentPage}
                                         limit={limit}
                                         onLimitChange={setLimit}
                                         totalEntries={totalEntries}
                                    />\`;

content = content.replace(/<div className="pagination-content[\\s\\S]*?<\/div>\\s*<\/div>\\s*<\/div>/, newPaginationDiv + '\\n                               </div>');

fs.writeFileSync(path, content, 'utf8');
