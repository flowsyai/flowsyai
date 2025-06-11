import React from 'react';

// Simple motion wrapper that provides basic animations without framer-motion
// This is a lightweight alternative for production builds

interface MotionProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  whileInView?: Record<string, unknown>;
  viewport?: Record<string, unknown>;
  variants?: Record<string, unknown>;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onClick?: (e?: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  asChild?: boolean;
}

// Create a simple motion component factory
const createMotionComponent = (tag: keyof JSX.IntrinsicElements) => {
  return React.forwardRef<HTMLElement, MotionProps>((props, ref) => {
    const {
      children,
      className,
      style,
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      variants,
      draggable,
      onDragStart,
      onDragEnd,
      asChild,
      ...rest
    } = props;

    // Simple CSS-based animations
    const motionStyle: React.CSSProperties = {
      ...style,
      transition: 'all 0.3s ease-in-out',
    };

    return React.createElement(
      tag,
      {
        ref,
        className,
        style: motionStyle,
        draggable,
        onDragStart,
        onDragEnd,
        ...rest,
      },
      children
    );
  });
};

// Export motion components
export const MotionDiv = createMotionComponent('div');
export const MotionSection = createMotionComponent('section');
export const MotionMain = createMotionComponent('main');
export const MotionFooter = createMotionComponent('footer');
export const MotionHeader = createMotionComponent('header');
export const MotionNav = createMotionComponent('nav');
export const MotionAside = createMotionComponent('aside');
export const MotionArticle = createMotionComponent('article');
export const MotionH1 = createMotionComponent('h1');
export const MotionH2 = createMotionComponent('h2');
export const MotionH3 = createMotionComponent('h3');
export const MotionH4 = createMotionComponent('h4');
export const MotionH5 = createMotionComponent('h5');
export const MotionH6 = createMotionComponent('h6');
export const MotionP = createMotionComponent('p');
export const MotionButton = createMotionComponent('button');
export const MotionLi = createMotionComponent('li');
export const MotionUl = createMotionComponent('ul');
export const MotionOl = createMotionComponent('ol');
export const MotionTr = createMotionComponent('tr');
export const MotionTd = createMotionComponent('td');
export const MotionTh = createMotionComponent('th');
export const MotionSpan = createMotionComponent('span');
export const MotionImg = createMotionComponent('img');
export const MotionA = createMotionComponent('a');
export const MotionForm = createMotionComponent('form');
export const MotionInput = createMotionComponent('input');
export const MotionTextarea = createMotionComponent('textarea');
export const MotionLabel = createMotionComponent('label');

// Simple scroll hook
export const useScroll = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY: { get: () => scrollY } };
};

// Simple transform hook
export const useTransform = (
  value: { get?: () => number } | number,
  input: number[],
  output: number[]
) => {
  const [transformedValue, setTransformedValue] = React.useState(output[0]);

  React.useEffect(() => {
    const currentValue = typeof value.get === 'function' ? value.get() : value;

    // Simple linear interpolation
    const inputRange = input[1] - input[0];
    const outputRange = output[1] - output[0];
    const progress = Math.max(0, Math.min(1, (currentValue - input[0]) / inputRange));
    const result = output[0] + progress * outputRange;

    setTransformedValue(result);
  }, [value, input, output]);

  return { get: () => transformedValue };
};

// Simple animation hook
export const useAnimation = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const start = React.useCallback((animation: Record<string, unknown>) => {
    setIsAnimating(true);
    // Simple timeout-based animation
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  return { start, isAnimating };
};

// Simple in-view hook
export const useInView = (
  ref?: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, inView];
};

// Simple animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const slideDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

// Simple stagger animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Export commonly used animation presets
export const animations = {
  fadeIn,
  slideUp,
  slideDown,
  scaleIn,
  staggerContainer,
};

// Simple AnimatePresence alternative
export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

// Safe AnimatePresence for error handling
export const SafeAnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

// Export default motion object for compatibility
export const motion = {
  div: MotionDiv,
  section: MotionSection,
  main: MotionMain,
  footer: MotionFooter,
  header: MotionHeader,
  nav: MotionNav,
  aside: MotionAside,
  article: MotionArticle,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  h4: MotionH4,
  h5: MotionH5,
  h6: MotionH6,
  p: MotionP,
  button: MotionButton,
  li: MotionLi,
  ul: MotionUl,
  ol: MotionOl,
  tr: MotionTr,
  td: MotionTd,
  th: MotionTh,
  span: MotionSpan,
  img: MotionImg,
  a: MotionA,
  form: MotionForm,
  input: MotionInput,
  textarea: MotionTextarea,
  label: MotionLabel,
};

export default motion;
