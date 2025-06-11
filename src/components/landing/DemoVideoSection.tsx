import React, { useState, useRef } from 'react';
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
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

const DemoVideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background via-primary/5 to-gold/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-gold/10 animate-pulse"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-gold/20 rounded-full px-6 py-2 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-primary to-gold rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-foreground">
              INDUSTRY LEADERSHIP SHOWCASE
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="block text-foreground">See Why We're the</span>
            <span className="block bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
              Absolute Industry Leader
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Watch our revolutionary AI-powered tutorial system, enterprise gamification, and
            real-time optimization in action. No competitor comes close to our advanced technology.
          </p>
        </MotionDiv>

        {/* Demo Video Container */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video Player */}
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-primary/20"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Element */}
            {/* Video Placeholder - Ready for your custom video */}
            <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Demo Video Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Professional showcase of AI Workflow Studio's revolutionary features
                </p>
              </div>
            </div>

            {/* Hidden video element ready for when you add your video */}
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover hidden"
              poster="/demo-videos/poster.jpg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/demo-videos/ai-workflow-studio-demo.webm" type="video/webm" />
              <source src="/demo-videos/ai-workflow-studio-demo.mp4" type="video/mp4" />
              {/* Subtitles */}
              <track
                kind="subtitles"
                src="/demo-videos/subtitles-ro.vtt"
                srcLang="ro"
                label="Română"
                default
              />
              <track
                kind="subtitles"
                src="/demo-videos/subtitles-en.vtt"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <MotionButton
                  onClick={togglePlay}
                  className="w-20 h-20 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </MotionButton>
              </div>
            )}

            {/* Custom Controls */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Video Features */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                title: 'AI-Powered Tutorial',
                description: 'First in the industry - intelligent step-by-step guidance',
                badge: 'REVOLUTIONARY',
              },
              {
                title: 'Enterprise Gamification',
                description: 'Advanced achievement system with real-time challenges',
                badge: 'UNIQUE',
              },
              {
                title: 'Real-Time Analytics',
                description: '15+ performance metrics with AI-driven insights',
                badge: 'ADVANCED',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-background to-primary/5 rounded-xl p-6 border border-primary/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <span className="text-xs bg-gradient-to-r from-gold to-primary text-white px-2 py-1 rounded font-bold">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </MotionDiv>

          {/* Call to Action */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-gold text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                asChild
              >
                <a href="/ai-workflow-studio/new">
                  Experience It Yourself
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg"
                asChild
              >
                <a href="/documentation">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Documentation
                </a>
              </Button>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default DemoVideoSection;
