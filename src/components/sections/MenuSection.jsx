import { useState } from 'react';
import {
  Coffee,
  Flame,
  Info,
  MessageCircle,
  Phone,
  Salad,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menu.js';
import { filterByCategory } from '../../lib/validators.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { ImageWithFallback } from '../ui/ImageWithFallback.jsx';
import { GoldButton } from '../ui/GoldButton.jsx';

const CATEGORY_FALLBACK_ICON = {
  المشويات: Flame,
  اللحوم: UtensilsCrossed,
  'الأطباق الرئيسية': UtensilsCrossed,
  المقبلات: Salad,
  المشروبات: Coffee,
};

export function MenuSection({ onOpenMenuInquiry }) {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredItems = filterByCategory(MENU_ITEMS, activeCategory);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-cream py-20 md:py-28 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="أطايب المطبخ المصري"
          title="منيو المطعم"
          headingId="menu-heading"
          subtitle="تشكيلة فاخرة من المشويات، طواجن الفخار البلدي، وأطباق المطبخ المصري الريفي الأصيل المحضرة يومياً بكل حب."
        />

        {/* Sample Price Notice Box */}
        <div className="max-w-4xl mx-auto mb-10 rounded-2xl bg-gold/10 border border-gold/40 p-4 sm:p-5 flex items-start gap-3.5 text-sm sm:text-base text-primary">
          <Info
            className="w-5 h-5 text-gold-ink shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="leading-relaxed">
            <strong>ملاحظة للزوار الكرام:</strong> الأصناف والأسعار المعروضة
            أدناه هي <strong>نماذج استرشادية تقريبية</strong> لأشهر أكلاتنا (متوسط
            200–400 ج.م للفرد). للاستفسار عن منيو اليوم الطازج، العزومات الخاصة،
            أو الأسعار الحالية تواصل معنا مباشرة.
          </p>
        </div>

        {/* Keyboard-Accessible Category Tabs */}
        <div
          role="tablist"
          aria-label="تصنيفات منيو المطعم"
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? 'bg-primary text-white ring-2 ring-gold/60'
                    : 'bg-white text-primary border border-gold/25 hover:border-gold'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const FallbackIcon =
              CATEGORY_FALLBACK_ICON[item.category] || UtensilsCrossed;
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    imageKey={item.image}
                    alt={item.name}
                    className="w-full h-full"
                    icon={FallbackIcon}
                    fallbackLabel={item.category}
                  />

                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-gold-light text-xs font-bold">
                    {item.category}
                  </span>

                  {item.tag && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-primary text-xs font-extrabold shadow-sm">
                      <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary leading-snug mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-gold/15">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-charcoal/70 font-semibold">
                        سعر تقديري:
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-cream text-primary font-bold">
                        {item.pricePlaceholder}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenMenuInquiry(item.name)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/15 font-bold text-sm py-2.5 px-4 transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>طلب أو استفسار عن الصنف</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Menu CTA Card */}
        <div className="mt-14 bg-white rounded-3xl border border-gold/25 p-6 sm:p-10 shadow-sm text-center max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-primary mb-2">
            حابب تعرف تفاصيل أكتر عن قائمة أسعار اليوم؟
          </h3>
          <p className="text-sm sm:text-base text-charcoal/80 max-w-2xl mx-auto mb-6 leading-relaxed">
            فريق ضيافة قرية الشيخ محمد الجديدة في خدمتكم 24 ساعة للإجابة على
            استفسارات المنيو وتجهيز الولائم والعزومات.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <GoldButton
              onClick={() => onOpenMenuInquiry('')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base min-h-[46px]"
            >
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>استفسر عن المنيو على واتساب</span>
            </GoldButton>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cream hover:bg-cream-muted border border-gold/30 text-primary font-bold text-sm sm:text-base px-6 py-3.5 transition-colors min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Phone className="w-4 h-4 text-gold-ink shrink-0" aria-hidden="true" />
              <span>اتصال مباشر:</span>
              <span className="font-num" dir="ltr">
                {BUSINESS_INFO.phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
