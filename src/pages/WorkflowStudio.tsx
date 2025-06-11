import { useState, useRef, useEffect } from 'react';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import WorkflowControls from '@/components/workflow/WorkflowControls';
import AgentPalette from '@/components/workflow/AgentPalette';
import Footer from '@/components/Footer';
import type { WorkflowNode, Edge, Connection, WorkflowNodeData } from '../types/workflow';
import type { TypedAIAgent } from '../data/aiAgents';
import { allAiAgents } from '../data/aiAgents';
import { NodeConfigModal } from '@/components/workflow/NodeConfigModal';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionMain,
} from '@/lib/motion-wrapper';
import { useScroll, useTransform } from 'framer-motion';

import { Sparkles, Workflow, Zap, Settings, Play, Save } from 'lucide-react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-workflow',
        options: {
          background: { color: '#050A14' },
          fpsLimit: 60,
          particles: {
            number: {
              value: 25,
              density: { enable: true, width: 800, height: 800 },
            },
            color: {
              value: ['#0078FF', '#FFCC33', '#D6DAE3'],
            },
            shape: {
              type: 'circle',
              stroke: { width: 0, color: '#000000' },
            },
            opacity: {
              value: 0.15,
              random: true,
              anim: {
                enable: true,
                speed: 0.2,
                opacity_min: 0.03,
                sync: false,
              },
            },
            size: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                size_min: 0.1,
                sync: false,
              },
            },
            links: {
              enable: true,
              color: '#0078FF',
              opacity: 0.05,
              distance: 100,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.2,
              direction: 'none',
              random: false,
              straight: false,
              outModes: { default: 'bounce' },
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
              resize: { enable: true },
            },
            modes: {
              repulse: { distance: 60, duration: 0.4 },
              push: { quantity: 1 },
            },
          },
          detectRetina: true,
        },
      });
    };

    initParticles();

    return () => {
      if (particlesInstance) {
        particlesInstance.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}

const WorkflowStudio = () => {
  const initialNodes: WorkflowNode[] = [
    {
      id: '1',
      type: 'custom',
      data: { label: 'Input Node', name: 'Input Node' },
      position: { x: 100, y: 100 },
      status: 'idle',
    },
    {
      id: '2',
      type: 'custom',
      data: { label: 'Processing Node', name: 'Processing Node' },
      position: { x: 300, y: 150 },
      status: 'idle',
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node', name: 'Output Node' },
      position: { x: 500, y: 100 },
      status: 'idle',
    },
  ];
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(initialNodes);
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];
  const [edges, setEdges] = useState<Edge[]>(initialEdges); // Added edges state
  const [isRunning, setIsRunning] = useState(false);
  const [flowDirection, setFlowDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const nextNodeId = useRef(initialNodes.length + 1); // For generating unique IDs

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedNodeForConfig, setSelectedNodeForConfig] = useState<WorkflowNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // ... (other imports are already at the top)

  // ... (WorkflowStudio component)

  const onAddNodeToCanvas = (agent: TypedAIAgent) => {
    // Use TypedAIAgent
    const newNodeId = `agentnode-${nextNodeId.current++}`;
    const newNode: WorkflowNode = {
      id: newNodeId,
      type: agent.type || agent.category || 'custom', // Use agent.type first
      data: {
        label: agent.name,
        name: agent.name,
        description: agent.description, // Add description
        config: agent.defaultConfig || {}, // Add defaultConfig
        inputSchema: agent.inputSchema || {}, // Add inputSchema
        outputSchema: agent.outputSchema || {}, // Add outputSchema
        ...(agent.type === 'dataTransformation' && {
          transformationLogic: '/* Define transformation logic here */',
        }),
        ...(agent.type === 'textInput' && { textValue: '' }), // Initialize textValue for textInput
      },
      position: {
        x: 100 + (workflowNodes.length % 5) * 50, // Basic staggering
        y: 100 + Math.floor(workflowNodes.length / 5) * 50,
      },
      status: 'idle',
    };
    setWorkflowNodes(prevNodes => [...prevNodes, newNode]);
    toast.info(`Added "${agent.name}" to the workflow.`);
  };

  const handleAgentDrop = (agentId: string, position: { x: number; y: number }) => {
    const agent = allAiAgents.find(a => a.id === agentId);
    if (agent) {
      const newNodeId = `agentnode-${nextNodeId.current++}`;
      const newNode: WorkflowNode = {
        id: newNodeId,
        type: agent.type || agent.category || 'custom',
        data: {
          label: agent.name,
          name: agent.name,
          description: agent.description,
          config: agent.defaultConfig || {},
          inputSchema: agent.inputSchema || {},
          outputSchema: agent.outputSchema || {},
          ...(agent.type === 'dataTransformation' && {
            transformationLogic: '/* Define transformation logic here */',
          }),
          ...(agent.type === 'textInput' && { textValue: '' }),
        },
        position: position, // Use the provided drop position
        status: 'idle',
      };
      setWorkflowNodes(prevNodes => [...prevNodes, newNode]);
      toast.info(`Added "${agent.name}" to the workflow at specified position.`);
    } else {
      toast.error(`Agent with ID "${agentId}" not found.`);
    }
  };

  const onUpdateNode = (nodeId: string, updates: Partial<WorkflowNode>) => {
    setWorkflowNodes(prevNodes =>
      prevNodes.map(node => (node.id === nodeId ? { ...node, ...updates } : node))
    );
  };

  const removeFromWorkflow = (id: string) => {
    setWorkflowNodes(workflowNodes.filter(node => node.id !== id));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== id && edge.target !== id)); // Also remove connected edges
  };
  const handleDeleteNode = (nodeId: string) => {
    const nodeToRemove = workflowNodes.find(n => n.id === nodeId);
    setWorkflowNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setEdges(prevEdges =>
      prevEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
    );
    setSelectedNodeId(null); // Deselect after deletion
    if (nodeToRemove) {
      toast.info(`Node "${nodeToRemove.data.label}" and its connections removed.`);
    } else {
      toast.info(`Node and its connections removed.`);
    }
  };

  const handleConnect = (connection: Connection) => {
    // The Connection type from @/types/workflow uses 'from' and 'to'
    if (!connection.from || !connection.to) {
      toast.error('Connection failed: source or target missing.');
      return;
    }

    // Check for duplicate edges
    const existingEdge = edges.find(
      edge =>
        (edge.source === connection.from && edge.target === connection.to) ||
        (edge.source === connection.to && edge.target === connection.from) // Check reverse as well if not directional
    );

    if (existingEdge) {
      toast.warning('Connection already exists.');
      return;
    }

    // Prevent self-loops
    if (connection.from === connection.to) {
      toast.warning('Cannot connect a node to itself.');
      return;
    }

    const newEdge: Edge = {
      id: `e${connection.from}-${connection.to}`,
      source: connection.from, // Use connection.from for source
      target: connection.to, // Use connection.to for target
      animated: true, // As per user's example
    };
    setEdges(prevEdges => [...prevEdges, newEdge]);
    toast.success(
      `Connected ${workflowNodes.find(n => n.id === connection.from)?.data.label || 'node'} to ${workflowNodes.find(n => n.id === connection.to)?.data.label || 'node'}.`
    );
  };

  const onToggleDirection = () => {
    setFlowDirection(prev => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
    toast.info(
      `Flow direction changed to ${flowDirection === 'horizontal' ? 'vertical' : 'horizontal'}`
    );
  };

  // This is the placeholder for the original onSave prop, will be left for now
  const onSaveNodeConfigPlaceholder = () => {
    toast.info('Save (node/element) placeholder triggered.');
  };

  const handleSaveWorkflow = () => {
    const workflowToSave = {
      nodes: workflowNodes,
      edges: edges,
    };
    try {
      localStorage.setItem('aiFlow_savedWorkflow', JSON.stringify(workflowToSave));
      toast.success('Workflow saved successfully!');
    } catch (error) {
      console.error('Failed to save workflow:', error);
      toast.error('Failed to save workflow.');
    }
  };

  const loadWorkflowFromStorage = (showNotFoundToast: boolean = false) => {
    try {
      const savedWorkflowJSON = localStorage.getItem('aiFlow_savedWorkflow');
      if (savedWorkflowJSON) {
        const parsedWorkflow = JSON.parse(savedWorkflowJSON);

        if (
          parsedWorkflow &&
          Array.isArray(parsedWorkflow.nodes) &&
          Array.isArray(parsedWorkflow.edges)
        ) {
          // Reset node statuses to idle
          const nodesWithIdleStatus = parsedWorkflow.nodes.map((node: WorkflowNode) => ({
            ...node,
            status: 'idle',
            simulatedInput: undefined,
            simulatedOutput: undefined,
            actualInput: undefined,
            actualOutput: undefined,
            errorMessage: undefined,
          }));

          setWorkflowNodes(nodesWithIdleStatus);
          setEdges(parsedWorkflow.edges);
          setIsRunning(false);
          setSelectedNodeId(null);
          // Recalculate nextNodeId based on loaded nodes
          let maxId = 0;
          nodesWithIdleStatus.forEach((node: WorkflowNode) => {
            const idNum = parseInt(node.id.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(idNum) && idNum > maxId) {
              maxId = idNum;
            }
          });
          nextNodeId.current = maxId + 1;

          toast.success('Workflow loaded successfully!');
        } else {
          toast.error('Error loading workflow: Invalid data format.');
        }
      } else {
        if (showNotFoundToast) {
          toast.info('No saved workflow found.');
        }
      }
    } catch (error) {
      console.error('Failed to load workflow:', error);
      toast.error('Error loading workflow.');
    }
  };

  const handleLoadWorkflowButtonClick = () => {
    loadWorkflowFromStorage(true);
  };

  // Load workflow on component mount
  useEffect(() => {
    loadWorkflowFromStorage(false); // Don't show "not found" on initial mount
  }, []); // Empty dependency array ensures this runs only once on mount

  const onRunIndividualNode = () => {
    toast.info('Running individual node... (Not yet implemented)'); // Placeholder
  };

  const handleNodeClick = (clickedNode: WorkflowNode) => {
    setSelectedNodeForConfig(clickedNode);
    setIsConfigModalOpen(true);
  };

  const handleSaveNodeConfig = (nodeId: string, data: Partial<WorkflowNodeData>) => {
    const nodeToUpdate = workflowNodes.find(n => n.id === nodeId);
    if (nodeToUpdate) {
      onUpdateNode(nodeId, {
        data: {
          ...nodeToUpdate.data, // Preserve existing data
          ...data, // Apply new data
        },
      });
      toast.success(`Node "${data.label || nodeToUpdate.data.label}" configuration saved.`);
    } else {
      toast.error('Failed to save node configuration: Node not found.');
    }
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    toast.info('Workflow execution started...');

    // Reset all nodes to idle and clear previous run data
    for (const node of workflowNodes) {
      onUpdateNode(node.id, {
        status: 'idle',
        simulatedOutput: undefined,
        simulatedInput: undefined,
        actualInput: undefined,
        actualOutput: undefined,
        errorMessage: undefined,
      });
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Short delay for UI update

    let workflowErrorOccurred = false;
    const executedNodeIds = new Set<string>();
    const nodeQueue: WorkflowNode[] = [];
    const nodeOutputs: Record<string, unknown> = {}; // Store actual outputs

    // Find starting nodes (nodes with no incoming edges)
    const nodeIdsWithIncomingEdges = new Set<string>();
    edges.forEach(edge => nodeIdsWithIncomingEdges.add(edge.target));

    workflowNodes.forEach(node => {
      if (!nodeIdsWithIncomingEdges.has(node.id)) {
        nodeQueue.push(node);
      }
    });

    if (nodeQueue.length === 0 && workflowNodes.length > 0) {
      toast.error(
        'No starting nodes found. Check your workflow connections or ensure there are no cycles preventing start.'
      );
      setIsRunning(false);
      return;
    }

    while (nodeQueue.length > 0) {
      const currentNode = nodeQueue.shift();
      if (!currentNode || executedNodeIds.has(currentNode.id)) {
        continue;
      }

      // Check if all parent nodes have completed
      const parentEdges = edges.filter(edge => edge.target === currentNode.id);
      const parentNodeIds = parentEdges.map(edge => edge.source);
      let allParentsCompleted = true;
      const parentActualOutputs: unknown[] = [];
      let simulatedParentInfo = '';

      for (const parentId of parentNodeIds) {
        const parentNode = workflowNodes.find(n => n.id === parentId);
        if (!parentNode || parentNode.status !== 'completed') {
          allParentsCompleted = false;
          break;
        }
        parentActualOutputs.push(nodeOutputs[parentId]);
        simulatedParentInfo += `Output from "${parentNode.data.name || parentNode.data.label}". `;
      }

      if (!allParentsCompleted && parentNodeIds.length > 0) {
        // If not all parents completed, requeue the node if it's not already there
        if (!nodeQueue.find(n => n.id === currentNode.id)) {
          nodeQueue.push(currentNode);
        }
        await new Promise(resolve => setTimeout(resolve, 50)); // Small delay to allow other nodes to process
        continue;
      }

      const currentActualInput =
        parentActualOutputs.length > 0
          ? parentActualOutputs.length === 1
            ? parentActualOutputs[0]
            : parentActualOutputs
          : undefined;

      onUpdateNode(currentNode.id, {
        status: 'running',
        simulatedInput: simulatedParentInfo.trim() || 'Initial input',
        actualInput: currentActualInput,
      });
      toast.info(`Running node "${currentNode.data.name || currentNode.data.label}"...`);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

      let nodeStatus: WorkflowNode['status'] = 'completed';
      let nodeSimulatedOutput: string | undefined = undefined;
      let nodeActualOutput: unknown = undefined;
      let nodeErrorMessage: string | undefined = undefined;

      // --- Type-specific execution logic ---
      switch (currentNode.type) {
        case 'textInput':
          if (typeof currentNode.data.textValue === 'string') {
            nodeActualOutput = currentNode.data.textValue;
            nodeSimulatedOutput = `Text Input node provided: '${(currentNode.data.textValue || '').substring(0, 20)}${(currentNode.data.textValue || '').length > 20 ? '...' : ''}'`;
            nodeStatus = 'completed';
          } else {
            nodeErrorMessage = 'Text Input node has no textValue defined.';
            nodeStatus = 'error';
          }
          break;

        case 'uppercaseText':
          if (typeof currentActualInput === 'string') {
            const uppercasedInput = currentActualInput.toUpperCase();
            const prefixSuffix = currentNode.data.configValue || '';
            nodeActualOutput = `${prefixSuffix}${uppercasedInput}${prefixSuffix}`;
            nodeSimulatedOutput = `Uppercased text: '${(nodeActualOutput as string).substring(0, 20)}${(nodeActualOutput as string).length > 20 ? '...' : ''}'`;
            nodeStatus = 'completed';
          } else {
            nodeErrorMessage = `Uppercase Text node expected a string input, but received ${typeof currentActualInput}.`;
            nodeActualOutput = `Error: Expected string input. Received: ${currentActualInput}`;
            nodeStatus = 'error';
          }
          break;

        case 'dataTransformation':
          // Placeholder for data transformation logic
          nodeActualOutput = `Data transformed (placeholder for ${currentNode.data.label})`;
          nodeSimulatedOutput = `Node "${currentNode.data.name || currentNode.data.label}" (Data Transformation) processed. Logic: ${currentNode.data.transformationLogic || 'N/A'}`;
          nodeStatus = 'completed';
          // For now, we'll assume success. Error handling can be added later.
          // if (some_condition_for_error) {
          //   nodeErrorMessage = "Error during data transformation.";
          //   nodeStatus = 'error';
          // }
          break;

        case 'sentimentAnalysis':
          // Placeholder for sentiment analysis logic
          nodeActualOutput = `Sentiment analysis (placeholder for ${currentNode.data.label})`;
          nodeSimulatedOutput = `Node "${currentNode.data.name || currentNode.data.label}" (Sentiment Analysis) processed. Config: ${JSON.stringify(currentNode.data.config || {})}`;
          nodeStatus = 'completed';
          // For now, we'll assume success. Error handling can be added later.
          // if (some_condition_for_error) {
          //   nodeErrorMessage = "Error during sentiment analysis.";
          //   nodeStatus = 'error';
          // }
          break;

        default: {
          // Generic or other types - use existing simulation
          let success = Math.random() > 0.2;
          const currentConfigValue = currentNode.data.configValue;
          if (currentConfigValue === 'force_error') {
            success = false;
          }

          if (success) {
            nodeSimulatedOutput = `Node "${currentNode.data.name || currentNode.data.label}" processed successfully`;
            if (currentConfigValue) {
              nodeSimulatedOutput += ` with config: "${currentConfigValue}"`;
            }
            nodeSimulatedOutput += ` at ${new Date().toLocaleTimeString()}`;
            if (simulatedParentInfo.trim()) {
              nodeSimulatedOutput += ` using input.`;
            }
            // For generic nodes, actualOutput can be the simulated one or a placeholder
            nodeActualOutput = `Simulated output for ${currentNode.data.label}`;
            nodeStatus = 'completed';
          } else {
            nodeErrorMessage = `Simulated error for node "${currentNode.data.name || currentNode.data.label}"`;
            if (currentConfigValue) {
              if (currentConfigValue === 'force_error') {
                nodeErrorMessage += ` (forced by config: "${currentConfigValue}")`;
              } else {
                nodeErrorMessage += ` with config: "${currentConfigValue}"`;
              }
            }
            nodeErrorMessage += `.`;
            nodeActualOutput = `Error: ${nodeErrorMessage}`;
            nodeStatus = 'error';
          }
          break;
        }
      }
      // --- End of type-specific execution ---

      nodeOutputs[currentNode.id] = nodeActualOutput; // Store actual output for children

      onUpdateNode(currentNode.id, {
        status: nodeStatus,
        simulatedOutput: nodeSimulatedOutput,
        actualOutput: nodeActualOutput,
        errorMessage: nodeErrorMessage,
      });

      if (nodeStatus === 'completed') {
        toast.success(`Node "${currentNode.data.name || currentNode.data.label}" completed.`);
        executedNodeIds.add(currentNode.id);

        // Add children to the queue
        const childEdges = edges.filter(edge => edge.source === currentNode.id);
        for (const edge of childEdges) {
          const childNode = workflowNodes.find(n => n.id === edge.target);
          if (
            childNode &&
            !executedNodeIds.has(childNode.id) &&
            !nodeQueue.find(n => n.id === childNode.id)
          ) {
            nodeQueue.push(childNode);
          }
        }
      } else if (nodeStatus === 'error') {
        toast.error(`Error in node "${currentNode.data.name || currentNode.data.label}".`);
        workflowErrorOccurred = true;
        // Optionally, decide if errors should halt the entire branch or workflow
      }
    }

    // Final check for any nodes that couldn't run
    workflowNodes.forEach(node => {
      if (
        node.status === 'idle' &&
        !executedNodeIds.has(node.id) &&
        !nodeQueue.find(n => n.id === node.id)
      ) {
        const parentEdges = edges.filter(edge => edge.target === node.id);
        const parentNodeIds = parentEdges.map(edge => edge.source);
        let canRun = parentNodeIds.length === 0;
        if (parentNodeIds.length > 0) {
          canRun = parentNodeIds.every(
            parentId => workflowNodes.find(n => n.id === parentId)?.status === 'completed'
          );
        }
        if (!canRun && !workflowErrorOccurred) {
          onUpdateNode(node.id, {
            status: 'error',
            errorMessage: 'Could not run due to unmet dependencies or cycle.',
          });
        } else if (!canRun && workflowErrorOccurred) {
          onUpdateNode(node.id, { status: 'idle', errorMessage: 'Skipped due to upstream error.' });
        }
      }
    });

    if (workflowErrorOccurred) {
      toast.error('Workflow execution finished with errors.');
    } else if (executedNodeIds.size < workflowNodes.length && workflowNodes.length > 0) {
      const notRunCount = workflowNodes.length - executedNodeIds.size;
      toast.warning(
        `Workflow execution completed, but ${notRunCount} node(s) may not have run due to unmet dependencies or being in an unreached branch.`
      );
    } else {
      toast.success('Workflow execution completed successfully!');
    }
    setIsRunning(false);
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <MotionDiv
            key={i}
            className={`absolute rounded-full backdrop-blur-sm border ${i % 3 === 0 ? 'bg-primary/10 border-primary/20' : i % 3 === 1 ? 'bg-gold/10 border-gold/20' : 'bg-platinum/10 border-platinum/20'}`}
            style={{
              width: 2 + Math.random() * 4 + 'px',
              height: 2 + Math.random() * 4 + 'px',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1 + Math.random() * 0.15,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 30 + Math.random() * 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 min-h-screen flex flex-col">
        <MotionMain
          ref={sectionRef}
          style={{ opacity }}
          className="flex-1 p-4 md:p-6 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <MotionDiv variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <MotionDiv
                className="w-12 h-12 rounded-full premium-glass flex items-center justify-center border border-gold/20 shadow-lg premium-shadow relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MotionDiv
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary via-gold to-primary bg-[length:200%_200%] animate-gradient-slow"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Workflow className="w-4 h-4 text-background animate-pulse-scale" />
                  </div>
                </MotionDiv>
              </MotionDiv>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                  Workflow <span className="premium-gradient-text">Studio</span>
                </h1>
                <p className="text-muted-foreground">
                  Design, build, and orchestrate intelligent AI workflows
                </p>
              </div>
            </div>
          </MotionDiv>

          {/* Controls Section */}
          <MotionDiv variants={itemVariants} className="mb-6">
            <div className="premium-card p-4 bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg">
              <WorkflowControls
                flowDirection={flowDirection}
                isRunning={isRunning}
                agentsCount={workflowNodes.length}
                onToggleDirection={onToggleDirection}
                onRun={onRunIndividualNode}
                onRunWorkflow={runWorkflow}
                onSaveWorkflow={handleSaveWorkflow}
                onLoadWorkflow={handleLoadWorkflowButtonClick}
              />
            </div>
          </MotionDiv>

          {/* Main Workspace */}
          <MotionDiv variants={itemVariants} className="flex flex-1 gap-4 md:gap-6 overflow-hidden">
            {/* Agent Palette */}
            <MotionDiv
              className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <AgentPalette onAddNodeToCanvas={onAddNodeToCanvas} />
            </MotionDiv>

            {/* Workflow Canvas */}
            <MotionDiv
              className="flex-1"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl flex flex-col overflow-hidden">
                <CardHeader className="pb-2 md:pb-4 border-b border-border-alt/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-sapphire flex items-center justify-center">
                      <Zap className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <CardTitle className="text-h3 text-foreground font-serif">
                        Build Your Workflow
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Drag and drop AI agents, connect them, and run your automated processes.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-2 md:p-6">
                  <WorkflowCanvas
                    nodes={workflowNodes}
                    edges={edges}
                    onRemoveNode={removeFromWorkflow}
                    onUpdateNode={onUpdateNode}
                    onConnect={handleConnect}
                    onNodeClick={handleNodeClick}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                    onDeleteNode={handleDeleteNode}
                    onAgentDrop={handleAgentDrop}
                    isTeaser={false}
                  />
                </CardContent>
              </Card>
            </MotionDiv>
          </MotionDiv>

          {/* Node Configuration Modal */}
          <NodeConfigModal
            isOpen={isConfigModalOpen}
            onClose={() => setIsConfigModalOpen(false)}
            node={selectedNodeForConfig}
            onSave={handleSaveNodeConfig}
          />
        </MotionMain>
        <Footer />
      </div>
    </div>
  );
};

export default WorkflowStudio;
