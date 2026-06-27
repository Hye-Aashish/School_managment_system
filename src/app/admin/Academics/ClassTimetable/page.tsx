"use client";
import React, { useState, useEffect } from "react";

type Period = {
     subject: string;
     time: string;
     teacher: string;
     room: string;
};

type TimetableData = {
     monday: Period[];
     tuesday: Period[];
     wednesday: Period[];
     thursday: Period[];
     friday: Period[];
     saturday: Period[];
     sunday: Period[];
};

export default function ClassRoutine() {
     const [classes, setClasses] = useState<any[]>([]);
     const [selectedClass, setSelectedClass] = useState<string>("");
     const [selectedSection, setSelectedSection] = useState<string>("");
     const [loadingClasses, setLoadingClasses] = useState<boolean>(false);
     
     const [timetableData, setTimetableData] = useState<TimetableData>({
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
     });
     const [loadingTimetable, setLoadingTimetable] = useState<boolean>(false);
     const [saving, setSaving] = useState(false);
     const [deleting, setDeleting] = useState(false);

     // Modal for adding/editing a period
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [modalDay, setModalDay] = useState<keyof TimetableData>("monday");
     const [editIndex, setEditIndex] = useState<number | null>(null);
     const [modalSubject, setModalSubject] = useState("");
     const [modalTime, setModalTime] = useState("");
     const [modalTeacher, setModalTeacher] = useState("");
     const [modalRoom, setModalRoom] = useState("");

     // Fetch classes on mount
     useEffect(() => {
          const fetchClasses = async () => {
               setLoadingClasses(true);
               try {
                    const res = await fetch("/api/classes");
                    const data = await res.json();
                    if (data.success && data.data.length > 0) {
                         setClasses(data.data);
                         // Preselect first class & section
                         const firstClass = data.data[0];
                         setSelectedClass(firstClass.name);
                         if (firstClass.sections && firstClass.sections.length > 0) {
                              const firstSection = firstClass.sections[0].name || firstClass.sections[0];
                              setSelectedSection(firstSection);
                         }
                    }
               } catch (error) {
                    console.error("Error fetching classes:", error);
               } finally {
                    setLoadingClasses(false);
               }
          };
          fetchClasses();
     }, []);

     // Fetch timetable when class or section changes
     useEffect(() => {
          const fetchTimetable = async () => {
               if (!selectedClass || !selectedSection) return;
               setLoadingTimetable(true);
               try {
                    const res = await fetch(`/api/student/timetable?class=${encodeURIComponent(selectedClass)}&section=${encodeURIComponent(selectedSection)}`);
                    const data = await res.json();
                    if (data.success && data.data) {
                         setTimetableData({
                              monday: data.data.monday || [],
                              tuesday: data.data.tuesday || [],
                              wednesday: data.data.wednesday || [],
                              thursday: data.data.thursday || [],
                              friday: data.data.friday || [],
                              saturday: data.data.saturday || [],
                              sunday: data.data.sunday || []
                         });
                    } else {
                         // Default empty grid
                         setTimetableData({
                              monday: [],
                              tuesday: [],
                              wednesday: [],
                              thursday: [],
                              friday: [],
                              saturday: [],
                              sunday: []
                         });
                    }
               } catch (error) {
                    console.error("Error fetching timetable:", error);
               } finally {
                    setLoadingTimetable(false);
               }
          };

          fetchTimetable();
     }, [selectedClass, selectedSection]);

     const handleClassChange = (className: string) => {
          setSelectedClass(className);
          const clsObj = classes.find(c => c.name === className);
          if (clsObj && clsObj.sections && clsObj.sections.length > 0) {
               const sectionName = clsObj.sections[0].name || clsObj.sections[0];
               setSelectedSection(sectionName);
          } else {
               setSelectedSection("");
          }
     };

     // Open Modal to Add Period
     const openAddModal = (day: keyof TimetableData) => {
          setModalDay(day);
          setEditIndex(null);
          setModalSubject("");
          setModalTime("");
          setModalTeacher("");
          setModalRoom("");
          setIsModalOpen(true);
     };

     // Open Modal to Edit Period
     const openEditModal = (day: keyof TimetableData, index: number, period: Period) => {
          setModalDay(day);
          setEditIndex(index);
          setModalSubject(period.subject);
          setModalTime(period.time);
          setModalTeacher(period.teacher);
          setModalRoom(period.room);
          setIsModalOpen(true);
     };

     // Save Period inside modal state
     const handleSavePeriod = (e: React.FormEvent) => {
          e.preventDefault();
          if (!modalSubject.trim() || !modalTime.trim() || !modalTeacher.trim()) {
               alert("Subject, Time, and Teacher are required.");
               return;
          }

          const newPeriod: Period = {
               subject: modalSubject.trim(),
               time: modalTime.trim(),
               teacher: modalTeacher.trim(),
               room: modalRoom.trim()
          };

          setTimetableData(prev => {
               const updatedDayList = [...prev[modalDay]];
               if (editIndex !== null) {
                    updatedDayList[editIndex] = newPeriod;
               } else {
                    updatedDayList.push(newPeriod);
               }
               return {
                    ...prev,
                    [modalDay]: updatedDayList
               };
          });

          setIsModalOpen(false);
     };

     // Delete Period from state
     const handleDeletePeriod = (day: keyof TimetableData, index: number) => {
          if (!confirm("Are you sure you want to delete this period?")) return;
          setTimetableData(prev => {
               const updatedDayList = prev[day].filter((_, i) => i !== index);
               return {
                    ...prev,
                    [day]: updatedDayList
               };
          });
     };

     // Save Entire Timetable to Backend
     const handleSaveTimetable = async () => {
          if (!selectedClass || !selectedSection) {
               alert("Please select a Class and Section first.");
               return;
          }
          setSaving(true);
          try {
               const payload = {
                    className: selectedClass,
                    section: selectedSection,
                    ...timetableData
               };
               const res = await fetch("/api/student/timetable", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
               });
               const data = await res.json();
               if (data.success) {
                    alert("Timetable saved successfully and notifications dispatched!");
               } else {
                    alert(data.error || "Failed to save timetable");
               }
          } catch (error) {
               console.error("Error saving timetable:", error);
               alert("An error occurred while saving the timetable.");
          } finally {
               setSaving(false);
          }
     };

     // Delete Entire Timetable from Backend
     const handleDeleteTimetable = async () => {
          if (!selectedClass || !selectedSection) {
               alert("Please select a Class and Section first.");
               return;
          }
          if (!confirm(`Are you sure you want to delete the entire timetable for ${selectedClass} (${selectedSection})?`)) {
               return;
          }
          setDeleting(true);
          try {
               const res = await fetch(`/api/student/timetable?class=${encodeURIComponent(selectedClass)}&section=${encodeURIComponent(selectedSection)}`, {
                    method: "DELETE"
               });
               const data = await res.json();
               if (data.success) {
                    alert("Timetable deleted successfully.");
                    setTimetableData({
                         monday: [],
                         tuesday: [],
                         wednesday: [],
                         thursday: [],
                         friday: [],
                         saturday: [],
                         sunday: []
                    });
               } else {
                    alert(data.error || "Failed to delete timetable");
               }
          } catch (error) {
               console.error("Error deleting timetable:", error);
               alert("An error occurred while deleting the timetable.");
          } finally {
               setDeleting(false);
          }
     };

     const daysOfWeek: { key: keyof TimetableData; label: string }[] = [
          { key: "monday", label: "Monday" },
          { key: "tuesday", label: "Tuesday" },
          { key: "wednesday", label: "Wednesday" },
          { key: "thursday", label: "Thursday" },
          { key: "friday", label: "Friday" },
          { key: "saturday", label: "Saturday" },
          { key: "sunday", label: "Sunday" }
     ];

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   {/* Filters */}
                                   <div className="w-full flex justify-between items-end flex-wrap gap-4">
                                        <div className="flex gap-4 flex-wrap">
                                             {/* Class */}
                                             <div className="flex flex-col space-y-2">
                                                  <label className="text-sm font-semibold text-bgray-600 dark:text-white">
                                                       Class <span className="text-red-500">*</span>
                                                  </label>
                                                  <select
                                                       value={selectedClass}
                                                       onChange={(e) => handleClassChange(e.target.value)}
                                                       disabled={loadingClasses}
                                                       className="h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white min-w-[200px] outline-none focus:ring-2 focus:ring-success-300 transition-all font-bold text-sm"
                                                  >
                                                       {loadingClasses ? (
                                                            <option>Loading...</option>
                                                       ) : classes.length === 0 ? (
                                                            <option>No classes found</option>
                                                       ) : (
                                                            classes.map(c => (
                                                                 <option key={c._id} value={c.name}>{c.name}</option>
                                                            ))
                                                       )}
                                                  </select>
                                             </div>

                                             {/* Section */}
                                             <div className="flex flex-col space-y-2">
                                                  <label className="text-sm font-semibold text-bgray-600 dark:text-white">
                                                       Section <span className="text-red-500">*</span>
                                                  </label>
                                                  <select
                                                       value={selectedSection}
                                                       onChange={(e) => setSelectedSection(e.target.value)}
                                                       disabled={loadingClasses || !selectedClass}
                                                       className="h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white min-w-[200px] outline-none focus:ring-2 focus:ring-success-300 transition-all font-bold text-sm"
                                                  >
                                                       {!selectedClass ? (
                                                            <option>Select Class First</option>
                                                       ) : classes.find(c => c.name === selectedClass)?.sections?.length === 0 ? (
                                                            <option>No sections found</option>
                                                       ) : (
                                                            classes.find(c => c.name === selectedClass)?.sections?.map((s: any) => {
                                                                 const sName = s.name || s;
                                                                 const sId = s._id || sName;
                                                                 return (
                                                                      <option key={sId} value={sName}>{sName}</option>
                                                                 );
                                                            })
                                                       )}
                                                  </select>
                                             </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center space-x-3">
                                             <button
                                                  type="button"
                                                  onClick={handleSaveTimetable}
                                                  disabled={saving || loadingTimetable}
                                                  className="h-12 px-6 rounded-lg bg-success-300 text-white font-black hover:bg-success-400 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-lg shadow-success-300/20 uppercase tracking-widest text-[10px]"
                                             >
                                                  {saving ? "Saving..." : "Save Timetable"}
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={handleDeleteTimetable}
                                                  disabled={deleting || loadingTimetable}
                                                  className="h-12 px-6 rounded-lg bg-red-500 text-white font-black hover:bg-red-600 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-lg shadow-red-500/20 uppercase tracking-widest text-[10px]"
                                             >
                                                  {deleting ? "Deleting..." : "Delete Timetable"}
                                             </button>
                                        </div>
                                   </div>

                                   {/* Timetable Grid */}
                                   {loadingTimetable ? (
                                        <div className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></div>
                                   ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                                             {daysOfWeek.map(({ key, label }) => {
                                                  const list = timetableData[key] || [];
                                                  return (
                                                       <div key={key} className="flex flex-col space-y-3">
                                                            <div className="flex justify-between items-center pb-2 border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <h3 className="text-sm font-bold text-bgray-900 dark:text-white uppercase tracking-wider">
                                                                      {label}
                                                                 </h3>
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => openAddModal(key)}
                                                                      className="p-1.5 rounded-lg bg-success-50 dark:bg-success-300/10 text-success-300 hover:bg-success-300 hover:text-white transition-all shadow-sm"
                                                                      title={`Add entry for ${label}`}
                                                                 >
                                                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                                           <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                           <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                      </svg>
                                                                 </button>
                                                            </div>

                                                            {list.length === 0 ? (
                                                                 <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10">
                                                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-red-500 flex-shrink-0">
                                                                           <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M15 9L9 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                           <path d="M9 9L15 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                      </svg>
                                                                      <span className="text-xs font-bold text-red-500">Not Scheduled</span>
                                                                 </div>
                                                            ) : (
                                                                 <div className="flex flex-col space-y-3">
                                                                      {list.map((period, index) => (
                                                                           <div key={index} className="p-3.5 rounded-xl border border-bgray-300 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500 space-y-2 group relative transition-all duration-200 hover:shadow-md">
                                                                                
                                                                                {/* Action buttons visible on hover */}
                                                                                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-bgray-50 dark:bg-darkblack-500 pl-1 rounded-lg">
                                                                                     <button
                                                                                          type="button"
                                                                                          onClick={() => openEditModal(key, index, period)}
                                                                                          className="p-1.5 text-bgray-500 dark:text-bgray-400 hover:text-success-300 transition-colors"
                                                                                          title="Edit Period"
                                                                                     >
                                                                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                                               <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                                               <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                                          </svg>
                                                                                     </button>
                                                                                     <button
                                                                                          type="button"
                                                                                          onClick={() => handleDeletePeriod(key, index)}
                                                                                          className="p-1.5 text-bgray-500 dark:text-bgray-400 hover:text-red-500 transition-colors"
                                                                                          title="Delete Period"
                                                                                     >
                                                                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                                               <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                                          </svg>
                                                                                     </button>
                                                                                </div>

                                                                                <div className="flex items-start space-x-2 pr-6">
                                                                                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-success-300 flex-shrink-0 mt-0.5">
                                                                                          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     </svg>
                                                                                     <p className="text-xs font-bold text-success-300 truncate">Subj: {period.subject}</p>
                                                                                </div>

                                                                                <div className="flex items-start space-x-2">
                                                                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300 flex-shrink-0 mt-0.5">
                                                                                          <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                          <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     </svg>
                                                                                     <p className="text-xs text-bgray-600 dark:text-bgray-300 truncate font-semibold">{period.time}</p>
                                                                                </div>

                                                                                <div className="flex items-start space-x-2">
                                                                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300 flex-shrink-0 mt-0.5">
                                                                                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     </svg>
                                                                                     <p className="text-xs text-bgray-600 dark:text-bgray-300 truncate font-semibold">{period.teacher}</p>
                                                                                </div>

                                                                                <div className="flex items-start space-x-2">
                                                                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-bgray-600 dark:stroke-bgray-300 flex-shrink-0 mt-0.5">
                                                                                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V9H3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                          <path d="M9 22V12H15V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                     </svg>
                                                                                     <p className="text-xs text-bgray-600 dark:text-bgray-300 truncate font-semibold">{period.room || "Room No.: —"}</p>
                                                                                </div>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            )}
                                                       </div>
                                                  );
                                             })}
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>

               {/* Period Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <div className="absolute inset-0 bg-bgray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                         <div className="relative bg-white dark:bg-darkblack-600 rounded-[30px] w-full max-w-lg shadow-2xl overflow-hidden border border-success-300/20">
                              <div className="p-6 border-b border-bgray-100 dark:border-darkblack-400 bg-bgray-50/50">
                                   <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">
                                        {editIndex !== null ? "Edit Period" : "Add Period"} — {modalDay}
                                   </h3>
                              </div>
                              <form onSubmit={handleSavePeriod} className="p-6 space-y-5">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Subject Name *</label>
                                        <input
                                             required
                                             type="text"
                                             value={modalSubject}
                                             onChange={(e) => setModalSubject(e.target.value)}
                                             placeholder="e.g. English (210)"
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        />
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Time Slot *</label>
                                        <input
                                             required
                                             type="text"
                                             value={modalTime}
                                             onChange={(e) => setModalTime(e.target.value)}
                                             placeholder="e.g. 09:00 AM - 09:45 AM"
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        />
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Teacher Name *</label>
                                        <input
                                             required
                                             type="text"
                                             value={modalTeacher}
                                             onChange={(e) => setModalTeacher(e.target.value)}
                                             placeholder="e.g. Shivam Verma (9002)"
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30"
                                        />
                                   </div>
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Room Number</label>
                                        <input
                                             type="text"
                                             value={modalRoom}
                                             onChange={(e) => setModalRoom(e.target.value)}
                                             placeholder="e.g. Room No.: 12"
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-semibold text-success-300"
                                        />
                                   </div>
                                   
                                   <div className="flex justify-end space-x-3 pt-6 border-t border-bgray-100 dark:border-darkblack-400 mt-6">
                                        <button
                                             type="button"
                                             onClick={() => setIsModalOpen(false)}
                                             className="px-8 h-12 bg-bgray-50 dark:bg-darkblack-500 text-bgray-500 font-black rounded-xl hover:bg-bgray-100 dark:hover:bg-darkblack-400 transition-all uppercase tracking-widest text-[10px]"
                                        >
                                             Discard
                                        </button>
                                        <button
                                             type="submit"
                                             className="px-10 h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px]"
                                        >
                                             {editIndex !== null ? "Save Changes" : "Commit Period"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </>
     );
}