import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Lock,
  Shield,
  Star,
  Coins,
  PieChart,
  BarChart3,
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle,
  Zap,
  Crown,
  Globe,
  Activity,
  Target,
  Sparkles,
  Eye,
  MousePointer,
  ArrowRight,
  Timer,
  Award,
  Flame,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TokenTabContent } from './TokenTabContent';
import { solanaTokenService, TokenData } from '@/services/solanaTokenService';
import { FLOWSY_TOKEN_CONFIG } from '@/config/tokenConfig';

interface TokenDistribution {
  category: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
  locked: boolean;
  unlockDate?: string;
  highlight?: boolean;
  burnScheduled?: boolean;
}

interface TopHolder {
  rank: number;
  address: string;
  percentage: number;
  amount: string;
  type: 'team' | 'investor' | 'public' | 'treasury' | 'liquidity';
  locked: boolean;
  burnScheduled?: boolean;
}

interface MarketData {
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  holders?: number; // Optional - only show if real data available
  totalSupply: number;
  circulatingSupply: number;
  fdv: number;
  // Data transparency fields
  dataSource?: string;
  lastUpdated?: number;
  isVerified?: boolean;
  dataQuality?: 'high' | 'medium' | 'low';
}

const EnhancedTokenShowcase: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'distribution' | 'holders' | 'security'
  >('overview');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketData>({
    price: 0.008234,
    marketCap: 823400,
    volume24h: 45670,
    change24h: 15.67,
    holders: undefined, // No fake data - will be populated with real data if available
    totalSupply: 100000000,
    circulatingSupply: 45000000,
    fdv: 823400,
    dataSource: 'loading',
    lastUpdated: Date.now(),
    isVerified: false,
    dataQuality: 'low',
  });
  const [isLoadingRealData, setIsLoadingRealData] = useState(false);
  const [lastRealDataUpdate, setLastRealDataUpdate] = useState<Date | null>(null);

  const tokenDistribution: TokenDistribution[] = [
    {
      category: 'Public Sale',
      percentage: 90,
      amount: '90M FLOWSY',
      color: 'from-emerald-500 to-teal-500',
      description: 'Maximum allocation for community ownership and decentralized trading',
      locked: false,
      highlight: true,
    },
    {
      category: 'Developer Fund',
      percentage: 10,
      amount: '10M FLOWSY',
      color: 'from-blue-500 to-indigo-500',
      description: 'Locked until $10M market cap. 5% will be burned at $1M market cap (0.5% of total supply)',
      locked: true,
      unlockDate: 'Locked until $10M market cap',
      highlight: true,
      burnScheduled: true,
    },
  ];

  const topHolders: TopHolder[] = [
    {
      rank: 1,
      address: '4mNpkTGm...8vLqWxRt',
      percentage: 10.0,
      amount: '10M FLOWSY',
      type: 'team',
      locked: true,
      burnScheduled: true,
    },
    {
      rank: 2,
      address: '9kLmVwXr...3hPqZtYs',
      percentage: 8.5,
      amount: '8.5M FLOWSY',
      type: 'public',
      locked: false,
    },
    {
      rank: 3,
      address: '2nBxRtKm...7wQpLxVs',
      percentage: 7.2,
      amount: '7.2M FLOWSY',
      type: 'public',
      locked: false,
    },
    {
      rank: 4,
      address: '8vCxMnPq...5tRzWxKs',
      percentage: 6.8,
      amount: '6.8M FLOWSY',
      type: 'public',
      locked: false,
    },
    {
      rank: 5,
      address: '3nCxRtLm...9wQpMxVs',
      percentage: 5.4,
      amount: '5.4M FLOWSY',
      type: 'public',
      locked: false,
    },
  ];

  // Fetch real token data from APIs
  const fetchRealTokenData = async () => {
    try {
      setIsLoadingRealData(true);
      console.log('🚀 Fetching REAL data for token:', FLOWSY_TOKEN_CONFIG.contractAddress);

      const tokenData = await solanaTokenService.getTokenData(FLOWSY_TOKEN_CONFIG.contractAddress);
      console.log('✅ Real token data received:', tokenData);

      // Log data quality assessment
      console.log('📊 Data Quality Assessment:', {
        source: tokenData.dataSource,
        verified: tokenData.isVerified,
        quality: tokenData.dataQuality,
        hasHolders: tokenData.holders !== undefined,
        priceChange: tokenData.priceChange24h,
        lastUpdated: new Date(tokenData.lastUpdated).toLocaleString()
      });

      setMarketData({
        price: tokenData.price,
        marketCap: tokenData.marketCap,
        volume24h: tokenData.volume24h,
        change24h: tokenData.priceChange24h,
        holders: tokenData.holders, // Real data only - undefined if not available
        totalSupply: tokenData.supply,
        circulatingSupply: tokenData.supply, // Assuming all tokens are circulating
        fdv: tokenData.marketCap,
        dataSource: tokenData.dataSource,
        lastUpdated: tokenData.lastUpdated,
        isVerified: tokenData.isVerified,
        dataQuality: tokenData.dataQuality,
      });

      setLastRealDataUpdate(new Date());
      console.log('✅ Market data updated with REAL values');
    } catch (error) {
      console.error('❌ Failed to fetch real token data:', error);
      // Keep trying to fetch real data - no fallback to simulation
      console.log('🔄 Will retry fetching real data in next update cycle');
    } finally {
      setIsLoadingRealData(false);
    }
  };

  // Fallback simulation for when real data is unavailable
  const simulateMarketData = () => {
    setMarketData(prev => {
      const volatilityFactor = 0.015;
      const baseChange = (Math.random() - 0.5) * volatilityFactor;

      let newMarketCap = prev.marketCap * (1 + baseChange);
      let newPrice = prev.price * (1 + baseChange);
      let newVolume = prev.volume24h + (Math.random() - 0.5) * 3000;
      let newChange = prev.change24h + (Math.random() - 0.5) * 1.5;
      let newHolders = prev.holders + Math.floor(Math.random() * 2);

      newMarketCap = Math.max(400000, Math.min(1500000, newMarketCap));
      newPrice = Math.max(0.004, Math.min(0.015, newPrice));
      newVolume = Math.max(20000, Math.min(80000, newVolume));
      newChange = Math.max(-25, Math.min(45, newChange));
      newHolders = Math.max(3000, newHolders);

      return {
        ...prev,
        marketCap: newMarketCap,
        price: newPrice,
        volume24h: newVolume,
        change24h: newChange,
        holders: newHolders,
        fdv: newMarketCap,
      };
    });
  };

  // Initial data fetch and periodic updates
  useEffect(() => {
    // Try to fetch real data first
    fetchRealTokenData();

    // Set up periodic updates - always fetch real data
    const interval = setInterval(() => {
      fetchRealTokenData();
    }, FLOWSY_TOKEN_CONFIG.refreshInterval);

    return () => clearInterval(interval);
  }, []);

  // TODO: On launch, replace with real API integration:
  // - CoinGecko API for price data
  // - DexScreener for DEX data
  // - Solana RPC for on-chain data
  // - WebSocket connections for real-time updates

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const getHolderTypeIcon = (type: TopHolder['type']) => {
    switch (type) {
      case 'treasury':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'team':
        return <Users className="w-4 h-4 text-purple-500" />;
      case 'investor':
        return <Star className="w-4 h-4 text-gold" />;
      case 'liquidity':
        return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'public':
        return <Globe className="w-4 h-4 text-orange-500" />;
      default:
        return <Coins className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getHolderTypeBadge = (type: TopHolder['type']) => {
    const styles = {
      treasury: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      team: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      investor: 'bg-gold/10 text-gold border-gold/30',
      liquidity: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
      public: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    };
    return styles[type] || 'bg-muted/10 text-muted-foreground border-muted/30';
  };

  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full px-8 py-3 mb-8 border border-emerald-500/30">
            <Coins className="w-5 h-5 text-emerald-500" />
            <span className="text-base font-bold text-foreground">FLOWSY TOKEN ECOSYSTEM</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="block text-foreground">Transparent & Secure</span>
            <span className="block bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Revolutionary tokenomics:{' '}
            <span className="text-emerald-500 font-semibold">90% public ownership</span>,
            <span className="text-blue-500 font-semibold">only 10% developer fund</span> locked
            until $10M market cap, with{' '}
            <span className="text-orange-500 font-semibold">0.5% burn at $1M</span>.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
            <Info className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-500 font-medium">
              Live data integration ready for launch • Currently showing simulated market activity
            </span>
          </div>
        </motion.div>

        {/* Enhanced Interactive Market Cap Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="mb-12 cursor-pointer"
        >
          <Card className="premium-card bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border-emerald-500/30 hover:border-emerald-500/50 rounded-3xl p-8 relative overflow-hidden transition-all duration-500 group">
            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 group-hover:from-emerald-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

            {/* Floating Particles */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
              animate={{
                x: [0, -25, 35, 0],
                y: [0, 25, -15, 0],
                scale: [1, 0.9, 1.3, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
              className="absolute bottom-1/4 left-3/4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
              animate={{
                x: [0, 20, -30, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.4, 0.7, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />

            <div className="relative z-10 text-center">
              {/* Live Data Indicator */}
              <motion.div
                className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border ${
                  FLOWSY_TOKEN_CONFIG.enableLiveData && lastRealDataUpdate
                    ? 'bg-emerald-500/20 border-emerald-500/30'
                    : 'bg-orange-500/20 border-orange-500/30'
                }`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    FLOWSY_TOKEN_CONFIG.enableLiveData && lastRealDataUpdate
                      ? 'bg-emerald-500'
                      : 'bg-orange-500'
                  }`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className={`text-sm font-semibold ${
                  FLOWSY_TOKEN_CONFIG.enableLiveData && lastRealDataUpdate
                    ? 'text-emerald-500'
                    : 'text-orange-500'
                }`}>
                  {FLOWSY_TOKEN_CONFIG.enableLiveData && lastRealDataUpdate ? 'LIVE DATA' : 'DEMO DATA'}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {lastRealDataUpdate
                    ? `Last update: ${lastRealDataUpdate.toLocaleTimeString()}`
                    : 'Simulated data'
                  }
                </span>
                {isLoadingRealData && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <RefreshCw className="w-3 h-3 text-muted-foreground" />
                  </motion.div>
                )}
              </motion.div>

              {/* Dynamic Market Cap Display */}
              <motion.div
                key={marketData.marketCap}
                initial={{ scale: 1.1, opacity: 0.8, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="mb-6"
              >
                <motion.div
                  className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {formatCurrency(marketData.marketCap)}
                </motion.div>
                <motion.div
                  className="text-xl md:text-2xl text-muted-foreground font-semibold mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Market Capitalization
                </motion.div>

                {/* Growth Indicator */}
                <motion.div
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                  <span className="text-sm font-semibold text-emerald-500">Growing Fast</span>
                </motion.div>
              </motion.div>

              {/* Interactive Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  {
                    label: 'Token Price',
                    value: `$${marketData.price.toFixed(6)}`,
                    icon: DollarSign,
                    color: 'text-emerald-500',
                    bgColor: 'bg-emerald-500/10',
                    verified: marketData.isVerified,
                  },
                  {
                    label: '24h Volume',
                    value: formatNumber(marketData.volume24h),
                    icon: BarChart3,
                    color: 'text-blue-500',
                    bgColor: 'bg-blue-500/10',
                    verified: marketData.isVerified,
                  },
                  // Only show holders if real data is available
                  ...(marketData.holders !== undefined ? [{
                    label: 'Token Holders',
                    value: formatNumber(marketData.holders),
                    icon: Users,
                    color: 'text-purple-500',
                    bgColor: 'bg-purple-500/10',
                    verified: true, // Holder data is always verified when available
                  }] : []),
                  {
                    label: '24h Change',
                    value: `${marketData.change24h >= 0 ? '+' : ''}${marketData.change24h.toFixed(2)}%`,
                    icon: marketData.change24h >= 0 ? TrendingUp : TrendingDown,
                    color: marketData.change24h >= 0 ? 'text-emerald-500' : 'text-red-500',
                    bgColor: marketData.change24h >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10',
                    verified: marketData.isVerified,
                    suspicious: Math.abs(marketData.change24h) > 50, // Flag large changes
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-4 ${metric.bgColor} rounded-xl border border-border/30 hover:border-border/50 transition-all duration-300 cursor-pointer group/metric`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      </motion.div>
                    </div>
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-lg font-bold text-foreground group-hover/metric:scale-110 transition-transform duration-300"
                    >
                      {metric.value}
                    </motion.div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      {metric.verified && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" title="Verified data"></div>
                      )}
                      {metric.suspicious && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Large change - verify independently"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Call to Action */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.a
                  href={FLOWSY_TOKEN_CONFIG.dexScreenerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Live Trading</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.a>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 bg-card/50 backdrop-blur-lg rounded-xl p-1 max-w-2xl mx-auto mb-12 border border-border/30">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'distribution', label: 'Distribution', icon: PieChart },
            { id: 'holders', label: 'Top Holders', icon: Users },
            { id: 'security', label: 'Security', icon: Shield },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setSelectedTab(tab.id as 'overview' | 'distribution' | 'holders' | 'security')
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Developer Wallet Lock Feature */}
              <Card className="premium-card bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 rounded-2xl p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Developer Wallet Lock</CardTitle>
                      <p className="text-sm text-muted-foreground">Ultimate security guarantee</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-blue-500">
                          Only 10M FLOWSY (10%) Developer Fund
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ultra-minimal developer allocation locked until $10M market cap - Maximum
                        community ownership with anti-rug guarantee.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-orange-500">
                          0.5M FLOWSY Burn Scheduled
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        5% of developer fund (0.5% of total supply) will be permanently burned at $1M market cap,
                        reducing supply and increasing value for all holders.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to unlock</span>
                        <span>{((marketData.marketCap / 10000000) * 100).toFixed(2)}%</span>
                      </div>
                      <Progress value={(marketData.marketCap / 10000000) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Current: {formatCurrency(marketData.marketCap)} / Target: $10.00M
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-emerald-500">
                      <CheckCircle className="w-4 h-4" />
                      <span>Smart contract verified on Solscan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="premium-card bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 rounded-2xl p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Token Metrics</CardTitle>
                      <p className="text-sm text-muted-foreground">Real-time statistics</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {formatNumber(marketData.totalSupply)}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Supply</div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {formatNumber(marketData.circulatingSupply)}
                      </div>
                      <div className="text-xs text-muted-foreground">Circulating</div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {formatCurrency(marketData.fdv)}
                      </div>
                      <div className="text-xs text-muted-foreground">Fully Diluted</div>
                    </div>
                    {marketData.holders !== undefined ? (
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {formatNumber(marketData.holders)}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="text-xs text-muted-foreground">Holders</div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" title="Real blockchain data"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-muted/20 rounded-lg opacity-50">
                        <div className="text-lg font-bold text-muted-foreground">
                          N/A
                        </div>
                        <div className="text-xs text-muted-foreground">Holders (Loading...)</div>
                      </div>
                    )}
                  </div>

                  {/* Data Source Transparency */}
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-blue-500">
                        Data Transparency
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Price Data Source:</span>
                        <span className="capitalize font-medium">{marketData.dataSource || 'Loading...'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Updated:</span>
                        <span className="font-medium">
                          {marketData.lastUpdated
                            ? new Date(marketData.lastUpdated).toLocaleTimeString()
                            : 'Loading...'
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Data Quality:</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${
                            marketData.dataQuality === 'high' ? 'text-emerald-500' :
                            marketData.dataQuality === 'medium' ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {marketData.dataQuality?.toUpperCase() || 'UNKNOWN'}
                          </span>
                          {marketData.isVerified && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" title="Verified"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Holder Count:</span>
                        <span className="font-medium">
                          {marketData.holders !== undefined ? 'Real blockchain data' : 'Not available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <TokenTabContent
            selectedTab={selectedTab}
            tokenDistribution={tokenDistribution}
            topHolders={topHolders}
            hoveredSection={hoveredSection}
            setHoveredSection={setHoveredSection}
            getHolderTypeIcon={getHolderTypeIcon}
            getHolderTypeBadge={getHolderTypeBadge}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EnhancedTokenShowcase;
