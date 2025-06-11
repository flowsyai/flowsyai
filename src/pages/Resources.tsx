import React, { useState } from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  FileText,
  Code,
  Video,
  Layout,
  Lightbulb,
  HelpCircle,
  Users,
  Search,
  Star,
  Clock,
  Download,
  ExternalLink,
  Play,
  Crown,
  Zap,
  Brain,
  Rocket,
  Target,
  TrendingUp,
} from 'lucide-react';

const Resources: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tutorials');
  const [searchQuery, setSearchQuery] = useState('');

  const resourceSections = [
    {
      id: 'tutorials',
      label: 'Tutorials',
      icon: BookOpen,
      description: 'Step-by-step guides',
      count: 24,
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: FileText,
      description: 'Complete API docs',
      count: 156,
    },
    {
      id: 'api-reference',
      label: 'API Reference',
      icon: Code,
      description: 'Developer resources',
      count: 89,
    },
    {
      id: 'video-guides',
      label: 'Video Guides',
      icon: Video,
      description: 'Visual learning',
      count: 18,
    },
    {
      id: 'templates',
      label: 'Templates Library',
      icon: Layout,
      description: 'Ready-to-use workflows',
      count: 42,
      premium: true,
    },
    {
      id: 'best-practices',
      label: 'Best Practices',
      icon: Lightbulb,
      description: 'Expert recommendations',
      count: 31,
    },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Common questions', count: 67 },
    {
      id: 'community',
      label: 'Community Forum',
      icon: Users,
      description: 'Connect with others',
      count: 1200,
    },
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with AI Workflows',
      description:
        'Learn the basics of creating your first AI-powered workflow in under 10 minutes.',
      duration: '8 min read',
      difficulty: 'Beginner',
      rating: 4.9,
      category: 'Getting Started',
      featured: true,
    },
    {
      id: 2,
      title: 'Advanced Node Connections',
      description: 'Master complex workflow patterns and data transformations.',
      duration: '15 min read',
      difficulty: 'Advanced',
      rating: 4.8,
      category: 'Workflows',
    },
    {
      id: 3,
      title: 'Voice Command Integration',
      description: 'Set up and customize voice commands for hands-free workflow control.',
      duration: '12 min read',
      difficulty: 'Intermediate',
      rating: 4.7,
      category: 'Voice AI',
      premium: true,
    },
  ];

  const videoGuides = [
    {
      id: 1,
      title: 'Complete Platform Walkthrough',
      description: 'Comprehensive overview of all platform features and capabilities.',
      duration: '24:30',
      views: '12.5K',
      thumbnail: '/api/placeholder/320/180',
      featured: true,
    },
    {
      id: 2,
      title: 'Building Your First AI Agent',
      description: 'Step-by-step guide to creating and deploying your first AI agent.',
      duration: '18:45',
      views: '8.2K',
      thumbnail: '/api/placeholder/320/180',
    },
  ];

  const templates = [
    {
      id: 1,
      title: 'Content Marketing Pipeline',
      description: 'Complete workflow for content research, creation, and optimization.',
      category: 'Marketing',
      downloads: 1240,
      rating: 4.9,
      premium: true,
    },
    {
      id: 2,
      title: 'Customer Support Automation',
      description: 'Intelligent ticket routing and response automation system.',
      category: 'Support',
      downloads: 890,
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Data Analysis & Reporting',
      description: 'Automated data processing and insight generation workflow.',
      category: 'Analytics',
      downloads: 756,
      rating: 4.7,
      premium: true,
    },
  ];

  const faqItems = [
    {
      question: 'How do I get started with AI workflows?',
      answer:
        'Start with our Getting Started tutorial, then explore our template library for pre-built workflows you can customize.',
      category: 'Getting Started',
    },
    {
      question: 'What programming knowledge do I need?',
      answer:
        'No programming knowledge required! Our visual workflow builder lets you create complex automations with drag-and-drop simplicity.',
      category: 'General',
    },
    {
      question: 'Can I integrate with external APIs?',
      answer:
        'Yes! Our platform supports hundreds of integrations and custom API connections. Check our API Reference for details.',
      category: 'Integrations',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sapphire/5 blur-3xl animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <MotionDiv
          className="w-full px-4 sm:px-6 lg:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
                  Resources
                </h1>
                <p className="text-muted-foreground">Everything you need to master AI workflows</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </div>

          {/* Resources Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="xl:col-span-1">
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Resource Categories</CardTitle>
                  <CardDescription>Browse by type</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {resourceSections.map(section => (
                      <MotionButton
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-primary to-sapphire text-background shadow-lg'
                            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                        } ${section.premium ? 'border border-gold/20' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`p-1.5 rounded-md ${
                            activeSection === section.id
                              ? 'bg-background/20'
                              : section.premium
                                ? 'bg-gold/20'
                                : 'bg-primary/20'
                          }`}
                        >
                          <section.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{section.label}</span>
                            {section.premium && <Crown className="w-3 h-3 text-gold" />}
                          </div>
                          <div
                            className={`text-xs ${
                              activeSection === section.id
                                ? 'text-background/80'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {section.description}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {section.count}
                        </Badge>
                      </MotionButton>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="xl:col-span-3">
              <MotionDiv
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === 'tutorials' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Tutorials</h2>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    </div>

                    <div className="grid gap-6">
                      {tutorials.map(tutorial => (
                        <Card
                          key={tutorial.id}
                          className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl font-semibold">{tutorial.title}</h3>
                                  {tutorial.featured && (
                                    <Badge className="bg-gold/20 text-gold">Featured</Badge>
                                  )}
                                  {tutorial.premium && <Crown className="w-4 h-4 text-gold" />}
                                </div>
                                <p className="text-muted-foreground mb-3">{tutorial.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {tutorial.duration}
                                  </div>
                                  <Badge className={getDifficultyColor(tutorial.difficulty)}>
                                    {tutorial.difficulty}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                                    {tutorial.rating}
                                  </div>
                                </div>
                              </div>
                              <Button className="bg-gradient-to-r from-primary to-sapphire text-background">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Read
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'video-guides' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Video Guides</h2>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Playlist
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {videoGuides.map(video => (
                        <Card
                          key={video.id}
                          className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                          <CardContent className="p-0">
                            <div className="relative">
                              <div className="aspect-video bg-gradient-to-br from-primary/20 to-sapphire/20 rounded-t-lg flex items-center justify-center">
                                <Play className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              {video.featured && (
                                <Badge className="absolute top-2 right-2 bg-gold/20 text-gold">
                                  Featured
                                </Badge>
                              )}
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                                {video.duration}
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                              <p className="text-muted-foreground text-sm mb-3">
                                {video.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  {video.views} views
                                </span>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-primary to-sapphire text-background"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Watch
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'templates' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        Templates Library
                        <Crown className="w-6 h-6 text-gold" />
                      </h2>
                      <Button className="bg-gradient-to-r from-gold to-primary text-background">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade for All Templates
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {templates.map(template => (
                        <Card
                          key={template.id}
                          className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-semibold">{template.title}</h3>
                                  {template.premium && <Crown className="w-4 h-4 text-gold" />}
                                </div>
                                <p className="text-muted-foreground text-sm mb-3">
                                  {template.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                  <Badge variant="secondary">{template.category}</Badge>
                                  <div className="flex items-center gap-1">
                                    <Download className="w-4 h-4" />
                                    {template.downloads}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                                    {template.rating}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              className={`w-full ${
                                template.premium
                                  ? 'bg-gradient-to-r from-gold to-primary text-background'
                                  : 'bg-gradient-to-r from-primary to-sapphire text-background'
                              }`}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              {template.premium ? 'Premium Template' : 'Download'}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'faq' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                      <Button variant="outline" size="sm">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Ask Question
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {faqItems.map((faq, index) => (
                        <Card
                          key={index}
                          className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <HelpCircle className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                <p className="text-muted-foreground mb-3">{faq.answer}</p>
                                <Badge variant="secondary" className="text-xs">
                                  {faq.category}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placeholder for other sections */}
                {!['tutorials', 'video-guides', 'templates', 'faq'].includes(activeSection) && (
                  <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {resourceSections.find(section => section.id === activeSection)
                          ?.premium && (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-primary flex items-center justify-center">
                            <Crown className="w-5 h-5 text-background" />
                          </div>
                        )}
                        {resourceSections.find(section => section.id === activeSection)?.label}
                        {resourceSections.find(section => section.id === activeSection)
                          ?.premium && (
                          <span className="text-sm bg-gold/20 text-gold px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {
                          resourceSections.find(section => section.id === activeSection)
                            ?.description
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          {React.createElement(
                            resourceSections.find(section => section.id === activeSection)?.icon ||
                              BookOpen,
                            {
                              className: 'w-8 h-8 text-primary',
                            }
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground mb-6">
                          This resource section is currently under development.
                        </p>
                        {resourceSections.find(section => section.id === activeSection)
                          ?.premium && (
                          <Button className="bg-gradient-to-r from-gold to-primary text-background hover:shadow-lg hover:shadow-gold/20">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade to Premium
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Resources;
