import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { BUSINESS_INFO, SEATING_OPTIONS } from '../../data/businessInfo.js';
import {
  MAX_BOOKING_GUESTS,
  MIN_BOOKING_GUESTS,
  validateBookingForm,
} from '../../lib/validators.js';
import {
  buildBookingWhatsAppUrl,
  openWhatsAppUrl,
} from '../../lib/whatsapp.js';
import { GoldButton } from './GoldButton.jsx';

function createInitialState(initialServiceType) {
  return {
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 4,
    serviceType: initialServiceType || SEATING_OPTIONS[0],
    notes: '',
  };
}

export function BookingForm({
  initialServiceType = SEATING_OPTIONS[0],
  resetKey = 0,
  idPrefix = 'booking',
  showDirectCall = true,
  onSuccess,
}) {
  const [form, setForm] = useState(() => createInitialState(initialServiceType));
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({
    submitted: false,
    whatsappUrl: '',
    popupBlocked: false,
  });

  useEffect(() => {
    setForm(createInitialState(initialServiceType));
    setTouched({});
    setErrors({});
    setSubmitState({ submitted: false, whatsappUrl: '', popupBlocked: false });
  }, [initialServiceType, resetKey]);

  const handleFieldChange = (field, value) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    if (touched[field]) {
      const validation = validateBookingForm(nextForm);
      setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateBookingForm(form);
    setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateBookingForm(form);
    setTouched({ name: true, phone: true, guests: true });
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    const url = buildBookingWhatsAppUrl(form);
    const result = openWhatsAppUrl(url);
    setSubmitState({
      submitted: true,
      whatsappUrl: url,
      popupBlocked: !result.opened,
    });
    if (typeof onSuccess === 'function') {
      onSuccess(url);
    }
  };

  const inputBase =
    'w-full rounded-xl border border-primary/15 bg-cream/60 px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-colors min-h-[44px]';

  const renderError = (field) =>
    errors[field] ? (
      <p
        className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-700"
        role="alert"
      >
        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>{errors[field]}</span>
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div aria-live="polite">
        {submitState.submitted && (
          <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-4 text-emerald-950">
            <div className="flex items-start gap-2.5">
              <CheckCircle2
                className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="space-y-2 text-sm">
                <p className="font-bold">
                  تم تجهيز الحجز بنجاح ونقلك إلى واتساب لإرسال التفاصيل!
                </p>
                {submitState.whatsappUrl && (
                  <a
                    href={submitState.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-primary underline decoration-gold underline-offset-4 hover:text-gold-ink"
                  >
                    <span>
                      {submitState.popupBlocked
                        ? 'افتح واتساب لإرسال الحجز الآن'
                        : 'اضغط هنا إذا لم يفتح واتساب تلقائياً'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
          >
            الاسم بالكامل <span className="text-red-600">*</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="مثال: محمد عبد الله"
            aria-invalid={Boolean(errors.name)}
            className={`${inputBase} ${
              errors.name ? 'border-red-500 focus:ring-red-200' : ''
            }`}
          />
          {renderError('name')}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
          >
            رقم الهاتف (واتساب للتأكيد) <span className="text-red-600">*</span>
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            required
            value={form.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder={BUSINESS_INFO.phone}
            aria-invalid={Boolean(errors.phone)}
            className={`${inputBase} text-left font-num ${
              errors.phone ? 'border-red-500 focus:ring-red-200' : ''
            }`}
          />
          {renderError('phone')}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-date`}
            className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
          >
            التاريخ المرغوب
          </label>
          <input
            id={`${idPrefix}-date`}
            name="date"
            type="date"
            value={form.date}
            onChange={(e) => handleFieldChange('date', e.target.value)}
            className={`${inputBase} font-num`}
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-time`}
            className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
          >
            الوقت التقريبي
          </label>
          <input
            id={`${idPrefix}-time`}
            name="time"
            type="time"
            value={form.time}
            onChange={(e) => handleFieldChange('time', e.target.value)}
            className={`${inputBase} font-num`}
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-guests`}
            className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
          >
            عدد الأفراد <span className="text-red-600">*</span>
          </label>
          <input
            id={`${idPrefix}-guests`}
            name="guests"
            type="number"
            min={MIN_BOOKING_GUESTS}
            max={MAX_BOOKING_GUESTS}
            required
            value={form.guests}
            onChange={(e) => handleFieldChange('guests', e.target.value)}
            onBlur={() => handleBlur('guests')}
            aria-invalid={Boolean(errors.guests)}
            className={`${inputBase} font-num ${
              errors.guests ? 'border-red-500 focus:ring-red-200' : ''
            }`}
          />
          {renderError('guests')}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-service`}
          className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
        >
          نوع الجلسة
        </label>
        <select
          id={`${idPrefix}-service`}
          name="serviceType"
          value={form.serviceType}
          onChange={(e) => handleFieldChange('serviceType', e.target.value)}
          className={inputBase}
        >
          {SEATING_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-notes`}
          className="block text-xs sm:text-sm font-bold text-primary mb-1.5"
        >
          ملاحظات أو مناسبات خاصة
        </label>
        <textarea
          id={`${idPrefix}-notes`}
          name="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          placeholder="مثال: عزومة عائلية / طلب أصناف مشويات مسبقاً..."
          className={`${inputBase} min-h-[84px] resize-y`}
        />
      </div>

      <div className="pt-1 flex flex-col gap-2.5">
        <GoldButton type="submit" className="w-full py-3.5 px-6 text-sm sm:text-base">
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>إرسال تفاصيل الحجز عبر واتساب</span>
        </GoldButton>

        {showDirectCall && (
          <a
            href={BUSINESS_INFO.phoneTel}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cream-muted hover:bg-cream-muted/80 border border-primary/15 text-primary font-bold text-sm py-3 px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-gold-ink shrink-0" aria-hidden="true" />
            <span>أو اتصل مباشرة:</span>
            <span className="font-num" dir="ltr">
              {BUSINESS_INFO.phone}
            </span>
          </a>
        )}
      </div>
    </form>
  );
}
