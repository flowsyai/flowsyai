import React, { useState, useEffect, useCallback } from 'react';
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
  Brain,
  TrendingUp,
  Target,
  Zap,
  Clock,
  Award,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
  Sparkles,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LearningAnalytics {
  userId: string;
  completedExercises: string[];
  timeSpent: number; // minutes
  averageScore: number; // 0-100
  strugglingAreas: string[];
  strengths: string[];
  learningVelocity: number; // exercises per hour
  retentionRate: number; // 0-100
  preferredLearningStyle: 'visual' | 'hands-on' | 'reading' | 'mixed';
  lastActiveDate: Date;
}

interface PersonalizedRecommendation {
  id: string;
  type: 'exercise' | 'concept' | 'practice' | 'review';
  title: string;
  description: string;
  reasoning: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  confidence: number; // 0-100
}

interface AdaptiveLearningPath {
  id: string;
  title: string;
  description: string;
  exercises: string[];
  adaptedFor: string; // user learning style
  estimatedCompletion: number; // minutes
  difficultyProgression: number[]; // difficulty scores for each exercise
  prerequisites: string[];
  outcomes: string[];
}

interface TutorialOptimizationEngineProps {
  userAnalytics: LearningAnalytics;
  onRecommendationAccept: (recommendation: PersonalizedRecommendation) => void;
  onPathSelect: (path: AdaptiveLearningPath) => void;
  isVisible: boolean;
}

