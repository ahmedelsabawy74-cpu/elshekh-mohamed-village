import { BUSINESS_INFO } from '../data/businessInfo.js';

export function buildBookingMessage(form = {}) {
  const {
    name = '',
    phone = '',
    guests = 4,
    serviceType = '',
    date = '',
    time = '',
    notes = '',
  } = form;

  const lines = [
    'السلام عليكم ورحمة الله وبركاته،',
    'أود الاستفسار والحجز في مطعم وقرية الشيخ محمد الجديدة:',
    `👤 الاسم: ${String(name).trim()}`,
    `📱 الهاتف: ${String(phone).trim()}`,
    `👥 عدد الأفراد: ${guests} فرد`,
    `🍽 نوع الخدمة / الجلسة: ${serviceType || 'جلسة عائلية'}`,
  ];

  if (date && String(date).trim()) {
    lines.push(`📅 التاريخ: ${String(date).trim()}`);
  }
  if (time && String(time).trim()) {
    lines.push(`⏰ الوقت التقريبي: ${String(time).trim()}`);
  }
  if (notes && String(notes).trim()) {
    lines.push(`📝 ملاحظات خاصة: ${String(notes).trim()}`);
  }

  lines.push('شكراً جزيلاً لكم وفي انتظار تأكيدكم.');
  return lines.join('\n');
}

export function buildBookingWhatsAppUrl(form = {}) {
  const message = buildBookingMessage(form);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function buildMenuInquiryWhatsAppUrl(dishName) {
  const trimmedDish = typeof dishName === 'string' ? dishName.trim() : '';
  const message = trimmedDish
    ? `السلام عليكم، حابب استفسر عن أسعار وتفاصيل طبق "${trimmedDish}" اليوم في مطعم وقرية الشيخ محمد الجديدة.`
    : 'السلام عليكم، حابب استفسر عن منيو اليوم وأحدث العروض والأسعار في مطعم وقرية الشيخ محمد الجديدة.';

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function openWhatsAppUrl(url) {
  if (typeof window === 'undefined') {
    return { opened: false, url };
  }
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (win) {
    return { opened: true, url };
  }
  return { opened: false, url };
}
