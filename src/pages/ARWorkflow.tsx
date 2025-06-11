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

import { ArrowLeft, Smartphone, Camera, Zap, Brain, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ARWorkflowInterface from '@/components/ar/ARWorkflowInterface';

const ARWorkflow: React.FC = () => {
  const [showAR, setShowAR] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (showAR) {
    return <ARWorkflowInterface />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-gold rounded-2xl flex items-center justify-center">
              <Camera className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block text-foreground">AR Workflow</span>
              <span className="block bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
                Studio
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of workflow building. Use your mobile camera to visualize,
              create, and manipulate AI workflows in 3D space with intuitive gesture controls.
            </p>
          </MotionDiv>

          {/* Features Grid */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                icon: Camera,
                title: 'AR Visualization',
                description: 'See your workflows in 3D space using your mobile camera',
                color: 'from-gold to-gold-light',
              },
              {
                icon: Zap,
                title: 'Gesture Controls',
                description: 'Drag, rotate, and scale workflow nodes with finger gestures',
                color: 'from-primary to-sapphire',
              },
              {
                icon: Brain,
                title: 'Real AI Integration',
                description: 'Connect to live AI services and see actual results',
                color: 'from-emerald to-emerald-light',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </MotionDiv>

          {/* Device Check and Launch */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8"
          >
            {isMobile ? (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald to-emerald-light rounded-xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Perfect! You're on Mobile
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your device is optimized for the AR experience. Launch the AR Studio to start
                  building workflows in 3D space.
                </p>
                <Button
                  size="lg"
                  onClick={() => setShowAR(true)}
                  className="bg-gradient-to-r from-primary via-sapphire to-primary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-8 py-6 text-lg"
                >
                  <Camera className="mr-2 h-6 w-6" />
                  Launch AR Experience
                </Button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ruby to-ruby-light rounded-xl flex items-center justify-center">
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Mobile Device Required</h3>
                <p className="text-muted-foreground mb-6">
                  The AR Workflow Studio requires a mobile device with camera access for the best
                  experience. Please visit this page on your smartphone or tablet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setShowAR(true)}
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg"
                  >
                    Try Demo Mode
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-gold via-gold-light to-gold text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 px-8 py-6 text-lg"
                  >
                    <Link to="/workflow-builder">
                      <Zap className="mr-2 h-6 w-6" />
                      Use Web Studio
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </MotionDiv>

          {/* Instructions */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-left max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">How to Use AR Studio:</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </div>
                <p>Grant camera permission when prompted</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <p>Point your camera at a flat surface (table, floor, etc.)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <p>Tap to add AI workflow nodes from the bottom palette</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  4
                </div>
                <p>Use gestures to move, rotate, and scale nodes in 3D space</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  5
                </div>
                <p>Connect nodes to create your AI workflow</p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default ARWorkflow;
