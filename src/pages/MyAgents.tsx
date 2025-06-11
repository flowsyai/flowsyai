import { useState, ReactElement } from 'react'; // Added ReactElement
import { useNavigate } from 'react-router-dom';
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

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Book,
  Code,
  ChartBar,
  FileText,
  Layers,
  Search,
  MessageSquare,
  Database,
  Settings,
  CloudUpload,
  Cpu, // Used in CreateAgentModal and as default
  UserPlus,
  PieChart,
  Trash2,
  PlusCircle,
  AlertCircle,
  LucideIcon, // Type for iconComponents map
  ArrowRight,
  Zap, // Used in CreateAgentModal
  Edit3, // For Edit button
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
// import { FeatureUnderDevelopmentModal } from "@/components/FeatureUnderDevelopmentModal"; // Will be replaced
import AgentModal, { AgentFormData } from '@/components/CreateAgentModal'; // Updated import

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  iconName: string; // Changed from icon: JSX.Element
  category: string;
  isActive: boolean;
  usageTokens: number;
  type: 'standard' | 'premium' | 'custom';
}

// Consistent animation variants (can be moved to a shared file later)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2, // Ensure page transition finishes before children animate
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Map icon names to their components
const iconComponents: { [key: string]: LucideIcon } = {
  ChartBar,
  Code,
  Book,
  FileText,
  Cpu,
  Zap,
  // Add other icons as needed from lucide-react
};

