import React from 'react';
import { useMetadata } from '../context/MetadataContext';

export function Footer() {
  const { storeDetail } = useMetadata();
  const phone = (storeDetail?.phoneStore ?? '6285821233817').replace(/\D/g, '');
  const waHref = `https://wa.me/${phone}`;
  const displayPhone = storeDetail?.phoneStore ?? '6285821233817';

  return (
    <footer className="mt-8 border-t border-neutral-200 bg-white">
      <div className="container-page flex flex-col gap-4 py-6 text-xs text-neutral-600 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">{storeDetail?.nameStore ?? 'VIGRE GIFT'}</p>
          <p className="mt-1 max-w-xs text-xs text-neutral-600">
            Hampers dan parcel yang dirancang untuk membuat bahagia, dengan tampilan modern dan
            rasa yang hangat.
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Offline store
          </p>
          <p>Samarinda, Kalimantan Timur</p>
          <p className="text-[11px] text-neutral-500">
            JL. KS Tubun Dalam, No. 25, Dadimulya, Samainda Ulu
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Hubungi kami
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-neutral-700 hover:text-primary-600"
          >
            <i className="fa-brands fa-whatsapp text-sm" />
            <span>{displayPhone}</span>
          </a>
          <div className="flex items-center gap-3 text-xs text-neutral-600">
            <a
              href="https://www.instagram.com/vigre.galeri?igsh=aGg2eHdnaXNmeHFj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 hover:border-primary-400 hover:text-primary-600"
            >
              <i className="fa-brands fa-instagram text-sm" />
            </a>
            <a
              href="https://www.instagram.com/vigre.galeri?igsh=aGg2eHdnaXNmeHFj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 hover:border-primary-400 hover:text-primary-600"
            >
              <i className="fa-brands fa-tiktok text-sm" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-3 text-center text-[11px] text-neutral-400">
        © {new Date().getFullYear()} VIGRE GIFT. All rights reserved.
      </div>
    </footer>
  );
}

