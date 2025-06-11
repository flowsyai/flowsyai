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
  Bot,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Settings,
  Trash2,
  BarChart3,
  Clock,
  Zap,
  FileText,
  Image,
  Link,
  Workflow,
  Eye,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import AIAgentTester from '@/components/AIAgentTester';
import TokenManager from '@/components/TokenManager';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AIAgentHub: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [agents, setAgents] = useState<RealAIAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<RealAIAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<RealAIAgent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showTester, setShowTester] = useState(false);

  useEffect(() => {
    if (user) {
      loadAgents();
    }
  }, [user, loadAgents]);

  useEffect(() => {
    filterAgents();
  }, [filterAgents]);

  const loadAgents = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const userAgents = await RealAIAgentService.getUserAIAgents(user.id);
      setAgents(userAgents);
    } catch (error) {
      console.error('Error loading AI agents:', error);
      toast.error('Failed to load AI agents');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const filterAgents = useCallback(() => {
    let filtered = agents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        agent =>
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(agent => agent.type === filterType);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(agent =>
        filterStatus === 'active' ? agent.is_active : !agent.is_active
      );
    }

    setFilteredAgents(filtered);
  }, [agents, searchTerm, filterType, filterStatus]);

  const handleCreateAgent = () => {
    navigate('/builder?type=agent');
  };

  const handleTestAgent = (agent: RealAIAgent) => {
    setSelectedAgent(agent);
    setShowTester(true);
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

  const getAgentTypeLabel = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AI Agent Hub</h1>
              <p className="text-muted-foreground">Manage and deploy your intelligent AI agents</p>
            </div>
            <Button
              onClick={handleCreateAgent}
              className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/25"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Agent
            </Button>
          </div>
        </MotionDiv>

        {/* Token Manager */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <TokenManager compact={true} showPurchaseOptions={true} />
        </MotionDiv>

        {/* Filters */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="text_generator">Text Generator</SelectItem>
                  <SelectItem value="data_analyzer">Data Analyzer</SelectItem>
                  <SelectItem value="workflow_executor">Workflow Executor</SelectItem>
                  <SelectItem value="api_connector">API Connector</SelectItem>
                  <SelectItem value="image_processor">Image Processor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </MotionDiv>

        {/* Agents Grid */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <MotionDiv key={index} variants={itemVariants}>
                <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-muted rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-muted rounded flex-1"></div>
                      <div className="h-8 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))
          ) : filteredAgents.length === 0 ? (
            <MotionDiv variants={itemVariants} className="col-span-full">
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-12">
                <div className="text-center">
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No AI Agents Found</h3>
                  <p className="text-muted-foreground mb-6">
                    {agents.length === 0
                      ? 'Create your first AI agent to get started with intelligent automation.'
                      : 'No agents match your current filters. Try adjusting your search criteria.'}
                  </p>
                  <Button
                    onClick={handleCreateAgent}
                    className="bg-gradient-to-r from-primary to-sapphire text-background"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Agent
                  </Button>
                </div>
              </GlassCard>
            </MotionDiv>
          ) : (
            filteredAgents.map(agent => (
              <MotionDiv key={agent.id} variants={itemVariants} whileHover={{ y: -4 }}>
                <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">{getAgentIcon(agent.type)}</div>
                      <div>
                        <h3 className="font-bold text-foreground">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getAgentTypeLabel(agent.type)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={agent.is_active ? 'default' : 'secondary'}>
                      {agent.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      {agent.usage_count} uses
                    </div>
                    {agent.last_used && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(agent.last_used).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleTestAgent(agent)}
                      className="flex-1"
                      disabled={!agent.is_active}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Test
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))
          )}
        </MotionDiv>

        {/* AI Agent Tester Modal */}
        {showTester && selectedAgent && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTester(false)}
          >
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTester(false)}
                  className="absolute top-4 right-4 z-10"
                >
                  ✕
                </Button>
                <AIAgentTester
                  agent={selectedAgent}
                  onExecutionComplete={result => {
                    console.log('Agent execution completed:', result);
                    // Optionally refresh agent data
                    loadAgents();
                  }}
                />
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </div>
    </div>
  );
};

export default AIAgentHub;
