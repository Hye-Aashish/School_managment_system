"use client";
import React, { useState, useEffect } from "react";

export default function CourseSetting() {
     const [loading, setLoading] = useState(true);
     const [onlineCourse, setOnlineCourse] = useState({
          quiz: true,
          exam: true,
          assignment: true
     });

     const [awsSettings, setAwsSettings] = useState({
          accessKeyId: "",
          secretAccessKey: "",
          bucketName: "",
          region: ""
     });

     const [guestUser, setGuestUser] = useState({
          guestLogin: "enabled",
          guestUserPrefix: "Guest",
          guestUserIdStartFrom: "100"
     });

     const fetchSettings = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/online-course/setting");
               if (res.ok) {
                    const data = await res.json();
                    if (data.curriculum) setOnlineCourse(data.curriculum);
                    if (data.aws) setAwsSettings(data.aws);
                    if (data.guest) setGuestUser(data.guest);
               }
          } catch (error) {
               console.error("Failed to fetch settings");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchSettings();
     }, []);

     const handleSave = async () => {
          try {
               const res = await fetch("/api/online-course/setting", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         curriculum: onlineCourse,
                         aws: awsSettings,
                         guest: guestUser
                    })
               });
               if (res.ok) {
                    alert("Settings updated successfully!");
               } else {
                    alert("Failed to update settings.");
               }
          } catch (error) {
               console.error("Failed to update settings");
               alert("An error occurred while updating settings.");
          }
     };

     if (loading) {
          return (
               <div className="flex items-center justify-center min-h-[50vh]">
                    <p className="text-lg font-medium text-bgray-600 dark:text-bgray-50">Loading settings...</p>
               </div>
          );
     }

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">

                         {/* Online Course Curriculam Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <h2 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">Setting</h2>

                              <div className="mb-6">
                                   <h3 className="text-base font-semibold text-bgray-900 dark:text-white mb-4">Online Course Curriculam</h3>

                                   <div className="flex flex-wrap gap-8">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                             <input
                                                  type="checkbox"
                                                  checked={onlineCourse.quiz}
                                                  onChange={(e) => setOnlineCourse({ ...onlineCourse, quiz: e.target.checked })}
                                                  className="focus:outline-none focus:ring-0 rounded border-2 border-bgray-400 cursor-pointer w-4 h-4 text-blue-600 dark:bg-darkblack-600 dark:border-darkblack-400"
                                             />
                                             <span className="text-base text-bgray-900 dark:text-white">Quiz</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                             <input
                                                  type="checkbox"
                                                  checked={onlineCourse.exam}
                                                  onChange={(e) => setOnlineCourse({ ...onlineCourse, exam: e.target.checked })}
                                                  className="focus:outline-none focus:ring-0 rounded border-2 border-bgray-400 cursor-pointer w-4 h-4 text-blue-600 dark:bg-darkblack-600 dark:border-darkblack-400"
                                             />
                                             <span className="text-base text-bgray-900 dark:text-white">Exam</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                             <input
                                                  type="checkbox"
                                                  checked={onlineCourse.assignment}
                                                  onChange={(e) => setOnlineCourse({ ...onlineCourse, assignment: e.target.checked })}
                                                  className="focus:outline-none focus:ring-0 rounded border-2 border-bgray-400 cursor-pointer w-4 h-4 text-blue-600 dark:bg-darkblack-600 dark:border-darkblack-400"
                                             />
                                             <span className="text-base text-bgray-900 dark:text-white">Assignment</span>
                                        </label>
                                   </div>
                              </div>

                              <div className="flex justify-start">
                                   <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-6 py-2.5 rounded-lg bg-bgray-600 hover:bg-bgray-700 dark:bg-bgray-600 dark:hover:bg-bgray-700 text-white text-sm font-semibold transition-colors duration-200"
                                   >
                                        Save
                                   </button>
                              </div>
                         </div>

                         {/* AWS S3 Bucket Setting Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <div className="flex justify-between items-center mb-5">
                                   <h2 className="text-xl font-bold text-bgray-900 dark:text-white">AWS S3 Bucket Setting</h2>
                                   <span className="text-sm text-bgray-500 dark:text-bgray-400">Version 4.0</span>
                              </div>

                              <div className="space-y-4 mb-6">
                                   {/* Access Key ID */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2 block">
                                             Access Key ID <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={awsSettings.accessKeyId}
                                             onChange={(e) => setAwsSettings({ ...awsSettings, accessKeyId: e.target.value })}
                                             className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-bgray-100 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>

                                   {/* Secret Access Key */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2 block">
                                             Secret Access Key <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="password"
                                             value={awsSettings.secretAccessKey}
                                             onChange={(e) => setAwsSettings({ ...awsSettings, secretAccessKey: e.target.value })}
                                             className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-bgray-100 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>

                                   {/* Bucket Name */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2 block">
                                             Bucket Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={awsSettings.bucketName}
                                             onChange={(e) => setAwsSettings({ ...awsSettings, bucketName: e.target.value })}
                                             placeholder=""
                                             className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>

                                   {/* Region */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2 block">
                                             Region <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={awsSettings.region}
                                             onChange={(e) => setAwsSettings({ ...awsSettings, region: e.target.value })}
                                             placeholder=""
                                             className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>
                              </div>

                              <div className="flex justify-start">
                                   <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-6 py-2.5 rounded-lg bg-bgray-600 hover:bg-bgray-700 dark:bg-bgray-600 dark:hover:bg-bgray-700 text-white text-sm font-semibold transition-colors duration-200"
                                   >
                                        Save
                                   </button>
                              </div>
                         </div>

                         {/* Guest User Section */}
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600 mb-6">
                              <h2 className="text-xl font-bold text-bgray-900 dark:text-white mb-5">Guest User</h2>

                              <div className="space-y-4 mb-6">
                                   {/* Guest Login */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-3 block">
                                             Guest Login <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-6">
                                             <label className="flex items-center gap-2 cursor-pointer">
                                                  <input
                                                       type="radio"
                                                       name="guestLogin"
                                                       value="disabled"
                                                       checked={guestUser.guestLogin === "disabled"}
                                                       onChange={(e) => setGuestUser({ ...guestUser, guestLogin: e.target.value })}
                                                       className="focus:outline-none focus:ring-0 border-bgray-400 cursor-pointer w-4 h-4 text-blue-600 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                  />
                                                  <span className="text-base text-bgray-900 dark:text-white">Disabled</span>
                                             </label>

                                             <label className="flex items-center gap-2 cursor-pointer">
                                                  <input
                                                       type="radio"
                                                       name="guestLogin"
                                                       value="enabled"
                                                       checked={guestUser.guestLogin === "enabled"}
                                                       onChange={(e) => setGuestUser({ ...guestUser, guestLogin: e.target.value })}
                                                       className="focus:outline-none focus:ring-0 border-bgray-400 cursor-pointer w-4 h-4 text-blue-600 dark:bg-darkblack-600 dark:border-darkblack-400"
                                                  />
                                                  <span className="text-base text-bgray-900 dark:text-white">Enabled</span>
                                             </label>
                                        </div>
                                   </div>

                                   {/* Guest User Prefix */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2 block">
                                             Guest User Prefix <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={guestUser.guestUserPrefix}
                                             onChange={(e) => setGuestUser({ ...guestUser, guestUserPrefix: e.target.value })}
                                             className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-bgray-100 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>

                                   {/* Guest User Id Start From */}
                                   <div>
                                        <label className="text-sm font-medium text-bgray-900 dark:text-bgray-50 mb-2 block">
                                             Guest User Id Start From <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             value={guestUser.guestUserIdStartFrom}
                                             onChange={(e) => setGuestUser({ ...guestUser, guestUserIdStartFrom: e.target.value })}
                                             className="w-full px-4 py-3 border border-bgray-300 dark:border-darkblack-400 rounded-lg focus:outline-none focus:border-success-300 bg-bgray-100 dark:bg-darkblack-500 text-bgray-900 dark:text-white"
                                        />
                                   </div>
                              </div>

                              <div className="flex justify-start">
                                   <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-6 py-2.5 rounded-lg bg-bgray-600 hover:bg-bgray-700 dark:bg-bgray-600 dark:hover:bg-bgray-700 text-white text-sm font-semibold transition-colors duration-200"
                                   >
                                        Save
                                   </button>
                              </div>
                         </div>

                    </section>
               </div>
          </>
     );
}