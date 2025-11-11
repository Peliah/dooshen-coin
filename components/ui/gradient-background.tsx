import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

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
    } else {
      progress.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!animated) {
      return {
        opacity: 1,
      };
    }
    
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
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

