import { Coin, CoinDetails, MarketChartData, TimeRange, TrendingCoin } from '@/schema/coin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEYS = {
  COINS: '@cache:coins',
  TRENDING: '@cache:trending',
  COIN_DETAILS: '@cache:coin_details',
  CHART: '@cache:chart',
};

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const COINS_CACHE_AGE = 5 * 60 * 1000;
const TRENDING_CACHE_AGE = 5 * 60 * 1000;
const DETAILS_CACHE_AGE = 10 * 60 * 1000;
const CHART_CACHE_AGE = 10 * 60 * 1000;

function isExpired(timestamp: number, maxAge: number): boolean {
  return Date.now() - timestamp > maxAge;
}

export async function getCachedCoins(): Promise<Coin[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.COINS);
    if (!cached) return null;

    const parsed: CachedData<Coin[]> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, COINS_CACHE_AGE)) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to get cached coins:', error);
    return null;
  }
}

export async function setCachedCoins(coins: Coin[]): Promise<void> {
  try {
    const cacheData: CachedData<Coin[]> = {
      data: coins,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(CACHE_KEYS.COINS, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache coins:', error);
  }
}

export async function getCachedTrending(): Promise<TrendingCoin[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.TRENDING);
    if (!cached) return null;

    const parsed: CachedData<TrendingCoin[]> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, TRENDING_CACHE_AGE)) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to get cached trending:', error);
    return null;
  }
}

export async function setCachedTrending(trending: TrendingCoin[]): Promise<void> {
  try {
    const cacheData: CachedData<TrendingCoin[]> = {
      data: trending,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(CACHE_KEYS.TRENDING, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache trending:', error);
  }
}

export async function getCachedCoinDetails(coinId: string): Promise<CoinDetails | null> {
  try {
    const cached = await AsyncStorage.getItem(`${CACHE_KEYS.COIN_DETAILS}:${coinId}`);
    if (!cached) return null;

    const parsed: CachedData<CoinDetails> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, DETAILS_CACHE_AGE)) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to get cached coin details:', error);
    return null;
  }
}

export async function setCachedCoinDetails(coinId: string, details: CoinDetails): Promise<void> {
  try {
    const cacheData: CachedData<CoinDetails> = {
      data: details,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(`${CACHE_KEYS.COIN_DETAILS}:${coinId}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache coin details:', error);
  }
}

export async function getCachedChart(coinId: string, timeRange: TimeRange): Promise<MarketChartData | null> {
  try {
    const key = `${CACHE_KEYS.CHART}:${coinId}:${timeRange}`;
    const cached = await AsyncStorage.getItem(key);
    if (!cached) return null;

    const parsed: CachedData<MarketChartData> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, CHART_CACHE_AGE)) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to get cached chart:', error);
    return null;
  }
}

export async function setCachedChart(coinId: string, timeRange: TimeRange, data: MarketChartData): Promise<void> {
  try {
    const key = `${CACHE_KEYS.CHART}:${coinId}:${timeRange}`;
    const cacheData: CachedData<MarketChartData> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache chart:', error);
  }
}

export async function clearCache(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      CACHE_KEYS.COINS,
      CACHE_KEYS.TRENDING,
    ]);
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

