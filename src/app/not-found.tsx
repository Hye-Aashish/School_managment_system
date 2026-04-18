'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#09090b] flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-[#059669]/20 blur-[80px] rounded-full animate-pulse" />
          <h1 className="text-[180px] font-black text-[#059669]/10 dark:text-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 bg-white dark:bg-darkblack-600 rounded-[32px] shadow-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 transform -rotate-12">
               <FontAwesomeIcon icon={faMapMarkedAlt} className="text-[#059669] text-5xl" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-[#0f172a] dark:text-white tracking-tighter">
            Page Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-sm mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-4 bg-[#059669] text-black px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#059669]/30 hover:scale-105 transition-all active:scale-95"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
