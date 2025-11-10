import { CoinCard } from '@/components/coin/coin-card';
import { CoinComparisonSelector } from '@/components/coin/coin-comparison-selector';
import { TrendingList } from '@/components/coin/trending-list';
import { ThemedText } from '@/components/themed-text';
import { GradientBackground } from '@/components/ui/gradient-background';
import { SearchBar } from '@/components/ui/search-bar';
import { ToastContainer } from '@/components/ui/toast/toast-container';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { mockCoins, mockTrendingCoins } from '@/utils/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoinsListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavoritesPress = () => {
    router.push('/(tabs)/favorites' as any);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleToggleFavorite = (coinId: string) => {
    setFavorites((prev) =>
      prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
    );
  };

  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return mockCoins;
    const query = searchQuery.toLowerCase();
    return mockCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <View style={styles.imageContainer}>
              <View style={styles.imageRing}>
                <Image
                  source={require('@/assets/imgs/nft-mokey.jpg')}
                  style={styles.nftImage}
                  contentFit="cover"
                  cachePolicy="memory"
                />
              </View>
            </View>

            <View style={styles.rightSection}>
              <TouchableOpacity 
                onPress={handleFavoritesPress}
                style={styles.favoritesButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name="heart" 
                  size={24} 
                  color={Colors.dark.accent} 
                />
              </TouchableOpacity>

              <View style={styles.networkIndicator}>
                <View style={[styles.networkDot, { backgroundColor: Colors.dark.success }]} />
              </View>
            </View>
          </View>

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Search coins..."
          />

          <TrendingList trendingCoins={mockTrendingCoins} />

          <View style={styles.comparisonSection}>
            <CoinComparisonSelector />
          </View>

          <View style={styles.coinsListSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              All Coins
            </ThemedText>
            {filteredCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isFavorite={favorites.includes(coin.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </View>
        </ScrollView>

        <ToastContainer />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRing: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    padding: 3,
    backgroundColor: Colors.dark.primary,
    borderWidth: 2,
    borderColor: Colors.dark.accent,
    shadowColor: Colors.dark.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  nftImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  favoritesButton: {
    padding: Spacing.sm,
  },
  networkIndicator: {
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  networkDot: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
  },
  comparisonSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  coinsListSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
});
