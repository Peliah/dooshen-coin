/**
 * Favorites Screen - Placeholder
 * Will be fully implemented later
 */

import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Spacing } from '@/constants/theme';

export default function FavoritesScreen() {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title">Favorites</ThemedText>
          <ThemedText style={styles.placeholderText}>
            Favorites screen will be implemented here
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

