import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { mockCoins } from '@/utils/mock-data';
import { formatDate, formatPercentage, formatPrice } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinHighLowProps {
  coin: Coin | null | undefined;
}

export function CoinHighLow({ coin }: CoinHighLowProps) {
  let safeCoin: Coin;
  try {
    if (!coin) {
      console.warn('[CoinHighLow] Coin data is missing, falling back to mock data');
      safeCoin = mockCoins[0];
    } else {
      safeCoin = coin;
    }
  } catch (error) {
    console.error('[CoinHighLow] Error processing coin data:', error);
    safeCoin = mockCoins[0];
  }

  return (
    <GlassCard style={styles.highLowCard}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        All-Time High & Low
      </ThemedText>

      <View style={styles.highLowRow}>
        <View style={styles.highLowItem}>
          <ThemedText style={styles.highLowLabel}>All-Time High</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.highLowValue}>
            {formatPrice(safeCoin?.ath ?? 0)}
          </ThemedText>
          <ThemedText style={[styles.highLowChange, { color: Colors.dark.error }]}>
            {formatPercentage(safeCoin?.ath_change_percentage ?? 0)}
          </ThemedText>
          {safeCoin?.ath_date && (
            <ThemedText style={styles.highLowDate}>
              {formatDate(safeCoin.ath_date)}
            </ThemedText>
          )}
        </View>

        <View style={styles.highLowDivider} />

        <View style={styles.highLowItem}>
          <ThemedText style={styles.highLowLabel}>All-Time Low</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.highLowValue}>
            {formatPrice(safeCoin?.atl ?? 0)}
          </ThemedText>
          <ThemedText style={[styles.highLowChange, { color: Colors.dark.success }]}>
            {formatPercentage(safeCoin?.atl_change_percentage ?? 0)}
          </ThemedText>
          {safeCoin?.atl_date && (
            <ThemedText style={styles.highLowDate}>
              {formatDate(safeCoin.atl_date)}
            </ThemedText>
          )}
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  highLowCard: {
    padding: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  highLowRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  highLowItem: {
    flex: 1,
    alignItems: 'center',
  },
  highLowLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  highLowValue: {
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  highLowChange: {
    fontSize: 12,
    marginBottom: Spacing.xs / 2,
  },
  highLowDate: {
    fontSize: 10,
    opacity: 0.5,
  },
  highLowDivider: {
    width: 1,
    backgroundColor: Colors.dark.border,
  },
});

