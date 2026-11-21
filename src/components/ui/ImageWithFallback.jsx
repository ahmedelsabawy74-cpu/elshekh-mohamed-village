import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { IMAGES } from '../../data/images.js';

export function ImageWithFallback({
  imageKey,
  alt,
  className = '',
  imgClassName = '',
  priority = 'normal',
  icon: FallbackIcon = UtensilsCrossed,
  fallbackLabel = 'من مطبخ القرية',
}) {
  const [hasError, setHasError] = useState(false);
  const imageMeta = imageKey ? IMAGES[imageKey] : null;
  const shouldShowFallback = !imageMeta || hasError;

  if (shouldShowFallback) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light flex flex-col items-center justify-center text-center select-none ${className}`}
        role="img"
        aria-label={alt || fallbackLabel}
      >
        <div
          className="absolute inset-0 bg-dotted-gold opacity-20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gold/15 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-dark/70 border border-gold/40 flex items-center justify-center text-gold-light shadow-inner">
            <FallbackIcon className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold text-gold-light/90">
            {fallbackLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-primary-dark/15 ${className}`}>
      <img
        src={imageMeta.src}
        alt={alt || imageMeta.alt}
        width={imageMeta.width}
        height={imageMeta.height}
        loading="eager"
        fetchPriority={priority === 'high' ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
