import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { formatPercentage, formatPrice, getPercentageColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CoinPriceSectionProps {
  coin: Coin;
}

export function CoinPriceSection({ coin }: CoinPriceSectionProps) {
  return (
    <GlassCard style={styles.priceCard}>
      <View style={styles.priceRow}>
        <ThemedText type="title" style={styles.price}>
          {formatPrice(coin.current_price)}
        </ThemedText>
        <View style={styles.changeRow}>
          <Ionicons
            name={coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0 ? 'trending-up' : 'trending-down'}
            size={20}
            color={getPercentageColor(coin.price_change_percentage_24h)}
          />
          <ThemedText
            style={[
              styles.priceChange,
              { color: getPercentageColor(coin.price_change_percentage_24h) },
            ]}
          >
            {formatPercentage(coin.price_change_percentage_24h)}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={styles.priceChange24h}>
        24h: {formatPrice(coin.price_change_24h)}
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

