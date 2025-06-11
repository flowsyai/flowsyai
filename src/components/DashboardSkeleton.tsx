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

import { GlassCard } from '@/components/ui/glass-card';

const DashboardSkeleton: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const SkeletonBox = ({
    className = '',
    height = 'h-4',
  }: {
    className?: string;
    height?: string;
  }) => <div className={`bg-muted/50 rounded animate-pulse ${height} ${className}`} />;

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-screen-xl">
        {/* Welcome Header Skeleton */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-muted/50 rounded-full animate-pulse" />
              <div className="space-y-2">
                <SkeletonBox className="w-64" height="h-8" />
                <SkeletonBox className="w-48" height="h-4" />
              </div>
            </div>
            <SkeletonBox className="w-40" height="h-10" />
          </div>
        </MotionDiv>

        {/* Token Balance Skeleton */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
            <div className="p-6">
              <SkeletonBox className="w-32" height="h-6" />
              <div className="mt-4 flex items-center gap-4">
                <SkeletonBox className="w-24" height="h-8" />
                <SkeletonBox className="w-20" height="h-6" />
              </div>
            </div>
          </GlassCard>
        </MotionDiv>

        {/* Stats Overview Skeleton */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[1, 2, 3, 4].map(i => (
            <MotionDiv key={i} variants={itemVariants}>
              <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <SkeletonBox className="w-10 h-10" />
                    <SkeletonBox className="w-4 h-4" />
                  </div>
                  <SkeletonBox className="w-16" height="h-8" />
                  <SkeletonBox className="w-24 mt-2" height="h-4" />
                </div>
              </GlassCard>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Quick Actions Skeleton */}
        <MotionDiv variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
          <MotionDiv variants={itemVariants} className="mb-6">
            <SkeletonBox className="w-32" height="h-6" />
            <SkeletonBox className="w-64 mt-2" height="h-4" />
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <MotionDiv key={i} variants={itemVariants}>
                <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <div className="p-6">
                    <SkeletonBox className="w-12 h-12 mb-4" />
                    <SkeletonBox className="w-24" height="h-5" />
                    <SkeletonBox className="w-32 mt-2" height="h-4" />
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Recent Activity Skeleton */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Workflows Skeleton */}
          <MotionDiv variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <SkeletonBox className="w-40" height="h-6" />
              <SkeletonBox className="w-20" height="h-8" />
            </div>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <div className="space-y-2">
                      <SkeletonBox className="w-32" height="h-4" />
                      <SkeletonBox className="w-24" height="h-3" />
                    </div>
                    <SkeletonBox className="w-8 h-8" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </MotionDiv>

          {/* Recent AI Agents Skeleton */}
          <MotionDiv variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <SkeletonBox className="w-32" height="h-6" />
              <SkeletonBox className="w-24" height="h-8" />
            </div>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <SkeletonBox className="w-8 h-8" />
                      <div className="space-y-2">
                        <SkeletonBox className="w-28" height="h-4" />
                        <SkeletonBox className="w-20" height="h-3" />
                      </div>
                    </div>
                    <SkeletonBox className="w-16" height="h-6" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
