import React, { useState, useEffect } from 'react';
import { useMetadata } from '../context/MetadataContext';

/** Gambar animasi kecil: ukuran 96x96px (Tailwind: w-24 h-24) */
const ANIMATION_IMAGE_SIZE = 172;

export function HeroSection({ waUrl }) {
  const { storeDetail, bannerDetail } = useMetadata();
  const phone = storeDetail?.phoneStore?.replace(/\D/g, '') || '6285821233817';
  const link = waUrl || `https://wa.me/${phone}`;

  const slide = bannerDetail?.urlBannerSlide ?? {};
  const slideUrls = [slide.bannerA, slide.bannerB, slide.bannerC].filter(Boolean);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    if (slideUrls.length <= 1) return;
    const t = setInterval(() => {
      setSliderIndex((i) => (i + 1) % slideUrls.length);
    }, 4000);
    return () => clearInterval(t);
  }, [slideUrls.length]);

  const heroImageUrl = bannerDetail?.urlBannerHero;
  const animationImageUrl = bannerDetail?.urlImageAnimation;

  return (
    <section id="hero" className="relative overflow-hidden rounded-3xl bg-white py-8 sm:py-10 lg:py-12">
      <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-primary-50" />
      <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-primary-50" />

      <div className="relative container-page grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-700">
            <i className="fa-regular fa-heart text-[10px]" />
            <span>Hampers modern untuk momen bahagia</span>
          </p>
          <h1 className="text-2xl font-semibold leading-snug text-neutral-900 sm:text-3xl lg:text-4xl">
            Bikin orang tersayang merasa spesial dengan hampers yang rapi, hangat, dan berkesan.
          </h1>
          <p className="max-w-xl text-sm text-neutral-600">
            VIGRE GIFT membantu Anda mengirim hampers yang terasa personal tanpa ribet. Kami siapkan
            konsep, isi, dan tampilan, Anda tinggal kirim dan menikmati senyum bahagia penerima.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>Konsultasi hampers sekarang</span>
            </a>
            <div className="flex flex-col text-[11px] text-neutral-500">
              <span className="font-semibold text-neutral-700">Konsultasi konsep & budget secara gratis</span>
              <span>Cukup ceritakan momen dan budget, kami bantu siapkan pilihan terbaik.</span>
            </div>
          </div>
        </div>

        <div className="relative hidden items-center justify-end lg:flex">
          {heroImageUrl ? (
            <div className="relative h-60 w-full max-w-xs overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm">
              <img
                src={heroImageUrl}
                alt="Rangkaian hampers VIGRE GIFT"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <div>
                  <p className="font-semibold">{storeDetail?.nameStore ?? 'VIGRE GIFT'}</p>
                  <p className="text-[11px] text-neutral-100">Best seller untuk momen lebaran & akhir tahun.</p>
                </div>
                <div className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-primary-700">
                  Siap kirim dalam 1–2 hari
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-60 w-full max-w-xs overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm">
              <img
                src="https://res.cloudinary.com/dus7pn4ba/image/upload/v1769675787/Hampers_Lebaran_Premium_Al-Fitri_o77zpx.webp"
                alt="Rangkaian hampers VIGRE GIFT"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <div>
                  <p className="font-semibold">VIGRE Signature Joy Box</p>
                  <p className="text-[11px] text-neutral-100">Best seller untuk momen lebaran & akhir tahun.</p>
                </div>
                <div className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-primary-700">
                  Siap kirim dalam 1–2 hari
                </div>
              </div>
            </div>
          )}
          {animationImageUrl && (
            <div
              className="absolute -bottom-6 -left-2 z-10 overflow-hidden animate-float-subtle"
              style={{ width: ANIMATION_IMAGE_SIZE, height: ANIMATION_IMAGE_SIZE }}
            >
              <img
                src={animationImageUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>

      {/* Slider banner seasonal — rekomendasi ukuran gambar: 1200x160px */}
      {slideUrls.length > 0 && (
        <div className="container-page mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 min-h-[120px] sm:min-h-[140px]">
            <div className="relative aspect-[1200/160] max-h-40 w-full sm:max-h-44">
              {slideUrls.map((url, i) => (
                <div
                  key={i}
                  className="absolute inset-0 h-full w-full transition-opacity duration-500"
                  style={{ opacity: i === sliderIndex ? 1 : 0, zIndex: i === sliderIndex ? 1 : 0 }}
                >
                  <img src={url} alt="" className="h-full w-full object-cover object-center" />
                </div>
              ))}
            </div>
            {slideUrls.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {slideUrls.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSliderIndex(i)}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${i === sliderIndex ? 'bg-primary-500' : 'bg-white/70'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
