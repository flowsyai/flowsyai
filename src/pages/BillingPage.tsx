import React, { useState } from 'react';
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
  Crown,
  CreditCard,
  Calendar,
  Download,
  Check,
  Zap,
  Users,
  Shield,
  Headphones,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const BillingPage: React.FC = () => {
  const { user, updateUserPremiumStatus } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const currentPlan = user?.isPremium ? 'premium' : 'free';

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 AI workflows',
        'Basic AI agents',
        '100 executions/month',
        'Community support',
        'Basic templates',
      ],
      limitations: [
        'Limited to 3 workflows',
        'Basic AI models only',
        'No priority support',
        'No advanced features',
      ],
      color: 'muted',
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$29',
      period: 'per month',
      description: 'For power users and professionals',
      features: [
        'Unlimited AI workflows',
        'Advanced AI agents',
        'Unlimited executions',
        'Priority support',
        'Premium templates',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'Team collaboration',
        'White-label options',
      ],
      limitations: [],
      color: 'gold',
      popular: true,
    },
  ];

  const usageStats = {
    workflows: { current: 2, limit: user?.isPremium ? 'Unlimited' : 3 },
    executions: { current: 847, limit: user?.isPremium ? 'Unlimited' : 100 },
    agents: { current: 5, limit: user?.isPremium ? 'Unlimited' : 3 },
    storage: { current: '2.4 GB', limit: user?.isPremium ? '100 GB' : '1 GB' },
  };

  const recentInvoices = [
    {
      id: 'inv_001',
      date: '2024-01-15',
      amount: '$29.00',
      status: 'paid',
      description: 'Premium Plan - January 2024',
    },
    {
      id: 'inv_002',
      date: '2023-12-15',
      amount: '$29.00',
      status: 'paid',
      description: 'Premium Plan - December 2023',
    },
    {
      id: 'inv_003',
      date: '2023-11-15',
      amount: '$29.00',
      status: 'paid',
      description: 'Premium Plan - November 2023',
    },
  ];

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user premium status
      await updateUserPremiumStatus(true);

      toast.success('Successfully upgraded to Premium! Welcome to the premium experience.');
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Failed to upgrade. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-screen-xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-2">
                Billing & <span className="premium-gradient-text">Subscription</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your subscription and billing information
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${user?.isPremium ? 'bg-gradient-to-r from-gold to-gold-light text-background' : 'bg-muted text-muted-foreground'}`}
              >
                {user?.isPremium ? (
                  <>
                    <Crown className="h-3 w-3 mr-1" />
                    Premium Plan
                  </>
                ) : (
                  'Free Plan'
                )}
              </Badge>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Current Usage */}
          <MotionDiv variants={itemVariants}>
            <h2 className="text-xl font-bold text-foreground mb-4">Current Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Workflows</span>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {usageStats.workflows.current}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    of {usageStats.workflows.limit}
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Executions</span>
                    <Zap className="h-4 w-4 text-sapphire" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {usageStats.executions.current}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    of {usageStats.executions.limit} this month
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">AI Agents</span>
                    <Users className="h-4 w-4 text-gold" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {usageStats.agents.current}
                  </div>
                  <div className="text-xs text-muted-foreground">of {usageStats.agents.limit}</div>
                </div>
              </GlassCard>

              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Storage</span>
                    <Shield className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {usageStats.storage.current}
                  </div>
                  <div className="text-xs text-muted-foreground">of {usageStats.storage.limit}</div>
                </div>
              </GlassCard>
            </div>
          </MotionDiv>

          {/* Plans Comparison */}
          {!user?.isPremium && (
            <MotionDiv variants={itemVariants}>
              <h2 className="text-xl font-bold text-foreground mb-4">Upgrade Your Plan</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {plans.map(plan => (
                  <MotionDiv
                    key={plan.id}
                    whileHover={{ y: -4 }}
                    className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-gold to-gold-light text-background">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <GlassCard
                      className={`premium-card bg-card/80 backdrop-blur-lg border shadow-xl h-full ${
                        plan.popular ? 'border-gold/50' : 'border-border-alt'
                      }`}
                    >
                      <div className="p-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                          <div className="flex items-baseline justify-center gap-1 mb-2">
                            <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                            <span className="text-muted-foreground">/{plan.period}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={plan.id === 'premium' ? handleUpgrade : undefined}
                          disabled={plan.id === currentPlan || isUpgrading}
                          className={`w-full ${
                            plan.popular
                              ? 'bg-gradient-to-r from-gold via-gold-light to-gold text-background hover:shadow-lg hover:shadow-gold/20'
                              : 'bg-primary hover:bg-primary/90'
                          }`}
                        >
                          {plan.id === currentPlan ? (
                            'Current Plan'
                          ) : plan.id === 'premium' ? (
                            isUpgrading ? (
                              'Upgrading...'
                            ) : (
                              <>
                                Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )
                          ) : (
                            'Current Plan'
                          )}
                        </Button>
                      </div>
                    </GlassCard>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          )}

          {/* Payment Method & Billing History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Method */}
            <MotionDiv variants={itemVariants}>
              <h2 className="text-xl font-bold text-foreground mb-4">Payment Method</h2>
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-6">
                  {user?.isPremium ? (
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">•••• •••• •••• 4242</h4>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast.info('Payment method update coming soon!')}
                      >
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No payment method on file</p>
                      <Button onClick={handleUpgrade} className="bg-primary hover:bg-primary/90">
                        Add Payment Method
                      </Button>
                    </div>
                  )}
                </div>
              </GlassCard>
            </MotionDiv>

            {/* Billing History */}
            <MotionDiv variants={itemVariants}>
              <h2 className="text-xl font-bold text-foreground mb-4">Billing History</h2>
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-6">
                  {user?.isPremium ? (
                    <div className="space-y-4">
                      {recentInvoices.map(invoice => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-foreground text-sm">
                              {invoice.description}
                            </h4>
                            <p className="text-xs text-muted-foreground">{invoice.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-foreground">{invoice.amount}</span>
                            <Badge variant="secondary">Paid</Badge>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View All Invoices
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No billing history yet</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </MotionDiv>
          </div>

          {/* Premium Benefits */}
          {user?.isPremium && (
            <MotionDiv variants={itemVariants}>
              <h2 className="text-xl font-bold text-foreground mb-4">Premium Benefits</h2>
              <GlassCard className="premium-card bg-gradient-to-r from-gold/10 via-gold-light/10 to-gold/10 border border-gold/20 shadow-xl">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-gold" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">Unlimited Everything</h4>
                      <p className="text-sm text-muted-foreground">
                        No limits on workflows, executions, or AI agents
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                        <Headphones className="h-6 w-6 text-gold" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">Priority Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Get help faster with dedicated premium support
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-gold" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">Advanced Features</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to cutting-edge AI capabilities
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </div>
  );
};

export default BillingPage;
