import React, { useState, useEffect, useMemo } from 'react';
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
  Trophy,
  Star,
  Zap,
  Target,
  Crown,
  Rocket,
  Award,
  Medal,
  Sparkles,
  CheckCircle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'workflow' | 'agent' | 'engagement' | 'premium';
  points: number;
  requirement: number;
  current: number;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementNotificationProps {
  achievement: Achievement;
  isVisible: boolean;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-gold to-gold-light',
  };

  return (
    <SafeAnimatePresence>
      {isVisible && (
        <MotionDiv
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="fixed top-4 right-4 z-50 w-80"
        >
          <GlassCard
            className={`premium-card bg-gradient-to-r ${rarityColors[achievement.rarity]} p-1`}
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-lg`}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Achievement Unlocked!</h4>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">+{achievement.points} XP</span>
                <Sparkles className="h-4 w-4 text-gold animate-pulse" />
              </div>
            </div>
          </GlassCard>
        </MotionDiv>
      )}
    </SafeAnimatePresence>
  );
};

interface AchievementSystemProps {
  userStats: {
    workflowsCreated: number;
    agentsCreated: number;
    workflowsRun: number;
    daysActive: number;
    isPremium: boolean;
  };
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ userStats }) => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);

  const achievementDefinitions = useMemo<
    Omit<Achievement, 'current' | 'unlocked' | 'unlockedAt'>[]
  >(
    () => [
      {
        id: 'first_workflow',
        title: 'First Steps',
        description: 'Create your first AI workflow',
        icon: <Rocket className="h-4 w-4 text-white" />,
        category: 'workflow',
        points: 100,
        requirement: 1,
        rarity: 'common',
      },
      {
        id: 'workflow_master',
        title: 'Workflow Master',
        description: 'Create 10 AI workflows',
        icon: <Target className="h-4 w-4 text-white" />,
        category: 'workflow',
        points: 500,
        requirement: 10,
        rarity: 'rare',
      },
      {
        id: 'automation_expert',
        title: 'Automation Expert',
        description: 'Create 25 AI workflows',
        icon: <Crown className="h-4 w-4 text-white" />,
        category: 'workflow',
        points: 1000,
        requirement: 25,
        rarity: 'epic',
      },
      {
        id: 'first_agent',
        title: 'AI Whisperer',
        description: 'Create your first AI agent',
        icon: <Zap className="h-4 w-4 text-white" />,
        category: 'agent',
        points: 150,
        requirement: 1,
        rarity: 'common',
      },
      {
        id: 'agent_army',
        title: 'Agent Army',
        description: 'Create 5 AI agents',
        icon: <Award className="h-4 w-4 text-white" />,
        category: 'agent',
        points: 400,
        requirement: 5,
        rarity: 'rare',
      },
      {
        id: 'power_user',
        title: 'Power User',
        description: 'Run 100 workflows',
        icon: <Medal className="h-4 w-4 text-white" />,
        category: 'engagement',
        points: 750,
        requirement: 100,
        rarity: 'epic',
      },
      {
        id: 'daily_user',
        title: 'Daily Architect',
        description: 'Use the platform for 7 consecutive days',
        icon: <Star className="h-4 w-4 text-white" />,
        category: 'engagement',
        points: 300,
        requirement: 7,
        rarity: 'rare',
      },
      {
        id: 'premium_member',
        title: 'Premium Architect',
        description: 'Upgrade to Premium membership',
        icon: <Crown className="h-4 w-4 text-white" />,
        category: 'premium',
        points: 1000,
        requirement: 1,
        rarity: 'legendary',
      },
    ],
    []
  );

  useEffect(() => {
    const updatedAchievements = achievementDefinitions.map(def => {
      let current = 0;

      switch (def.id) {
        case 'first_workflow':
        case 'workflow_master':
        case 'automation_expert':
          current = userStats.workflowsCreated;
          break;
        case 'first_agent':
        case 'agent_army':
          current = userStats.agentsCreated;
          break;
        case 'power_user':
          current = userStats.workflowsRun;
          break;
        case 'daily_user':
          current = userStats.daysActive;
          break;
        case 'premium_member':
          current = userStats.isPremium ? 1 : 0;
          break;
      }

      const wasUnlocked = achievements.find(a => a.id === def.id)?.unlocked || false;
      const isNowUnlocked = current >= def.requirement;

      // Check if this is a new achievement
      if (!wasUnlocked && isNowUnlocked) {
        const newAch = {
          ...def,
          current,
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        };

        // Show notification for new achievement
        setTimeout(() => {
          setNewAchievement(newAch);
          toast.success(`Achievement unlocked: ${def.title}!`);
        }, 500);
      }

      return {
        ...def,
        current,
        unlocked: isNowUnlocked,
        unlockedAt: isNowUnlocked ? new Date().toISOString() : undefined,
      };
    });

    setAchievements(updatedAchievements);

    // Calculate total XP and level
    const xp = updatedAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

    setTotalXP(xp);
    setLevel(Math.floor(xp / 1000) + 1);
  }, [userStats, achievementDefinitions, achievements]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const progressAchievements = achievements.filter(a => !a.unlocked && a.current > 0);
  const lockedAchievements = achievements.filter(a => !a.unlocked && a.current === 0);

  const rarityColors = {
    common: 'border-gray-400/20 bg-gray-400/10',
    rare: 'border-blue-400/20 bg-blue-400/10',
    epic: 'border-purple-400/20 bg-purple-400/10',
    legendary: 'border-gold/20 bg-gold/10',
  };

  return (
    <div className="space-y-6">
      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement!}
        isVisible={!!newAchievement}
        onClose={() => setNewAchievement(null)}
      />

      {/* Level and XP Display */}
      <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-gold to-gold-light rounded-xl">
                <Trophy className="h-6 w-6 text-background" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Level {level}</h3>
                <p className="text-sm text-muted-foreground">{totalXP} XP earned</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-gold to-gold-light text-background">
              {unlockedAchievements.length}/{achievements.length} Achievements
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {level + 1}</span>
              <span className="text-foreground">{totalXP % 1000}/1000 XP</span>
            </div>
            <Progress value={(totalXP % 1000) / 10} className="h-2" />
          </div>
        </div>
      </GlassCard>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Unlocked Achievements ({unlockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map(achievement => (
              <MotionDiv
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard
                  className={`premium-card ${rarityColors[achievement.rarity]} border shadow-lg`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 bg-gradient-to-r ${
                          achievement.rarity === 'legendary'
                            ? 'from-gold to-gold-light'
                            : achievement.rarity === 'epic'
                              ? 'from-purple-400 to-purple-600'
                              : achievement.rarity === 'rare'
                                ? 'from-blue-400 to-blue-600'
                                : 'from-gray-400 to-gray-600'
                        } rounded-lg`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-500 font-medium">✓ Completed</span>
                          <span className="text-xs text-gold font-medium">
                            +{achievement.points} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {progressAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            In Progress ({progressAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressAchievements.map(achievement => (
              <GlassCard
                key={achievement.id}
                className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-lg"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted/20 rounded-lg">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">
                            {achievement.current}/{achievement.requirement}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.current / achievement.requirement) * 100}
                          className="h-1.5"
                        />
                      </div>
                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-gold">+{achievement.points} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-muted-foreground" />
            Locked Achievements ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map(achievement => (
              <GlassCard
                key={achievement.id}
                className="premium-card bg-card/40 backdrop-blur-lg border border-border-alt/50 shadow-lg opacity-60"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted/10 rounded-lg">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-muted-foreground">{achievement.title}</h4>
                        <Badge variant="outline" className="text-xs opacity-50">
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground/70 mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Not started</span>
                        <span className="text-xs text-muted-foreground">
                          +{achievement.points} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem;
