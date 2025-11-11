import { Coin, CoinDetails, CoinImage } from '@/schema/coin';

export function getCoinImageUrl(coin: Coin | CoinDetails | null | undefined): string | null {
  if (!coin) return null;
  
  if (typeof coin.image === 'string') {
    return coin.image;
  }
  
  if (coin.image && typeof coin.image === 'object' && 'large' in coin.image) {
    return coin.image.large;
  }
  
  return null;
}

export function getCoinImageThumb(coin: Coin | CoinDetails | null | undefined): string | null {
  if (!coin) return null;
  
  if (typeof coin.image === 'string') {
    return coin.image;
  }
  
  if (coin.image && typeof coin.image === 'object' && 'thumb' in coin.image) {
    return coin.image.thumb;
  }
  
  return null;
}

export function getCoinPrice(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('current_price' in coin && typeof coin.current_price === 'number') {
    return coin.current_price;
  }
  
  if ('market_data' in coin && coin.market_data?.current_price) {
    return coin.market_data.current_price.usd ?? 0;
  }
  
  return 0;
}

export function getCoinMarketCap(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('market_cap' in coin && typeof coin.market_cap === 'number') {
    return coin.market_cap;
  }
  
  if ('market_data' in coin && coin.market_data?.market_cap) {
    return coin.market_data.market_cap.usd ?? 0;
  }
  
  return 0;
}

export function getCoinVolume(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('total_volume' in coin && typeof coin.total_volume === 'number') {
    return coin.total_volume;
  }
  
  if ('market_data' in coin && coin.market_data?.total_volume) {
    return coin.market_data.total_volume.usd ?? 0;
  }
  
  return 0;
}

export function getCoinHigh24h(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('high_24h' in coin && typeof coin.high_24h === 'number') {
    return coin.high_24h;
  }
  
  if ('market_data' in coin && coin.market_data?.high_24h) {
    return coin.market_data.high_24h.usd ?? 0;
  }
  
  return 0;
}

export function getCoinLow24h(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('low_24h' in coin && typeof coin.low_24h === 'number') {
    return coin.low_24h;
  }
  
  if ('market_data' in coin && coin.market_data?.low_24h) {
    return coin.market_data.low_24h.usd ?? 0;
  }
  
  return 0;
}

export function getCoinPriceChange24h(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('price_change_24h' in coin && typeof coin.price_change_24h === 'number') {
    return coin.price_change_24h;
  }
  
  if ('market_data' in coin && coin.market_data?.price_change_24h) {
    return coin.market_data.price_change_24h ?? 0;
  }
  
  return 0;
}

export function getCoinPriceChangePercentage24h(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('price_change_percentage_24h' in coin && typeof coin.price_change_percentage_24h === 'number') {
    return coin.price_change_percentage_24h;
  }
  
  if ('market_data' in coin && coin.market_data?.price_change_percentage_24h) {
    return coin.market_data.price_change_percentage_24h ?? 0;
  }
  
  return 0;
}

export function getCoinAth(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('ath' in coin && typeof coin.ath === 'number') {
    return coin.ath;
  }
  
  if ('market_data' in coin && coin.market_data?.ath) {
    return coin.market_data.ath.usd ?? 0;
  }
  
  return 0;
}

export function getCoinAtl(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('atl' in coin && typeof coin.atl === 'number') {
    return coin.atl;
  }
  
  if ('market_data' in coin && coin.market_data?.atl) {
    return coin.market_data.atl.usd ?? 0;
  }
  
  return 0;
}

export function getCoinMarketCapRank(coin: Coin | CoinDetails | null | undefined): number | null {
  if (!coin) return null;
  
  if ('market_cap_rank' in coin && typeof coin.market_cap_rank === 'number') {
    return coin.market_cap_rank;
  }
  
  if ('market_data' in coin && coin.market_data?.market_cap_rank) {
    return coin.market_data.market_cap_rank ?? null;
  }
  
  return null;
}

export function getCoinCirculatingSupply(coin: Coin | CoinDetails | null | undefined): number {
  if (!coin) return 0;
  
  if ('circulating_supply' in coin && typeof coin.circulating_supply === 'number') {
    return coin.circulating_supply;
  }
  
  if ('market_data' in coin && coin.market_data?.circulating_supply) {
    return coin.market_data.circulating_supply ?? 0;
  }
  
  return 0;
}

export function getCoinTotalSupply(coin: Coin | CoinDetails | null | undefined): number | null {
  if (!coin) return null;
  
  if ('total_supply' in coin && typeof coin.total_supply === 'number') {
    return coin.total_supply;
  }
  
  if ('market_data' in coin && coin.market_data?.total_supply) {
    return coin.market_data.total_supply ?? null;
  }
  
  return null;
}

export function getCoinMaxSupply(coin: Coin | CoinDetails | null | undefined): number | null {
  if (!coin) return null;
  
  if ('max_supply' in coin && typeof coin.max_supply === 'number') {
    return coin.max_supply;
  }
  
  if ('market_data' in coin && coin.market_data?.max_supply) {
    return coin.market_data.max_supply ?? null;
  }
  
  return null;
}

