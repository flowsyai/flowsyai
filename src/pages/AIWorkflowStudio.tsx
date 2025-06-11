import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

import { ArrowLeft, Save, Play, Share, Settings, Download, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import EnhancedWorkflowBuilder from '@/components/EnhancedWorkflowBuilder';
import { EnhancedWorkflowService } from '@/services/enhancedWorkflowService';
import { Workflow, WorkflowCategory, WorkflowStatus } from '@/types/workflow';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AIWorkflowStudio: React.FC = () => {
  const { workflowId } = useParams<{ workflowId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const workflowService = EnhancedWorkflowService.getInstance();

  const loadWorkflow = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const loadedWorkflow = await workflowService.getWorkflow(id);
        if (loadedWorkflow) {
          setWorkflow(loadedWorkflow);
        } else {
          toast.error('Workflow not found');
          navigate('/workflows');
        }
      } catch (error) {
        toast.error('Failed to load workflow');
        console.error('Error loading workflow:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, workflowService]
  );

  useEffect(() => {
    if (workflowId && workflowId !== 'new') {
      loadWorkflow(workflowId);
    } else {
      // Create new workflow
      setWorkflow({
        id: '',
        name: 'Untitled Workflow',
        description: '',
        nodes: [],
        edges: [],
        userId: user?.id || '',
        isPublic: false,
        tags: [],
        category: WorkflowCategory.CUSTOM,
        status: WorkflowStatus.DRAFT,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        executionCount: 0,
        settings: {
          autoSave: true,
          executionTimeout: 300,
          retryOnFailure: false,
          maxRetries: 3,
          enableLogging: true,
          enableAnalytics: true,
        },
      });
    }
  }, [workflowId, user, loadWorkflow]);

  const handleSaveWorkflow = async (updatedWorkflow: Workflow) => {
    setIsSaving(true);
    try {
      setWorkflow(updatedWorkflow);
      toast.success('Workflow saved successfully');

      // Update URL if this was a new workflow
      if (workflowId === 'new') {
        navigate(`/ai-workflow-studio/${updatedWorkflow.id}`, { replace: true });
      }
    } catch (error) {
      toast.error('Failed to save workflow');
      console.error('Error saving workflow:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExecuteWorkflow = async (workflowToExecute: Workflow) => {
    setIsExecuting(true);
    try {
      const result = await workflowService.executeWorkflow(workflowToExecute.id);
      toast.success('Workflow executed successfully');
      console.log('Execution result:', result);
    } catch (error) {
      toast.error('Failed to execute workflow');
      console.error('Error executing workflow:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleWorkflowSettingsChange = (field: string, value: unknown) => {
    if (!workflow) return;

    setWorkflow({
      ...workflow,
      [field]: value,
    });
  };

  const handleWorkflowSettingsUpdate = (settings: Record<string, unknown>) => {
    if (!workflow) return;

    setWorkflow({
      ...workflow,
      settings: { ...workflow.settings, ...settings },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Workflow not found</p>
          <Button onClick={() => navigate('/workflows')} className="mt-4">
            Back to Workflows
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/workflows')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-lg font-semibold">{workflow.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {workflow.category.replace('_', ' ')}
                    </Badge>
                    <Badge
                      variant={workflow.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>

              <Button variant="outline" size="sm" disabled={isExecuting}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button
                size="sm"
                disabled={isExecuting}
                onClick={() => workflow && handleExecuteWorkflow(workflow)}
              >
                <Play className="w-4 h-4 mr-2" />
                {isExecuting ? 'Running...' : 'Execute'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Builder */}
      <div className="h-[calc(100vh-80px)]">
        <EnhancedWorkflowBuilder
          workflowId={workflow.id || undefined}
          onSave={handleSaveWorkflow}
          onExecute={handleExecuteWorkflow}
        />
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Workflow Settings</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="execution">Execution</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  value={workflow.name}
                  onChange={e => handleWorkflowSettingsChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={workflow.description}
                  onChange={e => handleWorkflowSettingsChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={workflow.category}
                  onValueChange={value => handleWorkflowSettingsChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(WorkflowCategory).map(category => (
                      <SelectItem key={category} value={category}>
                        {category.replace('_', ' ').toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="execution" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeout">Execution Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={workflow.settings.executionTimeout}
                  onChange={e =>
                    handleWorkflowSettingsUpdate({
                      executionTimeout: parseInt(e.target.value) || 300,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retries">Max Retries</Label>
                <Input
                  id="retries"
                  type="number"
                  value={workflow.settings.maxRetries}
                  onChange={e =>
                    handleWorkflowSettingsUpdate({
                      maxRetries: parseInt(e.target.value) || 3,
                    })
                  }
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="logging">Enable Logging</Label>
                  <input
                    id="logging"
                    type="checkbox"
                    checked={workflow.settings.enableLogging}
                    onChange={e =>
                      handleWorkflowSettingsUpdate({
                        enableLogging: e.target.checked,
                      })
                    }
                    aria-label="Enable workflow logging"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics">Enable Analytics</Label>
                  <input
                    id="analytics"
                    type="checkbox"
                    checked={workflow.settings.enableAnalytics}
                    onChange={e =>
                      handleWorkflowSettingsUpdate({
                        enableAnalytics: e.target.checked,
                      })
                    }
                    aria-label="Enable workflow analytics"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowSettings(false)}>Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIWorkflowStudio;
