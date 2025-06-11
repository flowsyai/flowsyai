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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
  Globe,
  Headphones,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'Use the contact form below',
      action: 'Send Message',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Available during business hours',
      action: 'Start Chat',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Business Inquiries',
      description: 'Discuss enterprise solutions',
      contact: 'Use the contact form for business matters',
      action: 'Contact Team',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Community Support',
      description: 'Join our community channels',
      contact: 'Discord & Telegram available',
      action: 'Join Community',
    },
  ];

  const supportChannels = [
    {
      name: 'Documentation',
      description: 'Comprehensive guides and tutorials',
      availability: 'Available 24/7',
      icon: <Building className="w-5 h-5" />,
    },
    {
      name: 'Community Forum',
      description: 'Connect with other users',
      availability: 'Community moderated',
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: 'Video Tutorials',
      description: 'Step-by-step video guides',
      availability: 'On-demand access',
      icon: <Globe className="w-5 h-5" />,
    },
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
          className="w-full px-4 sm:px-6 lg:px-8 py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <MotionH1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Contact Us
            </MotionH1>
            <MotionP
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions about AI Flow? We're here to help. Reach out to our team and we'll get
              back to you as soon as possible.
            </MotionP>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {method.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                    <p className="text-primary font-medium mb-4">{method.contact}</p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={e => handleInputChange('name', e.target.value)}
                            className="bg-background/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={e => handleInputChange('email', e.target.value)}
                            className="bg-background/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={e => handleInputChange('company', e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiry-type">Inquiry Type</Label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={value => handleInputChange('inquiryType', value)}
                          >
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="press">Press & Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={e => handleInputChange('subject', e.target.value)}
                          className="bg-background/50"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={e => handleInputChange('message', e.target.value)}
                          rows={6}
                          className="bg-background/50"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </MotionDiv>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Business Hours */}
                <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span>Business Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekend</span>
                      <span>Limited Support</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span>Within 24 hours</span>
                    </div>
                    <div className="pt-2 border-t border-border-alt">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Headphones className="w-4 h-4" />
                        Community Support Always Available
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Support Resources */}
                <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-primary" />
                      Support Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {supportChannels.map((channel, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2">
                          {channel.icon}
                          <h4 className="font-semibold">{channel.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                        <p className="text-sm text-primary">{channel.availability}</p>
                        {index < supportChannels.length - 1 && (
                          <div className="border-b border-border-alt pt-2" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Contact;
