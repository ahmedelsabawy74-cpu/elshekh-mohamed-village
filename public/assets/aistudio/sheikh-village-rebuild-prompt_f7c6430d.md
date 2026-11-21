# PROMPT — Rebuild "Sheikh Mohamed El Gedida Restaurant & Village" website (React + JSX, animated, fully dynamic)

You are a senior front-end engineer and motion designer. Rebuild the complete website described below from scratch as a **Vite + React 19 single-page app written in plain JavaScript with JSX (`.jsx` / `.js` files). Do NOT use TypeScript anywhere** (no `.ts`/`.tsx`, no type annotations, no `tsconfig`). The site is an Arabic (RTL) marketing site for a real Egyptian restaurant and family "village". Reproduce the content, colors and structure described here exactly, make the experience much more **dynamic and animated** than a static page, and fix every known issue listed in Section 9.

Deliver **complete, copy-paste-ready files** (no "...", no "rest of the code here"). When finished, the project must pass `npm install && npm run build` with zero errors and zero console warnings.

---

## 1. Tech stack and project rules

- **Vite** + **React 19** + **JSX only**.
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config: `@import "tailwindcss";` and `@theme { ... }` in `src/index.css`; no `tailwind.config.js`).
- **Animation: `motion` package** (`import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion, useMotionValue, animate } from "motion/react"`).
- **Icons: `lucide-react`**.
- **No** Express, no `@google/genai`, no `dotenv`, no `tsx`, no `esbuild` pin, no `autoprefixer` (Tailwind v4 handles it). No backend: this is a static site, all data is hard-coded in `src/data/`.
- No React Router (single page with anchor sections). 
- `package.json` scripts: `dev`, `build`, `preview`, plus `"deploy": "gh-pages -d dist"` with `"predeploy": "npm run build"`. Do not use `rm -rf` in scripts (the developer is on Windows).
- `vite.config.js`: plugins `react()` and `tailwindcss()`, alias `@` → `./src`, and **`base: './'`** so the build works on GitHub Pages under `/<repo-name>/` and on any static host. Keep it free of any AI-Studio-specific code.
- `index.html`: `<html lang="ar" dir="rtl">`, Google Fonts link (see §2), all meta/OG tags (see §8).
- Suggested structure:

```
src/
  main.jsx
  App.jsx
  index.css
  data/ businessInfo.js, menu.js, gallery.js, reviews.js, experiences.js, images.js
  lib/ validators.js, whatsapp.js
  hooks/ useBodyScrollLock.js, useScrollSpy.js, useCountUp.js
  components/
    layout/ TopBar.jsx, Navbar.jsx, MobileMenu.jsx, Footer.jsx, FloatingActions.jsx, ScrollProgress.jsx
    sections/ Hero.jsx, AboutUs.jsx, VillageExperience.jsx, MenuSection.jsx, GallerySection.jsx, ReviewsSection.jsx, LocationAndContact.jsx, FinalCTA.jsx
    ui/ SectionHeader.jsx, Reveal.jsx, GoldButton.jsx, Modal.jsx, BookingForm.jsx, ImageWithFallback.jsx, AnimatedCounter.jsx
    modals/ BookingModal.jsx, MenuInquiryModal.jsx, LightboxModal.jsx
```

- **One single source of truth** for phone, WhatsApp number, address, hours (`data/businessInfo.js`). No phone number or URL may be hard-coded anywhere else.
- The booking form is used in two places (modal and contact section): build it **once** as `BookingForm.jsx` and reuse it.

---

## 2. Design system (exact tokens)

Define these as Tailwind v4 theme tokens in `src/index.css` (`@theme`) and use the token names (e.g. `bg-primary`, `text-gold`) instead of repeating hex codes:

| Token | Hex | Use |
|---|---|---|
| primary | `#173D32` | deep forest green: navbar, dark sections, buttons text |
| primary-dark | `#0f2921` | footer, cards on dark sections, overlays |
| primary-light | `#245849` | hover on green |
| secondary (olive) | `#687B4B` | secondary accents, icons |
| secondary-light | `#839b60` | gradient end |
| cream | `#F8F6F0` | page background |
| cream-muted | `#EFECE3` | text on dark |
| charcoal | `#242824` | body text on light |
| gold | `#C49A52` | main accent |
| gold-light | `#DFC085` | light gold |
| gold-mid-dark | `#b08742` / `#9F762E` | gradient end |
| whatsapp | `#25D366` (hover `#20ba59`) | WhatsApp buttons |

