import React, { useState, useEffect } from "react";

interface LogEntry {
  _id: string;
  incident: {
    title: string;
    point: number;
  };
  date: string;
  assignedBy: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  studentId: string;
  studentName: string;
}

export default function BehaviourHistoryModal({ isOpen, onClose, onRefresh, studentId, studentName }: ModalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/assign-incidents?studentId=${studentId}`);
      const json = await res.json();
      if (json.success) {
        // Filter logs on client side if API doesn't support studentId filter yet
        const filtered = json.data.filter((l: any) => l.student?._id === studentId || l.student === studentId);
        setLogs(filtered);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchLogs();
  }, [isOpen, studentId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this incident?")) return;
    try {
      const res = await fetch(`/api/assign-incidents/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        alert("Incident deleted successfully");
        fetchLogs();
        if (onRefresh) onRefresh();
      } else {
        alert(json.error || "Failed to delete incident");
      }
    } catch (error) {
      console.error("Error deleting incident:", error);
      alert("An error occurred while deleting");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-5xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-bgray-900 dark:text-white">Behaviour History: {studentName}</h2>
          <button onClick={onClose} className="text-bgray-500 hover:text-bgray-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Point</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Assign By</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    No records found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log._id}
                    className={`border-b border-bgray-300 dark:border-darkblack-400 ${
                      log.incident?.point < 0 ? "bg-red-50 dark:bg-rose-900/20" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-bgray-900 dark:text-white">{log.incident?.title}</td>
                    <td className={`py-3 px-4 text-sm font-bold ${log.incident?.point < 0 ? "text-error-300" : "text-success-300"}`}>
                      {log.incident?.point > 0 ? `+${log.incident?.point}` : log.incident?.point}
                    </td>
                    <td className="py-3 px-4 text-sm text-bgray-600 dark:text-bgray-400">{new Date(log.date).toLocaleDateString("en-GB")}</td>
                    <td className="py-3 px-4 text-sm text-bgray-600 dark:text-bgray-400 max-w-xs truncate" title={log.description}>
                      {log.description}
                    </td>
                    <td className="py-3 px-4 text-sm text-bgray-600 dark:text-bgray-400">{log.assignedBy}</td>
                    <td className="py-3 px-4 text-sm">
                      <button
                        onClick={() => handleDelete(log._id)}
                        className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-colors"
                        title="Delete"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-success-300 text-white rounded-lg font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
