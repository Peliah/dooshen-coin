import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : '#fff' }]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.dark.primary,
          tabBarInactiveTintColor: Colors.dark.textSecondary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: isDark ? styles.tabBarDark : styles.tabBarLight,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'heart' : 'heart-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'paper-plane' : 'paper-plane-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarDark: {
    backgroundColor: Colors.dark.glass.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.glass.border,
    height: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
    paddingTop: Spacing.md,
    ...(Platform.OS === 'android' && {
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.md,
      borderRadius: BorderRadius.xl,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      borderTopWidth: 0,
      borderWidth: 1,
      borderColor: Colors.dark.glass.border,
    }),
    ...(Platform.OS === 'ios' && {
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
    }),
    elevation: Platform.OS === 'android' ? 24 : 20,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: Platform.OS === 'android' ? 8 : -4 },
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.4,
    shadowRadius: Platform.OS === 'android' ? 20 : 16,
  },
  tabBarLight: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    height: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
    paddingTop: Spacing.md,
    ...(Platform.OS === 'android' && {
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.md,
      borderRadius: BorderRadius.xl,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      borderTopWidth: 0,
      borderWidth: 1,
      borderColor: '#e5e5e5',
      elevation: 24,
    }),
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: Spacing.xs / 2,
  },
  tabBarIcon: {
    marginTop: Spacing.xs,
  },
});
