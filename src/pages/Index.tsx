import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Direct imports for stable build
import PipelineCanvas from '@/components/backgrounds/PipelineCanvas';
import HeroSection from '@/components/landing/HeroSection';
import VisualWorkflowBuilder from '@/components/landing/VisualWorkflowBuilder';
import FeaturesSection from '@/components/landing/FeaturesSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import TokenTierSection from '@/components/landing/TokenTierSection';

// Import new landing page components
import EnhancedWaitlistCTA from '@/components/landing/EnhancedWaitlistCTA';
import VideoShowcaseSection from '@/components/landing/VideoShowcaseSection';

const IndexPage: React.FC = () => {
  // Debug logging for Index page
  React.useEffect(() => {
    console.log('🏠 Index page component mounted', {
      timestamp: new Date().toISOString(),
      location: window.location.href,
    });
  }, []);

  return (
    <div className="index-page-container relative">
      {/* Pipeline Background - Fixed across entire page */}
      <Suspense
        fallback={
          <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-background via-background/95 to-background/90" />
        }
      >
        <PipelineCanvas />
      </Suspense>

      {/* Page Content Sections - Transparent backgrounds to show pipeline */}
      <main className="relative z-10">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <HeroSection />
        </Suspense>

        {/* Video Showcase Section */}
        <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse" />}>
          <VideoShowcaseSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse" />}>
          <VisualWorkflowBuilder />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse" />}>
          <TokenTierSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse" />}>
          <RoadmapSection />
        </Suspense>



        {/* Enhanced Waitlist CTA - Improved conversion optimization */}
        <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse" />}>
          <EnhancedWaitlistCTA />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse" />}>
          <FeaturesSection />
        </Suspense>
      </main>
    </div>
  );
};

export default IndexPage;
