# مطعم وقرية الشيخ محمد الجديدة (Sheikh Mohamed El Gedida)

الموقع الرسمي لمطعم وقرية الشيخ محمد الجديدة على طريق القاهرة - الإسكندرية الزراعي، إيتاي البارود، محافظة البحيرة.

## التشغيل والبناء والنشر (GitHub Pages)

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير المحلي
npm run dev

# تشغيل اختبارات التحقق والمنطق
npm test

# بناء النسخة الإنتاجية
npm run build

# معاينة البناء الإنتاجي محلياً
npm run preview

# النشر على GitHub Pages (يُنفذ البناء تلقائياً قبل الرفع)
npm run deploy
```

> عند النشر على GitHub Pages، تأكد من تفعيل GitHub Pages على فرع `gh-pages` من إعدادات المستودع. يستخدم ملف `vite.config.js` الإعداد `base: './'` ليعمل الموقع بسلاسة تحت أي مسار فرعي مثل `/<repo-name>/`.

## أماكن تعديل البيانات

- **بيانات التواصل والعنوان وساعات العمل والخدمات:** `src/data/businessInfo.js` (مصدر الحقيقة الوحيد للهاتف والواتساب والموقع).
- **قائمة الطعام (المنيو):** `src/data/menu.js`
- **معرض الصور:** `src/data/gallery.js`
- **بطاقات تجربة القرية:** `src/data/experiences.js`
- **آراء الزوار:** `src/data/reviews.js`

## الصور المحلية والأداء

يتم استيراد الصور الخمس فقط عبر `src/data/images.js` من المجلد `src/assets/images/`:

1. `sheikh_village_hero_1793365934255.jpg`
2. `egyptian_mixed_grill_1793365949250.jpg`
3. `village_kids_games_1793365962660.jpg`
4. `egyptian_tajine_dish_1793365980805.jpg`
5. `outdoor_village_seating_1793365994223.jpg`

> **توصية للأداء (Lighthouse):** يفضّل ضغط الصور وتحويلها إلى صيغة `WebP` بحجم لا يتجاوز `200 KB` لكل صورة مع الحفاظ على نفس الأبعاد لتحقيق أفضل سرعة تحميل على الجوال.
