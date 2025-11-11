import { getCoinById, RateLimitError } from '@/libs/api/coingecko';
import { getCachedCoinDetails, setCachedCoinDetails } from '@/libs/storage/cache';
import { useCoinDetailsStore } from '@/stores/coin-details';
import { useNetworkStore } from '@/stores/network';
import { useToastStore } from '@/stores/toast';
import { mockCoinDetails } from '@/utils/mock-data';
import { useCallback, useEffect } from 'react';

export function useCoinDetails(coinId: string) {
  const details = useCoinDetailsStore((state) => state.getCoinDetails(coinId));
  const loading = useCoinDetailsStore((state) => state.getLoading(coinId));
  const error = useCoinDetailsStore((state) => state.getError(coinId));
  const isCached = useCoinDetailsStore((state) => state.isDetailsCached(coinId));
  
  const setCoinDetails = useCoinDetailsStore((state) => state.setCoinDetails);
  const setLoading = useCoinDetailsStore((state) => state.setLoading);
  const setError = useCoinDetailsStore((state) => state.setError);
  
  const isOnline = useNetworkStore((state) => state.isOnline);
  const addToast = useToastStore((state) => state.addToast);

  const fetchDetails = useCallback(async () => {
    setLoading(coinId, true);
    setError(coinId, null);

    try {
      const data = await getCoinById(coinId, {
        market_data: true,
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
      });

      setCoinDetails(coinId, data);
      await setCachedCoinDetails(coinId, data);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.warn(`[useCoinDetails] Rate limit exceeded for ${coinId}, falling back to mock data`);
        const mockData = { ...mockCoinDetails, id: coinId };
        setCoinDetails(coinId, mockData);
        setError(coinId, null);
        addToast({
          type: 'warning',
          message: 'Rate limit exceeded. Showing demo data.',
          duration: 3000,
        });
        return;
      }
      
      if (!isOnline) {
        const cached = await getCachedCoinDetails(coinId, true);
        if (cached) {
          setCoinDetails(coinId, cached);
          setError(coinId, null);
        } else {
          setError(coinId, 'No cached data available. Please connect to the internet.');
        }
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch coin details';
      setError(coinId, errorMessage);
      
      addToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(coinId, false);
    }
  }, [coinId, setCoinDetails, setLoading, setError, isOnline, addToast]);

  const loadCachedData = useCallback(async () => {
    try {
      const allowExpired = !isOnline;
      const cached = await getCachedCoinDetails(coinId, allowExpired);
      if (cached) {
        setCoinDetails(coinId, cached);
        if (allowExpired) {
          console.log(`[useCoinDetails] Using expired cache for ${coinId} (offline mode)`);
        }
      }
    } catch (error) {
      console.error('Failed to load cached coin details:', error);
    }
  }, [coinId, setCoinDetails, isOnline]);

  useEffect(() => {
    if (!coinId) return;

    const initialize = async () => {
      setLoading(coinId, true);
      await loadCachedData();
      
      if (isOnline) {
        await fetchDetails();
      } else {
        setLoading(coinId, false);
      }
    };

    initialize();
  }, [coinId, isOnline, loadCachedData, fetchDetails, setLoading]);

  const refresh = useCallback(() => {
    if (isOnline) {
      fetchDetails();
    } else {
      addToast({
        type: 'network',
        message: 'You are offline. Showing cached data.',
      });
    }
  }, [isOnline, fetchDetails, addToast]);

  return {
    details,
    loading,
    error,
    isCached,
    refresh,
  };
}

