export function AnimatedCounter({ target, decimals = 0, className = '', suffix = '', prefix = '' }) {
  const formatted = target.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`font-num ${className}`} dir="ltr">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
