import { getCoinsMarkets, getTrendingSearch, RateLimitError } from '@/libs/api/coingecko';
import { getCachedCoins, getCachedTrending, setCachedCoins, setCachedTrending } from '@/libs/storage/cache';
import { useCoinsStore } from '@/stores/coins';
import { useNetworkStore } from '@/stores/network';
import { useToastStore } from '@/stores/toast';
import { mockCoins, mockTrendingCoins } from '@/utils/mock-data';
import { useCallback, useEffect } from 'react';

const POLLING_INTERVAL = 5 * 60 * 1000;

export function useCoins() {
  const coins = useCoinsStore((state) => state.coins);
  const trending = useCoinsStore((state) => state.trending);
  const loading = useCoinsStore((state) => state.loading);
  const error = useCoinsStore((state) => state.error);
  const isRefreshing = useCoinsStore((state) => state.isRefreshing);
  const lastUpdated = useCoinsStore((state) => state.lastUpdated);
  
  const setCoins = useCoinsStore((state) => state.setCoins);
  const setTrending = useCoinsStore((state) => state.setTrending);
  const setLoading = useCoinsStore((state) => state.setLoading);
  const setError = useCoinsStore((state) => state.setError);
  const setIsRefreshing = useCoinsStore((state) => state.setIsRefreshing);
  const updateLastUpdated = useCoinsStore((state) => state.updateLastUpdated);
  
  const isOnline = useNetworkStore((state) => state.isOnline);
  const addToast = useToastStore((state) => state.addToast);

  const fetchCoins = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsRefreshing(true);
    }

    try {
      const [coinsData, trendingData] = await Promise.all([
        getCoinsMarkets(),
        getTrendingSearch(),
      ]);

      setCoins(coinsData);
      setTrending(trendingData.coins);
      updateLastUpdated();
      setError(null);

      await Promise.all([
        setCachedCoins(coinsData),
        setCachedTrending(trendingData.coins),
      ]);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.warn('[useCoins] Rate limit exceeded, falling back to mock data');
        setCoins(mockCoins);
        setTrending(mockTrendingCoins);
        setError(null);
        addToast({
          type: 'warning',
          message: 'Rate limit exceeded. Showing demo data.',
          duration: 3000,
        });
        return;
      }
      
      if (!isOnline) {
        const [cachedCoins, cachedTrending] = await Promise.all([
          getCachedCoins(true),
          getCachedTrending(true),
        ]);
        
        if (cachedCoins) {
          setCoins(cachedCoins);
        }
        if (cachedTrending) {
          setTrending(cachedTrending);
        }
        
        if (!cachedCoins && !cachedTrending) {
          setError('No cached data available. Please connect to the internet.');
        } else {
          setError(null);
        }
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch coins';
      setError(errorMessage);
      
      addToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      if (showLoading) {
        setIsRefreshing(false);
      }
    }
  }, [setCoins, setTrending, setError, setIsRefreshing, updateLastUpdated, isOnline, addToast]);

  const loadCachedData = useCallback(async () => {
    try {
      const allowExpired = !isOnline;
      const [cachedCoins, cachedTrending] = await Promise.all([
        getCachedCoins(allowExpired),
        getCachedTrending(allowExpired),
      ]);

      if (cachedCoins) {
        setCoins(cachedCoins);
        if (allowExpired) {
          console.log('[useCoins] Using expired cache (offline mode)');
        }
      }

      if (cachedTrending) {
        setTrending(cachedTrending);
      }
    } catch (error) {
      console.error('Failed to load cached data:', error);
    }
  }, [setCoins, setTrending, isOnline]);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      
      await loadCachedData();
      
      if (isOnline) {
        await fetchCoins();
      }
      
      setLoading(false);
    };

    initialize();

    const interval = setInterval(() => {
      if (isOnline) {
        fetchCoins();
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [isOnline, loadCachedData, fetchCoins, setLoading]);

  const refresh = useCallback(() => {
    if (isOnline) {
      fetchCoins(true);
    } else {
      addToast({
        type: 'network',
        message: 'You are offline. Showing cached data.',
      });
    }
  }, [isOnline, fetchCoins, addToast]);

  return {
    coins,
    trending,
    loading,
    error,
    isRefreshing,
    lastUpdated,
    refresh,
  };
}

