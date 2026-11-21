import { useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Wallet,
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { BookingForm } from '../ui/BookingForm.jsx';

export function LocationAndContact() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(BUSINESS_INFO.phone);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = BUSINESS_INFO.phone;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="bg-cream py-20 md:py-28 scroll-mt-24 border-t border-gold/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="طريقك إلينا وتواصلك معنا"
          title="الموقع وبيانات التواصل"
          headingId="location-heading"
          subtitle="يسعدنا استقبالكم على مدار 24 ساعة يومياً. موقع استراتيجي ومميز على طريق القاهرة - الإسكندرية الزراعي بإيتاي البارود."
        />

        {/* 4 Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="bg-white rounded-2xl border border-gold/20 p-6 shadow-xs h-full flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-primary">العنوان</h3>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              {BUSINESS_INFO.location}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gold/20 p-6 shadow-xs h-full flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold-ink flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-primary">رقم الهاتف</h3>
            <div className="flex items-center justify-between gap-2">
              <a
                href={BUSINESS_INFO.phoneTel}
                dir="ltr"
                className="font-num text-lg font-bold text-primary hover:text-gold-ink transition-colors"
              >
                {BUSINESS_INFO.phone}
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                aria-label="نسخ رقم الهاتف"
                className="inline-flex items-center gap-1.5 rounded-lg bg-cream hover:bg-cream-muted border border-gold/30 px-3 py-1.5 text-xs font-bold text-primary transition-colors cursor-pointer min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>تم النسخ</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>نسخ</span>
                  </span>
                )}
              </button>
            </div>
            <p className="text-xs text-charcoal/70">
              متاح للاتصال والاستفسار المباشر
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gold/20 p-6 shadow-xs h-full flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-primary">مواعيد العمل</h3>
            <p className="text-base font-bold text-primary">
              {BUSINESS_INFO.openingHours}
            </p>
            <p className="text-xs text-charcoal/70">
              طوال أيام الأسبوع بدون انقطاع
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gold/20 p-6 shadow-xs h-full flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-primary">متوسط الأسعار</h3>
            <p className="text-base font-bold text-primary">
              {BUSINESS_INFO.averagePrice}
            </p>
            <p className="text-xs text-charcoal/70">
              وجبات عائلية ومشويات بجودة عالية
            </p>
          </div>
        </div>

        {/* #contact anchor: Action Bar + Map/Booking Two-Column */}
        <div id="contact" className="scroll-mt-24">
          <div className="bg-primary border border-gold/30 rounded-3xl p-6 sm:p-8 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="text-center lg:text-right">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5">
                جاهزون لاستقبالكم في أي وقت!
              </h3>
              <p className="text-sm sm:text-base text-cream-muted/85">
                اختر الطريقة الأنسب لك للتواصل أو الوصول المباشر
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient text-primary font-bold text-sm px-5 py-3.5 shadow-md hover:brightness-110 transition-all min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>اتصل الآن</span>
                <span className="font-num" dir="ltr">
                  ({BUSINESS_INFO.phone})
                </span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm px-5 py-3.5 shadow-md transition-colors min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>محادثة واتساب</span>
              </a>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-bold text-sm px-5 py-3.5 transition-colors min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Navigation
                  className="w-4 h-4 text-gold-light shrink-0"
                  aria-hidden="true"
                />
                <span>الاتجاهات على الخريطة</span>
              </a>
            </div>
          </div>

          {/* Two-Column Map (7) + Booking Card (5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gold/20 shadow-md overflow-hidden flex flex-col min-h-[460px]">
              <div className="bg-primary px-5 py-4 flex flex-wrap items-center justify-between gap-2 border-b border-gold/25">
                <span className="inline-flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                  <MapPin
                    className="w-4 h-4 text-gold-light shrink-0"
                    aria-hidden="true"
                  />
                  <span>خريطة الموقع المباشرة</span>
                </span>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold-light hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  <span>فتح في تطبيق Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="relative flex-1 bg-cream-muted min-h-[400px]">
                <iframe
                  src={BUSINESS_INFO.googleMapsEmbedUrl}
                  title="موقع مطعم وقرية الشيخ محمد الجديدة"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px] border-0"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl border border-gold/20 shadow-md p-6 sm:p-8 flex flex-col justify-between">
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-primary mb-2">
                  طلب حجز طاولة أو جلسة عائلية
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  املأ البيانات وسيقوم النظام بإنشاء رسالة حجز فورية لإرسالها
                  مباشرة لواتساب القرية لتأكيد الطاولة.
                </p>
              </div>

              <BookingForm idPrefix="section-booking" showDirectCall={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
