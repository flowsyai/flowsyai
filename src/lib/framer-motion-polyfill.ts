/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

// Safe polyfill for Framer Motion that prevents SSR issues
// This replaces framer-motion entirely in production builds

interface MotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  transition?: any;
  variants?: any;
  viewport?: any;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
  [key: string]: any;
}

// Safety check for React availability
const safeForwardRef = React?.forwardRef || ((render: any) => render);

// Create a safe motion component factory
const createMotionComponent = (element: string) => {
  return safeForwardRef<any, MotionProps>((props, ref) => {
    const {
      initial,
      animate,
      exit,
      whileHover,
      whileTap,
      whileInView,
      transition,
      variants,
      viewport,
      ...restProps
    } = props;

    // Remove motion-specific props and pass through the rest
    return React.createElement(element, { ref, ...restProps });
  });
};

// Create all motion components
export const motion = {
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  h5: createMotionComponent('h5'),
  h6: createMotionComponent('h6'),
  p: createMotionComponent('p'),
  span: createMotionComponent('span'),
  button: createMotionComponent('button'),
  a: createMotionComponent('a'),
  img: createMotionComponent('img'),
  li: createMotionComponent('li'),
  ul: createMotionComponent('ul'),
  ol: createMotionComponent('ol'),
  tr: createMotionComponent('tr'),
  td: createMotionComponent('td'),
  th: createMotionComponent('th'),
  table: createMotionComponent('table'),
  thead: createMotionComponent('thead'),
  tbody: createMotionComponent('tbody'),
  nav: createMotionComponent('nav'),
  header: createMotionComponent('header'),
  footer: createMotionComponent('footer'),
  main: createMotionComponent('main'),
  aside: createMotionComponent('aside'),
  article: createMotionComponent('article'),
  form: createMotionComponent('form'),
  input: createMotionComponent('input'),
  textarea: createMotionComponent('textarea'),
  select: createMotionComponent('select'),
  option: createMotionComponent('option'),
  label: createMotionComponent('label'),
  svg: createMotionComponent('svg'),
  path: createMotionComponent('path'),
  circle: createMotionComponent('circle'),
  rect: createMotionComponent('rect'),
  line: createMotionComponent('line'),
  polygon: createMotionComponent('polygon'),
  polyline: createMotionComponent('polyline'),
  ellipse: createMotionComponent('ellipse'),
  text: createMotionComponent('text'),
  g: createMotionComponent('g'),
  defs: createMotionComponent('defs'),
  linearGradient: createMotionComponent('linearGradient'),
  radialGradient: createMotionComponent('radialGradient'),
  stop: createMotionComponent('stop'),
  // Additional SVG elements
  animate: createMotionComponent('animate'),
  animateTransform: createMotionComponent('animateTransform'),
  clipPath: createMotionComponent('clipPath'),
  feBlend: createMotionComponent('feBlend'),
  feColorMatrix: createMotionComponent('feColorMatrix'),
  feComponentTransfer: createMotionComponent('feComponentTransfer'),
  feComposite: createMotionComponent('feComposite'),
  feConvolveMatrix: createMotionComponent('feConvolveMatrix'),
  feDiffuseLighting: createMotionComponent('feDiffuseLighting'),
  feDisplacementMap: createMotionComponent('feDisplacementMap'),
  feDistantLight: createMotionComponent('feDistantLight'),
  feDropShadow: createMotionComponent('feDropShadow'),
  feFlood: createMotionComponent('feFlood'),
  feFuncA: createMotionComponent('feFuncA'),
  feFuncB: createMotionComponent('feFuncB'),
  feFuncG: createMotionComponent('feFuncG'),
  feFuncR: createMotionComponent('feFuncR'),
  feGaussianBlur: createMotionComponent('feGaussianBlur'),
  feImage: createMotionComponent('feImage'),
  feMerge: createMotionComponent('feMerge'),
  feMergeNode: createMotionComponent('feMergeNode'),
  feMorphology: createMotionComponent('feMorphology'),
  feOffset: createMotionComponent('feOffset'),
  fePointLight: createMotionComponent('fePointLight'),
  feSpecularLighting: createMotionComponent('feSpecularLighting'),
  feSpotLight: createMotionComponent('feSpotLight'),
  feTile: createMotionComponent('feTile'),
  feTurbulence: createMotionComponent('feTurbulence'),
  filter: createMotionComponent('filter'),
  foreignObject: createMotionComponent('foreignObject'),
  image: createMotionComponent('image'),
  marker: createMotionComponent('marker'),
  mask: createMotionComponent('mask'),
  metadata: createMotionComponent('metadata'),
  pattern: createMotionComponent('pattern'),
  switch: createMotionComponent('switch'),
  symbol: createMotionComponent('symbol'),
  textPath: createMotionComponent('textPath'),
  title: createMotionComponent('title'),
  tspan: createMotionComponent('tspan'),
  use: createMotionComponent('use'),
};

