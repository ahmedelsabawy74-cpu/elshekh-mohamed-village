import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  BACK_TO_TOP_THRESHOLD,
  calculateRingStrokeOffset,
  calculateScrollProgress,
  shouldShowBackToTop,
} from '../../lib/scrollProgress.js';

const RING_SIZE = 56;
const STROKE_WIDTH = 3;
const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTopButton({ hidden = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const progressCircleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docEl = document.documentElement;
      const scrollHeight = docEl.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = window.innerHeight || docEl.clientHeight || 0;

      const progress = calculateScrollProgress(
        scrollY,
        scrollHeight,
        clientHeight
      );
      const offset = calculateRingStrokeOffset(CIRCUMFERENCE, progress);
      const percent = Math.round(progress * 100);

      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = String(offset);
      }
      if (buttonRef.current) {
        buttonRef.current.dataset.scrollProgress = String(percent);
      }

      const nextVisible = shouldShowBackToTop(scrollY, BACK_TO_TOP_THRESHOLD);
      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (hidden) return null;

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-30 group transition-[opacity,transform] duration-200 ease-out ${
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleScrollToTop}
          aria-label="العودة إلى أعلى الصفحة"
          aria-hidden={!isVisible}
          tabIndex={isVisible ? 0 : -1}
          data-visible={isVisible ? 'true' : 'false'}
          data-scroll-progress="0"
          className="relative w-14 h-14 rounded-full bg-primary/95 hover:bg-primary-light text-gold-light hover:text-white shadow-xl backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>

        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <defs>
            <linearGradient
              id="backToTopGoldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#DFC085" />
              <stop offset="100%" stopColor="#C49A52" />
            </linearGradient>
          </defs>

          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(196, 154, 82, 0.25)"
            strokeWidth={STROKE_WIDTH}
          />

          <circle
            ref={progressCircleRef}
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#backToTopGoldGradient)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </svg>
      </div>

      <span
        role="tooltip"
        className="hidden md:flex items-center pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg bg-primary-dark text-white text-xs font-bold px-3 py-1.5 shadow-lg border border-gold/30"
      >
        العودة للأعلى
      </span>
    </div>
  );
}
