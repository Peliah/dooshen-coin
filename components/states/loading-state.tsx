/**
 * Loading state component with skeleton loaders
 */

import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface LoadingStateProps {
  count?: number;
}

export function LoadingState({ count = 3 }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </View>
  );
}

function SkeletonCard() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 1000 }),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <GlassCard style={styles.card}>
      <Animated.View style={[styles.skeleton, animatedStyle]}>
        <View style={styles.header}>
          <Animated.View style={[styles.circle, animatedStyle]} />
          <View style={styles.textContainer}>
            <Animated.View style={[styles.line, { width: '60%' }, animatedStyle]} />
            <Animated.View style={[styles.line, { width: '40%', marginTop: Spacing.xs }, animatedStyle]} />
          </View>
        </View>
        <View style={styles.footer}>
          <Animated.View style={[styles.line, { width: '50%' }, animatedStyle]} />
          <Animated.View style={[styles.line, { width: '30%' }, animatedStyle]} />
        </View>
      </Animated.View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  skeleton: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.dark.textSecondary,
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  line: {
    height: 12,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
});

