import React, { useState, useEffect } from 'react';
import {
  SafeAnimatePresence,
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
  Calendar,
  CheckCircle,
  Clock,
  Rocket,
  Zap,
  Brain,
  Layers,
  Star,
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Smartphone,
  Code,
  Shield,
  Award,
  Play,
  Pause,
  BarChart3,
  Coins,
  Crown,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Twitter,
  MessageCircle,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  Bell,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoadmapSectionProps {
  compact?: boolean;
}

interface RoadmapPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  timeline: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'critical';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  features: {
    name: string;
    description: string;
    status: 'done' | 'progress' | 'planned';
    impact: 'high' | 'medium' | 'low';
  }[];
  metrics: {
    label: string;
    value: string;
    target: string;
    icon: React.ReactNode;
  }[];
  marketingActions: {
    channel: string;
    action: string;
    budget: string;
    roi: string;
    icon: React.ReactNode;
  }[];
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  investment: string;
  expectedROI: string;
  keyPartners: string[];
  risks: string[];
  successMetrics: string[];
}

const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'foundation-complete',
    title: 'Foundation & Platform Architecture',
    subtitle: '✅ COMPLETED - Ready for Launch',
    description:
      'Complete platform foundation with production-ready infrastructure, stunning UI/UX, and comprehensive backend systems',
    timeline: 'Q1 2025 - Q2 2025',
    duration: '6 months',
    status: 'completed',
    priority: 'high',
    progress: 100,
    features: [
      {
        name: 'Production Website & Landing Pages',
        description: 'Fully responsive, animated website with global background effects',
        status: 'done',
        impact: 'high',
      },
      {
        name: 'Waitlist System & Database',
        description: 'Supabase-powered waitlist with admin panel and analytics',
        status: 'done',
        impact: 'high',
      },
      {
        name: 'Token Integration Framework',
        description: 'Solana token widgets and real-time market data integration',
        status: 'done',
        impact: 'medium',
      },
      {
        name: 'Brand Identity & Visual System',
        description: 'Complete branding with premium logo, colors, and design system',
        status: 'done',
        impact: 'high',
      },
    ],
    metrics: [
      {
        label: 'Website Performance',
        value: '98/100',
        target: '95+',
        icon: <Zap className="w-4 h-4" />,
      },
      {
        label: 'Mobile Responsiveness',
        value: '100%',
        target: '100%',
        icon: <Smartphone className="w-4 h-4" />,
      },
      { label: 'Code Quality', value: 'A+', target: 'A', icon: <Code className="w-4 h-4" /> },
      {
        label: 'Security Score',
        value: '95/100',
        target: '90+',
        icon: <Shield className="w-4 h-4" />,
      },
    ],
    marketingActions: [],
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-teal-600/10',
    investment: '$15,000',
    expectedROI: 'Foundation for $1M+ valuation',
    keyPartners: ['Supabase', 'Vercel', 'GitHub'],
    risks: ['None - Completed successfully'],
    successMetrics: ['Website live', 'Waitlist functional', 'Brand established'],
  },
  {
    id: 'aggressive-marketing',
    title: 'Marketing Campaign Success',
    subtitle: '✅ COMPLETED - €10K Campaign Success',
    description:
      'Successfully completed €10,000 marketing campaign that drove significant community growth and token appreciation. Achieved major milestones and built strong foundation.',
    timeline: 'January - May 2025',
    duration: '5 months',
    status: 'completed',
    priority: 'high',
    progress: 100,
    features: [
      {
        name: 'Social Media Campaign Success',
        description: 'Successful Twitter, Instagram, TikTok campaigns reached 100K+ users',
        status: 'done',
        impact: 'high',
      },
      {
        name: 'Crypto Influencer Network',
        description: 'Built partnerships with 25+ crypto influencers and KOLs',
        status: 'done',
        impact: 'high',
      },
      {
        name: 'Community Growth Achievement',
        description: 'Grew Discord to 5K+ members, active Telegram and Reddit presence',
        status: 'done',
        impact: 'high',
      },
      {
        name: 'Content & SEO Success',
        description: 'Published 50+ blog posts, achieved top rankings for AI workflow keywords',
        status: 'done',
        impact: 'medium',
      },
    ],
    metrics: [
      {
        label: 'Token Market Cap',
        value: '$150K',
        target: '$100K',
        icon: <DollarSign className="w-4 h-4" />,
      },
      {
        label: 'Community Members',
        value: '5,200',
        target: '2,500',
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: 'Social Media Reach',
        value: '125K',
        target: '50K',
        icon: <Globe className="w-4 h-4" />,
      },
      {
        label: 'Marketing ROI',
        value: '450%',
        target: '300%+',
        icon: <TrendingUp className="w-4 h-4" />,
      },
    ],
    marketingActions: [
      {
        channel: 'Crypto Twitter',
        action: 'Daily engagement, token updates, community building',
        budget: '€3,000',
        roi: '250%+',
        icon: <Twitter className="w-4 h-4" />,
      },
      {
        channel: 'Crypto Influencers',
        action: 'Micro-influencers, token reviews, community AMAs',
        budget: '€4,000',
        roi: '300%+',
        icon: <Youtube className="w-4 h-4" />,
      },
      {
        channel: 'Social Media Ads',
        action: 'Targeted Instagram, TikTok, and Facebook campaigns',
        budget: '€2,000',
        roi: '200%+',
        icon: <Instagram className="w-4 h-4" />,
      },
      {
        channel: 'Community Growth',
        action: 'Discord events, Telegram campaigns, Reddit engagement',
        budget: '€1,000',
        roi: '400%+',
        icon: <MessageCircle className="w-4 h-4" />,
      },
    ],
    icon: <Rocket className="w-6 h-6" />,
    color: 'from-red-500 to-orange-600',
    bgGradient: 'from-red-500/10 to-orange-600/10',
    investment: '€10,000',
    expectedROI: '1000%+ (Target: $100K market cap)',
    keyPartners: ['Crypto Twitter KOLs', 'Telegram Groups', 'Discord Communities', 'TikTok Creators'],
    risks: ['Market volatility', 'Competition', 'Budget efficiency'],
    successMetrics: ['$100K market cap', '2.5K community members', '50K social reach'],
  },
  {
    id: 'token-launch',
    title: 'AI Platform MVP Development',
    subtitle: '🤖 ACTIVE NOW - Building Core Product',
    description:
      'Currently developing the core AI workflow platform with essential features. Building on our marketing success to create the revolutionary product our community expects.',
    timeline: 'June - August 2025',
    duration: '90 days',
    status: 'in-progress',
    priority: 'high',
    progress: 25,
    features: [
      {
        name: 'AR Workflow Builder',
        description: 'Mobile AR interface for building AI workflows in 3D space',
        status: 'progress',
        impact: 'high',
      },
      {
        name: 'Real AI Service Integrations',
        description: 'OpenAI, Google AI, Anthropic, and 50+ AI service connections',
        status: 'progress',
        impact: 'high',
      },
      {
        name: 'Visual Workflow Designer',
        description: 'Drag-and-drop interface for complex automation workflows',
        status: 'progress',
        impact: 'high',
      },
      {
        name: 'Beta Testing Program',
        description: 'Invite 1000 early users for comprehensive platform testing',
        status: 'planned',
        impact: 'medium',
      },
    ],
    metrics: [
      {
        label: 'Development Progress',
        value: '25%',
        target: '100%',
        icon: <Code className="w-4 h-4" />,
      },
      { label: 'Beta Users', value: '0', target: '1,000', icon: <Users className="w-4 h-4" /> },
      { label: 'AI Integrations', value: '12', target: '50+', icon: <Brain className="w-4 h-4" /> },
      {
        label: 'Platform Uptime',
        value: '99.2%',
        target: '99.9%',
        icon: <Shield className="w-4 h-4" />,
      },
    ],
    marketingActions: [
      {
        channel: 'Expanded Social Media',
        action: 'Scale successful campaigns across all platforms',
        budget: '€8,000',
        roi: '400%+',
        icon: <Twitter className="w-4 h-4" />,
      },
      {
        channel: 'Influencer Network',
        action: 'Build relationships with larger crypto influencers',
        budget: '€5,000',
        roi: '500%+',
        icon: <Crown className="w-4 h-4" />,
      },
      {
        channel: 'Community Events',
        action: 'AMAs, contests, community challenges, and rewards',
        budget: '€1,500',
        roi: '300%+',
        icon: <Gift className="w-4 h-4" />,
      },
      {
        channel: 'Partnership Marketing',
        action: 'Cross-promotion with partner projects and communities',
        budget: '€500',
        roi: '600%+',
        icon: <Sparkles className="w-4 h-4" />,
      },
    ],
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 to-orange-500/10',
    investment: '€15,000',
    expectedROI: '3000%+ (Target: $500K market cap)',
    keyPartners: ['Crypto Communities', 'Solana Ecosystem', 'DeFi Platforms', 'Content Creators'],
    risks: ['Market conditions', 'Competition', 'Community growth rate'],
    successMetrics: ['$500K market cap', '5K community members', '1K holders'],
  },
  {
    id: 'platform-development',
    title: 'Platform Beta Launch & Testing',
    subtitle: '🚀 NEXT PHASE - Beta Release',
    description:
      'Launch beta version of the AI platform to our community, gather feedback, and iterate rapidly based on user input to perfect the product.',
    timeline: 'September - November 2025',
    duration: '90 days',
    status: 'upcoming',
    priority: 'high',
    progress: 0,
    features: [
      {
        name: 'Beta Platform Launch',
        description: 'Release beta version to community with core AI workflow features',
        status: 'planned',
        impact: 'high',
      },
      {
        name: 'User Feedback Integration',
        description: 'Collect and implement user feedback for rapid product iteration',
        status: 'planned',
        impact: 'high',
      },
      {
        name: 'Performance Optimization',
        description: 'Optimize platform performance based on real user usage patterns',
        status: 'planned',
        impact: 'high',
      },
      {
        name: 'Community Onboarding',
        description: 'Onboard 1000+ beta users with comprehensive tutorials and support',
        status: 'planned',
        impact: 'medium',
      },
    ],
    metrics: [
      {
        label: 'Development Progress',
        value: '0%',
        target: '100%',
        icon: <Code className="w-4 h-4" />,
      },
      { label: 'Beta Users', value: '0', target: '1,000', icon: <Users className="w-4 h-4" /> },
      { label: 'AI Integrations', value: '0', target: '50+', icon: <Brain className="w-4 h-4" /> },
      {
        label: 'Platform Uptime',
        value: '0%',
        target: '99.9%',
        icon: <Shield className="w-4 h-4" />,
      },
    ],
    marketingActions: [
      {
        channel: 'Tech Media',
        action: 'Product launches, demo videos, tech reviews',
        budget: '$15,000',
        roi: '400%+',
        icon: <Youtube className="w-4 h-4" />,
      },
      {
        channel: 'Beta Program',
        action: 'Exclusive access, user feedback, testimonials',
        budget: '$10,000',
        roi: '600%+',
        icon: <Users className="w-4 h-4" />,
      },
      {
        channel: 'Developer Community',
        action: 'API documentation, developer tools, integrations',
        budget: '$8,000',
        roi: '300%+',
        icon: <Code className="w-4 h-4" />,
      },
    ],
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-500/10 to-pink-600/10',
    investment: '€50,000',
    expectedROI: '2000%+ (Platform value + user growth)',
    keyPartners: ['OpenAI', 'Anthropic', 'Vercel', 'Supabase'],
    risks: ['Development timeline', 'User adoption', 'Technical challenges'],
    successMetrics: ['MVP launch', '500 beta users', 'Core features working'],
  },
  {
    id: 'scale-monetize',
    title: 'Growth & Monetization',
    subtitle: '💰 REVENUE START - Sustainable Business',
    description:
      'Scale platform to 5K+ users, implement basic subscription model, and achieve initial revenue streams with community-driven growth',
    timeline: 'December 2025 - June 2026',
    duration: '6 months',
    status: 'upcoming',
    priority: 'medium',
    progress: 0,
    features: [
      {
        name: 'Basic Subscription Model',
        description: 'Free tier and Pro tier ($19/mo) with essential features',
        status: 'planned',
        impact: 'high',
      },
      {
        name: 'User Onboarding System',
        description: 'Smooth user experience, tutorials, and support system',
        status: 'planned',
        impact: 'high',
      },
      {
        name: 'Community Features',
        description: 'User forums, template sharing, community challenges',
        status: 'planned',
        impact: 'medium',
      },
      {
        name: 'Analytics Dashboard',
        description: 'User analytics, usage tracking, performance metrics',
        status: 'planned',
        impact: 'medium',
      },
    ],
    metrics: [
      { label: 'Monthly Users', value: '0', target: '5K+', icon: <Users className="w-4 h-4" /> },
      {
        label: 'Monthly Revenue',
        value: '$0',
        target: '$10K+',
        icon: <DollarSign className="w-4 h-4" />,
      },
      {
        label: 'Paying Users',
        value: '0',
        target: '500+',
        icon: <Award className="w-4 h-4" />,
      },
      { label: 'User Retention', value: '0%', target: '70%+', icon: <TrendingUp className="w-4 h-4" /> },
    ],
    marketingActions: [
      {
        channel: 'Enterprise Sales',
        action: 'B2B sales team, enterprise demos, custom solutions',
        budget: '$100,000',
        roi: '500%+',
        icon: <Award className="w-4 h-4" />,
      },
      {
        channel: 'Global Marketing',
        action: 'International campaigns, local partnerships, regional events',
        budget: '$200,000',
        roi: '400%+',
        icon: <Globe className="w-4 h-4" />,
      },
      {
        channel: 'Product Marketing',
        action: 'Feature announcements, case studies, success stories',
        budget: '$50,000',
        roi: '600%+',
        icon: <TrendingUp className="w-4 h-4" />,
      },
    ],
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/10 to-emerald-600/10',
    investment: '€75,000',
    expectedROI: '1000%+ (Sustainable revenue growth)',
    keyPartners: ['Payment Processors', 'Cloud Providers', 'AI Services', 'Community Partners'],
    risks: ['User acquisition', 'Competition', 'Market adoption'],
    successMetrics: ['5K users', '$10K MRR', '500 paying customers'],
  },
];

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ compact = false }) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('aggressive-marketing');
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'marketing' | 'metrics'>(
    'overview'
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(1);

  // Auto-play through phases
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentPhaseIndex(prev => (prev + 1) % roadmapPhases.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setExpandedPhase(roadmapPhases[currentPhaseIndex].id);
  }, [currentPhaseIndex]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    setIsPlaying(false);
  };

  const scrollToPhase = (phaseId: string) => {
    const element = document.getElementById(`phase-${phaseId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setExpandedPhase(phaseId);
      setIsPlaying(false);
    }
  };

  const getTotalInvestment = () => {
    return roadmapPhases.reduce((total, phase) => {
      const investment = parseInt(phase.investment.replace(/[$,]/g, ''));
      return total + investment;
    }, 0);
  };

  const getCompletedInvestment = () => {
    return roadmapPhases
      .filter(phase => phase.status === 'completed')
      .reduce((total, phase) => {
        const investment = parseInt(phase.investment.replace(/[$,]/g, ''));
        return total + investment;
      }, 0);
  };

  return (
    <section className={`${compact ? 'py-8 md:py-12' : 'py-20 md:py-32'} relative overflow-hidden`}>
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-background/10 z-[5]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header with Live Stats */}
        <MotionDiv
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <MotionDiv
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full px-4 py-2 border border-emerald-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-400">LIVE ROADMAP</span>
            </MotionDiv>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-foreground">FlowsyAI</span>
            <span className="block bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
              Launch Strategy
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Our aggressive go-to-market strategy with{' '}
            <span className="text-primary font-semibold">
              ${getTotalInvestment().toLocaleString()}
            </span>{' '}
            total investment to achieve{' '}
            <span className="text-gold font-semibold">$10M+ valuation</span> and become the leading
            AI workflow automation platform.
          </p>

          {/* Investment Overview */}
          <MotionDiv
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="premium-card p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <div className="text-2xl font-bold text-emerald-400">
                ${getCompletedInvestment().toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Invested</div>
            </div>
            <div className="premium-card p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
              <div className="text-2xl font-bold text-blue-400">$50K</div>
              <div className="text-sm text-muted-foreground">Marketing Budget</div>
            </div>
            <div className="premium-card p-4 rounded-xl border border-gold/30 bg-gold/10">
              <div className="text-2xl font-bold text-gold">50K</div>
              <div className="text-sm text-muted-foreground">Waitlist Target</div>
            </div>
            <div className="premium-card p-4 rounded-xl border border-purple-500/30 bg-purple-500/10">
              <div className="text-2xl font-bold text-purple-400">$10M</div>
              <div className="text-sm text-muted-foreground">Valuation Goal</div>
            </div>
          </MotionDiv>

          {/* Interactive Phase Navigation */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {roadmapPhases.map((phase, index) => (
              <MotionButton
                key={phase.id}
                type="button"
                onClick={() => scrollToPhase(phase.id)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  expandedPhase === phase.id
                    ? `bg-gradient-to-r ${phase.color} text-white shadow-xl shadow-primary/20`
                    : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  {phase.icon}
                  <span className="hidden sm:inline">{phase.title}</span>
                  <span className="sm:hidden">Phase {index + 1}</span>
                </div>
                {expandedPhase === phase.id && (
                  <MotionDiv
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                    layoutId="activePhase"
                  />
                )}
                {phase.status === 'critical' && (
                  <MotionDiv
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </MotionButton>
            ))}
          </MotionDiv>

          {/* Progress Overview */}
          <MotionDiv
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="premium-card p-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-gold/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Overall Progress</h3>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    roadmapPhases.reduce((acc, phase) => acc + phase.progress, 0) /
                      roadmapPhases.length
                  )}
                  %
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-3 mb-4">
                <MotionDiv
                  className="h-3 rounded-full bg-gradient-to-r from-primary to-gold"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${roadmapPhases.reduce((acc, phase) => acc + phase.progress, 0) / roadmapPhases.length}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {roadmapPhases.map((phase, index) => (
                  <div key={phase.id} className="text-center">
                    <div
                      className={`w-full h-2 rounded-full mb-1 ${
                        phase.status === 'completed'
                          ? 'bg-emerald-500'
                          : phase.status === 'in-progress' || phase.status === 'critical'
                            ? 'bg-blue-500'
                            : 'bg-muted'
                      }`}
                    />
                    <div className="text-xs text-muted-foreground">Q{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>

        {/* Enhanced Interactive Timeline */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Enhanced Timeline Line with Gradient */}
            <MotionDiv
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-green-500 transform md:-translate-x-0.5 rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.3)',
                  '0 0 20px rgba(16, 185, 129, 0.6)',
                  '0 0 10px rgba(16, 185, 129, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Timeline Glow Effect */}
            <MotionDiv
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-4 bg-gradient-to-b from-emerald-500/20 to-green-500/20 transform md:-translate-x-2 blur-sm"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Floating Progress Indicator */}
            <MotionDiv
              className="absolute left-8 md:left-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1.5 md:-translate-x-1.5 shadow-lg"
              animate={{
                y: [0, -20, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ top: '25%' }}
            />

            {/* Interactive Roadmap Phases */}
            <div className="space-y-16">
              {roadmapPhases.map((phase, index) => (
                <MotionDiv
                  key={phase.id}
                  id={`phase-${phase.id}`}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Enhanced Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 transform -translate-x-3 md:-translate-x-3 z-20">
                    <MotionDiv
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${phase.color} border-4 border-background shadow-xl relative`}
                      whileHover={{ scale: 1.3, rotate: 180 }}
                      animate={expandedPhase === phase.id ? {
                        scale: 1.2,
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                      } : {
                        scale: 1,
                        boxShadow: '0 0 0px rgba(59, 130, 246, 0)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Pulsing ring for active phases */}
                      {(phase.status === 'in-progress' || phase.status === 'critical') && (
                        <MotionDiv
                          className="absolute inset-0 rounded-full border-2 border-blue-500"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Status Icon Overlay */}
                      {phase.status === 'completed' && (
                        <MotionDiv
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CheckCircle className="absolute -top-1 -left-1 w-8 h-8 text-emerald-500 bg-background rounded-full p-1" />
                        </MotionDiv>
                      )}
                      {(phase.status === 'in-progress' || phase.status === 'critical') && (
                        <MotionDiv
                          className="absolute -top-1 -left-1 w-8 h-8 bg-background rounded-full p-1"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        >
                          <Clock className="w-6 h-6 text-blue-500" />
                        </MotionDiv>
                      )}
                      {phase.status === 'upcoming' && (
                        <MotionDiv
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <Star className="absolute -top-1 -left-1 w-8 h-8 text-gold bg-background rounded-full p-1" />
                        </MotionDiv>
                      )}

                      {/* Priority Indicator */}
                      {phase.priority === 'high' && (
                        <MotionDiv
                          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </MotionDiv>

                    {/* Investment Badge */}
                    <MotionDiv
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${phase.bgGradient} border border-primary/20 whitespace-nowrap`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {phase.investment}
                    </MotionDiv>
                  </div>

                  {/* Enhanced Interactive Content Card */}
                  <div
                    className={`w-full md:w-6/12 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                  >
                    <MotionDiv
                      className={`premium-card p-8 rounded-3xl border-2 transition-all duration-500 group cursor-pointer relative overflow-hidden ${
                        expandedPhase === phase.id
                          ? `border-primary/50 shadow-2xl shadow-primary/20 bg-gradient-to-br ${phase.bgGradient}`
                          : 'border-border/30 hover:border-primary/30 hover:shadow-xl'
                      }`}
                      onClick={() => togglePhase(phase.id)}
                      onHoverStart={() => setHoveredPhase(phase.id)}
                      onHoverEnd={() => setHoveredPhase(null)}
                      whileHover={{ scale: 1.02, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      {/* Background Glow Effect */}
                      {expandedPhase === phase.id && (
                        <MotionDiv
                          className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-5 rounded-3xl`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.05 }}
                          exit={{ opacity: 0 }}
                        />
                      )}

                      {/* Header with Status and Timeline */}
                      <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${phase.color} text-white shadow-lg`}
                          >
                            {phase.icon}
                            <span className="capitalize">{phase.status.replace('-', ' ')}</span>
                          </div>
                          {phase.priority === 'high' && (
                            <MotionDiv
                              className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              HIGH PRIORITY
                            </MotionDiv>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{phase.timeline}</span>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          <span>{phase.duration}</span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mb-4 relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors mb-1">
                              {phase.title}
                            </h3>
                            <p className="text-sm font-medium text-primary/80 mb-3">
                              {phase.subtitle}
                            </p>
                          </div>
                          <MotionDiv
                            animate={{ rotate: expandedPhase === phase.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4"
                          >
                            {expandedPhase === phase.id ? (
                              <ChevronUp className="w-6 h-6 text-primary" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-muted-foreground" />
                            )}
                          </MotionDiv>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-base">
                          {phase.description}
                        </p>
                      </div>

                      {/* Enhanced Progress & Investment Info */}
                      <div className="mb-6 relative z-10">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <MotionDiv
                            className="premium-card p-3 rounded-xl bg-background/50 border border-border/30"
                            whileHover={{
                              scale: 1.05,
                              borderColor: 'rgba(59, 130, 246, 0.5)',
                              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-xs text-muted-foreground mb-1">Progress</div>
                            <MotionDiv
                              className="text-lg font-bold text-primary"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {phase.progress}%
                            </MotionDiv>
                          </MotionDiv>
                          <MotionDiv
                            className="premium-card p-3 rounded-xl bg-background/50 border border-border/30"
                            whileHover={{
                              scale: 1.05,
                              borderColor: 'rgba(255, 215, 0, 0.5)',
                              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.1)'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-xs text-muted-foreground mb-1">Investment</div>
                            <MotionDiv
                              className="text-lg font-bold text-gold"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2.5, repeat: Infinity }}
                            >
                              {phase.investment}
                            </MotionDiv>
                          </MotionDiv>
                        </div>

                        <div className="w-full bg-muted/50 rounded-full h-3 mb-2 overflow-hidden">
                          <MotionDiv
                            className={`h-3 rounded-full bg-gradient-to-r ${phase.color} relative`}
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: `${phase.progress}%`, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2.5, delay: index * 0.2, ease: 'easeOut' }}
                          >
                            {phase.progress > 0 && (
                              <>
                                <MotionDiv
                                  className="absolute right-0 top-0 h-full w-1 bg-white/70"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <MotionDiv
                                  className="absolute inset-0 bg-white/20 rounded-full"
                                  animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.2, 0.4, 0.2]
                                  }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                />
                              </>
                            )}
                          </MotionDiv>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Expected ROI: {phase.expectedROI}</span>
                          <span>Duration: {phase.duration}</span>
                        </div>
                      </div>

                      {/* Enhanced Expandable Content with Tabs */}
                      <SafeAnimatePresence>
                        {expandedPhase === phase.id && (
                          <MotionDiv
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="overflow-hidden relative z-10"
                          >
                            {/* Tab Navigation */}
                            <div className="flex items-center gap-2 mb-6 p-1 bg-muted/30 rounded-xl">
                              {['features', 'marketing', 'metrics'].map(tab => (
                                <button
                                  key={tab}
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setActiveTab(tab as 'features' | 'marketing' | 'metrics');
                                  }}
                                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab
                                      ? 'bg-primary text-white shadow-lg'
                                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                  }`}
                                >
                                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                              ))}
                            </div>

                            {/* Tab Content */}
                            <SafeAnimatePresence mode="wait">
                              {activeTab === 'features' && (
                                <MotionDiv
                                  key="features"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-3"
                                >
                                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <Layers className="w-4 h-4" />
                                    Key Features & Deliverables
                                  </h4>
                                  <div className="grid gap-3">
                                    {phase.features.map((feature, featureIndex) => (
                                      <MotionDiv
                                        key={featureIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: featureIndex * 0.1 }}
                                        className="premium-card p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                                      >
                                        <div className="flex items-start gap-3">
                                          <MotionDiv
                                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                              feature.status === 'done'
                                                ? 'bg-emerald-500/20 text-emerald-500'
                                                : feature.status === 'progress'
                                                  ? 'bg-blue-500/20 text-blue-500'
                                                  : 'bg-muted text-muted-foreground'
                                            }`}
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ duration: 0.3 }}
                                          >
                                            {feature.status === 'done' ? (
                                              <MotionDiv
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: featureIndex * 0.1 }}
                                              >
                                                <CheckCircle className="w-4 h-4" />
                                              </MotionDiv>
                                            ) : feature.status === 'progress' ? (
                                              <MotionDiv
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                              >
                                                <Clock className="w-4 h-4" />
                                              </MotionDiv>
                                            ) : (
                                              <MotionDiv
                                                animate={{
                                                  rotate: [0, 10, -10, 0],
                                                  scale: [1, 1.1, 1]
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                              >
                                                <Star className="w-4 h-4" />
                                              </MotionDiv>
                                            )}
                                          </MotionDiv>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {feature.name}
                                              </h5>
                                              <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                  feature.impact === 'high'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : feature.impact === 'medium'
                                                      ? 'bg-yellow-500/20 text-yellow-400'
                                                      : 'bg-green-500/20 text-green-400'
                                                }`}
                                              >
                                                {feature.impact} impact
                                              </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                              {feature.description}
                                            </p>
                                          </div>
                                        </div>
                                      </MotionDiv>
                                    ))}
                                  </div>
                                </MotionDiv>
                              )}

                              {activeTab === 'marketing' && phase.marketingActions.length > 0 && (
                                <MotionDiv
                                  key="marketing"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-3"
                                >
                                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Marketing Strategy & Budget
                                  </h4>
                                  <div className="grid gap-3">
                                    {phase.marketingActions.map((action, actionIndex) => (
                                      <MotionDiv
                                        key={actionIndex}
                                        initial={{ opacity: 0, y: 10, x: -20 }}
                                        animate={{ opacity: 1, y: 0, x: 0 }}
                                        transition={{ delay: actionIndex * 0.15, duration: 0.5 }}
                                        whileHover={{
                                          scale: 1.02,
                                          x: 5,
                                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                                        }}
                                        className="premium-card p-4 rounded-xl border border-border/30 hover:border-gold/30 transition-all duration-300 group cursor-pointer"
                                      >
                                        <div className="flex items-start gap-3">
                                          <MotionDiv
                                            className="w-8 h-8 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0"
                                            whileHover={{
                                              scale: 1.2,
                                              rotate: 360,
                                              backgroundColor: 'rgba(255, 215, 0, 0.3)'
                                            }}
                                            transition={{ duration: 0.3 }}
                                          >
                                            {action.icon}
                                          </MotionDiv>
                                          <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                              <h5 className="font-semibold text-foreground group-hover:text-gold transition-colors">
                                                {action.channel}
                                              </h5>
                                              <div className="flex items-center gap-2 text-sm">
                                                <span className="text-gold font-bold">
                                                  {action.budget}
                                                </span>
                                                <span className="text-emerald-500 font-medium">
                                                  ROI: {action.roi}
                                                </span>
                                              </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                              {action.action}
                                            </p>
                                          </div>
                                        </div>
                                      </MotionDiv>
                                    ))}
                                  </div>
                                </MotionDiv>
                              )}

                              {activeTab === 'metrics' && (
                                <MotionDiv
                                  key="metrics"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-4"
                                >
                                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4" />
                                    Success Metrics & KPIs
                                  </h4>

                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    {phase.metrics.map((metric, metricIndex) => (
                                      <MotionDiv
                                        key={metricIndex}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: metricIndex * 0.15, duration: 0.5 }}
                                        whileHover={{
                                          scale: 1.05,
                                          y: -5,
                                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                        }}
                                        className="premium-card p-4 rounded-xl border border-border/30 hover:border-sapphire/30 transition-all duration-300 text-center group cursor-pointer"
                                      >
                                        <MotionDiv
                                          className="w-8 h-8 rounded-lg bg-sapphire/20 text-sapphire flex items-center justify-center mx-auto mb-2"
                                          whileHover={{ rotate: 360 }}
                                          transition={{ duration: 0.5 }}
                                        >
                                          {metric.icon}
                                        </MotionDiv>
                                        <div className="text-xs text-muted-foreground mb-1">
                                          {metric.label}
                                        </div>
                                        <MotionDiv
                                          className="text-lg font-bold text-foreground group-hover:text-sapphire transition-colors"
                                          animate={{ scale: [1, 1.02, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        >
                                          {metric.value}
                                        </MotionDiv>
                                        <div className="text-xs text-emerald-500 font-medium">
                                          Target: {metric.target}
                                        </div>
                                      </MotionDiv>
                                    ))}
                                  </div>

                                  {/* Additional Info */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="premium-card p-4 rounded-xl border border-border/30">
                                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <Award className="w-4 h-4 text-gold" />
                                        Success Metrics
                                      </h5>
                                      <ul className="space-y-1 text-sm text-muted-foreground">
                                        {phase.successMetrics.map((metric, idx) => (
                                          <li key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            {metric}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="premium-card p-4 rounded-xl border border-border/30">
                                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-red-500" />
                                        Risk Factors
                                      </h5>
                                      <ul className="space-y-1 text-sm text-muted-foreground">
                                        {phase.risks.map((risk, idx) => (
                                          <li key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                            {risk}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </MotionDiv>
                              )}
                            </SafeAnimatePresence>
                          </MotionDiv>
                        )}
                      </SafeAnimatePresence>

                      {/* Enhanced Click Hint */}
                      {expandedPhase !== phase.id && (
                        <MotionDiv
                          className="text-center mt-4 relative z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
                            <MotionDiv
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </MotionDiv>
                            <span>Click to explore detailed strategy</span>
                            <MotionDiv
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </MotionDiv>
                          </div>
                        </MotionDiv>
                      )}
                    </MotionDiv>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action - Launch Ready */}
        <MotionDiv
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Main CTA Card */}
            <div className="premium-card p-10 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-gold/5 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-gold/10" />
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <MotionDiv
                  className="flex items-center justify-center gap-3 mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                    AI PLATFORM DEVELOPMENT ACTIVE - JUNE 2025
                  </span>
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
                </MotionDiv>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
                  Join the FlowsyAI Revolution
                </h3>

                <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
                  We're investing{' '}
                  <span className="text-gold font-bold">
                    €{(getTotalInvestment() / 1000).toFixed(0)}K
                  </span>{' '}
                  to build the future of AI workflow automation.
                  <span className="text-primary font-semibold">
                    {' '}
                    Join our growing community and be part of the revolution from day one.
                  </span>
                </p>

                {/* Live Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <MotionDiv
                    className="premium-card p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10"
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-2xl font-bold text-emerald-400 mb-1">$150K</div>
                    <div className="text-xs text-muted-foreground">Current Market Cap</div>
                  </MotionDiv>
                  <MotionDiv
                    className="premium-card p-4 rounded-xl border border-blue-500/30 bg-blue-500/10"
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">25%</div>
                    <div className="text-xs text-muted-foreground">Platform Development</div>
                  </MotionDiv>
                  <MotionDiv
                    className="premium-card p-4 rounded-xl border border-gold/30 bg-gold/10"
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-2xl font-bold text-gold mb-1">5.2K</div>
                    <div className="text-xs text-muted-foreground">Community Members</div>
                  </MotionDiv>
                  <MotionDiv
                    className="premium-card p-4 rounded-xl border border-purple-500/30 bg-purple-500/10"
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <div className="text-2xl font-bold text-purple-400 mb-1">Q3</div>
                    <div className="text-xs text-muted-foreground">Beta Launch Target</div>
                  </MotionDiv>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary via-sapphire to-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 px-12 py-6 text-lg font-bold rounded-xl group"
                    asChild
                  >
                    <a href="/waitlist" className="flex items-center gap-3">
                      <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                      Join Waitlist Now
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gold/50 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300 px-12 py-6 text-lg font-bold rounded-xl group"
                    asChild
                  >
                    <a
                      href="https://github.com/robialexz/bot-architect-studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      View on GitHub
                    </a>
                  </Button>
                </div>

                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Gift className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">
                      <span className="text-emerald-400 font-semibold">Free tokens</span> for early
                      supporters
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Crown className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">
                      <span className="text-blue-400 font-semibold">Priority access</span> to
                      platform
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">
                      <span className="text-gold font-semibold">Exclusive updates</span> & insider
                      access
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default RoadmapSection;
