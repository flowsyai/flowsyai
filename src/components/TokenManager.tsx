import React, { useState, useEffect, useCallback } from 'react';
import {
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
  Coins,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  BarChart3,
  Clock,
  Zap,
  ShoppingCart,
  Gift,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { TokenService } from '@/services/tokenService';
import { toast } from 'sonner';

interface TokenManagerProps {
  showPurchaseOptions?: boolean;
  compact?: boolean;
}

const TokenManager: React.FC<TokenManagerProps> = ({
  showPurchaseOptions = true,
  compact = false,
}) => {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalUsed: 0,
    totalPurchased: 0,
    dailyUsage: [],
    topCategories: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadTokenData = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const [balance, transactionHistory, usageAnalytics] = await Promise.all([
        TokenService.getUserTokenBalance(user.id),
        TokenService.getTokenTransactions(user.id, 10),
        TokenService.getTokenUsageAnalytics(user.id, 7),
      ]);

      setTokenBalance(balance);
      setTransactions(transactionHistory);
      setAnalytics(usageAnalytics);
    } catch (error) {
      console.error('Error loading token data:', error);
      toast.error('Failed to load token information');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadTokenData();
    }
  }, [user, loadTokenData]);

  const handlePurchaseTokens = async (amount: number) => {
    if (!user) return;

    try {
      const success = await TokenService.addTokens(
        user.id,
        amount,
        'purchase',
        `Token purchase: ${amount} tokens`
      );

      if (success) {
        toast.success(`Successfully purchased ${amount} tokens!`);
        loadTokenData(); // Refresh data
      } else {
        toast.error('Failed to purchase tokens');
      }
    } catch (error) {
      console.error('Token purchase error:', error);
      toast.error('Token purchase failed');
    }
  };

  const tokenPackages = [
    { amount: 1000, price: 9.99, popular: false },
    { amount: 5000, price: 39.99, popular: true },
    { amount: 10000, price: 69.99, popular: false },
    { amount: 25000, price: 149.99, popular: false },
  ];

  if (compact) {
    return (
      <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/10 rounded-lg">
              <Coins className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Token Balance</p>
              <p className="text-lg font-bold text-foreground">
                {isLoading ? '...' : tokenBalance.toLocaleString()}
              </p>
            </div>
          </div>
          {showPurchaseOptions && (
            <Button
              size="sm"
              onClick={() => handlePurchaseTokens(1000)}
              className="bg-gradient-to-r from-gold to-gold-light text-background"
            >
              <Plus className="w-4 h-4 mr-1" />
              Buy More
            </Button>
          )}
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Token Balance Overview */}
      <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">Token Balance</h3>
          <Badge className="bg-gradient-to-r from-gold to-gold-light text-background">
            <Coins className="w-4 h-4 mr-1" />
            Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">
              {isLoading ? '...' : tokenBalance.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Available Tokens</p>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">
              {isLoading ? '...' : analytics.totalPurchased.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Purchased</p>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 mb-2">
              {isLoading ? '...' : analytics.totalUsed.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Used</p>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Usage this week</span>
            <span className="text-foreground">
              {analytics.totalUsed} / {analytics.totalPurchased}
            </span>
          </div>
          <Progress
            value={
              analytics.totalPurchased > 0
                ? (analytics.totalUsed / analytics.totalPurchased) * 100
                : 0
            }
            className="h-2"
          />
        </div>
      </GlassCard>

      {/* Token Purchase Options */}
      {showPurchaseOptions && (
        <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Purchase Tokens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tokenPackages.map((pkg, index) => (
              <MotionDiv
                key={pkg.amount}
                whileHover={{ y: -2 }}
                className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                  pkg.popular
                    ? 'border-gold bg-gold/5'
                    : 'border-border-alt bg-background/50 hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gold to-gold-light text-background">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {pkg.amount.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Tokens</p>
                  <div className="text-lg font-semibold text-primary mb-4">${pkg.price}</div>
                  <Button
                    size="sm"
                    onClick={() => handlePurchaseTokens(pkg.amount)}
                    className={
                      pkg.popular
                        ? 'w-full bg-gradient-to-r from-gold to-gold-light text-background'
                        : 'w-full'
                    }
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              </MotionDiv>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Recent Transactions */}
      <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          ) : (
            transactions.map(
              (transaction: {
                id: string;
                amount: number;
                description: string;
                created_at: string;
              }) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.amount > 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <Plus className="h-4 w-4 text-green-500" />
                      ) : (
                        <Minus className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-bold ${
                      transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default TokenManager;
