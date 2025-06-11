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

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import RoadmapSection from '@/components/landing/RoadmapSection';

const RoadmapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">Development Roadmap</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <RoadmapSection compact />

      {/* Additional Details Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-6">
          <MotionDiv
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Roadmap Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="premium-card p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-primary">Current Focus</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Marketing campaign launch across all channels</li>
                  <li>• Community building and engagement</li>
                  <li>• AIF Token preparation and distribution planning</li>
                  <li>• Early access program setup</li>
                  <li>• Partnership development</li>
                </ul>
              </div>

              <div className="premium-card p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-primary">Upcoming Milestones</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Token launch and distribution (July 2024)</li>
                  <li>• Community growth initiatives</li>
                  <li>• Strategic partnership announcements</li>
                  <li>• Platform development planning</li>
                  <li>• Beta testing program preparation</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="premium-card p-8 rounded-2xl border border-primary/20">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-6">
                  Follow our progress and be the first to know about major updates, token launches,
                  and platform releases.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-gold text-background hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    disabled
                  >
                    Join Community - Coming Soon
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:bg-primary/10"
                    disabled
                  >
                    Subscribe to Updates - Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;
