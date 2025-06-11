import React, { useState } from 'react';
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
  ArrowRight,
  ArrowLeft,
  Check,
  Bot,
  Zap,
  Database,
  Users,
  Play,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WorkflowTemplateService } from '@/services/workflowTemplateService';
import { WorkflowTemplate } from '@/types/nodeTemplates';

interface WorkflowOnboardingProps {
  onComplete: (template?: WorkflowTemplate) => void;
  onSkip: () => void;
}

const WorkflowOnboarding: React.FC<WorkflowOnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);

  const templateService = WorkflowTemplateService.getInstance();

  const steps = [
    {
      title: 'Welcome to AI Workflow Studio',
      subtitle: 'Build powerful AI automations without code',
      content: 'WelcomeStep',
    },
    {
      title: 'What would you like to automate?',
      subtitle: 'Choose your primary use case',
      content: 'UseCaseStep',
    },
    {
      title: 'Choose a template to get started',
      subtitle: "We'll help you build your first workflow",
      content: 'TemplateStep',
    },
    {
      title: "You're all set!",
      subtitle: "Let's create your first AI workflow",
      content: 'CompletionStep',
    },
  ];

  const useCases = [
    {
      id: 'customer_support',
      title: 'Customer Support',
      description: 'Automate customer inquiries and support tickets',
      icon: <Users className="w-8 h-8" />,
      benefits: ['24/7 availability', 'Instant responses', 'Smart routing'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'content_generation',
      title: 'Content Creation',
      description: 'Generate blogs, social media, and marketing content',
      icon: <Bot className="w-8 h-8" />,
      benefits: ['10x faster creation', 'Consistent quality', 'Multi-platform'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'data_processing',
      title: 'Data Analysis',
      description: 'Process and analyze data with AI insights',
      icon: <Database className="w-8 h-8" />,
      benefits: ['Automated insights', 'Pattern detection', 'Smart reports'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'marketing_automation',
      title: 'Marketing Automation',
      description: 'Personalized campaigns and lead nurturing',
      icon: <TrendingUp className="w-8 h-8" />,
      benefits: ['Higher conversion', 'Personalization', 'Auto-optimization'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(selectedTemplate || undefined);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUseCaseSelect = (useCaseId: string) => {
    setSelectedUseCase(useCaseId);
    // Auto-advance to template selection
    setTimeout(() => {
      setCurrentStep(2);
    }, 500);
  };

  const handleTemplateSelect = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
  };

  const getRecommendedTemplates = () => {
    if (!selectedUseCase) return templateService.getFeaturedTemplates();
    return templateService.getTemplatesByCategory(selectedUseCase);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return (
          <UseCaseStep
            useCases={useCases}
            selectedUseCase={selectedUseCase}
            onSelect={handleUseCaseSelect}
          />
        );
      case 2:
        return (
          <TemplateStep
            templates={getRecommendedTemplates()}
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
          />
        );
      case 3:
        return <CompletionStep selectedTemplate={selectedTemplate} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return selectedUseCase !== '';
      case 2:
        return selectedTemplate !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-semibold">AI Workflow Studio</span>
              </div>
              <Button variant="ghost" onClick={onSkip} className="text-muted-foreground">
                Skip
              </Button>
            </div>

            <Progress value={(currentStep / (steps.length - 1)) * 100} className="mb-4" />

            <CardTitle className="text-2xl mb-2">{steps[currentStep].title}</CardTitle>
            <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
          </CardHeader>

          <CardContent className="min-h-[400px]">
            <SafeAnimatePresence mode="wait">
              <MotionDiv
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </MotionDiv>
            </SafeAnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex items-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Play className="w-4 h-4" />
                    Get Started
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
};

const WelcomeStep: React.FC = () => (
  <div className="text-center space-y-6">
    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
      <Zap className="w-12 h-12 text-white" />
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Create powerful AI automations in minutes</h3>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Our visual workflow builder lets you connect AI models, data sources, and applications
        without writing a single line of code. Let's build your first automation together.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="text-center p-4">
        <Bot className="w-8 h-8 mx-auto mb-2 text-primary" />
        <h4 className="font-medium">AI-Powered</h4>
        <p className="text-sm text-muted-foreground">Advanced AI models at your fingertips</p>
      </div>
      <div className="text-center p-4">
        <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
        <h4 className="font-medium">No-Code</h4>
        <p className="text-sm text-muted-foreground">Visual drag-and-drop interface</p>
      </div>
      <div className="text-center p-4">
        <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
        <h4 className="font-medium">Results-Driven</h4>
        <p className="text-sm text-muted-foreground">Measurable automation outcomes</p>
      </div>
    </div>
  </div>
);

interface UseCaseStepProps {
  useCases: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    benefits: string[];
  }>;
  selectedUseCase: string;
  onSelect: (id: string) => void;
}

const UseCaseStep: React.FC<UseCaseStepProps> = ({ useCases, selectedUseCase, onSelect }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {useCases.map(useCase => (
        <MotionDiv key={useCase.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedUseCase === useCase.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => onSelect(useCase.id)}
          >
            <CardContent className="p-6">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center text-white mb-4`}
              >
                {useCase.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground mb-4">{useCase.description}</p>

              <div className="space-y-1">
                {useCase.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      ))}
    </div>
  </div>
);

interface TemplateStepProps {
  templates: WorkflowTemplate[];
  selectedTemplate: WorkflowTemplate | null;
  onSelect: (template: WorkflowTemplate) => void;
}

const TemplateStep: React.FC<TemplateStepProps> = ({ templates, selectedTemplate, onSelect }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.slice(0, 4).map(template => (
        <MotionDiv key={template.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedTemplate?.id === template.id
                ? 'ring-2 ring-primary shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelect(template)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-sm">{template.name}</h3>
                {template.featured && <Badge className="text-xs">Featured</Badge>}
              </div>

              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {template.description}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{template.estimatedTime}m setup</span>
                <span>{template.downloads} downloads</span>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      ))}
    </div>
  </div>
);

interface CompletionStepProps {
  selectedTemplate: WorkflowTemplate | null;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ selectedTemplate }) => (
  <div className="text-center space-y-6">
    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
      <Check className="w-12 h-12 text-white" />
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Perfect! You're ready to build</h3>
      {selectedTemplate ? (
        <p className="text-muted-foreground">
          We'll create a new workflow based on the <strong>{selectedTemplate.name}</strong>{' '}
          template. You can customize it to fit your specific needs.
        </p>
      ) : (
        <p className="text-muted-foreground">
          We'll open the workflow builder where you can start creating your automation from scratch.
        </p>
      )}
    </div>

    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="font-medium mb-2">What happens next?</h4>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span>Open the visual workflow builder</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span>Configure your AI nodes and connections</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span>Test and deploy your automation</span>
        </div>
      </div>
    </div>
  </div>
);

export default WorkflowOnboarding;
