"use client";
import React, { useState, useEffect } from "react";

export default function BehaviourSettingPage() {
     const [isModuleEnabled, setIsModuleEnabled] = useState(true);
     const [parentVisible, setParentVisible] = useState(false);
     const [studentVisible, setStudentVisible] = useState(false);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          const fetchSettings = async () => {
               try {
                    const res = await fetch("/api/behaviour-settings");
                    const json = await res.json();
                    if (json.success) {
                         setIsModuleEnabled(json.data.isModuleEnabled ?? true);
                         setParentVisible(json.data.parentVisible);
                         setStudentVisible(json.data.studentVisible);
                    }
               } catch (error) {
                    console.error("Error fetching settings:", error);
               } finally {
                    setIsLoading(false);
               }
          };
          fetchSettings();
     }, []);

     const handleSave = async () => {
          try {
               const res = await fetch("/api/behaviour-settings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isModuleEnabled, parentVisible, studentVisible }),
               });
               if (res.ok) {
                    alert("successfully saved");
               }
          } catch (error) {
               console.error("Error saving settings:", error);
          }
     };

     if (isLoading) return <div className="p-6">Loading...</div>;

     return (
          <div className="p-6">
               <div className="bg-white dark:bg-darkblack-600 rounded-lg max-w-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-8 text-bgray-900 dark:text-white border-b pb-4 border-bgray-200 dark:border-darkblack-400">Behaviour Records Setting</h2>
                    <div className="space-y-8">
                         <div className="flex items-center justify-between p-4 bg-bgray-50 dark:bg-darkblack-500 rounded-xl transition duration-300">
                              <div>
                                   <p className="text-bgray-900 dark:text-white font-bold text-lg">Enable Behaviour Records</p>
                                   <p className="text-sm text-bgray-500">Completely enable or disable the behaviour records module</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input 
                                        type="checkbox" 
                                        checked={isModuleEnabled} 
                                        onChange={(e) => setIsModuleEnabled(e.target.checked)} 
                                        className="sr-only peer" 
                                   />
                                   <div className="w-11 h-6 bg-bgray-200 peer-focus:outline-none rounded-full peer dark:bg-darkblack-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-300"></div>
                              </label>
                         </div>

                         <div className={`space-y-6 transition-opacity duration-300 ${isModuleEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                              <div className="flex items-center justify-between p-2">
                                   <div>
                                        <p className="text-bgray-900 dark:text-white font-medium">Visible to Parent</p>
                                        <p className="text-sm text-bgray-500">Allow parents to see behaviour records in their portal</p>
                                   </div>
                                   <input
                                        type="checkbox"
                                        checked={parentVisible}
                                        onChange={(e) => setParentVisible(e.target.checked)}
                                        className="w-5 h-5 accent-success-300"
                                   />
                              </div>
                              <div className="flex items-center justify-between p-2">
                                   <div>
                                        <p className="text-bgray-900 dark:text-white font-medium">Visible to Student</p>
                                        <p className="text-sm text-bgray-500">Allow students to see behaviour records in their portal</p>
                                   </div>
                                   <input
                                        type="checkbox"
                                        checked={studentVisible}
                                        onChange={(e) => setStudentVisible(e.target.checked)}
                                        className="w-5 h-5 accent-success-300"
                                   />
                              </div>
                         </div>

                         <div className="pt-6 border-t border-bgray-200 dark:border-darkblack-400">
                              <button
                                   onClick={handleSave}
                                   className="w-full md:w-auto px-8 py-3 bg-success-300 text-white rounded-lg font-bold hover:bg-success-400 transition transform active:scale-95 shadow-lg shadow-success-300/20"
                              >
                                   Save Configuration
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
}
