import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { mockCoins } from '@/utils/mock-data';
import { formatPrice } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinRange24hProps {
  coin: Coin | null | undefined;
}

export function CoinRange24h({ coin }: CoinRange24hProps) {
  let safeCoin: Coin;
  try {
    if (!coin) {
      console.warn('[CoinRange24h] Coin data is missing, falling back to mock data');
      safeCoin = mockCoins[0];
    } else {
      safeCoin = coin;
    }
  } catch (error) {
    console.error('[CoinRange24h] Error processing coin data:', error);
    safeCoin = mockCoins[0];
  }

  return (
    <GlassCard style={styles.rangeCard}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        24h Range
      </ThemedText>

      <View style={styles.rangeRow}>
        <View style={styles.rangeItem}>
          <ThemedText style={styles.rangeLabel}>High</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.rangeValue}>
            {formatPrice(safeCoin?.high_24h ?? 0)}
          </ThemedText>
        </View>

        <View style={styles.rangeDivider} />

        <View style={styles.rangeItem}>
          <ThemedText style={styles.rangeLabel}>Low</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.rangeValue}>
            {formatPrice(safeCoin?.low_24h ?? 0)}
          </ThemedText>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  rangeCard: {
    padding: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  rangeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  rangeItem: {
    flex: 1,
    alignItems: 'center',
  },
  rangeLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  rangeValue: {
    fontSize: 16,
  },
  rangeDivider: {
    width: 1,
    backgroundColor: Colors.dark.border,
  },
});

