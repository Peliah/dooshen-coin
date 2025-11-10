import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { formatLargeNumber, formatSupply } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinMarketStatsProps {
  coin: Coin;
}

export function CoinMarketStats({ coin }: CoinMarketStatsProps) {
  return (
    <GlassCard style={styles.statsCard}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Market Stats
      </ThemedText>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Market Cap</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatLargeNumber(coin.market_cap)}
        </ThemedText>
      </View>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>24h Volume</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatLargeNumber(coin.total_volume)}
        </ThemedText>
      </View>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Circulating Supply</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatSupply(coin.circulating_supply)}
        </ThemedText>
      </View>

      {coin.max_supply && (
        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Max Supply</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {formatSupply(coin.max_supply)}
          </ThemedText>
        </View>
      )}

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Market Cap Rank</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          #{coin.market_cap_rank}
        </ThemedText>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    padding: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 14,
  },
});

