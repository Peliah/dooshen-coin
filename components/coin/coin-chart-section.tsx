import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { MarketChartData } from '@/schema/coin';
import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export type TimeRange = '1' | '7' | '30' | '90' | '365' | 'max';

interface CoinChartSectionProps {
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  chartData?: MarketChartData;
}

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: '1D', value: '1' },
  { label: '7D', value: '7' },
  { label: '30D', value: '30' },
  { label: '90D', value: '90' },
  { label: '1Y', value: '365' },
  { label: 'All', value: 'max' },
];

const CHART_HEIGHT = 200;
const CHART_PADDING = 10;

export function CoinChartSection({ selectedTimeRange, onTimeRangeChange, chartData }: CoinChartSectionProps) {
  // Format and process data
  const { chartDataFormatted, priceChange, isPositive } = useMemo(() => {
    if (!chartData?.prices || !Array.isArray(chartData.prices) || chartData.prices.length === 0) {
      return { chartDataFormatted: [], priceChange: 0, isPositive: true };
    }

    const maxPoints = selectedTimeRange === 'max' ? 150 : 100;
    const validPoints = chartData.prices
      .filter((point) => {
        if (!Array.isArray(point) || point.length !== 2) return false;
        const [timestamp, price] = point;
        return (
          typeof timestamp === 'number' &&
          typeof price === 'number' &&
          !isNaN(timestamp) &&
          !isNaN(price) &&
          isFinite(timestamp) &&
          isFinite(price) &&
          price > 0
        );
      })
      .map((point) => ({
        timestamp: point[0],
        price: point[1],
      }));

    // Downsample if needed
    let formatted = validPoints;
    if (validPoints.length > maxPoints) {
      const step = Math.ceil(validPoints.length / maxPoints);
      formatted = validPoints.filter((_, index) => index % step === 0);
      // Always include last point
      if (formatted[formatted.length - 1] !== validPoints[validPoints.length - 1]) {
        formatted.push(validPoints[validPoints.length - 1]);
      }
    }

    const change =
      formatted.length >= 2
        ? ((formatted[formatted.length - 1].price - formatted[0].price) / formatted[0].price) * 100
        : 0;

    return {
      chartDataFormatted: formatted,
      priceChange: change,
      isPositive: change >= 0,
    };
  }, [chartData, selectedTimeRange]);

  // Generate SVG path
  const { svgPath, svgAreaPath } = useMemo(() => {
    if (chartDataFormatted.length < 2) {
      return { svgPath: '', svgAreaPath: '' };
    }

    const prices = chartDataFormatted.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Prevent division by zero
    if (priceRange === 0) {
      return { svgPath: '', svgAreaPath: '' };
    }

    const width = 326; // Approximate width
    const height = CHART_HEIGHT - CHART_PADDING * 2;
    const xStep = width / (chartDataFormatted.length - 1);

    // Create line path
    const linePath = chartDataFormatted
      .map((point, index) => {
        const x = index * xStep;
        const y = height - ((point.price - minPrice) / priceRange) * height + CHART_PADDING;
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');

    // Create area path (line + bottom)
    const areaPath =
      linePath +
      ` L ${(chartDataFormatted.length - 1) * xStep} ${CHART_HEIGHT - CHART_PADDING}` +
      ` L 0 ${CHART_HEIGHT - CHART_PADDING} Z`;

    return { svgPath: linePath, svgAreaPath: areaPath };
  }, [chartDataFormatted]);

  const chartColor = isPositive ? Colors.dark.success : Colors.dark.error;
  const gradientId = isPositive ? 'gradient-success' : 'gradient-error';

  if (!chartData) {
    return (
      <GlassCard style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <ThemedText type="subtitle">Price Chart</ThemedText>
          <View style={styles.timeRangeContainer}>
            {timeRanges.map((range) => (
              <TouchableOpacity
                key={range.value}
                onPress={() => onTimeRangeChange(range.value)}
                style={[
                  styles.timeRangeButton,
                  selectedTimeRange === range.value && styles.timeRangeButtonActive,
                ]}
              >
                <ThemedText
                  style={[
                    styles.timeRangeText,
                    selectedTimeRange === range.value && styles.timeRangeTextActive,
                  ]}
                >
                  {range.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.chartPlaceholder}>
          <ActivityIndicator size="large" color={Colors.dark.primary} />
          <ThemedText style={styles.chartPlaceholderText}>Loading chart data...</ThemedText>
        </View>
      </GlassCard>
    );
  }

  if (chartDataFormatted.length < 2 || !svgPath) {
    return (
      <GlassCard style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <ThemedText type="subtitle">Price Chart</ThemedText>
          <View style={styles.timeRangeContainer}>
            {timeRanges.map((range) => (
              <TouchableOpacity
                key={range.value}
                onPress={() => onTimeRangeChange(range.value)}
                style={[
                  styles.timeRangeButton,
                  selectedTimeRange === range.value && styles.timeRangeButtonActive,
                ]}
              >
                <ThemedText
                  style={[
                    styles.timeRangeText,
                    selectedTimeRange === range.value && styles.timeRangeTextActive,
                  ]}
                >
                  {range.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.chartPlaceholder}>
          <ThemedText style={styles.chartPlaceholderText}>No chart data available</ThemedText>
        </View>
      </GlassCard>
    );
  }

  return (
    <GlassCard style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <View style={styles.chartTitleRow}>
          <ThemedText type="subtitle">Price Chart</ThemedText>
          <View style={styles.priceChangeIndicator}>
            <ThemedText
              style={[
                styles.priceChangeText,
                { color: isPositive ? Colors.dark.success : Colors.dark.error },
              ]}
            >
              {isPositive ? '+' : ''}
              {priceChange.toFixed(2)}%
            </ThemedText>
          </View>
        </View>
        <View style={styles.timeRangeContainer}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range.value}
              onPress={() => onTimeRangeChange(range.value)}
              style={[
                styles.timeRangeButton,
                selectedTimeRange === range.value && styles.timeRangeButtonActive,
              ]}
            >
              <ThemedText
                style={[
                  styles.timeRangeText,
                  selectedTimeRange === range.value && styles.timeRangeTextActive,
                ]}
              >
                {range.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Svg width="100%" height={CHART_HEIGHT}>
          <Defs>
            <LinearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={chartColor} stopOpacity="0.05" />
            </LinearGradient>
          </Defs>
          
          {/* Area under the line */}
          <Path d={svgAreaPath} fill={`url(#${gradientId})`} />
          
          {/* Line */}
          <Path d={svgPath} stroke={chartColor} strokeWidth="2" fill="none" />
        </Svg>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    padding: Spacing.md,
  },
  chartHeader: {
    marginBottom: Spacing.md,
  },
  chartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  priceChangeIndicator: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.dark.surface,
  },
  priceChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },
  timeRangeButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  timeRangeButtonActive: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  timeRangeText: {
    fontSize: 12,
    opacity: 0.7,
  },
  timeRangeTextActive: {
    color: Colors.dark.secondary,
    opacity: 1,
    fontWeight: '600',
  },
  chartContainer: {
    height: CHART_HEIGHT,
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    overflow: 'hidden',
  },
  chartPlaceholder: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
  },
  chartPlaceholderText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: Spacing.sm,
  },
});