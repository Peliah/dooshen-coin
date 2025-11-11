import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Coin, CoinDetails } from '@/schema/coin';
import { getCoinImageThumb } from '@/utils/coin-helpers';
import { mockCoins } from '@/utils/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CoinDetailsHeaderProps {
  coin: Coin | CoinDetails | null | undefined;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CoinDetailsHeader({ coin, isFavorite, onToggleFavorite }: CoinDetailsHeaderProps) {
  const router = useRouter();

  let safeCoin: Coin | CoinDetails;
  try {
    if (!coin) {
      console.warn('[CoinDetailsHeader] Coin data is missing, falling back to mock data');
      safeCoin = mockCoins[0];
    } else {
      safeCoin = coin;
    }
  } catch (error) {
    console.error('[CoinDetailsHeader] Error processing coin data:', error);
    safeCoin = mockCoins[0];
  }

  const handleBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error('[CoinDetailsHeader] Navigation error:', error);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        {(() => {
          const imageUrl = getCoinImageThumb(safeCoin);
          return imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.headerImage}
              contentFit="contain"
              cachePolicy="memory"
              recyclingKey={safeCoin.id || 'fallback'}
              onError={(error) => {
                console.error('[CoinDetailsHeader] Image load error:', error);
              }}
            />
          ) : (
            <View style={[styles.headerImage, { backgroundColor: Colors.dark.textSecondary, opacity: 0.3 }]} />
          );
        })()}
        <View style={styles.headerText}>
          <ThemedText type="defaultSemiBold" style={styles.headerName}>
            {safeCoin?.name || 'Unknown Coin'}
          </ThemedText>
          <ThemedText style={styles.headerSymbol}>
            {(safeCoin?.symbol || 'UNK').toUpperCase()}
          </ThemedText>
        </View>
      </View>
      <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? Colors.dark.error : Colors.dark.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  headerImage: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
  },
  headerSymbol: {
    fontSize: 12,
    opacity: 0.7,
  },
  favoriteButton: {
    padding: Spacing.xs,
  },
});

