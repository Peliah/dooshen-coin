import { CoinChartSection, TimeRange } from '@/components/coin/coin-chart-section';
import { CoinDetailsHeader } from '@/components/coin/coin-details-header';
import { CoinHighLow } from '@/components/coin/coin-high-low';
import { CoinMarketStats } from '@/components/coin/coin-market-stats';
import { CoinPriceSection } from '@/components/coin/coin-price-section';
import { CoinRange24h } from '@/components/coin/coin-range-24h';
import { ErrorState } from '@/components/states/error-state';
import { LoadingState } from '@/components/states/loading-state';
import { GradientBackground } from '@/components/ui/gradient-background';
import { ToastContainer } from '@/components/ui/toast/toast-container';
import { Colors, Spacing } from '@/constants/theme';
import { useCoinChart } from '@/hooks/use-coin-chart';
import { useCoinDetails } from '@/hooks/use-coin-details';
import { useFavorites } from '@/hooks/use-favorites';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoinDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('7');
  
  const { details, loading, error, refresh } = useCoinDetails(id || '');
  const { chartData, loading: chartLoading, refresh: refreshChart } = useCoinChart(id || '', selectedTimeRange);
  const { isFavorite, toggleFavorite } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      if (id) {
        refresh();
        refreshChart();
      }
    }, [id, refresh, refreshChart])
  );
  // console.log(selectedTimeRange);
  
  // console.log(chartData)
  const coin = details;

  if (loading && !coin) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <LoadingState count={5} />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (error && !coin) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <ErrorState message={error} onRetry={refresh} />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (!coin) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <ErrorState message="Coin not found" />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <CoinDetailsHeader
          coin={coin}
          isFavorite={isFavorite(coin.id)}
          onToggleFavorite={() => toggleFavorite(coin.id)}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading || chartLoading}
              onRefresh={() => {
                refresh();
                refreshChart();
              }}
              tintColor={Colors.dark.primary}
            />
          }
        >
          <View style={styles.priceSection}>
            <CoinPriceSection coin={coin} />
          </View>

          <View style={styles.chartSection}>
            <CoinChartSection
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={setSelectedTimeRange}
              chartData={chartData ?? undefined}
            />
          </View>

          <View style={styles.statsSection}>
            <CoinMarketStats coin={coin} />
          </View>

          <View style={styles.highLowSection}>
            <CoinHighLow coin={coin} />
          </View>

          <View style={styles.rangeSection}>
            <CoinRange24h coin={coin} />
          </View>
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
  priceSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  chartSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  statsSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  highLowSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  rangeSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
});
