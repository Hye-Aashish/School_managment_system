"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBook, faSearch, faFilter, faPlus, faEllipsisV, 
  faCalendarAlt, faFileAlt, faUserGraduate 
} from "@fortawesome/free-solid-svg-icons";

export default function HomeworkList() {
    const [homeworks, setHomeworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/homework");
            const result = await res.json();
            if (result.success) setHomeworks(result.data || []);
        } catch (error) {
            console.error("Failed to fetch homeworks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredHomework = homeworks.filter(hw => 
        hw.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hw.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-bgray-900 dark:text-white tracking-tighter italic">Homework</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">List of assignments</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                    <FontAwesomeIcon icon={faPlus} />
                    Add Homework
                </button>
            </div>

            {/* Filter & Search */}
            <div className="card-modern p-6 bg-white dark:bg-darkblack-600 border-none flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by subject or class..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-darkblack-500 border border-gray-100 dark:border-white/5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-gray-50 dark:bg-darkblack-500 border border-gray-100 dark:border-white/5 text-xs font-black uppercase tracking-widest flex items-center gap-3 justify-center">
                        <FontAwesomeIcon icon={faFilter} className="text-primary" />
                        Filters
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="card-modern overflow-hidden bg-white dark:bg-darkblack-600 border-none shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-white/5">
                                <th className="py-8 px-8">Assignment</th>
                                <th className="py-8 px-6">Class</th>
                                <th className="py-8 px-6">Due Date</th>
                                <th className="py-8 px-6">Created On</th>
                                <th className="py-8 px-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm italic">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                                        Loading homework...
                                    </td>
                                </tr>
                            ) : filteredHomework.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400 font-bold italic">
                                        No homework found.
                                    </td>
                                </tr>
                            ) : filteredHomework.map((hw, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0 font-medium">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-lg shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                                                <FontAwesomeIcon icon={faBook} />
                                            </div>
                                            <div>
                                                <p className="font-black text-bgray-900 dark:text-white leading-none mb-1 text-base">{hw.subject}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Topic: {hw.description.slice(0, 30)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-sm shadow-blue-500/5">
                                            <FontAwesomeIcon icon={faUserGraduate} className="text-[10px]" />
                                            Grade {hw.class} ({hw.section})
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-rose-500 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                                {hw.submissionDate}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1 italic">Due Date</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 font-bold text-bgray-600 dark:text-gray-400 italic">
                                        {hw.homeworkDate}
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <button className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-primary hover:text-black transition-all shadow-sm">
                                            <FontAwesomeIcon icon={faFileAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
