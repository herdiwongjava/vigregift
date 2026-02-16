import React from 'react';

export function ProductGridSkeleton({ items = 4 }) {
  const placeholders = Array.from({ length: items });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {placeholders.map((_, index) => (
        <div
          // index is safe here for static skeletons
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
        >
          <div className="relative block aspect-[4/3] overflow-hidden bg-neutral-100">
            <div className="h-full w-full animate-pulse bg-neutral-100" />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full bg-neutral-100" />
              <div className="h-3 w-40 rounded-full bg-neutral-100" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 rounded-full bg-neutral-100" />
              <div className="h-3 w-20 rounded-full bg-neutral-100" />
            </div>
            <div className="mt-auto flex items-center justify-between gap-2 pt-1">
              <div className="h-7 w-20 rounded-full bg-neutral-100" />
              <div className="h-7 w-24 rounded-full bg-neutral-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

