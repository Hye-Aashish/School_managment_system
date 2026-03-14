import React, { useState, useEffect } from "react";

interface Incident {
  _id: string;
  title: string;
  point: number;
  description: string;
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
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch("/api/incidents");
        const json = await res.json();
        if (json.success) setIncidents(json.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    if (isOpen) {
      fetchIncidents();
      setSelectedIncidents([]);
    }
  }, [isOpen]);

  const toggleIncident = (id: string) => {
    setSelectedIncidents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIncidents.length === 0) {
      alert("Please select at least one incident");
      return;
    }

    setIsSubmitting(true);
    const date = new Date().toISOString();
    
    try {
      const promises = selectedIncidents.map(async (incidentId) => {
        const payload = {
          student: studentId,
          incident: incidentId,
          date,
          description: incidents.find(i => i._id === incidentId)?.description || "",
          assignedBy: "Super Admin", // In a real app, get this from auth context
          session: "2023-24", // Adjust as needed
        };

        const res = await fetch("/api/assign-incidents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        return res.ok;
      });

      const results = await Promise.all(promises);
      if (results.every((r) => r)) {
        alert("Success: Incidents assigned successfully");
        onRefresh();
        onClose();
      } else {
        alert("Some incidents failed to assign. Please check behaviour history.");
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.error("Error assigning incidents:", error);
      alert("An error occurred while assigning incidents");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-4xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="bg-indigo-600 px-6 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Assign Incident</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 bg-gray-50 dark:bg-darkblack-500">
          <p className="text-sm font-medium text-bgray-600 dark:text-bgray-200 mb-2">
            Assigning incidents for: <span className="font-bold text-bgray-900 dark:text-white">{studentName}</span>
          </p>
          
          {incidents.length === 0 ? (
            <div className="text-center py-10 text-bgray-500">Loading incidents...</div>
          ) : (
            incidents.map((inc) => (
              <div 
                key={inc._id}
                onClick={() => toggleIncident(inc._id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer flex justify-between items-start ${
                  selectedIncidents.includes(inc._id) 
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10" 
                    : "border-gray-200 dark:border-darkblack-400 bg-white dark:bg-darkblack-600 hover:border-indigo-300"
                }`}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-bgray-900 dark:text-white">{inc.title}</h3>
                    <span className="text-sm font-semibold text-bgray-700 dark:text-bgray-300">
                      Point: <span className={inc.point < 0 ? "text-red-500" : "text-green-500"}>{inc.point}</span>
                    </span>
                  </div>
                  <p className="text-sm text-bgray-600 dark:text-bgray-400 line-clamp-2">{inc.description}</p>
                </div>
                <div className="ml-4 pt-1">
                  <input
                    type="checkbox"
                    checked={selectedIncidents.includes(inc._id)}
                    onChange={() => {}} // Handle change via div onClick
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 flex justify-end border-t border-gray-200 dark:border-darkblack-400 bg-white dark:bg-darkblack-600">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || selectedIncidents.length === 0}
            className={`px-8 py-2 rounded-lg font-bold text-white transition-all shadow-md ${
              isSubmitting || selectedIncidents.length === 0
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
