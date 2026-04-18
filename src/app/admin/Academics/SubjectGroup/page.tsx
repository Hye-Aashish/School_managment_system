"use client";
import React, { useState, useEffect } from "react";

export default function SubjectGroup() {
     const [loading, setLoading] = useState(false);
     const [classList, setClassList] = useState<any[]>([]);
     const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
     const [groups, setGroups] = useState<any[]>([]);
     const [searchTerm, setSearchTerm] = useState("");

     // Form State
     const [name, setName] = useState("");
     const [selectedClassId, setSelectedClassId] = useState("");
     const [availableSections, setAvailableSections] = useState<any[]>([]);
     const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
     const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
     const [description, setDescription] = useState("");
     const [editingId, setEditingId] = useState<string | null>(null);

     const fetchData = async () => {
          setLoading(true);
          try {
               const [classesRes, subjectsRes, groupsRes] = await Promise.all([
                    fetch("/api/classes"),
                    fetch("/api/subjects"),
                    fetch("/api/subject-groups")
               ]);
               
               const classesData = await classesRes.json();
               const subjectsData = await subjectsRes.json();
               const groupsData = await groupsRes.json();
               
               if (classesData.success) setClassList(classesData.data);
               if (subjectsData.success) setAvailableSubjects(subjectsData.data);
               if (groupsData.success) setGroups(groupsData.data);
          } catch (error) {
               console.error("Failed to fetch data");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     // When class changes, update available sections
     useEffect(() => {
          if (selectedClassId) {
               const selectedClass = classList.find(c => c._id === selectedClassId);
               if (selectedClass) {
                    setAvailableSections(selectedClass.sections || []);
                    // Keep previously selected sections if they still exist in the new class
                    setSelectedSectionIds(prev => prev.filter(id => 
                         (selectedClass.sections || []).some((s: any) => s._id === id)
                    ));
               }
          } else {
               setAvailableSections([]);
               setSelectedSectionIds([]);
          }
     }, [selectedClassId, classList]);

     const handleSave = async () => {
          if (!name || !selectedClassId) return;
          setLoading(true);
          try {
               const res = await fetch("/api/subject-groups", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         id: editingId,
                         name,
                         classId: selectedClassId,
                         sections: selectedSectionIds,
                         subjects: selectedSubjectIds,
                         description
                    })
               });
               const data = await res.json();
               if (data.success) {
                    resetForm();
                    fetchData();
               }
          } catch (error) {
               console.error("Error saving subject group:", error);
          } finally {
               setLoading(false);
          }
     };

     const resetForm = () => {
          setName("");
          setSelectedClassId("");
          setSelectedSectionIds([]);
          setSelectedSubjectIds([]);
          setDescription("");
          setEditingId(null);
     };

     const handleEdit = (group: any) => {
          setEditingId(group._id);
          setName(group.name);
          setSelectedClassId(group.class?._id || "");
          setSelectedSectionIds(group.sections.map((s: any) => s._id));
          setSelectedSubjectIds(group.subjects.map((s: any) => s._id));
          setDescription(group.description || "");
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this group?")) return;
          try {
               const res = await fetch(`/api/subject-groups?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchData();
          } catch (error) {
               console.error("Error deleting group:", error);
          }
     };

     const filteredGroups = groups.filter(g => 
          g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (g.class?.name && g.class.name.toLowerCase().includes(searchTerm.toLowerCase()))
     );

     return (
          <div className="2xl:flex 2xl:space-x-12">
               {/* Left Section - Add Subject Group Form */}
               <section className="2xl:w-[450px] 2xl:mb-0 mb-6 shrink-0">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-8 flex items-center gap-3">
                              <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                              {editingId ? "Edit Subject Group" : "Add Subject Group"}
                         </h3>
                         <div className="flex flex-col space-y-6">
                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Group Name</label>
                                   <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Science Group"
                                        className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Class</label>
                                   <select
                                        value={selectedClassId}
                                        onChange={(e) => setSelectedClassId(e.target.value)}
                                        className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   >
                                        <option value="">Select Class</option>
                                        {classList.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                   </select>
                              </div>

                              {selectedClassId && (
                                   <div className="space-y-3">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Sections</label>
                                        <div className="flex flex-wrap gap-2">
                                             {availableSections.map(s => (
                                                  <button
                                                       key={s._id}
                                                       onClick={() => setSelectedSectionIds(prev => prev.includes(s._id) ? prev.filter(id => id !== s._id) : [...prev, s._id])}
                                                       className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                                            selectedSectionIds.includes(s._id) 
                                                                 ? "bg-success-300 text-white border-success-300 shadow-sm" 
                                                                 : "bg-bgray-50 dark:bg-darkblack-500 text-bgray-600 dark:text-bgray-50 border-bgray-200 dark:border-darkblack-400"
                                                       }`}
                                                  >
                                                       {s.name}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>
                              )}

                              <div className="space-y-3">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Subjects</label>
                                   <div className="max-h-[250px] overflow-y-auto p-2 space-y-2 rounded-xl border border-bgray-100 dark:border-darkblack-400">
                                        {availableSubjects.map(sub => (
                                             <label key={sub._id} className="flex items-center gap-3 p-2 hover:bg-bgray-50 dark:hover:bg-darkblack-500 rounded-lg cursor-pointer transition-colors">
                                                  <input
                                                       type="checkbox"
                                                       checked={selectedSubjectIds.includes(sub._id)}
                                                       onChange={() => setSelectedSubjectIds(prev => prev.includes(sub._id) ? prev.filter(id => id !== sub._id) : [...prev, sub._id])}
                                                       className="w-5 h-5 rounded border-bgray-300 text-success-300 focus:ring-success-300"
                                                  />
                                                  <span className="text-sm font-semibold text-bgray-800 dark:text-bgray-50">{sub.name} <span className="text-xs text-bgray-400">({sub.type})</span></span>
                                             </label>
                                        ))}
                                   </div>
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Description</label>
                                   <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none resize-none"
                                   />
                              </div>

                              <div className="flex gap-4 pt-4">
                                   {editingId && (
                                        <button onClick={resetForm} className="flex-1 py-4 font-bold text-bgray-700 dark:text-white bg-bgray-100 dark:bg-darkblack-500 rounded-xl hover:bg-bgray-200 transition-all border border-bgray-200 dark:border-darkblack-400">Cancel</button>
                                   )}
                                   <button onClick={handleSave} disabled={loading} className="flex-[2] py-4 bg-success-300 text-white font-bold rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 disabled:opacity-50">
                                        {loading ? "Processing..." : editingId ? "Update Group" : "Create Group"}
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Right Section - Subject Group List */}
               <section className="2xl:flex-1">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                         <div className="flex justify-between items-center mb-8">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Subject Groups</h3>
                              <div className="relative w-64">
                                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                   </span>
                                   <input
                                        type="text"
                                        placeholder="Search groups..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2.5 bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 rounded-xl text-sm focus:ring-2 focus:ring-success-300/50 outline-none"
                                   />
                              </div>
                         </div>

                         <div className="overflow-x-auto min-h-[60vh]">
                              <table className="w-full">
                                   <thead>
                                        <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-left border-b border-bgray-200 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 text-xs font-bold uppercase tracking-widest">
                                             <td className="px-6 py-4">Group Info</td>
                                             <td className="px-6 py-4">Class (Sections)</td>
                                             <td className="px-6 py-4">Subjects</td>
                                             <td className="px-6 py-4 text-right">Action</td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {loading && groups.length === 0 ? (
                                             <tr><td colSpan={4} className="py-20 text-center text-bgray-400">Loading Groups...</td></tr>
                                        ) : filteredGroups.length > 0 ? (
                                             filteredGroups.map(group => (
                                                  <tr key={group._id} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-6 py-6">
                                                            <p className="font-bold text-bgray-900 dark:text-white mb-1">{group.name}</p>
                                                            {group.description && <p className="text-xs text-bgray-500 dark:text-bgray-400 max-w-[200px] truncate">{group.description}</p>}
                                                       </td>
                                                       <td className="px-6 py-6">
                                                            <div className="flex items-center gap-2">
                                                                 <span className="font-bold text-bgray-800 dark:text-bgray-50">{group.class?.name || "N/A"}</span>
                                                                 <div className="flex gap-1">
                                                                      {group.sections?.map((s: any) => (
                                                                           <span key={s._id} className="px-2 py-0.5 bg-bgray-100 dark:bg-darkblack-500 rounded text-[10px] font-black text-bgray-500 uppercase">{s.name}</span>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-6">
                                                            <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                                                                 {group.subjects?.map((sub: any) => (
                                                                      <span key={sub._id} className="px-2.5 py-1 bg-success-50 text-success-300 dark:bg-success-300/10 rounded-full text-[11px] font-bold border border-success-300/10">
                                                                           {sub.name}
                                                                      </span>
                                                                 ))}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-6">
                                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                 <button onClick={() => handleEdit(group)} className="p-2.5 bg-bgray-100 dark:bg-darkblack-500 rounded-xl hover:bg-success-300 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                                                                 <button onClick={() => handleDelete(group._id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr><td colSpan={4} className="py-20 text-center text-bgray-400">No subject groups found.</td></tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </section>
          </div>
     );
}