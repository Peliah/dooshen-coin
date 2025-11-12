import { MarketChartData } from '@/schema/coin';

export interface ChartDataPoint {
  x: number;
  y: number;
}

export interface TransformedChartData {
  data: ChartDataPoint[];
  minPrice: number;
  maxPrice: number;
  minTimestamp: number;
  maxTimestamp: number;
}

export function transformChartData(chartData: MarketChartData | null | undefined): TransformedChartData | null {
  if (!chartData || !chartData.prices || chartData.prices.length === 0) {
    return null;
  }

  const prices = chartData.prices;
  
  const validPrices = prices.filter(([timestamp, price]) => {
    return (
      typeof timestamp === 'number' &&
      typeof price === 'number' &&
      !isNaN(timestamp) &&
      !isNaN(price) &&
      isFinite(timestamp) &&
      isFinite(price) &&
      price > 0 &&
      timestamp > 0
    );
  });

  if (validPrices.length === 0) {
    return null;
  }
  
  const data: ChartDataPoint[] = validPrices.map(([timestamp, price]) => ({
    x: timestamp,
    y: price,
  }));

  const pricesOnly = validPrices.map(([, price]) => price);
  const timestampsOnly = validPrices.map(([timestamp]) => timestamp);

  if (pricesOnly.length === 0 || timestampsOnly.length === 0) {
    return null;
  }

  return {
    data,
    minPrice: Math.min(...pricesOnly),
    maxPrice: Math.max(...pricesOnly),
    minTimestamp: Math.min(...timestampsOnly),
    maxTimestamp: Math.max(...timestampsOnly),
  };
}

export function formatChartTimestamp(timestamp: number, timeRange: string): string {
  const date = new Date(timestamp);
  
  if (timeRange === '1') {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  
  if (timeRange === '7' || timeRange === '30') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  if (timeRange === '90' || timeRange === '365') {
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function getPriceChangeColor(priceChange: number): string {
  if (priceChange > 0) return '#10B981';
  if (priceChange < 0) return '#EF4444';
  return '#f5f5f5';
}

export function downsampleData(data: ChartDataPoint[], maxPoints: number = 200): ChartDataPoint[] {
  if (data.length <= maxPoints) {
    return data;
  }

  const step = Math.ceil(data.length / maxPoints);
  const downsampled: ChartDataPoint[] = [];

  for (let i = 0; i < data.length; i += step) {
    downsampled.push(data[i]);
  }

  if (downsampled[downsampled.length - 1] !== data[data.length - 1]) {
    downsampled.push(data[data.length - 1]);
  }

  return downsampled;
}

