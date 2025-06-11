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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, UserCheck, Globe, Mail, Calendar } from 'lucide-react';

const Privacy: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: [
        'Personal information you provide when creating an account (name, email, company)',
        'Usage data and analytics to improve our service',
        'Workflow data and configurations you create within our platform',
        'Communication preferences and support interactions',
        'Device and browser information for security and optimization',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        'Provide and maintain our AI workflow platform',
        'Process your workflows and deliver requested services',
        'Send important updates about your account and our service',
        'Improve our platform based on usage patterns and feedback',
        'Ensure security and prevent fraudulent activities',
      ],
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing and Disclosure',
      icon: <Globe className="w-6 h-6" />,
      content: [
        'We do not sell your personal information to third parties',
        'Data may be shared with trusted service providers who assist in platform operations',
        'Information may be disclosed if required by law or to protect our rights',
        'Aggregated, anonymized data may be used for research and analytics',
        'Your workflow data remains private and is not shared without explicit consent',
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        'Industry-standard encryption for data in transit and at rest',
        'Regular security audits and penetration testing',
        'Multi-factor authentication and access controls',
        'Secure data centers with 24/7 monitoring',
        'Employee training on data protection and privacy practices',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <Eye className="w-6 h-6" />,
      content: [
        'Access and review your personal information',
        'Request correction of inaccurate data',
        'Delete your account and associated data',
        'Export your workflow data in a portable format',
        'Opt-out of non-essential communications',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: <Shield className="w-6 h-6" />,
      content: [
        'Essential cookies for platform functionality',
        'Analytics cookies to understand usage patterns (with your consent)',
        'Preference cookies to remember your settings',
        'You can control cookie preferences in your browser settings',
        'No tracking across unrelated websites or services',
      ],
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
              Privacy Policy
            </MotionH1>
            <MotionP
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect
              your information when you use AI Flow.
            </MotionP>
            <MotionDiv
              className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last updated: January 15, 2025
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Questions? Contact privacy@aiflow.com
              </div>
            </MotionDiv>
          </div>

          {/* Privacy Sections */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <MotionDiv
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="text-primary">{section.icon}</div>
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}

            {/* Additional Information */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Data Retention and International Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Data Retention</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your personal information for as long as necessary to provide our
                      services and comply with legal obligations. Workflow data is retained
                      according to your subscription plan. You can request deletion of your data at
                      any time.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">International Data Transfers</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Your data may be processed in countries other than your own. We ensure
                      appropriate safeguards are in place to protect your information in accordance
                      with applicable data protection laws.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Children's Privacy</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our service is not intended for children under 13. We do not knowingly collect
                      personal information from children. If you believe we have collected
                      information from a child, please contact us immediately.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Contact Information */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Us About Privacy</CardTitle>
                  <CardDescription>
                    If you have questions about this privacy policy or our data practices, we're
                    here to help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email Us
                      </h4>
                      <p className="text-muted-foreground">privacy@aiflow.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We respond within 48 hours
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Data Protection Officer
                      </h4>
                      <p className="text-muted-foreground">dpo@aiflow.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For GDPR and data protection inquiries
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Policy Updates */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Policy Updates</h3>
                  <p className="text-muted-foreground">
                    We may update this privacy policy from time to time. We will notify you of any
                    material changes by email or through our platform. Your continued use of our
                    service after such modifications constitutes acceptance of the updated policy.
                  </p>
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Privacy;
