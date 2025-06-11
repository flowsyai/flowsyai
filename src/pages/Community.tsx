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
  Users,
  MessageSquare,
  Heart,
  Star,
  Trophy,
  Zap,
  ArrowRight,
  Calendar,
  MapPin,
  ExternalLink,
  Github,
  Twitter,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Code,
  Rocket,
  Globe,
  Award,
  TrendingUp,
  Clock,
  User,
  ThumbsUp,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

const Community = () => {
  const communityStats = [
    { label: 'Active Members', value: '12,500+', icon: Users, color: 'text-blue-500' },
    { label: 'Workflows Shared', value: '3,200+', icon: Zap, color: 'text-green-500' },
    { label: 'Questions Answered', value: '8,900+', icon: MessageSquare, color: 'text-purple-500' },
    { label: 'Community Events', value: '150+', icon: Calendar, color: 'text-orange-500' },
  ];

  const communityChannels = [
    {
      name: 'Discord Server',
      description: 'Real-time chat, voice channels, and instant help from the community',
      members: '8,500+',
      icon: MessageCircle,
      color: 'bg-indigo-500',
      link: '#discord',
      features: ['24/7 Support', 'Voice Channels', 'Screen Sharing', 'Bot Assistance'],
    },
    {
      name: 'GitHub Discussions',
      description: 'Technical discussions, feature requests, and open-source contributions',
      members: '2,100+',
      icon: Github,
      color: 'bg-gray-800',
      link: '#github',
      features: ['Code Reviews', 'Bug Reports', 'Feature Requests', 'Open Source'],
    },
    {
      name: 'Reddit Community',
      description: 'Share workflows, get feedback, and discover community creations',
      members: '5,200+',
      icon: MessageSquare,
      color: 'bg-orange-600',
      link: '#reddit',
      features: ['Workflow Showcase', 'Tips & Tricks', 'Weekly Challenges', 'AMAs'],
    },
    {
      name: 'Twitter/X',
      description: 'Latest updates, quick tips, and community highlights',
      members: '15,800+',
      icon: Twitter,
      color: 'bg-blue-500',
      link: '#twitter',
      features: ['Daily Tips', 'Product Updates', 'Community Spotlights', 'Live Events'],
    },
  ];

  const featuredPosts = [
    {
      title: 'Building a Customer Support AI Agent',
      author: 'Sarah Chen',
      avatar: '👩‍💻',
      category: 'Tutorial',
      likes: 234,
      replies: 45,
      time: '2 hours ago',
      tags: ['AI', 'Customer Support', 'Automation'],
    },
    {
      title: 'Monthly Workflow Challenge: E-commerce Automation',
      author: 'Community Team',
      avatar: '🏆',
      category: 'Challenge',
      likes: 189,
      replies: 67,
      time: '1 day ago',
      tags: ['Challenge', 'E-commerce', 'Prize'],
    },
    {
      title: 'How I Automated My Entire Content Pipeline',
      author: 'Mike Rodriguez',
      avatar: '🚀',
      category: 'Success Story',
      likes: 456,
      replies: 89,
      time: '3 days ago',
      tags: ['Content', 'Pipeline', 'Success'],
    },
    {
      title: 'New AR Features Preview - Beta Testing',
      author: 'Dev Team',
      avatar: '🔬',
      category: 'Announcement',
      likes: 678,
      replies: 123,
      time: '1 week ago',
      tags: ['AR', 'Beta', 'Features'],
    },
  ];

  const upcomingEvents = [
    {
      title: 'AI Workflow Masterclass',
      date: 'Dec 15, 2024',
      time: '2:00 PM EST',
      type: 'Webinar',
      attendees: 450,
      speaker: 'Dr. Alex Thompson',
    },
    {
      title: 'Community Hackathon',
      date: 'Dec 20-22, 2024',
      time: '48 Hours',
      type: 'Competition',
      attendees: 200,
      speaker: 'Community',
    },
    {
      title: 'Monthly Show & Tell',
      date: 'Dec 28, 2024',
      time: '7:00 PM EST',
      type: 'Showcase',
      attendees: 300,
      speaker: 'Community Members',
    },
  ];

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
              <Users className="w-4 h-4 mr-2" />
              Join the Community
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Connect, Learn &<span className="text-primary"> Build Together</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of AI workflow enthusiasts, share your creations, get help from
              experts, and collaborate on the future of automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discord
              </Button>
              <Button size="lg" variant="outline">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center p-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Community Channels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred platform to connect with fellow AI workflow builders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {communityChannels.map((channel, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${channel.color} mr-4`}>
                          <channel.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {channel.name}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {channel.members} members
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardDescription className="mt-3">{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {channel.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Join {channel.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Community Highlights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Latest discussions, tutorials, and success stories from our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{post.avatar}</div>
                        <div>
                          <div className="font-medium text-foreground">{post.author}</div>
                          <div className="text-sm text-muted-foreground">{post.time}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors mt-3">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.replies}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">
              Join our community events, workshops, and competitions
            </p>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.attendees} attending
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">
                        Register
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
