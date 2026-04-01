import React from 'react';

export const ShimmerCard = () => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-sm animate-pulse border border-slate-100 dark:border-slate-800">
      <div className="h-44 w-full rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
      <div className="px-2 pb-2">
        <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800 mt-2"></div>
        <div className="h-4 w-1/2 rounded-md bg-slate-200 dark:bg-slate-800 mt-3"></div>
      </div>
    </div>
  );
};

export const ShimmerCategory = () => {
  return (
    <div className="flex overflow-x-auto gap-6 pb-10 mb-10 border-b border-gray-200 dark:border-slate-800">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="min-w-[124px] h-32 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
      ))}
    </div>
  );
};
