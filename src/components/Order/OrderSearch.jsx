import React, { useState } from 'react';
import { getOrderById } from '../../services/orderService';

export function OrderSearch({ onFound }) {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    if (!id) return setError('Masukkan nomor order');
    
    // Normalisasi ID
    let formattedId = id.trim();
    if (!formattedId.toUpperCase().startsWith('ORD-')) {
      formattedId = `ORD-${formattedId}`;
    }
    setLoading(true);
    try {
      const res = await getOrderById(formattedId);
      if (res?.status === 'success' && res.order) {
        onFound(res);
        // console.log('resClient',res);

      } else {
        setError('Order tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal mengambil order. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mx-auto max-w-lg">
        <label className="mb-2 block text-sm font-medium text-neutral-700">Cek Order</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Masukkan no invoice"
            className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-400"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Mencari...' : 'Cari'}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      </div>
    </div>
  );
}

export default OrderSearch;
