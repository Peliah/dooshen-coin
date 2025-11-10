/**
 * Web3-styled search bar component
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './glass-card';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = 'Search coins...',
  onClear 
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <GlassCard style={styles.container}>
      <View style={styles.content}>
        <Ionicons 
          name="search" 
          size={20} 
          color={isDark ? Colors.dark.textSecondary : Colors.light.icon} 
          style={styles.icon}
        />
        <TextInput
          style={[
            styles.input,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.icon}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && onClear && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={isDark ? Colors.dark.textSecondary : Colors.light.icon} 
            />
          </TouchableOpacity>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Spacing.xs,
  },
  clearButton: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
});

