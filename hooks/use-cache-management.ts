import { cleanupOldCache } from '@/libs/storage/cache';
import { useNetworkStore } from '@/stores/network';
import { useEffect } from 'react';

const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000;
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export function useCacheManagement() {
  const isOnline = useNetworkStore((state) => state.isOnline);

  useEffect(() => {
    const performCleanup = async () => {
      try {
        const removedCount = await cleanupOldCache(CACHE_MAX_AGE);
        if (removedCount > 0) {
          console.log(`[useCacheManagement] Cleaned up ${removedCount} old cache entries`);
        }
      } catch (error) {
        console.error('[useCacheManagement] Failed to cleanup cache:', error);
      }
    };

    performCleanup();

    const interval = setInterval(() => {
      if (isOnline) {
        performCleanup();
      }
    }, CLEANUP_INTERVAL);

    return () => clearInterval(interval);
  }, [isOnline]);
}

