import React, { useState } from 'react';

export function SidebarFilter({
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  sizeFilter,
  setSizeFilter,
  uniqueCategories,
  uniqueTypes,
  uniqueSizes
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (currentValue, nextValue, setter) => {
    if (currentValue === nextValue) {
      setter('');
    } else {
      setter(nextValue);
    }
  };

  const content = (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Filter Hampers
        </p>
        <button
          type="button"
          onClick={() => {
            setCategoryFilter('');
            setTypeFilter('');
            setSizeFilter('');
          }}
          className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2 py-1 text-[11px] font-medium text-neutral-500 hover:bg-neutral-50"
        >
          <i className="fa-solid fa-rotate-left text-[10px]" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-4 text-xs text-neutral-700">
        {/* Kategori */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Kategori
          </p>
          <div className="space-y-1">
            {uniqueCategories?.length ? (
              uniqueCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-50"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                    checked={categoryFilter === cat}
                    onChange={() => {
                      handleSelect(categoryFilter, cat, setCategoryFilter)
                    }}
                  />
                  <span className="text-xs text-neutral-700 break-words">{cat}</span>
                </label>
              ))
            ) : (
              <p className="text-[11px] text-neutral-400">Belum ada kategori.</p>
            )}
          </div>
        </div>

        {/* Jenis */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Warna
          </p>
          <div className="space-y-1">
            {uniqueTypes?.length ? (
              uniqueTypes.map((t) => (
                <label
                  key={t}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-50"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                    checked={typeFilter === t}
                    onChange={() => {
                      handleSelect(typeFilter, t, setTypeFilter)
                    }}
                  />
                  <span className="text-xs text-neutral-700 break-words capitalize">{t}</span>
                </label>
              ))
            ) : (
              <p className="text-[11px] text-neutral-400">Belum ada jenis hampers.</p>
            )}
          </div>
        </div>

        {/* Ukuran */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Ukuran
          </p>
          <div className="space-y-1">
            {uniqueSizes?.length ? (
              uniqueSizes.map((s) => (
                <label
                  key={s}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-50"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                    checked={sizeFilter === s}
                    onChange={() => {
                      handleSelect(sizeFilter, s, setSizeFilter)
                    }}
                  />
                  <span className="text-xs text-neutral-700 break-words capitalize">{s}</span>
                </label>
              ))
            ) : (
              <p className="text-[11px] text-neutral-400">Belum ada ukuran.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ===== MOBILE DROPDOWN ===== */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm hover:border-primary-300 hover:text-primary-700"
        >
          <i className="fa-solid fa-sliders text-xs" />
          {/* <span>Filter</span> */}
          <i
            className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''
              }`}
          />
        </button>


        {/* Dropdown Content */}
        <div
          className={`absolute top-full right-0 z-20 mt-2 max-w-[90vw] min-w-max overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg transition-all duration-300 ${
            // className={`absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg transition-all duration-300 ${
            mobileOpen
              ? 'max-h-[600px] opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
            }`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
          >
            ✕
          </button>
          {content}
        </div>
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="sticky top-20 hidden h-fit min-w-[220px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:block lg:min-w-[240px] xl:min-w-[260px]">
        {content}
      </aside>
    </>
  );
}
