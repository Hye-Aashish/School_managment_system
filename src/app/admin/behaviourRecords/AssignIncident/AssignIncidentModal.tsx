import React, { useState, useEffect } from "react";

interface Incident {
  _id: string;
  title: string;
  point: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  studentId: string;
  studentName: string;
}

export default function AssignIncidentModal({ isOpen, onClose, onRefresh, studentId, studentName }: ModalProps) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      const res = await fetch("/api/incidents");
      const json = await res.json();
      if (json.success) setIncidents(json.data);
    };
    if (isOpen) fetchIncidents();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      student: studentId,
      incident: selectedIncident,
      date,
      description,
      assignedBy: "Super Admin", // Or fetch from session
      session: "2023-24", // Or fetch from context
    };

    try {
      const res = await fetch("/api/assign-incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("successfully saved");
        onRefresh();
        onClose();
      } else {
        alert("Failed to assign incident");
      }
    } catch (error) {
      console.error("Error assigning incident:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-bgray-900 dark:text-white">Assign Incident to {studentName}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Incident</label>
            <select
              required
              value={selectedIncident}
              onChange={(e) => setSelectedIncident(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            >
              <option value="">Select Incident</option>
              {incidents.map((inc) => (
                <option key={inc._id} value={inc._id}>{inc.title} ({inc.point} pts)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg dark:bg-darkblack-500 text-bgray-900 dark:text-white"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-success-300 text-white rounded-lg font-semibold">Assign</button>
          </div>
        </form>
      </div>
    </div>
  );
}
