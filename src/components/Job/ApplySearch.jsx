import React, { useState, useEffect, } from 'react';
import { getApplyById } from '../../services/jobService';
import { getAllJobs } from '../../services/jobService';
import { formatCurrency } from '../../utils/formatCurrency';
import { useMetadata } from '../../context/MetadataContext';
import { Link } from 'react-router-dom';

export function ApplySearch({ onFound, onApply }) {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [searching, setSearching] = useState(false);
    const { storeDetail } = useMetadata();
    const phone = (storeDetail?.phoneStore ?? '6285821233817').replace(/\D/g, '');


    useEffect(() => {
        async function loadData() {
            const data = await getAllJobs();
            // console.log('jobs', data);
            setJobs(data);
        }

        loadData();
    }, []);


    const waMessage = encodeURIComponent(
        [
            'Halo VIGRE GROUP, ',
            'Perkenalkan nama saya :',
            'Saya berminat untuk melamar kerja di bisnis anda,',
            `berikut saya lampirkan dokumen CV saya.`,
            '',
            `Besar harapan saya untuk bisa bergabung dan berkembang bersama VIGRE GROUP.`,
            `Demikian terima kasih.`,
        ].join('\n')
    );

    const waLink = `https://wa.me/${phone}?text=${waMessage}`;

    const handleSearch = async () => {
        setError(null);
        if (!id) return setError('Masukkan nomor Lamaran kamu');

        // Normalisasi ID
        let formattedId = id.trim();
        if (!formattedId.toUpperCase().startsWith('TEAM-')) {
            formattedId = `TEAM-${formattedId}`;
        }
        setLoading(true);
        try {
            const res = await getApplyById(formattedId);
            if (res?.status === 'success' && res.apply) {
                onFound(res);
                setSearching(true);
                // console.log('resClient', res);

            } else {
                setError('Lamaran kamu tidak ditemukan');
            }
        } catch (err) {
            setError('Gagal mengambil data lamaran. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mx-auto max-w-lg">
                    <label className="mb-2 block text-sm font-medium text-neutral-700">Cek Satus Lamaran Kamu</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Masukkan no lamaran kamu ya"
                            className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-400"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={loading}
                            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                            {loading ? 'Mencari...' : 'Lihat'}
                        </button>
                        {searching && (


                            <button
                                type="button"
                                onClick={() => {
                                    setSearching(false)
                                    onFound(null);
                                    setId('');
                                }}
                                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                            >
                                Lowongan lainnya
                            </button>
                        )}
                    </div>
                    {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
                </div>

            </div>



            {!searching && (
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h1 className="text-3xl font-bold mb-8">Daftar Lowongan</h1>


                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => {
                            const expiredDate = job.BERAKHIR ? new Date(job.BERAKHIR) : null;
                            const today = new Date();

                            const isExpired =
                                expiredDate && today.setHours(0, 0, 0, 0) > expiredDate.setHours(0, 0, 0, 0);


                            return (
                                <div
                                    key={job.ID_JOB}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-500 hover:shadow-2xl"
                                >
                                    {/* IMAGE */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={job.IMAGE_URL}
                                            alt={job.NAMA_JOB}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />

                                        {/* Deadline badge */}
                                        {expiredDate && (
                                            <div
                                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow backdrop-blur ${isExpired
                                                        ? "bg-gray-200 text-gray-600"
                                                        : "bg-white/90 text-gray-800"
                                                    }`}
                                            >
                                                {isExpired ? (
                                                    "❌ Berakhir"
                                                ) : (
                                                    <>
                                                        ⏳ {expiredDate.toLocaleDateString("id-ID", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-5">
                                        <div className='flex justify-between items-center'>

                                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                                                {job.NAMA_JOB}
                                            </h3>

                                            {/* Type Badge */}
                                            <div className="mt-2">
                                                <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                    {job.TYPE} • {job.JAM_KERJA} Jam Kerja
                                                </span>
                                            </div>
                                        </div>
                                        {/* Title */}

                                        {/* Info */}
                                        <div className="mt-4 space-y-1 text-sm text-gray-600">
                                            <p>📍 {job.KOTA}</p>
                                            <p className='font-semibold'>{job.LOKASI}</p>
                                            <p>Dibutuhkan : {job.JENIS_KELAMIN}</p>

                                            {/* Clamp description */}
                                            <p className='pt-2 font-semibold'>Keterangan : </p>
                                            <p className="text-gray-500">
                                                {job.KETERANGAN}
                                            </p>
                                        </div>

                                        {/* Salary */}
                                        <div className="mt-5 text-green-600 font-semibold">
                                            💰 {formatCurrency(job.HONOR)} / Bulan
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-6 text-right">
                                            <button
                                                onClick={() => !isExpired && onApply?.(job)}
                                                disabled={isExpired}
                                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isExpired
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-primary-500 text-white hover:bg-primary-600"
                                                    }`}
                                            >
                                                {isExpired ? "Lowongan Ditutup" : "Kirim Lamaran"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {!jobs.length && (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                    <div className="max-w-2xl text-center">

                        {/* ICON */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-3xl">📭</span>
                        </div>

                        {/* TITLE */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Lowongan Belum Tersedia
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Saat ini kami belum membuka posisi yang tersedia. Namun kami selalu
                            terbuka untuk talenta terbaik yang ingin berkembang dan bertumbuh
                            bersama kami.
                        </p>

                        <p className="text-gray-600 mb-10 leading-relaxed">
                            Silakan kirimkan CV dan portofolio Anda kepada kami. Kami akan
                            menghubungi Anda ketika ada posisi yang sesuai.
                        </p>

                        {/* CTA BUTTON */}
                        <div className="flex justify-center gap-4 flex-wrap">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
                            >
                                <i className="fa-brands fa-whatsapp text-sm" />
                                <span>Kirim CV</span>
                            </a>

                            {/* <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                                Kembali ke Beranda
                            </button> */}

                            <Link to="/" className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition">Kembali ke Beranda</Link>
                        </div>

                        {/* FOOT NOTE */}
                        <div className="mt-12 text-sm text-gray-400">
                            Terima kasih atas minat Anda untuk menjadi bagian dari perjalanan kami.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplySearch;