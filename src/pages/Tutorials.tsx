import React from 'react';
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

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Video,
  FileText,
  Code,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Rocket,
  Brain,
  Settings,
  Palette,
  Database,
  Globe,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

const Tutorials = () => {
  const tutorialCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of AI Workflow Studio',
      icon: Rocket,
      color: 'bg-blue-500',
      tutorials: [
        {
          title: 'Your First AI Workflow',
          description: 'Create your first automated workflow in under 10 minutes',
          duration: '8 min',
          difficulty: 'Beginner',
          type: 'Video',
          icon: Play,
          completed: false,
        },
        {
          title: 'Understanding AI Agents',
          description: 'Learn how AI agents work and how to configure them',
          duration: '12 min',
          difficulty: 'Beginner',
          type: 'Interactive',
          icon: Brain,
          completed: false,
        },
        {
          title: 'Platform Navigation',
          description: 'Master the interface and key features',
          duration: '6 min',
          difficulty: 'Beginner',
          type: 'Guide',
          icon: BookOpen,
          completed: false,
        },
      ],
    },
    {
      id: 'workflow-building',
      title: 'Workflow Building',
      description: 'Advanced workflow creation techniques',
      icon: Settings,
      color: 'bg-green-500',
      tutorials: [
        {
          title: 'Complex Workflow Patterns',
          description: 'Build sophisticated multi-step workflows',
          duration: '25 min',
          difficulty: 'Intermediate',
          type: 'Video',
          icon: Code,
          completed: false,
        },
        {
          title: 'Conditional Logic & Branching',
          description: 'Add decision points to your workflows',
          duration: '18 min',
          difficulty: 'Intermediate',
          type: 'Interactive',
          icon: Target,
          completed: false,
        },
        {
          title: 'Error Handling & Recovery',
          description: 'Make your workflows robust and reliable',
          duration: '15 min',
          difficulty: 'Advanced',
          type: 'Guide',
          icon: Shield,
          completed: false,
        },
      ],
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      description: 'Connect and configure AI services',
      icon: Brain,
      color: 'bg-purple-500',
      tutorials: [
        {
          title: 'OpenAI Integration',
          description: 'Connect GPT models to your workflows',
          duration: '20 min',
          difficulty: 'Intermediate',
          type: 'Video',
          icon: Zap,
          completed: false,
        },
        {
          title: 'Custom AI Models',
          description: 'Integrate your own trained models',
          duration: '30 min',
          difficulty: 'Advanced',
          type: 'Guide',
          icon: Database,
          completed: false,
        },
        {
          title: 'AI Prompt Engineering',
          description: 'Write effective prompts for better results',
          duration: '22 min',
          difficulty: 'Intermediate',
          type: 'Interactive',
          icon: Lightbulb,
          completed: false,
        },
      ],
    },
    {
      id: 'advanced-features',
      title: 'Advanced Features',
      description: 'Master pro-level capabilities',
      icon: TrendingUp,
      color: 'bg-orange-500',
      tutorials: [
        {
          title: 'AR Workflow Studio',
          description: 'Build workflows in augmented reality',
          duration: '35 min',
          difficulty: 'Advanced',
          type: 'Video',
          icon: Globe,
          completed: false,
        },
        {
          title: 'Custom UI Components',
          description: 'Create custom interface elements',
          duration: '28 min',
          difficulty: 'Advanced',
          type: 'Guide',
          icon: Palette,
          completed: false,
        },
        {
          title: 'API Integration',
          description: 'Connect external services and APIs',
          duration: '24 min',
          difficulty: 'Advanced',
          type: 'Interactive',
          icon: Globe,
          completed: false,
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return Video;
      case 'Interactive':
        return Play;
      case 'Guide':
        return FileText;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Learning Center
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Master AI Workflow
              <span className="text-primary"> Studio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive tutorials, guides, and interactive lessons to help you become an AI
              workflow automation expert. From beginner to advanced techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button size="lg" variant="outline">
                <Target className="w-5 h-5 mr-2" />
                Take Assessment
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Learning Paths</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your learning journey based on your experience level and goals
            </p>
          </div>

          <div className="space-y-12">
            {tutorialCategories.map((category, categoryIndex) => (
              <MotionDiv
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <GlassCard className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.tutorials.map((tutorial, tutorialIndex) => {
                      const TypeIcon = getTypeIcon(tutorial.type);
                      return (
                        <Card
                          key={tutorialIndex}
                          className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center">
                                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                  <tutorial.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <Badge
                                    variant="outline"
                                    className={getDifficultyColor(tutorial.difficulty)}
                                  >
                                    {tutorial.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              {tutorial.completed && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {tutorial.title}
                            </CardTitle>
                            <CardDescription>{tutorial.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                {tutorial.duration}
                                <TypeIcon className="w-4 h-4 ml-3 mr-1" />
                                {tutorial.type}
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Track Your Progress
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign up to save your progress, earn certificates, and unlock advanced tutorials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="w-5 h-5 mr-2" />
                Create Account
              </Button>
              <Button size="lg" variant="outline">
                <Star className="w-5 h-5 mr-2" />
                View Certificates
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default Tutorials;
