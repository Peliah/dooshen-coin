import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useNetworkStore } from '@/stores/network';
import { useToastStore } from '@/stores/toast';

export function useNetworkStatus() {
  const isConnected = useNetworkStore((state) => state.isConnected);
  const isOnline = useNetworkStore((state) => state.isOnline);
  const connectionType = useNetworkStore((state) => state.connectionType);
  
  const setConnectionStatus = useNetworkStore((state) => state.setConnectionStatus);
  const checkConnection = useNetworkStore((state) => state.checkConnection);
  
  const addToast = useToastStore((state) => state.addToast);
  const previousOnlineStatus = useRef<boolean | null>(null);
  const isInitialized = useRef(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initializeStatus = async () => {
      await checkConnection();
      const currentState = useNetworkStore.getState();
      previousOnlineStatus.current = currentState.isOnline;
      
      setTimeout(() => {
        isInitialized.current = true;
      }, 2000);
    };
    
    initializeStatus();

    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOnline = state.isConnected && (state.isInternetReachable ?? true);
      
      setConnectionStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });

      const wasOnline = previousOnlineStatus.current;
      const nowOnline = isOnline;

      if (wasOnline !== null && wasOnline !== nowOnline && isInitialized.current) {
        if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
        }

        toastTimeoutRef.current = setTimeout(() => {
          if (nowOnline) {
            addToast({
              type: 'success',
              message: 'Connection restored',
              duration: 2000,
            });
          } else {
            addToast({
              type: 'network',
              message: 'No internet connection',
              duration: 3000,
            });
          }
          toastTimeoutRef.current = null;
        }, 500);
      }

      previousOnlineStatus.current = nowOnline;
    });

    return () => {
      unsubscribe();
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [setConnectionStatus, checkConnection, addToast]);

  return {
    isConnected,
    isOnline,
    connectionType,
    checkConnection,
  };
}

