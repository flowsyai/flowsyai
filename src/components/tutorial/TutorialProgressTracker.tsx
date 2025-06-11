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
  Target,
  Zap,
  BookOpen,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  Medal,
  Crown,
  Flame,
  Brain,
  Settings,
  BarChart3,
  X,
} from 'lucide-react';

import TutorialOptimizationEngine from './TutorialOptimizationEngine';
import TutorialGamification from './TutorialGamification';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'learning' | 'mastery' | 'creativity' | 'speed' | 'collaboration';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  exercises: string[];
  completedExercises: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  prerequisites?: string[];
}

interface TutorialProgressTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  completedExercises: string[];
  onStartPath: (pathId: string) => void;
}

const achievements: Achievement[] = [
  {
    id: 'first_workflow',
    title: 'First Steps',
    description: 'Complete your first workflow',
    icon: <Target className="w-6 h-6" />,
    category: 'learning',
    difficulty: 'bronze',
    points: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'connection_master',
    title: 'Connection Master',
    description: 'Create 50 node connections',
    icon: <Zap className="w-6 h-6" />,
    category: 'mastery',
    difficulty: 'silver',
    points: 250,
    unlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: 'ai_expert',
    title: 'AI Expert',
    description: 'Use 10 different AI models',
    icon: <Sparkles className="w-6 h-6" />,
    category: 'mastery',
    difficulty: 'gold',
    points: 500,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete an exercise in under 5 minutes',
    icon: <Flame className="w-6 h-6" />,
    category: 'speed',
    difficulty: 'silver',
    points: 300,
    unlocked: false,
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Get 100% score on 5 exercises',
    icon: <Crown className="w-6 h-6" />,
    category: 'mastery',
    difficulty: 'platinum',
    points: 1000,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'creative_genius',
    title: 'Creative Genius',
    description: 'Create a workflow with 15+ nodes',
    icon: <Star className="w-6 h-6" />,
    category: 'creativity',
    difficulty: 'gold',
    points: 750,
    unlocked: false,
  },
];

const learningPaths: LearningPath[] = [
  {
    id: 'beginner_path',
    title: 'Workflow Fundamentals',
    description: 'Master the basics of AI workflow creation',
    exercises: ['first_workflow', 'data_transformation', 'basic_ai_integration'],
    completedExercises: [],
    estimatedTime: '45 minutes',
    difficulty: 'beginner',
    category: 'Fundamentals',
  },
  {
    id: 'intermediate_path',
    title: 'Advanced Integrations',
    description: 'Learn complex workflows and integrations',
    exercises: ['conditional_workflow', 'api_integration', 'data_processing'],
    completedExercises: [],
    estimatedTime: '1.5 hours',
    difficulty: 'intermediate',
    category: 'Integration',
    prerequisites: ['beginner_path'],
  },
  {
    id: 'advanced_path',
    title: 'Enterprise Workflows',
    description: 'Build production-ready, scalable workflows',
    exercises: ['error_handling', 'monitoring', 'optimization', 'deployment'],
    completedExercises: [],
    estimatedTime: '2 hours',
    difficulty: 'advanced',
    category: 'Enterprise',
    prerequisites: ['intermediate_path'],
  },
  {
    id: 'ai_specialist_path',
    title: 'AI Model Mastery',
    description: 'Become an expert in AI model integration',
    exercises: ['model_comparison', 'prompt_engineering', 'model_chaining', 'fine_tuning'],
    completedExercises: [],
    estimatedTime: '2.5 hours',
    difficulty: 'advanced',
    category: 'AI Specialization',
    prerequisites: ['intermediate_path'],
  },
];

