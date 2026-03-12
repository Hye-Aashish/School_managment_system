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

export default function ZoomLiveClassesReport() {
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
        const res = await fetch("/api/zoom-live-classes");
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

  const HEADERS = ["Class Title", "Description", "Date Time", "Created By", "Created For", "Total Join"];
  const getRowValues = (item: LiveClass) => [
    item.classTitle,
    item.description,
    new Date(item.dateTime).toLocaleString(),
    item.createdBy,
    item.createdFor,
    String(item.joinList?.length || 0),
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
    a.href = url; a.download = "zoom-live-classes-report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {joinListItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setJoinListItem(null)}>
          <div className="bg-white dark:bg-darkblack-600 rounded-xl shadow-2xl w-full mx-4 overflow-hidden" style={{ maxWidth: "780px" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: "#6654c0" }}>
              <h3 className="text-lg font-bold text-white">Join List</h3>
              <button type="button" onClick={() => setJoinListItem(null)} className="text-white hover:opacity-80 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-bgray-200 dark:border-darkblack-400">
              <input type="text" placeholder="Search" value={joinSearch} onChange={(e) => { setJoinSearch(e.target.value); setJoinPage(1); }} className="h-9 px-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg text-sm focus:outline-none dark:bg-darkblack-500 dark:text-white w-48" />
            </div>
            {(() => {
              const entries = (joinListItem.joinList ?? []).filter(e => e.admissionNo?.toLowerCase().includes(joinSearch.toLowerCase()) || e.studentName?.toLowerCase().includes(joinSearch.toLowerCase()) || e.fatherName?.toLowerCase().includes(joinSearch.toLowerCase()));
              const totalPages = Math.max(1, Math.ceil(entries.length / joinPerPage));
              const paginated = entries.slice((joinPage - 1) * joinPerPage, joinPage * joinPerPage);
              return (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-bgray-200 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500">{["Admission No", "Student Name", "Father Name", "Last Join"].map(h => (<th key={h} className="text-left py-3 px-5 text-sm font-semibold text-bgray-700 dark:text-bgray-50">{h}</th>))}</tr></thead>
                      <tbody>{paginated.length === 0 ? (<tr><td colSpan={4} className="text-center py-10 text-sm text-bgray-500 dark:text-bgray-300">No participants found.</td></tr>) : paginated.map((e, idx) => (<tr key={idx} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50 transition"><td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.admissionNo}</td><td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.studentName}</td><td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.fatherName}</td><td className="py-3 px-5 text-sm text-bgray-900 dark:text-white">{e.lastJoin ? new Date(e.lastJoin).toLocaleString() : "-"}</td></tr>))}</tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3 border-t border-bgray-200 dark:border-darkblack-400">
                    <span className="text-sm text-bgray-600 dark:text-bgray-300">Showing {entries.length === 0 ? 0 : (joinPage - 1) * joinPerPage + 1} to {Math.min(joinPage * joinPerPage, entries.length)} of {entries.length} entries</span>
                    <div className="flex items-center gap-1">
                      <button type="button" disabled={joinPage === 1} onClick={() => setJoinPage(p => p - 1)} className="w-8 h-8 flex items-center justify-center rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 disabled:opacity-40 transition"><svg width="16" height="16" viewBox="0 0 21 21" fill="none"><path d="M12.72 5L7.72 10L12.72 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                      <button type="button" className="w-8 h-8 flex items-center justify-center rounded text-sm font-semibold text-white" style={{ backgroundColor: "#6654c0" }}>{joinPage}</button>
                      <button type="button" disabled={joinPage === totalPages} onClick={() => setJoinPage(p => p + 1)} className="w-8 h-8 flex items-center justify-center rounded border border-bgray-300 dark:border-darkblack-400 text-bgray-600 disabled:opacity-40 transition"><svg width="16" height="16" viewBox="0 0 21 21" fill="none"><path d="M7.72 5L12.72 10L7.72 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
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
          <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-semibold text-bgray-900 dark:text-white">Zoom Live Classes Report</h1></div>
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
            <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-5">Select Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col"><label className="text-sm font-medium mb-2">Class *</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 px-4 border border-bgray-300 dark:border-darkblack-400">
                  {classList.map(c => <option key={c} value={c === "All" ? "" : c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col"><label className="text-sm font-medium mb-2">Section *</label>
                <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="h-12 rounded-lg bg-bgray-100 dark:bg-darkblack-500 px-4 border border-bgray-300 dark:border-darkblack-400">
                  {sectionList.map(s => <option key={s} value={s === "All" ? "" : s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <div className="w-full flex h-14 gap-4">
                <div className="flex-1 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-4 flex items-center space-x-3">
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" stroke="currentColor"><circle cx="9.8" cy="10.6" r="8.9" strokeWidth="1.5"/></svg>
                  <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-bgray-300 dark:border-darkblack-400">{["Class Title","Description","Date Time","Created By","Created For","Total Join"].map(l => (<td key={l} className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">{l}</td>))}<td>Action</td></tr></thead>
                  <tbody>{isLoading ? (<tr><td colSpan={7} className="text-center py-4">Loading...</td></tr>) : filtered.length === 0 ? (<tr><td colSpan={7} className="text-center py-4">No results found.</td></tr>) : filtered.map(item => (
                    <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100 transition"><td className="py-4 px-4 text-sm">{item.classTitle}</td><td className="py-4 px-4 text-sm">{item.description}</td><td className="py-4 px-4 text-sm">{new Date(item.dateTime).toLocaleString()}</td><td className="py-4 px-4 text-sm">{item.createdBy}</td><td className="py-4 px-4 text-sm">{item.createdFor}</td><td className="py-4 px-4 text-sm">{item.joinList?.length || 0}</td><td className="py-4 px-4"><button onClick={() => setJoinListItem(item)} style={{ backgroundColor: "#7b61f8" }} className="w-8 h-8 flex items-center justify-center rounded-lg text-white"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> </button></td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
