import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  feature = 'This feature',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-center py-4">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-lg mb-2">{feature} is currently under development.</p>
            <p className="text-sm text-muted-foreground">
              We're working hard to bring you this exciting feature. Stay tuned for updates!
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button onClick={onClose} className="w-full">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;
