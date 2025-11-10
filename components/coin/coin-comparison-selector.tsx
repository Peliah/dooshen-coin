import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { SearchBar } from '@/components/ui/search-bar';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Coin } from '@/schema/coin';
import { formatPercentage, formatPrice, getPercentageColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface CoinComparisonSelectorProps {
  coins: Coin[];
  allCoins?: Coin[];
  onCoinChange?: (index: number, coinId: string) => void;
  loading?: boolean;
}

export function CoinComparisonSelector({ 
  coins, 
  allCoins = [],
  onCoinChange,
  loading = false 
}: CoinComparisonSelectorProps) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = allCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCoinPress = (coinId: string) => {
    router.push(`/coin/${coinId}` as any);
  };

  const handleChangeCoin = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
    setSearchQuery('');
  };

  const handleSelectCoin = (coin: Coin) => {
    if (selectedIndex !== null) {
      onCoinChange?.(selectedIndex, coin.id);
    }
    setShowModal(false);
    setSelectedIndex(null);
    setSearchQuery('');
  };

  const renderCoinOption = (coin: Coin) => (
    <TouchableOpacity
      key={coin.id}
      onPress={() => handleSelectCoin(coin)}
      style={styles.coinOption}
    >
      <Image
        source={{ uri: coin.image }}
        style={styles.coinOptionImage}
        contentFit="contain"
        cachePolicy="memory"
        recyclingKey={coin.id}
      />
      <View style={styles.coinOptionInfo}>
        <ThemedText type="defaultSemiBold" style={styles.coinOptionName}>
          {coin.name}
        </ThemedText>
        <ThemedText style={styles.coinOptionSymbol}>
          {coin.symbol.toUpperCase()}
        </ThemedText>
      </View>
      <ThemedText type="defaultSemiBold" style={styles.coinOptionPrice}>
        {formatPrice(coin.current_price)}
      </ThemedText>
    </TouchableOpacity>
  );

  if (loading || coins.length === 0) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.placeholderText}>Loading comparison...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Compare Coins
        </ThemedText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {coins.map((coin, index) => (
          <TouchableOpacity
            key={coin.id}
            onPress={() => handleCoinPress(coin.id)}
            activeOpacity={0.7}
          >
            <GlassCard style={styles.comparisonCard}>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleChangeCoin(index);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="swap-horizontal" size={16} color={Colors.dark.primary} />
              </TouchableOpacity>

              <View style={styles.cardContent}>
                <View style={styles.coinHeader}>
                  <Image
                    source={{ uri: coin.image }}
                    style={styles.coinImage}
                    contentFit="contain"
                    cachePolicy="memory"
                    recyclingKey={coin.id}
                  />
                  <View style={styles.coinHeaderText}>
                    <ThemedText type="defaultSemiBold" style={styles.coinName} numberOfLines={1}>
                      {coin.name}
                    </ThemedText>
                    <ThemedText style={styles.coinSymbol} numberOfLines={1}>
                      {coin.symbol.toUpperCase()}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>Price</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.metricValue}>
                    {formatPrice(coin.current_price)}
                  </ThemedText>
                </View>

                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>24h Change</ThemedText>
                  <View style={styles.changeRow}>
                    <Ionicons
                      name={coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0 ? 'trending-up' : 'trending-down'}
                      size={12}
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

                <View style={styles.metric}>
                  <ThemedText style={styles.metricLabel}>Market Cap</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.metricValueSmall}>
                    ${(coin.market_cap / 1e9).toFixed(2)}B
                  </ThemedText>
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowModal(false);
          setSelectedIndex(null);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setShowModal(false);
            setSelectedIndex(null);
          }}
        >
          <GlassCard style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">Select Coin</ThemedText>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setSelectedIndex(null);
                }}
              >
                <Ionicons name="close" size={24} color={Colors.dark.text} />
              </TouchableOpacity>
            </View>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search coins..."
            />
            <FlatList
              data={filteredCoins}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderCoinOption(item)}
              style={styles.coinList}
              showsVerticalScrollIndicator={false}
            />
          </GlassCard>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  header: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  comparisonCard: {
    width: 160,
    position: 'relative',
  },
  changeButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    zIndex: 10,
    padding: Spacing.xs,
    backgroundColor: Colors.dark.glass.background,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.glass.border,
  },
  cardContent: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  coinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  coinImage: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  coinHeaderText: {
    flex: 1,
  },
  coinName: {
    fontSize: 13,
    marginBottom: Spacing.xs / 2,
  },
  coinSymbol: {
    fontSize: 11,
    opacity: 0.7,
  },
  metric: {
    marginBottom: Spacing.sm,
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.6,
    marginBottom: Spacing.xs / 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 13,
  },
  metricValueSmall: {
    fontSize: 12,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs / 2,
  },
  placeholderText: {
    textAlign: 'center',
    opacity: 0.6,
    padding: Spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '80%',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  coinList: {
    maxHeight: 400,
    marginTop: Spacing.md,
  },
  coinOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  coinOptionImage: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
  },
  coinOptionInfo: {
    flex: 1,
  },
  coinOptionName: {
    fontSize: 14,
    marginBottom: Spacing.xs / 2,
  },
  coinOptionSymbol: {
    fontSize: 12,
    opacity: 0.7,
  },
  coinOptionPrice: {
    fontSize: 14,
  },
});
