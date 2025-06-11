import React, { useState, useEffect } from 'react';
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
  Store,
  Star,
  Download,
  Heart,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Tag,
  Award,
  Zap,
  Shield,
  DollarSign,
  Play,
  Eye,
  MessageSquare,
  Share2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface MarketplaceWorkflow {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
    reputation: number;
  };
  category: string;
  tags: string[];
  price: number; // 0 for free
  rating: number;
  reviews: number;
  downloads: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  trending: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  screenshots: string[];
  requirements: string[];
  features: string[];
  changelog: Array<{
    version: string;
    date: string;
    changes: string[];
  }>;
}

const WorkflowMarketplace: React.FC = () => {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<MarketplaceWorkflow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedWorkflow, setSelectedWorkflow] = useState<MarketplaceWorkflow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMarketplaceData();
  }, []);

  const loadMarketplaceData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockWorkflows: MarketplaceWorkflow[] = [
        {
          id: '1',
          name: 'AI Customer Support Pro',
          description:
            'Advanced customer support automation with sentiment analysis and multi-language support',
          longDescription:
            'This comprehensive customer support workflow combines AI-powered sentiment analysis, automatic ticket routing, and multi-language support to create a world-class customer service experience. Features include real-time sentiment monitoring, escalation triggers, and detailed analytics.',
          author: {
            id: '1',
            name: 'Sarah Chen',
            avatar: '/avatars/sarah.jpg',
            verified: true,
            reputation: 4.9,
          },
          category: 'customer_support',
          tags: ['ai', 'customer-service', 'sentiment-analysis', 'automation'],
          price: 29.99,
          rating: 4.8,
          reviews: 127,
          downloads: 2341,
          likes: 456,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-10T00:00:00Z',
          featured: true,
          trending: true,
          difficulty: 'intermediate',
          estimatedTime: 30,
          screenshots: ['/screenshots/workflow1-1.jpg', '/screenshots/workflow1-2.jpg'],
          requirements: ['OpenAI API key', 'Slack integration', 'Email service'],
          features: [
            'Multi-language sentiment analysis',
            'Automatic ticket routing',
            'Real-time escalation triggers',
            'Comprehensive analytics dashboard',
            'Custom response templates',
          ],
          changelog: [
            {
              version: '2.1.0',
              date: '2024-01-10',
              changes: ['Added multi-language support', 'Improved sentiment accuracy', 'Bug fixes'],
            },
          ],
        },
        {
          id: '2',
          name: 'Content Creator Suite',
          description:
            'Complete content generation pipeline for blogs, social media, and marketing materials',
          longDescription:
            'Transform your content creation process with this comprehensive AI-powered suite. Generate high-quality blog posts, social media content, and marketing materials with consistent brand voice and SEO optimization.',
          author: {
            id: '2',
            name: 'Marcus Rodriguez',
            avatar: '/avatars/marcus.jpg',
            verified: true,
            reputation: 4.7,
          },
          category: 'content_generation',
          tags: ['content', 'marketing', 'seo', 'social-media'],
          price: 0,
          rating: 4.6,
          reviews: 89,
          downloads: 1876,
          likes: 234,
          createdAt: '2023-12-15T00:00:00Z',
          updatedAt: '2024-01-05T00:00:00Z',
          featured: true,
          trending: false,
          difficulty: 'beginner',
          estimatedTime: 20,
          screenshots: ['/screenshots/workflow2-1.jpg'],
          requirements: ['OpenAI API key', 'Social media accounts'],
          features: [
            'Multi-platform content adaptation',
            'SEO optimization',
            'Brand voice consistency',
            'Automated scheduling',
            'Performance tracking',
          ],
          changelog: [
            {
              version: '1.5.0',
              date: '2024-01-05',
              changes: ['Added SEO optimization', 'Improved content quality', 'New templates'],
            },
          ],
        },
        {
          id: '3',
          name: 'Data Analytics Engine',
          description: 'Powerful data processing and analysis workflow with AI-generated insights',
          longDescription:
            'Automate your data analysis pipeline with this advanced workflow that processes large datasets, generates insights, and creates beautiful reports. Perfect for business intelligence and data-driven decision making.',
          author: {
            id: '3',
            name: 'Dr. Emily Watson',
            avatar: '/avatars/emily.jpg',
            verified: true,
            reputation: 4.9,
          },
          category: 'data_processing',
          tags: ['data', 'analytics', 'reporting', 'business-intelligence'],
          price: 49.99,
          rating: 4.9,
          reviews: 156,
          downloads: 987,
          likes: 312,
          createdAt: '2023-11-20T00:00:00Z',
          updatedAt: '2024-01-08T00:00:00Z',
          featured: false,
          trending: true,
          difficulty: 'advanced',
          estimatedTime: 45,
          screenshots: ['/screenshots/workflow3-1.jpg', '/screenshots/workflow3-2.jpg'],
          requirements: ['Database access', 'Python environment', 'Visualization tools'],
          features: [
            'Automated data cleaning',
            'Statistical analysis',
            'Predictive modeling',
            'Interactive dashboards',
            'Scheduled reporting',
          ],
          changelog: [
            {
              version: '3.2.0',
              date: '2024-01-08',
              changes: [
                'Added predictive modeling',
                'Enhanced visualizations',
                'Performance improvements',
              ],
            },
          ],
        },
      ];

      setWorkflows(mockWorkflows);
    } catch (error) {
      toast.error('Failed to load marketplace data');
      console.error('Error loading marketplace:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstallWorkflow = async (workflow: MarketplaceWorkflow) => {
    if (!user) {
      toast.error('Please log in to install workflows');
      return;
    }

    try {
      // Simulate installation
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (workflow.price > 0) {
        toast.success(`Successfully purchased and installed ${workflow.name}!`);
      } else {
        toast.success(`Successfully installed ${workflow.name}!`);
      }
    } catch (error) {
      toast.error('Failed to install workflow');
    }
  };

  const handleLikeWorkflow = async (workflowId: string) => {
    if (!user) {
      toast.error('Please log in to like workflows');
      return;
    }

    setWorkflows(prev => prev.map(w => (w.id === workflowId ? { ...w, likes: w.likes + 1 } : w)));

    toast.success('Added to favorites!');
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && workflow.price === 0) ||
      (priceFilter === 'paid' && workflow.price > 0);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Store className="w-8 h-8 text-primary" />
                Workflow Marketplace
              </h1>
              <p className="text-muted-foreground">
                Discover, purchase, and share AI workflow automations
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Publish Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search workflows, tags, or authors..."
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

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
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
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Section */}
        {sortBy === 'featured' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Featured Workflows
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows
                .filter(w => w.featured)
                .slice(0, 3)
                .map(workflow => (
                  <FeaturedWorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    onInstall={() => handleInstallWorkflow(workflow)}
                    onLike={() => handleLikeWorkflow(workflow.id)}
                    onViewDetails={() => setSelectedWorkflow(workflow)}
                    getDifficultyColor={getDifficultyColor}
                  />
                ))}
            </div>
            <Separator className="mt-8" />
          </div>
        )}

        {/* All Workflows */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {sortBy === 'featured' ? 'All Workflows' : 'Workflows'}
              <span className="text-muted-foreground ml-2">({sortedWorkflows.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkflows.map((workflow, index) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                index={index}
                onInstall={() => handleInstallWorkflow(workflow)}
                onLike={() => handleLikeWorkflow(workflow.id)}
                onViewDetails={() => setSelectedWorkflow(workflow)}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        </div>

        {/* Workflow Details Modal */}
        <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedWorkflow && (
              <WorkflowDetailsModal
                workflow={selectedWorkflow}
                onInstall={() => handleInstallWorkflow(selectedWorkflow)}
                onLike={() => handleLikeWorkflow(selectedWorkflow.id)}
                getDifficultyColor={getDifficultyColor}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Featured Workflow Card Component
interface FeaturedWorkflowCardProps {
  workflow: MarketplaceWorkflow;
  onInstall: () => void;
  onLike: () => void;
  onViewDetails: () => void;
  getDifficultyColor: (difficulty: string) => string;
}

const FeaturedWorkflowCard: React.FC<FeaturedWorkflowCardProps> = ({
  workflow,
  onInstall,
  onLike,
  onViewDetails,
  getDifficultyColor,
}) => (
  <MotionDiv whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Card className="h-full hover:shadow-xl transition-shadow duration-200 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Award className="w-3 h-3 mr-1" />
            Featured
          </Badge>
          {workflow.trending && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        <CardTitle className="text-lg line-clamp-2">{workflow.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{workflow.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Author */}
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={workflow.author.avatar} />
              <AvatarFallback className="text-xs">{workflow.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{workflow.author.name}</span>
            {workflow.author.verified && <Shield className="w-4 h-4 text-blue-500" />}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{workflow.rating}</span>
              <span>({workflow.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{workflow.downloads.toLocaleString()}</span>
            </div>
          </div>

          {/* Price and Difficulty */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              {workflow.price === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span>${workflow.price}</span>
              )}
            </div>
            <Badge className={getDifficultyColor(workflow.difficulty)}>{workflow.difficulty}</Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={onInstall} className="flex-1">
              {workflow.price === 0 ? (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  Install
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-1" />
                  Purchase
                </>
              )}
            </Button>
            <Button variant="outline" size="icon" onClick={onLike}>
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onViewDetails}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </MotionDiv>
);

// Regular Workflow Card Component
interface WorkflowCardProps {
  workflow: MarketplaceWorkflow;
  index: number;
  onInstall: () => void;
  onLike: () => void;
  onViewDetails: () => void;
  getDifficultyColor: (difficulty: string) => string;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  index,
  onInstall,
  onLike,
  onViewDetails,
  getDifficultyColor,
}) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -2 }}
  >
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {workflow.category.replace('_', ' ')}
            </Badge>
            {workflow.trending && (
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Hot
              </Badge>
            )}
          </div>
          <div className="text-right">
            {workflow.price === 0 ? (
              <span className="text-sm font-medium text-green-600">Free</span>
            ) : (
              <span className="text-sm font-bold">${workflow.price}</span>
            )}
          </div>
        </div>

        <CardTitle className="text-lg line-clamp-2">{workflow.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{workflow.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Author */}
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={workflow.author.avatar} />
              <AvatarFallback className="text-xs">{workflow.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{workflow.author.name}</span>
            {workflow.author.verified && <Shield className="w-3 h-3 text-blue-500" />}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{workflow.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>
                {workflow.downloads > 1000
                  ? `${(workflow.downloads / 1000).toFixed(1)}k`
                  : workflow.downloads}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{workflow.likes}</span>
            </div>
          </div>

          {/* Difficulty and Time */}
          <div className="flex items-center justify-between">
            <Badge className={getDifficultyColor(workflow.difficulty)}>{workflow.difficulty}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{workflow.estimatedTime}m</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={onViewDetails} variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Button>
            <Button onClick={onInstall} size="sm">
              {workflow.price === 0 ? 'Install' : 'Buy'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </MotionDiv>
);

// Workflow Details Modal Component
interface WorkflowDetailsModalProps {
  workflow: MarketplaceWorkflow;
  onInstall: () => void;
  onLike: () => void;
  getDifficultyColor: (difficulty: string) => string;
}

const WorkflowDetailsModal: React.FC<WorkflowDetailsModalProps> = ({
  workflow,
  onInstall,
  onLike,
  getDifficultyColor,
}) => (
  <div className="space-y-6">
    <DialogHeader>
      <div className="flex items-start justify-between">
        <div>
          <DialogTitle className="text-2xl">{workflow.name}</DialogTitle>
          <p className="text-muted-foreground mt-2">{workflow.description}</p>
        </div>
        <div className="text-right">
          {workflow.price === 0 ? (
            <span className="text-2xl font-bold text-green-600">Free</span>
          ) : (
            <span className="text-2xl font-bold">${workflow.price}</span>
          )}
        </div>
      </div>
    </DialogHeader>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{workflow.longDescription}</p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="space-y-1">
            {workflow.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="font-semibold mb-2">Requirements</h3>
          <ul className="space-y-1">
            {workflow.requirements.map((requirement, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {/* Author Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={workflow.author.avatar} />
                <AvatarFallback>{workflow.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{workflow.author.name}</span>
                  {workflow.author.verified && <Shield className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{workflow.author.reputation}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{workflow.rating}</span>
                <span className="text-sm text-muted-foreground">({workflow.reviews})</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Downloads</span>
              <span className="font-medium">{workflow.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <Badge className={getDifficultyColor(workflow.difficulty)}>
                {workflow.difficulty}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Setup Time</span>
              <span className="font-medium">{workflow.estimatedTime}m</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button onClick={onInstall} className="w-full" size="lg">
            {workflow.price === 0 ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Install Workflow
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-2" />
                Purchase & Install
              </>
            )}
          </Button>
          <div className="flex gap-2">
            <Button onClick={onLike} variant="outline" className="flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WorkflowMarketplace;
