import {
  ArrowLeft,
  CheckCircle2,
  Gamepad2,
  Sparkles,
  Trees,
  UsersRound,
  Utensils,
} from 'lucide-react';
import { EXPERIENCES } from '../../data/experiences.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { ImageWithFallback } from '../ui/ImageWithFallback.jsx';

const EXPERIENCE_ICONS = {
  Utensils,
  Trees,
  Gamepad2,
  UsersRound,
};

export function VillageExperience({ onOpenBooking }) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative bg-primary py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      {/* Dotted Pattern & Soft Ambient Blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dotted-gold opacity-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          theme="dark"
          eyebrow="قرية متكاملة لجميع أفراد العائلة"
          icon={Sparkles}
          title="تجربة القرية.. فسحة وتجمع ولمة عيلة"
          headingId="experience-heading"
          subtitle="قرية الشيخ محمد الجديدة صُممت لتكون وجهتكم المفضلة للاستمتاع بالطعام والراحة والترفيه في بيئة طبيعية راقية وآمنة."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp) => {
            const Icon = EXPERIENCE_ICONS[exp.icon] || Utensils;
            return (
              <article
                key={exp.id}
                className="bg-primary-dark/90 rounded-3xl border border-gold/30 hover:border-gold transition-colors duration-150 overflow-hidden shadow-xl flex flex-col"
              >
                {/* Top Media Header */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <ImageWithFallback
                    imageKey={exp.image}
                    className="w-full h-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/45 to-transparent"
                  />

                  <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm border border-gold/35 text-gold-light text-xs font-bold">
                    {exp.badge}
                  </span>

                  <div className="absolute bottom-4 right-5 left-5 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gold-gradient text-primary flex items-center justify-center shadow-lg shrink-0">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">
                        {exp.title}
                      </h3>
                      <p
                        className="text-gold-light text-xs font-num font-medium"
                        dir="ltr"
                      >
                        {exp.englishTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <p className="text-gold-light font-bold text-base">
                      {exp.subtitle}
                    </p>
                    <p className="text-sm sm:text-base text-cream-muted/85 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="pt-2 space-y-2">
                      {exp.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-sm text-cream-muted/95"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-gold shrink-0"
                            aria-hidden="true"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(exp.bookingServiceType)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold-light/15 hover:bg-gold-gradient text-gold-light hover:text-primary border border-gold/40 font-bold text-sm sm:text-base py-3.5 px-5 transition-colors cursor-pointer min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <span>حجز أو استفسار عن {exp.title}</span>
                    <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
