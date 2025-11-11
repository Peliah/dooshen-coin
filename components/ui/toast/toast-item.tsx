import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '../glass-card';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { Toast } from '@/types';
import { useToastStore } from '@/stores/toast';

interface ToastItemProps {
  toast: Toast;
}

export function ToastItem({ toast }: ToastItemProps) {
  const removeToast = useToastStore((state) => state.removeToast);
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 15 });
    opacity.value = withTiming(1, { duration: 300 });

    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        dismiss();
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    translateY.value = withTiming(-100, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(removeToast)(toast.id);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
      case 'network':
        return 'wifi';
      default:
        return 'information-circle';
    }
  };

  const getColor = () => {
    switch (toast.type) {
      case 'success':
        return Colors.dark.success;
      case 'error':
        return Colors.dark.error;
      case 'warning':
        return Colors.dark.warning;
      case 'info':
        return Colors.dark.primary;
      case 'network':
        return Colors.dark.secondary;
      default:
        return Colors.dark.primary;
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <GlassCard style={styles.toast}>
        <TouchableOpacity 
          style={styles.content} 
          onPress={dismiss}
          activeOpacity={0.8}
        >
          <Ionicons name={getIcon()} size={24} color={getColor()} />
          <View style={styles.textContainer}>
            <ThemedText style={styles.message}>{toast.message}</ThemedText>
            {toast.action && (
              <TouchableOpacity
                onPress={() => {
                  toast.action?.onPress();
                  dismiss();
                }}
                style={styles.actionButton}
              >
                <ThemedText style={styles.actionText}>
                  {toast.action.label}
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    marginBottom: Spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  message: {
    fontSize: 14,
  },
  actionButton: {
    marginTop: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  actionText: {
    color: Colors.dark.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});

