import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  User,
  Crown,
  Activity,
  TrendingUp,
  Calendar,
  Clock,
  Zap,
  Target,
  Plus,
  ArrowRight,
  Settings,
  CreditCard,
  Workflow,
  Bot,
  Trophy,
  BookOpen,
  Sparkles as SparklesIcon,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { WorkflowService } from '@/services/workflowService';
import { AIAgentService } from '@/services/aiAgentService';
import { RealAIAgentService } from '@/services/realAIAgentService';
import { TokenService } from '@/services/tokenService';
import TokenManager from '@/components/TokenManager';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import QuickAccessPanel from '@/components/QuickAccessPanel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Lazy load heavy components
const OnboardingFlow = React.lazy(() => import('@/components/OnboardingFlow'));
const AchievementSystem = React.lazy(() => import('@/components/AchievementSystem'));
const DailyChallenges = React.lazy(() => import('@/components/DailyChallenges'));

const AccountDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { shouldShowOnboarding, markOnboardingCompleted, markOnboardingSkipped, startOnboarding } =
    useOnboarding();

  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalWorkflows: 0,
      activeAgents: 0,
      totalExecutions: 0,
      successRate: 0,
      tokenBalance: 0,
      tokensUsedToday: 0,
      tokensUsedThisMonth: 0,
      applicationsCreated: 0,
      lastLoginDate: null as Date | null,
    },
    recentWorkflows: [],
    recentAgents: [],
    recentApplications: [],
    usageMetrics: {
      dailyUsage: [],
      weeklyUsage: [],
      monthlyUsage: [],
    },
    isLoading: true,
  });

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showChallenges, setShowChallenges] = useState(true); // Show by default for engagement
  const [userStats, setUserStats] = useState({
    workflowsCreated: 0,
    agentsCreated: 0,
    workflowsRun: 0,
    daysActive: 1,
    isPremium: false,
  });

  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    console.log('📊 Loading dashboard data for user:', user.email);

    try {
      // Use Promise.all for parallel data fetching to improve performance
      const [workflows, agents, agentStats, tokenBalance] = await Promise.all([
        WorkflowService.getUserWorkflows(user.id),
        RealAIAgentService.getUserAIAgents(user.id),
        AIAgentService.getAIAgentStats(user.id),
        TokenService.getUserTokenBalance(user.id),
      ]);

      // Calculate real usage metrics
      const today = new Date();
      const applicationsCreated = workflows.length + agents.length;

      // Get real token usage from TokenService
      const tokensUsedToday = await TokenService.getTokenUsageToday(user.id);
      const tokensUsedThisMonth = await TokenService.getTokenUsageThisMonth(user.id);

      // Calculate real execution metrics from workflows and agents
      const totalExecutions =
        workflows.reduce((sum, w) => sum + (w.executionCount || 0), 0) +
        agents.reduce((sum, a) => sum + (a.executionCount || 0), 0);

      // Calculate real success rate from execution history
      const successfulExecutions =
        workflows.reduce((sum, w) => sum + (w.successfulExecutions || 0), 0) +
        agents.reduce((sum, a) => sum + (a.successfulExecutions || 0), 0);
      const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;

      // Get real usage data from analytics
      const dailyUsage = await TokenService.getDailyUsageStats(user.id, 7);

      const recentApplications = [
        ...workflows.map(w => ({ ...w, type: 'workflow' })),
        ...agents.map(a => ({ ...a, type: 'agent' })),
      ]
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 5);

      setDashboardData({
        stats: {
          totalWorkflows: workflows.length,
          activeAgents: agentStats.active,
          totalExecutions,
          successRate: Math.round(successRate * 10) / 10,
          tokenBalance,
          tokensUsedToday,
          tokensUsedThisMonth,
          applicationsCreated,
          lastLoginDate: new Date(),
        },
        recentWorkflows: workflows.slice(0, 3),
        recentAgents: agents.slice(0, 3),
        recentApplications,
        usageMetrics: {
          dailyUsage,
          weeklyUsage: [],
          monthlyUsage: [],
        },
        isLoading: false,
      });

      // Update user stats for achievements with real data
      const userCreatedDate = new Date(user.created_at || user.createdAt || Date.now());
      const daysActive =
        Math.floor((Date.now() - userCreatedDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      setUserStats({
        workflowsCreated: workflows.length,
        agentsCreated: agents.length,
        workflowsRun: totalExecutions,
        daysActive: Math.max(1, daysActive),
        isPremium: user?.isPremium || false,
      });

      // Show onboarding for new users
      if (shouldShowOnboarding && workflows.length === 0 && agents.length === 0) {
        setTimeout(() => setShowOnboarding(true), 1000);
      }

      console.log('✅ Dashboard data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setDashboardData(prev => ({ ...prev, isLoading: false }));
    }
  }, [user, shouldShowOnboarding]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const quickActions = useMemo(
    () => [
      {
        title: 'Create Workflow',
        description: 'Build a new AI automation',
        icon: <Workflow className="h-5 w-5" />,
        action: () => navigate('/workflow-builder'),
        color: 'primary',
      },
      {
        title: 'Add AI Agent',
        description: 'Deploy a new intelligent agent',
        icon: <Bot className="h-5 w-5" />,
        action: () => navigate('/workflow-builder?type=agent'),
        color: 'sapphire',
      },
      {
        title: 'View Projects',
        description: 'Manage all your projects',
        icon: <Target className="h-5 w-5" />,
        action: () => navigate('/projects'),
        color: 'gold',
      },
      {
        title: 'Daily Challenges',
        description: "Complete today's tasks",
        icon: <SparklesIcon className="h-5 w-5" />,
        action: () => setShowChallenges(!showChallenges),
        color: 'primary',
      },
      {
        title: 'Analytics Dashboard',
        description: 'View performance insights',
        icon: <BarChart3 className="h-5 w-5" />,
        action: () => navigate('/analytics'),
        color: 'sapphire',
      },
      {
        title: 'Team Collaboration',
        description: 'Work together in real-time',
        icon: <User className="h-5 w-5" />,
        action: () => navigate('/collaboration'),
        color: 'gold',
      },
      {
        title: 'Achievements',
        description: 'Track your progress',
        icon: <Trophy className="h-5 w-5" />,
        action: () => setShowAchievements(!showAchievements),
        color: 'gold',
      },
      {
        title: 'Take Tour',
        description: 'Learn the platform',
        icon: <BookOpen className="h-5 w-5" />,
        action: () => setShowOnboarding(true),
        color: 'primary',
      },
      {
        title: 'Account Settings',
        description: 'Manage your preferences',
        icon: <Settings className="h-5 w-5" />,
        action: () => navigate('/settings'),
        color: 'platinum',
      },
    ],
    [
      navigate,
      setShowChallenges,
      setShowAchievements,
      setShowOnboarding,
      showChallenges,
      showAchievements,
    ]
  );

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

  // Show skeleton while loading
  if (dashboardData.isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-screen-xl">
        {/* Welcome Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatarUrl} alt={user?.fullName || user?.email} />
                <AvatarFallback className="bg-gradient-to-r from-primary to-sapphire text-background text-lg">
                  {user?.fullName
                    ? user.fullName.charAt(0).toUpperCase()
                    : user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome back, {user?.fullName || user?.username || 'User'}!
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-muted-foreground">{user?.email}</p>
                  {user?.isPremium && (
                    <Badge className="bg-gradient-to-r from-gold to-gold-light text-background">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {!user?.isPremium && (
              <Button
                onClick={() => navigate('/billing')}
                className="bg-gradient-to-r from-gold via-gold-light to-gold text-background hover:shadow-lg hover:shadow-gold/20"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            )}
          </div>
        </MotionDiv>

        {/* Token Balance - Compact View */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <TokenManager compact={true} showPurchaseOptions={true} />
        </MotionDiv>

        {/* Stats Overview */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Workflow className="h-5 w-5 text-primary" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {dashboardData.isLoading ? '...' : dashboardData.stats.applicationsCreated}
                </div>
                <p className="text-sm text-muted-foreground">Applications Created</p>
              </div>
            </GlassCard>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Zap className="h-5 w-5 text-secondary" />
                  </div>
                  <Activity className="h-4 w-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {dashboardData.isLoading
                    ? '...'
                    : dashboardData.stats.tokensUsedToday.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Tokens Used Today</p>
              </div>
            </GlassCard>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {dashboardData.isLoading
                    ? '...'
                    : dashboardData.stats.tokensUsedThisMonth.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Monthly Usage</p>
              </div>
            </GlassCard>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Target className="h-5 w-5 text-green-500" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {dashboardData.isLoading ? '...' : `${dashboardData.stats.successRate}%`}
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </GlassCard>
          </MotionDiv>
        </MotionDiv>

        {/* Enhanced Quick Access Panel */}
        <MotionDiv variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
          <MotionDiv variants={itemVariants}>
            <QuickAccessPanel />
          </MotionDiv>
        </MotionDiv>

        {/* Recent Activity */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Workflows */}
          <MotionDiv variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Recent Workflows</h2>
              <Button variant="ghost" onClick={() => navigate('/projects')}>
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                {dashboardData.recentWorkflows.length === 0 ? (
                  <div className="text-center py-8">
                    <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No workflows yet</p>
                    <Button onClick={() => navigate('/workflow-builder')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Workflow
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.recentWorkflows.map(workflow => (
                      <div
                        key={workflow.id}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-foreground">{workflow.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Updated {new Date(workflow.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </MotionDiv>

          {/* Recent AI Agents */}
          <MotionDiv variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">AI Agents</h2>
              <Button variant="ghost" onClick={() => navigate('/projects')}>
                Manage All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                {dashboardData.recentAgents.length === 0 ? (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No AI agents yet</p>
                    <Button onClick={() => navigate('/workflow-builder?type=agent')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Agent
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.recentAgents.map(agent => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${agent.is_active ? 'bg-green-500/10' : 'bg-muted/20'}`}
                          >
                            <Bot
                              className={`h-4 w-4 ${agent.is_active ? 'text-green-500' : 'text-muted-foreground'}`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{agent.name}</h4>
                            <p className="text-sm text-muted-foreground capitalize">
                              {agent.type.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                        <Badge variant={agent.is_active ? 'default' : 'secondary'}>
                          {agent.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </MotionDiv>
        </MotionDiv>

        {/* Daily Challenges Section */}
        {showChallenges && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <DailyChallenges
              userStats={userStats}
              onChallengeComplete={challenge => {
                toast.success(`Challenge completed: ${challenge.title}!`);
              }}
            />
          </MotionDiv>
        )}

        {/* Achievements Section */}
        {showAchievements && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Achievements</h2>
              <Button
                variant="outline"
                onClick={() => setShowAchievements(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Hide Achievements
              </Button>
            </div>
            <AchievementSystem userStats={userStats} />
          </MotionDiv>
        )}
      </div>

      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={showOnboarding}
        onClose={() => {
          setShowOnboarding(false);
          markOnboardingSkipped();
        }}
        onComplete={() => {
          setShowOnboarding(false);
          markOnboardingCompleted();
        }}
      />
    </div>
  );
};

export default AccountDashboard;
