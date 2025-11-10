import { CoinChartSection, TimeRange } from '@/components/coin/coin-chart-section';
import { CoinDetailsHeader } from '@/components/coin/coin-details-header';
import { CoinHighLow } from '@/components/coin/coin-high-low';
import { CoinMarketStats } from '@/components/coin/coin-market-stats';
import { CoinPriceSection } from '@/components/coin/coin-price-section';
import { CoinRange24h } from '@/components/coin/coin-range-24h';
import { GradientBackground } from '@/components/ui/gradient-background';
import { ToastContainer } from '@/components/ui/toast/toast-container';
import { Spacing } from '@/constants/theme';
import { mockChartData, mockCoins } from '@/utils/mock-data';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoinDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('7');

  const coin = useMemo(() => {
    return mockCoins.find((c) => c.id === id) || mockCoins[0];
  }, [id]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <CoinDetailsHeader
          coin={coin}
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite((prev) => !prev)}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.priceSection}>
            <CoinPriceSection coin={coin} />
          </View>

          <View style={styles.chartSection}>
            <CoinChartSection
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={setSelectedTimeRange}
              chartData={mockChartData}
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
