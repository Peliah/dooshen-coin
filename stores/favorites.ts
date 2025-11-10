import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const FAVORITES_STORAGE_KEY = '@dooshen_coin:favorites';

interface FavoritesStore {
  favoriteIds: string[];
  loading: boolean;
  
  addFavorite: (coinId: string) => Promise<void>;
  removeFavorite: (coinId: string) => Promise<void>;
  toggleFavorite: (coinId: string) => Promise<void>;
  isFavorite: (coinId: string) => boolean;
  loadFavorites: () => Promise<void>;
  clearFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],
  loading: false,

  addFavorite: async (coinId) => {
    const { favoriteIds } = get();
    if (favoriteIds.includes(coinId)) return;
    
    const updated = [...favoriteIds, coinId];
    set({ favoriteIds: updated });
    
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save favorites:', error);
      set({ favoriteIds });
    }
  },

  removeFavorite: async (coinId) => {
    const { favoriteIds } = get();
    const updated = favoriteIds.filter((id) => id !== coinId);
    set({ favoriteIds: updated });
    
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save favorites:', error);
      set({ favoriteIds });
    }
  },

  toggleFavorite: async (coinId) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(coinId)) {
      await removeFavorite(coinId);
    } else {
      await addFavorite(coinId);
    }
  },

  isFavorite: (coinId) => {
    const { favoriteIds } = get();
    return favoriteIds.includes(coinId);
  },

  loadFavorites: async () => {
    set({ loading: true });
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const favoriteIds = JSON.parse(stored) as string[];
        set({ favoriteIds, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
      set({ loading: false });
    }
  },

  clearFavorites: async () => {
    set({ favoriteIds: [] });
    try {
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear favorites:', error);
    }
  },
}));

