"use client";
import React, { useState, useEffect } from "react";

type IClass = string;
type ISection = string;

interface ITemplate {
    _id: string;
    name: string;
    classSections: {
        className: string;
        sections: string[];
    }[];
    description?: string;
}

export default function TemplateList() {
     const [templates, setTemplates] = useState<ITemplate[]>([]);
     const [classes, setClasses] = useState<IClass[]>([]);
     const [sections, setSections] = useState<ISection[]>([]);
     const [classSectionsMap, setClassSectionsMap] = useState<Record<string, string[]>>({});
     const [isLoading, setIsLoading] = useState(true);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     const [editingId, setEditingId] = useState<string | null>(null);
     const [showForm, setShowForm] = useState(false);
     const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });

     const [formData, setFormData] = useState({
          name: "",
          classSections: [] as { className: string; sections: string[] }[],
          description: ""
     });

     useEffect(() => {
          fetchInitialData();
     }, []);

     const fetchInitialData = async () => {
          setIsLoading(true);
          try {
               const [tempRes, classRes, secRes] = await Promise.all([
                    fetch("/api/cbse-templates"),
                    fetch("/api/classes"),
                    fetch("/api/sections")
               ]);
               if (tempRes.ok) setTemplates(await tempRes.json());
               if (classRes.ok) setClasses(await classRes.json());
               if (secRes.ok) setSections(await secRes.json());
          } catch (error) {
               console.error("Error fetching data:", error);
          } finally {
               setIsLoading(false);
          }
     };

     const handleAddClassSection = () => {
          setFormData(prev => ({
               ...prev,
               classSections: [...prev.classSections, { className: "", sections: [] }]
          }));
     };

     const handleRemoveClassSection = (index: number) => {
          setFormData(prev => ({
               ...prev,
               classSections: prev.classSections.filter((_, i) => i !== index)
          }));
     };

     const handleClassChange = async (index: number, className: string) => {
          const newClassSections = [...formData.classSections];
          newClassSections[index].className = className;
          newClassSections[index].sections = []; // Reset sections when class changes
          setFormData({ ...formData, classSections: newClassSections });

          if (className && !classSectionsMap[className]) {
               try {
                    const res = await fetch(`/api/sections?class=${className}`);
                    if (res.ok) {
                         const data = await res.json();
                         setClassSectionsMap(prev => ({ ...prev, [className]: data }));
                    }
               } catch (err) { console.error(err); }
          }
     };

     const handleSectionToggle = (index: number, section: string) => {
          const newClassSections = [...formData.classSections];
          const sections = newClassSections[index].sections;
          if (sections.includes(section)) {
               newClassSections[index].sections = sections.filter(s => s !== section);
          } else {
               newClassSections[index].sections = [...sections, section];
          }
          setFormData({ ...formData, classSections: newClassSections });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);
          const method = editingId ? "PUT" : "POST";
          const url = editingId ? `/api/cbse-templates/${editingId}` : "/api/cbse-templates";

          try {
               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });

               if (res.ok) {
                    setNotification({ message: `Template ${editingId ? "updated" : "added"} successfully!`, type: "success" });
                    resetForm();
                    fetchInitialData();
               } else {
                    setNotification({ message: "Error saving template.", type: "error" });
               }
          } catch (error) {
               setNotification({ message: "Network error.", type: "error" });
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (template: ITemplate) => {
          setEditingId(template._id);
          setFormData({
               name: template.name,
               classSections: template.classSections || [],
               description: template.description || ""
          });
          setShowForm(true);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this template?")) return;
          try {
               const res = await fetch(`/api/cbse-templates/${id}`, { method: "DELETE" });
               if (res.ok) {
                    setNotification({ message: "Template deleted!", type: "success" });
                    fetchInitialData();
               } else {
                    setNotification({ message: "Error deleting template.", type: "error" });
               }
          } catch (error) {
               setNotification({ message: "Network error.", type: "error" });
          }
     };

     const resetForm = () => {
          setFormData({ name: "", classSections: [], description: "" });
          setEditingId(null);
          setShowForm(false);
     };

     const filteredTemplates = templates.filter(t => 
          t.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               {notification.type && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${notification.type === "success" ? "bg-success-300" : "bg-error-300"}`}>
                         {notification.message}
                         <button onClick={() => setNotification({ message: "", type: null })} className="ml-4 font-bold">X</button>
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 font-medium">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <div className="flex justify-between items-center">
                                        <div className="relative w-72">
                                             <input
                                                  type="text"
                                                  placeholder="Search..."
                                                  value={searchTerm}
                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                  className="w-full h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-10 focus:ring-0 border-none text-sm"
                                             />
                                             <span className="absolute left-3 top-3.5">
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"><circle cx="9" cy="9" r="6" strokeWidth="1.5"/><path d="M14 14l4 4" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                             </span>
                                        </div>
                                        <button
                                             onClick={() => { resetForm(); setShowForm(true); }}
                                             className="px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 text-white font-semibold transition-colors"
                                        >
                                             Add New
                                        </button>
                                   </div>

                                   <div className="table-content w-full overflow-x-auto">
                                        <table className="w-full">
                                             <thead>
                                                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                       <th className="py-5 px-6 xl:px-0 text-left font-medium text-bgray-600 dark:text-bgray-50">Template</th>
                                                       <th className="py-5 px-6 xl:px-0 text-left font-medium text-bgray-600 dark:text-bgray-50">Class Sections</th>
                                                       <th className="py-5 px-6 xl:px-0 text-left font-medium text-bgray-600 dark:text-bgray-50">Description</th>
                                                       <th className="py-5 px-6 xl:px-0 text-right font-medium text-bgray-600 dark:text-bgray-50">Action</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {isLoading ? (
                                                       <tr><td colSpan={4} className="py-20 text-center">Loading templates...</td></tr>
                                                  ) : filteredTemplates.length === 0 ? (
                                                       <tr><td colSpan={4} className="py-20 text-center text-bgray-500">No templates found.</td></tr>
                                                  ) : (
                                                       filteredTemplates.map((template) => (
                                                            <tr key={template._id} className="border-b border-bgray-200 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500">
                                                                 <td className="py-5 px-6 xl:px-0 text-bgray-900 dark:text-white font-medium">{template.name}</td>
                                                                 <td className="py-5 px-6 xl:px-0 text-bgray-700 dark:text-bgray-300 text-sm">
                                                                      {template.classSections.map((cs, i) => (
                                                                           <div key={i}>{cs.className}: {cs.sections.join(", ")}</div>
                                                                      ))}
                                                                 </td>
                                                                 <td className="py-5 px-6 xl:px-0 text-bgray-600 dark:text-bgray-400 text-sm max-w-xs truncate">{template.description || "-"}</td>
                                                                 <td className="py-5 px-6 xl:px-0">
                                                                      <div className="flex justify-end space-x-3">
                                                                           <button onClick={() => handleEdit(template)} className="text-bgray-500 hover:text-success-300"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                                                                           <button onClick={() => handleDelete(template._id)} className="text-bgray-500 hover:text-error-300"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {showForm && (
                         <aside className="2xl:w-[400px] w-full bg-white dark:bg-darkblack-600 rounded-lg p-6 h-fit sticky top-6 shadow-xl border border-bgray-200 dark:border-darkblack-500 transition-all">
                              <div className="flex justify-between items-center mb-6">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white">{editingId ? "Edit Template" : "Add Template"}</h3>
                                   <button onClick={resetForm} className="text-bgray-500 hover:text-bgray-900 border rounded p-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                              </div>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                   <div className="space-y-1">
                                        <label className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Template Name *</label>
                                        <input
                                             type="text"
                                             required
                                             value={formData.name}
                                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                             className="w-full h-11 bg-bgray-100 dark:bg-darkblack-500 rounded-lg px-4 focus:ring-2 focus:ring-success-300 border-none"
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                             <label className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Class & Sections *</label>
                                             <button type="button" onClick={handleAddClassSection} className="text-xs text-success-300 hover:underline font-bold">+ Add Class</button>
                                        </div>
                                        {formData.classSections.map((cs, idx) => (
                                             <div key={idx} className="p-3 bg-bgray-50 dark:bg-darkblack-700 rounded-lg space-y-3 relative group">
                                                  <button type="button" onClick={() => handleRemoveClassSection(idx)} className="absolute -top-2 -right-2 bg-error-300 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">X</button>
                                                  <select
                                                       required
                                                       value={cs.className}
                                                       onChange={(e) => handleClassChange(idx, e.target.value)}
                                                       className="w-full h-9 bg-white dark:bg-darkblack-500 rounded border-bgray-300 text-sm focus:ring-success-300"
                                                  >
                                                       <option value="">Select Class</option>
                                                       {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                                  </select>
                                                   <div className="flex flex-wrap gap-2">
                                                        {(classSectionsMap[cs.className] || sections).map(s => (
                                                             <button
                                                                  key={s}
                                                                  type="button"
                                                                  onClick={() => handleSectionToggle(idx, s)}
                                                                  className={`px-2 py-1 rounded text-xs border transition-colors ${cs.sections.includes(s) ? "bg-success-300 border-success-300 text-white" : "border-bgray-300 hover:border-success-300"}`}
                                                             >
                                                                  {s}
                                                             </button>
                                                       ))}
                                                       {cs.className && !classSectionsMap[cs.className] && (
                                                            <span className="text-[10px] text-bgray-500 italic">Select class to view sections...</span>
                                                       )}
                                                  </div>
                                             </div>
                                        ))}
                                   </div>

                                   <div className="space-y-1">
                                        <label className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Description</label>
                                        <textarea
                                             value={formData.description}
                                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                             className="w-full h-24 bg-bgray-100 dark:bg-darkblack-500 rounded-lg p-4 focus:ring-2 focus:ring-success-300 border-none text-sm resize-none"
                                        />
                                   </div>

                                   <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 bg-success-300 hover:bg-success-400 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                                   >
                                        {isSubmitting ? "Saving..." : editingId ? "Update Template" : "Save Template"}
                                   </button>
                              </form>
                         </aside>
                    )}
               </div>
          </>
     );
}