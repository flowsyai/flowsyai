import React, { useRef, useState } from 'react';
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
import { useInView } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDemoSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Demo features
  const demoFeatures = [
    {
      title: 'Intuitive Workflow Builder',
      description:
        'Create complex AI workflows with our drag-and-drop interface. Connect multiple agents and define their interactions visually.',
      image: '/workflow-demo.jpg', // Replace with actual image path
    },
    {
      title: 'Real-time Analytics Dashboard',
      description:
        'Monitor performance metrics and gain insights into your AI operations with comprehensive analytics.',
      image: '/analytics-demo.jpg', // Replace with actual image path
    },
    {
      title: 'Agent Configuration Studio',
      description:
        'Fine-tune your AI agents with our advanced configuration tools. Customize behaviors and optimize performance.',
      image: '/agent-config-demo.jpg', // Replace with actual image path
    },
  ];

  return (
    <section id="product-demo" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <MotionDiv variants={itemVariants} className="mb-4">
            <span className="px-4 py-1.5 text-xs font-medium rounded-full border border-primary/30 text-primary bg-primary/10 inline-block">
              VISUAL SHOWCASE
            </span>
          </MotionDiv>
          <MotionH2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-serif"
          >
            Experience the <span className="text-primary">Power</span>
          </MotionH2>
          <MotionP
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            See our platform in action with these interactive demonstrations
          </MotionP>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          {/* Main Product Video Demo */}
          <div className="relative rounded-xl overflow-hidden premium-border shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/20 to-gold/20 z-0"></div>

            {/* Placeholder for demo video - avoiding 403 errors */}
            <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/30 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Product Demo</h3>
                <p className="text-muted-foreground">Interactive workflow demonstration</p>
              </div>
            </div>

            {/* Video Controls */}
            <button
              type="button"
              onClick={toggleVideo}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-primary/20 backdrop-blur-sm p-6 rounded-full text-white hover:bg-primary/40 transition-all duration-300 border border-primary/30 group"
              aria-label={isVideoPlaying ? 'Pause demo video' : 'Play demo video'}
            >
              <MotionDiv
                animate={{ scale: isVideoPlaying ? 1 : [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: isVideoPlaying ? 0 : Infinity }}
              >
                {isVideoPlaying ? (
                  <Pause size={30} />
                ) : (
                  <Play size={30} className="group-hover:translate-x-0.5 transition-transform" />
                )}
              </MotionDiv>
            </button>

            {/* Video Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
              <p className="text-sm md:text-base text-foreground font-medium">
                Complete platform walkthrough: See how our solution transforms AI integration
              </p>
            </div>
          </div>
        </MotionDiv>

        {/* Responsive Design Showcase */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <Tabs defaultValue="desktop" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="premium-glass">
                <TabsTrigger value="desktop" className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Desktop
                </TabsTrigger>
                <TabsTrigger value="tablet" className="flex items-center gap-2">
                  <Tablet className="w-4 h-4" /> Tablet
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Mobile
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="desktop" className="mt-0">
              <div className="premium-card p-2 md:p-4 bg-card/50 backdrop-blur-sm">
                <img
                  src="/desktop-demo.jpg" // Replace with actual image
                  alt="Desktop interface demonstration"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="tablet" className="mt-0">
              <div className="premium-card p-2 md:p-4 bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
                <img
                  src="/tablet-demo.jpg" // Replace with actual image
                  alt="Tablet interface demonstration"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="mt-0">
              <div className="premium-card p-2 md:p-4 bg-card/50 backdrop-blur-sm max-w-sm mx-auto">
                <img
                  src="/mobile-demo.jpg" // Replace with actual image
                  alt="Mobile interface demonstration"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </TabsContent>
          </Tabs>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="relative overflow-hidden px-8 py-6 bg-primary/90 hover:bg-primary text-primary-foreground font-medium"
            asChild
          >
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                toggleVideo();
              }}
            >
              <span className="relative z-10 flex items-center">
                Watch Full Demo <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </a>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};

export default ProductDemoSection;
