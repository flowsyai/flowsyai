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
import {
  FileText,
  Shield,
  CreditCard,
  Users,
  AlertTriangle,
  Scale,
  Mail,
  Calendar,
  CheckCircle,
} from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="w-6 h-6" />,
      content: [
        'By accessing or using AI Flow, you agree to be bound by these Terms of Service',
        'If you do not agree to these terms, you may not use our service',
        'These terms apply to all users, including visitors, registered users, and premium subscribers',
        'You must be at least 18 years old to use our service',
        'If you are using our service on behalf of an organization, you represent that you have authority to bind that organization',
      ],
    },
    {
      id: 'service-description',
      title: 'Service Description',
      icon: <FileText className="w-6 h-6" />,
      content: [
        'AI Flow provides a platform for creating, managing, and deploying AI-powered workflows',
        'Our service includes workflow builders, AI integrations, templates, and analytics',
        'We offer both free and premium subscription tiers with different feature sets',
        'Service availability and features may vary by subscription plan',
        'We reserve the right to modify or discontinue features with reasonable notice',
      ],
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Responsibilities',
      icon: <Users className="w-6 h-6" />,
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You must provide accurate and complete information when creating your account',
        'You are responsible for all activities that occur under your account',
        'You must notify us immediately of any unauthorized use of your account',
        'You may not share your account or allow others to use your credentials',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      icon: <Shield className="w-6 h-6" />,
      content: [
        'You may not use our service for any illegal or unauthorized purpose',
        'You may not create workflows that violate applicable laws or regulations',
        "You may not attempt to gain unauthorized access to our systems or other users' data",
        'You may not use our service to send spam, malware, or other harmful content',
        'You may not reverse engineer, decompile, or attempt to extract our source code',
      ],
    },
    {
      id: 'payment-terms',
      title: 'Payment and Billing',
      icon: <CreditCard className="w-6 h-6" />,
      content: [
        'Premium features require a paid subscription with monthly or annual billing',
        'All fees are non-refundable except as required by law',
        "We may change our pricing with 30 days' notice to existing subscribers",
        'Your subscription will automatically renew unless cancelled before the renewal date',
        'We reserve the right to suspend service for non-payment after reasonable notice',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <Scale className="w-6 h-6" />,
      content: [
        'AI Flow and its original content, features, and functionality are owned by us',
        'You retain ownership of the workflows and data you create using our platform',
        'You grant us a license to host, store, and process your content to provide our service',
        'You may not use our trademarks, logos, or branding without written permission',
        'We respect intellectual property rights and expect users to do the same',
      ],
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        'Our service is provided "as is" without warranties of any kind',
        'We are not liable for any indirect, incidental, or consequential damages',
        'Our total liability is limited to the amount you paid for our service in the past 12 months',
        'We do not guarantee uninterrupted or error-free service',
        'You use our service at your own risk and are responsible for your workflows and their outcomes',
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
              Terms of Service
            </MotionH1>
            <MotionP
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              These terms govern your use of AI Flow and outline the rights and responsibilities of
              both parties.
            </MotionP>
            <MotionDiv
              className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Effective date: January 15, 2025
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Questions? Contact legal@aiflow.com
              </div>
            </MotionDiv>
          </div>

          {/* Terms Sections */}
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

            {/* Additional Terms */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Additional Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Termination</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Either party may terminate this agreement at any time. Upon termination, your
                      access to the service will cease, and we may delete your data according to our
                      data retention policy. You remain responsible for any outstanding fees.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Governing Law</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      These terms are governed by the laws of the State of California, United
                      States. Any disputes will be resolved in the courts of San Francisco County,
                      California.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Modifications</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We may modify these terms at any time. We will provide notice of material
                      changes via email or through our platform. Your continued use of the service
                      after such modifications constitutes acceptance of the updated terms.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Severability</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      If any provision of these terms is found to be unenforceable, the remaining
                      provisions will continue in full force and effect.
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
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Questions About These Terms?</CardTitle>
                  <CardDescription>
                    If you have any questions about these Terms of Service, please contact us.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Legal Team
                      </h4>
                      <p className="text-muted-foreground">legal@aiflow.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For terms and legal inquiries
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        General Support
                      </h4>
                      <p className="text-muted-foreground">support@aiflow.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For general questions and support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Agreement Notice */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="premium-card bg-card/80 backdrop-blur-lg border border-border-alt shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Agreement Acknowledgment</h3>
                  <p className="text-muted-foreground">
                    By using AI Flow, you acknowledge that you have read, understood, and agree to
                    be bound by these Terms of Service. These terms constitute a legally binding
                    agreement between you and AI Flow Inc.
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

export default Terms;
