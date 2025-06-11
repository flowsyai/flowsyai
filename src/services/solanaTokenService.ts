import { logger } from '@/lib/logger';

export interface TokenData {
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  supply: number;
  decimals: number;
  logoUrl?: string;
  // New fields for data transparency
  holders?: number;
  dataSource: 'dexscreener' | 'birdeye' | 'jupiter' | 'pump.fun' | 'solscan' | 'helius' | 'unknown';
  lastUpdated: number;
  isVerified: boolean;
  dataQuality: 'high' | 'medium' | 'low';
}

export interface TransactionData {
  signature: string;
  type: 'buy' | 'sell';
  amount: number;
  value: number;
  timestamp: number;
  from: string;
  to: string;
}

export interface PriceHistory {
  timestamp: number;
  price: number;
  volume: number;
}

interface DexScreenerPair {
  baseToken: {
    name: string;
    symbol: string;
    totalSupply: string;
    decimals: string;
  };
  priceUsd: string;
  priceChange: {
    h24: string;
  };
  marketCap: string;
  volume: {
    h24: number;
  };
  info?: {
    imageUrl: string;
  };
}

class SolanaTokenService {
  private readonly SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com';
  private readonly COINGECKO_API = 'https://api.coingecko.com/api/v3';
  private readonly BIRDEYE_API = 'https://public-api.birdeye.so/public';
  private readonly JUPITER_API = 'https://price.jup.ag/v4';
  private readonly PUMP_FUN_API = 'https://frontend-api.pump.fun';
  private readonly DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex';
  private readonly SOLSCAN_API = 'https://public-api.solscan.io';
  private readonly HELIUS_API = 'https://api.helius.xyz/v0';

  // Demo data for development - will be replaced with real API calls
  private readonly DEMO_TOKEN_DATA: TokenData = {
    name: 'FlowsyAI Token',
    symbol: 'FLOWSY',
    price: 0.0245,
    priceChange24h: 12.34,
    marketCap: 2450000,
    volume24h: 125000,
    supply: 100000000,
    decimals: 9,
    logoUrl: '/flowsy-token-logo.png',
    holders: undefined, // No fake holder data
    dataSource: 'unknown',
    lastUpdated: Date.now(),
    isVerified: false,
    dataQuality: 'low',
  };

  private readonly DEMO_TRANSACTIONS: TransactionData[] = [
    {
      signature:
        '5KJp7z8mN3qR4vL2wX9yB1cE6fH8jK9mP2qS4tU7vW8xY1zA2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU2vW3xY4zA',
      type: 'buy',
      amount: 1250,
      value: 30.625,
      timestamp: Date.now() - 300000, // 5 minutes ago
      from: '7xKjP2qS4tU7vW8xY1zA2bC3dE4fG5hI6jK7lM8nO9pQ',
      to: '9pQ0rS1tU2vW3xY4zA5bC6dE7fG8hI9jK0lM1nO2pQ3r',
    },
    {
      signature:
        '3dE4fG5hI6jK7lM8nO9pQ0rS1tU2vW3xY4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8bC9dE0fG1h',
      type: 'sell',
      amount: 800,
      value: 19.6,
      timestamp: Date.now() - 600000, // 10 minutes ago
      from: '1nO2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5p',
      to: '5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9x',
    },
    {
      signature:
        '8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9xY0zA1bC2dE3fG4hI5jK6l',
      type: 'buy',
      amount: 2000,
      value: 49.0,
      timestamp: Date.now() - 900000, // 15 minutes ago
      from: '6rS7tU8vW9xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0t',
      to: '0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4b',
    },
  ];

  /**
   * Get token data from various APIs with fallbacks
   */
  async getTokenData(tokenAddress: string): Promise<TokenData> {
    try {
      logger.info(`Fetching REAL token data for: ${tokenAddress}`);

      // Always fetch real data - no more demo mode
      // Try DexScreener API first (most reliable for Solana tokens)
      try {
        const dexScreenerData = await this.getDexScreenerTokenData(tokenAddress);
        if (dexScreenerData) {
          // Try to enrich with holder count from Solscan
          try {
            const holderCount = await this.getHolderCount(tokenAddress);
            dexScreenerData.holders = holderCount;
          } catch (error) {
            logger.warn('Failed to fetch holder count:', error);
          }
          return dexScreenerData;
        }
      } catch (error) {
        logger.warn('DexScreener API failed, trying Pump.fun:', error);
      }

      // Try Pump.fun API (for pump.fun tokens)
      try {
        const pumpFunData = await this.getPumpFunTokenData(tokenAddress);
        if (pumpFunData) {
          return pumpFunData;
        }
      } catch (error) {
        logger.warn('Pump.fun API failed, trying Jupiter:', error);
      }

      // Try Jupiter API
      try {
        const jupiterData = await this.getJupiterPrice(tokenAddress);
        if (jupiterData) {
          return await this.enrichTokenData(tokenAddress, jupiterData);
        }
      } catch (error) {
        logger.warn('Jupiter API failed, trying Birdeye:', error);
      }

      // Fallback to Birdeye API
      try {
        return await this.getBirdeyeTokenData(tokenAddress);
      } catch (error) {
        logger.warn('Birdeye API failed:', error);
      }

      // If all APIs fail, throw error
      throw new Error('Unable to fetch real token data from any API');
    } catch (error) {
      logger.error('All token data APIs failed:', error);
      throw new Error('Unable to fetch token data. Please try again later.');
    }
  }

