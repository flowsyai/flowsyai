import React, { useState, useEffect } from 'react';
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

import { ArrowLeft, Mail, CheckCircle, Star, Rocket, Zap, Gift, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { waitlistService } from '@/services/waitlistService';
import { toast } from '@/hooks/use-toast';
import { waitlistRateLimiter, getClientId, formatTimeRemaining } from '@/utils/rateLimiter';

const WaitlistPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [counters, setCounters] = useState({ waiting: 0, today: 0, satisfaction: 0 });

  // Animated counter effect
  useEffect(() => {
    const targets = { waiting: 847, today: 23, satisfaction: 96 };
    const duration = 2500; // 2.5 seconds for smoother animation
    const steps = 80;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        waiting: Math.floor(targets.waiting * progress),
        today: Math.floor(targets.today * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setSuccessMessage('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    // Check rate limit
    const clientId = getClientId();
    if (!waitlistRateLimiter.isAllowed(clientId)) {
      const resetTime = waitlistRateLimiter.getResetTime(clientId);
      setError(
        `Too many attempts. Please wait ${formatTimeRemaining(resetTime)} before trying again.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await waitlistService.submitEmail(email);

      if (result.success) {
        setSuccessMessage(result.message);
        setIsSubmitted(true);
        setEmail(''); // Clear the form

        // Clear rate limit on successful submission
        waitlistRateLimiter.clear(clientId);

        // Show success toast
        toast({
          title: 'Welcome to the waitlist!',
          description: result.message,
        });

        // Update counters to reflect new signup
        setCounters(prev => ({
          ...prev,
          waiting: prev.waiting + 1,
          today: prev.today + 1,
        }));
      } else {
        setError(result.message);

        // Show error toast
        toast({
          title: 'Signup failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="border-b border-border/50 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">Join Our Waitlist</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Hero Section */}
              <div className="mb-12">
                <MotionDiv
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center"
                >
                  <Rocket className="w-12 h-12 text-white" />
                </MotionDiv>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="block text-foreground">Be the First to Experience</span>
                  <span className="block bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
                    FlowsyAI
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Join thousands of professionals waiting for the most advanced AI workflow
                  automation platform. We'll contact you when the platform launches officially.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="premium-card p-6 rounded-2xl text-center"
                >
                  <Star className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Early Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Be among the first 1000 users to access the platform
                  </p>
                </MotionDiv>

                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="premium-card p-6 rounded-2xl text-center"
                >
                  <Gift className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Exclusive Benefits</h3>
                  <p className="text-sm text-muted-foreground">
                    Free FlowsyAI tokens and premium features for early adopters
                  </p>
                </MotionDiv>

                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="premium-card p-6 rounded-2xl text-center"
                >
                  <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Priority Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Direct access to our team and priority customer support
                  </p>
                </MotionDiv>
              </div>

              {/* Email Form */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="max-w-md mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setError(''); // Clear error when user types
                      }}
                      className={`pl-10 h-12 text-lg ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </MotionDiv>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading || !email.trim()}
                    className="w-full bg-gradient-to-r from-primary to-gold text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 h-12 text-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <MotionDiv
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Rocket className="w-5 h-5 mr-2" />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  We respect your privacy. No spam, unsubscribe at any time.
                </p>
              </MotionDiv>

              {/* Social Proof */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 premium-card p-6 rounded-2xl text-center"
              >
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="text-center">
                    <MotionDiv
                      className="text-3xl font-bold text-primary"
                      key={counters.waiting}
                      initial={{ scale: 1.5, opacity: 0, y: -20 }}
                      animate={{
                        scale: [1.5, 1.1, 1],
                        opacity: [0, 0.8, 1],
                        y: [-20, 5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        times: [0, 0.6, 1],
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {counters.waiting.toLocaleString()}
                    </MotionDiv>
                    <MotionDiv
                      className="text-sm text-muted-foreground"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      People Waiting
                    </MotionDiv>
                  </div>
                  <div className="text-center">
                    <MotionDiv
                      className="text-3xl font-bold text-gold"
                      key={counters.today}
                      initial={{ scale: 1.5, opacity: 0, y: -20 }}
                      animate={{
                        scale: [1.5, 1.1, 1],
                        opacity: [0, 0.8, 1],
                        y: [-20, 5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        delay: 0.2,
                        times: [0, 0.6, 1],
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      +{counters.today}
                    </MotionDiv>
                    <MotionDiv
                      className="text-sm text-muted-foreground"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      Joined Today
                    </MotionDiv>
                  </div>
                  <div className="text-center">
                    <MotionDiv
                      className="text-3xl font-bold text-emerald-500"
                      key={counters.satisfaction}
                      initial={{ scale: 1.5, opacity: 0, y: -20 }}
                      animate={{
                        scale: [1.5, 1.1, 1],
                        opacity: [0, 0.8, 1],
                        y: [-20, 5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        delay: 0.4,
                        times: [0, 0.6, 1],
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {counters.satisfaction}%
                    </MotionDiv>
                    <MotionDiv
                      className="text-sm text-muted-foreground"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      Satisfaction Rate
                    </MotionDiv>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Join hundreds of professionals already waiting for the future of AI automation
                </p>
              </MotionDiv>

              {/* Timeline */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8 premium-card p-6 rounded-2xl"
              >
                <h3 className="text-xl font-semibold mb-6">Expected Launch Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-2 animate-pulse" />
                    <div className="font-medium">June 2025</div>
                    <div className="text-muted-foreground">Token Launch</div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-2" />
                    <div className="font-medium">July 2025</div>
                    <div className="text-muted-foreground">Beta Testing</div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto mb-2" />
                    <div className="font-medium">Q3 2025</div>
                    <div className="text-muted-foreground">Public Launch</div>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          ) : (
            // Success State
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <MotionDiv
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </MotionDiv>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="block text-foreground">You're In!</span>
                <span className="block bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Welcome to the Future
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {successMessage ||
                  "Thank you for joining our waitlist! We'll send you exclusive updates about our progress and notify you as soon as the platform is ready for early access."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline">
                  <Link to="/">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link to="/roadmap">
                    <Rocket className="w-5 h-5 mr-2" />
                    View Roadmap
                  </Link>
                </Button>
              </div>
            </MotionDiv>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
