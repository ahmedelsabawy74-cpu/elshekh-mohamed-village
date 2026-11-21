import { X } from 'lucide-react';
import { SEATING_OPTIONS } from '../../data/businessInfo.js';
import { Modal } from '../ui/Modal.jsx';
import { BookingForm } from '../ui/BookingForm.jsx';

export function BookingModal({
  isOpen,
  onClose,
  initialServiceType = SEATING_OPTIONS[0],
  openCount = 0,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="booking-modal-title"
      maxWidthClass="max-w-xl"
      panelClassName="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold/25"
    >
      <div className="bg-primary px-6 py-5 text-right relative border-b border-gold/25">
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق نافذة الحجز"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <p className="text-xs sm:text-sm font-bold text-gold-light mb-1">
          قرية ومطعم الشيخ محمد الجديدة
        </p>
        <h3
          id="booking-modal-title"
          className="text-xl sm:text-2xl font-black text-white leading-snug pl-10"
        >
          احجز طاولتك أو جلستك العائلية
        </h3>
        <p className="text-xs sm:text-sm text-cream-muted/85 mt-1">
          املأ البيانات لإرسال طلب حجز مباشر لفريق الاستقبال عبر واتساب
        </p>
      </div>

      <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
        <BookingForm
          initialServiceType={initialServiceType}
          resetKey={openCount}
          idPrefix="modal-booking"
        />
      </div>
    </Modal>
  );
}
