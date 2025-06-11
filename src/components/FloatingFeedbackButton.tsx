import React, { useState } from 'react';
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

import { MessageSquare, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeedbackSystem from './FeedbackSystem';
import { useAuth } from '@/hooks/useAuth';

const FloatingFeedbackButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Only show for authenticated users
  if (!isAuthenticated) return null;

  return (
    <>
      <MotionDiv
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 2, // Delay appearance to not overwhelm new users
        }}
      >
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button
            onClick={() => setShowFeedback(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-sapphire text-background font-medium rounded-full w-14 h-14 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 ease-in-out border border-primary/20"
          >
            <span className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6" />
            </span>

            {/* Animated background */}
            <MotionDiv
              className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              initial={false}
            />

            {/* Pulse animation */}
            <MotionDiv
              className="absolute inset-0 bg-primary/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Button>
        </MotionDiv>

        {/* Tooltip */}
        <SafeAnimatePresence>
          {isHovered && (
            <MotionDiv
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-card/95 backdrop-blur-lg border border-border-alt rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-gold" />
                  <span className="text-sm font-medium text-foreground">Share Feedback</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Help us improve your experience
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-l-4 border-l-border-alt border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </MotionDiv>
          )}
        </SafeAnimatePresence>
      </MotionDiv>

      {/* Feedback Modal */}
      <FeedbackSystem
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        context="general"
      />
    </>
  );
};

export default FloatingFeedbackButton;
