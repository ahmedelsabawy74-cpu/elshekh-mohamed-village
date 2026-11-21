import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterByCategory,
  validateBookingForm,
  calculateSatisfactionRate,
  MAX_BOOKING_GUESTS,
} from './validators.js';
import {
  buildBookingWhatsAppUrl,
  buildMenuInquiryWhatsAppUrl,
} from './whatsapp.js';
import { BUSINESS_INFO } from '../data/businessInfo.js';
import { MENU_ITEMS } from '../data/menu.js';
import { GALLERY_ITEMS } from '../data/gallery.js';
import { EXPERIENCES } from '../data/experiences.js';
import {
  collectPreloadUrls,
  calculatePreloadProgress,
} from './preloader.js';
import {
  BACK_TO_TOP_THRESHOLD,
  calculateScrollProgress,
  calculateRingStrokeOffset,
  shouldShowBackToTop,
} from './scrollProgress.js';

test('filterByCategory returns all items for empty, الكل, and all (case-insensitive)', () => {
  const sample = [
    { id: '1', category: 'المشويات' },
    { id: '2', category: 'اللحوم' },
  ];
  assert.equal(filterByCategory(sample, '').length, 2);
  assert.equal(filterByCategory(sample, 'الكل').length, 2);
  assert.equal(filterByCategory(sample, 'all').length, 2);
  assert.equal(filterByCategory(sample, 'ALL').length, 2);
  assert.deepEqual(filterByCategory(sample, 'المشويات'), [
    { id: '1', category: 'المشويات' },
  ]);
});

test('validateBookingForm rejects invalid phone numbers including >=10 char non-digits', () => {
  const alphaPhone = validateBookingForm({
    name: 'محمد أحمد',
    phone: 'abcdefghij',
    guests: 4,
  });
  assert.equal(alphaPhone.isValid, false);
  assert.equal(
    alphaPhone.errors.phone,
    'يرجى إدخال رقم هاتف صحيح (مثال: 01003347500)'
  );

  const shortPhone = validateBookingForm({
    name: 'محمد أحمد',
    phone: '0100',
    guests: 4,
  });
  assert.equal(shortPhone.isValid, false);
  assert.ok(shortPhone.errors.phone);

  const emptyPhone = validateBookingForm({
    name: 'محمد أحمد',
    phone: '   ',
    guests: 4,
  });
  assert.equal(emptyPhone.isValid, false);
  assert.equal(emptyPhone.errors.phone, 'يرجى إدخال رقم الهاتف');
});

test('validateBookingForm accepts valid Egyptian mobile formats including +20 and 20 prefixes', () => {
  assert.equal(
    validateBookingForm({ name: 'محمد عبدالله', phone: '01003347500', guests: 4 })
      .isValid,
    true
  );
  assert.equal(
    validateBookingForm({
      name: 'محمد عبدالله',
      phone: '+201003347500',
      guests: 2,
    }).isValid,
    true
  );
  assert.equal(
    validateBookingForm({
      name: 'محمد عبدالله',
      phone: '20 112 345 6789',
      guests: 10,
    }).isValid,
    true
  );
});

test('validateBookingForm enforces name length and unified guest bounds', () => {
  const badName = validateBookingForm({
    name: 'م',
    phone: '01003347500',
    guests: 4,
  });
  assert.equal(badName.isValid, false);
  assert.equal(badName.errors.name, 'يرجى إدخال الاسم بالكامل');

  const zeroGuests = validateBookingForm({
    name: 'محمد أحمد',
    phone: '01003347500',
    guests: 0,
  });
  assert.equal(zeroGuests.isValid, false);
  assert.equal(zeroGuests.errors.guests, 'عدد الأفراد يجب أن يكون 1 على الأقل');

  const tooManyGuests = validateBookingForm({
    name: 'محمد أحمد',
    phone: '01003347500',
    guests: MAX_BOOKING_GUESTS + 1,
  });
  assert.equal(tooManyGuests.isValid, false);
  assert.equal(
    tooManyGuests.errors.guests,
    'للحجوزات الكبيرة جداً يرجى التواصل المباشر عبر الهاتف'
  );
});

