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

import { Button } from '@/components/ui/button';
import {
  Brain,
  Trophy,
  BarChart3,
  Zap,
  Target,
  Crown,
  CheckCircle,
  X,
  ArrowRight,
  Star,
} from 'lucide-react';

const CompetitiveAdvantagesSection: React.FC = () => {
  const competitors = [
    {
      name: 'Zapier',
      logo: 'Z',
      color: 'bg-orange-500',
      features: {
        aiTutorial: false,
        gamification: false,
        analytics: 'Basic',
        testCoverage: 'Unknown',
        realTimeOptimization: false,
      },
    },
    {
      name: 'Make.com',
      logo: 'M',
      color: 'bg-purple-500',
      features: {
        aiTutorial: false,
        gamification: false,
        analytics: 'Limited',
        testCoverage: 'Unknown',
        realTimeOptimization: false,
      },
    },
    {
      name: 'n8n',
      logo: 'n8n',
      color: 'bg-pink-500',
      features: {
        aiTutorial: false,
        gamification: false,
        analytics: 'Basic',
        testCoverage: 'Unknown',
        realTimeOptimization: false,
      },
    },
    {
      name: 'AI Workflow Studio',
      logo: 'AWS',
      color: 'bg-gradient-to-r from-primary to-gold',
      features: {
        aiTutorial: true,
        gamification: true,
        analytics: '15+ Metrics',
        testCoverage: '80%+',
        realTimeOptimization: true,
      },
      isUs: true,
    },
  ];

  const advantages = [
    {
      icon: Brain,
      title: 'First AI-Powered Tutorial System',
      description:
        'Revolutionary step-by-step guidance with real-time validation and intelligent hints',
      badge: 'INDUSTRY FIRST',
      color: 'text-gold',
    },
    {
      icon: Trophy,
      title: 'Enterprise-Grade Gamification',
      description:
        'Advanced achievement system with 4 rarity levels, challenges, and global leaderboards',
      badge: 'UNIQUE',
      color: 'text-primary',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Engine',
      description:
        '15+ performance metrics with AI-driven insights and personalized recommendations',
      badge: 'ADVANCED',
      color: 'text-emerald-500',
    },
    {
      icon: Zap,
      title: 'Enterprise Quality Assurance',
      description: '80%+ test coverage with comprehensive E2E testing and automated validation',
      badge: 'ENTERPRISE',
      color: 'text-sapphire',
    },
    {
      icon: Target,
      title: 'Real-Time Optimization',
      description: 'AI-powered workflow optimization with performance monitoring and auto-scaling',
      badge: 'INTELLIGENT',
      color: 'text-purple-500',
    },
    {
      icon: Crown,
      title: 'Automated Demo Infrastructure',
      description:
        'Complete video generation system with multi-language subtitles and professional quality',
      badge: 'REVOLUTIONARY',
      color: 'text-gold',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-gold/20 rounded-full px-6 py-2 mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-foreground">COMPETITIVE SUPERIORITY</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="block text-foreground">Why We Dominate</span>
            <span className="block bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
              The Automation Industry
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            While competitors offer basic automation, we deliver revolutionary AI-powered
            experiences that transform how teams build, learn, and optimize workflows.
          </p>
        </MotionDiv>

        {/* Competitive Comparison Table */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-background to-primary/5 rounded-2xl border border-primary/20 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-primary/10 to-gold/10">
              <h3 className="text-2xl font-bold text-center text-foreground">Feature Comparison</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left p-4 font-semibold text-foreground">Platform</th>
                    <th className="text-center p-4 font-semibold text-foreground">AI Tutorial</th>
                    <th className="text-center p-4 font-semibold text-foreground">Gamification</th>
                    <th className="text-center p-4 font-semibold text-foreground">Analytics</th>
                    <th className="text-center p-4 font-semibold text-foreground">Test Coverage</th>
                    <th className="text-center p-4 font-semibold text-foreground">
                      Real-Time Optimization
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((competitor, index) => (
                    <MotionTr
                      key={competitor.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`border-b border-primary/10 ${competitor.isUs ? 'bg-gradient-to-r from-primary/5 to-gold/5' : ''}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg ${competitor.color} flex items-center justify-center text-white font-bold text-sm`}
                          >
                            {competitor.logo}
                          </div>
                          <span
                            className={`font-semibold ${competitor.isUs ? 'text-primary' : 'text-foreground'}`}
                          >
                            {competitor.name}
                            {competitor.isUs && (
                              <span className="ml-2 text-xs bg-gold text-white px-2 py-1 rounded">
                                US
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        {competitor.features.aiTutorial ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-4">
                        {competitor.features.gamification ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-4 text-sm text-muted-foreground">
                        {competitor.features.analytics}
                      </td>
                      <td className="text-center p-4 text-sm text-muted-foreground">
                        {competitor.features.testCoverage}
                      </td>
                      <td className="text-center p-4">
                        {competitor.features.realTimeOptimization ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    </MotionTr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </MotionDiv>

        {/* Detailed Advantages */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {advantages.map((advantage, index) => (
            <MotionDiv
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-background to-primary/5 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <advantage.icon
                  className={`w-8 h-8 ${advantage.color} group-hover:scale-110 transition-transform duration-300`}
                />
                <span className="text-xs bg-gradient-to-r from-gold to-primary text-white px-2 py-1 rounded font-bold">
                  {advantage.badge}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Call to Action */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-current" />
              ))}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Ready to Experience Industry Leadership?
            </h3>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams who've already made the switch to the most advanced AI
              automation platform in the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-gold text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-10 py-6 text-lg font-semibold"
                asChild
              >
                <a href="/ai-workflow-studio/new">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg"
                asChild
              >
                <a href="/pricing">Compare All Plans</a>
              </Button>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default CompetitiveAdvantagesSection;
