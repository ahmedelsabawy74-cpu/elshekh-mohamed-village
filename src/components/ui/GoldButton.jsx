export function GoldButton({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 bg-gold-gradient text-primary font-bold rounded-xl shadow-lg shadow-gold/25 transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} {...props}>
      {children}
    </button>
  );
}
