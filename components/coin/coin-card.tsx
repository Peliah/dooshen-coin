/**
 * Coin card component with Web3 styling
 */

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { mockCoins } from '@/utils/mock-data';
import { formatPercentage, formatPrice, getPercentageColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CoinCardProps {
  coin: Coin | null | undefined;
  isFavorite?: boolean;
  onToggleFavorite?: (coinId: string) => void;
}

export function CoinCard({ coin, isFavorite = false, onToggleFavorite }: CoinCardProps) {
  const router = useRouter();

  let safeCoin: Coin;
  try {
    if (!coin) {
      console.warn('[CoinCard] Coin data is missing, falling back to mock data');
      safeCoin = mockCoins[0];
    } else {
      safeCoin = coin;
    }
  } catch (error) {
    console.error('[CoinCard] Error processing coin data:', error);
    safeCoin = mockCoins[0];
  }

  const handlePress = () => {
    try {
      if (!safeCoin?.id) {
        console.error('[CoinCard] Cannot navigate: coin ID is missing');
        return;
      }
      router.push(`/coin/${safeCoin.id}` as any);
    } catch (error) {
      console.error('[CoinCard] Navigation error:', error);
    }
  };

  const handleFavoritePress = (e: any) => {
    try {
      e.stopPropagation();
      if (!safeCoin?.id) {
        console.error('[CoinCard] Cannot toggle favorite: coin ID is missing');
        return;
      }
      onToggleFavorite?.(safeCoin.id);
    } catch (error) {
      console.error('[CoinCard] Favorite toggle error:', error);
    }
  };

  const priceChange = safeCoin?.price_change_percentage_24h ?? 0;
  const priceChangeColor = getPercentageColor(priceChange);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          {/* Coin Info Section */}
          <View style={styles.coinInfo}>
            <Image 
              source={{ uri: safeCoin?.image || mockCoins[0].image }} 
              style={styles.coinImage}
              contentFit="contain"
              transition={200}
              cachePolicy="memory"
              recyclingKey={safeCoin?.id || 'fallback'}
              priority="normal"
              onError={(error) => {
                console.error('[CoinCard] Image load error:', error);
              }}
            />
            <View style={styles.coinDetails}>
              <ThemedText type="defaultSemiBold" style={styles.coinName}>
                {safeCoin?.name || 'Unknown Coin'}
              </ThemedText>
              <ThemedText style={styles.coinSymbol}>
                {(safeCoin?.symbol || 'UNK').toUpperCase()}
              </ThemedText>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <ThemedText type="defaultSemiBold" style={styles.price}>
              {formatPrice(safeCoin?.current_price ?? 0)}
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

