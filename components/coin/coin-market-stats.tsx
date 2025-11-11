import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { mockCoins } from '@/utils/mock-data';
import { formatLargeNumber, formatSupply } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinMarketStatsProps {
  coin: Coin | null | undefined;
}

export function CoinMarketStats({ coin }: CoinMarketStatsProps) {
  let safeCoin: Coin;
  try {
    if (!coin) {
      console.warn('[CoinMarketStats] Coin data is missing, falling back to mock data');
      safeCoin = mockCoins[0];
    } else {
      safeCoin = coin;
    }
  } catch (error) {
    console.error('[CoinMarketStats] Error processing coin data:', error);
    safeCoin = mockCoins[0];
  }

  return (
    <GlassCard style={styles.statsCard}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Market Stats
      </ThemedText>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Market Cap</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatLargeNumber(safeCoin?.market_cap ?? 0)}
        </ThemedText>
      </View>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>24h Volume</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatLargeNumber(safeCoin?.total_volume ?? 0)}
        </ThemedText>
      </View>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Circulating Supply</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatSupply(safeCoin?.circulating_supply ?? 0)}
        </ThemedText>
      </View>

      {safeCoin?.max_supply && (
        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Max Supply</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {formatSupply(safeCoin.max_supply)}
          </ThemedText>
        </View>
      )}

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Market Cap Rank</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          #{safeCoin?.market_cap_rank ?? 'N/A'}
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

