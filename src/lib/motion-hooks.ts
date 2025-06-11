import { useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import React from 'react';

// Export hooks with error boundaries
export const useAnimationSafe = () => {
  try {
    return useAnimation();
  } catch (error) {
    console.warn('useAnimation error:', error);
    return {
      start: () => Promise.resolve(),
      stop: () => {},
      set: () => {},
    };
  }
};

export const useInViewSafe = (ref: React.RefObject<Element>, options?: Record<string, unknown>) => {
  try {
    return useInView(ref, options);
  } catch (error) {
    console.warn('useInView error:', error);
    return false;
  }
};

export const useScrollSafe = () => {
  try {
    return useScroll();
  } catch (error) {
    console.warn('useScroll error:', error);
    return { scrollY: { get: () => 0 }, scrollX: { get: () => 0 } };
  }
};

export const useTransformSafe = (value: unknown, inputRange: number[], outputRange: unknown[]) => {
  try {
    return useTransform(value, inputRange, outputRange);
  } catch (error) {
    console.warn('useTransform error:', error);
    return { get: () => outputRange[0] };
  }
};

// Export original hooks for direct use
export { useAnimation, useInView, useScroll, useTransform };
