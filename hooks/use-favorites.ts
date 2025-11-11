import { useCoinsStore } from '@/stores/coins';
import { useFavoritesStore } from '@/stores/favorites';
import { useCallback, useEffect } from 'react';

export function useFavorites() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const loading = useFavoritesStore((state) => state.loading);
  
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  
  const getCoinsByIds = useCoinsStore((state) => state.getCoinsByIds);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const favoriteCoins = getCoinsByIds(favoriteIds);

  const handleToggleFavorite = useCallback(async (coinId: string) => {
    await toggleFavorite(coinId);
  }, [toggleFavorite]);

  return {
    favoriteIds,
    favoriteCoins,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite: handleToggleFavorite,
  };
}

