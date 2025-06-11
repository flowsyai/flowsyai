import React, { useState, useEffect } from 'react';
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
  Flame,
  Zap,
  Target,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  Rocket,
  Brain,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  category: 'learning' | 'mastery' | 'social' | 'speed' | 'creativity' | 'consistency';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  reward: {
    points: number;
    badge?: string;
    title?: string;
  };
  progress: number;
  maxProgress: number;
  expiresAt: Date;
  isCompleted: boolean;
}

interface Leaderboard {
  rank: number;
  username: string;
  points: number;
  level: number;
  avatar: string;
  streak: number;
  isCurrentUser?: boolean;
}

interface TutorialGamificationProps {
  userLevel: number;
  userPoints: number;
  userStreak: number;
  achievements: Achievement[];
  challenges: Challenge[];
  leaderboard: Leaderboard[];
  onChallengeAccept: (challengeId: string) => void;
  onAchievementClaim: (achievementId: string) => void;
}

const TutorialGamification: React.FC<TutorialGamificationProps> = ({
  userLevel,
  userPoints,
  userStreak,
  achievements,
  challenges,
  leaderboard,
  onChallengeAccept,
  onAchievementClaim,
}) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'leaderboard'>(
    'achievements'
  );
  const [celebrationAnimation, setCelebrationAnimation] = useState<string | null>(null);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);

  // Calculate level progress
  const pointsForCurrentLevel = userLevel * 1000;
  const pointsForNextLevel = (userLevel + 1) * 1000;
  const levelProgress =
    ((userPoints - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100;

  // Check for new achievements
  useEffect(() => {
    const recentUnlocks = achievements.filter(
      achievement =>
        achievement.unlocked &&
        achievement.unlockedAt &&
        Date.now() - achievement.unlockedAt.getTime() < 5000
    );

    if (recentUnlocks.length > 0) {
      setNewUnlocks(recentUnlocks);
      setCelebrationAnimation('achievement');
      setTimeout(() => {
        setCelebrationAnimation(null);
        setNewUnlocks([]);
      }, 3000);
    }
  }, [achievements]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-orange-100 text-orange-800';
      case 'extreme':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Calendar className="w-4 h-4" />;
      case 'weekly':
        return <TrendingUp className="w-4 h-4" />;
      case 'monthly':
        return <Crown className="w-4 h-4" />;
      case 'special':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      <SafeAnimatePresence>
        {celebrationAnimation && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <MotionDiv
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl text-white text-center shadow-2xl"
            >
              <MotionDiv
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <Trophy className="w-16 h-16 mx-auto mb-4" />
              </MotionDiv>
              <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
              {newUnlocks.map(achievement => (
                <div key={achievement.id} className="mb-2">
                  <div className="text-lg font-semibold">{achievement.title}</div>
                  <div className="text-sm opacity-90">{achievement.description}</div>
                  <div className="text-lg font-bold">+{achievement.points} XP</div>
                </div>
              ))}
            </MotionDiv>
          </MotionDiv>
        )}
      </SafeAnimatePresence>

      {/* User Stats Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {userLevel}</h2>
                <p className="text-blue-100">Workflow Architect</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{userPoints.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">{userStreak} day streak</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100 mb-1">Progress to Level {userLevel + 1}</div>
              <div className="w-32 bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${Math.min(levelProgress, 100)}%` }}
                />
              </div>
              <div className="text-xs text-blue-100">{Math.round(levelProgress)}% complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'challenges', label: 'Challenges', icon: Target },
          { id: 'leaderboard', label: 'Leaderboard', icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'achievements' | 'challenges' | 'leaderboard')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <MotionDiv
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-lg border-2 p-4 ${
                achievement.unlocked
                  ? `${getRarityColor(achievement.rarity)} shadow-lg`
                  : 'border-muted bg-muted/50 opacity-60'
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 text-white">
                    <Medal className="w-3 h-3 mr-1" />
                    Unlocked
                  </Badge>
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-muted'
                }`}
              >
                {achievement.icon}
              </div>

              <h3
                className={`font-semibold mb-1 ${achievement.unlocked ? '' : 'text-muted-foreground'}`}
              >
                {achievement.title}
              </h3>
              <p className={`text-sm mb-3 ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
                {achievement.description}
              </p>

              <div className="flex items-center justify-between mb-2">
                <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                <span
                  className={`text-sm font-medium ${achievement.unlocked ? '' : 'text-muted-foreground'}`}
                >
                  {achievement.points} XP
                </span>
              </div>

              {achievement.maxProgress > 1 && (
                <div className="mb-3">
                  <Progress
                    value={(achievement.progress / achievement.maxProgress) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.progress}/{achievement.maxProgress}
                  </p>
                </div>
              )}

              {achievement.unlocked && !achievement.unlockedAt && (
                <Button
                  size="sm"
                  onClick={() => onAchievementClaim(achievement.id)}
                  className="w-full"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Claim Reward
                </Button>
              )}
            </MotionDiv>
          ))}
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {challenges.map(challenge => (
            <Card
              key={challenge.id}
              className={`${challenge.isCompleted ? 'bg-green-50 border-green-200' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getChallengeTypeIcon(challenge.type)}
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="outline">{challenge.type}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{challenge.reward.points} XP</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeRemaining(challenge.expiresAt)}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}/{challenge.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={(challenge.progress / challenge.maxProgress) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="ml-4">
                    {challenge.isCompleted ? (
                      <Badge className="bg-green-500 text-white">
                        <Trophy className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => onChallengeAccept(challenge.id)}
                        variant={challenge.progress > 0 ? 'default' : 'outline'}
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        {challenge.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Global Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.username}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    entry.isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-muted/50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      entry.rank === 1
                        ? 'bg-yellow-500 text-white'
                        : entry.rank === 2
                          ? 'bg-gray-400 text-white'
                          : entry.rank === 3
                            ? 'bg-orange-500 text-white'
                            : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {entry.rank <= 3 ? <Crown className="w-4 h-4" /> : entry.rank}
                  </div>

                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {entry.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold">{entry.username}</div>
                    <div className="text-sm text-muted-foreground">Level {entry.level}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold">{entry.points.toLocaleString()} XP</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {entry.streak} streak
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TutorialGamification;
