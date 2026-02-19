import React, { useState } from 'react';
import { OrderSearch } from '../components/Order/OrderSearch';
import { OrderForm } from '../components/Order/OrderForm';
import { OrderInvoice } from '../components/Order/OrderInvoice';

export function OrderPage() {
  const [foundOrder, setFoundOrder] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);

  return (
    <main className="container-page py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cek Order / Buat Order Baru</h1>
        <div>
          <button
            type="button"
            onClick={() => { setCreatingNew((v) => !v); setFoundOrder(null); }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
          >
            {creatingNew ? 'Kembali ke Cari' : 'Buat Order Baru'}
          </button>
        </div>
      </div>

      {!creatingNew && (
        <OrderSearch onFound={(order) => setFoundOrder(order)} />
      )}

      {foundOrder && (
        <div className="mt-6">
          <OrderInvoice orderData={foundOrder} />
        </div>
      )}

      {creatingNew && (
        <div className="mt-6">
          <OrderForm onCreated={(orderId) => { setCreatingNew(false); }} onFound={(order) => setFoundOrder(order) }/>
          {/* <OrderForm onCreated={(order) => setFoundOrder(order) } /> */}
        </div>
      )}
    </main>
  );
}

export default OrderPage;
