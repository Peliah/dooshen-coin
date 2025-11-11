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
  try {
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

    if (!trendingCoins || trendingCoins.length === 0) {
      console.warn('[TrendingList] No trending coins available');
      return null;
    }

    const validCoins = trendingCoins.filter((trendingCoin, index) => {
      try {
        if (!trendingCoin || !trendingCoin.item || !trendingCoin.item.id) {
          console.warn(`[TrendingList] Invalid trending coin at index ${index}`);
          return false;
        }
        return true;
      } catch (error) {
        console.error(`[TrendingList] Error validating trending coin at index ${index}:`, error);
        return false;
      }
    });

    if (validCoins.length === 0) {
      console.warn('[TrendingList] No valid trending coins after filtering');
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
          nestedScrollEnabled={true}
        >
          {validCoins.map((trendingCoin, index) => {
            try {
              return (
                <TrendingCard 
                  key={`trending-${trendingCoin.item.id}-${index}`} 
                  trendingCoin={trendingCoin} 
                />
              );
            } catch (error) {
              console.error(`[TrendingList] Error rendering trending coin at index ${index}:`, error);
              return null;
            }
          })}
        </ScrollView>
      </View>
    );
  } catch (error) {
    console.error('[TrendingList] Component render error:', error);
    return null;
  }
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

