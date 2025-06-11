import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { MotionDiv } from '@/lib/motion-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Feature icons removed - not currently used

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const FeaturesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Feature cards array - currently empty but keeping structure for future use
  const features: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
    path: string;
  }> = [];

  // Use cases removed - not currently used

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-background/10 z-[5]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          initial={containerVariants.hidden}
          animate={isInView ? containerVariants.visible : containerVariants.hidden}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <MotionDiv
              key={index}
              initial={itemVariants.hidden}
              animate={isInView ? itemVariants.visible : itemVariants.hidden}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`premium-card group p-8 ${feature.bgColor} border ${feature.borderColor} relative overflow-hidden`}
            >
              <MotionDiv
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-20"></div>
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),rgba(255,255,255,0))]"></div>
              </MotionDiv>

              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-white bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-500 premium-shadow`}
              >
                {feature.icon}
              </div>

              <h3
                className={`text-2xl font-bold mb-4 font-serif ${feature.color.includes('emerald') ? 'text-emerald-400' : feature.color.includes('pink') ? 'text-pink-400' : feature.color.includes('amber') ? 'text-amber-400' : 'text-blue-400'}`}
              >
                {feature.title}
              </h3>

              <p className="text-muted-foreground mb-8 leading-relaxed">{feature.description}</p>

              <div className="flex items-center">
                <div className="h-px flex-grow bg-border group-hover:bg-primary/30 transition-colors duration-300 mr-4"></div>

                <Button
                  asChild
                  variant="outline"
                  className="group/btn flex items-center text-foreground hover:text-primary border-primary/20 hover:border-primary/40 hover:bg-primary/5 premium-border"
                >
                  <Link to={feature.path}>
                    <span>Explore Feature</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* CTA Section */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="premium-card p-10 max-w-3xl mx-auto bg-gradient-to-br from-card via-card/80 to-card">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              Ready to Transform Your Experience?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the exclusive community of innovators who are redefining what's possible with our
              premium AI integration platform.
            </p>
            <Button
              size="lg"
              className="relative overflow-hidden px-8 py-6 bg-gradient-to-r from-gold via-gold-light to-gold text-background font-medium premium-border"
            >
              <span className="relative z-10 flex items-center">
                Begin Your Premium Journey{' '}
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce-subtle" />
              </span>
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default FeaturesSection;
