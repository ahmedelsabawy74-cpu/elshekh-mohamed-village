import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CalendarCheck, ChevronLeft, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import { NAV_LINKS } from './Navbar.jsx';
import { GoldButton } from '../ui/GoldButton.jsx';

export function MobileMenu({
  isOpen,
  onClose,
  topOffset = 68,
  activeSection,
  onOpenBooking,
}) {
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined' || !isOpen) return null;

  // Rendered as a portal on document.body (outside blurred <nav>) so position: fixed
  // is never clamped to the navbar height when the page is scrolled (fixes Issue 1).
  return createPortal(
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="قائمة التنقل"
      style={{ top: `${topOffset}px` }}
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-primary-dark/98 backdrop-blur-md border-t border-gold/25 overflow-y-auto flex flex-col justify-between"
    >
      <nav aria-label="روابط الجوال" className="px-5 py-6">
        <ul className="space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className={`group relative flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold transition-colors overflow-hidden min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive
                      ? 'bg-primary text-gold-light border border-gold/30'
                      : 'text-cream-muted hover:bg-primary/60 hover:text-gold-light'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-2 bottom-2 w-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span>{link.label}</span>
                  <ChevronLeft
                    className="w-4 h-4 text-gold/70 group-hover:text-gold-light"
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-5 pb-8 pt-4 border-t border-gold/20 bg-primary/40 space-y-3">
        <GoldButton
          onClick={() => {
            onClose();
            onOpenBooking();
          }}
          className="w-full py-3.5 px-5 text-base min-h-[48px]"
        >
          <CalendarCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>احجز طاولة / استفسار سريع</span>
        </GoldButton>

        <a
          href={BUSINESS_INFO.phoneTel}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-secondary hover:bg-secondary-light text-white font-bold text-base py-3.5 px-5 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <Phone className="w-5 h-5 text-gold-light shrink-0" aria-hidden="true" />
          <span>اتصل الآن:</span>
          <span className="font-num" dir="ltr">
            {BUSINESS_INFO.phone}
          </span>
        </a>
      </div>
    </div>,
    document.body
  );
}
