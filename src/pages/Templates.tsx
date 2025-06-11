import { useState, useEffect, useMemo, useRef } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Code,
  FileText,
  Layers,
  ChartBar,
  ArrowRight,
  PlusCircle,
  Palette,
  Zap,
  Filter,
  Star,
  Clock,
  Users,
  Sparkles,
  Layout,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
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

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GlassCard } from '@/components/ui/glass-card';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

// Optimized ParticlesBackground with reduced particle count for better performance
function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-templates',
        options: {
          background: { color: '#050A14' },
          fpsLimit: 30, // Reduced from 60 for better performance
          particles: {
            number: {
              value: 15, // Reduced from 35 for better performance
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
              value: 0.15, // Reduced opacity for subtlety
              random: true,
              anim: {
                enable: true,
                speed: 0.2, // Slower animation for better performance
                opacity_min: 0.05,
                sync: false,
              },
            },
            size: {
              value: 1.2, // Slightly smaller particles
              random: true,
              anim: {
                enable: true,
                speed: 0.5, // Slower animation
                size_min: 0.1,
                sync: false,
              },
            },
            links: {
              enable: true,
              color: '#0078FF',
              opacity: 0.06, // Reduced opacity
              distance: 100, // Reduced distance for fewer connections
              width: 0.8, // Thinner lines
            },
            move: {
              enable: true,
              speed: 0.2, // Slower movement
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
              onHover: { enable: false }, // Disabled for better performance
              onClick: { enable: false }, // Disabled for better performance
              resize: { enable: true },
            },
            modes: {
              repulse: { distance: 60, duration: 0.3 },
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

interface Template {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  category: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  agents: number;
  usageCount: number;
  featured?: boolean;
  isNew?: boolean;
}

const templatesData: Template[] = [
  // Renamed to templatesData to avoid conflict with component name
  {
    id: 'template-1',
    title: 'Marketing Campaign Builder',
    description:
      'Generate complete marketing campaigns with content, strategy, and analytics setup',
    icon: <Zap className="w-6 h-6 text-primary" />,
    category: 'Marketing',
    complexity: 'Intermediate',
    agents: 4,
    usageCount: 1500,
    featured: true,
  },
  {
    id: 'template-2',
    title: 'Documentation Generator',
    description: 'Create comprehensive documentation for your software projects automatically',
    icon: <FileText className="w-6 h-6 text-primary" />,
    category: 'Documentation',
    complexity: 'Beginner',
    agents: 3,
    usageCount: 50,
  },
  {
    id: 'template-3',
    title: 'Full-stack Web App',
    description: 'Build a complete web application with frontend, backend, and database',
    icon: <Code className="w-6 h-6 text-primary" />,
    category: 'Development',
    complexity: 'Advanced',
    agents: 6,
    usageCount: 750,
    featured: true,
  },
  {
    id: 'template-4',
    title: 'UI Design System',
    description: 'Generate a complete design system with components, styles, and guidelines',
    icon: <Palette className="w-6 h-6 text-primary" />,
    category: 'Design',
    complexity: 'Intermediate',
    agents: 3,
    usageCount: 5,
    isNew: true,
  },
  {
    id: 'template-5',
    title: 'API Development Suite',
    description: 'Build, document, and test RESTful APIs with automated workflow',
    icon: <Code className="w-6 h-6 text-primary" />,
    category: 'Development',
    complexity: 'Advanced',
    agents: 5,
    usageCount: 1200,
  },
  {
    id: 'template-6',
    title: 'Content Marketing Bundle',
    description: 'Create blog posts, social media content, and email campaigns',
    icon: <FileText className="w-6 h-6 text-primary" />,
    category: 'Marketing',
    complexity: 'Beginner',
    agents: 4,
    usageCount: 200,
    isNew: true,
  },
  // Add more templates to test performance with "many templates"
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `template-extra-${i + 1}`,
    title: `Extra Template ${i + 1} - ${['Marketing', 'Development', 'Design', 'Documentation'][i % 4]}`,
    description: `This is an additional template (number ${i + 1}) for testing purposes. It falls under the ${['Marketing', 'Development', 'Design', 'Documentation'][i % 4]} category.`,
    icon: [
      <Zap className="w-6 h-6 text-primary" />,
      <Code className="w-6 h-6 text-primary" />,
      <Palette className="w-6 h-6 text-primary" />,
      <FileText className="w-6 h-6 text-primary" />,
    ][i % 4],
    category: ['Marketing', 'Development', 'Design', 'Documentation'][i % 4],
    complexity: (
      ['Beginner', 'Intermediate', 'Advanced'] as ('Beginner' | 'Intermediate' | 'Advanced')[]
    )[i % 3],
    agents: (i % 5) + 2,
    usageCount: Math.floor(Math.random() * 2000),
  })),
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedUsageTier, setSelectedUsageTier] = useState<string>('all'); // "all", "low", "medium", "high"
  const navigate = useNavigate();

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchTerm);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleUseTemplate = (templateTitle: string) => {
    toast({
      title: 'Template Loaded (Simulated)',
      description: `The "${templateTitle}" template has been loaded. Navigating to workflow...`,
    });
    navigate('/');
  };

  const handleStartBuilding = () => {
    toast({
      title: 'Starting New Workflow',
      description: 'Navigating to a blank workflow canvas...',
    });
    navigate('/');
  };

  const allCategories = useMemo(() => Array.from(new Set(templatesData.map(t => t.category))), []);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const filteredTemplates = useMemo(() => {
    return templatesData.filter(template => {
      // Filter by search query (debounced)
      const matchesSearch =
        debouncedSearchQuery === '' ||
        template.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      // Filter by selected categories
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(template.category);

      // Filter by usage count tier
      let matchesUsageTier = true;
      if (selectedUsageTier !== 'all') {
        const count = template.usageCount;
        if (selectedUsageTier === 'low') {
          matchesUsageTier = count < 100;
        } else if (selectedUsageTier === 'medium') {
          matchesUsageTier = count >= 100 && count <= 1000;
        } else if (selectedUsageTier === 'high') {
          matchesUsageTier = count > 1000;
        }
      }

      return matchesSearch && matchesCategory && matchesUsageTier;
    });
  }, [debouncedSearchQuery, selectedCategories, selectedUsageTier]);

  const complexityBadgeStyle = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'bg-secondary/10 text-secondary border-secondary/30';
      case 'Intermediate':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'Advanced':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.9]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden premium-hero-bg">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <MotionDiv
            key={i}
            className={`absolute rounded-full backdrop-blur-sm border ${i % 3 === 0 ? 'bg-primary/10 border-primary/20' : i % 3 === 1 ? 'bg-gold/10 border-gold/20' : 'bg-platinum/10 border-platinum/20'}`}
            style={{
              width: 2 + Math.random() * 6 + 'px',
              height: 2 + Math.random() * 6 + 'px',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1 + Math.random() * 0.2,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 25 + Math.random() * 25,
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
          className="flex-1"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <section className="container mx-auto px-4 py-12 md:py-16 max-w-screen-xl">
            {/* Header Section */}
            <MotionDiv
              className="mb-12 text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <MotionDiv
                  className="w-16 h-16 rounded-full premium-glass flex items-center justify-center border border-gold/20 shadow-lg premium-shadow relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <MotionDiv
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary via-gold to-primary bg-[length:200%_200%] animate-gradient-slow"
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
                      <Layout className="w-5 h-5 text-background animate-pulse-scale" />
                    </div>
                  </MotionDiv>
                </MotionDiv>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-serif">
                Workflow <span className="premium-gradient-text">Templates</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose from our curated collection of premium AI workflow templates or create your
                own masterpiece from scratch.
              </p>
            </MotionDiv>

            {/* Search and Filters Section */}
            <MotionDiv
              className="mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="premium-card p-6 bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl rounded-lg">
                {/* Search Input */}
                <div className="relative w-full md:max-w-lg mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search templates by name or description..."
                    className="pl-12 pr-4 py-4 text-body-std bg-background/50 border-border-alt focus:ring-primary/20 focus:border-primary/50 rounded-lg w-full transition-all duration-300"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                  {/* Category Filter */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      Categories
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {allCategories.map(category => (
                        <MotionDiv
                          key={category}
                          className="flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={checked => handleCategoryChange(category, !!checked)}
                            className="border-border-alt data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                          >
                            {category}
                          </Label>
                        </MotionDiv>
                      ))}
                    </div>
                    {selectedCategories.length > 0 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-primary hover:text-primary/80 w-fit"
                        onClick={() => setSelectedCategories([])}
                      >
                        Clear Categories
                      </Button>
                    )}
                  </div>

                  {/* Usage Tier Filter */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4 text-sapphire" />
                      Usage Popularity
                    </Label>
                    <Select value={selectedUsageTier} onValueChange={setSelectedUsageTier}>
                      <SelectTrigger className="w-[200px] bg-background/50 border-border-alt hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Select usage tier" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border-alt">
                        <SelectItem value="all">All Templates</SelectItem>
                        <SelectItem value="low">Low Usage (&lt; 100)</SelectItem>
                        <SelectItem value="medium">Medium Usage (100-1000)</SelectItem>
                        <SelectItem value="high">High Usage (&gt; 1000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Featured Templates Section */}
              {filteredTemplates.some(t => t.featured) && (
                <MotionDiv
                  className="col-span-1 md:col-span-2 lg:col-span-3 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Star className="mr-2 h-5 w-5 text-amber-400" />
                    Featured Templates
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredTemplates
                      .filter(t => t.featured)
                      .map(template => (
                        <MotionDiv key={template.id} variants={itemVariants} className="h-full">
                          <GlassCard
                            className="h-full flex flex-col relative"
                            icon={
                              <div className="p-2 bg-card rounded-lg border border-border-alt group-hover:border-primary/30 transition-colors">
                                {template.icon}
                              </div>
                            }
                            title={template.title}
                            description={template.description}
                            footer={
                              <Button
                                size="lg"
                                className="w-full group/btn"
                                onClick={() => handleUseTemplate(template.title)}
                              >
                                Use Template
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                              </Button>
                            }
                          >
                            {template.featured && (
                              <div className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                Featured
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              <Badge variant="secondary" className="text-caption capitalize">
                                {template.category}
                              </Badge>
                              <Badge
                                className={`text-caption capitalize border ${complexityBadgeStyle(template.complexity)}`}
                              >
                                {template.complexity}
                              </Badge>
                              <Badge variant="outline" className="text-caption">
                                {template.agents} Agents
                              </Badge>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Users className="h-3 w-3 mr-1" /> {template.usageCount} uses
                              </div>
                            </div>
                          </GlassCard>
                        </MotionDiv>
                      ))}
                  </div>
                </MotionDiv>
              )}

              {/* All Templates */}
              {filteredTemplates
                .filter(t => !t.featured)
                .map(template => (
                  <MotionDiv key={template.id} variants={itemVariants} className="h-full">
                    <GlassCard
                      className="h-full flex flex-col relative"
                      icon={
                        <div className="p-2 bg-card rounded-lg border border-border-alt group-hover:border-primary/30 transition-colors">
                          {template.icon}
                        </div>
                      }
                      title={template.title}
                      description={template.description}
                      footer={
                        <Button
                          size="lg"
                          className="w-full group/btn"
                          onClick={() => handleUseTemplate(template.title)}
                        >
                          Use Template
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      }
                    >
                      {template.isNew && (
                        <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          New
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge variant="secondary" className="text-caption capitalize">
                          {template.category}
                        </Badge>
                        <Badge
                          className={`text-caption capitalize border ${complexityBadgeStyle(template.complexity)}`}
                        >
                          {template.complexity}
                        </Badge>
                        <Badge variant="outline" className="text-caption">
                          {template.agents} Agents
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" /> {template.usageCount} uses
                        </div>
                      </div>
                    </GlassCard>
                  </MotionDiv>
                ))}

              {/* Create Custom Template Card */}
              <MotionDiv variants={itemVariants} className="h-full">
                <GlassCard className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-5 group-hover:bg-primary/20 transition-colors">
                    <PlusCircle className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-h3 mb-2 group-hover:text-primary transition-colors">
                    Create Custom Workflow
                  </h3>
                  <p className="text-body-std text-muted-foreground mb-6">
                    Build a completely custom workflow from scratch with our AI agents.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleStartBuilding}
                    className="border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground group/btn"
                  >
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>
          </section>
        </MotionMain>
        <Footer />
      </div>
    </div>
  );
};

export default Templates;
