/**
 * App constants
 */

// API Configuration
export const API_BASE_URL = 'https://api.coingecko.com/api/v3';
export const API_TIMEOUT = 15000; // 15 seconds

// Cache Configuration
export const CACHE_KEYS = {
  COINS_MARKETS: '@dooshen_coin:coins_markets',
  COIN_DETAILS: '@dooshen_coin:coin_details',
  MARKET_CHART: '@dooshen_coin:market_chart',
  TRENDING: '@dooshen_coin:trending',
  FAVORITES: '@dooshen_coin:favorites',
  ALERTS: '@dooshen_coin:alerts',
} as const;

// Cache Expiration (in milliseconds)
export const CACHE_EXPIRATION = {
  COINS_MARKETS: 5 * 60 * 1000, // 5 minutes
  COIN_DETAILS: 10 * 60 * 1000, // 10 minutes
  MARKET_CHART: 5 * 60 * 1000, // 5 minutes
  TRENDING: 5 * 60 * 1000, // 5 minutes
  SEARCH: 1 * 60 * 1000, // 1 minute
} as const;

// Default API Parameters
export const DEFAULT_MARKET_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc' as const,
  per_page: 50,
  page: 1,
  sparkline: false,
  price_change_percentage: '24h',
};

// Chart Time Ranges
export const CHART_TIME_RANGES = {
  '1D': { days: '1', label: '1D' },
  '7D': { days: '7', label: '7D' },
  '30D': { days: '30', label: '30D' },
  '90D': { days: '90', label: '90D' },
  '1Y': { days: '365', label: '1Y' },
  'All': { days: 'max', label: 'All' },
} as const;

// Toast Configuration
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

// Network Configuration
export const NETWORK_TIMEOUT = 10000; // 10 seconds for slow connection detection

