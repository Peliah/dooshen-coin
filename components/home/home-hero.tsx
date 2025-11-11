import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useNetworkStore } from '@/stores/network';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function HomeHero() {
  const router = useRouter();
  const isOnline = useNetworkStore((state) => state.isOnline);

  const handleFavoritesPress = () => {
    try {
      router.push('/(tabs)/favorites' as any);
    } catch (error) {
      console.error('[HomeHero] Navigation error:', error);
    }
  };

  return (
    <View style={styles.heroSection}>
      <View style={styles.imageContainer}>
        <View style={styles.imageRing}>
          <Image
            source={require('@/assets/imgs/nft-mokey.jpg')}
            style={styles.nftImage}
            contentFit="cover"
            cachePolicy="memory"
            onError={(error) => {
              console.error('[HomeHero] Image load error:', error);
            }}
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
          <View 
            style={[
              styles.networkDot, 
              { backgroundColor: isOnline ? Colors.dark.success : Colors.dark.error }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

