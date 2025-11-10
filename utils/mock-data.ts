/**
 * Mock data for UI development and testing
 */

import { Coin, MarketChartData, TrendingCoin } from '@/schema/coin';

export const mockCoins: Coin[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 43250.50,
    market_cap: 850123456789,
    market_cap_rank: 1,
    fully_diluted_valuation: 908765432109,
    total_volume: 12345678901,
    high_24h: 44500.00,
    low_24h: 42800.00,
    price_change_24h: 1250.50,
    price_change_percentage_24h: 2.98,
    market_cap_change_24h: 25000000000,
    market_cap_change_percentage_24h: 3.03,
    circulating_supply: 19650000,
    total_supply: 19650000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -37.35,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 63657.89,
    atl_date: '2013-07-06T00:00:00.000Z',
    last_updated: new Date().toISOString(),
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2650.75,
    market_cap: 318765432109,
    market_cap_rank: 2,
    fully_diluted_valuation: 318765432109,
    total_volume: 9876543210,
    high_24h: 2720.00,
    low_24h: 2620.00,
    price_change_24h: -45.25,
    price_change_percentage_24h: -1.68,
    market_cap_change_24h: -5000000000,
    market_cap_change_percentage_24h: -1.54,
    circulating_supply: 120250000,
    total_supply: 120250000,
    max_supply: undefined,
    ath: 4878.26,
    ath_change_percentage: -45.68,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: 611845.12,
    atl_date: '2015-10-20T00:00:00.000Z',
    last_updated: new Date().toISOString(),
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 315.42,
    market_cap: 47234567890,
    market_cap_rank: 4,
    fully_diluted_valuation: 47234567890,
    total_volume: 1234567890,
    high_24h: 320.00,
    low_24h: 310.00,
    price_change_24h: 5.42,
    price_change_percentage_24h: 1.75,
    market_cap_change_24h: 800000000,
    market_cap_change_percentage_24h: 1.72,
    circulating_supply: 149800000,
    total_supply: 149800000,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -54.02,
    ath_date: '2021-05-10T07:24:17.097Z',
    atl: 0.0398177,
    atl_change_percentage: 791845.12,
    atl_date: '2017-10-19T00:00:00.000Z',
    last_updated: new Date().toISOString(),
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 98.75,
    market_cap: 43210987654,
    market_cap_rank: 5,
    fully_diluted_valuation: 56789012345,
    total_volume: 2345678901,
    high_24h: 102.50,
    low_24h: 96.00,
    price_change_24h: 2.75,
    price_change_percentage_24h: 2.87,
    market_cap_change_24h: 1200000000,
    market_cap_change_percentage_24h: 2.86,
    circulating_supply: 437500000,
    total_supply: 437500000,
    max_supply: undefined,
    ath: 259.96,
    ath_change_percentage: -62.00,
    ath_date: '2021-11-06T21:54:35.825Z',
    atl: 0.500801,
    atl_change_percentage: 19624.12,
    atl_date: '2020-05-11T19:35:23.449Z',
    last_updated: new Date().toISOString(),
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.52,
    market_cap: 18234567890,
    market_cap_rank: 8,
    fully_diluted_valuation: 23456789012,
    total_volume: 456789012,
    high_24h: 0.54,
    low_24h: 0.51,
    price_change_24h: -0.02,
    price_change_percentage_24h: -3.70,
    market_cap_change_24h: -700000000,
    market_cap_change_percentage_24h: -3.70,
    circulating_supply: 35000000000,
    total_supply: 35000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -83.17,
    ath_date: '2021-09-02T06:00:10.474Z',
    atl: 0.017354,
    atl_change_percentage: 2896.12,
    atl_date: '2017-11-02T00:00:00.000Z',
    last_updated: new Date().toISOString(),
  },
];

export const mockTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      thumb: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      slug: 'bitcoin',
      price_btc: 1.0,
      score: 0,
      market_cap_rank: 1,
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      thumb: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      small: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      slug: 'ethereum',
      price_btc: 0.0612,
      score: 1,
      market_cap_rank: 2,
    },
  },
  {
    item: {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      thumb: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
      small: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
      large: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      slug: 'solana',
      price_btc: 0.0023,
      score: 2,
      market_cap_rank: 5,
    },
  },
];

// Generate mock chart data for 7 days
export const mockChartData: MarketChartData = {
  prices: Array.from({ length: 168 }, (_, i) => {
    const timestamp = Date.now() - (167 - i) * 60 * 60 * 1000; // Last 7 days, hourly
    const basePrice = 43000;
    const variation = (Math.random() - 0.5) * 2000;
    return [timestamp, basePrice + variation];
  }),
  market_caps: Array.from({ length: 168 }, (_, i) => {
    const timestamp = Date.now() - (167 - i) * 60 * 60 * 1000;
    const baseCap = 850000000000;
    const variation = (Math.random() - 0.5) * 50000000000;
    return [timestamp, baseCap + variation];
  }),
  total_volumes: Array.from({ length: 168 }, (_, i) => {
    const timestamp = Date.now() - (167 - i) * 60 * 60 * 1000;
    const baseVolume = 12000000000;
    const variation = (Math.random() - 0.5) * 3000000000;
    return [timestamp, baseVolume + variation];
  }),
};

