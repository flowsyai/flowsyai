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

import { Play, Pause, RotateCcw, Settings, Info, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TokenBanner from './TokenBanner';
import SolanaTokenWidget from './SolanaTokenWidget';

interface InteractiveTokenDemoProps {
  className?: string;
}

const InteractiveTokenDemo: React.FC<InteractiveTokenDemoProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [demoMode, setDemoMode] = useState<'banner' | 'widget' | 'both'>('both');
  const [showFeatures, setShowFeatures] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const features = [
    {
      title: 'Real-time Price Updates',
      description: 'Live price changes with flash animations',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      title: 'Interactive Hover Effects',
      description: 'Hover over elements to reveal additional information',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      title: 'Expandable Details',
      description: 'Click the token logo or expand button for more data',
      icon: <Info className="w-4 h-4" />,
    },
    {
      title: 'Quick Trading',
      description: 'One-click access to trading platforms',
      icon: <Play className="w-4 h-4" />,
    },
    {
      title: 'Social Features',
      description: 'Favorite tokens and share with friends',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      title: 'Mini Charts',
      description: 'Visual price history and trend indicators',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Demo Controls */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Interactive Token Widget Demo</h3>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>

            <Button
              onClick={() => setShowFeatures(!showFeatures)}
              size="sm"
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10"
            >
              <Info className="w-4 h-4 mr-1" />
              Features
            </Button>
          </div>
        </div>

        {/* Demo Mode Selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Display Mode:</span>
          <div className="flex items-center gap-1">
            {(['banner', 'widget', 'both'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setDemoMode(mode)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  demoMode === mode
                    ? 'bg-primary text-white'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <SafeAnimatePresence>
          {showFeatures && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/30"
            >
              {features.map((feature, index) => (
                <MotionDiv
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </MotionDiv>
          )}
        </SafeAnimatePresence>
      </MotionDiv>

      {/* Demo Content */}
      <div className="space-y-6">
        {/* Banner Demo */}
        {(demoMode === 'banner' || demoMode === 'both') && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Token Banner (Compact)
              </h4>
              <p className="text-xs text-muted-foreground">
                Perfect for page headers and prominent placement
              </p>
            </div>
            <TokenBanner className="w-full" tokenAddress="DEMO_TOKEN" />
          </MotionDiv>
        )}

        {/* Widget Demo */}
        {(demoMode === 'widget' || demoMode === 'both') && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Token Widget</h4>
              <p className="text-xs text-muted-foreground">
                Complete widget with transaction history and detailed information
              </p>
            </div>
            <SolanaTokenWidget
              className="w-full"
              showTransactions={true}
              autoRefresh={isPlaying}
            />
          </MotionDiv>
        )}
      </div>

      {/* Interactive Instructions */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="premium-card p-6 rounded-xl bg-gradient-to-r from-primary/5 to-gold/5 border border-primary/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Try the Interactive Features!
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>Hover</strong> over the token logo to see sparkle effects
              </p>
              <p>
                • <strong>Click</strong> the heart icon to favorite the token
              </p>
              <p>
                • <strong>Click</strong> the expand button to see detailed information
              </p>
              <p>
                • <strong>Try</strong> the quick buy feature with preset amounts
              </p>
              <p>
                • <strong>Watch</strong> for price change animations (green/red flashes)
              </p>
              <p>
                • <strong>Share</strong> the token using the share button
              </p>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* Technical Details */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="premium-card p-6 rounded-xl bg-card/30 border border-border/30"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Technical Implementation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-2">Frontend Features</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Framer Motion animations</li>
              <li>• Real-time data updates</li>
              <li>• Responsive design</li>
              <li>• Interactive hover states</li>
              <li>• Price change animations</li>
              <li>• Mini chart visualization</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Backend Integration</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Multi-API fallback system</li>
              <li>• Solana blockchain integration</li>
              <li>• Real-time price feeds</li>
              <li>• Transaction history</li>
              <li>• Market data aggregation</li>
              <li>• Error handling & recovery</li>
            </ul>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default InteractiveTokenDemo;
