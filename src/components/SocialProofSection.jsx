import React from 'react';
import { useMetadata } from '../context/MetadataContext';

// const testimonials = [
//   {
//     name: 'Alya, Samarinda',
//     role: 'Customer personal gift',
//     avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
//     quote:
//       'Begitu paket dibuka, penerima langsung kirim foto dan bilang, “Ini cantik banget!” Detailnya rapi dan terasa sangat personal.'
//   },
//   {
//     name: 'Daniel, Kutai Kartanegara',
//     role: 'Corporate client',
//     avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
//     quote:
//       'Tim VIGRE GIFT sangat membantu dari sisi konsep hingga pengiriman. Klien kami senang, brand kami pun terlihat lebih hangat dan profesional.'
//   },
//   {
//     name: 'Rani, Sanga-sanga',
//     role: 'Customer ulang tahun',
//     avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
//     quote:
//       'Saya hanya share sedikit tentang karakter sahabat saya, dan hasil hampers-nya benar-benar menggambarkan dia. Rasanya seperti hadiah yang dibuat khusus.'
//   }
// ];

export function SocialProofSection() {
  const { socialProofDetail : {testimonials} } = useMetadata();

  return (
    <section id="testimonials" className="container-page py-10 sm:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">
            Mereka sudah lebih dulu bahagia
          </p>
          <h2 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
            Social proof yang membuktikan hampers Anda sampai dengan pesan yang tepat.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-600">
            Dari ucapan terima kasih yang sederhana hingga pengiriman ratusan hampers corporate,
            VIGRE GIFT dipercaya karena perhatian pada detail dan komunikasi yang hangat.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-neutral-900">{item.name}</p>
                <p className="text-[11px] text-neutral-500">{item.role}</p>
              </div>
            </div>
            <blockquote className="text-xs leading-relaxed text-neutral-600">
              “{item.quote}”
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

