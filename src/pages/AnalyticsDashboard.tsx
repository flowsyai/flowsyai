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
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Clock,
  Zap,
  Target,
  Brain,
  Workflow,
  Bot,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Play,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalWorkflows: 24,
      activeAgents: 12,
      totalExecutions: 1847,
      successRate: 94.2,
      avgExecutionTime: 2.3,
      totalUsers: 156,
    },
    trends: {
      executionsOverTime: [
        { date: '2024-01-01', executions: 45, success: 42, failed: 3 },
        { date: '2024-01-02', executions: 52, success: 49, failed: 3 },
        { date: '2024-01-03', executions: 38, success: 36, failed: 2 },
        { date: '2024-01-04', executions: 67, success: 63, failed: 4 },
        { date: '2024-01-05', executions: 71, success: 68, failed: 3 },
        { date: '2024-01-06', executions: 58, success: 55, failed: 3 },
        { date: '2024-01-07', executions: 84, success: 80, failed: 4 },
      ],
      workflowPerformance: [
        { name: 'Data Processing', executions: 234, avgTime: 1.8, successRate: 96.2 },
        { name: 'Email Automation', executions: 189, avgTime: 0.9, successRate: 98.1 },
        { name: 'Content Generation', executions: 156, avgTime: 3.2, successRate: 91.7 },
        { name: 'API Integration', executions: 143, avgTime: 2.1, successRate: 94.8 },
        { name: 'Report Generation', executions: 98, avgTime: 4.5, successRate: 89.3 },
      ],
      agentUsage: [
        { name: 'GPT-4 Agent', value: 35, color: '#8B5CF6' },
        { name: 'Data Processor', value: 25, color: '#06B6D4' },
        { name: 'Email Bot', value: 20, color: '#10B981' },
        { name: 'Content Creator', value: 15, color: '#F59E0B' },
        { name: 'Others', value: 5, color: '#EF4444' },
      ],
    },
    realTime: {
      activeExecutions: 7,
      queuedTasks: 23,
      systemLoad: 67,
      responseTime: 1.2,
    },
  });

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadAnalytics();
  }, [timeRange]);

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

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
  }: {
    title: string;
    value: string | number;
    change: string;
    icon: React.ComponentType<{ className?: string }>;
    trend: 'up' | 'down' | 'neutral';
  }) => (
    <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${
              trend === 'up'
                ? 'text-green-500'
                : trend === 'down'
                  ? 'text-red-500'
                  : 'text-muted-foreground'
            }`}
          >
            {trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
            {trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
            {change}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </GlassCard>
  );

  const timeRangeOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <MotionDiv
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into your AI workflows and agent performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {timeRangeOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={timeRange === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(option.value)}
                    className={timeRange === option.value ? 'bg-primary' : ''}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info('Refreshing analytics data...')}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info('Export functionality coming soon!')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </MotionDiv>

          {/* Overview Stats */}
          <MotionDiv variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <StatCard
                title="Total Workflows"
                value={analyticsData.overview.totalWorkflows}
                change="+12%"
                trend="up"
                icon={Workflow}
              />
              <StatCard
                title="Active Agents"
                value={analyticsData.overview.activeAgents}
                change="+8%"
                trend="up"
                icon={Bot}
              />
              <StatCard
                title="Total Executions"
                value={analyticsData.overview.totalExecutions.toLocaleString()}
                change="+23%"
                trend="up"
                icon={Play}
              />
              <StatCard
                title="Success Rate"
                value={`${analyticsData.overview.successRate}%`}
                change="+2.1%"
                trend="up"
                icon={CheckCircle}
              />
              <StatCard
                title="Avg Execution Time"
                value={`${analyticsData.overview.avgExecutionTime}s`}
                change="-0.3s"
                trend="up"
                icon={Clock}
              />
              <StatCard
                title="Total Users"
                value={analyticsData.overview.totalUsers}
                change="+15%"
                trend="up"
                icon={Users}
              />
            </div>
          </MotionDiv>

          {/* Real-time Status */}
          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Real-time Status</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {analyticsData.realTime.activeExecutions}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Executions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sapphire mb-1">
                      {analyticsData.realTime.queuedTasks}
                    </div>
                    <div className="text-sm text-muted-foreground">Queued Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold mb-1">
                      {analyticsData.realTime.systemLoad}%
                    </div>
                    <div className="text-sm text-muted-foreground">System Load</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      {analyticsData.realTime.responseTime}s
                    </div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </MotionDiv>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Executions Over Time */}
            <MotionDiv variants={itemVariants}>
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Executions Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData.trends.executionsOverTime}>
                        <defs>
                          <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis
                          dataKey="date"
                          stroke="#9CA3AF"
                          fontSize={12}
                          tickFormatter={value =>
                            new Date(value).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })
                          }
                        />
                        <YAxis stroke="#9CA3AF" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(17, 24, 39, 0.95)',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="executions"
                          stroke="#8B5CF6"
                          fillOpacity={1}
                          fill="url(#colorExecutions)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="success"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorSuccess)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </GlassCard>
            </MotionDiv>

            {/* Agent Usage Distribution */}
            <MotionDiv variants={itemVariants}>
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Agent Usage Distribution
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.trends.agentUsage}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {analyticsData.trends.agentUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(17, 24, 39, 0.95)',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB',
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </GlassCard>
            </MotionDiv>
          </div>

          {/* Workflow Performance Table */}
          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Workflow Performance</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('Advanced filtering coming soon!')}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-alt">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Workflow
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Executions
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Avg Time
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Success Rate
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.trends.workflowPerformance.map((workflow, index) => (
                        <tr
                          key={index}
                          className="border-b border-border-alt/50 hover:bg-background/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-foreground">{workflow.name}</div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{workflow.executions}</td>
                          <td className="py-3 px-4 text-muted-foreground">{workflow.avgTime}s</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-background/50 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-primary to-sapphire h-2 rounded-full"
                                  style={{ width: `${workflow.successRate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-muted-foreground min-w-[3rem]">
                                {workflow.successRate}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`${
                                workflow.successRate > 95
                                  ? 'bg-green-500/10 text-green-500'
                                  : workflow.successRate > 90
                                    ? 'bg-yellow-500/10 text-yellow-500'
                                    : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {workflow.successRate > 95
                                ? 'Excellent'
                                : workflow.successRate > 90
                                  ? 'Good'
                                  : 'Needs Attention'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          </MotionDiv>

          {/* AI Insights */}
          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">AI-Powered Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Performance Boost</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your "Data Processing" workflow is performing 23% better than last week.
                      Consider applying similar optimizations to other workflows.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-500">
                        Optimization Opportunity
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Report Generation" workflow has a higher failure rate. Consider adding error
                      handling or reducing complexity.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-500">Smart Suggestion</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on usage patterns, consider creating a template for email automation
                      workflows to help other users.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
