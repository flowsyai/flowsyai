import React, { useState, useEffect } from 'react';
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
  Sparkles,
  TrendingUp,
  Heart,
  Share2,
  Zap,
  Eye,
  Users,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InteractiveTokenDemo from '@/components/crypto/InteractiveTokenDemo';

interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  color: string;
}

const TokenWidgetShowcase: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [userInteractions, setUserInteractions] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const features: FeatureHighlight[] = [
    {
      id: 'hover',
      title: 'Hover Magic',
      description: 'Hover over the token logo to see sparkle effects and rotating rings',
      icon: <Sparkles className="w-5 h-5" />,
      action: 'Try hovering over the token logo',
      color: 'from-gold to-yellow-500',
    },
    {
      id: 'favorite',
      title: 'Favorite System',
      description: 'Click the heart icon to add tokens to your personal watchlist',
      icon: <Heart className="w-5 h-5" />,
      action: 'Click the heart icon',
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'share',
      title: 'Social Sharing',
      description: 'Share interesting tokens with friends using native sharing',
      icon: <Share2 className="w-5 h-5" />,
      action: 'Try the share button',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'quickbuy',
      title: 'Quick Trading',
      description: 'One-click access to trading with preset amounts',
      icon: <Zap className="w-5 h-5" />,
      action: 'Click Quick Buy',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'realtime',
      title: 'Live Updates',
      description: 'Watch real-time price changes with flash animations',
      icon: <TrendingUp className="w-5 h-5" />,
      action: 'Watch the price updates',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentFeature(prev => (prev + 1) % features.length);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, features.length]);

  const handleUserInteraction = () => {
    setUserInteractions(prev => {
      const newCount = prev + 1;
      if (newCount === 5 && !showReward) {
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
      }
      return newCount;
    });
  };

  const resetDemo = () => {
    setCurrentFeature(0);
    setUserInteractions(0);
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">
            <Trophy className="w-3 h-3 mr-1" />
            Interactive Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold via-primary to-gold bg-clip-text text-transparent">
            Experience Next-Gen Token Widgets
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our enhanced token widgets aren't just displays—they're interactive experiences that
            engage users and drive action. Try the features below and see the difference.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Demo */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="sticky top-8">
              <div className="premium-card bg-card/30 backdrop-blur-lg border border-border/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Live Demo</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="border-primary/30"
                    >
                      {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetDemo}
                      className="border-primary/30"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Interaction Counter */}
                <div className="flex items-center gap-4 mb-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Interactions: {userInteractions}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 50) + 20} watching
                    </span>
                  </div>
                </div>

                {/* Token Widget Demo */}
                <div onClick={handleUserInteraction}>
                  <InteractiveTokenDemo className="w-full" />
                </div>

                {/* Reward Animation */}
                <SafeAnimatePresence>
                  {showReward && (
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl"
                    >
                      <div className="text-center p-6">
                        <MotionDiv
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center"
                        >
                          <Trophy className="w-8 h-8 text-white" />
                        </MotionDiv>
                        <h4 className="text-xl font-bold text-white mb-2">Engagement Master!</h4>
                        <p className="text-white/80">You've discovered 5 interactive features!</p>
                      </div>
                    </MotionDiv>
                  )}
                </SafeAnimatePresence>
              </div>
            </div>
          </MotionDiv>

          {/* Feature Highlights */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            {features.map((feature, index) => (
              <MotionDiv
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`premium-card p-6 border transition-all duration-500 cursor-pointer ${
                  currentFeature === index
                    ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/20'
                    : 'border-border/30 bg-card/20 hover:border-primary/30'
                }`}
                onClick={() => {
                  setCurrentFeature(index);
                  setIsAutoPlaying(false);
                  handleUserInteraction();
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {feature.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      {currentFeature === index && (
                        <MotionDiv
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{feature.description}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span>{feature.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {currentFeature === index && isAutoPlaying && (
                  <MotionDiv
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-gold rounded-b-xl"
                  />
                )}
              </MotionDiv>
            ))}

            {/* Call to Action */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="premium-card p-6 bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20"
            >
              <div className="text-center">
                <Star className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Ready for Early Access?</h3>
                <p className="text-muted-foreground mb-4">
                  Join our waitlist to be the first to experience these interactive features and get
                  exclusive access to the FlowsyAI token launch.
                </p>
                <Button
                  className="bg-gradient-to-r from-gold to-yellow-500 text-black hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
                  asChild
                >
                  <a href="/waitlist">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Token Waitlist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default TokenWidgetShowcase;
