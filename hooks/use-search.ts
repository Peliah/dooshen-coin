import { RateLimitError, searchCoins } from '@/libs/api/coingecko';
import { useNetworkStore } from '@/stores/network';
import { useToastStore } from '@/stores/toast';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from './use-debounce';

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank?: number;
  thumb: string;
  large: string;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, 300);
  const isOnline = useNetworkStore((state) => state.isOnline);
  const addToast = useToastStore((state) => state.addToast);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    if (!isOnline) {
      setError('No internet connection');
      addToast({
        type: 'network',
        message: 'Search requires internet connection',
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchCoins(searchQuery);
      setResults(data.coins);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.warn('[useSearch] Rate limit exceeded, returning empty results');
        setResults([]);
        setError(null);
        addToast({
          type: 'warning',
          message: 'Rate limit exceeded. Please try again later.',
          duration: 3000,
        });
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to search coins';
      setError(errorMessage);
      setResults([]);
      
      addToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [isOnline, addToast]);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  const hasResults = useMemo(() => results.length > 0, [results]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    hasResults,
    clearSearch,
  };
}

