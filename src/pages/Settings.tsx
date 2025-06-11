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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Key,
  Palette,
  Save,
  Crown,
  Brain,
  Mic,
  Layout,
  CreditCard,
  BarChart3,
  CloudCog,
  Plug,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const handleSaveSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your settings have been successfully updated.',
    });
  };

  const settingsTabs = [
    {
      id: 'general',
      label: 'General',
      icon: SettingsIcon,
      description: 'Basic workspace settings',
    },
    { id: 'account', label: 'Account', icon: User, description: 'Profile and preferences' },
    {
      id: 'ai-features',
      label: 'AI Features',
      icon: Brain,
      description: 'Revolutionary AI tools',
      premium: true,
    },
    {
      id: 'voice',
      label: 'Voice Commands',
      icon: Mic,
      description: 'Voice control settings',
      premium: true,
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: Layout,
      description: 'Workflow templates',
      premium: true,
    },
    { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Subscription & payments' },
    { id: 'api', label: 'API Keys', icon: Key, description: 'Developer access' },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Performance insights',
      premium: true,
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Plug,
      description: 'Third-party connections',
    },
    { id: 'security', label: 'Security', icon: Shield, description: 'Privacy & protection' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts & updates' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme & display' },
  ];

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
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center">
                <Crown className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-muted-foreground">Configure your AI workspace</p>
              </div>
            </div>
          </div>

          {/* Settings Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="xl:col-span-1">
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Settings Menu</CardTitle>
                  <CardDescription>Choose a category to configure</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {settingsTabs.map(tab => (
                      <MotionButton
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-primary to-sapphire text-background shadow-lg'
                            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                        } ${tab.premium ? 'border border-gold/20' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`p-1.5 rounded-md ${
                            activeTab === tab.id
                              ? 'bg-background/20'
                              : tab.premium
                                ? 'bg-gold/20'
                                : 'bg-primary/20'
                          }`}
                        >
                          <tab.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{tab.label}</span>
                            {tab.premium && <Crown className="w-3 h-3 text-gold" />}
                          </div>
                          <div
                            className={`text-xs ${
                              activeTab === tab.id ? 'text-background/80' : 'text-muted-foreground'
                            }`}
                          >
                            {tab.description}
                          </div>
                        </div>
                        {tab.premium && (
                          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        )}
                      </MotionButton>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="xl:col-span-3">
              <MotionDiv
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'general' && (
                  <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl">General Settings</CardTitle>
                      <CardDescription>
                        Configure the basic settings for your AI workspace
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="workspace-name">Workspace Name</Label>
                          <Input
                            id="workspace-name"
                            defaultValue="My AI Workspace"
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Default Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="ro">Romanian</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workspace-desc">Workspace Description</Label>
                        <Textarea
                          id="workspace-desc"
                          defaultValue="A workspace for building AI-powered applications"
                          rows={3}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable dark mode for your workspace
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveSettings}
                          className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/20"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'account' && (
                  <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl">Account Settings</CardTitle>
                      <CardDescription>Manage your profile and account preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="John" className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="Doe" className="bg-background/50" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="user@example.com"
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">Eastern Time</SelectItem>
                            <SelectItem value="pst">Pacific Time</SelectItem>
                            <SelectItem value="eet">Eastern European Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveSettings}
                          className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/20"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Update Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Placeholder for other tabs */}
                {activeTab !== 'general' && activeTab !== 'account' && (
                  <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {settingsTabs.find(tab => tab.id === activeTab)?.premium && (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-primary flex items-center justify-center">
                            <Crown className="w-5 h-5 text-background" />
                          </div>
                        )}
                        {settingsTabs.find(tab => tab.id === activeTab)?.label}
                        {settingsTabs.find(tab => tab.id === activeTab)?.premium && (
                          <span className="text-sm bg-gold/20 text-gold px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {settingsTabs.find(tab => tab.id === activeTab)?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          {React.createElement(
                            settingsTabs.find(tab => tab.id === activeTab)?.icon || SettingsIcon,
                            {
                              className: 'w-8 h-8 text-primary',
                            }
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground mb-6">
                          This settings section is currently under development.
                        </p>
                        {settingsTabs.find(tab => tab.id === activeTab)?.premium && (
                          <Button
                            onClick={() => (window.location.href = '/billing')}
                            className="bg-gradient-to-r from-gold to-primary text-background hover:shadow-lg hover:shadow-gold/20"
                          >
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

export default Settings;
