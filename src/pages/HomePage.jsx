import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useMetadata } from '../context/MetadataContext';
import { useFlashSaleCountdown } from '../components/FlashSaleCountdown';
import { HeroSection } from '../components/HeroSection';
import { SearchBar } from '../components/SearchBar';
import { SidebarFilter } from '../components/SidebarFilter';
import { ProductGrid } from '../components/ProductGrid';
import { ProductGridSkeleton } from '../components/ProductGridSkeleton';
import { SocialProofSection } from '../components/SocialProofSection';
import { FlashSaleCountdownDisplay } from '../components/FlashSaleCountdownDisplay';
import { HorizontalProductStrip } from '../components/HorizontalProductStrip';

export function HomePage() {
  const { storeDetail, promoDetail } = useMetadata();
  const phone = (storeDetail?.phoneStore ?? '6285821233817').replace(/\D/g, '');
  const baseWaUrl = `https://wa.me/${phone}`;

  const {
    filteredProducts,
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    sizeFilter,
    setSizeFilter,
    uniqueCategories,
    uniqueTypes,
    uniqueSizes
  } = useProducts();

  const { expired: countdownExpired } = useFlashSaleCountdown(promoDetail);
  const flashSaleProducts = products.filter((p) => p.preview?.isFlashSale === true);
  const bestSellerProducts = products.filter((p) => p.preview?.isBestSaller === true);

  const showFlashSale = !countdownExpired && flashSaleProducts.length > 0;
  const showBestSeller = bestSellerProducts.length > 0;

  return (
    <main className="space-y-8 pb-12">
      <HeroSection waUrl={baseWaUrl} />

      <section id="catalog" className="container-page space-y-5 pt-3">
        
        {/* ================= FLASH SALE SECTION ================= */}
        {loading ? (
          <ProductGridSkeleton items={4} />
        ) : (
          <>
            {showFlashSale && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-2xl font-semibold uppercase tracking-wide text-primary-600 sm:text-3xl">
                      Amankan pembelian Anda sekarang!!!
                    </p>
                    <p className="text-xs text-primary-800">
                      Koleksi hampers dengan harga spesial untuk momen istimewa. Stok terbatas.
                    </p>
                  </div>
                  <FlashSaleCountdownDisplay promoDetail={promoDetail} />
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  <HorizontalProductStrip
                    products={bestSellerProducts}
                    waUrl={baseWaUrl}
                    title="Best Seller"
                    subtitle="Pilihan terlaris untuk momen bahagia"
                    backgroundColor="bg-blue-50"
                    textStyle="text-blue-800"
                    iconStyle="fa-medal"
                    showArrows
                  />

                  <HorizontalProductStrip
                    products={flashSaleProducts}
                    waUrl={baseWaUrl}
                    title="Flash Sale"
                    subtitle="Waktu terbatas untuk mendapatkan diskon!!!!"
                    backgroundColor="bg-primary-50"
                    textStyle="text-primary-600"
                    iconStyle="fa-bolt"
                    showArrows
                    isFlashSaleStrip
                  />
                </div>
              </div>
            )}

            {countdownExpired && showBestSeller && (
              <HorizontalProductStrip
                products={bestSellerProducts}
                waUrl={baseWaUrl}
                title="Best Seller"
                subtitle="Pilihan terlaris untuk momen bahagia"
                backgroundColor="bg-blue-50"
                textStyle="text-blue-800"
                iconStyle="fa-medal"
                showArrows
              />
            )}
          </>
        )}

        {/* ================= HEADER KATALOG ================= */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
                Katalog hampers VIGRE GIFT
              </h2>
              <p className="mt-1 max-w-xl text-xs text-neutral-600">
                Sesuaikan dengan momen, karakter penerima, dan budget. Tim kami siap bantu Anda
                menemukan hampers yang terasa paling tepat dan berkesan.
              </p>
            </div>

            {/* ===== MOBILE: Search + Filter sejajar ===== */}
            <div className="flex w-full gap-2 md:hidden">
              <div className="flex-1">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>

              <SidebarFilter
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                sizeFilter={sizeFilter}
                setSizeFilter={setSizeFilter}
                uniqueCategories={uniqueCategories}
                uniqueTypes={uniqueTypes}
                uniqueSizes={uniqueSizes}
                isMobile
              />
            </div>

            {/* ===== DESKTOP: Search saja ===== */}
            <div className="hidden w-full max-w-xs md:block">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>
        </div>

        {/* ================= CONTENT AREA ================= */}
        <div className="mt-2 flex flex-col gap-6 md:flex-row">
          
          {/* ===== DESKTOP SIDEBAR ===== */}
          <div className="hidden md:block md:w-64">
            <SidebarFilter
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              sizeFilter={sizeFilter}
              setSizeFilter={setSizeFilter}
              uniqueCategories={uniqueCategories}
              uniqueTypes={uniqueTypes}
              uniqueSizes={uniqueSizes}
            />
          </div>

          {/* ===== PRODUCT GRID ===== */}
          <div className="flex-1 space-y-5 pb-1">
            {error && !loading && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                <p className="font-medium">Saat ini kami menampilkan contoh katalog.</p>
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <ProductGridSkeleton items={8} />
            ) : (
              <ProductGrid products={filteredProducts} waUrl={baseWaUrl} />
            )}
          </div>
        </div>
      </section>

      <SocialProofSection />

      {/* ================= CONTACT SECTION ================= */}
      <section
        id="contact"
        className="container-page mt-2 rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-sm text-neutral-700"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-900">
              Siap diskusi konsep hampers untuk momen berikutnya?
            </p>
            <p className="text-xs text-neutral-500">
              Ceritakan momen yang ingin Anda rayakan, kami bantu susun hampers yang terasa
              personal dan berkesan.
            </p>
          </div>

          <a
            href={baseWaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
          >
            <i className="fa-brands fa-whatsapp text-sm" />
            <span>Mulai chat WhatsApp</span>
          </a>
        </div>
      </section>
    </main>
  );
}
