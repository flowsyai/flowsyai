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

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  Bot,
  FileText,
  Image,
  MessageSquare,
  BarChart,
  CheckCircle,
  Clock,
  ArrowRight,
  Lightbulb,
  Target,
  Sparkles,
} from 'lucide-react';
import { EnhancedAIModelService } from '@/services/enhancedAIModelService';
import { realAIService } from '@/services/realAIService';

interface DemoWorkflow {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: DemoStep[];
  useCase: string;
  expectedOutput: string;
  tags: string[];
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  type: 'input' | 'ai_processing' | 'output' | 'transformation';
  icon: React.ReactNode;
  duration: number;
  inputData?: Record<string, unknown>;
  expectedOutput?: Record<string, unknown>;
  aiModel?: string;
  prompt?: string;
}

interface InteractiveWorkflowDemoProps {
  onClose?: () => void;
}

const InteractiveWorkflowDemo: React.FC<InteractiveWorkflowDemoProps> = ({ onClose }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<DemoWorkflow | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepResults, setStepResults] = useState<Record<string, Record<string, unknown>>>({});
  const [progress, setProgress] = useState(0);

  const aiModelService = EnhancedAIModelService.getInstance();

  const demoWorkflows: DemoWorkflow[] = [
    {
      id: 'content-creation',
      title: 'AI Content Creation Pipeline',
      description: 'Generate blog posts, social media content, and marketing copy automatically',
      category: 'Content Creation',
      difficulty: 'beginner',
      estimatedTime: '3-5 minutes',
      useCase:
        'Marketing teams need to create consistent, high-quality content across multiple channels',
      expectedOutput: 'Complete content package with blog post, social media posts, and email copy',
      tags: ['content', 'marketing', 'automation', 'social media'],
      steps: [
        {
          id: 'topic-input',
          title: 'Topic Input',
          description: 'Define the content topic and target audience',
          type: 'input',
          icon: <FileText className="w-5 h-5" />,
          duration: 1000,
          inputData: {
            topic: 'AI in Healthcare',
            audience: 'Healthcare professionals',
            tone: 'Professional and informative',
          },
        },
        {
          id: 'blog-generation',
          title: 'Blog Post Generation',
          description: 'AI generates comprehensive blog post',
          type: 'ai_processing',
          icon: <Bot className="w-5 h-5" />,
          duration: 3000,
          aiModel: 'gpt-4-turbo',
          prompt: 'blog-post-writer',
        },
        {
          id: 'social-media-adaptation',
          title: 'Social Media Adaptation',
          description: 'Convert blog content to social media posts',
          type: 'ai_processing',
          icon: <MessageSquare className="w-5 h-5" />,
          duration: 2000,
          aiModel: 'gpt-3.5-turbo',
          prompt: 'social-media-content',
        },
        {
          id: 'final-output',
          title: 'Content Package',
          description: 'Complete content package ready for publication',
          type: 'output',
          icon: <CheckCircle className="w-5 h-5" />,
          duration: 1000,
          expectedOutput: {
            blogPost: '1500-word comprehensive article',
            socialPosts: '5 platform-specific posts',
            emailCopy: 'Newsletter-ready content',
          },
        },
      ],
    },
    {
      id: 'data-analysis',
      title: 'Automated Data Analysis',
      description: 'Analyze datasets and generate insights with AI-powered recommendations',
      category: 'Data Analysis',
      difficulty: 'intermediate',
      estimatedTime: '4-6 minutes',
      useCase: 'Business analysts need quick insights from complex datasets',
      expectedOutput: 'Comprehensive analysis report with visualizations and recommendations',
      tags: ['data', 'analysis', 'insights', 'business intelligence'],
      steps: [
        {
          id: 'data-upload',
          title: 'Data Upload',
          description: 'Upload and validate dataset',
          type: 'input',
          icon: <BarChart className="w-5 h-5" />,
          duration: 1500,
          inputData: {
            dataset: 'Sales data Q1-Q4 2023',
            format: 'CSV',
            rows: 10000,
          },
        },
        {
          id: 'data-processing',
          title: 'AI Data Processing',
          description: 'AI analyzes patterns and trends',
          type: 'ai_processing',
          icon: <Bot className="w-5 h-5" />,
          duration: 4000,
          aiModel: 'claude-3-sonnet',
          prompt: 'data-analyzer',
        },
        {
          id: 'insight-generation',
          title: 'Insight Generation',
          description: 'Generate actionable business insights',
          type: 'transformation',
          icon: <Lightbulb className="w-5 h-5" />,
          duration: 2500,
        },
        {
          id: 'report-output',
          title: 'Analysis Report',
          description: 'Complete analysis with recommendations',
          type: 'output',
          icon: <CheckCircle className="w-5 h-5" />,
          duration: 1000,
          expectedOutput: {
            insights: '12 key business insights',
            recommendations: '8 actionable recommendations',
            visualizations: '6 charts and graphs',
          },
        },
      ],
    },
    {
      id: 'customer-service',
      title: 'AI Customer Service Automation',
      description: 'Automate customer inquiries with intelligent response generation',
      category: 'Customer Service',
      difficulty: 'intermediate',
      estimatedTime: '2-4 minutes',
      useCase: 'Support teams need to handle high volumes of customer inquiries efficiently',
      expectedOutput: 'Personalized, professional customer responses with escalation handling',
      tags: ['customer service', 'automation', 'support', 'communication'],
      steps: [
        {
          id: 'inquiry-input',
          title: 'Customer Inquiry',
          description: 'Receive and categorize customer message',
          type: 'input',
          icon: <MessageSquare className="w-5 h-5" />,
          duration: 1000,
          inputData: {
            message: "My order hasn't arrived and it's been 2 weeks",
            customerTier: 'Premium',
            orderHistory: 'Frequent customer',
          },
        },
        {
          id: 'sentiment-analysis',
          title: 'Sentiment Analysis',
          description: 'AI analyzes customer sentiment and urgency',
          type: 'ai_processing',
          icon: <Bot className="w-5 h-5" />,
          duration: 2000,
          aiModel: 'gpt-4-turbo',
        },
        {
          id: 'response-generation',
          title: 'Response Generation',
          description: 'Generate personalized, empathetic response',
          type: 'ai_processing',
          icon: <Bot className="w-5 h-5" />,
          duration: 2500,
          aiModel: 'claude-3-sonnet',
          prompt: 'customer-service-response',
        },
        {
          id: 'response-output',
          title: 'Customer Response',
          description: 'Professional response ready to send',
          type: 'output',
          icon: <CheckCircle className="w-5 h-5" />,
          duration: 1000,
          expectedOutput: {
            response: 'Personalized apology and solution',
            escalation: 'Automatic escalation to manager',
            followUp: 'Scheduled follow-up reminder',
          },
        },
      ],
    },
  ];

  const executeStep = async (step: DemoStep, workflowData: Record<string, unknown>) => {
    setProgress((currentStep / selectedWorkflow!.steps.length) * 100);

    // Simulate step execution with real AI processing
    await new Promise(resolve => setTimeout(resolve, step.duration));

    let result = {};

    if (step.type === 'ai_processing' && step.aiModel && step.prompt) {
      try {
        // Try to use real AI service
        const aiResult = await realAIService.executeWorkflowNode({
          id: step.id,
          type: step.type,
          name: step.title,
          inputs: workflowData,
        });

        if (aiResult.success) {
          result = aiResult.data;
        } else {
          // Fallback to simulated result
          result = generateSimulatedResult(step);
        }
      } catch (error) {
        // Fallback to simulated result
        result = generateSimulatedResult(step);
      }
    } else {
      result = step.expectedOutput || generateSimulatedResult(step);
    }

    setStepResults(prev => ({
      ...prev,
      [step.id]: result,
    }));

    return result;
  };

  const generateSimulatedResult = (step: DemoStep) => {
    switch (step.type) {
      case 'ai_processing':
        return {
          processed: true,
          timestamp: new Date().toISOString(),
          result: `AI-generated result for ${step.title}`,
          confidence: 0.95,
        };
      case 'output':
        return (
          step.expectedOutput || {
            success: true,
            output: `Generated output for ${step.title}`,
          }
        );
      default:
        return step.inputData || { processed: true };
    }
  };

  const playWorkflow = async () => {
    if (!selectedWorkflow) return;

    setIsPlaying(true);
    setCurrentStep(0);
    setStepResults({});
    setProgress(0);

    let workflowData = {};

    for (let i = 0; i < selectedWorkflow.steps.length; i++) {
      setCurrentStep(i);
      const step = selectedWorkflow.steps[i];
      const result = await executeStep(step, workflowData);
      workflowData = { ...workflowData, [step.id]: result };
    }

    setProgress(100);
    setIsPlaying(false);
  };

  const resetWorkflow = () => {
    setCurrentStep(0);
    setStepResults({});
    setProgress(0);
    setIsPlaying(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-semibold">Interactive AI Workflow Demo</span>
              </div>
              {onClose && (
                <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
                  Close
                </Button>
              )}
            </div>

            {!selectedWorkflow ? (
              <>
                <CardTitle className="text-2xl mb-2">Choose a Workflow Demo</CardTitle>
                <CardDescription>
                  Experience real AI workflows in action with live processing and results
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl mb-2">{selectedWorkflow.title}</CardTitle>
                <CardDescription>{selectedWorkflow.description}</CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="max-h-[70vh] overflow-y-auto">
            {!selectedWorkflow ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoWorkflows.map(workflow => (
                  <MotionDiv
                    key={workflow.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="cursor-pointer transition-all duration-200 hover:shadow-lg"
                      onClick={() => setSelectedWorkflow(workflow)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-semibold text-lg">{workflow.title}</h3>
                          <Badge className={getDifficultyColor(workflow.difficulty)}>
                            {workflow.difficulty}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-4">{workflow.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2" />
                            {workflow.estimatedTime}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Target className="w-4 h-4 mr-2" />
                            {workflow.category}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {workflow.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Try This Demo
                        </Button>
                      </CardContent>
                    </Card>
                  </MotionDiv>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Workflow Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={playWorkflow}
                      disabled={isPlaying}
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Running...' : 'Start Demo'}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={resetWorkflow}
                      disabled={isPlaying}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>

                  <Button variant="ghost" onClick={() => setSelectedWorkflow(null)}>
                    ← Back to Demos
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>

                {/* Workflow Steps */}
                <div className="space-y-4">
                  {selectedWorkflow.steps.map((step, index) => (
                    <MotionDiv
                      key={step.id}
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.5,
                        scale: index === currentStep && isPlaying ? 1.02 : 1,
                      }}
                      className={`border rounded-lg p-4 ${
                        index === currentStep && isPlaying
                          ? 'border-primary bg-primary/5'
                          : index < currentStep
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : 'border-border'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-lg ${
                            index < currentStep
                              ? 'bg-green-500 text-white'
                              : index === currentStep && isPlaying
                                ? 'bg-primary text-white'
                                : 'bg-muted'
                          }`}
                        >
                          {index < currentStep ? <CheckCircle className="w-5 h-5" /> : step.icon}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-muted-foreground text-sm">{step.description}</p>

                          {stepResults[step.id] && (
                            <div className="mt-2 p-2 bg-muted rounded text-sm">
                              <strong>Result:</strong>{' '}
                              {JSON.stringify(stepResults[step.id], null, 2)}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {step.type.replace('_', ' ')}
                          </Badge>
                          {step.aiModel && (
                            <div className="text-xs text-muted-foreground mt-1">{step.aiModel}</div>
                          )}
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </div>

                {/* Use Case and Expected Output */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Use Case</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{selectedWorkflow.useCase}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Expected Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{selectedWorkflow.expectedOutput}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default InteractiveWorkflowDemo;
