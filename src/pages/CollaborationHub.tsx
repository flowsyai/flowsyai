import React, { useState, useEffect } from 'react';
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

import {
  Users,
  MessageSquare,
  Video,
  Share2,
  UserPlus,
  Crown,
  Eye,
  Edit3,
  Clock,
  Zap,
  Brain,
  Workflow,
  Bot,
  Play,
  Pause,
  MoreHorizontal,
  Bell,
  Settings,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Globe,
  Lock,
  Copy,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const CollaborationHub: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [collaborationData, setCollaborationData] = useState({
    activeProjects: [
      {
        id: 1,
        name: 'E-commerce Automation',
        description: 'Complete automation pipeline for online store',
        collaborators: [
          {
            id: 1,
            name: 'Alex Johnson',
            avatar: '',
            role: 'Owner',
            status: 'online',
            lastSeen: 'now',
          },
          {
            id: 2,
            name: 'Sarah Chen',
            avatar: '',
            role: 'Editor',
            status: 'online',
            lastSeen: '2 min ago',
          },
          {
            id: 3,
            name: 'Mike Wilson',
            avatar: '',
            role: 'Viewer',
            status: 'offline',
            lastSeen: '1 hour ago',
          },
        ],
        status: 'active',
        lastActivity: '5 minutes ago',
        progress: 75,
        isPublic: false,
      },
      {
        id: 2,
        name: 'Content Generation Pipeline',
        description: 'AI-powered content creation workflow',
        collaborators: [
          {
            id: 1,
            name: 'Alex Johnson',
            avatar: '',
            role: 'Owner',
            status: 'online',
            lastSeen: 'now',
          },
          {
            id: 4,
            name: 'Emma Davis',
            avatar: '',
            role: 'Editor',
            status: 'online',
            lastSeen: 'now',
          },
        ],
        status: 'active',
        lastActivity: '1 hour ago',
        progress: 45,
        isPublic: true,
      },
    ],
    recentActivity: [
      {
        id: 1,
        user: 'Sarah Chen',
        action: 'modified workflow node',
        target: 'Data Processor',
        time: '2 minutes ago',
        type: 'edit',
      },
      {
        id: 2,
        user: 'Mike Wilson',
        action: 'commented on',
        target: 'Email Automation',
        time: '15 minutes ago',
        type: 'comment',
      },
      {
        id: 3,
        user: 'Emma Davis',
        action: 'joined project',
        target: 'Content Generation Pipeline',
        time: '1 hour ago',
        type: 'join',
      },
    ],
    liveCollaborators: [
      { id: 1, name: 'Sarah Chen', avatar: '', cursor: { x: 45, y: 30 }, color: '#8B5CF6' },
      { id: 2, name: 'Emma Davis', avatar: '', cursor: { x: 70, y: 60 }, color: '#10B981' },
    ],
  });

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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const tabs = [
    { id: 'projects', label: 'Active Projects', icon: Workflow },
    { id: 'activity', label: 'Recent Activity', icon: Clock },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'settings', label: 'Collaboration Settings', icon: Settings },
  ];

  const handleInviteUser = () => {
    toast.success('Invitation sent successfully!');
    setShowInviteModal(false);
  };

  const handleJoinLiveSession = (projectId: number) => {
    toast.info(`Joining live collaboration session for project ${projectId}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-gold/10 text-gold border-gold/20';
      case 'Editor':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Viewer':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <MotionDiv
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Collaboration Hub</h1>
              <p className="text-muted-foreground">
                Work together in real-time on AI workflows and projects
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowInviteModal(true)}
                className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Collaborator
              </Button>
              <Button variant="outline" onClick={() => toast.info('Live session starting...')}>
                <Video className="h-4 w-4 mr-2" />
                Start Live Session
              </Button>
            </div>
          </MotionDiv>

          {/* Live Collaborators Indicator */}
          <MotionDiv variants={itemVariants}>
            <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-foreground">
                        Live Collaboration
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {collaborationData.liveCollaborators.map(collaborator => (
                        <div key={collaborator.id} className="relative">
                          <Avatar className="h-8 w-8 border-2 border-background">
                            <AvatarFallback
                              className="text-xs"
                              style={{
                                backgroundColor: collaborator.color + '20',
                                color: collaborator.color,
                              }}
                            >
                              {collaborator.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              backgroundColor: collaborator.color,
                              top: `${collaborator.cursor.y}%`,
                              left: `${collaborator.cursor.x}%`,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500">
                    {collaborationData.liveCollaborators.length} active
                  </Badge>
                </div>
              </div>
            </GlassCard>
          </MotionDiv>

          {/* Navigation Tabs */}
          <MotionDiv variants={itemVariants}>
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 ${activeTab === tab.id ? 'bg-primary' : ''}`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </MotionDiv>

          {/* Content based on active tab */}
          <SafeAnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <MotionDiv
                key="projects"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {collaborationData.activeProjects.map(project => (
                    <GlassCard
                      key={project.id}
                      className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                              {project.isPublic ? (
                                <Globe className="h-4 w-4 text-primary" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Last activity: {project.lastActivity}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-background/50 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-sapphire h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Collaborators */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                              Collaborators
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {project.collaborators.length} members
                            </span>
                          </div>
                          <div className="flex -space-x-2">
                            {project.collaborators.slice(0, 4).map(collaborator => (
                              <div key={collaborator.id} className="relative group">
                                <Avatar className="h-8 w-8 border-2 border-background">
                                  <AvatarFallback className="text-xs">
                                    {collaborator.name
                                      .split(' ')
                                      .map(n => n[0])
                                      .join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(collaborator.status)} rounded-full border border-background`}
                                ></div>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-border-alt rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {collaborator.name} ({collaborator.role})
                                </div>
                              </div>
                            ))}
                            {project.collaborators.length > 4 && (
                              <div className="flex items-center justify-center h-8 w-8 bg-muted/20 border-2 border-background rounded-full text-xs text-muted-foreground">
                                +{project.collaborators.length - 4}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleJoinLiveSession(project.id)}
                          >
                            <Play className="mr-2 h-3 w-3" />
                            Join Session
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Share2 className="mr-2 h-3 w-3" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </MotionDiv>
            )}

            {activeTab === 'activity' && (
              <MotionDiv
                key="activity"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {collaborationData.recentActivity.map(activity => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-4 p-3 bg-background/30 rounded-lg"
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              activity.type === 'edit'
                                ? 'bg-blue-500/10'
                                : activity.type === 'comment'
                                  ? 'bg-green-500/10'
                                  : 'bg-purple-500/10'
                            }`}
                          >
                            {activity.type === 'edit' && (
                              <Edit3 className="h-4 w-4 text-blue-500" />
                            )}
                            {activity.type === 'comment' && (
                              <MessageSquare className="h-4 w-4 text-green-500" />
                            )}
                            {activity.type === 'join' && (
                              <UserPlus className="h-4 w-4 text-purple-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">
                              <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            )}

            {activeTab === 'team' && (
              <MotionDiv
                key="team"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-foreground">Team Members</h3>
                      <Button onClick={() => setShowInviteModal(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite Member
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {collaborationData.activeProjects
                        .flatMap(project => project.collaborators)
                        .filter(
                          (collaborator, index, self) =>
                            index === self.findIndex(c => c.id === collaborator.id)
                        )
                        .map(collaborator => (
                          <div
                            key={collaborator.id}
                            className="flex items-center justify-between p-4 bg-background/30 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback>
                                    {collaborator.name
                                      .split(' ')
                                      .map(n => n[0])
                                      .join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(collaborator.status)} rounded-full border-2 border-background`}
                                ></div>
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{collaborator.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Last seen: {collaborator.lastSeen}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={getRoleColor(collaborator.role)}>
                                {collaborator.role}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            )}

            {activeTab === 'settings' && (
              <MotionDiv
                key="settings"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <GlassCard className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-6">
                      Collaboration Settings
                    </h3>
                    <div className="space-y-6">
                      <div className="p-4 bg-background/30 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Default Permissions</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Set default access levels for new collaborators
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <Eye className="h-4 w-4 mr-2" />
                            Viewer Access
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editor Access
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-background/30 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Notifications</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Configure collaboration notifications
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">Real-time updates</span>
                            <Button variant="outline" size="sm">
                              Enable
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">Email notifications</span>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            )}
          </SafeAnimatePresence>

          {/* Invite Modal */}
          <SafeAnimatePresence>
            {showInviteModal && (
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
                onClick={() => setShowInviteModal(false)}
              >
                <MotionDiv
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="premium-card bg-card border border-border-alt rounded-2xl shadow-2xl max-w-md w-full p-6"
                  onClick={e => e.stopPropagation()}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Invite Collaborator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address
                      </label>
                      <Input placeholder="colleague@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Role</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Viewer
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Editor
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Admin
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Message (Optional)
                      </label>
                      <Textarea placeholder="Join me in working on this project..." rows={3} />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleInviteUser} className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Invite
                    </Button>
                  </div>
                </MotionDiv>
              </MotionDiv>
            )}
          </SafeAnimatePresence>
        </MotionDiv>
      </div>
    </div>
  );
};

export default CollaborationHub;
