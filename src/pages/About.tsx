import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Target,
  Lightbulb,
  Award,
  Globe,
  Heart,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former AI researcher at Google with 10+ years in machine learning and automation.',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Microsoft engineer specializing in distributed systems and AI infrastructure.',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'David Rodriguez',
      role: 'Head of Product',
      bio: 'Product leader with experience at Slack and Notion, passionate about user experience.',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'Emily Zhang',
      role: 'Head of AI Research',
      bio: 'PhD in Computer Science from Stanford, published researcher in neural networks.',
      image: '/api/placeholder/150/150',
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation First',
      description: "We push the boundaries of what's possible with AI and automation technology.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User-Centric',
      description:
        "Every feature we build is designed with our users' success and productivity in mind.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Ethical AI',
      description:
        'We believe in responsible AI development that benefits humanity and respects privacy.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Impact',
      description:
        'Our mission is to democratize AI and make it accessible to businesses worldwide.',
    },
  ];

  const milestones = [
    { year: '2022', event: 'Company founded with $2M seed funding' },
    { year: '2023', event: 'Launched beta platform with 1,000+ early adopters' },
    { year: '2024', event: 'Series A funding of $15M, reached 10,000+ users' },
    { year: '2025', event: 'FlowsyAI launch and global expansion' },
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
        <motion.div
          className="w-full px-4 sm:px-6 lg:px-8 py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About FlowsyAI
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're on a mission to democratize AI and make intelligent automation accessible to
              everyone. Our platform empowers businesses to build, deploy, and scale AI workflows
              without complexity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-8 py-6 text-lg"
                asChild
              >
                <Link to="/auth">
                  Join Our Mission <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower every business with the tools they need to harness the power of
                    artificial intelligence. We believe that AI should be accessible, intuitive, and
                    transformative for organizations of all sizes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sapphire to-primary flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where intelligent automation enhances human creativity and productivity.
                    We envision a future where AI workflows are as easy to create as documents,
                    enabling unprecedented innovation across industries.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <div className="text-primary">{value.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Journey
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-center mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center text-background font-bold text-lg flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="bg-card/80 backdrop-blur-lg border border-border-alt rounded-lg p-4">
                      <p className="text-foreground">{milestone.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Meet Our Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl text-center">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-gold/20 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of companies already using FlowsyAI to automate their workflows and
                  boost productivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    asChild
                  >
                    <Link to="/auth">
                      Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
