import React, { useState, useEffect } from "react";

interface Incident {
  _id?: string;
  title: string;
  point: number;
  isNegative: boolean;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  editData: Incident | null;
}

export default function IncidentModal({ isOpen, onClose, onRefresh, editData }: ModalProps) {
  const [title, setTitle] = useState("");
  const [point, setPoint] = useState(0);
  const [isNegative, setIsNegative] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setPoint(editData.point < 0 ? Math.abs(editData.point) : editData.point);
      setIsNegative(editData.isNegative || editData.point < 0);
      setDescription(editData.description);
    } else {
      setTitle("");
      setPoint(0);
      setIsNegative(false);
      setDescription("");
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If isNegative is true, we store point as negative value
    const finalPoint = isNegative ? -Math.abs(point) : Math.abs(point);
    const payload = { title, point: finalPoint, isNegative, description };
    const url = editData ? `/api/incidents/${editData._id}` : "/api/incidents";
    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("successfully saved");
        onRefresh();
        onClose();
      } else {
        alert("Failed to save incident");
      }
    } catch (error) {
      console.error("Error saving incident:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-bgray-900 dark:text-white">
            {editData ? "Edit Incident" : "Add Incident"}
            </h2>
            <button onClick={onClose} className="text-bgray-500 hover:text-bgray-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6L18 18"/></svg>
            </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:ring-2 focus:ring-success-300 outline-none"
            />
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Point *</label>
                <input
                type="number"
                required
                value={point}
                onChange={(e) => setPoint(Number(e.target.value))}
                className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:ring-2 focus:ring-success-300 outline-none"
                />
            </div>
            <div className="flex-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={isNegative}
                        onChange={(e) => setIsNegative(e.target.checked)}
                        className="w-5 h-5 rounded border-bgray-300 text-success-300 focus:ring-success-300 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-bgray-700 dark:text-white group-hover:text-success-300 transition-colors">Is This Negative Incident</span>
                </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Description *</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg dark:bg-darkblack-500 text-bgray-900 dark:text-white focus:ring-2 focus:ring-success-300 outline-none"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-bgray-100 dark:border-darkblack-400">
            <button 
                type="button" 
                onClick={onClose} 
                className="px-6 py-2 bg-bgray-100 dark:bg-darkblack-400 text-bgray-900 dark:text-white rounded-lg font-semibold hover:bg-bgray-200 dark:hover:bg-darkblack-300 transition"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                className="px-8 py-2 bg-success-300 text-white rounded-lg font-bold hover:bg-success-400 transition shadow-lg shadow-success-300/20"
            >
                Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
