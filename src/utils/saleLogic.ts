export const SALE_END_DATE = new Date('2026-03-19T21:00:00');

export const isStPatricksSaleActive = (): boolean => {
  const now = new Date();
  return now < SALE_END_DATE;
};

export const getSaleCountdown = () => {
  const now = new Date();
  const diff = SALE_END_DATE.getTime() - now.getTime();

  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: false };
};

export const getEffectivePrice = (originalPrice: number, size: string): number => {
  if (!isStPatricksSaleActive()) return originalPrice;

  // Exact prices requested by user
  if (size === '440g') return 24.65;
  if (size === '880g') return 42.40;

  return originalPrice;
};

export const getDisplayPrices = (size: string) => {
  const original = size === '880g' ? 49.90 : 29.00;
  const sale = getEffectivePrice(original, size);
  const isActive = isStPatricksSaleActive();

  return {
    original,
    sale,
    isActive: isActive && sale < original
  };
};
