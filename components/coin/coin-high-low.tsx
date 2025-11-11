import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin, CoinDetails } from '@/schema/coin';
import { getCoinAth, getCoinAtl } from '@/utils/coin-helpers';
import { mockCoins } from '@/utils/mock-data';
import { formatDate, formatPercentage, formatPrice } from '@/utils/formatters';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinHighLowProps {
  coin: Coin | CoinDetails | null | undefined;
}

export function CoinHighLow({ coin }: CoinHighLowProps) {
  let safeCoin: Coin | CoinDetails;
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

  const ath = getCoinAth(safeCoin);
  const atl = getCoinAtl(safeCoin);
  
  let athChangePercentage = 0;
  let athDate: string | null = null;
  let atlChangePercentage = 0;
  let atlDate: string | null = null;

  if ('ath_change_percentage' in safeCoin && typeof safeCoin.ath_change_percentage === 'number') {
    athChangePercentage = safeCoin.ath_change_percentage;
  } else if ('market_data' in safeCoin && safeCoin.market_data?.ath_change_percentage) {
    athChangePercentage = safeCoin.market_data.ath_change_percentage.usd ?? 0;
  }

  if ('ath_date' in safeCoin && typeof safeCoin.ath_date === 'string') {
    athDate = safeCoin.ath_date;
  } else if ('market_data' in safeCoin && safeCoin.market_data?.ath_date) {
    athDate = safeCoin.market_data.ath_date.usd ?? null;
  }

  if ('atl_change_percentage' in safeCoin && typeof safeCoin.atl_change_percentage === 'number') {
    atlChangePercentage = safeCoin.atl_change_percentage;
  } else if ('market_data' in safeCoin && safeCoin.market_data?.atl_change_percentage) {
    atlChangePercentage = safeCoin.market_data.atl_change_percentage.usd ?? 0;
  }

  if ('atl_date' in safeCoin && typeof safeCoin.atl_date === 'string') {
    atlDate = safeCoin.atl_date;
  } else if ('market_data' in safeCoin && safeCoin.market_data?.atl_date) {
    atlDate = safeCoin.market_data.atl_date.usd ?? null;
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
            {formatPrice(ath)}
          </ThemedText>
          <ThemedText style={[styles.highLowChange, { color: Colors.dark.error }]}>
            {formatPercentage(athChangePercentage)}
          </ThemedText>
          {athDate && (
            <ThemedText style={styles.highLowDate}>
              {formatDate(athDate)}
            </ThemedText>
          )}
        </View>

        <View style={styles.highLowDivider} />

        <View style={styles.highLowItem}>
          <ThemedText style={styles.highLowLabel}>All-Time Low</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.highLowValue}>
            {formatPrice(atl)}
          </ThemedText>
          <ThemedText style={[styles.highLowChange, { color: Colors.dark.success }]}>
            {formatPercentage(atlChangePercentage)}
          </ThemedText>
          {atlDate && (
            <ThemedText style={styles.highLowDate}>
              {formatDate(atlDate)}
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

