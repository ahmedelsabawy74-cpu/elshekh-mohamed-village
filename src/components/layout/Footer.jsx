import { Clock, Heart, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';

const FOOTER_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'من نحن', href: '#about' },
  { label: 'تجربة القرية', href: '#experience' },
  { label: 'منيو المطعم', href: '#menu' },
  { label: 'معرض الصور', href: '#gallery' },
  { label: 'آراء الزوار', href: '#reviews' },
  { label: 'الموقع والاتجاهات', href: '#location' },
  { label: 'تواصل معنا', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark border-t border-gold/30 text-cream-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-lg shrink-0">
                <span className="font-black text-primary text-lg leading-none">
                  ش.م
                </span>
              </div>
              <div>
                <p className="text-white font-black text-lg leading-tight">
                  {BUSINESS_INFO.shortName}
                </p>
                <p className="text-gold-light text-xs font-semibold mt-0.5">
                  {BUSINESS_INFO.subName}
                </p>
              </div>
            </div>

            <p className="text-sm text-cream-muted/80 leading-relaxed max-w-md">
              وجهتكم الأولى للأكل المصري الأصيل والأجواء العائلية المميزة على طريق
              مصر إسكندرية الزراعي. نجمع بين دفء الضيافة الريفية، روعة الجلسات
              الخارجية، وملاهي الأطفال المتكاملة.
            </p>

            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gold-light pt-1">
              <span
                className="inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shrink-0"
                aria-hidden="true"
              />
              <span>مفتوح الآن لاستقبالكم 24 ساعة يومياً</span>
            </div>
          </div>

          {/* Quick Links (3 cols, 2-column list) */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-base mb-4">روابط سريعة</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-cream-muted/80 hover:text-gold-light transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white font-bold text-base mb-4">بيانات التواصل</h3>

            <ul className="space-y-3 text-sm text-cream-muted/85">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-gold shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{BUSINESS_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href={BUSINESS_INFO.phoneTel}
                  dir="ltr"
                  className="font-num font-bold text-gold-light hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <span>مفتوح 24 ساعة طوال العام</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب مطعم وقرية الشيخ محمد الجديدة"
                className="w-11 h-11 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white flex items-center justify-center shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="موقع مطعم وقرية الشيخ محمد الجديدة على خرائط جوجل"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-primary text-gold-light border border-gold/30 flex items-center justify-center shadow-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-12 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-cream-muted/75 text-center">
          <p>
            جميع الحقوق محفوظة © <span className="font-num">{currentYear}</span>{' '}
            {BUSINESS_INFO.arabicName} ({BUSINESS_INFO.englishName})
          </p>
          <p className="inline-flex items-center gap-1.5">
            <span>صُنع بحب للضيافة المصرية الأصيلة</span>
            <Heart
              className="w-4 h-4 text-red-500 fill-red-500 shrink-0"
              aria-hidden="true"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
