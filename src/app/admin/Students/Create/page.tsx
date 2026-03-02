"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import AccordionItem from "../../components/AccordionItem";
interface FieldProps {
     label: string;
     name: string;
     type?: string;
}

interface SelectFieldProps {
     label: string;
     name: string;
}
export default function CreateStudent() {
     const [openIndex, setOpenIndex] = useState(null);

     const toggleAccordion = (index: any) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     return (
          <>
               <div className="2xl:flex 2xl:space-x-[48px]">
                    <section className="2xl:flex-1 2xl:mb-0 mb-6">
                         <div className="w-full py-[20px] px-[24px] rounded-lg bg-white dark:bg-darkblack-600">
                              <div className="flex flex-col space-y-5">
                                   <form action="">
                                        <div className="flex flex-col space-y-5">
                                             <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                                                  Student Admission
                                             </h3>
                                             <div className="grid grid-cols-1 gap-6">
                                                  <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">

                                                       {/* Admission No */}
                                                       <Field label="Admission No *" name="admission_no" type="text" />

                                                       {/* Roll Number */}
                                                       <Field label="Roll Number" name="roll_no" />

                                                       {/* Class */}
                                                       <SelectField label="Class *" name="class" />

                                                       {/* Section */}
                                                       <SelectField label="Section *" name="section" />

                                                       {/* First Name */}
                                                       <Field label="First Name *" name="fname" />

                                                       {/* Last Name */}
                                                       <Field label="Last Name" name="lname" />

                                                       {/* Gender */}
                                                       <SelectField label="Gender *" name="gender" />

                                                       {/* Date of Birth */}
                                                       <Field label="Date of Birth *" name="dob" type="date" />


                                                  </div>

                                                  <div className="grid 2xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
                                                       <div className="grid 2xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
                                                            {/* Category */}
                                                            <SelectField label="Category" name="category" />

                                                            {/* Religion */}
                                                            <Field label="Religion" name="religion" />

                                                            {/* Caste */}
                                                            <Field label="Caste" name="caste" />
                                                       </div>
                                                       <div className="grid 2xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
                                                            {/* Mobile Number */}
                                                            <Field label="Mobile Number" name="mobile" />

                                                            {/* Email */}
                                                            <Field label="Email" name="email" />
                                                       </div>
                                                  </div>
                                                  <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">

                                                       {/* Student Photo */}
                                                       <Field label="Student Photo" name="email" type="file" />

                                                       {/* Blood Group */}
                                                       <SelectField label="Blood Group" name="blood_group" />

                                                       {/* Student House */}
                                                       <SelectField label="Student House" name="student_house" />

                                                       {/* Admission Date */}
                                                       <Field label="Admission Date" name="admission_date" type="date" />

                                                       {/* Height */}
                                                       <Field label="Height" name="height" />

                                                       {/* Weight */}
                                                       <Field label="Weight" name="weight" />

                                                       {/* As on Date */}
                                                       <Field label="As on Date" name="as_on_date" type="date" />

                                                       {/* As on Date */}
                                                       <Field label="Medical History" name="as_on_date" type="text" />
                                                  </div>

                                                  {/* Add Sibling Row */}
                                                  <div className="flex items-center justify-between mt-4">
                                                       <button
                                                            type="button"
                                                            className="text-[#0FA4E1] font-medium flex items-center space-x-1"
                                                       >
                                                            + Add Sibling
                                                       </button>

                                                       <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                                                            Sibling: Srimanth V
                                                       </span>
                                                  </div>
                                             </div>
                                             <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                                                  Transport Details
                                             </h3>
                                             <div className="grid grid-cols-1 gap-6">
                                                  <div className="grid 2xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
                                                       <SelectField label="Route List *" name="section" />
                                                       <SelectField label="Pickup Point *" name="section" />
                                                       <SelectField label="Fees Month" name="section" />
                                                  </div>
                                             </div>
                                             <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                                                  Hostel Details
                                             </h3>
                                             <div className="grid grid-cols-1 gap-6">
                                                  <div className="grid 2xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
                                                       <SelectField label="Hostel" name="section" />
                                                       <SelectField label="Room No." name="section" />
                                                  </div>
                                             </div>
                                             <div className="border-b border-bgray-200  pb-5 flex items-center flex-wrap justify-between">
                                                  <h3 className="text-2xl font-bold text-bgray-900 dark:text-white dark:border-darkblack-400">
                                                       Fees Details
                                                  </h3>
                                                  <h3 className="text-2xl font-bold text-bgray-900 dark:text-white dark:border-darkblack-400">
                                                       0.00
                                                  </h3>
                                             </div>
                                             <div className="mt-0! pt-0! border border-gray-200 p-2 pb-0! overflow-hidden">
                                                  <div className="space-y-4">
                                                       <AccordionItem
                                                            title="Class 1 General"
                                                            amount="4,93,500.00"
                                                            isOpen={openIndex === 0}
                                                            onToggle={() => toggleAccordion(0)}
                                                       >
                                                            <table className="w-full">
                                                                 <thead>
                                                                      <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                           <th className="py-5 px-6 bg-gray-100 w-[165px]">
                                                                                <div className="w-full flex space-x-2.5 items-center">
                                                                                     <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                                     >Fees Type</span
                                                                                     >
                                                                                </div>
                                                                           </th><th className="py-5 px-6 bg-gray-100  w-[165px]">
                                                                                <div className="w-full flex space-x-2.5 items-center justify-center">
                                                                                     <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                                     >Due Date</span
                                                                                     >
                                                                                </div>
                                                                           </th><th className="py-5 px-6 bg-gray-100  w-[165px] text-end">
                                                                                <div className="w-full flex space-x-2.5 items-center justify-end">
                                                                                     <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                                     >Amount (₹)</span
                                                                                     >
                                                                                </div>
                                                                           </th>
                                                                      </tr>
                                                                 </thead>
                                                                 <tbody>
                                                                      <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                           <td className="py-5 px-6">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                                     Admission Fees (admission-fees)
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-5 px-6 text-center">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                                     <FontAwesomeIcon icon={faCalendar}
                                                                                          className="text-success-300 text-xl" />
                                                                                     04/10/2025
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-5 px-6 text-end">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                                     1,75,000.00
                                                                                </p>
                                                                           </td>
                                                                      </tr>
                                                                 </tbody>
                                                            </table>
                                                       </AccordionItem>
                                                  </div>
                                             </div>
                                             <div className="border-b border-bgray-200  pb-5 flex items-center flex-wrap justify-between">
                                                  <h3 className="text-2xl font-bold text-bgray-900 dark:text-white dark:border-darkblack-400">
                                                       Fees Discount Details
                                                  </h3>
                                             </div>
                                             <div className="mt-0! pt-0! border border-gray-200 p-2 pb-0! overflow-hidden">
                                                  <div className="space-y-4">
                                                       <AccordionItem
                                                            title="Sibling Discount - sibling-disc"
                                                            amount=""
                                                            isOpen={openIndex === 0}
                                                            onToggle={() => toggleAccordion(0)}
                                                       >
                                                            <table className="w-full">
                                                                 <thead>
                                                                      <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                           <th className="py-5 px-6 bg-gray-100 w-[165px]">
                                                                                <div className="w-full flex space-x-2.5 items-center">
                                                                                     <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                                     >Fees Type</span
                                                                                     >
                                                                                </div>
                                                                           </th><th className="py-5 px-6 bg-gray-100  w-[165px]">
                                                                                <div className="w-full flex space-x-2.5 items-center justify-center">
                                                                                     <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                                     >Due Date</span
                                                                                     >
                                                                                </div>
                                                                           </th><th className="py-5 px-6 bg-gray-100  w-[165px] text-end">
                                                                                <div className="w-full flex space-x-2.5 items-center justify-end">
                                                                                     <span className="text-base font-medium text-bgray-600 dark:text-bgray-50"
                                                                                     >Amount (₹)</span
                                                                                     >
                                                                                </div>
                                                                           </th>
                                                                      </tr>
                                                                 </thead>
                                                                 <tbody>
                                                                      <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                                           <td className="py-5 px-6">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                                     Admission Fees (admission-fees)
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-5 px-6 text-center">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                                     <FontAwesomeIcon icon={faCalendar}
                                                                                          className="text-success-300 text-xl" />
                                                                                     04/10/2025
                                                                                </p>
                                                                           </td>
                                                                           <td className="py-5 px-6 text-end">
                                                                                <p className="font-medium text-base text-bgray-900 dark:text-bgray-50">
                                                                                     1,75,000.00
                                                                                </p>
                                                                           </td>
                                                                      </tr>
                                                                 </tbody>
                                                            </table>
                                                       </AccordionItem>
                                                  </div>
                                             </div>
                                             <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                                                  Parent Guardian Detail
                                             </h3>
                                             <div className="grid grid-cols-1 gap-6">
                                                  <div className="grid 2xl:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-6">
                                                       <Field label="Father Name" name="admission_no" type="text" />
                                                       <Field label="Father Phone" name="admission_no" type="text" />
                                                       <Field label="Father Email" name="admission_no" type="text" />
                                                       <Field label="Father Occupation" name="admission_no" type="text" />
                                                       <Field label="Mother Name" name="admission_no" type="text" />
                                                       <Field label="Mother Phone" name="admission_no" type="text" />
                                                       <Field label="Mother Email" name="admission_no" type="text" />
                                                       <Field label="Mother Occupation" name="admission_no" type="text" />
                                                  </div>
                                                  <div className="grid 2xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
                                                       <Field label="Father Photo (100px X 100px)" name="admission_no" type="file" />
                                                       <Field label="Mother Photo (100px X 100px)" name="admission_no" type="file" />
                                                       <Textare label="Guardian Address" name="Guardian_Address" />
                                                  </div>
                                             </div>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     );
}
/* Reusable Input Field */
function Field({ label, name, type }: FieldProps) {
     return (
          <div className="flex flex-col gap-2">
               <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">
                    {label}
               </label>
               <input
                    type={type}
                    className="bg-bgray-500 border border-success-300 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14  focus:border focus:border-success-300 focus:ring-0"
                    name={name}
               />
          </div>
     );
}
/* Reusable Input Field */
function Textare({ label, name }: FieldProps) {
     return (
          <div className="flex flex-col gap-2">
               <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">
                    {label}
               </label>
               <textarea
                    className="bg-bgray-500 border border-success-300 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg focus:border focus:border-success-300 focus:ring-0" rows={1}
                    name={name}
               />
          </div>
     );
}

/* Reusable Select Field */
function SelectField({ label, name }: SelectFieldProps) {
     return (
          <div className="flex flex-col gap-2">
               <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">
                    {label}
               </label>
               <select
                    name={name}
                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14  border border-success-300 focus:border focus:border-success-300 focus:ring-0"
               >
                    <option>Select</option>
               </select>
          </div>
     );
}