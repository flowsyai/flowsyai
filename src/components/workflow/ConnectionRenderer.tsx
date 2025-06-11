import { memo, useMemo } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionPath,
  MotionLinearGradient,
  MotionCircle,
  MotionSvg,
} from '@/lib/motion-wrapper';

import { type WorkflowNode, type Connection } from '@/types/workflow';
import { type ConnectionRendererProps } from './types';

interface SingleConnectionProps {
  conn: Connection;
  fromAgent: WorkflowNode;
  toAgent: WorkflowNode;
  flowDirection: 'horizontal' | 'vertical';
  isRunning: boolean;
  activeNodeId: string | null;
  agents: WorkflowNode[]; // Needed for isActive calculation logic
}

const SingleConnectionLine = memo(
  ({
    conn,
    fromAgent,
    toAgent,
    flowDirection,
    isRunning,
    activeNodeId,
    agents,
  }: SingleConnectionProps) => {
    const { from, to, midX, midY, isActive } = useMemo(() => {
      const fromPos = {
        x: fromAgent.position.x + 75,
        y: fromAgent.position.y + 40,
      };
      const toPos = {
        x: toAgent.position.x + 75,
        y: toAgent.position.y + 40,
      };

      let mX, mY;
      if (flowDirection === 'horizontal') {
        mX = (fromPos.x + toPos.x) / 2;
        mY = (fromPos.y + toPos.y) / 2 - 20;
      } else {
        mX = (fromPos.x + toPos.x) / 2 + 20;
        mY = (fromPos.y + toPos.y) / 2;
      }

      const active =
        isRunning &&
        activeNodeId &&
        (fromAgent.id === activeNodeId ||
          agents.findIndex(a => a.id === fromAgent.id) <
            agents.findIndex(a => a.id === activeNodeId));

      return { from: fromPos, to: toPos, midX: mX, midY: mY, isActive: active };
    }, [fromAgent, toAgent, flowDirection, isRunning, activeNodeId, agents]);

    return (
      <MotionSvg
        key={`conn-${conn.id}`}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <MotionLinearGradient id={`gradient-${conn.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isActive ? '#9b87f5' : 'currentColor'} />
            <stop offset="100%" stopColor={isActive ? '#7E69AB' : 'currentColor'} />
          </MotionLinearGradient>
        </defs>
        <MotionPath
          className={`connection-line ${isActive ? 'stroke-[3px] pulse' : ''}`}
          d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
          fill="none"
          stroke={isActive ? `url(#gradient-${conn.id})` : 'currentColor'}
          strokeDasharray={isActive ? '0' : '0'}
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            transition: { duration: 0.5, delay: 0.2 },
          }}
          markerEnd="url(#arrowhead)" // Assuming #arrowhead is defined globally by ReactFlow or parent
        />
        {isRunning && isActive && (
          <MotionCircle
            cx={0}
            cy={0}
            r={4}
            fill="#9b87f5"
            filter="drop-shadow(0 0 3px rgba(155, 135, 245, 0.7))"
            initial={{ offsetDistance: '0%' }}
            animate={{
              offsetDistance: '100%',
              transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
            }}
            style={{ offsetPath: `path('M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}')` }}
          />
        )}
      </MotionSvg>
    );
  }
);
SingleConnectionLine.displayName = 'SingleConnectionLine';

const ConnectionRenderer = ({
  connections,
  agents,
  flowDirection,
  isRunning,
  activeNodeId,
}: ConnectionRendererProps) => {
  return connections.map(conn => {
    const fromAgent = agents.find(a => a.id === conn.from);
    const toAgent = agents.find(a => a.id === conn.to);

    if (!fromAgent || !toAgent) return null;

    return (
      <SingleConnectionLine
        key={`conn-wrapper-${conn.id}`}
        conn={conn}
        fromAgent={fromAgent}
        toAgent={toAgent}
        flowDirection={flowDirection}
        isRunning={isRunning}
        activeNodeId={activeNodeId}
        agents={agents}
      />
    );
  });
};

export default memo(ConnectionRenderer);
