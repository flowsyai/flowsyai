import React from 'react';
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
  Workflow,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Crown,
  Layers,
  Target,
  Clock,
  Brain,
  Code,
  Mic,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Features: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'AI Agent Orchestration',
      description: 'Create and deploy intelligent AI agents that work together seamlessly',
      benefits: ['Multi-agent coordination', 'Smart task delegation', 'Autonomous decision making'],
      category: 'Core',
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: 'Visual Workflow Builder',
      description: 'Drag-and-drop interface for building complex AI automation workflows',
      benefits: ['No-code interface', 'Real-time preview', 'Template library'],
      category: 'Core',
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: 'Voice Commands',
      description: 'Control your AI agents and workflows using natural voice commands',
      benefits: ['Hands-free operation', 'Natural language processing', 'Multi-language support'],
      category: 'Premium',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Optimization',
      description: 'Automatically optimize workflows for better performance and efficiency',
      benefits: ['Performance analytics', 'Auto-optimization', 'Predictive insights'],
      category: 'Premium',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Real-time Collaboration',
      description: 'Work together with your team on AI projects in real-time',
      benefits: ['Live editing', 'Team permissions', 'Version control'],
      category: 'Premium',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Advanced Analytics',
      description: 'Deep insights into your AI agent performance and workflow efficiency',
      benefits: ['Performance metrics', 'Usage analytics', 'Custom dashboards'],
      category: 'Core',
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'API Integrations',
      description: 'Connect with thousands of external services and APIs',
      benefits: ['REST API support', 'Webhook triggers', 'Custom connectors'],
      category: 'Core',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption and compliance features',
      benefits: ['End-to-end encryption', 'SOC 2 compliance', 'Role-based access'],
      category: 'Premium',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Real-time Monitoring',
      description: 'Monitor your AI agents and workflows in real-time',
      benefits: ['Live status updates', 'Error tracking', 'Performance alerts'],
      category: 'Core',
    },
  ];

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
      <div className="relative z-20 container mx-auto px-4 py-16 max-w-screen-xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-primary to-sapphire text-background">
            <Sparkles className="w-4 h-4 mr-2" />
            Revolutionary Features
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-serif">
            Powerful AI <span className="premium-gradient-text">Features</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the cutting-edge capabilities that make our AI agent platform the most advanced
            solution for intelligent automation.
          </p>
        </MotionDiv>

        {/* Features Grid */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <MotionDiv key={feature.title} variants={itemVariants} whileHover={{ y: -4 }}>
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">{feature.icon}</div>
                    <Badge variant={feature.category === 'Premium' ? 'default' : 'secondary'}>
                      {feature.category === 'Premium' && <Crown className="w-3 h-3 mr-1" />}
                      {feature.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* CTA Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start your free trial today and discover how our AI agent platform can transform your
              workflow automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/25"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/pricing')}
                className="border-primary/20 hover:border-primary/40"
              >
                View Pricing
              </Button>
            </div>
          </GlassCard>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Features;
