import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
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
    return (
      <View style={[styles.card, { borderRadius }, style]}>
        {children}
      </View>
    );
  }

  if (Platform.OS === 'android') {
    return (
      <View style={[styles.glassCardAndroid, { borderRadius }, style]}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    );
  }

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
  },
  content: {
    flex: 1,
  },
});