- **Gold gradient (primary CTA):** `linear-gradient(to right, #DFC085, #C49A52, #b08742)` with dark-green text `#173D32`, rounded-xl, soft shadow, hover `brightness-110`, press scale 0.95.
- **Gold text gradient:** `135deg, #DFC085 0%, #C49A52 50%, #9F762E 100%`.
- **Dotted pattern (dark sections):** `radial-gradient(#C49A52 1px, transparent 1px)` at `32px 32px`, opacity ~10%.
- Section header ornament: a 80px × 4px line `linear-gradient(to right, transparent, #C49A52, transparent)`.
- Soft blurred color blobs in dark sections: olive `#687B4B/20` and gold `#C49A52/15`, `blur-3xl`, 384px circles, non-interactive.
- Fonts: **Cairo** (weights 400–900) is the main font; **Tajawal** is fallback; **Poppins** only for Latin numerals/phone numbers/rating numbers. Link: `https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap`.
- Radii: cards `rounded-2xl` / `rounded-3xl`, buttons `rounded-xl`, pills `rounded-full`.
- Selection color: `bg-gold/30 text-primary`.
- Alternating section backgrounds: cream (About, Menu, Gallery, Location) / green (Experience, Reviews, Final CTA).
- Layout container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`; section padding `py-20 md:py-28`.
- Scrollbar: pick ONE behavior (either hidden everywhere or a slim green thumb with gold hover). Do not define both.
- Reduced motion must be respected everywhere (`useReducedMotion` + `@media (prefers-reduced-motion)`).

---

## 3. Images

The developer has 5 local photos which must be placed in `src/assets/images/` and imported **only** through `src/data/images.js`. Keep these exact filenames (ask the user to supply them; I describe them from their file names and captions only):

| key | filename | content |
|---|---|---|
| hero | `sheikh_village_hero_1793365934255.jpg` | main stone walkway, green spaces, pergola seating of the village |
| mixedGrill | `egyptian_mixed_grill_1793365949250.jpg` | mixed charcoal grill platter |
| kidsGames | `village_kids_games_1793365962660.jpg` | children's playground among lawns |
| tajine | `egyptian_tajine_dish_1793365980805.jpg` | clay tajine dish |
| outdoorSeating | `outdoor_village_seating_1793365994223.jpg` | outdoor wooden-pergola seating with warm lanterns |

Rules:
- **Do not hot-link external images (no Unsplash URLs).** The old version used 8 Unsplash photos; replace them: menu items without a dedicated local photo must use `ImageWithFallback`, which shows a tasteful placeholder (dark-green gradient + gold lucide icon + dotted pattern) — never reuse the same unrelated photo for two different dishes.
- Every `<img>` has a meaningful Arabic `alt`, explicit `width`/`height` (or `aspect-ratio`) to avoid layout shift, `loading="lazy"` except the hero (`fetchpriority="high"`), and `decoding="async"`.
- Suggest (in a comment/README) compressing the photos to WebP ≤ 200 KB each; they are ~1 MB now.

---

## 4. Business data (use verbatim — `src/data/*.js`)

```js
export const BUSINESS_INFO = {
  arabicName: 'مطعم وقرية الشيخ محمد الجديدة',
  englishName: 'Sheikh Mohamed El Gedida',
  shortName: 'مطعم وقرية الشيخ محمد',
  subName: 'الجديدة • إيتاي البارود',
  category: 'مطعم مصري وقرية عائلية',
  googleRating: 4.2,
  totalReviews: 3878,
  averagePrice: '200–400 جنيه للفرد',
  averagePriceEn: 'EGP 200–400 per person',
  location: 'طريق القاهرة - الإسكندرية الزراعي، مركز إيتاي البارود، محافظة البحيرة، مصر',
  locationShort: 'طريق مصر إسكندرية الزراعي - إيتاي البارود',
  phone: '01003347500',
  phoneTel: 'tel:01003347500',
  whatsappNumber: '201003347500',
  whatsappUrl: 'https://wa.me/201003347500',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=مطعم+وقرية+الشيخ+محمد+الجديدة+ايتاي+البارود',
  openingHours: 'مفتوح 24 ساعة',
  openingHoursEn: 'Open 24 Hours',
  services: [
    { id: 'dine-in',  name: 'صالة طعام مكيفة',          icon: 'Utensils' },
    { id: 'outdoor',  name: 'جلسات خارجية مفتوحة',      icon: 'Trees' },
    { id: 'family',   name: 'جلسات عائلية مريحة',       icon: 'Users' },
    { id: 'kids',     name: 'ألعاب وملاهي أطفال',       icon: 'Gamepad2' },
    { id: 'takeaway', name: 'خدمة التيك أواي والسفري',  icon: 'ShoppingBag' },
    { id: 'drinks',   name: 'مشروبات وعصائر طازجة',     icon: 'Coffee' },
  ],
};
```

The `services` array is data only (currently not rendered anywhere) — render it as an animated chips/marquee row (see §6.3 About or §6.8) so it is actually used.

**Menu categories (filter order):** `الكل`, `المشويات`, `اللحوم`, `الأطباق الرئيسية`, `المقبلات`, `المشروبات`.

**Menu items (12). They are clearly editable SAMPLE content, keep the "(عينة مقترحة)" suffix and the price-range placeholders. Do not invent anything else.**

```js
export const MENU_ITEMS = [
  { id:'m1',  name:'مشكل مشويات الشيخ (عينة مقترحة)', category:'المشويات', description:'تشكيلة فاخرة من الكفتة الكندوز، كباب بتلو، ريش ضاني وشيش طاووق مشوي على الفحم.', pricePlaceholder:'متوسط 250 - 350 ج.م', isPopular:true, image:'mixedGrill', tag:'الأكثر طلباً' },
  { id:'m2',  name:'كفتة مشوية على الفحم (عينة مقترحة)', category:'المشويات', description:'كفتة لحم بلدي متبلة بالبهارات المصرية الأصيلة تقدم مع الطحينة والسلطة والخبز البلدي الساخن.', pricePlaceholder:'متوسط 200 - 280 ج.م', image:null },
  { id:'m3',  name:'طرب بلدي مشوي (عينة مقترحة)', category:'المشويات', description:'أصابع الطرب المحشية باللحم المفروم المتبل والمشوية بعناية على الجمر.', pricePlaceholder:'متوسط 220 - 320 ج.م', image:null },
  { id:'m4',  name:'طاجن لحمة بالبصل والفخار (عينة مقترحة)', category:'اللحوم', description:'قطع اللحم البلدي الطري في صوص البصل المكرمل داخل طاجن فخار بلدي مسبك بالفرن.', pricePlaceholder:'متوسط 220 - 300 ج.م', isPopular:true, image:'tajine', tag:'طعم البيت' },
  { id:'m5',  name:'موزة بتلو مع أرز بالخلطة (عينة مقترحة)', category:'اللحوم', description:'موزة لحم بتلو دايبة تقدم على سرير من الأرز المصري بالخلطة والمكسرات المحمصة.', pricePlaceholder:'متوسط 280 - 380 ج.م', image:null },
  { id:'m6',  name:'طاجن عكاوى فلاحي (عينة مقترحة)', category:'اللحوم', description:'عكاوى مطهية ببطء مع البصل وخلطة التوابل المصرية التقليدية داخل الفخار.', pricePlaceholder:'متوسط 260 - 360 ج.م', image:'tajine' },
  { id:'m7',  name:'حمام محشي بالفريك البلدي (عينة مقترحة)', category:'الأطباق الرئيسية', description:'حمام بلدي محشو بالفريك المفلفل أو الأرز بالخلطة ومحمر في السمن البلدي.', pricePlaceholder:'متوسط 200 - 270 ج.م', isPopular:true, image:null, tag:'مميز' },
  { id:'m8',  name:'طاجن أرز معمر فلاحي بالقشطة (عينة مقترحة)', category:'الأطباق الرئيسية', description:'أرز معمر بلدي غني باللبن الطبيعي والسمن البلدي والقشطة الفلاحي مع قطع اللحم.', pricePlaceholder:'متوسط 180 - 240 ج.م', image:null },
  { id:'m9',  name:'تشكيلة مقبلات وسلطات بلدية (عينة مقترحة)', category:'المقبلات', description:'طحينة سمسم بيضاء، بابا غنوج مشوي، سلطة خضراء بلدية، باذنجان مخلل بالدقة، ومخلل مشكل.', pricePlaceholder:'متوسط 50 - 90 ج.م', image:null },
  { id:'m10', name:'شوربة كوارع مخلية بالليمون (عينة مقترحة)', category:'المقبلات', description:'شوربة كوارع دسمة مخلية مع التوابل العطرية والليمون الطازج.', pricePlaceholder:'متوسط 90 - 140 ج.م', image:null },
  { id:'m11', name:'شاي زرد بالنعناع على الفحم (عينة مقترحة)', category:'المشروبات', description:'براد شاي مصري أصيل محضر على الجمر مع أوراق النعناع الفريش.', pricePlaceholder:'متوسط 30 - 50 ج.م', image:null },
  { id:'m12', name:'عصائر طبيعية ومشروبات باردة (عينة مقترحة)', category:'المشروبات', description:'عصير مانجو فريش، جوافة باللبن، ليمون بالنعناع المنعش ومشروبات مثلجة.', pricePlaceholder:'متوسط 40 - 70 ج.م', image:null },
];
// `image` is a key of IMAGES (data/images.js) or null → ImageWithFallback placeholder
```

**Gallery categories:** `الكل`, `المكان`, `الأكل`, `الجلسات`, `الأجواء`.

```js
export const GALLERY_ITEMS = [
  { id:'g1', title:'الممر الرئيسي وجلسات البرجولات', category:'المكان',   description:'مساحات خضراء شاسعة وممرات حجرية تتوسط الطبيعة الريفية الهادئة.', image:'hero' },
  { id:'g2', title:'صواني المشويات على الفحم',       category:'الأكل',    description:'مشويات طازجة ومتبلة على الطريقة المصرية الأصيلة مع السلطات والخبز.', image:'mixedGrill' },
  { id:'g3', title:'منطقة ألعاب وملاهي الأطفال',     category:'المكان',   description:'مساحة ممتعة وآمنة تماماً للأطفال وسط المسطحات الخضراء وجلسات العائلات.', image:'kidsGames' },
  { id:'g4', title:'الجلسات العربية والريفية الخارجية', category:'الجلسات', description:'جلسات خارجية مريحة تحت البرجولات الخشبية مع إضاءة فوانيس دافئة.', image:'outdoorSeating' },
  { id:'g5', title:'طواجن فخار سخنة من الفرن',       category:'الأكل',    description:'طواجن اللحم البلدي والخضار المسبكة برائحة وطعم البيت الأصيل.', image:'tajine' },
  { id:'g6', title:'الأجواء الليلية الساحرة',        category:'الأجواء',  description:'هدوء الطبيعة وجمال الإضاءة الفلكلورية الدافئة لقضاء سهرة لا تنسى.', image:'outdoorSeating' },
  { id:'g7', title:'جلسات العائلات والخصوصية',       category:'الجلسات',  description:'خصوصية كاملة وراحة تامة للعائلات والأصدقاء في قلب القرية.', image:'hero' },
  { id:'g8', title:'أجواء الفرح والبهجة للأطفال',    category:'الأجواء',  description:'ضحكات الأطفال وذكريات عائلية ممتعة في بيئة آمنة ونظيفة.', image:'kidsGames' },
];
```

**Reviews (3 excerpts from Google Maps):**

```js
export const REVIEWS = [
  { id:'r1', excerpt:'مكان جميل وعائلي وجودة الأكل تحفة.', rating:5, tag:'مقتبس من تقييمات Google Maps', highlight:'جودة الأكل والأجواء العائلية' },
  { id:'r2', excerpt:'الجو هادي والريست نضيف جداً والأسعار معقولة والمكان هادي وجميل.', rating:5, tag:'مقتبس من تقييمات Google Maps', highlight:'نظافة وهدوء وأسعار معقولة' },
  { id:'r3', excerpt:'مكان مريح تقدر تتمشى فيه وتستمتع بالأجواء، واللحوم طعمها زي أكل البيت.', rating:5, tag:'مقتبس من تقييمات Google Maps', highlight:'طعم البيت والراحة' },
];
```

**Experience cards (4):**

```js
export const EXPERIENCES = [
  { id:'restaurant', title:'المطعم', englishTitle:'The Restaurant', subtitle:'أشهى المأكولات في أجواء ترحيبية راقية',
    description:'استمتع بأشهى المشويات المصرية على الفحم، وطواجن الفخار البلدي، والأطباق المصرية المحضرة بأعلى معايير النظافة والجودة، لتستمتع بوجبة استثنائية في صالات رحبة ومكيفة.',
    image:'mixedGrill', badge:'طعام بلدي أصيل', features:['مشويات فحم طازجة','طواجن فخار بلدي','خدمة طعام 24 ساعة'], icon:'Utensils' },
  { id:'outdoor', title:'الجلسات الخارجية', englishTitle:'Outdoor Seating', subtitle:'استرخِ واستمتع بالطبيعة والهدوء',
    description:'جلسات مفتوحة وسط مساحات خضراء وأشجار النخيل وبرجولات خشبية أنيقة تمنحك شعوراً بالراحة والاستجمام بعيداً عن صخب المدينة، مع نسمات الهواء الريفي المنعش وإضاءات ليلية ساحرة.',
    image:'outdoorSeating', badge:'طبيعة واستجمام', features:['برجولات خشبية خاصة','إضاءات فلكلورية دافئة','هواء ريفي نقي'], icon:'Trees' },
  { id:'kids', title:'ألعاب الأطفال', englishTitle:"Children's Playground", subtitle:'تجربة ترفيهية مخصصة ومبهجة للأطفال',
    description:'منطقة ألعاب متكاملة وآمنة تماماً، مصممة لإسعاد أطفالكم بالزحاليق والمراجيح والأنشطة الترفيهية الممتعة على أرضية آمنة، ليتسنى للآباء الاسترخاء والاستمتاع بوجبتهم براحة بال.',
    image:'kidsGames', badge:'أمان ومرح', features:['ألعاب متنوعة وآمنة','مساحات خضراء للركض','مجاورة لجلسات العائلات'], icon:'Gamepad2' },
  { id:'family', title:'أجواء عائلية', englishTitle:'Family Atmosphere', subtitle:'مكان مريح لقضاء أوقات لا تُنسى',
    description:'وجهة مثالية تجمع العائلة والأصدقاء في مساحات واسعة توفر الخصوصية التامة والهدوء، مع طاقم عمل ودود يحرص على تقديم أفضل ضيافة تلائم جميع أفراد الأسرة من الكبار والصغار.',
    image:'hero', badge:'دفء وخصوصية', features:['خصوصية تامة للعائلات','مناسب للمناسبات والعزومات','مواقف سيارات واسعة'], icon:'UsersRound' },
];
```

---

## 5. Page anatomy (top → bottom) with exact copy

Root: `min-h-screen flex flex-col bg-cream text-charcoal antialiased`. Section ids (anchors): `hero`, `about`, `experience`, `menu`, `gallery`, `reviews`, `location`, `contact`. Every section gets `scroll-mt-24` (see §9 issue 3).

### 5.1 TopBar (desktop only, `hidden md:block`)
Dark `#0f2921`, small text `#EFECE3/80`, gold bottom border `#C49A52/20`. Right group: clock icon + "مفتوح 24 ساعة طوال أيام الأسبوع" (gold) · map-pin + "طريق مصر إسكندرية الزراعي - إيتاي البارود". Left group: "⭐ 4.2 / 5 (3,878 تقييم على Google)" (gold, semibold) · phone icon + `01003347500` (`dir="ltr"`, `tel:` link).

### 5.2 Navbar (sticky, z-40)
- Logo block (right side in RTL): two lines — "مطعم وقرية الشيخ محمد" (white, font-black, `text-lg md:text-xl`) and "الجديدة • إيتاي البارود" (gold, xs). (An old "ش.م" monogram tile exists in the footer only.)
- Desktop links (≥ lg): الرئيسية `#hero` · من نحن `#about` · تجربة القرية `#experience` · المنيو `#menu` · معرض الصور `#gallery` · الموقع `#location` · تواصل معنا `#contact`. Hover: gold text + gold underline growing from the right. **Active link highlighted by scroll-spy** (new).
- Right actions (≥ sm): phone pill (olive bg, gold phone icon, number LTR) and gold-gradient button "احجز طاولة / استفسار" with calendar-check icon → opens BookingModal.
- Hamburger (< lg) toggling X/Menu icon, `aria-expanded`, `aria-controls`, Arabic aria-label ("فتح القائمة" / "إغلاق القائمة").
- Background: solid `#173D32` at top; after scrolling > 40px → `bg-[#173D32]/95 backdrop-blur-md shadow-lg border-b border-gold/30` with slightly reduced padding (animated smoothly).
- Mobile menu: see §9 issue 1 (critical): it must be rendered **outside** the blurred nav element, full-height under the bar, with staggered link entrance, a gold "احجز طاولة / استفسار سريع" button, and an olive "اتصل الآن: 01003347500" button. Closes on link click, on Escape, and when the viewport grows ≥ lg. Locks body scroll while open.

### 5.3 Hero (`#hero`, min-h 92vh, centered)
- Background: hero image `object-cover`, slow Ken-Burns zoom + scroll parallax, overlaid by `linear-gradient(to top, #0f2921, #173D32/75, #173D32/85)` and a radial vignette to `#0f2921/90`.
- Thin gold line at the very top (gradient transparent→gold→transparent, 60% opacity).
- Rating pill (rounded-full, `bg-primary/90`, gold border, blur): ★ "4.2 / 5" · "3,878 تقييم على Google" · ✨ "وجهة العائلات الأولى".
- H1: "أهلاً بيكم في" + (gold-gradient, block on mobile) "قرية الشيخ محمد الجديدة" — responsive `text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black`.
- Subtitle: "أكل بيتي أصيل.. أجواء عائلية.. وذكريات تستاهل تتعاش".
- Info bar (glass, `bg-black/25 backdrop-blur-sm`, rounded-2xl): clock + "مفتوح 24 ساعة" · map-pin + "طريق مصر إسكندرية الزراعي - إيتاي البارود".
- Three CTAs: gold gradient "اكتشف المكان" (→ `#experience`), outlined green/gold "تواصل معنا" (→ `#contact`), ghost glass "طلب حجز سريع" with phone-call icon (→ BookingModal).
- Bouncing arrow-down button → `#about`, aria-label "الانتقال إلى قسم من نحن".

### 5.4 AboutUs (`#about`, cream)
- Header: pill "عن قرية الشيخ محمد الجديدة"; H2 "أكتر من مجرد مطعم.. تجربة متكاملة"; gold line; paragraph "في قرية الشيخ محمد الجديدة، بنجمع بين الأكل المصري الأصيل والأجواء العائلية المميزة، علشان تستمتع بوقتك وسط مكان هادي ومناسب للعيلة والأصحاب."
- Layout: 12-col grid; right 7 cols = 3 highlight cards; left 5 cols = image composition.
- Highlight cards (white, gold/15 border, icon tile, check icon next to title):
  1. "أكل بطعم البيت" — "أكلات مصرية أصلية معمولة على أصولها، من المشويات وطواجن الفخار بالسمن البلدي لحد الشوربة والمقبلات البلدية الطازجة." (icon UtensilsCrossed, gold tint)
  2. "أجواء عائلية مميزة" — "جلسات رحبة ومريحة صُممت لتناسب تجمع العائلات والأصحاب، مع توفير أقصى درجات الخصوصية والراحة لجميع أفراد الأسرة." (Users, olive tint)
  3. "مكان للراحة والاستمتاع" — "استراحة مثالية ووجهة متكاملة على طريق مصر إسكندرية الزراعي، وسط مساحات خضراء، هواء نقي، وملاهي آمنة للأطفال." (Sparkles, green tint)
- Trust mini-tiles under the cards: "لحوم ودواجن بلدية / جودة وطزاجة يومية" (ShieldCheck) · "كرم وضيافة مصرية / خدمة تليق بكم" (HeartHandshake) · "24 ساعة / مستعدين لخدمتكم / في أي وقت من اليوم".
- Image: tajine image in a white-bordered rounded-3xl frame tilted 1° (straightens on hover, image zooms 105%). Floating dark-green badge overlapping bottom-right with gold border: gold circle "★", "تقييم حقيقي وموثق", "3,878 تقييم على Google", and the quote "مكان مريح تقدر تتمشى فيه وتستمتع بالأجواء واللحوم طعمها زي أكل البيت". Blurred olive/gold circles behind.

### 5.5 VillageExperience (`#experience`, green with dotted pattern + blobs)
- Header: gold-light pill with sparkles "قرية متكاملة لجميع أفراد العائلة"; H2 (white) "تجربة القرية.. فسحة وتجمع ولمة عيلة"; paragraph "قرية الشيخ محمد الجديدة صُممت لتكون وجهتكم المفضلة للاستمتاع بالطعام والراحة والترفيه في بيئة طبيعية راقية وآمنة."
- 2×2 grid (1 col on mobile) of the 4 EXPERIENCES cards. Card: `bg-primary-dark/90`, rounded-3xl, gold/30 border → full gold on hover. Top 256–288px image with bottom gradient, badge pill top-right (`bg-primary/90`, gold-light text), bottom-right gold icon tile + title (2xl black white) + English title (gold-light xs). Body: subtitle (gold-light, bold), description (cream/80), 3 features with check icons, then full-width gold-light button "حجز أو استفسار عن {title}" + left arrow → opens BookingModal with `serviceType` preset to the card title.

### 5.6 MenuSection (`#menu`, cream)
- Header: olive pill "أطايب المطبخ المصري"; H2 "منيو المطعم"; paragraph "تشكيلة فاخرة من المشويات، طواجن الفخار البلدي، وأطباق المطبخ المصري الريفي الأصيل المحضرة يومياً بكل حب."
- Notice box (gold/10 bg, gold/40 border, info icon): "**ملاحظة للزوار الكرام:** الأصناف والأسعار المعروضة أدناه هي **نماذج استرشادية تقريبية** لأشهر أكلاتنا (متوسط 200–400 ج.م للفرد). للاستفسار عن منيو اليوم الطازج، العزومات الخاصة، أو الأسعار الحالية تواصل معنا مباشرة." (keep it visible; the prices are placeholders).
- Category tabs (active: green bg, white text, gold ring; inactive: white with gold/20 border). Tabs must be keyboard-accessible with `role="tablist"`.
- Grid 1/2/3/4 columns. Card: white, gold/20 border, image 192px with category pill (top-right, green/90 + gold-light) and optional tag (top-left, solid gold with sparkle icon, e.g. "الأكثر طلباً", "طعم البيت", "مميز"), name (lg bold green), 2-line clamped description, divider, row "سعر تقديري:" + price placeholder chip, and a button "طلب أو استفسار عن الصنف" (message-circle icon) → opens MenuInquiryModal for that dish.
- Bottom CTA card (white, rounded-3xl): H3 "حابب تعرف تفاصيل أكتر عن قائمة أسعار اليوم؟"; text "فريق ضيافة قرية الشيخ محمد الجديدة في خدمتكم 24 ساعة للإجابة على استفسارات المنيو وتجهيز الولائم والعزومات."; buttons: gold gradient "استفسر عن المنيو على واتساب" and cream "اتصال مباشر: 01003347500" (read the number from BUSINESS_INFO).

### 5.7 GallerySection (`#gallery`, cream)
- Header: pill with camera icon "لقطات حية من قلب القرية"; H2 "معرض الصور"; paragraph "جولة بصرية بين أركان قرية الشيخ محمد الجديدة: الجلسات الخلابة، المشويات وطواجن الفرن، ملاهي الأطفال، والأجواء الليلية الساحرة."
- Filter tabs (same style as menu). Grid 1/2/4 columns, cards 256–288px high, rounded-2xl, gold/20 border. Desktop hover: dark gradient overlay with category chip (gold), zoom-in icon, title, 2-line description, image zooms 110%. **On touch/mobile a permanent bottom title bar** (`bg-black/60 blur`) is shown. Cards must be real `<button>`s (keyboard + screen-reader accessible).
- Click opens LightboxModal on the clicked item within the *filtered* list.

### 5.8 ReviewsSection (`#reviews`, green)
- Header: gold-light pill "تجارب حقيقية لرواد القرية"; H2 "آراء زوارنا ومراجعاتهم"; paragraph "ثقة أكثر من 3,800 زائر على خرائط جوجل، تجارب حقيقية تعكس جودة الطعام وحفاوة الاستقبال."
- Summary card (`bg-primary-dark`, gold/30 border, rounded-3xl): left column big **4.2** (Poppins, gold-light, 6xl) with 5 stars (4 full, 5th partially filled), "التقييم العام على Google Maps", "بناءً على 3,878 مراجعة موثقة". Right column: link "عرض جميع التقييمات على خرائط جوجل" (external icon, opens Google Maps URL) and the note "* مقتطفات نصية فعلية من تجارب الزوار". (See §9 issue 11 about the two invented progress bars.)
- 3 review cards (`bg-primary-dark/80`, gold/20 border → gold on hover): stars, highlight (gold-light xs), italic quote, footer with the tag "مقتبس من تقييمات Google Maps" and chip "تجربة معتمدة" (see §9 issue 11).

### 5.9 LocationAndContact (`#location`, cream; `#contact` anchors the action bar + form)
- Header: pill "طريقك إلينا وتواصلك معنا"; H2 "الموقع وبيانات التواصل"; paragraph "يسعدنا استقبالكم على مدار 24 ساعة يومياً. موقع استراتيجي ومميز على طريق القاهرة - الإسكندرية الزراعي بإيتاي البارود."
- 4 info cards (white, gold/20 border): **العنوان** (full address) · **رقم الهاتف** (`01003347500`, Poppins, LTR, with copy-to-clipboard button "نسخ" → "تم النسخ" with check for 2.5 s; use `navigator.clipboard` with a fallback and error handling; helper "متاح للاتصال والاستفسار المباشر") · **مواعيد العمل** ("مفتوح 24 ساعة", "طوال أيام الأسبوع بدون انقطاع") · **متوسط الأسعار** ("200–400 جنيه للفرد", "وجبات عائلية ومشويات بجودة عالية").
- Action bar (green, gold/30 border, rounded-3xl): H3 "جاهزون لاستقبالكم في أي وقت!", text "اختر الطريقة الأنسب لك للتواصل أو الوصول المباشر"; buttons: gold "اتصل الآن (01003347500)", WhatsApp-green "محادثة واتساب", glass "الاتجاهات على الخريطة" (navigation icon).
- Two-column: **Map card** (7 cols, 460px, header bar green with "خريطة الموقع المباشرة" + link "فتح في تطبيق Google Maps", iframe `https://maps.google.com/maps?q=<encoded Arabic name + ايتاي البارود>&t=&z=14&ie=UTF8&iwloc=&output=embed`, `loading="lazy"`, `title="موقع مطعم وقرية الشيخ محمد الجديدة"`) and **Booking card** (5 cols): title "طلب حجز طاولة أو جلسة عائلية", text "املأ البيانات وسيقوم النظام بإنشاء رسالة حجز فورية لإرسالها مباشرة لواتساب القرية لتأكيد الطاولة.", success banner "تم تجهيز الحجز بنجاح ونقلك إلى واتساب لإرسال التفاصيل!" and the shared `BookingForm`.

### 5.10 FinalCTA
Green section, background outdoor-seating image at 20% opacity with `#0f2921/90` overlay. Pill "مفتوح 24 ساعة يومياً بدون انقطاع"; H2 "مستنيينكم تعيشوا تجربة مختلفة!"; text "زورونا واستمتعوا بالأكل المصري الأصيل والأجواء العائلية."; buttons: gold "اتصل بينا (01003347500)" and glass "اعرف طريقنا" (navigation icon → scroll to `#location`); small line "طريق القاهرة - الإسكندرية الزراعي، مركز إيتاي البارود، محافظة البحيرة".

### 5.11 Footer (`#0f2921`, gold/30 top border)
12-col grid. **Brand (5):** gold-gradient rounded tile with "ش.م" (Cairo black), "مطعم وقرية الشيخ محمد" + "الجديدة • إيتاي البارود"; paragraph "وجهتكم الأولى للأكل المصري الأصيل والأجواء العائلية المميزة على طريق مصر إسكندرية الزراعي. نجمع بين دفء الضيافة الريفية، روعة الجلسات الخارجية، وملاهي الأطفال المتكاملة."; green pulsing dot + "مفتوح الآن لاستقبالكم 24 ساعة يومياً". **Quick links (3), 2-column list:** الرئيسية · من نحن · تجربة القرية · منيو المطعم · معرض الصور · آراء الزوار (`#reviews`) · الموقع والاتجاهات · تواصل معنا. **Contact (4):** address, phone (LTR link), "مفتوح 24 ساعة طوال العام", round WhatsApp and Google-Maps icon buttons. **Bottom row:** "جميع الحقوق محفوظة © {current year} مطعم وقرية الشيخ محمد الجديدة (Sheikh Mohamed El Gedida)" and "صُنع بحب للضيافة المصرية الأصيلة" + red heart.

### 5.12 Floating actions (fixed bottom-left, z-40)
Two round buttons stacked: WhatsApp-green (message-circle icon, tooltip "محادثة واتساب 24 ساعة") and gold-gradient phone (tooltip "اتصل بنا: 01003347500"). Tooltips appear on hover (desktop only) toward the inside of the screen. aria-labels: "تواصل مع المطعم عبر واتساب", "اتصل الآن بمطعم وقرية الشيخ محمد الجديدة".

### 5.13 Modals (shared `Modal` primitive: portal, backdrop, focus trap, Escape to close, click-outside to close, body-scroll lock, restores focus)
- **BookingModal:** header green: small gold "قرية ومطعم الشيخ محمد الجديدة", H3 "احجز طاولتك أو جلستك العائلية", text "املأ البيانات لإرسال طلب حجز مباشر لفريق الاستقبال عبر واتساب". Fields: الاسم بالكامل * (placeholder "مثال: محمد عبد الله") · رقم الهاتف (واتساب للتأكيد) * (placeholder `01003347500`, LTR) · التاريخ المرغوب (date) · الوقت التقريبي (time) · عدد الأفراد * (default 4) · نوع الجلسة (select: جلسة عائلية خارجية / صالة داخلية مكيفة / قريبة من ألعاب الأطفال / برجولة خاصة) · ملاحظات أو مناسبات خاصة (placeholder "مثال: عزومة عائلية / طلب أصناف مشويات مسبقاً..."). Buttons: gold "إرسال تفاصيل الحجز عبر واتساب" and grey "أو اتصل مباشرة: 01003347500". The select value must be pre-set from the card that opened it and the form must reset every time it opens.
- **MenuInquiryModal:** title "استفسار عن {dish}" or, with no dish, "استفسار عن قائمة أسعار اليوم"; subtitle "تواصل مباشرة مع إدارة المطعم للحصول على أحدث الأسعار ومتاح اليوم"; body with dish: `هل ترغب في طلب أو الاستفسار عن وزن وسعر وتفاصيل صنف "{dish}"؟`, without dish: "يسعدنا إرسال قائمة منيو اليوم والأسعار الطازجة لك مباشرة على تطبيق واتساب أو استقبال استفسارك عبر الهاتف."; buttons: WhatsApp green "محادثة واتساب فورية" and gold-light "اتصال هاتفي مباشر (01003347500)".
- **LightboxModal:** black/95 blur overlay, close button top-left, prev/next arrows (hidden on mobile → replaced by swipe), image `object-contain` max 75vh, caption: category chip (gold), title, description, counter "صورة {n} من {total}". Keyboard: Escape closes; arrows navigate (in RTL, ArrowRight = previous visually-right item — pick a consistent RTL mapping and test it); wraps around; preloads neighbor images.

---

## 6. Dynamic behavior & animation spec (this is the main upgrade — implement all of it with `motion/react`)

Use one `Reveal` wrapper and shared variants so the whole site feels coherent. Durations 0.5–0.8 s, easing `[0.22, 1, 0.36, 1]`, springs for modals/buttons. All of it disabled/simplified when `useReducedMotion()` is true.

1. **Scroll progress bar:** thin gold bar fixed at the very top (`useScroll` → `scaleX`, origin right for RTL).
2. **Navbar:** smooth shrink/blur transition; animated underline using `layoutId` that slides between active links (scroll-spy via IntersectionObserver). Mobile menu: `AnimatePresence`, slide/fade from top with staggered link entrance (50 ms), links have a subtle gold hover bar.
3. **Hero:** background parallax (`useScroll` + `useTransform`) with slow zoom; headline lines reveal word-by-word (mask/translate); rating pill drops in; floating soft gold "lantern" light particles (6–10, CSS/motion, low opacity, pointer-events none); CTA buttons stagger in with a gentle gold shimmer sweep on the primary one; scroll arrow bounce. Content slightly fades/translates up as the user scrolls past.
4. **Section headers:** pill fades in, H2 slides up, the gold line **draws** from the center outward (scaleX 0→1).
5. **About:** cards stagger from the right (RTL), icon tile scales on hover; image frame has 3D tilt on pointer move (small, disabled on touch); floating badge gently bobs; trust tiles count/pop in. Render `BUSINESS_INFO.services` as an infinite auto-scrolling chip marquee (pauses on hover, reduced-motion = static wrap).
6. **Experience:** cards reveal with stagger; image zoom on hover; the 4 cards can also expand features with a staggered check-mark entrance on scroll-in.
7. **Menu:** category filter uses `AnimatePresence mode="popLayout"` + `layout` so cards smoothly reflow; card hover lifts with shadow; the active tab pill uses a shared `layoutId` background that slides between tabs; popular badges have a subtle shine.
8. **Gallery:** filter with the same layout animation; hover overlay transitions; lightbox opens with shared-element feel (scale/fade), **swipe left/right with `drag="x"`**, animated slide direction, backdrop fade.
9. **Reviews:** **animated counter** that counts up to 4.2 (one decimal) and 3,878 (thousands separator, Latin digits) when scrolled into view (`useInView`, once); stars fill sequentially; review cards stagger and hover-lift; optional auto-rotating highlight (pause on hover).
10. **Location/Contact:** info cards stagger; copy-phone button morphs icon with `AnimatePresence`; form fields animate error messages in/out (height + fade); successful submit shows an animated check banner; map iframe fades in when it loads.
11. **FinalCTA:** slow background zoom, pulsing ring around the call button.
12. **Floating buttons:** spring entrance after 1 s; WhatsApp has a soft pulse ring every few seconds; hover scale 1.1, tap 0.95. Optionally hide while a modal is open.
13. **Buttons everywhere:** `whileHover` (lift −2 px), `whileTap` (scale 0.97).
14. **Modals:** backdrop fade + panel spring scale/translate, exit animations via `AnimatePresence`.
15. **Performance:** animate only `transform`/`opacity`; `viewport={{ once: true, margin: "-80px" }}`; no layout thrash; `will-change` only where needed; keep Lighthouse performance high.

Everything dynamic is data-driven: sections map over the arrays in `src/data/`, so editing a menu item/review/gallery entry in one file updates the site.

---

## 7. Logic (`src/lib/`) — pure functions, easy to test

- `filterByCategory(items, category)` → returns all when category is `''`, `'الكل'` or `'all'` (case-insensitive), else items whose `category` equals it.
- `validateBookingForm({ name, phone, guests })`:
  - name: trimmed length ≥ 2 else `"يرجى إدخال الاسم بالكامل"`.
  - phone: strip spaces/dashes; empty → `"يرجى إدخال رقم الهاتف"`; must match the Egyptian mobile pattern `^(?:\+?20|0)?1[0125][0-9]{8}$` (normalize `+20`/`20` prefix) else `"يرجى إدخال رقم هاتف صحيح (مثال: 01003347500)"`. (**Bug fix, see §9 issue 6.**)
  - guests: integer; < 1 → `"عدد الأفراد يجب أن يكون 1 على الأقل"`; > 150 → `"للحجوزات الكبيرة جداً يرجى التواصل المباشر عبر الهاتف"`. The number input's `max` must match this limit (150).
  - Return `{ isValid, errors }`. Validate on blur and on submit; show errors inline with an alert icon.
- `buildBookingWhatsAppUrl(form)` → `https://wa.me/<BUSINESS_INFO.whatsappNumber>?text=<encodeURIComponent(message)>` where the message lines are, in order (skip optional lines when empty):
  ```
  السلام عليكم ورحمة الله وبركاته،
  أود الاستفسار والحجز في مطعم وقرية الشيخ محمد الجديدة:
  👤 الاسم: {name}
  📱 الهاتف: {phone}
  👥 عدد الأفراد: {guests} فرد
  🍽 نوع الخدمة / الجلسة: {serviceType || 'جلسة عائلية'}
  📅 التاريخ: {date}            (optional)
  ⏰ الوقت التقريبي: {time}      (optional)
  📝 ملاحظات خاصة: {notes}      (optional)
  شكراً جزيلاً لكم وفي انتظار تأكيدكم.
  ```
- `buildMenuInquiryWhatsAppUrl(dishName?)` → with dish: `السلام عليكم، حابب استفسر عن أسعار وتفاصيل طبق "{dish}" اليوم في مطعم وقرية الشيخ محمد الجديدة.` ; without: `السلام عليكم، حابب استفسر عن منيو اليوم وأحدث العروض والأسعار في مطعم وقرية الشيخ محمد الجديدة.`
- `calculateSatisfactionRate(rating, max = 5)` → rounded percentage clamped 0–100 (use it if a percentage is shown; otherwise omit).
- Opening WhatsApp: `window.open(url, '_blank', 'noopener,noreferrer')`. Handle popup blockers gracefully (fallback to `location.href` or a visible "افتح واتساب" link).
- Add small unit tests (Vitest is fine, JS only) for `filterByCategory`, `validateBookingForm` (valid/invalid numbers incl. `+201003347500`, `abcdefghij`, `0100`), and both URL builders.

---

## 8. SEO, accessibility, quality

- `<title>`: `مطعم وقرية الشيخ محمد الجديدة | Sheikh Mohamed El Gedida`.
- Meta description: "الموقع الرسمي لمطعم وقرية الشيخ محمد الجديدة على طريق مصر إسكندرية الزراعي بإيتاي البارود. أكل مصري أصيل، أجواء عائلية مميزة، جلسات خارجية في الطبيعة، وملاهي أطفال."
- Open Graph: `og:type=restaurant.restaurant`, `og:title` same as title, `og:description` "أكل بيتي أصيل.. أجواء عائلية.. وذكريات تستاهل تتعاش على طريق مصر إسكندرية الزراعي - إيتاي البارود.", `og:locale=ar_EG`, `og:site_name="قرية الشيخ محمد الجديدة"`, plus an `og:image` (use the hero image, 1200×630). Twitter card `summary_large_image` with title "مطعم وقرية الشيخ محمد الجديدة" and description "أكل بيتي أصيل وأجواء عائلية مميزة مفتوح 24 ساعة بإيتاي البارود.".
- JSON-LD `Restaurant`: name, alternateName "Sheikh Mohamed El Gedida Restaurant & Village", telephone `+201003347500`, servesCuisine ["Egyptian","Middle Eastern","Grill"], priceRange "EGP 200–400", aggregateRating 4.2 / 3878 / best 5, PostalAddress (streetAddress "Cairo-Alexandria Agricultural Road", addressLocality "Itay El Barud", addressRegion "Beheira Governorate", addressCountry "EG"), openingHoursSpecification all 7 days 00:00–23:59. **Do NOT include a fake `url`** (the old file had `https://sheikh-mohamed-village.eg`, which is not a real site) and do not use a stock-photo `image`; use the real deployed URL via a placeholder comment for the developer to fill in.
- Add a favicon (simple "ش.م" gold-on-green SVG) and `theme-color` `#173D32`.
- Accessibility: semantic landmarks (`header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`), skip-to-content link, visible focus rings (`ring-gold`), buttons for all clickable cards, `aria-live` for form errors/success, color contrast AA (check gold on cream), `lang="ar"` + `dir="rtl"`, phone numbers wrapped with `dir="ltr"`.
- Responsive: test at 360, 390, 768, 1024, 1280, 1536 px. No horizontal scroll at any width. Touch targets ≥ 44 px.

---

## 9. KNOWN ISSUES in the previous version — you MUST fix every one and prove it (see §10 checklist)

1. **(CRITICAL) Mobile menu only opens ~1px tall once the page is scrolled.** Cause: the drawer was `position: fixed` *inside* the `<nav>`, and after scrolling the nav gets `backdrop-blur` (`backdrop-filter`). Any element with `backdrop-filter`/`filter`/`transform` becomes the containing block for its `fixed` descendants, so the "fullscreen" drawer was clamped to the nav's height. It worked only at scrollY ≤ 40 where the blur was off. **Fix:** render the mobile menu as a sibling of `<nav>` (or via a portal to `document.body`), keep nav height constant while it is open, and lock body scroll. Verify: open the menu at top **and** after scrolling 1000 px on a 390 px-wide viewport — it must fill the screen below the bar in both cases.
2. **Rules-of-Hooks violations:** `BookingModal`, `MenuInquiryModal`(no hooks but same pattern) and `LightboxModal` returned `null` *before* calling `useState`/`useEffect`. It only worked by accident (state reset on every close). Always call hooks at the top; control visibility with `AnimatePresence` / conditional rendering of the *child*; reset form state explicitly when the modal opens.
3. **Sticky navbar covers section titles on anchor jumps** (no `scroll-margin-top`). Add `scroll-mt-24` (≈ nav height) to all sections, and keep `scroll-behavior: smooth` (also provide `scroll-behavior: auto` under reduced motion).
4. **Undefined/non-existent classes:** `animate-fade-in` and `bg-radial-at-c` are not defined in the project's CSS/Tailwind setup (no effect or silent failure). Define your own keyframes/utilities in `@theme`/`@keyframes` or use motion instead; do not reference undefined classes.
5. **Conflicting scrollbar CSS:** a custom green scrollbar was defined and then immediately hidden by `*::-webkit-scrollbar { display:none }`. Choose one.
6. **Phone validation is wrong:** the condition `!regex.test(p) && p.length < 10` lets any string of ≥ 10 characters (e.g. `abcdefghij`) pass. Use the strict regex in §7 and test it.
7. **Number-input limit mismatch:** inputs had `max="100"` while validation allowed 150. Unify to one constant.
8. **Hard-coded duplicates of the phone/WhatsApp number** (in `App.tsx` tooltip, `MenuSection`, `villageLogic` twice). Read everything from `BUSINESS_INFO`.
9. **External hot-linked Unsplash images** (8 of 12 menu cards): slow, can break/rate-limit, unrelated pictures, and the same photo was reused for two different dishes (m3 and m5). Replace with local images or the designed fallback (§3).
10. **Duplicate forms:** the booking form existed twice with slightly different select options (`برجولة خاصة للعزومات` vs `برجولة خاصة`, `جلسة قريبة من ملاهي الأطفال` vs `قريبة من ألعاب الأطفال`). Use one component and one option list: `جلسة عائلية خارجية`, `صالة داخلية مكيفة`, `قريبة من ألعاب الأطفال`, `برجولة خاصة`.
11. **Invented/unsupported trust claims:** the reviews summary had two progress bars ("جودة الأكل والطواجن البلدية" 90% "ممتاز" and "نظافة المكان والراحة العائلية" 88% "عالي جداً") with numbers that come from no data source, plus the labels "تجربة معتمدة" and "تقييم حقيقي وموثق". Remove the fake percentages (or replace them with a clearly real metric such as the 4.2 / 3,878 from Google), and drop "تجربة معتمدة"/"موثق" wording unless backed by data. Keep the Google-sourced numbers (4.2, 3,878) and the 3 excerpts.
12. **Gallery cards were clickable `div`s** (not keyboard accessible), lightbox had no focus trap, and neither modal closed with Escape (only the lightbox did). Fix per §5.7/§5.13.
13. **Redundant `#contact`/`#location` anchors:** `#contact` pointed at the top of the location section (same place as `#location`). Make `#contact` scroll to the action bar + form.
14. **Unused dependencies/config:** `express`, `@google/genai`, `dotenv`, `tsx`, `esbuild` (which also caused an `ERESOLVE` peer conflict with Vite 8 on `npm install gh-pages`), AI-Studio HMR comments in vite config, `"clean": "rm -rf ..."` (breaks on Windows), an `.env.example` for a key that is never used. Remove them. The result must install with plain `npm install` (no `--legacy-peer-deps`).
15. **No `og:image`, fake JSON-LD `url`, no favicon, no theme-color** (see §8).
16. **Heavy images (~1 MB each, 5 files)** with no dimensions/srcset. Add dimensions, lazy loading, and WebP recommendation.
17. **`services` array defined but never rendered** — now shown (§6.5).
18. **Booking modal opened with stale `serviceType`** because state was initialised once; ensure it follows the card that opened it.
19. **Hover-only information on touch devices** (gallery overlay, floating-button tooltips) — provide a permanent mobile alternative (already specified).
20. **GitHub Pages compatibility:** the site is deployed to `https://<user>.github.io/<repo>/`. With `base: './'` all assets must still load; verify the production build with `npm run build && npm run preview` and open it from a sub-path.

---

## 10. Acceptance checklist (answer each item explicitly at the end of your response)

- [ ] `npm install` (no flags) and `npm run build` succeed, no TypeScript files, no console warnings.
- [ ] Mobile menu opens full-height both at the top of the page and after scrolling (issue 1).
- [ ] Every Arabic string in §4–§5 appears exactly as written.
- [ ] Phone `01003347500`, WhatsApp `201003347500`, address and hours come from a single `BUSINESS_INFO`.
- [ ] Menu and gallery filters animate and work; lightbox supports keyboard + swipe + Escape + focus trap.
- [ ] Both forms validate with the corrected rules; the generated WhatsApp URLs match §7 and open correctly.
- [ ] Counters, parallax, staggered reveals, marquee, scroll-progress and navbar scroll-spy all work, and are disabled under `prefers-reduced-motion`.
- [ ] No Unsplash/external images; placeholders look intentional.
- [ ] No fake percentages/"certified" claims; Google numbers kept.
- [ ] Lighthouse (mobile) targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 — state what you changed to reach them.
- [ ] Works at 360 px, 768 px, 1280 px, no horizontal scroll, RTL correct (arrows, margins, tooltips).
- [ ] Short README with: run/build/deploy-to-GitHub-Pages steps, where to edit menu/gallery/reviews/contact data, and where to drop the 5 images.

**Output format:** first list the final file tree, then output every file in full inside separate fenced code blocks labelled with its path. Finish with the checklist above marked ✅/❌ with a one-line note each.
