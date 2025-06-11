/**
 * Token configuration for FlowsyAI Solana token
 * Update these values when the actual token is deployed
 */

export interface TokenConfig {
  // Token Contract Information
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: number;

  // Visual Assets
  logoUrl: string;
  bannerImageUrl?: string;

  // Trading Links
  dexScreenerUrl: string;
  raydiumUrl: string;
  jupiterUrl: string;
  solscanUrl: string;

  // Social Links
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;

  // Launch Information
  launchDate?: string;
  isLaunched: boolean;
  isPreLaunch: boolean;

  // Display Settings
  showInBanner: boolean;
  showTransactions: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in milliseconds

  // API Configuration
  enableLiveData: boolean;
  fallbackToDemo: boolean;
}

// Main token configuration
export const FLOWSY_TOKEN_CONFIG: TokenConfig = {
  // Contract Information - REAL TOKEN ADDRESS
  contractAddress: 'GzfwLWcTyEWcC3D9SeaXQPvfCevjh5xce1iWsPJGpump',
  name: 'FlowsyAI Token',
  symbol: 'FLOWSY',
  decimals: 9,

  // Visual Assets
  logoUrl: '/flowsy-new-logo.png',
  bannerImageUrl: '/flowsy-new-logo.png',

  // Trading Links - UPDATED WITH REAL TOKEN ADDRESS
  dexScreenerUrl: 'https://dexscreener.com/solana/GzfwLWcTyEWcC3D9SeaXQPvfCevjh5xce1iWsPJGpump',
  raydiumUrl: 'https://raydium.io/swap/?inputCurrency=sol&outputCurrency=GzfwLWcTyEWcC3D9SeaXQPvfCevjh5xce1iWsPJGpump',
  jupiterUrl: 'https://jup.ag/swap/SOL-GzfwLWcTyEWcC3D9SeaXQPvfCevjh5xce1iWsPJGpump',
  solscanUrl: 'https://solscan.io/token/GzfwLWcTyEWcC3D9SeaXQPvfCevjh5xce1iWsPJGpump',

  // Social Links
  website: 'https://flowsyai.com',
  twitter: 'https://twitter.com/FlowsyAI',
  telegram: 'https://t.me/FlowsyAI',
  discord: 'https://discord.gg/FlowsyAI',

  // Launch Information
  launchDate: '2025-01-01', // Updated launch date
  isLaunched: true, // Token is now live
  isPreLaunch: false, // No longer pre-launch

  // Display Settings
  showInBanner: true,
  showTransactions: true,
  autoRefresh: true,
  refreshInterval: 30000, // 30 seconds for live data

  // API Configuration
  enableLiveData: true, // Enable live data feeds
  fallbackToDemo: false, // Use real data only
};

// Environment-specific overrides
export const getTokenConfig = (): TokenConfig => {
  const config = { ...FLOWSY_TOKEN_CONFIG };

  // Production overrides
  if (import.meta.env.PROD) {
    // In production, use live data with real token address
    config.fallbackToDemo = false;
    config.enableLiveData = true;
  }

  // Development overrides
  if (import.meta.env.DEV) {
    // In development, use live data for real token
    config.enableLiveData = true;
    config.fallbackToDemo = false;
  }

  return config;
};

// Utility functions for token configuration
export const isTokenLaunched = (): boolean => {
  return getTokenConfig().isLaunched;
};

export const isPreLaunch = (): boolean => {
  return getTokenConfig().isPreLaunch;
};

export const getTokenAddress = (): string => {
  return getTokenConfig().contractAddress;
};

export const getTradingLinks = () => {
  const config = getTokenConfig();
  return {
    dexScreener: config.dexScreenerUrl,
    raydium: config.raydiumUrl,
    jupiter: config.jupiterUrl,
    solscan: config.solscanUrl,
  };
};

export const getSocialLinks = () => {
  const config = getTokenConfig();
  return {
    website: config.website,
    twitter: config.twitter,
    telegram: config.telegram,
    discord: config.discord,
  };
};

// Token launch countdown utility
export const getLaunchCountdown = (): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
} => {
  const config = getTokenConfig();

  if (config.isLaunched || !config.launchDate) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLaunched: true,
    };
  }

  const now = new Date().getTime();
  const launchTime = new Date(config.launchDate).getTime();
  const difference = launchTime - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLaunched: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isLaunched: false,
  };
};

// Validation functions
export const validateTokenAddress = (address: string): boolean => {
  // Basic Solana address validation
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

export const updateTokenConfig = (updates: Partial<TokenConfig>): void => {
  // This would be used to update configuration at runtime
  // In a real implementation, this might update a database or config service
  console.warn('updateTokenConfig called with:', updates);
  console.warn('This is a placeholder - implement actual config update logic');
};

// Export default configuration
export default FLOWSY_TOKEN_CONFIG;
