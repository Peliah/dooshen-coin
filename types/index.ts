/**
 * General TypeScript types and utilities
 */

export type NetworkStatus = 'online' | 'offline' | 'slow';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'network';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export type SortOption = 'market_cap_desc' | 'market_cap_asc' | 'price_desc' | 'price_asc' | 'volume_desc' | 'volume_asc' | 'id_desc' | 'id_asc';

export interface ApiError {
  message: string;
  code?: number;
  status?: number;
}

export interface PriceAlert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  coinImage: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: number;
  triggeredAt?: number;
}

export type AlertCondition = 'above' | 'below';

