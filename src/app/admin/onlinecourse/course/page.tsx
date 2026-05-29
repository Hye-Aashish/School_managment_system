"use client";
import React, { useEffect, useRef, useState } from "react";

export default function OnlineCourse() {
     const [courses, setCourses] = useState<any[]>([]);
     const [categories, setCategories] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [editingId, setEditingId] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [viewMode, setViewMode] = useState<"list" | "card">("list");
     const [uploadingImage, setUploadingImage] = useState(false);
     const [dragOver, setDragOver] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);
     const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

     const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
          setToast({ message, type });
          setTimeout(() => setToast(null), 3000);
     };

     const [formData, setFormData] = useState({
          title: "",
          category: "",
          courseProvider: "",
          courseDescription: "",
          price: "",
          currentPrice: "",
          thumbnailUrl: ""
     });

     const fetchCategories = async () => {
          try {
               const res = await fetch("/api/online-course/category");
               if (res.ok) setCategories(await res.json());
          } catch (error) {
               console.error("Failed to fetch categories");
          }
     };

     const fetchCourses = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/online-course");
               if (res.ok) setCourses(await res.json());
          } catch (error) {
               console.error("Failed to fetch courses");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchCategories();
          fetchCourses();
     }, []);

     const handleSaveCourse = async () => {
          if (!formData.title || !formData.category || !formData.courseProvider || !formData.price || !formData.currentPrice) {
               showToast("Please fill all required fields!", "error");
               return;
          }
          setLoading(true);
          try {
               const method = editingId ? "PUT" : "POST";
               const body = editingId ? { _id: editingId, ...formData } : formData;
               const res = await fetch("/api/online-course", {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
               });
               if (res.ok) {
                    resetForm();
                    fetchCourses();
               }
          } catch (error) {
               console.error("Failed to save course");
          } finally {
               setLoading(false);
          }
     };

     const resetForm = () => {
          setFormData({
               title: "",
               category: "",
               courseProvider: "",
               courseDescription: "",
               price: "",
               currentPrice: "",
               thumbnailUrl: ""
          });
          setEditingId(null);
     };

     const handleEditCourse = (course: any) => {
          setEditingId(course._id);
          setFormData({
               title: course.title || "",
               category: course.category?._id || course.category || "",
               courseProvider: course.courseProvider || "",
               courseDescription: course.courseDescription || "",
               price: course.price || "",
               currentPrice: course.currentPrice || "",
               thumbnailUrl: course.thumbnailUrl || ""
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
     };

     const handleDeleteCourse = async (id: string) => {
          if (!confirm("Are you sure you want to delete this course?")) return;
          try {
               const res = await fetch(`/api/online-course?id=${id}`, { method: "DELETE" });
               if (res.ok) fetchCourses();
          } catch (error) {
               console.error("Failed to delete course");
          }
     };

     const filteredCourses = courses.filter(c =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.category?.name && c.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
     );

     const handleImageUpload = async (file: File) => {
          if (!file) return;
          const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
          if (!allowed.includes(file.type)) { showToast("Only JPG, PNG, WebP or GIF allowed.", "error"); return; }
          if (file.size > 5 * 1024 * 1024) { showToast("Max file size is 5MB.", "error"); return; }
          setUploadingImage(true);
          try {
               const fd = new FormData();
               fd.append("file", file);
               const res = await fetch("/api/upload/course-thumbnail", { method: "POST", body: fd });
               const data = await res.json();
               if (res.ok) setFormData(prev => ({ ...prev, thumbnailUrl: data.url }));
               else showToast(data.error || "Upload failed", "error");
          } catch { showToast("Upload failed. Please try again.", "error"); }
          finally { setUploadingImage(false); }
     };

     return (
          <div className="2xl:flex 2xl:space-x-12 px-2">
               {/* Add Course Section */}
               <section className="2xl:w-[450px] 2xl:mb-0 mb-6 shrink-0">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400 sticky top-4">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-8 flex items-center gap-3">
                              <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                              {editingId ? "Edit Course" : "Add Online Course"}
                         </h3>
                         <div className="space-y-5">
                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Course Title <span className="text-red-500">*</span></label>
                                   <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Enter title"
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>

                              <div className="space-y-2">
                                   <div className="flex justify-between items-center pr-1">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Category <span className="text-red-500">*</span></label>
                                        <button onClick={() => window.location.href='/admin/onlinecourse/coursecategory'} className="text-xs font-black text-success-300 hover:underline">Manage Categories</button>
                                   </div>
                                   <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                   </select>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Price <span className="text-red-500">*</span></label>
                                        <input
                                             type="number"
                                             value={formData.price}
                                             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                             placeholder="$0"
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none font-mono"
                                        />
                                   </div>
                                   <div className="space-y-2">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Current Price <span className="text-red-500">*</span></label>
                                        <input
                                             type="number"
                                             value={formData.currentPrice}
                                             onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                                             placeholder="$0"
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none font-mono text-success-300"
                                        />
                                   </div>
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Provider <span className="text-red-500">*</span></label>
                                   <input
                                        type="text"
                                        value={formData.courseProvider}
                                        onChange={(e) => setFormData({ ...formData, courseProvider: e.target.value })}
                                        placeholder="YouTube, Vimeo, etc."
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Course Thumbnail</label>

                                   {/* Upload Zone */}
                                   <div
                                        onClick={() => !uploadingImage && fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f); }}
                                        className={`relative w-full rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                                             dragOver ? "border-success-300 bg-success-50 dark:bg-success-300/10" : "border-bgray-300 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500 hover:border-success-300 hover:bg-success-50/50"
                                        }`}
                                   >
                                        {formData.thumbnailUrl ? (
                                             <div className="relative w-full aspect-video">
                                                  <img src={formData.thumbnailUrl} alt="preview" className="w-full h-full object-cover" />
                                                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                       <button type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="px-3 py-1.5 bg-white text-bgray-900 text-xs font-bold rounded-lg hover:bg-bgray-100">Change</button>
                                                       <button type="button" onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, thumbnailUrl: "" })); }} className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600">Remove</button>
                                                  </div>
                                                  {uploadingImage && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" /></div>}
                                             </div>
                                        ) : (
                                             <div className="flex flex-col items-center justify-center py-8 px-4 gap-2 text-center">
                                                  {uploadingImage ? (
                                                       <><div className="w-8 h-8 border-2 border-success-300 border-t-transparent rounded-full animate-spin mb-1" /><p className="text-sm text-success-300 font-semibold">Uploading...</p></>
                                                  ) : (
                                                       <>
                                                            <div className="w-12 h-12 rounded-xl bg-success-50 dark:bg-success-300/10 flex items-center justify-center text-success-300 mb-1">
                                                                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                                            </div>
                                                            <p className="text-sm font-semibold text-bgray-700 dark:text-bgray-50">Drop image here or <span className="text-success-300">click to browse</span></p>
                                                            <p className="text-xs text-bgray-400">JPG, PNG, WebP, GIF — max 5MB</p>
                                                       </>
                                                  )}
                                             </div>
                                        )}
                                   </div>

                                   <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }} />

                                   {/* OR URL fallback */}
                                   <div className="flex items-center gap-2 text-xs text-bgray-400">
                                        <div className="flex-1 h-px bg-bgray-200 dark:bg-darkblack-400"></div>
                                        <span className="font-semibold uppercase tracking-wider">or paste URL</span>
                                        <div className="flex-1 h-px bg-bgray-200 dark:bg-darkblack-400"></div>
                                   </div>
                                   <input
                                        type="text"
                                        value={formData.thumbnailUrl}
                                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-2.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-bgray-50 uppercase tracking-wider">Description</label>
                                   <textarea
                                        value={formData.courseDescription}
                                        onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                                        rows={3}
                                        placeholder="Briefly describe the course..."
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none resize-none"
                                   />
                              </div>

                              <div className="flex gap-4 pt-4">
                                   {editingId && (
                                        <button onClick={resetForm} className="flex-1 py-4 font-bold text-bgray-700 dark:text-white bg-bgray-100 dark:bg-darkblack-500 rounded-xl hover:bg-bgray-200 transition-all border border-bgray-200 dark:border-darkblack-400">Cancel</button>
                                   )}
                                   <button onClick={handleSaveCourse} disabled={loading} className="flex-[2] py-4 bg-success-300 text-white font-bold rounded-xl hover:bg-success-400 transition-all shadow-lg shadow-success-300/20 disabled:opacity-50">
                                        {loading ? "Processing..." : editingId ? "Update Course" : "Save Course"}
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Course List Section */}
               <section className="2xl:flex-1">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                              <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Active Courses</h3>
                              <div className="flex items-center gap-3 w-full sm:w-auto">
                                   <div className="flex items-center border border-bgray-200 dark:border-darkblack-400 rounded-xl overflow-hidden bg-bgray-50 dark:bg-darkblack-500 p-0.5">
                                        <button type="button" onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-darkblack-600 text-success-300 shadow-sm" : "text-bgray-400 hover:text-bgray-900"}`} title="List View">
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                                        </button>
                                        <button type="button" onClick={() => setViewMode("card")} className={`p-2 rounded-lg transition-all ${viewMode === "card" ? "bg-white dark:bg-darkblack-600 text-success-300 shadow-sm" : "text-bgray-400 hover:text-bgray-900"}`} title="Card View">
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                                        </button>
                                   </div>
                                   <div className="relative w-full sm:w-64">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bgray-400">
                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                        </span>
                                        <input
                                             type="text"
                                             placeholder="Search courses..."
                                             value={searchTerm}
                                             onChange={(e) => setSearchTerm(e.target.value)}
                                             className="w-full pl-12 pr-4 py-2.5 bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-400 rounded-xl text-sm focus:ring-2 focus:ring-success-300/50 outline-none text-bgray-900 dark:text-white"
                                        />
                                   </div>
                              </div>
                         </div>

                         {viewMode === "list" ? (
                          <div className="overflow-x-auto min-h-[60vh]">
                              <table className="w-full">
                                   <thead>
                                        <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-left border-b border-bgray-200 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 text-xs font-bold uppercase tracking-widest">
                                             <td className="px-6 py-4">Course Info</td>
                                             <td className="px-6 py-4">Pricing</td>
                                             <td className="px-6 py-4">Source</td>
                                             <td className="px-6 py-4 text-right">Actions</td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {loading && courses.length === 0 ? (
                                             <tr><td colSpan={4} className="py-20 text-center text-bgray-400">Fetching courses...</td></tr>
                                        ) : filteredCourses.length > 0 ? (
                                             filteredCourses.map(course => (
                                                  <tr key={course._id} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50/50 transition-colors group">
                                                       <td className="px-6 py-5">
                                                            <div className="flex items-center gap-4">
                                                                 {course.thumbnailUrl ? (
                                                                      <img src={course.thumbnailUrl} alt={course.title} className="w-12 h-12 rounded-lg object-cover bg-bgray-100 dark:bg-darkblack-500" />
                                                                 ) : (
                                                                      <div className="w-12 h-12 rounded-lg bg-success-50 dark:bg-success-300/10 flex items-center justify-center text-success-300 font-bold text-xl">{course.title.charAt(0)}</div>
                                                                 )}
                                                                 <div>
                                                                      <p className="font-bold text-bgray-900 dark:text-white">{course.title}</p>
                                                                      <p className="text-xs font-black text-bgray-400 uppercase tracking-tighter">{course.category?.name || "Uncategorized"}</p>
                                                                 </div>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-5">
                                                            <div className="flex flex-col">
                                                                 <span className="text-sm font-bold text-success-300">${course.currentPrice}</span>
                                                                 <span className="text-xs text-bgray-400 line-through">${course.price}</span>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-5">
                                                            <span className="px-2.5 py-1 bg-bgray-100 dark:bg-darkblack-500 rounded text-[10px] font-black uppercase text-bgray-500">{course.courseProvider}</span>
                                                       </td>
                                                       <td className="px-6 py-5">
                                                            <div className="flex justify-end gap-2">
                                                                 <button onClick={() => handleEditCourse(course)} className="p-2 bg-bgray-100 dark:bg-darkblack-500 rounded-xl hover:bg-success-300 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                                                                 <button onClick={() => handleDeleteCourse(course._id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr><td colSpan={4} className="py-20 text-center text-bgray-400">No courses available.</td></tr>
                                        )}
                                   </tbody>
                              </table>
                          </div>
                         ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[60vh]">
                               {loading && courses.length === 0 ? (
                                    <p className="col-span-full py-20 text-center text-bgray-400">Fetching courses...</p>
                               ) : filteredCourses.length > 0 ? (
                                    filteredCourses.map(course => (
                                         <div key={course._id} className="rounded-xl border border-bgray-200 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500 overflow-hidden hover:shadow-md transition-all">
                                              {course.thumbnailUrl ? (
                                                   <img src={course.thumbnailUrl} alt={course.title} className="w-full aspect-video object-cover" />
                                              ) : (
                                                   <div className="w-full aspect-video bg-success-50 dark:bg-success-300/10 flex items-center justify-center text-success-300 font-bold text-4xl">{course.title.charAt(0)}</div>
                                              )}
                                              <div className="p-4 space-y-2">
                                                   <p className="font-bold text-bgray-900 dark:text-white">{course.title}</p>
                                                   <p className="text-xs font-black text-bgray-400 uppercase tracking-tighter">{course.category?.name || "Uncategorized"}</p>
                                                   <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-success-300">${course.currentPrice}</span>
                                                        <span className="text-xs text-bgray-400 line-through">${course.price}</span>
                                                   </div>
                                                   <span className="inline-block px-2.5 py-1 bg-bgray-100 dark:bg-darkblack-400 rounded text-[10px] font-black uppercase text-bgray-500">{course.courseProvider}</span>
                                                   <div className="flex gap-2 pt-1">
                                                        <button onClick={() => handleEditCourse(course)} className="flex-1 p-2 bg-bgray-100 dark:bg-darkblack-400 rounded-xl hover:bg-success-300 hover:text-white transition-all text-xs font-bold">Edit</button>
                                                        <button onClick={() => handleDeleteCourse(course._id)} className="flex-1 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-bold">Delete</button>
                                                   </div>
                                              </div>
                                         </div>
                                    ))
                               ) : (
                                    <p className="col-span-full py-20 text-center text-bgray-400">No courses available.</p>
                               )}
                          </div>
                         )}
                    </div>
               </section>

               {/* Custom Toast Notification Banner */}
               {toast && (
                    <div className="fixed top-5 right-5 z-[9999] animate-fade-in-down">
                         <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl text-white ${
                              toast.type === "success" 
                                   ? "bg-emerald-500 border border-emerald-400" 
                                   : toast.type === "error"
                                   ? "bg-red-500 border border-red-400"
                                   : "bg-indigo-500 border border-indigo-400"
                         }`}>
                              {toast.type === "success" && (
                                   <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                   </svg>
                              )}
                              {toast.type === "error" && (
                                   <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                              )}
                              {toast.type === "info" && (
                                   <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                   </svg>
                              )}
                              <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
                         </div>
                    </div>
               )}
          </div>
     );
}