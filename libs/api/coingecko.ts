import {
  CoinDetailsResponse,
  CoinsMarketsResponse,
  MarketChartResponse,
  PingResponse,
  SearchResponse,
  SimplePriceResponse,
  TrendingSearchResponse,
} from '@/schema/api-response';

const BASE_URL = process.env.EXPO_PUBLIC_COIN_GECKO_BASE_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COIN_GECKO_API_KEY;

interface CoinsMarketsParams {
  vs_currency?: string;
  ids?: string;
  category?: string;
  order?: 'market_cap_desc' | 'market_cap_asc' | 'price_desc' | 'price_asc' | 'volume_desc' | 'volume_asc' | 'id_desc' | 'id_asc';
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
}

interface CoinDetailsParams {
  localization?: boolean;
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
}

interface MarketChartParams {
  vs_currency?: string;
  days: string | number;
}

interface MarketChartRangeParams {
  vs_currency?: string;
  from: number;
  to: number;
}

interface SimplePriceParams {
  vs_currencies?: string;
  include_24hr_change?: boolean;
  include_last_updated_at?: boolean;
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

async function fetchAPI<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (API_KEY) {
    headers['x-cg-demo-api-key'] = API_KEY;
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new RateLimitError('Rate limit exceeded. Please try again later.');
      }
      
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error || errorData.message) {
          errorMessage = errorData.error || errorData.message;
        }
      } catch {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the API. Please check your internet connection.');
    }
    throw error;
  }
}

export async function ping(): Promise<PingResponse> {
  return fetchAPI<PingResponse>('/ping');
}

export async function getCoinsMarkets(params?: CoinsMarketsParams): Promise<CoinsMarketsResponse> {
  const defaultParams: CoinsMarketsParams = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    sparkline: false,
    price_change_percentage: '24h',
    ...params,
  };

  return fetchAPI<CoinsMarketsResponse>('/coins/markets', defaultParams as unknown as Record<string, unknown>);
}

export async function getCoinById(id: string, params?: CoinDetailsParams): Promise<CoinDetailsResponse> {
  const defaultParams: CoinDetailsParams = {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false,
    ...params,
  };

  return fetchAPI<CoinDetailsResponse>(`/coins/${id}`, defaultParams as unknown as Record<string, unknown>);
}

export async function getCoinMarketChart(id: string, params: MarketChartParams): Promise<MarketChartResponse> {
  const defaultParams: MarketChartParams = {
    vs_currency: 'usd',
    ...params,
  };

  return fetchAPI<MarketChartResponse>(`/coins/${id}/market_chart`, defaultParams as unknown as Record<string, unknown>);
}

export async function getCoinMarketChartRange(id: string, params: MarketChartRangeParams): Promise<MarketChartResponse> {
  const defaultParams: MarketChartRangeParams = {
    vs_currency: 'usd',
    ...params,
  };

  return fetchAPI<MarketChartResponse>(`/coins/${id}/market_chart/range`, defaultParams as unknown as Record<string, unknown>);
}

export async function searchCoins(query: string): Promise<SearchResponse> {
  return fetchAPI<SearchResponse>('/search', { query });
}

export async function getTrendingSearch(): Promise<TrendingSearchResponse> {
  return fetchAPI<TrendingSearchResponse>('/search/trending');
}

export async function getSimplePrice(ids: string | string[], params?: SimplePriceParams): Promise<SimplePriceResponse> {
  const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
  const defaultParams: SimplePriceParams = {
    vs_currencies: 'usd',
    include_24hr_change: true,
    include_last_updated_at: false,
    ...params,
  };

  return fetchAPI<SimplePriceResponse>('/simple/price', {
    ids: idsParam,
    ...defaultParams,
  });
}