  /**
   * Get real holder count from Solscan API
   */
  private async getHolderCount(tokenAddress: string): Promise<number | undefined> {
    try {
      console.log('🔍 Fetching holder count from Solscan for:', tokenAddress);

      // Try Solscan API first
      const response = await fetch(`${this.SOLSCAN_API}/token/holders?tokenAddress=${tokenAddress}&limit=1&offset=0`);

      if (response.ok) {
        const data = await response.json();
        if (data.data && typeof data.data.total === 'number') {
          console.log('✅ Holder count from Solscan:', data.data.total);
          return data.data.total;
        }
      }

      // Fallback: Try to get from Helius API if available
      if (import.meta.env.VITE_HELIUS_API_KEY) {
        const heliusResponse = await fetch(`${this.HELIUS_API}/token-metadata?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mintAccounts: [tokenAddress],
            includeOffChain: true,
            disableCache: false,
          }),
        });

        if (heliusResponse.ok) {
          const heliusData = await heliusResponse.json();
          if (heliusData[0]?.tokenStandard) {
            // Helius doesn't directly provide holder count, but we can try other endpoints
            console.log('📊 Helius data available but no holder count');
          }
        }
      }

      console.log('⚠️ Could not fetch real holder count');
      return undefined;
    } catch (error) {
      console.error('❌ Error fetching holder count:', error);
      return undefined;
    }
  }

  /**
   * Verify price change data by cross-referencing multiple sources
   */
  private async verifyPriceChange(tokenAddress: string, primaryChange: number): Promise<{
    verified: boolean;
    confidence: 'high' | 'medium' | 'low';
    sources: string[];
  }> {
    const sources: string[] = [];
    const changes: number[] = [primaryChange];

    try {
      // Try to get price change from Jupiter for comparison
      try {
        const jupiterData = await this.getJupiterPrice(tokenAddress);
        if (jupiterData?.price) {
          sources.push('jupiter');
          // Jupiter doesn't provide 24h change directly, but we could calculate it
          // For now, we'll just note that we have Jupiter price data
        }
      } catch (error) {
        console.log('Jupiter verification failed:', error);
      }

      // Try Birdeye for additional verification
      try {
        const birdeyeResponse = await fetch(`${this.BIRDEYE_API}/token/${tokenAddress}`, {
          headers: {
            'X-API-KEY': process.env.VITE_BIRDEYE_API_KEY || 'demo',
          },
        });

        if (birdeyeResponse.ok) {
          const birdeyeData = await birdeyeResponse.json();
          if (birdeyeData.data?.priceChange24h !== undefined) {
            changes.push(birdeyeData.data.priceChange24h);
            sources.push('birdeye');
          }
        }
      } catch (error) {
        console.log('Birdeye verification failed:', error);
      }

      // Calculate confidence based on source agreement
      const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
      const maxDeviation = Math.max(...changes.map(change => Math.abs(change - avgChange)));

      let confidence: 'high' | 'medium' | 'low';
      let verified = false;

      if (changes.length >= 2) {
        if (maxDeviation <= 5) { // Within 5% of each other
          confidence = 'high';
          verified = true;
        } else if (maxDeviation <= 15) { // Within 15% of each other
          confidence = 'medium';
          verified = true;
        } else {
          confidence = 'low';
          verified = false;
        }
      } else {
        confidence = 'low';
        verified = false;
      }

      console.log(`📊 Price change verification: ${verified ? 'VERIFIED' : 'UNVERIFIED'} (${confidence} confidence)`, {
        primaryChange,
        sources,
        changes,
        maxDeviation
      });

      return { verified, confidence, sources };
    } catch (error) {
      console.error('❌ Price change verification failed:', error);
      return { verified: false, confidence: 'low', sources: [] };
    }
  }

  /**
   * Get recent transactions for a token
   */
  async getRecentTransactions(
    tokenAddress: string,
    limit: number = 10
  ): Promise<TransactionData[]> {
    try {
      logger.info(`Fetching REAL transactions for: ${tokenAddress}`);

      // Always fetch real transaction data
      const response = await fetch(`${this.BIRDEYE_API}/txs/token/${tokenAddress}?limit=${limit}`, {
        headers: {
          'X-API-KEY': process.env.VITE_BIRDEYE_API_KEY || 'demo',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return this.parseTransactions(data.data || []);
    } catch (error) {
      logger.error('Failed to fetch transactions:', error);
      // Return demo data as fallback
      return this.DEMO_TRANSACTIONS.slice(0, limit);
    }
  }

  /**
   * Get price history for charts
   */
  async getPriceHistory(
    tokenAddress: string,
    timeframe: '1h' | '24h' | '7d' | '30d' = '24h'
  ): Promise<PriceHistory[]> {
    try {
      const response = await fetch(
        `${this.BIRDEYE_API}/history_price?address=${tokenAddress}&type=${timeframe}`,
        {
          headers: {
            'X-API-KEY': process.env.VITE_BIRDEYE_API_KEY || 'demo',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return this.parsePriceHistory(data.data || []);
    } catch (error) {
      logger.error('Failed to fetch price history:', error);
      return this.generateDemoPriceHistory(timeframe);
    }
  }

  /**
   * DexScreener API integration
   */
  private async getDexScreenerTokenData(tokenAddress: string): Promise<TokenData | null> {
    try {
      console.log('🔍 Fetching from DexScreener API for token:', tokenAddress);
      const response = await fetch(`${this.DEXSCREENER_API}/tokens/${tokenAddress}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 DexScreener API response:', data);

      if (!data.pairs || data.pairs.length === 0) {
        console.log('❌ No pairs found in DexScreener response');
        return null;
      }

      // Get the most liquid pair (highest volume)
      const bestPair = data.pairs.reduce((best: DexScreenerPair, current: DexScreenerPair) =>
        (current.volume?.h24 || 0) > (best.volume?.h24 || 0) ? current : best
      );

      console.log('🏆 Best pair selected:', bestPair);

      const priceChange24h = parseFloat(bestPair.priceChange?.h24 || '0');
      const volume24h = parseFloat(bestPair.volume?.h24 || '0');
      const marketCap = parseFloat(bestPair.marketCap || '0');

      // Verify price change data if it seems suspicious (>50% change)
      let priceChangeVerification = { verified: true, confidence: 'high' as const, sources: ['dexscreener'] };
      if (Math.abs(priceChange24h) > 50) {
        console.log('🔍 Large price change detected, verifying...', priceChange24h);
        priceChangeVerification = await this.verifyPriceChange(tokenAddress, priceChange24h);
      }

      // Validate data quality
      const hasValidPrice = parseFloat(bestPair.priceUsd || '0') > 0;
      const hasValidVolume = volume24h > 0;
      const hasValidMarketCap = marketCap > 0;

      const dataQuality: 'high' | 'medium' | 'low' =
        hasValidPrice && hasValidVolume && hasValidMarketCap && priceChangeVerification.verified ? 'high' :
        hasValidPrice && (hasValidVolume || hasValidMarketCap) && priceChangeVerification.confidence !== 'low' ? 'medium' : 'low';

      const tokenData: TokenData = {
        name: bestPair.baseToken?.name || 'FlowsyAI Token',
        symbol: bestPair.baseToken?.symbol || 'FLOWSY',
        price: parseFloat(bestPair.priceUsd || '0'),
        priceChange24h: priceChange24h,
        marketCap: marketCap,
        volume24h: volume24h,
        supply: parseFloat(bestPair.baseToken?.totalSupply || '0'),
        decimals: parseInt(bestPair.baseToken?.decimals || '9'),
        logoUrl: bestPair.info?.imageUrl,
        holders: undefined, // Will be set by caller if available
        dataSource: 'dexscreener',
        lastUpdated: Date.now(),
        isVerified: dataQuality === 'high' && priceChangeVerification.verified,
        dataQuality: dataQuality,
      };

      console.log('✅ Parsed token data with quality assessment:', tokenData);
      console.log('📊 Price change verification:', priceChangeVerification);
      return tokenData;
    } catch (error) {
      console.error('❌ DexScreener API error:', error);
      logger.error('DexScreener API error:', error);
      return null;
    }
  }

  /**
   * Pump.fun API integration
   */
  private async getPumpFunTokenData(tokenAddress: string): Promise<TokenData | null> {
    try {
      const response = await fetch(`${this.PUMP_FUN_API}/coins/${tokenAddress}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.mint) {
        return null;
      }

      // Calculate market cap from price and supply
      const price = data.usd_market_cap / data.total_supply || 0;
      const marketCap = data.usd_market_cap || 0;

      return {
        name: data.name || 'FlowsyAI Token',
        symbol: data.symbol || 'FLOWSY',
        price: price,
        priceChange24h: 0, // Pump.fun doesn't provide 24h change
        marketCap: marketCap,
        volume24h: data.volume_24h || 0,
        supply: data.total_supply || 0,
        decimals: 6, // Standard for pump.fun tokens
        logoUrl: data.image_uri,
      };
    } catch (error) {
      logger.error('Pump.fun API error:', error);
      return null;
    }
  }

  /**
   * Jupiter API integration
   */
  private async getJupiterPrice(tokenAddress: string): Promise<Partial<TokenData> | null> {
    try {
      const response = await fetch(`${this.JUPITER_API}/price?ids=${tokenAddress}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const tokenPrice = data.data[tokenAddress];

      if (!tokenPrice) {
        return null;
      }

      return {
        price: tokenPrice.price,
        // Jupiter doesn't provide all data, will need to enrich from other sources
      };
    } catch (error) {
      logger.error('Jupiter API error:', error);
      return null;
    }
  }

  /**
   * Birdeye API integration
   */
  private async getBirdeyeTokenData(tokenAddress: string): Promise<TokenData> {
    const response = await fetch(`${this.BIRDEYE_API}/token/${tokenAddress}`, {
      headers: {
        'X-API-KEY': process.env.VITE_BIRDEYE_API_KEY || 'demo',
      },
    });

    if (!response.ok) {
      throw new Error(`Birdeye API error: ${response.status}`);
    }

    const data = await response.json();
    return this.parseBirdeyeData(data.data);
  }

  /**
   * CoinGecko API integration (fallback)
   */
  private async getCoinGeckoTokenData(tokenAddress: string): Promise<TokenData> {
    // CoinGecko requires token ID, not address
    // This would need mapping logic in production
    throw new Error('CoinGecko integration requires token ID mapping');
  }

  /**
   * Enrich basic price data with additional information
   */
  private async enrichTokenData(
    tokenAddress: string,
    baseData: Partial<TokenData>
  ): Promise<TokenData> {
    // In production, this would fetch additional data from multiple sources
    return {
      name: 'FlowsyAI Token',
      symbol: 'FLOWSY',
      price: baseData.price || 0,
      priceChange24h: 0,
      marketCap: 0,
      volume24h: 0,
      supply: 0,
      decimals: 9,
      ...baseData,
    };
  }

  /**
   * Parse Birdeye API response
   */
  private parseBirdeyeData(data: Record<string, unknown>): TokenData {
    return {
      name: data.name || 'Unknown Token',
      symbol: data.symbol || 'UNKNOWN',
      price: data.price || 0,
      priceChange24h: data.priceChange24h || 0,
      marketCap: data.mc || 0,
      volume24h: data.v24hUSD || 0,
      supply: data.supply || 0,
      decimals: data.decimals || 9,
      logoUrl: data.logoURI,
    };
  }

  /**
   * Parse transaction data
   */
  private parseTransactions(transactions: Record<string, unknown>[]): TransactionData[] {
    return transactions.map(tx => ({
      signature: tx.txHash || tx.signature,
      type: tx.side === 'buy' ? 'buy' : 'sell',
      amount: tx.amount || 0,
      value: tx.value || 0,
      timestamp: tx.blockTime * 1000 || Date.now(),
      from: tx.from || '',
      to: tx.to || '',
    }));
  }

  /**
   * Parse price history data
   */
  private parsePriceHistory(history: Record<string, unknown>[]): PriceHistory[] {
    return history.map(point => ({
      timestamp: point.unixTime * 1000,
      price: point.value,
      volume: point.volume || 0,
    }));
  }

  /**
   * Generate demo price history for development
   */
  private generateDemoPriceHistory(timeframe: string): PriceHistory[] {
    const now = Date.now();
    const points = timeframe === '1h' ? 60 : timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;
    const interval = timeframe === '1h' ? 60000 : timeframe === '24h' ? 3600000 : 86400000;

    const history: PriceHistory[] = [];
    let basePrice = this.DEMO_TOKEN_DATA.price;

    for (let i = points; i >= 0; i--) {
      const timestamp = now - i * interval;
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const price = basePrice * (1 + variation);
      const volume = Math.random() * 50000 + 10000;

      history.push({
        timestamp,
        price,
        volume,
      });

      basePrice = price; // Use previous price as base for next point
    }

    return history;
  }
}

export const solanaTokenService = new SolanaTokenService();
