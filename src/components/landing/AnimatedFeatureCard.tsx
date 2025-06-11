import React, { useRef, useState } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionH3,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionA,
  MotionSpan,
} from '@/lib/motion-wrapper';
import { useTransform } from '@/lib/motion-hooks';

import { useAnimatedScroll } from '@/hooks/useAnimatedScroll';
import { ArrowRight } from 'lucide-react';

interface AnimatedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  color?: 'primary' | 'gold' | 'platinum';
  index?: number;
}

const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  icon,
  title,
  description,
  link,
  linkText = 'Learn More',
  color = 'primary',
  index = 0,
}) => {
  const { ref, isVisible } = useAnimatedScroll({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isHovered, setIsHovered] = useState(false);

  // For 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smoother animation
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform values for rotation and scale
  const rotateX = useTransform(ySpring, [-100, 100], [10, -10]);
  const rotateY = useTransform(xSpring, [-100, 100], [-10, 10]);
  const scale = useTransform(xSpring, [-100, 0, 100], [0.95, isHovered ? 1.05 : 1, 0.95]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    x.set(mouseX);
    y.set(mouseY);
  };

  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Get color classes based on color prop
  const getColorClasses = () => {
    switch (color) {
      case 'gold':
        return {
          border: 'border-gold/20',
          hover: 'hover:border-gold/40',
          shadow: 'shadow-gold/10',
          hoverShadow: 'hover:shadow-gold/20',
          bg: 'bg-gold/5',
          iconBg: 'bg-gold/10',
          iconBorder: 'border-gold/20',
          iconColor: 'text-gold',
          linkColor: 'text-gold hover:text-gold-light',
        };
      case 'platinum':
        return {
          border: 'border-platinum/20',
          hover: 'hover:border-platinum/40',
          shadow: 'shadow-platinum/10',
          hoverShadow: 'hover:shadow-platinum/20',
          bg: 'bg-platinum/5',
          iconBg: 'bg-platinum/10',
          iconBorder: 'border-platinum/20',
          iconColor: 'text-platinum',
          linkColor: 'text-platinum hover:text-platinum-light',
        };
      default:
        return {
          border: 'border-primary/20',
          hover: 'hover:border-primary/40',
          shadow: 'shadow-primary/10',
          hoverShadow: 'hover:shadow-primary/20',
          bg: 'bg-primary/5',
          iconBg: 'bg-primary/10',
          iconBorder: 'border-primary/20',
          iconColor: 'text-primary',
          linkColor: 'text-primary hover:text-primary-foreground',
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <MotionDiv
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative rounded-xl overflow-hidden ${colorClasses.border} ${colorClasses.hover} ${colorClasses.bg} backdrop-blur-sm transition-all duration-500 shadow-lg ${colorClasses.shadow} ${colorClasses.hoverShadow}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
      }}
    >
      {/* Animated background gradient */}
      <MotionDiv
        className="absolute inset-0 bg-gradient-radial from-transparent to-transparent opacity-0 transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.1 : 0,
          background: isHovered
            ? `radial-gradient(circle at ${x.get() + 150}px ${y.get() + 150}px, hsl(var(--${color})), transparent 70%)`
            : 'none',
        }}
      />

      <div className="p-6 md:p-8">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-lg ${colorClasses.iconBg} ${colorClasses.iconBorder} border flex items-center justify-center mb-6 transform-gpu transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
        >
          <MotionDiv
            className={`${colorClasses.iconColor}`}
            animate={{
              rotate: isHovered ? [0, 10, -10, 0] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </MotionDiv>
        </div>

        {/* Content */}
        <MotionH3
          className="text-xl md:text-2xl font-semibold mb-3"
          animate={{
            y: isHovered ? -5 : 0,
            transition: { duration: 0.3 },
          }}
        >
          {title}
        </MotionH3>

        <MotionP
          className="text-muted-foreground mb-6"
          animate={{
            opacity: isHovered ? 1 : 0.8,
            transition: { duration: 0.3 },
          }}
        >
          {description}
        </MotionP>

        {/* Link */}
        {link && (
          <MotionA
            href={link}
            className={`inline-flex items-center ${colorClasses.linkColor} transition-colors duration-300`}
            animate={{
              x: isHovered ? 5 : 0,
              transition: { duration: 0.3 },
            }}
          >
            <span>{linkText}</span>
            <MotionSpan
              animate={{
                x: isHovered ? 5 : 0,
                transition: { duration: 0.3, delay: 0.1 },
              }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </MotionSpan>
          </MotionA>
        )}
      </div>

      {/* Corner accent */}
      <MotionDiv
        className={`absolute top-0 right-0 w-20 h-20 ${colorClasses.bg} opacity-0`}
        style={{
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
          transition: { duration: 0.3 },
        }}
      />
    </MotionDiv>
  );
};

export default AnimatedFeatureCard;
