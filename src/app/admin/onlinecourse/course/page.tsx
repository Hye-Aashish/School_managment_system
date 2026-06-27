"use client";
import React, { useEffect, useRef, useState } from "react";

export default function OnlineCourse() {
     const [courses, setCourses] = useState<any[]>([]);
     const [categories, setCategories] = useState<any[]>([]);
     const [classes, setClasses] = useState<any[]>([]);
     const [teachers, setTeachers] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [editingId, setEditingId] = useState<string | null>(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [viewMode, setViewMode] = useState<"list" | "card">("list");
     const [uploadingImage, setUploadingImage] = useState(false);
     const [dragOver, setDragOver] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);
     const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

     // Curriculum editing states
     const [curriculumEditingCourse, setCurriculumEditingCourse] = useState<any | null>(null);
     const [curriculumSections, setCurriculumSections] = useState<any[]>([]);
     const [activeItemKey, setActiveItemKey] = useState<string | null>(null); // e.g. "sectionIndex-itemIndex"

     // Submissions viewer states
     const [submissionsViewer, setSubmissionsViewer] = useState<{ courseId: string; item: any } | null>(null);
     const [submissions, setSubmissions] = useState<any[]>([]);
     const [loadingSubmissions, setLoadingSubmissions] = useState(false);
     const [evaluatingSubmission, setEvaluatingSubmission] = useState<any | null>(null);
     const [evaluatingMarks, setEvaluatingMarks] = useState<number | "">("");
     const [evaluatingFeedback, setEvaluatingFeedback] = useState<string>("");
     const [submittingEvaluation, setSubmittingEvaluation] = useState(false);

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
          thumbnailUrl: "",
          class: "",
          sections: [] as string[],
          assignTeacher: "",
          coursePreviewProvider: "Youtube",
          coursePreviewUrl: "",
          discount: "0",
          freeCourse: false,
          outcomes: [] as string[]
     });

     const fetchCategories = async () => {
          try {
               const res = await fetch("/api/online-course/category");
               if (res.ok) setCategories(await res.json());
          } catch (error) {
               console.error("Failed to fetch categories");
          }
     };

     const fetchClasses = async () => {
          try {
               const res = await fetch("/api/classes");
               const data = await res.json();
               if (res.ok) setClasses(data.success ? data.data : data);
          } catch (error) {
               console.error("Failed to fetch classes");
          }
     };

     const fetchTeachers = async () => {
          try {
               const res = await fetch("/api/staff");
               const data = await res.json();
               if (res.ok) {
                    const staffList = data.success ? data.data : data;
                    setTeachers(staffList.filter((s: any) => s.role === "Teacher" || s.role === "Admin" || !s.role));
               }
          } catch (error) {
               console.error("Failed to fetch teachers");
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
          fetchClasses();
          fetchTeachers();
     }, []);

     const handleSaveCourse = async () => {
          if (!formData.title || !formData.category || !formData.courseProvider || (!formData.freeCourse && (!formData.price || !formData.currentPrice))) {
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
                    showToast(editingId ? "Course updated successfully!" : "Course saved successfully!");
               } else {
                    const data = await res.json();
                    showToast(data.error || "Failed to save course", "error");
               }
          } catch (error) {
               console.error("Failed to save course");
               showToast("Failed to save course", "error");
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
               thumbnailUrl: "",
               class: "",
               sections: [],
               assignTeacher: "",
               coursePreviewProvider: "Youtube",
               coursePreviewUrl: "",
               discount: "0",
               freeCourse: false,
               outcomes: []
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
               price: course.price?.toString() || "",
               currentPrice: course.currentPrice?.toString() || "",
               thumbnailUrl: course.thumbnailUrl || "",
               class: course.class?._id || course.class || "",
               sections: Array.isArray(course.sections) ? course.sections.map((s: any) => s._id || s) : [],
               assignTeacher: course.assignTeacher?._id || course.assignTeacher || "",
               coursePreviewProvider: course.coursePreviewProvider || "Youtube",
               coursePreviewUrl: course.coursePreviewUrl || "",
               discount: course.discount?.toString() || "0",
               freeCourse: course.freeCourse || false,
               outcomes: course.outcomes || []
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
     };

     const handleDeleteCourse = async (id: string) => {
          if (!confirm("Are you sure you want to delete this course?")) return;
          try {
               const res = await fetch(`/api/online-course?id=${id}`, { method: "DELETE" });
               if (res.ok) {
                    fetchCourses();
                    showToast("Course deleted successfully!");
               }
          } catch (error) {
               console.error("Failed to delete course");
          }
     };

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

     const filteredCourses = courses.filter(c =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.category?.name && c.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
     );

     // ── CURRICULUM MANAGEMENT HANDLERS ──────────────────────────────────
     const openCurriculumEditor = (course: any) => {
          setCurriculumEditingCourse(course);
          setCurriculumSections(course.curriculum || []);
          setActiveItemKey(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
     };
     const openSubmissionsViewer = async (courseId: string, item: any) => {
          setSubmissionsViewer({ courseId, item });
          setLoadingSubmissions(true);
          setSubmissions([]);
          try {
               const res = await fetch(`/api/online-course/submissions?courseId=${courseId}&itemId=${item._id}`);
               if (res.ok) {
                    const data = await res.json();
                    setSubmissions(data);
               } else {
                    showToast("Failed to load student submissions", "error");
               }
          } catch (e) {
               console.error("Error loading submissions:", e);
               showToast("Error loading student submissions", "error");
          } finally {
               setLoadingSubmissions(false);
          }
     };

     const handleEvaluateSubmission = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!evaluatingSubmission) return;

          if (evaluatingMarks === "" || evaluatingMarks < 0 || evaluatingMarks > 100) {
               showToast("Please enter valid marks between 0 and 100", "error");
               return;
          }

          setSubmittingEvaluation(true);
          try {
               const res = await fetch("/api/online-course/submissions", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         submissionId: evaluatingSubmission._id,
                         marks: Number(evaluatingMarks),
                         feedback: evaluatingFeedback,
                         evaluatedBy: "Teacher"
                    })
               });

               if (res.ok) {
                    const updated = await res.json();
                    showToast("Submission evaluated successfully!");
                    setSubmissions(prev => prev.map(s => s._id === updated._id ? updated : s));
                    setEvaluatingSubmission(null);
                    setEvaluatingMarks("");
                    setEvaluatingFeedback("");
               } else {
                    const data = await res.json();
                    showToast(data.error || "Failed to save evaluation", "error");
               }
          } catch (e) {
               console.error("Error evaluating submission:", e);
               showToast("Error saving evaluation", "error");
          } finally {
               setSubmittingEvaluation(false);
          }
     };

     const handleSaveCurriculum = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/online-course", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         _id: curriculumEditingCourse._id,
                         curriculum: curriculumSections
                    })
               });
               if (res.ok) {
                    showToast("Curriculum saved successfully!");
                    fetchCourses();
                    setCurriculumEditingCourse(null);
               } else {
                    const data = await res.json();
                    showToast(data.error || "Failed to save curriculum", "error");
               }
          } catch (e) {
               showToast("Failed to save curriculum", "error");
          } finally {
               setLoading(false);
          }
     };

     const addSection = () => {
          setCurriculumSections(prev => [
               ...prev,
               { title: `Chapter ${prev.length + 1}: New Chapter`, items: [] }
          ]);
     };

     const deleteSection = (secIdx: number) => {
          if (!confirm("Are you sure you want to delete this chapter and all its items?")) return;
          setCurriculumSections(prev => prev.filter((_: any, idx: number) => idx !== secIdx));
          setActiveItemKey(null);
     };

     const addCurriculumItem = (secIdx: number, type: "video" | "quiz" | "exam" | "assignment" | "content") => {
          const newItem = {
               title: `New ${type.toUpperCase()}`,
               type,
               duration: "15 min",
               videoUrl: "",
               videoProvider: "Youtube",
               questions: [],
               assignmentDesc: "",
               assignmentUrl: "",
               contentBody: "",
               contentUrl: ""
          };
          setCurriculumSections(prev => {
               const updated = [...prev];
               updated[secIdx].items = [...updated[secIdx].items, newItem];
               return updated;
          });
          setActiveItemKey(`${secIdx}-${curriculumSections[secIdx].items.length}`);
     };

     const deleteCurriculumItem = (secIdx: number, itemIdx: number) => {
          setCurriculumSections(prev => {
               const updated = [...prev];
               updated[secIdx].items = updated[secIdx].items.filter((_: any, idx: number) => idx !== itemIdx);
               return updated;
          });
          setActiveItemKey(null);
     };

     const handleResourceUpload = async (file: File, secIdx: number, itemIdx: number, fieldName: "assignmentUrl" | "contentUrl") => {
          try {
               const fd = new FormData();
               fd.append("file", file);
               const res = await fetch("/api/upload/course-resource", { method: "POST", body: fd });
               const data = await res.json();
               if (res.ok) {
                    setCurriculumSections(prev => {
                         const updated = [...prev];
                         updated[secIdx].items[itemIdx][fieldName] = data.url;
                         return updated;
                    });
                    showToast("Resource file uploaded!");
               } else {
                    showToast(data.error || "Upload failed", "error");
               }
          } catch {
               showToast("Upload failed", "error");
          }
     };

     const addQuizQuestion = (secIdx: number, itemIdx: number) => {
          setCurriculumSections(prev => {
               const updated = [...prev];
               const item = updated[secIdx].items[itemIdx];
               if (!item.questions) item.questions = [];
               item.questions.push({ question: "", options: ["", "", "", ""], answer: "A" });
               return updated;
          });
     };

     const deleteQuizQuestion = (secIdx: number, itemIdx: number, qIdx: number) => {
          setCurriculumSections(prev => {
               const updated = [...prev];
               updated[secIdx].items[itemIdx].questions = updated[secIdx].items[itemIdx].questions.filter((_: any, idx: number) => idx !== qIdx);
               return updated;
          });
     };

     if (curriculumEditingCourse) {
          // Render Curriculum Builder Interface
          return (
               <div className="px-4 py-6 max-w-6xl mx-auto">
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                         <div>
                              <button onClick={() => setCurriculumEditingCourse(null)} className="text-sm font-black text-success-300 hover:underline flex items-center gap-1.5 mb-2">
                                   ← Back to Course Catalog
                              </button>
                              <h2 className="text-2xl font-bold text-bgray-900 dark:text-white">
                                   Curriculum Architect: <span className="text-success-300 font-extrabold">{curriculumEditingCourse.title}</span>
                              </h2>
                              <p className="text-xs text-bgray-400">Design structural chapters, video lessons, quizzes, exams, assignments, and reading contents.</p>
                         </div>
                         <button onClick={handleSaveCurriculum} disabled={loading} className="px-6 py-3 bg-success-300 hover:bg-success-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-success-300/20 disabled:opacity-50 text-sm">
                              {loading ? "Saving..." : "Save Curriculum"}
                         </button>
                    </header>

                    <div className="space-y-6">
                         {curriculumSections.map((section, secIdx) => (
                              <div key={secIdx} className="p-6 rounded-2xl bg-white dark:bg-darkblack-600 border border-bgray-200 dark:border-darkblack-400 shadow-sm space-y-4">
                                   <div className="flex justify-between items-center border-b border-bgray-100 dark:border-darkblack-500 pb-4">
                                        <div className="flex-1 flex gap-3 items-center">
                                             <span className="text-xs font-black text-bgray-400 uppercase tracking-widest">Chapter {secIdx + 1}</span>
                                             <input
                                                  type="text"
                                                  value={section.title}
                                                  onChange={(e) => setCurriculumSections(prev => {
                                                       const updated = [...prev];
                                                       updated[secIdx].title = e.target.value;
                                                       return updated;
                                                  })}
                                                  className="flex-1 font-bold text-lg text-bgray-900 dark:text-white bg-transparent border-b border-transparent hover:border-bgray-200 focus:border-success-300 outline-none px-1 py-0.5"
                                             />
                                        </div>
                                        <button onClick={() => deleteSection(secIdx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all text-xs font-bold flex items-center gap-1">
                                             Delete Chapter
                                        </button>
                                   </div>

                                   {/* Items List */}
                                   <div className="space-y-3 pl-4 border-l-2 border-bgray-100 dark:border-darkblack-500">
                                        {section.items.map((item: any, itemIdx: number) => {
                                             const isEditing = activeItemKey === `${secIdx}-${itemIdx}`;
                                             return (
                                                  <div key={itemIdx} className="rounded-xl border border-bgray-200 dark:border-darkblack-400 bg-bgray-50/50 dark:bg-darkblack-500/20 overflow-hidden">
                                                       {/* Item Bar */}
                                                       <div onClick={() => setActiveItemKey(isEditing ? null : `${secIdx}-${itemIdx}`)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-bgray-100/50 dark:hover:bg-darkblack-500/30 transition-all select-none">
                                                            <div className="flex items-center gap-3">
                                                                 <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded ${item.type === "video"
                                                                           ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                                                                           : item.type === "quiz"
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                                                                                : item.type === "exam"
                                                                                     ? "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
                                                                                     : item.type === "assignment"
                                                                                          ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
                                                                                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                                                      }`}>
                                                                      {item.type}
                                                                 </span>
                                                                 <span className="font-bold text-bgray-800 dark:text-white text-sm">{item.title}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                                                 <button onClick={() => setActiveItemKey(isEditing ? null : `${secIdx}-${itemIdx}`)} className="text-xs text-bgray-400 hover:text-success-300 font-bold">
                                                                      {isEditing ? "Collapse" : "Edit"}
                                                                 </button>
                                                                 <span className="text-bgray-300 dark:text-darkblack-400">|</span>
                                                                 <button onClick={() => deleteCurriculumItem(secIdx, itemIdx)} className="text-xs text-red-500 hover:underline font-bold">
                                                                      Delete
                                                                 </button>
                                                            </div>
                                                       </div>

                                                       {/* Expanded Item Form */}
                                                       {isEditing && (
                                                            <div className="p-4 bg-white dark:bg-darkblack-500 border-t border-bgray-200 dark:border-darkblack-400 space-y-4">
                                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                      <div className="space-y-2">
                                                                           <label className="text-xs font-bold text-bgray-500 uppercase">Item Title</label>
                                                                           <input
                                                                                type="text"
                                                                                value={item.title}
                                                                                onChange={(e) => setCurriculumSections(prev => {
                                                                                     const updated = [...prev];
                                                                                     updated[secIdx].items[itemIdx].title = e.target.value;
                                                                                     return updated;
                                                                                })}
                                                                                className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg outline-none bg-transparent"
                                                                           />
                                                                      </div>
                                                                      <div className="space-y-2">
                                                                           <label className="text-xs font-bold text-bgray-500 uppercase">Duration (e.g. 15 min)</label>
                                                                           <input
                                                                                type="text"
                                                                                value={item.duration}
                                                                                onChange={(e) => setCurriculumSections(prev => {
                                                                                     const updated = [...prev];
                                                                                     updated[secIdx].items[itemIdx].duration = e.target.value;
                                                                                     return updated;
                                                                                })}
                                                                                className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg outline-none bg-transparent"
                                                                           />
                                                                      </div>
                                                                 </div>

                                                                 {/* Type Conditional Settings */}
                                                                 {item.type === "video" && (
                                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                                           <div className="space-y-2">
                                                                                <label className="text-xs font-bold text-bgray-500 uppercase">Video Provider</label>
                                                                                <select
                                                                                     value={item.videoProvider}
                                                                                     onChange={(e) => setCurriculumSections(prev => {
                                                                                          const updated = [...prev];
                                                                                          updated[secIdx].items[itemIdx].videoProvider = e.target.value;
                                                                                          return updated;
                                                                                     })}
                                                                                     className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-transparent"
                                                                                >
                                                                                     <option value="Youtube">YouTube</option>
                                                                                     <option value="Vimeo">Vimeo</option>
                                                                                     <option value="HTML5">HTML5 Video</option>
                                                                                </select>
                                                                           </div>
                                                                           <div className="space-y-2">
                                                                                <label className="text-xs font-bold text-bgray-500 uppercase">Video URL</label>
                                                                                <input
                                                                                     type="text"
                                                                                     value={item.videoUrl}
                                                                                     onChange={(e) => setCurriculumSections(prev => {
                                                                                          const updated = [...prev];
                                                                                          updated[secIdx].items[itemIdx].videoUrl = e.target.value;
                                                                                          return updated;
                                                                                     })}
                                                                                     placeholder="https://youtube.com/..."
                                                                                     className="w-full px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-transparent outline-none"
                                                                                />
                                                                           </div>
                                                                      </div>
                                                                 )}

                                                                 {(item.type === "quiz" || item.type === "exam") && (
                                                                      <div className="space-y-4 pt-2 border-t border-bgray-150 dark:border-darkblack-400">
                                                                           <div className="flex justify-between items-center">
                                                                                <h4 className="text-xs font-black uppercase text-bgray-500">Question Builder</h4>
                                                                                <button onClick={() => addQuizQuestion(secIdx, itemIdx)} className="px-3 py-1 bg-success-300 hover:bg-success-400 text-white font-bold text-xs rounded-lg transition-colors">
                                                                                     + Add Question
                                                                                </button>
                                                                           </div>
                                                                           {(item.questions || []).map((q: any, qIdx: number) => (
                                                                                <div key={qIdx} className="p-4 rounded-xl border border-bgray-200 dark:border-darkblack-400 space-y-3 bg-bgray-50/50 dark:bg-darkblack-600/30">
                                                                                     <div className="flex justify-between items-center gap-2">
                                                                                          <span className="text-xs font-bold text-bgray-400">Question {qIdx + 1}</span>
                                                                                          <button onClick={() => deleteQuizQuestion(secIdx, itemIdx, qIdx)} className="text-xs text-red-500 hover:underline">Remove</button>
                                                                                     </div>
                                                                                     <textarea
                                                                                          rows={2}
                                                                                          value={q.question}
                                                                                          onChange={(e) => setCurriculumSections(prev => {
                                                                                               const updated = [...prev];
                                                                                               updated[secIdx].items[itemIdx].questions[qIdx].question = e.target.value;
                                                                                               return updated;
                                                                                          })}
                                                                                          placeholder="Enter the question text"
                                                                                          className="w-full p-2.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-white dark:bg-darkblack-500 outline-none"
                                                                                     />
                                                                                     <div className="grid grid-cols-2 gap-3">
                                                                                          {["A", "B", "C", "D"].map((optLetter, optIdx) => (
                                                                                               <div key={optLetter} className="flex gap-2 items-center">
                                                                                                    <span className="text-xs font-bold text-bgray-400">{optLetter}</span>
                                                                                                    <input
                                                                                                         type="text"
                                                                                                         value={q.options?.[optIdx] || ""}
                                                                                                         onChange={(e) => setCurriculumSections(prev => {
                                                                                                              const updated = [...prev];
                                                                                                              if (!updated[secIdx].items[itemIdx].questions[qIdx].options) {
                                                                                                                   updated[secIdx].items[itemIdx].questions[qIdx].options = ["", "", "", ""];
                                                                                                              }
                                                                                                              updated[secIdx].items[itemIdx].questions[qIdx].options[optIdx] = e.target.value;
                                                                                                              return updated;
                                                                                                         })}
                                                                                                         placeholder={`Option ${optLetter}`}
                                                                                                         className="flex-1 px-3 py-1.5 text-xs border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-white dark:bg-darkblack-500 outline-none"
                                                                                                    />
                                                                                               </div>
                                                                                          ))}
                                                                                     </div>
                                                                                     <div className="flex gap-2 items-center pt-2">
                                                                                          <span className="text-xs font-bold text-bgray-500">Correct Answer:</span>
                                                                                          <select
                                                                                               value={q.answer}
                                                                                               onChange={(e) => setCurriculumSections(prev => {
                                                                                                    const updated = [...prev];
                                                                                                    updated[secIdx].items[itemIdx].questions[qIdx].answer = e.target.value;
                                                                                                    return updated;
                                                                                               })}
                                                                                               className="px-3 py-1 text-xs border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-white dark:bg-darkblack-500"
                                                                                          >
                                                                                               <option value="A">Option A</option>
                                                                                               <option value="B">Option B</option>
                                                                                               <option value="C">Option C</option>
                                                                                               <option value="D">Option D</option>
                                                                                          </select>
                                                                                     </div>
                                                                                </div>
                                                                           ))}
                                                                      </div>
                                                                 )}

                                                                 {item.type === "assignment" && (
                                                                      <div className="space-y-4 pt-2">
                                                                           {item._id ? (
                                                                                <button
                                                                                     type="button"
                                                                                     onClick={() => openSubmissionsViewer(curriculumEditingCourse._id, item)}
                                                                                     className="w-full py-2 bg-amber-50 dark:bg-amber-300/10 hover:bg-amber-500 hover:text-white text-amber-600 dark:text-amber-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-amber-200 dark:border-amber-900/50"
                                                                                >
                                                                                     📂 View Student Submissions ({submissionsViewer?.item?._id === item._id ? submissions.length : "Load"})
                                                                                </button>
                                                                           ) : (
                                                                                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-semibold">
                                                                                     💡 Save this curriculum first to view student submissions for this assignment.
                                                                                </div>
                                                                           )}
                                                                           <div className="space-y-2">
                                                                                <label className="text-xs font-bold text-bgray-500 uppercase">Assignment Description</label>
                                                                                <textarea
                                                                                     rows={3}
                                                                                     value={item.assignmentDesc}
                                                                                     onChange={(e) => setCurriculumSections(prev => {
                                                                                          const updated = [...prev];
                                                                                          updated[secIdx].items[itemIdx].assignmentDesc = e.target.value;
                                                                                          return updated;
                                                                                     })}
                                                                                     placeholder="Write detailed instructions..."
                                                                                     className="w-full p-2.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-transparent outline-none resize-none"
                                                                                />
                                                                           </div>
                                                                           <div className="space-y-2">
                                                                                <label className="text-xs font-bold text-bgray-500 uppercase">Assignment Resource File</label>
                                                                                <div className="flex gap-2">
                                                                                     <input
                                                                                          type="text"
                                                                                          value={item.assignmentUrl}
                                                                                          onChange={(e) => setCurriculumSections(prev => {
                                                                                               const updated = [...prev];
                                                                                               updated[secIdx].items[itemIdx].assignmentUrl = e.target.value;
                                                                                               return updated;
                                                                                          })}
                                                                                          placeholder="https://example.com/file.pdf"
                                                                                          className="flex-1 px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-transparent outline-none"
                                                                                     />
                                                                                     <input
                                                                                          type="file"
                                                                                          id={`file-upload-${secIdx}-${itemIdx}`}
                                                                                          className="hidden"
                                                                                          onChange={(e) => {
                                                                                               const f = e.target.files?.[0];
                                                                                               if (f) handleResourceUpload(f, secIdx, itemIdx, "assignmentUrl");
                                                                                          }}
                                                                                     />
                                                                                     <button type="button" onClick={() => document.getElementById(`file-upload-${secIdx}-${itemIdx}`)?.click()} className="px-4 py-2 bg-bgray-100 dark:bg-darkblack-400 border border-bgray-200 dark:border-darkblack-300 text-bgray-800 dark:text-white text-xs font-bold rounded-lg hover:bg-bgray-200">
                                                                                          Upload File
                                                                                     </button>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 )}

                                                                 {item.type === "content" && (
                                                                      <div className="space-y-4 pt-2">
                                                                           <div className="space-y-2">
                                                                                <label className="text-xs font-bold text-bgray-500 uppercase">Content Body</label>
                                                                                <textarea
                                                                                     rows={5}
                                                                                     value={item.contentBody}
                                                                                     onChange={(e) => setCurriculumSections(prev => {
                                                                                          const updated = [...prev];
                                                                                          updated[secIdx].items[itemIdx].contentBody = e.target.value;
                                                                                          return updated;
                                                                                     })}
                                                                                     placeholder="Write lecture notes or reading contents here..."
                                                                                     className="w-full p-2.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-transparent outline-none resize-none"
                                                                                />
                                                                           </div>
                                                                           <div className="space-y-2">
                                                                                <label className="text-xs font-bold text-bgray-500 uppercase">Attachment Resource File</label>
                                                                                <div className="flex gap-2">
                                                                                     <input
                                                                                          type="text"
                                                                                          value={item.contentUrl}
                                                                                          onChange={(e) => setCurriculumSections(prev => {
                                                                                               const updated = [...prev];
                                                                                               updated[secIdx].items[itemIdx].contentUrl = e.target.value;
                                                                                               return updated;
                                                                                          })}
                                                                                          placeholder="https://example.com/handout.pdf"
                                                                                          className="flex-1 px-3 py-2 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-lg bg-transparent outline-none"
                                                                                     />
                                                                                     <input
                                                                                          type="file"
                                                                                          id={`content-file-upload-${secIdx}-${itemIdx}`}
                                                                                          className="hidden"
                                                                                          onChange={(e) => {
                                                                                               const f = e.target.files?.[0];
                                                                                               if (f) handleResourceUpload(f, secIdx, itemIdx, "contentUrl");
                                                                                          }}
                                                                                     />
                                                                                     <button type="button" onClick={() => document.getElementById(`content-file-upload-${secIdx}-${itemIdx}`)?.click()} className="px-4 py-2 bg-bgray-100 dark:bg-darkblack-400 border border-bgray-200 dark:border-darkblack-300 text-bgray-800 dark:text-white text-xs font-bold rounded-lg hover:bg-bgray-200">
                                                                                          Upload File
                                                                                     </button>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       )}
                                                  </div>
                                             );
                                        })}
                                   </div>

                                   {/* Add Item Actions */}
                                   <div className="flex flex-wrap items-center gap-2 pt-2">
                                        <span className="text-xs font-black text-bgray-400 uppercase tracking-widest mr-2">Add Curriculum Item:</span>
                                        {["video", "quiz", "exam", "assignment", "content"].map((type) => (
                                             <button key={type} onClick={() => addCurriculumItem(secIdx, type as any)} className="px-3 py-1.5 border border-bgray-200 dark:border-darkblack-400 text-bgray-700 dark:text-bgray-200 text-xs font-bold rounded-lg hover:bg-success-300 hover:text-white transition-all capitalize">
                                                  + {type}
                                             </button>
                                        ))}
                                   </div>
                              </div>
                         ))}
                    </div>

                    <div className="flex gap-4 mt-8 justify-center">
                         <button onClick={addSection} className="px-6 py-3 border-2 border-dashed border-bgray-300 dark:border-darkblack-400 hover:border-success-300 hover:text-success-300 text-bgray-500 font-bold rounded-xl transition-all text-sm">
                              + Add New Chapter
                         </button>
                    </div>
               </div>
          );
     }

     return (
          <div className="2xl:flex 2xl:space-x-12 px-2">
               {/* Add Course Section */}
               <section className="2xl:w-[450px] 2xl:mb-0 mb-6 shrink-0">
                    <div className="w-full py-6 px-6 rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                         <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-8 flex items-center gap-3">
                              <span className="w-1.5 h-6 bg-success-300 rounded-full"></span>
                              {editingId ? "Edit Course" : "Add Online Course"}
                         </h3>
                         <div className="space-y-5">
                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Course Title <span className="text-red-500">*</span></label>
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
                                        <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Category <span className="text-red-500">*</span></label>
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

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Instructor</label>
                                   <select
                                        value={formData.assignTeacher}
                                        onChange={(e) => setFormData({ ...formData, assignTeacher: e.target.value })}
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   >
                                        <option value="">Select Instructor</option>
                                        {teachers.map(teacher => (
                                             <option key={teacher._id} value={teacher._id}>
                                                  {teacher.firstName} {teacher.lastName || ""}
                                             </option>
                                        ))}
                                   </select>
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Target Class</label>
                                   <select
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value, sections: [] })}
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   >
                                        <option value="">All Classes (School wide)</option>
                                        {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                                   </select>
                              </div>

                              {formData.class && (
                                   <div className="space-y-2">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Target Sections</label>
                                        <div className="flex flex-wrap gap-2.5 p-3.5 border border-bgray-200 dark:border-darkblack-400 rounded-xl bg-bgray-50 dark:bg-darkblack-500">
                                             {classes.find(cls => cls._id === formData.class)?.sections?.map((sec: any) => {
                                                  const secId = sec._id || sec;
                                                  const secName = sec.name || sec;
                                                  const checked = formData.sections.includes(secId);
                                                  return (
                                                       <label key={secId} className="flex items-center space-x-2 text-sm text-bgray-800 dark:text-white cursor-pointer">
                                                            <input
                                                                 type="checkbox"
                                                                 checked={checked}
                                                                 onChange={() => {
                                                                      const newSections = checked
                                                                           ? formData.sections.filter(s => s !== secId)
                                                                           : [...formData.sections, secId];
                                                                      setFormData({ ...formData, sections: newSections });
                                                                 }}
                                                                 className="rounded border-bgray-300 dark:border-darkblack-400 text-success-300 focus:ring-success-300"
                                                            />
                                                            <span>{secName}</span>
                                                       </label>
                                                  );
                                             })}
                                        </div>
                                   </div>
                              )}

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Outcomes (What they will learn)</label>
                                   <div className="flex gap-2">
                                        <input
                                             type="text"
                                             id="outcomeInput"
                                             placeholder="Enter skill/outcome"
                                             className="flex-1 px-4 py-2.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white outline-none"
                                             onKeyDown={(e) => {
                                                  if (e.key === "Enter") {
                                                       e.preventDefault();
                                                       const val = (e.target as HTMLInputElement).value.trim();
                                                       if (val && !formData.outcomes.includes(val)) {
                                                            setFormData(p => ({ ...p, outcomes: [...p.outcomes, val] }));
                                                            (e.target as HTMLInputElement).value = "";
                                                       }
                                                  }
                                             }}
                                        />
                                        <button
                                             type="button"
                                             onClick={() => {
                                                  const input = document.getElementById("outcomeInput") as HTMLInputElement;
                                                  const val = input.value.trim();
                                                  if (val && !formData.outcomes.includes(val)) {
                                                       setFormData(p => ({ ...p, outcomes: [...p.outcomes, val] }));
                                                       input.value = "";
                                                  }
                                             }}
                                             className="px-4 bg-success-300 text-white font-bold rounded-xl text-xs"
                                        >
                                             Add
                                        </button>
                                   </div>
                                   <div className="flex flex-wrap gap-1.5 mt-2">
                                        {formData.outcomes.map((outcome, idx) => (
                                             <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-bgray-100 dark:bg-darkblack-500 border border-bgray-200 dark:border-darkblack-450 text-[10px] font-black text-bgray-600 dark:text-white uppercase rounded-lg">
                                                  {outcome}
                                                  <button type="button" onClick={() => setFormData(p => ({ ...p, outcomes: p.outcomes.filter((_, oIdx) => oIdx !== idx) }))} className="text-red-500 font-extrabold hover:text-red-700 ml-0.5">✕</button>
                                             </span>
                                        ))}
                                   </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Preview Provider</label>
                                        <select
                                             value={formData.coursePreviewProvider}
                                             onChange={(e) => setFormData({ ...formData, coursePreviewProvider: e.target.value })}
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                        >
                                             <option value="Youtube">YouTube</option>
                                             <option value="Vimeo">Vimeo</option>
                                             <option value="HTML5">HTML5 / Custom</option>
                                        </select>
                                   </div>
                                   <div className="space-y-2">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Preview URL</label>
                                        <input
                                             type="text"
                                             value={formData.coursePreviewUrl}
                                             onChange={(e) => setFormData({ ...formData, coursePreviewUrl: e.target.value })}
                                             placeholder="https://youtube.com/..."
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                        />
                                   </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-2 flex flex-col justify-end pb-3">
                                        <label className="flex items-center space-x-2 text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider cursor-pointer">
                                             <input
                                                  type="checkbox"
                                                  checked={formData.freeCourse}
                                                  onChange={(e) => {
                                                       const checked = e.target.checked;
                                                       setFormData(p => ({
                                                            ...p,
                                                            freeCourse: checked,
                                                            price: checked ? "0" : p.price,
                                                            currentPrice: checked ? "0" : p.currentPrice
                                                       }));
                                                  }}
                                                  className="rounded border-bgray-300 dark:border-darkblack-400 text-success-300 focus:ring-success-300"
                                             />
                                             <span>Free Course</span>
                                        </label>
                                   </div>
                                   <div className="space-y-2">
                                        <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Discount (%)</label>
                                        <input
                                             type="number"
                                             value={formData.discount}
                                             onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                             placeholder="0"
                                             className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                        />
                                   </div>
                              </div>

                              {!formData.freeCourse && (
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                             <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Price <span className="text-red-500">*</span></label>
                                             <input
                                                  type="number"
                                                  value={formData.price}
                                                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                  placeholder="$0"
                                                  className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none font-mono"
                                             />
                                        </div>
                                        <div className="space-y-2">
                                             <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Current Price <span className="text-red-500">*</span></label>
                                             <input
                                                  type="number"
                                                  value={formData.currentPrice}
                                                  onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                                                  placeholder="$0"
                                                  className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none font-mono text-success-300"
                                             />
                                        </div>
                                   </div>
                              )}

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Provider <span className="text-red-500">*</span></label>
                                   <input
                                        type="text"
                                        value={formData.courseProvider}
                                        onChange={(e) => setFormData({ ...formData, courseProvider: e.target.value })}
                                        placeholder="YouTube, Vimeo, etc."
                                        className="w-full px-4 py-3 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Course Thumbnail</label>
                                   <div
                                        onClick={() => !uploadingImage && fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f); }}
                                        className={`relative w-full rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${dragOver ? "border-success-300 bg-success-50 dark:bg-success-300/10" : "border-bgray-300 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500 hover:border-success-300 hover:bg-success-50/50"}`}
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
                                                                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                                            </div>
                                                            <p className="text-sm font-semibold text-bgray-700 dark:text-white">Drop image here or <span className="text-success-300">click to browse</span></p>
                                                            <p className="text-xs text-bgray-400">JPG, PNG, WebP, GIF — max 5MB</p>
                                                       </>
                                                  )}
                                             </div>
                                        )}
                                   </div>
                                   <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }} />
                                   <input
                                        type="text"
                                        value={formData.thumbnailUrl}
                                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-2.5 text-sm border border-bgray-300 dark:border-darkblack-400 rounded-xl focus:ring-2 focus:ring-success-300/50 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white transition-all outline-none"
                                   />
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-bold text-bgray-700 dark:text-white uppercase tracking-wider">Description</label>
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
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                        </button>
                                        <button type="button" onClick={() => setViewMode("card")} className={`p-2 rounded-lg transition-all ${viewMode === "card" ? "bg-white dark:bg-darkblack-600 text-success-300 shadow-sm" : "text-bgray-400 hover:text-bgray-900"}`} title="Card View">
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
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
                                             <tr className="bg-bgray-50 dark:bg-darkblack-500/30 text-left border-b border-bgray-200 dark:border-darkblack-400 text-bgray-600 dark:text-white text-xs font-bold uppercase tracking-widest">
                                                  <td className="px-6 py-4">Course Info</td>
                                                  <td className="px-6 py-4">Pricing</td>
                                                  <td className="px-6 py-4">Syllabus</td>
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
                                                                           <p className="text-xs font-black text-bgray-400 uppercase tracking-tighter">
                                                                                {course.category?.name || "Uncategorized"}
                                                                                {course.class && ` • Class ${course.class.name || course.class}`}
                                                                           </p>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                 <div className="flex flex-col">
                                                                      {course.freeCourse ? (
                                                                           <span className="text-sm font-bold text-success-300">Free</span>
                                                                      ) : (
                                                                           <>
                                                                                <span className="text-sm font-bold text-success-300">${course.currentPrice}</span>
                                                                                <span className="text-xs text-bgray-400 line-through">${course.price}</span>
                                                                           </>
                                                                      )}
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                 <button onClick={() => openCurriculumEditor(course)} className="px-3 py-1.5 bg-success-50 dark:bg-success-300/15 text-success-300 text-xs font-bold rounded-lg hover:bg-success-300 hover:text-white transition-all">
                                                                      Manage Curriculum ({course.curriculum?.length || 0} chapters)
                                                                 </button>
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
                                             <div key={course._id} className="rounded-xl border border-bgray-200 dark:border-darkblack-400 bg-bgray-50 dark:bg-darkblack-500 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                                                  <div>
                                                       {course.thumbnailUrl ? (
                                                            <img src={course.thumbnailUrl} alt={course.title} className="w-full aspect-video object-cover" />
                                                       ) : (
                                                            <div className="w-full aspect-video bg-success-50 dark:bg-success-300/10 flex items-center justify-center text-success-300 font-bold text-4xl">{course.title.charAt(0)}</div>
                                                       )}
                                                       <div className="p-4 space-y-2">
                                                            <p className="font-bold text-bgray-900 dark:text-white">{course.title}</p>
                                                            <p className="text-xs font-black text-bgray-400 uppercase tracking-tighter">
                                                                 {course.category?.name || "Uncategorized"}
                                                                 {course.class && ` • Class ${course.class.name || course.class}`}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                 {course.freeCourse ? (
                                                                      <span className="text-sm font-bold text-success-300">Free</span>
                                                                 ) : (
                                                                      <>
                                                                           <span className="text-sm font-bold text-success-300">${course.currentPrice}</span>
                                                                           <span className="text-xs text-bgray-400 line-through">${course.price}</span>
                                                                      </>
                                                                 )}
                                                            </div>
                                                            <p className="text-xs text-bgray-400">{course.curriculum?.length || 0} Syllabus Chapters</p>
                                                       </div>
                                                  </div>
                                                  <div className="p-4 pt-0 space-y-2">
                                                       <button onClick={() => openCurriculumEditor(course)} className="w-full py-2 bg-success-50 dark:bg-success-300/10 hover:bg-success-300 hover:text-white text-success-300 text-xs font-bold rounded-xl transition-all">
                                                            Manage Curriculum
                                                       </button>
                                                       <div className="flex gap-2">
                                                            <button onClick={() => handleEditCourse(course)} className="flex-1 p-2 bg-bgray-100 dark:bg-darkblack-400 rounded-xl hover:bg-success-300 hover:text-white transition-all text-xs font-bold">Edit Details</button>
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
                         <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl text-white ${toast.type === "success"
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

               {/* Assignment Submissions Viewer Modal */}
               {submissionsViewer && (
                    <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
                         <div className="bg-white dark:bg-darkblack-600 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-bgray-200 dark:border-darkblack-400 shadow-2xl overflow-hidden">
                              {/* Header */}
                              <div className="flex justify-between items-center p-6 border-b border-bgray-100 dark:border-darkblack-500">
                                   <div>
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Assignment Submissions
                                        </h3>
                                        <p className="text-xs text-bgray-400">
                                             For: <span className="font-extrabold text-success-300">{submissionsViewer.item.title}</span>
                                        </p>
                                   </div>
                                   <button 
                                        onClick={() => {
                                             setSubmissionsViewer(null);
                                             setEvaluatingSubmission(null);
                                        }} 
                                        className="p-2 text-bgray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all font-bold text-sm"
                                   >
                                        Close
                                   </button>
                              </div>

                              {/* Body */}
                              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                   {evaluatingSubmission && (
                                        <form onSubmit={handleEvaluateSubmission} className="bg-bgray-50 dark:bg-darkblack-500 p-6 rounded-2xl border border-bgray-200 dark:border-darkblack-400 space-y-4">
                                             <div className="flex justify-between items-center">
                                                  <h4 className="text-sm font-bold text-bgray-900 dark:text-white uppercase tracking-wider">
                                                       Evaluate Submission: {evaluatingSubmission.student?.fname} {evaluatingSubmission.student?.lname}
                                                  </h4>
                                                  <button 
                                                       type="button" 
                                                       onClick={() => setEvaluatingSubmission(null)} 
                                                       className="text-xs text-red-500 hover:underline font-bold"
                                                  >
                                                       Cancel Evaluation
                                                  </button>
                                             </div>
                                             
                                             {evaluatingSubmission.fileUrl && (
                                                  <div className="p-3 bg-white dark:bg-darkblack-600 rounded-xl border border-bgray-150 dark:border-darkblack-400 flex justify-between items-center text-xs">
                                                       <span className="font-medium text-bgray-600 dark:text-bgray-300">
                                                            Submitted File: <span className="font-bold">{evaluatingSubmission.fileName || "document.pdf"}</span>
                                                       </span>
                                                       <a 
                                                            href={evaluatingSubmission.fileUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="px-3 py-1 bg-success-300 hover:bg-success-400 text-white font-bold rounded-lg transition-colors"
                                                       >
                                                            View Document
                                                       </a>
                                                  </div>
                                             )}

                                             {evaluatingSubmission.message && (
                                                  <div className="text-xs space-y-1">
                                                       <span className="font-bold text-bgray-500 uppercase">Student Comment</span>
                                                       <p className="p-3 bg-white dark:bg-darkblack-600 rounded-xl border border-bgray-150 dark:border-darkblack-400 text-bgray-700 dark:text-bgray-200">
                                                            {evaluatingSubmission.message}
                                                       </p>
                                                  </div>
                                             )}

                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  <div className="space-y-2">
                                                       <label className="text-xs font-bold text-bgray-500 uppercase">Marks (0 - 100) <span className="text-red-500">*</span></label>
                                                       <input 
                                                            type="number"
                                                            min={0}
                                                            max={100}
                                                            value={evaluatingMarks}
                                                            onChange={(e) => setEvaluatingMarks(e.target.value === "" ? "" : Number(e.target.value))}
                                                            required
                                                            placeholder="e.g. 85"
                                                            className="w-full px-4 py-2.5 text-sm border border-bgray-300 dark:border-darkblack-450 rounded-xl bg-white dark:bg-darkblack-600 text-bgray-900 dark:text-white outline-none"
                                                       />
                                                  </div>
                                                  <div className="space-y-2">
                                                       <label className="text-xs font-bold text-bgray-500 uppercase">Evaluator</label>
                                                       <input 
                                                            type="text"
                                                            value="Teacher"
                                                            disabled
                                                            className="w-full px-4 py-2.5 text-sm border border-bgray-250 dark:border-darkblack-450 rounded-xl bg-bgray-100 dark:bg-darkblack-700 text-bgray-500 outline-none"
                                                       />
                                                  </div>
                                             </div>

                                             <div className="space-y-2">
                                                  <label className="text-xs font-bold text-bgray-500 uppercase">Feedback / Review Comments</label>
                                                  <textarea 
                                                       rows={3}
                                                       value={evaluatingFeedback}
                                                       onChange={(e) => setEvaluatingFeedback(e.target.value)}
                                                       placeholder="Good effort, keep it up..."
                                                       className="w-full p-3 text-sm border border-bgray-300 dark:border-darkblack-450 rounded-xl bg-white dark:bg-darkblack-600 text-bgray-900 dark:text-white outline-none resize-none"
                                                  />
                                             </div>

                                             <button 
                                                  type="submit" 
                                                  disabled={submittingEvaluation} 
                                                  className="w-full py-3 bg-success-300 hover:bg-success-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-success-300/20 disabled:opacity-50 text-sm"
                                             >
                                                  {submittingEvaluation ? "Saving Evaluation..." : "Save Evaluation"}
                                             </button>
                                        </form>
                                   )}

                                   {loadingSubmissions ? (
                                        <p className="text-center py-12 text-bgray-400 text-sm">Loading submissions...</p>
                                   ) : submissions.length === 0 ? (
                                        <div className="text-center py-16 text-bgray-400 space-y-2">
                                             <svg className="w-12 h-12 mx-auto text-bgray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                             </svg>
                                             <p className="text-sm font-medium">No submissions yet.</p>
                                             <p className="text-xs">Once students submit their files, they will appear here.</p>
                                        </div>
                                   ) : (
                                        <div className="overflow-x-auto border border-bgray-200 dark:border-darkblack-400 rounded-xl">
                                             <table className="w-full text-left">
                                                  <thead>
                                                       <tr className="bg-bgray-50 dark:bg-darkblack-500 text-xs font-bold text-bgray-600 dark:text-white uppercase border-b border-bgray-200 dark:border-darkblack-400">
                                                            <th className="px-4 py-3">Student Info</th>
                                                            <th className="px-4 py-3">Submission Details</th>
                                                            <th className="px-4 py-3">Grade/Marks</th>
                                                            <th className="px-4 py-3 text-right">Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody className="divide-y divide-bgray-100 dark:divide-darkblack-500 text-xs">
                                                       {submissions.map((sub) => (
                                                            <tr key={sub._id} className="hover:bg-bgray-50/50 dark:hover:bg-darkblack-500/20 transition-colors">
                                                                 <td className="px-4 py-4">
                                                                      <p className="font-bold text-bgray-900 dark:text-white">
                                                                           {sub.student?.fname || "Unknown"} {sub.student?.lname || "Student"}
                                                                      </p>
                                                                      <p className="text-[10px] text-bgray-400 font-semibold uppercase">
                                                                           Roll: {sub.student?.roll_no || "N/A"} • Class: {sub.student?.class || "N/A"}
                                                                      </p>
                                                                 </td>
                                                                 <td className="px-4 py-4 space-y-1">
                                                                      <p className="text-bgray-400 text-[10px]">
                                                                           Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
                                                                      </p>
                                                                      {sub.fileUrl && (
                                                                           <a 
                                                                                href={sub.fileUrl} 
                                                                                target="_blank" 
                                                                                rel="noopener noreferrer" 
                                                                                className="inline-flex items-center gap-1 text-success-300 font-bold hover:underline"
                                                                           >
                                                                                📎 {sub.fileName || "View Document"}
                                                                           </a>
                                                                      )}
                                                                      {sub.message && (
                                                                           <p className="text-bgray-500 italic line-clamp-1">
                                                                                "{sub.message}"
                                                                           </p>
                                                                      )}
                                                                 </td>
                                                                 <td className="px-4 py-4">
                                                                      {sub.status === "evaluated" ? (
                                                                           <div className="space-y-0.5">
                                                                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-black rounded text-[10px]">
                                                                                     {sub.marks} / 100 Marks
                                                                                </span>
                                                                                {sub.feedback && (
                                                                                     <p className="text-[10px] text-bgray-400 italic truncate max-w-[150px]">
                                                                                          "{sub.feedback}"
                                                                                     </p>
                                                                                )}
                                                                           </div>
                                                                      ) : (
                                                                           <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-black rounded text-[10px]">
                                                                                Pending Review
                                                                           </span>
                                                                      )}
                                                                 </td>
                                                                 <td className="px-4 py-4 text-right">
                                                                      <button 
                                                                           onClick={() => {
                                                                                setEvaluatingSubmission(sub);
                                                                                setEvaluatingMarks(sub.marks !== undefined ? sub.marks : "");
                                                                                setEvaluatingFeedback(sub.feedback || "");
                                                                           }} 
                                                                           className="px-3 py-1.5 bg-success-300 hover:bg-success-400 text-white font-bold rounded-lg transition-colors text-[10px]"
                                                                      >
                                                                           {sub.status === "evaluated" ? "Re-evaluate" : "Grade"}
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}