import { getCoinMarketChart, getCoinMarketChartRange, RateLimitError } from '@/libs/api/coingecko';
import { getCachedChart, setCachedChart } from '@/libs/storage/cache';
import { TimeRange } from '@/schema/coin';
import { useCoinDetailsStore } from '@/stores/coin-details';
import { useNetworkStore } from '@/stores/network';
import { useToastStore } from '@/stores/toast';
import { mockChartData } from '@/utils/mock-data';
import { useCallback, useEffect } from 'react';

function getDaysFromTimeRange(timeRange: TimeRange): string | number {
  switch (timeRange) {
    case '1':
      return 1;
    case '7':
      return 7;
    case '30':
      return 30;
    case '90':
      return 90;
    case '365':
      return 365;
    case 'max':
      return 'max';
    default:
      return 7;
  }
}

export function useCoinChart(coinId: string, timeRange: TimeRange) {
  const chartData = useCoinDetailsStore((state) => state.getChartData(coinId, timeRange));
  const loading = useCoinDetailsStore((state) => state.getLoading(coinId));
  const error = useCoinDetailsStore((state) => state.getError(coinId));
  const isCached = useCoinDetailsStore((state) => state.isChartCached(coinId, timeRange));
  
  const setChartData = useCoinDetailsStore((state) => state.setChartData);
  const setLoading = useCoinDetailsStore((state) => state.setLoading);
  const setError = useCoinDetailsStore((state) => state.setError);
  
  const isOnline = useNetworkStore((state) => state.isOnline);
  const addToast = useToastStore((state) => state.addToast);

  const fetchChart = useCallback(async () => {
    setLoading(coinId, true);
    setError(coinId, null);

    try {
      const days = getDaysFromTimeRange(timeRange);
      let data;

      if (timeRange === 'max') {
        const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        data = await getCoinMarketChartRange(coinId, {
          from: Math.floor(oneYearAgo / 1000),
          to: Math.floor(now / 1000),
        });
      } else {
        data = await getCoinMarketChart(coinId, {
          days,
        });
      }

      setChartData(coinId, timeRange, data);
      await setCachedChart(coinId, timeRange, data);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.warn(`[useCoinChart] Rate limit exceeded for ${coinId}, falling back to mock chart data`);
        setChartData(coinId, timeRange, mockChartData);
        setError(coinId, null);
        addToast({
          type: 'warning',
          message: 'Rate limit exceeded. Showing demo chart.',
          duration: 3000,
        });
        return;
      }
      
      if (!isOnline) {
        const cached = await getCachedChart(coinId, timeRange, true);
        if (cached) {
          setChartData(coinId, timeRange, cached);
          setError(coinId, null);
        } else {
          setChartData(coinId, timeRange, mockChartData);
          setError(coinId, null);
        }
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch chart data';
      setError(coinId, errorMessage);
      
      addToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(coinId, false);
    }
  }, [coinId, timeRange, setChartData, setLoading, setError, isOnline, addToast]);

  const loadCachedData = useCallback(async () => {
    try {
      const allowExpired = !isOnline;
      const cached = await getCachedChart(coinId, timeRange, allowExpired);
      if (cached) {
        setChartData(coinId, timeRange, cached);
        if (allowExpired) {
          console.log(`[useCoinChart] Using expired cache for ${coinId} (offline mode)`);
        }
      }
    } catch (error) {
      console.error('Failed to load cached chart:', error);
    }
  }, [coinId, timeRange, setChartData, isOnline]);

  useEffect(() => {
    if (!coinId) return;

    const initialize = async () => {
      setLoading(coinId, true);
      await loadCachedData();
      
      if (isOnline) {
        await fetchChart();
      } else {
        setLoading(coinId, false);
      }
    };

    initialize();
  }, [coinId, timeRange, isOnline, loadCachedData, fetchChart, setLoading]);

  const refresh = useCallback(() => {
    if (isOnline) {
      fetchChart();
    } else {
      addToast({
        type: 'network',
        message: 'You are offline. Showing cached data.',
      });
    }
  }, [isOnline, fetchChart, addToast]);

  return {
    chartData,
    loading,
    error,
    isCached,
    refresh,
  };
}

