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

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PlusCircle,
  Sparkles,
  Bot,
  Workflow,
  Zap,
  Target,
  ArrowRight,
  Star,
  Layers,
  BarChart3,
} from 'lucide-react';

interface QuickAccessPanelProps {
  className?: string;
}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'workflow-builder',
      title: 'Workflow Builder',
      description: 'Create powerful AI workflows with drag-and-drop interface',
      icon: <PlusCircle className="w-6 h-6" />,
      path: '/workflow-builder',
      featured: true,
      color: 'from-[hsl(var(--button-primary))] to-[hsl(var(--nav-secondary))]',
      bgColor:
        'bg-gradient-to-br from-[hsl(var(--button-primary))]/10 to-[hsl(var(--nav-secondary))]/10',
      borderColor: 'border-[hsl(var(--button-primary))]/20',
      stats: '50+ Templates',
    },
    {
      id: 'ai-playground',
      title: 'AI Ecosystem Playground',
      description: 'Experiment with multiple AI models and providers',
      icon: <Sparkles className="w-6 h-6" />,
      path: '/ai-ecosystem-playground',
      featured: true,
      color: 'from-[hsl(var(--nav-secondary))] to-[hsl(var(--accent))]',
      bgColor: 'bg-gradient-to-br from-[hsl(var(--nav-secondary))]/10 to-[hsl(var(--accent))]/10',
      borderColor: 'border-[hsl(var(--nav-secondary))]/20',
      stats: '15+ AI Models',
    },
    {
      id: 'ai-studio',
      title: 'AI Workflow Studio',
      description: 'Advanced AI workflow creation and management',
      icon: <Bot className="w-6 h-6" />,
      path: '/workflow-builder',
      featured: false,
      color: 'from-[hsl(var(--primary))] to-[hsl(var(--secondary))]',
      bgColor: 'bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10',
      borderColor: 'border-[hsl(var(--primary))]/20',
      stats: 'Pro Features',
    },
    {
      id: 'templates',
      title: 'Workflow Templates',
      description: 'Browse and use pre-built workflow templates',
      icon: <Layers className="w-6 h-6" />,
      path: '/workflow-templates',
      featured: false,
      color: 'from-[hsl(var(--emerald))] to-[hsl(var(--emerald-light))]',
      bgColor: 'bg-gradient-to-br from-[hsl(var(--emerald))]/10 to-[hsl(var(--emerald-light))]/10',
      borderColor: 'border-[hsl(var(--emerald))]/20',
      stats: '100+ Templates',
    },
    {
      id: 'analytics',
      title: 'Workflow Analytics',
      description: 'Monitor and analyze your workflow performance',
      icon: <BarChart3 className="w-6 h-6" />,
      path: '/workflow-analytics',
      featured: false,
      color: 'from-[hsl(var(--gold))] to-[hsl(var(--gold-light))]',
      bgColor: 'bg-gradient-to-br from-[hsl(var(--gold))]/10 to-[hsl(var(--gold-light))]/10',
      borderColor: 'border-[hsl(var(--gold))]/20',
      stats: 'Real-time Data',
    },
    {
      id: 'marketplace',
      title: 'Workflow Marketplace',
      description: 'Discover and share workflows with the community',
      icon: <Target className="w-6 h-6" />,
      path: '/workflow-marketplace',
      featured: false,
      color: 'from-[hsl(var(--ruby))] to-[hsl(var(--ruby-light))]',
      bgColor: 'bg-gradient-to-br from-[hsl(var(--ruby))]/10 to-[hsl(var(--ruby-light))]/10',
      borderColor: 'border-[hsl(var(--ruby))]/20',
      stats: 'Community Hub',
    },
  ];

  const handleActionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--nav-primary))] to-[hsl(var(--nav-secondary))] bg-clip-text text-transparent">
          Quick Access
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Jump into your AI workflow creation journey with these powerful tools and features
        </p>
      </div>

      {/* Featured Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions
          .filter(action => action.featured)
          .map((action, index) => (
            <MotionDiv
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${action.bgColor} ${action.borderColor} border-2 hover:border-opacity-40 group`}
                onClick={() => handleActionClick(action.path)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} text-white`}>
                      {action.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-[hsl(var(--nav-primary))]/20 text-[hsl(var(--nav-primary))]"
                      >
                        Featured
                      </Badge>
                      <Star className="w-4 h-4 text-[hsl(var(--gold))]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-[hsl(var(--nav-primary))] transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-[hsl(var(--muted-foreground))]">
                      {action.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[hsl(var(--nav-primary))]">
                      {action.stats}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-[hsl(var(--nav-hover))] group-hover:text-[hsl(var(--nav-primary))]"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
      </div>

      {/* Other Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions
          .filter(action => !action.featured)
          .map((action, index) => (
            <MotionDiv
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${action.bgColor} ${action.borderColor} border hover:border-opacity-40 group h-full`}
                onClick={() => handleActionClick(action.path)}
              >
                <CardHeader className="pb-2">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white w-fit`}
                  >
                    {action.icon}
                  </div>
                  <CardTitle className="text-lg group-hover:text-[hsl(var(--nav-primary))] transition-colors">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                    {action.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[hsl(var(--nav-primary))]">
                      {action.stats}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--nav-primary))] group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
      </div>

      {/* Call to Action */}
      <div className="text-center pt-6">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            onClick={() => navigate('/documentation')}
            variant="outline"
            size="lg"
            className="border-[hsl(var(--nav-border))] hover:bg-[hsl(var(--nav-hover))] hover:text-[hsl(var(--nav-primary))]"
          >
            <Workflow className="w-5 h-5 mr-2" />
            View Documentation
          </Button>
        </MotionDiv>
      </div>
    </div>
  );
};

export default QuickAccessPanel;
