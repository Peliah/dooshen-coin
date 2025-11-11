import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { TrendingCoin } from '@/schema/coin';
import { mockTrendingCoins } from '@/utils/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TrendingCardProps {
  trendingCoin: TrendingCoin | null | undefined;
}

export function TrendingCard({ trendingCoin }: TrendingCardProps) {
  const router = useRouter();

  let safeTrendingCoin: TrendingCoin;
  try {
    if (!trendingCoin || !trendingCoin.item) {
      console.warn('[TrendingCard] Trending coin data is missing, falling back to mock data');
      safeTrendingCoin = mockTrendingCoins[0];
    } else {
      safeTrendingCoin = trendingCoin;
    }
  } catch (error) {
    console.error('[TrendingCard] Error processing trending coin data:', error);
    safeTrendingCoin = mockTrendingCoins[0];
  }

  const { item } = safeTrendingCoin;

  const handlePress = () => {
    try {
      if (!item?.id) {
        console.error('[TrendingCard] Cannot navigate: coin ID is missing');
        return;
      }
      router.push(`/coin/${item.id}` as any);
    } catch (error) {
      console.error('[TrendingCard] Navigation error:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="flame"
              size={16}
              color={Colors.dark.accent}
              style={styles.trendIcon}
            />
          </View>
          <Image
            source={{ uri: item?.thumb || mockTrendingCoins[0].item.thumb }}
            style={styles.coinImage}
            contentFit="contain"
            transition={200}
            cachePolicy="memory"
            recyclingKey={item?.id || 'fallback'}
            priority="normal"
            onError={(error) => {
              console.error('[TrendingCard] Image load error:', error);
            }}
          />
          <View style={styles.coinInfo}>
            <ThemedText type="defaultSemiBold" style={styles.coinName} numberOfLines={1}>
              {item?.name || 'Unknown Coin'}
            </ThemedText>
            <ThemedText style={styles.coinSymbol} numberOfLines={1}>
              {(item?.symbol || 'UNK').toUpperCase()}
            </ThemedText>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: Spacing.md,
    minWidth: 140,
  },
  content: {
    padding: Spacing.sm,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
  },
  trendIcon: {
  },
  coinImage: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.xs / 2,
  },
  coinInfo: {
    alignItems: 'center',
    width: '100%',
  },
  coinName: {
    fontSize: 14,
    marginBottom: 0,
    textAlign: 'center',
  },
  coinSymbol: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
});

