import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Zap,
  TrendingUp,
  Users,
  Store,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Download,
  Play,
  Settings,
  ArrowRight,
  Bot,
  Sparkles,
  Target,
  Award,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAuth } from '@/hooks/useAuth';
import { EnhancedWorkflowService } from '@/services/enhancedWorkflowService';
import { WorkflowTemplateService } from '@/services/workflowTemplateService';

interface DashboardStats {
  totalWorkflows: number;
  activeWorkflows: number;
  totalExecutions: number;
  successRate: number;
  avgExecutionTime: number;
  recentActivity: Array<{
    id: string;
    type: 'execution' | 'creation' | 'collaboration';
    title: string;
    timestamp: string;
    status: 'success' | 'error' | 'pending';
  }>;
}

const WorkflowDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const workflowService = EnhancedWorkflowService.getInstance();
  const templateService = WorkflowTemplateService.getInstance();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockStats: DashboardStats = {
        totalWorkflows: 12,
        activeWorkflows: 8,
        totalExecutions: 1247,
        successRate: 94.2,
        avgExecutionTime: 2.3,
        recentActivity: [
          {
            id: '1',
            type: 'execution',
            title: 'Customer Support Bot executed successfully',
            timestamp: '2 minutes ago',
            status: 'success',
          },
          {
            id: '2',
            type: 'collaboration',
            title: 'Sarah Chen shared "Content Generator" with you',
            timestamp: '1 hour ago',
            status: 'success',
          },
          {
            id: '3',
            type: 'creation',
            title: 'New workflow "Data Processor" created',
            timestamp: '3 hours ago',
            status: 'success',
          },
          {
            id: '4',
            type: 'execution',
            title: 'Email Automation failed - API timeout',
            timestamp: '5 hours ago',
            status: 'error',
          },
        ],
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Create New Workflow',
      description: 'Start building from scratch',
      icon: <Plus className="w-6 h-6" />,
      action: () => navigate('/workflow-builder'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Browse Templates',
      description: 'Use pre-built workflows',
      icon: <Sparkles className="w-6 h-6" />,
      action: () => navigate('/workflow-templates'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Explore Marketplace',
      description: 'Discover premium workflows',
      icon: <Store className="w-6 h-6" />,
      action: () => navigate('/workflow-marketplace'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'View Analytics',
      description: 'Monitor performance',
      icon: <BarChart3 className="w-6 h-6" />,
      action: () => navigate('/workflow-analytics'),
      color: 'from-orange-500 to-red-500',
    },
  ];

  const featuredTemplates = templateService.getFeaturedTemplates().slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.fullName || user?.username || 'User'}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your AI workflows today
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => navigate('/ai-workflow-studio/new')}>
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Workflows</p>
                    <p className="text-2xl font-bold">{stats?.totalWorkflows}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">
                    {stats?.activeWorkflows} active
                  </span>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Executions</p>
                    <p className="text-2xl font-bold">{stats?.totalExecutions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-muted-foreground ml-1">vs last week</span>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">{stats?.successRate}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={stats?.successRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Execution Time</p>
                    <p className="text-2xl font-bold">{stats?.avgExecutionTime}s</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600">-8%</span>
                  <span className="text-muted-foreground ml-1">faster</span>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <MotionDiv
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={action.action}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-4`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="templates">Featured Templates</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="team">Team Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Workflows */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Workflows</span>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Customer Support Bot', status: 'active', lastRun: '2 min ago' },
                      { name: 'Content Generator', status: 'active', lastRun: '1 hour ago' },
                      { name: 'Data Processor', status: 'draft', lastRun: 'Never' },
                      { name: 'Email Automation', status: 'error', lastRun: '5 hours ago' },
                    ].map((workflow, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              workflow.status === 'active'
                                ? 'bg-green-500'
                                : workflow.status === 'error'
                                  ? 'bg-red-500'
                                  : 'bg-gray-400'
                            }`}
                          />
                          <div>
                            <p className="font-medium">{workflow.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Last run: {workflow.lastRun}
                            </p>
                          </div>
                        </div>
                        <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                          {workflow.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Performance charts coming soon</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => navigate('/workflow-analytics')}
                      >
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTemplates.map((template, index) => (
                <MotionDiv
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {template.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Download className="w-4 h-4" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => navigate('/workflow-templates')}>
                        <Play className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentActivity.map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === 'success'
                            ? 'bg-green-500'
                            : activity.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Team Collaboration</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/workflow-collaboration')}
                  >
                    View Team
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Collaborate with Your Team</h3>
                  <p className="text-muted-foreground mb-4">
                    Share workflows, get feedback, and work together on AI automations
                  </p>
                  <Button onClick={() => navigate('/workflow-collaboration')}>
                    <Users className="w-4 h-4 mr-2" />
                    Start Collaborating
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkflowDashboard;
