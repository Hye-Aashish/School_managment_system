"use client";
import React, { useState, useEffect } from "react";

export default function CBSEExamSettingPage() {
     const [isModuleEnabled, setIsModuleEnabled] = useState(true);
     const [parentVisible, setParentVisible] = useState(false);
     const [studentVisible, setStudentVisible] = useState(true);
     const [gradingScale, setGradingScale] = useState("9-point");
     const [isLoading, setIsLoading] = useState(false);

     const handleSave = async () => {
          setIsLoading(true);
          // Simulate saving since no backend API exists yet
          setTimeout(() => {
               setIsLoading(false);
               alert("Settings successfully saved!");
          }, 800);
     };

     return (
          <div className="p-6 w-full">
               <div className="bg-white dark:bg-darkblack-600 rounded-[32px] max-w-4xl p-10 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <h2 className="text-2xl font-black mb-10 text-bgray-900 dark:text-white border-b pb-4 border-bgray-200 dark:border-darkblack-400 tracking-tighter">CBSE Examination System Configuration</h2>
                    <div className="space-y-8">
                         <div className="flex items-center justify-between p-6 bg-success-50/50 dark:bg-success-300/10 border border-success-100 dark:border-success-300/20 rounded-2xl transition duration-300">
                              <div>
                                   <p className="text-bgray-900 dark:text-white font-black text-lg">Enable CBSE Examination Module</p>
                                   <p className="text-sm font-bold text-bgray-500 mt-1">Globally enable or disable the CBSE examination features</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input 
                                        type="checkbox" 
                                        checked={isModuleEnabled} 
                                        onChange={(e) => setIsModuleEnabled(e.target.checked)} 
                                        className="sr-only peer" 
                                   />
                                   <div className="w-14 h-8 bg-bgray-200 peer-focus:outline-none rounded-full peer dark:bg-darkblack-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success-300"></div>
                              </label>
                         </div>

                         <div className={`space-y-8 transition-opacity duration-300 ${isModuleEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                   <div className="flex items-center justify-between p-6 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl border border-transparent hover:border-bgray-200 dark:hover:border-darkblack-400 transition-colors">
                                        <div>
                                             <p className="text-bgray-900 dark:text-white font-black">Visible to Parent Portal</p>
                                             <p className="text-xs font-bold text-bgray-500 mt-1">Allow parents to see report cards</p>
                                        </div>
                                        <input
                                             type="checkbox"
                                             checked={parentVisible}
                                             onChange={(e) => setParentVisible(e.target.checked)}
                                             className="w-6 h-6 rounded-lg accent-success-300 cursor-pointer"
                                        />
                                   </div>
                                   <div className="flex items-center justify-between p-6 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl border border-transparent hover:border-bgray-200 dark:hover:border-darkblack-400 transition-colors">
                                        <div>
                                             <p className="text-bgray-900 dark:text-white font-black">Visible to Student Portal</p>
                                             <p className="text-xs font-bold text-bgray-500 mt-1">Allow students to see exam scores</p>
                                        </div>
                                        <input
                                             type="checkbox"
                                             checked={studentVisible}
                                             onChange={(e) => setStudentVisible(e.target.checked)}
                                             className="w-6 h-6 rounded-lg accent-success-300 cursor-pointer"
                                        />
                                   </div>
                              </div>

                              <div className="p-6 bg-bgray-50 dark:bg-darkblack-500 rounded-2xl border border-bgray-100 dark:border-darkblack-400">
                                   <p className="text-bgray-900 dark:text-white font-black mb-4">Default Grading Scale</p>
                                   <select 
                                        value={gradingScale}
                                        onChange={(e) => setGradingScale(e.target.value)}
                                        className="w-full bg-white dark:bg-darkblack-600 border border-bgray-200 dark:border-darkblack-400 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-success-300/30 transition-all"
                                   >
                                        <option value="9-point">9-Point Scale (CBSE Standard)</option>
                                        <option value="10-point">10-Point Scale (CGPA Style)</option>
                                        <option value="percentage">Percentage Based</option>
                                        <option value="custom">Custom Scale Setup</option>
                                   </select>
                                   <p className="text-xs font-bold text-bgray-400 mt-3 flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                        This setting affects the default evaluation mechanism when generating new marksheet templates.
                                   </p>
                              </div>
                         </div>

                         <div className="pt-8 border-t border-bgray-200 dark:border-darkblack-400 flex justify-end">
                              <button
                                   onClick={handleSave}
                                   disabled={isLoading}
                                   className="w-full md:w-auto px-12 py-4 bg-success-300 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-success-400 transition-all transform active:scale-95 shadow-xl shadow-success-300/20 disabled:opacity-70 flex items-center justify-center gap-3"
                              >
                                   {isLoading ? (
                                        <>
                                             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                             </svg>
                                             Saving Config...
                                        </>
                                   ) : "Save Configuration"}
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
}
