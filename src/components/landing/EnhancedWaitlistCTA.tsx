import React, { useState, useEffect, useMemo } from 'react';
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
  Clock,
  Users,
  Gift,
  Star,
  Zap,
  Crown,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EnhancedWaitlistCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentWaitlistSize] = useState(Math.floor(Math.random() * 2000) + 8500); // Simulated

  // Token launch countdown (June 2025)
  const launchDate = useMemo(() => new Date('2025-06-01T00:00:00Z'), []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [launchDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const benefits = [
    {
      icon: <Crown className="w-5 h-5" />,
      title: 'Early Access',
      description: 'Be among the first 1,000 users to access FlowsyAI',
      color: 'from-gold to-yellow-500',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Token Bonus',
      description: '25% bonus tokens for early supporters',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Exclusive Features',
      description: 'Access to premium AI models and workflows',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Founder Perks',
      description: 'Lifetime discounts and special recognition',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-background to-emerald-50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/20">
        <div className="container mx-auto max-w-4xl text-center">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-card bg-card/80 backdrop-blur-lg border border-emerald-500/30 rounded-2xl p-12"
          >
            <MotionDiv
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </MotionDiv>

            <h2 className="text-3xl font-bold mb-4 text-foreground">Welcome to the Future! 🚀</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You're now on the FlowsyAI waitlist. Get ready for an incredible journey!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-2xl font-bold text-primary">#{currentWaitlistSize + 1}</div>
                <div className="text-sm text-muted-foreground">Your position</div>
              </div>
              <div className="p-4 bg-gold/5 rounded-lg border border-gold/10">
                <div className="text-2xl font-bold text-gold">25%</div>
                <div className="text-sm text-muted-foreground">Token bonus secured</div>
              </div>
            </div>

            <p className="text-muted-foreground">
              Check your email for confirmation and next steps. Follow us on social media for
              updates!
            </p>
          </MotionDiv>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 relative">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-background/10 z-[5]"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">
            <Timer className="w-3 h-3 mr-1" />
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
            Join the AI Revolution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of the exclusive group that gets early access to FlowsyAI and our upcoming
            Solana token launch. Limited spots available with incredible founder benefits.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Countdown & Stats */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Countdown Timer */}
            <div className="premium-card bg-card/50 backdrop-blur-lg border border-border/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Token Launch Countdown</h3>
                <p className="text-muted-foreground">Early access ends soon!</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((item, index) => (
                  <MotionDiv
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10"
                  >
                    <MotionDiv
                      key={item.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-primary"
                    >
                      {item.value.toString().padStart(2, '0')}
                    </MotionDiv>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {item.label}
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Waitlist Stats */}
            <div className="grid grid-cols-2 gap-4">
              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="premium-card bg-card/30 backdrop-blur-lg border border-border/30 rounded-xl p-6 text-center"
              >
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">
                  {currentWaitlistSize.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Users Waiting</div>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="premium-card bg-card/30 backdrop-blur-lg border border-border/30 rounded-xl p-6 text-center"
              >
                <Zap className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">1,000</div>
                <div className="text-sm text-muted-foreground">Early Access Spots</div>
              </MotionDiv>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <MotionDiv
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-card/20 rounded-lg border border-border/20"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          {/* Signup Form */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="premium-card bg-card/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Secure Your Spot</h3>
              <p className="text-muted-foreground">
                Join the waitlist now and get exclusive early access benefits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-12 text-lg border-primary/20 focus:border-primary/50"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full h-12 text-lg bg-gradient-to-r from-primary via-gold to-primary text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                {isSubmitting ? (
                  <MotionDiv
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Star className="w-5 h-5 mr-2" />
                    Join Waitlist - Get 25% Bonus
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By joining, you agree to receive updates about FlowsyAI and our token launch.
                Unsubscribe anytime.
              </p>
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span>Trusted by 10k+ users</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default EnhancedWaitlistCTA;
