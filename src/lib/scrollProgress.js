export const BACK_TO_TOP_THRESHOLD = 300;

export function clampUnit(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function calculateScrollProgress(scrollY, scrollHeight, clientHeight) {
  const maxScroll = Math.max(0, (scrollHeight || 0) - (clientHeight || 0));
  if (maxScroll <= 0) return 0;
  return clampUnit((scrollY || 0) / maxScroll);
}

export function calculateRingStrokeOffset(circumference, progress) {
  if (!Number.isFinite(circumference) || circumference <= 0) return 0;
  const clamped = clampUnit(progress);
  return Number((circumference * (1 - clamped)).toFixed(3));
}

export function shouldShowBackToTop(scrollY, threshold = BACK_TO_TOP_THRESHOLD) {
  return Number.isFinite(scrollY) && scrollY > threshold;
}
