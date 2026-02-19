import React, { useEffect, useMemo, useState } from 'react';
import { fetchVigreGiftEntries } from '../../services/contentfulClient';
import { createOrder } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';
import { getOrderById } from '../../services/orderService';

export function OrderForm({ onCreated, onFound }) {
  const [step, setStep] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [order, setOrder] = useState({
    name: '',
    ig: '',
    phone: '',
    products: [],
    deliveryType: 'delivery',
    useSeparateAddress: false,
    deliveryGlobal: { address: '', date: '' },
    pickupDate: '',
    total: 0,
    dp: 0
  });


  useEffect(() => {
    let mounted = true;
    fetchVigreGiftEntries()
      .then((res) => {
        if (!mounted) return;
        const items = res.map((p) => ({ id: p.id, name: p.name, price: p.promoPrice || p.normalPrice, image: p.image }));
        setProducts(items);
        setLoadingProducts(false);
      })
      .catch(() => {
        setProducts([]);
        setLoadingProducts(false);
      });
    return () => { mounted = false; };
  }, []);

  const progress = useMemo(() => {
    const steps = 8;
    return Math.round((step / steps) * 100);
  }, [step]);

  const next = () => setStep((s) => Math.min(8, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const update = (patch) => setOrder((o) => ({ ...o, ...patch }));

  function toggleProductSelection(prod) {
    setOrder((o) => {
      const exists = o.products.find((p) => p.id === prod.id);
      if (exists) {
        return { ...o, products: o.products.filter((p) => p.id !== prod.id) };
      }
      return { ...o, products: [...o.products, { id: prod.id, name: prod.name, qty: 1, price: prod.price, delivery: { address: '', date: '' } }] };
    });
  }

  const changeQty = (id, qty) => {
    setOrder((o) => ({ ...o, products: o.products.map((p) => (p.id === id ? { ...p, qty: Number(qty) } : p)) }));
  };

  const setProductDelivery = (id, field, value) => {
    setOrder((o) => ({ ...o, products: o.products.map((p) => (p.id === id ? { ...p, delivery: { ...p.delivery, [field]: value } } : p)) }));
  };

  useEffect(() => {
    const total = order.products.reduce((acc, p) => acc + (Number(p.qty || 0) * Number(p.price || 0)), 0);
    update({ total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.products]);

  const getIdOrder = async (orderID) => {
    console.log('orderID', orderID);
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const resInvoice = await getOrderById(orderID);
    console.log('resInvoice', resInvoice);
    if (resInvoice?.status === 'success' && resInvoice.order) {
      onFound(resInvoice.order);
    } else {
      alert('Order tidak ditemukan : ' + orderID);
    }
  }


  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        nama: order.name,
        ig: order.ig,
        phone: order.phone,
        total: order.total,
        dp: order.dp,
        deliveryType: order.deliveryType,
        useSeparateAddress: order.useSeparateAddress,
        deliveryGlobal: order.deliveryGlobal,
        pickupDate: order.pickupDate,
        products: order.products.map((p) => ({ id: p.id, name: p.name, qty: p.qty, price: p.price, delivery: p.delivery }))
      };

      const res = await createOrder(payload);
      if (res?.status === 'success') {
        onCreated && onCreated(res.id)
        // alert('Order berhasil dibuat: ' + res.id);

        // await new Promise((resolve) => setTimeout(resolve, 5000));
        const resInvoice = await getOrderById(res.id);
        if (resInvoice?.status === 'success' && resInvoice.order) {
          onFound(resInvoice);
          // console.log('resOrder',resInvoice);
        } else {
          alert('Order tidak ditemukan : ' + res.id);
        }

      } else {
        alert('Gagal membuat order');
      }
    } catch (err) {
      console.error(err);
      alert('Gagal membuat order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm text-neutral-600">Step {step} / 8</div>
          <div className="text-sm font-medium">Progress {progress}%</div>
        </div>
        <div className="h-2 w-full rounded-full bg-neutral-100">
          <div className="h-2 rounded-full bg-primary-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Steps */}
      {step === 1 && (
        <div>
          <label className="block text-sm font-medium text-neutral-700">Boleh tau dengan kakak Siapa yang Order?</label>
          <input value={order.name} onChange={(e) => update({ name: e.target.value })} className="mt-2 w-full rounded border px-3 py-2" />
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block text-sm font-medium text-neutral-700">Kasih tau nama IG nya dong kak</label>
          <input value={order.ig} onChange={(e) => update({ ig: e.target.value })} className="mt-2 w-full rounded border px-3 py-2" />
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block text-sm font-medium text-neutral-700">Sekalian Nomor WA kakak buat kita saling kordinasi</label>
          <input value={order.phone} onChange={(e) => update({ phone: e.target.value })} className="mt-2 w-full rounded border px-3 py-2" />
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="mb-2 text-sm font-medium">Pilih-pilih Item yang mau di order ya kak</p>
          {loadingProducts ? (
            <p>Memuat produk...</p>
          ) : (
            <div className="space-y-3">
              {products.map((p) => {
                const selected = order.products.find((x) => x.id === p.id);
                // console.log(selected);

                return (
                  <div key={p.id} className="flex items-center gap-3 rounded-md border p-2">
                    <img src={p.image} alt="" className="h-13 w-12 rounded object-cover" />
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">
                          {p.name}
                        </span>
                        <span className="text-sm text-neutral-500">Rp.
                          {new Intl.NumberFormat("id-ID").format(p.price)}
                        </span>
                      </div>
                      {/* <div className="flex-1 text-sm">{p.name}</div>
                    <div className="flex-1 text-sm">{p.price}</div> */}
                      <div className="flex items-center gap-2">
                        <input type="number" min={1} value={selected?.qty || 0} onChange={(e) => changeQty(p.id, e.target.value)} className="w-20 rounded border px-2 py-1" />
                        <button onClick={() => toggleProductSelection(p)} className="rounded-full border px-3 py-1 text-sm">{selected ? '-' : '+'}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {step === 5 && (
        <div>
          <p className="mb-2 text-sm font-medium">Apakah ingin kami kirim atau di ambil sendiri kak?</p>
          <div className="flex gap-3">
            <label className={`cursor-pointer rounded-full border px-3 py-2 ${order.deliveryType === 'delivery' ? 'bg-primary-50' : ''}`}>
              <input type="radio" name="deliveryType" checked={order.deliveryType === 'delivery'} onChange={() => update({ deliveryType: 'delivery' })} className="hidden" />
              Kirim
            </label>
            <label className={`cursor-pointer rounded-full border px-3 py-2 ${order.deliveryType === 'pickup' ? 'bg-primary-50' : ''}`}>
              <input type="radio" name="deliveryType" checked={order.deliveryType === 'pickup'} onChange={() => update({ deliveryType: 'pickup' })} className="hidden" />
              Ambil
            </label>
          </div>
        </div>
      )}

      {step === 6 && order.deliveryType === 'pickup' && (
        <div>
          <label className="block text-sm font-medium">Isi tanggal ambilnya ya kak</label>
          <input type="date" value={order.pickupDate} onChange={(e) => update({ pickupDate: e.target.value })} className="mt-2 w-full rounded border px-3 py-2" />
        </div>
      )}

      {step === 6 && order.deliveryType === 'delivery' && (
        <div>
          <p className="mb-2 text-sm font-medium">Apakah setiap produk dikirim ke alamat berbeda?</p>
          <div className="flex gap-3">
            <label className={`cursor-pointer rounded-full border px-3 py-2 ${order.useSeparateAddress ? '' : 'bg-primary-50'}`}>
              <input type="radio" name="useSeparateAddress" checked={!order.useSeparateAddress} onChange={() => update({ useSeparateAddress: false })} className="hidden" />
              Tidak
            </label>
            <label className={`cursor-pointer rounded-full border px-3 py-2 ${order.useSeparateAddress ? 'bg-primary-50' : ''}`}>
              <input type="radio" name="useSeparateAddress" checked={order.useSeparateAddress} onChange={() => update({ useSeparateAddress: true })} className="hidden" />
              Ya
            </label>
          </div>
        </div>
      )}

      {step === 7 && order.deliveryType === 'pickup' && (
        <div>
          <label className="block text-sm font-medium">Ambilnya ke alamat kami ini ya kak :</label>
          <p>Jl. KS Tubun Dalam, RT.14, No. 25, Dadi Mulya Samarinda, Kalimantan Timur</p>
          <p>WhatsApp : 0838-4999-5556</p>
        </div>
      )}

      {step === 7 && order.deliveryType === 'delivery' && !order.useSeparateAddress && (
        <div>
          <label className="block text-sm font-medium">Isi alamat kirim dan tanggalnya ya kak</label>
          <input type="date" value={order.deliveryGlobal.date} onChange={(e) => update({ deliveryGlobal: { ...order.deliveryGlobal, date: e.target.value } })} className="mt-2 w-full rounded border px-3 py-2" />
          <input type="text" value={order.deliveryGlobal.address} onChange={(e) => update({ deliveryGlobal: { ...order.deliveryGlobal, address: e.target.value } })} placeholder="Alamat lengkap" className="mt-2 w-full rounded border px-3 py-2" />
        </div>
      )}

      {step === 7 && order.deliveryType === 'delivery' && order.useSeparateAddress && (
        <div>
          <p className="mb-2 text-sm font-medium">Isi alamat kirim dan tanggalnya untuk setiap produk</p>
          <div className="space-y-3">
            {order.products.map((p) => (
              <div key={p.id} className="rounded border p-3">
                <p className="font-semibold">{p.name}</p>
                <input type="date" value={p.delivery?.date || ''} onChange={(e) => setProductDelivery(p.id, 'date', e.target.value)} className="mt-2 w-full rounded border px-3 py-2" />
                <input type="text" value={p.delivery?.address || ''} onChange={(e) => setProductDelivery(p.id, 'address', e.target.value)} placeholder="Alamat lengkap" className="mt-2 w-full rounded border px-3 py-2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 8 && (
        <div>
          <p className="mb-2 text-sm font-medium">Ini totalnya ya kak, ingin DP berapa nih?</p>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-bold">Total</div>
            <div className="text-sm font-semibold">{formatCurrency(order.total || 0)}</div>
          </div>
          <label className="block text-sm font-medium">Nominal DP</label>
          {/* <input type="number" value={order.dp} onChange={(e) => update({ dp: Number(e.target.value) })} className="mt-2 w-full rounded border px-3 py-2" /> */}
          <input
            type="text"
            value={new Intl.NumberFormat("id-ID").format(order.dp || 0)}
            onChange={(e) => {
              const raw = e.target.value.replace(/\./g, ""); // hapus titik
              update({ dp: Number(raw) });
            }}
            className="mt-2 w-full rounded border px-3 py-2 text-right"
          />
          <p className='text-sm italic text-gray-500'>Note : minimal DP 50% ya kak.</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div>
          {step > 1 && <button onClick={prev} className="rounded-full border px-4 py-2">Previous</button>}
        </div>
        <div>
          {step < 8 && <button onClick={next} className="rounded-full bg-primary-500 px-4 py-2 text-white">Next</button>}
          {step === 8 && <button onClick={handleSubmit} disabled={submitting} className="ml-2 rounded-full bg-primary-600 px-4 py-2 text-white">{submitting ? 'Mengirim...' : 'Submit'}</button>}
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
