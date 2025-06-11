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

import { useNavigate } from 'react-router-dom';
import '../styles/showcase.css';
import {
  CheckCircle,
  XCircle,
  Crown,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Bot,
  Star,
  Award,
  Target,
  Rocket,
  ArrowRight,
  Play,
  Download,
  BarChart3,
  Lock,
  Globe,
  Sparkles,
  Brain,
  Lightbulb,
  Gauge,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const PlatformShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState('ai-optimization');

  const competitorComparison = [
    {
      feature: 'AI Integration',
      description: 'Native AI-first workflow automation',
      ourPlatform: { status: 'leader', value: 'Native AI-First' },
      zapier: { status: 'limited', value: 'Limited AI' },
      n8n: { status: 'basic', value: 'Basic AI' },
      powerAutomate: { status: 'limited', value: 'Limited AI' },
    },
    {
      feature: 'Visual Workflow Builder',
      description: 'Drag-and-drop workflow creation',
      ourPlatform: { status: 'leader', value: 'Advanced Builder' },
      zapier: { status: 'good', value: 'Good Builder' },
      n8n: { status: 'good', value: 'Good Builder' },
      powerAutomate: { status: 'good', value: 'Good Builder' },
    },
    {
      feature: 'Real-Time Collaboration',
      description: 'Multi-user simultaneous editing',
      ourPlatform: { status: 'leader', value: 'Real-Time Multi-User' },
      zapier: { status: 'none', value: 'No Collaboration' },
      n8n: { status: 'limited', value: 'Limited Sharing' },
      powerAutomate: { status: 'good', value: 'Team Features' },
    },
    {
      feature: 'AI Workflow Optimization',
      description: 'Intelligent performance optimization',
      ourPlatform: { status: 'unique', value: 'AI-Powered Optimization' },
      zapier: { status: 'none', value: 'No Optimization' },
      n8n: { status: 'none', value: 'No Optimization' },
      powerAutomate: { status: 'none', value: 'No Optimization' },
    },
    {
      feature: 'Enterprise Security',
      description: 'Comprehensive security & compliance',
      ourPlatform: { status: 'leader', value: 'Multi-Framework Compliance' },
      zapier: { status: 'good', value: 'Standard Security' },
      n8n: { status: 'basic', value: 'Basic Security' },
      powerAutomate: { status: 'good', value: 'Enterprise Security' },
    },
    {
      feature: 'Workflow Marketplace',
      description: 'Commercial workflow distribution',
      ourPlatform: { status: 'leader', value: 'Full Marketplace' },
      zapier: { status: 'limited', value: 'Template Library' },
      n8n: { status: 'none', value: 'No Marketplace' },
      powerAutomate: { status: 'limited', value: 'Template Gallery' },
    },
    {
      feature: 'Advanced Analytics',
      description: 'Comprehensive performance insights',
      ourPlatform: { status: 'leader', value: 'AI-Powered Analytics' },
      zapier: { status: 'basic', value: 'Basic Analytics' },
      n8n: { status: 'limited', value: 'Limited Analytics' },
      powerAutomate: { status: 'good', value: 'Good Analytics' },
    },
    {
      feature: 'Enterprise Integrations',
      description: 'Major business system connectors',
      ourPlatform: { status: 'leader', value: '500+ Integrations' },
      zapier: { status: 'good', value: '5000+ Apps' },
      n8n: { status: 'limited', value: '200+ Nodes' },
      powerAutomate: { status: 'good', value: '400+ Connectors' },
    },
  ];

  const businessImpactMetrics = [
    {
      metric: '80%',
      description: 'Faster Development',
      detail: 'Visual workflow creation vs. traditional coding',
      icon: <Rocket className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      metric: '60%',
      description: 'Cost Reduction',
      detail: 'AI-optimized resource usage and model selection',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      metric: '95%',
      description: 'Reliability',
      detail: 'Enterprise-grade error handling and monitoring',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      metric: '50%',
      description: 'Faster Onboarding',
      detail: 'Intuitive interface and comprehensive templates',
      icon: <Gauge className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const uniqueAdvantages = [
    {
      id: 'ai-optimization',
      title: 'AI-Powered Optimization',
      description: 'The only platform with intelligent workflow optimization',
      icon: <Brain className="w-8 h-8" />,
      features: [
        'Automated performance analysis',
        'Cost optimization recommendations',
        'Security vulnerability detection',
        'One-click auto-fix capabilities',
        'Predictive performance insights',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'real-time-collaboration',
      title: 'Real-Time Collaboration',
      description: 'Industry-leading team development capabilities',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Simultaneous multi-user editing',
        'Live cursor tracking',
        'Integrated communication',
        'Advanced permission system',
        'Version control and rollback',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise Security',
      description: 'Comprehensive security and compliance framework',
      icon: <Lock className="w-8 h-8" />,
      features: [
        'Multi-framework compliance (GDPR, SOC2, HIPAA)',
        'Real-time threat detection',
        'Automated security scanning',
        'Role-based access control',
        'Comprehensive audit trails',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'ai-first-design',
      title: 'AI-First Architecture',
      description: 'Built specifically for AI workflow automation',
      icon: <Sparkles className="w-8 h-8" />,
      features: [
        'Native AI model integration',
        'Intelligent workflow suggestions',
        'AI-powered error handling',
        'Smart resource optimization',
        'Predictive scaling',
      ],
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const platformFeatures = [
    {
      category: 'Core Platform',
      features: [
        { name: 'Visual Workflow Builder', status: 'complete' },
        { name: 'AI Model Integration', status: 'complete' },
        { name: 'Template Library (50+)', status: 'complete' },
        { name: 'Real-Time Execution', status: 'complete' },
      ],
    },
    {
      category: 'Collaboration',
      features: [
        { name: 'Multi-User Editing', status: 'complete' },
        { name: 'Team Management', status: 'complete' },
        { name: 'Permission System', status: 'complete' },
        { name: 'Activity Tracking', status: 'complete' },
      ],
    },
    {
      category: 'Enterprise',
      features: [
        { name: 'Security Dashboard', status: 'complete' },
        { name: 'Compliance Framework', status: 'complete' },
        { name: 'Enterprise Integrations', status: 'complete' },
        { name: 'Advanced Analytics', status: 'complete' },
      ],
    },
    {
      category: 'AI Innovation',
      features: [
        { name: 'Workflow Optimization', status: 'complete' },
        { name: 'Performance Analysis', status: 'complete' },
        { name: 'Cost Optimization', status: 'complete' },
        { name: 'Security Scanning', status: 'complete' },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'leader':
      case 'unique':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'limited':
      case 'basic':
        return <CheckCircle className="w-5 h-5 text-yellow-500" />;
      case 'none':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string, value: string) => {
    const variants = {
      leader: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      unique: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      good: 'bg-green-100 text-green-800 border-green-200',
      limited: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      basic: 'bg-orange-100 text-orange-800 border-orange-200',
      none: 'bg-red-100 text-red-800 border-red-200',
    } as const;

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.good}>{value}</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-20">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-6 py-2">
              <Crown className="w-5 h-5 mr-2" />
              Industry Leader
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Future of AI Workflow Automation
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              The only platform that combines AI-first design, real-time collaboration, and
              enterprise-grade security to deliver unmatched workflow automation capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => navigate('/ai-workflow-studio/new')}
              >
                <Play className="w-5 h-5 mr-2" />
                Try Live Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4"
                onClick={() => navigate('/workflow-templates')}
              >
                <Download className="w-5 h-5 mr-2" />
                Explore Templates
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {businessImpactMetrics.map((metric, index) => (
                <MotionDiv
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${metric.color} flex items-center justify-center text-white`}
                  >
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{metric.metric}</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {metric.description}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Competitive Comparison */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Competitive Analysis
            </Badge>
            <h2 className="text-4xl font-bold mb-4">How We Compare to Industry Leaders</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See why leading organizations choose our platform over traditional automation tools
            </p>
          </MotionDiv>

          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      Our Platform
                    </div>
                  </th>
                  <th className="text-center p-6 font-semibold">Zapier</th>
                  <th className="text-center p-6 font-semibold">n8n</th>
                  <th className="text-center p-6 font-semibold">Power Automate</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <MotionTr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-t hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-6">
                      <div>
                        <div className="font-semibold">{row.feature}</div>
                        <div className="text-sm text-muted-foreground">{row.description}</div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(row.ourPlatform.status)}
                        {getStatusBadge(row.ourPlatform.status, row.ourPlatform.value)}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(row.zapier.status)}
                        {getStatusBadge(row.zapier.status, row.zapier.value)}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(row.n8n.status)}
                        {getStatusBadge(row.n8n.status, row.n8n.value)}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(row.powerAutomate.status)}
                        {getStatusBadge(row.powerAutomate.status, row.powerAutomate.value)}
                      </div>
                    </td>
                  </MotionTr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Unique Advantages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Star className="w-4 h-4 mr-2" />
              Unique Advantages
            </Badge>
            <h2 className="text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the breakthrough features that set us apart from every other automation
              platform
            </p>
          </MotionDiv>

          <Tabs
            value={activeFeature}
            onValueChange={setActiveFeature}
            className="max-w-6xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {uniqueAdvantages.map(advantage => (
                <TabsTrigger key={advantage.id} value={advantage.id} className="text-sm">
                  {advantage.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {uniqueAdvantages.map(advantage => (
              <TabsContent key={advantage.id} value={advantage.id}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-8 lg:p-12">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${advantage.color} flex items-center justify-center text-white mb-6`}
                        >
                          {advantage.icon}
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{advantage.title}</h3>
                        <p className="text-lg text-muted-foreground mb-6">
                          {advantage.description}
                        </p>
                        <ul className="space-y-3">
                          {advantage.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className={`bg-gradient-to-br ${advantage.color} p-8 lg:p-12 flex items-center justify-center`}
                      >
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">{advantage.icon}</div>
                          <div className="text-2xl font-bold mb-2">Industry First</div>
                          <div className="text-lg opacity-90">
                            No competitor offers this capability
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Award className="w-4 h-4 mr-2" />
              Complete Platform
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Comprehensive Feature Set</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every feature you need for enterprise-grade AI workflow automation, all in one
              platform
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((category, categoryIndex) => (
              <MotionDiv
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <Target className="w-4 h-4 mr-2" />
              Measurable Impact
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Proven Business Results</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Organizations using our platform achieve measurable improvements in efficiency, cost,
              and reliability
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessImpactMetrics.map((metric, index) => (
              <MotionDiv
                key={metric.metric}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${metric.color} flex items-center justify-center text-white`}
                    >
                      {metric.icon}
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{metric.metric}</div>
                    <div className="text-lg font-semibold mb-3">{metric.description}</div>
                    <div className="text-sm text-muted-foreground">{metric.detail}</div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Lead the AI Revolution?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join the organizations that are already transforming their operations with the world's
              most advanced AI workflow automation platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
                onClick={() => navigate('/ai-workflow-studio/new')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate('/workflow-templates')}
              >
                <Globe className="w-5 h-5 mr-2" />
                Explore Platform
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default PlatformShowcase;
