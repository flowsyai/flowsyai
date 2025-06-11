import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requirePremium?: boolean;
  redirectTo?: string;
  fallbackComponent?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requirePremium = false,
  redirectTo,
  fallbackComponent,
}) => {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuth();
  const location = useLocation();
  const hasRedirected = useRef(false);

  // Debug logging
  useEffect(() => {
    console.log('🔍 ProtectedRoute Debug:', {
      path: location.pathname,
      requireAuth,
      isAuthenticated,
      isLoading,
      isInitialized,
      user: !!user,
      userEmail: user?.email,
      hasRedirected: hasRedirected.current,
      timestamp: new Date().toLocaleTimeString(),
    });
  }, [location.pathname, requireAuth, isAuthenticated, isLoading, isInitialized, user]);

  // Reset redirect flag when location changes
  useEffect(() => {
    hasRedirected.current = false;
  }, [location.pathname]);

  // For public routes (landing pages), show content immediately without waiting for auth
  if (!requireAuth) {
    console.log('✅ PublicRoute: Showing content immediately for landing page');
    return <>{children}</>;
  }

  // Show loading spinner while authentication is initializing (only for protected routes)
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle authentication requirements - only redirect once
  if (requireAuth && !isAuthenticated && !hasRedirected.current) {
    hasRedirected.current = true;
    const redirectUrl = redirectTo || '/auth';
    console.log('🔄 ProtectedRoute: Redirecting unauthenticated user to', redirectUrl);
    return <Navigate to={redirectUrl} state={{ from: location }} replace />;
  }

  // Handle premium requirements
  if (requirePremium && !user?.isPremium) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  // Handle reverse protection (redirect authenticated users away from auth pages)
  // Only redirect if we have a confirmed authenticated user and this is a public route
  // BUT allow authenticated users to view landing pages (/, /simple, /interactive, /minimalist)
  const isLandingPage = ['/', '/simple', '/interactive', '/minimalist'].includes(location.pathname);
  if (!requireAuth && isAuthenticated && user && !hasRedirected.current && !isLandingPage) {
    hasRedirected.current = true;
    const redirectUrl = redirectTo || '/account';
    console.log(
      '🔄 PublicRoute: Redirecting authenticated user from',
      location.pathname,
      'to',
      redirectUrl
    );
    console.log('👤 Authenticated user:', user.email);
    return <Navigate to={redirectUrl} replace />;
  }

  // If we're on an auth-required route and authenticated, show content
  if (requireAuth && isAuthenticated && user) {
    console.log('✅ AuthenticatedRoute: Showing content for', location.pathname);
    return <>{children}</>;
  }

  // If we're on a public route and not authenticated, show content
  if (!requireAuth && !isAuthenticated) {
    console.log('✅ PublicRoute: Showing content for unauthenticated user');
    return <>{children}</>;
  }

  // Fallback - show loading if state is unclear
  console.log('⏳ ProtectedRoute: State unclear, showing loading');
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    </div>
  );
};

export default ProtectedRoute;
