"use client";
import React, { useState, useEffect } from "react";

interface LiveClass {
  _id: string;
  classTitle: string;
  description: string;
  dateTime: string;
  createdBy: string;
  createdFor: string;
  classes: string[];
  joinList: { admissionNo: string; studentName: string; fatherName: string; lastJoin: string }[];
  status: string;
}

export default function LiveClassesReport() {
  const [openFilter, setOpenFilter] = useState<"class" | "section" | null>(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [liveClassesReportData, setLiveClassesReportData] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [joinListItem, setJoinListItem] = useState<LiveClass | null>(null);
  const [joinSearch, setJoinSearch] = useState("");
  const [joinPage, setJoinPage] = useState(1);
  const joinPerPage = 10;

  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/gmeet-live-classes");
        const data = await res.json();
        if (data.success) setLiveClassesReportData(data.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const toggleFilter = (type: "class" | "section") => {
    setOpenFilter(openFilter === type ? null : type);
  };

  const classList = ["All","Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10"];
  const sectionList = ["All","A","B","C","D","E"];

  const filtered = liveClassesReportData.filter((item) => {
    const q = searchQuery.toLowerCase();
    
    // Class and Section filtering
    const classMatch = !selectedClass || selectedClass === "All" || item.classes?.some(c => c.startsWith(selectedClass));
    const sectionMatch = !selectedSection || selectedSection === "All" || item.classes?.some(c => c.includes(`(${selectedSection})`));
    
    if (!(classMatch && sectionMatch)) return false;

    return (
      item.classTitle?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.createdBy?.toLowerCase().includes(q) ||
      item.createdFor?.toLowerCase().includes(q)
    );
  });

  // ── Export helpers ──────────────────────────────────────────────────
  const HEADERS = ["Class Title", "Description", "Date Time", "Created By", "Created For", "Total Join"];
  const getRowValues = (item: LiveClass) => [
    item.classTitle,
    item.description,
    new Date(item.dateTime).toLocaleString(),
    item.createdBy,
    item.createdFor,
    "0",
  ];

  const handleCopy = () => {
    const rows = filtered.map((item) => getRowValues(item).join("\t")).join("\n");
    navigator.clipboard.writeText(`${HEADERS.join("\t")}\n${rows}`);
  };

  const buildCsv = () => {
    const rows = filtered.map((item) =>
      getRowValues(item).map((v) => `"${v.replace(/"/g, '""')}"`).join(",")
    ).join("\n");
    return `${HEADERS.join(",")}\n${rows}`;
  };

  const handleCsvDownload = () => {
    const blob = new Blob([buildCsv()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "live-classes-report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelDownload = () => {
    const blob = new Blob([buildCsv()], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "live-classes-report.xls"; a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const SortIcon = () => (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.332 1.31567V13.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.66602 13.3157V1.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      {/* Join List Modal */}
      {joinListItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setJoinListItem(null)}>
          <div
            className="bg-white dark:bg-darkblack-600 rounded-xl shadow-2xl w-full mx-4 overflow-hidden"
            style={{ maxWidth: "780px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Purple Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: "#6654c0" }}>
              <h3 className="text-lg font-bold text-white">Join List</h3>
              <button type="button" onClick={() => setJoinListItem(null)} className="text-white hover:opacity-80 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-bgray-200 dark:border-darkblack-400">
              <input
                type="text"
                placeholder="Search"
                value={joinSearch}
                onChange={(e) => { setJoinSearch(e.target.value); setJoinPage(1); }}
                className="h-9 px-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6654c0] dark:bg-darkblack-500 dark:text-white w-48"
              />
            </div>

            {/* Table */}
            {(() => {
              const entries = (joinListItem.joinList ?? []).filter(e =>
                e.admissionNo?.toLowerCase().includes(joinSearch.toLowerCase()) ||
                e.studentName?.toLowerCase().includes(joinSearch.toLowerCase()) ||
                e.fatherName?.toLowerCase().includes(joinSearch.toLowerCase())
              );
              const totalPages = Math.max(1, Math.ceil(entries.length / joinPerPage));
              const paginated = entries.slice((joinPage - 1) * joinPerPage, joinPage * joinPerPage);
              return (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-bgray-200 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500">
                          {["Admission No", "Student Name", "Father Name", "Last Join"].map(h => (
                            <th key={h} className="text-left py-3 px-5 text-sm font-semibold text-bgray-700 dark:text-bgray-50">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginated.length === 0 ? (
                          <tr><td colSpan={4} className="text-center py-10 text-sm text-bgray-500 dark:text-bgray-300">No participants found.</td></tr>
                        ) : paginated.map((e, idx) => (
                          <tr key={idx} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition">
                            <td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.admissionNo}</td>
                            <td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.studentName}</td>
                            <td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.fatherName}</td>
                            <td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.lastJoin ? new Date(e.lastJoin).toLocaleString() : "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Footer: Showing X to Y of Z + Pagination */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-bgray-200 dark:border-darkblack-400">
                    <span className="text-sm text-bgray-600 dark:text-bgray-300">
                      Showing {entries.length === 0 ? 0 : (joinPage - 1) * joinPerPage + 1} to {Math.min(joinPage * joinPerPage, entries.length)} of {entries.length} entries
                    </span>
                    <div className="flex items-center gap-1">
                      <button type="button" disabled={joinPage === 1} onClick={() => setJoinPage(p => p - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500 disabled:opacity-40 transition">
                        <svg width="16" height="16" viewBox="0 0 21 21" fill="none"><path d="M12.72 5L7.72 10L12.72 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button type="button" className="w-8 h-8 flex items-center justify-center rounded text-sm font-semibold text-white" style={{ backgroundColor: "#6654c0" }}>{joinPage}</button>
                      <button type="button" disabled={joinPage === totalPages} onClick={() => setJoinPage(p => p + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500 disabled:opacity-40 transition">
                        <svg width="16" height="16" viewBox="0 0 21 21" fill="none"><path d="M7.72 5L12.72 10L7.72 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          {/* Select Criteria */}
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
            <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-5">Select Criteria</h2>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Class Dropdown */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2">Class <span className="text-error-300">*</span></label>
                  <div className="relative">
                    <button type="button" className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400" onClick={() => toggleFilter("class")}>
                      <span className="text-sm text-bgray-900 dark:text-bgray-50">{selectedClass || "All"}</span>
                      <span><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    </button>
                    <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "class" ? "block" : "hidden"}`}>
                      <ul className="max-h-48 overflow-y-auto">
                        {classList.map((cls) => (
                          <li key={cls} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-medium" onClick={() => { setSelectedClass(cls === "All" ? "" : cls); setOpenFilter(null); }}>{cls}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Section Dropdown */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2">Section <span className="text-error-300">*</span></label>
                  <div className="relative">
                    <button type="button" className="w-full h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 px-4 flex justify-between items-center border border-bgray-300 dark:border-darkblack-400" onClick={() => toggleFilter("section")}>
                      <span className="text-sm text-bgray-900 dark:text-bgray-50">{selectedSection || "All"}</span>
                      <span><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    </button>
                    <div className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute left-0 z-10 top-14 overflow-hidden transition-all ${openFilter === "section" ? "block" : "hidden"}`}>
                      <ul className="max-h-48 overflow-y-auto">
                        {sectionList.map((section) => (
                          <li key={section} className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 font-medium" onClick={() => { setSelectedSection(section === "All" ? "" : section); setOpenFilter(null); }}>{section}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Table */}
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              {/* Search + Export Bar */}
              <div className="w-full flex h-14 gap-4">
                <div className="flex-1 border border-transparent focus-within:border-success-300 h-full bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-[18px]">
                  <div className="flex w-full h-full items-center space-x-[15px]">
                    <span>
                      <svg className="stroke-bgray-900 dark:stroke-white" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <label className="w-full">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                      />
                    </label>
                  </div>
                </div>
                {/* Action Icons */}
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleCopy} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="Copy">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#718096" strokeWidth="1.5" /><path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#718096" strokeWidth="1.5" /></svg>
                  </button>
                  <button type="button" onClick={handleExcelDownload} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="Excel">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 2V8H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button type="button" onClick={handleCsvDownload} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="CSV">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 2V9H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button type="button" onClick={handlePrint} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="PDF">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button type="button" onClick={handlePrint} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="Print">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V2H18V9M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18M6 14H18V22H6V14Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="table-content w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                      {["Class Title","Description","Date Time","Created By","Created For","Total Join"].map((label) => (
                        <td key={label} className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">{label}</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      ))}
                      <td className="py-4 px-4"><span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr><td colSpan={7} className="text-center py-4 text-bgray-600 dark:text-bgray-50">Loading...</td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-4 text-bgray-600 dark:text-bgray-50">{searchQuery ? "No matching classes found." : "No classes found."}</td></tr>
                    ) : (
                      filtered.map((item) => (
                        <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100 dark:hover:bg-darkblack-500 transition duration-200">
                          <td className="py-4 px-4"><p className="text-sm text-bgray-900 dark:text-bgray-50">{item.classTitle}</p></td>
                          <td className="py-4 px-4"><p className="text-sm text-bgray-900 dark:text-bgray-50">{item.description}</p></td>
                          <td className="py-4 px-4"><p className="text-sm text-bgray-900 dark:text-bgray-50">{new Date(item.dateTime).toLocaleString()}</p></td>
                          <td className="py-4 px-4"><p className="text-sm text-bgray-900 dark:text-bgray-50">{item.createdBy}</p></td>
                          <td className="py-4 px-4"><p className="text-sm text-bgray-900 dark:text-bgray-50">{item.createdFor}</p></td>
                          <td className="py-4 px-4"><p className="text-sm text-bgray-900 dark:text-bgray-50">0</p></td>
                          <td className="py-4 px-4">
                            <button
                              type="button"
                              title="View Join List"
                              onClick={() => setJoinListItem(item)}
                              style={{ backgroundColor: "#7b61f8" }}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-white hover:opacity-80 transition duration-300"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}