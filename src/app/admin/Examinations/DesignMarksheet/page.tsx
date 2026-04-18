"use client";
import React, { useState, useEffect } from "react";

export default function DesignMarksheet() {
     const [templates, setTemplates] = useState<any[]>([]);
     const [loading, setLoading] = useState(false);
     const [editId, setEditId] = useState<string | null>(null);
     
     const [formData, setFormData] = useState({
          templateName: "",
          examName: "",
          schoolName: "",
          examCenter: "",
          bodyText: "",
          footerText: "",
          printingDate: "",
          headerImage: "",
          leftLogo: "",
          rightLogo: "",
          leftSign: "",
          middleSign: "",
          rightSign: "",
          backgroundImage: "",
          toggles: {
               name: false,
               fatherName: false,
               motherName: false,
               examSession: false,
               admissionNo: false,
               division: false,
               rank: false,
               rollNumber: false,
               photo: false,
               class: false,
               section: false,
               dateOfBirth: false,
               remark: false
          }
     });

     useEffect(() => {
          fetchTemplates();
     }, []);

     const fetchTemplates = async () => {
          setLoading(true);
          try {
               const res = await fetch("/api/marksheet-templates");
               const data = await res.json();
               if (data.success) setTemplates(data.data);
          } catch (error) {
               console.error("Error fetching templates:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
     };

     const handleToggle = (field: keyof typeof formData.toggles) => {
          setFormData(prev => ({
               ...prev,
               toggles: { ...prev.toggles, [field]: !prev.toggles[field] }
          }));
     };

     const handleSubmit = async () => {
          if (!formData.templateName) {
               alert("Please enter template name");
               return;
          }
          
          const method = editId ? "PATCH" : "POST";
          const url = editId ? `/api/marksheet-templates/${editId}` : "/api/marksheet-templates";
          
          try {
               const res = await fetch(url, {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
               });
               const data = await res.json();
               if (data.success) {
                    alert(editId ? "Template updated" : "Template created");
                    resetForm();
                    fetchTemplates();
               }
          } catch (error) {
               console.error("Error saving template:", error);
          }
     };

     const handleEdit = (template: any) => {
          setEditId(template._id);
          setFormData({
               templateName: template.templateName || "",
               examName: template.examName || "",
               schoolName: template.schoolName || "",
               examCenter: template.examCenter || "",
               bodyText: template.bodyText || "",
               footerText: template.footerText || "",
               printingDate: template.printingDate || "",
               headerImage: template.headerImage || "",
               leftLogo: template.leftLogo || "",
               rightLogo: template.rightLogo || "",
               leftSign: template.leftSign || "",
               middleSign: template.middleSign || "",
               rightSign: template.rightSign || "",
               backgroundImage: template.backgroundImage || "",
               toggles: { ...formData.toggles, ...(template.toggles || {}) }
          });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this template?")) return;
          try {
               const res = await fetch(`/api/marksheet-templates/${id}`, { method: "DELETE" });
               const data = await res.json();
               if (data.success) {
                    fetchTemplates();
               }
          } catch (error) {
               console.error("Error deleting template:", error);
          }
     };

     const resetForm = () => {
          setEditId(null);
          setFormData({
               templateName: "",
               examName: "",
               schoolName: "",
               examCenter: "",
               bodyText: "",
               footerText: "",
               printingDate: "",
               headerImage: "",
               leftLogo: "",
               rightLogo: "",
               leftSign: "",
               middleSign: "",
               rightSign: "",
               backgroundImage: "",
               toggles: {
                    name: false,
                    fatherName: false,
                    motherName: false,
                    examSession: false,
                    admissionNo: false,
                    division: false,
                    rank: false,
                    rollNumber: false,
                    photo: false,
                    class: false,
                    section: false,
                    dateOfBirth: false,
                    remark: false
               }
          });
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Left Column - Form */}
                              <div className="w-full py-6 px-6 rounded-lg bg-white dark:bg-darkblack-600 lg:max-w-[380px] overflow-y-auto max-h-[85vh]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             {editId ? "Edit Marksheet Template" : "Add Marksheet Template"}
                                        </h3>
                                        <div className="w-full space-y-4">
                                             <div className="space-y-1">
                                                  <label className="text-xs font-medium text-bgray-600 dark:text-bgray-300 capitalize">Template Name *</label>
                                                  <input type="text" name="templateName" value={formData.templateName} onChange={handleInputChange} placeholder="Enter template name" className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:outline-none" />
                                             </div>
                                             {["examName", "schoolName", "examCenter"].map(field => (
                                                  <div key={field} className="space-y-1">
                                                       <label className="text-xs font-medium text-bgray-600 dark:text-bgray-300 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                                       <input type="text" name={field} value={(formData as any)[field]} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:outline-none" />
                                                  </div>
                                             ))}
                                             <div className="space-y-1">
                                                  <label className="text-xs font-medium text-bgray-600 dark:text-bgray-300">Printing Date</label>
                                                  <input type="date" name="printingDate" value={formData.printingDate} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:outline-none" />
                                             </div>
                                             <div className="space-y-1">
                                                  <label className="text-xs font-medium text-bgray-600 dark:text-bgray-300">Body Text</label>
                                                  <textarea name="bodyText" value={formData.bodyText} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:outline-none resize-none" />
                                             </div>
                                             <div className="space-y-1">
                                                  <label className="text-xs font-medium text-bgray-600 dark:text-bgray-300">Footer Text</label>
                                                  <textarea name="footerText" value={formData.footerText} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-bgray-900 dark:text-white text-sm focus:outline-none resize-none" />
                                             </div>

                                             <div className="space-y-2 pt-2 border-t border-bgray-200 dark:border-darkblack-400 mt-4">
                                                  <h4 className="text-sm font-bold text-bgray-900 dark:text-white">Fields to Show</h4>
                                                  {Object.entries(formData.toggles).map(([key, val]) => (
                                                       <div key={key} className="flex items-center justify-between py-1">
                                                            <label className="text-xs text-bgray-600 dark:text-bgray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                                            <button onClick={() => handleToggle(key as keyof typeof formData.toggles)} className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${val ? "bg-success-300" : "bg-bgray-300 dark:bg-darkblack-400"}`}>
                                                                 <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${val ? "translate-x-5.5" : "translate-x-1"}`} />
                                                            </button>
                                                       </div>
                                                  ))}
                                             </div>

                                             <div className="flex gap-2 pt-4 sticky bottom-0 bg-white dark:bg-darkblack-600 pb-2">
                                                  <button onClick={handleSubmit} type="button" className="flex-1 px-6 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 text-white font-semibold transition-colors">
                                                       {editId ? "Update" : "Save"}
                                                  </button>
                                                  {editId && (
                                                       <button onClick={resetForm} type="button" className="px-6 py-2.5 rounded-lg bg-bgray-300 text-bgray-900 font-semibold transition-colors">Cancel</button>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Right Column - Table */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <div className="table-content w-full overflow-x-auto min-h-[400px]">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-4"><span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Template Name</span></td>
                                                            <td className="py-5 px-4 text-right"><span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Action</span></td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr><td colSpan={2} className="py-20 text-center text-bgray-600 dark:text-bgray-300">Loading...</td></tr>
                                                       ) : templates.length === 0 ? (
                                                            <tr><td colSpan={2} className="py-20 text-center text-bgray-600 dark:text-bgray-300">No templates found</td></tr>
                                                       ) : templates.map((item) => (
                                                            <tr key={item._id} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-5 px-4"><p className="font-medium text-base text-bgray-900 dark:text-bgray-50">{item.templateName}</p></td>
                                                                 <td className="py-5 px-4">
                                                                      <div className="flex justify-end space-x-3">
                                                                           <button onClick={() => handleEdit(item)} className="text-bgray-500 hover:text-success-300 transition-colors">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.16797 3.33334H3.33464C2.89261 3.33334 2.46868 3.50894 2.15612 3.82149C1.84356 4.13405 1.66797 4.55798 1.66797 5.00001V16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333H15.0013C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667V10.8333" /><path d="M15.418 2.08332C15.7495 1.75188 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.75188 17.918 2.08332C18.2494 2.41476 18.4357 2.86436 18.4357 3.33332C18.4357 3.80228 18.2494 4.25188 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" /></svg>
                                                                           </button>
                                                                           <button onClick={() => handleDelete(item._id)} className="text-bgray-500 hover:text-error-300 transition-colors">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15.8333 5L14.1667 15.8333C14.1667 16.2754 13.9911 16.6993 13.6785 17.0118C13.366 17.3244 12.942 17.5 12.5 17.5H7.5C7.05797 17.5 6.63405 17.3244 6.32149 17.0118C6.00893 16.6993 5.83333 16.2754 5.83333 15.8333L4.16667 5" /><path d="M2.5 5H17.5" /><path d="M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" /></svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}