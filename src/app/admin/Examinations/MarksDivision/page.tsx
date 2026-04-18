"use client";
import React, { useState, useEffect } from "react";

export default function MarksDivision() {
     const [divisions, setDivisions] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [submitting, setSubmitting] = useState(false);
     const [editId, setEditId] = useState<string | null>(null);

     const [formData, setFormData] = useState({
          divisionName: "",
          percentFrom: "",
          percentUpto: ""
     });

     useEffect(() => {
          fetchDivisions();
     }, []);

     const fetchDivisions = async () => {
          try {
               const res = await fetch("/api/marks-divisions");
               const data = await res.json();
               if (data.success) {
                    setDivisions(data.data);
               }
          } catch (error) {
               console.error("Error fetching divisions:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async () => {
          const { divisionName, percentFrom, percentUpto } = formData;
          if (!divisionName || !percentFrom || !percentUpto) {
               alert("Please fill all required fields");
               return;
          }

          setSubmitting(true);
          try {
               const url = editId ? `/api/marks-divisions/${editId}` : "/api/marks-divisions";
               const method = editId ? "PATCH" : "POST";
               const res = await fetch(url, {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
               });

               const data = await res.json();
               if (data.success) {
                    setFormData({
                         divisionName: "",
                         percentFrom: "",
                         percentUpto: ""
                    });
                    setEditId(null);
                    fetchDivisions();
                    alert(editId ? "Division updated successfully!" : "Division added successfully!");
               } else {
                    alert("Error: " + data.error);
               }
          } catch (error) {
               console.error("Error saving division:", error);
               alert("An error occurred");
          } finally {
               setSubmitting(false);
          }
     };

     const handleEdit = (division: any) => {
          setFormData({
               divisionName: division.divisionName,
               percentFrom: division.percentFrom.toString(),
               percentUpto: division.percentUpto.toString()
          });
          setEditId(division._id);
     };

     const handleDelete = async (id: string) => {
          if (!window.confirm("Are you sure you want to delete this division?")) return;

          try {
               const res = await fetch(`/api/marks-divisions/${id}`, { method: "DELETE" });
               const data = await res.json();
               if (data.success) {
                    fetchDivisions();
               } else {
                    alert("Error: " + data.error);
               }
          } catch (error) {
               console.error("Error deleting division:", error);
          }
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-12">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="flex items-start gap-6 lg:flex-row md:flex-row flex-col">
                              {/* Left Form */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 max-w-[400px]">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             {editId ? "Edit Marks Division" : "Add Marks Division"}
                                        </h3>

                                        {/* Division Name */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Division Name <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  name="divisionName"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.divisionName}
                                                  onChange={handleInputChange}
                                             />
                                        </div>

                                        {/* Percent From */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Percent From <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="number"
                                                  name="percentFrom"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.percentFrom}
                                                  onChange={handleInputChange}
                                             />
                                        </div>

                                        {/* Percent Upto */}
                                        <div className="w-full space-y-2">
                                             <label className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                                                  Percent Upto <span className="text-red-500">*</span>
                                             </label>
                                             <input
                                                  type="number"
                                                  name="percentUpto"
                                                  className="w-full h-12 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-success-300"
                                                  value={formData.percentUpto}
                                                  onChange={handleInputChange}
                                             />
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex flex-col space-y-2">
                                             <button
                                                  type="button"
                                                  disabled={submitting}
                                                  onClick={handleSubmit}
                                                  className="px-8 py-3 rounded-lg bg-bgray-900 w-full dark:bg-success-300 text-white font-semibold hover:bg-bgray-800 transition-colors disabled:opacity-50"
                                             >
                                                  {submitting ? "Saving..." : (editId ? "Update" : "Save")}
                                             </button>
                                             {editId && (
                                                  <button
                                                       type="button"
                                                       onClick={() => {
                                                            setEditId(null);
                                                            setFormData({
                                                                 divisionName: "",
                                                                 percentFrom: "",
                                                                 percentUpto: ""
                                                            });
                                                       }}
                                                       className="py-2 text-sm text-center text-bgray-600 hover:text-bgray-900 dark:text-bgray-400 dark:hover:text-white underline"
                                                  >
                                                       Cancel Edit
                                                  </button>
                                             )}
                                        </div>
                                   </div>
                              </div>

                              {/* Right Table */}
                              <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex flex-col space-y-5">
                                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                                             Division List
                                        </h3>

                                        <div className="table-content w-full overflow-x-auto">
                                             <table className="w-full">
                                                  <thead>
                                                       <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Division Name
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Percentage From
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Percentage Upto
                                                                 </span>
                                                            </td>
                                                            <td className="py-5 px-6 xl:px-0 text-right">
                                                                 <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                                      Action
                                                                 </span>
                                                            </td>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {loading ? (
                                                            <tr>
                                                                 <td colSpan={4} className="py-10 text-center text-bgray-600 dark:text-bgray-400">Loading...</td>
                                                            </tr>
                                                       ) : divisions.length === 0 ? (
                                                            <tr>
                                                                 <td colSpan={4} className="py-10 text-center text-bgray-600 dark:text-bgray-400">No records found.</td>
                                                            </tr>
                                                       ) : divisions.map((division, index) => (
                                                            <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                                           {division.divisionName}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                           {division.percentFrom}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-4 px-6 xl:px-0">
                                                                      <p className="text-sm font-medium text-bgray-900 dark:text-bgray-50">
                                                                           {division.percentUpto}
                                                                      </p>
                                                                 </td>
                                                                 <td className="py-4 px-6 xl:px-0 text-right">
                                                                      <div className="flex items-center justify-end space-x-3">
                                                                           <button
                                                                                type="button"
                                                                                onClick={() => handleEdit(division)}
                                                                                className="text-bgray-500 hover:text-success-300 transition-colors"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                                                                                     <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                     <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                           </button>
                                                                           <button
                                                                                type="button"
                                                                                onClick={() => handleDelete(division._id)}
                                                                                className="text-bgray-500 hover:text-red-500 transition-colors"
                                                                           >
                                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                                                                                     <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                                                                                </svg>
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