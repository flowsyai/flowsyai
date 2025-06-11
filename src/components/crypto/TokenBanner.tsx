import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAnimatePresence,
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionSpan,
} from '@/lib/motion-wrapper';

import {
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Coins,
  DollarSign,
  BarChart3,
  Sparkles,
  ArrowRight,
  Users,
  Droplets,
  Info,
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  ChevronDown,
  ChevronUp,
  Zap,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { solanaTokenService, TokenData } from '@/services/solanaTokenService';
import { formatCurrency, formatPercentage, formatLargeNumber } from '@/utils/formatters';
import { getTokenConfig, getTradingLinks } from '@/config/tokenConfig';

interface TokenBannerProps {
  tokenAddress?: string;
  className?: string;
  compact?: boolean;
}

const TokenBanner: React.FC<TokenBannerProps> = ({
  tokenAddress,
  className = '',
  compact = false,
}) => {
  const tokenConfig = getTokenConfig();
  const tradingLinks = getTradingLinks();
  const actualTokenAddress = tokenAddress || tokenConfig.contractAddress;

  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [priceChangeAnimation, setPriceChangeAnimation] = useState<'up' | 'down' | null>(null);

  const logoControls = useAnimation();
  const priceRef = useRef<HTMLSpanElement>(null);

  const fetchTokenData = useCallback(async () => {
    try {
      setError(null);
      const data = await solanaTokenService.getTokenData(actualTokenAddress);

      // Handle price change animation
      if (tokenData && data.price !== tokenData.price) {
        setPreviousPrice(tokenData.price);
        setPriceChangeAnimation(data.price > tokenData.price ? 'up' : 'down');

        // Trigger logo animation on price change
        logoControls.start({
          scale: [1, 1.1, 1],
          rotate: [0, 360],
          transition: { duration: 0.8, ease: 'easeInOut' },
        });

        // Clear animation after delay
        setTimeout(() => setPriceChangeAnimation(null), 1000);
      }

      setTokenData(data);

      // Update price history for mini chart
      setPriceHistory(prev => {
        const newHistory = [...prev, data.price].slice(-20); // Keep last 20 points
        return newHistory;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token data');
    } finally {
      setIsLoading(false);
    }
  }, [actualTokenAddress, tokenData, logoControls]);

  const handleTradeClick = () => {
    window.open(tradingLinks.raydium, '_blank');
  };

  const handleChartClick = () => {
    window.open(tradingLinks.dexScreener, '_blank');
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    // In a real app, this would save to localStorage or user preferences
    localStorage.setItem(`favorite_${actualTokenAddress}`, (!isFavorited).toString());
  };

  const handleShare = async () => {
    const shareData = {
      title: `${tokenConfig.name} (${tokenConfig.symbol})`,
      text: `Check out ${tokenConfig.name} - Current price: ${formatCurrency(tokenData?.price || 0)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    }
  };

  const handleQuickBuy = () => {
    if (buyAmount && parseFloat(buyAmount) > 0) {
      const amount = parseFloat(buyAmount);
      const url = `${tradingLinks.raydium}&amount=${amount}`;
      window.open(url, '_blank');
      setShowQuickBuy(false);
      setBuyAmount('');
    }
  };

  const generateMockData = () => ({
    totalSupply: 100000000,
    holders: tokenData?.holders, // Only use real holder data if available
    liquidity: 2850000, // This could be fetched from DEX APIs in the future
    volume24h: tokenData?.volume24h || 125000,
    marketCap: tokenData?.marketCap || 2450000,
  });

  useEffect(() => {
    fetchTokenData();

    // Load favorite status from localStorage
    const savedFavorite = localStorage.getItem(`favorite_${actualTokenAddress}`);
    if (savedFavorite) {
      setIsFavorited(savedFavorite === 'true');
    }

    // Auto-refresh based on config
    if (tokenConfig.autoRefresh) {
      const interval = setInterval(fetchTokenData, tokenConfig.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [actualTokenAddress, tokenConfig.autoRefresh, tokenConfig.refreshInterval, fetchTokenData]);

  // Mini Chart Component
  const MiniChart: React.FC<{ data: number[]; className?: string }> = ({
    data,
    className = '',
  }) => {
    if (data.length < 2) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(' ');

    const isPositive = data[data.length - 1] > data[0];

    return (
      <div className={`relative ${className}`}>
        <svg width="100%" height="40" viewBox="0 0 100 100" className="overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            points={points}
            fill="none"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          <polygon points={`0,100 ${points} 100,100`} fill="url(#chartGradient)" />
        </svg>
      </div>
    );
  };

  if (error || isLoading) {
    return null; // Don't show banner if there's an error or still loading
  }

  if (compact) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`premium-card premium-border bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-lg border border-emerald-500/30 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 group ${className}`}
      >
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            {/* Token Info */}
            <div className="flex items-center gap-3">
              <MotionDiv
                animate={logoControls}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Coins className="w-4 h-4 text-white" />
                {isHovered && (
                  <MotionDiv
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-3 h-3 text-gold animate-pulse" />
                  </MotionDiv>
                )}
              </MotionDiv>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {tokenData?.symbol || tokenConfig.symbol}
                  </span>
                  <MotionSpan
                    ref={priceRef}
                    className={`text-xs text-muted-foreground transition-colors duration-300 ${
                      priceChangeAnimation === 'up'
                        ? 'text-emerald-400'
                        : priceChangeAnimation === 'down'
                          ? 'text-red-400'
                          : ''
                    }`}
                    animate={
                      priceChangeAnimation
                        ? {
                            scale: [1, 1.1, 1],
                            backgroundColor:
                              priceChangeAnimation === 'up'
                                ? ['transparent', 'rgba(34, 197, 94, 0.2)', 'transparent']
                                : ['transparent', 'rgba(239, 68, 68, 0.2)', 'transparent'],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {formatCurrency(tokenData?.price || 0)}
                  </MotionSpan>
                </div>
                <div className="flex items-center gap-1">
                  {(tokenData?.priceChange24h || 0) >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      (tokenData?.priceChange24h || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(tokenData?.priceChange24h || 0)}
                  </span>
                  {priceHistory.length > 1 && (
                    <MiniChart data={priceHistory} className="w-8 h-4 ml-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <MotionButton
                onClick={handleFavoriteToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Heart
                  className={`w-3 h-3 transition-colors ${
                    isFavorited ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
                  }`}
                />
              </MotionButton>

              <Button
                onClick={handleTradeClick}
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
              >
                <DollarSign className="w-3 h-3 mr-1" />
                Trade
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </MotionDiv>
    );
  }

  const mockData = generateMockData();

  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`premium-card premium-border premium-shadow bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-lg rounded-2xl overflow-hidden relative ${className}`}
    >
      {/* Animated Background */}
      <MotionDiv
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-gold/5 to-primary/5"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <MotionDiv
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? 'w-2 h-2 bg-gold/40'
                : i % 3 === 1
                  ? 'w-1 h-1 bg-primary/30'
                  : 'w-1.5 h-1.5 bg-emerald-400/20'
            }`}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Token Info */}
          <div className="flex items-center gap-4">
            {/* Enhanced Animated Token Logo */}
            <MotionDiv
              animate={logoControls}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center relative overflow-hidden group cursor-pointer"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {/* Rotating Background Ring */}
              <MotionDiv
                className="absolute inset-0 rounded-full border-2 border-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulsing Glow Effect */}
              <MotionDiv
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gold/20 blur-lg rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Main Icon */}
              <MotionDiv
                className="relative z-10"
                animate={
                  isHovered
                    ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <Coins className="w-8 h-8 text-white" />
              </MotionDiv>

              {/* Multiple Sparkle Effects */}
              {[...Array(3)].map((_, i) => (
                <MotionDiv
                  key={i}
                  className={`absolute ${
                    i === 0 ? 'top-1 right-1' : i === 1 ? 'bottom-1 left-1' : 'top-1 left-1'
                  }`}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-gold" />
                </MotionDiv>
              ))}

              {/* Hover Indicator */}
              <SafeAnimatePresence>
                {isHovered && (
                  <MotionDiv
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      Click for details
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>
            </MotionDiv>

            {/* Enhanced Token Details */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  {tokenData?.name || tokenConfig.name}
                </h3>
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                  {tokenData?.symbol || tokenConfig.symbol}
                </span>

                {/* Interactive Badges */}
                <div className="flex items-center gap-2">
                  <MotionButton
                    onClick={handleFavoriteToggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorited ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
                      }`}
                    />
                  </MotionButton>

                  <MotionButton
                    onClick={handleShare}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </MotionButton>

                  <MotionButton
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </MotionButton>
                </div>
              </div>

              {/* Price Section with Animation */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MotionSpan
                    ref={priceRef}
                    className={`text-2xl font-bold text-foreground transition-colors duration-300 ${
                      priceChangeAnimation === 'up'
                        ? 'text-emerald-400'
                        : priceChangeAnimation === 'down'
                          ? 'text-red-400'
                          : ''
                    }`}
                    animate={
                      priceChangeAnimation
                        ? {
                            scale: [1, 1.1, 1],
                            backgroundColor:
                              priceChangeAnimation === 'up'
                                ? ['transparent', 'rgba(34, 197, 94, 0.2)', 'transparent']
                                : ['transparent', 'rgba(239, 68, 68, 0.2)', 'transparent'],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {formatCurrency(tokenData?.price || 0)}
                  </MotionSpan>

                  <div className="flex items-center gap-1">
                    <MotionDiv
                      animate={priceChangeAnimation ? { rotate: [0, 10, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {(tokenData?.priceChange24h || 0) >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                    </MotionDiv>
                    <span
                      className={`text-sm font-semibold ${
                        (tokenData?.priceChange24h || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {formatPercentage(tokenData?.priceChange24h || 0)}
                    </span>
                  </div>
                </div>

                {/* Mini Chart */}
                {priceHistory.length > 1 && <MiniChart data={priceHistory} className="w-20 h-8" />}
              </div>

              {/* Market Stats with Progress Bars */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="text-foreground font-medium">
                      {formatLargeNumber(tokenData?.marketCap || 0)}
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-1">
                    <MotionDiv
                      className="bg-gradient-to-r from-primary to-gold h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((mockData.marketCap / 10000000) * 100, 100)}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="text-foreground font-medium">
                      {formatLargeNumber(tokenData?.volume24h || 0)}
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-1">
                    <MotionDiv
                      className="bg-gradient-to-r from-emerald-400 to-blue-400 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((mockData.volume24h / 1000000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Enhanced Actions */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleChartClick}
                className="border-primary/30 text-primary hover:bg-primary/10 group"
              >
                <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Chart
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>

              <Button
                onClick={() => setShowQuickBuy(!showQuickBuy)}
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 group"
              >
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Quick Buy
              </Button>

              <Button
                onClick={handleTradeClick}
                className="bg-gradient-to-r from-primary to-gold text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Trade Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Quick Buy Interface */}
            <SafeAnimatePresence>
              {showQuickBuy && (
                <MotionDiv
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg p-3 min-w-[200px]"
                >
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Quick Buy Amount (SOL)</div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={buyAmount}
                        onChange={e => setBuyAmount(e.target.value)}
                        placeholder="0.1"
                        className="flex-1 px-2 py-1 bg-background/50 border border-border rounded text-sm"
                        step="0.1"
                        min="0"
                      />
                      <Button
                        onClick={handleQuickBuy}
                        size="sm"
                        disabled={!buyAmount || parseFloat(buyAmount) <= 0}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        <Zap className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      {['0.1', '0.5', '1.0'].map(amount => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setBuyAmount(amount)}
                          className="px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors"
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                  </div>
                </MotionDiv>
              )}
            </SafeAnimatePresence>
          </div>
        </div>

        {/* Expandable Details Section */}
        <SafeAnimatePresence>
          {isExpanded && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4 border-t border-border/50 pt-4"
            >
              {/* Additional Token Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockData.holders !== undefined && (
                  <MotionDiv
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card/50 rounded-lg p-3 border border-border/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Holders</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" title="Real data"></div>
                    </div>
                    <div className="text-lg font-bold">{mockData.holders.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Active wallets</div>
                  </MotionDiv>
                )}

                <MotionDiv
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card/50 rounded-lg p-3 border border-border/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">Liquidity</span>
                  </div>
                  <div className="text-lg font-bold">{formatLargeNumber(mockData.liquidity)}</div>
                  <div className="text-xs text-muted-foreground">Total locked</div>
                </MotionDiv>

                <MotionDiv
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card/50 rounded-lg p-3 border border-border/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium">Total Supply</span>
                  </div>
                  <div className="text-lg font-bold">{formatLargeNumber(mockData.totalSupply)}</div>
                  <div className="text-xs text-muted-foreground">Max tokens</div>
                </MotionDiv>
              </div>

              {/* Social Actions */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-gold/5 rounded-lg border border-primary/10"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">Share this token with friends</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleShare}
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Share2 className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=Check out ${tokenConfig.name} (${tokenConfig.symbol}) - ${formatCurrency(tokenData?.price || 0)}&url=${window.location.href}`,
                        '_blank'
                      )
                    }
                    size="sm"
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Tweet
                  </Button>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </SafeAnimatePresence>

        {/* Launch Announcement */}
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-gradient-to-r from-gold/10 to-primary/10 rounded-lg border border-gold/20"
        >
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-foreground font-medium">
              🚀 Token Launch Coming Soon! Join our waitlist for early access and exclusive
              benefits.
            </span>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default TokenBanner;
