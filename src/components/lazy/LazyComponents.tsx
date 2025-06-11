import { lazy, Suspense, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

// Loading component for heavy components
const ComponentLoader = ({ name }: { name: string }) => (
  <div className="min-h-[400px] flex items-center justify-center bg-background/50 rounded-lg border border-border">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <p className="text-sm text-muted-foreground">Loading {name}...</p>
    </div>
  </div>
);

// Error boundary for lazy components
const LazyErrorBoundary = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

// HOC for creating lazy components with proper error handling
export const createLazyComponent = <T extends ComponentType<Record<string, unknown>>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
) => {
  const LazyComponent = lazy(importFn);

  return (props: React.ComponentProps<T>) => (
    <LazyErrorBoundary fallback={<ComponentLoader name={componentName} />}>
      <LazyComponent {...props} />
    </LazyErrorBoundary>
  );
};

// Lazy load heavy components
export const LazyEnergyNetworkCanvas = createLazyComponent(
  () => import('@/components/EnergyNetworkCanvas'),
  'Energy Network'
);

export const LazyNexusCrystal = createLazyComponent(
  () => import('@/components/NexusCrystal'),
  'Nexus Crystal'
);

// Note: Analytics components will be added when the analytics directory is created

// Lazy load particle systems
export const LazyParticleBackground = createLazyComponent(
  () => import('@/components/landing/ParticleBackground'),
  'Particle Background'
);

export const LazyVisualWorkflowBuilder = createLazyComponent(
  () => import('@/components/landing/VisualWorkflowBuilder'),
  'Visual Workflow Builder'
);

// Lazy load complex workflow components
export const LazyEnhancedWorkflowBuilder = createLazyComponent(
  () => import('@/components/EnhancedWorkflowBuilder'),
  'Enhanced Workflow Builder'
);

export const LazyWorkflowCanvas = createLazyComponent(
  () => import('@/components/workflow/WorkflowCanvas'),
  'Workflow Canvas'
);

// Note: Removed lazy loading for components that are statically imported elsewhere
// This prevents Vite warnings about dynamic/static import conflicts

// Keep only components that are truly lazy-loaded

export const LazyAIAgentModal = createLazyComponent(
  () => import('@/components/AIAgentModal'),
  'AI Agent Modal'
);

// Lazy load dashboard components (only truly lazy ones)
export const LazyAchievementSystem = createLazyComponent(
  () => import('@/components/AchievementSystem'),
  'Achievement System'
);

export const LazyDailyChallenges = createLazyComponent(
  () => import('@/components/DailyChallenges'),
  'Daily Challenges'
);

// Note: Removed LazyDashboardSkeleton, LazyTokenManager, LazyFeedbackSystem
// as they are statically imported elsewhere

export const LazyOnboardingFlow = createLazyComponent(
  () => import('@/components/OnboardingFlow'),
  'Onboarding Flow'
);

export const LazyWorkflowOnboarding = createLazyComponent(
  () => import('@/components/WorkflowOnboarding'),
  'Workflow Onboarding'
);

// Lazy load crypto and token components (only truly lazy ones)
export const LazyInteractiveTokenDemo = createLazyComponent(
  () => import('@/components/crypto/InteractiveTokenDemo'),
  'Interactive Token Demo'
);

// Note: Removed LazySolanaTokenWidget and LazyTokenBanner
// as they are statically imported elsewhere

// Lazy load 3D and visualization components (largest contributors to bundle size)
export const LazyNexusAssistantUI = createLazyComponent(
  () => import('@/components/NexusAssistantUI'),
  'Nexus Assistant UI'
);

// These components are already exported above, removing duplicates

// Lazy load chart and analytics components
export const LazyAreaChart = createLazyComponent(
  () => import('recharts').then(module => ({ default: module.AreaChart })),
  'Area Chart'
);

// Lazy load landing page sections
export const LazyHeroSection = createLazyComponent(
  () => import('@/components/landing/HeroSection'),
  'Hero Section'
);

export const LazyFeaturesSection = createLazyComponent(
  () => import('@/components/landing/FeaturesSection'),
  'Features Section'
);

export const LazyRoadmapSection = createLazyComponent(
  () => import('@/components/landing/RoadmapSection'),
  'Roadmap Section'
);

export const LazyTokenTierSection = createLazyComponent(
  () => import('@/components/landing/TokenTierSection'),
  'Token Tier Section'
);

export const LazyARSection = createLazyComponent(
  () => import('@/components/landing/ARSection'),
  'AR Section'
);

// Lazy load complex page components
export const LazyWorkflowStudio = createLazyComponent(
  () => import('@/pages/WorkflowStudio'),
  'Workflow Studio'
);

export const LazyAIEcosystemPlayground = createLazyComponent(
  () => import('@/pages/AIEcosystemPlayground'),
  'AI Ecosystem Playground'
);

export const LazyWorkflowMarketplace = createLazyComponent(
  () => import('@/pages/WorkflowMarketplace'),
  'Workflow Marketplace'
);

export const LazyDocumentation = createLazyComponent(
  () => import('@/pages/Documentation'),
  'Documentation'
);

export const LazyPlatformShowcase = createLazyComponent(
  () => import('@/pages/PlatformShowcase'),
  'Platform Showcase'
);

// Utility function to preload components
export const preloadComponent = (importFn: () => Promise<{ default: ComponentType<unknown> }>) => {
  // Preload on idle or user interaction
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => importFn());
  } else {
    setTimeout(() => importFn(), 100);
  }
};

// Preload components based on user behavior
export const preloadOnHover = (importFn: () => Promise<{ default: ComponentType<unknown> }>) => {
  let isPreloaded = false;
  return () => {
    if (!isPreloaded) {
      isPreloaded = true;
      preloadComponent(importFn);
    }
  };
};

// Preload critical components on app start
export const preloadCriticalComponents = () => {
  // Preload components likely to be used soon
  preloadComponent(() => import('@/components/workflow/WorkflowCanvas'));
  preloadComponent(() => import('@/components/EnhancedWorkflowBuilder'));

  // Preload hero section components
  preloadComponent(() => import('@/components/landing/HeroSection'));

  // Note: Removed TokenBanner preload as it's now statically imported
};

// Preload components for specific routes
export const preloadRouteComponents = (route: string) => {
  switch (route) {
    case '/studio':
      preloadComponent(() => import('@/pages/WorkflowStudio'));
      preloadComponent(() => import('@/components/EnhancedWorkflowBuilder'));
      preloadComponent(() => import('@/components/workflow/WorkflowCanvas'));
      break;
    case '/playground':
      preloadComponent(() => import('@/pages/AIEcosystemPlayground'));
      preloadComponent(() => import('@/components/NexusCrystal'));
      preloadComponent(() => import('@/components/EnergyNetworkCanvas'));
      break;
    case '/marketplace':
      preloadComponent(() => import('@/pages/WorkflowMarketplace'));
      break;
    case '/docs':
      preloadComponent(() => import('@/pages/Documentation'));
      break;
    case '/showcase':
      preloadComponent(() => import('@/pages/PlatformShowcase'));
      break;
    default:
      // Preload common components
      preloadCriticalComponents();
  }
};

// Preload components when user shows intent (hover, focus, etc.)
export const createPreloadTrigger = (
  importFn: () => Promise<{ default: ComponentType<unknown> }>
) => {
  let isPreloaded = false;

  const preload = () => {
    if (!isPreloaded) {
      isPreloaded = true;
      preloadComponent(importFn);
    }
  };

  return {
    onMouseEnter: preload,
    onFocus: preload,
    onTouchStart: preload,
  };
};
