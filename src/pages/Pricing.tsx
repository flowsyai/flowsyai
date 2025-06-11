import React, { useState, useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionMain,
} from '@/lib/motion-wrapper';
import { useScroll, useTransform } from 'framer-motion';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Check,
  Star,
  Zap,
  ArrowRight,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Globe,
  X,
  Crown,
  Users,
  Rocket,
  Award,
  TrendingUp,
  Shield,
  Mic,
  Brain,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { type SubscriptionPlan, type PlanFeature } from '@/types/subscription';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-pricing',
        options: {
          background: { color: '#080808' },
          fpsLimit: 60,
          particles: {
            number: {
              value: 50,
              density: { enable: true, width: 800, height: 800 },
            },
            color: {
              value: ['#FF4500', '#00B300', '#FFFF00'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            size: {
              value: { min: 0.1, max: 3 },
              animation: {
                enable: true,
                speed: 1.5,
                sync: false,
              },
            },
            links: {
              enable: true,
              color: '#FF4500',
              opacity: 0.2,
              distance: 120,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
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
              repulse: { distance: 120, duration: 0.4 },
              push: { quantity: 3 },
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

interface TokenTier {
  id: string;
  name: string;
  description: string;
  tokenAmount: string;
  tokenValue: string;
  fiatPrice: string;
  tokenPrice: string;
  popular?: boolean;
  exclusive?: boolean;
  features: {
    category: string;
    items: string[];
  }[];
  benefits: string[];
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

const tokenTiers: TokenTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for freelancers and small teams starting with AI automation',
    tokenAmount: 'FREE',
    tokenValue: 'Free',
    fiatPrice: '$0/month',
    tokenPrice: '0 FA Tokens',
    features: [
      {
        category: 'Workflows',
        items: ['5 Active workflows', 'Basic templates', 'OpenAI GPT-3.5', '1GB Storage'],
      },
      {
        category: 'Support',
        items: ['Documentation', 'Community forum', 'Email support'],
      },
    ],
    benefits: ['Free forever', 'Perfect for learning', 'Active community'],
    icon: <Rocket className="w-6 h-6" />,
    gradient: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses and professional developers',
    tokenAmount: 'PRO',
    tokenValue: 'Most popular',
    fiatPrice: '$29/month',
    tokenPrice: '2.9M FA Tokens',
    popular: true,
    features: [
      {
        category: 'Workflows',
        items: [
          '50 Active workflows',
          'Premium templates',
          'OpenAI GPT-4 & Claude',
          '10GB Storage',
        ],
      },
      {
        category: 'Collaboration',
        items: ['Team workspaces', 'Version control', 'Advanced analytics'],
      },
      {
        category: 'Support',
        items: ['Priority support', 'Video tutorials', 'Live chat'],
      },
    ],
    benefits: ['Most popular', 'Professional features', 'Team collaboration'],
    icon: <Brain className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For companies that need large-scale automation',
    tokenAmount: 'BIZ',
    tokenValue: 'Scalable',
    fiatPrice: '$99/month',
    tokenPrice: '9.9M FA Tokens',
    features: [
      {
        category: 'Workflows',
        items: ['200 Active workflows', 'Custom templates', 'All AI models', '100GB Storage'],
      },
      {
        category: 'Integrations',
        items: ['API access', 'Webhooks', 'Zapier/Make compatibility', 'Custom connectors'],
      },
      {
        category: 'Enterprise',
        items: ['SSO integration', 'Advanced security', 'Dedicated support', 'SLA guaranteed'],
      },
    ],
    benefits: ['Enterprise scalability', 'Advanced integrations', 'Enhanced security'],
    icon: <Shield className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large organizations with specific requirements',
    tokenAmount: 'ENT',
    tokenValue: 'Premium',
    fiatPrice: '$299/month',
    tokenPrice: '29.9M FA Tokens',
    exclusive: true,
    features: [
      {
        category: 'Unlimited',
        items: [
          'Unlimited workflows',
          'Unlimited storage',
          'Unlimited users',
          'Custom development',
        ],
      },
      {
        category: 'Exclusive',
        items: [
          'White-label solutions',
          'On-premise deployment',
          'Custom AI training',
          'Dedicated infrastructure',
        ],
      },
      {
        category: 'VIP Support',
        items: ['Dedicated account manager', 'Strategic consulting', 'Personalized training'],
      },
    ],
    benefits: ['Personalized solutions', 'Dedicated support', 'Enterprise implementation'],
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-gold via-gold-light to-amber-500',
    borderColor: 'border-gold/50',
  },
];

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const handleSelectPlan = (planId: string) => {
    const plan = tokenTiers.find(p => p.id === planId);
    if (plan) {
      if (!isAuthenticated) {
        // Redirect to auth page if not logged in
        window.location.href = '/auth';
        return;
      }

      // For now, just show a coming soon message
      toast({
        title: 'Coming Soon!',
        description: `${plan.name} plan will be available at launch in May 2025.`,
      });
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -10, // Slightly more lift
      scale: 1.03, // Slight scale up
      boxShadow: '0 15px 30px hsla(var(--primary), 0.25)', // More vibrant shadow
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const pageMotionProps = {
    // For the main content wrapper
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden', // Or a different exit animation
    variants: fadeIn, // Using the existing fadeIn for simplicity, can be pageVariants from other files
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden premium-hero-bg">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <MotionDiv
            key={i}
            className={`absolute rounded-full backdrop-blur-sm border ${i % 3 === 0 ? 'bg-primary/10 border-primary/20' : i % 3 === 1 ? 'bg-secondary/10 border-secondary/20' : 'bg-accent/10 border-accent/20'}`}
            style={{
              width: 4 + Math.random() * 12 + 'px',
              height: 4 + Math.random() * 12 + 'px',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.4 + Math.random() * 0.4,
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

      <MotionMain
        ref={sectionRef}
        style={{ opacity }}
        className="flex-1 relative z-20"
        {...pageMotionProps}
      >
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10 max-w-screen-xl">
            {' '}
            {/* Added max-width */}
            <MotionDiv className="text-center mb-12 md:mb-16" variants={fadeIn}>
              {/* Premium Logo/Icon */}
              <MotionDiv
                className="w-24 h-24 mx-auto mb-8 rounded-full premium-glass flex items-center justify-center border border-primary/20 shadow-lg fire-glow relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MotionDiv
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary via-fire-red to-primary bg-[length:200%_200%] animate-gradient-slow"
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
                    <Rocket className="w-8 h-8 text-background animate-pulse-scale" />
                  </div>
                </MotionDiv>
              </MotionDiv>

              <MotionH1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="block text-foreground">Pricing</span>
                <span className="block bg-gradient-to-r from-gold via-primary to-sapphire bg-clip-text text-transparent">
                  Plans
                </span>
              </MotionH1>

              <MotionP
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Choose the perfect plan for your AI automation needs. Pay with traditional money or
                with <span className="text-gold font-semibold">FlowsyAI Tokens</span> for additional
                discounts.
              </MotionP>

              {/* Launch Timeline */}
              <MotionDiv
                className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-primary/20 border border-gold/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Star className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">Public Launch: May 2025</span>
                <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                  Early Bird Pricing
                </Badge>
              </MotionDiv>
            </MotionDiv>
            {/* Pricing Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {tokenTiers.map((tier, index) => (
                <MotionDiv
                  key={tier.id}
                  className={`relative ${tier.popular ? 'lg:scale-105 z-10' : ''} ${tier.exclusive ? 'lg:scale-102 z-5' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div
                    className={`h-full premium-card p-6 rounded-2xl border ${tier.borderColor} ${
                      tier.popular
                        ? 'ring-2 ring-purple-500/30 shadow-2xl shadow-purple-500/20'
                        : ''
                    } ${
                      tier.exclusive ? 'ring-2 ring-gold/40 shadow-2xl shadow-gold/20' : ''
                    } transition-all duration-300 group hover:shadow-xl`}
                  >
                    {/* Tier Badge */}
                    {(tier.popular || tier.exclusive) && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge
                          className={`${
                            tier.popular
                              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                              : 'bg-gradient-to-r from-gold to-amber-500 text-black'
                          } px-3 py-1 text-xs font-bold`}
                        >
                          {tier.popular ? 'MOST POPULAR' : 'EXCLUSIVE'}
                        </Badge>
                      </div>
                    )}

                    {/* Icon & Title */}
                    <div className="text-center mb-6">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {tier.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    {/* Pricing Options */}
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
                        {tier.tokenAmount}
                      </div>

                      {/* Dual Pricing Display */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg font-semibold text-primary">
                            {tier.fiatPrice}
                          </span>
                          <span className="text-sm text-muted-foreground">sau</span>
                        </div>
                        <div className="text-sm font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                          {tier.tokenPrice}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-2">{tier.tokenValue}</div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-6">
                      {tier.features.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                        Key Benefits
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <Badge key={benefitIndex} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${tier.gradient} text-white hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                      onClick={() => handleSelectPlan(tier.id)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Choose {tier.name}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </MotionDiv>
              ))}
            </div>
            {/* FlowsyAI Token Investment Section */}
            <MotionDiv
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="premium-card p-8 rounded-2xl max-w-6xl mx-auto border border-gold/20 mb-12">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent text-center">
                  Why Invest in FlowsyAI Token?
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Investment Benefits */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-foreground mb-4">
                      Investment Benefits
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-gold/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-gold font-bold">30%</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">Platform Discounts</h5>
                          <p className="text-sm text-muted-foreground">
                            Save 30% on all subscription plans when paying with FlowsyAI tokens
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-emerald-500/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-emerald-500 font-bold">🔥</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">Token Burn Mechanism</h5>
                          <p className="text-sm text-muted-foreground">
                            20% of tokens will be burned after official launch, reducing supply and
                            increasing value
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">⭐</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">Priority Access</h5>
                          <p className="text-sm text-muted-foreground">
                            Early access to new features, beta testing, and exclusive community
                            events
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security & Tokenomics */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-foreground mb-4">
                      Security & Guarantees
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-500 font-bold">🔒</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">Developer Wallet Locked</h5>
                          <p className="text-sm text-muted-foreground">
                            Our development wallet is locked for 3 months to ensure project
                            commitment and investor security
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-500 font-bold">📈</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">Value Appreciation</h5>
                          <p className="text-sm text-muted-foreground">
                            Token burning reduces circulating supply, creating deflationary pressure
                            and potential value growth
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-500 font-bold">🛡️</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">Smart Contract Audited</h5>
                          <p className="text-sm text-muted-foreground">
                            Our token smart contract will be audited by leading security firms
                            before launch
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Token Economics Chart */}
                <div className="bg-gradient-to-r from-gold/5 to-primary/5 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-center mb-4">Token Economics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gold">40%</div>
                      <div className="text-sm text-muted-foreground">Public Sale</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">25%</div>
                      <div className="text-sm text-muted-foreground">Development</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-500">20%</div>
                      <div className="text-sm text-muted-foreground">To Be Burned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-500">15%</div>
                      <div className="text-sm text-muted-foreground">Team & Advisors</div>
                    </div>
                  </div>
                </div>

                {/* Investment Performance Projection */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-center mb-4">
                    Projected Token Performance
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-emerald-500">+150%</div>
                      <div className="text-sm text-muted-foreground">Post-Burn Value Increase</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Based on 20% token burn
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-500">+300%</div>
                      <div className="text-sm text-muted-foreground">Platform Adoption Growth</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Conservative estimate
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-500">+500%</div>
                      <div className="text-sm text-muted-foreground">Bull Market Potential</div>
                      <div className="text-xs text-muted-foreground mt-1">Optimistic scenario</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    *Projections are estimates based on market analysis and tokenomics. Past
                    performance does not guarantee future results.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-primary font-medium mb-4">
                    🚀 Token launch scheduled for June 2025 - Early investors get the best rates!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-gold via-gold-light to-gold text-black font-semibold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
                      asChild
                    >
                      <a href="/waitlist">
                        <Star className="w-5 h-5 mr-2" />
                        Join Token Waitlist
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gold/30 hover:bg-gold/10"
                      disabled
                    >
                      Download Whitepaper
                    </Button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>
      </MotionMain>

      <Footer />
    </div>
  );
};

export default Pricing;
