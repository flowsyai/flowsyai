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

const NUM_SHAPES = 7;
const CONTAINER_SIZE = 256; // md:w-64 md:h-64
const SHAPE_SIZE = 30;
const CENTRAL_SHAPE_SIZE = 80;

const HeroAnimation: React.FC = () => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const shapeVariants = {
    initial: (i: number) => {
      const angle = (i / NUM_SHAPES) * 2 * Math.PI;
      const radius = CONTAINER_SIZE / 2 - SHAPE_SIZE;
      return {
        x: Math.cos(angle) * radius + CONTAINER_SIZE / 2 - SHAPE_SIZE / 2,
        y: Math.sin(angle) * radius + CONTAINER_SIZE / 2 - SHAPE_SIZE / 2,
        opacity: 0,
        scale: 0.5,
      };
    },
    animate: {
      x: CONTAINER_SIZE / 2 - SHAPE_SIZE / 2,
      y: CONTAINER_SIZE / 2 - SHAPE_SIZE / 2,
      opacity: [0, 0.8, 0], // Fade in, then fade out as it merges
      scale: [0.5, 1, 0.3],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        delay: 0.5, // Delay before individual shapes start moving
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  const centralShapeVariants = {
    initial: {
      opacity: 0,
      scale: 0.2,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.5, // Appear after small shapes start merging
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <MotionDiv
      className="relative flex items-center justify-center"
      style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Small Converging Shapes */}
      {Array.from({ length: NUM_SHAPES }).map((_, i) => (
        <MotionDiv
          key={`shape-${i}`}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: SHAPE_SIZE,
            height: SHAPE_SIZE,
            // mixBlendMode: 'lighter', // Cool effect for merging
          }}
          custom={i}
          variants={shapeVariants}
        />
      ))}

      {/* Central Merged Shape */}
      <MotionDiv
        className="absolute bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          width: CENTRAL_SHAPE_SIZE,
          height: CENTRAL_SHAPE_SIZE,
        }}
        variants={centralShapeVariants}
      >
        {/* Optional: Incorporate LightningBoltIcon or another graphic */}
        {/* <LightningBoltIcon className="w-12 h-12 text-white opacity-90" /> */}
        <MotionDiv
          className="w-full h-full rounded-full bg-white/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </MotionDiv>
    </MotionDiv>
  );
};

export default React.memo(HeroAnimation);
