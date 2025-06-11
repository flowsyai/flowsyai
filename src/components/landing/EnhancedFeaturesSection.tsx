import React, { useRef, useEffect } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  useScroll,
  useTransform,
} from '@/lib/motion-wrapper';

import AnimatedFeatureCard from './AnimatedFeatureCard';
import { useScrollProgress } from '@/hooks/useAnimatedScroll';
import { Bot, BrainCircuit, Layers, Workflow, Zap, Shield, BarChart, Sparkles } from 'lucide-react';

const EnhancedFeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // For parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.7]);

  // For progress-based animations
  const { ref: progressRef, progress } = useScrollProgress({
    start: 0.1,
    end: 0.9,
  });

  // Animation for the connection lines
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate title and subtitle with CSS transitions
    if (titleRef.current && subtitleRef.current) {
      // Set up intersection observer for title
      const titleObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              titleRef.current!.style.opacity = '1';
              titleRef.current!.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.1 }
      );

      // Set up intersection observer for subtitle
      const subtitleObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              subtitleRef.current!.style.opacity = '1';
              subtitleRef.current!.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.1 }
      );

      // Apply initial styles
      if (titleRef.current) {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transform = 'translateY(30px)';
        titleRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        titleObserver.observe(titleRef.current);
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '0';
        subtitleRef.current.style.transform = 'translateY(30px)';
        subtitleRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        subtitleRef.current.style.transitionDelay = '0.2s';
        subtitleObserver.observe(subtitleRef.current);
      }

      // Clean up observers
      return () => {
        if (titleElement) titleObserver.unobserve(titleElement);
        if (subtitleElement) subtitleObserver.unobserve(subtitleElement);
      };
    }
  }, []);

  // Features data
  const features = [
    {
      icon: <Bot size={24} />,
      title: 'Multiple AI Integration',
      description:
        'Seamlessly connect and orchestrate multiple AI bots within a unified interface.',
      link: '#',
      color: 'primary',
    },
    {
      icon: <BrainCircuit size={24} />,
      title: 'Intelligent Routing',
      description:
        'Smart request routing ensures each query is handled by the most appropriate AI.',
      link: '#',
      color: 'gold',
    },
    {
      icon: <Layers size={24} />,
      title: 'Unified Responses',
      description: 'Consolidate outputs from multiple AIs into coherent, comprehensive responses.',
      link: '#',
      color: 'platinum',
    },
    {
      icon: <Workflow size={24} />,
      title: 'Visual Workflow Builder',
      description: 'Design complex AI interactions with our intuitive drag-and-drop interface.',
      link: '#',
      color: 'primary',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-time Processing',
      description: 'Experience lightning-fast responses with our optimized processing engine.',
      link: '#',
      color: 'gold',
    },
    {
      icon: <Shield size={24} />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance features protect your sensitive data.',
      link: '#',
      color: 'platinum',
    },
    {
      icon: <BarChart size={24} />,
      title: 'Advanced Analytics',
      description: 'Gain insights into AI performance and usage patterns with detailed metrics.',
      link: '#',
      color: 'primary',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Custom AI Training',
      description: 'Train and fine-tune AI models to better serve your specific business needs.',
      link: '#',
      color: 'gold',
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <MotionDiv
          style={{ y: y1 }}
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
        <MotionDiv
          style={{ y: y2 }}
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        />

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background opacity-80" />

        {/* Particle effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <MotionDiv
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? 'bg-primary/10' : i % 3 === 1 ? 'bg-gold/10' : 'bg-platinum/10'
              }`}
              style={{
                width: 2 + Math.random() * 6 + 'px',
                height: 2 + Math.random() * 6 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <MotionH2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ opacity: opacity }}
          >
            <span className="block">Powerful</span>
            <span className="premium-gradient-text">Integration Features</span>
          </MotionH2>

          <MotionP
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            style={{ opacity: opacity }}
          >
            Our platform offers a comprehensive suite of tools designed to maximize the potential of
            your AI ecosystem.
          </MotionP>
        </div>

        {/* Features Grid */}
        <div
          ref={progressRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              color={feature.color as 'primary' | 'gold' | 'platinum'}
              index={index}
            />
          ))}
        </div>

        {/* Central Integration Visualization */}
        <div className="mt-20 md:mt-32 relative">
          <MotionDiv
            className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border relative overflow-hidden"
            style={{
              scale: useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]),
              opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0.8]),
            }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50" />

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Seamless Integration Ecosystem
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
              {/* Central Hub */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary via-gold to-primary bg-[length:200%_200%] animate-gradient-slow flex items-center justify-center relative z-10">
                <Sparkles className="w-10 h-10 text-background" />
              </div>

              {/* Connected Systems */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {['AI Bot 1', 'AI Bot 2', 'AI Bot 3', 'AI Bot 4'].map((bot, index) => (
                  <MotionDiv
                    key={index}
                    className="w-16 h-16 rounded-lg bg-card border border-border flex items-center justify-center relative"
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0 rgba(0, 120, 255, 0)',
                        '0 0 20px rgba(0, 120, 255, 0.3)',
                        '0 0 0 rgba(0, 120, 255, 0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                  >
                    <Bot className="w-8 h-8 text-primary" />
                    <span className="absolute -bottom-6 text-xs text-muted-foreground">{bot}</span>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M30,50 C40,30 60,70 70,50"
                className="connection-line stroke-primary/30 fill-none stroke-2"
                strokeLinecap="round"
              />
              <path
                d="M30,50 C40,70 60,30 70,50"
                className="connection-line stroke-gold/30 fill-none stroke-2"
                strokeLinecap="round"
              />
            </svg>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeaturesSection;
