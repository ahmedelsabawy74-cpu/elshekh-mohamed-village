export function collectPreloadUrls(imagesMap) {
  if (!imagesMap || typeof imagesMap !== 'object') return [];
  const entries = Object.entries(imagesMap);
  // Prioritize hero image first
  entries.sort(([keyA], [keyB]) => {
    if (keyA === 'hero') return -1;
    if (keyB === 'hero') return 1;
    return 0;
  });

  const seen = new Set();
  const urls = [];
  for (const [, meta] of entries) {
    const src = meta?.src;
    if (typeof src === 'string' && src.trim() && !seen.has(src)) {
      seen.add(src);
      urls.push(src);
    }
  }
  return urls;
}

export function calculatePreloadProgress(loadedCount, totalCount) {
  if (!Number.isFinite(totalCount) || totalCount <= 0) return 100;
  if (!Number.isFinite(loadedCount) || loadedCount <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((loadedCount / totalCount) * 100)));
}

export function preloadImageUrl(src) {
  if (typeof window === 'undefined' || typeof Image === 'undefined' || !src) {
    return Promise.resolve({ src, ok: true });
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';

    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      resolve({ src, ok });
    };

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(() => finish(true)).catch(() => finish(true));
      } else {
        finish(true);
      }
    };
    img.onerror = () => finish(false);
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      finish(true);
    }
  });
}

export async function preloadSiteAssets({
  urls = [],
  onProgress,
  maxWaitMs = 4000,
} = {}) {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  const total = uniqueUrls.length;
  let loaded = 0;
  let failed = 0;

  if (total === 0) {
    onProgress?.(100, 0, 0);
    return { loaded: 0, failed: 0, total: 0, timedOut: false };
  }

  onProgress?.(0, 0, total);

  const imagePromises = uniqueUrls.map((src) =>
    preloadImageUrl(src).then((result) => {
      loaded += 1;
      if (!result.ok) failed += 1;
      onProgress?.(calculatePreloadProgress(loaded, total), loaded, total);
      return result;
    })
  );

  const fontsPromise =
    typeof document !== 'undefined' && document.fonts?.ready
      ? document.fonts.ready.catch(() => undefined)
      : Promise.resolve();

  let timerId;
  const timeoutPromise = new Promise((resolve) => {
    timerId = setTimeout(() => resolve('timeout'), maxWaitMs);
  });

  const outcome = await Promise.race([
    Promise.all([...imagePromises, fontsPromise]).then(() => 'done'),
    timeoutPromise,
  ]);

  clearTimeout(timerId);
  onProgress?.(100, total, total);

  return {
    loaded,
    failed,
    total,
    timedOut: outcome === 'timeout',
  };
}
