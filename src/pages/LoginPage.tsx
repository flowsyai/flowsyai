import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { ArrowRight, Mail, Lock, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { logger } from '@/utils/logger';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-login',
        options: {
          background: { color: '#050A14' },
          fpsLimit: 60,
          particles: {
            number: {
              value: 50,
              density: { enable: true, width: 800, height: 800 },
            },
            color: {
              value: ['#0078FF', '#FFCC33', '#D6DAE3'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: { min: 0.1, max: 0.3 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            size: {
              value: { min: 0.1, max: 2 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            links: {
              enable: true,
              color: '#0078FF',
              opacity: 0.1,
              distance: 100,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
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
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 2 },
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

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Add sarcastic validation
    if (!email.trim()) {
      setError('Email required. We need to know who to blame.');
      return;
    }

    if (!password.trim()) {
      setError('Password required. Security theater demands it.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await login(email, password);
      logger.auth.debug('Login completed, user received:', user);

      toast.success('Look who decided to show up. Welcome back.');
      logger.auth.debug(
        'Authentication successful - PublicRoute will handle redirect automatically'
      );
      // Note: No manual navigation here - let the PublicRoute component handle the redirect
    } catch (error: unknown) {
      logger.auth.error('Authentication error:', error);

      // Handle specific Supabase errors with sarcasm
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';

      if (errorMessage.includes('Invalid login credentials')) {
        setError('Wrong credentials. Shocking development.');
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Check your email. Yes, that thing you ignore.');
      } else if (errorMessage.includes('Too many requests')) {
        setError('Slow down there, speed racer. Try again later.');
      } else if (errorMessage.includes('Network')) {
        setError('Network issues. Blame your internet provider.');
      } else {
        setError('Something went wrong. Probably not our fault.');
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden premium-hero-bg">
      {/* Particles Animation */}
      <ParticlesBackground />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <MotionDiv
            key={i}
            className={`absolute rounded-full backdrop-blur-sm border ${i % 3 === 0 ? 'bg-primary/10 border-primary/20' : i % 3 === 1 ? 'bg-gold/10 border-gold/20' : 'bg-platinum/10 border-platinum/20'}`}
            style={{
              width: 3 + Math.random() * 8 + 'px',
              height: 3 + Math.random() * 8 + 'px',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2 + Math.random() * 0.3,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Login Content */}
      <MotionDiv
        ref={sectionRef}
        style={{ opacity }}
        className="relative z-20 w-full max-w-md px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Brand Section */}
        <MotionDiv variants={itemVariants} className="text-center mb-8">
          <MotionDiv
            className="w-20 h-20 mx-auto mb-6 rounded-full premium-glass flex items-center justify-center border border-gold/20 shadow-lg premium-shadow relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MotionDiv
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-gold to-primary bg-[length:200%_200%] animate-gradient-slow"
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
                <Sparkles className="w-6 h-6 text-background animate-pulse-scale" />
              </div>
            </MotionDiv>
          </MotionDiv>

          <MotionH1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-2 text-foreground font-serif"
          >
            Welcome Back
          </MotionH1>
          <MotionP variants={itemVariants} className="text-muted-foreground">
            Sign in to your Bot Architect Studio account
          </MotionP>
        </MotionDiv>

        {/* Login Form */}
        <MotionDiv
          variants={itemVariants}
          className="premium-card p-8 bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <MotionDiv variants={itemVariants}>
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </MotionDiv>

            <MotionDiv variants={itemVariants}>
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 pr-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </MotionDiv>

            {error && (
              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">{error}</span>
              </MotionDiv>
            )}

            <MotionDiv variants={itemVariants}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 ease-in-out text-base py-6 premium-border"
              >
                <span className="relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {isLoading ? (
                    <MotionDiv
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Sign In{' '}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </MotionDiv>

            {/* Additional Links */}
            <MotionDiv variants={itemVariants} className="space-y-4">
              <div className="text-center">
                <Link
                  to="#/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Forgot your password? Of course you did.
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-alt"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  Sign up
                </Link>
              </div>
            </MotionDiv>
          </form>
        </MotionDiv>

        {/* Footer */}
        <MotionDiv variants={itemVariants} className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            By signing in, you surrender your soul to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

export default LoginPage;
