'use client';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRotateRight, faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#09090b] flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full animate-pulse" />
          <div className="relative w-32 h-32 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/20 transform rotate-12">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-5xl" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] dark:text-white tracking-tighter">
            System Interruption
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-md mx-auto">
            Our enterprise engine encountered an unexpected exception. We've logged the incident for our engineers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-4 bg-[#059669] text-black font-black rounded-2xl shadow-xl shadow-[#059669]/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon={faRotateRight} />
            Attempt Recovery
          </button>
          <Link
            href="/admin/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-black dark:text-white font-black rounded-2xl shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon={faHome} />
            Return to Dashboard
          </Link>
        </div>

        <div className="pt-10">
          <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Error Digest: {error.digest || 'Internal Critical Failure'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
