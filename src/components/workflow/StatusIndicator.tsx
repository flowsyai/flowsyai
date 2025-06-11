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

import { NodeStatus } from '@/types/workflow'; // Adjusted path
import { CheckCircle2, XCircle, Loader2, Info } from 'lucide-react'; // Added Info for idle

interface StatusIndicatorProps {
  status: NodeStatus;
  className?: string; // Allow custom class for positioning
}

const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  let icon = null;
  let text = '';
  let colorClass = '';
  let animateDot = false;

  switch (status) {
    case 'running':
      icon = <Loader2 className="h-3 w-3 animate-spin" />;
      text = 'Running...';
      colorClass = 'text-primary';
      animateDot = true;
      break;
    case 'completed':
      icon = <CheckCircle2 className="h-3 w-3" />;
      text = 'Completed';
      colorClass = 'text-green-500';
      break;
    case 'error':
      icon = <XCircle className="h-3 w-3" />;
      text = 'Error';
      colorClass = 'text-red-500';
      break;
    case 'idle':
    default:
      icon = <Info className="h-3 w-3" />;
      text = 'Idle';
      colorClass = 'text-muted-foreground';
      break;
  }

  if (status === 'idle' && !className) return null; // Don't show idle if not explicitly placed by WorkflowNode

  return (
    <div className={className || 'absolute bottom-2 right-2'}>
      {' '}
      {/* Default position if not overridden */}
      <MotionDiv
        className={`px-2 py-1 rounded-full bg-card/80 border border-border/50 shadow-md flex items-center gap-1.5 backdrop-blur-sm ${colorClass}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {animateDot ? (
          <MotionDiv
            className={`w-1.5 h-1.5 ${status === 'running' ? 'bg-primary' : status === 'completed' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-gray-400'} rounded-full`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ) : (
          icon
        )}
        <span className="text-xs font-medium">{text}</span>
      </MotionDiv>
    </div>
  );
};

export default StatusIndicator;
