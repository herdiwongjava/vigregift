import React, { useState } from 'react';
import { applyJob } from '../../services/jobService';

export function ApplyJobForm({ selectedJob, onCreated, onFound }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    no_hp: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    alamat: '',
    kota: '',
    pendidikan: '',
    sekolah: '',
    jurusan: '',
    pengalaman: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.nama.trim()) return 'Nama harus diisi';
    if (!formData.no_hp.trim()) return 'Nomor HP harus diisi';
    if (!formData.jenis_kelamin) return 'Jenis kelamin harus dipilih';
    if (!formData.tanggal_lahir) return 'Tanggal lahir harus diisi';
    if (!formData.alamat.trim()) return 'Alamat harus diisi';
    if (!formData.kota.trim()) return 'Kota harus diisi';
    if (!formData.pendidikan) return 'Pendidikan harus dipilih';
    if (!formData.sekolah.trim()) return 'Sekolah/Universitas harus diisi';
    if (!formData.jurusan.trim()) return 'Jurusan harus diisi';
    if (!formData.pengalaman.trim()) return 'Pengalaman kerja harus diisi';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!selectedJob) {
      setError('Data lowongan tidak valid');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id_job: selectedJob.ID_JOB,
        nama_job: selectedJob.NAMA_JOB,
        type_job: selectedJob.TYPE,
        lokasi_job: selectedJob.LOKASI,
        nama: formData.nama,
        no_hp: formData.no_hp.replace(/\D/g, ''), // Remove non-digits
        jenis_kelamin: formData.jenis_kelamin,
        tanggal_lahir: formData.tanggal_lahir,
        alamat: formData.alamat,
        kota: formData.kota,
        pendidikan: formData.pendidikan,
        sekolah: formData.sekolah,
        jurusan: formData.jurusan,
        pengalaman: formData.pengalaman,
      };

      const response = await applyJob(payload);

      if (response?.status === 'success' && response?.id) {
        setSuccessId(response.id);
        // Fetch the submit data to show status
        // if (onFound) {
        //   setTimeout(() => {
        //     onCreated(response.id);
        //   }, 2000);
        // }
      } else {
        setError(response?.message || 'Gagal mengirim lamaran');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Gagal mengirim lamaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (successId) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-700 mb-2">Lamaran Berhasil Dikirim!</h3>
          <p className="text-green-600 mb-4">
            Nomor Lamaran Anda: <span className="font-bold text-xl">{successId}</span>
          </p>
          <p className="text-sm text-green-600 mb-6">
            Silakan catat nomor lamaran ini untuk mengecek status lamaran Anda.
          </p>
          <button
            onClick={() => onCreated(successId)}
            className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  if (!selectedJob) {
    return (
      // <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 max-w-2xl mx-auto">
      //   <p className="text-center text-yellow-700">Silakan pilih lowongan terlebih dahulu</p>
      // </div>
      <div className="bg-white text-gray-800">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-white">
          <div className="max-w-6xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kariermu Berawal dari Sini ?
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Bangun masa depan profesionalmu bersama kami. Tumbuh, belajar, dan
              berkembang dalam lingkungan yang dinamis dan penuh peluang.
            </p>
            {/* 
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition">
                Lihat Lowongan
              </button>
              <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-orange-600 transition">
                Kirim CV
              </button>
            </div> */}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Bangun Masa Depan Bersama Kami</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Kami adalah usaha yang sedang bertumbuh dan berkembang. Sebagai
              perusahaan yang merintis, kami percaya bahwa setiap langkah besar
              dimulai dari kesempatan pertama. Kami membuka peluang bagi individu
              yang ingin membangun pengalaman nyata dan berkembang bersama.
            </p>
          </div>

          {/* VALUE CARDS */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">
                Pengalaman Nyata
              </h3>
              <p className="text-gray-600">
                Terlibat langsung dalam proses pengembangan bisnis dan belajar
                dari situasi nyata dunia kerja.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">
                Pengembangan Diri
              </h3>
              <p className="text-gray-600">
                Mengasah keterampilan teknis dan soft skill untuk membentuk
                karakter profesional yang tangguh.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">
                Lingkungan Bertumbuh
              </h3>
              <p className="text-gray-600">
                Budaya kerja kolaboratif, suportif, dan penuh tantangan sebagai
                batu loncatan karier jangka panjang.
              </p>
            </div>
          </div>
        </section>

        {/* WHO WE ARE LOOKING FOR */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">Siapa yang Kami Cari?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami mencari individu yang siap bertumbuh bersama dan membangun
                sesuatu yang besar dari awal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  Memiliki semangat belajar tinggi
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  Bertanggung jawab dan disiplin
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  Terbuka terhadap tantangan
                </li>
              </ul>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  Siap berkembang bersama perusahaan
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  Memiliki mindset bertumbuh
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  Ingin membangun pengalaman dari nol
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">
              Tumbuh Bersama, Sukses Bersama
            </h2>
            <p className="text-gray-600 mb-8">
              Jadilah bagian dari perjalanan kami membangun sesuatu yang besar
              dari awal. Karier bukan hanya tentang bekerja, tetapi tentang
              bertumbuh.
            </p>

            {/* <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition font-semibold">
              Mulai Perjalananmu Sekarang
            </button> */}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Formulir Lamaran Kerja</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Posisi:</span> {selectedJob.NAMA_JOB}
          </p>
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Tipe:</span> {selectedJob.TYPE} - {selectedJob.JAM_KERJA} Jam Kerja
          </p>
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Lokasi:</span> {selectedJob.LOKASI}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ROW 1: Nama & Jenis Kelamin */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Jenis Kelamin *
            </label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>

        {/* ROW 2: No HP & Tanggal Lahir */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Nomor HP *
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              placeholder="08xx xxxx xxxx"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tanggal Lahir *
            </label>
            <input
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* ROW 3: Alamat & Kota */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Alamat *
            </label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Alamat rumah"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Kota/Kabupaten *
            </label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              placeholder="Masukkan kota"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* ROW 4: Pendidikan & Sekolah */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Pendidikan Terakhir *
            </label>
            <select
              name="pendidikan"
              value={formData.pendidikan}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Pilih Pendidikan</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="Diploma">Diploma</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Nama Sekolah/Universitas *
            </label>
            <input
              type="text"
              name="sekolah"
              value={formData.sekolah}
              onChange={handleChange}
              placeholder="Sekolah/Universitas"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* ROW 5: Jurusan */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Jurusan/Program Studi *
          </label>
          <input
            type="text"
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            placeholder="Jurusan/Program Studi"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* ROW 6: Pengalaman */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Pengalaman Kerja *
          </label>
          <textarea
            name="pengalaman"
            value={formData.pengalaman}
            onChange={handleChange}
            placeholder="Tuliskan pengalaman kerja Anda (posisi, perusahaan, tahun)"
            rows="4"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Jika belum memiliki pengalaman, tuliskan "Belum memiliki pengalaman kerja"
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Mengirim...' : 'Kirim Lamaran'}
          </button>
          <button
            type="button"
            onClick={() => onCreated?.(null)}
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplyJobForm;