import React, { FC, cloneElement } from 'react';
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, PlusCircle } from 'lucide-react';

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  category: string;
  tags?: string[];
  isNew?: boolean;
  isPremium?: boolean;
}

interface AIAgentCardProps {
  agent: AIAgent;
  onClick: (agent: AIAgent) => void;
  onAddToWorkflow: (agent: AIAgent) => void;
  index?: number;
}

const AIAgentCard: FC<AIAgentCardProps> = ({ agent, onClick, onAddToWorkflow, index = 0 }) => {
  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(agent);
  };

  const handleAddToWorkflowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWorkflow(agent);
    toast({
      title: `${agent.name} Added to Workflow`,
      description: 'You can now configure it in the workflow canvas.',
    });
  };

  // Remove the drag event from motion.div and add it as a separate handler on the Card
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', agent.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const prominentIcon = cloneElement(agent.icon, {
    className: 'w-10 h-10 text-primary',
  });

  return (
    <MotionDiv
      className="h-full hover-lift hover-glow rounded-xl group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      // Remove the draggable and onDragStart from here as they conflict with motion.div
    >
      <Card
        className="bg-card-alt border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300 flex flex-col h-full p-6 cursor-grab relative overflow-hidden"
        draggable={true}
        onDragStart={handleDragStart}
      >
        <CardHeader className="p-0 mb-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-background rounded-lg inline-block mb-3 shadow-sm">
              {prominentIcon}
            </div>
            <div className="flex flex-col items-end space-y-1">
              {agent.isNew && (
                <Badge
                  variant="default"
                  className="bg-secondary-accent text-secondary-accent-foreground text-xs px-2 py-0.5"
                >
                  NEW
                </Badge>
              )}
              {agent.isPremium && (
                <Badge
                  variant="outline"
                  className="border-primary text-primary text-xs px-2 py-0.5"
                >
                  PREMIUM
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-h3 text-foreground">{agent.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mb-4 flex-grow">
          <p className="text-body-std text-foreground/80 mb-3 line-clamp-3">{agent.description}</p>
          {agent.tags && agent.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {agent.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-0 mt-auto">
          <Badge variant="outline" className="text-caption text-foreground/60 border-border-alt">
            {agent.category}
          </Badge>
        </CardFooter>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddToWorkflowClick}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add to Workflow
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground"
              onClick={handleViewDetailsClick}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </MotionDiv>
  );
};

export default AIAgentCard;
