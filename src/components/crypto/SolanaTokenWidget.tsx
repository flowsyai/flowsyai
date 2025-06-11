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
} from '@/lib/motion-wrapper';

import {
  TrendingUp,
  TrendingDown,
  ExternalLink,
  RefreshCw,
  DollarSign,
  Activity,
  BarChart3,
  Coins,
  AlertCircle,
  Loader2,
  Heart,
  Share2,
  Eye,
  Users,
  Droplets,
  Sparkles,
  Zap,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { solanaTokenService, TokenData, TransactionData } from '@/services/solanaTokenService';
import { formatCurrency, formatPercentage, formatLargeNumber } from '@/utils/formatters';
import { FLOWSY_TOKEN_CONFIG } from '@/config/tokenConfig';

interface SolanaTokenWidgetProps {
  tokenAddress?: string;
  className?: string;
  showTransactions?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const SolanaTokenWidget: React.FC<SolanaTokenWidgetProps> = ({
  tokenAddress = FLOWSY_TOKEN_CONFIG.contractAddress, // Use real token address
  className = '',
  showTransactions = true,
  autoRefresh = true,
  refreshInterval = FLOWSY_TOKEN_CONFIG.refreshInterval, // Use config refresh interval
}) => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [priceChangeAnimation, setPriceChangeAnimation] = useState<'up' | 'down' | null>(null);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 1000) + 500);

  const logoControls = useAnimation();
  const priceRef = useRef<HTMLSpanElement>(null);

  const fetchTokenData = useCallback(async () => {
    try {
      setError(null);
      const data = await solanaTokenService.getTokenData(tokenAddress);

      // Handle price change animation
      if (tokenData && data.price !== tokenData.price) {
        setPreviousPrice(tokenData.price);
        setPriceChangeAnimation(data.price > tokenData.price ? 'up' : 'down');

        // Trigger logo animation on price change
        logoControls.start({
          scale: [1, 1.2, 1],
          rotate: [0, 180],
          transition: { duration: 0.6, ease: 'easeInOut' },
        });

        // Clear animation after delay
        setTimeout(() => setPriceChangeAnimation(null), 1500);
      }

      setTokenData(data);

      // Update price history for charts
      setPriceHistory(prev => {
        const newHistory = [...prev, data.price].slice(-30); // Keep last 30 points
        return newHistory;
      });

      if (showTransactions) {
        const txData = await solanaTokenService.getRecentTransactions(tokenAddress, 5);
        setTransactions(txData);
      }

      // Simulate view count increase
      setViewCount(prev => prev + Math.floor(Math.random() * 3));

      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token data');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, tokenData, showTransactions, logoControls]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchTokenData();
  };

  const handleTradeClick = () => {
    // Open trading platform - will be configured with actual DEX links
    window.open(
      `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${tokenAddress}`,
      '_blank'
    );
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    localStorage.setItem(`favorite_${tokenAddress}`, (!isFavorited).toString());
  };

  const handleShare = async () => {
    const shareData = {
      title: `${tokenData?.name || 'FlowsyAI Token'} (${tokenData?.symbol || 'FLOWSY'})`,
      text: `Check out this token - Current price: ${formatCurrency(tokenData?.price || 0)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    }
  };

  const handleQuickBuy = () => {
    if (buyAmount && parseFloat(buyAmount) > 0) {
      const amount = parseFloat(buyAmount);
      const url = `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${tokenAddress}&amount=${amount}`;
      window.open(url, '_blank');
      setShowQuickBuy(false);
      setBuyAmount('');
    }
  };

  useEffect(() => {
    fetchTokenData();

    // Load favorite status from localStorage
    const savedFavorite = localStorage.getItem(`favorite_${tokenAddress}`);
    if (savedFavorite) {
      setIsFavorited(savedFavorite === 'true');
    }
  }, [tokenAddress, fetchTokenData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchTokenData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, tokenAddress, fetchTokenData]);

  if (error) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`premium-card p-6 rounded-2xl border border-red-500/30 bg-red-500/5 ${className}`}
      >
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Failed to load token data</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="ml-auto text-red-400 hover:text-red-300"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`premium-card premium-border premium-shadow bg-card/80 backdrop-blur-lg rounded-2xl overflow-hidden relative ${className}`}
    >
      {/* Enhanced Header */}
      <div className="p-6 pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Enhanced Token Logo */}
            <MotionDiv
              animate={logoControls}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center relative overflow-hidden cursor-pointer"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Rotating Ring */}
              <MotionDiv
                className="absolute inset-0 rounded-full border border-gold/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulsing Glow */}
              <MotionDiv
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gold/20 blur-lg rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <Coins className="w-6 h-6 text-white relative z-10" />

              {/* Sparkles */}
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

            {/* Token Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-foreground">
                  {tokenData?.name || 'FlowsyAI Token'}
                </h3>
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                  {tokenData?.symbol || 'FLOWSY'}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="w-3 h-3" />
                  <span>{viewCount} views</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 500) + 200} watching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <MotionButton
              onClick={handleFavoriteToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
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
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            >
              <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </MotionButton>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading token data...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Price and Market Data */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Current Price */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Price</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(tokenData?.price || 0)}
                </p>
              </div>

              {/* 24h Change */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">24h Change</p>
                <div className="flex items-center gap-1">
                  {(tokenData?.priceChange24h || 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      (tokenData?.priceChange24h || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(tokenData?.priceChange24h || 0)}
                  </span>
                </div>
              </div>

              {/* Market Cap */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Market Cap</p>
                <p className="text-sm font-semibold text-foreground">
                  {formatLargeNumber(tokenData?.marketCap || 0)}
                </p>
              </div>

              {/* Volume */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">24h Volume</p>
                <p className="text-sm font-semibold text-foreground">
                  {formatLargeNumber(tokenData?.volume24h || 0)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleTradeClick}
                className="flex-1 bg-gradient-to-r from-primary to-gold text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Trade Now
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(`https://solscan.io/token/${tokenAddress}`, '_blank')}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Chart
              </Button>
            </div>

            {/* Recent Transactions */}
            {showTransactions && transactions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Recent Activity</h4>
                </div>

                <div className="space-y-2">
                  <SafeAnimatePresence>
                    {transactions.slice(0, 3).map((tx, index) => (
                      <MotionDiv
                        key={tx.signature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() =>
                          window.open(`https://solscan.io/tx/${tx.signature}`, '_blank')
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              tx.type === 'buy' ? 'bg-emerald-400' : 'bg-red-400'
                            }`}
                          />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {tx.type === 'buy' ? 'Buy' : 'Sell'}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {formatLargeNumber(tx.amount)} {tokenData?.symbol || 'FLOWSY'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleTimeString()}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {formatCurrency(tx.value)}
                          </p>
                        </div>
                      </MotionDiv>
                    ))}
                  </SafeAnimatePresence>
                </div>
              </div>
            )}

            {/* Last Updated */}
            {lastUpdated && (
              <p className="text-xs text-muted-foreground text-center">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default SolanaTokenWidget;
