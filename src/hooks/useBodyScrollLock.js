import { useEffect } from 'react';

export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined;

    const root = document.documentElement;
    const originalOverflow = root.style.overflow;
    const originalPaddingRight = root.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    root.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      root.style.overflow = originalOverflow;
      root.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
