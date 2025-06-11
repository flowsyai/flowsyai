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
  HelpCircle,
  X,
  Lightbulb,
  Zap,
  ArrowRight,
  BookOpen,
  Video,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface HelpTip {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'intermediate' | 'advanced';
  type: 'tip' | 'warning' | 'info' | 'success';
  action?: {
    label: string;
    onClick: () => void;
  };
  links?: {
    label: string;
    url: string;
    type: 'docs' | 'video' | 'example';
  }[];
}

interface ContextualHelpProps {
  context: string; // Current context (e.g., 'node-library', 'canvas', 'properties')
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  isVisible: boolean;
  onToggle: () => void;
}

const helpContent: Record<string, HelpTip[]> = {
  'node-library': [
    {
      id: 'node-categories',
      title: 'Understanding Node Categories',
      description:
        'Each category serves a specific purpose in your workflow. AI Models process text, Data nodes transform information, Integrations connect services, and Triggers start workflows.',
      category: 'basic',
      type: 'info',
      links: [
        { label: 'Node Types Guide', url: '/docs/nodes', type: 'docs' },
        { label: 'Video Tutorial', url: '/videos/nodes', type: 'video' },
      ],
    },
    {
      id: 'drag-drop',
      title: 'Drag & Drop Workflow',
      description:
        'Simply drag any node from the library to the canvas. The node will automatically snap to a grid for clean alignment.',
      category: 'basic',
      type: 'tip',
      action: {
        label: 'Try it now',
        onClick: () => console.log('Highlight drag area'),
      },
    },
    {
      id: 'node-search',
      title: 'Quick Node Search',
      description:
        'Use the search bar to quickly find specific nodes. Try searching for "GPT", "filter", or "webhook" to see relevant results.',
      category: 'intermediate',
      type: 'tip',
    },
  ],
  canvas: [
    {
      id: 'connecting-nodes',
      title: 'Connecting Nodes',
      description:
        'Click and drag from an output port (right side) to an input port (left side) to create connections. Data flows from left to right.',
      category: 'basic',
      type: 'info',
      links: [{ label: 'Connection Guide', url: '/docs/connections', type: 'docs' }],
    },
    {
      id: 'canvas-navigation',
      title: 'Canvas Navigation',
      description:
        'Use mouse wheel to zoom, click and drag to pan. The minimap in the bottom-right shows your current view.',
      category: 'basic',
      type: 'tip',
    },
    {
      id: 'execution-flow',
      title: 'Understanding Execution Flow',
      description:
        'Workflows execute from triggers through connected nodes. Watch the execution indicators to see data flow in real-time.',
      category: 'intermediate',
      type: 'info',
    },
    {
      id: 'performance-tips',
      title: 'Performance Optimization',
      description:
        'For large workflows, consider using parallel branches and avoid deeply nested loops. Monitor execution times in the analytics panel.',
      category: 'advanced',
      type: 'warning',
      links: [{ label: 'Performance Guide', url: '/docs/performance', type: 'docs' }],
    },
  ],
  properties: [
    {
      id: 'node-configuration',
      title: 'Node Configuration',
      description:
        'Each node has specific settings that control its behavior. Required fields are marked with an asterisk (*). Hover over field labels for detailed explanations.',
      category: 'basic',
      type: 'info',
    },
    {
      id: 'dynamic-values',
      title: 'Using Dynamic Values',
      description:
        'Reference data from previous nodes using {{node_name.field}} syntax. This creates dynamic workflows that adapt to incoming data.',
      category: 'intermediate',
      type: 'tip',
      links: [
        { label: 'Expression Guide', url: '/docs/expressions', type: 'docs' },
        { label: 'Examples', url: '/examples/expressions', type: 'example' },
      ],
    },
  ],
};

const getIconForType = (type: string) => {
  switch (type) {
    case 'tip':
      return <Lightbulb className="w-4 h-4 text-yellow-500" />;
    case 'warning':
      return <Zap className="w-4 h-4 text-orange-500" />;
    case 'success':
      return <Zap className="w-4 h-4 text-green-500" />;
    default:
      return <HelpCircle className="w-4 h-4 text-blue-500" />;
  }
};

const getBadgeVariant = (category: string) => {
  switch (category) {
    case 'basic':
      return 'default';
    case 'intermediate':
      return 'secondary';
    case 'advanced':
      return 'destructive';
    default:
      return 'default';
  }
};

const ContextualHelp: React.FC<ContextualHelpProps> = ({
  context,
  userLevel,
  isVisible,
  onToggle,
}) => {
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set());

  const contextTips = helpContent[context] || [];
  const relevantTips = contextTips.filter(tip => {
    // Show tips based on user level
    const levelOrder = ['basic', 'intermediate', 'advanced'];
    const userLevelIndex = levelOrder.indexOf(userLevel);
    const tipLevelIndex = levelOrder.indexOf(tip.category);

    return tipLevelIndex <= userLevelIndex + 1 && !dismissedTips.has(tip.id);
  });

  const toggleTip = (tipId: string) => {
    setExpandedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => new Set([...prev, tipId]));
  };

  if (!isVisible || relevantTips.length === 0) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-20 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto z-40"
    >
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Contextual Help</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Tips and guidance for {context.replace('-', ' ')}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {relevantTips.map(tip => (
            <MotionDiv
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-3 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1">
                  {getIconForType(tip.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{tip.title}</h4>
                      <Badge variant={getBadgeVariant(tip.category)} className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissTip(tip.id)}
                  className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>

              {(tip.action || tip.links) && (
                <Collapsible open={expandedTips.has(tip.id)} onOpenChange={() => toggleTip(tip.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      {expandedTips.has(tip.id) ? (
                        <>
                          <ChevronUp className="w-3 h-3 mr-1" />
                          Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 mr-1" />
                          More
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-2">
                    {tip.action && (
                      <Button size="sm" onClick={tip.action.onClick} className="w-full text-xs">
                        <ArrowRight className="w-3 h-3 mr-1" />
                        {tip.action.label}
                      </Button>
                    )}

                    {tip.links && (
                      <div className="space-y-1">
                        {tip.links.map((link, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(link.url, '_blank')}
                            className="w-full text-xs justify-start"
                          >
                            {link.type === 'video' && <Video className="w-3 h-3 mr-1" />}
                            {link.type === 'docs' && <BookOpen className="w-3 h-3 mr-1" />}
                            {link.type === 'example' && <Zap className="w-3 h-3 mr-1" />}
                            {link.label}
                            <ExternalLink className="w-3 h-3 ml-auto" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </MotionDiv>
          ))}

          {relevantTips.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tips available for this context</p>
            </div>
          )}
        </CardContent>
      </Card>
    </MotionDiv>
  );
};

export default ContextualHelp;
