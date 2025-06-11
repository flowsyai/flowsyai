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
  useScroll,
  useTransform,
} from '@/lib/motion-wrapper';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Pause, ChevronDown, Sparkles } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMousePosition';

const HeroSection3D: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  // For magnetic button effect
  const { ref: magneticRef, transform } = useMagneticEffect({ strength: 0.3 });

  // For parallax scrolling effects
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text animation effect
  useEffect(() => {
    // Simple text animation using CSS classes
    if (headingRef.current) {
      const chars = headingRef.current.textContent?.split('') || [];
      headingRef.current.innerHTML = '';

      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        span.style.transitionDelay = `${0.5 + index * 0.03}s`;

        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 100);

        headingRef.current?.appendChild(span);
      });
    }

    if (subheadingRef.current) {
      subheadingRef.current.style.opacity = '0';
      subheadingRef.current.style.transform = 'translateY(20px)';
      subheadingRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      subheadingRef.current.style.transitionDelay = '0.8s';

      setTimeout(() => {
        if (subheadingRef.current) {
          subheadingRef.current.style.opacity = '1';
          subheadingRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden premium-hero-bg"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 z-10"></div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          poster="/hero-visual-coming-soon.svg"
          autoPlay
        >
          {/* Removed external video source that was causing 403 error */}
          {/* Using poster image as fallback for now */}
          Your browser does not support the video tag.
        </video>

        {/* Video Controls */}
        <button
          type="button"
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 z-20 bg-primary/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary/20 transition-all duration-300 border border-primary/20 premium-border"
          aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Hero Content */}
      <MotionDiv
        style={{ opacity }}
        className="hero-content max-w-5xl px-6 py-12 md:py-16 z-20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10 flex justify-center"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full premium-glass flex items-center justify-center border border-gold/20 shadow-lg premium-shadow relative overflow-hidden group">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-primary via-gold to-primary">
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-background" />
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionH1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 tracking-tight text-center font-serif"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="block">Elevate Your</span>
          <span className="premium-gradient-text">Intelligence Integration</span>
        </MotionH1>

        <MotionP
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Experience the sophistication of our premium platform that seamlessly unifies multiple AI
          bots into a single powerful solution, transforming your digital capabilities.
        </MotionP>

        <MotionDiv
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {/* Primary Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-gold to-gold text-background font-semibold rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out text-base sm:text-lg px-8 py-6 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center">
              Experience Now <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border border-platinum/30 bg-transparent text-foreground hover:bg-platinum/10 font-semibold rounded-lg transition-all duration-300 ease-in-out text-base sm:text-lg px-8 py-6 w-full sm:w-auto"
          >
            View Exclusive Demo
          </Button>
        </MotionDiv>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            document.getElementById('value-proposition')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <span className="text-sm text-muted-foreground">Discover Excellence</span>
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
            <ChevronDown className="h-5 w-5 text-gold" />
          </div>
        </div>
      </MotionDiv>
    </section>
  );
};

export default HeroSection3D;
