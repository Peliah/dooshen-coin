/**
 * Coin data schemas and types
 * Based on CoinGecko API responses
 */

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h?: number;
  low_24h?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  ath_date?: string;
  atl?: number;
  atl_change_percentage?: number;
  atl_date?: string;
  sparkline_in_7d?: {
    price: number[];
  };
  last_updated?: string;
}

export interface CoinImage {
  thumb: string;
  small: string;
  large: string;
}

export interface CoinDetails extends Omit<Coin, 'image' | 'current_price' | 'market_cap' | 'total_volume' | 'high_24h' | 'low_24h' | 'price_change_24h' | 'price_change_percentage_24h' | 'market_cap_change_24h' | 'market_cap_change_percentage_24h' | 'ath' | 'ath_change_percentage' | 'ath_date' | 'atl' | 'atl_change_percentage' | 'atl_date' | 'fully_diluted_valuation'> {
  image: CoinImage;
  description?: {
    en: string;
  };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
    official_forum_url?: string[];
    subreddit_url?: string;
    repos_url?: {
      github?: string[];
    };
  };
  market_data?: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: Record<string, number>;
    ath_change_percentage: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_change_percentage: Record<string, number>;
    atl_date: Record<string, string>;
    fully_diluted_valuation: Record<string, number>;
    market_cap_rank: number;
    last_updated: string;
  };
}

export interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    market_cap_rank: number;
  };
}

export interface MarketChartData {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][]; // [timestamp, market_cap]
  total_volumes: [number, number][]; // [timestamp, volume]
}

export type TimeRange = '1' | '7' | '30' | '90' | '365' | 'max';

