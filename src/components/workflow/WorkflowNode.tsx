import { useState, useCallback, memo, MouseEvent } from 'react';
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
import {
  X,
  Settings,
  Play,
  Zap,
  Download,
  Share,
  GripVertical,
  Brain,
  Shuffle,
  FileText,
} from 'lucide-react';
import { Handle, Position, NodeProps as ReactFlowNodeProps } from 'reactflow';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Explicitly import WorkflowNodeData and WorkflowNode (as LocalWorkflowNode)
import {
  type WorkflowNode as LocalWorkflowNode,
  type WorkflowNodeData,
  type NodeStatus,
} from '@/types/workflow';
import { cn } from '@/lib/utils';
import StatusIndicator from './StatusIndicator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { FeatureUnderDevelopmentModal } from '@/components/FeatureUnderDevelopmentModal';
import { NodeConfigModal } from './NodeConfigModal'; // Import NodeConfigModal
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// Use WorkflowNodeData for the 'data' part of ReactFlowNodeProps
export interface CustomNodeComponentProps extends ReactFlowNodeProps<WorkflowNodeData> {
  isActive: boolean;
  onRemove: (id: string) => void;
  onNodeClick?: (node: LocalWorkflowNode) => void;
  onUpdateNodeData: (nodeId: string, dataChanges: Partial<WorkflowNodeData>) => void;
  isTeaser?: boolean;
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case 'trigger':
      return <Zap className="w-5 h-5 text-yellow-500" />;
    case 'action':
      return <Settings className="w-5 h-5 text-blue-500" />;
    case 'llm':
      return <Brain className="w-5 h-5 text-purple-500" />;
    case 'dataTransformation':
      return <Shuffle className="w-5 h-5 text-teal-500" />;
    case 'output':
      return <FileText className="w-5 h-5 text-green-500" />;
    default:
      return <Settings className="w-5 h-5 text-gray-500" />;
  }
};

