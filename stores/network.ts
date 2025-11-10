import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { create } from 'zustand';

interface NetworkStore {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  connectionType: NetInfoStateType | null;
  isOnline: boolean;
  
  setConnectionStatus: (status: {
    isConnected: boolean;
    isInternetReachable: boolean | null | undefined;
    type: NetInfoStateType | null;
  }) => void;
  checkConnection: () => Promise<void>;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  isConnected: false,
  isInternetReachable: null,
  connectionType: null,
  isOnline: false,

  setConnectionStatus: (status) => {
    const isOnline = status.isConnected && (status.isInternetReachable ?? true);
    set({
      isConnected: status.isConnected,
      isInternetReachable: status.isInternetReachable ?? null,
      connectionType: status.type,
      isOnline,
    });
  },

  checkConnection: async () => {
    try {
      const state = await NetInfo.fetch();
      const isConnected = state.isConnected ?? false;
      const isInternetReachable = state.isInternetReachable !== undefined ? state.isInternetReachable : null;
      const connectionType = state.type ?? null;
      const isOnline = isConnected && (isInternetReachable ?? true);
      
      set({
        isConnected,
        isInternetReachable,
        connectionType,
        isOnline,
      });
    } catch (error) {
      console.error('Failed to check network status:', error);
      set({
        isConnected: false,
        isInternetReachable: null,
        connectionType: null,
        isOnline: false,
      });
    }
  },
}));

