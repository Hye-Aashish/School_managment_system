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
  studentId: string;
  studentName: string;
}

export default function BehaviourHistoryModal({ isOpen, onClose, studentId, studentName }: ModalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    if (isOpen) fetchLogs();
  }, [isOpen, studentId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-bgray-900 dark:text-white">Behaviour History: {studentName}</h2>
          <button onClick={onClose} className="text-bgray-500 hover:text-bgray-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6L18 18"/></svg>
          </button>
        </div>
        
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Incident</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Points</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">Assigned By</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="text-center py-6">Loading...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-6">No records found</td></tr>
              ) : logs.map((log) => (
                <tr key={log._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                  <td className="py-3 px-4 text-sm text-bgray-900 dark:text-white">{log.incident?.title}</td>
                  <td className={`py-3 px-4 text-sm font-bold ${log.incident?.point < 0 ? 'text-error-300' : 'text-success-300'}`}>
                    {log.incident?.point > 0 ? `+${log.incident?.point}` : log.incident?.point}
                  </td>
                  <td className="py-3 px-4 text-sm text-bgray-600 dark:text-bgray-400">{new Date(log.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm text-bgray-600 dark:text-bgray-400">{log.assignedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-success-300 text-white rounded-lg font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
}
