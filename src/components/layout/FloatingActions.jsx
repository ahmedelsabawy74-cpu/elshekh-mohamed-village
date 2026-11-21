import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo.js';

export function FloatingActions({ hidden = false }) {
  if (hidden) return null;

  return (
    <div className="fixed bottom-5 left-5 z-30 flex flex-col gap-3">
      {/* WhatsApp Floating Button */}
      <div className="relative group">
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل مع المطعم عبر واتساب"
          className="relative w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        </a>
        <span
          role="tooltip"
          className="hidden md:flex items-center pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-lg bg-primary-dark text-white text-xs font-bold px-3 py-1.5 shadow-lg border border-gold/30"
        >
          محادثة واتساب 24 ساعة
        </span>
      </div>

      {/* Direct Call Floating Button */}
      <div className="relative group">
        <a
          href={BUSINESS_INFO.phoneTel}
          aria-label={`اتصل الآن بـ${BUSINESS_INFO.arabicName}`}
          className="relative w-14 h-14 rounded-full bg-gold-gradient text-primary shadow-xl flex items-center justify-center transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          <Phone className="w-6 h-6" aria-hidden="true" />
        </a>
        <span
          role="tooltip"
          className="hidden md:flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-lg bg-primary-dark text-white text-xs font-bold px-3 py-1.5 shadow-lg border border-gold/30"
        >
          <span>اتصل بنا:</span>
          <span className="font-num text-gold-light" dir="ltr">
            {BUSINESS_INFO.phone}
          </span>
        </span>
      </div>
    </div>
  );
}
