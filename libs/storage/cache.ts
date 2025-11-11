import { Coin, CoinDetails, MarketChartData, TimeRange, TrendingCoin } from '@/schema/coin';
import { useNetworkStore } from '@/stores/network';
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

const OFFLINE_CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function isExpired(timestamp: number, maxAge: number): boolean {
  return Date.now() - timestamp > maxAge;
}

function isOffline(): boolean {
  return !useNetworkStore.getState().isOnline;
}

function shouldUseExpiredCache(timestamp: number, maxAge: number): boolean {
  if (!isOffline()) return false;
  const age = Date.now() - timestamp;
  return age <= OFFLINE_CACHE_MAX_AGE;
}

export async function getCachedCoins(allowExpired = false): Promise<Coin[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.COINS);
    if (!cached) return null;

    const parsed: CachedData<Coin[]> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, COINS_CACHE_AGE)) {
      if (allowExpired || shouldUseExpiredCache(parsed.timestamp, COINS_CACHE_AGE)) {
        return parsed.data;
      }
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

export async function getCachedTrending(allowExpired = false): Promise<TrendingCoin[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.TRENDING);
    if (!cached) return null;

    const parsed: CachedData<TrendingCoin[]> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, TRENDING_CACHE_AGE)) {
      if (allowExpired || shouldUseExpiredCache(parsed.timestamp, TRENDING_CACHE_AGE)) {
        return parsed.data;
      }
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

export async function getCachedCoinDetails(coinId: string, allowExpired = false): Promise<CoinDetails | null> {
  try {
    const cached = await AsyncStorage.getItem(`${CACHE_KEYS.COIN_DETAILS}:${coinId}`);
    if (!cached) return null;

    const parsed: CachedData<CoinDetails> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, DETAILS_CACHE_AGE)) {
      if (allowExpired || shouldUseExpiredCache(parsed.timestamp, DETAILS_CACHE_AGE)) {
        return parsed.data;
      }
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

export async function getCachedChart(coinId: string, timeRange: TimeRange, allowExpired = false): Promise<MarketChartData | null> {
  try {
    const key = `${CACHE_KEYS.CHART}:${coinId}:${timeRange}`;
    const cached = await AsyncStorage.getItem(key);
    if (!cached) return null;

    const parsed: CachedData<MarketChartData> = JSON.parse(cached);
    
    if (isExpired(parsed.timestamp, CHART_CACHE_AGE)) {
      if (allowExpired || shouldUseExpiredCache(parsed.timestamp, CHART_CACHE_AGE)) {
        return parsed.data;
      }
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
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => 
      key.startsWith(CACHE_KEYS.COINS) ||
      key.startsWith(CACHE_KEYS.TRENDING) ||
      key.startsWith(CACHE_KEYS.COIN_DETAILS) ||
      key.startsWith(CACHE_KEYS.CHART)
    );
    await AsyncStorage.multiRemove(cacheKeys);
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

export async function getCacheSize(): Promise<number> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => 
      key.startsWith(CACHE_KEYS.COINS) ||
      key.startsWith(CACHE_KEYS.TRENDING) ||
      key.startsWith(CACHE_KEYS.COIN_DETAILS) ||
      key.startsWith(CACHE_KEYS.CHART)
    );
    
    let totalSize = 0;
    for (const key of cacheKeys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        totalSize += value.length;
      }
    }
    return totalSize;
  } catch (error) {
    console.error('Failed to get cache size:', error);
    return 0;
  }
}

export async function cleanupOldCache(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<number> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => 
      key.startsWith(CACHE_KEYS.COINS) ||
      key.startsWith(CACHE_KEYS.TRENDING) ||
      key.startsWith(CACHE_KEYS.COIN_DETAILS) ||
      key.startsWith(CACHE_KEYS.CHART)
    );
    
    let removedCount = 0;
    const now = Date.now();
    
    for (const key of cacheKeys) {
      try {
        const cached = await AsyncStorage.getItem(key);
        if (cached) {
          const parsed: CachedData<unknown> = JSON.parse(cached);
          if (now - parsed.timestamp > maxAge) {
            await AsyncStorage.removeItem(key);
            removedCount++;
          }
        }
      } catch (error) {
        console.error(`Failed to check cache key ${key}:`, error);
      }
    }
    
    return removedCount;
  } catch (error) {
    console.error('Failed to cleanup old cache:', error);
    return 0;
  }
}

