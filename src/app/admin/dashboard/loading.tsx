'use client';
import React from "react";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-white/5 rounded-2xl relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
  </div>
);

export default function Loading() {
  return (
    <div className="space-y-10 pb-20 max-w-[1600px] mx-auto p-4 md:p-8">
      
      {/* Hero Section Skeleton */}
      <div className="h-64 md:h-80 w-full bg-gray-100 dark:bg-[#0f172a] rounded-[40px] p-10 flex flex-col justify-center gap-6 animate-pulse relative overflow-hidden border border-gray-200 dark:border-white/5">
          <SkeletonBox className="h-8 w-64 md:w-96" />
          <SkeletonBox className="h-12 w-full md:w-2/3" />
          <SkeletonBox className="h-6 w-1/2" />
          <div className="flex gap-4 mt-4">
              <SkeletonBox className="h-12 w-40" />
              <SkeletonBox className="h-12 w-40" />
          </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-white dark:bg-darkblack-600 rounded-[32px] p-6 border border-gray-100 dark:border-white/5 space-y-4">
                  <div className="flex justify-between items-start">
                    <SkeletonBox className="h-14 w-14 rounded-2xl" />
                    <SkeletonBox className="h-6 w-16 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBox className="h-3 w-24" />
                    <SkeletonBox className="h-10 w-32" />
                    <SkeletonBox className="h-3 w-full opacity-50" />
                  </div>
              </div>
          ))}
      </div>

      {/* Main Content Layout Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* Left Column: Chart and Table */}
          <div className="xl:col-span-8 space-y-10">
              <div className="h-[500px] bg-white dark:bg-darkblack-600 rounded-[40px] p-8 border border-gray-100 dark:border-white/5">
                  <div className="flex justify-between mb-8">
                      <SkeletonBox className="h-8 w-64" />
                      <SkeletonBox className="h-10 w-48" />
                  </div>
                  <SkeletonBox className="h-[350px] w-full rounded-3xl" />
              </div>

              <div className="bg-white dark:bg-darkblack-600 rounded-[40px] border border-gray-100 dark:border-white/5 overflow-hidden">
                  <div className="p-8 border-b border-gray-50 dark:border-white/5 flex justify-between items-center">
                    <SkeletonBox className="h-8 w-64" />
                    <div className="flex gap-4">
                        <SkeletonBox className="h-10 w-10 rounded-full" />
                        <SkeletonBox className="h-10 w-32" />
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex justify-between items-center pb-6 border-b border-gray-50 dark:border-white/5 last:border-0 last:pb-0">
                              <div className="flex items-center gap-4">
                                  <SkeletonBox className="h-12 w-12 rounded-2xl" />
                                  <div className="space-y-1">
                                      <SkeletonBox className="h-4 w-32" />
                                      <SkeletonBox className="h-3 w-24" />
                                  </div>
                              </div>
                              <SkeletonBox className="h-4 w-24" />
                              <SkeletonBox className="h-8 w-24 rounded-xl" />
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Demographics */}
          <div className="xl:col-span-4 space-y-10">
              <div className="bg-white dark:bg-darkblack-600 rounded-[40px] p-8 border border-gray-100 dark:border-white/5">
                <div className="text-center mb-8">
                    <SkeletonBox className="h-8 w-48 mx-auto mb-4" />
                    <SkeletonBox className="h-[240px] w-[240px] rounded-full mx-auto" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-50 dark:bg-white/5 rounded-3xl p-5 border border-gray-100 dark:border-white/5">
                            <SkeletonBox className="h-4 w-32 mb-4" />
                            <SkeletonBox className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </div>
              </div>

              <div className="h-64 bg-gray-50 dark:bg-[#0f172a] rounded-[40px] p-8 border border-gray-200 dark:border-white/5">
                 <SkeletonBox className="h-6 w-48 mb-6" />
                 <div className="space-y-4">
                     <SkeletonBox className="h-4 w-full" />
                     <SkeletonBox className="h-4 w-full" />
                     <SkeletonBox className="h-4 w-2/3" />
                 </div>
                 <SkeletonBox className="h-12 w-full mt-8" />
              </div>
          </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
