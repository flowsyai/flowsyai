import React, { useState, useEffect } from 'react';
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
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Brain,
  MessageSquare,
  Image,
  FileText,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WorkflowNode {
  id: string;
  type: 'input' | 'ai' | 'output';
  title: string;
  icon: React.ReactNode;
  status: 'idle' | 'processing' | 'complete';
  description: string;
  color: string;
}

const InteractiveWorkflowPreview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState<'content' | 'analysis' | 'automation'>(
    'content'
  );

  const demoWorkflows = {
    content: [
      {
        id: '1',
        type: 'input' as const,
        title: 'User Input',
        icon: <MessageSquare className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Write a blog post about AI trends',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        id: '2',
        type: 'ai' as const,
        title: 'AI Research',
        icon: <Brain className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Gather latest AI industry insights',
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: '3',
        type: 'ai' as const,
        title: 'Content Generation',
        icon: <FileText className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Create comprehensive blog post',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        id: '4',
        type: 'output' as const,
        title: 'Final Output',
        icon: <CheckCircle className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Professional blog post ready for publishing',
        color: 'from-gold to-yellow-500',
      },
    ],
    analysis: [
      {
        id: '1',
        type: 'input' as const,
        title: 'Data Input',
        icon: <Image className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Upload business documents',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        id: '2',
        type: 'ai' as const,
        title: 'AI Analysis',
        icon: <Brain className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Extract key insights and patterns',
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: '3',
        type: 'ai' as const,
        title: 'Report Generation',
        icon: <FileText className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Create detailed analysis report',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        id: '4',
        type: 'output' as const,
        title: 'Insights Dashboard',
        icon: <CheckCircle className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Interactive dashboard with actionable insights',
        color: 'from-gold to-yellow-500',
      },
    ],
    automation: [
      {
        id: '1',
        type: 'input' as const,
        title: 'Trigger Event',
        icon: <Zap className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'New customer inquiry received',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        id: '2',
        type: 'ai' as const,
        title: 'AI Classification',
        icon: <Brain className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Categorize inquiry type and urgency',
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: '3',
        type: 'ai' as const,
        title: 'Response Generation',
        icon: <MessageSquare className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Generate personalized response',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        id: '4',
        type: 'output' as const,
        title: 'Auto-Reply Sent',
        icon: <CheckCircle className="w-5 h-5" />,
        status: 'idle' as const,
        description: 'Customer receives instant, relevant response',
        color: 'from-gold to-yellow-500',
      },
    ],
  };

  const currentWorkflow = demoWorkflows[selectedDemo];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= currentWorkflow.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentWorkflow.length]);

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    // Reset all node statuses
    currentWorkflow.forEach(node => (node.status = 'idle'));
  };

  const startDemo = () => {
    resetDemo();
    setIsPlaying(true);
  };

  // Update node statuses based on current step
  currentWorkflow.forEach((node, index) => {
    if (index < currentStep) {
      node.status = 'complete';
    } else if (index === currentStep && isPlaying) {
      node.status = 'processing';
    } else {
      node.status = 'idle';
    }
  });

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto max-w-6xl">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
            See FlowsyAI in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how our AI workflows transform complex tasks into simple, automated processes.
            Choose a demo scenario and see the magic happen.
          </p>
        </MotionDiv>

        {/* Demo Type Selector */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-card/50 backdrop-blur-sm rounded-xl p-1 border border-border/30">
            {Object.entries(demoWorkflows).map(([key, _]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedDemo(key as keyof typeof demoWorkflows);
                  resetDemo();
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedDemo === key
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </MotionDiv>

        {/* Workflow Visualization */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="premium-card bg-card/30 backdrop-blur-lg border border-border/30 rounded-2xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {currentWorkflow.map((node, index) => (
              <React.Fragment key={node.id}>
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-xl border transition-all duration-500 ${
                    node.status === 'processing'
                      ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/20'
                      : node.status === 'complete'
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-border/30 bg-card/20'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="absolute -top-2 -right-2">
                    {node.status === 'processing' && (
                      <MotionDiv
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </MotionDiv>
                    )}
                    {node.status === 'complete' && (
                      <MotionDiv
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </MotionDiv>
                    )}
                  </div>

                  {/* Node Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${node.color} flex items-center justify-center text-white mb-4`}
                  >
                    {node.icon}
                  </div>

                  {/* Node Content */}
                  <h3 className="font-semibold text-foreground mb-2">{node.title}</h3>
                  <p className="text-sm text-muted-foreground">{node.description}</p>

                  {/* Processing Animation */}
                  {node.status === 'processing' && (
                    <MotionDiv
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.8 }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-gold rounded-b-xl"
                    />
                  )}
                </MotionDiv>

                {/* Arrow Connector */}
                {index < currentWorkflow.length - 1 && (
                  <div
                    className="hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2"
                    style={{ left: `${(index + 1) * 25 - 2}%` }}
                  >
                    <MotionDiv
                      animate={{
                        opacity: currentStep > index ? 1 : 0.3,
                        scale: currentStep > index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight
                        className={`w-6 h-6 ${currentStep > index ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                    </MotionDiv>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </MotionDiv>

        {/* Demo Controls */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Button
            onClick={startDemo}
            disabled={isPlaying}
            className="bg-gradient-to-r from-primary to-gold text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Play className="w-4 h-4 mr-2" />
            {isPlaying ? 'Running...' : 'Start Demo'}
          </Button>

          <Button
            onClick={resetDemo}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </MotionDiv>

        {/* Call to Action */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Ready to build your own AI workflows? Join thousands of users already automating their
            tasks.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary via-sapphire to-primary text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            asChild
          >
            <a href="/waitlist">
              <Sparkles className="w-5 h-5 mr-2" />
              Join the Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};

export default InteractiveWorkflowPreview;
