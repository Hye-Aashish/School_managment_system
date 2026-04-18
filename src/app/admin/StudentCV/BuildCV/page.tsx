"use client";
import React, { useState, useEffect } from "react";

export default function BuildCV() {
     const [classList, setClassList] = useState<any[]>([]);
     const [students, setStudents] = useState<any[]>([]);
     const [selectedStudent, setSelectedStudent] = useState<any>(null);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     
     const [cvData, setCvData] = useState({
          bio: "",
          skills: [] as string[],
          achievements: [] as string[],
          education: [{ degree: "", school: "", year: "", result: "" }],
          experience: [{ title: "", company: "", duration: "", description: "" }],
          projects: [{ name: "", link: "", description: "" }]
     });

     useEffect(() => {
          fetch("/api/classes").then(r => r.json()).then(d => { if(d.success) setClassList(d.data); });
     }, []);

     const fetchStudents = async (className: string) => {
          setLoading(true);
          const res = await fetch(`/api/students?class=${className}`);
          const data = await res.json();
          if (data.success) setStudents(data.data);
          setLoading(false);
     };

     const fetchCV = async (studentId: string) => {
          const res = await fetch(`/api/student-cv?studentId=${studentId}`);
          const data = await res.json();
          if (data.success && data.data) {
               setCvData(data.data);
          } else {
               setCvData({
                    bio: "", skills: [], achievements: [],
                    education: [{ degree: "", school: "", year: "", result: "" }],
                    experience: [{ title: "", company: "", duration: "", description: "" }],
                    projects: [{ name: "", link: "", description: "" }]
               });
          }
     };

     const handleSave = async () => {
          if (!selectedStudent) return;
          setSaving(true);
          await fetch("/api/student-cv", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ ...cvData, studentId: selectedStudent.admission_no })
          });
          setSaving(false);
          alert("CV Portfolio updated successfully!");
     };

     return (
          <div className="flex flex-col space-y-8 px-1">
               {/* Search & Selection */}
               <section className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col lg:flex-row gap-8 items-end">
                         <div className="w-full lg:w-1/3 space-y-1.5">
                              <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Institutional Class</label>
                              <select onChange={e => fetchStudents(e.target.value)} className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30">
                                   <option value="">Select Class</option>
                                   {classList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                              </select>
                         </div>
                         <div className="w-full lg:w-1/3 space-y-1.5">
                              <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Target Student Profile</label>
                              <select 
                                   onChange={e => {
                                        const s = students.find(st => st.admission_no === e.target.value);
                                        setSelectedStudent(s);
                                        if (s) fetchCV(s.admission_no);
                                   }} 
                                   className="w-full h-14 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl px-6 text-sm font-black border-none outline-none focus:ring-2 focus:ring-success-300/30 text-success-300"
                              >
                                   <option value="">Select Student</option>
                                   {students.map(s => <option key={s._id} value={s.admission_no}>{s.first_name} {s.last_name} ({s.admission_no})</option>)}
                              </select>
                         </div>
                         <div className="flex-1 flex justify-end">
                              <button 
                                   disabled={!selectedStudent || saving}
                                   onClick={handleSave}
                                   className="px-12 h-14 bg-success-300 text-white font-black rounded-2xl hover:bg-success-400 shadow-xl shadow-success-300/20 transition-all uppercase tracking-widest text-[10px] flex items-center gap-3"
                              >
                                   {saving ? "Syncing..." : "Finalize Portfolio"}
                              </button>
                         </div>
                    </div>
               </section>

               {selectedStudent && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-500">
                         {/* Left Sidebar - Profile & Skills */}
                         <section className="space-y-8">
                              <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                                   <div className="flex flex-col items-center text-center mb-8">
                                        <div className="w-24 h-24 bg-bgray-50 dark:bg-darkblack-500 rounded-[32px] flex items-center justify-center mb-4 border border-bgray-100 dark:border-darkblack-400">
                                             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <h4 className="text-xl font-black dark:text-white uppercase tracking-tighter">{selectedStudent.first_name} {selectedStudent.last_name}</h4>
                                        <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">{selectedStudent.class} - Section {selectedStudent.section}</p>
                                   </div>
                                   
                                   <div className="space-y-6 pt-6 border-t border-dashed border-bgray-100 dark:border-darkblack-400">
                                        <div className="space-y-2">
                                             <label className="text-[10px] font-black text-bgray-400 uppercase tracking-widest px-1">Professional Bio</label>
                                             <textarea 
                                                  value={cvData.bio} 
                                                  onChange={e => setCvData({...cvData, bio: e.target.value})}
                                                  rows={4} 
                                                  className="w-full bg-bgray-50 dark:bg-darkblack-500 rounded-2xl p-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30 resize-none leading-relaxed" 
                                                  placeholder="Tell their story..."
                                             ></textarea>
                                        </div>
                                   </div>
                              </div>
                         </section>

                         {/* Main Content - Education & Experience */}
                         <section className="xl:col-span-2 space-y-8">
                              <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-10 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                                   <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                        Academic Foundation
                                   </h3>
                                   <div className="space-y-6">
                                        {cvData.education.map((edu, idx) => (
                                             <div key={idx} className="grid grid-cols-2 gap-6 p-6 bg-bgray-50/50 dark:bg-darkblack-500/50 rounded-3xl relative group">
                                                  <input placeholder="Degree/Standard" value={edu.degree} onChange={e => {
                                                       const newEdu = [...cvData.education];
                                                       newEdu[idx].degree = e.target.value;
                                                       setCvData({...cvData, education: newEdu});
                                                  }} className="bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                                  <input placeholder="Institution" value={edu.school} onChange={e => {
                                                       const newEdu = [...cvData.education];
                                                       newEdu[idx].school = e.target.value;
                                                       setCvData({...cvData, education: newEdu});
                                                  }} className="bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                                  <input placeholder="Year" value={edu.year} onChange={e => {
                                                       const newEdu = [...cvData.education];
                                                       newEdu[idx].year = e.target.value;
                                                       setCvData({...cvData, education: newEdu});
                                                  }} className="bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                                  <input placeholder="Result/Grade" value={edu.result} onChange={e => {
                                                       const newEdu = [...cvData.education];
                                                       newEdu[idx].result = e.target.value;
                                                       setCvData({...cvData, education: newEdu});
                                                  }} className="bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" />
                                                  <button onClick={() => {
                                                       const newEdu = cvData.education.filter((_, i) => i !== idx);
                                                       setCvData({...cvData, education: newEdu});
                                                  }} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                             </div>
                                        ))}
                                        <button 
                                             onClick={() => setCvData({...cvData, education: [...cvData.education, { degree: "", school: "", year: "", result: "" }]})}
                                             className="w-full h-12 border-2 border-dashed border-bgray-200 dark:border-darkblack-400 rounded-2xl text-[10px] font-black text-bgray-400 hover:border-success-300 hover:text-success-300 transition-all uppercase tracking-widest"
                                        >
                                             Add Academic Entry
                                        </button>
                                   </div>

                                   <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter flex items-center gap-3 mt-12 mb-8">
                                        <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                                        Excellence & Experience
                                   </h3>
                                   <div className="space-y-6">
                                        {cvData.experience.map((exp, idx) => (
                                             <div key={idx} className="space-y-4 p-8 bg-orange-50/20 dark:bg-orange-400/5 rounded-[32px] relative group border border-orange-100 dark:border-orange-400/10">
                                                  <div className="grid grid-cols-2 gap-4">
                                                       <input placeholder="Title / Role" value={exp.title} onChange={e => {
                                                            const newExp = [...cvData.experience];
                                                            newExp[idx].title = e.target.value;
                                                            setCvData({...cvData, experience: newExp});
                                                       }} className="bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30" />
                                                       <input placeholder="Organization" value={exp.company} onChange={e => {
                                                            const newExp = [...cvData.experience];
                                                            newExp[idx].company = e.target.value;
                                                            setCvData({...cvData, experience: newExp});
                                                       }} className="bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30" />
                                                  </div>
                                                  <input placeholder="Duration (e.g. 2022 - 2023)" value={exp.duration} onChange={e => {
                                                       const newExp = [...cvData.experience];
                                                       newExp[idx].duration = e.target.value;
                                                       setCvData({...cvData, experience: newExp});
                                                  }} className="w-full bg-white dark:bg-darkblack-600 h-12 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-orange-300/30" />
                                                  <button onClick={() => {
                                                       const newExp = cvData.experience.filter((_, i) => i !== idx);
                                                       setCvData({...cvData, experience: newExp});
                                                  }} className="absolute top-4 right-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                                             </div>
                                        ))}
                                        <button 
                                             onClick={() => setCvData({...cvData, experience: [...cvData.experience, { title: "", company: "", duration: "", description: "" }]})}
                                             className="w-full h-12 border-2 border-dashed border-orange-100 dark:border-orange-400/20 rounded-2xl text-[10px] font-black text-orange-300 hover:border-orange-400 transition-all uppercase tracking-widest"
                                        >
                                             Add Experience / Achievement
                                        </button>
                                   </div>
                              </div>
                         </section>
                    </div>
               )}
          </div>
     );
}