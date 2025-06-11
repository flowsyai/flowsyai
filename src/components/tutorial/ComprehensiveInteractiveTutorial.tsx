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
  AlertCircle,
  Trophy,
  Code,
  Database,
  Bot,
  Link,
  Eye,
  Settings,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TutorialExercise {
  id: string;
  title: string;
  description: string;
  objective: string;
  instructions: string[];
  hints: string[];
  validation: {
    type: 'node_count' | 'connection_count' | 'node_type' | 'workflow_execution' | 'custom';
    criteria: Record<string, unknown>;
    message: string;
  };
  sampleData?: Record<string, unknown>;
  expectedOutput?: string | Record<string, unknown>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: 'basics' | 'ai_models' | 'data_flow' | 'integrations' | 'debugging';
}

interface ComprehensiveInteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  tutorialLevel: 'beginner' | 'intermediate' | 'advanced';
  workflowBuilder: {
    getWorkflowState: () => {
      nodes: Array<{ id: string; type: string; data?: unknown }>;
      edges: Array<{ id: string; source: string; target: string }>;
    };
    testExecution: (
      sampleData: Record<string, unknown>
    ) => Promise<{ success: boolean; result?: unknown }>;
  };
}

const tutorialExercises: Record<string, TutorialExercise[]> = {
  beginner: [
    {
      id: 'first_workflow',
      title: 'Your First AI Workflow',
      description: 'Learn to create a simple text processing workflow using AI',
      objective: 'Build a workflow that processes text input through an AI model',
      instructions: [
        'Drag a "Manual Trigger" node from the Triggers category to the canvas',
        'Add a "Text Input" node from the Data category',
        'Add a "GPT-4" node from the AI Models category',
        'Connect the Manual Trigger to Text Input',
        'Connect Text Input to GPT-4',
        'Configure the GPT-4 node with a simple prompt',
        'Test your workflow with sample text',
      ],
      hints: [
        'Look for the blue connection ports on the right side of nodes (outputs)',
        'Green ports on the left side are inputs',
        'Click and drag from output to input to create connections',
        'The workflow should flow from left to right',
      ],
      validation: {
        type: 'node_count',
        criteria: { minNodes: 3, requiredTypes: ['trigger', 'data', 'ai'] },
        message: "Great! You've created your first AI workflow with proper node connections.",
      },
      sampleData: {
        text: 'Hello, this is a test message for AI processing.',
      },
      expectedOutput: 'AI-processed response based on the input text',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      category: 'basics',
    },
    {
      id: 'data_transformation',
      title: 'Data Flow and Transformation',
      description: 'Learn how data flows through nodes and gets transformed',
      objective: 'Create a workflow that transforms data through multiple steps',
      instructions: [
        'Start with a "Webhook Trigger" node',
        'Add a "JSON Parser" node to process incoming data',
        'Add a "Text Filter" node to clean the data',
        'Add a "Data Mapper" node to restructure the data',
        'Connect all nodes in sequence',
        'Configure each node with appropriate settings',
        'Test with sample JSON data',
      ],
      hints: [
        'Each node transforms data before passing it to the next',
        'Check the data preview in each node to see transformations',
        'Use the debug mode to trace data flow',
        'Hover over connections to see data types',
      ],
      validation: {
        type: 'connection_count',
        criteria: { minConnections: 3, sequentialFlow: true },
        message: 'Excellent! You understand how data flows and transforms through nodes.',
      },
      sampleData: {
        json: '{"user": "John", "message": "Hello World!", "timestamp": "2024-01-01"}',
      },
      difficulty: 'beginner',
      estimatedTime: '15 minutes',
      category: 'data_flow',
    },
  ],
  intermediate: [
    {
      id: 'conditional_workflow',
      title: 'Conditional Logic and Branching',
      description: 'Build workflows with conditional paths and decision points',
      objective: 'Create a workflow that branches based on conditions',
      instructions: [
        'Create a workflow that processes customer feedback',
        'Add a "Sentiment Analysis" AI node',
        'Add a "Condition" node to check sentiment score',
        'Create two branches: positive and negative feedback',
        'Add different AI responses for each branch',
        'Add a "Merge" node to combine results',
        'Test with different sentiment examples',
      ],
      hints: [
        'Condition nodes create multiple output paths',
        'Use sentiment score thresholds (e.g., > 0.5 for positive)',
        'Each branch can have different processing logic',
        'Merge nodes combine results from multiple paths',
      ],
      validation: {
        type: 'custom',
        criteria: { hasBranching: true, hasCondition: true, hasMerge: true },
        message: "Outstanding! You've mastered conditional workflow logic.",
      },
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      category: 'ai_models',
    },
    {
      id: 'api_integration',
      title: 'External API Integration',
      description: 'Connect your workflow to external services and APIs',
      objective: 'Build a workflow that integrates with external APIs',
      instructions: [
        'Create a workflow that fetches weather data',
        'Add an "HTTP Request" node to call weather API',
        'Add a "JSON Parser" to process the response',
        'Add a "GPT-4" node to generate weather summary',
        'Add a "Slack" node to send the summary',
        'Configure API authentication and parameters',
        'Test the complete integration',
      ],
      hints: [
        'Use environment variables for API keys',
        'Check API documentation for correct endpoints',
        'Handle API errors with try-catch nodes',
        'Test with mock data first',
      ],
      validation: {
        type: 'node_type',
        criteria: { requiredTypes: ['http', 'parser', 'ai', 'integration'] },
        message: 'Fantastic! You can now integrate any external service.',
      },
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      category: 'integrations',
    },
  ],
  advanced: [
    {
      id: 'error_handling',
      title: 'Advanced Error Handling and Debugging',
      description: 'Master error handling, retries, and debugging techniques',
      objective: 'Build a robust workflow with comprehensive error handling',
      instructions: [
        'Create a complex workflow with multiple AI models',
        'Add "Try-Catch" nodes around critical operations',
        'Implement retry logic for failed API calls',
        'Add logging nodes for debugging',
        'Create fallback paths for different error types',
        'Add monitoring and alerting nodes',
        'Test error scenarios and recovery',
      ],
      hints: [
        'Use exponential backoff for retries',
        'Log detailed error information for debugging',
        'Create user-friendly error messages',
        'Monitor workflow performance metrics',
      ],
      validation: {
        type: 'custom',
        criteria: { hasErrorHandling: true, hasRetries: true, hasLogging: true },
        message: "Exceptional! You're now a workflow architecture expert.",
      },
      difficulty: 'advanced',
      estimatedTime: '30 minutes',
      category: 'debugging',
    },
  ],
};

