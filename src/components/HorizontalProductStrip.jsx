import React, { useRef, useState } from 'react';
import { ProductCard } from './ProductCard';

export function HorizontalProductStrip({
  products,
  waUrl,
  title,
  subtitle,
  backgroundColor = 'bg-white',
  cardClassName = '',
  textStyle,
  iconStyle,
  showArrows = true,
  isFlashSaleStrip = false
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
    setTimeout(updateScrollState, 300);
  };

  React.useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [products?.length]);

  if (!products?.length) return null;

  
  return (
    <div className={`overflow-hidden rounded-2xl border border-neutral-200 ${backgroundColor} p-4`}>
      {(title || subtitle) && (
        <div className="mb-3 flex items-center space-x-2">
          <i className={`fa-solid ${iconStyle} text-2xl ${textStyle}`} />
          <div>
            {title && <p className={`text-lg uppercase font-bold ${textStyle}`}>{title}</p>}
            {subtitle && <p className={`text-xs ${textStyle}`}>{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="relative">
        {showArrows && (
          <>
            <button
              type="button"
              onClick={() => scroll('left')}
              onMouseDown={(e) => e.preventDefault()}
              className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 shadow-md transition-opacity ${canScrollLeft ? 'opacity-100 hover:bg-neutral-50' : 'pointer-events-none opacity-40'}`}
              aria-label="Scroll kiri"
            >
              <i className="fa-solid fa-chevron-left text-xs text-neutral-700" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              onMouseDown={(e) => e.preventDefault()}
              className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 shadow-md transition-opacity ${canScrollRight ? 'opacity-100 hover:bg-neutral-50' : 'pointer-events-none opacity-40'}`}
              aria-label="Scroll kanan"
            >
              <i className="fa-solid fa-chevron-right text-xs text-neutral-700" />
            </button>
          </>
        )}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-thin"
          style={{ scrollbarWidth: 'thin' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex-shrink-0 ${cardClassName}`}
              style={{ minWidth: '240px', maxWidth: '280px' }}
            >
              <ProductCard product={product} waUrl={waUrl} isFlashSaleCard={isFlashSaleStrip} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
