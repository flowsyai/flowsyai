import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Activity,
  Clock,
  Zap,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Progress } from '@/components/ui/progress';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  Area,
  AreaChart,
} from 'recharts';

import { useAuth } from '@/hooks/useAuth';
import { EnhancedWorkflowService } from '@/services/enhancedWorkflowService';

interface AnalyticsData {
  totalExecutions: number;
  successRate: number;
  averageExecutionTime: number;
  activeWorkflows: number;
  totalWorkflows: number;
  executionTrend: Array<{ date: string; executions: number; success: number; failed: number }>;
  topWorkflows: Array<{ name: string; executions: number; successRate: number }>;
  errorTypes: Array<{ type: string; count: number; percentage: number }>;
  nodeUsage: Array<{ nodeType: string; usage: number; color: string }>;
  performanceMetrics: Array<{ metric: string; value: number; change: number }>;
}

const WorkflowAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedWorkflow, setSelectedWorkflow] = useState('all');

  const workflowService = EnhancedWorkflowService.getInstance();

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, selectedWorkflow]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual service call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockData: AnalyticsData = {
        totalExecutions: 1247,
        successRate: 94.2,
        averageExecutionTime: 2.3,
        activeWorkflows: 12,
        totalWorkflows: 18,
        executionTrend: [
          { date: '2024-01-01', executions: 45, success: 42, failed: 3 },
          { date: '2024-01-02', executions: 52, success: 49, failed: 3 },
          { date: '2024-01-03', executions: 38, success: 36, failed: 2 },
          { date: '2024-01-04', executions: 61, success: 58, failed: 3 },
          { date: '2024-01-05', executions: 73, success: 69, failed: 4 },
          { date: '2024-01-06', executions: 89, success: 84, failed: 5 },
          { date: '2024-01-07', executions: 95, success: 91, failed: 4 },
        ],
        topWorkflows: [
          { name: 'Customer Support Bot', executions: 342, successRate: 96.5 },
          { name: 'Content Generator', executions: 289, successRate: 92.1 },
          { name: 'Data Processor', executions: 234, successRate: 98.3 },
          { name: 'Email Automation', executions: 187, successRate: 89.7 },
          { name: 'Social Media Bot', executions: 156, successRate: 94.8 },
        ],
        errorTypes: [
          { type: 'API Rate Limit', count: 23, percentage: 35.4 },
          { type: 'Network Timeout', count: 18, percentage: 27.7 },
          { type: 'Invalid Input', count: 12, percentage: 18.5 },
          { type: 'Authentication', count: 8, percentage: 12.3 },
          { type: 'Other', count: 4, percentage: 6.1 },
        ],
        nodeUsage: [
          { nodeType: 'AI Text Generator', usage: 45, color: '#8b5cf6' },
          { nodeType: 'Data Transformer', usage: 23, color: '#06b6d4' },
          { nodeType: 'Slack Connector', usage: 18, color: '#10b981' },
          { nodeType: 'Email Sender', usage: 14, color: '#f59e0b' },
        ],
        performanceMetrics: [
          { metric: 'Avg Response Time', value: 2.3, change: -12.5 },
          { metric: 'Success Rate', value: 94.2, change: 3.1 },
          { metric: 'Daily Executions', value: 89, change: 15.7 },
          { metric: 'Error Rate', value: 5.8, change: -8.2 },
        ],
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingUp className="w-4 h-4 rotate-180" />;
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load analytics</h3>
          <p className="text-muted-foreground mb-4">Please try again later</p>
          <Button onClick={loadAnalyticsData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
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
              <h1 className="text-3xl font-bold mb-2">Workflow Analytics</h1>
              <p className="text-muted-foreground">
                Monitor performance, track usage, and optimize your AI workflows
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={loadAnalyticsData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>

              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
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
                    <p className="text-sm font-medium text-muted-foreground">Total Executions</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(analyticsData.totalExecutions)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <span className={getChangeColor(15.7)}>
                    {getChangeIcon(15.7)}
                    +15.7%
                  </span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
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
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">{analyticsData.successRate}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={analyticsData.successRate} className="h-2" />
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
                    <p className="text-sm font-medium text-muted-foreground">Avg Execution Time</p>
                    <p className="text-2xl font-bold">{analyticsData.averageExecutionTime}s</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <span className={getChangeColor(-12.5)}>
                    {getChangeIcon(-12.5)}
                    -12.5%
                  </span>
                  <span className="text-muted-foreground ml-1">faster</span>
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
                    <p className="text-sm font-medium text-muted-foreground">Active Workflows</p>
                    <p className="text-2xl font-bold">{analyticsData.activeWorkflows}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  of {analyticsData.totalWorkflows} total
                </p>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* Charts and Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Execution Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Execution Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData.executionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="success"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="failed"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Workflows */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Top Performing Workflows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topWorkflows.map((workflow, index) => (
                      <div key={workflow.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{workflow.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {workflow.executions} executions
                            </p>
                          </div>
                        </div>
                        <Badge variant={workflow.successRate > 95 ? 'default' : 'secondary'}>
                          {workflow.successRate}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analyticsData.performanceMetrics.map((metric, index) => (
                <MotionDiv
                  key={metric.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-medium text-muted-foreground mb-2">{metric.metric}</h3>
                      <p className="text-3xl font-bold mb-2">{metric.value}</p>
                      <div
                        className={`flex items-center justify-center gap-1 text-sm ${getChangeColor(metric.change)}`}
                      >
                        {getChangeIcon(metric.change)}
                        {Math.abs(metric.change)}%
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Node Usage Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={analyticsData.nodeUsage}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="usage"
                        label={({ nodeType, usage }) => `${nodeType}: ${usage}%`}
                      >
                        {analyticsData.nodeUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>

                  <div className="space-y-3">
                    {analyticsData.nodeUsage.map(node => (
                      <div key={node.nodeType} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: node.color }}
                          />
                          <span className="font-medium">{node.nodeType}</span>
                        </div>
                        <span className="text-muted-foreground">{node.usage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Error Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.errorTypes.map(error => (
                    <div
                      key={error.type}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-medium">{error.type}</p>
                          <p className="text-sm text-muted-foreground">{error.count} occurrences</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{error.percentage}%</p>
                        <Progress value={error.percentage} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkflowAnalytics;
