import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchVigreGiftMetadata } from '../services/contentfulClient';

const MetadataContext = createContext(null);

export function MetadataProvider({ children }) {
  const [metadata, setMetadata] = useState({
    storeDetail: null,
    bannerDetail: null,
    promoDetail: null,
    socialProofDetail: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    fetchVigreGiftMetadata()
      .then((data) => {
        if (isMounted) {
          setMetadata({
            storeDetail: data.storeDetail,
            bannerDetail: data.bannerDetail,
            promoDetail: data.promoDetail,
            socialProofDetail: data.socialProofDetail,
            loading: false,
            error: null
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setMetadata((prev) => ({
            ...prev,
            loading: false,
            error: err?.message ?? 'Gagal memuat metadata'
          }));
        }
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <MetadataContext.Provider value={metadata}>
      {children}
    </MetadataContext.Provider>
  );
}

const FALLBACK = {
  storeDetail: {
    urlLogoStore: '',
    nameStore: 'VIGRE GIFT',
    titleStore: 'Hampers yang bikin bahagia',
    phoneStore: '6285821233817'
  },
  bannerDetail: {
    urlBannerHero: '',
    urlImageAnimation: '',
    urlBannerSlide: { bannerA: '', bannerB: '', bannerC: '' }
  },
  promoDetail: { promoStartDate: '', promoEndDate: '' },

  socialProofDetail: {
    testimonials: []
  },

  loading: false,
  error: null
};

export function useMetadata() {
  const ctx = useContext(MetadataContext);
  if (!ctx) return FALLBACK;
  return {
    storeDetail: { ...FALLBACK.storeDetail, ...ctx.storeDetail },
    bannerDetail: {
      ...FALLBACK.bannerDetail,
      ...ctx.bannerDetail,
      urlBannerSlide: { ...FALLBACK.bannerDetail.urlBannerSlide, ...ctx.bannerDetail?.urlBannerSlide }
    },
    promoDetail: { ...FALLBACK.promoDetail, ...ctx.promoDetail },
    socialProofDetail: { ...FALLBACK.socialProofDetail, ...ctx.socialProofDetail },
    loading: ctx.loading ?? false,
    error: ctx.error ?? null
  };
}
