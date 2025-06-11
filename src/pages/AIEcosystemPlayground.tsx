import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

// ReactFlow imports removed as not used in this component
import {
  Brain,
  Sparkles,
  Network,
  Workflow,
  Braces,
  Layers,
  Maximize,
  Minimize,
  RotateCcw,
  Download,
  Share2,
  Save,
  Play,
  Pause,
  Microscope,
  Atom,
  Lightbulb,
  Fingerprint,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { GlassCard } from '@/components/ui/glass-card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Define the types of AI components that can be placed in the playground
interface AIComponent {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  color: string;
  energy: number;
  connections: string[];
  isActive: boolean;
  data: Record<string, number>;
}

// Define the types of interactions that can occur between components
interface Interaction {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'data' | 'energy' | 'control';
  strength: number;
  active: boolean;
  pulseColor: string;
}

// Define the ecosystem environment settings
interface EcosystemEnvironment {
  gravity: number;
  friction: number;
  energyDecay: number;
  interactionStrength: number;
  autonomy: number;
  complexity: number;
}

const AIEcosystemPlayground: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<AIComponent | null>(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showEnvironmentControls, setShowEnvironmentControls] = useState(false);
  const [ecosystemName] = useState('My AI Ecosystem');
  const [ecosystemDescription] = useState('An interactive AI component playground');

  // State for components and interactions
  const [components, setComponents] = useState<AIComponent[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  // Environment settings
  const [environment, setEnvironment] = useState<EcosystemEnvironment>({
    gravity: 50,
    friction: 30,
    energyDecay: 20,
    interactionStrength: 70,
    autonomy: 60,
    complexity: 40,
  });

  // Animation state
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [visualEffectsLevel, setVisualEffectsLevel] = useState(80);

  // Component library - predefined components that can be added to the playground
  const componentLibrary = useMemo(
    () => [
      {
        type: 'neural-network',
        name: 'Neural Network',
        description: 'A deep learning model that processes and transforms data',
        icon: <Brain className="h-6 w-6" />,
        color: 'from-purple-500 to-indigo-600',
      },
      {
        type: 'language-model',
        name: 'Language Model',
        description: 'Processes and generates human language',
        icon: <Braces className="h-6 w-6" />,
        color: 'from-blue-500 to-cyan-600',
      },
      {
        type: 'vision-system',
        name: 'Vision System',
        description: 'Analyzes and interprets visual information',
        icon: <Microscope className="h-6 w-6" />,
        color: 'from-emerald-500 to-green-600',
      },
      {
        type: 'knowledge-base',
        name: 'Knowledge Base',
        description: 'Stores and retrieves structured information',
        icon: <Layers className="h-6 w-6" />,
        color: 'from-amber-500 to-orange-600',
      },
      {
        type: 'decision-engine',
        name: 'Decision Engine',
        description: 'Makes autonomous decisions based on inputs',
        icon: <Workflow className="h-6 w-6" />,
        color: 'from-red-500 to-rose-600',
      },
      {
        type: 'quantum-processor',
        name: 'Quantum Processor',
        description: 'Performs quantum computations for complex problems',
        icon: <Atom className="h-6 w-6" />,
        color: 'from-violet-500 to-purple-600',
      },
      {
        type: 'creativity-engine',
        name: 'Creativity Engine',
        description: 'Generates novel ideas and content',
        icon: <Lightbulb className="h-6 w-6" />,
        color: 'from-yellow-500 to-amber-600',
      },
      {
        type: 'pattern-recognizer',
        name: 'Pattern Recognizer',
        description: 'Identifies patterns in complex data',
        icon: <Fingerprint className="h-6 w-6" />,
        color: 'from-teal-500 to-emerald-600',
      },
    ],
    []
  );

  // Function to create a new component
  const createComponent = useCallback(
    (type: string, position: { x: number; y: number }): AIComponent => {
      const componentType = componentLibrary.find(c => c.type === type);
      if (!componentType) throw new Error(`Component type ${type} not found`);

      return {
        id: `component-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        type,
        name: componentType.name,
        description: componentType.description,
        icon: componentType.icon,
        position,
        rotation: Math.random() * 10 - 5, // Slight random rotation
        scale: 1,
        color: componentType.color,
        energy: 100,
        connections: [],
        isActive: true,
        data: {
          complexity: Math.floor(Math.random() * 100),
          efficiency: Math.floor(Math.random() * 100),
          adaptability: Math.floor(Math.random() * 100),
        },
      };
    },
    [componentLibrary]
  );

  // Effect to initialize the playground with some components if empty
  useEffect(() => {
    if (components.length === 0) {
      // Add some initial components to make the playground interesting
      const initialComponents: AIComponent[] = [
        createComponent('neural-network', { x: 300, y: 200 }),
        createComponent('language-model', { x: 500, y: 300 }),
        createComponent('knowledge-base', { x: 400, y: 400 }),
      ];

      setComponents(initialComponents);

      // Create some initial interactions between components
      const initialInteractions: Interaction[] = [
        {
          id: `interaction-${Date.now()}-1`,
          sourceId: initialComponents[0]?.id || '',
          targetId: initialComponents[1]?.id || '',
          type: 'data',
          strength: 70,
          active: true,
          pulseColor: 'rgba(147, 51, 234, 0.7)', // Purple
        },
        {
          id: `interaction-${Date.now()}-2`,
          sourceId: initialComponents[1]?.id || '',
          targetId: initialComponents[2]?.id || '',
          type: 'energy',
          strength: 60,
          active: true,
          pulseColor: 'rgba(59, 130, 246, 0.7)', // Blue
        },
      ];

      setInteractions(initialInteractions);
    }
  }, [components.length, createComponent]);

  // Function to add a component to the playground
  const addComponent = (type: string) => {
    if (!playgroundRef.current) return;

    // Calculate a random position within the visible playground
    const bounds = playgroundRef.current.getBoundingClientRect();
    const position = {
      x: Math.random() * (bounds.width - 200) + 100,
      y: Math.random() * (bounds.height - 200) + 100,
    };

    const newComponent = createComponent(type, position);
    setComponents(prev => [...prev, newComponent]);

    toast.success(`Added ${newComponent.name} to the ecosystem`);
  };

  // Function to handle component drag
  const handleDrag = (id: string, newPosition: { x: number; y: number }) => {
    setComponents(prev =>
      prev.map(component =>
        component.id === id ? { ...component, position: newPosition } : component
      )
    );
  };

  // Function to connect two components
  const connectComponents = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    // Check if connection already exists
    const existingConnection = interactions.find(
      i =>
        (i.sourceId === sourceId && i.targetId === targetId) ||
        (i.sourceId === targetId && i.targetId === sourceId)
    );

    if (existingConnection) {
      toast.info('These components are already connected');
      return;
    }

    // Create a new interaction
    const newInteraction: Interaction = {
      id: `interaction-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      sourceId,
      targetId,
      type: Math.random() > 0.5 ? 'data' : 'energy',
      strength: Math.floor(Math.random() * 50) + 50, // 50-100
      active: true,
      pulseColor:
        Math.random() > 0.5
          ? 'rgba(147, 51, 234, 0.7)' // Purple
          : 'rgba(59, 130, 246, 0.7)', // Blue
    };

    setInteractions(prev => [...prev, newInteraction]);

    // Update the connections array in both components
    setComponents(prev =>
      prev.map(component => {
        if (component.id === sourceId) {
          return { ...component, connections: [...component.connections, targetId] };
        }
        if (component.id === targetId) {
          return { ...component, connections: [...component.connections, sourceId] };
        }
        return component;
      })
    );

    toast.success('Components connected successfully');
  };

  // Function to remove a component
  const removeComponent = (id: string) => {
    // Remove the component
    setComponents(prev => prev.filter(component => component.id !== id));

    // Remove all interactions involving this component
    setInteractions(prev =>
      prev.filter(interaction => interaction.sourceId !== id && interaction.targetId !== id)
    );

    // Update connections in other components
    setComponents(prev =>
      prev.map(component => ({
        ...component,
        connections: component.connections.filter(connId => connId !== id),
      }))
    );

    // Clear selection if this was the selected component
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }

    toast.info('Component removed from ecosystem');
  };

  // Function to toggle simulation
  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
    toast(isSimulating ? 'Simulation paused' : 'Simulation started');
  };

  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    if (!playgroundRef.current) return;

    if (!isFullscreen) {
      if (playgroundRef.current.requestFullscreen) {
        playgroundRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    setIsFullscreen(prev => !prev);
  };

  // Function to save the ecosystem
  const saveEcosystem = () => {
    const ecosystem = {
      name: ecosystemName,
      description: ecosystemDescription,
      components,
      interactions,
      environment,
      createdBy: user?.id,
      createdAt: new Date().toISOString(),
    };

    // In a real app, you would save this to your backend
    console.log('Saving ecosystem:', ecosystem);

    toast.success('Ecosystem saved successfully');
  };

  // Function to export the ecosystem
  const exportEcosystem = () => {
    const ecosystem = {
      name: ecosystemName,
      description: ecosystemDescription,
      components,
      interactions,
      environment,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(ecosystem, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${ecosystemName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast.success('Ecosystem exported successfully');
  };

  // Function to share the ecosystem
  const shareEcosystem = () => {
    toast.success('Share link copied to clipboard');
    // In a real app, you would generate a shareable link
  };

  // Function to reset the ecosystem
  const resetEcosystem = () => {
    if (
      confirm(
        'Are you sure you want to reset the ecosystem? All components and interactions will be removed.'
      )
    ) {
      setComponents([]);
      setInteractions([]);
      setSelectedComponent(null);
      toast.info('Ecosystem reset successfully');
    }
  };

  // Calculate connections for rendering
  const renderConnections = () => {
    return interactions.map(interaction => {
      const source = components.find(c => c.id === interaction.sourceId);
      const target = components.find(c => c.id === interaction.targetId);

      if (!source || !target) return null;

      const startX = source.position.x;
      const startY = source.position.y;
      const endX = target.position.x;
      const endY = target.position.y;

      // Calculate control points for a curved line
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const offset = 50 + Math.random() * 50; // Random curve offset

      // Calculate perpendicular offset for the control point
      const dx = endX - startX;
      const dy = endY - startY;
      const norm = Math.sqrt(dx * dx + dy * dy);
      const perpX = -dy / norm;
      const perpY = dx / norm;

      const controlX = midX + perpX * offset;
      const controlY = midY + perpY * offset;

      const pathId = `path-${interaction.id}`;

      return (
        <g key={interaction.id}>
          <defs>
            <linearGradient id={`gradient-${interaction.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={interaction.pulseColor} />
              <stop offset="100%" stopColor={interaction.pulseColor.replace('0.7', '0.3')} />
            </linearGradient>

            {/* Animation path for the pulse effect */}
            <path
              id={pathId}
              d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
              fill="none"
              stroke="none"
            />
          </defs>

          {/* The connection line */}
          <path
            d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
            fill="none"
            stroke={`url(#gradient-${interaction.id})`}
            strokeWidth={interaction.strength / 20 + 1}
            strokeOpacity={0.6}
            strokeDasharray={interaction.type === 'data' ? '0' : '5,5'}
          />

          {/* Animated pulse along the path */}
          {interaction.active && isSimulating && (
            <>
              <circle r="4" fill="white">
                <animateMotion
                  dur={`${3 - (animationSpeed / 100) * 2}s`}
                  repeatCount="indefinite"
                  path={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                />
              </circle>

              <circle r="3" fill={interaction.pulseColor}>
                <animateMotion
                  dur={`${4 - (animationSpeed / 100) * 3}s`}
                  repeatCount="indefinite"
                  path={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                  begin="0.5s"
                />
              </circle>
            </>
          )}
        </g>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="border-b border-border-alt bg-card/50 backdrop-blur-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/account')}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Dashboard
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-foreground">{ecosystemName}</h1>
              <p className="text-sm text-muted-foreground">{ecosystemDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={toggleSimulation}
              className="flex items-center gap-2"
            >
              {isSimulating ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Simulate
                </>
              )}
            </Button>

            <Button variant="outline" onClick={saveEcosystem} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>

            <Button variant="outline" onClick={exportEcosystem} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>

            <Button variant="outline" onClick={shareEcosystem} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button
              variant="outline"
              onClick={toggleFullscreen}
              className="flex items-center gap-2"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              onClick={resetEcosystem}
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Component Library */}
        <div
          className={`border-r border-border-alt bg-card/30 backdrop-blur-lg overflow-y-auto transition-all duration-300 ${
            showComponentLibrary ? 'w-64' : 'w-0'
          }`}
        >
          {showComponentLibrary && (
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-4">AI Component Library</h3>

              <div className="space-y-2">
                {componentLibrary.map(component => (
                  <MotionDiv
                    key={component.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                    onClick={() => addComponent(component.type)}
                  >
                    <div
                      className={`p-3 rounded-lg border border-border-alt bg-background/50 hover:bg-background/80 transition-all duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${component.color} bg-opacity-10`}
                        >
                          {component.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{component.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-foreground">AI Ecosystem</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Drag components onto the canvas and connect them to create an interactive AI
                  ecosystem.
                </p>
                <Button
                  size="sm"
                  onClick={() => setShowEnvironmentControls(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                >
                  Environment Controls
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Playground */}
        <div
          ref={playgroundRef}
          className="flex-1 relative bg-gradient-to-br from-background via-background/95 to-muted/20 ai-playground-grid"
        >
          {/* Toggle sidebar button */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 z-10 h-8 w-8 p-0"
            onClick={() => setShowComponentLibrary(prev => !prev)}
          >
            {showComponentLibrary ? '<' : '>'}
          </Button>

          {/* SVG layer for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {renderConnections()}
          </svg>

          {/* Components */}
          <div className="absolute inset-0">
            {components.map(component => (
              <MotionDiv
                key={component.id}
                className="absolute cursor-move"
                style={{
                  left: component.position.x,
                  top: component.position.y,
                  transform: `translate(-50%, -50%) rotate(${component.rotation}deg) scale(${component.scale})`,
                  zIndex: selectedComponent?.id === component.id ? 20 : 15,
                }}
                drag={!isSimulating}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const newPosition = {
                    x: component.position.x + info.offset.x,
                    y: component.position.y + info.offset.y,
                  };
                  handleDrag(component.id, newPosition);
                }}
                whileHover={{ scale: component.scale * 1.05 }}
                whileTap={{ scale: component.scale * 0.95 }}
                animate={
                  isSimulating
                    ? {
                        x: [0, Math.random() * 10 - 5, 0],
                        y: [0, Math.random() * 10 - 5, 0],
                        rotate: [
                          component.rotation,
                          component.rotation + (Math.random() * 6 - 3),
                          component.rotation,
                        ],
                        transition: {
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        },
                      }
                    : {}
                }
                onClick={() => setSelectedComponent(component)}
              >
                <GlassCard
                  className={`w-40 bg-gradient-to-r ${component.color} bg-opacity-20 backdrop-blur-lg border border-border-alt shadow-lg ${
                    selectedComponent?.id === component.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {component.icon}
                        <span className="font-medium text-foreground text-sm">
                          {component.name}
                        </span>
                      </div>

                      {/* Energy indicator */}
                      <div
                        className="h-2 w-10 rounded-full bg-background/50 overflow-hidden"
                        title={`Energy: ${component.energy}%`}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 energy-bar"
                          style={{ width: `${component.energy}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        {component.connections.length} connections
                      </Badge>

                      {isSimulating && (
                        <MotionDiv
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }}
                        >
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        </MotionDiv>
                      )}
                    </div>
                  </div>
                </GlassCard>

                {/* Pulse effect for active components */}
                {component.isActive && isSimulating && visualEffectsLevel > 30 && (
                  <MotionDiv
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `radial-gradient(circle, ${component.color.includes('purple') ? 'rgba(147, 51, 234, 0.2)' : 'rgba(59, 130, 246, 0.2)'} 0%, transparent 70%)`,
                      zIndex: -1,
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                )}
              </MotionDiv>
            ))}
          </div>

          {/* Empty state */}
          {components.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md">
                <MotionDiv
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Network className="h-10 w-10 text-purple-500" />
                </MotionDiv>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  AI Ecosystem Playground
                </h2>
                <p className="text-muted-foreground mb-6">
                  Add AI components from the library to create an interactive ecosystem. Connect
                  components to see how they interact and share data.
                </p>
                <Button
                  onClick={() => addComponent('neural-network')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Add First Component
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Component Details */}
        {selectedComponent && (
          <div className="w-80 border-l border-border-alt bg-card/30 backdrop-blur-lg p-4 overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Component Details</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setSelectedComponent(null)}
              >
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Name</h4>
                <input
                  type="text"
                  value={selectedComponent.name}
                  onChange={e => {
                    setComponents(prev =>
                      prev.map(c =>
                        c.id === selectedComponent.id ? { ...c, name: e.target.value } : c
                      )
                    );
                    setSelectedComponent(prev => (prev ? { ...prev, name: e.target.value } : null));
                  }}
                  className="w-full px-3 py-2 rounded-md border border-border-alt bg-background/50"
                  placeholder="Enter component name"
                  title="Component name"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Energy Level</h4>
                <Slider
                  value={[selectedComponent.energy]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={value => {
                    const newEnergy = value[0] ?? 0;
                    setComponents(prev =>
                      prev.map(c =>
                        c.id === selectedComponent.id ? { ...c, energy: newEnergy } : c
                      )
                    );
                    setSelectedComponent(prev => (prev ? { ...prev, energy: newEnergy } : null));
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>{selectedComponent.energy}%</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Scale</h4>
                <Slider
                  value={[selectedComponent.scale * 100]}
                  min={50}
                  max={150}
                  step={5}
                  onValueChange={value => {
                    const newScale = (value[0] ?? 100) / 100;
                    setComponents(prev =>
                      prev.map(c => (c.id === selectedComponent.id ? { ...c, scale: newScale } : c))
                    );
                    setSelectedComponent(prev => (prev ? { ...prev, scale: newScale } : null));
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Small</span>
                  <span>{Math.round(selectedComponent.scale * 100)}%</span>
                  <span>Large</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Rotation</h4>
                <Slider
                  value={[selectedComponent.rotation + 180]}
                  min={0}
                  max={360}
                  step={5}
                  onValueChange={value => {
                    const newRotation = (value[0] ?? 180) - 180;
                    setComponents(prev =>
                      prev.map(c =>
                        c.id === selectedComponent.id ? { ...c, rotation: newRotation } : c
                      )
                    );
                    setSelectedComponent(prev =>
                      prev ? { ...prev, rotation: newRotation } : null
                    );
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>-180°</span>
                  <span>{Math.round(selectedComponent.rotation)}°</span>
                  <span>+180°</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border-alt">
                <h4 className="text-sm font-medium text-foreground mb-2">Connections</h4>
                {selectedComponent.connections.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No connections yet</p>
                ) : (
                  <div className="space-y-2">
                    {selectedComponent.connections.map(connectionId => {
                      const connectedComponent = components.find(c => c.id === connectionId);
                      if (!connectedComponent) return null;

                      return (
                        <div
                          key={connectionId}
                          className="flex items-center justify-between p-2 rounded-md bg-background/50 border border-border-alt"
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-background/50">
                              {connectedComponent.icon}
                            </div>
                            <span className="text-sm">{connectedComponent.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => {
                              // Remove the connection
                              setInteractions(prev =>
                                prev.filter(
                                  i =>
                                    !(
                                      i.sourceId === selectedComponent.id &&
                                      i.targetId === connectionId
                                    ) &&
                                    !(
                                      i.sourceId === connectionId &&
                                      i.targetId === selectedComponent.id
                                    )
                                )
                              );

                              // Update the connections array in both components
                              setComponents(prev =>
                                prev.map(c => {
                                  if (c.id === selectedComponent.id) {
                                    return {
                                      ...c,
                                      connections: c.connections.filter(id => id !== connectionId),
                                    };
                                  }
                                  if (c.id === connectionId) {
                                    return {
                                      ...c,
                                      connections: c.connections.filter(
                                        id => id !== selectedComponent.id
                                      ),
                                    };
                                  }
                                  return c;
                                })
                              );

                              // Update the selected component
                              setSelectedComponent(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      connections: prev.connections.filter(
                                        id => id !== connectionId
                                      ),
                                    }
                                  : null
                              );
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-foreground mb-2">Connect to:</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {components
                      .filter(
                        c =>
                          c.id !== selectedComponent.id &&
                          !selectedComponent.connections.includes(c.id)
                      )
                      .map(component => (
                        <div
                          key={component.id}
                          className="flex items-center justify-between p-2 rounded-md bg-background/50 border border-border-alt cursor-pointer hover:bg-background/80"
                          onClick={() => connectComponents(selectedComponent.id, component.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-background/50">{component.icon}</div>
                            <span className="text-sm">{component.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                          >
                            +
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-alt">
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => removeComponent(selectedComponent.id)}
                >
                  Remove Component
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Environment Controls Modal */}
      <SafeAnimatePresence>
        {showEnvironmentControls && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowEnvironmentControls(false)}
          >
            <MotionDiv
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-border-alt rounded-lg shadow-xl w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">Environment Controls</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowEnvironmentControls(false)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Gravity</h4>
                  <Slider
                    value={[environment.gravity]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setEnvironment(prev => ({ ...prev, gravity: value[0] ?? 50 }));
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>{environment.gravity}%</span>
                    <span>High</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Friction</h4>
                  <Slider
                    value={[environment.friction]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setEnvironment(prev => ({ ...prev, friction: value[0] ?? 30 }));
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>{environment.friction}%</span>
                    <span>High</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Energy Decay</h4>
                  <Slider
                    value={[environment.energyDecay]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setEnvironment(prev => ({ ...prev, energyDecay: value[0] ?? 20 }));
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Slow</span>
                    <span>{environment.energyDecay}%</span>
                    <span>Fast</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Interaction Strength</h4>
                  <Slider
                    value={[environment.interactionStrength]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setEnvironment(prev => ({ ...prev, interactionStrength: value[0] ?? 70 }));
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Weak</span>
                    <span>{environment.interactionStrength}%</span>
                    <span>Strong</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Autonomy</h4>
                  <Slider
                    value={[environment.autonomy]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setEnvironment(prev => ({ ...prev, autonomy: value[0] ?? 60 }));
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Guided</span>
                    <span>{environment.autonomy}%</span>
                    <span>Free</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Complexity</h4>
                  <Slider
                    value={[environment.complexity]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setEnvironment(prev => ({ ...prev, complexity: value[0] ?? 40 }));
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Simple</span>
                    <span>{environment.complexity}%</span>
                    <span>Complex</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border-alt">
                  <h4 className="text-sm font-medium text-foreground mb-1">Animation Speed</h4>
                  <Slider
                    value={[animationSpeed]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setAnimationSpeed(value[0] ?? 50);
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Slow</span>
                    <span>{animationSpeed}%</span>
                    <span>Fast</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Visual Effects</h4>
                  <Slider
                    value={[visualEffectsLevel]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={value => {
                      setVisualEffectsLevel(value[0] ?? 80);
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Minimal</span>
                    <span>{visualEffectsLevel}%</span>
                    <span>Maximum</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEnvironmentControls(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast.success('Environment settings applied');
                    setShowEnvironmentControls(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </SafeAnimatePresence>
    </div>
  );
};

export default AIEcosystemPlayground;
