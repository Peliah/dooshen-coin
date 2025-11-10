/**
 * Input validation utility functions
 */

/**
 * Validate price input
 */
export function isValidPrice(price: string | number): boolean {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(num) && num > 0 && isFinite(num);
}

/**
 * Validate coin ID format
 */
export function isValidCoinId(coinId: string): boolean {
  return typeof coinId === 'string' && coinId.length > 0 && /^[a-z0-9-]+$/.test(coinId);
}

/**
 * Validate search query
 */
export function isValidSearchQuery(query: string): boolean {
  return typeof query === 'string' && query.trim().length > 0;
}

/**
 * Sanitize price input
 */
export function sanitizePrice(price: string): number | null {
  const cleaned = price.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isValidPrice(num) ? num : null;
}

