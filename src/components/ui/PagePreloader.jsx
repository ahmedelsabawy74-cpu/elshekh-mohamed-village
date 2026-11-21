import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../../data/images.js';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { collectPreloadUrls, preloadSiteAssets } from '../../lib/preloader.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';

// ====== عدّل الأرقام دي براحتك ======
const MIN_DURATION_MS = 3000; // أقل وقت يفضل فيه الشريط يتحرك (حتى لو الصور جاهزة)
const END_HOLD_MS = 700;      // بيفضل واقف على 100% قبل ما يختفي
const FADE_MS = 600;          // مدة الاختفاء (fade out)
// ====================================

// بيخلي الشريط سريع في الأول وبطيء في الآخر
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function PagePreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const realProgressRef = useRef(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useBodyScrollLock(isVisible && !isFadingOut);

  useEffect(() => {
    let active = true;
    let rafId;
    let holdTimer;
    let unmountTimer;
    const startTime = performance.now();
    const urls = collectPreloadUrls(IMAGES);

    // التحميل الفعلي للصور
    preloadSiteAssets({
      urls,
      maxWaitMs: 3500,
      onProgress: (pct) => {
        realProgressRef.current = pct;
      },
    }).then(() => {
      realProgressRef.current = 100;
    });

    const finish = () => {
      holdTimer = window.setTimeout(() => {
        if (!active) return;
        setIsFadingOut(true);
        onCompleteRef.current?.();
        unmountTimer = window.setTimeout(() => {
          if (active) setIsVisible(false);
        }, FADE_MS);
      }, END_HOLD_MS);
    };

    // الشريط بياخد الأقل بين: التحميل الفعلي، والتقدم الزمني
    const tick = (now) => {
      if (!active) return;
      const t = Math.min(1, (now - startTime) / MIN_DURATION_MS);
      const timePct = easeOutCubic(t) * 100;
      const target = Math.min(realProgressRef.current, timePct);

      // ما يوصلش 100 إلا لما الوقت يخلص والصور تخلص
      const done = t >= 1 && realProgressRef.current >= 100;
      const value = done ? 100 : Math.min(99, Math.round(target));

      setProgress((prev) => Math.max(prev, value));

      if (done) {
        finish();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (holdTimer) window.clearTimeout(holdTimer);
      if (unmountTimer) window.clearTimeout(unmountTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="site-preloader"
      role="status"
      aria-live="polite"
      aria-label={`جاري تجهيز ${BUSINESS_INFO.arabicName}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      className={`fixed inset-0 z-[100] bg-primary-dark text-white flex flex-col items-center justify-center px-6 text-center transition-opacity ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-xl mb-5">
          <span className="font-black text-primary text-2xl leading-none">
            ش.م
          </span>
        </div>

        <p className="text-xl sm:text-2xl font-black text-white mb-1">
          {BUSINESS_INFO.shortName}
        </p>
        <p className="text-xs sm:text-sm font-semibold text-gold-light mb-6">
          {BUSINESS_INFO.subName}
        </p>

        <div className="w-full h-2.5 rounded-full bg-white/10 border border-gold/25 overflow-hidden mb-3">
          <div
            className="h-full bg-gold-gradient transition-[width] duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-xs text-cream-muted/85 font-semibold">
          <span>جاري تحميل الصور والقائمة...</span>
          <span className="font-num text-gold-light font-bold" dir="ltr">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}