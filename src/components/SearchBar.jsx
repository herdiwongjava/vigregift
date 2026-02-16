import React from 'react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
        <i className="fa-solid fa-magnifying-glass text-xs" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari hampers berdasarkan nama atau kategori..."
        className="w-full rounded-full border border-neutral-200 bg-white px-9 py-2 text-xs text-neutral-800 shadow-sm placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
    </div>
  );
}

