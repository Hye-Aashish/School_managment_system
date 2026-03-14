"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSearch, faTimes, faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import AccordionItem from "../../components/AccordionItem";
import {
     CLASSES,
     SECTIONS,
     GENDERS,
     CATEGORIES,
     BLOOD_GROUPS,
     STUDENT_HOUSES,
     RELIGIONS,
     Student
} from "@/constants/student-constants";

interface FieldProps {
     label: string;
     name: string;
     type?: string;
     value?: string;
     onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
     required?: boolean;
}

interface SelectFieldProps extends FieldProps {
     options: string[];
}

export default function CreateStudent() {
     const [openIndex, setOpenIndex] = useState<number | null>(null);
     const today = new Date().toLocaleDateString("en-CA");
     const [formData, setFormData] = useState<Partial<Student>>({
          class: "",
          section: "",
          gender: "",
          category: "",
          blood_group: "",
          student_house: "",
          religion: "",
          admission_date: today
     });
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
     const [dynamicHouses, setDynamicHouses] = useState<string[]>([]);
     const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

     const showNotification = (message: string, type: "success" | "error") => {
          setNotification({ message, type });
          setTimeout(() => setNotification(null), 3000);
     };

     // Sibling States
     const [siblingModalOpen, setSiblingModalOpen] = useState(false);
     const [siblingSearch, setSiblingSearch] = useState("");
     const [allStudents, setAllStudents] = useState<Student[]>([]);
     const [selectedSibling, setSelectedSibling] = useState<Student | null>(null);

     useEffect(() => {
          const fetchDropdownData = async () => {
               try {
                    const [catRes, houseRes, studentsRes] = await Promise.all([
                         fetch("/api/student-categories"),
                         fetch("/api/student-houses"),
                         fetch("/api/students")
                    ]);

                    if (catRes.ok) {
                         const cats = await catRes.json();
                         setDynamicCategories(cats.map((c: any) => c.category || c.name));
                    }
                    if (houseRes.ok) {
                         const houses = await houseRes.json();
                         setDynamicHouses(houses.map((h: any) => h.house_name || h.name));
                    }
                    if (studentsRes.ok) {
                         const result = await studentsRes.json();
                         setAllStudents(result.data || []);
                    }
               } catch (err) {
                    console.error("Error fetching dropdown data:", err);
               }
          };
          fetchDropdownData();
     }, []);

     const toggleAccordion = (index: number) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
     };

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setFormData(prev => ({ ...prev, photo: reader.result as string }));
               };
               reader.readAsDataURL(file);
          }
     };

     const handleSelectSibling = (sibling: Student) => {
          setSelectedSibling(sibling);
          setFormData(prev => ({
               ...prev,
               sibling_admission_no: sibling.admission_no,
               father_name: sibling.father_name || prev.father_name,
               father_phone: sibling.father_phone || prev.father_phone,
               father_email: sibling.father_email || prev.father_email,
               father_occupation: sibling.father_occupation || prev.father_occupation,
               mother_name: sibling.mother_name || prev.mother_name,
               mother_phone: sibling.mother_phone || prev.mother_phone,
               mother_email: sibling.mother_email || prev.mother_email,
               mother_occupation: sibling.mother_occupation || prev.mother_occupation,
          }));
          setSiblingModalOpen(false);
     };

     const handleRemoveSibling = () => {
          setSelectedSibling(null);
          setFormData(prev => ({
               ...prev,
               sibling_admission_no: undefined
          }));
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          const newStudent = {
               ...formData,
               admission_no: formData.admission_no || `ADM${Date.now()}`,
               fname: formData.fname || "Unknown",
               lname: formData.lname || "",
               status: formData.status || "Active"
          } as Student;

          setIsSubmitting(true);
          try {
               const res = await fetch("/api/students", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newStudent)
               });

               const json = await res.json();
               if (res.ok && json.success !== false) {
                    showNotification("Student Admitted Successfully!", "success");
                    setFormData({
                         class: "",
                         section: "",
                         gender: "",
                         category: "",
                         blood_group: "",
                         student_house: "",
                         religion: "",
                         admission_date: today
                    });
                    setSelectedSibling(null);
               } else {
                    showNotification(json.error || "Failed to admit student. Please try again.", "error");
               }
          } catch (err) {
               console.error("Error admitting student:", err);
               showNotification("An error occurred while admitting the student.", "error");
          } finally {
               setIsSubmitting(false);
          }
     };

     const filteredStudents = Array.isArray(allStudents) ? allStudents.filter(s =>
          s.fname.toLowerCase().includes(siblingSearch.toLowerCase()) ||
          s.lname.toLowerCase().includes(siblingSearch.toLowerCase()) ||
          s.admission_no.toLowerCase().includes(siblingSearch.toLowerCase())
     ) : [];

     return (
          <>
               {/* Notification Popup */}
               {notification && (
                    <div className={`fixed top-5 right-5 z-[300] transition-all transform animate-fade-in`}>
                         <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-2xl border ${
                              notification.type === "success" 
                                   ? "bg-success-50 border-success-300 text-success-500" 
                                   : "bg-red-50 border-red-300 text-red-500"
                         }`}>
                              {notification.type === "success" ? (
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                              ) : (
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                              )}
                              <span className="font-bold text-sm">{notification.message}</span>
                         </div>
                    </div>
               )}

               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col space-y-5">
                                             <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                                                  Student Admission
                                             </h3>
                                             <div className="grid grid-cols-1 gap-6">
                                                  <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
                                                       <Field label="Admission No *" name="admission_no" type="text" value={formData.admission_no} onChange={handleChange} required />
                                                       <Field label="Roll Number" name="roll_no" value={formData.roll_no} onChange={handleChange} />
                                                       <SelectField label="Class *" name="class" options={CLASSES} value={formData.class} onChange={handleChange} required />
                                                       <SelectField label="Section *" name="section" options={SECTIONS} value={formData.section} onChange={handleChange} required />
                                                       <Field label="First Name *" name="fname" value={formData.fname} onChange={handleChange} required />
                                                       <Field label="Last Name" name="lname" value={formData.lname} onChange={handleChange} />
                                                       <SelectField label="Gender *" name="gender" options={GENDERS} value={formData.gender} onChange={handleChange} required />
                                                       <Field label="Date of Birth *" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                                                  </div>

                                                  <div className="grid 2xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
                                                       <div className="grid 2xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
                                                            <SelectField label="Category" name="category" options={dynamicCategories.length > 0 ? dynamicCategories : CATEGORIES} value={formData.category} onChange={handleChange} />
                                                            <Field label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                                                            <Field label="Caste" name="caste" value={formData.caste} onChange={handleChange} />
                                                       </div>
                                                       <div className="grid 2xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
                                                            <Field label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
                                                            <Field label="Email" name="email" value={formData.email} onChange={handleChange} />
                                                       </div>
                                                  </div>
                                                  <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
                                                        <div className="flex flex-col gap-2">
                                                             <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Student Photo</label>
                                                             <div className="flex items-center gap-4">
                                                                  <div className="w-14 h-14 rounded-lg bg-bgray-50 dark:bg-darkblack-500 flex items-center justify-center text-bgray-400 overflow-hidden border border-success-300">
                                                                       {formData.photo ? (
                                                                            <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                                                                       ) : (
                                                                            <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                                                                       )}
                                                                  </div>
                                                                  <input 
                                                                       type="file" 
                                                                       accept="image/*"
                                                                       onChange={handleFileChange}
                                                                       className="flex-1 text-sm text-bgray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-success-50 file:text-success-700 hover:file:bg-success-100" 
                                                                  />
                                                             </div>
                                                        </div>
                                                       <SelectField label="Blood Group" name="blood_group" options={BLOOD_GROUPS} value={formData.blood_group} onChange={handleChange} />
                                                       <SelectField label="Student House" name="student_house" options={dynamicHouses.length > 0 ? dynamicHouses : STUDENT_HOUSES} value={formData.student_house} onChange={handleChange} />
                                                       <Field label="Admission Date" name="admission_date" type="date" value={formData.admission_date} onChange={handleChange} />
                                                       <Field label="Height" name="height" value={formData.height} onChange={handleChange} />
                                                       <Field label="Weight" name="weight" value={formData.weight} onChange={handleChange} />
                                                       <Field label="As on Date" name="as_on_date" type="date" value={formData.as_on_date} onChange={handleChange} />
                                                       <Field label="Medical History" name="medical_history" type="text" value={formData.medical_history} onChange={handleChange} />
                                                  </div>

                                                  <div className="flex items-center justify-between mt-4">
                                                       {!selectedSibling ? (
                                                            <button
                                                                 type="button"
                                                                 onClick={() => setSiblingModalOpen(true)}
                                                                 className="text-[#0FA4E1] font-medium flex items-center space-x-1 hover:text-[#0d8fc3] transition-colors"
                                                            >
                                                                 <span>+ Add Sibling</span>
                                                            </button>
                                                       ) : (
                                                            <div className="flex items-center gap-3">
                                                                 <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                                                                      Sibling: {selectedSibling.fname} {selectedSibling.lname}
                                                                      <button type="button" onClick={handleRemoveSibling} className="hover:text-red-200">&times;</button>
                                                                 </span>
                                                                 <span className="text-xs text-bgray-500 italic">(Parent details auto-filled)</span>
                                                            </div>
                                                       )}
                                                  </div>
                                             </div>

                                             <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                                                  Parent Guardian Detail
                                             </h3>
                                             <div className="grid grid-cols-1 gap-6 pb-10">
                                                  <div className="grid 2xl:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-6">
                                                       <Field label="Father Name" name="father_name" type="text" value={formData.father_name} onChange={handleChange} />
                                                       <Field label="Father Phone" name="father_phone" type="text" value={formData.father_phone} onChange={handleChange} />
                                                       <Field label="Father Email" name="father_email" type="text" value={formData.father_email} onChange={handleChange} />
                                                       <Field label="Father Occupation" name="father_occupation" type="text" value={formData.father_occupation} onChange={handleChange} />
                                                       <Field label="Mother Name" name="mother_name" type="text" value={formData.mother_name} onChange={handleChange} />
                                                       <Field label="Mother Phone" name="mother_phone" type="text" value={formData.mother_phone} onChange={handleChange} />
                                                       <Field label="Mother Email" name="mother_email" type="text" value={formData.mother_email} onChange={handleChange} />
                                                       <Field label="Mother Occupation" name="mother_occupation" type="text" value={formData.mother_occupation} onChange={handleChange} />
                                                  </div>
                                             </div>

                                             <div className="flex justify-end">
                                                  <button
                                                       type="submit"
                                                       disabled={isSubmitting}
                                                       className="bg-success-300 text-white px-10 py-4 rounded-lg font-bold hover:bg-success-400 transition-colors shadow-lg disabled:opacity-50"
                                                  >
                                                       {isSubmitting ? "Saving..." : "Save Student"}
                                                  </button>
                                             </div>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </section>
               </div>

               {/* Sibling Selection Modal */}
               {siblingModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                         <div className="bg-white dark:bg-darkblack-600 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                              <div className="p-6 border-b border-bgray-200 dark:border-darkblack-400 flex justify-between items-center">
                                   <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                             <FontAwesomeIcon icon={faUserPlus} />
                                        </div>
                                        <h3 className="text-xl font-bold dark:text-white">Select Sibling</h3>
                                   </div>
                                   <button onClick={() => setSiblingModalOpen(false)} className="text-bgray-400 hover:text-bgray-900 dark:hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={faTimes} size="lg" />
                                   </button>
                              </div>

                              <div className="p-6">
                                   <div className="relative mb-6">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-bgray-400">
                                             <FontAwesomeIcon icon={faSearch} />
                                        </div>
                                        <input
                                             type="text"
                                             placeholder="Search by name or admission no..."
                                             className="w-full pl-10 pr-4 py-3 bg-bgray-100 dark:bg-darkblack-500 border-none rounded-xl focus:ring-2 focus:ring-success-300 dark:text-white text-sm"
                                             value={siblingSearch}
                                             onChange={(e) => setSiblingSearch(e.target.value)}
                                        />
                                   </div>

                                   <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {filteredStudents.length > 0 ? (
                                             filteredStudents.map((s) => (
                                                  <div
                                                       key={s.admission_no}
                                                       onClick={() => handleSelectSibling(s)}
                                                       className="flex items-center justify-between p-4 rounded-xl border border-bgray-200 dark:border-darkblack-400 hover:border-success-300 dark:hover:border-success-300 hover:bg-bgray-50 dark:hover:bg-darkblack-500 cursor-pointer transition-all group"
                                                  >
                                                       <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-bgray-200 dark:bg-darkblack-400 flex items-center justify-center text-bgray-600 dark:text-bgray-200 font-bold uppercase overflow-hidden">
                                                                 {s.photo ? (
                                                                      <img src={s.photo} alt={s.fname} className="w-full h-full object-cover" />
                                                                 ) : (
                                                                      <span>{s.fname[0]}{s.lname ? s.lname[0] : ''}</span>
                                                                 )}
                                                            </div>
                                                            <div>
                                                                 <h4 className="font-bold dark:text-white group-hover:text-success-300 transition-colors">{s.fname} {s.lname}</h4>
                                                                 <p className="text-xs text-bgray-500">ID: {s.admission_no} | Class: {s.class} ({s.section})</p>
                                                            </div>
                                                       </div>
                                                       <button className="px-4 py-2 text-xs font-bold text-success-300 border border-success-300 rounded-lg group-hover:bg-success-300 group-hover:text-white transition-all">
                                                            Select
                                                       </button>
                                                  </div>
                                             ))
                                        ) : (
                                             <div className="text-center py-10">
                                                  <p className="text-bgray-500">No students found.</p>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}

function Field({ label, name, type = "text", value, onChange, required = false }: FieldProps) {
     return (
          <div className="flex flex-col gap-2">
               <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">
                    {label}
               </label>
               <input
                    type={type}
                    name={name}
                    {...(type !== "file" ? { value: value || "" } : {})}
                    onChange={onChange}
                    required={required}
                    className="bg-bgray-50 border border-success-300 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14  focus:border focus:border-success-300 focus:ring-0 transition-all"
               />
          </div>
     );
}

function SelectField({ label, name, options, value, onChange, required = false }: SelectFieldProps) {
     return (
          <div className="flex flex-col gap-2">
               <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">
                    {label}
               </label>
               <select
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    required={required}
                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border border-success-300 focus:border focus:border-success-300 focus:ring-0 transition-all"
               >
                    <option value="">Select</option>
                    {options.map((option, idx) => (
                         <option key={idx} value={option}>
                              {option}
                         </option>
                    ))}
               </select>
          </div>
     );
}