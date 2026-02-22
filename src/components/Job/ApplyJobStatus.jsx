import React, { useRef } from 'react';
import { generateInvoicePdf } from '../../utils/orderPdf';
import { useMetadata } from '../../context/MetadataContext';

export function ApplyJobStatus({ applyData }) {
    const containerRef = useRef(null);
    const { storeDetail } = useMetadata();
    const phone = (storeDetail?.phoneStore ?? '6285821233817').replace(/\D/g, '');



    const handleDownload = async () => {
        try {
            await generateInvoicePdf(containerRef.current, applyData);
        } catch (err) {
            console.error('PDF generation failed', err);
            alert('Gagal menghasilkan PDF');
        }
    };

    const apply = applyData.apply || applyData;
    // console.log('apply', apply);



    const waMessage = encodeURIComponent(
        [
            'Halo VIGRE GIFT, saya telah mengirim lamaran: ',
            '',
            `No Lamaran: *${apply[0] || 'Blank'}*`,

            `Atas Nama: ${apply[5] || 'None'}`,
            `Posisi: ${apply[2] || 'None'} - ${apply[3] || 'None'}`,
            `Penempatan: ${apply[4] || 'None'}`,

        ].join('\n')
    );

    const waLink = `https://wa.me/${phone}?text=${waMessage}`;


    const getStatusStyle = (status) => {
        if (!status) return "bg-gray-100 text-gray-600";

        const s = status.toLowerCase();

        if (s.includes("diterima") || s.includes("selesai"))
            return "bg-green-100 text-green-700";

        if (s.includes("pending") || s.includes("pengajuan"))
            return "bg-yellow-100 text-yellow-700";

        if (s.includes("gagal") || s.includes("batal") || s.includes("cencle") || s.includes("ditolak"))
            return "bg-red-100 text-red-700";

        if (s.includes("diseleksi") || s.includes("wawancara") || s.includes("lulus"))
            return "bg-blue-100 text-blue-700";

        return "bg-gray-100 text-gray-600";
    };


    return (
        <>
            <div className="mb-4 flex items-center justify-start gap-2">
                <button onClick={handleDownload} className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white">
                    Download Lamaran
                </button>
                <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
                >
                    <i className="fa-brands fa-whatsapp text-sm" />
                    <span>Coba Followup Lamaran ?</span>
                </a>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-auto p-6">
                {/* <div ref={containerRef} className="prose max-w-none"> */}
                {/* <div ref={containerRef} className="bg-white w-[794px] min-h-[1123px] p-6 mx-auto ">

                    <h1 className="text-center font-bold text-xl pb-5 mb-12">LAMARAN KERJA</h1>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Nomor lamaran: {apply[0] || 'Blank'}</h3>
                            <p className="text-sm text-neutral-600">Tanggal : {apply[15]?.slice(0, 10) || '-'}</p>
                            <p className="text-sm text-neutral-600">Posisi : {apply[2] || 'Blank'} - {apply[3] || 'Blank'}</p>
                            <p className="text-sm text-neutral-600"> Penempatan : {apply[4] || 'Blank'}</p>

                            <p className="text-sm text-neutral-600 mb-5">Status Lamaran :
                                <span className={`ml-2 px-3 rounded-full text-xs font-medium ${getStatusStyle(apply[14])}`}>
                                    {apply[14] || '-'}
                                </span>
                            </p>
                            <hr />

                            <table>
                                <tbody>
                                    <tr>
                                        <td>Nama</td>
                                        <td>:</td>
                                        <td>{apply[5] || 'Blank'}</td>
                                    </tr>
                                    <tr>
                                        <td>Jenis Kelamin</td>
                                        <td>:</td>
                                        <td>{apply[7] || 'Blank'}</td>
                                    </tr>
                                    <tr>
                                        <td>Kontak</td>
                                        <td>:</td>
                                        <td>0{apply[6] || 'Blank'}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal Lahir</td>
                                        <td>:</td>
                                        <td>{apply[8]?.slice(0, 10) || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Domisili</td>
                                        <td>:</td>
                                        <td>{apply[9] || 'Blank'}</td>
                                    </tr>
                                    <tr>
                                        <td>Kota Domisili</td>
                                        <td>:</td>
                                        <td>{apply[10] || 'Blank'}</td>
                                    </tr>
                                    <tr>
                                        <td>Pendidikan Terakhir</td>
                                        <td>:</td>
                                        <td>{apply[11] || 'None'}</td>
                                    </tr>
                                    <tr>
                                        <td>Asal Sekolah</td>
                                        <td>:</td>
                                        <td>{apply[12] || 'None'} - {apply[13] || 'None'}</td>
                                    </tr>
                                    <tr>
                                        <td>Pengalaman Kerja</td>
                                        <td>:</td>
                                        <td>{apply[16] || 'Blank'}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>




                    <p className="text-sm text-gray-400 italic pt-12">Note : Silahkan hubungi kami untuk  konfirmasi pembayaran dan informasi lebih lanjut</p>
                    <h3 className="font-bold pt-1">VIGRE GIFT</h3>
                    <p className="text-sm">JL. KS Tubun Dalam, RT.14, No. 25, Dadi Mulya Samarinda, Kalimantan Timur</p>
                    <p className="text-sm">WhatsApp : 0838-4999-5556</p>
                    <p className="text-sm text-gray-400">-</p>
                </div> */}
                <div
                    ref={containerRef}
                    className="bg-white w-[794px] min-h-[1123px] mx-auto p-10 shadow-lg rounded-md border border-gray-200"
                >
                    {/* HEADER */}
                    <div className="text-center border-b pb-6 mb-8">
                        <h1 className="text-2xl font-bold tracking-wide">
                            LAMARAN KERJA
                        </h1>
                        <p className="text-sm text-gray-500 mt-2">
                            Dokumen Informasi Pelamar
                        </p>
                    </div>

                    {/* SECTION 1 - INFO LAMARAN */}
                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                                Informasi Lamaran
                            </h3>

                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Nomor :</span> {apply[0] || "-"}</p>
                                <p><span className="font-medium">Tanggal :</span> {apply[15]?.slice(0, 10) || "-"}</p>
                                <p><span className="font-medium">Posisi :</span> {apply[2]} - {apply[3]}</p>
                                <p><span className="font-medium">Penempatan :</span> {apply[4]}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                                    Status
                                </h3>

                                <span
                                    className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${getStatusStyle(apply[14])}`}
                                >
                                    {apply[14] || "-"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2 - DATA PELAMAR */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                            Data Pelamar
                        </h3>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-sm">
                            <div>
                                <p className="text-gray-500">Nama</p>
                                <p className="font-medium">{apply[5] || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Jenis Kelamin</p>
                                <p className="font-medium">{apply[7] || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Kontak</p>
                                <p className="font-medium">0{apply[6] || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Tanggal Lahir</p>
                                <p className="font-medium">{apply[8]?.slice(0, 10) || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Domisili</p>
                                <p className="font-medium">{apply[9] || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Kota</p>
                                <p className="font-medium">{apply[10] || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Pendidikan</p>
                                <p className="font-medium">{apply[11] || "-"}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Sekolah / Jurusan</p>
                                <p className="font-medium">
                                    {apply[12] || "-"} - {apply[13] || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3 - PENGALAMAN */}
                    <div className="mt-10">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                            Pengalaman Kerja
                        </h3>

                        <div className="border rounded-md p-4 bg-gray-50 text-sm leading-relaxed">
                            {apply[16] || "Tidak ada pengalaman"}
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default ApplyJobStatus;
