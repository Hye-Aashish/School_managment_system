import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface IncidentLog {
  _id: string;
  incident: {
    title: string;
    point: number;
    description: string;
  };
  session: string;
  date: string;
  assignedBy: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
}

export default function ViewReportModal({ isOpen, onClose, studentId, studentName }: ModalProps) {
  const [logs, setLogs] = useState<IncidentLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/assign-incidents?studentId=${studentId}`);
      const json = await res.json();
      if (json.success) {
        const filtered = json.data.filter((l: any) => l.student?._id === studentId || l.student === studentId);
        setLogs(filtered);
      }
    } catch (error) {
      console.error("Error fetching student incidents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchLogs();
  }, [isOpen, studentId]);

  const filteredLogs = logs.filter(log => 
    log.incident?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export Handlers
  const handleCSV = () => {
    const headers = ["Title", "Point", "Session", "Date", "Description", "Assigned By"];
    const rows = filteredLogs.map(log => [
      log.incident?.title,
      log.incident?.point,
      log.session,
      new Date(log.date).toLocaleDateString("en-GB"),
      log.description,
      log.assignedBy
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `incidents_${studentName.replace(/\s+/g, "_")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExcel = () => {
    const data = filteredLogs.map(log => ({
      Title: log.incident?.title,
      Point: log.incident?.point,
      Session: log.session,
      Date: new Date(log.date).toLocaleDateString("en-GB"),
      Description: log.description,
      "Assigned By": log.assignedBy
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incidents");
    XLSX.writeFile(workbook, `incidents_${studentName.replace(/\s+/g, "_")}.xlsx`);
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text(`Assigned Incidents - ${studentName}`, 14, 15);
    
    const tableHeaders = [["Title", "Point", "Session", "Date", "Description", "Assign By"]];
    const tableData = filteredLogs.map(log => [
      log.incident?.title,
      log.incident?.point,
      log.session,
      new Date(log.date).toLocaleDateString("en-GB"),
      log.description,
      log.assignedBy
    ]);

    autoTable(doc, {
      head: tableHeaders,
      body: tableData,
      startY: 20,
    });
    doc.save(`incidents_${studentName.replace(/\s+/g, "_")}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 print:bg-white print:p-0">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-6xl overflow-hidden shadow-2xl print:shadow-none print:w-full print:max-w-none print:rounded-none h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center print:hidden">
          <h2 className="text-xl font-bold text-white">Assigned Incident</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white dark:bg-darkblack-500 overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 print:hidden">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 mr-2 font-medium">{filteredLogs.length} Records</span>
              <button onClick={handleCSV} className="p-2 hover:bg-gray-100 dark:hover:bg-darkblack-600 rounded text-gray-500" title="Export CSV">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </button>
              <button onClick={handleExcel} className="p-2 hover:bg-gray-100 dark:hover:bg-darkblack-600 rounded text-gray-500" title="Export Excel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
              </button>
              <button onClick={handlePDF} className="p-2 hover:bg-gray-100 dark:hover:bg-darkblack-600 rounded text-gray-500" title="Download PDF">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
              <button onClick={handlePrint} className="p-2 hover:bg-gray-100 dark:hover:bg-darkblack-600 rounded text-gray-500" title="Print">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              </button>
            </div>
          </div>

          <div className="print:block">
            <h1 className="hidden print:block text-2xl font-bold mb-4">Assigned Incidents - {studentName}</h1>
            <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-darkblack-400">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-darkblack-600 border-b border-gray-200 dark:border-darkblack-400">
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Point</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Session</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Assign By</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={6} className="text-center py-10 text-gray-500">Loading...</td></tr>
                  ) : filteredLogs.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-10 text-gray-500">No records found</td></tr>
                  ) : filteredLogs.map((log) => (
                    <tr key={log._id} className="border-b border-gray-100 dark:border-darkblack-400 hover:bg-gray-50 dark:hover:bg-darkblack-600 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">{log.incident?.title}</td>
                      <td className={`py-4 px-4 text-sm font-bold ${log.incident?.point < 0 ? "text-red-500" : "text-green-500"}`}>
                        {log.incident?.point > 0 ? `+${log.incident?.point}` : log.incident?.point}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{log.session}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(log.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">{log.description}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{log.assignedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\:bg-white, .print\:bg-white * {
            visibility: visible;
          }
          .print\:bg-white {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
