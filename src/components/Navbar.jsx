import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMetadata } from '../context/MetadataContext';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { storeDetail } = useMetadata();
  const phone = storeDetail?.phoneStore?.replace(/\D/g, '') || '6285821233817';
  const waHref = `https://wa.me/${phone}`;

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="container-page flex items-center justify-between py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          {storeDetail?.urlLogoStore ? (
            <img
              src={storeDetail.urlLogoStore}
              alt={storeDetail.nameStore || 'Logo'}
              className="h-9 w-9 rounded-xl object-cover shadow-sm"
            />
          ) : (
            <div className="h-9 w-9 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-sm">
              <span className="text-sm font-semibold tracking-tight">VG</span>
            </div>
          )}
          <div className="min-w-0 max-w-[60vw] break-words sm:max-w-none">
            <p className="text-sm font-semibold tracking-tight sm:text-base">{storeDetail?.nameStore ?? 'VIGRE GIFT'}</p>
            <p className="text-[11px] text-neutral-500 sm:text-xs">{storeDetail?.titleStore ?? 'Hampers yang bikin bahagia'}</p>
          </div>
        </Link>

        <button
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <i className="fa-solid fa-bars text-xs" />
          <span>Menu</span>
        </button>

        <div className="hidden items-center gap-6 text-sm text-neutral-700 md:flex lg:gap-8 xl:gap-10">
          <a href="#hero" className="hover:text-primary-600">Home</a>
          <a href="#catalog" className="hover:text-primary-600">Katalog</a>
          <a href="#testimonials" className="hover:text-primary-600">Testimoni</a>
          <a href="#contact" className="hover:text-primary-600">Kontak</a>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
          >
            <i className="fa-brands fa-whatsapp text-sm" />
            <span>Konsultasi Hampers</span>
          </a>
        </div>
      </nav>

      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="container-page flex max-h-[70vh] flex-col gap-2 overflow-y-auto py-3 text-sm text-neutral-700">
            <a href="#hero" onClick={() => setOpen(false)} className="py-1">Home</a>
            <a href="#catalog" onClick={() => setOpen(false)} className="py-1">Katalog</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="py-1">Testimoni</a>
            <a href="#contact" onClick={() => setOpen(false)} className="py-1">Kontak</a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>Konsultasi Hampers</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

