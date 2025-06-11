import React, { useState } from 'react';
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

import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { waitlistService } from '@/services/waitlistService';
import { toast } from '@/hooks/use-toast';

const WaitlistUnsubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await waitlistService.unsubscribeEmail(email);

      if (result.success) {
        setIsUnsubscribed(true);
        toast({
          title: 'Unsubscribed successfully',
          description: result.message,
        });
      } else {
        setError(result.message);
        toast({
          title: 'Unsubscribe failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="border-b border-border/50 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">Unsubscribe from Waitlist</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          {!isUnsubscribed ? (
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Hero Section */}
              <div className="mb-12">
                <MotionDiv
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Mail className="w-12 h-12 text-white" />
                </MotionDiv>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="block text-foreground">Unsubscribe from</span>
                  <span className="block bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    FlowsyAI Waitlist
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  We're sorry to see you go! Enter your email address below to unsubscribe from our
                  waitlist. You won't receive any more notifications from us.
                </p>
              </div>

              {/* Unsubscribe Form */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-md mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setError(''); // Clear error when user types
                      }}
                      className={`pl-10 h-12 text-lg ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </MotionDiv>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading || !email.trim()}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 h-12 text-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <MotionDiv
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Unsubscribe
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  This action will remove your email from our waitlist. You can rejoin at any time.
                </p>
              </MotionDiv>

              {/* Information */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 premium-card p-6 rounded-2xl text-left"
              >
                <h3 className="text-lg font-semibold mb-4">What happens when you unsubscribe?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    <span>Your email will be marked as unsubscribed in our system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    <span>You will no longer receive launch notifications or updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    <span>You can rejoin the waitlist at any time by signing up again</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    <span>
                      Your data will be retained for compliance purposes but marked as inactive
                    </span>
                  </li>
                </ul>
              </MotionDiv>
            </MotionDiv>
          ) : (
            /* Success State */
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <MotionDiv
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </MotionDiv>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="block text-foreground">Successfully</span>
                <span className="block bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Unsubscribed
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                You have been successfully removed from our waitlist. We're sorry to see you go, but
                you can always rejoin if you change your mind.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link to="/">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-gold text-white"
                >
                  <Link to="/waitlist">
                    <Mail className="w-5 h-5 mr-2" />
                    Rejoin Waitlist
                  </Link>
                </Button>
              </div>
            </MotionDiv>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistUnsubscribe;
