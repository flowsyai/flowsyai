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
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Bot,
  Workflow,
  Target,
  Play,
  Zap,
  Crown,
  Users,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  highlight?: string;
  tips?: string[];
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose, onComplete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: `Welcome to Bot Architect Studio, ${user?.fullName || user?.username || 'there'}!`,
      description:
        "Your AI-powered automation platform is ready. Let's get you started with a quick tour of the most important features.",
      icon: <Sparkles className="h-8 w-8 text-gold" />,
      tips: [
        'This tour takes about 2 minutes',
        'You can skip it anytime and return later',
        'All features are available immediately',
      ],
    },
    {
      id: 'dashboard',
      title: 'Your Command Center',
      description:
        'This is your Account Dashboard - your central hub for managing all AI workflows and agents. Here you can see your usage statistics, recent activity, and quick actions.',
      icon: <Target className="h-8 w-8 text-primary" />,
      highlight: 'account-dashboard',
      tips: [
        'Real-time statistics update automatically',
        'Quick actions provide instant access to key features',
        'Recent activity shows your latest work',
      ],
    },
    {
      id: 'builder',
      title: 'AI Workflow Builder',
      description:
        'The heart of Bot Architect Studio - a visual drag-and-drop interface where you create intelligent automation workflows. Connect AI agents, databases, APIs, and more.',
      icon: <Workflow className="h-8 w-8 text-sapphire" />,
      action: {
        label: 'Try the Builder',
        onClick: () => navigate('/workflow-builder'),
      },
      tips: [
        'Drag nodes from the sidebar to create workflows',
        'Connect nodes to define the flow of data',
        'Each node can be configured with custom settings',
      ],
    },
    {
      id: 'agents',
      title: 'AI Agents',
      description:
        'Create intelligent agents that can handle specific tasks - from content creation to data analysis. Each agent can be customized with different AI models and configurations.',
      icon: <Bot className="h-8 w-8 text-gold" />,
      tips: [
        'Agents can work independently or as part of workflows',
        'Configure different AI models for different tasks',
        'Monitor agent performance and activity',
      ],
    },
    {
      id: 'projects',
      title: 'Project Management',
      description:
        'Organize all your workflows and AI agents in one place. Search, filter, duplicate, and manage your entire automation ecosystem.',
      icon: <Users className="h-8 w-8 text-green-500" />,
      action: {
        label: 'View Projects',
        onClick: () => navigate('/projects'),
      },
      tips: [
        'Use tabs to switch between workflows and agents',
        'Search and filter to find specific projects quickly',
        'Duplicate successful workflows to save time',
      ],
    },
    {
      id: 'premium',
      title: 'Unlock Premium Features',
      description: user?.isPremium
        ? 'You have Premium access! Enjoy unlimited workflows, advanced AI models, and priority support.'
        : 'Upgrade to Premium for unlimited workflows, advanced AI capabilities, priority support, and exclusive features.',
      icon: <Crown className="h-8 w-8 text-gold" />,
      action: !user?.isPremium
        ? {
            label: 'View Premium Plans',
            onClick: () => navigate('/billing'),
          }
        : undefined,
      tips: user?.isPremium
        ? [
            'Unlimited workflows and AI agents',
            'Access to GPT-4 and advanced models',
            'Priority customer support',
            'Advanced analytics and insights',
          ]
        : [
            'Free plan: 3 workflows, basic AI models',
            'Premium: Unlimited everything + advanced features',
            'Cancel anytime, no long-term commitments',
          ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, steps[currentStep].id]);
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => [...prev, steps[currentStep].id]);
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_completed_at', new Date().toISOString());
    toast.success("Welcome aboard! You're all set to start building amazing AI workflows.");
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_skipped', 'true');
    onClose();
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (!isOpen) return null;

  return (
    <SafeAnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <MotionDiv
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <GlassCard className="premium-card bg-card/95 backdrop-blur-xl border border-border-alt shadow-2xl">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Getting Started</h3>
                    <p className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {steps.length}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <MotionDiv
                    className="bg-gradient-to-r from-primary to-sapphire h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <MotionDiv
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-sapphire/10 rounded-xl">
                    {currentStepData.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      {currentStepData.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>

                {/* Tips */}
                {currentStepData.tips && (
                  <div className="bg-background/50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gold" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2">
                      {currentStepData.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                {currentStepData.action && (
                  <div className="mb-6">
                    <Button
                      onClick={currentStepData.action.onClick}
                      className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {currentStepData.action.label}
                    </Button>
                  </div>
                )}
              </MotionDiv>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentStep ? 'bg-primary' : 'bg-muted/30'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/20"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Get Started
                      <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Skip Option */}
              <div className="text-center mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip tour and explore on my own
                </Button>
              </div>
            </div>
          </GlassCard>
        </MotionDiv>
      </MotionDiv>
    </SafeAnimatePresence>
  );
};

export default OnboardingFlow;
