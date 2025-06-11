import React, { useState, useEffect, useCallback } from 'react';
import { MotionDiv, SafeAnimatePresence } from '@/lib/motion-wrapper';
import {
  Calendar,
  Target,
  CheckCircle,
  Clock,
  Flame,
  Star,
  Gift,
  Zap,
  Trophy,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'workflow' | 'agent' | 'engagement' | 'learning';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  requirement: number;
  current: number;
  completed: boolean;
  expiresAt: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface DailyChallengesProps {
  userStats: {
    workflowsCreated: number;
    agentsCreated: number;
    workflowsRun: number;
    daysActive: number;
  };
  onChallengeComplete?: (challenge: DailyChallenge) => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({ userStats, onChallengeComplete }) => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate daily challenges based on user level and activity
  const generateDailyChallenges = useCallback((): DailyChallenge[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const challengePool = [
      {
        id: 'create_workflow',
        title: 'Workflow Creator',
        description: 'Create a new AI workflow today',
        icon: <Target className="h-4 w-4 text-white" />,
        category: 'workflow' as const,
        difficulty: 'easy' as const,
        xpReward: 50,
        requirement: 1,
        current: Math.min(userStats.workflowsCreated, 1),
      },
      {
        id: 'run_workflows',
        title: 'Automation Master',
        description: 'Execute 3 workflows successfully',
        icon: <Zap className="h-4 w-4 text-white" />,
        category: 'workflow' as const,
        difficulty: 'medium' as const,
        xpReward: 100,
        requirement: 3,
        current: Math.min(userStats.workflowsRun, 3),
      },
      {
        id: 'create_agent',
        title: 'AI Architect',
        description: 'Deploy a new AI agent',
        icon: <Sparkles className="h-4 w-4 text-white" />,
        category: 'agent' as const,
        difficulty: 'medium' as const,
        xpReward: 75,
        requirement: 1,
        current: Math.min(userStats.agentsCreated, 1),
      },
      {
        id: 'daily_login',
        title: 'Daily Visitor',
        description: 'Visit the platform today',
        icon: <Calendar className="h-4 w-4 text-white" />,
        category: 'engagement' as const,
        difficulty: 'easy' as const,
        xpReward: 25,
        requirement: 1,
        current: 1, // Always completed if user is here
      },
      {
        id: 'explore_features',
        title: 'Explorer',
        description: 'Visit 3 different sections of the platform',
        icon: <Star className="h-4 w-4 text-white" />,
        category: 'learning' as const,
        difficulty: 'easy' as const,
        xpReward: 40,
        requirement: 3,
        current: Math.floor(Math.random() * 4), // Simulated exploration
      },
      {
        id: 'workflow_marathon',
        title: 'Marathon Runner',
        description: 'Run 10 workflows in a single day',
        icon: <Flame className="h-4 w-4 text-white" />,
        category: 'workflow' as const,
        difficulty: 'hard' as const,
        xpReward: 200,
        requirement: 10,
        current: Math.min(userStats.workflowsRun, 10),
      },
    ];

    // Select 3-4 challenges for today
    const selectedChallenges = challengePool
      .sort(() => Math.random() - 0.5)
      .slice(0, user?.isPremium ? 4 : 3)
      .map(challenge => ({
        ...challenge,
        completed: challenge.current >= challenge.requirement,
        expiresAt: tomorrow.toISOString(),
      }));

    return selectedChallenges;
  }, [userStats, user?.isPremium]);

  useEffect(() => {
    const newChallenges = generateDailyChallenges();
    setChallenges(newChallenges);

    // Load streak from localStorage
    const savedStreak = localStorage.getItem('daily_streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }

    // Calculate total XP from completed challenges
    const completedXP = newChallenges
      .filter(c => c.completed)
      .reduce((sum, c) => sum + c.xpReward, 0);
    setTotalXP(completedXP);
  }, [userStats, generateDailyChallenges]);

  const refreshChallenges = async () => {
    setIsRefreshing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newChallenges = generateDailyChallenges();
    setChallenges(newChallenges);
    setIsRefreshing(false);

    toast.success('Challenges refreshed!');
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(challenge => {
        if (challenge.id === challengeId && !challenge.completed) {
          const updatedChallenge = {
            ...challenge,
            completed: true,
            current: challenge.requirement,
          };

          // Update total XP
          setTotalXP(prev => prev + challenge.xpReward);

          // Update streak
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('daily_streak', newStreak.toString());

          // Notify parent component
          onChallengeComplete?.(updatedChallenge);

          toast.success(`Challenge completed! +${challenge.xpReward} XP`);

          return updatedChallenge;
        }
        return challenge;
      })
    );
  };

  const difficultyColors = {
    easy: 'from-green-400 to-green-600',
    medium: 'from-yellow-400 to-orange-500',
    hard: 'from-red-400 to-red-600',
  };

  const categoryIcons = {
    workflow: <Target className="h-3 w-3" />,
    agent: <Sparkles className="h-3 w-3" />,
    engagement: <Calendar className="h-3 w-3" />,
    learning: <Star className="h-3 w-3" />,
  };

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;
  const completionRate = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Daily Challenges
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete challenges to earn XP and maintain your streak
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1 text-orange-500 mb-1">
              <Flame className="h-4 w-4" />
              <span className="font-bold">{streak}</span>
            </div>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-1 text-gold mb-1">
              <Trophy className="h-4 w-4" />
              <span className="font-bold">{totalXP}</span>
            </div>
            <span className="text-xs text-muted-foreground">XP Today</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={refreshChallenges}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Daily Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedChallenges}/{totalChallenges} completed
            </span>
          </div>
          <Progress value={completionRate} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Keep going!</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
        </div>
      </GlassCard>

      {/* Challenges List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SafeAnimatePresence>
          {challenges.map((challenge, index) => (
            <MotionDiv
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GlassCard
                className={`premium-card border shadow-lg relative overflow-hidden ${
                  challenge.completed
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-card/80 border-border-alt'
                }`}
              >
                {challenge.completed && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`p-2 bg-gradient-to-r ${difficultyColors[challenge.difficulty]} rounded-lg`}
                    >
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{challenge.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {categoryIcons[challenge.category]}
                          <span className="ml-1 capitalize">{challenge.category}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>

                      {!challenge.completed && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">
                              {challenge.current}/{challenge.requirement}
                            </span>
                          </div>
                          <Progress
                            value={(challenge.current / challenge.requirement) * 100}
                            className="h-1.5"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`bg-gradient-to-r ${difficultyColors[challenge.difficulty]} text-white text-xs`}
                      >
                        {challenge.difficulty.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gold font-medium">
                        +{challenge.xpReward} XP
                      </span>
                    </div>

                    {challenge.action && !challenge.completed && (
                      <Button size="sm" onClick={challenge.action.onClick} className="text-xs">
                        {challenge.action.label}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}

                    {challenge.completed && (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </GlassCard>
            </MotionDiv>
          ))}
        </SafeAnimatePresence>
      </div>

      {/* Streak Bonus */}
      {streak >= 3 && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="premium-card bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 shadow-xl">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-bold text-foreground">Streak Bonus!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                You're on a {streak}-day streak! Keep it up for bonus rewards.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <Gift className="h-4 w-4 text-gold mx-auto mb-1" />
                  <span className="text-xs text-muted-foreground">
                    Next reward at {Math.ceil(streak / 7) * 7} days
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </MotionDiv>
      )}
    </div>
  );
};

export default DailyChallenges;
