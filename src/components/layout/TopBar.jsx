import { Clock, MapPin, Phone, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';

export function TopBar() {
  return (
    <div className="hidden md:block bg-primary-dark text-cream-muted/80 text-xs border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-gold-light font-semibold whitespace-nowrap shrink-0">
            <Clock className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
            <span>مفتوح 24 ساعة طوال أيام الأسبوع</span>
          </span>

          <span className="text-gold/40" aria-hidden="true">
            •
          </span>

          <span className="inline-flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
            <span className="truncate">{BUSINESS_INFO.locationShort}</span>
          </span>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-gold-light font-semibold whitespace-nowrap">
            <Star
              className="w-3.5 h-3.5 text-gold fill-gold shrink-0"
              aria-hidden="true"
            />
            <span className="font-num" dir="ltr">
              {BUSINESS_INFO.googleRating} / 5
            </span>
            <span>
              (
              <span className="font-num">
                {BUSINESS_INFO.totalReviews.toLocaleString('en-US')}
              </span>{' '}
              تقييم على Google)
            </span>
          </span>

          <span className="text-gold/40" aria-hidden="true">
            •
          </span>

          <a
            href={BUSINESS_INFO.phoneTel}
            className="inline-flex items-center gap-1.5 hover:text-gold-light transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            <Phone className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
            <span className="font-num font-semibold" dir="ltr">
              {BUSINESS_INFO.phone}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
