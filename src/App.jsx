import { useCallback, useMemo, useRef, useState } from 'react';
import { SEATING_OPTIONS } from './data/businessInfo.js';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { PagePreloader } from './components/ui/PagePreloader.jsx';
import { BackToTopButton } from './components/ui/BackToTopButton.jsx';
import { TopBar } from './components/layout/TopBar.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { MobileMenu } from './components/layout/MobileMenu.jsx';
import { FloatingActions } from './components/layout/FloatingActions.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { AboutUs } from './components/sections/AboutUs.jsx';
import { VillageExperience } from './components/sections/VillageExperience.jsx';
import { MenuSection } from './components/sections/MenuSection.jsx';
import { GallerySection } from './components/sections/GallerySection.jsx';
import { ReviewsSection } from './components/sections/ReviewsSection.jsx';
import { LocationAndContact } from './components/sections/LocationAndContact.jsx';
import { FinalCTA } from './components/sections/FinalCTA.jsx';
import { BookingModal } from './components/modals/BookingModal.jsx';
import { MenuInquiryModal } from './components/modals/MenuInquiryModal.jsx';
import { LightboxModal } from './components/modals/LightboxModal.jsx';

export default function App() {
  const navRef = useRef(null);
  const sectionIds = useMemo(
    () => [
      'hero',
      'about',
      'experience',
      'menu',
      'gallery',
      'reviews',
      'location',
      'contact',
    ],
    []
  );
  const activeSection = useScrollSpy(sectionIds, 160);
  const [preloadDone, setPreloadDone] = useState(false);

  const handlePreloadComplete = useCallback(() => {
    setPreloadDone(true);
  }, []);

  const [mobileMenuState, setMobileMenuState] = useState({
    isOpen: false,
    topOffset: 68,
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    serviceType: SEATING_OPTIONS[0],
    openCount: 0,
  });

  const [menuInquiryModal, setMenuInquiryModal] = useState({
    isOpen: false,
    dishName: '',
  });

  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    items: [],
    currentIndex: 0,
  });

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuState((prev) => {
      if (prev.isOpen) {
        return { ...prev, isOpen: false };
      }
      const rect = navRef.current?.getBoundingClientRect();
      const topOffset = rect ? Math.max(56, Math.round(rect.bottom)) : 68;
      return { isOpen: true, topOffset };
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openBooking = useCallback((serviceType = SEATING_OPTIONS[0]) => {
    setBookingModal((prev) => ({
      isOpen: true,
      serviceType: SEATING_OPTIONS.includes(serviceType)
        ? serviceType
        : SEATING_OPTIONS[0],
      openCount: prev.openCount + 1,
    }));
  }, []);

  const closeBooking = useCallback(() => {
    setBookingModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openMenuInquiry = useCallback((dishName = '') => {
    setMenuInquiryModal({ isOpen: true, dishName });
  }, []);

  const closeMenuInquiry = useCallback(() => {
    setMenuInquiryModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openLightbox = useCallback((items, index) => {
    setLightboxState({
      isOpen: true,
      items,
      currentIndex: index,
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const setLightboxIndex = useCallback((nextIndex) => {
    setLightboxState((prev) => ({ ...prev, currentIndex: nextIndex }));
  }, []);

  const anyOverlayOpen =
    mobileMenuState.isOpen ||
    bookingModal.isOpen ||
    menuInquiryModal.isOpen ||
    lightboxState.isOpen;

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal antialiased">
      <PagePreloader onComplete={handlePreloadComplete} />

      {/* Skip to main content link for keyboard & screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-xl focus:bg-gold focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-primary focus:shadow-xl"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      <header
        className={`sticky top-0 z-40 ${
          preloadDone
            ? 'animate-header-enter'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <TopBar />
        <Navbar
          navRef={navRef}
          activeSection={activeSection}
          mobileMenuOpen={mobileMenuState.isOpen}
          onToggleMobileMenu={toggleMobileMenu}
          onOpenBooking={openBooking}
          animateIn={preloadDone}
        />
      </header>

      {/* Portal-rendered sibling outside blurred <nav> (fixes Issue 1) */}
      <MobileMenu
        isOpen={mobileMenuState.isOpen}
        onClose={closeMobileMenu}
        topOffset={mobileMenuState.topOffset}
        activeSection={activeSection}
        onOpenBooking={openBooking}
      />

      <main id="main-content" className="flex-1">
        <Hero onOpenBooking={openBooking} animateIn={preloadDone} />
        <AboutUs />
        <VillageExperience onOpenBooking={openBooking} />
        <MenuSection onOpenMenuInquiry={openMenuInquiry} />
        <GallerySection onOpenLightbox={openLightbox} />
        <ReviewsSection />
        <LocationAndContact />
        <FinalCTA />
      </main>

      <Footer />

      <FloatingActions hidden={anyOverlayOpen} />
      <BackToTopButton hidden={anyOverlayOpen} />

      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={closeBooking}
        initialServiceType={bookingModal.serviceType}
        openCount={bookingModal.openCount}
      />

      <MenuInquiryModal
        isOpen={menuInquiryModal.isOpen}
        onClose={closeMenuInquiry}
        dishName={menuInquiryModal.dishName}
      />

      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        items={lightboxState.items}
        currentIndex={lightboxState.currentIndex}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}
