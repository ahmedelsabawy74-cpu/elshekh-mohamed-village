import { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../../data/gallery.js';
import { filterByCategory } from '../../lib/validators.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { ImageWithFallback } from '../ui/ImageWithFallback.jsx';

export function GallerySection({ onOpenLightbox }) {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredItems = filterByCategory(GALLERY_ITEMS, activeCategory);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-cream py-20 md:py-28 scroll-mt-24 border-t border-gold/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="لقطات حية من قلب القرية"
          icon={Camera}
          title="معرض الصور"
          headingId="gallery-heading"
          subtitle="جولة بصرية بين أركان قرية الشيخ محمد الجديدة: الجلسات الخلابة، المشويات وطواجن الفرن، ملاهي الأطفال، والأجواء الليلية الساحرة."
        />

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="تصنيفات معرض الصور"
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {GALLERY_CATEGORIES.map((category) => {
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

        {/* Gallery Grid (accessible <button> cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenLightbox(filteredItems, idx)}
              aria-label={`عرض صورة: ${item.title} (${item.category})`}
              className="group relative h-64 sm:h-72 w-full rounded-2xl border border-gold/20 overflow-hidden text-right shadow-sm hover:shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <ImageWithFallback
                imageKey={item.image}
                alt={item.title}
                className="w-full h-full"
              />

              {/* Desktop Hover / Focus Overlay */}
              <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-gold text-primary text-xs font-bold">
                    {item.category}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center">
                    <ZoomIn className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cream-muted/85 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Touch / Mobile Permanent Bottom Title Bar */}
              <div className="md:hidden absolute inset-x-0 bottom-0 bg-black/65 backdrop-blur-sm px-3.5 py-2.5 flex items-center justify-between gap-2 text-right">
                <div className="min-w-0">
                  <span className="block text-[11px] font-bold text-gold-light">
                    {item.category}
                  </span>
                  <span className="block text-sm font-bold text-white truncate">
                    {item.title}
                  </span>
                </div>
                <ZoomIn
                  className="w-4 h-4 text-gold-light shrink-0"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
