import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface LiveClass {
  _id: string;
  classTitle: string;
  description: string;
  dateTime: string;
  duration: number;
  createdBy: string;
  createdFor: string;
  classes: string[];
  meetingUrl: string;
  status: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  editData: LiveClass | null;
}

export default function ZoomLiveClassModal({ isOpen, onClose, onRefresh, editData }: ModalProps) {
  const router = useRouter();
  const [classTitle, setClassTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [createdBy, setCreatedBy] = useState("");
  const [createdFor, setCreatedFor] = useState("");
  const [addedClasses, setAddedClasses] = useState<string[]>([]);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [tempClass, setTempClass] = useState("Class 1");
  const [tempSection, setTempSection] = useState("A");
  const [status, setStatus] = useState("Awaited");

  const classList = ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10"];
  const sectionList = ["A","B","C","D","E"];

  useEffect(() => {
    if (editData) {
      setClassTitle(editData.classTitle);
      setDescription(editData.description);
      const dt = new Date(editData.dateTime).toISOString().slice(0, 16);
      setDateTime(dt);
      setDuration(editData.duration);
      setCreatedBy(editData.createdBy);
      setCreatedFor(editData.createdFor);
      setAddedClasses(editData.classes || []);
      setMeetingUrl(editData.meetingUrl || "");
      setStatus(editData.status);
    } else {
      setClassTitle("");
      setDescription("");
      setDateTime("");
      setDuration(0);
      setCreatedBy("");
      setCreatedFor("");
      setAddedClasses([]);
      setMeetingUrl("");
      setStatus("Awaited");
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      classTitle,
      description,
      dateTime,
      duration,
      createdBy,
      createdFor,
      classes: addedClasses,
      meetingUrl,
      status,
    };

    const url = editData ? `/api/zoom-live-classes/${editData._id}` : "/api/zoom-live-classes";
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
        router.push("/admin/ZoomLiveClasses/liveMeeting");
      } else {
        console.error("Failed to save Zoom Live Class");
      }
    } catch (error) {
      console.error("Error saving Zoom Live Class:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkblack-600 rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-bgray-900 dark:text-white">
          {editData ? "Edit Zoom Live Class" : "Add Zoom Live Class"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Class Title</label>
            <input
              type="text"
              required
              value={classTitle}
              onChange={(e) => setClassTitle(e.target.value)}
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
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Zoom Meeting URL</label>
            <input
              type="text"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              placeholder="e.g. https://zoom.us/j/..."
              className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Created For</label>
              <input
                type="text"
                value={createdFor}
                onChange={(e) => setCreatedFor(e.target.value)}
                className="w-full px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-bgray-900 dark:text-white">Add Classes & Sections</label>
            <div className="flex gap-2 mb-3">
              <select
                value={tempClass}
                onChange={(e) => setTempClass(e.target.value)}
                className="flex-1 px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm"
              >
                {classList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={tempSection}
                onChange={(e) => setTempSection(e.target.value)}
                className="w-24 px-3 py-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-300 dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm"
              >
                {sectionList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button
                type="button"
                onClick={() => {
                  const newEntry = `${tempClass} (${tempSection})`;
                  if (!addedClasses.includes(newEntry)) {
                    setAddedClasses([...addedClasses, newEntry]);
                  }
                }}
                className="px-4 py-2 bg-bgray-100 dark:bg-darkblack-500 text-bgray-900 dark:text-white rounded-lg hover:bg-bgray-200 transition-colors font-semibold border border-bgray-300 dark:border-darkblack-400"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 p-3 border border-dashed border-bgray-300 dark:border-darkblack-400 rounded-lg min-h-[50px] bg-bgray-50 dark:bg-darkblack-600/30">
              {addedClasses.length === 0 ? (
                <span className="text-xs text-bgray-500 italic">No classes added yet</span>
              ) : (
                addedClasses.map((cls, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-success-50 text-success-300 px-3 py-1 rounded-full text-sm font-medium border border-success-100 dark:bg-success-300/10 dark:border-success-300/20">
                    <span>{cls}</span>
                    <button
                      type="button"
                      onClick={() => setAddedClasses(addedClasses.filter(c => c !== cls))}
                      className="hover:text-error-300 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))
              )}
            </div>
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
