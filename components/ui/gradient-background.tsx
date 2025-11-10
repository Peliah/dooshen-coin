/**
 * Animated gradient background component
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Gradients, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Note: expo-linear-gradient needs to be installed
// For now, using a simple View with background color
// TODO: Install expo-linear-gradient and use LinearGradient component

interface GradientBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
}

export function GradientBackground({ children, style, animated = true }: GradientBackgroundProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      progress.value = withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        true
      );
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!animated) return {};
    
    return {
      opacity: interpolate(progress.value, [0, 0.5, 1], [0.8, 1, 0.8]),
    };
  });

  if (!isDark) {
    return (
      <View style={[styles.container, { backgroundColor: Colors.light.background }, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          StyleSheet.absoluteFill, 
          animatedStyle,
          { backgroundColor: Colors.dark.background }
        ]} 
      />
      {/* TODO: Replace with LinearGradient after installing expo-linear-gradient */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

