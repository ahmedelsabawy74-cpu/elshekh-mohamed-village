export const MIN_BOOKING_GUESTS = 1;
export const MAX_BOOKING_GUESTS = 150;

const EGYPTIAN_MOBILE_REGEX = /^(?:\+?20|0)?1[0125][0-9]{8}$/;

export function filterByCategory(items, category) {
  if (!Array.isArray(items)) return [];
  const normalized = typeof category === 'string' ? category.trim() : '';
  if (!normalized || normalized === 'الكل' || normalized.toLowerCase() === 'all') {
    return items;
  }
  return items.filter((item) => item?.category === normalized);
}

export function normalizePhoneInput(phone) {
  if (typeof phone !== 'string') return '';
  return phone.replace(/[\s\-()]/g, '').trim();
}

export function validateBookingForm({ name = '', phone = '', guests = 4 } = {}) {
  const errors = {};

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  if (trimmedName.length < 2) {
    errors.name = 'يرجى إدخال الاسم بالكامل';
  }

  const cleanedPhone = normalizePhoneInput(phone);
  if (!cleanedPhone) {
    errors.phone = 'يرجى إدخال رقم الهاتف';
  } else if (!EGYPTIAN_MOBILE_REGEX.test(cleanedPhone)) {
    errors.phone = 'يرجى إدخال رقم هاتف صحيح (مثال: 01003347500)';
  }

  const parsedGuests =
    typeof guests === 'number' ? guests : Number(String(guests).trim());

  if (
    String(guests).trim() === '' ||
    !Number.isFinite(parsedGuests) ||
    !Number.isInteger(parsedGuests) ||
    parsedGuests < MIN_BOOKING_GUESTS
  ) {
    errors.guests = 'عدد الأفراد يجب أن يكون 1 على الأقل';
  } else if (parsedGuests > MAX_BOOKING_GUESTS) {
    errors.guests = 'للحجوزات الكبيرة جداً يرجى التواصل المباشر عبر الهاتف';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateSatisfactionRate(rating, max = 5) {
  if (!Number.isFinite(rating) || !Number.isFinite(max) || max <= 0) return 0;
  const pct = Math.round((rating / max) * 100);
  return Math.max(0, Math.min(100, pct));
}
