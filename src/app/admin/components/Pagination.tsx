"use client";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalEntries: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalEntries,
    limit,
    onPageChange,
    onLimitChange,
}: PaginationProps) {
    const startRange = (currentPage - 1) * limit + 1;
    const endRange = Math.min(currentPage * limit, totalEntries);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pageNumbers.push(i);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            pageNumbers.push("...");
        }
    }

    const uniquePageNumbers = Array.from(new Set(pageNumbers));

    return (
        <div className="pagination-content w-full mt-6">
            <div className="w-full flex lg:justify-between justify-center items-center flex-wrap gap-4">
                <div className="lg:flex hidden items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                            Show result:
                        </span>
                        <div className="relative group">
                            <select
                                value={limit}
                                onChange={(e) => onLimitChange(parseInt(e.target.value))}
                                className="appearance-none px-4 py-2 border rounded-lg border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm font-semibold text-bgray-900 dark:text-bgray-50 focus:outline-none focus:ring-2 focus:ring-success-300 cursor-pointer pr-10"
                            >
                                {[5, 10, 20, 50, 100].map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-bgray-500 group-hover:text-bgray-900 transition-colors">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <span className="text-sm text-bgray-600 dark:text-bgray-50 font-medium">
                        Showing {totalEntries > 0 ? startRange : 0} to {endRange} of {totalEntries} entries
                    </span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-1">
                        {uniquePageNumbers.map((page, idx) =>
                            page === "..." ? (
                                <span key={`dots-${idx}`} className="px-3 text-bgray-500 font-bold">...</span>
                            ) : (
                                <button
                                    key={`page-${page}`}
                                    type="button"
                                    onClick={() => onPageChange(page as number)}
                                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === page
                                            ? "bg-bgray-900 text-white shadow-md dark:bg-success-300"
                                            : "text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500 border border-transparent hover:border-bgray-300 dark:hover:border-darkblack-400"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}
                    </div>

                    <button
                        type="button"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-bgray-300 dark:border-darkblack-400 text-bgray-600 dark:text-bgray-50 hover:bg-bgray-100 dark:hover:bg-darkblack-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