test('buildBookingWhatsAppUrl formats required and optional fields correctly', () => {
  const url = buildBookingWhatsAppUrl({
    name: 'أحمد علي',
    phone: '01003347500',
    guests: 6,
    serviceType: 'برجولة خاصة',
    date: '2026-12-01',
    time: '',
    notes: 'عزومة عائلية',
  });
  assert.ok(url.startsWith(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=`));
  const decoded = decodeURIComponent(url.split('text=')[1]);
  assert.ok(decoded.includes('👤 الاسم: أحمد علي'));
  assert.ok(decoded.includes('📱 الهاتف: 01003347500'));
  assert.ok(decoded.includes('👥 عدد الأفراد: 6 فرد'));
  assert.ok(decoded.includes('🍽 نوع الخدمة / الجلسة: برجولة خاصة'));
  assert.ok(decoded.includes('📅 التاريخ: 2026-12-01'));
  assert.ok(!decoded.includes('⏰ الوقت التقريبي:'));
  assert.ok(decoded.includes('📝 ملاحظات خاصة: عزومة عائلية'));
});

test('buildMenuInquiryWhatsAppUrl builds dish and general menu inquiry URLs', () => {
  const dishUrl = buildMenuInquiryWhatsAppUrl('مشكل مشويات الشيخ');
  const dishText = decodeURIComponent(dishUrl.split('text=')[1]);
  assert.ok(dishText.includes('طبق "مشكل مشويات الشيخ"'));

  const generalUrl = buildMenuInquiryWhatsAppUrl();
  const generalText = decodeURIComponent(generalUrl.split('text=')[1]);
  assert.ok(generalText.includes('منيو اليوم وأحدث العروض والأسعار'));
});

test('calculateSatisfactionRate clamps percentage between 0 and 100', () => {
  assert.equal(calculateSatisfactionRate(4.2, 5), 84);
  assert.equal(calculateSatisfactionRate(6, 5), 100);
  assert.equal(calculateSatisfactionRate(-1, 5), 0);
});

test('collectPreloadUrls prioritizes hero and deduplicates URLs', () => {
  const urls = collectPreloadUrls({
    dishA: { src: '/a.jpg' },
    hero: { src: '/hero.jpg' },
    dishB: { src: '/a.jpg' },
    empty: { src: '' },
  });
  assert.deepEqual(urls, ['/hero.jpg', '/a.jpg']);
});

test('calculatePreloadProgress computes clamped percentages safely', () => {
  assert.equal(calculatePreloadProgress(0, 10), 0);
  assert.equal(calculatePreloadProgress(5, 10), 50);
  assert.equal(calculatePreloadProgress(12, 10), 100);
  assert.equal(calculatePreloadProgress(0, 0), 100);
});

test('all menu, gallery, and experience entries reference a valid non-empty image key', () => {
  for (const item of [...MENU_ITEMS, ...GALLERY_ITEMS, ...EXPERIENCES]) {
    assert.equal(typeof item.image, 'string');
    assert.ok(item.image.trim().length > 0);
  }
});

test('calculateScrollProgress normalizes and clamps scroll ratios safely', () => {
  assert.equal(calculateScrollProgress(0, 2000, 1000), 0);
  assert.equal(calculateScrollProgress(500, 2000, 1000), 0.5);
  assert.equal(calculateScrollProgress(1000, 2000, 1000), 1);
  assert.equal(calculateScrollProgress(1500, 2000, 1000), 1);
  assert.equal(calculateScrollProgress(-50, 2000, 1000), 0);
  assert.equal(calculateScrollProgress(200, 800, 1000), 0);
});

test('calculateRingStrokeOffset maps scroll progress to SVG strokeDashoffset', () => {
  const c = 100;
  assert.equal(calculateRingStrokeOffset(c, 0), 100);
  assert.equal(calculateRingStrokeOffset(c, 0.25), 75);
  assert.equal(calculateRingStrokeOffset(c, 0.5), 50);
  assert.equal(calculateRingStrokeOffset(c, 1), 0);
  assert.equal(calculateRingStrokeOffset(c, 2), 0);
});

test('shouldShowBackToTop activates strictly past threshold', () => {
  assert.equal(shouldShowBackToTop(0), false);
  assert.equal(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD), false);
  assert.equal(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD + 1), true);
});
