"use client";
import React, { useState, useEffect } from "react";

interface IParameter {
    _id: string;
    name: string;
}

interface IObservationParam {
    parameter: IParameter | string;
    maxMarks: number;
}

interface IObservation {
    _id: string;
    name: string;
    parameters: IObservationParam[];
    description: string;
}

export default function ObservationList() {
     const [observations, setObservations] = useState<IObservation[]>([]);
     const [parameters, setParameters] = useState<IParameter[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");
     const [formData, setFormData] = useState({
          name: "",
          description: "",
          parameters: [{ parameter: "", maxMarks: 0 }]
     });
     const [editingId, setEditingId] = useState<string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     const fetchData = async () => {
          setIsLoading(true);
          try {
               const [obsRes, paramRes] = await Promise.all([
                    fetch("/api/cbse-observations"),
                    fetch("/api/cbse-observation-parameters")
               ]);

               if (obsRes.ok) setObservations(await obsRes.json());
               if (paramRes.ok) setParameters(await paramRes.json());

          } catch (error) {
               console.error("Error fetching data:", error);
               showNotification("Failed to load data", "error");
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handleAddParam = () => {
          setFormData({
               ...formData,
               parameters: [...formData.parameters, { parameter: "", maxMarks: 0 }]
          });
     };

     const handleRemoveParam = (index: number) => {
          const newParams = formData.parameters.filter((_, i) => i !== index);
          setFormData({ ...formData, parameters: newParams });
     };

     const handleParamChange = (index: number, field: string, value: any) => {
          const newParams = [...formData.parameters];
          (newParams[index] as any)[field] = value;
          setFormData({ ...formData, parameters: newParams });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.name) return;

          setIsSubmitting(true);
          try {
               const url = editingId ? `/api/cbse-observations/${editingId}` : "/api/cbse-observations";
               const method = editingId ? "PUT" : "POST";

               const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               if (res.ok) {
                    setFormData({ name: "", description: "", parameters: [{ parameter: "", maxMarks: 0 }] });
                    setEditingId(null);
                    fetchData();
                    showNotification(editingId ? "Observation updated!" : "Observation added!", "success");
               } else {
                    const data = await res.json();
                    showNotification(data.error || "Error saving observation", "error");
               }
          } catch (error) {
               console.error("Error saving observation:", error);
               showNotification("An error occurred", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleEdit = (obs: IObservation) => {
          setEditingId(obs._id);
          setFormData({
               name: obs.name,
               description: obs.description || "",
               parameters: obs.parameters.map(p => ({
                    parameter: typeof p.parameter === 'object' ? p.parameter._id : p.parameter,
                    maxMarks: p.maxMarks
               }))
          });
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Delete this observation?")) return;
          try {
               const res = await fetch(`/api/cbse-observations/${id}`, { method: "DELETE" });
               if (res.ok) {
                    fetchData();
                    showNotification("Observation deleted!", "success");
               }
          } catch (error) {
               showNotification("Error deleting observation", "error");
          }
     };

     const filteredObservations = observations.filter(obs => 
          obs.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <>
               {notification && (
                    <div className="fixed top-5 right-5 z-[100] animate-fade-in">
                         <div className={`px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" ? "bg-success-50 border-success-300 text-success-500" : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6 group">
                         <div className="flex flex-col lg:flex-row gap-6">
                              {/* Left Column - Form */}
                              <div className="w-full lg:max-w-[380px] p-6 rounded-lg bg-white dark:bg-darkblack-600 h-fit sticky top-6">
                                   <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">
                                        {editingId ? "Edit Observation" : "Add Observation"}
                                   </h3>
                                   <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Observation Name *</label>
                                             <input
                                                  type="text"
                                                  value={formData.name}
                                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                  required
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  placeholder="e.g. Term 1 Observation"
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Description</label>
                                             <textarea
                                                  value={formData.description}
                                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                  className="w-full p-2.5 rounded-lg border dark:bg-darkblack-500"
                                                  rows={3}
                                             />
                                        </div>
                                        
                                        <div className="space-y-3">
                                             <div className="flex justify-between items-center">
                                                  <label className="text-sm font-medium">Parameters</label>
                                                  <button type="button" onClick={handleAddParam} className="text-xs font-bold text-success-300 hover:underline">
                                                       + Add Parameter
                                                  </button>
                                             </div>
                                             {formData.parameters.map((p, index) => (
                                                  <div key={index} className="space-y-2 p-3 border rounded-lg dark:border-darkblack-400 relative">
                                                       {formData.parameters.length > 1 && (
                                                            <button 
                                                                 type="button" 
                                                                 onClick={() => handleRemoveParam(index)}
                                                                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                                                            >
                                                                 <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2.5" strokeLinecap="round"/></svg>
                                                            </button>
                                                       )}
                                                       <select
                                                            value={p.parameter}
                                                            onChange={(e) => handleParamChange(index, "parameter", e.target.value)}
                                                            className="w-full text-sm p-2 rounded-md border dark:bg-darkblack-500"
                                                       >
                                                            <option value="">Select Parameter</option>
                                                            {parameters.map(param => <option key={param._id} value={param._id}>{param.name}</option>)}
                                                       </select>
                                                       <input
                                                            type="number"
                                                            value={p.maxMarks}
                                                            onChange={(e) => handleParamChange(index, "maxMarks", parseInt(e.target.value))}
                                                            placeholder="Max Marks"
                                                            className="w-full text-sm p-2 rounded-md border dark:bg-darkblack-500"
                                                       />
                                                  </div>
                                             ))}
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                             {editingId && (
                                                  <button
                                                       type="button"
                                                       onClick={() => { setEditingId(null); setFormData({ name: "", description: "", parameters: [{ parameter: "", maxMarks: 0 }] }); }}
                                                       className="w-full py-2.5 rounded-lg bg-bgray-200 dark:bg-darkblack-500 font-semibold"
                                                  >
                                                       Cancel
                                                  </button>
                                             )}
                                             <button
                                                  type="submit"
                                                  disabled={isSubmitting}
                                                  className="w-full py-2.5 rounded-lg bg-success-300 text-white font-semibold disabled:opacity-50"
                                             >
                                                  {isSubmitting ? "Saving..." : editingId ? "Update" : "Save"}
                                             </button>
                                        </div>
                                   </form>
                              </div>

                              {/* Right Column - List */}
                              <div className="flex-1 p-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="mb-6">
                                        <input
                                             type="text"
                                             placeholder="Search Observations..."
                                             value={searchTerm}
                                             onChange={(e) => setSearchTerm(e.target.value)}
                                             className="w-full max-w-md p-2.5 rounded-lg bg-bgray-100 dark:bg-darkblack-500 border-none px-[18px]"
                                        />
                                   </div>

                                   {isLoading ? (
                                        <div className="py-20 text-center">Loading observations...</div>
                                   ) : filteredObservations.length === 0 ? (
                                        <div className="py-20 text-center text-bgray-500 font-medium">No observations found</div>
                                   ) : (
                                        <div className="overflow-x-auto">
                                             <table className="w-full border-collapse">
                                                  <thead>
                                                       <tr className="border-b border-bgray-200 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-300 text-sm font-semibold">
                                                            <th className="py-4 px-4 text-left">Observation</th>
                                                            <th className="py-4 px-4 text-left">Description</th>
                                                            <th className="py-4 px-4 text-left">Parameters (Max Marks)</th>
                                                            <th className="py-4 px-4 text-right pr-6">Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {filteredObservations.map((obs) => (
                                                            <tr key={obs._id} className="border-b border-bgray-100 dark:border-darkblack-500 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                                 <td className="py-4 px-4 align-top font-medium text-bgray-900 dark:text-white">{obs.name}</td>
                                                                 <td className="py-4 px-4 align-top text-xs text-bgray-500 max-w-xs">{obs.description}</td>
                                                                 <td className="py-4 px-4 align-top">
                                                                      <div className="flex flex-wrap gap-2">
                                                                           {obs.parameters.map((p, i) => (
                                                                                <span key={i} className="px-2 py-1 rounded bg-bgray-100 dark:bg-darkblack-400 text-[10px] font-semibold">
                                                                                     {(p.parameter as IParameter)?.name || "Unknown"}: {p.maxMarks}
                                                                                </span>
                                                                           ))}
                                                                      </div>
                                                                 </td>
                                                                 <td className="py-4 px-4 align-top text-right pr-6">
                                                                      <div className="flex justify-end space-x-2">
                                                                           <button onClick={() => handleEdit(obs)} className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-400 rounded text-success-300">
                                                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M9.16797 3.33334H3.33464C1.66797 3.33334 1.66797 5.00001 1.66797 5.00001V16.6667C1.66797 18.3333 3.33464 18.3333 3.33464 18.3333H15.0013C16.668 18.3333 16.668 16.6667 16.668 16.6667V10.8333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.418 2.08332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                           </button>
                                                                           <button onClick={() => handleDelete(obs._id)} className="p-1.5 hover:bg-bgray-100 dark:hover:bg-darkblack-400 rounded text-error-300">
                                                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M15.8333 5L14.1667 15.8333C14.1667 17.5 12.5 17.5 7.5 17.5C5.83333 17.5 5.83333 15.8333 5.83333 15.8333L4.16667 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 5H17.5" strokeWidth="1.5" strokeLinecap="round"/><path d="M7.5 5V3.33333C7.5 2.5 8.33333 2.5 8.33333 2.5H11.6667C12.5 2.5 12.5 3.33333 12.5 3.33333V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}