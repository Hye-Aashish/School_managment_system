"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ReportPageProps {
    title: string;
    description?: string;
    apiUrl: string;
    columns: { key: string; label: string }[];
    /** Optional: transform each row from API data */
    transformRow?: (row: any, index: number) => Record<string, any>;
}

export default function ReportPage({ title, description, apiUrl, columns, transformRow }: ReportPageProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(apiUrl);
            if (res.ok) {
                const json = await res.json();
                const rows = Array.isArray(json) ? json : json.data ?? [];
                setData(transformRow ? rows.map((r: any, i: number) => transformRow(r, i)) : rows);
            }
        } catch (e) {
            console.error("Failed to fetch:", e);
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (data.length === 0) return;
        const header = columns.map((c) => c.label).join(",");
        const rows = filteredData.map((row) =>
            columns.map((c) => JSON.stringify(row[c.key] ?? "")).join(",")
        );
        const csv = [header, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title.replace(/\s+/g, "_")}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredData = data.filter((row) =>
        columns.some((col) =>
            String(row[col.key] ?? "").toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <>
            <div className="2xl:flex 2xl:space-x-[48px]">
                <section className="2xl:flex-1 2xl:mb-0 mb-6">
                    {/* Breadcrumb */}
                    <div className="mb-4">
                        <Link href="/admin/onlinecourse/OnlineCourseReport" className="text-sm text-success-300 hover:underline">
                            ← Back to Reports
                        </Link>
                    </div>

                    {/* Header Card */}
                    <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-bgray-900 dark:text-white">{title}</h2>
                            {description && <p className="text-sm text-bgray-500 dark:text-bgray-50 mt-1">{description}</p>}
                        </div>
                        <button
                            onClick={downloadCSV}
                            disabled={filteredData.length === 0}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-success-300 hover:bg-success-400 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="7 10 12 15 17 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="12" y1="15" x2="12" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Download CSV
                        </button>
                    </div>

                    {/* Table Card */}
                    <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                        {/* Search */}
                        <div className="flex-1 border border-transparent focus-within:border-success-300 h-12 bg-bgray-200 dark:bg-darkblack-500 rounded-lg px-4 mb-5 flex items-center gap-3 max-w-sm">
                            <svg className="stroke-bgray-900 dark:stroke-white flex-shrink-0" width="18" height="18" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.80204" cy="10.6761" r="8.98856" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.0537 17.3945L19.5777 20.9094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-bgray-600 dark:text-white placeholder:text-bgray-500"
                            />
                        </div>

                        {/* Table */}
                        {loading ? (
                            <div className="text-center py-10 text-bgray-500">Loading...</div>
                        ) : filteredData.length === 0 ? (
                            <div className="text-center py-10 text-bgray-500">No data available.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                            <th className="py-4 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">#</th>
                                            {columns.map((col) => (
                                                <th key={col.key} className="py-4 px-4 text-left text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                                                    {col.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((row, i) => (
                                            <tr key={i} className="border-b border-bgray-200 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                                                <td className="py-4 px-4 text-sm text-bgray-600 dark:text-bgray-50">{i + 1}</td>
                                                {columns.map((col) => (
                                                    <td key={col.key} className="py-4 px-4 text-sm text-bgray-900 dark:text-white capitalize">
                                                        {String(row[col.key] ?? "-")}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Footer */}
                        {!loading && filteredData.length > 0 && (
                            <div className="mt-4 text-sm text-bgray-500">
                                Showing {filteredData.length} of {data.length} records
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
