import React from 'react';

export default function Loading() {
  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-8 animate-in fade-in duration-500">
      {/* Premium Gradient Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10" />
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-pulse" />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-xl font-black text-[#0f172a] dark:text-white tracking-widest uppercase">
          Loading<span className="animate-pulse text-emerald-500">...</span>
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] animate-pulse">
          Synchronizing School Data
        </p>
      </div>

      {/* Modern Skeleton Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-30">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-[32px] bg-gradient-to-br from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/10 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse" />
              <div className="w-16 h-6 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="w-2/3 h-4 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
              <div className="w-full h-8 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
