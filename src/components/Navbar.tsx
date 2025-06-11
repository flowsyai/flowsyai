import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { logger } from '@/utils/logger';
import PremiumLogo from '@/components/ui/PremiumLogo';
import { useComingSoon } from '@/hooks/useComingSoon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Layers,
  Settings,
  Menu,
  X,
  PlusCircle,
  LogIn,
  UserPlus,
  Sparkles,
  User,
  LogOut,
  Crown,
  BarChart3,
  Users,
  Bot,
  Shield,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
  MotionSpan,
} from '@/lib/motion-wrapper';

import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

const navLinkBaseClasses =
  'group inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background';
const navLinkInactiveClasses =
  'text-[hsl(var(--nav-foreground))] hover:bg-[hsl(var(--nav-hover))] hover:text-[hsl(var(--nav-primary))]';
const navLinkActiveClasses =
  'bg-[hsl(var(--nav-active))] text-[hsl(var(--nav-primary-foreground))] shadow-md hover:bg-[hsl(var(--nav-active))]/90';

const mobileNavLinkBaseClasses =
  'block rounded-md px-3 py-2 text-base font-medium transition-colors';
const mobileNavLinkInactiveClasses =
  'text-[hsl(var(--nav-foreground))] hover:bg-[hsl(var(--nav-hover))] hover:text-[hsl(var(--nav-primary))]';
