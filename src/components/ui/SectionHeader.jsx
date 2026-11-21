export function SectionHeader({
  eyebrow,
  icon: Icon,
  title,
  headingId,
  subtitle,
  theme = 'light',
  className = '',
}) {
  const isDark = theme === 'dark';

  const pillClasses = isDark
    ? 'bg-primary-dark/85 text-gold-light border border-gold/35'
    : 'bg-gold/15 text-gold-ink border border-gold/35';

  const titleClasses = isDark ? 'text-white' : 'text-primary';
  const subtitleClasses = isDark ? 'text-cream-muted/85' : 'text-charcoal/80';

  return (
    <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 ${pillClasses}`}
        >
          {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        id={headingId}
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black leading-tight text-balance mb-4 ${titleClasses}`}
      >
        {title}
      </h2>

      <div
        className="w-20 h-1 header-ornament rounded-full mx-auto mb-5"
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${subtitleClasses}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
