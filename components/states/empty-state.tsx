/**
 * Empty state component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/glass-card';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = 'infinite-outline',
  title = 'Nothing here',
  message = 'There\'s nothing to display at the moment',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          <Ionicons 
            name={icon} 
            size={64} 
            color={Colors.dark.textSecondary} 
          />
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText style={styles.message}>
            {message}
          </ThemedText>
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  card: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  message: {
    textAlign: 'center',
    opacity: 0.8,
  },
});