const mobileNavLinkActiveClasses =
  'bg-[hsl(var(--nav-active))] text-[hsl(var(--nav-primary-foreground))]';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;
  const { comingSoonHandlers } = useComingSoon();

  // Debug authentication state in navbar
  useEffect(() => {
    logger.auth.debug('Navbar - Auth state update:', {
      isAuthenticated,
      user: !!user,
      userEmail: user?.email,
    });
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop, isMobileMenuOpen]);

  const handleNewProject = () => {
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Smart logo navigation based on authentication status
  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (isAuthenticated) {
      logger.auth.debug('Authenticated user - navigating to dashboard');
      navigate('/account');
    } else {
      logger.auth.debug('Unauthenticated user - navigating to landing page');
      navigate('/');
    }
  };

  // Different navigation for authenticated vs unauthenticated users
  const unauthenticatedNavItems = [
    { to: '/platform-showcase', label: 'Platform' },
    { to: '/roadmap', label: 'Roadmap', featured: true },
    { to: '/pricing', label: 'Pricing' },
    { to: '/features', label: 'Features' },
    { to: '/documentation', label: 'Documentation' },
  ];

  const authenticatedNavItems = [
    { to: '/account', label: 'Dashboard' },
    {
      to: '/workflow-builder',
      label: 'Workflow Builder',
      icon: <PlusCircle className="w-4 h-4" />,
      featured: true,
      description: 'Build powerful AI workflows',
    },
    {
      to: '/ai-ecosystem-playground',
      label: 'AI Playground',
      icon: <Sparkles className="w-4 h-4" />,
      featured: true,
      description: 'Experiment with AI models',
    },
    { to: '/workflow-templates', label: 'Templates' },
    { to: '/workflow-marketplace', label: 'Marketplace' },
    { to: '/workflow-analytics', label: 'Analytics' },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : unauthenticatedNavItems;

  return (
    <nav className="border-b border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-background))]/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between max-w-screen-xl min-h-[70px]">
        <MotionButton
          onClick={handleLogoClick}
          className="group cursor-pointer bg-transparent border-none p-2 rounded-lg hover:bg-accent/50 transition-all duration-300"
          aria-label="Navigate to home page"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <PremiumLogo
            size={isDesktop ? 'xl' : 'lg'}
            showText={false}
            animated={true}
            className="drop-shadow-sm"
          />
        </MotionButton>

        {/* Desktop Navigation */}
        {isDesktop && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map(item => (
                <NavigationMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        navigationMenuTriggerStyle(),
                        navLinkBaseClasses,
                        isActive ? navLinkActiveClasses : navLinkInactiveClasses,
                        'relative group/link',
                        item.featured &&
                          'bg-gradient-to-r from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10 border border-[hsl(var(--button-primary))]/20 hover:border-[hsl(var(--button-primary))]/40'
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                      {item.featured && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-[hsl(var(--nav-primary))]/20 text-[hsl(var(--nav-primary))]"
                        >
                          New
                        </Badge>
                      )}
                    </div>
                    <MotionSpan
                      className={cn(
                        'absolute bottom-0 left-0 h-0.5 w-full origin-bottom-left',
                        item.featured
                          ? 'bg-gradient-to-r from-[hsl(var(--button-primary))] to-[hsl(var(--nav-secondary))]'
                          : 'bg-[hsl(var(--nav-primary))]'
                      )}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="flex items-center gap-3">
          {/* Authentication Section - Desktop */}
          {isDesktop && (
            <>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-12 w-12 rounded-full p-0 hover:bg-[hsl(var(--nav-hover))] transition-all duration-300"
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10 ring-2 ring-[hsl(var(--nav-primary))]/20 hover:ring-[hsl(var(--nav-primary))]/40 transition-all duration-300">
                          <AvatarImage src={user?.avatarUrl} alt={user?.fullName || user?.email} />
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--nav-primary))] via-[hsl(var(--nav-secondary))] to-[hsl(var(--accent))] text-white font-bold text-lg shadow-lg">
                            {user?.fullName
                              ? user.fullName.charAt(0).toUpperCase()
                              : user?.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {/* Online Status Indicator */}
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-[hsl(var(--nav-background))] rounded-full"></div>
                        {user?.isPremium && (
                          <Crown className="absolute -top-1 -right-1 h-4 w-4 text-[hsl(var(--nav-secondary))] drop-shadow-lg" />
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.fullName || user?.username || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        {user?.isPremium && (
                          <div className="flex items-center gap-1 text-xs text-gold">
                            <Crown className="h-3 w-3" />
                            Premium Member
                          </div>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      <User className="mr-2 h-4 w-4" />
                      Account Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/projects')}>
                      <Layers className="mr-2 h-4 w-4" />
                      My Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/workflow-builder')}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Workflow Builder
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/ai-ecosystem-playground')}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Ecosystem Playground
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/analytics')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/security-dashboard')}>
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/workflow-collaboration')}>
                      <Users className="mr-2 h-4 w-4" />
                      Team Collaboration
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/ai-optimization')}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Optimization
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    {!user?.isPremium && (
                      <DropdownMenuItem onClick={() => navigate('/billing')}>
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade to Premium
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        logger.auth.debug('Desktop logout button clicked!');
                        try {
                          await logout();
                          logger.auth.debug('Desktop logout completed');
                        } catch (error) {
                          logger.auth.error('Desktop logout failed:', error);
                        }
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <MotionButton
                    onClick={() => navigate('/waitlist')}
                    className="group relative overflow-hidden text-foreground hover:text-primary font-medium rounded-lg transition-all duration-300 ease-in-out inline-flex h-9 items-center justify-center whitespace-nowrap px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                      <Star className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-300" />
                      Join Token Waitlist
                    </span>
                  </MotionButton>
                  <MotionButton
                    onClick={() => navigate('/waitlist')}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-sapphire text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 ease-in-out border border-primary/20 inline-flex h-9 items-center justify-center whitespace-nowrap px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                      <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Start Free Trial
                    </span>
                  </MotionButton>
                </div>
              )}
            </>
          )}

          {/* New Project Button - Only show for authenticated users */}
          {isAuthenticated && isDesktop && (
            <MotionButton
              onClick={handleNewProject}
              className="bg-primary text-primary-foreground hover:bg-primary/90 group inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusCircle className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              New Project
            </MotionButton>
          )}

          {/* Settings - Only show for authenticated users */}
          {isAuthenticated && (
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  isDesktop ? navigationMenuTriggerStyle() : '',
                  navLinkBaseClasses,
                  isActive ? navLinkActiveClasses : navLinkInactiveClasses,
                  'p-2 rounded-full md:rounded-md md:px-3 md:py-2',
                  !isDesktop && 'hover:bg-accent/50'
                )
              }
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              <span className="sr-only md:not-sr-only md:ml-1.5">Settings</span>
            </NavLink>
          )}

          {/* Mobile Menu Toggle */}
          {!isDesktop && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground/70 hover:text-primary hover:bg-accent"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <SafeAnimatePresence>
        {!isDesktop && isMobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-background))] overflow-hidden"
            id="mobile-navigation-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      mobileNavLinkBaseClasses,
                      isActive ? mobileNavLinkActiveClasses : mobileNavLinkInactiveClasses
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {/* Action Buttons - Mobile */}
              <div className="pt-4 pb-2 border-t border-border-alt space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 bg-card/50 rounded-lg border border-border-alt">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 ring-2 ring-[hsl(var(--nav-primary))]/30 shadow-lg">
                            <AvatarImage
                              src={user?.avatarUrl}
                              alt={user?.fullName || user?.email}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--nav-primary))] via-[hsl(var(--nav-secondary))] to-[hsl(var(--accent))] text-white font-bold text-lg shadow-lg">
                              {user?.fullName
                                ? user.fullName.charAt(0).toUpperCase()
                                : user?.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {/* Online Status Indicator */}
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-[hsl(var(--nav-background))] rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user?.fullName || user?.username || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                          {user?.isPremium && (
                            <div className="flex items-center gap-1 text-xs text-gold">
                              <Crown className="h-3 w-3" />
                              Premium
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/account');
                      }}
                      className="w-full bg-gradient-to-r from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10 border-[hsl(var(--button-primary))]/30 hover:border-[hsl(var(--button-primary))]/50 hover:bg-[hsl(var(--button-primary))]/20 text-[hsl(var(--nav-foreground))] hover:text-[hsl(var(--button-primary))] transition-all duration-300"
                    >
                      <User className="w-5 h-5 mr-2" />
                      Account Dashboard
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/projects');
                      }}
                      className="w-full bg-gradient-to-r from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10 border-[hsl(var(--button-primary))]/30 hover:border-[hsl(var(--button-primary))]/50 hover:bg-[hsl(var(--button-primary))]/20 text-[hsl(var(--nav-foreground))] hover:text-[hsl(var(--button-primary))] transition-all duration-300"
                    >
                      <Layers className="w-5 h-5 mr-2" />
                      My Projects
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/workflow-builder');
                      }}
                      className="w-full bg-gradient-to-r from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10 border-[hsl(var(--button-primary))]/30 hover:border-[hsl(var(--button-primary))]/50 hover:bg-[hsl(var(--button-primary))]/20 text-[hsl(var(--nav-foreground))] hover:text-[hsl(var(--button-primary))] transition-all duration-300"
                    >
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Workflow Builder
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/ai-ecosystem-playground');
                      }}
                      className="w-full bg-gradient-to-r from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10 border-[hsl(var(--button-primary))]/30 hover:border-[hsl(var(--button-primary))]/50 hover:bg-[hsl(var(--button-primary))]/20 text-[hsl(var(--nav-foreground))] hover:text-[hsl(var(--button-primary))] transition-all duration-300"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      AI Ecosystem Playground
                    </Button>
                    {!user?.isPremium && (
                      <Button
                        size="lg"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/billing');
                        }}
                        className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-background"
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade to Premium
                      </Button>
                    )}
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={async () => {
                        logger.auth.debug('Mobile logout button clicked!');
                        setIsMobileMenuOpen(false);
                        try {
                          await logout();
                          logger.auth.debug('Mobile logout completed');
                        } catch (error) {
                          logger.auth.error('Mobile logout failed:', error);
                        }
                      }}
                      className="w-full bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <MotionButton
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/waitlist');
                      }}
                      className="w-full hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md px-8 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Join Token Waitlist
                    </MotionButton>
                    <MotionButton
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/waitlist');
                      }}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-sapphire text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 ease-in-out border border-primary/20 inline-flex h-11 items-center justify-center whitespace-nowrap px-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                        <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Start Free Trial
                      </span>
                    </MotionButton>
                  </div>
                )}
              </div>
            </div>
          </MotionDiv>
        )}
      </SafeAnimatePresence>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>, // Changed ElementRef to typeof Link
  React.ComponentPropsWithoutRef<typeof Link> & { title: string } // Used ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to || '/'}
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-foreground">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navbar;
