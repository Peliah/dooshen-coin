/**
 * Glassmorphic card component with Web3 styling
 */

import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
// import { BlurView } from 'expo-blur'; // Commented out for Android compatibility
import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: number;
}

export function GlassCard({ 
  children, 
  style, 
  intensity = 20,
  borderRadius = BorderRadius.lg 
}: GlassCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!isDark) {
    // Fallback for light mode
    return (
      <View style={[styles.card, { borderRadius }, style]}>
        {children}
      </View>
    );
  }

  // Use regular View on Android to avoid hardware bitmap issues
  // BlurView can cause "software rendering doesn't support hardware bitmaps" error on Android
  if (Platform.OS === 'android') {
    return (
      <View style={[styles.glassCardAndroid, { borderRadius }, style]}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    );
  }

  // Use BlurView on iOS and Web
  // return (
  //   <BlurView intensity={intensity} style={[styles.glassCard, { borderRadius }, style]}>
  //     <View style={styles.content}>
  //       {children}
  //     </View>
  //   </BlurView>
  // );

  // Fallback to regular View (same as Android)
  return (
    <View style={[styles.glassCardAndroid, { borderRadius }, style]}>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  glassCard: {
    backgroundColor: Colors.dark.glass.background,
    borderWidth: 1,
    borderColor: Colors.dark.glass.border,
    overflow: 'hidden',
    ...Shadows.md,
  },
  glassCardAndroid: {
    backgroundColor: Colors.dark.glass.background,
    borderWidth: 1,
    borderColor: Colors.dark.glass.border,
    overflow: 'hidden',
    ...Shadows.md,
    // Android fallback - no blur, just semi-transparent background
  },
  content: {
    flex: 1,
  },
});

