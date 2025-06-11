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

interface PremiumLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const PremiumLogo: React.FC<PremiumLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-4',
    md: 'w-24 h-6',
    lg: 'w-32 h-8',
    xl: 'w-48 h-12',
    xxl: 'w-64 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
    xxl: 'text-3xl',
  };

  const logoVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      y: 0,
    },
    animate:
      size === 'xxl'
        ? {
            // Original floating for hero logos only
            y: [0, -3, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }
        : {
            // Subtle luxury breathing for navbar logos (sm, md, lg, xl)
            scale: [1, 1.02, 1],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
    hover:
      size === 'xxl'
        ? {
            // Original hover for hero logos only
            scale: 1.08,
            rotate: 360,
            transition: {
              duration: 0.8,
              ease: 'easeInOut',
            },
          }
        : {
            // Luxury hover for navbar logos (sm, md, lg, xl)
            scale: 1.05,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
  };

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        delay: 0.2,
      },
    },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MotionDiv
        variants={animated ? logoVariants : undefined}
        initial="initial"
        animate={animated ? 'animate' : undefined}
        whileHover={animated ? 'hover' : undefined}
        className="relative group"
      >
        {/* FlowsyAI Animated Logo Video */}
        <div
          className={`${sizeClasses[size]} rounded-lg overflow-hidden border border-primary/20 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative ${size !== 'xxl' ? 'animate-luxury-glow' : ''}`}
        >
          <video
            className="w-full h-full object-cover logo-video"
            autoPlay
            loop
            muted
            playsInline
            poster="/flowsy-logo.svg"
          >
            <source src="/background-animation.mp4" type="video/mp4" />
            {/* Fallback to static logo */}
            <img
              src="/flowsy-new-logo.png"
              alt="FlowsyAI Logo"
              className="w-full h-full object-contain"
            />
          </video>
          {/* Enhanced background integration overlay - Reduced opacity for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/5 to-background/20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-background/5 mix-blend-overlay pointer-events-none"></div>

          {/* Luxury shimmer effect for navbar logos - Enhanced visibility */}
          {size !== 'xxl' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-luxury-shimmer pointer-events-none"></div>
          )}
        </div>

        {/* Enhanced Luxury Glow Effect with Pulsing - Only for large sizes */}
        {(size === 'xl' || size === 'xxl') && (
          <MotionDiv
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 blur-xl -z-10 scale-110"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Enhanced Background Glow for larger sizes with Rotation */}
        {(size === 'xl' || size === 'xxl') && (
          <MotionDiv
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl -z-20 scale-125"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 360],
            }}
            transition={{
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />
        )}

        {/* Luxury Glow Effect for navbar logos */}
        {size !== 'xxl' && (
          <MotionDiv
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold/20 via-primary/30 to-sapphire/20 blur-lg -z-10 scale-110"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1.1, 1.15, 1.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </MotionDiv>

      {showText && (
        <MotionDiv
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.5, duration: 0.5 } : undefined}
          className="flex flex-col"
        >
          {(size === 'xl' || size === 'xxl') && (
            <>
              <span className={`font-bold text-foreground tracking-tight ${textSizeClasses[size]}`}>
                FlowsyAI
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase -mt-1">
                Luxury Automation
              </span>
            </>
          )}
          {size === 'lg' && (
            <span className="text-base font-semibold text-foreground tracking-tight">FlowsyAI</span>
          )}
        </MotionDiv>
      )}
    </div>
  );
};

export default PremiumLogo;
