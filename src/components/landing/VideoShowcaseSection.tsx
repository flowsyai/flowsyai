import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
  featured?: boolean;
}

const VideoShowcaseSection: React.FC = () => {
  // Simple video showcase - 2 actual videos
  const videos: VideoItem[] = [
    {
      id: 'videoclip-1',
      title: 'FlowsyAI Platform Demo',
      description: 'Discover the power and capabilities of our AI automation platform',
      thumbnail: '/flowsy-logo.svg',
      videoUrl: '/videoclip-1.mp4',
      duration: '1:30',
      category: 'Platform Demo',
      featured: true,
    },
    {
      id: 'videoclip-2',
      title: 'AI Workflow Showcase',
      description: 'See how FlowsyAI transforms complex workflows into simple automation',
      thumbnail: '/hero-visual-coming-soon.svg',
      videoUrl: '/videoclip-2.mp4',
      duration: '2:15',
      category: 'Workflow Demo',
      featured: true,
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Video Showcase
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-gold to-sapphire bg-clip-text text-transparent">
            See FlowsyAI in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our latest demos and brand content
          </p>
        </motion.div>

        {/* Simple Video Grid - Made smaller and wider */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Simple Video - Made wider with 21:9 aspect ratio */}
                    <div className="aspect-[21/9] h-40 overflow-hidden rounded-t-lg">
                      <video
                        className="w-full h-full object-cover"
                        poster={video.thumbnail}
                        muted
                        loop
                        playsInline
                        autoPlay
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                      </video>
                    </div>

                    {/* Video Info Below - Clean and Simple, more compact */}
                    <div className="p-4">
                      <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-xs">
                        {video.category}
                      </Badge>
                      <h4 className="text-foreground font-bold text-base mb-1">{video.title}</h4>
                      <p className="text-muted-foreground text-xs mb-2 leading-relaxed">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs font-medium">{video.duration}</span>
                        <Badge variant="outline" className="text-muted-foreground text-xs">
                          HD Quality
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
