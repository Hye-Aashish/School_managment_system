"use client";
import React, { useState } from "react";

export default function Settings() {
     const [apiKey, setApiKey] = useState("988720996993-ctjb5ibg56b45fu505l3lv310bv55d79.apps.googleusercontent.com");
     const [apiSecret, setApiSecret] = useState("XkSqRpcFacU2Gg6QqCZP8kVP");
     const [useGoogleCalendar, setUseGoogleCalendar] = useState("disabled");
     const [parentLiveClass, setParentLiveClass] = useState("disabled");

     const handleSave = () => {
          // Handle save logic here
          console.log({
               apiKey,
               apiSecret,
               useGoogleCalendar,
               parentLiveClass
          });
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         {/* Header */}
                         <div className="flex justify-between items-center mb-6">
                              <h1 className="text-2xl font-semibold text-bgray-900 dark:text-white">Setting</h1>
                         </div>

                         <div className="w-full py-[40px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-8 max-w-4xl">
                                   {/* API Key Field */}
                                   <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 md:w-48 flex-shrink-0">
                                             API Key
                                        </label>
                                        <div className="flex-1">
                                             <input
                                                  type="text"
                                                  value={apiKey}
                                                  onChange={(e) => setApiKey(e.target.value)}
                                                  className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-bgray-50 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent transition duration-300"
                                                  placeholder="Enter API Key"
                                             />
                                        </div>
                                   </div>

                                   {/* API Secret Field */}
                                   <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 md:w-48 flex-shrink-0">
                                             API Secret
                                        </label>
                                        <div className="flex-1">
                                             <input
                                                  type="text"
                                                  value={apiSecret}
                                                  onChange={(e) => setApiSecret(e.target.value)}
                                                  className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-bgray-50 focus:outline-none focus:ring-2 focus:ring-success-300 focus:border-transparent transition duration-300"
                                                  placeholder="Enter API Secret"
                                             />
                                        </div>
                                   </div>

                                   {/* Use Google Calendar API */}
                                   <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 md:w-48 flex-shrink-0">
                                             Use Google Calendar Api <span className="text-error-300">*</span>
                                        </label>
                                        <div className="flex-1">
                                             <div className="flex items-center gap-6">
                                                  <label className="flex items-center gap-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="googleCalendar"
                                                            value="disabled"
                                                            checked={useGoogleCalendar === "disabled"}
                                                            onChange={(e) => setUseGoogleCalendar(e.target.value)}
                                                            className="w-4 h-4 text-success-300 border-bgray-300 focus:ring-success-300 focus:ring-2"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-bgray-50">Disabled</span>
                                                  </label>
                                                  <label className="flex items-center gap-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="googleCalendar"
                                                            value="enabled"
                                                            checked={useGoogleCalendar === "enabled"}
                                                            onChange={(e) => setUseGoogleCalendar(e.target.value)}
                                                            className="w-4 h-4 text-success-300 border-bgray-300 focus:ring-success-300 focus:ring-2"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-bgray-50">Enabled</span>
                                                  </label>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Parent Live Class */}
                                   <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 md:w-48 flex-shrink-0">
                                             Parent Live Class <span className="text-error-300">*</span>
                                        </label>
                                        <div className="flex-1">
                                             <div className="flex items-center gap-6">
                                                  <label className="flex items-center gap-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="parentLiveClass"
                                                            value="disabled"
                                                            checked={parentLiveClass === "disabled"}
                                                            onChange={(e) => setParentLiveClass(e.target.value)}
                                                            className="w-4 h-4 text-success-300 border-bgray-300 focus:ring-success-300 focus:ring-2"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-bgray-50">Disabled</span>
                                                  </label>
                                                  <label className="flex items-center gap-2 cursor-pointer">
                                                       <input
                                                            type="radio"
                                                            name="parentLiveClass"
                                                            value="enabled"
                                                            checked={parentLiveClass === "enabled"}
                                                            onChange={(e) => setParentLiveClass(e.target.value)}
                                                            className="w-4 h-4 text-success-300 border-bgray-300 focus:ring-success-300 focus:ring-2"
                                                       />
                                                       <span className="text-sm text-bgray-900 dark:text-bgray-50">Enabled</span>
                                                  </label>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Save Button */}
                                   <div className="flex justify-start pt-4">
                                        <button
                                             type="button"
                                             onClick={handleSave}
                                             className="px-8 py-3 bg-bgray-600 hover:bg-bgray-700 text-white rounded-lg font-semibold transition duration-300 dark:bg-bgray-500 dark:hover:bg-bgray-600"
                                        >
                                             Save
                                        </button>
                                   </div>

                                   {/* Version Text */}
                                   <div className="flex justify-end pt-4">
                                        <span className="text-sm text-bgray-600 dark:text-bgray-400">Version 6.0</span>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}