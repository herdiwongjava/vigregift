import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, waUrl }) {
  if (!products?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-4 py-8 text-center text-sm text-neutral-500">
        <p className="mb-1 font-medium">Belum ada hampers yang cocok dengan pengaturan Anda.</p>
        <p className="text-xs text-neutral-400">
          Coba reset filter atau gunakan kata kunci lain, atau chat tim kami untuk rekomendasi cepat.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} waUrl={waUrl} />
      ))}
    </div>
  );
}

