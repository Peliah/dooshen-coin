import { Coin, TrendingCoin } from '@/schema/coin';
import { create } from 'zustand';

interface CoinsStore {
  coins: Coin[];
  trending: TrendingCoin[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  isRefreshing: boolean;
  
  setCoins: (coins: Coin[]) => void;
  setTrending: (trending: TrendingCoin[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsRefreshing: (isRefreshing: boolean) => void;
  updateLastUpdated: () => void;
  
  getCoinById: (id: string) => Coin | undefined;
  getCoinsByIds: (ids: string[]) => Coin[];
  clearError: () => void;
  reset: () => void;
}

export const useCoinsStore = create<CoinsStore>((set, get) => ({
  coins: [],
  trending: [],
  loading: false,
  error: null,
  lastUpdated: null,
  isRefreshing: false,

  setCoins: (coins) => set({ coins, error: null }),
  
  setTrending: (trending) => set({ trending, error: null }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
  
  updateLastUpdated: () => set({ lastUpdated: Date.now() }),
  
  getCoinById: (id) => {
    const { coins } = get();
    return coins.find((coin) => coin.id === id);
  },
  
  getCoinsByIds: (ids) => {
    const { coins } = get();
    return coins.filter((coin) => ids.includes(coin.id));
  },
  
  clearError: () => set({ error: null }),
  
  reset: () => set({
    coins: [],
    trending: [],
    loading: false,
    error: null,
    lastUpdated: null,
    isRefreshing: false,
  }),
}));

