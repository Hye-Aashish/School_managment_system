"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/constants/student-constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faPhone, faEnvelope, faMapMarkerAlt, faCalendarAlt, faVenusMars, faTint, faBriefcase, faHistory } from "@fortawesome/free-solid-svg-icons";

export default function StudentProfile({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/students/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setStudent(data);
                } else {
                    setError("Student not found");
                }
            } catch (err) {
                setError("An error occurred while fetching student data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-bgray-100 dark:bg-darkblack-500">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-success-300"></div>
            </div>
        );
    }

    if (error || !student) {
        return (
            <div className="flex h-screen flex-col items-center justify-center p-4 bg-bgray-100 dark:bg-darkblack-500">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error || "Student not found"}</h2>
                <button onClick={() => router.back()} className="px-6 py-2 bg-success-300 text-white rounded-lg hover:bg-success-400 transition-colors">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-bgray-100 dark:bg-darkblack-500 min-h-screen">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-bgray-600 dark:text-bgray-50 hover:text-success-300 transition-colors bg-white dark:bg-darkblack-600 px-4 py-2 rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back to List</span>
                </button>
                <div className="flex gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${student.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {student.status || 'Active'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Basic Info Card */}
                <div className="xl:col-span-1">
                    <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-xl overflow-hidden p-8 flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full bg-success-300 flex items-center justify-center text-white text-4xl font-bold mb-6 overflow-hidden border-4 border-white dark:border-darkblack-400 shadow-md">
                            {student.photo ? (
                                <img src={student.photo} alt={student.fname} className="w-full h-full object-cover" />
                            ) : (
                                <span>{student.fname[0]}{student.lname ? student.lname[0] : ''}</span>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-bgray-900 dark:text-white mb-2">{student.fname} {student.lname}</h2>
                        <p className="text-bgray-500 mb-4">Class {student.class} ({student.section})</p>
                        
                        <div className="w-full border-t border-bgray-200 dark:border-darkblack-400 my-6"></div>
                        
                        <div className="w-full space-y-4 text-left">
                            <div className="flex items-center gap-4 text-bgray-600 dark:text-bgray-200">
                                <div className="w-8 h-8 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center text-bgray-500">
                                    <FontAwesomeIcon icon={faBriefcase} />
                                </div>
                                <div>
                                    <p className="text-xs text-bgray-400 uppercase font-bold tracking-wider">Admission No</p>
                                    <p className="font-medium">{student.admission_no}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-bgray-600 dark:text-bgray-200">
                                <div className="w-8 h-8 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center text-bgray-500">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <div>
                                    <p className="text-xs text-bgray-400 uppercase font-bold tracking-wider">Mobile</p>
                                    <p className="font-medium">{student.mobile || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-bgray-600 dark:text-bgray-200">
                                <div className="w-8 h-8 rounded-lg bg-bgray-100 dark:bg-darkblack-500 flex items-center justify-center text-bgray-500">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-bgray-400 uppercase font-bold tracking-wider">Email</p>
                                    <p className="font-medium truncate">{student.email || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info Sections */}
                <div className="xl:col-span-2 space-y-8">
                    {/* View Source Debug (Hidden) */}
                    {/* <pre className="hidden">{JSON.stringify(student, null, 2)}</pre> */}

                    {/* Personal Details */}
                    <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Date of Birth</p>
                                <p className="font-medium text-bgray-900 dark:text-white flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-bgray-300" />
                                    {student.dob || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Gender</p>
                                <p className="font-medium text-bgray-900 dark:text-white flex items-center gap-2">
                                    <FontAwesomeIcon icon={faVenusMars} className="text-bgray-300" />
                                    {student.gender || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Religion</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.religion || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Category</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.category || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Blood Group</p>
                                <p className="font-medium text-bgray-900 dark:text-white flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTint} className="text-red-400 text-sm" />
                                    {student.blood_group || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Caste</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.caste || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-xl p-8">
                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">Academic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Roll Number</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.roll_no || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Admission Date</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.admission_date || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Student House</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.student_house || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">As On Date</p>
                                <p className="font-medium text-bgray-900 dark:text-white">{student.as_on_date || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Parent/Guardian Details */}
                    <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-xl p-8">
                        <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">Parent / Guardian Information</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-success-300 border-b border-success-100 pb-2">Father Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Name</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.father_name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Phone</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.father_phone || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Email</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.father_email || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Occupation</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.father_occupation || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-success-300 border-b border-success-100 pb-2">Mother Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Name</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.mother_name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Phone</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.mother_phone || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Email</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.mother_email || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Occupation</p>
                                        <p className="font-medium text-bgray-900 dark:text-white">{student.mother_occupation || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-xl p-8">
                            <h3 className="text-xl font-bold text-bgray-900 dark:text-white mb-6">Medical & Physical</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Height</p>
                                    <p className="font-medium text-bgray-900 dark:text-white">{student.height || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Weight</p>
                                    <p className="font-medium text-bgray-900 dark:text-white">{student.weight || "N/A"}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-bgray-400 font-bold uppercase tracking-wider mb-1">Medical History</p>
                                    <p className="font-medium text-bgray-900 dark:text-white flex gap-2">
                                        <FontAwesomeIcon icon={faHistory} className="text-bgray-300" />
                                        {student.medical_history || "No records"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

