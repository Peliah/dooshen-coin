/**
 * CoinGecko API response types
 */

import { Coin, CoinDetails, MarketChartData, TrendingCoin } from './coin';

export interface CoinsMarketsResponse extends Array<Coin> {}

export interface CoinDetailsResponse extends CoinDetails {}

export interface MarketChartResponse extends MarketChartData {}

export interface TrendingSearchResponse {
  coins: TrendingCoin[];
  nfts: unknown[];
  categories: unknown[];
}

export interface SearchResponse {
  coins: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank?: number;
    thumb: string;
    large: string;
  }[];
  exchanges: unknown[];
  categories: unknown[];
}

export interface SimplePriceResponse {
  [coinId: string]: {
    usd: number;
    usd_24h_change?: number;
  };
}

export interface PingResponse {
  gecko_says: string;
}

