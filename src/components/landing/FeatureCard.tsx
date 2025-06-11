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
  useInView,
} from '@/lib/motion-wrapper';

import { Link as RouterLink } from 'react-router-dom'; // Renamed to avoid conflict with motion.div if it was named Link
import { Button as ShadButton } from '@/components/ui/button'; // Renamed to avoid conflict
import { ArrowRightIcon } from '@radix-ui/react-icons';

// Use MotionButton from motion-wrapper instead of creating one

// Define the type for the feature prop
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  link: string;
  accentColor: string; // e.g. text-blue-400
  bgColor: string; // e.g. hover:bg-blue-500
  borderColor: string; // e.g. border-blue-500
  richMediaPlaceholderText: string;
  featureAccentVar: string; // e.g. '--color-blue-500-rgb'
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionDiv
      ref={ref}
      key={feature.id}
      className={`group flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
        index % 2 !== 0 ? 'md:flex-row-reverse' : ''
      } transition-all duration-300 ease-in-out`} // Removed transform hover:scale-[1.02]
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }} // Added whileHover to the card itself
    >
      {/* Rich Media Placeholder */}
      <div className="w-full md:w-1/2 aspect-video bg-slate-800 rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden border border-slate-700">
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed ${feature.borderColor.replace('border-', 'border-')}/50 ${feature.accentColor.replace('text-', 'text-')}/70 bg-slate-800/50`}
        >
          <p className="text-sm font-medium mb-2">Future Rich Media:</p>
          <p className="text-xs leading-relaxed opacity-80">{feature.richMediaPlaceholderText}</p>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 md:px-6">
        <div
          className={`inline-flex items-center justify-center p-3 rounded-full bg-slate-800 mb-4 border border-slate-700 group-hover:border-opacity-75 transition-colors duration-300`}
        >
          {React.cloneElement(feature.icon, {
            className: `w-8 h-8 ${feature.accentColor} group-hover:scale-110 transition-transform duration-300`,
          })}
        </div>
        <h3 className={`text-3xl md:text-4xl font-bold mb-5 ${feature.accentColor} tracking-tight`}>
          {feature.title}
        </h3>
        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
          {feature.description}
        </p>
        <MotionButton
          variant="outline"
          className={`w-full sm:w-auto px-8 py-3 font-semibold rounded-md ${feature.borderColor} ${feature.accentColor} ${feature.bgColor} hover:text-slate-900 group-hover:shadow-md`} // Simplified shadow class
          asChild
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: `0px 8px 15px rgba(var(${feature.featureAccentVar}), 0.3)`,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <RouterLink to={feature.link}>
            Explore {feature.title.split(' ')[0]} <ArrowRightIcon className="ml-2 h-4 w-4" />
          </RouterLink>
        </MotionButton>
      </div>
    </MotionDiv>
  );
};

export default React.memo(FeatureCard);
