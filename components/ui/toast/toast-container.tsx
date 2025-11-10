/**
 * Toast container component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastItem } from './toast-item';
import { useToastStore } from '@/stores/toast';

export function ToastContainer() {
  const insets = useSafeAreaInsets();
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { top: insets.top + 16 }]}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 16,
    gap: 8,
  },
});

