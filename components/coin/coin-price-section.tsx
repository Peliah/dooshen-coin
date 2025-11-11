import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { mockCoins } from '@/utils/mock-data';
import { formatPercentage, formatPrice, getPercentageColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinPriceSectionProps {
  coin: Coin | null | undefined;
}

export function CoinPriceSection({ coin }: CoinPriceSectionProps) {
  let safeCoin: Coin;
  try {
    if (!coin) {
      console.warn('[CoinPriceSection] Coin data is missing, falling back to mock data');
      safeCoin = mockCoins[0];
    } else {
      safeCoin = coin;
    }
  } catch (error) {
    console.error('[CoinPriceSection] Error processing coin data:', error);
    safeCoin = mockCoins[0];
  }

  const priceChange = safeCoin?.price_change_percentage_24h ?? 0;
  const priceChange24h = safeCoin?.price_change_24h ?? 0;
  const currentPrice = safeCoin?.current_price ?? 0;

  return (
    <GlassCard style={styles.priceCard}>
      <View style={styles.priceRow}>
        <ThemedText type="title" style={styles.price}>
          {formatPrice(currentPrice)}
        </ThemedText>
        <View style={styles.changeRow}>
          <Ionicons
            name={priceChange >= 0 ? 'trending-up' : 'trending-down'}
            size={20}
            color={getPercentageColor(priceChange)}
          />
          <ThemedText
            style={[
              styles.priceChange,
              { color: getPercentageColor(priceChange) },
            ]}
          >
            {formatPercentage(priceChange)}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={styles.priceChange24h}>
        24h: {formatPrice(priceChange24h)}
      </ThemedText>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  priceCard: {
    padding: Spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  price: {
    fontSize: 32,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  priceChange: {
    fontSize: 18,
    fontWeight: '600',
  },
  priceChange24h: {
    fontSize: 14,
    opacity: 0.7,
  },
});

