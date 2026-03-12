"use client";
import React, { useState, useEffect } from "react";

interface IFeeReminder {
  _id?: string;
  action: boolean;
  reminderType: 'Before' | 'After';
  days: number;
}

export default function FeeReminderPage() {
  const [reminders, setReminders] = useState<IFeeReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // New Reminder Form State
  const [newReminder, setNewReminder] = useState<Partial<IFeeReminder>>({
    action: true,
    reminderType: 'Before',
    days: 0
  });

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fees-reminder");
      if (res.ok) {
        const data = await res.json();
        setReminders(data);
      } else {
        setError("Failed to fetch reminders");
      }
    } catch (err) {
      setError("An error occurred while fetching reminders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleActionToggle = (id?: string, index?: number) => {
    if (id) {
      setReminders(prev => prev.map(r => r._id === id ? { ...r, action: !r.action } : r));
    } else if (index !== undefined) {
      setReminders(prev => prev.map((r, i) => i === index ? { ...r, action: !r.action } : r));
    }
  };

  const handleDaysChange = (value: string, id?: string, index?: number) => {
    const days = parseInt(value) || 0;
    if (id) {
      setReminders(prev => prev.map(r => r._id === id ? { ...r, days } : r));
    } else if (index !== undefined) {
      setReminders(prev => prev.map((r, i) => i === index ? { ...r, days } : r));
    }
  };

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/fees-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setNewReminder({ action: true, reminderType: 'Before', days: 0 });
        fetchReminders();
      } else {
        setError("Failed to add reminder");
      }
    } catch (err) {
      setError("An error occurred while adding reminder");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;
    try {
      const res = await fetch(`/api/fees-reminder?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        fetchReminders();
      } else {
        setError("Failed to delete reminder");
      }
    } catch (err) {
      setError("An error occurred while deleting");
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/fees-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reminders),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        fetchReminders();
      } else {
        setError("Failed to save reminders");
      }
    } catch (err) {
      setError("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Add New Reminder Section */}
      <div className="w-full rounded-lg bg-white dark:bg-darkblack-600 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="py-4 px-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Add Fees Reminder</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleAddReminder} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder Type</label>
              <select
                value={newReminder.reminderType}
                onChange={(e) => setNewReminder({...newReminder, reminderType: e.target.value as any})}
                className="w-full h-11 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-darkblack-500 px-4 text-sm text-gray-800 dark:text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Before">Before</option>
                <option value="After">After</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days</label>
              <input
                type="number"
                value={newReminder.days}
                onChange={(e) => setNewReminder({...newReminder, days: parseInt(e.target.value) || 0})}
                placeholder="Number of days"
                className="w-full h-11 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-darkblack-500 px-4 text-sm text-gray-800 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center h-11">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newReminder.action}
                  onChange={(e) => setNewReminder({...newReminder, action: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                disabled={saving}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-all disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Reminder"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Reminders List Section */}
      <div className="w-full rounded-lg bg-white dark:bg-darkblack-600 shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="py-4 px-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Fees Reminder Settings</h3>
        </div>

        <div className="p-6">
          {success && (
            <div className="mb-6 p-4 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] rounded-md transition-all duration-300">
              Record Updated Successfully
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="py-4 px-2 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Action</th>
                  <th className="py-4 px-2 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Reminder Type</th>
                  <th className="py-4 px-2 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Days</th>
                  <th className="py-4 px-2 text-right text-sm font-bold text-gray-700 dark:text-gray-300">Manage</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder, idx) => (
                  <tr key={reminder._id || idx} className="group border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={reminder.action}
                          onChange={() => handleActionToggle(reminder._id, idx)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-sm font-normal text-gray-700 dark:text-gray-200 uppercase">Active</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{reminder.reminderType}</span>
                    </td>
                    <td className="py-4 px-2">
                      <input
                        type="number"
                        value={reminder.days}
                        onChange={(e) => handleDaysChange(e.target.value, reminder._id, idx)}
                        className="w-full max-w-[120px] h-10 rounded-md border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-darkblack-500 px-3 text-sm text-gray-800 dark:text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button
                        onClick={() => reminder._id && handleDelete(reminder._id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Reminder"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="px-8 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium rounded-md transition-all shadow-sm active:transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? "Updating..." : "Update All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
