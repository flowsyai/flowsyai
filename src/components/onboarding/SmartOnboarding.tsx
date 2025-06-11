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
  Sparkles,
  Target,
  Zap,
  Brain,
  Users,
  Rocket,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'basics' | 'ai' | 'automation' | 'advanced';
  benefits: string[];
  action: {
    label: string;
    onClick: () => void;
  };
}

interface SmartOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: (type: 'beginner' | 'intermediate' | 'advanced') => void;
  userProfile?: {
    experience: 'none' | 'some' | 'expert';
    interests: string[];
    goals: string[];
  };
}

const onboardingPaths: Record<string, OnboardingStep[]> = {
  beginner: [
    {
      id: 'welcome',
      title: 'Welcome to AI Workflows',
      description: 'Learn the fundamentals of building AI-powered automation',
      icon: <Sparkles className="w-6 h-6" />,
      estimatedTime: '5 min',
      difficulty: 'easy',
      category: 'basics',
      benefits: [
        'Understand workflow concepts',
        'Learn drag-and-drop interface',
        'Create your first automation',
      ],
      action: {
        label: 'Start Comprehensive Tutorial',
        onClick: () => console.log('Start comprehensive tutorial'),
      },
    },
    {
      id: 'first-workflow',
      title: 'Build Your First Workflow',
      description: 'Create a simple text processing workflow with AI',
      icon: <Target className="w-6 h-6" />,
      estimatedTime: '10 min',
      difficulty: 'easy',
      category: 'ai',
      benefits: ['Connect AI models', 'Process text data', 'See real results'],
      action: {
        label: 'Build First Workflow',
        onClick: () => console.log('Build first workflow'),
      },
    },
  ],
  intermediate: [
    {
      id: 'advanced-ai',
      title: 'Advanced AI Integration',
      description: 'Combine multiple AI models for complex tasks',
      icon: <Brain className="w-6 h-6" />,
      estimatedTime: '15 min',
      difficulty: 'medium',
      category: 'ai',
      benefits: ['Chain AI models', 'Handle complex data', 'Optimize performance'],
      action: {
        label: 'Explore AI Features',
        onClick: () => console.log('Advanced AI tutorial'),
      },
    },
    {
      id: 'automation',
      title: 'Smart Automation',
      description: 'Set up triggers and automated workflows',
      icon: <Zap className="w-6 h-6" />,
      estimatedTime: '12 min',
      difficulty: 'medium',
      category: 'automation',
      benefits: ['Automated triggers', 'Scheduled workflows', 'Event-driven processing'],
      action: {
        label: 'Setup Automation',
        onClick: () => console.log('Automation tutorial'),
      },
    },
  ],
  advanced: [
    {
      id: 'enterprise',
      title: 'Enterprise Workflows',
      description: 'Build scalable, production-ready workflows',
      icon: <Rocket className="w-6 h-6" />,
      estimatedTime: '20 min',
      difficulty: 'hard',
      category: 'advanced',
      benefits: ['Enterprise patterns', 'Error handling', 'Monitoring & analytics'],
      action: {
        label: 'Master Enterprise',
        onClick: () => console.log('Enterprise tutorial'),
      },
    },
  ],
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    case 'hard':
      return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'basics':
      return <Target className="w-4 h-4" />;
    case 'ai':
      return <Brain className="w-4 h-4" />;
    case 'automation':
      return <Zap className="w-4 h-4" />;
    case 'advanced':
      return <Rocket className="w-4 h-4" />;
    default:
      return <Star className="w-4 h-4" />;
  }
};

const SmartOnboarding: React.FC<SmartOnboardingProps> = ({
  isOpen,
  onClose,
  onStartTutorial,
  userProfile,
}) => {
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'intermediate' | 'advanced'>(
    'beginner'
  );
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Smart path recommendation based on user profile
  useEffect(() => {
    if (userProfile) {
      if (userProfile.experience === 'expert') {
        setSelectedPath('advanced');
      } else if (userProfile.experience === 'some') {
        setSelectedPath('intermediate');
      } else {
        setSelectedPath('beginner');
      }
    }
  }, [userProfile]);

  const currentSteps = onboardingPaths[selectedPath] || onboardingPaths.beginner;
  const totalSteps = Object.values(onboardingPaths).flat().length;
  const completedCount = completedSteps.size;
  const progress = (completedCount / totalSteps) * 100;

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const handleStartInteractiveTutorial = () => {
    onStartTutorial(selectedPath);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <SafeAnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Welcome to AI Workflow Studio</CardTitle>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Let's get you started with a personalized learning path. Choose your experience
                level and dive into building powerful AI workflows.
              </p>

              {progress > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>
                      {completedCount}/{totalSteps} completed
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Path Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['beginner', 'intermediate', 'advanced'] as const).map(path => (
                  <MotionDiv key={path} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedPath === path
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPath(path)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          {path === 'beginner' && <Target className="w-6 h-6 text-white" />}
                          {path === 'intermediate' && <Brain className="w-6 h-6 text-white" />}
                          {path === 'advanced' && <Rocket className="w-6 h-6 text-white" />}
                        </div>
                        <h3 className="font-semibold capitalize mb-1">{path}</h3>
                        <p className="text-sm text-muted-foreground">
                          {path === 'beginner' && 'New to AI workflows'}
                          {path === 'intermediate' && 'Some automation experience'}
                          {path === 'advanced' && 'Expert user'}
                        </p>
                      </CardContent>
                    </Card>
                  </MotionDiv>
                ))}
              </div>

              {/* Learning Path Steps */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Learning Path</h3>
                  <Badge variant="outline" className="capitalize">
                    {selectedPath} Track
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {currentSteps.map((step, index) => (
                    <MotionDiv
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`${completedSteps.has(step.id) ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : ''}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              {step.icon}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{step.title}</h4>
                                {completedSteps.has(step.id) && (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                              </div>

                              <p className="text-muted-foreground text-sm mb-3">
                                {step.description}
                              </p>

                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {step.estimatedTime}
                                  </span>
                                </div>

                                <Badge className={getDifficultyColor(step.difficulty)}>
                                  {step.difficulty}
                                </Badge>

                                <div className="flex items-center gap-1">
                                  {getCategoryIcon(step.category)}
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {step.category}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="text-sm font-medium mb-2">What you'll learn:</p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {step.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <Button
                                onClick={() => {
                                  step.action.onClick();
                                  handleStepComplete(step.id);
                                }}
                                disabled={completedSteps.has(step.id)}
                                className="w-full sm:w-auto"
                              >
                                {completedSteps.has(step.id) ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    {step.action.label}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={onClose}>
                  Skip for now
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={handleStartInteractiveTutorial}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Comprehensive Tutorial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </SafeAnimatePresence>
  );
};

export default SmartOnboarding;
