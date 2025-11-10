import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import React from 'react';

export default function CoinLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? Colors.dark.background : '#fff',
        },
        animation: 'slide_from_right',
        animationDuration: 200,
      }}
    >
      <Stack.Screen 
        name="[id]" 
        options={{
          headerShown: false,
          presentation: 'card',
        }} 
      />
    </Stack>
  );
}