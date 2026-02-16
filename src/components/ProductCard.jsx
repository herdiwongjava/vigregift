import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

export function ProductCard({ product, waUrl, isFlashSaleCard }) {
  const {
    id,
    name,
    image,
    normalPrice,
    promoPrice,
    isPromo,
    category,
    size
  } = product;

  const detailLink = `/product/${id}`;
  const waMessage = encodeURIComponent(
    [
      'Halo VIGRE GIFT, saya tertarik dengan hampers berikut:',
      '',
      `Nama: ${name}`,
      isPromo && promoPrice
        ? `Harga: ${formatCurrency(promoPrice)} (promo dari ${formatCurrency(normalPrice)})`
        : `Harga: ${formatCurrency(normalPrice)}`,
      image ? `URL gambar: ${image}` : 'URL gambar: -',
      '',
      'Boleh dibantu info detail isi, ketersediaan stok, dan opsi kustomisasi?'
    ].join('\n')
  );

  const waLink = waUrl
    ? `${waUrl}${waUrl.includes('?') ? '&' : '?'}text=${waMessage}`
    : `https://wa.me/6285821233817?text=${waMessage}`;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={detailLink} className="relative block aspect-[9/16] overflow-hidden bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-300">
            <i className="fa-regular fa-image text-2xl" />
          </div>
        )}

        {(isPromo || isFlashSaleCard) && (
          <div className={`absolute left-3 top-3 rounded-full bg-primary-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm ${isFlashSaleCard ? 'animate-pulse ring-2 ring-primary-300 ring-offset-2' : ''}`}>
            {isFlashSaleCard ? 'Flash Sale' : 'Promo spesial'}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            {category && (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-[2px]">
                <i className="fa-regular fa-calendar text-[10px]" />
                <span>{category}</span>
              </span>
            )}
            {size && (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-[2px] capitalize">
                <i className="fa-regular fa-square text-[10px]" />
                <span>{size}</span>
              </span>
            )}
          </div>
          <Link
            to={detailLink}
            className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 hover:text-primary-600"
          >
            {name}
          </Link>
        </div>

        <div className="space-y-1">
          {isPromo && promoPrice ? (
            <>
              <p className="text-xs font-semibold text-primary-600">
                {formatCurrency(promoPrice)}
              </p>
              <p className="text-[11px] text-neutral-400">
                <span className="mr-1 line-through">{formatCurrency(normalPrice)}</span>
                <span>Hemat spesial untuk momen bahagia Anda</span>
              </p>
            </>
          ) : (
            <p className="text-xs font-semibold text-neutral-800">
              {formatCurrency(normalPrice)}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <Link
            to={detailLink}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-700 hover:text-primary-600"
          >
            <span>Detail hampers</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-primary-600"
          >
            <i className="fa-brands fa-whatsapp text-xs" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

