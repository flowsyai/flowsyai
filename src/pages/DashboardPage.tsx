import React, { useEffect, useRef, useState } from 'react';
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
import { useScroll, useTransform } from 'framer-motion';

import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  ArrowRight,
  Bot,
  Zap,
  Brain,
  Sparkles,
  BarChart3,
  Target,
  Workflow,
  Plus,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useAuth } from '@/hooks/useAuth';
import { WorkflowService } from '@/services/workflowService';
import { AIAgentService } from '@/services/aiAgentService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/utils/logger';

function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-dashboard',
        options: {
          background: { color: '#050A14' },
          fpsLimit: 60,
          particles: {
            number: {
              value: 30,
              density: { enable: true, width: 800, height: 800 },
            },
            color: {
              value: ['#0078FF', '#FFCC33', '#D6DAE3'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: { min: 0.05, max: 0.2 },
              animation: {
                enable: true,
                speed: 0.3,
                sync: false,
              },
            },
            size: {
              value: { min: 0.1, max: 1.5 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false,
              },
            },
            links: {
              enable: true,
              color: '#0078FF',
              opacity: 0.08,
              distance: 120,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'none',
              random: false,
              straight: false,
              outModes: { default: 'bounce' },
              attract: { enable: false },
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
              resize: { enable: true },
            },
            modes: {
              repulse: { distance: 80, duration: 0.4 },
              push: { quantity: 1 },
            },
          },
          detectRetina: true,
        },
      });
    };

    initParticles();

    return () => {
      if (particlesInstance) {
        particlesInstance.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, upgradeToPremium } = useAuth();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Real data state
  const [dashboardData, setDashboardData] = useState({
    workflows: [],
    aiAgents: [],
    stats: {
      totalWorkflows: 0,
      activeAgents: 0,
      totalTasks: 0,
      agentStats: {
        total: 0,
        active: 0,
        inactive: 0,
        byType: {},
      },
    },
    isLoading: true,
  });

  // Load real data from Supabase
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/auth');
      return;
    }

    const loadDashboardData = async () => {
      try {
        setDashboardData(prev => ({ ...prev, isLoading: true }));

        // Load workflows and AI agents in parallel
        const [workflows, aiAgents, agentStats] = await Promise.all([
          WorkflowService.getUserWorkflows(user.id),
          AIAgentService.getUserAIAgents(user.id),
          AIAgentService.getAIAgentStats(user.id),
        ]);

        // Calculate total tasks (simulated based on workflows and agents)
        const totalTasks =
          workflows.length * 50 + aiAgents.filter(agent => agent.is_active).length * 100;

        setDashboardData({
          workflows,
          aiAgents,
          stats: {
            totalWorkflows: workflows.length,
            activeAgents: agentStats.active,
            totalTasks,
            agentStats,
          },
          isLoading: false,
        });
      } catch (error) {
        logger.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
        setDashboardData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadDashboardData();
  }, [user, isAuthenticated, navigate]);

  // Function to create a new AI agent
  const createNewAgent = async () => {
    if (!user) return;

    try {
      const agentTypes = [
        'Marketing AI',
        'Analytics Bot',
        'Code Assistant',
        'Customer Support',
        'Content Creator',
      ];
      const randomType = agentTypes[Math.floor(Math.random() * agentTypes.length)];

      await AIAgentService.createAIAgent(user.id, {
        name: `${randomType} ${Date.now()}`,
        type: randomType.toLowerCase().replace(' ', '_'),
        configuration: {
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 2000,
          systemPrompt: `You are a ${randomType} assistant designed to help with specific tasks.`,
        },
        isActive: true,
      });

      // Refresh dashboard data
      const [workflows, aiAgents, agentStats] = await Promise.all([
        WorkflowService.getUserWorkflows(user.id),
        AIAgentService.getUserAIAgents(user.id),
        AIAgentService.getAIAgentStats(user.id),
      ]);

      const totalTasks =
        workflows.length * 50 + aiAgents.filter(agent => agent.is_active).length * 100;

      setDashboardData({
        workflows,
        aiAgents,
        stats: {
          totalWorkflows: workflows.length,
          activeAgents: agentStats.active,
          totalTasks,
          agentStats,
        },
        isLoading: false,
      });

      toast.success(`${randomType} created successfully!`);
    } catch (error) {
      logger.error('Error creating agent:', error);
      toast.error('Failed to create new agent');
    }
  };

  // Enhanced placeholder data with more relevant metrics (fallback for loading state)
  const metrics = {
    totalAgents: dashboardData.isLoading ? '...' : dashboardData.stats.agentStats.total.toString(),
    activeWorkflows: dashboardData.isLoading
      ? '...'
      : dashboardData.stats.totalWorkflows.toString(),
    tasksCompleted: dashboardData.isLoading
      ? '...'
      : dashboardData.stats.totalTasks.toLocaleString(),
    successRate: '94.2%',
    topPerformingAgents: [
      'Marketing AI - Content Creator',
      'Code Assistant - Bug Fixer',
      'Analytics Bot - Data Processor',
    ],
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <MotionDiv
            key={i}
            className={`absolute rounded-full backdrop-blur-sm border ${i % 3 === 0 ? 'bg-primary/10 border-primary/20' : i % 3 === 1 ? 'bg-gold/10 border-gold/20' : 'bg-platinum/10 border-platinum/20'}`}
            style={{
              width: 2 + Math.random() * 6 + 'px',
              height: 2 + Math.random() * 6 + 'px',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1 + Math.random() * 0.2,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 25 + Math.random() * 25,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 container mx-auto px-4 py-12 md:py-16 max-w-screen-xl">
        <MotionDiv
          ref={sectionRef}
          style={{ opacity }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          {/* Header with Logo */}
          <div className="text-center mb-12">
            <MotionDiv
              className="w-16 h-16 mx-auto mb-6 rounded-full premium-glass flex items-center justify-center border border-gold/20 shadow-lg premium-shadow relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <MotionDiv
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary via-gold to-primary bg-[length:200%_200%] animate-gradient-slow"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-background animate-pulse-scale" />
                </div>
              </MotionDiv>
            </MotionDiv>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-serif">
              Welcome to your <span className="premium-gradient-text">Command Center</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor your AI agents, track performance, and optimize your intelligent workflows
              from your premium dashboard.
            </p>
          </div>
        </MotionDiv>

        {/* Key Metrics Section */}
        <MotionDiv
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionDiv variants={itemVariants} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground font-serif">
              Performance Overview
            </h2>
            <p className="text-muted-foreground">Real-time insights into your AI ecosystem</p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
                  icon={<Bot className="h-6 w-6 text-primary" />}
                  title="Active Agents"
                >
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {metrics.totalAgents}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-500">+3 this month</p>
                  </div>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
                  icon={<Workflow className="h-6 w-6 text-sapphire" />}
                  title="Running Workflows"
                >
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {metrics.activeWorkflows}
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-sapphire" />
                    <p className="text-sm text-sapphire">Currently active</p>
                  </div>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
                  icon={<Target className="h-6 w-6 text-gold" />}
                  title="Tasks Completed"
                >
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {metrics.tasksCompleted}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gold" />
                    <p className="text-sm text-gold">+247 today</p>
                  </div>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
                  icon={<BarChart3 className="h-6 w-6 text-platinum" />}
                  title="Success Rate"
                >
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {metrics.successRate}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-500">+2.1% this week</p>
                  </div>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>
          </div>
        </MotionDiv>

        {/* AI Agents Section */}
        <MotionDiv
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <MotionDiv variants={itemVariants} className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground font-serif">
                Your AI Agents
              </h2>
              <p className="text-muted-foreground">Manage and monitor your intelligent workforce</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => createNewAgent()}
                className="group relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold text-background font-medium rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 ease-in-out premium-border"
                size="lg"
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  New Agent
                </span>
              </Button>
              <Button
                onClick={() => navigate('/projects')}
                variant="outline"
                className="group relative overflow-hidden border-primary/20 hover:border-primary/40 hover:bg-primary/5 font-medium rounded-lg transition-all duration-300 ease-in-out"
                size="lg"
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  View All{' '}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full"
                  icon={<Bot className="h-6 w-6 text-primary" />}
                  title="Marketing AI"
                  description="Content Creation & Strategy"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    Creates engaging marketing content, develops strategies, and optimizes campaigns
                    for maximum impact.
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                      Active
                    </span>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-primary font-medium">847</span> tasks completed
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    Configure Agent
                  </Button>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full"
                  icon={<Brain className="h-6 w-6 text-sapphire" />}
                  title="Analytics Bot"
                  description="Data Processing & Insights"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    Processes complex data sets, generates insights, and provides actionable
                    recommendations for business growth.
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-sapphire/10 text-sapphire px-3 py-1 rounded-full border border-sapphire/20">
                      Running
                    </span>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-sapphire font-medium">1,203</span> analyses done
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-sapphire/20 hover:border-sapphire/40 hover:bg-sapphire/5 transition-all duration-300"
                  >
                    View Reports
                  </Button>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv variants={itemVariants} whileHover="hover">
              <MotionDiv variants={cardHoverVariants}>
                <GlassCard
                  className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full"
                  icon={<Zap className="h-6 w-6 text-gold" />}
                  title="Code Assistant"
                  description="Development & Automation"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    Writes clean code, automates development tasks, and helps optimize your software
                    development workflow.
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20">
                      Premium
                    </span>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-gold font-medium">542</span> code reviews
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold/20 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
                  >
                    Start Coding
                  </Button>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>
          </div>

          <MotionDiv variants={itemVariants} className="mt-8 text-center">
            <div className="premium-card p-6 bg-card/60 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                <Sparkles className="inline h-4 w-4 mr-2 text-gold" />
                Unlock the full potential of your AI agents with our premium features and advanced
                analytics.
              </p>
              <Button
                onClick={upgradeToPremium}
                className="group relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold text-background font-medium rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 ease-in-out premium-border"
                size="lg"
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  Upgrade to Premium{' '}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
};

export default DashboardPage;
