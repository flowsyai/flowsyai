import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  Camera,
  X,
  RotateCcw,
  Zap,
  Brain,
  Database,
  Code,
  Image,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ARNode {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  color: string;
  icon: React.ReactNode;
}

interface ARConnection {
  id: string;
  sourceId: string;
  targetId: string;
  animated: boolean;
}

interface TouchPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const ARWorkflowInterface: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [nodes, setNodes] = useState<ARNode[]>([]);
  const [connections, setConnections] = useState<ARConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [gestureMode, setGestureMode] = useState<'select' | 'move' | 'rotate' | 'scale'>('select');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>(
    'pending'
  );

  // AR Node Templates
  const nodeTemplates = [
    { type: 'gpt', name: 'GPT-4', icon: <Brain className="w-6 h-6" />, color: '#10B981' },
    {
      type: 'claude',
      name: 'Claude',
      icon: <MessageSquare className="w-6 h-6" />,
      color: '#8B5CF6',
    },
    { type: 'dalle', name: 'DALL-E', icon: <Image className="w-6 h-6" />, color: '#F59E0B' },
    { type: 'code', name: 'Code Gen', icon: <Code className="w-6 h-6" />, color: '#3B82F6' },
    { type: 'data', name: 'Data Proc', icon: <Database className="w-6 h-6" />, color: '#EF4444' },
    { type: 'trigger', name: 'Trigger', icon: <Zap className="w-6 h-6" />, color: '#F97316' },
  ];

  // Initialize AR Camera
  const initializeAR = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsARActive(true);
        setCameraPermission('granted');
      }
    } catch (error) {
      console.error('AR Camera initialization failed:', error);
      setCameraPermission('denied');
    }
  }, []);

  // Stop AR
  const stopAR = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
  }, []);

  // Handle Touch Gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touches = Array.from(e.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    }));
    setTouchPoints(touches);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touches = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      }));

      // Handle single finger drag (move node)
      if (touches.length === 1 && selectedNode && gestureMode === 'move') {
        const touch = touches[0];
        setNodes(prev =>
          prev.map(node =>
            node.id === selectedNode
              ? { ...node, position: { ...node.position, x: touch.x, y: touch.y } }
              : node
          )
        );
      }

      // Handle two finger gestures (scale/rotate)
      if (touches.length === 2 && selectedNode) {
        const [touch1, touch2] = touches;
        const distance = Math.sqrt(
          Math.pow(touch2.x - touch1.x, 2) + Math.pow(touch2.y - touch1.y, 2)
        );

        if (gestureMode === 'scale') {
          const scale = Math.max(0.5, Math.min(2, distance / 200));
          setNodes(prev =>
            prev.map(node => (node.id === selectedNode ? { ...node, scale } : node))
          );
        }

        if (gestureMode === 'rotate') {
          const angle = Math.atan2(touch2.y - touch1.y, touch2.x - touch1.x);
          setNodes(prev =>
            prev.map(node =>
              node.id === selectedNode
                ? { ...node, rotation: { ...node.rotation, z: angle } }
                : node
            )
          );
        }
      }

      setTouchPoints(touches);
    },
    [selectedNode, gestureMode]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setTouchPoints([]);
  }, []);

  // Add Node to AR Space
  const addNodeToAR = useCallback((template: (typeof nodeTemplates)[0]) => {
    const newNode: ARNode = {
      id: `ar-node-${Date.now()}`,
      type: template.type,
      name: template.name,
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
        z: 0,
      },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      color: template.color,
      icon: template.icon,
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  // Connect Nodes
  const connectNodes = useCallback((sourceId: string, targetId: string) => {
    const newConnection: ARConnection = {
      id: `ar-conn-${Date.now()}`,
      sourceId,
      targetId,
      animated: true,
    };
    setConnections(prev => [...prev, newConnection]);
  }, []);

  // Render AR Overlay
  const renderAROverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* AR Nodes */}
      {nodes.map(node => (
        <MotionDiv
          key={node.id}
          className="absolute pointer-events-auto"
          style={{
            left: node.position.x,
            top: node.position.y,
            transform: `scale(${node.scale}) rotateZ(${node.rotation.z}rad)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: node.scale }}
          whileTap={{ scale: node.scale * 1.1 }}
          onTap={() => setSelectedNode(node.id)}
        >
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-2xl border-2"
            style={{
              backgroundColor: node.color,
              borderColor: selectedNode === node.id ? '#FFD700' : 'transparent',
              boxShadow:
                selectedNode === node.id
                  ? `0 0 20px ${node.color}80`
                  : `0 4px 20px ${node.color}40`,
            }}
          >
            {node.icon}
          </div>
          <div className="text-xs text-white text-center mt-1 font-medium bg-black/50 rounded px-2 py-1">
            {node.name}
          </div>
        </MotionDiv>
      ))}

      {/* AR Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(connection => {
          const sourceNode = nodes.find(n => n.id === connection.sourceId);
          const targetNode = nodes.find(n => n.id === connection.targetId);
          if (!sourceNode || !targetNode) return null;

          return (
            <MotionLine
              key={connection.id}
              x1={sourceNode.position.x + 32}
              y1={sourceNode.position.y + 32}
              x2={targetNode.position.x + 32}
              y2={targetNode.position.y + 32}
              stroke="#FFD700"
              strokeWidth="3"
              strokeDasharray={connection.animated ? '10,5' : 'none'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          );
        })}
      </svg>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* AR Camera View */}
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

      {/* AR Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* AR Content Overlay */}
      {isARActive && renderAROverlay()}

      {/* AR Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        <Button
          variant="outline"
          size="sm"
          onClick={stopAR}
          className="bg-black/50 border-white/20 text-white"
        >
          <X className="w-4 h-4 mr-2" />
          Exit AR
        </Button>

        <div className="flex gap-2">
          {['select', 'move', 'rotate', 'scale'].map(mode => (
            <Button
              key={mode}
              variant={gestureMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGestureMode(mode as 'select' | 'move' | 'rotate' | 'scale')}
              className="bg-black/50 border-white/20 text-white"
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Node Palette */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {nodeTemplates.map(template => (
            <Button
              key={template.type}
              onClick={() => addNodeToAR(template)}
              className="flex-shrink-0 bg-black/50 border-white/20 text-white"
              size="sm"
            >
              {template.icon}
              <span className="ml-2">{template.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* AR Initialization */}
      {!isARActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <Camera className="w-16 h-16 text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">AR Workflow Builder</h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Use your camera to visualize and build AI workflows in 3D space with gesture controls.
            </p>
            <Button
              onClick={initializeAR}
              className="bg-gradient-to-r from-primary to-gold text-white"
              size="lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Start AR Experience
            </Button>
            {cameraPermission === 'denied' && (
              <p className="text-red-400 mt-4">Camera permission required for AR functionality</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ARWorkflowInterface;
