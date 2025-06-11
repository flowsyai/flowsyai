import React, { useState, useEffect, useCallback } from 'react';
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
} from '@/lib/motion-wrapper';

import {
  Search,
  Filter,
  Star,
  Download,
  Clock,
  Users,
  Zap,
  Bot,
  Database,
  Mail,
  TrendingUp,
  ArrowRight,
  Play,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { WorkflowTemplateService } from '@/services/workflowTemplateService';
import { EnhancedWorkflowService } from '@/services/enhancedWorkflowService';
import { WorkflowTemplate } from '@/types/nodeTemplates';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const WorkflowTemplatesGallery: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<WorkflowTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const templateService = WorkflowTemplateService.getInstance();
  const workflowService = EnhancedWorkflowService.getInstance();

  const loadTemplates = useCallback(() => {
    const allTemplates = templateService.getAllTemplates();
    setTemplates(allTemplates);
  }, [templateService]);

  const filterTemplates = useCallback(() => {
    let filtered = [...templates];

    // Search filter
    if (searchQuery) {
      filtered = templateService.searchTemplates(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(template => template.difficulty === selectedDifficulty);
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedCategory, selectedDifficulty, sortBy, templateService]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  useEffect(() => {
    filterTemplates();
  }, [filterTemplates]);

  const handleUseTemplate = async (template: WorkflowTemplate) => {
    if (!user) {
      toast.error('Please log in to use templates');
      navigate('/auth');
      return;
    }

    try {
      // Create workflow from template
      const workflowData = {
        name: `${template.name} (Copy)`,
        description: template.description,
        nodes: template.nodes,
        edges: template.edges,
        userId: user.id,
        isPublic: false,
        tags: template.tags,
        category: template.category,
        status: 'draft',
        version: 1,
        lastExecuted: undefined,
        executionCount: 0,
        settings: {
          autoSave: true,
          executionTimeout: 300,
          retryOnFailure: false,
          maxRetries: 3,
          enableLogging: true,
          enableAnalytics: true,
        },
      };

      const workflow = await workflowService.createWorkflow(workflowData);
      toast.success('Template imported successfully!');
      navigate(`/ai-workflow-studio/${workflow.id}`);
    } catch (error) {
      toast.error('Failed to import template');
      console.error('Error importing template:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'customer_support':
        return <Users className="w-4 h-4" />;
      case 'content_generation':
        return <Bot className="w-4 h-4" />;
      case 'data_processing':
        return <Database className="w-4 h-4" />;
      case 'marketing_automation':
        return <Mail className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const featuredTemplates = templateService.getFeaturedTemplates();
  const popularTemplates = templateService.getPopularTemplates();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Workflow Templates</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started quickly with pre-built AI automation workflows. Choose from our curated
              collection of templates for common use cases.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="customer_support">Customer Support</SelectItem>
                <SelectItem value="content_generation">Content Generation</SelectItem>
                <SelectItem value="data_processing">Data Processing</SelectItem>
                <SelectItem value="marketing_automation">Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={() => handleUseTemplate(template)}
                  getCategoryIcon={getCategoryIcon}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={() => handleUseTemplate(template)}
                  getCategoryIcon={getCategoryIcon}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={() => handleUseTemplate(template)}
                  getCategoryIcon={getCategoryIcon}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all templates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: WorkflowTemplate;
  onUse: () => void;
  getCategoryIcon: (category: string) => React.ReactNode;
  getDifficultyColor: (difficulty: string) => string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onUse,
  getCategoryIcon,
  getDifficultyColor,
}) => {
  return (
    <MotionDiv whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {getCategoryIcon(template.category)}
              <Badge variant="outline" className="text-xs">
                {template.category.replace('_', ' ')}
              </Badge>
            </div>
            {template.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                Featured
              </Badge>
            )}
          </div>

          <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">{template.description}</p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{template.rating}</span>
                <span>({template.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{template.downloads.toLocaleString()}</span>
              </div>
            </div>

            {/* Difficulty and Time */}
            <div className="flex items-center justify-between">
              <Badge className={getDifficultyColor(template.difficulty)}>
                {template.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{template.estimatedTime}m</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {template.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Use Case */}
            <p className="text-sm text-muted-foreground line-clamp-2">{template.useCase}</p>

            {/* Action Button */}
            <Button onClick={onUse} className="w-full group">
              <Play className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              Use Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
};

export default WorkflowTemplatesGallery;
