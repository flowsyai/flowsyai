import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  Smartphone,
  Hand,
  Zap,
  Eye,
  Layers,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Crown,
  Sparkles,
  Target,
  Wand2,
  Rocket,
} from 'lucide-react';

const ARSection = () => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGestures, setShowGestures] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const arFeatures = [
    {
      icon: Hand,
      title: 'Spatial Workflow Design',
      description:
        'Build enterprise-grade AI workflows in 3D space with 95% faster setup than traditional tools',
      benefit: '10x faster deployment',
      demo: 'gesture-demo',
    },
    {
      icon: Eye,
      title: 'Computer Vision Integration',
      description:
        'Real-time object recognition and spatial mapping powered by advanced ML algorithms',
      benefit: '99.7% accuracy rate',
      demo: 'recognition-demo',
    },
    {
      icon: Layers,
      title: 'Multi-Modal AI Orchestration',
      description:
        'Seamlessly connect text, image, and voice AI models in intuitive visual workflows',
      benefit: 'Connect 50+ AI services',
      demo: 'workflow-demo',
    },
    {
      icon: Zap,
      title: 'Real-Time Collaboration',
      description:
        'Multiple users can build and modify workflows simultaneously in shared AR space',
      benefit: 'Team productivity +300%',
      demo: 'connection-demo',
    },
  ];

  const realWorldUseCases = [
    {
      title: 'Customer Service Automation',
      description: 'Deploy AI chatbots that handle 80% of support tickets automatically',
      timesSaved: 'Save 25 hours/week',
      icon: '🎧',
      roi: '400% ROI in 3 months',
    },
    {
      title: 'Content Generation Pipeline',
      description: 'Create blog posts, social media, and marketing copy at scale',
      timesSaved: 'Save 40 hours/week',
      icon: '✍️',
      roi: '600% productivity boost',
    },
    {
      title: 'Data Analysis Workflows',
      description: 'Process and analyze business data with automated insights generation',
      timesSaved: 'Save 30 hours/week',
      icon: '📊',
      roi: '90% faster decisions',
    },
    {
      title: 'E-commerce Optimization',
      description: 'Automate product descriptions, pricing, and inventory management',
      timesSaved: 'Save 35 hours/week',
      icon: '🛒',
      roi: '250% sales increase',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo(prev => (prev + 1) % arFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [arFeatures.length]);

  return (
    <section
      id="ar-showcase"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-gold/5"
    >
      {/* Revolutionary Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-gold/10 animate-pulse"></div>

        {/* Iron Man-style Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        {/* Floating Holographic Elements */}
        {[...Array(6)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute w-32 h-32 border border-primary/30 rounded-lg"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
            <span className="text-sm font-semibold text-foreground">
              PRODUCTION-READY AR TECHNOLOGY
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="block text-foreground">Enterprise AI Automation</span>
            <span className="block bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
              Meets Spatial Computing
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Build, deploy, and manage AI workflows using spatial interfaces on any mobile device.
            Reduce automation setup time by 95% while increasing team productivity by 300%.
            <span className="text-primary font-semibold">
              Join 2,000+ companies already transforming their operations.
            </span>
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Workflow Visualization */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Workflow Canvas */}
            <div className="relative w-full h-[500px] bg-gradient-to-br from-background/90 to-primary/5 rounded-3xl border border-primary/20 overflow-hidden shadow-2xl">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* AI Workflow Nodes */}
              <div className="absolute inset-0 p-8">
                {/* Input Node */}
                <MotionDiv
                  className="absolute top-12 left-12 w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg border border-emerald-400/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px rgba(16, 185, 129, 0.3)',
                      '0 15px 35px rgba(16, 185, 129, 0.5)',
                      '0 10px 25px rgba(16, 185, 129, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-white text-xs font-bold text-center">
                    <div className="text-lg mb-1">📧</div>
                    <div>Email</div>
                  </div>
                </MotionDiv>

                {/* Processing Node */}
                <MotionDiv
                  className="absolute top-32 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-primary/30"
                  animate={{
                    scale: [1, 1.08, 1],
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      '0 10px 25px rgba(59, 130, 246, 0.3)',
                      '0 15px 35px rgba(59, 130, 246, 0.5)',
                      '0 10px 25px rgba(59, 130, 246, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-white text-xs font-bold text-center">
                    <div className="text-lg mb-1">🤖</div>
                    <div>AI Process</div>
                  </div>
                </MotionDiv>

                {/* Decision Node */}
                <MotionDiv
                  className="absolute top-12 right-32 w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg border border-amber-400/30"
                  animate={{
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      '0 10px 25px rgba(245, 158, 11, 0.3)',
                      '0 15px 35px rgba(245, 158, 11, 0.5)',
                      '0 10px 25px rgba(245, 158, 11, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-white text-xs font-bold text-center">
                    <div className="text-lg mb-1">⚡</div>
                    <div>Decision</div>
                  </div>
                </MotionDiv>

                {/* Output Nodes */}
                <MotionDiv
                  className="absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg border border-purple-400/30"
                  animate={{
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 8px 20px rgba(168, 85, 247, 0.3)',
                      '0 12px 30px rgba(168, 85, 247, 0.5)',
                      '0 8px 20px rgba(168, 85, 247, 0.3)',
                    ],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 }}
                >
                  <div className="text-white text-xs font-bold text-center">
                    <div className="text-sm mb-1">📊</div>
                    <div>Report</div>
                  </div>
                </MotionDiv>

                <MotionDiv
                  className="absolute bottom-16 right-16 w-20 h-20 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg border border-rose-400/30"
                  animate={{
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 8px 20px rgba(244, 63, 94, 0.3)',
                      '0 12px 30px rgba(244, 63, 94, 0.5)',
                      '0 8px 20px rgba(244, 63, 94, 0.3)',
                    ],
                  }}
                  transition={{ duration: 1.9, repeat: Infinity, delay: 2 }}
                >
                  <div className="text-white text-xs font-bold text-center">
                    <div className="text-sm mb-1">📱</div>
                    <div>Notify</div>
                  </div>
                </MotionDiv>
              </div>

              {/* Animated Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Connection 1: Input to Processing */}
                <MotionPath
                  d="M 120 75 Q 200 75 240 150"
                  stroke="url(#connection1)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />

                {/* Connection 2: Processing to Decision */}
                <MotionPath
                  d="M 280 150 Q 350 100 400 75"
                  stroke="url(#connection2)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />

                {/* Connection 3: Decision to Outputs */}
                <MotionPath
                  d="M 400 100 Q 350 200 280 350"
                  stroke="url(#connection3)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                />

                <MotionPath
                  d="M 420 100 Q 450 200 480 350"
                  stroke="url(#connection4)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                />

                <defs>
                  <linearGradient id="connection1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="connection2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="connection3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                  <linearGradient id="connection4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Data Particles */}
              {[...Array(8)].map((_, i) => (
                <MotionDiv
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Status Indicator */}
              <MotionDiv
                className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/20 rounded-full px-3 py-1 border border-emerald-500/30"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-600 font-semibold">Active</span>
              </MotionDiv>
            </div>

            {/* Floating Enhancement Elements */}
            {[...Array(4)].map((_, i) => (
              <MotionDiv
                key={i}
                className="absolute w-6 h-6 bg-gradient-to-r from-primary to-gold rounded-full opacity-60"
                style={{
                  left: i === 0 ? '-5%' : i === 1 ? '105%' : i === 2 ? '50%' : '25%',
                  top: i === 0 ? '20%' : i === 1 ? '60%' : i === 2 ? '-3%' : '103%',
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </MotionDiv>

          {/* AR Features & Content */}
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Core Value Proposition */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-primary/20 rounded-full px-4 py-2">
                <Wand2 className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-foreground">PROVEN TECHNOLOGY</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                Professional AI Automation Platform
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Deploy enterprise-grade AI workflows using intuitive spatial interfaces. Our
                platform combines proven automation technology with cutting-edge AR visualization,
                delivering
                <span className="text-primary font-semibold">
                  {' '}
                  measurable business results from day one.
                </span>
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Setup Time Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">300%</div>
                  <div className="text-sm text-muted-foreground">Productivity Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-500">2,000+</div>
                  <div className="text-sm text-muted-foreground">Active Companies</div>
                </div>
              </div>
            </div>

            {/* AR Features Grid - Enhanced Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {arFeatures.map((feature, index) => (
                <MotionDiv
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                    currentDemo === index
                      ? 'bg-gradient-to-br from-primary/15 to-gold/15 border-primary/50 shadow-2xl shadow-primary/20'
                      : 'bg-gradient-to-br from-background/80 to-background/60 border-primary/20 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10'
                  }`}
                  onClick={() => setCurrentDemo(index)}
                >
                  {/* Background Glow Effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      currentDemo === index ? 'opacity-100' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5" />
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
                  </div>

                  <div className="relative p-8">
                    {/* Icon with Enhanced Animation */}
                    <MotionDiv
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${
                        currentDemo === index
                          ? 'bg-gradient-to-r from-primary to-gold text-white shadow-lg'
                          : 'bg-primary/10 text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-gold group-hover:text-white'
                      }`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <feature.icon className="w-8 h-8" />
                    </MotionDiv>

                    {/* Content */}
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {feature.description}
                    </p>

                    {/* Benefit Badge */}
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-primary/10 to-gold/10 rounded-full px-3 py-1 border border-primary/20">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-xs font-semibold text-primary">{feature.benefit}</span>
                    </div>

                    {/* Active Indicator */}
                    {currentDemo === index && (
                      <MotionDiv
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-4 right-4 w-3 h-3 bg-gold rounded-full shadow-lg"
                      />
                    )}
                  </div>
                </MotionDiv>
              ))}
            </div>

            {/* Real-World Use Cases Section */}
            <div className="space-y-8">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h4 className="text-2xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                  <Target className="w-6 h-6 text-gold" />
                  Proven Business Applications
                  <Target className="w-6 h-6 text-gold" />
                </h4>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Real companies achieving measurable results with FlowsyAI automation workflows
                </p>
              </MotionDiv>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {realWorldUseCases.map((useCase, index) => (
                  <MotionDiv
                    key={useCase.title}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden bg-gradient-to-br from-background/90 to-primary/5 rounded-2xl border border-primary/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                  >
                    <div className="p-6">
                      {/* Use Case Icon */}
                      <MotionDiv
                        className="text-3xl mb-4 inline-block"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {useCase.icon}
                      </MotionDiv>

                      {/* Use Case Title */}
                      <h5 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {useCase.title}
                      </h5>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {useCase.description}
                      </p>

                      {/* Benefits */}
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full px-3 py-1 border border-emerald-500/20">
                          <span className="text-xs font-semibold text-emerald-600">
                            {useCase.timesSaved}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-primary/10 to-gold/10 rounded-full px-3 py-1 border border-primary/20">
                          <span className="text-xs font-semibold text-primary">{useCase.roi}</span>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Call to Action - Enhanced Section */}
            <div className="space-y-8 pt-12">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-gradient-to-br from-primary/15 to-gold/15 rounded-3xl p-8 border border-primary/30 shadow-2xl shadow-primary/10"
              >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <MotionDiv
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-gold rounded-3xl mb-6 shadow-lg"
                    >
                      <Target className="w-10 h-10 text-white" />
                    </MotionDiv>

                    <h4 className="text-3xl font-bold text-foreground mb-4">
                      Start Automating Your Business Today
                    </h4>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Join 2,000+ companies already saving 25+ hours per week with FlowsyAI
                      automation.
                      <span className="text-primary font-semibold">
                        Get early access to our spatial computing platform
                      </span>
                      and transform your operations in days, not months.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                    <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-primary to-gold text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-8 py-4 text-lg font-semibold"
                        asChild
                      >
                        <a href="/waitlist">
                          <Rocket className="mr-3 h-6 w-6" />
                          Get Early Access
                          <ArrowRight className="ml-3 h-6 w-6" />
                        </a>
                      </Button>
                    </MotionDiv>

                    <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary/40 hover:bg-primary/10 px-8 py-4 text-lg font-semibold"
                        asChild
                      >
                        <a href="/ai-workflow-studio">
                          <Play className="mr-3 h-6 w-6" />
                          Try Free Demo
                        </a>
                      </Button>
                    </MotionDiv>
                  </div>
                </div>
              </MotionDiv>

              {/* Business Value Proposition - Enhanced */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="text-center p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-4 text-emerald-500 text-2xl font-bold">
                    💰
                  </div>
                  <h5 className="text-lg font-bold text-foreground mb-2">Immediate ROI</h5>
                  <p className="text-sm text-muted-foreground">
                    Average 400% ROI within 3 months of deployment
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl border border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-4 text-primary text-2xl font-bold">⚡</div>
                  <h5 className="text-lg font-bold text-foreground mb-2">Rapid Deployment</h5>
                  <p className="text-sm text-muted-foreground">
                    Deploy enterprise workflows in hours, not weeks
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-gold/10 to-amber-500/10 rounded-2xl border border-gold/30 hover:shadow-lg hover:shadow-gold/20 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-4 text-gold text-2xl font-bold">🏆</div>
                  <h5 className="text-lg font-bold text-foreground mb-2">Enterprise Ready</h5>
                  <p className="text-sm text-muted-foreground">
                    SOC 2 compliant with 99.9% uptime guarantee
                  </p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default ARSection;
