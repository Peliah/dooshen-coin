import { PriceAlert } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const ALERTS_STORAGE_KEY = '@dooshen_coin:alerts';

interface AlertsStore {
  alerts: PriceAlert[];
  loading: boolean;
  
  addAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => Promise<void>;
  removeAlert: (alertId: string) => Promise<void>;
  updateAlert: (alertId: string, updates: Partial<PriceAlert>) => Promise<void>;
  toggleAlert: (alertId: string) => Promise<void>;
  getAlertsByCoinId: (coinId: string) => PriceAlert[];
  getActiveAlerts: () => PriceAlert[];
  loadAlerts: () => Promise<void>;
  clearAlerts: () => Promise<void>;
  markAlertTriggered: (alertId: string) => Promise<void>;
}

export const useAlertsStore = create<AlertsStore>((set, get) => ({
  alerts: [],
  loading: false,

  addAlert: async (alertData) => {
    const { alerts } = get();
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alert-${Date.now()}-${Math.random()}`,
      createdAt: Date.now(),
    };
    
    const updated = [...alerts, newAlert];
    set({ alerts: updated });
    
    try {
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save alerts:', error);
      set({ alerts });
    }
  },

  removeAlert: async (alertId) => {
    const { alerts } = get();
    const updated = alerts.filter((alert) => alert.id !== alertId);
    set({ alerts: updated });
    
    try {
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save alerts:', error);
      set({ alerts });
    }
  },

  updateAlert: async (alertId, updates) => {
    const { alerts } = get();
    const updated = alerts.map((alert) =>
      alert.id === alertId ? { ...alert, ...updates } : alert
    );
    set({ alerts: updated });
    
    try {
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save alerts:', error);
      set({ alerts });
    }
  },

  toggleAlert: async (alertId) => {
    const { alerts } = get();
    const updated = alerts.map((alert) =>
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    );
    set({ alerts: updated });
    
    try {
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save alerts:', error);
      set({ alerts });
    }
  },

  getAlertsByCoinId: (coinId) => {
    const { alerts } = get();
    return alerts.filter((alert) => alert.coinId === coinId);
  },

  getActiveAlerts: () => {
    const { alerts } = get();
    return alerts.filter((alert) => alert.isActive);
  },

  loadAlerts: async () => {
    set({ loading: true });
    try {
      const stored = await AsyncStorage.getItem(ALERTS_STORAGE_KEY);
      if (stored) {
        const alerts = JSON.parse(stored) as PriceAlert[];
        set({ alerts, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
      set({ loading: false });
    }
  },

  clearAlerts: async () => {
    set({ alerts: [] });
    try {
      await AsyncStorage.removeItem(ALERTS_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear alerts:', error);
    }
  },

  markAlertTriggered: async (alertId) => {
    const { alerts } = get();
    const updated = alerts.map((alert) =>
      alert.id === alertId
        ? { ...alert, triggeredAt: Date.now(), isActive: false }
        : alert
    );
    set({ alerts: updated });
    
    try {
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save alerts:', error);
      set({ alerts });
    }
  },
}));

