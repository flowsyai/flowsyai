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
  Users,
  Share2,
  MessageSquare,
  GitBranch,
  Clock,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  UserPlus,
  Crown,
  Shield,
  CheckCircle,
  AlertCircle,
  Calendar,
  Bell,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  lastActive: string;
  status: 'online' | 'offline' | 'away';
}

interface SharedWorkflow {
  id: string;
  name: string;
  description: string;
  owner: TeamMember;
  collaborators: TeamMember[];
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
  permissions: 'view' | 'edit' | 'admin';
  comments: number;
  versions: number;
}

interface WorkflowComment {
  id: string;
  author: TeamMember;
  content: string;
  timestamp: string;
  nodeId?: string;
  resolved: boolean;
  replies: WorkflowComment[];
}

const WorkflowCollaboration: React.FC = () => {
  const { user } = useAuth();
  const [sharedWorkflows, setSharedWorkflows] = useState<SharedWorkflow[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('viewer');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCollaborationData();
  }, []);

  const loadCollaborationData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockTeamMembers: TeamMember[] = [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@company.com',
          avatar: '/avatars/alice.jpg',
          role: 'owner',
          lastActive: '2024-01-15T10:30:00Z',
          status: 'online',
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@company.com',
          avatar: '/avatars/bob.jpg',
          role: 'admin',
          lastActive: '2024-01-15T09:45:00Z',
          status: 'online',
        },
        {
          id: '3',
          name: 'Carol Davis',
          email: 'carol@company.com',
          role: 'editor',
          lastActive: '2024-01-14T16:20:00Z',
          status: 'away',
        },
        {
          id: '4',
          name: 'David Wilson',
          email: 'david@company.com',
          role: 'viewer',
          lastActive: '2024-01-13T14:15:00Z',
          status: 'offline',
        },
      ];

      const mockSharedWorkflows: SharedWorkflow[] = [
        {
          id: '1',
          name: 'Customer Support Automation',
          description: 'Automated customer inquiry handling with sentiment analysis',
          owner: mockTeamMembers[0],
          collaborators: [mockTeamMembers[1], mockTeamMembers[2]],
          lastModified: '2024-01-15T11:30:00Z',
          status: 'active',
          permissions: 'edit',
          comments: 5,
          versions: 12,
        },
        {
          id: '2',
          name: 'Content Generation Pipeline',
          description: 'Multi-platform content creation and distribution',
          owner: mockTeamMembers[1],
          collaborators: [mockTeamMembers[0], mockTeamMembers[2], mockTeamMembers[3]],
          lastModified: '2024-01-14T15:45:00Z',
          status: 'draft',
          permissions: 'view',
          comments: 8,
          versions: 7,
        },
        {
          id: '3',
          name: 'Data Processing Workflow',
          description: 'Automated data analysis and reporting system',
          owner: mockTeamMembers[2],
          collaborators: [mockTeamMembers[0]],
          lastModified: '2024-01-13T09:20:00Z',
          status: 'active',
          permissions: 'admin',
          comments: 3,
          versions: 15,
        },
      ];

      setTeamMembers(mockTeamMembers);
      setSharedWorkflows(mockSharedWorkflows);
    } catch (error) {
      toast.error('Failed to load collaboration data');
      console.error('Error loading collaboration data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteTeamMember = async () => {
    if (!inviteEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setShowInviteDialog(false);
    } catch (error) {
      toast.error('Failed to send invitation');
    }
  };

  const getRoleIcon = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'editor':
        return <Edit className="w-4 h-4 text-green-500" />;
      case 'viewer':
        return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
    }
  };

  const getPermissionsBadge = (permissions: SharedWorkflow['permissions']) => {
    const variants = {
      view: 'secondary',
      edit: 'default',
      admin: 'destructive',
    } as const;

    return <Badge variant={variants[permissions]}>{permissions}</Badge>;
  };

  const filteredWorkflows = sharedWorkflows.filter(
    workflow =>
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeamMembers = teamMembers.filter(
    member => filterRole === 'all' || member.role === filterRole
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
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
              <h1 className="text-3xl font-bold mb-2">Team Collaboration</h1>
              <p className="text-muted-foreground">Work together on AI workflows with your team</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>

              <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to a new team member to collaborate on workflows.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        placeholder="colleague@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={inviteRole}
                        onValueChange={(value: TeamMember['role']) => setInviteRole(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer - Can view workflows</SelectItem>
                          <SelectItem value="editor">Editor - Can edit workflows</SelectItem>
                          <SelectItem value="admin">Admin - Can manage team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleInviteTeamMember}>Send Invitation</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflows">Shared Workflows</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workflows</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Workflows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow, index) => (
                <MotionDiv
                  key={workflow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-1">{workflow.name}</CardTitle>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {workflow.description}
                          </p>
                        </div>
                        {getPermissionsBadge(workflow.permissions)}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Owner and Collaborators */}
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={workflow.owner.avatar} />
                            <AvatarFallback className="text-xs">
                              {workflow.owner.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{workflow.owner.name}</span>
                          {workflow.collaborators.length > 0 && (
                            <>
                              <span className="text-muted-foreground">+</span>
                              <div className="flex -space-x-1">
                                {workflow.collaborators.slice(0, 3).map(collaborator => (
                                  <Avatar
                                    key={collaborator.id}
                                    className="w-6 h-6 border-2 border-background"
                                  >
                                    <AvatarImage src={collaborator.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {collaborator.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {workflow.collaborators.length > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                                    +{workflow.collaborators.length - 3}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Status and Stats */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{workflow.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitBranch className="w-4 h-4" />
                              <span>v{workflow.versions}</span>
                            </div>
                          </div>
                          <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                            {workflow.status}
                          </Badge>
                        </div>

                        {/* Last Modified */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>
                            Modified {new Date(workflow.lastModified).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Filters */}
            <div className="flex items-center gap-4">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="owner">Owners</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="editor">Editors</SelectItem>
                  <SelectItem value="viewer">Viewers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeamMembers.map((member, index) => (
                <MotionDiv
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(' ')
                                .map(n => n.charAt(0))
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{member.name}</h3>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {member.role} • {member.status}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 text-xs text-muted-foreground">
                        Last active: {new Date(member.lastActive).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: 'Alice Johnson',
                      action: 'updated',
                      target: 'Customer Support Automation',
                      time: '2 hours ago',
                      type: 'edit',
                    },
                    {
                      user: 'Bob Smith',
                      action: 'commented on',
                      target: 'Content Generation Pipeline',
                      time: '4 hours ago',
                      type: 'comment',
                    },
                    {
                      user: 'Carol Davis',
                      action: 'created',
                      target: 'Data Processing Workflow',
                      time: '1 day ago',
                      type: 'create',
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkflowCollaboration;
