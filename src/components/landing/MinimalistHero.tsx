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

import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComingSoon } from '@/hooks/useComingSoon';
import { Link } from 'react-router-dom';

const MinimalistHero: React.FC = () => {
  const { comingSoonHandlers } = useComingSoon();

  return (
    <section className="h-[85vh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-background pt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 z-0"></div>

      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-primary via-gold to-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20 p-4">
            <img
              src="/flowsy-new-logo.png"
              alt="FlowsyAI Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </MotionDiv>

        {/* Title */}
        <MotionH1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-foreground font-serif"
        >
          Bot Architect <span className="premium-gradient-text">Studio</span>
        </MotionH1>

        {/* Subtitle */}
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-6 leading-relaxed"
        >
          Build powerful AI workflows visually. Drag, drop, and connect AI agents to create
          intelligent automation pipelines.
        </MotionP>

        {/* Social Proof & Urgency */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>
              <strong className="text-foreground">2,847</strong> workflows created this week
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span>
              🚀 <strong className="text-foreground">Free trial</strong> - No credit card required
            </span>
          </div>
        </MotionDiv>

        {/* CTA Buttons - Discovery Phase */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary via-sapphire to-primary text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-10 py-7 text-xl font-semibold border border-primary/20 hover:scale-105"
            onClick={() => comingSoonHandlers.demo()}
          >
            See Live Demo <ArrowRight className="ml-2 h-6 w-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 px-8 py-6 text-lg"
            onClick={() => comingSoonHandlers.pricing()}
          >
            View Pricing
          </Button>
        </MotionDiv>
      </div>

      {/* Scroll indicator */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <MotionDiv
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <MotionDiv
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-primary/50 rounded-full mt-2"
          />
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default MinimalistHero;
