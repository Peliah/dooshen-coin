/**
 * Horizontal trending coins list
 */

import { LoadingState } from '@/components/states/loading-state';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { TrendingCoin } from '@/schema/coin';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TrendingCard } from './trending-card';

interface TrendingListProps {
  trendingCoins: TrendingCoin[];
  loading?: boolean;
}

export function TrendingList({ trendingCoins, loading = false }: TrendingListProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Trending
        </ThemedText>
        <LoadingState count={1} />
      </View>
    );
  }

  if (trendingCoins.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Trending
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {trendingCoins.map((trendingCoin, index) => (
          <TrendingCard key={`${trendingCoin.item.id}-${index}`} trendingCoin={trendingCoin} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  title: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
  },
});

