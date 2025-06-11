import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import SimpleLoadingSpinner from '@/components/SimpleLoadingSpinner';
import { logger } from '@/utils/logger';

// Animation variants for framer-motion
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Simple background without complex animations
function SimpleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
    </div>
  );
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup, isLoading: authLoading, user, isAuthenticated, isInitialized } = useAuth();

  // Redirect authenticated users
  useEffect(() => {
    if (isInitialized && isAuthenticated && user) {
      logger.auth.debug('User already authenticated, redirecting to account...');
      navigate('/account', { replace: true });
    }
  }, [isAuthenticated, isInitialized, user, navigate]);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Remove all Framer Motion scroll tracking to prevent hydration issues

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Mismatch detected. Again. Let’s pretend we’re surprised.');
        return;
      }

      if (!acceptTerms) {
        setError(
          'Agreeing means you’re okay with being tracked, watched, and judged silently by algorithms.'
        );
        return;
      }

      if (password.length < 6) {
        setError('Your password is shorter than your future if you keep using weak ones.');
        return;
      }
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (isLogin) {
        const user = await login(email, password);
        logger.auth.debug(
          'Login completed. User received: cookies, tracking, and corporate love.',
          user
        );

        toast.success('You made it in. Again. For what, though?');
        logger.auth.debug(
          'Authentication successful - PublicRoute will handle redirect automatically'
        );
        // Note: No manual navigation here - let the PublicRoute component handle the redirect
      } else {
        const user = await signup(email, password, username, fullName);
        logger.auth.debug('Signup completed, user received:', user);

        toast.success('Welcome to the machine. Your data is now ours.');
        logger.auth.debug(
          'Authentication successful - PublicRoute will handle redirect automatically'
        );
        // Note: No manual navigation here - let the PublicRoute component handle the redirect
      }
    } catch (error: unknown) {
      logger.auth.error('Authentication error:', error);

      // Handle specific Supabase errors
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';

      if (errorMessage.includes('Invalid login credentials')) {
        setError('Wrong email or password. But sure, blame us.');
      } else if (errorMessage.includes('User already registered')) {
        setError('Someone beat you to it. Try logging in like a normal person.');
      } else if (errorMessage.includes('Password should be at least 6 characters')) {
        setError('Password too short. Even your excuses are longer.');
      } else if (errorMessage.includes('Unable to validate email address')) {
        setError('That’s not a real email. Unless you live in the Matrix.');
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Check your inbox. Or don’t. Just don’t expect access.');
      } else {
        setError('Something went wrong. Probably your fault, but who’s counting?');
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return 'Pathetic';
    if (strength < 4) return 'Trying';
    return 'Acceptable';
  };

  // Show loading screen while auth is being initialized
  if (!isInitialized || authLoading) {
    return <SimpleLoadingSpinner message="Preparing your digital shackles..." />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden premium-hero-bg">
      {/* Simple Background */}
      <SimpleBackground />

      {/* Auth Content */}
      <div className="relative z-20 w-full max-w-lg px-6">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full premium-glass flex items-center justify-center border border-gold/20 shadow-lg premium-shadow relative overflow-hidden group hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-gold to-primary bg-[length:200%_200%] animate-gradient-slow">
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-background animate-pulse-scale" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground font-serif">
            {isLogin ? 'Welcome Back' : 'Join Bot Architect'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? 'Sign in to your Bot Architect Studio account'
              : 'Create your account and start building intelligent workflows'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="mb-8">
          <div className="premium-card p-2 bg-card/60 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg">
            <div className="grid grid-cols-2 gap-1">
              <Button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`relative transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-primary to-sapphire text-background shadow-lg'
                    : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-background/20'
                }`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`relative transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-gold via-gold-light to-gold text-background shadow-lg'
                    : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-background/20'
                }`}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="premium-card p-8 bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field - Only for Register */}
            {!isLogin && (
              <div className="transition-all duration-300">
                <Label htmlFor="fullName" className="text-foreground font-medium">
                  Full Name
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    autoComplete="name"
                    className="pl-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Username Field - Only for Register */}
            {!isLogin && (
              <div className="transition-all duration-300">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Username (Optional)
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Your Username"
                    autoComplete="username"
                    className="pl-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="pl-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <MotionDiv variants={itemVariants}>
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  className="pl-10 pr-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator - Only for Register */}
              {!isLogin && password && (
                <MotionDiv
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-border-alt rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getPasswordStrengthText(passwordStrength)}
                    </span>
                  </div>
                </MotionDiv>
              )}
            </MotionDiv>

            {/* Confirm Password Field - Only for Register */}
            {!isLogin && (
              <MotionDiv
                variants={itemVariants}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                  Confirm Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required={!isLogin}
                    className="pl-10 pr-10 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    {passwordsMatch ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Passwords match</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Passwords don't match</span>
                      </div>
                    )}
                  </MotionDiv>
                )}
              </MotionDiv>
            )}

            {/* Error Message */}
            {error && (
              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">{error}</span>
              </MotionDiv>
            )}

            {/* Terms Checkbox - Only for Register */}
            {!isLogin && (
              <MotionDiv
                variants={itemVariants}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={checked => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                >
                  I accept the{' '}
                  <Link
                    to="/terms"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </MotionDiv>
            )}

            {/* Submit Button */}
            <MotionDiv variants={itemVariants}>
              <Button
                type="submit"
                disabled={isSubmitting || authLoading || (!isLogin && !acceptTerms)}
                className={`w-full group relative overflow-hidden font-semibold rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out text-base py-6 premium-border disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLogin
                    ? 'bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-primary/20'
                    : 'bg-gradient-to-r from-gold via-gold-light to-gold text-background hover:shadow-gold/20'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {isSubmitting || authLoading ? (
                    <MotionDiv
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <LogIn className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Create Account
                        </>
                      )}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </MotionDiv>

            {/* Additional Links */}
            <MotionDiv variants={itemVariants} className="space-y-4">
              {isLogin && (
                <div className="text-center">
                  <Link
                    to="#/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </MotionDiv>
          </form>
        </div>

        {/* Footer */}
        <MotionDiv variants={itemVariants} className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </MotionDiv>
      </div>
    </div>
  );
};

export default AuthPage;
