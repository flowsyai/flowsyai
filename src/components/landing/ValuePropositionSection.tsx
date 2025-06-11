import React, { useRef } from 'react';
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
import { ArrowRight, Layers, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValuePropositionSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

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

  // Value propositions
  const valueProps = [
    {
      icon: <Layers className="w-12 h-12" />,
      title: 'Unified AI Integration',
      description:
        'Seamlessly integrate multiple AI bots into a single cohesive solution. Our platform eliminates the complexity of managing disparate AI systems, providing a unified interface for all your intelligent agents.',
      color: 'from-primary to-sapphire-light',
      bgColor: 'bg-sapphire/10',
      borderColor: 'border-sapphire/30',
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Transformative Improvement',
      description:
        'Significantly enhance your applications with our advanced AI orchestration. Our solution drives measurable improvements in efficiency, user experience, and business outcomes through intelligent automation.',
      color: 'from-gold to-gold-light',
      bgColor: 'bg-gold/10',
      borderColor: 'border-gold/30',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Competitive Advantage',
      description:
        'Gain substantial advantages over alternatives with our premium AI platform. Our solution offers unparalleled flexibility, scalability, and performance that puts your business ahead of the competition.',
      color: 'from-platinum to-platinum-light',
      bgColor: 'bg-platinum/10',
      borderColor: 'border-platinum/30',
    },
  ];

  return (
    <section
      id="value-proposition"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden premium-hero-bg"
    >
      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16 md:mb-24"
        >
          <MotionDiv variants={itemVariants} className="mb-4">
            <span className="px-4 py-1.5 text-xs font-medium rounded-full border border-gold/30 text-gold bg-gold/10 inline-block">
              EXCLUSIVE BENEFITS
            </span>
          </MotionDiv>
          <MotionH2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-serif"
          >
            Elevate Your <span className="premium-gradient-text">Digital Experience</span>
          </MotionH2>
          <MotionP
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Discover how our sophisticated platform transforms your AI capabilities and delivers
            exceptional value through intelligent integration.
          </MotionP>
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {valueProps.map((prop, index) => (
            <MotionDiv
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`premium-card p-8 ${prop.bgColor} ${prop.borderColor} relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background opacity-50"></div>

              <div
                className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${prop.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                {React.cloneElement(prop.icon, { className: 'w-10 h-10 text-background' })}
              </div>

              <h3 className="text-2xl font-bold mb-4 font-serif relative z-10">{prop.title}</h3>

              <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                {prop.description}
              </p>

              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent opacity-50 group-hover:w-full transition-all duration-500 ease-in-out"></div>
            </MotionDiv>
          ))}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="relative overflow-hidden px-8 py-6 bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_100%] animate-gradient text-background font-medium"
            asChild
          >
            <Link to="/dashboard">
              <span className="relative z-10 flex items-center">
                Experience the Difference <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
