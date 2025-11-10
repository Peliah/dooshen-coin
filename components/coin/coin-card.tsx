/**
 * Coin card component with Web3 styling
 */

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { formatPercentage, formatPrice, getPercentageColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CoinCardProps {
  coin: Coin;
  isFavorite?: boolean;
  onToggleFavorite?: (coinId: string) => void;
}

export function CoinCard({ coin, isFavorite = false, onToggleFavorite }: CoinCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/coin/${coin.id}` as any);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    onToggleFavorite?.(coin.id);
  };

  const priceChange = coin.price_change_percentage_24h || 0;
  const priceChangeColor = getPercentageColor(priceChange);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          {/* Coin Info Section */}
          <View style={styles.coinInfo}>
            <Image 
              source={{ uri: coin.image }} 
              style={styles.coinImage}
              contentFit="contain"
              transition={200}
              cachePolicy="memory"
              recyclingKey={coin.id}
              priority="normal"
            />
            <View style={styles.coinDetails}>
              <ThemedText type="defaultSemiBold" style={styles.coinName}>
                {coin.name}
              </ThemedText>
              <ThemedText style={styles.coinSymbol}>
                {coin.symbol.toUpperCase()}
              </ThemedText>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <ThemedText type="defaultSemiBold" style={styles.price}>
              {formatPrice(coin.current_price)}
            </ThemedText>
            <View style={styles.priceChange}>
              <Ionicons
                name={priceChange >= 0 ? 'trending-up' : 'trending-down'}
                size={14}
                color={priceChangeColor}
                style={styles.trendIcon}
              />
              <ThemedText
                style={[
                  styles.percentageChange,
                  { color: priceChangeColor },
                ]}
              >
                {formatPercentage(priceChange)}
              </ThemedText>
            </View>
          </View>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? Colors.dark.accent : Colors.dark.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coinImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
  },
  coinDetails: {
    flex: 1,
  },
  coinName: {
    fontSize: 16,
    marginBottom: Spacing.xs / 2,
  },
  coinSymbol: {
    fontSize: 14,
    opacity: 0.7,
  },
  priceSection: {
    alignItems: 'flex-end',
    marginRight: Spacing.md,
  },
  price: {
    fontSize: 16,
    marginBottom: Spacing.xs / 2,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: Spacing.xs / 2,
  },
  percentageChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: Spacing.xs,
  },
});

