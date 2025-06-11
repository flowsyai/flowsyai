import React, { useState, useEffect, useRef } from 'react';
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

import { Button } from '@/components/ui/button';
import { useAnimatedScroll } from '@/hooks/useAnimatedScroll';
import {
  Bot,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

// Demo steps data
const demoSteps = [
  {
    id: 'input',
    title: 'User Input',
    description: 'Submit your query to the unified AI system',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'primary',
  },
  {
    id: 'processing',
    title: 'Intelligent Routing',
    description: 'Your query is analyzed and routed to the appropriate AI bots',
    icon: <BrainCircuit className="w-6 h-6" />,
    color: 'gold',
  },
  {
    id: 'bots',
    title: 'Multi-Bot Processing',
    description: 'Multiple specialized AI bots work on different aspects of your query',
    icon: <Bot className="w-6 h-6" />,
    color: 'platinum',
  },
  {
    id: 'integration',
    title: 'Response Integration',
    description: 'Individual bot responses are unified into a comprehensive answer',
    icon: <Zap className="w-6 h-6" />,
    color: 'primary',
  },
  {
    id: 'output',
    title: 'Enhanced Output',
    description: 'Receive a complete, intelligent response that leverages multiple AI capabilities',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'gold',
  },
];

// Sample user queries
const sampleQueries = [
  'Analyze market trends for AI integration platforms',
  'Create a comprehensive report on renewable energy',
  'Design a marketing strategy for our new product',
  'Summarize the latest research in quantum computing',
  'Generate creative content ideas for our social media',
];

// Sample bot responses
const botResponses = {
  'Research Bot': 'Analyzing latest market data and research papers...',
  'Creative Bot': 'Generating creative solutions and innovative approaches...',
  'Analytics Bot': 'Processing data patterns and statistical insights...',
  'Content Bot': 'Formulating clear and engaging content structures...',
};

const InteractiveDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(sampleQueries[0]);
  const [showBotResponses, setShowBotResponses] = useState(false);
  const [showFinalResponse, setShowFinalResponse] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const { ref, isVisible } = useAnimatedScroll({
    threshold: 0.2,
    triggerOnce: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-play of demo
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStep < demoSteps.length - 1) {
          setCurrentStep(prev => prev + 1);

          // Show bot responses at the appropriate step
          if (currentStep === 1) {
            setTimeout(() => setShowBotResponses(true), 800);
          }

          // Show final response at the appropriate step
          if (currentStep === 3) {
            setTimeout(() => setShowFinalResponse(true), 800);
          }
        } else {
          // Reset demo after completion
          setIsAutoPlaying(false);
          setTimeout(() => {
            setCurrentStep(0);
            setShowBotResponses(false);
            setShowFinalResponse(false);
          }, 3000);
        }
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStep, isAutoPlaying]);

  // Start demo when section becomes visible
  useEffect(() => {
    if (isVisible && !isPlaying) {
      setIsPlaying(true);
    }
  }, [isVisible, isPlaying]);

  const startDemo = () => {
    setCurrentStep(0);
    setShowBotResponses(false);
    setShowFinalResponse(false);
    setIsAutoPlaying(true);
  };

  const goToStep = (index: number) => {
    // Stop auto-play if user manually navigates
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    setCurrentStep(index);

    // Show/hide bot responses based on step
    setShowBotResponses(index >= 2);
    setShowFinalResponse(index >= 4);
  };

  return (
    <section
      id="interactive-demo"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.1),transparent_70%)]" />

        {/* Animated dots */}
        {[...Array(30)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: 2 + Math.random() * 4 + 'px',
              height: 2 + Math.random() * 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <MotionH2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">See Our Platform</span>
            <span className="premium-gradient-text">In Action</span>
          </MotionH2>

          <MotionP
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience how our platform seamlessly integrates multiple AI bots to deliver
            comprehensive, intelligent responses.
          </MotionP>
        </div>

        {/* Demo Interface */}
        <div className="max-w-5xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden shadow-xl">
          {/* Demo Header */}
          <div className="bg-muted p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-gold"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <div className="text-sm font-medium">AI Integration Platform Demo</div>
            <div className="w-16"></div> {/* Spacer for alignment */}
          </div>

          {/* Demo Content */}
          <div className="p-6 md:p-8">
            {/* Progress Steps */}
            <div className="flex flex-wrap justify-between mb-8 relative">
              {/* Connection Line */}
              <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10"></div>

              {demoSteps.map((step, index) => (
                <MotionDiv
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer relative z-10 ${
                    index <= currentStep ? `text-${step.color}` : 'text-muted-foreground'
                  }`}
                  onClick={() => goToStep(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MotionDiv
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      index <= currentStep
                        ? `bg-${step.color}/20 border border-${step.color}/50`
                        : 'bg-muted border border-muted-foreground/30'
                    }`}
                    animate={
                      index === currentStep
                        ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 0 rgba(0,0,0,0)',
                              `0 0 10px hsla(var(--${step.color}), 0.3)`,
                              '0 0 0 rgba(0,0,0,0)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                  </MotionDiv>
                  <span className="text-xs text-center hidden md:block">{step.title}</span>
                </MotionDiv>
              ))}
            </div>

            {/* Demo Visualization */}
            <div className="bg-background/50 rounded-lg p-6 mb-8 min-h-[300px]">
              {/* Step 1: User Input */}
              <SafeAnimatePresence>
                {currentStep >= 0 && (
                  <MotionDiv
                    key="user-input"
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="bg-muted p-4 rounded-lg rounded-tl-none">
                          <p className="text-foreground">{selectedQuery}</p>
                        </div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          {sampleQueries.map((query, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className={`text-xs px-2 py-1 rounded-full border ${
                                query === selectedQuery
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border bg-card/50 text-muted-foreground'
                              }`}
                              onClick={() => setSelectedQuery(query)}
                            >
                              Query {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>

              {/* Step 2-3: Bot Processing */}
              <SafeAnimatePresence>
                {currentStep >= 2 && showBotResponses && (
                  <MotionDiv
                    key="bot-responses"
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(botResponses).map(([botName, response], idx) => (
                        <MotionDiv
                          key={botName}
                          className="bg-card/50 border border-border rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-6 h-6 rounded-full bg-${
                                idx % 2 === 0 ? 'primary' : 'gold'
                              }/20 flex items-center justify-center`}
                            >
                              <Bot className="w-3 h-3" />
                            </div>
                            <h4 className="font-medium text-sm">{botName}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{response}</p>
                          <div className="mt-2 h-1 w-full bg-muted overflow-hidden rounded-full">
                            <MotionDiv
                              className={`h-full bg-${idx % 2 === 0 ? 'primary' : 'gold'}`}
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1.5 }}
                            />
                          </div>
                        </MotionDiv>
                      ))}
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>

              {/* Step 5: Final Response */}
              <SafeAnimatePresence>
                {currentStep >= 4 && showFinalResponse && (
                  <MotionDiv
                    key="final-response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary via-gold to-primary flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/20 p-4 rounded-lg rounded-tl-none">
                          <p className="text-foreground">
                            Comprehensive analysis complete. I've integrated insights from multiple
                            specialized systems to provide you with a detailed response on "
                            {selectedQuery}". The analysis includes market trends, competitive
                            landscape, and strategic recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>
            </div>

            {/* Demo Controls */}
            <div className="flex justify-center">
              <Button
                onClick={startDemo}
                className="bg-gradient-to-r from-primary to-gold text-white hover:from-primary/90 hover:to-gold/90"
                disabled={isAutoPlaying}
              >
                {isAutoPlaying ? 'Demo Running...' : 'Start Interactive Demo'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Demo Description */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This interactive demonstration showcases how our platform processes queries through
            multiple specialized AI bots and integrates their responses into a comprehensive answer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