const MyAgents = () => {
  const [myAgents, setMyAgents] = useState<AIAgent[]>([
    {
      id: 'agent-1',
      name: 'Marketing AI',
      description: 'Creates marketing strategies, content plans, and ad copy',
      iconName: 'ChartBar',
      category: 'Marketing',
      isActive: true,
      usageTokens: 120,
      type: 'standard',
    },
    {
      id: 'agent-3',
      name: 'Code Assistant',
      description: 'Writes clean, efficient code in multiple programming languages',
      iconName: 'Code',
      category: 'Development',
      isActive: true,
      usageTokens: 540,
      type: 'premium',
    },
    {
      id: 'agent-2',
      name: 'Documentation Bot',
      description: 'Generates clear, comprehensive documentation for your projects',
      iconName: 'Book',
      category: 'Documentation',
      isActive: false,
      usageTokens: 78,
      type: 'standard',
    },
    {
      id: 'agent-5',
      name: 'Content Writer',
      description: 'Creates engaging articles, blog posts and website copy',
      iconName: 'FileText',
      category: 'Content',
      isActive: true,
      usageTokens: 230,
      type: 'standard',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  // const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false); // Replaced by isAgentModalOpen
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<AIAgent | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [agentToDeleteId, setAgentToDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const openCreateAgentModal = () => {
    setAgentToEdit(null);
    setIsAgentModalOpen(true);
  };

  const openEditAgentModal = (agent: AIAgent) => {
    setAgentToEdit(agent);
    setIsAgentModalOpen(true);
  };

  const closeAgentModal = () => {
    setIsAgentModalOpen(false);
    setAgentToEdit(null); // Important to reset
  };

  const toggleAgentStatus = (id: string) => {
    setMyAgents(agents =>
      agents.map(agent => (agent.id === id ? { ...agent, isActive: !agent.isActive } : agent))
    );

    const agent = myAgents.find(a => a.id === id);
    if (agent) {
      toast({
        title: agent.isActive ? 'Agent Deactivated' : 'Agent Activated',
        description: `${agent.name} has been ${agent.isActive ? 'deactivated' : 'activated'} successfully.`,
        duration: 3000,
      });
    }
  };

  // Opens the delete confirmation dialog
  const requestDeleteAgent = (id: string) => {
    setAgentToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Actually performs the deletion
  const handleConfirmDelete = () => {
    if (!agentToDeleteId) return;

    const agent = myAgents.find(a => a.id === agentToDeleteId);
    setMyAgents(agents => agents.filter(agent => agent.id !== agentToDeleteId));

    if (agent) {
      toast({
        title: 'Agent Removed',
        description: `${agent.name} has been removed from your agents.`,
        variant: 'destructive',
      });
    }
    setIsDeleteDialogOpen(false);
    setAgentToDeleteId(null);
  };

  const handleAgentCreate = (agentData: AgentFormData) => {
    const newAgent: AIAgent = {
      ...agentData,
      id: `agent-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      usageTokens: 0,
    };
    setMyAgents(prevAgents => [...prevAgents, newAgent]);
    closeAgentModal();
    toast({
      title: 'Agent Created',
      description: `${newAgent.name} has been successfully created.`,
    });
  };

  const handleAgentUpdate = (agentId: string, updatedData: AgentFormData) => {
    setMyAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId
          ? { ...agent, ...updatedData, id: agent.id, usageTokens: agent.usageTokens }
          : agent
      )
    );
    closeAgentModal();
    toast({
      title: 'Agent Updated',
      description: `${updatedData.name} has been successfully updated.`,
    });
  };

  const filteredAgents = myAgents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeTab === 'all' ||
      (activeTab === 'active' && agent.isActive) ||
      (activeTab === 'inactive' && !agent.isActive);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MotionMain
        className="flex-1 container mx-auto px-4 py-12 max-w-screen-xl" // Added max-width
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.5 }}
      >
        <MotionDiv variants={itemVariants}>
          {' '}
          {/* Wrap header content for initial animation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-h1 mb-2">My AI Agents</h1>
              <p className="text-body-lg text-muted-foreground">
                Manage your active AI agents and their settings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" onClick={openCreateAgentModal} className="w-full sm:w-auto">
                <PlusCircle className="w-5 h-5 mr-2" />
                Add New Agent
              </Button>
              <div className="relative w-full sm:w-auto sm:min-w-[250px]">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search my agents..."
                  className="pl-12 pr-4 py-3 text-body-std bg-card-alt border-border-alt focus:ring-primary focus:border-primary rounded-lg w-full"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv variants={itemVariants} className="mb-10">
          {' '}
          {/* Wrap Tabs for initial animation */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 gap-2 bg-transparent p-0 w-full sm:w-auto max-w-md mx-auto sm:mx-0">
              {['all', 'active', 'inactive'].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-body-std data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md px-4 py-2.5 transition-all hover:bg-muted/50"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Agents
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-8">
              {' '}
              {/* Increased margin-top */}
              <MotionDiv
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants} // Use containerVariants for staggering children
                initial="hidden"
                animate="visible" // Changed from "show" to "visible" for consistency
              >
                {filteredAgents.length > 0 ? (
                  filteredAgents.map(agent => (
                    <MotionDiv key={agent.id} variants={itemVariants} className="hover-lift">
                      <Card
                        className={`bg-card-alt border-border-alt shadow-lg h-full flex flex-col
                                       ${!agent.isActive ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}
                                       ${agent.type === 'premium' ? 'border-primary/50 ring-2 ring-primary/30' : 'hover:border-primary/70'}`}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-card rounded-lg border border-border">
                                {' '}
                                {/* Icon background */}
                                {(() => {
                                  const IconComponent = iconComponents[agent.iconName] || Cpu; // Default to Cpu if not found
                                  return <IconComponent className="w-6 h-6 text-primary" />;
                                })()}
                              </div>
                              <div>
                                <CardTitle className="text-h3">{agent.name}</CardTitle>
                                <CardDescription className="text-caption text-muted-foreground">
                                  {agent.category}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge
                              variant={
                                agent.type === 'premium'
                                  ? 'default'
                                  : agent.type === 'custom'
                                    ? 'outline'
                                    : 'secondary'
                              }
                              className={`capitalize ${agent.type === 'premium' ? 'bg-primary text-primary-foreground' : ''}`}
                            >
                              {agent.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 flex-grow">
                          <p className="text-body-std text-foreground/80 mb-4 line-clamp-3">
                            {agent.description}
                          </p>
                          <div className="flex justify-between text-caption text-muted-foreground border-t border-border-alt pt-3 mt-3">
                            <span>
                              Usage:{' '}
                              <span className="font-semibold text-foreground/90">
                                {agent.usageTokens}
                              </span>{' '}
                              FlowTokens
                            </span>
                            <span
                              className={`font-semibold ${agent.isActive ? 'text-green-400' : 'text-amber-400'}`}
                            >
                              {agent.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-3 gap-2 pt-4 border-t border-border-alt">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary col-span-1 justify-start px-2"
                            onClick={() => openEditAgentModal(agent)}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant={agent.isActive ? 'outline' : 'default'}
                            size="sm"
                            className={`col-span-1 ${agent.isActive ? 'border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground' : ''}`}
                            onClick={() => toggleAgentStatus(agent.id)}
                          >
                            {agent.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive col-span-1 justify-end px-2"
                            onClick={() => requestDeleteAgent(agent.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </CardFooter>
                      </Card>
                    </MotionDiv>
                  ))
                ) : (
                  <MotionDiv
                    variants={itemVariants}
                    className="col-span-full text-center py-16 text-muted-foreground"
                  >
                    <AlertCircle className="w-16 h-16 mx-auto mb-6 opacity-30" />
                    <p className="text-body-lg">No AI agents found matching your criteria.</p>
                    <p className="text-body-std mt-2">Try adjusting your search or filter.</p>
                  </MotionDiv>
                )}
              </MotionDiv>
            </TabsContent>
          </Tabs>
        </MotionDiv>

        <MotionDiv variants={itemVariants}>
          {' '}
          {/* Wrap FlowTokens card for initial animation */}
          <Card className="bg-card-alt border-border-alt shadow-xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-h2">Available FlowTokens</CardTitle>
              <CardDescription className="text-body-std">
                Your current token balance and estimated monthly usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-6 lg:gap-8">
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                    <Cpu className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-caption text-muted-foreground uppercase tracking-wider">
                      Current Balance
                    </p>
                    <p className="text-h2 font-bold text-primary">457</p>
                    <p className="text-xs text-muted-foreground">FlowTokens</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="p-3 rounded-full bg-secondary-accent/10 flex items-center justify-center ring-2 ring-secondary-accent/20">
                    <PieChart className="w-7 h-7 text-secondary-accent" />
                  </div>
                  <div>
                    <p className="text-caption text-muted-foreground uppercase tracking-wider">
                      Monthly Usage
                    </p>
                    <p className="text-h2 font-bold text-secondary-accent">968</p>
                    <p className="text-xs text-muted-foreground">FlowTokens</p>
                  </div>
                </div>

                <div className="lg:col-start-3 flex justify-center lg:justify-end mt-4 md:mt-0">
                  <Button
                    size="lg"
                    onClick={() => navigate('/wallet')}
                    className="w-full sm:w-auto group"
                  >
                    Purchase More FlowTokens
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </MotionMain>
      <AgentModal
        open={isAgentModalOpen}
        onOpenChange={closeAgentModal}
        onAgentCreate={handleAgentCreate}
        onAgentUpdate={handleAgentUpdate}
        agentToEdit={agentToEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to remove this agent?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The agent "
              <span className="font-semibold">
                {agentToDeleteId ? myAgents.find(agent => agent.id === agentToDeleteId)?.name : ''}
              </span>
              " will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAgentToDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyAgents;
