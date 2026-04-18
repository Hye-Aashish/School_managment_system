'use client';
import React from 'react';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`skeleton ${className}`} />
);

export const StatCardSkeleton = () => (
  <div className="card-modern p-6 space-y-4">
    <div className="flex justify-between">
      <Skeleton className="w-14 h-14 rounded-2xl" />
      <Skeleton className="w-12 h-6 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-20 h-3" />
      <Skeleton className="w-32 h-8" />
      <Skeleton className="w-24 h-3" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-4 w-full">
    <div className="flex gap-4 mb-6">
      <Skeleton className="h-10 w-1/4 rounded-xl" />
      <Skeleton className="h-10 w-1/4 rounded-xl" />
    </div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex items-center justify-between p-4 border border-card-border rounded-2xl gap-4">
        <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-1/3 h-4" />
          <Skeleton className="w-1/4 h-3" />
        </div>
        <Skeleton className="w-20 h-4 shrink-0" />
        <Skeleton className="w-24 h-8 rounded-xl shrink-0" />
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="card-modern p-10 h-[400px] flex flex-col gap-6">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-48 h-3" />
      </div>
      <Skeleton className="w-40 h-10 rounded-2xl" />
    </div>
    <div className="flex-1 flex items-end gap-4 pb-4">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${Math.random() * 60 + 20}%` }} />
      ))}
    </div>
  </div>
);
