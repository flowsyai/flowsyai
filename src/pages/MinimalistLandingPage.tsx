import React, { useState, useEffect } from 'react';
import MinimalistHero from '@/components/landing/MinimalistHero';
import VisualWorkflowBuilder from '@/components/landing/VisualWorkflowBuilder';
import RoadmapSection from '@/components/landing/RoadmapSection';
import TokenTierSection from '@/components/landing/TokenTierSection';
import ComingSoonModal from '@/components/ui/ComingSoonModal';
import { useComingSoon } from '@/hooks/useComingSoon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionLi,
  MotionTr,
  SafeAnimatePresence,
} from '@/lib/motion-wrapper';
import {
  ArrowRight,
  Sparkles,
  Crown,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Brain,
  Users,
  Lock,
  Zap,
  Target,
  Gauge,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MinimalistLandingPage: React.FC = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const navigate = useNavigate();
  const { isModalOpen, modalConfig, hideComingSoon, comingSoonHandlers } = useComingSoon();

  // Competitive comparison data - să ne lăudăm! 🚀
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
      feature: 'Real-time Collaboration',
      description: 'Multi-user editing and team features',
      ourPlatform: { status: 'leader', value: 'Advanced Collaboration' },
      zapier: { status: 'basic', value: 'Basic Sharing' },
      n8n: { status: 'limited', value: 'Limited Collaboration' },
      powerAutomate: { status: 'good', value: 'Team Features' },
    },
    {
      feature: 'Enterprise Security',
      description: 'Advanced security and compliance',
      ourPlatform: { status: 'leader', value: 'Enterprise-Grade' },
      zapier: { status: 'good', value: 'Good Security' },
      n8n: { status: 'basic', value: 'Basic Security' },
      powerAutomate: { status: 'good', value: 'Good Security' },
    },
  ];

  // Business impact metrics - să ne lăudăm cu cifrele! 📊
  const businessMetrics = [
    {
      metric: '75%',
      description: 'Faster Development',
      detail: 'Compared to traditional automation tools',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      metric: '60%',
      description: 'Cost Reduction',
      detail: 'In workflow development and maintenance',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      metric: '90%',
      description: 'User Satisfaction',
      detail: 'Based on customer feedback surveys',
      icon: <Gauge className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  // Unique advantages - de ce suntem cei mai tari! 🏆
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
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  // Helper function pentru status-ul comparației
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'leader':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'limited':
        return 'text-yellow-500';
      case 'basic':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'leader':
        return '🏆';
      case 'good':
        return '✅';
      case 'limited':
        return '⚠️';
      case 'basic':
        return '📝';
      default:
        return '❓';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show sticky CTA after scrolling past hero section
      setShowStickyCTA(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-wrapper bg-background text-foreground min-h-screen pulsating-gradient-bg relative">
      {/* Hero Section */}
      <MinimalistHero />

      {/* Business Impact Metrics - să ne lăudăm cu cifrele! 📊 */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-gold/5 to-primary/5">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Proven Results
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Measurable Business Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of organizations already seeing dramatic improvements in productivity
              and efficiency
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessMetrics.map((metric, index) => (
              <MotionDiv
                key={metric.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${metric.color} text-white mb-6`}
                    >
                      {metric.icon}
                    </div>
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                      {metric.metric}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{metric.description}</h3>
                    <p className="text-muted-foreground">{metric.detail}</p>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Comparison - să ne lăudăm față de competiție! 🏆 */}
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
            <h2 className="text-4xl font-bold mb-4">Why We Lead the Industry</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we compare to other automation platforms and why industry leaders choose us
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
                      Bot Architect Studio
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
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-6">
                      <div className="font-semibold">{row.feature}</div>
                      <div className="text-sm text-muted-foreground">{row.description}</div>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`font-semibold ${getStatusColor(row.ourPlatform.status)}`}>
                        {getStatusIcon(row.ourPlatform.status)} {row.ourPlatform.value}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`font-semibold ${getStatusColor(row.zapier.status)}`}>
                        {getStatusIcon(row.zapier.status)} {row.zapier.value}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`font-semibold ${getStatusColor(row.n8n.status)}`}>
                        {getStatusIcon(row.n8n.status)} {row.n8n.value}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`font-semibold ${getStatusColor(row.powerAutomate.status)}`}>
                        {getStatusIcon(row.powerAutomate.status)} {row.powerAutomate.value}
                      </div>
                    </td>
                  </MotionTr>
                ))}
              </tbody>
            </table>
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-gold text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              onClick={() => comingSoonHandlers.generic('Platform Showcase')}
            >
              <Crown className="w-5 h-5 mr-2" />
              See Full Platform Comparison
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* Visual Workflow Builder Section */}
      <VisualWorkflowBuilder />

      {/* Development Roadmap Section */}
      <RoadmapSection />

      {/* Token-Based Tier System */}
      <TokenTierSection />

      {/* Unique Advantages - de ce suntem cei mai tari! 🏆 */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Unique Advantages
            </Badge>
            <h2 className="text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the exclusive features that set us apart from every other automation platform
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {uniqueAdvantages.map((advantage, index) => (
              <MotionDiv
                key={advantage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${advantage.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {advantage.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{advantage.title}</CardTitle>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {advantage.features.map((feature, featureIndex) => (
                        <MotionDiv
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </MotionDiv>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join industry leaders who've already made the switch to the most advanced automation
                platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-gold text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  onClick={() => comingSoonHandlers.demo()}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() => comingSoonHandlers.generic('Platform Showcase')}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Full Platform Tour
                </Button>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Final Conversion CTA - High Intent */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-gold/5 to-primary/5"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-2xl rounded-2xl p-8 md:p-12"
          >
            <MotionH2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-serif"
            >
              Join <span className="premium-gradient-text">10,000+</span> Professionals
            </MotionH2>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Who are already automating their workflows with Bot Architect Studio.
              <br className="hidden md:block" />
              <strong className="text-foreground">Start your free trial today</strong> – no credit
              card required.
            </MotionP>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-sapphire via-primary to-gold text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-10 py-6 text-lg font-semibold"
                onClick={() => comingSoonHandlers.trial()}
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg"
                onClick={() => comingSoonHandlers.pricing()}
              >
                Compare Plans
              </Button>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              ✓ Free 14-day trial &nbsp;&nbsp; ✓ No setup fees &nbsp;&nbsp; ✓ Cancel anytime
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <SafeAnimatePresence>
        {showStickyCTA && (
          <MotionDiv
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border-alt shadow-2xl md:hidden"
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-sapphire to-primary text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 py-4 text-lg font-semibold"
              onClick={() => comingSoonHandlers.trial()}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
          </MotionDiv>
        )}
      </SafeAnimatePresence>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={hideComingSoon}
        feature={modalConfig.feature}
        expectedDate={modalConfig.expectedDate}
        description={modalConfig.description}
      />
    </div>
  );
};

export default MinimalistLandingPage;
