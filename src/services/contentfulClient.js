import { createClient } from 'contentful';

const SPACE_ID = import.meta.env.VITE_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const METADATA_CONTENT_TYPE = import.meta.env.VITE_METADATA_CONTENT_TYPE;

export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

export async function fetchVigreGiftEntries() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: CONTENT_TYPE,
      order: ['-fields.isPromo', 'fields.name']
    });

    // console.log('response data : ', response);

    return response.items.map((item) => {
      const fields = item.fields;
      return {
        id: item.sys.id,
        name: fields.name ?? '',
        description: fields.description ?? null,
        normalPrice: fields.normalPrice ?? 0,
        promoPrice: fields.promoPrice ?? null,
        category: fields.category ?? '',
        type: fields.type ?? '',
        size: fields.size ?? '',
        image: fields.image ?? '',
        isPromo: Boolean(fields.isPromo),
        preview: fields.preview ?? null
      };
    });
  } catch (error) {
    console.error('Failed to load Contentful data, falling back to dummy data', error);
    throw error;
  }
}

const DEFAULT_STORE = {
  urlLogoStore: '',
  nameStore: 'VIGRE GIFT',
  titleStore: 'Hampers yang bikin bahagia',
  phoneStore: '6285821233817'
};
const DEFAULT_BANNER = {
  urlBannerHero: '',
  urlImageAnimation: '',
  urlBannerSlide: { bannerA: '', bannerB: '', bannerC: '' }
};
const DEFAULT_PROMO = { promoStartDate: '', promoEndDate: '' };


const DEFAULT_SOCIAL_PROOF = {
  testimonials: []
};

function parseDataDetail(raw) {
  if (!raw) return { storeDetail: DEFAULT_STORE, bannerDetail: DEFAULT_BANNER, promoDetail: DEFAULT_PROMO, socialProofDetail: DEFAULT_SOCIAL_PROOF };
  const data = typeof raw === 'string' ? (() => { try { return JSON.parse(raw); } catch { return {}; } })() : raw;
  return {
    storeDetail: { ...DEFAULT_STORE, ...data.storeDetail },
    bannerDetail: { ...DEFAULT_BANNER, ...data.bannerDetail, urlBannerSlide: { ...DEFAULT_BANNER.urlBannerSlide, ...data.bannerDetail?.urlBannerSlide } },
    promoDetail: { ...DEFAULT_PROMO, ...data.promoDetail },
    socialProofDetail: {...DEFAULT_SOCIAL_PROOF, ...data.socialProofDetail}
  };
}

export async function fetchVigreGiftMetadata() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: METADATA_CONTENT_TYPE,
      limit: 1
    });
    const item = response.items[0];
    const raw = item?.fields?.data ?? item?.fields?.['data'];
    // console.log('raw', raw);
    return parseDataDetail(raw);
  } catch (error) {
    console.warn('Failed to load vigregiftmetadata, using defaults.', error);
    return {
      storeDetail: DEFAULT_STORE,
      bannerDetail: DEFAULT_BANNER,
      promoDetail: DEFAULT_PROMO,
      socialProofDetail: DEFAULT_SOCIAL_PROOF
    };
  }
}

