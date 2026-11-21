import {
  ChevronDown,
  Clock,
  MapPin,
  PhoneCall,
  Sparkles,
  Star,
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { IMAGES } from '../../data/images.js';
import { GoldButton } from '../ui/GoldButton.jsx';

export function Hero({ onOpenBooking, animateIn = false }) {
  const titleWordsLine1 = ['أهلاً', 'بيكم', 'في'];
  const titleWordsLine2 = ['قرية', 'الشيخ', 'محمد', 'الجديدة'];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100svh-68px)] md:min-h-[calc(100svh-104px)] flex items-center justify-center overflow-hidden bg-primary-dark text-white scroll-mt-24 py-14 sm:py-20"
    >
      {/* Hero Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={IMAGES.hero.src}
          alt=""
          width={IMAGES.hero.width}
          height={IMAGES.hero.height}
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to top, #0f2921 0%, rgba(23, 61, 50, 0.75) 50%, rgba(23, 61, 50, 0.85) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, transparent 25%, rgba(15, 41, 33, 0.9) 100%)',
          }}
        />
      </div>

      {/* Top Subtle Gold Hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Rating Pill */}
        <div
          style={animateIn ? { animationDelay: '120ms' } : undefined}
          className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-primary/90 border border-gold/45 backdrop-blur-sm shadow-lg text-xs sm:text-sm font-semibold text-cream-muted mb-7 ${
            animateIn ? 'animate-hero-rise' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1 text-gold-light font-bold">
            <Star
              className="w-4 h-4 text-gold fill-gold shrink-0"
              aria-hidden="true"
            />
            <span className="font-num" dir="ltr">
              {BUSINESS_INFO.googleRating} / 5
            </span>
          </span>
          <span className="text-gold/50" aria-hidden="true">
            •
          </span>
          <span>
            <span className="font-num font-bold text-white">
              {BUSINESS_INFO.totalReviews.toLocaleString('en-US')}
            </span>{' '}
            تقييم على Google
          </span>
          <span className="text-gold/50 hidden sm:inline" aria-hidden="true">
            •
          </span>
          <span className="inline-flex items-center gap-1 text-gold-light">
            <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>وجهة العائلات الأولى</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.25] tracking-tight text-balance mb-5"
        >
          <span className="inline-flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 text-white">
            {titleWordsLine1.map((word, index) => (
              <span
                key={word}
                style={
                  animateIn
                    ? { animationDelay: `${200 + index * 65}ms` }
                    : undefined
                }
                className={`inline-block pb-1 ${
                  animateIn ? 'animate-hero-word' : 'opacity-0'
                }`}
              >
                {word}
              </span>
            ))}
          </span>{' '}
          <span className="flex sm:inline-flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 mt-1 sm:mt-0">
            {titleWordsLine2.map((word, index) => (
              <span
                key={word}
                style={
                  animateIn
                    ? {
                        animationDelay: `${
                          200 + (titleWordsLine1.length + index) * 65
                        }ms`,
                      }
                    : undefined
                }
                className={`inline-block pb-1 text-gold-gradient ${
                  animateIn ? 'animate-hero-word' : 'opacity-0'
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={animateIn ? { animationDelay: '640ms' } : undefined}
          className={`text-base sm:text-xl md:text-2xl font-medium text-cream-muted/95 max-w-2xl leading-relaxed mb-7 ${
            animateIn ? 'animate-hero-rise' : 'opacity-0'
          }`}
        >
          أكل بيتي أصيل.. أجواء عائلية.. وذكريات تستاهل تتعاش
        </p>

        {/* Glass Info Bar */}
        <div
          style={animateIn ? { animationDelay: '740ms' } : undefined}
          className={`inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 py-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/15 text-xs sm:text-sm text-cream-muted mb-9 ${
            animateIn ? 'animate-hero-rise' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 font-bold text-gold-light">
            <Clock className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
            <span>{BUSINESS_INFO.openingHours}</span>
          </span>
          <span className="text-white/25 hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
            <span>{BUSINESS_INFO.locationShort}</span>
          </span>
        </div>

        {/* 3 CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
          <div
            style={animateIn ? { animationDelay: '830ms' } : undefined}
            className={`w-full sm:w-auto ${
              animateIn ? 'animate-hero-rise' : 'opacity-0'
            }`}
          >
            <GoldButton
              href="#experience"
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base min-h-[48px]"
            >
              <span>اكتشف المكان</span>
            </GoldButton>
          </div>

          <a
            href="#contact"
            style={animateIn ? { animationDelay: '900ms' } : undefined}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary/80 hover:bg-primary-light border border-gold/50 text-gold-light font-bold text-sm sm:text-base transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              animateIn ? 'animate-hero-rise' : 'opacity-0'
            }`}
          >
            <span>تواصل معنا</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            style={animateIn ? { animationDelay: '970ms' } : undefined}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-bold text-sm sm:text-base transition-colors min-h-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              animateIn ? 'animate-hero-rise' : 'opacity-0'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-gold-light shrink-0" aria-hidden="true" />
            <span>طلب حجز سريع</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        aria-label="الانتقال إلى قسم من نحن"
        style={animateIn ? { animationDelay: '1050ms' } : undefined}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-primary border border-gold/30 text-gold-light flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          animateIn ? 'animate-hero-rise' : 'opacity-0'
        }`}
      >
        <ChevronDown className="w-5 h-5" aria-hidden="true" />
      </a>
    </section>
  );
}
