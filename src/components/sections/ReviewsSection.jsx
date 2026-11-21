import { ExternalLink, Quote, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { REVIEWS } from '../../data/reviews.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { AnimatedCounter } from '../ui/AnimatedCounter.jsx';

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative bg-primary py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dotted-gold opacity-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-10 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          theme="dark"
          eyebrow="تجارب حقيقية لرواد القرية"
          title="آراء زوارنا ومراجعاتهم"
          headingId="reviews-heading"
          subtitle="ثقة أكثر من 3,800 زائر على خرائط جوجل، تجارب حقيقية تعكس جودة الطعام وحفاوة الاستقبال."
        />

        {/* Google Maps Summary Card (strictly real Google-sourced figures, no invented % bars) */}
        <div className="bg-primary-dark rounded-3xl border border-gold/30 p-6 sm:p-10 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Rating Column */}
            <div className="text-center md:text-right space-y-2">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <AnimatedCounter
                  target={BUSINESS_INFO.googleRating}
                  decimals={1}
                  className="text-gold-light text-5xl sm:text-6xl font-bold leading-none"
                />
                <span className="font-num text-xl text-cream-muted/70" dir="ltr">
                  / 5
                </span>
              </div>

              {/* 4 Full + 1 Partially Filled Star */}
              <div
                className="flex items-center justify-center md:justify-start gap-1.5 py-1"
                aria-label={`التقييم ${BUSINESS_INFO.googleRating} من 5 نجوم`}
              >
                {[0, 1, 2, 3, 4].map((starIdx) => {
                  const isPartial = starIdx === 4;
                  return (
                    <span
                      key={starIdx}
                      className="relative inline-block w-5 h-5"
                    >
                      <Star
                        className="w-5 h-5 text-gold/30"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: isPartial ? '45%' : '100%' }}
                      >
                        <Star
                          className="w-5 h-5 text-gold fill-gold"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  );
                })}
              </div>

              <p className="text-white font-bold text-base sm:text-lg">
                التقييم العام على Google Maps
              </p>
              <p className="text-cream-muted/80 text-sm">
                بناءً على{' '}
                <AnimatedCounter
                  target={BUSINESS_INFO.totalReviews}
                  className="font-bold text-gold-light"
                />{' '}
                مراجعة على Google
              </p>
            </div>

            {/* Right External Link & Note Column */}
            <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-left">
              <div className="rounded-2xl bg-primary/70 border border-gold/25 px-5 py-4 text-right max-w-md">
                <p className="text-xs sm:text-sm text-cream-muted/90 leading-relaxed">
                  يعتمد هذا التقييم على تجارب الزوار والعائلات الفعلية المنشورة
                  مباشرة على صفحة المطعم والقرية في خرائط جوجل.
                </p>
              </div>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient text-primary font-bold text-sm sm:text-base px-6 py-3.5 shadow-lg hover:brightness-110 transition-all min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>عرض جميع التقييمات على خرائط جوجل</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <p className="text-xs text-cream-muted/70">
                * مقتطفات نصية فعلية من تجارب الزوار
              </p>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="bg-primary-dark/80 rounded-3xl border border-gold/20 hover:border-gold p-6 sm:p-7 flex flex-col justify-between gap-5 transition-colors duration-150 hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} من 5 نجوم`}
                  >
                    {Array.from({ length: review.rating }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 text-gold fill-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote
                    className="w-5 h-5 text-gold/40 shrink-0"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-gold-light text-xs font-bold">
                  {review.highlight}
                </p>

                <blockquote className="text-base sm:text-lg text-white font-medium italic leading-relaxed">
                  "{review.excerpt}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-cream-muted/75">
                <span>{review.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
