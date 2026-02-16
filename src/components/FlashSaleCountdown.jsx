import React, { useEffect, useState } from 'react';

function parseDate(str) {
  if (!str || typeof str !== 'string') return null;
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function useFlashSaleCountdown(promoDetail) {
  const endDate = parseDate(promoDetail?.promoEndDate);
  const [now, setNow] = useState(() => Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!endDate) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [endDate]);

  if (!mounted || !endDate) return { expired: true, remaining: null };

  const remaining = Math.max(0, endDate - now);
  const expired = remaining === 0;

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  return {
    expired,
    remaining: expired ? null : { days, hours, minutes, seconds },
    endDate
  };
}

export function FlashSaleCountdownDisplay({ promoDetail }) {
  const { expired, remaining } = useFlashSaleCountdown(promoDetail);

  if (expired || !remaining) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-3 py-2 text-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-700">Berakhir dalam</span>
      <span className="flex items-center gap-1 font-mono font-semibold text-primary-800">
        <span className="rounded bg-white px-1.5 py-0.5 shadow">{pad(remaining.days)}</span>
        <span className="text-primary-600">:</span>
        <span className="rounded bg-white px-1.5 py-0.5 shadow">{pad(remaining.hours)}</span>
        <span className="text-primary-600">:</span>
        <span className="rounded bg-white px-1.5 py-0.5 shadow">{pad(remaining.minutes)}</span>
        <span className="text-primary-600">:</span>
        <span className="rounded bg-white px-1.5 py-0.5 shadow animate-pulse">{pad(remaining.seconds)}</span>
      </span>
    </div>
  );
}
