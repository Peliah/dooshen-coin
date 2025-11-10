/**
 * Coin comparison component for home page
 * Compares multiple coins side-by-side
 */

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { formatLargeNumber, formatPercentage, formatPrice, getPercentageColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface CoinComparisonProps {
  coins: Coin[];
  maxCoins?: number;
}

export function CoinComparison({ coins, maxCoins = 3 }: CoinComparisonProps) {
  const router = useRouter();
  const displayCoins = coins.slice(0, maxCoins);

  if (displayCoins.length === 0) {
    return null;
  }

  const handleCoinPress = (coinId: string) => {
    router.push(`/coin/${coinId}` as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Compare Coins
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Side-by-side comparison
        </ThemedText>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayCoins.map((coin) => (
          <TouchableOpacity
            key={coin.id}
            onPress={() => handleCoinPress(coin.id)}
            activeOpacity={0.7}
          >
            <GlassCard style={styles.comparisonCard}>
              <View style={styles.cardContent}>
                {/* Coin Header */}
                <View style={styles.coinHeader}>
                  <Image
                    source={{ uri: coin.image }}
                    style={styles.coinImage}
                    contentFit="contain"
                    cachePolicy="memory"
                    recyclingKey={coin.id}
                  />
                  <View style={styles.coinHeaderText}>
                    <ThemedText type="defaultSemiBold" style={styles.coinName}>
                      {coin.name}
                    </ThemedText>
                    <ThemedText style={styles.coinSymbol}>
                      {coin.symbol.toUpperCase()}
                    </ThemedText>
                  </View>
                </View>

                {/* Price */}
                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>Price</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.metricValue}>
                    {formatPrice(coin.current_price)}
                  </ThemedText>
                </View>

                {/* 24h Change */}
                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>24h Change</ThemedText>
                  <View style={styles.changeRow}>
                    <Ionicons
                      name={coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0 ? 'trending-up' : 'trending-down'}
                      size={14}
                      color={getPercentageColor(coin.price_change_percentage_24h)}
                    />
                    <ThemedText
                      style={[
                        styles.metricValue,
                        { color: getPercentageColor(coin.price_change_percentage_24h) },
                      ]}
                    >
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </ThemedText>
                  </View>
                </View>

                {/* Market Cap */}
                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>Market Cap</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.metricValue}>
                    {formatLargeNumber(coin.market_cap)}
                  </ThemedText>
                </View>

                {/* Volume */}
                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>24h Volume</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.metricValue}>
                    {formatLargeNumber(coin.total_volume)}
                  </ThemedText>
                </View>

                {/* Rank */}
                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>Rank</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.metricValue}>
                    #{coin.market_cap_rank}
                  </ThemedText>
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  title: {
    marginBottom: Spacing.xs / 2,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
  },
  comparisonCard: {
    width: 200,
    marginRight: Spacing.md,
  },
  cardContent: {
    padding: Spacing.md,
  },
  coinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  coinImage: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  coinHeaderText: {
    flex: 1,
  },
  coinName: {
    fontSize: 14,
    marginBottom: Spacing.xs / 2,
  },
  coinSymbol: {
    fontSize: 12,
    opacity: 0.7,
  },
  metric: {
    marginBottom: Spacing.md,
  },
  metricLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: Spacing.xs / 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 14,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs / 2,
  },
});

