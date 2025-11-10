import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { MarketChartData } from '@/schema/coin';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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

export function CoinChartSection({ selectedTimeRange, onTimeRangeChange, chartData }: CoinChartSectionProps) {
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
        <ThemedText style={styles.chartPlaceholderText}>
          Chart will be implemented here
        </ThemedText>
        {chartData && (
          <ThemedText style={styles.chartPlaceholderSubtext}>
            {chartData.prices.length} data points for {selectedTimeRange === 'max' ? 'All' : `${selectedTimeRange}D`}
          </ThemedText>
        )}
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
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  chartPlaceholderText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: Spacing.xs,
  },
  chartPlaceholderSubtext: {
    fontSize: 12,
    opacity: 0.5,
  },
});

