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
  Play,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
  BookOpen,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for highlighting
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'drag' | 'type' | 'observe';
  content: React.ReactNode;
  validation?: () => boolean;
  tips?: string[];
}

interface InteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  tutorialType: 'beginner' | 'intermediate' | 'advanced';
}

const tutorialSteps: Record<string, TutorialStep[]> = {
  beginner: [
    {
      id: 'welcome',
      title: 'Welcome to AI Workflow Studio',
      description: "Let's build your first AI workflow together!",
      position: 'center',
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-muted-foreground">
            This interactive tutorial will guide you through creating powerful AI workflows step by
            step.
          </p>
        </div>
      ),
      tips: ['Take your time to explore each feature', 'You can restart this tutorial anytime'],
    },
    {
      id: 'node-library',
      title: 'Explore the Node Library',
      description: 'This sidebar contains all available AI components',
      target: '.w-80.border-r',
      position: 'right',
      action: 'observe',
      content: (
        <div className="space-y-3">
          <p>The Node Library contains different categories of AI components:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>
                <strong>AI Models:</strong> GPT, Claude, and other AI engines
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>
                <strong>Data Processing:</strong> Transform and filter data
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>
                <strong>Integrations:</strong> Connect to external services
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>
                <strong>Triggers:</strong> Start your workflows automatically
              </span>
            </li>
          </ul>
        </div>
      ),
      tips: ['Each node has specific capabilities', 'Drag nodes to the canvas to use them'],
    },
    {
      id: 'first-node',
      title: 'Add Your First Node',
      description: 'Drag a trigger node to the canvas to start',
      target: '[data-category="triggers"]',
      position: 'right',
      action: 'drag',
      content: (
        <div className="space-y-3">
          <p>Let's start with a trigger node:</p>
          <ol className="space-y-2 text-sm">
            <li>1. Click on the "Triggers" tab if not already selected</li>
            <li>2. Find the "Manual Trigger" node</li>
            <li>3. Drag it to the canvas area</li>
          </ol>
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 Triggers define how your workflow starts - manually, on schedule, or by events.
            </p>
          </div>
        </div>
      ),
      validation: () => document.querySelectorAll('[data-node-type="trigger"]').length > 0,
      tips: ['Triggers are the starting point of every workflow'],
    },
  ],
  intermediate: [
    {
      id: 'advanced-connections',
      title: 'Advanced Node Connections',
      description: 'Learn to create complex data flows',
      position: 'center',
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold">Building Complex Workflows</h3>
          <p>Now that you know the basics, let's explore advanced patterns:</p>
          <ul className="space-y-2 text-sm">
            <li>• Conditional branching</li>
            <li>• Parallel processing</li>
            <li>• Error handling</li>
            <li>• Data transformation chains</li>
          </ul>
        </div>
      ),
    },
  ],
  advanced: [
    {
      id: 'optimization',
      title: 'Workflow Optimization',
      description: 'Master performance and scalability',
      position: 'center',
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold">Advanced Optimization Techniques</h3>
          <p>Learn to build enterprise-grade workflows:</p>
          <ul className="space-y-2 text-sm">
            <li>• Performance monitoring</li>
            <li>• Resource optimization</li>
            <li>• Scalability patterns</li>
            <li>• Advanced debugging</li>
          </ul>
        </div>
      ),
    },
  ],
};

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  isOpen,
  onClose,
  onComplete,
  tutorialType,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);

  const steps = tutorialSteps[tutorialType] || tutorialSteps.beginner;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    if (!isOpen || !currentStepData?.target) return;

    const element = document.querySelector(currentStepData.target);
    if (element) {
      setHighlightedElement(element);
      // Cache the element's position to avoid forced reflows during render
      const rect = element.getBoundingClientRect();
      setElementRect(rect);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      setHighlightedElement(null);
      setElementRect(null);
    };
  }, [currentStep, isOpen, currentStepData?.target]);

  const handleNext = () => {
    if (currentStepData.validation && !currentStepData.validation()) {
      return; // Don't proceed if validation fails
    }

    setCompletedSteps(prev => new Set([...prev, currentStepData.id]));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <SafeAnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay with highlight */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
          {highlightedElement && elementRect && (
            <div
              className="absolute border-2 border-primary rounded-lg shadow-lg pointer-events-none"
              style={{
                top: elementRect.top - 4,
                left: elementRect.left - 4,
                width: elementRect.width + 8,
                height: elementRect.height + 8,
              }}
            />
          )}
        </div>

        {/* Tutorial Card */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {steps.length}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{currentStepData.description}</p>

              {currentStepData.content}

              {currentStepData.action && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Action:{' '}
                    {currentStepData.action.charAt(0).toUpperCase() +
                      currentStepData.action.slice(1)}
                  </span>
                </div>
              )}

              {currentStepData.tips && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Tips:</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {currentStepData.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {completedSteps.has(currentStepData.id) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <Button onClick={handleNext} className="flex items-center gap-2">
                    {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                    {currentStep === steps.length - 1 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
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

export default InteractiveTutorial;
