import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { IMAGES } from '../../data/images.js';

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative bg-primary py-20 md:py-28 overflow-hidden text-white"
    >
      {/* Background Outdoor Seating Image at 20% opacity + Dark Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <img
          src={IMAGES.outdoorSeating.src}
          alt=""
          width={IMAGES.outdoorSeating.width}
          height={IMAGES.outdoorSeating.height}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary-dark/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/90 border border-gold/40 text-gold-light text-xs sm:text-sm font-bold mb-6">
          <Clock className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
          <span>مفتوح 24 ساعة يومياً بدون انقطاع</span>
        </div>

        <h2
          id="final-cta-heading"
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight text-balance mb-4"
        >
          مستنيينكم تعيشوا تجربة مختلفة!
        </h2>

        <p className="text-base sm:text-xl text-cream-muted/90 max-w-xl mx-auto mb-9 leading-relaxed">
          زورونا واستمتعوا بالأكل المصري الأصيل والأجواء العائلية.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={BUSINESS_INFO.phoneTel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient text-primary font-bold text-base px-8 py-4 shadow-xl hover:brightness-110 transition-all min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>اتصل بينا</span>
            <span className="font-num" dir="ltr">
              ({BUSINESS_INFO.phone})
            </span>
          </a>

          <a
            href="#location"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-bold text-base px-8 py-4 transition-colors min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Navigation
              className="w-5 h-5 text-gold-light shrink-0"
              aria-hidden="true"
            />
            <span>اعرف طريقنا</span>
          </a>
        </div>

        <p className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-cream-muted/75">
          <MapPin className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
          <span>
            طريق القاهرة - الإسكندرية الزراعي، مركز إيتاي البارود، محافظة
            البحيرة
          </span>
        </p>
      </div>
    </section>
  );
}