const TutorialProgressTracker: React.FC<TutorialProgressTrackerProps> = ({
  isOpen,
  onClose,
  currentLevel,
  completedExercises,
  onStartPath,
}) => {
  const [activeTab, setActiveTab] = useState<
    'progress' | 'achievements' | 'paths' | 'optimization' | 'gamification'
  >('progress');
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [userPaths, setUserPaths] = useState<LearningPath[]>(learningPaths);

  // Calculate overall progress
  const totalExercises = learningPaths.reduce((sum, path) => sum + path.exercises.length, 0);
  const completedCount = completedExercises.length;
  const overallProgress = (completedCount / totalExercises) * 100;

  // Calculate total points
  const totalPoints = userAchievements
    .filter(achievement => achievement.unlocked)
    .reduce((sum, achievement) => sum + achievement.points, 0);

  // Update achievements based on progress
  useEffect(() => {
    setUserAchievements(prev =>
      prev.map(achievement => {
        const updated = { ...achievement };

        switch (achievement.id) {
          case 'first_workflow':
            updated.unlocked = completedExercises.length > 0;
            updated.progress = Math.min(completedExercises.length, 1);
            break;
          case 'connection_master':
            // This would be updated based on actual connection count
            updated.progress = Math.min(completedExercises.length * 5, 50);
            updated.unlocked = updated.progress >= 50;
            break;
          case 'ai_expert':
            // This would be updated based on AI models used
            updated.progress = Math.min(completedExercises.length * 2, 10);
            updated.unlocked = updated.progress >= 10;
            break;
          case 'perfectionist':
            // This would be updated based on exercise scores
            updated.progress = Math.min(completedExercises.length, 5);
            updated.unlocked = updated.progress >= 5;
            break;
        }

        if (updated.unlocked && !achievement.unlocked) {
          updated.unlockedAt = new Date();
        }

        return updated;
      })
    );
  }, [completedExercises]);

  // Update learning paths progress
  useEffect(() => {
    setUserPaths(prev =>
      prev.map(path => ({
        ...path,
        completedExercises: path.exercises.filter(exercise =>
          completedExercises.includes(exercise)
        ),
      }))
    );
  }, [completedExercises]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300';
      case 'silver':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
      case 'gold':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'platinum':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getPathProgress = (path: LearningPath) => {
    return (path.completedExercises.length / path.exercises.length) * 100;
  };

  const canStartPath = (path: LearningPath) => {
    if (!path.prerequisites) return true;

    return path.prerequisites.every(prereqId => {
      const prereqPath = userPaths.find(p => p.id === prereqId);
      return prereqPath && prereqPath.completedExercises.length === prereqPath.exercises.length;
    });
  };

  if (!isOpen) return null;

  return (
    <SafeAnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto"
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Learning Progress</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-sm">
                        Level: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {totalPoints} Points
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {completedCount}/{totalExercises} Exercises
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Overall Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
                {[
                  { id: 'progress', label: 'Progress', icon: TrendingUp },
                  { id: 'achievements', label: 'Achievements', icon: Trophy },
                  { id: 'paths', label: 'Learning Paths', icon: BookOpen },
                  { id: 'optimization', label: 'AI Insights', icon: Brain },
                  { id: 'gamification', label: 'Gamification', icon: Star },
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        tab.id as
                          | 'progress'
                          | 'achievements'
                          | 'paths'
                          | 'optimization'
                          | 'gamification'
                      )
                    }
                    className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-semibold">Time Spent</h3>
                        <p className="text-2xl font-bold text-blue-600">2.5h</p>
                        <p className="text-sm text-muted-foreground">Learning time</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-semibold">Accuracy</h3>
                        <p className="text-2xl font-bold text-green-600">94%</p>
                        <p className="text-sm text-muted-foreground">Average score</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                        <h3 className="font-semibold">Streak</h3>
                        <p className="text-2xl font-bold text-orange-600">7</p>
                        <p className="text-sm text-muted-foreground">Days in a row</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {completedExercises.slice(-5).map((exercise, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-medium">Completed: {exercise.replace('_', ' ')}</p>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                          <Badge variant="outline">+100 XP</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userAchievements.map(achievement => (
                      <MotionDiv
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`relative overflow-hidden rounded-lg border-2 p-4 ${
                          achievement.unlocked
                            ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800'
                            : 'border-muted bg-muted/50'
                        }`}
                      >
                        {achievement.unlocked && (
                          <div className="absolute top-2 right-2">
                            <Medal className="w-6 h-6 text-yellow-600" />
                          </div>
                        )}

                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                            achievement.unlocked
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {achievement.icon}
                        </div>

                        <h3
                          className={`font-semibold mb-1 ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {achievement.title}
                        </h3>
                        <p
                          className={`text-sm mb-3 ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {achievement.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(achievement.difficulty)}>
                            {achievement.difficulty}
                          </Badge>
                          <span
                            className={`text-sm font-medium ${achievement.unlocked ? 'text-yellow-600' : 'text-muted-foreground'}`}
                          >
                            {achievement.points} pts
                          </span>
                        </div>

                        {achievement.maxProgress && (
                          <div className="mt-3">
                            <Progress
                              value={(achievement.progress! / achievement.maxProgress) * 100}
                              className="h-2"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {achievement.progress}/{achievement.maxProgress}
                            </p>
                          </div>
                        )}
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Paths Tab */}
              {activeTab === 'paths' && (
                <div className="space-y-6">
                  <div className="grid gap-6">
                    {userPaths.map(path => {
                      const progress = getPathProgress(path);
                      const canStart = canStartPath(path);
                      const isCompleted = progress === 100;

                      return (
                        <Card
                          key={path.id}
                          className={`${isCompleted ? 'border-green-200 bg-green-50 dark:bg-green-950' : ''}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-semibold">{path.title}</h3>
                                  {isCompleted && (
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                  )}
                                  <Badge variant="outline">{path.category}</Badge>
                                  <Badge className={getDifficultyColor(path.difficulty)}>
                                    {path.difficulty}
                                  </Badge>
                                </div>

                                <p className="text-muted-foreground mb-4">{path.description}</p>

                                <div className="flex items-center gap-4 mb-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{path.estimatedTime}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      {path.exercises.length} exercises
                                    </span>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Progress</span>
                                    <span className="text-sm text-muted-foreground">
                                      {Math.round(progress)}%
                                    </span>
                                  </div>
                                  <Progress value={progress} className="h-2" />
                                </div>

                                {path.prerequisites && (
                                  <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">
                                      Prerequisites:{' '}
                                      {path.prerequisites
                                        .map(prereq => {
                                          const prereqPath = userPaths.find(p => p.id === prereq);
                                          return prereqPath?.title;
                                        })
                                        .join(', ')}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="ml-4">
                                <Button
                                  onClick={() => onStartPath(path.id)}
                                  disabled={!canStart}
                                  variant={isCompleted ? 'outline' : 'default'}
                                >
                                  {isCompleted ? 'Review' : progress > 0 ? 'Continue' : 'Start'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AI Optimization Tab */}
              {activeTab === 'optimization' && (
                <TutorialOptimizationEngine
                  userAnalytics={{
                    userId: 'current-user',
                    completedExercises,
                    timeSpent: 120, // Mock data
                    averageScore: 87,
                    strugglingAreas: ['node_connections'],
                    strengths: ['ai_models', 'data_flow'],
                    learningVelocity: 0.8,
                    retentionRate: 85,
                    preferredLearningStyle: 'mixed',
                    lastActiveDate: new Date(),
                  }}
                  onRecommendationAccept={recommendation => {
                    console.log('Accepted recommendation:', recommendation);
                    // Handle recommendation acceptance
                  }}
                  onPathSelect={path => {
                    console.log('Selected adaptive path:', path);
                    onStartPath(path.id);
                  }}
                  isVisible={true}
                />
              )}

              {/* Gamification Tab */}
              {activeTab === 'gamification' && (
                <TutorialGamification
                  userLevel={Math.floor(completedExercises.length / 3) + 1}
                  userPoints={completedExercises.length * 100 + 500}
                  userStreak={7}
                  achievements={userAchievements}
                  challenges={[
                    {
                      id: 'daily_workflow',
                      title: 'Daily Workflow Builder',
                      description: 'Create and execute one workflow today',
                      type: 'daily',
                      difficulty: 'easy',
                      reward: { points: 100 },
                      progress: 0,
                      maxProgress: 1,
                      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                      isCompleted: false,
                    },
                    {
                      id: 'weekly_master',
                      title: 'Weekly Workflow Master',
                      description: 'Complete 5 different workflow exercises this week',
                      type: 'weekly',
                      difficulty: 'medium',
                      reward: { points: 500, badge: 'Weekly Master' },
                      progress: completedExercises.length % 5,
                      maxProgress: 5,
                      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                      isCompleted: false,
                    },
                    {
                      id: 'speed_challenge',
                      title: 'Speed Builder Challenge',
                      description: 'Complete a workflow in under 3 minutes',
                      type: 'special',
                      difficulty: 'hard',
                      reward: { points: 300, title: 'Speed Demon' },
                      progress: 0,
                      maxProgress: 1,
                      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                      isCompleted: false,
                    },
                  ]}
                  leaderboard={[
                    {
                      rank: 1,
                      username: 'WorkflowMaster',
                      points: 15420,
                      level: 12,
                      avatar: '',
                      streak: 25,
                    },
                    {
                      rank: 2,
                      username: 'AIEnthusiast',
                      points: 12890,
                      level: 10,
                      avatar: '',
                      streak: 18,
                    },
                    {
                      rank: 3,
                      username: 'AutomationPro',
                      points: 11250,
                      level: 9,
                      avatar: '',
                      streak: 12,
                    },
                    {
                      rank: 4,
                      username: 'You',
                      points: completedExercises.length * 100 + 500,
                      level: Math.floor(completedExercises.length / 3) + 1,
                      avatar: '',
                      streak: 7,
                      isCurrentUser: true,
                    },
                    {
                      rank: 5,
                      username: 'DataWizard',
                      points: 8750,
                      level: 7,
                      avatar: '',
                      streak: 9,
                    },
                  ]}
                  onChallengeAccept={challengeId => {
                    console.log('Accepted challenge:', challengeId);
                    // Handle challenge acceptance
                  }}
                  onAchievementClaim={achievementId => {
                    console.log('Claimed achievement:', achievementId);
                    // Handle achievement claim
                  }}
                />
              )}
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </SafeAnimatePresence>
  );
};

export default TutorialProgressTracker;
