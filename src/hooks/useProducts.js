import { useEffect, useMemo, useState } from 'react';
import { fetchVigreGiftEntries } from '../services/contentfulClient';
import { dummyProducts } from '../data/dummyProducts';

const WA_NUMBER = '6285821233817';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const entries = await fetchVigreGiftEntries();
        if (isMounted) {
          setProducts(entries.length > 0 ? entries : dummyProducts);
        }
      } catch (err) {
        console.warn('Using dummy products because CMS failed or empty.', err);
        if (isMounted) {
          setProducts(dummyProducts);
          setError('Tidak dapat memuat data dari CMS. Menampilkan contoh produk.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesType = !typeFilter || product.type === typeFilter;
      const matchesSize = !sizeFilter || product.size === sizeFilter;

      return matchesSearch && matchesCategory && matchesType && matchesSize;
    });
  }, [products, searchTerm, categoryFilter, typeFilter, sizeFilter]);

  const waUrl = useMemo(
    () => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo VIGRE GIFT, saya tertarik dengan hampers Anda.')}`,
    []
  );

  const uniqueCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    [products]
  );

  const uniqueTypes = useMemo(
    () => Array.from(new Set(products.map((p) => p.type).filter(Boolean))),
    [products]
  );

  const uniqueSizes = useMemo(
    () => Array.from(new Set(products.map((p) => p.size).filter(Boolean))),
    [products]
  );

  return {
    products,
    filteredProducts,
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
    uniqueSizes,
    waUrl
  };
}

