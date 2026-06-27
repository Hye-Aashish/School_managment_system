"use client";
import React, { useState, useEffect } from "react";

export default function VideoTutorialPage() {
     const [classList, setClassList] = useState<any[]>([]);
     const [contents, setContents] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);

     const [formData, setFormData] = useState({
          title: "",
          type: "Video Tutorial",
          shareDate: new Date().toISOString().split('T')[0],
          description: "",
          fileUrl: "",
          availableFor: ["Student"] as string[],
          class: "",
          section: ""
     });

     const fetchInitialData = async () => {
          setLoading(true);
          try {
               const [classRes, contentsRes] = await Promise.all([
                    fetch("/api/classes"),
                    fetch("/api/download-contents")
               ]);
               const classData = await classRes.json();
               const contentsData = await contentsRes.json();

               if (classData.success) setClassList(classData.data);
               if (contentsData.success) {
                    // Filter list to only show video tutorials
                    const videos = contentsData.data.filter((item: any) => {
                         const rawType = (item.type || "").toLowerCase();
                         const rawUrl = (item.fileUrl || "").toLowerCase();
                         const rawTitle = (item.title || "").toLowerCase();
                         return rawType.includes("video") ||
                              rawType.includes("tutorial") ||
                              rawUrl.endsWith(".mp4") ||
                              rawTitle.includes("video");
                    });
                    setContents(videos);
               }
          } catch (e) {
               console.error("Failed to load initial data", e);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchInitialData();
     }, []);

     const toggleRecipient = (role: string) => {
          setFormData(prev => ({
               ...prev,
               availableFor: prev.availableFor.includes(role)
                    ? prev.availableFor.filter(r => r !== role)
                    : [...prev.availableFor, role]
          }));
     };

     const handleSave = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.fileUrl.startsWith("http")) {
               alert("Please enter a valid video link starting with http/https");
               return;
          }
          setSaving(true);
          try {
               const res = await fetch("/api/download-contents", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });
               const data = await res.json();
               if (data.success) {
                    alert("Video tutorial added successfully!");
                    setFormData({
                         title: "", type: "Video Tutorial", shareDate: new Date().toISOString().split('T')[0],
                         description: "", fileUrl: "", availableFor: ["Student"], class: "", section: ""
                    });
                    fetchInitialData();
               } else {
                    alert("Error: " + (data.error || "Failed to add video"));
               }
          } catch (e) {
               console.error(e);
               alert("An error occurred while saving the video tutorial.");
          } finally {
               setSaving(false);
          }
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this video tutorial?")) return;
          try {
               const res = await fetch(`/api/download-contents?id=${id}`, { method: "DELETE" });
               const data = await res.json();
               if (data.success) {
                    fetchInitialData();
               }
          } catch (e) {
               console.error("Error deleting video tutorial", e);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column - Add Video Tutorial */}
                    <div className="xl:col-span-1">
                         <section className="bg-white dark:bg-darkblack-600 rounded-[30px] p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2 uppercase tracking-tighter">
                                   <span className="w-1.5 h-6 bg-danger-300 rounded-full"></span>
                                   Add Video Tutorial
                              </h3>
                              <form onSubmit={handleSave} className="space-y-5">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Video Title *</label>
                                        <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="e.g. Intro to Algebra" />
                                   </div>

                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Video Link (YouTube, Drive, mp4) *</label>
                                        <input required value={formData.fileUrl} onChange={e => setFormData({ ...formData, fileUrl: e.target.value })} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" placeholder="https://www.youtube.com/watch?v=..." />
                                   </div>

                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Description / Notes</label>
                                        <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none leading-relaxed" placeholder="Short description of tutorial topic..."></textarea>
                                   </div>

                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Specific Class</label>
                                             <select value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value, section: "" })} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                                  <option value="">Global (All Classes)</option>
                                                  {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                             </select>
                                        </div>
                                        <div className="space-y-1.5">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Section Protocol</label>
                                             <select value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 font-black">
                                                  <option value="">All Sections</option>
                                                  {classList.find(c => c.name === formData.class)?.sections.map((s: any) => <option key={s._id} value={s.name}>{s.name}</option>)}
                                             </select>
                                        </div>
                                   </div>

                                   <div className="space-y-2">
                                        <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest block px-1">Target Access Matrix</label>
                                        <div className="flex gap-2">
                                             {["Student", "Staff"].map(role => (
                                                  <button
                                                       key={role}
                                                       type="button"
                                                       onClick={() => toggleRecipient(role)}
                                                       className={`flex-1 h-10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.availableFor.includes(role) ? "bg-success-300 text-white shadow-lg shadow-success-300/20" : "bg-bgray-50 dark:bg-darkblack-500 text-bgray-400"
                                                            }`}
                                                  >
                                                       {role}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>

                                   <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full h-12 bg-success-300 hover:bg-success-400 text-white font-black rounded-xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-success-300/20"
                                   >
                                        {saving ? "Deploying..." : "Add Tutorial"}
                                   </button>
                              </form>
                         </section>
                    </div>

                    {/* Right Column - Video Tutorials List */}
                    <div className="xl:col-span-2">
                         <section className="bg-white dark:bg-darkblack-600 rounded-[30px] p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400 min-h-[600px]">
                              <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2 uppercase tracking-tighter">
                                   <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                                   Video Tutorials Archive
                              </h3>

                              {loading ? (
                                   <div className="py-24 text-center"><div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div></div>
                              ) : contents.length > 0 ? (
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {contents.map((item) => (
                                             <div key={item._id} className="bg-bgray-50 dark:bg-darkblack-500 rounded-2xl p-4 border border-bgray-100 dark:border-darkblack-400 flex flex-col justify-between space-y-4">
                                                  <div>
                                                       <div className="flex justify-between items-start">
                                                            <span className="px-2.5 py-1 bg-danger-50 dark:bg-danger-300/10 text-danger-300 rounded-md text-[8px] font-black uppercase tracking-widest">
                                                                 {item.type}
                                                            </span>
                                                            <button onClick={() => handleDelete(item._id)} className="p-1 text-bgray-400 hover:text-red-500 transition-colors">
                                                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                       </div>
                                                       <h4 className="text-sm font-black text-bgray-900 dark:text-white uppercase mt-2">{item.title}</h4>
                                                       <p className="text-xs text-bgray-500 mt-1 line-clamp-2">{item.description}</p>
                                                  </div>
                                                  <div className="pt-3 border-t border-bgray-200 dark:border-darkblack-400 flex justify-between items-center text-[10px] text-bgray-400 font-bold">
                                                       <span>{item.class || "Global"} {item.section}</span>
                                                       <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-success-300 hover:underline flex items-center gap-1">
                                                            Watch Video
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                       </a>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              ) : (
                                   <div className="py-24 text-center opacity-10 font-black uppercase text-xs tracking-[0.3em]">No video tutorials shared yet</div>
                              )}
                         </section>
                    </div>
               </div>
          </div>
     );
}
