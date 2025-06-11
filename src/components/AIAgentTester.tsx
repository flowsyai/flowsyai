import React, { useState } from 'react';
import {
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
  Bot,
  Play,
  Square,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  FileText,
  BarChart3,
  Image,
  Link,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { RealAIAgentService, RealAIAgent } from '@/services/realAIAgentService';
import { TokenService } from '@/services/tokenService';
import { toast } from 'sonner';

interface AIAgentTesterProps {
  agent?: RealAIAgent;
  onExecutionComplete?: (result: unknown) => void;
}

const AIAgentTester: React.FC<AIAgentTesterProps> = ({ agent, onExecutionComplete }) => {
  const { user } = useAuth();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [inputData, setInputData] = useState({
    prompt: '',
    text: '',
    data: '',
    endpoints: '',
    images: '',
    operations: '',
    workflow: '',
  });
  const [complexity, setComplexity] = useState<'low' | 'medium' | 'high'>('medium');
  const [tokenCost, setTokenCost] = useState(0);

  // Calculate token cost when complexity or agent type changes
  React.useEffect(() => {
    if (agent) {
      const cost = TokenService.calculateTokenCost(agent.type, complexity);
      setTokenCost(cost);
    }
  }, [agent, complexity]);

  const handleExecuteAgent = async () => {
    if (!agent || !user) {
      toast.error('Agent or user not available');
      return;
    }

    // Check if user has enough tokens
    const hasTokens = await TokenService.hasEnoughTokens(user.id, tokenCost);
    if (!hasTokens) {
      toast.error(`Insufficient tokens. Need ${tokenCost} tokens for this execution.`);
      return;
    }

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      // Prepare input data based on agent type
      let processedInput: Record<string, unknown> = {};

      switch (agent.type) {
        case 'text_generator':
          processedInput = { prompt: inputData.prompt || inputData.text };
          break;
        case 'data_analyzer':
          processedInput = {
            data: inputData.data ? JSON.parse(inputData.data) : [],
          };
          break;
        case 'workflow_executor':
          processedInput = {
            workflow: inputData.workflow ? JSON.parse(inputData.workflow) : { steps: [] },
          };
          break;
        case 'api_connector':
          processedInput = {
            endpoints: inputData.endpoints
              .split(',')
              .map(e => e.trim())
              .filter(Boolean),
          };
          break;
        case 'image_processor':
          processedInput = {
            images: inputData.images
              .split(',')
              .map(i => i.trim())
              .filter(Boolean),
            operations: inputData.operations
              .split(',')
              .map(o => o.trim())
              .filter(Boolean),
          };
          break;
      }

      const result = await RealAIAgentService.executeAIAgent(
        agent.id,
        user.id,
        processedInput,
        complexity
      );

      setExecutionResult(result);

      if (result.status === 'completed') {
        toast.success('AI Agent executed successfully!');
      } else {
        toast.error(`Execution failed: ${result.error_message}`);
      }

      if (onExecutionComplete) {
        onExecutionComplete(result);
      }
    } catch (error) {
      console.error('Agent execution error:', error);
      toast.error('Failed to execute AI agent');
    } finally {
      setIsExecuting(false);
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'text_generator':
        return <FileText className="h-5 w-5" />;
      case 'data_analyzer':
        return <BarChart3 className="h-5 w-5" />;
      case 'workflow_executor':
        return <Workflow className="h-5 w-5" />;
      case 'api_connector':
        return <Link className="h-5 w-5" />;
      case 'image_processor':
        return <Image className="h-5 w-5" />;
      default:
        return <Bot className="h-5 w-5" />;
    }
  };

  const renderInputFields = () => {
    if (!agent) return null;

    switch (agent.type) {
      case 'text_generator':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompt">Text Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Enter your text prompt here..."
                value={inputData.prompt}
                onChange={e => setInputData(prev => ({ ...prev, prompt: e.target.value }))}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        );

      case 'data_analyzer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="data">Data (JSON format)</Label>
              <Textarea
                id="data"
                placeholder='[{"name": "item1", "value": 100}, {"name": "item2", "value": 200}]'
                value={inputData.data}
                onChange={e => setInputData(prev => ({ ...prev, data: e.target.value }))}
                className="mt-2"
                rows={6}
              />
            </div>
          </div>
        );

      case 'workflow_executor':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="workflow">Workflow Definition (JSON)</Label>
              <Textarea
                id="workflow"
                placeholder='{"steps": [{"name": "step1", "action": "process"}, {"name": "step2", "action": "analyze"}]}'
                value={inputData.workflow}
                onChange={e => setInputData(prev => ({ ...prev, workflow: e.target.value }))}
                className="mt-2"
                rows={6}
              />
            </div>
          </div>
        );

      case 'api_connector':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="endpoints">API Endpoints (comma-separated)</Label>
              <Input
                id="endpoints"
                placeholder="https://api.example.com/data, https://api.another.com/info"
                value={inputData.endpoints}
                onChange={e => setInputData(prev => ({ ...prev, endpoints: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'image_processor':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="images">Image URLs (comma-separated)</Label>
              <Input
                id="images"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.png"
                value={inputData.images}
                onChange={e => setInputData(prev => ({ ...prev, images: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="operations">Operations (comma-separated)</Label>
              <Input
                id="operations"
                placeholder="resize, enhance, analyze, crop"
                value={inputData.operations}
                onChange={e => setInputData(prev => ({ ...prev, operations: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <Label htmlFor="text">Input Text</Label>
            <Textarea
              id="text"
              placeholder="Enter your input here..."
              value={inputData.text}
              onChange={e => setInputData(prev => ({ ...prev, text: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>
        );
    }
  };

  if (!agent) {
    return (
      <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
        <div className="text-center py-8">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No AI agent selected</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
      {/* Agent Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">{getAgentIcon(agent.type)}</div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{agent.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {agent.type.replace('_', ' ')} Agent
            </p>
          </div>
        </div>
        <Badge variant={agent.is_active ? 'default' : 'secondary'}>
          {agent.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {renderInputFields()}

        {/* Complexity Selection */}
        <div>
          <Label htmlFor="complexity">Execution Complexity</Label>
          <Select
            value={complexity}
            onValueChange={(value: 'low' | 'medium' | 'high') => setComplexity(value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (0.5x cost)</SelectItem>
              <SelectItem value="medium">Medium (1x cost)</SelectItem>
              <SelectItem value="high">High (2x cost)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Token Cost Display */}
        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-gold" />
            <span className="text-sm text-muted-foreground">Execution Cost</span>
          </div>
          <span className="font-bold text-foreground">{tokenCost} tokens</span>
        </div>
      </div>

      {/* Execute Button */}
      <Button
        onClick={handleExecuteAgent}
        disabled={isExecuting || !agent.is_active}
        className="w-full mb-6"
        size="lg"
      >
        {isExecuting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Executing...
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            Execute Agent
          </>
        )}
      </Button>

      {/* Execution Result */}
      {executionResult && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            {executionResult.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium">
              Execution {executionResult.status === 'completed' ? 'Completed' : 'Failed'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">Execution Time</div>
              <div className="font-bold">{executionResult.execution_time_ms}ms</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <Zap className="h-4 w-4 mx-auto mb-1 text-gold" />
              <div className="text-sm text-muted-foreground">Tokens Used</div>
              <div className="font-bold">{executionResult.tokens_used}</div>
            </div>
          </div>

          {executionResult.status === 'completed' && executionResult.output_data && (
            <div>
              <Label>Execution Result</Label>
              <div className="mt-2 p-4 bg-background/50 rounded-lg">
                <pre className="text-sm text-foreground whitespace-pre-wrap overflow-auto max-h-64">
                  {JSON.stringify(executionResult.output_data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {executionResult.status === 'failed' && executionResult.error_message && (
            <div>
              <Label className="text-red-500">Error Message</Label>
              <div className="mt-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-500">{executionResult.error_message}</p>
              </div>
            </div>
          )}
        </MotionDiv>
      )}
    </GlassCard>
  );
};

export default AIAgentTester;
