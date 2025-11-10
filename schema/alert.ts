/**
 * Price alert schemas and types
 */

export interface PriceAlert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  coinImage: string;
  targetPrice: number;
  alertType: 'above' | 'below' | 'both';
  isActive: boolean;
  triggeredAt?: number; // Unix timestamp
  createdAt: number; // Unix timestamp
  currentPrice?: number; // Last checked price
}

export type AlertType = 'above' | 'below' | 'both';

