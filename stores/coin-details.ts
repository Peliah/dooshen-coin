import { CoinDetails, MarketChartData, TimeRange } from '@/schema/coin';
import { create } from 'zustand';

interface CoinDetailsCache {
  [coinId: string]: {
    data: CoinDetails;
    timestamp: number;
  };
}

interface ChartCache {
  [key: string]: {
    data: MarketChartData;
    timestamp: number;
  };
}

interface CoinDetailsStore {
  detailsCache: CoinDetailsCache;
  chartCache: ChartCache;
  loading: { [coinId: string]: boolean };
  errors: { [coinId: string]: string | null };
  
  setCoinDetails: (coinId: string, details: CoinDetails) => void;
  getCoinDetails: (coinId: string) => CoinDetails | null;
  isDetailsCached: (coinId: string) => boolean;
  isDetailsStale: (coinId: string, maxAge?: number) => boolean;
  
  setChartData: (coinId: string, timeRange: TimeRange, data: MarketChartData) => void;
  getChartData: (coinId: string, timeRange: TimeRange) => MarketChartData | null;
  isChartCached: (coinId: string, timeRange: TimeRange) => boolean;
  isChartStale: (coinId: string, timeRange: TimeRange, maxAge?: number) => boolean;
  
  setLoading: (coinId: string, loading: boolean) => void;
  getLoading: (coinId: string) => boolean;
  
  setError: (coinId: string, error: string | null) => void;
  getError: (coinId: string) => string | null;
  
  clearCache: (coinId?: string) => void;
  reset: () => void;
}

const DEFAULT_CACHE_AGE = 10 * 60 * 1000;
const CHART_CACHE_AGE = 10 * 60 * 1000;

export const useCoinDetailsStore = create<CoinDetailsStore>((set, get) => ({
  detailsCache: {},
  chartCache: {},
  loading: {},
  errors: {},

  setCoinDetails: (coinId, details) => {
    set((state) => ({
      detailsCache: {
        ...state.detailsCache,
        [coinId]: {
          data: details,
          timestamp: Date.now(),
        },
      },
      errors: {
        ...state.errors,
        [coinId]: null,
      },
    }));
  },

  getCoinDetails: (coinId) => {
    const { detailsCache } = get();
    return detailsCache[coinId]?.data || null;
  },

  isDetailsCached: (coinId) => {
    const { detailsCache } = get();
    return coinId in detailsCache;
  },

  isDetailsStale: (coinId, maxAge = DEFAULT_CACHE_AGE) => {
    const { detailsCache } = get();
    const cached = detailsCache[coinId];
    if (!cached) return true;
    
    return Date.now() - cached.timestamp > maxAge;
  },

  setChartData: (coinId, timeRange, data) => {
    const key = `${coinId}:${timeRange}`;
    set((state) => ({
      chartCache: {
        ...state.chartCache,
        [key]: {
          data,
          timestamp: Date.now(),
        },
      },
      errors: {
        ...state.errors,
        [coinId]: null,
      },
    }));
  },

  getChartData: (coinId, timeRange) => {
    const { chartCache } = get();
    const key = `${coinId}:${timeRange}`;
    return chartCache[key]?.data || null;
  },

  isChartCached: (coinId, timeRange) => {
    const { chartCache } = get();
    const key = `${coinId}:${timeRange}`;
    return key in chartCache;
  },

  isChartStale: (coinId, timeRange, maxAge = CHART_CACHE_AGE) => {
    const { chartCache } = get();
    const key = `${coinId}:${timeRange}`;
    const cached = chartCache[key];
    if (!cached) return true;
    
    return Date.now() - cached.timestamp > maxAge;
  },

  setLoading: (coinId, loading) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [coinId]: loading,
      },
    }));
  },

  getLoading: (coinId) => {
    const { loading } = get();
    return loading[coinId] ?? false;
  },

  setError: (coinId, error) => {
    set((state) => ({
      errors: {
        ...state.errors,
        [coinId]: error,
      },
    }));
  },

  getError: (coinId) => {
    const { errors } = get();
    return errors[coinId] ?? null;
  },

  clearCache: (coinId) => {
    if (coinId) {
      set((state) => {
        const { [coinId]: removed, ...restDetails } = state.detailsCache;
        const restCharts = Object.fromEntries(
          Object.entries(state.chartCache).filter(([key]) => !key.startsWith(`${coinId}:`))
        );
        const { [coinId]: removedError, ...restErrors } = state.errors;
        const { [coinId]: removedLoading, ...restLoading } = state.loading;
        
        return {
          detailsCache: restDetails,
          chartCache: restCharts,
          errors: restErrors,
          loading: restLoading,
        };
      });
    } else {
      set({
        detailsCache: {},
        chartCache: {},
        errors: {},
        loading: {},
      });
    }
  },

  reset: () => {
    set({
      detailsCache: {},
      chartCache: {},
      loading: {},
      errors: {},
    });
  },
}));

