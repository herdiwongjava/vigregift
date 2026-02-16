export function formatCurrency(value) {
  if (typeof value !== 'number') return '-';

  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `${value}`;
  }
}

