import React, { useRef } from 'react';
import { generateInvoicePdf } from '../../utils/orderPdf';
import { formatCurrency } from '../../utils/formatCurrency';

export function OrderInvoice({ orderData }) {
  const containerRef = useRef(null);

  const handleDownload = async () => {
    try {
      await generateInvoicePdf(containerRef.current, orderData);
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Gagal menghasilkan PDF');
    }
  };

  const order = orderData.order || orderData;
  const details = orderData.details || orderData.items || [];
  // console.log('order', order);
  // console.log('detail', details);


  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <button onClick={handleDownload} className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white">
          Download Invoice
        </button>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white overflow-auto p-6">
        {/* <div ref={containerRef} className="prose max-w-none"> */}
        <div ref={containerRef} className="bg-white w-[794px] min-h-[1123px] p-6 mx-auto ">
          {/* <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Invoice: {order.id || order.ID_ORDER || order.orderId}</h3>
            <p className="text-sm text-neutral-600">Tanggal: {order.date || order.TANGGAL || ''}</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{order.name || order.NAMA}</p>
            <p className="text-neutral-600">{order.phone || order.PHONE}</p>
          </div>
        </div> */}

          <h1 className="text-center font-bold text-xl pb-10">INVOICE VIGRE GIFT</h1>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Invoice No : {order[0] || 'Blank'}</h3>
              <p className="text-sm text-neutral-600">Tanggal : {order[1]?.slice(0, 10) || '-'}</p>
              <p className="text-sm text-neutral-600">Status Pembayaran : {order[7] || '-'}</p>
              <p className="text-sm text-neutral-600">Status Pesanan : {order[9] || '-'}</p>

            </div>
            <div className="text-right text-sm">
              <h2 className="text-lg pb-2 font-semibold">Pemesan :</h2>
              <p className="font-semibold">{order[2] || 'None'}</p>
              <p className="text-neutral-600">0{order[4] || '-'}</p>
            </div>
          </div>

          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-xs text-neutral-500">
                <th className="pb-2">Produk</th>
                <th className="pb-2">Qty</th>
                <th className="pb-2 text-right">Harga</th>
                <th className="pb-2 text-right">Total</th>
                <th className="pb-2 text-center">Alamat Delivery</th>
              </tr>
            </thead>
            {/* <tbody>
            {details.map((d, i) => (
              <tr key={i} className="border-t border-neutral-100">
                <td className="py-2">{d.name || d.NAMA_PRODUK || d.NAMA}</td>
                <td className="py-2">{d.qty || d.QTY}</td>
                <td className="py-2">{d.price || d.HARGA || d.HARGA}</td>
              </tr>
            ))}
          </tbody> */}
            <tbody>
              {details.map((d, i) => (
                <tr key={i} className="border-t border-neutral-100">
                  <td className="py-2">{d[2] || 'None'}</td>
                  <td className="py-3">{d[3] || 0}</td>
                  <td className="py-3 text-right">{formatCurrency(d[4] || 0)}</td>
                  <td className="py-3 pl-3 text-right">{formatCurrency((d[3] || 0) * (d[4] || 0))}</td>
                  <td className="py-3 pl-10 text-left">{d[5] || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div className="mt-4 flex justify-end">
          <div className="w-64 space-y-1 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Total</span>
              <span>{order.total || order.TOTAL}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>DP</span>
              <span>{order.dp || order.DP}</span>
            </div>
          </div>
        </div> */}

          <div className="mt-4 flex justify-end">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex font-semibold justify-between text-neutral-600">
                <span>Total</span>
                <span>{formatCurrency(order[5] || 0)}</span>
              </div>
              <div className="flex font-semibold justify-between text-neutral-600">
                <span>DP</span>
                {/* <span> {new Intl.NumberFormat("id-ID").format(order[6] || 0)}</span> */}
                <span> {formatCurrency(order[6] || 0)}</span>
              </div>
              <div className="flex font-semibold justify-between text-neutral-600 border-t">
                <span>Sisa Pembayaran</span>
                <span>
                  {formatCurrency((order[5] || 0) - (order[6] || 0))}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 italic pt-20">Note : Silahkan hubungi kami untuk informasi lebih lanjut</p>
          <h3 className="font-bold pt-5">VIGRE GIFT</h3>
          <p className="text-sm">JL. KS Tubun Dalam, RT.14, No. 25, Dadi Mulya Samarinda, Kalimantan Timur</p>
          <p className="text-sm">WhatsApp : 0838-4999-5556</p>
          <p className="text-sm text-gray-400">-</p>
        </div>
      </div>

    </>
  );
}

export default OrderInvoice;
