"use client";
import React, { useState, useEffect } from "react";

interface IExam {
    _id: string;
    name: string;
}

interface IExamSchedule {
    _id: string;
    exam: IExam | string;
    subject: string;
    date: string;
    time: string;
    duration: string;
    roomNo: string;
    maxMarks: number;
    minMarks: number;
}

export default function ExamSchedule() {
     const [exams, setExams] = useState<IExam[]>([]);
     const [schedules, setSchedules] = useState<IExamSchedule[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({
          exam: "",
          subject: "",
          date: "",
          time: "",
          duration: "",
          roomNo: "",
          maxMarks: 100,
          minMarks: 33
     });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchData = async () => {
          setIsLoading(true);
          try {
               const [examsRes, schedulesRes] = await Promise.all([
                    fetch("/api/cbse-exams"),
                    fetch("/api/cbse-exam-schedules")
               ]);

               if (examsRes.ok) setExams(await examsRes.json());
               if (schedulesRes.ok) setSchedules(await schedulesRes.json());

          } catch (error) {
               console.error("Error fetching data:", error);
               showNotification("Failed to load data", "error");
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.exam || !formData.subject || !formData.date) return;

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-exam-schedules/${editingId}` : "/api/cbse-exam-schedules";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               if (res.ok) {
                    setFormData({
                         exam: "", subject: "", date: "", time: "", duration: "", roomNo: "", maxMarks: 100, minMarks: 33
                    });
                    setEditingId(null);
                    fetchData();
                    showNotification(editingId ? "Schedule updated!" : "Schedule added!", "success");
               } else {
                    const data = await res.json();
                    showNotification(data.error || "Error saving schedule", "error");
               }
          } catch (error) {
               console.error("Error saving schedule:", error);
               showNotification("An error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (schedule: IExamSchedule) => {
          setEditingId(schedule._id);
          setFormData({
               exam: typeof schedule.exam === 'object' ? schedule.exam._id : schedule.exam,
               subject: schedule.subject,
               date: schedule.date,
               time: schedule.time,
               duration: schedule.duration,
               roomNo: schedule.roomNo,
               maxMarks: schedule.maxMarks,
               minMarks: schedule.minMarks
          });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Delete this schedule?")) return;
          try {
               const res = await fetch(`/api/cbse-exam-schedules/${id}`, { method: "DELETE" });
               if (res.ok) {
                    fetchData();
                    showNotification("Schedule deleted!", "success");
               }
          } catch (error) {
               showNotification("Error deleting schedule", "error");
          }
     };

     // Group schedules by Exam
     const groupedSchedules = schedules.reduce((acc: { [key: string]: { name: string, items: IExamSchedule[] } }, item) => {
          const exam = item.exam as IExam;
          const examId = exam?._id || "Unknown";
          const examName = exam?.name || "Unknown Exam";
          
          if (!acc[examId]) {
               acc[examId] = { name: examName, items: [] };
          }
          acc[examId].items.push(item);
          return acc;
     }, {});

     const filteredExamIds = Object.keys(groupedSchedules).filter(id => 
          groupedSchedules[id].name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               {notification && (
                    <div className="fixed top-5 right-5 z-[100] animate-fade-in">
                         <div className={`px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" ? "bg-success-50 border-success-300 text-success-500" : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 group">
                         <div className="flex flex-col lg:flex-row gap-6">
                              {/* Left Column - Form */}
                              <div className="w-full lg:max-w-[350px] p-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        {editingId ? "Edit Schedule" : "Add Schedule"}
                                   </h3>
                                   <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Exam *</label>
                                             <select
                                                  value={formData.exam}
                                                  onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                                                  required
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                             >
                                                  <option value="">Select Exam</option>
                                                  {exams.map(e => <option key={e._id} value={e._id}>{e.name}</option>)}
                                             </select>
                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Subject *</label>
                                             <input
                                                  type="text"
                                                  value={formData.subject}
                                                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                  required
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  placeholder="e.g. Mathematics"
                                             />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                  <label className="block text-sm font-medium mb-1">Date *</label>
                                                  <input
                                                       type="date"
                                                       value={formData.date}
                                                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                       required
                                                       className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium mb-1">Time *</label>
                                                  <input
                                                       type="time"
                                                       value={formData.time}
                                                       onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                       required
                                                       className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  />
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                  <label className="block text-sm font-medium mb-1">Duration (min)</label>
                                                  <input
                                                       type="text"
                                                       value={formData.duration}
                                                       onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                       className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                       placeholder="90"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium mb-1">Room No.</label>
                                                  <input
                                                       type="text"
                                                       value={formData.roomNo}
                                                       onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                                                       className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                       placeholder="101"
                                                  />
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                  <label className="block text-sm font-medium mb-1">Max Marks</label>
                                                  <input
                                                       type="number"
                                                       value={formData.maxMarks}
                                                       onChange={(e) => setFormData({ ...formData, maxMarks: parseInt(e.target.value) })}
                                                       className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium mb-1">Min Marks</label>
                                                  <input
                                                       type="number"
                                                       value={formData.minMarks}
                                                       onChange={(e) => setFormData({ ...formData, minMarks: parseInt(e.target.value) })}
                                                       className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  />
                                             </div>
                                        </div>
                                        <div className="flex gap-3 pt-4">
                                             {editingId && (
                                                  <button
                                                       type="button"
                                                       onClick={() => { setEditingId(null); setFormData({ exam: "", subject: "", date: "", time: "", duration: "", roomNo: "", maxMarks: 100, minMarks: 33 }); }}
                                                       className="w-full py-2.5 rounded-lg bg-bgray-200 dark:bg-darkblack-500 font-semibold"
                                                  >
                                                       Cancel
                                                  </button>
                                             )}
                                             <button
                                                  type="submit"
                                                  disabled={isSubmitting}
                                                  className="w-full py-2.5 rounded-lg bg-success-300 text-white font-semibold disabled:opacity-50"
                                             >
                                                  {isSubmitting ? "Saving..." : editingId ? "Update" : "Save"}
                                             </button>
                                        </div>
                                   </form>
                              </div>

                              {/* Right Column - List */}
                              <div className="flex-1 p-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="mb-6">
                                        <input
                                             type="text"
                                             placeholder="Search Exam..."
                                             value={searchTerm}
                                             onChange={(e) => setSearchTerm(e.target.value)}
                                             className="w-full max-w-md p-2.5 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border-none"
                                        />
                                   </div>

                                   {isLoading ? (
                                        <div className="py-10 text-center">Loading schedules...</div>
                                   ) : filteredExamIds.length === 0 ? (
                                        <div className="py-10 text-center text-bgray-500">No schedules found</div>
                                   ) : (
                                        <div className="space-y-8">
                                             {filteredExamIds.map(examId => (
                                                  <div key={examId} className="border border-bgray-200 dark:border-darkblack-400 rounded-xl overflow-hidden shadow-sm">
                                                       <div className="bg-bgray-50 dark:bg-darkblack-500 py-3 px-6 flex justify-between items-center border-b border-bgray-200 dark:border-darkblack-400">
                                                            <h4 className="font-bold text-lg text-bgray-900 dark:text-white uppercase tracking-tight">
                                                                 {groupedSchedules[examId].name}
                                                            </h4>
                                                            <span className="text-xs font-semibold px-2 py-1 bg-success-100 text-success-600 rounded-full">
                                                                 {groupedSchedules[examId].items.length} Subjects
                                                            </span>
                                                       </div>
                                                       <div className="overflow-x-auto">
                                                            <table className="w-full text-sm">
                                                                 <thead>
                                                                      <tr className="text-bgray-600 dark:text-bgray-300 border-b border-bgray-100 dark:border-darkblack-400">
                                                                           <th className="py-3 px-6 text-left font-semibold">Subject</th>
                                                                           <th className="py-3 px-6 text-left font-semibold">Date & Time</th>
                                                                           <th className="py-3 px-6 text-left font-semibold">Duration</th>
                                                                           <th className="py-3 px-6 text-left font-semibold">Marks</th>
                                                                           <th className="py-3 px-6 text-right font-semibold">Action</th>
                                                                      </tr>
                                                                 </thead>
                                                                 <tbody>
                                                                      {groupedSchedules[examId].items.map(item => (
                                                                           <tr key={item._id} className="hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors border-b border-bgray-50 dark:border-darkblack-400 last:border-0 text-bgray-700 dark:text-bgray-200">
                                                                                <td className="py-4 px-6 font-medium">{item.subject}</td>
                                                                                <td className="py-4 px-6">
                                                                                     <div className="flex flex-col">
                                                                                          <span>{item.date}</span>
                                                                                          <span className="text-xs text-bgray-500">{item.time}</span>
                                                                                     </div>
                                                                                </td>
                                                                                <td className="py-4 px-6">{item.duration} min</td>
                                                                                <td className="py-4 px-6">
                                                                                     <div className="flex flex-col">
                                                                                          <span className="text-xs">Max: <span className="font-semibold">{item.maxMarks}</span></span>
                                                                                          <span className="text-xs text-bgray-500">Min: {item.minMarks}</span>
                                                                                     </div>
                                                                                </td>
                                                                                <td className="py-4 px-6 text-right">
                                                                                     <div className="flex justify-end space-x-2">
                                                                                          <button onClick={() => handleEdit(item)} className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-400 rounded text-success-300">
                                                                                               <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M9.16797 3.33334H3.33464C1.66797 3.33334 1.66797 5.00001 1.66797 5.00001V16.6667C1.66797 18.3333 3.33464 18.3333 3.33464 18.3333H15.0013C16.668 18.3333 16.668 16.6667 16.668 16.6667V10.8333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.418 2.08332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                                          </button>
                                                                                          <button onClick={() => handleDelete(item._id)} className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-400 rounded text-error-300">
                                                                                               <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M15.8333 5L14.1667 15.8333C14.1667 17.5 12.5 17.5 7.5 17.5C5.83333 17.5 5.83333 15.8333 5.83333 15.8333L4.16667 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 5H17.5" strokeWidth="1.5" strokeLinecap="round"/><path d="M7.5 5V3.33333C7.5 2.5 8.33333 2.5 8.33333 2.5H11.6667C12.5 2.5 12.5 3.33333 12.5 3.33333V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                                          </button>
                                                                                     </div>
                                                                                </td>
                                                                           </tr>
                                                                      ))}
                                                                 </tbody>
                                                            </table>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}