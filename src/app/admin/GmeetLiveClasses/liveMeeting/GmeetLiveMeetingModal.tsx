import React, { useState, useEffect } from "react";

interface LiveMeeting {
  _id: string;
  meetingTitle: string;
  description: string;
  dateTime: string;
  duration: number;
  createdBy: string;
  status: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  editData: LiveMeeting | null;
}

export default function GmeetLiveMeetingModal({ isOpen, onClose, onRefresh, editData }: ModalProps) {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("Awaited");

  useEffect(() => {
    if (editData) {
      setMeetingTitle(editData.meetingTitle);
      setDescription(editData.description);
      const dt = new Date(editData.dateTime).toISOString().slice(0, 16);
      setDateTime(dt);
      setDuration(editData.duration);
      setCreatedBy(editData.createdBy);
      setStatus(editData.status);
    } else {
      setMeetingTitle("");
      setDescription("");
      setDateTime("");
      setDuration(0);
      setCreatedBy("");
      setStatus("Awaited");
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      meetingTitle,
      description,
      dateTime,
      duration,
      createdBy,
      status,
    };

    const url = editData ? `/api/gmeet-live-meetings/${editData._id}` : "/api/gmeet-live-meetings";
    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onRefresh();
        onClose();
      } else {
        console.error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-bgray-900 dark:text-white">
          {editData ? "Edit Live Meeting" : "Add Live Meeting"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Meeting Title</label>
            <input
              type="text"
              required
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Date Time</label>
              <input
                type="datetime-local"
                required
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Duration (mins)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Created By</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            >
              <option value="Awaited">Awaited</option>
              <option value="Started">Started</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-success-300 text-white rounded-lg hover:bg-success-400 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
