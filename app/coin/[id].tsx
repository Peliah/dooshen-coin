/**
 * Coin Details Screen - Placeholder
 * Will be fully implemented in Phase 6
 */

import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Colors, Spacing } from '@/constants/theme';

export default function CoinDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          <ThemedText type="subtitle">Coin Details</ThemedText>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.content}>
          <ThemedText>Coin ID: {id}</ThemedText>
          <ThemedText style={styles.placeholderText}>
            Coin details screen will be implemented in Phase 6
          </ThemedText>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  placeholderText: {
    marginTop: Spacing.md,
    textAlign: 'center',
    opacity: 0.7,
  },
});