const WorkflowNodeComponent = ({
  id,
  data, // data is WorkflowNodeData
  type,
  selected,
  dragging,
  xPos,
  yPos,
  isActive,
  onRemove,
  onNodeClick,
  onUpdateNodeData,
  isTeaser = false,
}: CustomNodeComponentProps) => {
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isExportResultsModalOpen, setIsExportResultsModalOpen] = useState(false);

  const Icon = getNodeIcon(type || 'custom');

  const handleNodeCardClick = useCallback(() => {
    if (isTeaser) return;
    if (onNodeClick) {
      const nodeForCallback: LocalWorkflowNode = {
        id,
        type: type || 'custom',
        data,
        position: { x: xPos, y: yPos },
        status: data.status || 'idle', // Use status from data or default to 'idle'
      };
      onNodeClick(nodeForCallback);
    }
  }, [isTeaser, onNodeClick, id, type, data, xPos, yPos]);

  const handleRunNode = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isTeaser) return;

      onUpdateNodeData(id, {
        status: 'running' as NodeStatus,
      });

      toast({
        title: 'Running Node',
        description: `Node "${data.name}" is now running...`,
      });
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          onUpdateNodeData(id, {
            status: 'completed' as NodeStatus,
            simulatedOutput: `Node ${data.name} processed successfully.`,
          });
          toast({
            title: 'Node Completed',
            description: `Node "${data.name}" completed successfully.`,
          });
        } else {
          onUpdateNodeData(id, {
            status: 'error' as NodeStatus,
            errorMessage: 'Simulated error during execution.',
          });
          toast({
            title: 'Node Error',
            description: `Node "${data.name}" failed.`,
            variant: 'destructive',
          });
        }
      }, 2500);
    },
    [isTeaser, onUpdateNodeData, id, data.name]
  );

  const handleActivateNode = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isTeaser) return;
      setIsActivateModalOpen(true);
    },
    [isTeaser]
  );
  const handleConfigureNode = useCallback(
    (e?: React.MouseEvent) => {
      // Make e optional
      e?.stopPropagation();
      if (isTeaser) return;
      setIsConfigureModalOpen(true);
    },
    [isTeaser]
  );
  const handleDuplicateNode = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isTeaser) return;
      toast({
        title: 'Node Duplicated',
        description: `Node "${data.name}" duplicated. (Placeholder)`,
      });
    },
    [isTeaser, data.name]
  );
  const handleDownloadResults = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isTeaser) return;
      setIsExportResultsModalOpen(true);
    },
    [isTeaser]
  );

  const handleRemoveNode = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove(id);
    },
    [onRemove, id]
  );

  return (
    <>
      {!isTeaser && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className="!bg-primary !w-3 !h-3 !border-2 !border-card"
            isConnectable={!isTeaser}
            id="target"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="!bg-primary !w-3 !h-3 !border-2 !border-card"
            isConnectable={!isTeaser}
            id="source"
          />
        </>
      )}
      <MotionDiv
        className={cn('workflow-node-rf group rounded-lg border bg-card shadow-md', {
          'ring-2 ring-sky-500 ring-offset-1 ring-offset-background': selected && !isTeaser,
          'glow-effect shadow-primary/20': isActive && !isTeaser,
          'cursor-grab': !isTeaser && !dragging,
          'cursor-grabbing': !isTeaser && dragging,
          'cursor-default': isTeaser,
        })}
        style={{ width: data.width || 180 }} // Accessing data.width
        onClick={handleNodeCardClick}
        onDoubleClick={() => handleConfigureNode()} // Add double-click handler
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: isActive && !isTeaser ? 1.02 : 1,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: !isTeaser && !dragging ? 1.01 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <CardHeader className="flex flex-row items-center justify-between p-2 border-b space-y-0">
          <div className="flex items-center gap-2 text-sm font-medium">
            {!isTeaser && (
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Drag to move</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {Icon}
            <span className="truncate" title={data.name}>
              {data.name}
            </span>
          </div>
          {!isTeaser && (
            <DropdownMenu>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Settings className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Node Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Node Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={e => handleConfigureNode(e)}>
                  <Settings className="h-3.5 w-3.5 mr-2" />
                  Configure
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicateNode}>
                  <Share className="h-3.5 w-3.5 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRunNode}>
                  <Play className="h-3.5 w-3.5 mr-2" />
                  Run Node
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadResults}>
                  <Download className="h-3.5 w-3.5 mr-2" />
                  Export Results
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={handleRemoveNode}
                >
                  <X className="h-3.5 w-3.5 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>

        <CardContent className="p-3 text-xs">
          <p className="text-muted-foreground truncate mb-1" title={data.description}>
            {data.label || data.description || 'No description'}
          </p>
          <StatusIndicator status={data.status || 'idle'} className="my-1.5" />
          {data.config && Object.keys(data.config).length > 0 && !isTeaser && (
            <Badge variant="outline" className="mt-1 text-xs">
              Configured
            </Badge>
          )}
          {!isTeaser && (
            <MotionDiv
              className="mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs py-1 h-auto"
                      onClick={handleActivateNode}
                    >
                      <Zap className="h-3 w-3 mr-1.5" />
                      Activate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Activate this node (feature in development)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </MotionDiv>
          )}
        </CardContent>
      </MotionDiv>

      {!isTeaser && (
        <>
          <NodeConfigModal
            isOpen={isConfigureModalOpen}
            onClose={() => setIsConfigureModalOpen(false)}
            node={{
              id,
              type: type || 'custom',
              data,
              position: { x: xPos, y: yPos },
              status: data.status || 'idle', // Set status from data or default
            }}
            onSave={onUpdateNodeData}
          />
          <FeatureUnderDevelopmentModal
            open={isActivateModalOpen}
            onOpenChange={setIsActivateModalOpen}
            featureName="Activate Node"
            actionDescription={`Activate ${data.name} node.`}
          />
          <FeatureUnderDevelopmentModal
            open={isExportResultsModalOpen}
            onOpenChange={setIsExportResultsModalOpen}
            featureName="Export Results"
            actionDescription={`Export results from ${data.name} node.`}
          />
        </>
      )}
    </>
  );
};

export default memo(WorkflowNodeComponent);
