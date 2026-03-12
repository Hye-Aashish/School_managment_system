"use client";
import React, { useState, useEffect, useRef } from "react";
import ZoomLiveMeetingModal from "./ZoomLiveMeetingModal";

interface LiveMeeting {
  _id: string;
  meetingTitle: string;
  description: string;
  dateTime: string;
  duration: number;
  createdBy: string;
  classes: string[];
  meetingUrl: string;
  status: string;
}

const ALL_COLUMNS = [
  { key: "meetingTitle", label: "Meeting Title" },
  { key: "description", label: "Description" },
  { key: "dateTime", label: "Date Time" },
  { key: "duration", label: "Duration (Minutes)" },
  { key: "createdBy", label: "Created By" },
  { key: "classes", label: "Class" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

export default function ZoomLiveMeetings() {
  const [liveMeetingsData, setLiveMeetingsData] = useState<LiveMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<LiveMeeting | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);
  const colMenuRef = useRef<HTMLDivElement>(null);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/zoom-live-meetings");
      const data = await res.json();
      if (data.success) setLiveMeetingsData(data.data);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target as Node)) {
        setShowColMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAdd = () => { setEditData(null); setIsModalOpen(true); };
  const handleEdit = (item: LiveMeeting) => { setEditData(item); setIsModalOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Zoom live meeting?")) return;
    try {
      await fetch(`/api/zoom-live-meetings/${id}`, { method: "DELETE" });
      fetchMeetings();
    } catch (error) {
      console.error("Failed to delete meeting:", error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/zoom-live-meetings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        fetchMeetings();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filtered = liveMeetingsData.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.meetingTitle?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.createdBy?.toLowerCase().includes(q) ||
      item.status?.toLowerCase().includes(q)
    );
  });

  const getVisibleHeaders = () =>
    ALL_COLUMNS.filter((c) => c.key !== "action" && !hiddenColumns.has(c.key)).map((c) => c.label);

  const getRowValues = (item: LiveMeeting) => {
    const map: Record<string, string> = {
      meetingTitle: item.meetingTitle,
      description: item.description,
      dateTime: new Date(item.dateTime).toLocaleString(),
      duration: String(item.duration),
      createdBy: item.createdBy,
      classes: item.classes?.join(", ") || "",
      status: item.status,
    };
    return ALL_COLUMNS.filter((c) => c.key !== "action" && !hiddenColumns.has(c.key)).map(
      (c) => map[c.key] ?? ""
    );
  };

  const handleCopy = () => {
    const headers = getVisibleHeaders().join("\t");
    const rows = filtered.map((item) => getRowValues(item).join("\t")).join("\n");
    navigator.clipboard.writeText(`${headers}\n${rows}`);
  };

  const buildCsv = () => {
    const headers = getVisibleHeaders().join(",");
    const rows = filtered
      .map((item) =>
        getRowValues(item)
          .map((v) => `"${v.replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    return `${headers}\n${rows}`;
  };

  const handleCsvDownload = () => {
    const blob = new Blob([buildCsv()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zoom-live-meetings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelDownload = () => {
    const blob = new Blob([buildCsv()], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zoom-live-meetings.xls";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const toggleColumn = (key: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isVisible = (key: string) => !hiddenColumns.has(key);

  return (
    <>
      {showSuccess && (
        <div className="fixed top-5 right-5 z-[500] animate-in slide-in-from-right-full duration-300">
          <div className="bg-success-300 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 border border-success-400">
            <div className="bg-white/20 rounded-full p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p className="font-bold tracking-wide">Status Updated Successfully!</p>
          </div>
        </div>
      )}
      <ZoomLiveMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchMeetings}
        editData={editData}
      />
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-bgray-900 dark:text-white">Zoom Live Meetings</h1>
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 bg-success-300 hover:bg-success-400 text-white rounded-lg font-semibold flex items-center gap-2 transition duration-300"
            >
              <span>+</span> Add
            </button>
          </div>

          <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <div className="w-full flex h-14">
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
                        placeholder="Search Zoom Live Meetings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3">
                <button type="button" onClick={handleCopy} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="Copy">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#718096" strokeWidth="1.5" /><path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#718096" strokeWidth="1.5" /></svg>
                </button>
                <button type="button" onClick={handleExcelDownload} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="Excel">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 2V8H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={handleCsvDownload} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="CSV">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 2V9H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <div className="relative" ref={colMenuRef}>
                  <button type="button" onClick={() => setShowColMenu((v) => !v)} className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300" title="Column Visibility">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM14 14H21V21H14V14ZM3 14H10V21H3V14Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {showColMenu && (
                    <div className="absolute right-0 top-12 z-20 bg-white dark:bg-darkblack-500 rounded-lg shadow-lg border border-bgray-200 dark:border-darkblack-400 w-52 p-3">
                      <p className="text-xs font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Toggle Columns</p>
                      {ALL_COLUMNS.filter((c) => c.key !== "action").map((col) => (
                        <label key={col.key} className="flex items-center gap-2 py-1 cursor-pointer">
                          <input type="checkbox" checked={isVisible(col.key)} onChange={() => toggleColumn(col.key)} className="accent-success-300" />
                          <span className="text-sm text-bgray-900 dark:text-bgray-50">{col.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="table-content w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                      {isVisible("meetingTitle") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Meeting Title</td>}
                      {isVisible("description") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Description</td>}
                      {isVisible("dateTime") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date Time</td>}
                      {isVisible("duration") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Duration (Min)</td>}
                      {isVisible("createdBy") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Created By</td>}
                      {isVisible("classes") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class</td>}
                      {isVisible("status") && <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Status</td>}
                      <td className="py-4 px-4 text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr><td colSpan={8} className="text-center py-4 text-bgray-600 dark:text-bgray-50">Loading...</td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-4 text-bgray-600 dark:text-bgray-50"> {searchQuery ? "No matching Zoom meetings found." : "No Zoom live meetings found."} </td></tr>
                    ) : (
                      filtered.map((item) => (
                        <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100 dark:hover:bg-darkblack-500 transition duration-200">
                          {isVisible("meetingTitle") && <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">{item.meetingTitle}</td>}
                          {isVisible("description") && <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">{item.description}</td>}
                          {isVisible("dateTime") && <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">{new Date(item.dateTime).toLocaleString()}</td>}
                          {isVisible("duration") && <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">{item.duration}</td>}
                          {isVisible("createdBy") && <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">{item.createdBy}</td>}
                          {isVisible("classes") && <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">{item.classes?.join(", ")}</td>}
                          {isVisible("status") && (
                            <td className="py-4 px-4 text-sm text-bgray-900 dark:text-bgray-50">
                              <select value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)} className="bg-transparent focus:outline-none">
                                <option value="Awaited">Awaited</option>
                                <option value="Started">Started</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          )}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                               <button type="button" onClick={() => handleEdit(item)} className="text-bgray-600 dark:text-bgray-50 hover:text-success-300 transition-colors"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg> </button>
                               <button type="button" onClick={() => { handleStatusChange(item._id, "Started"); window.open(item.meetingUrl || "#", "_blank"); }} style={{ backgroundColor: "#82b440" }} className="flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-xs font-semibold hover:opacity-90 transition duration-300"> <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg> Start </button>
                               <button type="button" onClick={() => handleDelete(item._id)} style={{ backgroundColor: "#7b61f8" }} className="w-8 h-8 flex items-center justify-center text-white rounded hover:opacity-90 transition duration-300"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> </button>
                            </div>
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
