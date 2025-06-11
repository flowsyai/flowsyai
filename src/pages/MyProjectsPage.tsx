import React, { useState, useEffect, useCallback } from 'react';
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
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  Share,
  Clock,
  Users,
  Activity,
  Bot,
  Workflow,
  Zap,
  Settings,
  Eye,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { WorkflowService } from '@/services/workflowService';
import { AIAgentService } from '@/services/aiAgentService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/utils/logger';

const MyProjectsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [aiAgents, setAiAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('workflows');

  const loadProjectData = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const [userWorkflows, userAgents] = await Promise.all([
        WorkflowService.getUserWorkflows(user.id),
        AIAgentService.getUserAIAgents(user.id),
      ]);
      setWorkflows(userWorkflows);
      setAiAgents(userAgents);
    } catch (error) {
      logger.error('Error loading project data:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/auth');
      return;
    }

    loadProjectData();
  }, [user, isAuthenticated, navigate, loadProjectData]);

  const createNewWorkflow = async () => {
    navigate('/workflow-builder');
  };

  const createNewAgent = async () => {
    navigate('/workflow-builder?type=agent');
  };

  const duplicateWorkflow = async (workflowId: string, name: string) => {
    if (!user) return;

    try {
      const duplicated = await WorkflowService.duplicateWorkflow(
        workflowId,
        user.id,
        `${name} (Copy)`
      );
      setWorkflows(prev => [duplicated, ...prev]);
      toast.success('Workflow duplicated successfully!');
    } catch (error) {
      logger.error('Error duplicating workflow:', error);
      toast.error('Failed to duplicate workflow');
    }
  };

  const deleteWorkflow = async (workflowId: string) => {
    if (!user) return;

    try {
      await WorkflowService.deleteWorkflow(workflowId, user.id);
      setWorkflows(prev => prev.filter(w => w.id !== workflowId));
      toast.success('Workflow deleted successfully!');
    } catch (error) {
      logger.error('Error deleting workflow:', error);
      toast.error('Failed to delete workflow');
    }
  };

  const toggleAgentStatus = async (agentId: string) => {
    if (!user) return;

    try {
      const updatedAgent = await AIAgentService.toggleAIAgentStatus(agentId, user.id);
      setAiAgents(prev => prev.map(agent => (agent.id === agentId ? updatedAgent : agent)));
      toast.success(`Agent ${updatedAgent.is_active ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      logger.error('Error toggling agent status:', error);
      toast.error('Failed to update agent status');
    }
  };

  const deleteAgent = async (agentId: string) => {
    if (!user) return;

    try {
      await AIAgentService.deleteAIAgent(agentId, user.id);
      setAiAgents(prev => prev.filter(a => a.id !== agentId));
      toast.success('AI Agent deleted successfully!');
    } catch (error) {
      logger.error('Error deleting agent:', error);
      toast.error('Failed to delete agent');
    }
  };

  const filteredWorkflows = workflows.filter(
    workflow =>
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAgents = aiAgents.filter(
    agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-screen-xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-2">
                My <span className="premium-gradient-text">Projects</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your AI workflows and intelligent agents
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={createNewAgent}
                variant="outline"
                className="group relative overflow-hidden border-sapphire/20 hover:border-sapphire/40 hover:bg-sapphire/5 font-medium rounded-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  <Bot className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  New Agent
                </span>
              </Button>
              <Button
                onClick={createNewWorkflow}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-sapphire text-background font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out premium-border"
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  New Workflow
                </span>
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => toast.info('Filter functionality coming soon!')}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </MotionDiv>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Workflows ({workflows.length})
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Agents ({aiAgents.length})
            </TabsTrigger>
          </TabsList>

          {/* Workflows Tab */}
          <TabsContent value="workflows">
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <MotionDiv key={i} variants={itemVariants}>
                    <div className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg p-6 h-64 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-8"></div>
                      </div>
                    </div>
                  </MotionDiv>
                ))
              ) : filteredWorkflows.length === 0 ? (
                <MotionDiv variants={itemVariants} className="col-span-full">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                      <Workflow className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {searchQuery ? 'No workflows found' : 'No workflows yet'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? 'Try adjusting your search terms'
                        : 'Create your first workflow to automate tasks with AI'}
                    </p>
                    {!searchQuery && (
                      <Button
                        onClick={createNewWorkflow}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Workflow
                      </Button>
                    )}
                  </div>
                </MotionDiv>
              ) : (
                filteredWorkflows.map(workflow => (
                  <MotionDiv key={workflow.id} variants={itemVariants} whileHover={{ y: -4 }}>
                    <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                              {workflow.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {workflow.description || 'No description provided'}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => navigate(`/workflow-builder?id=${workflow.id}`)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => duplicateWorkflow(workflow.id, workflow.name)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => deleteWorkflow(workflow.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(workflow.updated_at).toLocaleDateString()}
                          </div>
                          {workflow.is_public && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Public
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={() => toast.info(`Running workflow: ${workflow.name}`)}
                          >
                            <Play className="mr-2 h-3 w-3" />
                            Run
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate(`/workflow-builder?id=${workflow.id}`)}
                          >
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </MotionDiv>
                ))
              )}
            </MotionDiv>
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents">
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <MotionDiv key={i} variants={itemVariants}>
                    <div className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg p-6 h-64 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-8"></div>
                      </div>
                    </div>
                  </MotionDiv>
                ))
              ) : filteredAgents.length === 0 ? (
                <MotionDiv variants={itemVariants} className="col-span-full">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                      <Bot className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {searchQuery ? 'No AI agents found' : 'No AI agents yet'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? 'Try adjusting your search terms'
                        : 'Create your first AI agent to automate intelligent tasks'}
                    </p>
                    {!searchQuery && (
                      <Button onClick={createNewAgent} className="bg-sapphire hover:bg-sapphire/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Agent
                      </Button>
                    )}
                  </div>
                </MotionDiv>
              ) : (
                filteredAgents.map(agent => (
                  <MotionDiv key={agent.id} variants={itemVariants} whileHover={{ y: -4 }}>
                    <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className={`p-2 rounded-lg ${agent.is_active ? 'bg-green-500/10' : 'bg-muted/20'}`}
                            >
                              <Bot
                                className={`h-5 w-5 ${agent.is_active ? 'text-green-500' : 'text-muted-foreground'}`}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                                {agent.name}
                              </h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                {agent.type.replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Configure
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                                {agent.is_active ? (
                                  <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => deleteAgent(agent.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <Badge variant={agent.is_active ? 'default' : 'secondary'}>
                            {agent.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            Updated {new Date(agent.updated_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            variant={agent.is_active ? 'default' : 'outline'}
                            onClick={() => toggleAgentStatus(agent.id)}
                          >
                            {agent.is_active ? (
                              <>
                                <Pause className="mr-2 h-3 w-3" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-3 w-3" />
                                Start
                              </>
                            )}
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="mr-2 h-3 w-3" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </MotionDiv>
                ))
              )}
            </MotionDiv>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProjectsPage;
