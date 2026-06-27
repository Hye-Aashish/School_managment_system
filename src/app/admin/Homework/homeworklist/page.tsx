"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBook, faSearch, faFilter, faPlus, 
  faFileAlt, faUserGraduate 
} from "@fortawesome/free-solid-svg-icons";

export default function HomeworkList() {
    const [homeworks, setHomeworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Submissions drawer states
    const [selectedHomework, setSelectedHomework] = useState<any>(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [drawerLoading, setDrawerLoading] = useState(false);
    const [subFilter, setSubFilter] = useState<"all" | "submitted" | "evaluated">("all");
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
    const [grade, setGrade] = useState("");
    const [feedback, setFeedback] = useState("");
    const [evaluating, setEvaluating] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/homework");
            const result = await res.json();
            if (result.success) setHomeworks(result.data || []);
        } catch (error) {
            console.error("Failed to fetch homeworks");
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissions = async (hwId: string) => {
        setDrawerLoading(true);
        try {
             const res = await fetch(`/api/homework-submissions?homeworkId=${hwId}`);
             const data = await res.json();
             if (data.success) {
                  setSubmissions(data.data || []);
             }
        } catch (err) {
             console.error("Error fetching submissions:", err);
        } finally {
             setDrawerLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedHomework) {
             fetchSubmissions(selectedHomework._id);
        }
    }, [selectedHomework]);

    const handleOpenDrawer = (hw: any) => {
        setSelectedHomework(hw);
        setShowDrawer(true);
        setSelectedSubmission(null);
        setGrade("");
        setFeedback("");
    };

    const handleSelectSubmission = (sub: any) => {
        setSelectedSubmission(sub);
        setGrade(sub.grade || "");
        setFeedback(sub.feedback || "");
    };

    const handleEvaluate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubmission) return;
        setEvaluating(true);
        try {
             const res = await fetch("/api/homework-submissions", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                       submissionId: selectedSubmission._id,
                       grade,
                       feedback,
                       status: "evaluated"
                  })
             });
             const data = await res.json();
             if (data.success) {
                  setSubmissions(prev => prev.map(s => s._id === selectedSubmission._id ? { ...s, grade, feedback, status: "evaluated" } : s));
                  setSelectedSubmission(null);
                  alert("Submission evaluated successfully!");
             } else {
                  alert("Evaluation failed: " + data.error);
             }
        } catch (err) {
             console.error("Evaluation error:", err);
             alert("Something went wrong");
        } finally {
             setEvaluating(false);
        }
    };

    const filteredHomework = homeworks.filter(hw => 
        hw.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hw.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSubmissions = submissions.filter(sub => {
        if (subFilter === "all") return true;
        return sub.status === subFilter;
    });

    return (
        <div className="space-y-8 pb-10 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-bgray-900 dark:text-white tracking-tighter italic">Homework</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">List of assignments</p>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="card-modern p-6 bg-white dark:bg-darkblack-600 border-none flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by subject or class..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-darkblack-500 border border-gray-100 dark:border-white/5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="card-modern overflow-hidden bg-white dark:bg-darkblack-600 border-none shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-white/5">
                                <th className="py-8 px-8">Assignment</th>
                                <th className="py-8 px-6">Class</th>
                                <th className="py-8 px-6">Due Date</th>
                                <th className="py-8 px-6">Created On</th>
                                <th className="py-8 px-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm italic">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                                        Loading homework...
                                    </td>
                                </tr>
                            ) : filteredHomework.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400 font-bold italic">
                                        No homework found.
                                    </td>
                                </tr>
                            ) : filteredHomework.map((hw, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0 font-medium">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-lg shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                                                <FontAwesomeIcon icon={faBook} />
                                            </div>
                                            <div>
                                                <p className="font-black text-bgray-900 dark:text-white leading-none mb-1 text-base">{hw.subject}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Topic: {hw.description.slice(0, 30)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-sm shadow-blue-500/5">
                                            <FontAwesomeIcon icon={faUserGraduate} className="text-[10px]" />
                                            Grade {hw.class} ({hw.section})
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-rose-500 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                                {hw.submissionDate}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1 italic">Due Date</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 font-bold text-bgray-600 dark:text-gray-400 italic">
                                        {hw.homeworkDate}
                                    </td>
                                    <td className="py-6 px-8 text-right flex justify-end gap-2 items-center">
                                        <button 
                                            onClick={() => handleOpenDrawer(hw)}
                                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-500/10"
                                        >
                                            Submissions
                                        </button>
                                        {hw.fileUrl && (
                                            <a href={hw.fileUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-primary hover:text-black transition-all shadow-sm flex items-center justify-center">
                                                <FontAwesomeIcon icon={faFileAlt} />
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Drawer Overlay */}
            {showDrawer && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
                     {/* Drawer Panel */}
                     <div className="w-full max-w-4xl bg-white dark:bg-darkblack-600 h-full shadow-2xl flex flex-col relative overflow-hidden animate-slide-left">
                          {/* Header */}
                          <div className="p-6 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center bg-gray-50 dark:bg-darkblack-700">
                               <div>
                                    <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">
                                         {selectedHomework?.subject} Submissions
                                    </h3>
                                    <p className="text-xs text-bgray-400 font-bold uppercase mt-1">
                                         {selectedHomework?.class} - {selectedHomework?.section}
                                    </p>
                               </div>
                               <button 
                                    onClick={() => setShowDrawer(false)}
                                    className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-darkblack-500 dark:text-white hover:bg-red-500 hover:text-white transition-all flex items-center justify-center font-bold"
                               >
                                    ✕
                               </button>
                          </div>

                          {/* Content Container */}
                          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                               {/* Submissions List Side */}
                               <div className="flex-1 p-6 overflow-y-auto border-r border-bgray-200 dark:border-darkblack-400 flex flex-col space-y-4">
                                    {/* Status Filter */}
                                    <div className="flex gap-2">
                                         {(["all", "submitted", "evaluated"] as const).map(f => (
                                              <button
                                                   key={f}
                                                   onClick={() => setSubFilter(f)}
                                                   className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                                        subFilter === f 
                                                        ? "bg-emerald-500 text-white" 
                                                        : "bg-gray-100 dark:bg-darkblack-500 text-bgray-400"
                                                   }`}
                                              >
                                                   {f}
                                              </button>
                                         ))}
                                    </div>

                                    {drawerLoading ? (
                                         <div className="py-20 text-center"><div className="w-8 h-8 mx-auto border-4 border-emerald-300/25 border-t-emerald-500 rounded-full animate-spin"></div></div>
                                    ) : filteredSubmissions.length > 0 ? (
                                         <div className="space-y-4">
                                              {filteredSubmissions.map((sub: any) => (
                                                   <div 
                                                        key={sub._id}
                                                        onClick={() => handleSelectSubmission(sub)}
                                                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col space-y-3 ${
                                                             selectedSubmission?._id === sub._id
                                                             ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 shadow-lg"
                                                             : "bg-gray-50/50 dark:bg-darkblack-500 border-bgray-200 dark:border-darkblack-400 hover:border-emerald-500/50"
                                                        }`}
                                                   >
                                                        <div className="flex justify-between items-start">
                                                             <div>
                                                                  <h4 className="font-bold text-sm text-bgray-900 dark:text-white uppercase">
                                                                       {sub.student?.fname} {sub.student?.lname}
                                                                  </h4>
                                                                  <p className="text-[10px] font-semibold text-bgray-400 uppercase mt-0.5">
                                                                       Roll No: {sub.student?.roll_no} | Admin No: {sub.student?.admission_no}
                                                                  </p>
                                                             </div>
                                                             <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                                  sub.status === "evaluated"
                                                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                                  : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                                             }`}>
                                                                  {sub.status}
                                                             </span>
                                                        </div>
                                                        {sub.message && (
                                                             <p className="text-xs text-bgray-600 dark:text-bgray-300 italic">
                                                                  "{sub.message}"
                                                             </p>
                                                        )}
                                                        {sub.fileUrl && (
                                                             <a 
                                                                  href={sub.fileUrl} 
                                                                  target="_blank" 
                                                                  rel="noopener noreferrer"
                                                                  onClick={(e) => e.stopPropagation()}
                                                                  className="inline-flex items-center gap-2 text-[10px] font-black text-blue-500 hover:underline uppercase tracking-wider"
                                                             >
                                                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                                                  {sub.fileName || "View Attachment"}
                                                             </a>
                                                        )}
                                                   </div>
                                              ))}
                                         </div>
                                    ) : (
                                         <div className="py-20 text-center opacity-40 italic text-xs text-bgray-400">
                                              No submissions found matching filter.
                                         </div>
                                    )}
                               </div>

                               {/* Evaluation panel Side */}
                               <div className="w-full md:w-80 p-6 bg-gray-50/50 dark:bg-darkblack-700 flex flex-col justify-between">
                                    {selectedSubmission ? (
                                         <form onSubmit={handleEvaluate} className="space-y-6 flex-1 flex flex-col justify-between">
                                              <div className="space-y-6">
                                                   <div>
                                                        <h4 className="font-bold text-xs uppercase text-bgray-400 tracking-wider">Evaluating</h4>
                                                        <p className="font-black text-sm text-bgray-900 dark:text-white uppercase mt-1">
                                                             {selectedSubmission.student?.fname} {selectedSubmission.student?.lname}
                                                        </p>
                                                   </div>

                                                   <div className="space-y-2">
                                                        <label className="block text-[10px] font-black uppercase tracking-wider text-bgray-400">Grade / Marks</label>
                                                        <input 
                                                             type="text" 
                                                             value={grade}
                                                             onChange={e => setGrade(e.target.value)}
                                                             placeholder="e.g. A+, 95/100, Good"
                                                             required
                                                             className="w-full px-4 py-3 bg-white dark:bg-darkblack-600 rounded-xl text-xs font-bold border border-bgray-200 dark:border-darkblack-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-bgray-950 dark:text-white"
                                                        />
                                                   </div>

                                                   <div className="space-y-2">
                                                        <label className="block text-[10px] font-black uppercase tracking-wider text-bgray-400">Feedback Notes</label>
                                                        <textarea 
                                                             value={feedback}
                                                             onChange={e => setFeedback(e.target.value)}
                                                             placeholder="Provide construction advice or remarks..."
                                                             rows={4}
                                                             className="w-full px-4 py-3 bg-white dark:bg-darkblack-600 rounded-xl text-xs font-bold border border-bgray-200 dark:border-darkblack-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-bgray-950 dark:text-white resize-none"
                                                        />
                                                   </div>
                                              </div>

                                              <button
                                                   type="submit"
                                                   disabled={evaluating}
                                                   className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center"
                                              >
                                                   {evaluating ? "Saving..." : "Save Evaluation"}
                                              </button>
                                         </form>
                                    ) : (
                                         <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40">
                                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                              <p className="text-[10px] font-black uppercase tracking-wider">Select a student submission to evaluate</p>
                                         </div>
                                    )}
                               </div>
                          </div>
                     </div>
                </div>
            )}
        </div>
    );
}
