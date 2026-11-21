import {
  CheckCircle2,
  Clock,
  Coffee,
  Gamepad2,
  HeartHandshake,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trees,
  Users,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { ImageWithFallback } from '../ui/ImageWithFallback.jsx';

const HIGHLIGHTS = [
  {
    id: 'home-taste',
    title: 'أكل بطعم البيت',
    description:
      'أكلات مصرية أصلية معمولة على أصولها، من المشويات وطواجن الفخار بالسمن البلدي لحد الشوربة والمقبلات البلدية الطازجة.',
    icon: UtensilsCrossed,
    tileClass: 'bg-gold/15 text-gold-ink border-gold/30',
  },
  {
    id: 'family-vibe',
    title: 'أجواء عائلية مميزة',
    description:
      'جلسات رحبة ومريحة صُممت لتناسب تجمع العائلات والأصحاب، مع توفير أقصى درجات الخصوصية والراحة لجميع أفراد الأسرة.',
    icon: Users,
    tileClass: 'bg-secondary/15 text-secondary border-secondary/30',
  },
  {
    id: 'relax-place',
    title: 'مكان للراحة والاستمتاع',
    description:
      'استراحة مثالية ووجهة متكاملة على طريق مصر إسكندرية الزراعي، وسط مساحات خضراء، هواء نقي، وملاهي آمنة للأطفال.',
    icon: Sparkles,
    tileClass: 'bg-primary/10 text-primary border-primary/20',
  },
];

const SERVICE_ICONS = {
  Utensils,
  Trees,
  Users,
  Gamepad2,
  ShoppingBag,
  Coffee,
};

export function AboutUs() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-cream py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="عن قرية الشيخ محمد الجديدة"
          title="أكتر من مجرد مطعم.. تجربة متكاملة"
          headingId="about-heading"
          subtitle="في قرية الشيخ محمد الجديدة، بنجمع بين الأكل المصري الأصيل والأجواء العائلية المميزة، علشان تستمتع بوقتك وسط مكان هادي ومناسب للعيلة والأصحاب."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right 7 columns: 3 Highlight Cards + Trust Mini-Tiles */}
          <div className="lg:col-span-7 space-y-5">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gold/15 hover:border-gold/50 p-5 sm:p-6 shadow-sm hover:shadow-md transition-colors flex items-start gap-4 sm:gap-5"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shrink-0 ${item.tileClass}`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-primary flex items-center gap-2">
                      <span>{item.title}</span>
                      <CheckCircle2
                        className="w-4 h-4 text-secondary shrink-0"
                        aria-hidden="true"
                      />
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Trust Mini-Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white rounded-2xl border border-gold/15 p-4 flex items-center gap-3 shadow-xs h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">
                    لحوم ودواجن بلدية
                  </p>
                  <p className="text-xs text-charcoal/75">جودة وطزاجة يومية</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gold/15 p-4 flex items-center gap-3 shadow-xs h-full">
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-ink flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">
                    كرم وضيافة مصرية
                  </p>
                  <p className="text-xs text-charcoal/75">خدمة تليق بكم</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gold/15 p-4 flex items-center gap-3 shadow-xs h-full">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">
                    24 ساعة / مستعدين لخدمتكم
                  </p>
                  <p className="text-xs text-charcoal/75">
                    في أي وقت من اليوم
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left 5 columns: Image Composition + Google Badge */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Ambient Blobs */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-8 w-64 h-64 rounded-full bg-gold/20 blur-3xl pointer-events-none"
            />

            <div className="relative pb-10 sm:pb-12">
              <div className="relative rounded-3xl border-[6px] border-white shadow-2xl overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-200">
                <ImageWithFallback
                  imageKey="tajine"
                  className="aspect-[4/3] w-full"
                />
              </div>

              {/* Dark-Green Google Quote Card */}
              <div className="relative sm:absolute sm:bottom-0 sm:right-4 sm:left-8 mt-4 sm:mt-0 bg-primary-dark text-white rounded-2xl border border-gold/45 p-4 sm:p-5 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-gold-gradient text-primary flex items-center justify-center font-bold shrink-0">
                    <Star className="w-4 h-4 fill-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gold-light">
                      تقييمات زوار القرية على Google
                    </p>
                    <p className="text-xs text-cream-muted/85">
                      <span className="font-num font-bold text-white">
                        {BUSINESS_INFO.totalReviews.toLocaleString('en-US')}
                      </span>{' '}
                      تقييم على Google
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-cream-muted/95 leading-relaxed italic">
                  "مكان مريح تقدر تتمشى فيه وتستمتع بالأجواء واللحوم طعمها زي أكل
                  البيت"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Static Strip (renders BUSINESS_INFO.services) */}
        <div className="mt-16 pt-8 border-t border-gold/20">
          <p className="text-center text-xs sm:text-sm font-bold text-primary/80 mb-5">
            خدمات ومرافق القرية المتكاملة على مدار الساعة
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-3 py-2"
            aria-label="خدمات القرية"
          >
            {BUSINESS_INFO.services.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] || Utensils;
              return (
                <div
                  key={service.id}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-gold/25 shadow-xs text-primary text-sm font-bold whitespace-nowrap shrink-0"
                >
                  <Icon
                    className="w-4 h-4 text-gold-ink shrink-0"
                    aria-hidden="true"
                  />
                  <span>{service.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
