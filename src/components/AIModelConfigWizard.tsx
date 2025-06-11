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
  Bot,
  Zap,
  Settings,
  TestTube,
  Save,
  Sparkles,
  Brain,
  MessageSquare,
  Image,
  FileText,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIProvider, AIModelConfig } from '@/types/nodeTemplates';
import { EnhancedAIModelService, AIModel, PromptTemplate } from '@/services/enhancedAIModelService';

interface AIModelConfigWizardProps {
  initialConfig?: Partial<AIModelConfig>;
  onSave: (config: AIModelConfig) => void;
  onCancel: () => void;
}

const AIModelConfigWizard: React.FC<AIModelConfigWizardProps> = ({
  initialConfig,
  onSave,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<AIModelConfig>({
    provider: AIProvider.OPENAI,
    model: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    systemPrompt: 'You are a helpful AI assistant.',
    userPrompt: '',
    responseFormat: 'text',
    streaming: false,
    ...initialConfig,
  });
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState<PromptTemplate | null>(null);

  // Get enhanced AI model service
  const aiModelService = EnhancedAIModelService.getInstance();

  const steps = [
    {
      title: 'Choose AI Provider',
      subtitle: 'Select your preferred AI model provider',
      content: 'ProviderStep',
    },
    {
      title: 'Configure Model',
      subtitle: 'Set up model parameters and behavior',
      content: 'ModelStep',
    },
    {
      title: 'Craft Your Prompts',
      subtitle: 'Define system instructions and user prompts',
      content: 'PromptStep',
    },
    {
      title: 'Test & Validate',
      subtitle: 'Test your configuration with sample inputs',
      content: 'TestStep',
    },
  ];

  // Get providers with enhanced models
  const getProvidersWithModels = () => {
    const providerGroups = new Map<AIProvider, AIModel[]>();

    aiModelService.getAllModels().forEach(model => {
      if (!providerGroups.has(model.provider)) {
        providerGroups.set(model.provider, []);
      }
      providerGroups.get(model.provider)!.push(model);
    });

    return Array.from(providerGroups.entries()).map(([provider, models]) => {
      const providerInfo = getProviderInfo(provider);
      return {
        id: provider,
        name: providerInfo.name,
        description: providerInfo.description,
        icon: providerInfo.icon,
        models: models.map(model => ({
          id: model.id,
          name: model.name,
          description: model.description,
          category: model.category,
          featured: model.featured,
          maxTokens: model.maxTokens,
          costPer1kTokens: model.costPer1kTokens,
        })),
        color: providerInfo.color,
      };
    });
  };

  const getProviderInfo = (provider: AIProvider) => {
    switch (provider) {
      case AIProvider.OPENAI:
        return {
          name: 'OpenAI',
          description: 'GPT-4, GPT-3.5 Turbo, and other OpenAI models',
          icon: <Brain className="w-8 h-8" />,
          color: 'from-green-500 to-emerald-600',
        };
      case AIProvider.ANTHROPIC:
        return {
          name: 'Anthropic',
          description: 'Claude models with strong reasoning capabilities',
          icon: <MessageSquare className="w-8 h-8" />,
          color: 'from-blue-500 to-cyan-600',
        };
      case AIProvider.GOOGLE:
        return {
          name: 'Google',
          description: 'Gemini models with multimodal capabilities',
          icon: <Sparkles className="w-8 h-8" />,
          color: 'from-purple-500 to-pink-600',
        };
      case AIProvider.OLLAMA:
        return {
          name: 'Ollama',
          description: 'Local open-source models via Ollama',
          icon: <Bot className="w-8 h-8" />,
          color: 'from-orange-500 to-red-600',
        };
      case AIProvider.STABILITY_AI:
        return {
          name: 'Stability AI',
          description: 'Image generation and editing models',
          icon: <Image className="w-8 h-8" />,
          color: 'from-pink-500 to-rose-600',
        };
      case AIProvider.ELEVEN_LABS:
        return {
          name: 'ElevenLabs',
          description: 'High-quality text-to-speech models',
          icon: <Volume2 className="w-8 h-8" />,
          color: 'from-indigo-500 to-purple-600',
        };
      default:
        return {
          name: 'Local Models',
          description: 'Self-hosted models for privacy and control',
          icon: <Bot className="w-8 h-8" />,
          color: 'from-gray-500 to-slate-600',
        };
    }
  };

  const providers = getProvidersWithModels();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSave(config);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateConfig = (updates: Partial<AIModelConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleTest = async () => {
    if (!testInput.trim()) return;

    setIsTesting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestOutput(
        `This is a simulated response for: "${testInput}"\n\nModel: ${config.model}\nTemperature: ${config.temperature}\nMax Tokens: ${config.maxTokens}`
      );
    } catch (error) {
      setTestOutput('Error: Failed to generate response. Please check your configuration.');
    } finally {
      setIsTesting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProviderStep
            providers={providers}
            selectedProvider={config.provider}
            onSelect={provider => updateConfig({ provider })}
          />
        );
      case 1:
        return <ModelStep config={config} providers={providers} onUpdate={updateConfig} />;
      case 2:
        return (
          <PromptStep
            config={config}
            onUpdate={updateConfig}
            promptTemplates={aiModelService.getPromptTemplates()}
            selectedTemplate={selectedPromptTemplate}
            onTemplateSelect={setSelectedPromptTemplate}
          />
        );
      case 3:
        return (
          <TestStep
            config={config}
            testInput={testInput}
            testOutput={testOutput}
            isTesting={isTesting}
            onTestInputChange={setTestInput}
            onTest={handleTest}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return config.provider !== undefined;
      case 1:
        return config.model !== undefined;
      case 2:
        return config.userPrompt.trim() !== '';
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
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                <span className="font-semibold">AI Model Configuration</span>
              </div>
              <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
                Cancel
              </Button>
            </div>

            <CardTitle className="text-2xl mb-2">{steps[currentStep].title}</CardTitle>
            <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
          </CardHeader>

          <CardContent className="max-h-[60vh] overflow-y-auto">
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
                    <Save className="w-4 h-4" />
                    Save Configuration
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

interface ProviderModel {
  id: string;
  name: string;
  description: string;
}

interface Provider {
  id: AIProvider;
  name: string;
  description: string;
  icon: React.ReactNode;
  models: ProviderModel[];
  color: string;
}

interface ProviderStepProps {
  providers: Provider[];
  selectedProvider: AIProvider;
  onSelect: (provider: AIProvider) => void;
}

const ProviderStep: React.FC<ProviderStepProps> = ({ providers, selectedProvider, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {providers.map(provider => (
      <MotionDiv key={provider.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card
          className={`cursor-pointer transition-all duration-200 ${
            selectedProvider === provider.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={() => onSelect(provider.id)}
        >
          <CardContent className="p-6">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${provider.color} flex items-center justify-center text-white mb-4`}
            >
              {provider.icon}
            </div>

            <h3 className="text-lg font-semibold mb-2">{provider.name}</h3>
            <p className="text-muted-foreground mb-4">{provider.description}</p>

            <div className="space-y-1">
              {provider.models.slice(0, 2).map((model: ProviderModel) => (
                <div key={model.id} className="text-sm">
                  <span className="font-medium">{model.name}</span>
                </div>
              ))}
              {provider.models.length > 2 && (
                <div className="text-sm text-muted-foreground">
                  +{provider.models.length - 2} more models
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    ))}
  </div>
);

interface ModelStepProps {
  config: AIModelConfig;
  providers: Provider[];
  onUpdate: (updates: Partial<AIModelConfig>) => void;
}

const ModelStep: React.FC<ModelStepProps> = ({ config, providers, onUpdate }) => {
  const selectedProvider = providers.find(p => p.id === config.provider);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="model">Model</Label>
          <Select value={config.model} onValueChange={model => onUpdate({ model })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {selectedProvider?.models.map((model: ProviderModel) => (
                <SelectItem key={model.id} value={model.id}>
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm text-muted-foreground">{model.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="temperature">Temperature: {config.temperature}</Label>
            <Slider
              value={[config.temperature || 0.7]}
              onValueChange={values => onUpdate({ temperature: values[0] })}
              min={0}
              max={2}
              step={0.1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Controls randomness. Lower = more focused, Higher = more creative
            </p>
          </div>

          <div>
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <Input
              type="number"
              value={config.maxTokens}
              onChange={e => onUpdate({ maxTokens: parseInt(e.target.value) || 1000 })}
              min={1}
              max={4000}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">Maximum length of the response</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="topP">Top P: {config.topP}</Label>
            <Slider
              value={[config.topP || 1]}
              onValueChange={values => onUpdate({ topP: values[0] })}
              min={0}
              max={1}
              step={0.1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Alternative to temperature for controlling randomness
            </p>
          </div>

          <div>
            <Label htmlFor="frequencyPenalty">Frequency Penalty: {config.frequencyPenalty}</Label>
            <Slider
              value={[config.frequencyPenalty || 0]}
              onValueChange={values => onUpdate({ frequencyPenalty: values[0] })}
              min={-2}
              max={2}
              step={0.1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Reduces repetition of frequent tokens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PromptStepProps {
  config: AIModelConfig;
  onUpdate: (updates: Partial<AIModelConfig>) => void;
  promptTemplates: PromptTemplate[];
  selectedTemplate: PromptTemplate | null;
  onTemplateSelect: (template: PromptTemplate | null) => void;
}

const PromptStep: React.FC<PromptStepProps> = ({
  config,
  onUpdate,
  promptTemplates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  const applyTemplate = (template: PromptTemplate) => {
    onTemplateSelect(template);
    onUpdate({
      systemPrompt: template.template.split('\n')[0] || config.systemPrompt,
      userPrompt: template.template,
    });
  };

  const templateCategories = [...new Set(promptTemplates.map(t => t.category))];

  return (
    <div className="space-y-6">
      {/* Prompt Templates Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold">Prompt Templates</Label>
        </div>

        <Tabs defaultValue={templateCategories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {templateCategories.slice(0, 3).map(category => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {templateCategories.map(category => (
            <TabsContent key={category} value={category} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {promptTemplates
                  .filter(template => template.category === category)
                  .map(template => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => applyTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {template.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Custom Prompt Configuration */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold">Custom Configuration</Label>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              value={config.systemPrompt}
              onChange={e => onUpdate({ systemPrompt: e.target.value })}
              placeholder="You are a helpful AI assistant..."
              rows={4}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Sets the AI's role and behavior. This context is always included.
            </p>
          </div>

          <div>
            <Label htmlFor="userPrompt">User Prompt Template</Label>
            <Textarea
              value={config.userPrompt}
              onChange={e => onUpdate({ userPrompt: e.target.value })}
              placeholder="Please help me with: {{input}}"
              rows={3}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Template for user messages. Use {'{{input}}'} as a placeholder for dynamic content.
            </p>
          </div>

          <div>
            <Label htmlFor="responseFormat">Response Format</Label>
            <Select
              value={config.responseFormat}
              onValueChange={(responseFormat: 'text' | 'json' | 'structured') =>
                onUpdate({ responseFormat })
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Plain Text</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="structured">Structured</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestStepProps {
  config: AIModelConfig;
  testInput: string;
  testOutput: string;
  isTesting: boolean;
  onTestInputChange: (input: string) => void;
  onTest: () => void;
}

const TestStep: React.FC<TestStepProps> = ({
  config,
  testInput,
  testOutput,
  isTesting,
  onTestInputChange,
  onTest,
}) => (
  <div className="space-y-6">
    <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="font-medium mb-2">Configuration Summary</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Provider:</span> {config.provider}
        </div>
        <div>
          <span className="text-muted-foreground">Model:</span> {config.model}
        </div>
        <div>
          <span className="text-muted-foreground">Temperature:</span> {config.temperature}
        </div>
        <div>
          <span className="text-muted-foreground">Max Tokens:</span> {config.maxTokens}
        </div>
      </div>
    </div>

    <div>
      <Label htmlFor="testInput">Test Input</Label>
      <Textarea
        value={testInput}
        onChange={e => onTestInputChange(e.target.value)}
        placeholder="Enter a test message to see how your AI responds..."
        rows={3}
        className="mt-2"
      />
    </div>

    <Button onClick={onTest} disabled={!testInput.trim() || isTesting} className="w-full">
      <TestTube className="w-4 h-4 mr-2" />
      {isTesting ? 'Testing...' : 'Test Configuration'}
    </Button>

    {testOutput && (
      <div>
        <Label>Response</Label>
        <div className="mt-2 p-4 bg-muted/50 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{testOutput}</pre>
        </div>
      </div>
    )}
  </div>
);

export default AIModelConfigWizard;
