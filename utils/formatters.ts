/**
 * Formatting utility functions
 */

/**
 * Format price to USD currency
 */
export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null || isNaN(price)) {
    return '$0.00';
  }

  if (price < 0.01) {
    return `$${price.toFixed(8)}`;
  }

  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format large numbers (market cap, volume) with abbreviations
 */
export function formatLargeNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(num)) {
    return '$0';
  }

  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`;
  }
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }

  return `$${num.toFixed(2)}`;
}

/**
 * Format percentage with sign and color indicator
 */
export function formatPercentage(
  percentage: number | undefined | null,
  showSign: boolean = true
): string {
  if (percentage === undefined || percentage === null || isNaN(percentage)) {
    return '0.00%';
  }

  const sign = showSign && percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

/**
 * Format supply numbers
 */
export function formatSupply(supply: number | undefined | null): string {
  if (supply === undefined || supply === null || isNaN(supply)) {
    return '0';
  }

  if (supply >= 1e9) {
    return `${(supply / 1e9).toFixed(2)}B`;
  }
  if (supply >= 1e6) {
    return `${(supply / 1e6).toFixed(2)}M`;
  }
  if (supply >= 1e3) {
    return `${(supply / 1e3).toFixed(2)}K`;
  }

  return supply.toLocaleString('en-US');
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number | string | undefined | null): string {
  if (!timestamp) {
    return 'N/A';
  }

  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number | string | undefined | null): string {
  if (!timestamp) {
    return 'N/A';
  }

  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  return formatDate(timestamp);
}

/**
 * Get color for percentage change (green for positive, red for negative)
 */
export function getPercentageColor(percentage: number | undefined | null): string {
  if (percentage === undefined || percentage === null || isNaN(percentage)) {
    return '#9BA1A6'; // Neutral gray
  }

  return percentage >= 0 ? '#10B981' : '#EF4444'; // Green : Red
}

