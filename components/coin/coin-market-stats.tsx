import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin, CoinDetails } from '@/schema/coin';
import { getCoinCirculatingSupply, getCoinMarketCap, getCoinMarketCapRank, getCoinMaxSupply, getCoinVolume } from '@/utils/coin-helpers';
import { formatLargeNumber, formatSupply } from '@/utils/formatters';
import { mockCoins } from '@/utils/mock-data';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinMarketStatsProps {
  coin: Coin | CoinDetails | null | undefined;
}

export function CoinMarketStats({ coin }: CoinMarketStatsProps) {
  let safeCoin: Coin | CoinDetails;
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

  const marketCap = getCoinMarketCap(safeCoin);
  const volume = getCoinVolume(safeCoin);
  const circulatingSupply = getCoinCirculatingSupply(safeCoin);
  const maxSupply = getCoinMaxSupply(safeCoin);
  const marketCapRank = getCoinMarketCapRank(safeCoin);

  return (
    <GlassCard style={styles.statsCard}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Market Stats
      </ThemedText>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Market Cap</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatLargeNumber(marketCap)}
        </ThemedText>
      </View>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>24h Volume</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatLargeNumber(volume)}
        </ThemedText>
      </View>

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Circulating Supply</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          {formatSupply(circulatingSupply)}
        </ThemedText>
      </View>

      {maxSupply && (
        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Max Supply</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {formatSupply(maxSupply)}
          </ThemedText>
        </View>
      )}

      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>Market Cap Rank</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statValue}>
          #{marketCapRank ?? 'N/A'}
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

