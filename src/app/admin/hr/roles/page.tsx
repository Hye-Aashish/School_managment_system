"use client";
import React, { useState, useEffect } from "react";

const ALL_MODULES = [
    { id: "Dashboard", name: "Dashboard" },
    { id: "Students", name: "Students" },
    { id: "Fees", name: "Fees" },
    { id: "Online Course", name: "Online Course" },
    { id: "Multi Branch", name: "Multi Branch" },
    { id: "Google Meet Classes", name: "Google Meet Classes" },
    { id: "Zoom Live Class", name: "Zoom Live Class" },
    { id: "Behaviour", name: "Behaviour" },
    { id: "Income", name: "Income" },
    { id: "Expenses", name: "Expenses" },
    { id: "CBSE Examination", name: "CBSE Examination" },
    { id: "Examinations", name: "Examinations" },
    { id: "Attendance", name: "Attendance" },
    { id: "Online Examinations", name: "Online Examinations" },
    { id: "Academics", name: "Academics" },
    { id: "Annual Calendar", name: "Annual Calendar" },
    { id: "Lesson Plan", name: "Lesson Plan" },
    { id: "HR", name: "HR" },
    { id: "Communication", name: "Communication" },
    { id: "Download Center", name: "Download Center" },
    { id: "Homework", name: "Homework" },
    { id: "Library", name: "Library" },
    { id: "Inventory", name: "Inventory" },
    { id: "Student CV", name: "Student CV" },
    { id: "Transport", name: "Transport" }
];