const TutorialOptimizationEngine: React.FC<TutorialOptimizationEngineProps> = ({
  userAnalytics,
  onRecommendationAccept,
  onPathSelect,
  isVisible,
}) => {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [adaptivePaths, setAdaptivePaths] = useState<AdaptiveLearningPath[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizationInsights, setOptimizationInsights] = useState<string[]>([]);

  // AI-powered recommendation engine
  const generatePersonalizedRecommendations = useCallback(async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRecommendations: PersonalizedRecommendation[] = [];

    // Analyze struggling areas
    if (userAnalytics.strugglingAreas.includes('node_connections')) {
      newRecommendations.push({
        id: 'connection_practice',
        type: 'practice',
        title: 'Node Connection Mastery',
        description: 'Focused practice on connecting workflow nodes effectively',
        reasoning: "You've shown difficulty with node connections in recent exercises",
        priority: 'high',
        estimatedTime: 15,
        difficulty: 'beginner',
        category: 'fundamentals',
        confidence: 92,
      });
    }

    // Analyze learning velocity
    if (userAnalytics.learningVelocity < 0.5) {
      newRecommendations.push({
        id: 'bite_sized_learning',
        type: 'concept',
        title: 'Micro-Learning Sessions',
        description: 'Break down complex concepts into 5-minute digestible chunks',
        reasoning: 'Your learning pace suggests shorter sessions would be more effective',
        priority: 'medium',
        estimatedTime: 5,
        difficulty: 'beginner',
        category: 'learning_strategy',
        confidence: 87,
      });
    }

    // Analyze retention rate
    if (userAnalytics.retentionRate < 70) {
      newRecommendations.push({
        id: 'spaced_repetition',
        type: 'review',
        title: 'Spaced Repetition Review',
        description: 'Review previously learned concepts at optimal intervals',
        reasoning: 'Your retention rate could improve with systematic review',
        priority: 'high',
        estimatedTime: 10,
        difficulty: 'intermediate',
        category: 'retention',
        confidence: 95,
      });
    }

    // Analyze strengths for advanced challenges
    if (userAnalytics.averageScore > 85 && userAnalytics.strengths.includes('ai_models')) {
      newRecommendations.push({
        id: 'advanced_ai_challenge',
        type: 'exercise',
        title: 'Advanced AI Model Chaining',
        description: 'Challenge yourself with complex multi-model workflows',
        reasoning:
          "Your strong performance with AI models suggests you're ready for advanced challenges",
        priority: 'medium',
        estimatedTime: 25,
        difficulty: 'advanced',
        category: 'ai_models',
        confidence: 89,
      });
    }

    setRecommendations(newRecommendations);
    setIsAnalyzing(false);
  }, [userAnalytics]);

  // Generate adaptive learning paths
  const generateAdaptivePaths = useCallback(() => {
    const paths: AdaptiveLearningPath[] = [];

    // Visual learner path
    if (
      userAnalytics.preferredLearningStyle === 'visual' ||
      userAnalytics.preferredLearningStyle === 'mixed'
    ) {
      paths.push({
        id: 'visual_workflow_mastery',
        title: 'Visual Workflow Mastery',
        description: 'Learn through interactive diagrams and visual demonstrations',
        exercises: [
          'visual_node_intro',
          'drag_drop_practice',
          'flow_visualization',
          'visual_debugging',
        ],
        adaptedFor: 'visual learners',
        estimatedCompletion: 45,
        difficultyProgression: [1, 2, 3, 4],
        prerequisites: [],
        outcomes: [
          'Master visual workflow design',
          'Understand data flow patterns',
          'Debug workflows visually',
        ],
      });
    }

    // Hands-on learner path
    if (
      userAnalytics.preferredLearningStyle === 'hands-on' ||
      userAnalytics.preferredLearningStyle === 'mixed'
    ) {
      paths.push({
        id: 'hands_on_builder',
        title: 'Hands-On Builder Track',
        description: 'Learn by building real workflows from day one',
        exercises: [
          'build_first_workflow',
          'real_world_automation',
          'production_deployment',
          'optimization_challenge',
        ],
        adaptedFor: 'hands-on learners',
        estimatedCompletion: 60,
        difficultyProgression: [2, 3, 4, 5],
        prerequisites: ['basic_concepts'],
        outcomes: [
          'Build production workflows',
          'Deploy real automations',
          'Optimize for performance',
        ],
      });
    }

    // Accelerated path for high performers
    if (userAnalytics.averageScore > 90 && userAnalytics.learningVelocity > 1.0) {
      paths.push({
        id: 'accelerated_expert',
        title: 'Accelerated Expert Track',
        description: 'Fast-track to advanced workflow architecture',
        exercises: [
          'advanced_patterns',
          'enterprise_workflows',
          'custom_integrations',
          'ai_optimization',
        ],
        adaptedFor: 'high performers',
        estimatedCompletion: 90,
        difficultyProgression: [4, 5, 5, 6],
        prerequisites: ['intermediate_completion'],
        outcomes: [
          'Master enterprise patterns',
          'Build custom integrations',
          'Optimize AI workflows',
        ],
      });
    }

    setAdaptivePaths(paths);
  }, [userAnalytics]);

  // Generate optimization insights
  const generateOptimizationInsights = useCallback(() => {
    const insights: string[] = [];

    if (userAnalytics.timeSpent > 120) {
      insights.push('💡 Consider taking breaks every 25 minutes to maintain focus and retention');
    }

    if (userAnalytics.retentionRate < 80) {
      insights.push('🔄 Reviewing concepts within 24 hours can improve retention by up to 40%');
    }

    if (userAnalytics.learningVelocity > 1.5) {
      insights.push('🚀 Your learning pace is excellent! Consider mentoring other learners');
    }

    if (userAnalytics.strugglingAreas.length > 2) {
      insights.push('🎯 Focus on mastering one concept at a time for better results');
    }

    if (userAnalytics.averageScore > 95) {
      insights.push("🏆 Outstanding performance! You're ready for advanced challenges");
    }

    setOptimizationInsights(insights);
  }, [userAnalytics]);

  useEffect(() => {
    if (isVisible) {
      generatePersonalizedRecommendations();
      generateAdaptivePaths();
      generateOptimizationInsights();
    }
  }, [
    isVisible,
    generatePersonalizedRecommendations,
    generateAdaptivePaths,
    generateOptimizationInsights,
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Target className="w-4 h-4 text-green-500" />;
      case 'intermediate':
        return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'advanced':
        return <Zap className="w-4 h-4 text-red-500" />;
      default:
        return <Brain className="w-4 h-4 text-blue-500" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Learning Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userAnalytics.averageScore}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userAnalytics.completedExercises.length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(userAnalytics.timeSpent)}m
              </div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {userAnalytics.retentionRate}%
              </div>
              <div className="text-sm text-muted-foreground">Retention</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Insights */}
      {optimizationInsights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Optimization Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {optimizationInsights.map((insight, index) => (
                <Alert key={index} className="border-blue-200 bg-blue-50 dark:bg-blue-950">
                  <AlertDescription>{insight}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Recommendations
            {isAnalyzing && (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SafeAnimatePresence>
              {recommendations.map((recommendation, index) => (
                <MotionDiv
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getDifficultyIcon(recommendation.difficulty)}
                            <h3 className="font-semibold">{recommendation.title}</h3>
                            <Badge className={getPriorityColor(recommendation.priority)}>
                              {recommendation.priority}
                            </Badge>
                            <Badge variant="outline">{recommendation.confidence}% confidence</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {recommendation.description}
                          </p>
                          <p className="text-xs text-blue-600 mb-3">
                            💡 {recommendation.reasoning}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {recommendation.estimatedTime} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {recommendation.category}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onRecommendationAccept(recommendation)}
                          className="ml-4"
                        >
                          Accept
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </SafeAnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Adaptive Learning Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {adaptivePaths.map(path => (
              <Card
                key={path.id}
                className="border-dashed border-2 hover:border-solid transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{path.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{path.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {path.estimatedCompletion} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {path.adaptedFor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {path.exercises.length} exercises
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs font-medium mb-1">Difficulty Progression:</div>
                        <div className="flex gap-1">
                          {path.difficultyProgression.map((level, index) => (
                            <div
                              key={index}
                              className={`w-4 h-2 rounded ${
                                level <= 2
                                  ? 'bg-green-400'
                                  : level <= 4
                                    ? 'bg-yellow-400'
                                    : 'bg-red-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-xs">
                        <div className="font-medium mb-1">Learning Outcomes:</div>
                        <ul className="list-disc list-inside space-y-1">
                          {path.outcomes.map((outcome, index) => (
                            <li key={index} className="text-muted-foreground">
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPathSelect(path)}
                      className="ml-4"
                    >
                      Start Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialOptimizationEngine;
