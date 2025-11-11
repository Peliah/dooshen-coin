import { HomeContent } from '@/components/home/home-content';
import { HomeHero } from '@/components/home/home-hero';
import { ErrorState } from '@/components/states/error-state';
import { LoadingState } from '@/components/states/loading-state';
import { GradientBackground } from '@/components/ui/gradient-background';
import { SearchBar } from '@/components/ui/search-bar';
import { ToastContainer } from '@/components/ui/toast/toast-container';
import { Colors, Spacing } from '@/constants/theme';
import { useCoins } from '@/hooks/use-coins';
import { useFavorites } from '@/hooks/use-favorites';
import { mockTrendingCoins } from '@/utils/mock-data';
import React, { useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoinsListScreen() {
  const { coins, trending, loading, error, isRefreshing, refresh } = useCoins();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const safeTrending = useMemo(() => {
    try {
      if (!trending || trending.length === 0) {
        console.warn('[CoinsListScreen] No trending coins available, falling back to mock data');
        return mockTrendingCoins;
      }
      const validTrending = trending.filter((item) => {
        try {
          return item != null && item.item != null && item.item.id != null;
        } catch (error) {
          console.error('[CoinsListScreen] Error validating trending coin:', error);
          return false;
        }
      });
      if (validTrending.length === 0) {
        console.warn('[CoinsListScreen] All trending coins invalid, falling back to mock data');
        return mockTrendingCoins;
      }
      return validTrending;
    } catch (error) {
      console.error('[CoinsListScreen] Error processing trending coins:', error);
      return mockTrendingCoins;
    }
  }, [trending]);

  const filteredCoins = useMemo(() => {
    try {
      if (!coins || coins.length === 0) {
        console.warn('[CoinsListScreen] No coins available for filtering');
        return [];
      }
      if (!searchQuery.trim()) return coins;
      const query = searchQuery.toLowerCase();
      return coins.filter((coin) => {
        try {
          if (!coin || !coin.name || !coin.symbol) {
            return false;
          }
          return (
            coin.name.toLowerCase().includes(query) ||
            coin.symbol.toLowerCase().includes(query)
          );
        } catch (error) {
          console.error('[CoinsListScreen] Error filtering coin:', error);
          return false;
        }
      });
    } catch (error) {
      console.error('[CoinsListScreen] Error in filteredCoins:', error);
      return [];
    }
  }, [coins, searchQuery]);

  const comparisonCoins = useMemo(() => {
    try {
      if (!coins || coins.length === 0) {
        console.warn('[CoinsListScreen] No coins available for comparison');
        return [];
      }
      return coins.slice(0, 3).filter(coin => coin != null);
    } catch (error) {
      console.error('[CoinsListScreen] Error in comparisonCoins:', error);
      return [];
    }
  }, [coins]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCoinChange = (index: number, coinId: string) => {
    console.log(`Change coin at index ${index} to ${coinId}`);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
              tintColor={Colors.dark.primary}
            />
          }
        >
          <HomeHero />

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Search coins..."
          />

          {loading && coins.length === 0 ? (
            <LoadingState count={20} />
            // <View></View>
          ) : error && coins.length === 0 ? (
            <ErrorState message={error} onRetry={refresh} />  
            // <View></View>
          ) : (
            <HomeContent
              coins={coins}
              trending={safeTrending}
              filteredCoins={filteredCoins}
              comparisonCoins={comparisonCoins}
              searchQuery={searchQuery}
              loading={loading}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onCoinChange={handleCoinChange}
            />
            // <View></View>
          )}
        </ScrollView>

        <ToastContainer />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
});