export default function RolesPermissionsManagement() {
     const [roles, setRoles] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [saving, setSaving] = useState(false);
     const [selectedRole, setSelectedRole] = useState<any | null>(null);
     const [newRoleName, setNewRoleName] = useState("");
     const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
     const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

     const showMessage = (text: string, type: "success" | "error") => {
          setMessage({ text, type });
          setTimeout(() => setMessage(null), 3000);
     };

     const fetchRoles = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/roles");
               const data = await res.json();
               if (data.success) {
                    setRoles(data.data);
                    if (data.data.length > 0 && !selectedRole) {
                         selectRole(data.data[0]);
                    }
               }
          } catch (err) {
               console.error("Failed to load roles:", err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchRoles();
     }, []);

     const selectRole = (role: any) => {
          setSelectedRole(role);
          setSelectedPermissions(role.permissions || []);
     };

     const handleCreateRole = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!newRoleName.trim()) return;

          setSaving(true);
          try {
               const res = await fetch("/api/roles", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newRoleName.trim(), permissions: [] })
               });
               const data = await res.json();
               if (data.success) {
                    setNewRoleName("");
                    fetchRoles();
                    showMessage("Role created successfully!", "success");
               } else {
                    showMessage(data.error || "Failed to create role", "error");
               }
          } catch (err) {
               showMessage("Network error occurred", "error");
          } finally {
               setSaving(false);
          }
     };

     const handleTogglePermission = (moduleId: string) => {
          setSelectedPermissions(prev => 
               prev.includes(moduleId) 
                    ? prev.filter(p => p !== moduleId) 
                    : [...prev, moduleId]
          );
     };

     const handleSavePermissions = async () => {
          if (!selectedRole) return;
          setSaving(true);
          try {
               const res = await fetch(`/api/roles/${selectedRole._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ permissions: selectedPermissions })
               });
               const data = await res.json();
               if (data.success) {
                    setRoles(prev => prev.map(r => r._id === selectedRole._id ? { ...r, permissions: selectedPermissions } : r));
                    setSelectedRole({ ...selectedRole, permissions: selectedPermissions });
                    showMessage("Permissions updated successfully!", "success");
               } else {
                    showMessage(data.error || "Failed to save permissions", "error");
               }
          } catch (err) {
               showMessage("Network error occurred", "error");
          } finally {
               setSaving(false);
          }
     };

     const handleDeleteRole = async (id: string) => {
          if (!confirm("Are you sure you want to delete this role? All permissions assigned to it will be removed.")) return;
          try {
               const res = await fetch(`/api/roles/${id}`, { method: "DELETE" });
               const data = await res.json();
               if (data.success) {
                    showMessage("Role deleted successfully!", "success");
                    setSelectedRole(null);
                    fetchRoles();
               } else {
                    showMessage(data.error || "Failed to delete role", "error");
               }
          } catch (err) {
               showMessage("Network error occurred", "error");
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1 relative">
               {message && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl text-white font-bold animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === "success" ? "bg-success-300" : "bg-red-500"}`}>
                         {message.text}
                    </div>
               )}

               <div className="flex flex-col lg:flex-row gap-8">
                    {/* Roles Registry Panel */}
                    <section className="w-full lg:w-[360px] shrink-0 space-y-6 lg:sticky lg:top-24 h-fit">
                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter mb-4 flex items-center gap-3">
                                   <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                                   Create Role
                              </h3>
                              <form onSubmit={handleCreateRole} className="space-y-4">
                                   <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-bgray-500 uppercase tracking-widest px-1">Role Identifier *</label>
                                        <input 
                                             required 
                                             value={newRoleName} 
                                             onChange={e => setNewRoleName(e.target.value)} 
                                             className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-4 text-xs font-bold border-none outline-none focus:ring-2 focus:ring-success-300/30" 
                                             placeholder="e.g. Teacher, Receptionist" 
                                        />
                                   </div>
                                   <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="w-full h-12 bg-success-300 text-white font-black rounded-xl hover:bg-success-400 disabled:opacity-50 transition-all uppercase tracking-[0.2em] text-[10px]"
                                   >
                                        Create New Role
                                   </button>
                              </form>
                         </div>

                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                              <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter mb-4">Roles Directory</h3>
                              <div className="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                                   {loading ? (
                                        <div className="py-12 text-center text-xs font-bold text-bgray-400 uppercase animate-pulse">Synchronizing directory...</div>
                                   ) : roles.length > 0 ? (
                                        roles.map(r => (
                                             <div 
                                                  key={r._id}
                                                  onClick={() => selectRole(r)}
                                                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border
                                                       ${selectedRole?._id === r._id 
                                                            ? "bg-success-300/10 border-success-300/40 text-success-300" 
                                                            : "bg-bgray-50/50 dark:bg-darkblack-500/30 border-transparent text-bgray-700 dark:text-bgray-200 hover:bg-bgray-100 dark:hover:bg-darkblack-500/60"
                                                       }
                                                  `}
                                             >
                                                  <span className="font-bold text-xs uppercase tracking-wider">{r.name}</span>
                                                  {r.name !== "SuperAdmin" && r.name !== "Admin" && (
                                                       <button 
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteRole(r._id); }}
                                                            className="p-1 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-500/10 transition-colors"
                                                       >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                       </button>
                                                  )}
                                             </div>
                                        ))
                                   ) : (
                                        <div className="py-12 text-center text-xs font-bold text-bgray-400 uppercase">No Roles Added</div>
                                   )}
                              </div>
                         </div>
                    </section>

                    {/* Permissions Panel */}
                    <section className="flex-1">
                         <div className="bg-white dark:bg-darkblack-600 rounded-[32px] p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 min-h-[600px] flex flex-col justify-between">
                              {selectedRole ? (
                                   <div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-bgray-100 dark:border-darkblack-400 mb-8">
                                             <div>
                                                  <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Permissions Console</h3>
                                                  <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">Configuring access modules for: <span className="text-primary font-black ml-1">{selectedRole.name}</span></p>
                                             </div>
                                             {selectedRole.name !== "SuperAdmin" && (
                                                  <button 
                                                       onClick={handleSavePermissions}
                                                       disabled={saving}
                                                       className="px-8 h-12 bg-primary text-black font-black rounded-2xl hover:scale-[1.03] transition-all shadow-xl shadow-primary/20 text-xs uppercase tracking-widest disabled:opacity-50"
                                                  >
                                                       {saving ? "Saving Changes..." : "Apply Permissions"}
                                                  </button>
                                             )}
                                        </div>

                                        {selectedRole.name === "SuperAdmin" ? (
                                             <div className="py-16 text-center text-bgray-400 uppercase text-xs font-black tracking-widest border border-dashed border-bgray-200 dark:border-darkblack-400 rounded-3xl">
                                                  Super Admin possesses unrestricted privileges across all system components.
                                             </div>
                                        ) : (
                                             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                  {ALL_MODULES.map(module => {
                                                       const isChecked = selectedPermissions.includes(module.id);
                                                       return (
                                                            <div 
                                                                 key={module.id}
                                                                 onClick={() => handleTogglePermission(module.id)}
                                                                 className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer select-none transition-all
                                                                      ${isChecked 
                                                                           ? "bg-primary/5 border-primary text-bgray-900 dark:text-white" 
                                                                           : "bg-white dark:bg-darkblack-500/10 border-bgray-200 dark:border-darkblack-400 text-bgray-500 dark:text-gray-400 hover:border-bgray-300 dark:hover:border-darkblack-300"
                                                                      }
                                                                 `}
                                                            >
                                                                 <div className="relative flex items-center shrink-0">
                                                                      <input 
                                                                           type="checkbox" 
                                                                           checked={isChecked}
                                                                           onChange={() => handleTogglePermission(module.id)} 
                                                                           className="peer appearance-none w-5 h-5 rounded-lg border border-bgray-300 dark:border-darkblack-400 checked:bg-primary checked:border-primary transition-all cursor-pointer" 
                                                                      />
                                                                      <svg className="absolute left-1 top-1/2 -translate-y-1/2 w-3 height-3 stroke-[#020617] stroke-[3.5] fill-none opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                 </div>
                                                                 <span className="text-xs font-black uppercase tracking-wider">{module.name}</span>
                                                            </div>
                                                       );
                                                  })}
                                             </div>
                                        )}
                                   </div>
                              ) : (
                                   <div className="my-auto text-center opacity-30">
                                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                        <p className="text-xs font-black uppercase tracking-[0.3em]">Select a role from the directory to inspect permissions</p>
                                   </div>
                              )}
                         </div>
                    </section>
               </div>
          </div>
     );
}
