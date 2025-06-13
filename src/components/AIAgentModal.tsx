import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type AIAgent } from './AIAgentCard';
import { MotionDiv, MotionLi } from '@/lib/motion-wrapper';
import { CheckCircle } from 'lucide-react';

interface AIAgentModalProps {
  agent: AIAgent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToWorkflow?: (agent: AIAgent) => void;
}

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const AIAgentModal: FC<AIAgentModalProps> = ({ agent, open, onOpenChange, onAddToWorkflow }) => {
  if (!agent) return null;

  const capabilities = [
    'Advanced natural language processing',
    `Specialized for ${agent.category.toLowerCase()} tasks`,
    'Integrates with other AI agents seamlessly',
    'Scalable and efficient performance',
  ];

  const handleAddToWorkflow = () => {
    if (onAddToWorkflow) {
      onAddToWorkflow(agent);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card-alt border-border-alt shadow-2xl rounded-xl">
        <DialogHeader className="pt-2">
          <div className="flex items-center gap-4 mb-3">
            <MotionDiv
              className="p-3 bg-primary/10 rounded-lg border border-primary/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
            >
              {React.cloneElement(agent.icon, { className: 'w-7 h-7 text-primary' })}
            </MotionDiv>
            <DialogTitle className="text-h3 text-foreground">{agent.name}</DialogTitle>
          </div>
          <DialogDescription className="text-body-std text-muted-foreground">
            {agent.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 my-2 border-y border-border-alt">
          <h4 className="text-lg font-semibold mb-3 text-foreground/90">Key Capabilities</h4>
          <ul className="space-y-2.5">
            {capabilities.map((cap, index) => (
              <MotionLi
                key={index}
                className="flex items-start gap-2.5"
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeOut' }}
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-std text-foreground/80">{cap}</span>
              </MotionLi>
            ))}
          </ul>
        </div>

        <DialogFooter className="gap-3 sm:gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="hover:border-primary/70 hover:bg-primary/10 hover:text-primary-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToWorkflow}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add to Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAgentModal;
