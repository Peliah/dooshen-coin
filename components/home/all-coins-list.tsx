import { CoinCard } from '@/components/coin/coin-card';
import { EmptyState } from '@/components/states/empty-state';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AllCoinsListProps {
  coins: Coin[];
  searchQuery: string;
  isFavorite: (coinId: string) => boolean;
  onToggleFavorite: (coinId: string) => void;
}

export function AllCoinsList({ 
  coins, 
  searchQuery, 
  isFavorite, 
  onToggleFavorite 
}: AllCoinsListProps) {
  if (coins.length === 0) {
    return (
      <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          All Coins
        </ThemedText>
        <EmptyState 
          icon="search-outline" 
          title="No coins found" 
          message={searchQuery ? "Try adjusting your search" : "No coins available"} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        All Coins
      </ThemedText>
      {coins.map((coin) => {
        try {
          if (!coin || !coin.id) {
            console.warn('[AllCoinsList] Invalid coin in list, skipping');
            return null;
          }
          return (
            <CoinCard
              key={coin.id}
              coin={coin}
              isFavorite={isFavorite(coin.id)}
              onToggleFavorite={() => onToggleFavorite(coin.id)}
            />
          );
        } catch (error) {
          console.error('[AllCoinsList] Error rendering coin card:', error);
          return null;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
});

