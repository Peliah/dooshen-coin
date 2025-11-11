import { CoinComparisonSelector } from '@/components/coin/coin-comparison-selector';
import { TrendingList } from '@/components/coin/trending-list';
import { AllCoinsList } from '@/components/home/all-coins-list';
import { Coin, TrendingCoin } from '@/schema/coin';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HomeContentProps {
  coins: Coin[];
  trending: TrendingCoin[];
  filteredCoins: Coin[];
  comparisonCoins: Coin[];
  searchQuery: string;
  loading: boolean;
  isFavorite: (coinId: string) => boolean;
  onToggleFavorite: (coinId: string) => void;
  onCoinChange?: (index: number, coinId: string) => void;
}

export function HomeContent({
  coins,
  trending,
  filteredCoins,
  comparisonCoins,
  searchQuery,
  loading,
  isFavorite,
  onToggleFavorite,
  onCoinChange,
}: HomeContentProps) {
  return (
    <>
      {trending.length > 0 && (
        <TrendingList trendingCoins={trending} loading={loading} />
      )}

      <View style={styles.comparisonSection}>
        <CoinComparisonSelector 
          coins={comparisonCoins}
          allCoins={coins}
          onCoinChange={onCoinChange}
        />
      </View>

      <AllCoinsList
        coins={filteredCoins}
        searchQuery={searchQuery}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
}

const styles = StyleSheet.create({
  comparisonSection: {
    paddingVertical: Spacing.lg,
  },
});

