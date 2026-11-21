import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { IMAGES } from '../../data/images.js';
import { Modal } from '../ui/Modal.jsx';

export function LightboxModal({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onChangeIndex,
}) {
  const touchStartXRef = useRef(null);
  const total = items.length;
  const safeIndex = total > 0 ? ((currentIndex % total) + total) % total : 0;
  const activeItem = items[safeIndex] || null;

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onChangeIndex((safeIndex - 1 + total) % total);
  }, [total, safeIndex, onChangeIndex]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onChangeIndex((safeIndex + 1) % total);
  }, [total, safeIndex, onChangeIndex]);

  useEffect(() => {
    if (!isOpen || total === 0) return undefined;

    const prevIdx = (safeIndex - 1 + total) % total;
    const nextIdx = (safeIndex + 1) % total;
    [prevIdx, nextIdx].forEach((idx) => {
      const key = items[idx]?.image;
      const meta = key ? IMAGES[key] : null;
      if (meta?.src) {
        const img = new Image();
        img.src = meta.src;
      }
    });

    const handleArrows = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleArrows);
    return () => document.removeEventListener('keydown', handleArrows);
  }, [isOpen, total, safeIndex, items, handlePrev, handleNext]);

  const imageMeta = activeItem?.image ? IMAGES[activeItem.image] : null;

  return (
    <Modal
      isOpen={isOpen && Boolean(activeItem)}
      onClose={onClose}
      labelledBy="lightbox-title"
      maxWidthClass="max-w-5xl"
      backdropClassName="bg-black/95 backdrop-blur-md"
      panelClassName="bg-transparent shadow-none"
    >
      {activeItem && (
        <div
          className="relative flex flex-col items-center justify-center px-2 sm:px-10 py-4 select-none"
          onTouchStart={(e) => {
            touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (total <= 1 || touchStartXRef.current === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
            const diff = endX - touchStartXRef.current;
            touchStartXRef.current = null;
            if (diff > 50) {
              handleNext();
            } else if (diff < -50) {
              handlePrev();
            }
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق المعرض"
            className="fixed top-4 left-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-primary text-white border border-white/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="الصورة السابقة"
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-primary text-white border border-white/20 items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="الصورة التالية"
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-primary text-white border border-white/20 items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}

          <div className="w-full flex justify-center">
            {imageMeta && (
              <img
                src={imageMeta.src}
                alt={activeItem.title || imageMeta.alt}
                width={imageMeta.width}
                height={imageMeta.height}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            )}
          </div>

          <div className="mt-5 text-center max-w-2xl px-4">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold text-primary text-xs font-bold">
                {activeItem.category}
              </span>
              <span className="text-xs text-cream-muted/75 font-medium">
                صورة{' '}
                <span className="font-num font-bold text-gold-light">
                  {safeIndex + 1}
                </span>{' '}
                من{' '}
                <span className="font-num font-bold text-gold-light">
                  {total}
                </span>
              </span>
            </div>

            <h3
              id="lightbox-title"
              className="text-lg sm:text-xl font-bold text-white mb-1"
            >
              {activeItem.title}
            </h3>
            <p className="text-sm text-cream-muted/80 leading-relaxed">
              {activeItem.description}
            </p>
            {total > 1 && (
              <p className="mt-2 text-xs text-gold-light/70 md:hidden">
                اسحب يميناً أو يساراً للتنقل بين الصور
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
