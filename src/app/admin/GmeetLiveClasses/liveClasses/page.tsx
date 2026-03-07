"use client";
import React, { useState, useEffect, useRef } from "react";
import GmeetLiveClassModal from "./GmeetLiveClassModal";

interface LiveClass {
  _id: string;
  classTitle: string;
  description: string;
  dateTime: string;
  duration: number;
  createdBy: string;
  createdFor: string;
  classes: string[];
  status: string;
}

const ALL_COLUMNS = [
  { key: "classTitle", label: "Class Title" },
  { key: "description", label: "Description" },
  { key: "dateTime", label: "Date Time" },
  { key: "duration", label: "Class Duration (Minutes)" },
  { key: "createdBy", label: "Created By" },
  { key: "createdFor", label: "Created For" },
  { key: "classes", label: "Class" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

export default function LiveClasses() {
  const [liveClassesData, setLiveClassesData] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<LiveClass | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);
  const colMenuRef = useRef<HTMLDivElement>(null);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gmeet-live-classes");
      const data = await res.json();
      if (data.success) setLiveClassesData(data.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Close column menu on outside click
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
  const handleEdit = (item: LiveClass) => { setEditData(item); setIsModalOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this live class?")) return;
    try {
      await fetch(`/api/gmeet-live-classes/${id}`, { method: "DELETE" });
      fetchClasses();
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/gmeet-live-classes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchClasses();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // ── Filtered rows ────────────────────────────────────────────────────
  const filtered = liveClassesData.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.classTitle?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.createdBy?.toLowerCase().includes(q) ||
      item.createdFor?.toLowerCase().includes(q) ||
      item.status?.toLowerCase().includes(q)
    );
  });

  // ── Export helpers ───────────────────────────────────────────────────
  const getVisibleHeaders = () =>
    ALL_COLUMNS.filter((c) => c.key !== "action" && !hiddenColumns.has(c.key)).map((c) => c.label);

  const getRowValues = (item: LiveClass) => {
    const map: Record<string, string> = {
      classTitle: item.classTitle,
      description: item.description,
      dateTime: new Date(item.dateTime).toLocaleString(),
      duration: String(item.duration),
      createdBy: item.createdBy,
      createdFor: item.createdFor,
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
    a.download = "live-classes.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelDownload = () => {
    const blob = new Blob([buildCsv()], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "live-classes.xls";
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

  // ── Sort icon ────────────────────────────────────────────────────────
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
      <GmeetLiveClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchClasses}
        editData={editData}
      />
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-bgray-900 dark:text-white">Live Classes</h1>
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
              {/* Search */}
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
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input w-full bg-bgray-200 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 dark:bg-darkblack-500 dark:text-white"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Icons Bar */}
              <div className="flex justify-end items-center gap-3">
                {/* Copy */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                  title="Copy"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="#718096" strokeWidth="1.5" />
                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#718096" strokeWidth="1.5" />
                  </svg>
                </button>
                {/* Excel */}
                <button
                  type="button"
                  onClick={handleExcelDownload}
                  className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                  title="Excel"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2V8H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* CSV */}
                <button
                  type="button"
                  onClick={handleCsvDownload}
                  className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                  title="CSV"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 2V9H20" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* PDF / Print */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                  title="PDF"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Print */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                  title="Print"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9V2H18V9M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18M6 14H18V22H6V14Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Column Visibility */}
                <div className="relative" ref={colMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowColMenu((v) => !v)}
                    className="w-10 h-10 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center hover:bg-success-50 transition duration-300"
                    title="Column Visibility"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM14 14H21V21H14V14ZM3 14H10V21H3V14Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {showColMenu && (
                    <div className="absolute right-0 top-12 z-20 bg-white dark:bg-darkblack-500 rounded-lg shadow-lg border border-bgray-200 dark:border-darkblack-400 w-52 p-3">
                      <p className="text-xs font-semibold text-bgray-600 dark:text-bgray-50 mb-2">Toggle Columns</p>
                      {ALL_COLUMNS.filter((c) => c.key !== "action").map((col) => (
                        <label key={col.key} className="flex items-center gap-2 py-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isVisible(col.key)}
                            onChange={() => toggleColumn(col.key)}
                            className="accent-success-300"
                          />
                          <span className="text-sm text-bgray-900 dark:text-bgray-50">{col.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="table-content w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                      {isVisible("classTitle") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class Title</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("description") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Description</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("dateTime") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date Time</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("duration") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class Duration (Minutes)</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("createdBy") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Created By</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("createdFor") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Created For</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("classes") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      {isVisible("status") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Status</span>
                            <button type="button"><SortIcon /></button>
                          </div>
                        </td>
                      )}
                      <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={9} className="text-center py-4 text-bgray-600 dark:text-bgray-50">Loading...</td>
                      </tr>
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-4 text-bgray-600 dark:text-bgray-50">
                          {searchQuery ? "No matching classes found." : "No live classes found."}
                        </td>
                      </tr>
                    ) : (
                      filtered.map((item) => (
                        <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-100 dark:hover:bg-darkblack-500 transition duration-200">
                          {isVisible("classTitle") && (
                            <td className="py-4 px-4">
                              <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.classTitle}</p>
                            </td>
                          )}
                          {isVisible("description") && (
                            <td className="py-4 px-4">
                              <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.description}</p>
                            </td>
                          )}
                          {isVisible("dateTime") && (
                            <td className="py-4 px-4">
                              <p className="text-sm text-bgray-900 dark:text-bgray-50 whitespace-pre-line">
                                {new Date(item.dateTime).toLocaleString()}
                              </p>
                            </td>
                          )}
                          {isVisible("duration") && (
                            <td className="py-4 px-4">
                              <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.duration}</p>
                            </td>
                          )}
                          {isVisible("createdBy") && (
                            <td className="py-4 px-4">
                              <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.createdBy}</p>
                            </td>
                          )}
                          {isVisible("createdFor") && (
                            <td className="py-4 px-4">
                              <p className="text-sm text-bgray-900 dark:text-bgray-50">{item.createdFor}</p>
                            </td>
                          )}
                          {isVisible("classes") && (
                            <td className="py-4 px-4">
                              <div className="flex flex-col gap-1">
                                {item.classes?.map((cls, index) => (
                                  <div key={index} className="flex items-center gap-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 11L12 14L22 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-xs text-bgray-900 dark:text-bgray-50">{cls}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          )}
                          {isVisible("status") && (
                            <td className="py-4 px-4">
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                className="text-sm text-bgray-900 dark:text-bgray-50 bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-success-300"
                              >
                                <option value="Started">Started</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          )}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className="px-3 py-1.5 bg-success-300 hover:bg-success-400 text-white rounded text-xs font-semibold transition duration-300"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item._id)}
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-error-50 text-error-300 transition duration-300"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
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