// AnimatePresence polyfill - just renders children
export const AnimatePresence: React.FC<{
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
  initial?: boolean;
  exitBeforeEnter?: boolean;
  onExitComplete?: () => void;
}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

// useInView hook polyfill - always returns true
export const useInView = (options?: any) => {
  return true;
};

// useAnimation hook polyfill
export const useAnimation = () => {
  return {
    start: () => Promise.resolve(),
    stop: () => {},
    set: () => {},
  };
};

// useScroll hook polyfill
export const useScroll = (options?: any) => {
  return {
    scrollX: { get: () => 0 },
    scrollY: { get: () => 0 },
    scrollXProgress: { get: () => 0 },
    scrollYProgress: { get: () => 0 },
  };
};

// useTransform hook polyfill
export const useTransform = (value: any, inputRange: number[], outputRange: any[]) => {
  return { get: () => outputRange[0] };
};

// useSpring hook polyfill
export const useSpring = (value: any, config?: any) => {
  return { get: () => value };
};

// useMotionValue hook polyfill
export const useMotionValue = (initial: any) => {
  return {
    get: () => initial,
    set: () => {},
    on: () => () => {},
    destroy: () => {},
  };
};

// useMotionTemplate hook polyfill
export const useMotionTemplate = (template: any, ...values: any[]) => {
  return { get: () => template };
};

// Variants type
export interface Variants {
  [key: string]: any;
}

// Export default motion object
export default motion;

// Additional exports that might be used
export const MotionConfig: React.FC<{ children: React.ReactNode; [key: string]: any }> = ({
  children,
}) => {
  return React.createElement(React.Fragment, null, children);
};

export const LazyMotion: React.FC<{
  children: React.ReactNode;
  features: any;
  strict?: boolean;
}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

export const domAnimation = {};
export const domMax = {};

// Easing functions polyfill
export const easeIn = 'ease-in';
export const easeOut = 'ease-out';
export const easeInOut = 'ease-in-out';
export const linear = 'linear';

// Transform functions polyfill
export const transform = (value: number, inputRange: number[], outputRange: any[]) => {
  return outputRange[0];
};

// Stagger function polyfill
export const stagger = (delay: number, options?: any) => {
  return delay;
};

// Spring function polyfill
export const spring = (config?: any) => {
  return { type: 'spring', ...config };
};

// Tween function polyfill
export const tween = (config?: any) => {
  return { type: 'tween', ...config };
};

// Keyframes function polyfill
export const keyframes = (values: any[]) => {
  return values[values.length - 1];
};

// Inertia function polyfill
export const inertia = (config?: any) => {
  return { type: 'inertia', ...config };
};

// Just function polyfill
export const just = (value: any) => {
  return value;
};

// Anticipate function polyfill
export const anticipate = (value: any) => {
  return value;
};

// Back functions polyfill
export const backIn = (value: any) => value;
export const backOut = (value: any) => value;
export const backInOut = (value: any) => value;

// Bounce functions polyfill
export const bounceIn = (value: any) => value;
export const bounceOut = (value: any) => value;
export const bounceInOut = (value: any) => value;

// Circ functions polyfill
export const circIn = (value: any) => value;
export const circOut = (value: any) => value;
export const circInOut = (value: any) => value;

// Cubic functions polyfill
export const cubicBezier = (x1: number, y1: number, x2: number, y2: number) => {
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
};

// Steps function polyfill
export const steps = (steps: number, direction?: 'start' | 'end') => {
  return `steps(${steps}, ${direction || 'end'})`;
};

// Mirror function polyfill
export const mirrorEasing = (easing: any) => {
  return easing;
};

// Reverse function polyfill
export const reverseEasing = (easing: any) => {
  return easing;
};

// Pipe function polyfill
export const pipe = (...functions: any[]) => {
  return (value: any) => functions.reduce((acc, fn) => fn(acc), value);
};

// Distance functions polyfill
export const distance = (a: any, b: any) => {
  return 0;
};

export const distance2D = (a: any, b: any) => {
  return 0;
};

// Angle function polyfill
export const angle = (a: any, b: any) => {
  return 0;
};

// Clamp function polyfill
export const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(value, min), max);
};

// Interpolate function polyfill
export const interpolate = (input: number[], output: any[], options?: any) => {
  return (value: number) => output[0];
};

// Mix function polyfill
export const mix = (from: any, to: any, progress: number) => {
  return progress < 0.5 ? from : to;
};

// Progress function polyfill
export const progress = (from: number, to: number, value: number) => {
  return (value - from) / (to - from);
};

// Wrap function polyfill
export const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};
