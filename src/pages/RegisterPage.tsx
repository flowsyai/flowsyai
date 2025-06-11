import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  ArrowRight,
  Mail,
  Lock,
  User,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { logger } from '@/utils/logger';

function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-register',
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

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Add comprehensive validation with sarcastic messages
    if (!username.trim()) {
      setError('Username required. Yes, we need to call you something.');
      return;
    }

    if (username.length < 3) {
      setError('Username too short. Like your patience.');
      return;
    }

    if (!email.trim()) {
      setError('Email required. How else will we track you?');
      return;
    }

    if (!password.trim()) {
      setError('Password required. Security is not optional here.');
      return;
    }

    if (password.length < 6) {
      setError('Password too short. Your future is longer than this.');
      return;
    }

    if (password !== confirmPassword) {
      setError('No match. Much like you on dating apps.');
      return;
    }

    if (!acceptTerms) {
      setError('By continuing, you legally admit you didn’t read any of this.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    logger.auth.debug('Username:', username);
    logger.auth.debug('Email:', email);
    logger.auth.debug('Password:', password);
    navigate('/dashboard');
    setIsLoading(false);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

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

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return 'Laughable';
    if (strength < 4) return 'Meh';
    return 'Tolerable';
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

      {/* Register Content */}
      <MotionDiv
        ref={sectionRef}
        style={{ opacity }}
        className="relative z-20 w-full max-w-lg px-6"
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
            Join Bot Architect
          </MotionH1>
          <MotionP variants={itemVariants} className="text-muted-foreground">
            Create your account and start building intelligent workflows
          </MotionP>
        </MotionDiv>

        {/* Register Form */}
        <MotionDiv
          variants={itemVariants}
          className="premium-card p-8 bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <MotionDiv variants={itemVariants}>
              <Label htmlFor="username" className="text-foreground font-medium">
                Username
              </Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Your Username"
                  required
                  className="pl-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </MotionDiv>

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

              {/* Password Strength Indicator */}
              {password && (
                <MotionDiv
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-border-alt rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getPasswordStrengthText(passwordStrength)}
                    </span>
                  </div>
                </MotionDiv>
              )}
            </MotionDiv>

            <MotionDiv variants={itemVariants}>
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirm Password
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 pr-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <MotionDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 flex items-center gap-2"
                >
                  {passwordsMatch ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs">Finally, consistency</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-xs">Try again, genius</span>
                    </div>
                  )}
                </MotionDiv>
              )}
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

            <MotionDiv variants={itemVariants} className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={checked => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                I accept the{' '}
                <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </Label>
            </MotionDiv>

            <MotionDiv variants={itemVariants}>
              <Button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 ease-in-out text-base py-6 premium-border disabled:opacity-50 disabled:cursor-not-allowed"
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
                      Create Account{' '}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </MotionDiv>

            {/* Login Link */}
            <MotionDiv variants={itemVariants} className="text-center">
              <span className="text-sm text-muted-foreground">Already have an account? </span>
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300"
              >
                Sign in
              </Link>
            </MotionDiv>
          </form>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

export default RegisterPage;
