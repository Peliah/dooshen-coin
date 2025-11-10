/**
 * Coin list component with FlatList
 */

import { EmptyState } from '@/components/states/empty-state';
import { ErrorState } from '@/components/states/error-state';
import { LoadingState } from '@/components/states/loading-state';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet } from 'react-native';
import { CoinCard } from './coin-card';

interface CoinListProps {
  coins: Coin[];
  favorites?: string[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onToggleFavorite?: (coinId: string) => void;
  refreshing?: boolean;
}

export function CoinList({
  coins,
  favorites = [],
  loading = false,
  error = null,
  onRefresh,
  onLoadMore,
  onToggleFavorite,
  refreshing = false,
}: CoinListProps) {
  const renderItem: ListRenderItem<Coin> = useCallback(
    ({ item }) => (
      <CoinCard
        coin={item}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={onToggleFavorite}
      />
    ),
    [favorites, onToggleFavorite]
  );

  const keyExtractor = useCallback((item: Coin) => item.id, []);

  const renderFooter = () => {
    if (loading && coins.length > 0) {
      return <LoadingState count={2} />;
    }
    return null;
  };

  if (loading && coins.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRefresh} />;
  }

  if (coins.length === 0) {
    return <EmptyState icon="search-outline" title="No coins found" message="Try adjusting your search" />;
  }

  return (
    <FlatList
      data={coins}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.primary} />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: Spacing.sm,
  },
});

