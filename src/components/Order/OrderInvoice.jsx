import React, { useRef } from 'react';
import { generateInvoicePdf } from '../../utils/orderPdf';
import { formatCurrency } from '../../utils/formatCurrency';
import { useMetadata } from '../../context/MetadataContext';

export function OrderInvoice({ orderData }) {
  const containerRef = useRef(null);
  const { storeDetail } = useMetadata();
  const phone = (storeDetail?.phoneStore ?? '6285821233817').replace(/\D/g, '');



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


  const waMessage = encodeURIComponent(
    [
      'Halo VIGRE GIFT, saya telah melakukan pemesanan: ',
      '',
      `No Invoice: *${order[0] || 'Blank'}*`,
      `Tanggal Pemesanan : ${order[1]?.slice(0, 10) || '-'}`,
      `Atas Nama: ${order[2] || 'None'}`,
      '',
      `Total : ${formatCurrency(order[5] || 0)}`,
      `DP : *${formatCurrency(order[6] || 0)}*`,
      `Sisa Pembayaran : ${formatCurrency((order[5] || 0) - (order[6] || 0))}`,

      '',
      '_Note : Lampirkan Bukti TF disini_',
      'Berikut bukti transfer untuk pembayaran :',
      '1. *DP*',
      '2. *Pelunasan*',
      'Silahkan di verifikasi, agar pesanan saya segera di proses. Terima kasih.',
    ].join('\n')
  );

  const waLink = `https://wa.me/${phone}?text=${waMessage}`;


  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-100 text-gray-600";

    const s = status.toLowerCase();

    if (s.includes("lunas") || s.includes("selesai"))
      return "bg-green-100 text-green-700";

    if (s.includes("pending") || s.includes("on check"))
      return "bg-yellow-100 text-yellow-700";

    if (s.includes("gagal") || s.includes("batal") || s.includes("cencle") || s.includes("siapkan"))
      return "bg-red-100 text-red-700";

    if (s.includes("kirim") || s.includes("ambil") || s.includes("diterima"))
      return "bg-blue-100 text-blue-700";

    return "bg-gray-100 text-gray-600";
  };


  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <button onClick={handleDownload} className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white">
          Download Invoice
        </button>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
        >
          <i className="fa-brands fa-whatsapp text-sm" />
          <span>Kirim Bukti Transfer</span>
        </a>
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

          <h1 className="text-center font-bold text-xl pb-5 mb-12">INVOICE VIGRE GIFT</h1>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Invoice No : {order[0] || 'Blank'}</h3>
              <p className="text-sm text-neutral-600">Tanggal : {order[1]?.slice(0, 10) || '-'}</p>
              {/* <p className="text-sm text-neutral-600">Status Pembayaran : {order[7] || '-'}</p> */}
              <p className="text-sm  text-neutral-600">Status Pembayaran :
                <span className={`ml-2 px-3 rounded-full  text-xs font-medium ${getStatusStyle(order[7])}`}>
                  {order[7] || '-'}
                </span>
              </p>
              {/* <p className="text-sm text-neutral-600">Status Pesanan : {order[9] || '-'}</p> */}
              <p className="text-sm text-neutral-600">Status Pesanan :
                <span className={`ml-2 px-3 rounded-full text-xs font-medium ${getStatusStyle(order[9])}`}>
                  {order[9] || '-'}
                </span>

              </p>

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
                <th className="pb-2 text-right">Tanggal Delivery</th>
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
                  <td className="py-3 pl-10 text-right">{d[6]?.slice(0, 10) || '-'}</td>
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
              {order[7] === "Lunas" && (
                <div className='pt-5 text-right'>
                  <span className={`px-5 py-2 rounded-md border border-green-200 text-xl font-semibold ${getStatusStyle(order[7])}`}>
                    {order[7] || '-'}
                  </span>
                </div>
              )}
            </div>
          </div>
          <h2 className="font-semibold pt-20">CARA PEMBAYARAN</h2>

          <div className="flex gap-10 pt-1 items-start">
            {/* QRIS */}
            <div className='border-r-2 border-neutral-300 pr-10'>
              <h3 className="font-semibold text-sm">QRIS - Viogrey Fashion</h3>
              <img
                src="https://res.cloudinary.com/dus7pn4ba/image/upload/v1771557342/QRIS_VIGRE__o0hfrb.webp"
                alt="qris_barcode"
                className="w-32 pt-2"
              />
            </div>

            {/* Transfer */}
            <div>
              <h3 className="font-semibold text-sm">Transfer Rekening</h3>
              <p className="text-sm">Bank BCA - Sutanti</p>
              <p className="text-sm">8355226464</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 italic pt-12">Note : Silahkan hubungi kami untuk  konfirmasi pembayaran dan informasi lebih lanjut</p>
          <h3 className="font-bold pt-1">VIGRE GIFT</h3>
          <p className="text-sm">JL. KS Tubun Dalam, RT.14, No. 25, Dadi Mulya Samarinda, Kalimantan Timur</p>
          <p className="text-sm">WhatsApp : 0838-4999-5556</p>
          <p className="text-sm text-gray-400">-</p>
        </div>
      </div >

    </>
  );
}

export default OrderInvoice;
