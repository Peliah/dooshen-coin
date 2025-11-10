/**
 * Error state component
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/glass-card';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  message = 'Something went wrong',
  onRetry 
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          <Ionicons 
            name="alert-circle-outline" 
            size={64} 
            color={Colors.dark.error} 
          />
          <ThemedText type="subtitle" style={styles.title}>
            Oops!
          </ThemedText>
          <ThemedText style={styles.message}>
            {message}
          </ThemedText>
          {onRetry && (
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={onRetry}
            >
              <ThemedText style={styles.retryText}>Retry</ThemedText>
            </TouchableOpacity>
          )}
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
    marginBottom: Spacing.lg,
    opacity: 0.8,
  },
  retryButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