const ComprehensiveInteractiveTutorial: React.FC<ComprehensiveInteractiveTutorialProps> = ({
  isOpen,
  onClose,
  onComplete,
  tutorialLevel,
  workflowBuilder,
}) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const exercises = tutorialExercises[tutorialLevel] || tutorialExercises.beginner;
  const currentExerciseData = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  const validateExercise = useCallback(async () => {
    if (!currentExerciseData || !workflowBuilder) return;

    setIsValidating(true);

    try {
      // Get current workflow state from the builder
      const workflowState = workflowBuilder.getWorkflowState();
      const validation = currentExerciseData.validation;

      let isValid = false;
      let message = '';

      switch (validation.type) {
        case 'node_count': {
          const nodeCount = workflowState.nodes.length;
          const requiredTypes = validation.criteria.requiredTypes as string[] | undefined;
          const hasRequiredTypes =
            requiredTypes?.every((type: string) =>
              workflowState.nodes.some(node => node.type.includes(type))
            ) ?? true;
          const minNodes = validation.criteria.minNodes as number;
          isValid = nodeCount >= minNodes && hasRequiredTypes;
          message = isValid
            ? validation.message
            : `Add ${minNodes - nodeCount} more nodes and ensure you have the required node types.`;
          break;
        }

        case 'connection_count': {
          const connectionCount = workflowState.edges.length;
          const minConnections = validation.criteria.minConnections as number;
          isValid = connectionCount >= minConnections;
          message = isValid
            ? validation.message
            : `Create ${minConnections - connectionCount} more connections between nodes.`;
          break;
        }

        case 'workflow_execution':
          // Test workflow execution
          try {
            const result = await workflowBuilder.testExecution(currentExerciseData.sampleData);
            isValid = result.success;
            message = isValid
              ? validation.message
              : 'Workflow execution failed. Check your node configurations and connections.';
          } catch (error) {
            isValid = false;
            message = 'Workflow execution error. Please review your setup.';
          }
          break;

        default:
          isValid = true;
          message = validation.message;
      }

      setValidationResult({ isValid, message });

      if (isValid) {
        setCompletedExercises(prev => new Set([...prev, currentExerciseData.id]));
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: 'Validation error. Please try again.',
      });
    } finally {
      setIsValidating(false);
    }
  }, [currentExerciseData, workflowBuilder]);

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setCurrentStep(0);
      setValidationResult(null);
      setShowHints(false);
    } else {
      onComplete();
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setCurrentStep(0);
      setValidationResult(null);
      setShowHints(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basics':
        return <Target className="w-4 h-4" />;
      case 'ai_models':
        return <Bot className="w-4 h-4" />;
      case 'data_flow':
        return <Database className="w-4 h-4" />;
      case 'integrations':
        return <Link className="w-4 h-4" />;
      case 'debugging':
        return <Code className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
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
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {getCategoryIcon(currentExerciseData?.category || 'basics')}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentExerciseData?.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={getDifficultyColor(
                          currentExerciseData?.difficulty || 'beginner'
                        )}
                      >
                        {currentExerciseData?.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        Exercise {currentExercise + 1} of {exercises.length}
                      </Badge>
                      <Badge variant="outline">{currentExerciseData?.estimatedTime}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Progress value={progress} className="h-2 mt-4" />
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Exercise Description */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Objective</h3>
                <p className="text-muted-foreground">{currentExerciseData?.objective}</p>
                <p className="text-sm">{currentExerciseData?.description}</p>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Step-by-Step Instructions</h3>
                <div className="space-y-2">
                  {currentExerciseData?.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        index === currentStep
                          ? 'bg-primary/10 border-primary'
                          : index < currentStep
                            ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                            : 'bg-muted/50'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          index < currentStep
                            ? 'bg-green-500 text-white'
                            : index === currentStep
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <p className="text-sm flex-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hints */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Helpful Hints</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowHints(!showHints)}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHints ? 'Hide Hints' : 'Show Hints'}
                  </Button>
                </div>

                <SafeAnimatePresence>
                  {showHints && (
                    <MotionDiv
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {currentExerciseData?.hints.map((hint, index) => (
                        <Alert
                          key={index}
                          className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800"
                        >
                          <Lightbulb className="w-4 h-4 text-yellow-600" />
                          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                            {hint}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </MotionDiv>
                  )}
                </SafeAnimatePresence>
              </div>

              {/* Sample Data */}
              {currentExerciseData?.sampleData && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Sample Data for Testing</h3>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(currentExerciseData.sampleData, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Validation Result */}
              {validationResult && (
                <Alert
                  className={
                    validationResult.isValid
                      ? 'border-green-200 bg-green-50 dark:bg-green-950'
                      : 'border-red-200 bg-red-50 dark:bg-red-950'
                  }
                >
                  {validationResult.isValid ? (
                    <Trophy className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <AlertDescription
                    className={
                      validationResult.isValid
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }
                  >
                    {validationResult.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handlePreviousExercise}
                  disabled={currentExercise === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Exercise
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={validateExercise} disabled={isValidating}>
                    <Eye className="w-4 h-4 mr-2" />
                    {isValidating ? 'Checking...' : 'Check My Work'}
                  </Button>

                  <Button onClick={handleNextExercise} disabled={!validationResult?.isValid}>
                    {currentExercise === exercises.length - 1 ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Complete Tutorial
                      </>
                    ) : (
                      <>
                        Next Exercise
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
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

export default ComprehensiveInteractiveTutorial;
