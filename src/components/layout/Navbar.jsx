import { useEffect, useState } from 'react';
import { CalendarCheck, Menu, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { GoldButton } from '../ui/GoldButton.jsx';

export const NAV_LINKS = [
  { id: 'hero', label: 'الرئيسية', href: '#hero' },
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'experience', label: 'تجربة القرية', href: '#experience' },
  { id: 'menu', label: 'المنيو', href: '#menu' },
  { id: 'gallery', label: 'معرض الصور', href: '#gallery' },
  { id: 'location', label: 'الموقع', href: '#location' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
];

export function Navbar({
  navRef,
  activeSection,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenBooking,
  animateIn = false,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="التنقل الرئيسي"
      className={`transition-colors duration-150 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-gold/30 py-2.5'
          : 'bg-primary border-b border-gold/15 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo (Right in RTL) */}
        <a
          href="#hero"
          style={animateIn ? { animationDelay: '120ms' } : undefined}
          className={`flex flex-col leading-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg px-1 ${
            animateIn ? 'animate-nav-item' : 'opacity-0'
          }`}
        >
          <span className="text-white font-black text-base sm:text-lg md:text-xl whitespace-nowrap">
            {BUSINESS_INFO.shortName}
          </span>
          <span className="text-gold-light text-[11px] sm:text-xs font-semibold whitespace-nowrap">
            {BUSINESS_INFO.subName}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeSection === link.id;
            return (
              <li
                key={link.id}
                style={
                  animateIn
                    ? { animationDelay: `${160 + index * 35}ms` }
                    : undefined
                }
                className={`relative ${
                  animateIn ? 'animate-nav-item' : 'opacity-0'
                }`}
              >
                <a
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative inline-block py-2 text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded ${
                    isActive
                      ? 'text-gold-light'
                      : 'text-cream-muted/90 hover:text-gold-light'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 left-0 h-0.5 bg-gold rounded-full"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 h-0.5 w-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Actions & Mobile Toggle */}
        <div
          style={animateIn ? { animationDelay: '280ms' } : undefined}
          className={`flex items-center gap-2.5 shrink-0 ${
            animateIn ? 'animate-nav-item' : 'opacity-0'
          }`}
        >
          <a
            href={BUSINESS_INFO.phoneTel}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary-light text-white text-xs xl:text-sm font-bold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[42px]"
          >
            <Phone className="w-4 h-4 text-gold-light shrink-0" aria-hidden="true" />
            <span className="font-num" dir="ltr">
              {BUSINESS_INFO.phone}
            </span>
          </a>

          <div className="hidden sm:inline-flex">
            <GoldButton
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs xl:text-sm whitespace-nowrap min-h-[42px]"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>احجز طاولة / استفسار</span>
            </GoldButton>
          </div>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="lg:hidden w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-gold/25 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
