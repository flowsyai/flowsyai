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

import {
  MessageSquare,
  Star,
  Send,
  X,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Lightbulb,
  Bug,
  Zap,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface FeedbackSystemProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'general' | 'workflow' | 'agent' | 'billing' | 'onboarding';
}

interface FeedbackData {
  type: 'bug' | 'feature' | 'improvement' | 'praise' | 'other';
  rating: number;
  satisfaction: 'happy' | 'neutral' | 'sad';
  message: string;
  context: string;
}

const FeedbackSystem: React.FC<FeedbackSystemProps> = ({
  isOpen,
  onClose,
  context = 'general',
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'improvement',
    rating: 0,
    satisfaction: 'neutral',
    message: '',
    context,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    {
      id: 'bug' as const,
      title: 'Bug Report',
      description: "Something isn't working correctly",
      icon: <Bug className="h-5 w-5" />,
      color: 'from-red-400 to-red-600',
    },
    {
      id: 'feature' as const,
      title: 'Feature Request',
      description: 'I have an idea for a new feature',
      icon: <Lightbulb className="h-5 w-5" />,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'improvement' as const,
      title: 'Improvement',
      description: 'How we can make this better',
      icon: <Zap className="h-5 w-5" />,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'praise' as const,
      title: 'Praise',
      description: 'Something you love about the platform',
      icon: <Heart className="h-5 w-5" />,
      color: 'from-pink-400 to-pink-600',
    },
    {
      id: 'other' as const,
      title: 'Other',
      description: 'General feedback or questions',
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'from-gray-400 to-gray-600',
    },
  ];

  const satisfactionOptions = [
    {
      id: 'happy' as const,
      icon: <Smile className="h-6 w-6" />,
      label: 'Happy',
      color: 'text-green-500',
    },
    {
      id: 'neutral' as const,
      icon: <Meh className="h-6 w-6" />,
      label: 'Neutral',
      color: 'text-yellow-500',
    },
    {
      id: 'sad' as const,
      icon: <Frown className="h-6 w-6" />,
      label: 'Unhappy',
      color: 'text-red-500',
    },
  ];

  const handleSubmit = async () => {
    if (!feedback.message.trim()) {
      toast.error('Please provide some feedback before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to submit feedback
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would send this to your backend
      console.log('Feedback submitted:', {
        ...feedback,
        userId: user?.id,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });

      toast.success('Thank you for your feedback! We appreciate your input.');
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFeedback({
      type: 'improvement',
      rating: 0,
      satisfaction: 'neutral',
      message: '',
      context,
    });
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <SafeAnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <MotionDiv
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <GlassCard className="premium-card bg-card/95 backdrop-blur-xl border border-border-alt shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Share Your Feedback</h3>
                    <p className="text-sm text-muted-foreground">
                      Help us improve Bot Architect Studio
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map(stepNumber => (
                  <div
                    key={stepNumber}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      stepNumber <= step
                        ? 'bg-gradient-to-r from-primary to-sapphire'
                        : 'bg-muted/20'
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Feedback Type */}
              {step === 1 && (
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-medium text-foreground mb-4">
                    What type of feedback do you have?
                  </h4>
                  <div className="space-y-3 mb-6">
                    {feedbackTypes.map(type => (
                      <MotionDiv
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          onClick={() => setFeedback(prev => ({ ...prev, type: type.id }))}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            feedback.type === type.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border-alt hover:border-primary/50 hover:bg-background/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-gradient-to-r ${type.color} rounded-lg`}>
                              {React.cloneElement(type.icon, { className: 'h-4 w-4 text-white' })}
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">{type.title}</h5>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      </MotionDiv>
                    ))}
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full">
                    Next Step
                  </Button>
                </MotionDiv>
              )}

              {/* Step 2: Rating & Satisfaction */}
              {step === 2 && (
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6 mb-6">
                    {/* Star Rating */}
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-3 block">
                        How would you rate your overall experience?
                      </Label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <MotionButton
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                            className={`p-1 transition-colors duration-200 ${
                              star <= feedback.rating
                                ? 'text-yellow-500'
                                : 'text-muted-foreground hover:text-yellow-400'
                            }`}
                          >
                            <Star className="h-6 w-6 fill-current" />
                          </MotionButton>
                        ))}
                      </div>
                    </div>

                    {/* Satisfaction */}
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-3 block">
                        How are you feeling about the platform?
                      </Label>
                      <div className="flex items-center gap-4">
                        {satisfactionOptions.map(option => (
                          <MotionButton
                            key={option.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setFeedback(prev => ({ ...prev, satisfaction: option.id }))
                            }
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                              feedback.satisfaction === option.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border-alt hover:border-primary/50'
                            }`}
                          >
                            <div className={option.color}>{option.icon}</div>
                            <span className="text-xs text-muted-foreground">{option.label}</span>
                          </MotionButton>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Next Step
                    </Button>
                  </div>
                </MotionDiv>
              )}

              {/* Step 3: Message */}
              {step === 3 && (
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <Label
                      htmlFor="feedback-message"
                      className="text-sm font-medium text-foreground mb-3 block"
                    >
                      Tell us more about your experience
                    </Label>
                    <Textarea
                      id="feedback-message"
                      placeholder="Share your thoughts, suggestions, or describe any issues you've encountered..."
                      value={feedback.message}
                      onChange={e => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                      className="min-h-[120px] bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Your feedback helps us improve the platform for everyone.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-background/50 rounded-lg p-4 mb-6">
                    <h5 className="font-medium text-foreground mb-2">Feedback Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {feedbackTypes.find(t => t.id === feedback.type)?.title}
                        </Badge>
                        {feedback.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-muted-foreground">{feedback.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !feedback.message.trim()}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </MotionDiv>
              )}
            </div>
          </GlassCard>
        </MotionDiv>
      </MotionDiv>
    </SafeAnimatePresence>
  );
};

export default FeedbackSystem;
