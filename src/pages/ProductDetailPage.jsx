import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useMetadata } from '../context/MetadataContext';
import { formatCurrency } from '../utils/formatCurrency';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { storeDetail } = useMetadata();
  const phone = (storeDetail?.phoneStore ?? '6285821233817').replace(/\D/g, '');


  const { products, loading } = useProducts();

  const product = products.find((p) => p.id === id);
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };


  if (loading) {
    return (
      <main className="container-page py-6">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-primary-600"
        >
          <i className="fa-solid fa-arrow-left text-[10px]" />
          <span>Kembali ke katalog</span>
        </button>
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-6 text-sm text-neutral-500">
          Memuat detail hampers...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container-page py-6">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-primary-600"
        >
          <i className="fa-solid fa-arrow-left text-[10px]" />
          <span>Kembali ke katalog</span>
        </button>
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-6 text-sm text-neutral-600">
          <p className="font-semibold text-neutral-900">Hampers tidak ditemukan.</p>
          <p className="mt-1 text-xs text-neutral-500">
            Bisa jadi produk sudah tidak aktif atau terjadi kendala teknis. Silakan pilih hampers
            lain di katalog, atau hubungi tim kami via WhatsApp untuk rekomendasi.
          </p>
        </div>
      </main>
    );
  }

  const waMessage = encodeURIComponent(
    [
      'Halo VIGRE GIFT, saya tertarik dengan hampers berikut:',
      '',
      `Nama: ${product.name}`,
      product.isPromo && product.promoPrice
        ? `Harga: ${formatCurrency(product.promoPrice)} (promo dari ${formatCurrency(
          product.normalPrice
        )})`
        : `Harga: ${formatCurrency(product.normalPrice)}`,
      product.image ? `URL gambar: ${product.image}` : 'URL gambar: -',
      '',
      'Saya sedang melihat halaman detail hampers ini di website.',
      'Boleh dibantu info lebih lanjut cara pemesanan atau konsultasi produk ini? Terima kasih'
    ].join('\n')
  );

  const waLink = `https://wa.me/${phone}?text=${waMessage}`;

  const productDescription = documentToReactComponents(product.description);
  // console.log('productDescription : ', productDescription);

  const hasRichDescription = product.description && typeof product.description !== 'string';
  const descriptionText =
    typeof product.description === 'string'
      ? product.description
      : 'Untuk detail isi hampers dan opsi kustomisasi, silakan hubungi tim kami melalui WhatsApp.';


  return (
    <main className="container-page py-6">
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-primary-600"
      >
        <i className="fa-solid fa-arrow-left text-[10px]" />
        <span>Kembali ke katalog</span>
      </button>

      <article className="grid gap-6 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,3fr)]">
        <div className="space-y-3">
          <div className="sticky top-0 overflow-hidden rounded-2xl bg-neutral-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full max-h-[720px] object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-64 items-center justify-center text-neutral-300">
                <i className="fa-regular fa-image text-3xl" />
              </div>
            )}
            {product.isPromo && (
              <div className="absolute left-4 top-4 rounded-full bg-primary-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                Promo spesial
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
              {product.category && (
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-[2px]">
                  <i className="fa-regular fa-calendar text-[10px]" />
                  <span>{product.category}</span>
                </span>
              )}
              {product.type && (
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-[2px] capitalize">
                  <i className="fa-regular fa-bookmark text-[10px]" />
                  <span>{product.type}</span>
                </span>
              )}
              {product.size && (
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-[2px] capitalize">
                  <i className="fa-regular fa-square text-[10px]" />
                  <span>{product.size}</span>
                </span>
              )}
            </div>

            <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
              {product.name}
            </h1>

            <div className="space-y-1 text-sm">
              {product.isPromo && product.promoPrice ? (
                <>
                  <p className="text-base font-semibold text-primary-600">
                    {formatCurrency(product.promoPrice)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    <span className="mr-1 line-through">
                      {formatCurrency(product.normalPrice)}
                    </span>
                    <span>Harga spesial untuk periode terbatas.</span>
                  </p>
                </>
              ) : (
                <p className="text-base font-semibold text-neutral-900">
                  {formatCurrency(product.normalPrice)}
                </p>
              )}
            </div>
          </header>

          <section className="space-y-2 text-sm text-neutral-700">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Cerita di balik hampers ini
            </h2>
            <div className="text-sm leading-relaxed text-neutral-700">{productDescription}</div>
            <p className="text-sm leading-relaxed text-neutral-700">{descriptionText}</p>
            {/* {hasRichDescription && (
              <p className="mt-1 text-[11px] text-neutral-400">
                Deskripsi lengkap tersedia di CMS dan dapat diadaptasi sesuai kebutuhan campaign.
              </p>
            )} */}
          </section>

          {product.preview && (
            <section className="rounded-2xl border border-neutral-100 bg-neutral-50 px-3 py-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-lightbulb text-[12px] text-primary-500" />
                <div>
                  <p className="font-semibold text-neutral-900">
                    Insight singkat untuk hampers ini
                  </p>
                  {product.preview.highlight && (
                    <p className="text-xs text-neutral-600">{product.preview.highlight}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="mt-auto space-y-3 border-t border-neutral-100 pt-3">
            <p className="text-xs text-neutral-600">
              Ceritakan kepada tim kami tentang penerima hampers, momen yang ingin dirayakan, dan
              kisaran budget Anda. Kami bantu sesuaikan isi dan tampilan agar terasa lebih
              personal.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>Konsultasi hampers ini via WhatsApp</span>
              </a>
              <Link to="/order" className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-600">
                <i className="fa-solid fa-file-invoice text-sm" />
                <span>Order</span>
              </Link>
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-700"
              >
                <i className="fa-solid fa-arrow-left text-[10px]" />
                <span>Kembali pilih hampers lain</span>
              </button>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}

