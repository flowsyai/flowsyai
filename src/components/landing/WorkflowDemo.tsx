import React, { useState, useEffect, useRef } from 'react';
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

import { Button } from '@/components/ui/button';
import {
  Bot,
  Sparkles,
  Zap,
  BrainCircuit,
  ChevronRight,
  FileText,
  BarChart,
  Code,
  Database,
  Image,
  MessageSquare,
  Play,
  Pause,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  PlusCircle,
} from 'lucide-react';

// Tipuri pentru noduri și conexiuni
interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
  icon: React.ReactNode;
  color: string;
}

interface Connection {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  data?: Record<string, unknown>;
}

interface DataPacket {
  id: string;
  connectionId: string;
  position: { x: number; y: number; progress: number };
  data: Record<string, unknown>;
}

const WorkflowDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [output, setOutput] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showNodeConfig, setShowNodeConfig] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Definirea workflow-urilor predefinite
  const predefinedWorkflows = useMemo(
    () => [
      {
        name: 'Text Analysis',
        description: 'Extract key information from text and generate an analysis report',
        nodes: [
          {
            id: 'input',
            type: 'input',
            position: { x: 100, y: 200 },
            data: {
              label: 'Text Input',
              content:
                'Analyze market trends for AI integration platforms and generate a detailed report.',
            },
            icon: <MessageSquare size={20} />,
            color: 'bg-blue-500',
          },
          {
            id: 'nlp',
            type: 'process',
            position: { x: 300, y: 100 },
            data: { label: 'NLP Processor', content: 'Text processing and entity extraction' },
            icon: <BrainCircuit size={20} />,
            color: 'bg-purple-500',
          },
          {
            id: 'analysis',
            type: 'process',
            position: { x: 300, y: 300 },
            data: {
              label: 'Data Analysis',
              content: 'Analiză statistică și identificare tendințe',
            },
            icon: <BarChart size={20} />,
            color: 'bg-amber-500',
          },
          {
            id: 'generator',
            type: 'process',
            position: { x: 500, y: 200 },
            data: { label: 'Report Generator', content: 'Generare raport structurat' },
            icon: <FileText size={20} />,
            color: 'bg-emerald-500',
          },
          {
            id: 'output',
            type: 'output',
            position: { x: 700, y: 200 },
            data: { label: 'Final Output', content: '' },
            icon: <Sparkles size={20} />,
            color: 'bg-rose-500',
          },
        ],
        connections: [
          { id: 'c1', source: 'input', target: 'nlp', animated: false },
          { id: 'c2', source: 'input', target: 'analysis', animated: false },
          { id: 'c3', source: 'nlp', target: 'generator', animated: false },
          { id: 'c4', source: 'analysis', target: 'generator', animated: false },
          { id: 'c5', source: 'generator', target: 'output', animated: false },
        ],
        output: `# Raport de Analiză: Platforme de Integrare AI

## Tendințe Identificate
- Creștere de 34% în adoptarea platformelor de orchestrare AI
- Focus pe interfețe vizuale de tip drag-and-drop
- Integrarea multiplelor modele specializate într-un singur workflow

## Recomandări
1. Dezvoltarea unei interfețe intuitive pentru non-programatori
2. Implementarea unui sistem de template-uri pentru cazuri de utilizare comune
3. Oferirea de instrumente avansate de monitorizare și optimizare

## Concluzie
Platformele de orchestrare AI cu interfețe vizuale reprezintă viitorul automatizării proceselor complexe care implică multiple modele AI.`,
      },
      {
        name: 'Generare Conținut',
        description: 'Creează conținut multimedia bazat pe un prompt',
        nodes: [
          {
            id: 'input',
            type: 'input',
            position: { x: 100, y: 200 },
            data: {
              label: 'Prompt Input',
              content:
                'Creează o imagine și o descriere pentru un robot futurist care orchestrează multiple sisteme AI.',
            },
            icon: <MessageSquare size={20} />,
            color: 'bg-blue-500',
          },
          {
            id: 'text',
            type: 'process',
            position: { x: 300, y: 100 },
            data: { label: 'Text Generator', content: 'Generare descriere detaliată' },
            icon: <FileText size={20} />,
            color: 'bg-emerald-500',
          },
          {
            id: 'image',
            type: 'process',
            position: { x: 300, y: 300 },
            data: { label: 'Image Generator', content: 'Generare imagine bazată pe prompt' },
            icon: <Image size={20} />,
            color: 'bg-amber-500',
          },
          {
            id: 'formatter',
            type: 'process',
            position: { x: 500, y: 200 },
            data: { label: 'Content Formatter', content: 'Formatare și combinare conținut' },
            icon: <Code size={20} />,
            color: 'bg-purple-500',
          },
          {
            id: 'output',
            type: 'output',
            position: { x: 700, y: 200 },
            data: { label: 'Final Output', content: '' },
            icon: <Sparkles size={20} />,
            color: 'bg-rose-500',
          },
        ],
        connections: [
          { id: 'c1', source: 'input', target: 'text', animated: false },
          { id: 'c2', source: 'input', target: 'image', animated: false },
          { id: 'c3', source: 'text', target: 'formatter', animated: false },
          { id: 'c4', source: 'image', target: 'formatter', animated: false },
          { id: 'c5', source: 'formatter', target: 'output', animated: false },
        ],
        output: `# Orchestratorul AI

[Imagine: Robot futurist cu multiple conexiuni la sisteme AI]

## Descriere
Orchestratorul este un sistem avansat de management AI care coordonează multiple modele specializate într-un flux de lucru unificat. Cu o interfață vizuală intuitivă, permite utilizatorilor să creeze automatizări complexe prin simpla conectare a nodurilor reprezentând diferiți agenți AI.

Fiecare agent este optimizat pentru o sarcină specifică, iar Orchestratorul facilitează comunicarea eficientă între aceștia, transformând și direcționând datele pentru a obține rezultate imposibil de atins cu un singur model.

Sistemul include monitorizare în timp real, optimizare automată a resurselor și scalabilitate enterprise.`,
      },
    ],
    []
  );

  // Funcție pentru încărcarea unui workflow predefinit
  const loadWorkflow = useCallback(
    (index: number) => {
      const workflow = predefinedWorkflows[index];
      setNodes(workflow.nodes);
      setConnections(workflow.connections.map(conn => ({ ...conn, animated: false })));
      setDataPackets([]);
      setOutput('');
      setCurrentStep(0);
      setIsPlaying(false);
      setSelectedNode(null);
      setShowNodeConfig(false);
    },
    [predefinedWorkflows]
  );

  // Inițializare workflow
  useEffect(() => {
    loadWorkflow(activeWorkflow);
  }, [activeWorkflow, loadWorkflow]);

  // Funcție pentru adăugarea unui nou nod
  const addNode = () => {
    const newNodeTypes = [
      {
        type: 'text-processor',
        label: 'Text Processor',
        icon: <FileText size={20} />,
        color: 'bg-emerald-500',
      },
      {
        type: 'data-analyzer',
        label: 'Data Analyzer',
        icon: <BarChart size={20} />,
        color: 'bg-amber-500',
      },
      {
        type: 'ai-model',
        label: 'AI Model',
        icon: <BrainCircuit size={20} />,
        color: 'bg-purple-500',
      },
      {
        type: 'image-generator',
        label: 'Image Generator',
        icon: <Image size={20} />,
        color: 'bg-blue-500',
      },
    ];

    const randomType = newNodeTypes[Math.floor(Math.random() * newNodeTypes.length)];
    const newId = `node-${nodes.length + 1}`;

    const newNode: Node = {
      id: newId,
      type: randomType.type,
      position: { x: 400 + Math.random() * 200 - 100, y: 200 + Math.random() * 200 - 100 },
      data: { label: randomType.label, content: `${randomType.label} Content` },
      icon: randomType.icon,
      color: randomType.color,
    };

    setNodes([...nodes, newNode]);
  };

  // Funcție pentru selectarea unui nod
  const selectNode = (nodeId: string) => {
    setSelectedNode(nodeId);
    setShowNodeConfig(true);
  };

  // Funcție pentru rularea workflow-ului
  const runWorkflow = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
    setDataPackets([]);
    setOutput('');

    // Resetăm animațiile conexiunilor
    setConnections(connections.map(conn => ({ ...conn, animated: false })));

    // Pornim animația
    startAnimation();
  }, [connections, startAnimation]);

  // Funcție pentru animarea fluxului de date
  const startAnimation = useCallback(() => {
    let step = 0;
    const maxSteps = 5; // Numărul total de pași în animație

    const animate = () => {
      if (step >= maxSteps) {
        setIsPlaying(false);
        setOutput(predefinedWorkflows[activeWorkflow].output);
        return;
      }

      // Actualizăm pasul curent
      setCurrentStep(step);

      // Animăm conexiunile în funcție de pasul curent
      if (step === 0) {
        // Activăm prima conexiune
        setConnections(prev =>
          prev.map((conn, i) => (i === 0 ? { ...conn, animated: true } : conn))
        );

        // Adăugăm primul pachet de date
        const firstConn = connections[0];
        setDataPackets([
          {
            id: `packet-${Date.now()}`,
            connectionId: firstConn.id,
            position: { x: 0, y: 0, progress: 0 },
            data: { content: 'Data flowing...' },
          },
        ]);
      } else if (step < connections.length) {
        // Activăm următoarea conexiune
        setConnections(prev =>
          prev.map((conn, i) => (i === step ? { ...conn, animated: true } : conn))
        );

        // Adăugăm un nou pachet de date
        const nextConn = connections[step];
        setDataPackets(prev => [
          ...prev,
          {
            id: `packet-${Date.now()}`,
            connectionId: nextConn.id,
            position: { x: 0, y: 0, progress: 0 },
            data: { content: 'Data flowing...' },
          },
        ]);
      }

      step++;
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(animate, 1000); // Delay între pași
      });
    };

    animate();
  }, [connections, activeWorkflow, predefinedWorkflows]);

  // Curățăm animația la unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Auto-play
  useEffect(() => {
    if (autoPlay && !isPlaying) {
      const timer = setTimeout(() => {
        runWorkflow();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoPlay, isPlaying, runWorkflow]);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5 opacity-30 animate-pulse-scale"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Creează fluxuri de lucru AI vizuale
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conectează și orchestrează multiple modele și agenți AI într-o interfață intuitivă de
            tip drag-and-drop.
          </p>
        </div>

        {/* Selector workflow */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-card/50 backdrop-blur-sm rounded-full p-1 border border-border">
            {predefinedWorkflows.map((workflow, index) => (
              <button
                key={index}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeWorkflow === index
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveWorkflow(index)}
              >
                {workflow.name}
              </button>
            ))}
          </div>
        </div>

        {/* Descriere workflow */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">{predefinedWorkflows[activeWorkflow].description}</p>
        </div>

        {/* Demo workflow */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden shadow-xl mb-8">
          {/* Header */}
          <div className="bg-muted p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="text-sm font-medium">FlowsyAI Studio - Workflow Editor</div>
            <div className="w-16"></div>
          </div>

          {/* Toolbar */}
          <div className="bg-muted/50 p-2 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2 flex items-center gap-1"
                onClick={addNode}
              >
                <PlusCircle size={14} />
                <span>Add Node</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={isPlaying ? 'outline' : 'default'}
                className="h-8 w-8 p-0"
                onClick={runWorkflow}
                disabled={isPlaying}
              >
                <Play size={14} />
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => loadWorkflow(activeWorkflow)}
              >
                <RefreshCw size={14} />
              </Button>

              <Button
                size="sm"
                variant={autoPlay ? 'default' : 'outline'}
                className={`h-8 px-3 ${autoPlay ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setAutoPlay(!autoPlay)}
              >
                {autoPlay ? 'Auto: On' : 'Auto: Off'}
              </Button>
            </div>
          </div>

          {/* Workflow canvas */}
          <div
            ref={containerRef}
            className="relative bg-background/50 h-[400px] overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Nodes */}
            {nodes.map(node => (
              <div
                key={node.id}
                className={`absolute rounded-lg border ${node.color} text-white shadow-md cursor-pointer transition-all duration-200 ${selectedNode === node.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  zIndex: selectedNode === node.id ? 10 : 1,
                }}
                onClick={() => selectNode(node.id)}
              >
                <div className="p-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {node.icon}
                    <span className="text-xs font-medium">{node.data.label}</span>
                  </div>
                  {node.type === 'process' && (
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep > 0 ? 'bg-green-400' : 'bg-gray-400'}`}
                    ></div>
                  )}
                </div>
              </div>
            ))}

            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
              </defs>
              {connections.map(conn => {
                const sourceNode = nodes.find(n => n.id === conn.source);
                const targetNode = nodes.find(n => n.id === conn.target);

                if (!sourceNode || !targetNode) return null;

                const sourceX = sourceNode.position.x;
                const sourceY = sourceNode.position.y;
                const targetX = targetNode.position.x;
                const targetY = targetNode.position.y;

                return (
                  <g key={conn.id}>
                    <path
                      d={`M ${sourceX} ${sourceY} C ${(sourceX + targetX) / 2} ${sourceY}, ${(sourceX + targetX) / 2} ${targetY}, ${targetX} ${targetY}`}
                      stroke={
                        conn.animated ? 'rgba(59, 130, 246, 0.8)' : 'rgba(156, 163, 175, 0.5)'
                      }
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      strokeDasharray={conn.animated ? '5,5' : '0'}
                      className={conn.animated ? 'animate-dash' : ''}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Output panel */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden shadow-xl">
          <div className="bg-muted p-2 border-b border-border flex items-center">
            <div className="text-sm font-medium">Output</div>
          </div>
          <div className="p-4 h-[200px] overflow-auto bg-background/50">
            {output ? (
              <div className="prose prose-sm prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, '<br>') }} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {isPlaying ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin">
                      <RefreshCw size={16} />
                    </div>
                    <span>Procesare workflow...</span>
                  </div>
                ) : (
                  <span>Rulează workflow-ul pentru a vedea rezultatul</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Node configuration panel */}
        <SafeAnimatePresence>
          {showNodeConfig && selectedNode && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden shadow-xl"
            >
              <div className="bg-muted p-2 border-b border-border flex justify-between items-center">
                <div className="text-sm font-medium">Node Configuration</div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowNodeConfig(false)}
                >
                  &times;
                </Button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Node Type</label>
                    <div className="text-sm font-medium">
                      {nodes.find(n => n.id === selectedNode)?.type}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Label</label>
                    <div className="text-sm font-medium">
                      {nodes.find(n => n.id === selectedNode)?.data.label}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-muted-foreground">Content</label>
                    <div className="text-sm mt-1 p-2 bg-muted/50 rounded-md">
                      {nodes.find(n => n.id === selectedNode)?.data.content ||
                        'No content available'}
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          )}
        </SafeAnimatePresence>
      </div>
    </section>
  );
};

export default WorkflowDemo;
