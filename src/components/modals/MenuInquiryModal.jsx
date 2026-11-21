import { MessageCircle, Phone, UtensilsCrossed, X } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';
import { buildMenuInquiryWhatsAppUrl } from '../../lib/whatsapp.js';
import { Modal } from '../ui/Modal.jsx';

export function MenuInquiryModal({ isOpen, onClose, dishName = '' }) {
  const hasDish = Boolean(dishName && dishName.trim());
  const whatsappHref = buildMenuInquiryWhatsAppUrl(dishName);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="menu-inquiry-title"
      maxWidthClass="max-w-md"
      panelClassName="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold/25"
    >
      <div className="bg-primary px-6 py-5 text-right relative border-b border-gold/25">
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق نافذة الاستفسار"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="inline-flex items-center gap-2 text-gold-light text-xs font-bold mb-1.5">
          <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
          <span>استفسار مباشر عن المنيو</span>
        </div>

        <h3
          id="menu-inquiry-title"
          className="text-lg sm:text-xl font-black text-white leading-snug pl-10"
        >
          {hasDish ? `استفسار عن ${dishName}` : 'استفسار عن قائمة أسعار اليوم'}
        </h3>
        <p className="text-xs sm:text-sm text-cream-muted/85 mt-1">
          تواصل مباشرة مع إدارة المطعم للحصول على أحدث الأسعار ومتاح اليوم
        </p>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">
          {hasDish
            ? `هل ترغب في طلب أو الاستفسار عن وزن وسعر وتفاصيل صنف "${dishName}"؟`
            : 'يسعدنا إرسال قائمة منيو اليوم والأسعار الطازجة لك مباشرة على تطبيق واتساب أو استقبال استفسارك عبر الهاتف.'}
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm sm:text-base py-3.5 px-5 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[46px]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>محادثة واتساب فورية</span>
          </a>

          <a
            href={BUSINESS_INFO.phoneTel}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold-light/25 hover:bg-gold-light/40 border border-gold/40 text-primary font-bold text-sm sm:text-base py-3.5 px-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[46px]"
          >
            <Phone className="w-4 h-4 text-gold-ink shrink-0" aria-hidden="true" />
            <span>اتصال هاتفي مباشر</span>
            <span className="font-num" dir="ltr">
              ({BUSINESS_INFO.phone})
            </span>
          </a>
        </div>
      </div>
    </Modal>
  );
}
