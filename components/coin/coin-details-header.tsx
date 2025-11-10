import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CoinDetailsHeaderProps {
  coin: Coin;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CoinDetailsHeader({ coin, isFavorite, onToggleFavorite }: CoinDetailsHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Image
          source={{ uri: coin.image }}
          style={styles.headerImage}
          contentFit="contain"
          cachePolicy="memory"
          recyclingKey={coin.id}
        />
        <View style={styles.headerText}>
          <ThemedText type="defaultSemiBold" style={styles.headerName}>
            {coin.name}
          </ThemedText>
          <ThemedText style={styles.headerSymbol}>
            {coin.symbol.toUpperCase()}
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

